import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/common/location/location.service';
import { FunctionService } from 'src/app/services/common/function/function.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-managelocationfunction',
  templateUrl: './managelocationfunction.component.html',
  styleUrls: ['./managelocationfunction.component.css']
})
export class ManagelocationfunctionComponent implements OnInit {

  SelectedFunction: any[] = [];
  SelectedLocation: number;
  LocationList: any[] = [];
  FunctionList: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private locationService: LocationService,
    private functionService: FunctionService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.getAllFunction();
    this.getAllLocation();
  }

  getAllLocation() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.locationService.getAllLocation(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.LocationList = response;                
      }
      else {
        this.LocationList = [];        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  getAllFunction(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.functionService.getAllVerticalFunction(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.FunctionList = response;                
      }
      else{
        this.FunctionList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  onChangeLocation(LocationID: number){    
    let Data: any = {
      "LocationId": LocationID,
      "IsActive": true
    }

    this.getAllLocationFunction(Data);
  }

  getAllLocationFunction(Data: any){    
    this.spinnerService.show();
    this.locationService.getAllLocationFunction(Data).subscribe((response: any) => {  
      console.log(response);
      if(response.length != 0){
        let TempArr: any[] = [];
        for(let item of response.filter(x=>x.isChecked==true)){
          TempArr.push(item.functionId);
        }

        this.SelectedFunction = TempArr;                               
      }
      else{
        this.SelectedFunction = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }

  onSubmit(){
    debugger          
    let strFunction: string = this.SelectedFunction.join();

    // let count: number = 0;    
    // if(this.SelectedCourse.length != 0){
    //   for(let val of this.SelectedCourse){
    //     if(count == 0){
    //       strCourse = val.toString();
    //     }
    //     else{
    //       strCourse = strCourse + ',' + val.toString();
    //     }
        
    //     count = count + 1;
    //   }
    // }

    let Data: any = {
      "LocationId": +this.SelectedLocation,
      "FunctionId": strFunction,      
    }

    this.spinnerService.show();
    this.locationService.addLocationFunction(Data).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");                
      }
      else {
        this.notiService.showError(response.msg, "Error");        
      }
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {
      this.spinnerService.hide();
      this.resetForm();
    })          
  }
  
  resetForm(){
    this.SelectedLocation = null;
    this.SelectedFunction = [];
  }

}
