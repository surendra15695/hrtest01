import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-nationality',
  templateUrl: './manage-nationality.component.html',
  styleUrls: ['./manage-nationality.component.css']
})
export class ManageNationalityComponent implements OnInit {
  Operation: string;
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  }); 
  NationalityList: any[] = [];

  constructor(
    private commonService: CommonService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ){
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm();
    this.getAllNationality();
  }
  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      NationalityName:['', Validators.required],
      NationalityId:[0],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }
  onSubmit(){    
    this.spinnerService.show();    
    this.commonService.addNationality(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllNationality();  
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
      NationalityName: RowData.nationalityName,
      NationalityId: RowData.nationalityId,
      IsActive: RowData.isActive,
      CreatedBy: RowData.createdBy
    });
  }

  getAllNationality(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.commonService.getAllNationality(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.NationalityList = response;                             
      }
      else{
        this.NationalityList = [];        
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
