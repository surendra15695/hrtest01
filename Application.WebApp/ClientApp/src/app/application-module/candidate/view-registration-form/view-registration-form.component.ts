import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from 'src/app/interfaces/common/course.interface';
import { IQualification, IQualificationType, ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { IAge, IExperience, IMonths, IYears, IState, IDropDown } from 'src/app/interfaces/common/common.interface';
import { CampuscommonService } from 'src/app/services/campus/common/campuscommon.service'
import { CampusrequisitionService } from 'src/app/services/campus/campusrequisition/campusrequisition.service'
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { Console } from 'console';
import { ILanguage, ISearchLanguage } from 'src/app/interfaces/common/language.interface';
import { ICampusLink, ISearchCampusLink } from 'src/app/interfaces/campus/campusrequisition.interface';
import { IQualificationCourseStream, ISearchQualificationCourseStream } from 'src/app/interfaces/common/stream.interface';
import { IQulificationUniversityBoard, ISearchQulificationUniversityBoard } from 'src/app/interfaces/common/university.interface';
import { NotificationService } from 'src/app/sharedservices/notification.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { CourseService } from 'src/app/services/common/course/course.service';
import { StreamService } from 'src/app/services/common/stream/stream.service';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { LanguageService } from 'src/app/services/common/language/language.service';
import { PersistanceService } from 'src/app/sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-view-registration-form',
  templateUrl: './view-registration-form.component.html',
  styleUrls: ['./view-registration-form.component.css']
})
export class ViewRegistrationFormComponent implements OnInit {

  
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
    isActive: null
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
  candidateId:any;
  newarray : any[]=[]
  newarray2 : any[]=[];
  linkid:any;
  Remark : any;
  academic : any[] = [];
  otheracademic: any[] = [];
  showotheracademic: boolean=false;
  extracuricullar:IDropDown[] = [];;
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
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService,
  ) {
    this.currentUrl=this._route.url;
    this.currentUrl=this.currentUrl.replace("%3D","=").replace("%3D","=").replace("%3D","=");
    
    // this.getAllCampusLink();
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
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "candidateregistrationformview" ) {
        this.SpinnerService.show();
        this.candidateId = this.persistance.get('candidateId');
      }
    }
    console.log("chck",this.candidateId)
    this.getRegistrationRemarks();
    this.getRegistrationDetails();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadDatePicker();

  }
  getRegistrationRemarks(){
    // this.candidateId=1045;
    let obj = {
      CandidateId : this.candidateId,
      FormtypeId : 1
    }
    this.requisitionService.getCandidateRegistrationRemarks(obj).subscribe((response: any) => {
      if (response) {
        console.log("remark",response);
        this.Remark=response[0].remarks;
      }
    })
  }
  getALlExtraCuricullarActivities(){
    this.extracuricullar = [];
    this.extracuricullar.push({ name: "NCC / Scouts", id: 1 });
    this.extracuricullar.push({ name: "National Service Scheme", id: 2 });
    this.extracuricullar.push({ name: "Sports", id: 3 });
    this.extracuricullar.push({ name: "Athletics", id: 4 });
    this.extracuricullar.push({ name: "Arts(Acting,Dance,Photography,Painting,etc)", id: 5 });
    this.extracuricullar.push({ name: "College Clubs (Cultural,Academic,OtherCometitions)", id: 6 });
    this.extracuricullar.push({ name: "Others", id: 7 });
  }
  getRegistrationDetails(){
    // this.campusCandidate=null;
    this.SpinnerService.show();
    // this.candidateId=1045;
    this.newarray=[];
    let obj = {
      CandidateId : this.candidateId
    }
    this.requisitionService.getCandidateRegistrationDetail(obj).subscribe((response: any) => {
      if (response) {
        console.log("result",response)
        this.academic=response.academicData;
        this.academic.forEach(element => {
          if(element.visualOrder==1)
          {
            element.academicdetail = "10th Standard / High School";
          }
          else if(element.visualOrder==2)
          {
            element.academicdetail = "12th Standard / Higher Secondary";
          }
          else if(element.visualOrder==3)
          {
            element.academicdetail = "Diploma / Equivalent Diploma";
          }
          else if(element.visualOrder==4)
          {
            element.academicdetail = "Under Graduation";
          }
          else if(element.visualOrder==5)
          {
            element.academicdetail = "Post Graduation / PG Diploma";
          }
          if(element.marks=="0.00")
          {
            element.marks = "NA";
          }
          if(element.yearOfPassing=='0')
          {
            element.yearOfPassing = "NA";
          }
          if(element.courseStatus=="2")
          {
            element.courseStatusName = "Completed";
          }
          if(element.courseStatus=="1")
          {
            element.courseStatusName = "Pursuing";
          }
          if(element.courseStatus=="3")
          {
            element.courseStatusName = "NA";
          }
        })
        console.log("academic",this.academic)
        this.otheracademic = response.otherAcademicData;
        if(this.otheracademic.length!=0){
          this.showotheracademic = true
        }
        else{
          this.showotheracademic = false
        }
        this.linkid=response.profileData[0].campusLinkId;
        this.campusCandidate.FullName=response.profileData[0].fullName;
        this.campusCandidate.GenderId=response.profileData[0].genderId;
        this.campusCandidate.DOB=response.profileData[0].dob;
        this.campusCandidate.Age=response.profileData[0].age;
        this.campusCandidate.EmailId=response.profileData[0].emailId;
        this.campusCandidate.ContactNo=response.profileData[0].phoneNo;
        this.campusCandidate.AadharNo=response.profileData[0].aadharNo;
        this.campusCandidate.HomeTown=response.profileData[0].homeTown;
        this.campusCandidate.NativeState=Number(response.profileData[0].nativeState);
        this.campusCandidate.PresentState=Number(response.profileData[0].presentState);
        this.campusCandidate.MotherTongueId=Number(response.profileData[0].motherTongue);
        var array = response.profileData[0].languageIds.split(',');
        for(let i=0;i<array.length;i++)
        {
          
          this.newarray.push(Number(array[i]))
        }
        this.campusCandidate.LanguageIds=this.newarray;
        var array2 = response.profileData[0].extraCurricularActivities.split(',');
        for(let i=0;i<array2.length;i++)
        {
          
          this.newarray2.push(Number(array2[i]))
        }
        this.campusCandidate.ExtraCurricularActivities=this.newarray2;
        this.campusCandidate.Height=response.profileData[0].height;
        this.campusCandidate.Weight=response.profileData[0].weight;
        if(response.profileData[0].eyeSightCorrected=="False"){
          this.campusCandidate.EyeSightCorrected=0;
        }else{
          this.campusCandidate.EyeSightCorrected=1;
        }
        this.campusCandidate.EyeSightRight=response.profileData[0].eyeSightRight;
        this.campusCandidate.EyeSightLeft=response.profileData[0].eyeSightLeft;
        this.campusCandidate.FatherOccupation=Number(response.profileData[0].fatherOccupation);
        this.campusCandidate.MotherOccupation=Number(response.profileData[0].motherOccupation);
        if(response.profileData[0].disability=="False"){
          this.campusCandidate.Disability=0;
        }
        else
        {
          this.campusCandidate.Disability=1;
        }
        if(response.profileData[0].healthIssue=="False"){
          this.campusCandidate.HealthIssue=0;
        }
        else{
          this.campusCandidate.HealthIssue=1;
        }
        this.campusCandidate.DisabilityDetails=response.profileData[0].disabilityDetails;
        this.campusCandidate.HealthIssueDetails=response.profileData[0].healthIssueDetails;
        this.campusCandidate.NoofSiblings=response.profileData[0].noofSiblings;
        this.campusCandidate.YearsCommitments=Number(response.profileData[0].yearsCommitments);
        this.campusCandidate.ActiveArrears = Number(response.profileData[0].activeArrears);
        this.campusCandidate.AnyWhereinIndia=Number(response.profileData[0].anyWhereinIndia);
        this.campusCandidate.JobTypePriority=Number(response.profileData[0].jobTypePriority);
        this.campusCandidate.CriticalFactor=Number(response.profileData[0].criticalFactor);
        this.campusCandidate.MostPreferdBenifit=Number(response.profileData[0].mostPreferdBenifit);
        this.campusCandidate.WorkinginShift=Number(response.profileData[0].workinginShift);
        console.log("profile data",this.campusCandidate)
        // if(this.campusCandidate != undefined)
        // {

        // }
      }
    })
  }
  // getAllCampusLink() {
  //   this.SpinnerService.show();
  //   this.searchCampusLink.campusYearId = 0;
  //   this.searchCampusLink.createdBy = 0;
  //   this.requisitionService.getAllCampusLink(this.searchCampusLink).subscribe((response: any) => {
  //     if (response) {
  //       this.campusLinks = response;
  //       console.log("Current Link",this.campusLinks);
  //       console.log("url",this.currentUrl)
  //       this.campusLinks=this.campusLinks.filter(x=>x.campusLink=="https://mrfhruat.azurewebsites.net"+this.currentUrl)
  //       console.log("Link",this.campusLinks[0]);
  //     }
  //     else {
  //       this.campusLinks = [];
  //     }
  //   }, error => {
  //     this.notificationService.showError("Something went wrong.. Try again later..", "")
  //     console.log(error);
  //   }, () => {
  //     this.SpinnerService.hide();
  //   })
  // }
  changeLanguageKnown()
  {
    console.log("find",this.campusCandidate.LanguageIds)
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
        console.log(result);
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
    this.searchCourse.qualificationId = 1;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.tenCourseList = result;
        console.log("COURSE",result);
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
    this.searchCourse.qualificationId = 1;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.twelveCourseList = result;
        console.log(result);
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
        console.log(result);
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
        console.log(result);
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
            qualificationId: 2,
            qualificationName: "",
            courseId: this.degreeCourses[i].courseId,
            courseName: this.degreeCourses[i].courseName,
            isActive: this.degreeCourses[i].isActive
          })
        }
        console.log(result);
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
            qualificationId: 2,
            qualificationName: "",
            courseId: this.postDegreeCourses[i].courseId,
            courseName: this.postDegreeCourses[i].courseName,
            isActive: this.postDegreeCourses[i].isActive
          })
        }
        console.log(result);
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
            qualificationId: 2,
            qualificationName: "",
            courseId: this.postDegreeCourses[i].courseId,
            courseName: this.postDegreeCourses[i].courseName,
            isActive: this.postDegreeCourses[i].isActive
          })
        }
        console.log(result);
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
    //this.searchStream.qualificationId = 2;
    this.searchStream.courseId = data;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.degreeStreamList = result;
        console.log(result);
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
    console.log(data);
    this.diplomaStreamList = [];
    this.searchStream.qualificationId = 5;
    this.searchStream.courseId = data;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.diplomaStreamList = result;
        console.log(result);
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
    this.searchStream.qualificationId = 3;
    this.searchStream.courseId = data;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.postDegreeStreamList = result;
        console.log(result);
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
        console.log(result);
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
    this.familyOccupations.push({ name: "Public sector", id: 6 });
    this.familyOccupations.push({ name: "Self employed", id: 7 });
    this.familyOccupations.push({ name: "Others", id: 8 });
  }
  getAllMotherOccupations() {
    this.motherOccupations = [];
    this.motherOccupations.push({ name: "Business", id: 1 });
    this.motherOccupations.push({ name: "Govt. Employee", id: 2 });
    this.motherOccupations.push({ name: "Private Sector", id: 3 });
    this.motherOccupations.push({ name: "Homemaker", id: 4 });
    this.motherOccupations.push({ name: "Retired", id: 5 });
    this.motherOccupations.push({ name: "Public sector", id: 6 });
    this.motherOccupations.push({ name: "Self employed", id: 7 });
    this.motherOccupations.push({ name: "Others", id: 8 });
  }

  changeQualification(data) {
    console.log(data);
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
        console.log("return",true)
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
  onchangecourse(rec:any)
  {
    if(rec==3)
    {
      console.log("show",true);
      this.disableyear=true;
      this.disablemarks=true;
    }
    else if((rec==1)||(rec==2))
    {
      this.disableyear=false;
      this.disablemarks=false;
    }
  }
  onchangediploma(rec:any)
  {
    if(rec==3)
    {
      console.log("show",true);
      this.disableyear=true;
      this.disablemarks=true;
    }
    else if((rec==1)||(rec==2))
    {
      this.disableyear=false;
      this.disablemarks=false;
    }
  }
  onchangegraduation(rec:any)
  {
    if(rec==3)
    {
      console.log("show",true);
      this.disableyear=true;
      this.disablemarks=true;
    }
    else if((rec==1)||(rec==2))
    {
      this.disableyear=false;
      this.disablemarks=false;
    }
  }
  onchangepg(rec:any)
  {
    if(rec==3)
    {
      console.log("show",true);
      this.disableyear=true;
      this.disablemarks=true;
    }
    else if((rec==1)||(rec==2))
    {
      this.disableyear=false;
      this.disablemarks=false;
    }
  }
  onSubmit() {
    console.log("id",this.linkid,this.candidateId)
    if(this.isvalid()){
    this.campusCandidateAcademic = [];
    this.campusCandidateAcademicAnyOtherQualification = [];
    console.log("highqualification",this.campusCandidate.HighestQualification)
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
        Course: this.campusCandidate.DegreeCourses,
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
        Course: this.campusCandidate.DegreeCourses,
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
        Course: this.campusCandidate.PostDegreeCourses,
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
    
    var canid = this.candidateId.toString();
    const formData = new FormData();
      formData.append("CampusCandidateId", "0");
      formData.append("CampusLinkId", this.linkid);
      formData.append("CandidateId", canid);
      formData.append("FullName", this.campusCandidate.FullName);
      formData.append("Gender", this.campusCandidate.GenderId);
      if(this.DOB!=undefined){
        formData.append("DOB", this.DOB);
      }
      else{
        formData.append("DOB", this.campusCandidate.DOB);
      }
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
      formData.append("DeletedIds", "0");
      formData.append("CreatedBy", "0");
      formData.append("CampusCandidateAcademic", JSON.stringify(this.campusCandidateAcademic));
      formData.append("CampusCandidateAnyOtherAcademic", JSON.stringify(this.campusCandidateAcademicAnyOtherQualification));
      formData.append("CandidateResumeFile", this.candidatefileToUpload);

      this.requisitionService.editCampusCandidate(formData).subscribe((result) => {
        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "Success");
          
        }
        else {
          this.notificationService.showError(result.msg, "Error");
          
        }

      }, error => {
        // display form values on success
        this.notificationService.showError("Something went wrong.. Try again later..", "");
        
      });
    }
  }
  isvalid(){
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
    else if(this.campusCandidate.ContactNo==""||this.campusCandidate.ContactNo==undefined){
      this.notificationService.showError("Please Enter Phone No","");
      return false;
    }
    else if(this.campusCandidate.AadharNo==""||this.campusCandidate.AadharNo==undefined){
      this.notificationService.showError("Please Enter Aadhar No","");
      return false;
    }
    else if(this.campusCandidate.HomeTown==""||this.campusCandidate.HomeTown==undefined){
      this.notificationService.showError("Please Enter HomeTown ","");
      return false;
    }
    else if(this.campusCandidate.NativeState==""||this.campusCandidate.NativeState==undefined){
      this.notificationService.showError("Please Enter NativeState ","");
      return false;
    }
    else if(this.campusCandidate.PresentState==""||this.campusCandidate.PresentState==undefined){
      this.notificationService.showError("Please Enter PresentState ","");
      return false;
    }
    else if(this.campusCandidate.MotherTongueId==""||this.campusCandidate.MotherTongueId==undefined){
      this.notificationService.showError("Please Enter MotherTongue ","");
      return false;
    }
    else if(this.campusCandidate.LanguageIds==""||this.campusCandidate.LanguageIds==undefined){
      this.notificationService.showError("Please Enter Languages ","");
      return false;
    }
    else if(this.campusCandidate.EyeSightCorrected==null||this.campusCandidate.EyeSightCorrected==undefined){
      this.notificationService.showError("Please Enter EyeSightCorrected ","");
      return false;
    }
    else if(this.campusCandidate.FatherOccupation==""||this.campusCandidate.FatherOccupation==undefined){
      this.notificationService.showError("Please Enter FatherOccupation ","");
      return false;
    }
    else if(this.campusCandidate.MotherOccupation==""||this.campusCandidate.MotherOccupation==undefined){
      this.notificationService.showError("Please Enter MotherOccupation ","");
      return false;
    }
    else if(this.campusCandidate.Disability==null||this.campusCandidate.Disability==undefined){
      this.notificationService.showError("Please Enter Disability ","");
      return false;
    }
    else if(this.campusCandidate.HealthIssue==null||this.campusCandidate.HealthIssue==undefined){
      this.notificationService.showError("Please Enter HealthIssue ","");
      return false;
    }
    else if(this.campusCandidate.NoofSiblings==""||this.campusCandidate.NoofSiblings==undefined){
      this.notificationService.showError("Please Enter NoofSiblings ","");
      return false;
    }
    // else if(this.campusCandidateAcademic.length==0){
    //   this.notificationService.showError("Please Enter Academic Details ","");
    //   return false;
    // }
    else if(this.campusCandidate.YearsCommitments==null||this.campusCandidate.YearsCommitments==undefined){
      this.notificationService.showError("Please Enter YearsCommitments ","");
      return false;
    }
    else if(this.campusCandidate.AnyWhereinIndia==null||this.campusCandidate.AnyWhereinIndia==undefined){
      this.notificationService.showError("Please Enter AnyWhereinIndia ","");
      return false;
    }
    else if(this.campusCandidate.WorkinginShift==null||this.campusCandidate.WorkinginShift==undefined){
      this.notificationService.showError("Please Enter WorkinginShift ","");
      return false;
    }
    else if(this.campusCandidate.JobTypePriority==""||this.campusCandidate.JobTypePriority==undefined){
      this.notificationService.showError("Please Enter JobTypePriority ","");
      return false;
    }
    else if(this.campusCandidate.CriticalFactor==""||this.campusCandidate.CriticalFactor==undefined){
      this.notificationService.showError("Please Enter CriticalFactor ","");
      return false;
    }
    else if(this.campusCandidate.MostPreferdBenifit==null||this.campusCandidate.MostPreferdBenifit==undefined){
      this.notificationService.showError("Please Enter MostPreferdBenifit ","");
      return false;
    }
    else if(this.campusCandidate.ExtraCurricularActivities==null||this.campusCandidate.ExtraCurricularActivities==undefined){
      this.notificationService.showError("Please Enter ExtraCurricularActivities ","");
      return false;
    }
    // else if(this.campusCandidate.candidatefileToUpload==""||this.campusCandidate.candidatefileToUpload==undefined){
    //   this.notificationService.showError("Please Enter Resume ","");
    // return false;
    // }
    else{
      return true;
    }
  }
  onFileChange(files: FileList) {
    const mimeType = files[0].type;
    if (mimeType.match(/pdf\/*/) == null) {
      this.notificationService.showError("Only pdf files are supported", "Error");
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
    console.log("check");
  }
  gotoList(){
    this._route.navigate(['/app/campus/requsition-link']);
  }
  // By Sayandeep on 05-08-2023
  gotoCandidateList(){
    this.persistance.set('pagename', 'campusstalentpool');
    this.persistance.set('candidateId', null);
    this._route.navigate(['/app/talent-pool'])
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
