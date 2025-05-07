import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssessmentService } from 'src/app/services/assessment/assessment.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})

export class FeedbackComponent implements OnInit {

  CreatedBy: number;
  IsActive: boolean;
  Operation: string;
  FeedbackID: number = 0;
  FeedBackData: any;
  Count: number = 0;
  FeedbackType: number;
  FeedbackName: string;
  QuestionOrOption: string = '';
  FeedbackQuestionnireList: any[] = [];
  FeedbackTypeList: any[] = [
    { id: 1, text: 'Individual' },
    { id: 2, text: 'Batch' }
  ];
  FeedbackQuestionTypList: any[] = [];
  FeedbackQuestionRatingOptionList: any[] = [];
  FeedbackQuestionOptionOptionList: any[] = [];
  AssessmentData: any[] = [];
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  constructor(
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private persistance: PersistanceService,
    private assessmentService: AssessmentService,
    private feedbackService: FeedbackService,
    private router: Router,
    private fb: FormBuilder,
    private _route: Router,
  ) {
    this.CreatedBy = this.persistance.get('loggedinuser').autoUserId;
    this.getFeedBackQuestionOption(1);
    this.getFeedBackQuestionOption(2);
  }

  ngOnInit() {
    this.initializeForm();
    this.activatedRoute.queryParams.subscribe(param => {
      let TempVal: any = param["FeedbackID"];

      if (TempVal == undefined || TempVal == null) {
        this.AddSection();
        this.Operation = 'insert';
      }
      else {
        this.FeedbackID = TempVal;
        this.Operation = 'update';
        this.getFeedbackData(this.FeedbackID);
      }
    });

    this.getFeedbackQuestionType();
  }

  getFeedbackData(FeedBackID: number) {
    this.spinnerService.show();
    let data: any = {
      FeedBackId: Number(FeedBackID),
      IsActive: true
    };
    this.feedbackService.getFeedbackData(data).subscribe((response: any) => {
      if (response) {
        this.FeedBackData = response;
        
        this.FeedbackID = this.FeedBackData.feedBackMasterData.feedBackId;
        this.FeedbackName = this.FeedBackData.feedBackMasterData.feedBackName;
        this.FeedbackType = this.FeedBackData.feedBackMasterData.feedbackTypeId;

        let TempParentArr: any[] = [];
        for (let item of this.FeedBackData.feedBackQuestionDataDetails) {
          let TempChildArr: any[] = [];
          let childArrObj: any = {
            "QuestionOrOption": item.feedBackQuestion
          }

          TempChildArr.push(childArrObj);
          let parentArrobj: any = {
            QuestionTypeID: item.feedBackQuestionTypeId,
            ScaleID: item.feedBackQuestionTypeOptionId,
            QuestionOrOption: '',
            ParentArrIndex: item.feedBackQuestionOrder,
            QuestionOrOptionList: TempChildArr
          }

          TempParentArr.push(parentArrobj);
        }

        this.Count = TempParentArr.length + 1;
        this.FeedbackQuestionnireList = TempParentArr;
        //console.log("TempParentArr: ", TempParentArr);
        //console.log("Feedback Data: ", this.FeedBackData);                             
      }
      else {
        this.FeedBackData = {};
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getFeedbackQuestionType() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.feedbackService.getFeedbackQuestionType(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.FeedbackQuestionTypList = response;
        //console.log("Feedback Question Type List: ", this.FeedbackQuestionTypList);                             
      }
      else {
        this.FeedbackQuestionTypList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getFeedBackQuestionOption(qTypeID: number) {
    this.spinnerService.show();
    let Data: any = {
      FeedBackQuestionTypeId: qTypeID
    }
    this.feedbackService.getFeedBackQuestionOption(Data).subscribe((response: any) => {
      if (response) {
        if (Data.FeedBackQuestionTypeId == 1) { this.FeedbackQuestionRatingOptionList = response.filter(e => e.feedBackQuestionTypeOptionId >= 3); }
        else if (Data.FeedBackQuestionTypeId == 2) { this.FeedbackQuestionOptionOptionList = response; }
        //console.log("Feedback Question Option List: ", response);                             
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  onSubmit() {
    //console.log("Feedback Questionnire List: ", this.FeedbackQuestionnireList);

    const formData = new FormData();
    formData.append("FeedBackId", this.FeedbackID.toString());
    formData.append("FeedBackName", this.FeedbackName);
    formData.append("FeedBackTypeId", this.FeedbackType.toString());
    formData.append("IsActive", this.IsActive.toString());
    formData.append("CreatedBy", this.CreatedBy.toString());
    formData.append("IsEnabled","false");
    let parentCount: number = 1;
    let tempArr: any[] = [];
    let questionOrder: number = 1;

    for (const iterator of this.FeedbackQuestionnireList) {
      if (this.FeedbackQuestionnireList.length != 0) {
        for (let val of iterator.QuestionOrOptionList) {
          let obj: any = {
            'FeedBackQuestionId': 0,
            'FeedBackId': this.FeedbackID,
            'FeedBackQuestionOrder': questionOrder,
            'FeedBackQuestionTypeId': iterator.QuestionTypeID,
            'FeedBackQuestionTypeName': '',
            'FeedBackQuestionTypeOptionId': iterator.QuestionTypeID == 3 ? 0 : iterator.ScaleID,
            'FeedBackQuestionOptionTypeName': '',
            'FeedBackQuestion': val.QuestionOrOption
          }

          questionOrder = questionOrder + 1;
          tempArr.push(obj);
        }
      }

      parentCount = parentCount + 1;
    }

    formData.append("FeedbackQuestionData", JSON.stringify(tempArr));
    this.spinnerService.show();
    this.feedbackService.saveFeedback(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.Count = 0;
        this.initializeForm();
        this.FeedbackQuestionnireList = [];
        this.AddSection();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  onChangeQuestionType(evt: any, index: number) {
    if (evt == 1) {
      (document.getElementById('MulDiv_' + index) as HTMLDivElement).style.display = 'block';
      (document.getElementById('DesDiv_' + index) as HTMLDivElement).style.display = 'none';
    }
    else if (evt == 3) {
      (document.getElementById('DesDiv_' + index) as HTMLDivElement).style.display = 'block';
      (document.getElementById('MulDiv_' + index) as HTMLDivElement).style.display = 'none';
    }
  }

  AddSection() {
    let obj: any = {
      QuestionTypeID: null,
      ScaleID: null,
      QuestionOrOption: "",
      QuestionOrOptionList: [],

      ParentArrIndex: this.Count
    }

    this.FeedbackQuestionnireList.push(obj);
    this.Count = this.Count + 1
  }

  AddOptionOrQuestion(parentArrIndex: number) {
    if (this.FeedbackQuestionnireList[parentArrIndex].QuestionOrOption.trim() == '') {
      (document.getElementById('txtQuestion_' + parentArrIndex) as HTMLInputElement).focus();
      this.notiService.showError("Enter question please!", "");
      return false;
    }
    else {
      let obj: any = {
        "QuestionOrOption": this.FeedbackQuestionnireList[parentArrIndex].QuestionOrOption,
      }

      let tempParentArrIndex: number;
      if (this.Operation == 'insert') { tempParentArrIndex = parentArrIndex; }
      else { tempParentArrIndex = parentArrIndex + 1; }
      let arrObject: any = this.FeedbackQuestionnireList.find(m => m.ParentArrIndex == tempParentArrIndex);
      arrObject.QuestionOrOptionList.push(obj);
      this.FeedbackQuestionnireList[parentArrIndex].QuestionOrOption = '';
    }
  }

  DeleteQuestionOrOption(pArrIndex: number, cArrIndex: number) {
    let tempParentArrIndex: number;
    if (this.Operation == 'insert') { tempParentArrIndex = pArrIndex; }
    else { tempParentArrIndex = pArrIndex + 1; }
    let arrObject: any = this.FeedbackQuestionnireList.find(m => m.ParentArrIndex == tempParentArrIndex);
    arrObject.QuestionOrOptionList.splice(cArrIndex, 1);
  }

  DeleteSection(pArrIndex: number) {
    this.FeedbackQuestionnireList.splice(pArrIndex, 1);
  }

  CancelFeedback() {
    this.FeedbackQuestionnireList;
    this.AddSection();
  }

  SaveAsDraft(){
    const formData = new FormData();
    formData.append("FeedBackId", this.FeedbackID.toString());
    formData.append("FeedBackName", this.FeedbackName);
    formData.append("FeedBackTypeId", this.FeedbackType.toString());
    formData.append("IsActive", this.IsActive.toString());
    formData.append("CreatedBy", this.CreatedBy.toString());
    formData.append("IsEnabled","true");
    let parentCount: number = 1;
    let tempArr: any[] = [];
    let questionOrder: number = 1;

    for (const iterator of this.FeedbackQuestionnireList) {
      if (this.FeedbackQuestionnireList.length != 0) {
        for (let val of iterator.QuestionOrOptionList) {
          let obj: any = {
            'FeedBackQuestionId': 0,
            'FeedBackId': this.FeedbackID,
            'FeedBackQuestionOrder': questionOrder,
            'FeedBackQuestionTypeId': iterator.QuestionTypeID,
            'FeedBackQuestionTypeName': '',
            'FeedBackQuestionTypeOptionId': iterator.QuestionTypeID == 3 ? 0 : iterator.ScaleID,
            'FeedBackQuestionOptionTypeName': '',
            'FeedBackQuestion': val.QuestionOrOption
          }

          questionOrder = questionOrder + 1;
          tempArr.push(obj);
        }
      }

      parentCount = parentCount + 1;
    }

    formData.append("FeedbackQuestionData", JSON.stringify(tempArr));
    this.spinnerService.show();
    this.feedbackService.saveFeedback(formData).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.Count = 0;
        this.initializeForm();
        this.FeedbackQuestionnireList = [];
        this.AddSection();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  initializeForm() {
    this.FeedbackType = null;
    this.FeedbackName = '';
    this.IsActive = true;
    this.FeedbackID = 0;
  }
  onBackClick() {
    this._route.navigate(['/app/induction-feedback']);
  }
}
