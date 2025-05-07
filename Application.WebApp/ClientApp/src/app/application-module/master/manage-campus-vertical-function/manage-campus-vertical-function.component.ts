import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/common/language/language.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;
@Component({
  selector: 'app-manage-campus-vertical-function',
  templateUrl: './manage-campus-vertical-function.component.html',
  styleUrls: ['./manage-campus-vertical-function.component.css']
})
export class ManageCampusVerticalFunctionComponent implements OnInit {
  Operation: string;
  FunctionList: any[] = [];
  VerticalList: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  }); 
  constructor(
    private functionService: FunctionService,
    private verticalService: VerticalService,
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
    this.getAllVertical();
    this.getAllVerticalFunction();
  }
  createForm(){
    this.Operation = 'add';  
    this.saveForm = this.fb.group({
      FunctionName:['', Validators.required],
      FunctionId:[0],
      VerticalId:[null, Validators.required],
      IsActive:[true],
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){    
    this.spinnerService.show();
    this.functionService.addCampusFunction(this.saveForm.value).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.getAllVerticalFunction();  
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
    this.saveForm.patchValue({
      FunctionName: Data.functionName,
      FunctionId: Data.functionId,
      VerticalId:Data.verticalId,
      IsActive: Data.isActive,
      CreatedBy: Data.createdBy
    });
  }

  getAllVerticalFunction(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.functionService.getAllCampusVerticalFunction(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.FunctionList = response;
        //console.log("FunList: ", response);                
      }
      else{
        this.FunctionList = [];        
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
    this.verticalService.getAllCAmpusVertical(this.saveForm.value).subscribe((response: any) => {            
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
