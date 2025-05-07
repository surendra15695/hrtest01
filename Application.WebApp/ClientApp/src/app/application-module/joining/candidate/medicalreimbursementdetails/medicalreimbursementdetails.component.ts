import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, ICandidateMedicalReimbursementDetails, IEmployeeReimbursementDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { DomSanitizer } from '@angular/platform-browser';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-medicalreimbursementdetails',
  templateUrl: './medicalreimbursementdetails.component.html',
  styleUrls: ['./medicalreimbursementdetails.component.css']
})
export class MedicalreimbursementdetailsComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateMedicalReimbursementId: number;
  @ViewChild('billDate', { static: false }) billDate: ElementRef;
  @ViewChild('candidateJoiningdate', { static: false }) candidateJoiningdate: ElementRef;
  @ViewChild('attachmentFileImport', { static: false }) attachmentFileImport: ElementRef;
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  attachmentfileToUpload: File;
  searchCandidateMedicalReimbursement: ISearchCandidateMedicalReimbursement = {
    candidateMedicalReimbursementId: null,
    requisitionDetailId: null,
    candidateId: null,
    empId: null,
  }
  medicalReimbursementData: any = {};
  medicalReimbursementDetails: ICandidateMedicalReimbursementDetails;
  candidateMedicalReimbursementDeatils: IEmployeeReimbursementDetails[] = [];

  emmployeeReimbursementMatserData1: ICandidateMedicalReimbursementDetails;//Argg
  employeeReimbursementDetailsMedical: IEmployeeReimbursementDetails[] = [];//Argg
  candidateName: string = "";
  joiningDate: string;
  billTotalAmount: number;
  billDetailsArray: any[] = [];
  objBillDetails: BillDetails;
  totalAmount: number = 0;
  todaysDate: string;
  testLocation: string = "";
  date: string;
  // BillDetails: string = "";
  BillDetailsList: any[] = [];
  IsReadOnly: boolean;
  mode: string;
  // For multiple file upload
  fileUploadArray: any[] = [];
  // For Viewing PDF
  selectedPdf?: Blob;
  pdfURL: any;
  billFiles: string = "";
  approvalRemarks: string = "";
  ForPrintRemarks: any[];
  approvalStatus: string;

  medicalReimbursementForPDF = {
    candidateFullName: '',
    location: '',
    dateofJoining: '',
    totalAmount: 0,
    employeeReimbursementDetailsMedical: []
  }
  file: File;
  invalidFileName: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,   // private datePipe: DatePipe,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService, private sant: DomSanitizer
  ) {
    this.SpinnerService.show();
    // this.todaysDate = new Date().toLocaleDateString();
    this.todaysDate = this.GetFormattedDate();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    //this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    //this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.objBillDetails = new BillDetails();
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateMedicalReimbursementId = params['CandidateMedicalReimbursementId'];
      //this.approvalRemarks = params['ApprovalRemarks'];
      this.approvalStatus = params['ApprovalStatus'];
      this.mode = params['Mode'];
    });
    // alert(this.isEditMode);
    this.searchCandidateMedicalReimbursement.candidateId = Number(this.candidateId);
    this.searchCandidateMedicalReimbursement.candidateMedicalReimbursementId = Number(this.candidateMedicalReimbursementId);
    //this.searchCandidateMedicalReimbursement.requisitionDetailId = this.requisitionDetailId;
    this.getCandidateMedicalReimbursementDetails();

  }
  GetFormattedDate() {
    var todayTime = new Date();
    var month = (todayTime.getMonth() + 1);
    var day = (todayTime.getDate());
    var year = (todayTime.getFullYear());
    return day + "/" + month + "/" + year;
  }


  ngOnInit() {
    this.loadDatePicker();
    //this.tableOptionDropDown();
  }
  loadDatePicker() {
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      var datepickerid = jQuery(e.target).attr("id");
      var rowid = parseInt(datepickerid.replace("datepicker", ""));
    });;
  }
  tableOptionDropDown() {
    var body_ = jQuery('body');
    var dropdownMenu,
      table_responsive = jQuery('.table-responsive');
    table_responsive.on('show.bs.dropdown', function (e) {
      dropdownMenu = jQuery(e.target).find('.custom-menu');
      body_.append(dropdownMenu.detach());
      var eOffset = jQuery(e.target).offset();
      dropdownMenu.css({
        'display': 'block',
        'top': eOffset.top + jQuery(e.target).outerHeight(),
        'left': eOffset.left,
        'font-size': '13px'
      });
      dropdownMenu.addClass("mobPosDropdown");
    });
    table_responsive.on('hide.bs.dropdown', function (e) {
      jQuery(e.target).append(dropdownMenu.detach());
      dropdownMenu.hide();
    });
  }
  getCandidateMedicalReimbursementDetails() {
    //console.log("Search Medical reimbursement Obj", this.searchCandidateMedicalReimbursement);
    this.SpinnerService.show();
    this.candidateService.getCandidateMedicalReimbursementDetailsApprove(this.searchCandidateMedicalReimbursement).subscribe((result) => {
      if (result) {
        this.emmployeeReimbursementMatserData1 = result;//Argg start
        //console.log("Medical Reimbursement Details", this.emmployeeReimbursementMatserData1);
        //this.BillDetailsList = this.medicalReimbursementDetails.billDetails;
        this.candidateName = this.emmployeeReimbursementMatserData1.candidateFullName;
        this.joiningDate = this.emmployeeReimbursementMatserData1.dateofJoining;
        if (this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical.length > 0) {
          this.billDetailsArray = this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical;
          this.calculateTotalAmount();
        }
        this.ForPrintRemarks = [];
        if (this.emmployeeReimbursementMatserData1.employeeMedicalReimbursementMedicalApproval.length > 0) {
          for (var val of this.emmployeeReimbursementMatserData1.employeeMedicalReimbursementMedicalApproval) {
            let obj = {
              printName: val.remarksBy,
              printRemarks: val.approvalRemarksapprove
            }
            this.ForPrintRemarks.push(obj);
          }
        }
        // if (this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical.length > 0) {
        //   for (var i = 0; i < this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical.length; i++) {
        //     let obj = {
        //       printName: this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical[i].remarksby,
        //       printRemarks: this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical[i].approvalRemarks,
        //     }
        //     this.ForPrintRemarks.push(obj);

        //   }
        // }//arg
        this.testLocation = this.emmployeeReimbursementMatserData1.location;
        this.billTotalAmount = this.emmployeeReimbursementMatserData1.totalAmount;
        if (this.emmployeeReimbursementMatserData1.approvalStatus != 0 && (this.emmployeeReimbursementMatserData1.approvalStatus != 2 || this.mode == "View")) {
          this.IsReadOnly = true;
        }
        if (this.emmployeeReimbursementMatserData1.billDetails != "") {
          this.fileUploadArray = [];
          var filePathList = this.emmployeeReimbursementMatserData1.billDetails.split(",");//Argg end
          filePathList.forEach(element => {
            var docPath = element.split("/");
            var lastElement = docPath[docPath.length - 1];
            var fullFileName = lastElement.split("_");
            fullFileName.shift();
            var fileName = fullFileName.join("_");
            // console.log("File Name", fileName);
            var i = this.fileUploadArray.length + 1;
            this.fileUploadArray.push({
              FileName: fileName,
              FilePath: element,
              PdfUrl: "",
              index: i,
              file: ""
            });

          })
        }
        // console.log("File Upload Array", this.fileUploadArray);
        // if (this.medicalReimbursementDetails.billDetails.length > 0) { // Need to check the length of array where the attachment details will be available for now assume this.medicalReimbursementDetails.billDetails
        //   this.medicalReimbursementDetails.billDetails.forEach(element => {
        //     if (element.attachmentLink != "") {
        //       let obj = {
        //         FileName: "test",
        //         filePath: ""
        //       }
        //       this.fileUploadArray.push(obj);
        //     }
        //   })
        // }
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      setTimeout(() => {
        this.loadDatePicker();
      }, 1000);
      this.SpinnerService.hide();
    });
  }
  onClickAddReimbursementDetails() {
    var flag = 0;
    var msg = "";
    if (this.objBillDetails.amount == null) {
      flag = 1;
      msg = "Please Enter Amount";
    }
    else {

    }
    if (this.billDate.nativeElement.value == "") {
      flag = 1;
      msg = "Please Select Bill Date";
    }
    else {

    }
    if (this.objBillDetails.billNo == "") {
      flag = 1;
      msg = "Please Enter Bill No";
    }
    else {

    }
    if (flag == 0) {
      var isExisted = this.billDetailsArray.find(e => e.billNo == this.objBillDetails.billNo);
      if (isExisted == null) {
        this.objBillDetails.candidateMedicalReimbursementId = this.emmployeeReimbursementMatserData1.candidateMedicalReimbursementId; //Argg
        this.objBillDetails.candidateMedicalReimbursementDetailsId = 0;
        this.objBillDetails.billDate = this.billDate.nativeElement.value
        this.billDetailsArray.push(this.objBillDetails);
        this.objBillDetails = new BillDetails();
        this.billDate.nativeElement.value = "";
        this.calculateTotalAmount();
      } else {
        this.notificationService.showError("The Bill no already added", "Error");
      }
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickCancel() {
    this.objBillDetails = new BillDetails();
    this.billDetailsArray = [];
    this.testLocation = "";
    this.totalAmount = 0;
  }
  calculateTotalAmount() {
    this.totalAmount = 0;
    this.billDetailsArray.forEach(element => {
      this.totalAmount += Number(element.amount);
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  onClickDelete(data, i) {
    this.billDetailsArray.forEach((element, index) => {
      if (index == i) {
        this.billDetailsArray.splice(i, 1);
      }
    })
    this.calculateTotalAmount();
  }

  onAttachmentFileChange(files: FileList) {
    //this.fileUploadArray = [];
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("File should be less than 2MB!", "Error");
      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    } else {
      this.attachmentFileImport.nativeElement.innerText = files[0].name;
      this.attachmentfileToUpload = files.item(0);
      // Creating Blob URL
      this.selectedPdf = files[0];
      this.pdfURL = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.selectedPdf)) as string;
      var i = this.fileUploadArray.length + 1;
      this.fileUploadArray.push({
        FileName: files[0].name,
        FilePath: "",
        PdfUrl: this.pdfURL,
        index: i,
        file: this.attachmentfileToUpload
      });
      //console.log("File Upload Array", this.fileUploadArray);

      this.attachmentFileImport.nativeElement.innerText = "Choose file";
      this.attachmentfileToUpload = null;
    }
  }
  onClickRemove(data) {
    this.fileUploadArray = this.fileUploadArray.filter(e => e.index != data.index);
  }
  onSubmitMedicalReimBursementDetails() {
    var flag = 0;
    var msg = "";
    if (this.fileUploadArray.length == 0) {  //&& this.BillDetails == ""
      flag = 1;
      msg = "Please Attach a file";
    }
    else {

    }
    // if (this.billTotalAmount == null) {
    //   flag = 1;
    //   msg = "Please Enter Total Amount";
    // }
    // else {

    // }
    if (this.totalAmount == null) {
      flag = 1;
      msg = "Please Add one bill";
    }
    else {

    }
    if (this.candidateJoiningdate.nativeElement.value == "") {
      flag = 1;
      msg = "Please select joining date";
    }
    else {

    }
    if (this.testLocation == "") {
      flag = 1;
      msg = "Please Enter Test Location";
    }
    else {

    }
    if (this.candidateName == "") {
      flag = 1;
      msg = "Please Enter Name";
    }
    else {

    }
    if (this.approvalRemarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.fileUploadArray.forEach(element => {
        if (element.FilePath != "") {
          this.billFiles += this.billFiles == "" ? element.FilePath : "," + element.FilePath
        }
      })
      this.approvalStatus = '1';
      const formData = new FormData();
      formData.append("CandidateMedicalReimbursementId", this.emmployeeReimbursementMatserData1.candidateMedicalReimbursementId.toString()); //Argg
      formData.append("RequisitionDetailId", this.emmployeeReimbursementMatserData1.requisitionDetailId.toString());//Argg
      formData.append("CandidateId", this.emmployeeReimbursementMatserData1.candidateId.toString());//Argg
      formData.append("EmpId", this.emmployeeReimbursementMatserData1.empId.toString());//Argg
      formData.append("Location", this.testLocation);
      formData.append("DateofJoin", this.emmployeeReimbursementMatserData1.dateofJoining);//Argg
      formData.append("DOB", this.todaysDate);
      formData.append("TotalAmount", this.totalAmount.toString());
      formData.append("BillFiles", this.billFiles);
      formData.append("ApprovalRemarks", this.approvalRemarks);
      formData.append("ApprovalStatus", this.approvalStatus);
      formData.append("EmployeeReimbursementDetails", JSON.stringify(this.billDetailsArray));
      formData.append("theFile", this.file);
      this.emmployeeReimbursementMatserData1 = this.emmployeeReimbursementMatserData1;//Argg strat
      this.emmployeeReimbursementMatserData1.employeeReimbursementDetailsMedical = this.billDetailsArray;
      this.emmployeeReimbursementMatserData1.totalAmount = this.totalAmount;
      this.emmployeeReimbursementMatserData1.location = this.testLocation;//Argg end

      this.medicalReimbursementData.candidateFullName = this.candidateName;
      this.medicalReimbursementData.location = this.testLocation
      this.medicalReimbursementData.dateofJoining = this.emmployeeReimbursementMatserData1.dateofJoining;
      this.medicalReimbursementData.employeeReimbursementDetails = this.billDetailsArray;
      this.medicalReimbursementData.totalAmount = this.totalAmount.toString();

      setTimeout(() => {
        var htmlstring = document.getElementById("printMedicalReimbursementForzip").innerHTML;
        this.fileUploadArray.forEach((element, i) => {
          formData.append("UploadFile" + i.toString(), element.file);
        })
        // formData.append("Files", this.attachmentfileToUpload);
        formData.append("CreatedBy", this.loginUserId.toString());
        // console.log("Bill details Array", this.billDetailsArray);
        formData.append("Htmlstring", htmlstring);
        this.candidateService.saveMedicalReimbursement(formData).subscribe((result) => {
          // console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
            this.closeModal.nativeElement.click();
            this.SpinnerService.hide();
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            this.closeModal.nativeElement.click();
            this.attachmentFileImport.nativeElement.innerText = "";
            this.attachmentFileImport.nativeElement.value = "";
            this._route.navigate(['/app/career/medical-reimbursement-list']);
          }
        }, error => {
          console.log(error);
          this.SpinnerService.hide();
          this.closeModal.nativeElement.click();
          this.notificationService.showError("Something went wrong", "Error");
        });
      }, 500)
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }

  submitData() {
    this.SpinnerService.show();
    this.medicalReimbursementForPDF.candidateFullName = this.candidateName;
    this.medicalReimbursementForPDF.dateofJoining = this.joiningDate;
    this.medicalReimbursementForPDF.location = this.testLocation;
    this.medicalReimbursementForPDF.totalAmount = 0;
    this.billDetailsArray.forEach(element => {
      this.medicalReimbursementForPDF.totalAmount += Number(element.amount);
    })
    this.medicalReimbursementForPDF.employeeReimbursementDetailsMedical = [];
    //this.medicalReimbursementForPDF.employeeReimbursementDetailsMedical = JSON.parse(JSON.stringify(this.billDetailsArray));
    for (var i = 0; i < this.billDetailsArray.length; i++) {
      this.medicalReimbursementForPDF.employeeReimbursementDetailsMedical.push({
        billNo: this.billDetailsArray[i].billNo,
        billDate: this.billDetailsArray[i].billDate,
        amount: Number(this.billDetailsArray[i].amount)
      })
    }

    //console.log("AAA",this.medicalReimbursementForPDF)
    var htmlString = "";
    setTimeout(() => {
      htmlString = document.getElementById("printMedicalReimbursement").innerHTML;
      var dom = document.createElement('div');
      dom.innerHTML = htmlString;
      var opt = {
        margin: 6,
        filename: this.emmployeeReimbursementMatserData1.empNo + "_Medical_Reimbursement.pdf",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, y: 2, scrollY: 0 },
        jsPDF: { format: 'A4', orientation: "portrait" },
      }
      html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
        this.file = data;
        //this.submitData();)
        jQuery("#confirmPopup").modal('show');
      })
      this.SpinnerService.hide()
      //this.SpinnerService.hide()
    }, 300);
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename, containername).subscribe(response => {
      let blob: Blob = response.body as Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
    }, error => {
      console.error('Failed to download file:', error);
    });
  }


}
class BillDetails {
  candidateMedicalReimbursementDetailsId: number;
  candidateMedicalReimbursementId: number;
  billNo: string = "";
  billDate: string = "";
  amount: number;
  isActive: boolean = true;
}
