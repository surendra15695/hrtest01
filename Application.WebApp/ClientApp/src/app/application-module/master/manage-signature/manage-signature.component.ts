import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common/common/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationService } from '../../../sharedservices/notification.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PersistanceService } from '../../../sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-manage-signature',
  templateUrl: './manage-signature.component.html',
  styleUrls: ['./manage-signature.component.css']
})
export class ManageSignatureComponent implements OnInit {
  @ViewChild('uploadPDFimport', { static: false }) uploadPDFimport: ElementRef;
  employeeList: any = []
  createdBy: number;
  allSignatureList: any = [];
  Operation: string = "";
  isEdit: boolean = false;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  PDFUpload: File = null;
  invalidFileName:boolean=false;
  constructor(
    private commonService: CommonService,
    private SpinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) {
    this.getAllSignature()
    this.getAllEmployeeForSign()
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm();
    this.isEdit = false;
  }
  getAllEmployeeForSign() {
    var searchData = {
      EmployeeNo: null,
      RoleIds: this.persistance.get("loggedinuser").roleIds,
      AutoUserId: this.persistance.get("loggedinuser").autoUserId
    }
    this.commonService.getAllEmployeeForSignature(searchData).subscribe((result) => {
      if (result) {
        this.employeeList = result;
      }
      else {
        this.employeeList = [];
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }


  getAllSignature() {
    this.SpinnerService.show();
    var search = {
      EmployeeId: null,
      RoleIds: this.persistance.get("loggedinuser").roleIds,
      AutoUserId: this.persistance.get("loggedinuser").autoUserId
    }
    this.commonService.getAllSignature(search).subscribe((response: any) => {
      if (response) {
        this.allSignatureList = response;
      }
      else {
        this.allSignatureList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.SpinnerService.hide();
    })
  }
  onFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    // if (mimeType.match(/jpg\/*/) == null) { //pdfdocId 13 is the signature document which will always be .jpg format added by Amartya on 04-02-2023s
    //   this.notiService.showError("Only jpg/jpeg/PNG files are supported", "Error");
    //   return;
    // }
    if (this.invalidFileName) {
      this.notiService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.uploadPDFimport.nativeElement.innerText = "Choose file";
      this.PDFUpload = null;
      return;
    }
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notiService.showError("File should be less than 2MB!", "Error");
        this.uploadPDFimport.nativeElement.innerText = "Choose file";
        this.PDFUpload = null;
      } else {
        this.uploadPDFimport.nativeElement.innerText = files[0].name;
        this.PDFUpload = files.item(0);
      }
    }
    else {
      this.uploadPDFimport.nativeElement.innerText = "Choose file";
      this.PDFUpload = null;
    }
  }
  createForm() {
    this.Operation = 'add';
    this.isEdit = false;
    // this.DocParticularList = [];
    // this.DocNameList = [];
    this.PDFUpload = null;
    this.saveForm = this.fb.group({
      SignatureId: 0,
      EmployeeId: 0,
      EmployeeNo: null,
      EmployeeName: null,
      IsActive: [true],
      CreatedBy: this.createdBy
    });
    this.uploadPDFimport.nativeElement.innerText = "Choose file"
  }
  onClickCancel() {
    this.createForm()
  }
  onEdit(item) {
    this.Operation = 'edit';
    this.isEdit = true;
    this.saveForm.patchValue({
      SignatureId: item.signatureId,
      EmployeeId: item.employeeId,
      EmployeeNo: item.employeeNo,
      EmployeeName: item.employeeName,
      IsActive: item.isActive,
      FileName: item.fileName,
      CreatedBy: item.createdBy
    })
  }
  onChangeEmployee(event) {
    this.saveForm.value.EmployeeNo = event;
    this.saveForm.value.EmployeeId = this.employeeList.find(e => e.empNo == event).empId;
    this.saveForm.value.EmployeeName = this.employeeList.find(e => e.empNo == event).employeeName;

  }

  onSubmit() {
    const formData = new FormData();
    formData.append("SignatureId", this.saveForm.value.SignatureId);
    formData.append("EmployeeId", this.saveForm.value.EmployeeId);
    formData.append("EmployeeNo", this.saveForm.value.EmployeeNo);
    formData.append("EmployeeName", this.saveForm.value.EmployeeName);
    formData.append("FileName", this.PDFUpload);
    formData.append("IsActive", this.saveForm.value.IsActive);
    formData.append("CreatedBy", this.saveForm.value.CreatedBy);
    this.commonService.insertUpdateSignature(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllSignature()
        jQuery(".close").click();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }
  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }
}
