import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {
  ISearchSalaryAccountHead, ISalaryAccountHead, ISalaryFormula, ISalaryArray, ISalaryTemplateMasterData,
  ISearchSalaryTemplate, ISalaryTemplateList, ICalculateSalary, ISalaryTemplateDetails, ISearchCalculateSalary,
} from '../../../interfaces/common/paystructure.interface'
import { PaystructureService } from 'src/app/services/common/paystructure/paystructure.service';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { ICandidateSalaryFitmentSalaryDetails, ICandidateSalaryFitmentSalaryDetailsFormat, ISearchSalaryFitment } from '../../../interfaces/offer/candidatesalaryfitment.interface'
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { SalaryfitmentService } from '../../../services/offer/salaryfitment/salaryfitment.service';
import { IcandidateremarksList } from 'src/app/interfaces/preselection/candidate.interface';
declare var jQuery: any;

@Component({
  selector: 'app-salaryacceptance',
  templateUrl: './salaryacceptance.component.html',
  styleUrls: ['./salaryacceptance.component.css']
})
export class SalaryacceptanceComponent implements OnInit {
  searchSalaryFitment: ISearchSalaryFitment = {
    salaryFitmentId: null,
    requsitaionDetailsId: null,
    candidateId: null
  }
  remarksDetails:IcandidateremarksList={
    CandidateId: 0,
    RequisitionDetailId: 0,
    HiringStatusId: 0,
    IsActive: false
  }
  candidateremarksList: any[]=[];
  savedSalaryData: any;
  createdBy: number;
  candidateId: number;
  salaryAcceptance: number;
  Acceptance: number;
  remarks: string;
  salaryFitmentDetailsId: number;
  selectedCandidateDesignationText: string;
  selectedCandidatelocationText: string;
  selectedCandidateprobationText: string;
  selectedCandidateGradeText: string;

  salaryFitmentId: number;
 
  constructor(
    private _route: Router,
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
    private requisitionService: RequisitionService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private salaryFitmentService: SalaryfitmentService,
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.getSalaryFiltmentList();
    this.salaryAcceptance = 1;
  }

  ngOnInit() {
    this.getRemarksDetails();
  }

  getSalaryFiltmentList() {
    this.searchSalaryFitment.candidateId = this.candidateId;
    this.salaryFitmentService.getSalaryFitment(this.searchSalaryFitment).subscribe((response: any) => {
      if (response) {
        this.savedSalaryData = response;
        console.log(this.savedSalaryData.salaryFitmentRemaks);
        for (var i = 0; i < this.savedSalaryData.salaryFitmentDetails.length; i++) {
          this.Acceptance = this.savedSalaryData.salaryFitmentDetails[i].acceptance;
          this.salaryFitmentId = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentId;
          this.salaryFitmentDetailsId = this.savedSalaryData.salaryFitmentDetails[i].salaryFitmentDetailsId;
          this.selectedCandidateDesignationText = this.savedSalaryData.salaryFitmentDetails[i].designationName;
          // this.selectedCandidatelocationText = this.savedSalaryData.salaryFitmentDetails[0].locationOffice;
          // this.selectedCandidateprobationText = this.savedSalaryData.salaryFitmentDetails[0].probationName;
          // this.selectedCandidateGradeText = this.savedSalaryData.salaryFitmentDetails[0].gradeName;  //added by arghya on 29.06.2022
          this.selectedCandidatelocationText = this.savedSalaryData.salaryFitmentDetails[i].locationOffice;  // Modified below 3 line by anif 08-08-2022
          this.selectedCandidateprobationText = this.savedSalaryData.salaryFitmentDetails[i].probationName;
          this.selectedCandidateGradeText = this.savedSalaryData.salaryFitmentDetails[i].gradeName;  //
        }
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    })
  }
  getRemarksDetails(){   
    this.remarksDetails={
      CandidateId: this.candidateId,
      RequisitionDetailId: 0,
      HiringStatusId: 0,
      IsActive: false
    }
    this.requisitionService.getCandidateHigringAction(this.remarksDetails).subscribe((result) => {
      if (result) {
        this.candidateremarksList = result;
        console.log("Remarks Details-",result);
      }
      else {
        this.candidateremarksList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  onSubmit() {
    var flag = 0;
    var msg = "";
    if (this.salaryAcceptance == 1) {
      flag = 1;
      msg = "Please select action";
    }
    if (this.salaryAcceptance == 3) {
      if (this.remarks == undefined || this.remarks == "") {
        msg = "Please enter remarks";
        flag = 1;
      }
    }
    if (this.salaryAcceptance == 2) {
      if (this.remarks == undefined) {
        this.remarks = "";
      }
    }
    if (flag == 0) {
      const formData = new FormData();
      formData.append("SalaryFitmentDetailsId", this.salaryFitmentDetailsId.toString());
      formData.append("SalaryFitmentId", this.salaryFitmentId.toString());
      formData.append("Remarks", this.remarks.toString());
      formData.append("Acceptance", this.salaryAcceptance.toString());
      formData.append("CreatedBy", this.createdBy.toString());
      this.salaryFitmentService.acceptRejectSalaryFitment(formData).subscribe((result) => {
        if (result) {
          console.log(result);
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.getSalaryFiltmentList();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
      });
    }
    else {
      this.notificationService.showError(msg, "Error");
    }
  }

}
