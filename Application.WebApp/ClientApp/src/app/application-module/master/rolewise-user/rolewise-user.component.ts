import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { UserService } from 'src/app/services/common/user/user.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';

declare var jQuery: any;

@Component({
  selector: 'app-rolewise-user',
  templateUrl: './rolewise-user.component.html',
  styleUrls: ['./rolewise-user.component.css']
})

export class RolewiseUserComponent implements OnInit {

  UserList: any[] = [];
  RoleList: any[] = [
    {roleId:1, roleName:'Orboarding Manager'},
    {roleId:2, roleName:'Onboarding Cordinator'},
    {roleId:3, roleName:'Program Cordinator'}
  ];
  VerticalList: any[] = [];
  SelectedUserRole: number = 0;
  SelectedVerticalID: number = 0;
  SelectedUserList: any[] = [];
  createdBy: number;
  data: any = {};
  RoleID: number;

  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private userService: UserService,
    private verticalService: VerticalService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private commonService: CommonService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() { 
    this.createForm(); 
          
    this.getAllVertical();
  }  

  createForm(){
    this.saveForm = this.fb.group({
      AutoUserId:[null, Validators.required],
      RoleId:[null, Validators.required], 
      VerticalId:[null, Validators.required],      
      CreatedBy:this.createdBy
    })
  }

  onChangeUserRole(UserRoleID: any){         
    this.SelectedUserRole = UserRoleID;
    if(this.SelectedVerticalID != 0){
      if(this.SelectedUserRole == 1 && this.SelectedVerticalID == 1){ this.RoleID = 21; }
      else if(this.SelectedUserRole == 1 && this.SelectedVerticalID == 2){ this.RoleID = 22; }
      else if(this.SelectedUserRole == 1 && this.SelectedVerticalID == 3){ this.RoleID = 23; }
      else if(this.SelectedUserRole == 2 && this.SelectedVerticalID == 1){ this.RoleID = 24; }
      else if(this.SelectedUserRole == 2 && this.SelectedVerticalID == 2){ this.RoleID = 25; }
      else if(this.SelectedUserRole == 2 && this.SelectedVerticalID == 3){ this.RoleID = 36; }
      else if(this.SelectedUserRole == 3 && this.SelectedVerticalID == 1){ this.RoleID = 28; }
      else if(this.SelectedUserRole == 3 && this.SelectedVerticalID == 2){ this.RoleID = 29; }
      else { this.RoleID = 29; }
      let data: any = {
        "RoleId": this.RoleID,
        "IsActive": true
      }
  
      this.getAllUser(data);
      this.getRoleWiseUser(data);
    }                  
  }    

  getAllVertical(){    
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.VerticalList = response;
        //console.log("Vertical List: ", response);                
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
    this.SelectedVerticalID = VerticalID;    
    if(this.SelectedUserRole != 0){
      if(this.SelectedUserRole == 1 && this.SelectedVerticalID == 1){ this.RoleID = 21; }
      else if(this.SelectedUserRole == 1 && this.SelectedVerticalID == 2){ this.RoleID = 22; }
      else if(this.SelectedUserRole == 1 && this.SelectedVerticalID == 3){ this.RoleID = 23; }
      else if(this.SelectedUserRole == 2 && this.SelectedVerticalID == 1){ this.RoleID = 24; }
      else if(this.SelectedUserRole == 2 && this.SelectedVerticalID == 2){ this.RoleID = 25; }
      else if(this.SelectedUserRole == 2 && this.SelectedVerticalID == 3){ this.RoleID = 36; }
      else if(this.SelectedUserRole == 3 && this.SelectedVerticalID == 1){ this.RoleID = 28; }
      else if(this.SelectedUserRole == 3 && this.SelectedVerticalID == 2){ this.RoleID = 29; }
      else { this.RoleID = 30; }
      let data: any = {
        "RoleId": this.RoleID,
        "IsActive": true
      }
  
      this.getAllUser(data);      
    }                      
  }
  
  getAllUser(data: any) {
    this.spinnerService.show();
    this.userService.getAllUser(data).subscribe((response: any) => {
      if (response.length != 0) {
        this.UserList = response; 
        this.getRoleWiseUser(data);               
        //console.log("User List: ", this.UserList);
      }
      else {
        this.UserList = [];        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.spinnerService.hide();
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }    

  onSubmit(){                      
    let data: any = {
      AutoUserId: this.saveForm.value.AutoUserId.join(),
      RoleId: this.RoleID,
      CreatedBy: this.createdBy
    }
    
    this.spinnerService.show();  
    // this.userService.saveRoleWiseUser(data).subscribe((response: any) => {
    //   if (response.successFlag == 1) {        
    //     this.notiService.showSuccess(response.msg, "Success");        
    //     this.createForm();
    //     this.SelectedUserList = [];
    //     this.SelectedUserRole = 0;
    //     this.SelectedVerticalID = 0;                       
    //   }
    //   else {
    //     this.notiService.showError(response.msg, "Error");        
    //   }
    // }, error => {      
    //   this.notiService.showError("Something went wrong.. Try again later..", "")
    //   console.log(error);      
    // }, () => {
    //   this.spinnerService.hide();      
    // })          
  }
  
  getRoleWiseUser(Data: any){    
    this.commonService.getRoleWiseUser(Data).subscribe((response: any) => {            
      if(response){
        let TempArr: any[] = [];
        if(response.length != 0){          
          for(let record of response){
            TempArr.push(+record.autoUserId);
          }
        }
        this.SelectedUserList = TempArr;                
        //console.log("Saved User List: ", response);                            
      }
      else{
        this.SelectedUserList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    })
  }    
}
