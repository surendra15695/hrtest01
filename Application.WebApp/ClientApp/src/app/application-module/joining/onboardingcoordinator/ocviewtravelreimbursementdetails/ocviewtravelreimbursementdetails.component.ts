import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { ICandidateAssessmentData, ICandidateAssessmentDetails, ICandidateMedicalReimbursement, IEmployeeTravelForRemarks,ICandidateTravelReimbursementDetails, IEmployeeTravelAttachmentDetails, IEmployeeTravelJourneyDetails, ISearchCandidateAssessment, ISearchCandidateMedicalReimbursement, ISearchCandidateTravelReimbursement } from '../../../../interfaces/joining/candidate.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IAssessemenrAssignReleaseList, IBatchAssessment, ICandidateAssessmentList, ISearchAssessmentAssignReleaseList } from '../../../../interfaces/joining/programcoordinator.interface';
import { LocationService } from '../../../../services/common/location/location.service';
import { CommonService } from '../../../../services/common/common/common.service';
import { FunctionService } from '../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../services/common/department/department.service';
import { PositionService } from '../../../../services/common/position/position.service';
import { RecruitmentmanagerService } from '../../../../services/prejoining/recruitmentmanager/recruitmentmanager.service';
import { ShareddataService } from '../../../../sharedservices/shareddata.service';
import { PersistanceService } from '../../../../sharedservices/persitence.service';
import { environment } from '../../../../../environments/environment';
import { NotificationService } from '../../../../sharedservices/notification.service';
import { CorporateallocationService } from '../../../../services/prejoining/onboardingmanager/corporate/corporateallocation.service';
import { CandidateService } from '../../../../services/joining/candidate/candidate.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { IFormFiles } from 'src/app/interfaces/common/common.interface';
import { OnboardingcoordinatorService } from 'src/app/services/joining/onboardingcoordinator/onboardingcoordinator.service';
import { HttpEventType } from '@angular/common/http';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-ocviewtravelreimbursementdetails',
  templateUrl: './ocviewtravelreimbursementdetails.component.html',
  styleUrls: ['./ocviewtravelreimbursementdetails.component.css']
})
export class OcviewtravelreimbursementdetailsComponent implements OnInit {

  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateTravelReimbursementId: number;
  searchCandidateTravelReimbursement: ISearchCandidateTravelReimbursement = {
    candidateId: null,
    candidateTravelReimbursementId: null,
  }
  candidateTravelReimbursementList: ICandidateTravelReimbursementDetails;
  candidateTravelJourneyDetails: IEmployeeTravelJourneyDetails[] = [];
  candidateAttachmentDetails: IEmployeeTravelAttachmentDetails[] = [];
  employeeTravelForRemarks: IEmployeeTravelForRemarks[] =[];
  journeyTypeList: any[] = [];
  modeOfJourney: any[] = [];
  billType: any[] = [];
  journeyDetailsArray: any[] = [];
  travelAttachementDetailsArray: any[] = [];
  totalAmount: number = 0;
  IsReadOnly: boolean;
  claimStatus: number = 3;
  claimRemarks: string;
  ForPrintRemarks: any[];
  zipFileName: any;
  // empNo: string;
    DocumentPathForPDF: string;
  activeTabName: string;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private shareddataService: ShareddataService,
    private locationService: LocationService,
    private functionService: FunctionService,
    private commonService: CommonService,
    private corporateService: CorporateallocationService,
    private persistance: PersistanceService,
    private notificationService: NotificationService,
    private toasterService: ToastrService, private onboardingCordinatorService: OnboardingcoordinatorService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private candidateService: CandidateService
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.activeTabName = this.persistance.get("activeTabName");
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      // this.empNo = params['EmpNo'];
      this.candidateTravelReimbursementId = params['CandidateTravelReimbursementId'];
    });
    this.searchCandidateTravelReimbursement.candidateId = Number(this.candidateId);
    this.searchCandidateTravelReimbursement.candidateTravelReimbursementId = Number(this.candidateTravelReimbursementId);
    this.updateDropdownArray();
    this.getCandidateTravelReimbursementDetails();
  }

  ngOnInit() {
  }
  updateDropdownArray() {
    this.journeyTypeList = [];
    this.modeOfJourney = [];
    this.billType = [];
    this.journeyTypeList.push({ JourneyTypeId: "1", JourneyTypeName: "Onward Journey" }, { JourneyTypeId: "2", JourneyTypeName: "Return Journey" });
    this.modeOfJourney.push({ TravelModeId: "1", TravelModeName: "Bus" }, { TravelModeId: "2", TravelModeName: "Taxi" },
      { TravelModeId: "3", TravelModeName: "Train" }, { TravelModeId: "4", TravelModeName: "Air" });
    this.billType.push({ TicketId: "1", TicketName: "Train/Bus/Air ticket" }, { TicketId: "2", TicketName: "Boarding Pass" }, { TicketId: "3", TicketName: "Taxi Bills" })
  }
  getCandidateTravelReimbursementDetails() {
    this.candidateService.getCandidateTravelReimbursementDetails(this.searchCandidateTravelReimbursement).subscribe((record) => {
      if (record) {
        this.candidateTravelReimbursementList = record;
        this.DocumentPathForPDF = record.documentPathForPDF;
        //console.log("Travel reimbursement Details", this.candidateTravelReimbursementList);
        this.updateDropdownArray();

        if (this.candidateTravelReimbursementList.employeeTravelJourneyDetails.length > 0) {
          this.candidateTravelReimbursementList.employeeTravelJourneyDetails.forEach(element => {
            let jdObj = {
              candidateTravelReimbursementId: element.candidateTravelReimbursementId,
              candidateTravelReimbursementJourneyId: element.candidateTravelReimbursementJourneyId,
              journeyTypeId: element.journeyTypeId,
              reportingLocation: element.reportingLocation,
              from: element.from,
              to: element.to,
              travelModeId: element.travelModeId,
              claimAmount: element.claimAmount,
              createdBy: element.createdBy,
              isReadOnly: true,
              
            }
            this.journeyDetailsArray.push(jdObj);
          })
        }
        if (this.candidateTravelReimbursementList.employeeTravelAttachmentDetails.length > 0) {
          this.candidateTravelReimbursementList.employeeTravelAttachmentDetails.forEach(element => {
            let jaObj = {
              candidateTravelReimbursementId: element.candidateTravelReimbursementId,
              candidateTravelReimbursementAttachmentId: element.candidateTravelReimbursementAttachmentId,
              journeyTypeId: element.journeyTypeId,
              ticketId: element.ticketId,
              attachmentFile: element.attachmentFile,
              attachmentLink: element.attachmentLink,
              createdBy: element.createdBy,
              isReadOnly: true
            }
            this.travelAttachementDetailsArray.push(jaObj);
          })         
        }
         
        if (this.candidateTravelReimbursementList.employeeTravelForRemarks.length > 0) {
          this.ForPrintRemarks = [];
          for (var i = 0; i < this.candidateTravelReimbursementList.employeeTravelForRemarks.length; i++) {
            let obj = {
              printName: this.candidateTravelReimbursementList.employeeTravelForRemarks[i].fullName,
              printRemarks: this.candidateTravelReimbursementList.employeeTravelForRemarks[i].approvalRemarks,
            }
            this.ForPrintRemarks.push(obj);
          }
        }
        if (this.candidateTravelReimbursementList.approvalStatus == 3 || this.candidateTravelReimbursementList.approvalStatus == 4) {
          this.IsReadOnly = true;
        }
        if (this.candidateTravelReimbursementList.approvalStatus == 3) {
          jQuery("#radio1").prop("checked", true);
        } else if (this.candidateTravelReimbursementList.approvalStatus == 4) {
          jQuery("#radio2").prop("checked", true);
        } else if (this.candidateTravelReimbursementList.approvalStatus == 2) {
          jQuery("#radio3").prop("checked", true)
        }
        this.calculateTotal();
        this.SpinnerService.hide();
      }
      else {
        //this.candidateAssessmentDataList = [];
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      this.SpinnerService.hide();
    });
  }
  getJourneyTypeName(JTypeId) {
    return this.journeyTypeList.find(e => e.JourneyTypeId == JTypeId).JourneyTypeName;
  }
  getTravelModename(TModeId) {
    return this.modeOfJourney.find(e => e.TravelModeId == TModeId).TravelModeName;
  }
  calculateTotal() {
    this.journeyDetailsArray.forEach(element => {
      this.totalAmount += element.claimAmount
    })
  }
  onChangeRadioValue(val) {
    if (val == "A") {
      this.claimStatus = 3;
    } else if (val == "R") {
      this.claimStatus = 4;
    } else if (val == "S") {
      this.claimStatus = 2;
    }
  }
  onSubmitClaim() {
    var flag = 0;
    var msg = "";
    if (this.claimRemarks == "") {
      flag = 1;
      msg = "Please Enter Remarks";
    }
    else {

    }
    if (flag == 0) {

      let obj = {
        candidateTravelReimbursementId: this.candidateTravelReimbursementList.candidateTravelReimbursementId.toString(),
        requisitionDetailId: this.candidateTravelReimbursementList.requisitionDetailId.toString(),
        candidateId: "",
        approvalStatus: this.claimStatus,
        approvalRemarks: this.claimRemarks,
        createdBy: this.loginUserId
      }
      this.SpinnerService.show();
      //console.log("Travel reimbursement Approval Obj", obj);

      this.onboardingCordinatorService.saveTravelClaimStatus(obj).subscribe((result) => {
        if (result) {
          if (result.successFlag == 0) {
            this.SpinnerService.hide();
            this.notificationService.showError(result.msg, "Error");
          }
          else {
            this.SpinnerService.hide();
            this.notificationService.showSuccess(result.msg, "Success");
            jQuery(".custom-menu").hide();
            this._route.navigate(['/app/oc-travel-reimbursement-list']);
          }
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
    else {
      this.notificationService.showError(msg, "Error");
    }
  }
  onClickCancel() {

  }
  onClickBack() {
    jQuery(".custom-menu").hide();
    this.persistance.set('activeTabName', this.activeTabName);
    this._route.navigate(["/app/oc-travel-reimbursement-list"]);
  }
  onCancelClick() {
    this.claimRemarks = "";
  }
  onClickDownloadFormForView(){
    var htmlstring = document.getElementById("printTravelReimbursementDiv").innerHTML;
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: this.candidateTravelReimbursementList.empNo + "_Travel_Reimbursement.pdf",
      image: { type: 'jpeg', quality: 0.98 },
      //html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
      html2canvas: { scale: 3, y: 0, scrollY: 0 },
      //jsPDF: { format: 'A4' },
      //jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      jsPDF: { format: 'A4', orientation: 'portrait' },
    });
  }
  onClickDownloadForm(){
    this.SpinnerService.show();
    this.zipFileName = this.candidateId + "_Document_Details";
    let obj = {
      requisitionDetailId: this.requisitionDetailId,
      CandidateId: this.candidateId.toString(),
    };

    this.onboardingCordinatorService.downloadFileForPreEmployeeTravel(obj).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            break;
          case HttpEventType.Response:
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = this.zipFileName;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
        this.SpinnerService.hide();

      },
      error => {
      }
    );
  }
  openFile(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);

      // Open the file in a new tab
      window.open(url);

    }, error => {
      console.error('Failed to download file:', error);
    });
  }
}
