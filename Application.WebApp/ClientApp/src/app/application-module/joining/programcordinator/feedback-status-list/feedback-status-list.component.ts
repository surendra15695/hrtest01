import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IBatchesAssementFeedbackDetailsList, IEvaluateFeedbackListBatch, ISearchEvaluateFeedbackListBatch } from 'src/app/interfaces/joining/programcoordinator.interface';
import { ProgramcoordinatorService } from 'src/app/services/joining/programcoordinator/programcoordinator.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';

@Component({
  selector: 'app-feedback-status-list',
  templateUrl: './feedback-status-list.component.html',
  styleUrls: ['./feedback-status-list.component.css']
})
export class FeedbackStatusListComponent implements OnInit {
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  batchId: number;
  candidateId: number;
  coordinatorId: string;
  type: string;
  evaluateFor: string;
  activeTabName: string;
  searchEvaluateFeedback: ISearchEvaluateFeedbackListBatch = {
    batchId: null,
    candidateId: null,
    coOrdinatiorId: null,
  }
  evaluateFeedbackListBatch: IEvaluateFeedbackListBatch;
  evaluateFeedbackDetails: IBatchesAssementFeedbackDetailsList[] = [];

  constructor(
    private persistance: PersistanceService,
    private _route: Router,
    private SpinnerService: NgxSpinnerService, 
    public activatedRoute: ActivatedRoute,
    private programcoordinatorService: ProgramcoordinatorService,
  ) { 
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid'); 
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.batchId = params['BatchId'];
      this.candidateId = params['CandidateId'];
      this.coordinatorId = params['CoOrdinatiorId'];
      this.type = params['Type'];
    });
    if (this.evaluateFor == "Candidate") {
      this.searchEvaluateFeedback.candidateId = Number(this.candidateId);
    } else {
      this.searchEvaluateFeedback.batchId = Number(this.batchId);
    }
    this.searchEvaluateFeedback.coOrdinatiorId = Number(this.coordinatorId);
    this.getEvaluateFeedbackListBatchwise();
  }

  ngOnInit() {
  }
  getEvaluateFeedbackListBatchwise() {
    this.programcoordinatorService.getEvaluateFeedbackListBatchwise(this.searchEvaluateFeedback).subscribe((result) => {
      if (result) {
        this.evaluateFeedbackListBatch = result;
        this.evaluateFeedbackDetails = this.evaluateFeedbackListBatch.batchesFeedbackDetailsList;
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  onClickBack() {
    if (this.type == "Corporate") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/corporate/induction-assessment-list']);
    } else if (this.type == "Plant") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/plant/induction-assessment-list']);
    } else if (this.type == "Sales") {
      this.persistance.set('activeTabName', this.activeTabName);
      this._route.navigate(['/app/sales/induction-assessment-list']);
    }
  }

}
