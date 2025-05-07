import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-docparticular',
  templateUrl: './manage-docparticular.component.html',
  styleUrls: ['./manage-docparticular.component.css']
})

export class ManageDocparticularComponent implements OnInit {

  Operation: string;
  DocParticularList: any[] = [];
  DocTypeList: any[] = [];
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

    this.getAllAttachmentDocumentType();
    this.getAllAttachmentDocumentParticular();    
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      AttachmentDocumentParticularName:['', Validators.required],
      AttachmentDocumentParticularId:[0],
      AttachmentDocumentTypeId:[null],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();    
    this.commonService.addAttachmentDocParticular(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllAttachmentDocumentParticular();  
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
      AttachmentDocumentParticularName: RowData.attachmentDocumentParticularName,
      AttachmentDocumentParticularId:RowData.attachmentDocumentParticularId,
      AttachmentDocumentTypeId: RowData.attachmentDocumentTypeId,
      IsActive:RowData.isActive,
      CreatedBy:RowData.createdBy
    });
  }

  getAllAttachmentDocumentParticular(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.commonService.GetAllAttachmentDocumentParticular(this.saveForm.value).subscribe((response: any) => {            
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
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllAttachmentDocumentType(){
    this.spinnerService.show();
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
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
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
