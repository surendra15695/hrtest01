import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ISearchCandidateTravelReimbursement,ICandidateTravelReimbursement,
  ITravelReimbursementActionFormData,
  ITravelClarificationList, ISearchTravelClarificationList
} from '../../../../interfaces/selection/travelreimbursement.interface';
import { TravelreimbursementService } from '../../../../services/selection/travelreimbursement/travelreimbursement.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common/common/common.service';
import { isAbsolute } from 'path';
declare var jQuery: any;
@Component({
  selector: 'app-off-campus-interviewtravelreimbursement-component',
  templateUrl: './off-campus-interviewtravelreimbursement-component.component.html',
  styleUrls: ['./off-campus-interviewtravelreimbursement-component.component.css']
})
export class OffCampusInterviewtravelreimbursementComponentComponent implements OnInit {

 
  @ViewChild('closeClarificationModal', { static: false }) ccModal: ElementRef;
  searchTravelReimbursementList:ISearchCandidateTravelReimbursement={
    CandidateId:null,
    RequisitionDetailId:null,
    InterviewDetailId:null
  }
  travelReimbursementList:ICandidateTravelReimbursement[]=[];
  candidateId:number;
  travelReimbursementActionFormData: ITravelReimbursementActionFormData = {
    InterviewDetailIds: null,
    ClaimStatusId: 0,
    Remarks: null,
    CreatedBy: null,
    CandidateNo:null
  }

  travelClarificationList: ITravelClarificationList[] = [];
  searchClarificationList: ISearchTravelClarificationList = {
    InterviewDetailId: null
  }
  ClarificationRemarks:string;
  autoUserId:number;
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private commonService:CommonService,
    private travelReimbursementService: TravelreimbursementService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
  ) { 
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
    this.autoUserId = this.persistance.get('loggedinuser').autoUserId;
    this.getAllTravelReimbursementList();
  }

  ngOnInit() {
    this.loadDataTable();
    this.loadTooltipMenu();
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

  loadTooltipMenu() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.custom-menu');
        body_.append(dropdownMenu.detach());
        var eOffset = jQuery(e.target).offset();
        dropdownMenu.css({
          'display': 'block',
          'top': eOffset.top + jQuery(e.target).outerHeight(),
          'left': eOffset.left,
          'font-size': '14px'
        });
        dropdownMenu.addClass("mobPosDropdown");
      });
      table_responsive.on('hide.bs.dropdown', function (e) {
        jQuery(e.target).append(dropdownMenu.detach());
        jQuery(e.target).find('.dropdown-menu').hide();
      });

    });
  }

  getAllTravelReimbursementList(){
    this.SpinnerService.show();
    this.searchTravelReimbursementList.CandidateId=this.candidateId;
    this.travelReimbursementService.getCampusCandidateInterviewTravelReimbursementList(this.searchTravelReimbursementList).subscribe((result) => {
      if (result) {
        this.travelReimbursementList = result;
        console.log(this.travelReimbursementList)        
        this.SpinnerService.hide();
      }
      else {
        this.travelReimbursementList = [];        
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);      
      this.SpinnerService.hide();
    }, () => {
      this.loadDataTable();
    });
  }

  openClarificationModal(interviewDetailId) {
    jQuery(".custom-menu").hide();
    this.getAllClarificationList(interviewDetailId);
    this.travelReimbursementActionFormData.InterviewDetailIds=interviewDetailId.toString();
    jQuery(".txtRemarks").removeClass("is-invalid");
  }

  getAllClarificationList(interviewDetailId) {
    this.SpinnerService.show();
    this.travelClarificationList = [];
    this.searchClarificationList.InterviewDetailId = interviewDetailId
    this.travelReimbursementService.getTravelClarificationList(this.searchClarificationList).subscribe((result) => {
      if (result) {
        this.travelClarificationList = result;
      }
      else {
        this.travelClarificationList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }

  clarificationSubmit() {
    var flag = 0;
    if (this.ClarificationRemarks == "" || this.ClarificationRemarks == undefined) {
      jQuery(".txtRemarks").addClass("is-invalid");
      flag = 1;
    }
    else {
      jQuery(".txtRemarks").removeClass("is-invalid");
    }
    if (flag == 0) {
      this.SpinnerService.show();
      this.travelReimbursementActionFormData.CreatedBy = this.autoUserId;
      this.travelReimbursementActionFormData.CandidateNo = this.travelReimbursementList[0].candidateNo;
      this.travelReimbursementActionFormData.ClaimStatusId = this.travelReimbursementList[0].claimStatusId;
      this.travelReimbursementActionFormData.Remarks = this.ClarificationRemarks;
      console.log(this.travelReimbursementActionFormData);
      this.travelReimbursementService.updateTravelReimbursementStatus(this.travelReimbursementActionFormData).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.notificationService.showSuccess(result.msg, "Success");
            this.SpinnerService.hide();
            this.ccModal.nativeElement.click();
            this.ClarificationRemarks = "";
            this.getAllTravelReimbursementList();
          }
        }
        else {
        }
      }, error => {
        console.log(error);
      }, () => {
        this.SpinnerService.hide();
      });
    }
  }

  gotoAddTravelReimbursement(interviewDetailId){
    jQuery(".custom-menu").hide();
    this.persistance.set('paramid', interviewDetailId);
    this.persistance.set('pagename', "offtravellist");
    this._route.navigate(['/app/career/campus-add-interview-travel-reimbursement']);
  }

}
