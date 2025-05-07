import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managedepartment',
  templateUrl: './managedepartment.component.html',
  styleUrls: ['./managedepartment.component.css']
})

export class ManagedepartmentComponent implements OnInit {

  Operation: string;
  VerticalList: any[] = [];
  FunctionList: any[] = [];
  DepartmentList: any[] = [];
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  
  createdBy:number;
  constructor(
    private deptService: DepartmentService,
    private functionService: FunctionService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private fb: FormBuilder,
    private verticalService: VerticalService,
    private persistance:PersistanceService
  ) {     
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm(); 
    
    this.getAllVertical();
    this.getAllFunctionDepartment();
  }

  createForm(){
    this.Operation = 'add';
    this.saveForm = this.fb.group({
      DepartmentName:['', Validators.required],
      DepartmentId:[0],      
      IsActive:[true],
      VerticalId: [null, Validators.required],
      FunctionId:[null,  Validators.required],      
      CreatedBy:[this.createdBy]
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.deptService.addDepartment(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllFunctionDepartment();    
        jQuery(".close").click();    
      }
      else{
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
    })
  }

  onEdit(Data: any){
    this.Operation = 'edit';           
    this.onChangeVertical(Data.verticalId);    
    this.saveForm.patchValue({
      DepartmentName: Data.departmentName,
      DepartmentId: Data.departmentId,
      FunctionId: Data.functionId,
      VerticalId: Data.verticalId,
      IsActive: Data.isActive,
      CreatedBy: this.createdBy
    });
  }

  getAllFunctionDepartment(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.deptService.getAllFunctionDepartment(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.DepartmentList = response;
        //console.log("Dept List: ", this.DepartmentList);                
      }
      else{
        this.DepartmentList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }  

  getAllVertical(){
    this.spinnerService.show();
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.VerticalList = response;
        //console.log("VerticalList: ", response);                
      }
      else{
        this.VerticalList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  onChangeVertical(verticalID: any){ 
    debugger   
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }

    this.getAllVerticalFunction(data);
  }

  getAllVerticalFunction(data: any){
    this.spinnerService.show();
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {            
      if(response){
        this.FunctionList = response;
        //console.log("FunList: ", this.FunctionList);                
      }
      else{
        this.FunctionList = [];        
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
        //"searching": true,
        //"paging": true,
        "scrollX": true,
        "bLengthChange": false,
      });
    });
  }

}
