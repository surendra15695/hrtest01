import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-docname',
  templateUrl: './manage-docname.component.html',
  styleUrls: ['./manage-docname.component.css']
})

export class ManageDocnameComponent implements OnInit {

  Operation: string;
  DocNameList: any[] = [];
  DocTypeList: any[] = [];
  DocParticularList: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {    
    this.loadDataTable();
    this.createForm();

    this.getAllAttachmentDocumentName();
    this.getAllAttachmentDocumentType();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      AttachmentDocumentName:['', Validators.required],
      AttachmentDocumentNameId:[0],
      AttachmentDocumentTypeId:[null],
      AttachmentDocumentParticularId:[null],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();    
    this.commonService.addAttachmentDocName(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllAttachmentDocumentName(); 
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
    this.saveForm.patchValue({
      AttachmentDocumentName: RowData.attachmentDocumentName,
      AttachmentDocumentNameId:RowData.attachmentDocumentNameId,
      AttachmentDocumentTypeId:RowData.attachmentDocumentTypeId,
      AttachmentDocumentParticularId:RowData.attachmentDocumentParticularId,
      IsActive:RowData.isActive,
      CreatedBy:RowData.createdBy
    });

    let data: any = {
      'AttachmentDocumentTypeId': RowData.attachmentDocumentTypeId,
      'IsActive': true
    }

    this.getAllAttachmentDocumentParticular(data);
  }

  getAllAttachmentDocumentName(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.commonService.getAllAttachmentDocumentName(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.DocNameList = response;
        //console.log("Doc Name List: ", this.DocNameList);                             
      }
      else{
        this.DocNameList = [];        
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
        //console.log("Doc Type List: ", this.DocTypeList);                             
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
    debugger

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
        //console.log("Doc Paticular List: ", this.DocParticularList);                             
      }
      else{
        this.DocParticularList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
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
