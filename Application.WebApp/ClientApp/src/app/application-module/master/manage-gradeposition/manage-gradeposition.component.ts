import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PositionService } from 'src/app/services/common/position/position.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manage-gradeposition',
  templateUrl: './manage-gradeposition.component.html',
  styleUrls: ['./manage-gradeposition.component.css']
})

export class ManageGradepositionComponent implements OnInit {

  PositionList: any[] = [];
  GradeList: any[] = [];
  SelectedPosition: any[] = [];
  data: any = {};
  arr: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });  

  constructor(
    private positionService: PositionService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) { 
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {        
    this.createForm();

    this.getAllGradePosition();    
  }

  createForm(){
    this.saveForm = this.fb.group({      
      PositionId:[null, Validators.required],
      GradeId:[null, Validators.required],      
      CreatedBy:this.createdBy
    })
  }

  onSubmit(){ 
    debugger   
    this.spinnerService.show();
    let strPositionIDs: string = '';
    let count: number = 0;
    if(this.SelectedPosition.length != 0){
      for(let val of this.SelectedPosition){
        if(count == 0){
          strPositionIDs = val.toString();
        }
        else{
          strPositionIDs = strPositionIDs + ',' + val.toString();
        }
        
        count = count + 1;
      }
    }

    let data: any = {
      "GradeId":this.saveForm.value.GradeId,
      "PositionIds":strPositionIDs,
      "IsActive":true,
      "CreatedBy":this.createdBy
    }

    this.positionService.addGradePosition(data).subscribe((response: any) => {      
      if(response.successFlag == 1){
        this.notiService.showSuccess(response.msg, "Success");
        this.createForm();
        this.SelectedPosition = [];        
        this.getAllGradePosition();                
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
  
  getAllGradePosition(){
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.positionService.getAllGradePositionNew(this.saveForm.value).subscribe((response: any) => {            
      if(response){
        this.GradeList = response; 
        //console.log("Grade List: ", this.GradeList);                            
      }
      else{
        this.GradeList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }  

  onChangeGrade(GradeID: any) {
    this.SelectedPosition = [], this.arr = [];
    let dataObj: any = this.GradeList.find(m => m.gradeId == GradeID);
    if (dataObj.positionIds.length > 0) {
      let TempArr: any[] = dataObj.positionIds.split(',');
      for (let positionID of TempArr) {
        this.arr.push(+positionID);
      }
    }
    
    
    this.getAllPositionMaster();
  }

  getAllPositionMaster(){
    this.spinnerService.show();
    this.data.IsActive = true;
    this.positionService.getAllPositionMaster(this.data).subscribe((response: any) => {            
      if(response){
        this.PositionList = response; 
        this.SelectedPosition = this.arr;        
        //console.log("Position List: ", this.PositionList);                            
      }
      else{
        this.PositionList = [];        
      }      
    }, error => {      
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);      
    }, () => {      
      this.spinnerService.hide();
    })
  }    
}
