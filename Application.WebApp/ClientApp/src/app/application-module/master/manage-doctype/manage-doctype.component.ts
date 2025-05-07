import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-doctype',
  templateUrl: './manage-doctype.component.html',
  styleUrls: ['./manage-doctype.component.css']
})

export class ManageDoctypeComponent implements OnInit {

  Operation: string;
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
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      AttachmentDocumentTypeName:['', Validators.required],
      AttachmentDocumentTypeId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();    
    this.commonService.addAttachmentDocType(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllAttachmentDocumentType();  
        jQuery(".close").click();       
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {
      // display form values on success
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () =>{
      this.spinnerService.hide();
    })
  }

  onEdit(RowData: any){  
    console.log("aaa", RowData)
    this.Operation = 'edit';  
    this.saveForm.patchValue({
      AttachmentDocumentTypeName: RowData.attachmentDocumentTypeName,
      AttachmentDocumentTypeId:RowData.attachmentDocumentTypeId,
      IsActive:RowData.isActive,
      CreatedBy:RowData.createdBy
    });
  }

  getAllAttachmentDocumentType(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
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
      this.loadDataTable();
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
