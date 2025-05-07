import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
import { Router } from '@angular/router';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';
import { AssessmentService } from 'src/app/services/assessment/assessment.service';
import { IAssessmentList, ICandidateList, ISearchAssessment, ISearchCandidate } from '../../../interfaces/common/inductionassessment.interface';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch, ITrainingTittle, IsearchTrainingTittle, IsearchTrainingTittleGetAll } from '../../../interfaces/common/common.interface';
import { IVertical } from 'src/app/interfaces/common/vertical.interface';

declare var jQuery: any;

@Component({
  selector: 'app-induction-feedback',
  templateUrl: './induction-feedback.component.html',
  styleUrls: ['./induction-feedback.component.css']
})

export class InductionFeedbackComponent implements OnInit {

  TempInductionFeedbackList: any[] = [];
  InductionFeedbackList: any[] = [];
  InductionTrainingList: any[] = [];
  BatchList: any[] = [];
  FeedBackName: string;
  Operation: string;
  createdBy: number;
  searchformScheduledBatchWise: FormGroup;
  saveFormBatch = new FormGroup({
    Name: new FormControl('')
  });
  trainingTittleListGetAll:any;
  saveFormSchRealease = new FormGroup({
    Name: new FormControl('')
  });
  del_FeedbackId: number;
  del_FeedbackTypeId: number;
  assessmentAssignSaveForm: FormGroup;
  batchs: IBatch[] = [];
  Candidateverticals: IVertical[] = [];
  candidateList: ICandidateList[] = [];
  searchCandidate: ISearchCandidate = {
    candidateId: null,
    onBordingMangerId: null,
    onBordingCoordinatorId: null,
    candidateName: "",
    verticalId: null,
    locationId: null,
    functionId: null,
  }
  searchTrainingTittleGetAll:IsearchTrainingTittleGetAll = {
    trainingTittleId:0,
    IsActive:null
  }
  trainingTittleList: ITrainingTittle[] = [];
  searchTrainingTittle: IsearchTrainingTittle = {
    batchId: null,
    candidateId: null
  }
  showCandidateAssign: boolean = true;
  showScheduleRelease: boolean = true;

  constructor(
    private assessmentService: AssessmentService,
    private spinnerService: NgxSpinnerService,
    private feedbackService: FeedbackService,
    private notiService: NotificationService,
    private persistance: PersistanceService,
    private fb: FormBuilder,
    private router: Router,
    private commonService: CommonService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.createScheduledBatchwiseSearchForm();
    this.initializeBatchAssigning();
    this.initializeCandiadteAssigning();
    this.initializeSchRealease();
    this.getAllFeedback();
   /* this.getAllBatch();*/
    //this.getAllCandidate();
    this.getAllVerticalsCandidate();
    this.getAllVerticals();
    this.getAllVerticals();
    this.getAllTrainingTittleGetAll()
  }

  ngOnInit() {
    this.loadDataTable();

  }

  initializeBatchAssigning() {
    this.saveFormBatch = this.fb.group({
      FeedBackId: null,
      FeedBackTypeId: null,
      vertical: null,
      //BatchId: [null, Validators.required],
      CandidateId: null,
      trainingTittleId:null,
      CandidateInductionScheduleDetailsId:0,
      CreatedBy: this.createdBy
    })
  }
  initializeCandiadteAssigning() {
    this.assessmentAssignSaveForm = this.fb.group({
      // assessmentId: null,
      // batchId: null,
      // candidateId: [null, Validators.required],
      // candidateInductionScheduleDetailsId: null,
      vertical: null,
      trainingTittleId:null,
      FeedBackId: null,
      FeedBackTypeId: null,
      //BatchId: null,
      CandidateId: [null, Validators.required],
      CandidateInductionScheduleDetailsId: 0,
      createdBy: this.createdBy
    });
  }
  getAllTrainingTittleGetAll() {
    this.spinnerService.show();
    this.commonService.getAllTrainingTittleList(this.searchTrainingTittleGetAll).subscribe((response: any) => {
      if (response) {
        this.trainingTittleListGetAll = response;
      }
      else {
        this.trainingTittleListGetAll = [];
      }
    }, error => {
      this.spinnerService.hide();
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      //this.loadDataTable();
      this.spinnerService.hide();
    })
  }
  initializeSchRealease() {
    this.saveFormSchRealease = this.fb.group({
      NumberOfDays: [0, Validators.required],
      FeedBackId: [0],
      FeedBackTypeId: [0],
      FeedBackScheduleId: [0],
      CreatedBy: this.createdBy
    })
  }

  onClickBatchAssign(data: any) {
    this.FeedBackName = data.feedBackName;
    // this.saveFormBatch.value.FeedBackId = data.feedBackId;
    // this.saveFormBatch.value.FeedBackTypeId = data.feedBackTypeId;
    this.saveFormBatch.patchValue({
      FeedBackId: data.feedBackId,
      FeedBackTypeId: data.feedBackTypeId,
      CandidateId:0
      //BatchId:1
    })
  }
  onClickCandidateAssign(data: any) {
    this.FeedBackName = data.feedBackName;
    // this.assessmentAssignSaveForm.value.FeedBackId = data.feedBackId;
    // this.assessmentAssignSaveForm.value.FeedBackTypeId = data.feedBackTypeId;
    this.assessmentAssignSaveForm.patchValue({
      FeedBackId: data.feedBackId,
      FeedBackTypeId: data.feedBackTypeId,
      CandidateId:1,
      //BatchId:0
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  verticals: IVertical[] = [];
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate Batch", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant Batch", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing Batch", isActive: true });
  }
  getAllVerticalsCandidate() {
    this.Candidateverticals = [];
    this.Candidateverticals.push({ verticalId: 1, verticalName: "Corporate Individual", isActive: true });
    this.Candidateverticals.push({ verticalId: 2, verticalName: "Plant Individual", isActive: true });
    this.Candidateverticals.push({ verticalId: 3, verticalName: "Sales & Marketing Individual", isActive: true });
  } 
  getVerticalWiseBatch(evt) {
    this.getAllBatch(evt);
  }
  getVerticalWiseCandidate(evt) {
    this.getAllCandidate(evt);
  }
  FeedBackAssignSave() {
    this.spinnerService.show();
     console.log("Batch Assign Obj", this.saveFormBatch.value);
    this.feedbackService.feedBackAssignSave(this.saveFormBatch.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.initializeBatchAssigning();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
      jQuery("#myModalTwo").modal("hide");
    })
  }
  onSubmitAssignFeedback() {
    this.spinnerService.show();
    // console.log("Candidate Assign Obj", this.assessmentAssignSaveForm.value);

    this.feedbackService.feedBackAssignSave(this.assessmentAssignSaveForm.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.initializeCandiadteAssigning();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
      jQuery("#assignToCandidateModal").modal("hide");
    })
  }

  onClickScheduleRelease(data: any) {
    this.FeedBackName = data.feedBackName;
    this.saveFormSchRealease.patchValue({
      FeedBackId: data.feedBackId,
      FeedBackTypeId: data.feedBackTypeId,
      // NumberOfDays:0
    });
    let obj = {
      FeedBackId: data.feedBackId,
      FeedBackTypeId: data.feedBackTypeId,
    }
    this.getFeebackScheduleData(obj);
  }
  getFeebackScheduleData(obj: any) {
    this.feedbackService.feedBackScheduleGetAll(obj).subscribe((response: any) => {
      if (response) {
        // console.log("Schedule Data", response);
        this.saveFormSchRealease.patchValue({
          NumberOfDays: response.numberOfDays,
          FeedBackScheduleId: response.feedBackScheduleId
        });
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      // jQuery("#myModalOne").modal("hide");
      this.spinnerService.hide();
    })
  }

  FeedBackScheduleSave() {
    debugger
    this.spinnerService.show();
    this.saveFormSchRealease.patchValue({
      NumberOfDays: Number(this.saveFormSchRealease.value.NumberOfDays)
    });
    this.feedbackService.feedBackScheduleSave(this.saveFormSchRealease.value).subscribe((response: any) => {
      if (response.successFlag == 1) {
        this.notiService.showSuccess(response.msg, "Success");
        this.initializeSchRealease();
        this.getAllFeedback();
      }
      else {
        this.notiService.showError(response.msg, "Error");
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      jQuery("#myModalOne").modal("hide");
      this.spinnerService.hide();
    })
  }
  createScheduledBatchwiseSearchForm() {
    this.searchformScheduledBatchWise = this.fb.group({
      batchNo: [''],
      onBordingMangerId: null,
      onBordingCoordinatorId: null,
      verticalId: null,
      dtofJoiningFrom: [''],
      dtofJoiningTo: ['']
    });
  }
  getAllBatch(verticalId) {
    this.batchs = [];
    this.spinnerService.show();
    // let Data: any = {
    //   IsActive: true
    // }
    this.assessmentService.getAllBatch(this.searchformScheduledBatchWise.value).subscribe((response: any) => {
      if (response) {
        this.BatchList = response;
        // console.log("Batch List: ", this.BatchList);
        this.batchs = response.filter(x => x.vertical == verticalId);
      }
      else {
        this.BatchList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }
  getAllCandidate(verticalId) {
    this.candidateList = [];
    this.assessmentService.getCandidateList(this.searchCandidate).subscribe((result) => {
      if (result) {
        this.candidateList = result;
        // console.log("Candidate list", this.candidateList);
        this.candidateList = result.filter(x => x.verticalId == verticalId);
        this.spinnerService.hide();
      }
      else {
        this.candidateList = [];
        this.spinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.spinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.spinnerService.hide();
    });
  }
  onChangeCandidate() {
    this.assessmentAssignSaveForm.patchValue({
      candidateInductionScheduleDetailsId: null
    })
    this.searchTrainingTittle.batchId = null;
    this.searchTrainingTittle.candidateId = this.assessmentAssignSaveForm.get("CandidateId").value;
    this.getAllTrainingTittle();
  }
  getAllTrainingTittle() {
    this.trainingTittleList = [];
    // console.log("Search Candiadte obj", this.searchTrainingTittle);

    this.commonService.getAllTrainingTittle(this.searchTrainingTittle).subscribe((result) => {
      if (result) {
        this.trainingTittleList = result;
        // console.log("Traning Tittle", this.trainingTittleList);

      }
      else {
        // this.batchs = [];
      }
    }, error => {
      console.log(error);
    }, () => {

    });
  }
  onChangeBatch(BatchID: number) {
    let Data: any = {
      BatchId: BatchID
    }

    this.getInductionTraingingList(Data);
  }

  getInductionTraingingList(Data: any) {
    this.spinnerService.show();
    this.assessmentService.getInductionTraingingList(Data).subscribe((response: any) => {
      if (response) {
        this.InductionTrainingList = response;
        // console.log("Induction Training List: ", this.InductionTrainingList);
      }
      else {
        this.InductionTrainingList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
    })
  }

  getAllFeedback() {
    this.spinnerService.show();
    let Data: any = {
      IsActive: null
    }
    this.feedbackService.getFeedbackList(Data).subscribe((response: any[]) => {
      if (response) {
        if (response.length != 0) {
          this.TempInductionFeedbackList = response;
          this.InductionFeedbackList = this.TempInductionFeedbackList.filter(m => m.feedBackTypeId == 1);
          // console.log("All Feedback List: ", response);
        }
      }
      else {
        this.InductionFeedbackList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  newFeedback() {
    this.router.navigateByUrl('/app/admin/feedback');
  }

  editFeedBackForm(data: any) {
    this.router.navigateByUrl('/app/admin/feedback?FeedbackID=' + data.feedBackId);
  }

  onClickJoinerType(FeedBackType: string) {
    if (FeedBackType == 'I') {
      this.InductionFeedbackList = this.TempInductionFeedbackList.filter(m => m.feedBackTypeId == 1);
      this.showCandidateAssign = true;
      this.showScheduleRelease = true;
    }
    else {
      this.InductionFeedbackList = this.TempInductionFeedbackList.filter(m => m.feedBackTypeId == 2);
      this.showCandidateAssign = false;
      this.showScheduleRelease = false;
    }
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
  onClickDelete(record) {
    this.del_FeedbackId = record.feedBackId;
    this.del_FeedbackTypeId = record.feedBackTypeId;
  }
  onClickConfirmatin(value) {
    if (value == "Y") {
      let delObj = {
        FeedBackId: this.del_FeedbackId,
        FeedbackTypeId: this.del_FeedbackTypeId
      }
      this.feedbackService.deleteFeedback(delObj).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.getAllFeedback();
        }
        else {
          this.notiService.showError(response.msg, "Error");
        }
      }, error => {
        this.notiService.showError("Something went wrong.. Try again later..", "");
        this.spinnerService.hide();
        console.log(error);
      }, () => {
        // jQuery("#myModalOne").modal("hide");
        this.spinnerService.hide();
      })

    }

  }
}
