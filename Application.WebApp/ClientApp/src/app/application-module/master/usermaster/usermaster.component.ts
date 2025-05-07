import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { IUserMaster } from '../../../interfaces/common/user';
import {UserService}from '../../../services/common/user/user.service';
import { Router } from '@angular/router'
declare var jQuery: any;
@Component({
  selector: 'app-usermaster',
  templateUrl: './usermaster.component.html',
  styleUrls: ['./usermaster.component.css']
})
export class UsermasterComponent implements OnInit {
  saveForm = new FormGroup({
    Password: new FormControl(''),  
    EmailId: new FormControl('')
  });
  
  submitted = false;
  showTable: boolean = false;
  //USER MASTER
usermaster: IUserMaster[] = [];
selectedUserMaster: IUserMaster;  
  constructor(private userMasterService:UserService,
    private fb: FormBuilder,private router: Router) { }

  ngOnInit() {
    this.saveForm =this.fb.group({
      Password: ['', [Validators.required]],
       EmailId: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
   }); 
}
onSubmit()
  {   
    this.userMasterService.saveUserMaster(this.saveForm.value).subscribe((result) => {
      // display form values on success
      alert('User saved successfully..');
      this.router.navigateByUrl("candidate/add");
        console.log(result);
      }, error => {
         // display form values on success
      alert('Something went wrong.. Try again later');
        console.log(error);
      });
      }
}
