import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JobtypeService } from 'src/app/services/common/jobtype/jobtype.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managejobtype',
  templateUrl: './managejobtype.component.html',
  styleUrls: ['./managejobtype.component.css']
})

export class ManagejobtypeComponent implements OnInit {

  JobTypeList: any[] = [];
  createdBy: number;
  Operation: string;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private jobTypeService: JobtypeService,
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

    this.getAllJobType();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      jobTypeName:['', Validators.required],
      jobTypeId:[0],
      isActive:[true],
      createdBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();    
    this.jobTypeService.addJobType(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllJobType();   
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
    this.Operation = 'edit';    
    this.saveForm.patchValue({
      jobTypeName: RowData.jobTypeName,
      jobTypeId:RowData.jobTypeId,
      isActive:RowData.isActive,
      createdBy:RowData.createdBy
    });
  }

  getAllJobType(){
    this.spinnerService.show();
    this.saveForm.value.isActive = null;
    this.jobTypeService.getAllJobType(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.JobTypeList = response;                             
      }
      else{
        this.JobTypeList = [];        
      }      
    }, error => {
      // display form values on success
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
