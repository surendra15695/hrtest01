import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AssessmentService } from 'src/app/services/assessment/assessment.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-assessment',
  templateUrl: './create-assessment.component.html',
  styleUrls: ['./create-assessment.component.css']
})

export class CreateAssessmentComponent implements OnInit {
  CreatedBy: number;
  IsActive: boolean;
  Operation: string;
  AssessmentId: number;
  Option: string = '';
  isAssigned: boolean;
  showTemplateList: boolean = true;
  Count: number = 0;
  AssessmentTypeID: number;
  AssessmentName: string = "";
  DefineAnswer: number = 0;
  QuestionnaireList: any[] = [];
  AssessmentTypeList: any[] = [];
  AssmntQuestionTypList: any[] = [];
  AssessmentData: any[] = [];
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  DefineAnsList: any[] = [
    { id: 0, text: 'No' },
    { id: 1, text: 'Yes' }
  ]
  assessmentId: number;
  constructor(
    private spinnerService: NgxSpinnerService,
    private notiService: NotificationService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private assessmentService: AssessmentService,
    private fb: FormBuilder,
    private _route: Router, public activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
    //this.AddQuestion(); 
    this.isAssigned=true;
    this.initializeForm();
    this.getAllAssessmentType();
    this.getAssessmentQuestionTypeAll();
    this.CreatedBy = this.persistance.get('loggedinuser').autoUserId;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.assessmentId = params['AssessmentId'];
    });
    if (this.assessmentId != undefined) {
      this.getAllAssessmentData();
    }
  }

  ngOnInit() {
    
    // this.initializeForm();
    // this.getAllAssessmentType();
    // this.getAssessmentQuestionTypeAll();
  }

  onSubmit() {    
    var flag = 0;
    var msg = "";
    if (this.QuestionnaireList.length == 0 && this.AssessmentTypeID != 2) {
      flag = 1;
      msg = "Please add one question";
    }
    else {

    }
    if (this.AssessmentName == "") {
      flag = 1;
      msg = "Please enter Assessment name";
    }
    else {

    }
    if (this.AssessmentTypeID == null) {
      flag = 1;
      msg = "Please select Assessment Type";
    }
    else {

    }
    if (flag == 0) {
      this.IsActive = true;
      let temp: any[] = this.QuestionnaireList;
      // console.log("Array List: ", temp);

      const formData = new FormData();
      formData.append("AssessmentId", this.AssessmentId.toString());
      formData.append("AssessmentName", this.AssessmentName);
      formData.append("AssessmentTypeId", this.AssessmentTypeID.toString());
      formData.append("IsActive", this.IsActive.toString());
      formData.append("CreatedBy", this.CreatedBy.toString());

      let count: number = 1;
      let tempArrQD: any[] = [];
      let tempArrAQAO: any[] = [];
      for (const iterator of this.QuestionnaireList) {
        let obj: any = {
          'AssessmentQuestionId': count,
          'AssessmentId': this.AssessmentId,
          'AssessmentQuestionOrder': count,
          'AssessmentQuestion': iterator.QuestionName,
          'AssessmentQuestionTypeId': iterator.QuestionType,
          'AssessmentQuestionType': ''
        }

        if (iterator.OptionList.length == 0) {
          let objTemp: any = {
            'AssessmentQuestionAnswerOptionId': 0,
            'AssessmentId': this.AssessmentId,
            'AssessmentQuestionId': count,
            'AssessmentQuestionOrder': count,
            'AssessmentQuestionAnswerOrder': 0,
            'AssessmentAnswer': iterator.DesAnswer,
            'CorrectAnswer': true
          }

          tempArrAQAO.push(objTemp);
        }
        else {
          let i: number = 1;
          for (let record of iterator.OptionList) {
            let objTemp: any = {
              'AssessmentQuestionAnswerOptionId': i,
              'AssessmentId': this.AssessmentId,
              'AssessmentQuestionId': count,
              'AssessmentQuestionOrder': count,
              'AssessmentQuestionAnswerOrder': i,
              'AssessmentAnswer': record.OptionName,
              'CorrectAnswer': record.OptionAnswer == 'Yes' ? true : false
            }

            tempArrAQAO.push(objTemp);
            i = i + 1;
          }
        }

        tempArrQD.push(obj);
        count = count + 1;
      }

      //console.log("Question Data: ", tempArrQD);
      //console.log("Question Answer Data: ", tempArrAQAO);
      formData.append("AssessmentQuestionData", JSON.stringify(tempArrQD));
      formData.append("AssessmentQuestionAnswerOption", JSON.stringify(tempArrAQAO));

      this.spinnerService.show();
      this.assessmentService.saveAssessment(formData).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.Count = 0;
         // this.initializeForm();
          this.AddQuestion();
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
    } else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickCancel(){
    this._route.navigate(['/app/induction-assessment']);
  }
  getAllAssessmentData() {
    let obj: any = {
      'AssessmentId': Number(this.assessmentId),
      'IsActive': true
    }

    this.spinnerService.show();
    this.assessmentService.getAllAssessmentData(obj).subscribe((response: any) => {
      if (response) {
        // console.log("Assessmet Data Edit", response);
        
        this.AssessmentData = response;
        this.AssessmentId = response.assessmentId;
        this.AssessmentName = response.assessmentName;
        this.AssessmentTypeID = response.assessmentTypeId;
        //response.isAssigned==1 ? this.isAssigned=false:this.isAssigned=true;
        if(response.isAssigned==1){
          this.isAssigned=false;
        this.notiService.showError("You Can't Edit The Assessment As It Is Already Assigned.", "Error");
        }
        this.CreatedBy = response.createdBy;
        this.IsActive = response.isActive;

        if (response.assessmentQuestionDataDetails.length != 0) {
          let tempArr: any[] = [];
          let tempArrChild: any[] = [];
          let desAnswer: string = '';
          for (let record of response.assessmentQuestionDataDetails) {

            if (record.assessmentQuestionTypeId == 1 || record.assessmentQuestionTypeId == 3) {
              tempArrChild = [];
              for (let item of record.assessmentQuestionAnswerOption) {
                let obj: any = {
                  'OptionName': item.assessmentAnswer,
                  'AssessmentQuestionAnswerOptionId': item.assessmentQuestionAnswerOptionId,
                  'AssessmentQuestionAnswerOrder': item.assessmentQuestionAnswerOrder,
                  'AssessmentQuestionId': item.assessmentQuestionId,
                  'AssessmentQuestionOrder': item.assessmentQuestionOrder,
                  'OptionAnswer': item.correctAnswer == true ? 'Yes' : 'No'
                }

                tempArrChild.push(obj);
              }
            }
            // else if (record.assessmentQuestionTypeId == 3) {

            //   desAnswer = record.assessmentQuestionAnswerOption[0].correctAnswer;
            // }

            let obj: any = {
              "QuestionName": record.assessmentQuestion,
              "OptionList": tempArrChild,
              "AssessmentQuestionId": record.assessmentQuestionId,
              "AssessmentQuestionOrder": record.assessmentQuestionOrder,
              "QuestionType": record.assessmentQuestionTypeId,
              "DesAnswer": desAnswer
            }

            tempArr.push(obj);
            tempArrChild = [];
          }

          this.QuestionnaireList = tempArr;
          //  console.log("Assessment Data after Processed: ", this.QuestionnaireList);
          let index: number = 0;
          for (let data of response.assessmentQuestionDataDetails) {

            this.onChangeQuestionType(data.assessmentQuestionTypeId, index);
            index = index + 1;
          }
        }
        // console.log("Assessment Data: ", this.AssessmentData);
        this.spinnerService.hide();
      }
      else {
        this.AssessmentData = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllAssessmentType() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.assessmentService.getAllAssessmentType(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.AssessmentTypeList = response;
        //console.log("Assessment Type List: ", this.AssessmentTypeList);
        this.AssessmentTypeList.splice(0, 0, {
          assessmentTypeId: 0,
          assessmentTypeName: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.AssessmentTypeList = [];
        this.AssessmentTypeList.splice(0, 0, {
          assessmentTypeId: 0,
          assessmentTypeName: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAssessmentQuestionTypeAll() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = true;
    this.assessmentService.getAssessmentQuestionTypeAll(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.AssmntQuestionTypList = response;
        //console.log("Assessment Question Type List: ", this.AssmntQuestionTypList);                             
      }
      else {
        this.AssmntQuestionTypList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  questionType: number;
  onChangeQuestionType(evt: any, index: number) {
    this.questionType = evt;
    if (evt == 1) {
      (document.getElementById('MulDiv_' + index) as HTMLDivElement).style.display = 'block';
      (document.getElementById('DesDiv_' + index) as HTMLDivElement).style.display = 'none';
    }
    else if (evt == 3) {
      (document.getElementById('DesDiv_' + index) as HTMLDivElement).style.display = 'none';
      (document.getElementById('MulDiv_' + index) as HTMLDivElement).style.display = 'block';
    }
  }

  AddQuestion() {
    this.Count=this.QuestionnaireList.length;
    let obj: any = {
      QuestionName: "",
      QuestionType: null,
      OptionList: [],

      DesAnswer: '',
      ParentArrIndex: this.Count
    }

    this.QuestionnaireList.push(obj);
    this.Count = this.Count + 1
  }

  DeleteQuestion(index: number) {
    this.QuestionnaireList.splice(index, 1);
  }

  AddOption(pArrIndex: number,parent) {
    let obj: any = {
      "OptionName": this.Option,
      "OptionAnswer": this.DefineAnswer == 0 ? 'No' : 'Yes'
    }

    let arrObject: any = this.QuestionnaireList.find(m => m.ParentArrIndex == pArrIndex);
    if(parent.QuestionType ==1 && arrObject==undefined){
      for(var i=0;i<this.QuestionnaireList.length;i++){
        if(this.QuestionnaireList[i].AssessmentQuestionId==parent.AssessmentQuestionId){
          this.QuestionnaireList[i].OptionList.push(obj);
          this.Option = '';
          this.DefineAnswer = 0;
        }
      }
    }
    else if (parent.QuestionType == 1 && arrObject.OptionList.length < 2) {

      if (arrObject.OptionList.length == 0) {

        arrObject.OptionList.push(obj);

      } else {

        arrObject.OptionList.filter(item => {

          if (item.OptionAnswer == obj.OptionAnswer) {

            alert('Please Choose Different Define Answer');

          } else {

            arrObject.OptionList.push(obj);
          }
        })
      }
      //arrObject.OptionList.push(obj);
      this.Option = '';
      this.DefineAnswer = 0;
    }
    else if (parent.QuestionType == 3) {
      if(arrObject==undefined){
        for(var i=0;i<this.QuestionnaireList.length;i++){
          if(this.QuestionnaireList[i].AssessmentQuestionId==parent.AssessmentQuestionId){
            this.QuestionnaireList[i].OptionList.push(obj);
            this.Option = '';
            this.DefineAnswer = 0;
          }
        }
      }
      else{
      arrObject.OptionList.push(obj);
      this.Option = '';
      this.DefineAnswer = 0;
      }
    }
  }

  DeleteOption(pArrIndex: number, cArrIndex: number, option) {
    //debugger
    var i=0;
    //this.qstnarr.splice(index, 1);
    let arrObject: any = this.QuestionnaireList.find(m => m.ParentArrIndex == pArrIndex);
    if(arrObject ==undefined){
      for(i=0;i<this.QuestionnaireList.length;i++){
        if(i==pArrIndex){
          this.QuestionnaireList[i].OptionList=this.QuestionnaireList[i].OptionList.filter(e=> e.AssessmentQuestionAnswerOptionId != option.AssessmentQuestionAnswerOptionId)
        }
      }
    }
    else{
    arrObject.OptionList.splice(cArrIndex, 1);
    }
  }

  initializeForm() {
    this.isAssigned=true;
    this.AssessmentTypeID = null;
    this.AssessmentName = '';
    this.IsActive = true;
    this.AssessmentId = 0;
  }
  onBackClick() {
    this._route.navigate(['/app/induction-assessment']);
  }
  isQuestionValidation(event:any) {
    if (this.questionType == 2) {
      if (event.length <= 200) {
        return true;
      } else {
        alert('Max limit 200 words.');
        return false;
      }
    } 
  }
}
