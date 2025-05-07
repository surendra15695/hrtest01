import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import {  IFatherOccupation, IHiringStatus, ISearchFatherOccupation } from '../../../interfaces/common/common.interface';
import { ICandidateDetailData, ISearchCandidateDetail, IModeOfJoining  } from '../../../interfaces/preselection/candidate.interface';
import { ISearchInterviewClarificationList, IInterviewClarificationList, IInterviewClarificationListData, IInterviewClarificationData, IInterviewCalendarActionFormData, ISearchinterviewCalenderClarification } from '../../../interfaces/selection/interviewcalendaraction.interface';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { RequisitionService } from '../../../services/preselection/requisition/requisition.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { ISearchFunction, IVerticalFunction } from '../../../interfaces/common/function.interface';
import { FunctionService } from '../../../services/common/function/function.service';
import { CommonService } from '../../../services/common/common/common.service';
import { CandidateofferdocumentService } from '../../../services/offer/candidateofferdocument/candidateofferdocument.service'
import { LanguageService } from '../../../services/common/language/language.service';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';
import { IFunctionDepartment, ISearchDepartment } from 'src/app/interfaces/common/department.interface';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { IGrade, ISearchGrade } from 'src/app/interfaces/common/grade.interface';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { CourseService } from 'src/app/services/common/course/course.service';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { ISearchRequisition } from 'src/app/interfaces/preselection/requisition.interface';
import { ReportService } from '../../../services/reports/report.service';
declare var jQuery: any;
declare var moment: any;

@Component({
  selector: 'app-candidate-report',
  templateUrl: './candidate-report.component.html',
  styleUrls: ['./candidate-report.component.css']
})

export class CandidateReportComponent implements OnInit {
  @ViewChild('fromDate', { static: false }) fDate: ElementRef;
  @ViewChild('toDate', { static: false }) tDate: ElementRef;
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string
  courses: any[] = []
  searchInterviewClarification: ISearchInterviewClarificationList = {
    calendarId: null,
    requisitionDetailId: null,
    candidateId: null
  };
  //HiringStatus
  candidateLists: IHiringStatus[] = [];
  searchCandidateNo: IHiringStatus = {
    hiringStatusId: null,
    hiringStatusName: null,
  }

  //Father occupation
  fatherOccupationDetail: IFatherOccupation[] = [];
  searchFatherOccupation: ISearchFatherOccupation = {
    OccupationId: null,
  }
   //languages
   languages: ILanguage[] = [];
   selectedLanguages: ILanguage;
   searchLanguages: ISearchLanguage = {
     languageId: null,
     isActive: null
   }
   languageId: number;
   languageName: string;
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
  verticalIds: string;
  //location
  locations: ILocation[] = [];
  selectedLocation: ILocation;
  selectedLocationCode: string = "";
  selectedLocationOffice: string = "";
  searchLocation: ISearchLocation =
    {
      locationId: null,
      verticalId: null,
      locationCode: null,
      locationNo: null,
      isActive: true
    };
  locationId: number;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction : any ={
    verticalId: "",
    functionId: null,
    isActive: true
  };
  //qualification
  qualificationType: any[] = []
  qualifications: any[] = []
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }
  // searchFunction: ISearchFunction = {
  //   verticalId: null,
  //   functionId: null,
  //   isActive: true
  // }
  functionId: number;
  functionName: string;
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId:null,
    functionId:null,
    verticalId:null,
    isActive:true
  }
  departmentId: number;
  departmentName: string;
   
  //grade
 grades:IGrade[] = [];
 selectedGrade: IGrade;
 searchGrade: ISearchGrade = {
   gradeId: null,
   isActive: true
 }
 gradeId: number;
 gradeName: string;

 searchRequisition: ISearchRequisition = {
  requisitionNo: null,
  requistionId: null,
  requisitionDetailId: null,
  locationId: null,
  verticalId: null,
  fromDate: null,
  toDate: null,
  iOMNo: null,
  requisitionApprovalStatus: null,
  requisitionProcessStatus: null,
  createdBy: null,
  approverAutoUserId: null,
  allocatedUserId: null,
  requisitionTypeId: null,
}

  interClarifications: IInterviewClarificationList[];
  interviewClarificationList: IInterviewClarificationListData[];
  interviewClarificationdata: IInterviewClarificationData[] = [];
  calendarActionFormData: IInterviewCalendarActionFormData = {
    CalendarIds: null,
    AcceptStatus: null,
    Remarks: null,
    CreatedBy: null
  }
  isMerge: boolean = false;
  searchInterviewCalenderClarification: ISearchinterviewCalenderClarification = {
    calendarId: 0,
    requisitionDetailId: 0,
    candidateId: 0,
  }
  CompletionYear: any[] = [];
  searchform: FormGroup;
  scheduleForm: FormGroup;
  btnVisible: boolean = false;
  topBtnVisible: boolean = false;
  candidates: ICandidateDetailData[] = [];
  candidateIds: string = "";

  CandidatemasterList: any[];
  pagenumbercount : number = 1;
  exportdata:any[]=[];
  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private locationService: LocationService,
    private requisitionService: RequisitionService,
    private SpinnerService: NgxSpinnerService, 
    private reportService: ReportService,
    private excelService: ExcelService,
    private commonService: CommonService,
    private functionService: FunctionService,
    private gradeService: GradeService,
    private languageService: LanguageService,
    private qualificationService: QualificationService,
    private departmentService: DepartmentService,
    private courseService: CourseService,
    private notificationService: NotificationService,
    private candidateOfferDocumentService: CandidateofferdocumentService,
  ) {       
    this.createFilterForm();
    this.getAllLanguages();
    this.getHiringStatus();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllGrades();
    this.getAllFunctionDepartment();
    this.getFatherOccupation() ;
  }

  ngOnInit() {
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllLanguages();
    this.getAllFunctionDepartment();
    this.loadDataTable();
    this.getHiringStatus();
    this.loadDatePicker();
    this.getAllQualificationType();
    this.getAllQualifications();
    this.getAllGrades();
    this.getAllCourse();
    this.getFatherOccupation() ;
    setTimeout(() => {
      this.onFilter();
    })
  }

  createFilterForm() {
    this.searchform = this.fb.group({
      CandidateNo: [''],
      EmpNo: [''],
      RequisitionNo: [''],
      CandidateName: [''],
      AadharNo: [''],
      EmailId: [''],
      ContactNo: [''],
      FromAge: [0],
      ToAge: [0],
      fromDate: [''],
      toDate: [''],
      HiringStatusId: [0], 
      verticalId: [''],
      functionId: [''],
      locationId: [''],
      departmentId: [''],
      gradeId: [''],
      LanguageKnownIds: [''],
      MotherTongueIds: [''],
      HomeTown: [''],
      ToPercentage: [0],
      FromPercentage: [0],
      MRFRelativeStatus: [0],
      BloodGroup: [''],
      CronicMajorIllnessId: [0],
      PermanentNativeState: [''],
      CommunicationState: [''],
      EyeSightCorrected: [''],
      CourseIds: [''],
      QualificationTypeIds: [''],
      HandiCapId: [0],
      //CompletionYear: [''], 
      genderId: [0],
      FatherOccupation: [''],
      HandiCapDetails: [''],
      CandidateBVGReportId: [0],
      pagesize:50,
      pagenumber:1
    });
  }
  Next(){
    this.pagenumbercount=this.pagenumbercount+1;
    this.onFilter();
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginRight = "300px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginRight = "0";
  }
  loadDatePicker() {
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
    });
  }
  onFilter() {
    var flag=0;
    let searchdata = "";
    let searchdatafun = "";
    let searchdataloc = "";
    let searchMotherTongue ="";
    let searchlanguage = "";
    let searchdataGender = "";
    let searchdatadep ="";
    let searchbloodgroup = "";
    let searchNstate = "";
    let searchPstate = "";
    let searchDatagrade = "";
    let searchDatacourse = "";
    let searchfOccupation = "";
    let searchqualType = ""
    this.searchform.patchValue({    
      HiringStatusId: Number(this.searchform.value.HiringStatusId),
      ToAge: Number(this.searchform.value.ToAge),
      FromAge: Number(this.searchform.value.FromAge),
      FromPercentage: Number(this.searchform.value.FromPercentage),
      ToPercentage: Number(this.searchform.value.ToPercentage),
      fromDate: this.fDate.nativeElement.value == undefined ? "" : this.fDate.nativeElement.value,
      toDate: this.tDate.nativeElement.value == undefined ? "" : this.tDate.nativeElement.value,  //from and toDate added
      pagenumber : this.pagenumbercount
      //MRFRelativeStatus: Number(this.searchform.value.MRFRelativeStatus),
    })
    if (this.fDate.nativeElement.value.length > 0 && this.tDate.nativeElement.value.length > 0) {
      const [fDay, fMonth, fYear] = this.fDate.nativeElement.value.split("/");
      const fDate = new Date(fYear, fMonth - 1, fDay);
      const [tDay, tMonth, tYear] = this.tDate.nativeElement.value.split("/");
      const tDate = new Date(tYear, tMonth - 1, tDay);
      if (fDate > tDate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }
      if(this.searchform.value.verticalId.length >0){
        var vertiVals = "";
        for (var val of this.searchform.value.verticalId) {
          vertiVals += val.toString() + ","
        }
        searchdata = vertiVals.slice(0, -1);
      }
      if(this.searchform.value.functionId.length >0){
        var FuncVal = "";
        for (var Fun of this.searchform.value.functionId) {
          FuncVal += Fun.toString() + ","
        }
        searchdatafun = FuncVal.slice(0, -1);
      }
      if(this.searchform.value.locationId.length >0){
        var locVal = "";
        for (var loc of this.searchform.value.locationId) {
          locVal += loc.toString() + ","
        }
        searchdataloc = locVal.slice(0, -1);
      }
      if(this.searchform.value.departmentId.length >0){
        var deptVal = "";
        for (var dep of this.searchform.value.departmentId) {
          deptVal += dep.toString() + ","
        }
        searchdatadep = deptVal.slice(0, -1);
      }
      if(this.searchform.value.genderId.length >0){
        var genVal = "";
        for (var gen of this.searchform.value.genderId) {
          genVal += gen.toString() + ","
        }
        searchdataGender = genVal.slice(0, -1);
      }
      if(this.searchform.value.MotherTongueIds.length >0){
        var MtherTongueVal = "";
        for (var MTongue of this.searchform.value.MotherTongueIds) {
          MtherTongueVal += MTongue.toString() + ","
        }
        searchMotherTongue = MtherTongueVal.slice(0, -1);
      }

      if(this.searchform.value.LanguageKnownIds.length >0){
        var languageKnown = "";
        for (var lknown of this.searchform.value.LanguageKnownIds) {
          languageKnown += lknown.toString() + ","
        }
        searchlanguage = languageKnown.slice(0, -1);
      }
      if(this.searchform.value.BloodGroup.length >0){
        var bgroup = "";
        for (var bgr of this.searchform.value.BloodGroup) {
          bgroup += bgr.toString() + ","
        }
        searchbloodgroup = bgroup.slice(0, -1);
      }

      if(this.searchform.value.PermanentNativeState.length >0){
        var nstate = "";
        for (var nst of this.searchform.value.PermanentNativeState) {
          nstate += nst.toString() + ","
        }
        searchNstate = nstate.slice(0, -1);
      }

      if(this.searchform.value.CommunicationState.length >0){
        var pState = "";
        for (var pst of this.searchform.value.CommunicationState) {
          pState += pst.toString() + ","
        }
        searchPstate = pState.slice(0, -1);
      }
    
      if(this.searchform.value.gradeId.length >0){
        var gradeVla = "";
        for (var grd of this.searchform.value.gradeId) {
          gradeVla += grd.toString() + ","
        }
        searchDatagrade = gradeVla.slice(0, -1);
      }

      if(this.searchform.value.CourseIds.length >0){
        var courseVal = "";
        for (var crs of this.searchform.value.CourseIds) {
          courseVal += crs.toString() + ","
        }
        searchDatacourse = courseVal.slice(0, -1);
      }

      if(this.searchform.value.FatherOccupation.length>0)
      {
        var fOccupationVal = "";
        for(var focc of this.searchform.value.FatherOccupation){
          fOccupationVal += focc.toString() + ","
        }
        searchfOccupation = fOccupationVal.slice(0, -1);
      }

      if(this.searchform.value.QualificationTypeIds.length>0)
      {
        var qualTypeVal = "";
        for(var qtype of this.searchform.value.QualificationTypeIds){
          qualTypeVal += qtype.toString() + ","
        }
        searchqualType = qualTypeVal.slice(0, -1);
      }
      // if(this.searchform.value.FatherOccupation.length >0){
      //   var fOcuupationVal = "";
      //   for (var focc of this.searchform.value.FatherOccupation) {
      //     fOcuupationVal += focc.toString() + ","
      //   }
      //   searchDatafOcuupation = fOcuupationVal.slice(0, -1);
      // }

   
    this.CandidatemasterList = [];
    this.searchform.value.verticalId = searchdata;
    this.searchform.value.functionId = searchdatafun;
    this.searchform.value.locationId = searchdataloc;
    this.searchform.value.MotherTongueIds = searchMotherTongue;
    this.searchform.value.LanguageKnownIds = searchlanguage;
    this.searchform.value.BloodGroup = searchbloodgroup;
    this.searchform.value.genderId = searchdataGender == "" ? null : searchdataGender;
    this.searchform.value.departmentId = searchdatadep;
    this.searchform.value.PermanentNativeState = searchNstate;
    this.searchform.value.CommunicationState = searchPstate;
    this.searchform.value.gradeId = searchDatagrade;
    this.searchform.value.CourseIds = searchDatacourse;
    this.searchform.value.FatherOccupation = searchfOccupation==""? null: searchfOccupation;
    this.searchform.value.MRFRelativeStatus =  this.searchform.value.MRFRelativeStatus==null? 0 : this.searchform.value.MRFRelativeStatus;
    this.searchform.value.CandidateBVGReportId = this.searchform.value.CandidateBVGReportId==null? 0 : this.searchform.value.CandidateBVGReportId;
    this.searchform.value.EyeSightCorrected = this.searchform.value.EyeSightCorrected == ""? null : this.searchform.value.EyeSightCorrected;
    this.searchform.value.QualificationTypeIds = searchqualType;
    this.searchform.value.CronicMajorIllnessId = this.searchform.value.CronicMajorIllnessId==null? 0 : this.searchform.value.CronicMajorIllnessId;
    this.searchform.value.HandiCapId = this.searchform.value.HandiCapId==null? 0 : this.searchform.value.HandiCapId;
    
    if(flag==0){
    this.SpinnerService.show();
    // this.setFilterForm();           
    this.reportService.candidatemastergetAll(this.searchform.value).subscribe((result) => {
      if (result) {
        this.CandidatemasterList = result;
        //console.log('hii-',result);
        //console.log("Candidate: ", this.candidates);
        // for (var i = 0; i < this.candidates.length; i++) {
        //   this.candidates[i].popoverContent = "<div><span class='grey'>Emp. ID: </span><span>" + this.candidates[i].referalEmpNo + "</span></div><div><span class='grey'>Designation: </span></br><span>" + this.candidates[i].referalDesignation + "</span></div><div><span class='grey'>Function: </span><span>" + this.candidates[i].referalGrade + "</span></div>";
        // }    
        this.exportdata=this.exportdata.concat(this.CandidatemasterList)  ;
        this.loadDataTable();
        this.SpinnerService.hide();  
      }
      else {
        this.CandidatemasterList = [];      
        this.SpinnerService.hide();  
      }
    }, error => {
      console.log(error);  
      this.SpinnerService.hide();    
    }, () => {
      this.loadSelectPicker();      
      this.SpinnerService.hide();
    });
  }
  }
  getAllLanguages() {
    this.languages = [];
    this.searchLanguages.languageId = 0;
    this.searchLanguages.isActive = true;
    this.languageService.getAllLanguage(this.searchLanguages).subscribe((result) => {
      if (result) {
        this.languages = result;
      }
      else {
        this.languages = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  getAllQualificationType() {
    this.qualificationType = [];
    this.qualificationService.getAllQualificationType(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualificationType = result;
      }
      else {
        this.qualificationType = [];
      }
    }, error => {
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  getAllQualifications() {
    this.qualifications = [];
    this.qualificationService.getAllQualification(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;
      }
      else {
        this.qualifications = [];
      }
    }, error => {
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
//Course
getAllCourse() {
  this.SpinnerService.show();
  let value = {
    CourseId: 0,
    CourseName: ""
  }
  this.courseService.getAllCourse(value).subscribe((response: any) => {
    if (response) {
      this.courses = response;
    }
    else {
      this.courses = [];
    }
  }, error => {
    this.notificationService.showError("Something went wrong.. Try again later..", "")
    console.log(error);
  }, () => {
    this.SpinnerService.hide();
  })
}

//Father Occupation
getFatherOccupation() {
  this.fatherOccupationDetail = [];
  var data = {
    OccupationId: 0
  }
  this.commonService.getAllFatherOccupation(data).subscribe((result) => {
    if (result) {
      this.fatherOccupationDetail = result;
    }
    else{
      this.fatherOccupationDetail = [];
    }
  }, error => {
    console.log(error);
  }, () => {
    //this.loadSelectPicker();
  });
 }

// HiringStatus
getHiringStatus() {
  this.candidateLists = [];
  var obj = {
    hiringStatusId: 0
    //hiringStatusName: "",

  }
  //this.SearchCandidateNo.candidateNo = this.SearchCandidateNo.candidateNo;
  this.commonService.GetHiringStatus(obj).subscribe((result) => {
    if (result) {
      this.candidateLists = result;
    }
  }, error => {
    console.log(error);
  }, () => {
    //this.loadSelectPicker();
  });
 }
  ExportReport(){
    console.log("data",this.exportdata)
    this.excelService.ExportAsExcelFile(this.exportdata, 'Candidate_report_');
  }
  getAllVerticals() {            //arg
    this.verticals = [];
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
   // this.verticalsForReleaseTag = this.verticals;
    this.verticals.splice(0, 0, { verticalId: 0, verticalName: "All", isActive: true });
    this.loadSelectPicker();
    this.selectedVertical = this.verticals.filter(x => x.verticalId == 0)[0];
    
  }
  

  changeVertical() {
    var verticalId = this.searchform.get("verticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllFunction();
   
  }
  //function
  getAllFunction() {
    this.functions = [];
    var verticals = "";
    if (this.searchform.value.verticalId != null) {
      for (var val of this.searchform.value.verticalId) {
        verticals += val.toString() + ",";
      }
      this.searchFunction.verticalId = verticals.slice(0, -1);
      if (this.searchform.value.verticalId.includes(0)) {
        this.searchFunction.verticalId = "1,2,3";
      }
    }
    else {
      this.searchFunction.verticalId = "";
    }

    this.functionService.searchgetAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
      else {
        this.functions = [];
        this.functions.splice(0, 0, {
          functionId: 0,
          verticalId: 0,
          functionName: "All",
          verticalName: "",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  changeFunction(){
    // var functionId = this.searchform.get("functionId").value;
    // this.selectedFunction = this.functions.filter(x => x.functionId == functionId)[0];
    this.getAllFunctionDepartment();
  }
  
  //departments
  getAllFunctionDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.selectedVertical.verticalId;
    this.searchDepartment.functionId = this.searchform.value.functionId==""? null : this.searchform.value.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((response: any) => {
      if (response) {
        this.departments = response;
        this.departments.splice(0,0, {
          departmentId:0,
          departmentName:"All",
          verticalId:0,
          verticalName:"All",
          functionName:"All",
          functionId:0,
          isActive:true,
        })              
      }
      else {
        this.departments = [];
        this.departments.splice(0,0, {
          departmentId:0,
          departmentName:"All",
          verticalId:0,
          verticalName:"",
          functionName:"",
          functionId:0,
          isActive:true,
        }) 
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
      this.SpinnerService.hide(); 
    });
  }
   //locations
   getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
      else {
        this.locations = [];
        this.locations.splice(0, 0, {
          locationId: 0,
          verticalId: 0,
          locationNo: "All",
          locationCode: "",
          locationOffice: "All",
          isActive: true,
          createdBy: 0
        })
      }
    }, error => {
        console.log(error);
    }, () => {     
        this.loadSelectPicker();
        this.SpinnerService.hide(); 
    });
  }

   //grade
    getAllGrades() {
      this.gradeService.getAllGrade(this.searchGrade).subscribe((response: any) => {
        if (response) {
          this.grades = response;
          this.grades.splice(0, 0, {
            gradeId: 0,
            gradeName: "All",
            isActive: true,
            createdBy: 0
          })
        }
        else {
          this.grades = [];
          this.grades.splice(0, 0, {
            gradeId: 0,
            gradeName: "All",
            isActive: true,
            createdBy: 0
          })
        }
      }, error => {
        console.log(error);
      }, () => {
        this.loadSelectPicker();
          this.SpinnerService.hide(); 
      });
    }

  getAllCompletionYears() {
    this.CompletionYear = [];
    var currentyear = new Date().getFullYear();
    this.CompletionYear.push({ yearsId: parseInt("0"), yearsName: "Select" });
    for (var i = currentyear; i > currentyear - 40; i--) {
      this.CompletionYear.push({ yearsId: parseInt(i.toString()), yearsName: i.toString() });
    }
  }
  
   reset(){
    this.searchform.reset();
    this.searchform.patchValue({
      HiringStatusId: [0],
      verticalId: [],
      functionId:[],
      departmentId: [],
      locationId: [],
      genderId: [],
      LanguageKnownIds: [],
      MotherTongueIds: [],
      BloodGroup: [],
      PermanentNativeState: [],
      CommunicationState: [],
      gradeId: [],
      CourseIds: [],
      FatherOccupation: [],
      //CronicMajorIllnessDetails: [0],
      QualificationTypeIds:[],
      //CandidateBVGReportId: [],
    });
    this.onFilter();
    this.createFilterForm();
    this.getAllLanguages();
    this.getHiringStatus();
    this.getAllVerticals();
    this.getAllLocation();
    this.getAllFunction();
    this.getAllGrades();
    this.getAllFunctionDepartment();
  }


  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  loadDataTable() {
    jQuery('#dataTable1').DataTable().clear().destroy();
    setTimeout(() => {
      jQuery('#dataTable1').DataTable({
        "searching": true,
        "paging": true,
        "scrollX": true,
        "bLengthChange": false,
        "fixedColumns":{
          "left": 3
        }
      });
    });
  }     
}
