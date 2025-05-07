import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { PositionService } from 'src/app/services/common/position/position.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

declare var jQuery: any;

@Component({
  selector: 'app-manageverticalposition',
  templateUrl: './manageverticalposition.component.html',
  styleUrls: ['./manageverticalposition.component.css']
})
export class ManageverticalpositionComponent implements OnInit {
  SelectedPosition: any[] = [];
  SelectedVertical: number;
  PositionList: any[] = [];
  VerticalList: any[] = [];
  createdBy: number;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private verticalService: VerticalService,
    private positionService: PositionService,
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.getAllPosition();
    this.getAllVertical();
  }

  onChangeVertical(VerticalID: number) {
    let Data: any = {
      "VerticalId": VerticalID,
      "IsActive": true
    }

    this.getAllverticalPosition(Data);
  }

  getAllPosition() {
    this.spinnerService.show();
    this.saveForm.value.isActive = true;
    this.positionService.getAllPositionMaster(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.PositionList = response;
      }
      else {
        this.PositionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllVertical() {
    this.spinnerService.show();
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        //console.log("VerticalList: ", response);                
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }


  getAllverticalPosition(Data: any) {
    this.spinnerService.show();
    this.positionService.getAllverticalPositionForMapping(Data).subscribe((response: any) => {
      if (response.length != 0) {
        let TempArr: any[] = [];
       // for (let item of response.filter(x => x.verticalId == 0)) {
          for (let item of response) {
          TempArr.push(item.positionId);
        }

        this.SelectedPosition = TempArr;
      }
      else {
        this.SelectedPosition = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  onSubmit() {
    debugger
    let strFunction: string = this.SelectedPosition.join();

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
      "VerticalId": +this.SelectedVertical,
      "PositionId": strFunction,
    }

    this.spinnerService.show();
    this.positionService.addVerticalPositionList(Data).subscribe((response: any) => {
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

  resetForm() {
    this.SelectedVertical = null;
    this.SelectedPosition = [];
  }
}
