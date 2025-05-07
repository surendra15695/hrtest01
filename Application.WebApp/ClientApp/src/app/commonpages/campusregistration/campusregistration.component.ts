import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ICampusCandidate } from '../../interfaces/campus/campuscandidate.interface';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ICandidateData, ISearchCandidateData } from '../../interfaces/candidate/candidate.interface';
import { IPrefix, ISearchPrefix } from '../../interfaces/common/prefix.interface';
import { ILanguage, ISearchLanguage } from '../../interfaces/common/language.interface';
import { CommonService } from '../../services/common/common/common.service';
import { LanguageService } from '../../services/common/language/language.service';
import { ISearchStream, IStream, IQualificationCourseStream, ISearchQualificationCourseStream } from '../../interfaces/common/stream.interface';
import { StreamService } from '../../services/common/stream/stream.service';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from 'src/app/interfaces/common/course.interface';
import { CourseService } from '../../services/common/course/course.service';
import { IQualification, IQualificationType, ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { QualificationService } from '../../services/common/qualification/qualification.service';
import { IAge, IExperience, IMonths, IYears, IState, IDropDown } from 'src/app/interfaces/common/common.interface';
import { NotificationService } from '../../sharedservices/notification.service';
import { IQulificationUniversityBoard, ISearchQulificationUniversityBoard } from '../../interfaces/common/university.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service'
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import {
  ICampusLink, ISearchCampusLink} from '../../interfaces/campus/campusrequisition.interface';
import { Console } from 'console';
import { environment } from 'src/environments/environment';
declare var jQuery: any;

@Component({
  selector: 'app-campusregistration',
  templateUrl: './campusregistration.component.html',
  styleUrls: ['./campusregistration.component.css']
})
export class CampusregistrationComponent implements OnInit {
  saveForm: FormGroup;
  pageTitle: string = "Registration";
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('candidateResumeImport', { static: false }) candidateResumeImport: ElementRef;
  campusCandidate: any = {};
  campusCandidateAcademic: any[]=[];
  campusCandidateAcademicAnyOtherQualification: any[] = [];
  states: IState[] = [];
  languages: ILanguage[] = [];
  selectedLanguages: ILanguage;
  searchLanguages: ISearchLanguage = {
    languageId: null,
    isActive: null
  }
  campusLinks: ICampusLink[] = [];
  searchCampusLink: ISearchCampusLink = {
    campusCourseId: null,
    campusYearId: null,
    createdBy: null,
    campusLinkId: null
  }
  CompletionYear: IYears[] = [];
  tenCourseList: IQualificationCourse[] = [];
  twelveCourseList: IQualificationCourse[] = [];
  diplomaCourseList: IQualificationCourse[] = [];
  degreeCourses: IQualificationCourse[] = [];
  degreeCourseList: IQualificationCourse[] = [];
  postDegreeCourseList: IQualificationCourse[] = [];
  postDegreeCourses: IQualificationCourse[] = [];
  searchCourse: ISearchQualificationCourse = {
    qualificationId: null,
    courseId: null,
    isActive: true
  }
  readeye:boolean=false;
  readdisability:boolean=false;
  readhealth:boolean=false;
  degreeStreamList: IQualificationCourseStream[] = [];
  diplomaStreamList: IQualificationCourseStream[] = [];
  postDegreeStreamList: IQualificationCourseStream[] = [];
  selectedStream: IQualificationCourseStream;
  searchStream: ISearchQualificationCourseStream = {
    qualificationId: null,
    courseId: null,
    streamId: null,
    isActive: true
  }
  academicUniversity: IQulificationUniversityBoard[];
  searchUniversity: ISearchQulificationUniversityBoard = {
    qulificationUniversityBoardId: null,
    isActive: true
  }
  familyOccupations: IDropDown[] = [];
  motherOccupations: IDropDown[] = [];
  candidatefileToUpload: File = null;
  calcAge: string = "0";
  showTen: boolean = false;
  showTwelve: boolean = false;
  showDegree: boolean = false;
  showDiploma: boolean = false;
  showPG: boolean = false;
  showAnyOther: boolean = false;
  DOB: any;
  currentUrl:string;
  disableyear:boolean=false;
  disablemarks:boolean=false;
  disablecourse:boolean=false;
  disablediplomayear:boolean=false;
  disablediplomamarks:boolean=false;
  disablediplomacourse:boolean=false;
  disablediplomaspecial:boolean=false;
  disablediplomainstitute:boolean=false;
  disablediplomainstitutename:boolean=false;
  disablediplomainstitutelocation:boolean=false;
  disablegradyear:boolean=false;
  disablegradmarks:boolean=false;
  disablegradcourse:boolean=false;
  disablegradspecial:boolean=false;
  disablegradinstitute:boolean=false;
  disablegradinstitutename:boolean=false;
  disablegradinstitutelocation:boolean=false;
  disablepgyear:boolean=false;
  disablepgmarks:boolean=false;
  disablepgcourse:boolean=false;
  disablepgspecial:boolean=false;
  disablepginstitute:boolean=false;
  disablepginstitutename:boolean=false;
  disablepginstitutelocation:boolean=false;
  showsign:boolean=true;    // By Sayandeep on 05-08-2023
  isChecked:boolean=false;
  isValidEmail:boolean;
  extracuricullar:IDropDown[] = [];
  hidepginstitute:boolean=true;
  hideunderinstitute:boolean = true;
  hideanyotherinstitute:boolean=true;
  hidediplomainstitutename:boolean = true;
  markten:boolean = false;
  marktwelve:boolean = false;
  markdiploma:boolean = false;
  markundergrad:boolean = false;
  markpostgrad:boolean = false;
  markanyothr:boolean = false;
  invalidFileName:boolean=false;
  constructor(
    private notificationService: NotificationService,
    private commonService: CommonService,
    private courseService: CourseService,
    private streamService: StreamService,
    private qualificationService: QualificationService,
    private languageService: LanguageService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private _route: Router,
    private titleService: Title,
    private requisitionService: CampusrequisitionService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.currentUrl=this._route.url;
    this.currentUrl=this.currentUrl.replace("%3D","=").replace("%3D","=").replace("%3D","=");
    this.getAllCampusLink();
    this.getAllState();
    this.getAllLanguages();
    this.getAllCompletionYears();
    this.getAll10Course();
    this.getAll12Course();
    this.getAllDiplomaCourse();
    this.getAllDegreeCourses();
    this.getAllPGCourses();
    this.getAllUniversity();
    this.getAllFatherOccupations();
    this.getAllMotherOccupations();
    this.getALlExtraCuricullarActivities();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadDatePicker();

  }
 
  chck()
  {
    if(this.campusCandidate.TenMarks<30 || this.campusCandidate.TenMarks>100)
    {
      this.markten=true;
    }
    else{
      this.markten=false;
    }
  }
  chcktwelve()
  {
    if(this.campusCandidate.TwelveMarks<30 || this.campusCandidate.TwelveMarks>100)
    {
      this.marktwelve=true;
    }
    else{
      this.marktwelve=false;
    }
  }
  chckdiploma()
  {
    if(this.campusCandidate.DiplomaMarks<30 || this.campusCandidate.DiplomaMarks>100)
    {
      this.markdiploma=true;
    }
    else{
      this.markdiploma=false;
    }
  }
  chckundergrad()
  {
    if(this.campusCandidate.DegreeMarks<30 || this.campusCandidate.DegreeMarks>100)
    {
      this.markundergrad=true;
    }
    else{
      this.markundergrad=false;
    }
  }
  chckpostgrad()
  {
    if(this.campusCandidate.PostDegreeMarks<30 || this.campusCandidate.PostDegreeMarks>100)
    {
      this.markpostgrad=true;
    }
    else{
      this.markpostgrad=false;
    }
  }
  chckanyothr()
  {
    if(this.campusCandidate.AnyOtherQualificationMarks<30 || this.campusCandidate.AnyOtherQualificationMarks>100)
    {
      this.markanyothr=true;
    }
    else{
      this.markanyothr=false;
    }
  }
  getAllCampusLink() {
    this.SpinnerService.show();
    this.searchCampusLink.campusYearId = 0;
    this.searchCampusLink.createdBy = 0;
    this.requisitionService.getAllCampusLink(this.searchCampusLink).subscribe((response: any) => {
      if (response) {
        this.campusLinks = response;
        this.campusLinks=this.campusLinks.filter(x=>x.campusLink== environment.campuslink+this.currentUrl)
        setTimeout(() => {
          this.loadDatePicker();
        }, 200);
      }
      else {
        this.campusLinks = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }
  changeLanguageKnown()
  {
    
  }
  loadDatePicker() {
    var today = new Date();
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      endDate: today,
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      if (selecteddate != "") {
        var birthDate = new Date(selecteddate.substring(6, 10) + "/" + selecteddate.substring(3, 5) + "/" + selecteddate.substring(0, 2));
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        dothis.DOB = e.target.value;
        //dothis.saveForm.patchValue({ DOB: e.target.value });
        dothis.calcAge = age.toString();
        //this.saveForm.value.Age=age;
        jQuery("#txtAge").val(age);
      }
      else {
        jQuery("#txtAge").val("");
        dothis.calcAge = "0";
        dothis.saveForm.patchValue({ DOB: "" });
      }
    });

  }

  getAllState() {
    this.states = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.states = result;
      }
      else {
        this.states = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
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

  getAllCompletionYears() {
    this.CompletionYear = [];
    var currentyear = new Date().getFullYear()+1;
    this.CompletionYear.push({ yearsId: parseInt("0"), yearsName: "Select" });
    for (var i = currentyear; i > currentyear - 40; i--) {
      this.CompletionYear.push({ yearsId: parseInt(i.toString()), yearsName: i.toString() });
    }


  }

  getAll10Course() {
    this.tenCourseList = [];
    this.searchCourse.qualificationId = 10;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.tenCourseList = result;
      }
      else {
        this.tenCourseList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAll12Course() {
    this.twelveCourseList = [];
    this.searchCourse.qualificationId = 16;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.twelveCourseList = result;
      }
      else {
        this.twelveCourseList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllDiplomaCourse() {
    this.diplomaCourseList = [];
    this.searchCourse.qualificationId = 5;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.diplomaCourseList = result;
      }
      else {
        this.diplomaCourseList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllDegreeCourses() {
    this.degreeCourses = [];
    this.degreeCourseList = [];
    this.searchCourse.qualificationId = 2;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.degreeCourses = result;
        for (var i = 0; i < this.degreeCourses.length; i++) {
          this.degreeCourseList.push({
            qualificationId: 2,
            qualificationName: "",
            courseId: this.degreeCourses[i].courseId,
            courseName: this.degreeCourses[i].courseName,
            isActive: this.degreeCourses[i].isActive
          })
        }
      }
      else {
        this.degreeCourses = [];
        this.degreeCourseList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
    this.searchCourse.qualificationId = 4;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.degreeCourses = result;
        for (var i = 0; i < this.degreeCourses.length; i++) {
          this.degreeCourseList.push({
            qualificationId: 4,
            qualificationName: "",
            courseId: this.degreeCourses[i].courseId,
            courseName: this.degreeCourses[i].courseName,
            isActive: this.degreeCourses[i].isActive
          })
        }
      }
      else {
        this.degreeCourses = [];
        //this.degreeCourseList=[];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllPGCourses() {
    this.postDegreeCourseList = [];
    this.postDegreeCourses = [];
    this.searchCourse.qualificationId = 6;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.postDegreeCourses = result;
        for (var i = 0; i < this.postDegreeCourses.length; i++) {
          this.postDegreeCourseList.push({
            qualificationId: 6,
            qualificationName: "",
            courseId: this.postDegreeCourses[i].courseId,
            courseName: this.postDegreeCourses[i].courseName,
            isActive: this.postDegreeCourses[i].isActive
          })
        }
      }
      else {
        this.postDegreeCourses = [];
        this.postDegreeCourseList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });

    this.searchCourse.qualificationId = 3;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.postDegreeCourses = result;
        for (var i = 0; i < this.postDegreeCourses.length; i++) {
          this.postDegreeCourseList.push({
            qualificationId: 3,
            qualificationName: "",
            courseId: this.postDegreeCourses[i].courseId,
            courseName: this.postDegreeCourses[i].courseName,
            isActive: this.postDegreeCourses[i].isActive
          })
        }        
      }
      else {
        this.postDegreeCourses = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllDegreeStream(data) {
    this.degreeStreamList = [];
    this.searchStream.qualificationId = data.qualificationId;
    //this.searchStream.qualificationId = 2;
    this.searchStream.courseId = data.courseId;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.degreeStreamList = result;
      }
      else {
        this.degreeStreamList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllDiplomaStream(data) {
    this.diplomaStreamList = [];
    this.searchStream.qualificationId = 5;
    this.searchStream.courseId = data;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.diplomaStreamList = result;
      }
      else {
        this.diplomaStreamList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllPostDegreeStream(data) {
    this.postDegreeStreamList = [];
    this.searchStream.qualificationId = data.qualificationId;
    this.searchStream.courseId = data.courseId;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.postDegreeStreamList = result;
      }
      else {
        this.postDegreeStreamList = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllUniversity() {
    this.academicUniversity = [];
    this.commonService.getAllQualificationUniversityBoard(this.searchUniversity).subscribe((result) => {
      if (result) {
        this.academicUniversity = result;
        this.academicUniversity.push({
          qulificationUniversityBoardId: 0,
          qulificationUniversityBoardName: "Others",
          isActive: true
        })
      }
      else {
        this.academicUniversity = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllFatherOccupations() {
    this.familyOccupations = [];
    this.familyOccupations.push({ name: "Business", id: 1 });
    this.familyOccupations.push({ name: "Govt. Employee", id: 2 });
    this.familyOccupations.push({ name: "Private Sector", id: 3 });
    // this.familyOccupations.push({ name: "Housewife", id: 4 });
    this.familyOccupations.push({ name: "Retired", id: 5 });
    this.familyOccupations.push({ name: "Public Sector", id: 6 });
    this.familyOccupations.push({ name: "Self Employed", id: 7 });
    this.familyOccupations.push({ name: "Others", id: 8 });
  }
  getAllMotherOccupations() {
    this.motherOccupations = [];
    this.motherOccupations.push({ name: "Business", id: 1 });
    this.motherOccupations.push({ name: "Govt. Employee", id: 2 });
    this.motherOccupations.push({ name: "Private Sector", id: 3 });
    this.motherOccupations.push({ name: "Homemaker", id: 4 });
    this.motherOccupations.push({ name: "Retired", id: 5 });
    this.motherOccupations.push({ name: "Public Sector", id: 6 });
    this.motherOccupations.push({ name: "Self Employed", id: 7 });
    this.motherOccupations.push({ name: "Others", id: 8 });
  }
  getALlExtraCuricullarActivities(){
    this.extracuricullar = [];
    this.extracuricullar.push({ name: "NCC / Scouts", id: 1 });
    this.extracuricullar.push({ name: "National Service Scheme", id: 2 });
    this.extracuricullar.push({ name: "Sports", id: 3 });
    this.extracuricullar.push({ name: "Athletics", id: 4 });
    this.extracuricullar.push({ name: "Arts (Acting, Dance, Photography, Painting, etc)", id: 5 });
    this.extracuricullar.push({ name: "College Clubs (Cultural, Academic, OtherCometitions)", id: 6 });
    this.extracuricullar.push({ name: "Others", id: 7 });
  }
  changeQualification(data) {
    if (data == "-1") {
      this.showTen = true;
      this.showTwelve = false;
      this.showDegree = false;
      this.showDiploma = false;
      this.showPG = false;
      this.showAnyOther = true;
    }
    else if (data == "1") {
      this.showTen = true;
      this.showTwelve = true;
      this.showDegree = false;
      this.showDiploma = false;
      this.showPG = false;
      this.showAnyOther = true;
    }
    else if (data == "5") {
      if(this.campusCandidate.TwelveCourseStatus==3)
      {

      }
      this.showTen = true;
      this.showTwelve = true;
      this.showDegree = false;
      this.showDiploma = true;
      this.showPG = false;
      this.showAnyOther = true;
    }
    else if (data == "2" || data == "4") {
      this.showTen = true;
      this.showTwelve = true;
      this.showDegree = true;
      this.showDiploma = true;
      this.showPG = false;
      this.showAnyOther = true;
    }
    else if (data == "3" || data == "6") {
      this.showTen = true;
      this.showTwelve = true;
      this.showDegree = true;
      this.showDiploma = true;
      this.showPG = true;
      this.showAnyOther = true;
    }
  }
  onchangeeye(rec:any)
  {
    if(rec==0)
    {
      this.readeye=true;
      this.campusCandidate.EyeSightRight="";
      this.campusCandidate.EyeSightLeft="";
    }
    else{
      this.readeye=false;
    }
  }
  onchangedisab(rec:any)
  {
    if(rec==0)
    {
      this.readdisability=true;
      this.campusCandidate.DisabilityDetails="";
    }
    else{
      this.readdisability=false;
    }
  }
  onchangehealth(rec:any)
  {
    if(rec==0)
    {
      this.readhealth=true;
      this.campusCandidate.HealthIssueDetails="";
    }
    else{
      this.readhealth=false;
    }
  }
  onchangecourse(rec:any)
  {
    // console.log("defaultval",this.campusCandidate.TwelveCourses)
    if(rec==3)
    {
      this.disableyear=true;
      this.disablemarks=true;
      this.disablecourse=true;
      this.campusCandidate.TwelveCourses=undefined;
      this.campusCandidate.TwelveYearOfPassing=undefined;
      this.campusCandidate.TwelveMarks = undefined;
    }
    else if((rec==1)||(rec==2))
    {
      this.disableyear=false;
      this.disablemarks=false;
      this.disablecourse=false;
    }
  }
  onchangediploma(rec:any)
  {
    if(rec==3)
    {      
      this.disablediplomaspecial=true;
      this.disablediplomainstitute=true;
      this.disablediplomainstitutename=true;
      this.disablediplomainstitutelocation=true;
      this.disablediplomayear=true;
      this.disablediplomamarks=true;
      this.disablediplomacourse=true;
      this.campusCandidate.DiplomaCourses=undefined;
      this.campusCandidate.DiplomaStreams=undefined;
      this.campusCandidate.DiplomaUniversity=undefined;
      this.campusCandidate.DiplomaInstituteName=undefined;
      this.campusCandidate.DiplomaInstituteLocation=undefined;
      this.campusCandidate.DiplomaYearOfPassing=undefined;
      this.campusCandidate.DiplomaMarks=undefined;
    }
    else if((rec==1)||(rec==2))
    {
      this.disablediplomaspecial=false;
      this.disablediplomainstitute=false;
      this.disablediplomainstitutename=false;
      this.disablediplomainstitutelocation=false;
      this.disablediplomayear=false;
      this.disablediplomamarks=false;
      this.disablediplomacourse=false;
    }
  }
  onchangediplomainstitute(rec:any)
  {
    if(rec == 0)
    {
      this.hidediplomainstitutename = false;
    }
    else{
      this.hidediplomainstitutename = true;
    }
  }
  onchangeunderinstitute(rec:any)
  {
    if(rec == 0)
    {
      this.hideunderinstitute = false;
    }
    else{
      this.hideunderinstitute = true;
    }
  }
  onchangepginstitute(rec:any)
  {
    if(rec == 0)
    {
      this.hidepginstitute = false;
    }
    else{
      this.hidepginstitute = true;
    }
  }
  onchangeanyotherinstituteinstitute(rec:any)
  {
    if(rec == 0)
    {
      this.hideanyotherinstitute = false;
    }
    else{
      this.hideanyotherinstitute = true;
    }
  }
  onchangegraduation(rec:any)
  {
    if(rec==3)
    {      
      this.disablegradspecial=true;
      this.disablegradinstitute=true;
      this.disablegradinstitutename=true;
      this.disablegradinstitutelocation=true;
      this.disablegradyear=true;
      this.disablegradmarks=true;
      this.disablegradcourse=true;
      this.campusCandidate.DegreeCourses=undefined;
      this.campusCandidate.DegreeStreams=undefined;
      this.campusCandidate.DegreeUniversity=undefined;
      this.campusCandidate.DegreeInstituteName=undefined;
      this.campusCandidate.DegreeInstituteLocation=undefined;
      this.campusCandidate.DegreeYearOfPassing=undefined;
      this.campusCandidate.DegreeMarks=undefined;
    }
    else if((rec==1)||(rec==2))
    {
      this.disablegradspecial=false;
      this.disablegradinstitute=false;
      this.disablegradinstitutename=false;
      this.disablegradinstitutelocation=false;
      this.disablegradyear=false;
      this.disablegradmarks=false;
      this.disablegradcourse=false;
    }
  }
  onchangepg(rec:any)
  {
    if(rec==3)
    {      
      this.disablepgspecial=true;
      this.disablepginstitute=true;
      this.disablepginstitutename=true;
      this.disablepginstitutelocation=true;
      this.disablepgyear=true;
      this.disablepgmarks=true;
      this.disablepgcourse=true;
      this.campusCandidate.PostDegreeCourses=undefined;
      this.campusCandidate.PostDegreeStreams=undefined;
      this.campusCandidate.PostDegreeUniversity=undefined;
      this.campusCandidate.PostDegreeInstituteName=undefined;
      this.campusCandidate.PostDegreeInstituteLocation=undefined;
      this.campusCandidate.PostDegreeYearOfPassing=undefined;
      this. campusCandidate.PostDegreeMarks=undefined;
    }
    else if((rec==1)||(rec==2))
    {
      this.disablepgspecial=false;
      this.disablepginstitute=false;
      this.disablepginstitutename=false;
      this.disablepginstitutelocation=false;
      this.disablepgyear=false;
      this.disablepgmarks=false;
      this.disablepgcourse=false;
    }
  }
  onSubmit() {
    if(this.campusCandidate.EmailId!=""||this.campusCandidate.EmailId!=undefined)
    {
      this.validateEmail(this.campusCandidate.EmailId)
    }
    if(this.isvalid()){
    this.SpinnerService.show();
    this.campusCandidateAcademic = [];
    this.campusCandidateAcademicAnyOtherQualification = [];
    if (this.campusCandidate.HighestQualification == "-1") {
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 1,
        Qualification: 1,
        Course: this.campusCandidate.TenCourses,
        CourseStatus: this.campusCandidate.TenCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TenYearOfPassing,
        Marks: this.campusCandidate.TenMarks
      })
    }
    if (this.campusCandidate.HighestQualification == "1") {
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 1,
        Qualification: 1,
        Course: this.campusCandidate.TenCourses,
        CourseStatus: this.campusCandidate.TenCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TenYearOfPassing,
        Marks: this.campusCandidate.TenMarks
      })
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 2,
        Qualification: 1,
        Course: this.campusCandidate.TwelveCourses,
        CourseStatus: this.campusCandidate.TwelveCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
        Marks: this.campusCandidate.TwelveMarks
      })
    }
    if (this.campusCandidate.HighestQualification == "5") {
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 1,
        Qualification: 1,
        Course: this.campusCandidate.TenCourses,
        CourseStatus: this.campusCandidate.TenCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TenYearOfPassing,
        Marks: this.campusCandidate.TenMarks
      })
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 2,
        Qualification: 1,
        Course: this.campusCandidate.TwelveCourses,
        CourseStatus: this.campusCandidate.TwelveCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
        Marks: this.campusCandidate.TwelveMarks
      })
      if (this.campusCandidate.DiplomaCourses != undefined) {
        this.campusCandidateAcademic.push({
          CampusCandidateAcademicId: 0,
          CampusCandidateId: 0,
          VisualOrder: 3,
          Qualification: 5,
          Course: this.campusCandidate.DiplomaCourses,
          CourseStatus: this.campusCandidate.DiplomaCourseStatus,
          StreamName: this.campusCandidate.DiplomaStreams,
          Specalization: "",
          Instutation: this.campusCandidate.DiplomaUniversity,
          InstutationName: this.campusCandidate.DiplomaInstituteName==undefined?"":this.campusCandidate.DiplomaInstituteName,
          InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
          YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
          Marks: this.campusCandidate.DiplomaMarks
        })
      }

    }
    if (this.campusCandidate.HighestQualification == "2" || this.campusCandidate.HighestQualification == "4") {
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 1,
        Qualification: 1,
        Course: this.campusCandidate.TenCourses,
        CourseStatus: this.campusCandidate.TenCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TenYearOfPassing,
        Marks: this.campusCandidate.TenMarks
      })
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 2,
        Qualification: 1,
        Course: this.campusCandidate.TwelveCourses,
        CourseStatus: this.campusCandidate.TwelveCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
        Marks: this.campusCandidate.TwelveMarks
      })
      if (this.campusCandidate.DiplomaCourses != undefined) {
        this.campusCandidateAcademic.push({
          CampusCandidateAcademicId: 0,
          CampusCandidateId: 0,
          VisualOrder: 3,
          Qualification: 5,
          Course: this.campusCandidate.DiplomaCourses,
          CourseStatus: this.campusCandidate.DiplomaCourseStatus,
          StreamName: this.campusCandidate.DiplomaStreams,
          Specalization: "",
          Instutation: this.campusCandidate.DiplomaUniversity,
          InstutationName: this.campusCandidate.DiplomaInstituteName==undefined?"":this.campusCandidate.DiplomaInstituteName,
          InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
          YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
          Marks: this.campusCandidate.DiplomaMarks
        })
      }
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 4,
        Qualification: 2,
        Course: this.campusCandidate.DegreeCourses.courseId,
        CourseStatus: this.campusCandidate.DegreeCourseStatus,
        StreamName: this.campusCandidate.DegreeStreams,
        Specalization: "",
        Instutation: this.campusCandidate.DegreeUniversity,
        InstutationName: this.campusCandidate.DegreeInstituteName==undefined?"":this.campusCandidate.DegreeInstituteName,
        InstutationLocation: this.campusCandidate.DegreeInstituteLocation,
        YearOfPassing: this.campusCandidate.DegreeYearOfPassing,
        Marks: this.campusCandidate.DegreeMarks
      })

    }
    if (this.campusCandidate.HighestQualification == "3" || this.campusCandidate.HighestQualification == "6") {
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 1,
        Qualification: 1,
        Course: this.campusCandidate.TenCourses,
        CourseStatus: this.campusCandidate.TenCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TenYearOfPassing,
        Marks: this.campusCandidate.TenMarks
      })
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 2,
        Qualification: 1,
        Course: this.campusCandidate.TwelveCourses,
        CourseStatus: this.campusCandidate.TwelveCourseStatus,
        StreamName: 0,
        Specalization: "",
        Instutation: 0,
        InstutationName: "",
        InstutationLocation: 0,
        YearOfPassing: this.campusCandidate.TwelveYearOfPassing,
        Marks: this.campusCandidate.TwelveMarks
      })
      if (this.campusCandidate.DiplomaCourses != undefined) {
        this.campusCandidateAcademic.push({
          CampusCandidateAcademicId: 0,
          CampusCandidateId: 0,
          VisualOrder: 3,
          Qualification: 5,
          Course: this.campusCandidate.DiplomaCourses,
          CourseStatus: this.campusCandidate.DiplomaCourseStatus,
          StreamName: this.campusCandidate.DiplomaStreams,
          Specalization: "",
          Instutation: this.campusCandidate.DiplomaUniversity,
          InstutationName: this.campusCandidate.DiplomaInstituteName==undefined?"":this.campusCandidate.DiplomaInstituteName,
          InstutationLocation: this.campusCandidate.DiplomaInstituteLocation,
          YearOfPassing: this.campusCandidate.DiplomaYearOfPassing,
          Marks: this.campusCandidate.DiplomaMarks
        })
      }
      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 4,
        Qualification: 2,
        Course: this.campusCandidate.DegreeCourses.courseId,
        CourseStatus: this.campusCandidate.DegreeCourseStatus,
        StreamName: this.campusCandidate.DegreeStreams,
        Specalization: "",
        Instutation: this.campusCandidate.DegreeUniversity,
        InstutationName: this.campusCandidate.DegreeInstituteName==undefined?"":this.campusCandidate.DegreeInstituteName,
        InstutationLocation: this.campusCandidate.DegreeInstituteLocation,
        YearOfPassing: this.campusCandidate.DegreeYearOfPassing,
        Marks: this.campusCandidate.DegreeMarks
      })

      this.campusCandidateAcademic.push({
        CampusCandidateAcademicId: 0,
        CampusCandidateId: 0,
        VisualOrder: 5,
        Qualification: 3,
        Course: this.campusCandidate.PostDegreeCourses.courseId,
        CourseStatus: this.campusCandidate.PostDegreeCourseStatus,
        StreamName: this.campusCandidate.PostDegreeStreams,
        Specalization: "",
        Instutation: this.campusCandidate.PostDegreeUniversity,
        InstutationName: this.campusCandidate.PostDegreeInstituteName==undefined?"":this.campusCandidate.PostDegreeInstituteName,
        InstutationLocation: this.campusCandidate.PostDegreeInstituteLocation,
        YearOfPassing: this.campusCandidate.PostDegreeYearOfPassing,
        Marks: this.campusCandidate.PostDegreeMarks
      })

    }

    if((this.campusCandidate.AnyOtherQualification!=undefined || this.campusCandidate.AnyOtherQualification!="")
    &&(this.campusCandidate.AnyOtherQualificationCourse!=undefined || this.campusCandidate.AnyOtherQualificationCourse!="")
    &&(this.campusCandidate.AnyOtherQualificationCourseStatus!=undefined)
    &&(this.campusCandidate.AnyOtherQualificationStream!=undefined || this.campusCandidate.AnyOtherQualificationStream!="")
    &&(this.campusCandidate.AnyOtherQualificationInstitite!=undefined)
    &&(this.campusCandidate.AnyOtherQualificationInstititeLocation!=undefined )
    &&(this.campusCandidate.AnyOtherQualificationYearOfPassing!=undefined)
    &&(this.campusCandidate.AnyOtherQualificationMarks!=undefined)
    ){
      this.campusCandidateAcademicAnyOtherQualification=[];
      this.campusCandidateAcademicAnyOtherQualification.push({
        CampusCandidateAnyOtherQualificationId:0,
        CampusCandidateId:0,
        QualificationName:this.campusCandidate.AnyOtherQualification,
        CourseName:this.campusCandidate.AnyOtherQualificationCourse,
        CourseStatus:this.campusCandidate.AnyOtherQualificationCourseStatus,
        Specalization:this.campusCandidate.AnyOtherQualificationStream,
        Instutation:this.campusCandidate.AnyOtherQualificationInstitite,
        InstutationName:this.campusCandidate.AnyOtherQualificationInstititeName==undefined?"":this.campusCandidate.AnyOtherQualificationInstititeName,
        InstutationLocation:this.campusCandidate.AnyOtherQualificationInstititeLocation,
        YearOfPassing:this.campusCandidate.AnyOtherQualificationYearOfPassing,
        Marks:this.campusCandidate.AnyOtherQualificationMarks
      });
    }
      else{
        this.campusCandidateAcademicAnyOtherQualification=[];
      }

    
    const formData = new FormData();
      formData.append("CampusCandidateId", "0");
      formData.append("CampusLinkId", this.campusLinks[0].campusLinkId.toString());
      formData.append("CandidateId", "0");
      formData.append("FullName", this.campusCandidate.FullName);
      formData.append("Gender", this.campusCandidate.GenderId);
      formData.append("DOB", this.DOB);
      formData.append("Age", this.calcAge);
      formData.append("EmailId", this.campusCandidate.EmailId);
      formData.append("PhoneNo", this.campusCandidate.ContactNo);
      formData.append("AadharNo", this.campusCandidate.AadharNo);
      formData.append("MotherTongue", this.campusCandidate.MotherTongueId);
      formData.append("LanguageKnown", this.campusCandidate.LanguageIds);
      formData.append("Height", this.campusCandidate.Height);
      formData.append("Weight", this.campusCandidate.Weight);
      formData.append("HomeTown", this.campusCandidate.HomeTown);
      formData.append("NativeState", this.campusCandidate.NativeState);
      formData.append("PresentState", this.campusCandidate.PresentState);
      formData.append("HighestQualification", this.campusCandidate.HighestQualification);
      formData.append("EyeSightCorrected", this.campusCandidate.EyeSightCorrected==1?"true":"false");
      formData.append("EyeSightRight", this.campusCandidate.EyeSightRight==undefined?"0":this.campusCandidate.EyeSightRight);
      formData.append("EyeSightLeft", this.campusCandidate.EyeSightLeft==undefined?"0":this.campusCandidate.EyeSightLeft);
      formData.append("FatherOccupation", this.campusCandidate.FatherOccupation);
      formData.append("MotherOccupation", this.campusCandidate.MotherOccupation);
      formData.append("Disability", this.campusCandidate.Disability==1?"true":"false");
      formData.append("DisabilityDetails", this.campusCandidate.DisabilityDetails==undefined?"":this.campusCandidate.DisabilityDetails);
      formData.append("HealthIssue", this.campusCandidate.HealthIssue==1?"true":"false");
      formData.append("HealthIssueDetails", this.campusCandidate.HealthIssueDetails==undefined?"":this.campusCandidate.HealthIssueDetails);
      formData.append("NoofSiblings", this.campusCandidate.NoofSiblings);
      formData.append("YearsCommitments", this.campusCandidate.YearsCommitments);
      formData.append("AnyWhereinIndia", this.campusCandidate.AnyWhereinIndia);
      formData.append("WorkinginShift", this.campusCandidate.WorkinginShift);
      formData.append("JobTypePriority", this.campusCandidate.JobTypePriority);
      formData.append("CriticalFactor", this.campusCandidate.CriticalFactor);
      formData.append("MostPreferdBenifit", this.campusCandidate.MostPreferdBenifit);
      formData.append("ExtraCurricularActivities", this.campusCandidate.ExtraCurricularActivities);
      formData.append("ActiveArrears", this.campusCandidate.ActiveArrears);
      formData.append("DeletedIds", "0");
      formData.append("CreatedBy", "0");
      formData.append("CampusCandidateAcademic", JSON.stringify(this.campusCandidateAcademic));
      formData.append("CampusCandidateAnyOtherAcademic", JSON.stringify(this.campusCandidateAcademicAnyOtherQualification));
      formData.append("CandidateResumeFile", this.candidatefileToUpload);
      
      // this.SpinnerService.show();
      this.requisitionService.saveCampusCandidate(formData).subscribe((result) => {
        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "Success");
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }

      }, error => {
        // display form values on success
        this.notificationService.showError("Something went wrong.. Try again later..", "");
        this.SpinnerService.hide();
        
      });
    }
  }
  isvalid(){
    debugger;
    if(this.campusCandidate.FullName==""||this.campusCandidate.FullName==undefined){
      this.notificationService.showError("Please Enter Name","");
      return false;
    }
    else if(this.campusCandidate.GenderId==null||this.campusCandidate.GenderId==undefined){
      this.notificationService.showError("Please Enter Gender","");
      return false;
    }
    else if(this.campusCandidate.EmailId==""||this.campusCandidate.EmailId==undefined){
      this.notificationService.showError("Please Enter Email","");
      return false;
    }
    else if(this.isValidEmail==false)
    {
      this.notificationService.showError("Please Enter valid Email","");
      return false;
    }
    else if(this.campusCandidate.ContactNo==""||this.campusCandidate.ContactNo==undefined){
      this.notificationService.showError("Please Enter Phone No","");
      return false;
    }
    else if(this.campusCandidate.ContactNo.length<10){
      this.notificationService.showError("Please Enter 10 digits of Contact No","");
      return false;
    }
    else if(this.campusCandidate.AadharNo==""||this.campusCandidate.AadharNo==undefined){
      this.notificationService.showError("Please Enter Aadhar No","");
      return false;
    }
    else if(this.campusCandidate.AadharNo.length<12){
      this.notificationService.showError("Please Enter 12 digits of Aadhar No","");
      return false;
    }
    else if(this.campusCandidate.HomeTown==""||this.campusCandidate.HomeTown==undefined){
      this.notificationService.showError("Please Enter Home Town ","");
      return false;
    }
    else if(this.campusCandidate.NativeState==""||this.campusCandidate.NativeState==undefined){
      this.notificationService.showError("Please Enter Native State ","");
      return false;
    }
    else if(this.campusCandidate.PresentState==""||this.campusCandidate.PresentState==undefined){
      this.notificationService.showError("Please Enter Present State ","");
      return false;
    }
    else if(this.campusCandidate.MotherTongueId==""||this.campusCandidate.MotherTongueId==undefined){
      this.notificationService.showError("Please Enter Mother Tongue ","");
      return false;
    }
    else if(this.campusCandidate.LanguageIds==""||this.campusCandidate.LanguageIds==undefined){
      this.notificationService.showError("Please Enter Languages ","");
      return false;
    }
    else if(this.campusCandidate.Height == null || this.campusCandidate.Height==undefined){
      this.notificationService.showError("Please Enter Height ","");
      return false;
    }
    else if(Number(this.campusCandidate.Height)<100){
      this.notificationService.showError("Height less than 100cm is not accepted ","");
      return false;
    }
    
    else if(this.campusCandidate.Weight == null || this.campusCandidate.Weight==undefined){
      this.notificationService.showError("Please Enter Weight ","");
      return false;
    }
    else if(Number(this.campusCandidate.Weight)<30){
      this.notificationService.showError("Weight less than 30kg is not accepted ","");
      return false;
    }
    else if(this.campusCandidate.EyeSightCorrected==null||this.campusCandidate.EyeSightCorrected==undefined){
      this.notificationService.showError("Please Enter Eye Sight Corrected ","");
      return false;
    }
    else if((this.campusCandidate.EyeSightRight==null||this.campusCandidate.EyeSightRight==undefined)&&(this.campusCandidate.EyeSightCorrected==1)){
      this.notificationService.showError("Please Enter Eye Sight Right value ","");
      return false;
    }
    else if((this.campusCandidate.EyeSightLeft==null||this.campusCandidate.EyeSightLeft==undefined)&&(this.campusCandidate.EyeSightCorrected==1)){
      this.notificationService.showError("Please Enter Eye Sight Left value ","");
      return false;
    }
    else if(this.campusCandidate.FatherOccupation==""||this.campusCandidate.FatherOccupation==undefined){
      this.notificationService.showError("Please Enter Father Occupation ","");
      return false;
    }
    else if(this.campusCandidate.MotherOccupation==""||this.campusCandidate.MotherOccupation==undefined){
      this.notificationService.showError("Please Enter Mother Occupation ","");
      return false;
    }
    else if(this.campusCandidate.Disability==null||this.campusCandidate.Disability==undefined){
      this.notificationService.showError("Please Enter Disability ","");
      return false;
    }
    else if((this.campusCandidate.DisabilityDetails==null||this.campusCandidate.DisabilityDetails==undefined)&&(this.campusCandidate.Disability==1)){
      this.notificationService.showError("Please Enter Disability Details","");
      return false;
    }
    else if(this.campusCandidate.HealthIssue==null||this.campusCandidate.HealthIssue==undefined){
      this.notificationService.showError("Please Enter Health Issue ","");
      return false;
    }
    else if((this.campusCandidate.HealthIssueDetails==null||this.campusCandidate.HealthIssueDetails==undefined)&&(this.campusCandidate.HealthIssue==1)){
      this.notificationService.showError("Please Enter Health Issue Details","");
      return false;
    }
    else if(this.campusCandidate.NoofSiblings==""||this.campusCandidate.NoofSiblings==undefined){
      this.notificationService.showError("Please Enter No of Siblings ","");
      return false;
    }
    else if(Number(this.campusCandidate.NoofSiblings)>10){
      this.notificationService.showError("More than 10 siblings is not applicable ","");
      return false;
    }
    else if(this.campusCandidate.HighestQualification == null || this.campusCandidate.HighestQualification==undefined)
    {
      this.notificationService.showError("Please select Highest Qualification ","");
      return false;
    }
    // ten validation
    else if(this.campusCandidate.TenCourseStatus == null || this.campusCandidate.TenCourseStatus == undefined)
    {
        this.notificationService.showError("Please select High School Course Status ","");
        return false;
    }
    else if(this.campusCandidate.TenCourses == null || this.campusCandidate.TenCourses == undefined)
    {
        this.notificationService.showError("Please select High School Course","");
        return false;
    }
    else if(this.campusCandidate.TenYearOfPassing == null || this.campusCandidate.TenYearOfPassing == undefined)
    {
        this.notificationService.showError("Please select High School Year of Passing","");
        return false;
    }
    else if(this.campusCandidate.TenMarks == "" || this.campusCandidate.TenMarks == undefined)
    {
        this.notificationService.showError("Please select High School Marks","");
        return false;
    }
    else if(this.campusCandidate.TenMarks < 30 || this.campusCandidate.TenMarks > 100)
    {
        this.notificationService.showError("Enter between 30% to 100%","");
        return false;
    }
    // higher secondary validation
    else if(this.campusCandidate.TwelveCourseStatus == null || this.campusCandidate.TwelveCourseStatus == undefined)
    {
        this.notificationService.showError("Please select Higher Secondary Course Status ","");
        return false;
    }
    else if((this.campusCandidate.TwelveCourses == null || this.campusCandidate.TwelveCourses == undefined) && (this.campusCandidate.TwelveCourseStatus!=3))
    {
        this.notificationService.showError("Please select Higher Secondary Course","");
        return false;
    }
    else if((this.campusCandidate.TwelveYearOfPassing == null || this.campusCandidate.TwelveYearOfPassing == undefined)&& (this.campusCandidate.TwelveCourseStatus!=3))
    {
        this.notificationService.showError("Please select Higher Secondary Year of Passing","");
        return false;
    }
    else if((this.campusCandidate.TwelveMarks == "" || this.campusCandidate.TwelveMarks == undefined)&& (this.campusCandidate.TwelveCourseStatus!=3))
    {
        this.notificationService.showError("Please select Higher Secondary Marks","");
        return false;
    }
    else if(this.campusCandidate.TwelveMarks < 30 || this.campusCandidate.TwelveMarks > 100)
    {
        this.notificationService.showError("Enter between 30% to 100%","");
        return false;
    }
    // diploma validation
    else if(this.campusCandidate.DiplomaCourseStatus == null || this.campusCandidate.DiplomaCourseStatus == undefined)
    {
        this.notificationService.showError("Please select Diploma Course Status ","");
        return false;
    }
    else if((this.campusCandidate.DiplomaCourses == null || this.campusCandidate.DiplomaCourses == undefined) && (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Please select Diploma Course","");
        return false;
    }
    else if((this.campusCandidate.DiplomaStreams == null || this.campusCandidate.DiplomaStreams == undefined) && (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Please select Diploma Stream","");
        return false;
    }
    else if((this.campusCandidate.DiplomaUniversity == null || this.campusCandidate.DiplomaUniversity == undefined) && (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Please select Diploma Institution","");
        return false;
    }
    else if((this.campusCandidate.DiplomaInstituteName == null || this.campusCandidate.DiplomaInstituteName == undefined) && (this.campusCandidate.DiplomaCourseStatus!=3) && (this.campusCandidate.DiplomaUniversity==0))
    {
        this.notificationService.showError("Please select Diploma Institute Name","");
        return false;
    }
    else if((this.campusCandidate.DiplomaInstituteLocation == null || this.campusCandidate.DiplomaInstituteLocation == undefined) && (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Please select Diploma Institution Location","");
        return false;
    }
    else if((this.campusCandidate.DiplomaYearOfPassing == null || this.campusCandidate.DiplomaYearOfPassing == undefined)&& (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Please select Diploma Year of Passing","");
        return false;
    }
    else if((this.campusCandidate.DiplomaMarks == "" || this.campusCandidate.DiplomaMarks == undefined)&& (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Please select Diploma Marks","");
        return false;
    }
    else if((this.campusCandidate.DiplomaMarks<30 || this.campusCandidate.DiplomaMarks > 100)&& (this.campusCandidate.DiplomaCourseStatus!=3))
    {
        this.notificationService.showError("Enter between 30% to 100% ","");
        return false;
    }
    // Under Grad Validation
    else if((this.campusCandidate.DegreeCourseStatus == null || this.campusCandidate.DegreeCourseStatus == undefined) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Course Status ","");
        return false;
    }
    else if((this.campusCandidate.DegreeCourses == null || this.campusCandidate.DegreeCourses == undefined) && (this.campusCandidate.DegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Course","");
        return false;
    }
    else if((this.campusCandidate.DegreeStreams == null || this.campusCandidate.DegreeStreams == undefined) && (this.campusCandidate.DegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Stream","");
        return false;
    }
    else if((this.campusCandidate.DegreeUniversity == null || this.campusCandidate.DegreeUniversity == undefined) && (this.campusCandidate.DegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Institution","");
        return false;
    }
    else if((this.campusCandidate.DegreeInstituteName == null || this.campusCandidate.DegreeInstituteName == undefined) && (this.campusCandidate.DegreeCourseStatus!=3) && (this.campusCandidate.DegreeUniversity==0) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Institute Name","");
        return false;
    }
    else if((this.campusCandidate.DegreeInstituteLocation == null || this.campusCandidate.DegreeInstituteLocation == undefined) && (this.campusCandidate.DegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Institution Location","");
        return false;
    }
    else if((this.campusCandidate.DegreeYearOfPassing == null || this.campusCandidate.DegreeYearOfPassing == undefined)&& (this.campusCandidate.DegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Year of Passing","");
        return false;
    }
    else if((this.campusCandidate.DegreeMarks == "" || this.campusCandidate.DegreeMarks == undefined)&& (this.campusCandidate.DegreeCourseStatus!=3)&& (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Please select Under Graduation Marks","");
        return false;
    }
    else if((this.campusCandidate.DegreeMarks < 30 || this.campusCandidate.DegreeMarks > 100)&& (this.campusCandidate.DegreeCourseStatus!=3)&& (this.campusCandidate.HighestQualification==2 || this.campusCandidate.HighestQualification==6 || this.campusCandidate.HighestQualification==3))
    {
        this.notificationService.showError("Enter between 30% to 100% ","");
        return false;
    }
    // pg / pg diploma validation
    else if((this.campusCandidate.PostDegreeCourseStatus == null || this.campusCandidate.PostDegreeCourseStatus == undefined) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6 ))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Course Status ","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeCourses == null || this.campusCandidate.PostDegreeCourses == undefined) && (this.campusCandidate.PostDegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Course","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeStreams == null || this.campusCandidate.PostDegreeStreams == undefined) && (this.campusCandidate.PostDegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Stream","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeUniversity == null || this.campusCandidate.PostDegreeUniversity == undefined) && (this.campusCandidate.PostDegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Institution","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeInstituteName == null || this.campusCandidate.PostDegreeInstituteName == undefined) && (this.campusCandidate.PostDegreeCourseStatus!=3) && (this.campusCandidate.PostDegreeUniversity==0) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Institute Name","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeInstituteLocation == null || this.campusCandidate.PostDegreeInstituteLocation == undefined) && (this.campusCandidate.PostDegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Institution Location","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeYearOfPassing == null || this.campusCandidate.PostDegreeYearOfPassing == undefined)&& (this.campusCandidate.PostDegreeCourseStatus!=3) && (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Year of Passing","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeMarks == "" || this.campusCandidate.PostDegreeMarks == undefined)&& (this.campusCandidate.PostDegreeCourseStatus!=3)&& (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Please select Post Graduation / PG Diploma Marks","");
        return false;
    }
    else if((this.campusCandidate.PostDegreeMarks <30 || this.campusCandidate.PostDegreeMarks > 100)&& (this.campusCandidate.PostDegreeCourseStatus!=3)&& (this.campusCandidate.HighestQualification==3 || this.campusCandidate.HighestQualification==6))
    {
        this.notificationService.showError("Enter between 30% to 100%","");
        return false;
    }
    else if((this.campusCandidate.AnyOtherQualificationMarks <30 || this.campusCandidate.AnyOtherQualificationMarks > 100)&& (this.campusCandidate.AnyOtherQualificationMarks!=undefined)&& (this.campusCandidate.AnyOtherQualificationMarks!=""))
    {
        this.notificationService.showError("Enter between 30% to 100%","");
        return false;
    }
    // else if(this.campusCandidateAcademic.length==0){
    //   this.notificationService.showError("Please Enter Academic Details ","");
    //   return false;
    // }
    else if(this.campusCandidate.YearsCommitments==null||this.campusCandidate.YearsCommitments==undefined){
      this.notificationService.showError("Please Enter Years Commitments ","");
      return false;
    }
    else if(this.campusCandidate.AnyWhereinIndia==null||this.campusCandidate.AnyWhereinIndia==undefined){
      this.notificationService.showError("Please Enter AnyWhere in India ","");
      return false;
    }
    else if(this.campusCandidate.WorkinginShift==null||this.campusCandidate.WorkinginShift==undefined){
      this.notificationService.showError("Please Enter Working Shift ","");
      return false;
    }
    else if(this.campusCandidate.JobTypePriority==""||this.campusCandidate.JobTypePriority==undefined){
      this.notificationService.showError("Please Enter Job Type Priority ","");
      return false;
    }
    else if(this.campusCandidate.CriticalFactor==""||this.campusCandidate.CriticalFactor==undefined){
      this.notificationService.showError("Please Enter Critical Factor ","");
      return false;
    }
    else if(this.campusCandidate.MostPreferdBenifit==null||this.campusCandidate.MostPreferdBenifit==undefined){
      this.notificationService.showError("Please Enter Most Preferd Benifit ","");
      return false;
    }
    else if(this.campusCandidate.ExtraCurricularActivities==null||this.campusCandidate.ExtraCurricularActivities==undefined){
      this.notificationService.showError("Please Enter Extra Curricular Activities ","");
      return false;
    }
    else if(this.campusCandidate.ActiveArrears==null||this.campusCandidate.ActiveArrears==undefined){
      this.notificationService.showError("Please Enter Active Arrears ","");
      return false;
    }
    // else if(this.campusCandidate.candidatefileToUpload==""||this.campusCandidate.candidatefileToUpload==undefined){
    //   this.notificationService.showError("Please Enter Resume ","");
    // return false;
    // }
    else if(this.candidatefileToUpload==null){
      this.notificationService.showError("Please upload Resume ","");
    return false;
    }
    else if(this.candidatefileToUpload.size>512000){
      this.notificationService.showError("Resume Size Can't be greater than 500KB","");
    return false;
    }
    else if(this.isChecked==false){
      this.notificationService.showError("Please Accept the Terms and Conditions ","");
      return false;
    }
    else{
      return true;
    }
  }
  validateEmail(email : any) {
    // Regular expression to validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    this.isValidEmail = emailPattern.test(email);
  }
  onFileChange(files: FileList) {
    this.invalidFileName = false;
    var filenameforValidationCheck = files[0].name.replace(".pdf", "");
    const specialChars = [' ', '.', ',', '-', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '=', '[', ']', '{', '}', '|', '\\', ':', ';', '\'', '"', '<', '>', ',', '/', '?', '!', '`', '~'];
    specialChars.forEach(element => {
      if (filenameforValidationCheck.includes(element)) {
        this.invalidFileName = true;
      }
    })
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
      return;
    }
    if (this.invalidFileName) {
      this.notificationService.showError("Please Remove Space, special characters from name of the pdf", "Error");
      this.candidateResumeImport.nativeElement.innerText = "Choose file";
      this.candidatefileToUpload = null;
      return;
    }
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notificationService.showError("File should be less than 2MB!", "Error");
        this.candidateResumeImport.nativeElement.innerText = "Choose file";
        this.candidatefileToUpload = null;
      } else {
        this.candidateResumeImport.nativeElement.innerText = files[0].name;
        this.candidatefileToUpload = files.item(0);
      }
    }
    else {
      this.candidateResumeImport.nativeElement.innerText = "Choose file";
      this.candidatefileToUpload = null;
    }
  }
  onclickback()
  {
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  numberOnlymarks(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode == 46){
      return true;
    }
    else if  (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    else{
      return true;
    }
  }
  numberOnlyeye(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (((charCode >47 && charCode <58)) || charCode==43 || charCode==45 || charCode==46) {
      return true;
    }
    return false;
  }
  email(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if ( (charCode >47 && charCode <58) || (charCode>96 && charCode <123 ) || charCode==64 || charCode==46 ) {
      return true;
    }
    return false;
  }
  checkValue(event: any){
    if(event.target.checked==true)
    {
      this.isChecked = true;
    }
    else
    {
      this.isChecked = false;
    }
 }
  getCandidateDetails(status) {
    // if(status==true){

    // }
    // else{
    // this.campusCandidate={
    //   PrefixId:undefined,
    //   FullName:"",
    //   DOB:"",
    //   Age:undefined,
    //   GenderId:undefined,
    //   EmailId:"",
    //   ContactNo:"",
    //   AadharNo:"",
    //   MotherTongueId:undefined,
    //   LanguageIds:"",
    //   HomeTown:"",
    //   NativeState:undefined,
    //   PresentState:undefined,
    //   Height:undefined,
    //   Weight:undefined,
    //   EyeSightCorrected:undefined,
    //   EyeSightRight:undefined,
    //   EyeSightLeft:undefined,
    //   FatherOccupation:undefined,
    //   MotherOccupation:undefined,
    //   Disability:undefined,
    //   DisabilityDetails:"",
    //   HealthIssue:undefined,
    //   HealthIssueDetails:"",
    //   NoofSiblings:undefined,
    // }
    //}
  }

}
