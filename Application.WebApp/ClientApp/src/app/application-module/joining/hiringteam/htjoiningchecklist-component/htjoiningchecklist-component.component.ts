import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { IVertical } from '../../../../interfaces/common/vertical.interface';
import { ILocation, ISearchLocation } from '../../../../interfaces/common/location.interface';
import { IDoctor, ISearchDoctor } from '../../../../interfaces/common/doctor.interface';
import { IVerticalFunction, ISearchFunction, IVerticalFunctionDepartmentHead, ISearchVerticalFunctionDepartmentHead } from '../../../../interfaces/common/function.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../interfaces/common/position.interface';
import { IJoinersList, IPendingScheduleBatchWise, IPendingScheduleIndividual, IScheduledBatchWise, IScheduledIndividually, IReportingVenueExists } from '../../../../interfaces/prejoining/joinerslist.interface';
import { IOnboardingCoordinator, ISearchOnboardingCoordinator, IVenue, ISearchVenue, IJoiningDocument, IWelcomeTemplate, IOCJoiningCheckList, IOnBoardingCoordinatorJoiningCheckList, IOnBoardingCoordinatorOnBoardingCheckList, IOCSearchJoiningCheckList, IRMJoiningCheckList, ICandidateOnBoardingDocumentVerification } from '../../../../interfaces/prejoining/onboardingcoordinator.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining, ISearchModeOfJoining } from '../../../../interfaces/preselection/candidate.interface';
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
import { JoinersService } from '../../../../services/prejoining/onboardingcoordinator/joiners.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { IApproverVertical, IApproverFunction, IApproverDepartment, IApproverVerticalFunctionDepartment, IApproverFunctionDepartment, IBatch, ISearchBatch } from '../../../../interfaces/common/common.interface';
import { CandidateJoiningFormRelativeDetailData, IAccidentInsurancePolicyPDF, ICandidateJoiningFormDetailsForPDF, ICandidateJoiningFormFamilyDetailData, IJoiningFormFamilyDetailsPDF, IJoiningReportPDF, ISEBIDisclosurePDF } from '../../../../interfaces/preselection/candidate.interface';
import { CandidateService } from '../../../../services/preselection/candidate/candidate.service';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-htjoiningchecklist-component',
  templateUrl: './htjoiningchecklist-component.component.html',
  styleUrls: ['./htjoiningchecklist-component.component.css']
})
export class HtjoiningchecklistComponentComponent implements OnInit {
  loginUserId: number;
  verticalIds: string;
  requisitionDetailId: number;
  candidateId: number;
  candidateNo: string;
  batchId: number
  batchNo: number;
  onBoardingCoordinator: number;
  ocJoiningChecklistAllDetails: IOCJoiningCheckList;
  ocJoiningChecklistCandidateDetails: IOnBoardingCoordinatorJoiningCheckList;
  ocJoiningChecklistDocumentDetails: IOnBoardingCoordinatorOnBoardingCheckList[] = [];
  searchJoiningChecklist: IOCSearchJoiningCheckList = {
    candidateId: null
  }
  rmJoiningCheckList: IRMJoiningCheckList;
  rmJoiningCheckListData: ICandidateOnBoardingDocumentVerification;
  // rmJoiningCheckDocumentDate: ICandidateOnBoardingUploadedDocument[] = [];
  rmJoiningCheckDocumentDate: any[] = [];
  from: string;
  type: string;
  parentActiveTab: string;
  childActiveTab: string;
  HiringStatusName: string;
  readremarks:boolean=false;
//arg
  searchJoiningForm = {
    candidateJoiningFormId: null,
    candidateId: null
  }
  candidateJoiningFormPDFAllDetails: ICandidateJoiningFormDetailsForPDF = {
    candidateJoiningFormId: null,
    candidateId: null,
    requisitionDetailId: null,
    fullName: "",
    dob: "",
    bloodGroupName: "",
    residentialAddress: "",
    residentialPin: "",
    permanentAddress: "",
    permanentPin: "",
    emailId: "",
    phoneNo: "",
    date: "",
    employeeNo: "",
    joiningLetterDate: "",
    joiningDate: "",
    signatureDate: "",
    signaturePlace: "",
    signature: "",
    grade: "",
    position: "",
    location: "",
    designation: "",
    designatedPersonName: "",
    designatedPersonDesignation: "",
    designatedPersonEmployeeNo: "",
    designatedPersonDepartment: "",
    designatedPersonPAN: "",
    designatedPersonMobileNo: "",
    designatedPersonInstitute: "",
    designatedPersonPastEmployer: "",
    designatedPersonNoofSecurity: "",
    financialRelationshipName: "",
    financialRelationshipPAN: "",
    financialRelationshipMobileNo: "",
    accidentalPolicyNominee: "",
    accidentalPolicyRelationShipName: "",
    accidentalPolicyNomineeAddress: "",
    accidentalPolicyHolderName: "",
    familyDetail: [],
    immediateRelativeDetail: []
  };
  candidateJoiningFormFamilyDetails: ICandidateJoiningFormFamilyDetailData[] = [];
  candidateJoiningFormRelatives: CandidateJoiningFormRelativeDetailData[] = [];


  familyDetailsData: any;
  familyDetailsRecord: IJoiningFormFamilyDetailsPDF = {
    candidateName: "",
    dob: "",
    bloodGroup: "",
    residentialAddress: "",
    residentialPIN: "",
    permanentAdress: "",
    permanentPIN: "",
    email: "",
    mobile: "",
    signatureDate: "",
    familyMemberList: []
  };

  joiningReportData: any;
  joiningReportRecord: IJoiningReportPDF = {
    candidateName: "",
    employeeNo: "",
    grade: "",
    location: "",
    department: "",
    probation: "",
    date: "",
    joiningDate: "",
    designation: ""
  }
  accidentInsurancePolicyData: any;
  accidentInsurancePolicyRecord: IAccidentInsurancePolicyPDF = {
    accidentPolicyRelationShipName: "",
    accidentPolicyNomineeName: "",
    accidentPolicyNomineeAddress: "",
    accidentPolicyHolderName: ""
  }
  SEBIDisclosureData: any;
  SEBIDisclosureRecord: ISEBIDisclosurePDF = {
    designatedPersonName: "",
    designatedPersonEmployeeNo: "",
    designatedPersonDepartment: "",
    designatedPersonDesignation: "",
    designatedPersonPAN: "",
    designatedPersonMobile: "",
    designatedPersonInstitute: "",
    designatedPersonPastEmployer: "",
    designatedPersonNoOfSecurityHeld: "",
    currentDate: "",
    financialRelationshipName: "",
    financialRelationshipPAN: "",
    financialRelationshipMobileNo: "",
    signatureDate: "",
    signaturePlace: "",
    immediateRelatives: []
  }
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
    private toasterService: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private titleService: Title, public activatedRoute: ActivatedRoute,
    private positionService: PositionService,
    private joinersservice: JoinersService, private candidateService: CandidateService,
  ) {
    this.SpinnerService.show();
    this.loginUserId = this.persistance.get('loggedinuser').autoUserId;
    this.verticalIds = this.persistance.get('loggedinuser').verticalIds;
    this.requisitionDetailId = this.persistance.get('paramid');
    this.parentActiveTab = this.persistance.get("parentActiveTab");
    this.childActiveTab = this.persistance.get("childActiveTab");
    //  alert(this.requisitionDetailId)
    this.activatedRoute.queryParams.subscribe((params) => {
      this.candidateId = params['CandidateId'];
      this.candidateNo = params['CandidateNo'];
      this.batchId = params['BatchId'];
      // alert(this.batchId)
      this.batchNo = params['BatchNo'];
      this.onBoardingCoordinator = params['OnBoardingcoordinator'];
      this.from = params['From'];
      this.type = params['Type'];
      this.HiringStatusName = params['HiringStatus'];
    });
    if (this.candidateId != undefined) {
      this.searchJoiningChecklist.candidateId = Number(this.candidateId);
      this.getAllCheckListDetailsForOC();
      this.getAllCheckListDetailsForRM();
      this.getAllJoiningFormDetailsForPDF();
    }
    debugger;
    if(this.HiringStatusName=="Employee No Updated"){
      this.readremarks = true;
    }
    else
    {
      this.readremarks = false;
    }
   }

  ngOnInit() {
  }
  getAllCheckListDetailsForOC() {
    this.joinersservice.getOCAlljoiningCheckList(this.searchJoiningChecklist).subscribe((result) => {
      if (result) {
        this.ocJoiningChecklistAllDetails = result;
        //console.log(" OC Joinig Check list All data", this.ocJoiningChecklistAllDetails);
        this.ocJoiningChecklistCandidateDetails = this.ocJoiningChecklistAllDetails.onBoardingCoordinatorJoiningCheck;
        // console.log(" OC Joinig Checklist data", this.ocJoiningChecklistCandidateDetails);
        this.ocJoiningChecklistDocumentDetails = this.ocJoiningChecklistAllDetails.onBoardingCoordinatorOnBoardingChecks;
        //console.log(" OC Joinig Checklist Document Data", this.ocJoiningChecklistDocumentDetails);
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  getAllCheckListDetailsForRM() {
    this.joinersservice.getRMAlljoiningCheckList(this.searchJoiningChecklist).subscribe((result) => {
      if (result) {
        this.rmJoiningCheckList = result;
        //console.log("RM Joinig Check list data", this.rmJoiningCheckList);
        this.rmJoiningCheckListData = this.rmJoiningCheckList.candidateOnBoardingDocumentVerificationData;
        console.log("RM Joining check list Verification data", this.rmJoiningCheckListData);
        this.rmJoiningCheckDocumentDate = this.rmJoiningCheckList.candidateOnBoardingUploadedDocuments;
       console.log("RM Joining Document data", this.rmJoiningCheckDocumentDate);
        this.SpinnerService.hide();
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      //this.loadSelectPicker();
      this.SpinnerService.hide();
    });
  }
  onClickSave() {
    //finalSubmitObj1 for RMjoiningchecklist 
    let finalSubmitObj1 = {
      candidateRMJoiningCheckListId: this.rmJoiningCheckListData.candidateRMJoiningCheckListId,
      requisitionDetailId: this.requisitionDetailId,
      candidateId: this.rmJoiningCheckListData.candidateId,
      createdBy: this.loginUserId,
      candidateRMJoiningCheckListDetailsSave: []
    }
    //finalSubmitObj for onboardingjoiningchecklist
    let finalSubmitObj = {
      candidateOnboardingJoiningCheckListId: this.ocJoiningChecklistCandidateDetails.candidateOnboardingJoiningCheckListId,
      // requisitionDetailId: this.requisitionDetailId,
      requisitionDetailId: this.ocJoiningChecklistCandidateDetails.requisitionDetailId,
      candidateId: this.ocJoiningChecklistCandidateDetails.candidateId,
      complete: false,
      createdBy: this.loginUserId,
      candidateOnboardingJoiningCheckListDetailsSave: []
    }
    this.rmJoiningCheckDocumentDate.forEach(element => {
      //  if (element.approvalStatus != null) {
        let obj1 = {
          candidateRMJoiningCheckListDetailsId: element.candidateRMJoiningCheckListDetailsId==null? 0:element.candidateRMJoiningCheckListDetailsId,
          candidateRMJoiningCheckListId: element.candidateRMJoiningCheckListId==null?0: element.candidateRMJoiningCheckListId,
          doumentType: element.doumentType==null?0:element.doumentType,
          doumentParticular: element.doumentParticular==null?0:element.doumentParticular,
          doumentName: element.doumentNameId,
          remarks: element.remarks
        }
        finalSubmitObj1.candidateRMJoiningCheckListDetailsSave.push(obj1);
        

    })
    // console.log("Final Submit checklist Array", finalSubmitObj1);
    // SAME REMARKS FOR OC JOINING LIST 
    for(let i=0;i<this.ocJoiningChecklistDocumentDetails.length;i++)
    {
      this.ocJoiningChecklistDocumentDetails[i].remarks=finalSubmitObj1.candidateRMJoiningCheckListDetailsSave[i].remarks;
    }
    console.log("After", this.ocJoiningChecklistDocumentDetails);
    this.ocJoiningChecklistDocumentDetails.forEach(element => {
      // if (element.approvalStatus != 0) {
        let obj = {
          candidateOnboardingJoiningCheckListDetailsId: element.candidateOnboardingJoiningCheckListDetailsId==null?0:element.candidateOnboardingJoiningCheckListDetailsId,
          candidateOnboardingJoiningCheckListId: element.candidateOnboardingJoiningCheckListId==null?0:element.candidateOnboardingJoiningCheckListId,
          doumentNameId: element.doumentNameId,
          remarks: element.remarks
        }
        finalSubmitObj.candidateOnboardingJoiningCheckListDetailsSave.push(obj);
      // }
    })
    console.log("RM json",finalSubmitObj1);
    console.log("Oc json",finalSubmitObj);
    this.SpinnerService.show();
    this.joinersservice.saveRMJoiningChecklist(finalSubmitObj1).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.getAllCheckListDetailsForRM();
          // jQuery("#updateJoiningDateModal").modal("hide");
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
    this.joinersservice.saveOCJoiningChecklist(finalSubmitObj).subscribe((result) => {
      if (result) {
        if (result.successFlag == 0) {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          // this.getAllCheckListDetailsForOC();
          // if (this.batchId != undefined) {
          //   jQuery(".custom-menu").hide();
          //   this._route.navigate(['/viewcandidatedetails'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.onBoardingCoordinator, From: this.from, Type: this.type } });
          // } else {
          //   if (this.type == "C") {
          //     jQuery(".custom-menu").hide();
          //     this._route.navigate(['/corporate/new-joiner-list']);
          //   } else if (this.type == "P") {
          //     jQuery(".custom-menu").hide();
          //     this._route.navigate(['/plant/new-joiner-list']);
          //   } else if (this.type == "S") {
          //     jQuery(".custom-menu").hide();
          //     this._route.navigate(['/sales/new-joiner-list']);
          //   }
          // }
          // jQuery("#updateJoiningDateModal").modal("hide");
        }
      }
      else {
        this.SpinnerService.hide();
      }
    }, error => {
      console.log(error);
      this.SpinnerService.hide();
    }, () => {
      // this.SpinnerService.hide();
    });

  }
  backToViewCandidatelist() {
    jQuery(".custom-menu").hide();
    if (this.batchId != undefined) {
      // alert(this.from)
      // alert(this.type)
      this.persistance.set('parentActiveTab', this.parentActiveTab);
      this.persistance.set('childActiveTab', this.childActiveTab);
      this._route.navigate(['/app/viewcandidatedetails'], { queryParams: { BatchId: this.batchId, BatchNo: this.batchNo, OnBoardingcoordinator: this.onBoardingCoordinator, From: this.from, Type: this.type } });
    } else {
      if (this.from == "ht") {
        if (this.type == "C") {
          this.persistance.set('parentActiveTab', this.parentActiveTab);
          this.persistance.set('childActiveTab', this.childActiveTab);
          this._route.navigate(['/app/corporate/ht-candidate-list']);
        } else if (this.type == "P") {
          this.persistance.set('parentActiveTab', this.parentActiveTab);
          this.persistance.set('childActiveTab', this.childActiveTab);
          this._route.navigate(['/app/plant/ht-candidate-list']);
        } else if (this.type == "S") {
          this.persistance.set('parentActiveTab', this.parentActiveTab);
          this.persistance.set('childActiveTab', this.childActiveTab);
          this._route.navigate(['/app/sales/ht-candidate-list']);
        }
      } 
      // else if (this.from == "OM") {
      //   if (this.type == "C") {
      //     this.persistance.set('parentActiveTab', this.parentActiveTab);
      //     this.persistance.set('childActiveTab', this.childActiveTab);
      //     this._route.navigate(['/corporate/joiner-list']);
      //   } else if (this.type == "P") {
      //     this.persistance.set('parentActiveTab', this.parentActiveTab);
      //     this.persistance.set('childActiveTab', this.childActiveTab);
      //     this._route.navigate(['/plant/joiner-list']);
      //   } else if (this.type == "S") {
      //     this.persistance.set('parentActiveTab', this.parentActiveTab);
      //     this.persistance.set('childActiveTab', this.childActiveTab);
      //     this._route.navigate(['/sales/joiner-list']);
      //   }
      // }

    }
  }
  getAllJoiningFormDetailsForPDF() {
    this.searchJoiningForm.candidateId = Number(this.candidateId);
    this.candidateService.getAllCandidateJoinigFormDetails(this.searchJoiningForm).subscribe((result) => {
      if (result) {
        this.candidateJoiningFormPDFAllDetails = result;
        // console.log("Candidate Joining Form Details", this.candidateJoiningFormPDFAllDetails);
        this.prepareFamilyMemberDataForPDF();
        this.prepareJoiningReportDataForPDF();
        this.prepareAccidentPolicyDataForPDF();
        this.prepareSEBIDisclosureForPDF();
      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  prepareFamilyMemberDataForPDF() {
    this.familyDetailsRecord.familyMemberList = [];
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.familyDetailsRecord.candidateName = this.candidateJoiningFormPDFAllDetails.fullName;
      this.familyDetailsRecord.dob = this.candidateJoiningFormPDFAllDetails.dob;
      this.familyDetailsRecord.bloodGroup = this.candidateJoiningFormPDFAllDetails.bloodGroupName;
      this.familyDetailsRecord.residentialAddress = this.candidateJoiningFormPDFAllDetails.residentialAddress;
      this.familyDetailsRecord.residentialPIN = this.candidateJoiningFormPDFAllDetails.residentialPin;
      this.familyDetailsRecord.permanentAdress = this.candidateJoiningFormPDFAllDetails.permanentAddress;
      this.familyDetailsRecord.permanentPIN = this.candidateJoiningFormPDFAllDetails.permanentPin;
      this.familyDetailsRecord.email = this.candidateJoiningFormPDFAllDetails.emailId;
      this.familyDetailsRecord.mobile = this.candidateJoiningFormPDFAllDetails.phoneNo;
      this.familyDetailsRecord.signatureDate = this.candidateJoiningFormPDFAllDetails.signatureDate;
      if (this.candidateJoiningFormPDFAllDetails.familyDetail.length > 0) {
        this.candidateJoiningFormPDFAllDetails.familyDetail.forEach((element, index) => {
          let familyDetailsObj = {
            memberName: element.familyName,
            relationwithEmployee: element.familyRelationShipName,
            memberDOB: element.familyDOB
          }
          this.familyDetailsRecord.familyMemberList.push(familyDetailsObj);
          // console.log("Index", index);
        })
      }
      this.familyDetailsData = this.familyDetailsRecord;
      // console.log("Family Details Record", this.familyDetailsRecord);
    }
  }
  prepareAccidentPolicyDataForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.accidentInsurancePolicyRecord.accidentPolicyHolderName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyHolderName;
      this.accidentInsurancePolicyRecord.accidentPolicyNomineeName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyNominee;
      this.accidentInsurancePolicyRecord.accidentPolicyNomineeAddress = this.candidateJoiningFormPDFAllDetails.accidentalPolicyNomineeAddress;
      this.accidentInsurancePolicyRecord.accidentPolicyRelationShipName = this.candidateJoiningFormPDFAllDetails.accidentalPolicyRelationShipName;
      this.accidentInsurancePolicyData = this.accidentInsurancePolicyRecord;
      // console.log("Accident Policy Nominee", this.accidentInsurancePolicyRecord);
    }
  }
  prepareJoiningReportDataForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.joiningReportRecord.candidateName = this.candidateJoiningFormPDFAllDetails.fullName;
      this.joiningReportRecord.employeeNo = this.candidateJoiningFormPDFAllDetails.employeeNo;
      this.joiningReportRecord.grade = this.candidateJoiningFormPDFAllDetails.grade;
      this.joiningReportRecord.location = this.candidateJoiningFormPDFAllDetails.location;
      this.joiningReportRecord.department = this.candidateJoiningFormPDFAllDetails.designatedPersonDepartment;
      // this.joiningReportRecord.probation=this.candidateJoiningFormPDFAllDetails.probation;
      this.joiningReportRecord.date = this.candidateJoiningFormPDFAllDetails.joiningLetterDate;
      this.joiningReportRecord.joiningDate = this.candidateJoiningFormPDFAllDetails.joiningDate;
      //this.joiningReportRecord.probation = this.candidateJoiningFormPDFAllDetails.probation;
      this.joiningReportRecord.designation = this.candidateJoiningFormPDFAllDetails.designation;
      this.joiningReportData = this.joiningReportRecord;
      // console.log("Joinig Report Form DATA for PDF", this.joiningReportData);

    }
  }
  prepareSEBIDisclosureForPDF() {
    if (this.candidateJoiningFormPDFAllDetails != null) {
      this.SEBIDisclosureRecord.designatedPersonName = this.candidateJoiningFormPDFAllDetails.designatedPersonName;
      this.SEBIDisclosureRecord.designatedPersonEmployeeNo = this.candidateJoiningFormPDFAllDetails.designatedPersonEmployeeNo;
      this.SEBIDisclosureRecord.designatedPersonDesignation = this.candidateJoiningFormPDFAllDetails.designatedPersonDesignation;
      this.SEBIDisclosureRecord.designatedPersonDepartment = this.candidateJoiningFormPDFAllDetails.designatedPersonDepartment;
      this.SEBIDisclosureRecord.designatedPersonPAN = this.candidateJoiningFormPDFAllDetails.designatedPersonPAN;
      this.SEBIDisclosureRecord.designatedPersonMobile = this.candidateJoiningFormPDFAllDetails.designatedPersonMobileNo;
      this.SEBIDisclosureRecord.designatedPersonInstitute = this.candidateJoiningFormPDFAllDetails.designatedPersonInstitute;
      this.SEBIDisclosureRecord.designatedPersonPastEmployer = this.candidateJoiningFormPDFAllDetails.designatedPersonPastEmployer;
      this.SEBIDisclosureRecord.designatedPersonNoOfSecurityHeld = this.candidateJoiningFormPDFAllDetails.designatedPersonNoofSecurity;
      this.SEBIDisclosureRecord.currentDate = this.candidateJoiningFormPDFAllDetails.date;
      this.SEBIDisclosureRecord.financialRelationshipName = this.candidateJoiningFormPDFAllDetails.financialRelationshipName;
      this.SEBIDisclosureRecord.financialRelationshipPAN = this.candidateJoiningFormPDFAllDetails.financialRelationshipPAN;
      this.SEBIDisclosureRecord.financialRelationshipMobileNo = this.candidateJoiningFormPDFAllDetails.financialRelationshipMobileNo;
      this.SEBIDisclosureRecord.signatureDate = this.candidateJoiningFormPDFAllDetails.signatureDate;
      this.SEBIDisclosureRecord.signaturePlace = this.candidateJoiningFormPDFAllDetails.signaturePlace;

      if (this.candidateJoiningFormPDFAllDetails.immediateRelativeDetail.length > 0) {
        this.candidateJoiningFormPDFAllDetails.immediateRelativeDetail.forEach(element => {
          let obj = {
            immediateRelativesName: element.immediateRelativesName,
            immediateRelativesPAN: element.immediateRelativesPAN,
            iImmediateRelativesPhone: element.immediateRelativesPhone == null ? "" : element.immediateRelativesPhone,
            immediateRelativesNoofSecurity: element.immediateRelativesNoofSecurity
          }
          this.SEBIDisclosureRecord.immediateRelatives.push(obj);
        })
      }
      this.SEBIDisclosureData = this.SEBIDisclosureRecord;
      // console.log("SEBI Disclosure", this.SEBIDisclosureRecord);

    }
  }
  downLoadPDF(type: any) {
    var fileName;
    switch (type) {
      case 21:
        var htmlstring = document.getElementById("printFamilyDetailsDiv").innerHTML;
        fileName = "Family_Details.pdf"
        break;
      case 23:
        var htmlstring = document.getElementById("printJoiningReport").innerHTML;
        fileName = "Joining_Report.pdf"
        break;
      case 22:
        var htmlstring = document.getElementById("printAccidentInsurancePolicy").innerHTML;
        fileName = "Accident_Insurance_Policy.pdf"
        break;
      case 17:
        var htmlstring = document.getElementById("printSEBIDisclosure").innerHTML;
        fileName = "SEBI_Disclosure.pdf"
        break;
    }
    var dom = document.createElement('div');
    dom.innerHTML = htmlstring;
    html2pdf(dom, {
      margin: 10,
      filename: fileName,
      // image: { type: 'jpeg', quality: 0.98 },
      image: { type: 'jpeg', quality: 0.98 },
      // html2canvas: { scale: 3, y: 0, scrollY: 0 },
      html2canvas: { scale: 2, y: 2, scrollY: 0 },
      jsPDF: { format: 'A4', orientation: 'landscape' },
    });
  }

}
