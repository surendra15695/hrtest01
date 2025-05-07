import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { PositionService } from 'src/app/services/common/position/position.service'
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { FunctionService } from 'src/app/services/common/function/function.service'

declare var jQuery: any;

@Component({
  selector: 'app-manage-function-position',
  templateUrl: './manage-function-position.component.html',
  styleUrls: ['./manage-function-position.component.css']
})
export class ManageFunctionPositionComponent implements OnInit {

  SelectedPosition: any[] = [];
  SelectedFunction: number;
  PositionList: any[] = [];
  FunctionList: any[] = [];
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
    private functionService: FunctionService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.getAllFunction();
    this.getAllPosition();
  }
  getAllFunction() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.functionService.getAllVerticalFunction(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  getAllPosition() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
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

  onChangeFunction(FunctionId: number) {
    let data: any = {
      FunctionId: FunctionId
    }
    this.getAllFunctionPosition(data);
  }
  getAllFunctionPosition(Data: any) {
    this.spinnerService.show();
    this.positionService.getAllFunctionPositionList(Data).subscribe((response: any) => {
      if (response.length != 0) {
        let TempArr: any[] = [];
        for (let item of response.filter(x => x.functionId != 0)) {
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
    let strPosition: string = this.SelectedPosition.join();

    let Data: any = {
      "FunctionId": this.SelectedFunction,
      "PositionId": strPosition,
      "CreatedBy": this.createdBy
    }

    this.spinnerService.show();
    this.positionService.addFunctionPosition(Data).subscribe((response: any) => {
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
    this.SelectedFunction = null;
    this.SelectedPosition = [];
  }

}
