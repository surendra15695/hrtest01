import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from 'src/app/services/common/position/position.service';

import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { CommonService } from 'src/app/services/common/common/common.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-verticalrm',
  templateUrl: './manage-verticalrm.component.html',
  styleUrls: ['./manage-verticalrm.component.css']
})

export class ManageVerticalrmComponent implements OnInit {

  UserRoleList: any[] = [];
  VerticalList: any[] = [];
  VerticalRMList: any[] = [];
  SelectedAutoUser: any[] = [];  
  Data: any = {
    "RoleId": 5
  };
  arr: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private verticalService: VerticalService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {        
    this.createForm();

    this.getAllVertical();      
    this.getRoleWiseUser();  
  }

  createForm(){
    this.saveForm = this.fb.group({      
      VerticalId:[null, Validators.required],
      AutoUserId:[null, Validators.required],      
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){ 
    debugger   
    this.spinnerService.show();
    let strUserIDs: string = '';
    let count: number = 0;
    if(this.SelectedAutoUser.length != 0){
      for(let val of this.SelectedAutoUser){
        if(count == 0){
          strUserIDs = val.toString();
        }
        else{
          strUserIDs = strUserIDs + ',' + val.toString();
        }
        
        count = count + 1;
      }
    }

    let data: any = {
      "VerticalId":this.saveForm.value.VerticalId,
      "AutoUserId":strUserIDs,
      "IsActive":true,
      "CreatedBy":this.createdBy
    }

    this.verticalService.addVerticalRM(data).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();         
        this.getAllVertical();        
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
  
  getAllVertical(){    
    this.saveForm.value.IsActive = true;
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.VerticalList = response;
        console.log("Vertical List: ", response);                
      }
      else{
        this.VerticalList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }

  onChangeVertical(VerticalID: any){        
    this.SelectedAutoUser = [], this.arr = [];    
    
    let data: any = {
      "verticalId": VerticalID,
      "IsActive": true
    }

    this.getAllVerticalRM(data);
  }    

  getRoleWiseUser(){    
    this.commonService.getRoleWiseUser(this.Data).subscribe((response: any) => {            
      if(response){
        this.UserRoleList = response;                
        //console.log("User Role List: ", this.UserRoleList);                            
      }
      else{
        this.UserRoleList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }    

  getAllVerticalRM(data: any){
    this.SelectedAutoUser = [];    
    this.verticalService.getAllVerticalRM(data).subscribe((response: any) => {            
      if(response){
        this.VerticalRMList = response;
        let tempArr: any[] = [];
        for(let val of this.VerticalRMList){
          tempArr.push(val.autoUserId);
        } 
        
        this.SelectedAutoUser = tempArr;
        //console.log("Vertical RM List: ", this.UserRoleList);                            
      }
      else{
        this.VerticalRMList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }    
}
