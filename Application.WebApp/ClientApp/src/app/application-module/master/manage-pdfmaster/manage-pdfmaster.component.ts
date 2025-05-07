import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { LocationService } from 'src/app/services/common/location/location.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-pdfmaster',
  templateUrl: './manage-pdfmaster.component.html',
  styleUrls: ['./manage-pdfmaster.component.css']
})
export class ManagePDFMasterComponent implements OnInit {
  @ViewChild('uploadPDFimport', { static: false }) uploadPDFimport: ElementRef;
  Operation: string;
  DocNameList: any[] = [];
  DocTypeList: any[] = [];
  DocParticularList: any[] = [];
  UploadPDFList: any[] = [];
  createdBy: number;
  PDFUpload: File = null;
  isEdit: boolean = false;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  
  invalidFileName:boolean=false;
  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder,
    private locationService: LocationService,
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {    
    this.loadDataTable();
    this.createForm();
    this.getAllAttachmentDocumentType();
    this.getAllAttachmentPDF();
  }

  createForm(){
    this.Operation = 'add';
    this.isEdit = false;
    this.DocParticularList = [];
    this.DocNameList = [];
    this.PDFUpload = null;
    this.saveForm = this.fb.group({
      PdfDocId: [0],
      AttachmentDocumentNameId:[null],
      AttachmentDocumentTypeId:[null],
      AttachmentDocumentParticularId:[null],
      FileName: [null],
      IsActive:[true],
      CreatedBy:this.createdBy
    });
  }

  onSubmit(){    
    const formData = new FormData(); 
    formData.append("AttachmentDocumentNameId", this.saveForm.value.AttachmentDocumentNameId);
    formData.append("AttachmentDocumentTypeId", this.saveForm.value.AttachmentDocumentTypeId);
    formData.append("AttachmentDocumentParticularId", this.saveForm.value.AttachmentDocumentParticularId);
    formData.append("FileName", this.PDFUpload);
    formData.append("IsActive", this.saveForm.value.IsActive);
    formData.append("PdfDocId",this.saveForm.value.PdfDocId);
    formData.append("CreatedBy", this.saveForm.value.CreatedBy);

    this.commonService.addAttachmentPDF(formData).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.resetForm();
        this.getAllAttachmentPDF(); 
        jQuery(".close").click();        
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () =>{
      this.spinnerService.hide();
    })
  }

  onEdit(RowData: any){  
    this.Operation = 'edit'; 
    this.isEdit = true; 
    this.saveForm.patchValue({
      PdfDocId : RowData.pdfDocId,
      AttachmentDocumentNameId: RowData.attachmentDocumentNameId,
      AttachmentDocumentTypeId: RowData.attachmentDocumentTypeId,
      AttachmentDocumentParticularId:RowData.attachmentDocumentParticularId,
      FileName: RowData.fileName,
      IsActive:RowData.isActive,
      CreatedBy:RowData.createdBy
    });
    

    let data: any = {
      'AttachmentDocumentTypeId': RowData.attachmentDocumentTypeId,
      'IsActive': true
    }

    this.getAllAttachmentDocumentParticular(data);

    let data2: any ={
      'AttachmentDocumentParticularId':RowData.attachmentDocumentParticularId,
      'IsActive': true
    }
    this.getAllAttachmentDocumentNameOnEdit(data2);
  }
  getAllAttachmentPDF(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null
    this.commonService.getAllAttachmentPDF(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.UploadPDFList = response;                          
      }
      else{
        this.UploadPDFList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllAttachmentDocumentType(){    
    this.saveForm.value.IsActive = true;
    this.commonService.getAllAttachmentDocumentType(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.DocTypeList = response;                          
      }
      else{
        this.DocTypeList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }

  obnChangeDocType(docTypeID: any){
    let data: any = {
      'AttachmentDocumentTypeId': docTypeID,
      'IsActive': true
    }

    this.getAllAttachmentDocumentParticular(data);
  }

  getAllAttachmentDocumentParticular(data: any){    
    this.commonService.GetAllAttachmentDocumentParticular(data).subscribe((response: any) => {            
      if(response){
        this.DocParticularList = response;                           
      }
      else{
        this.DocParticularList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }
  onChangeDocParticular(docParticularId: any){
    let data: any = {
      'AttachmentDocumentParticularId': docParticularId,
      'IsActive': true
    }
    this.getAllAttachmentDocumentName(data);
  }

  getAllAttachmentDocumentName(data: any){
    this.commonService.getFilteredAttachmentDocumentName(data).subscribe((response: any) => {
      if(response){
        this.DocNameList = response;                        
      }
      else{
        this.DocNameList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }

  getAllAttachmentDocumentNameOnEdit(data: any){
    this.commonService.getAllAttachmentDocumentName(data).subscribe((response: any) => {
      if(response){
        this.DocNameList = response;                        
      }
      else{
        this.DocNameList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
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
    if (mimeType.match(/pdf\/*/) == null && this.saveForm.value.PdfDocId != 13) { //pdfdocId 13 is the signature document which will always be .jpg format added by Amartya on 04-02-2023s
      this.notiService.showError("Only pdf files are supported", "Error");
      return;
    }
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
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);
      
    }, error => {
      console.error('Failed to download file:', error);
    });
  }
  resetForm(){
    this.DocParticularList = [];
    this.DocNameList = [];
    this.uploadPDFimport.nativeElement.innerText = "Choose file";
    this.PDFUpload = null;
  }
}
