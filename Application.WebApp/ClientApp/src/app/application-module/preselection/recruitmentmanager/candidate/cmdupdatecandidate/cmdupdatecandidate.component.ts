import { Title } from '@angular/platform-browser';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ICandidateData, ISearchCandidateData } from '../../../../../interfaces/candidate/candidate.interface';
import { ILocation, ISearchLocation } from '../../../../../interfaces/common/location.interface';
import { ICandidate, ISearchCandidate } from '../../../../../interfaces/preselection/candidate.interface';
import { IVerticalFunction, ISearchFunction } from '../../../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../../../interfaces/common/jobtype.interface';
import { IDomain, ISearchDomain } from '../../../../../interfaces/common/domain.interface';
import { IPrefix, ISearchPrefix } from '../../../../../interfaces/common/prefix.interface';
import { ILanguage, ISearchLanguage } from '../../../../../interfaces/common/language.interface';
import { IJobDescription, ISearchJobDescription } from '../../../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../../../interfaces/common/position.interface';
import { LocationService } from '../../../../../services/common/location/location.service';
import { FunctionService } from '../../../../../services/common/function/function.service';
import { DepartmentService } from '../../../../../services/common/department/department.service';
import { PositionService } from '../../../../../services/common/position/position.service';
import { CandidateService } from '../../../../../services/candidate/candidate/candidate.service';
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { LanguageService } from '../../../../../services/common/language/language.service';
import { DomainService } from '../../../../../services/common/domain/domain.service';
import { ISearchStream, IStream, IQualificationCourseStream, ISearchQualificationCourseStream } from '../../../../../interfaces/common/stream.interface';
import { StreamService } from '../../../../../services/common/stream/stream.service';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from 'src/app/interfaces/common/course.interface';
import { CourseService } from '../../../../../services/common/course/course.service';
import { IQualification, IQualificationType, ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { QualificationService } from '../../../../../services/common/qualification/qualification.service';
import { IAge, IExperience, IMonths, IYears, IState } from 'src/app/interfaces/common/common.interface';
import { NotificationService } from '../../../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { PersistanceService } from '../../../../../sharedservices/persitence.service';
import { DecimalPipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
declare var jQuery: any;

@Component({
  selector: 'app-cmdupdatecandidate',
  templateUrl: './cmdupdatecandidate.component.html',
  styleUrls: ['./cmdupdatecandidate.component.css']
})
export class CmdupdatecandidateComponent implements OnInit {
  pageTitle: string = "Update CMD Status";
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('cmdDocumentImport', { static: false }) cmdDocumentImport: ElementRef;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });
  //

  isAadhar: number = 0;
  candidateData: ICandidateData;
  searchCandidateData: ISearchCandidateData = {
    candidateId: null
  }
  submitted = false;
  showTable: boolean = false;
  //domain
  domain: IDomain[] = [];
  selectedDomain: IDomain;
  searchDomain: ISearchDomain =
    {
      domainId: null,
      parentDomainId: null,
      isActive: true
    };
  domainId: number;
  //subdomain
  subdomain: IDomain[] = [];
  selectedSubDomain: IDomain;
  searchSubDomain: ISearchDomain =
    {
      domainId: null,
      parentDomainId: null,
      isActive: true
    };
  subdomainId: number;
  //qualification
  qualifications: IQualification[] = [];
  selectedQualification: IQualification;
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }
  //qualification type
  qualificationType: IQualificationType[] = [];
  //course
  courses: IQualificationCourse[] = [];
  selectedCourse: IQualificationCourse;
  searchCourse: ISearchQualificationCourse = {
    qualificationId: null,
    courseId: null,
    isActive: true
  }
  courseId: number;
  courseName: string;
  //stream
  streams: IQualificationCourseStream[] = [];
  selectedStream: IQualificationCourseStream;
  searchStream: ISearchQualificationCourseStream = {
    qualificationId: null,
    courseId: null,
    streamId: null,
    isActive: true
  }
  streamId: number;
  streamName: string;
  //languages
  languages: ILanguage[] = [];
  selectedLanguages: ILanguage;
  searchLanguages: ISearchLanguage = {
    languageId: null,
    isActive: null
  }
  languageId: number;
  languageName: string;
  //location
  fileDocument: string;
  //prefix
  prefix: IPrefix[] = [];
  selectedPrefix: IPrefix;
  searchPrefix: ISearchPrefix =
    {
      prefixId: null,
      isActive: null
    };
  prefixId: number;
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
  //position
  positions: IPositionVerticalDetail[] = [];
  selectedPosition: IPositionVerticalDetail;
  searchPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  positionId;
  positionName: string;
  //grade
  grades: IPositionGrade[] = [];
  selectedGrade: IPositionGrade;
  searchGrade: ISearchPositionGrade = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  gradeId: number;
  gradeName: string;
  //function
  functions: IVerticalFunction[] = [];
  selectedFunction: IVerticalFunction;
  searchFunction: ISearchFunction = {
    verticalId: null,
    functionId: null,
    isActive: true
  }
  functionId: number;
  functionName: string;
  //department
  departments: IFunctionDepartment[] = [];
  selectedDepartment: IFunctionDepartment;
  searchDepartment: ISearchDepartment = {
    departmentId: null,
    functionId: null,
    verticalId: null,
    isActive: true
  }
  departmentId: number;
  departmentName: string;
  //jobtype
  jobtypes: IJobType[] = [];
  selectedJobType: IJobType;
  searchJobType: ISearchJobType = {
    jobTypeId: null,
    isActive: true
  }
  jobTypeId: number;
  jobTypeName: string;
  //jobdescription
  jobdescriptions: IJobDescription[] = [];
  selectedJobDescription: IJobDescription;
  searchJobDescription: ISearchJobDescription = {
    jobDescriptionId: null,
    verticalId: null,
    isActive: true
  }
  jobDescriptionId: number;
  jobDescriptionName;
  iom: string;
  iomNo: string;
  targetDate: string;
  approveCount: number;
  requestCount: number;
  holdCount: number;
  isAutoApproved: boolean = false;
  cmdfileToUpload: File = null;
  candidateDetailData: any;//ICandidateDetailData[]=[];
  //
  ages: IAge[] = [];
  experiences: IYears[] = [];
  CompletionYear: IYears[] = [];
  Months: IMonths[] = [];
  State: IState[] = [];
  createdBy: number;
  isRelative: boolean = true;
  requisitionDetailId: number;
  candidateId: number;
  selectedGenderId: number;
  isApprovalRequired: boolean = false;
  isApprovalStatus: boolean = false;
  isCMDDisabled: number = 0;
  idbtnHide: boolean = true;
  isExperience: boolean = false;
  isCloseRelationship: boolean = false;
  isOtherRelationship: boolean = true;
  isRelationshipStatus: boolean = false;
  invalidFileName:boolean=false;
  constructor(
    private notificationService: NotificationService,
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private commonService: CommonService,
    private courseService: CourseService,
    private streamService: StreamService,
    private qualificationService: QualificationService,
    private languageService: LanguageService,
    private candidateService: CandidateService,
    private domainService: DomainService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
    private _route: Router,
    private titleService: Title,
    private SpinnerService: NgxSpinnerService,
    private persistance: PersistanceService) {
    this.SpinnerService.show();
    this.titleService.setTitle(this.pageTitle);
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.candidateId = this.persistance.get('candidateid');
    this.createForm();
    this.getAllExperience();
    this.getAllLocation();
    this.getAllState();
    this.getAllFunction();
    this.getAllPosition();
    this.getAllPrefix();
    this.getAllLanguages();
    this.getAllQualification();
    this.getAllDomain();
    this.getAllCompletionYearsAndMonths();

  }

  ngAfterViewInit() {
    this.loadDatePicker();

  }

  loadDatePicker() {
    var today = new Date();
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      endDate: today,
      todayHighlight: true
    }).on("change", function (e) {
      var selecteddate = e.target.value;
      var birthDate = new Date(selecteddate.substring(6, 10) + "/" + selecteddate.substring(3, 5) + "/" + selecteddate.substring(0, 2));
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      jQuery("#txtAge").val(age);
    });
  }


  //only number will be add
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  getAllState() {
    this.State = [];
    this.commonService.getAllState().subscribe((result) => {
      if (result) {
        this.State = result;
      }
      else {
        this.State = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getCandidate();
    }, 2000);
  }

  createForm() {
    this.saveForm = this.fb.group({
      PrefixId: [''],
      FullName: [''],
      DOB: [''],
      Age: ['',],
      GenderId: [''],
      EmailId: [''],
      ContactNo: [''],
      AadharNo: [''],
      MotherTongueId: [''],
      LanguageIds: [''],
      QualificationId: [''],
      CourseId: [''],
      StreamId: [''],
      MarksPercentage: [''],
      CompletionYear: [''],
      QualificationTypeId: [''],
      ExperienceYear: [''],
      ExperienceMonth: [''],
      CurrentCTC: [''],
      CurrentEmployer: [''],
      CurrentDesignation: [''],
      DomainId: [''],
      SubDomainId: [''],
      StateId: [''],
      PreviousApplied: [''],
      RelativeStatus: [2],
      RelativeName: [''],
      RelativeContactNo: [''],
      SourceChannelId: [0],
      ParentRelationshipId: [0],
      ChildRelationshipId: [0],
      RelationshipNotes: [''],
      CMDApprovalRequired: ['', Validators.required],
      CMDApprovalStatus: [''],
      CMDApprovalNo: [''],
      CreatedBy: [0],
      VendorId: [0],
      RequisitionDetailId: [0]
    });
  }
  //prefix
  getAllPrefix() {
    this.prefix = [];
    this.commonService.getAllPrefix(this.searchPrefix).subscribe((result) => {
      if (result) {
        this.prefix = result;
      }
      else {
        this.prefix = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  getAllCompletionYearsAndMonths() {
    this.CompletionYear = [];
    var currentyear = new Date().getFullYear();
    for (var i = currentyear; i > currentyear - 40; i--) {
      this.CompletionYear.push({ yearsId: i, yearsName: i.toString() });
    }
    //console.log(this.CompletionYear);
    this.Months = [];
    for (var i = 0; i < 12; i++) {
      this.Months.push({ monthId: i, monthName: i.toString() });
    }

  }
  //experience
  getAllExperience() {
    this.experiences = [];
    for (var i = 0; i < 41; i++) {
      this.experiences.push({ yearsId: i, yearsName: i.toString() });
    }
  }
  //languages
  getAllLanguages() {
    this.languages = [];
    this.searchLanguages.languageId = 0;
    this.searchLanguages.isActive = true;
    this.languageService.getAllLanguage(this.searchLanguages).subscribe((result) => {
      if (result) {
        this.languages = result;
        //console.log(result);
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

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fileDocument = reader.result.toString();
      //   if (file.type == "application/pdf") {
      //   if ((file.size / 1024) > 5) {
      //     this.flag=1;
      //     this.toasterService.error('Maximum file size allowed is 5MB!', 'Error!', {
      //       timeOut: 3000,
      //     });
      //   }
      //   else{
      //     this.flag=0;
      //   }
      // }
      // else{
      //   this.flag=1;
      //   this.toasterService.error('Only PDF files are allowed!', 'Error!', {
      //     timeOut: 3000,
      //   });
      // }
    };
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
      this.cmdDocumentImport.nativeElement.innerText = "Choose file";
      this.cmdfileToUpload = null;
      return;
    }
    if (files.length > 0) {
      if (files[0].size > 2097152) {
        this.notificationService.showError("File should be less than 2MB!", "Error");
        this.cmdDocumentImport.nativeElement.innerText = "Choose file";
        this.cmdfileToUpload = null;
      } else {
        this.cmdDocumentImport.nativeElement.innerText = files[0].name;
        this.cmdfileToUpload = files.item(0);
      }
    }
    else {
      this.cmdDocumentImport.nativeElement.innerText = "Choose file";
      this.cmdfileToUpload = null;
    }
  }
  //qualification
  getAllQualification() {
    this.qualifications = [];
    this.qualificationService.getAllQualification(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;
       // console.log(result);
      }
      else {
        this.qualifications = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });

    this.qualificationType = [];
    this.qualificationService.getAllQualificationType(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualificationType = result;
        //console.log(result);
      }
      else {
        this.qualificationType = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  changeQualification() {
    var qualificationId = this.saveForm.get("QualificationId").value;
    this.selectedQualification = this.qualifications.filter(x => x.qualificationId == qualificationId)[0];
    this.getAllCourse();
  }
  //Course
  getAllCourse() {
    this.courses = [];
    this.searchCourse.qualificationId = this.selectedQualification.qualificationId;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.courses = result;
       // console.log(result);
        this.streams = [];
      }
      else {
        this.courses = [];
        this.streams = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  changeCourse() {
    var courseId = this.saveForm.get("CourseId").value;
    var qualificationId = this.saveForm.get("QualificationId").value;
    this.selectedCourse = this.courses.filter(x => x.courseId == courseId && x.qualificationId == qualificationId)[0];
    this.getAllStream();
  }
  //Stream

  loadSpecificStream(qualificationId, courseId) {
    this.streams = [];
    this.searchStream.qualificationId = qualificationId;
    this.searchStream.courseId = courseId;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.streams = result;
       // console.log(result);
      }
      else {
        this.streams = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  getAllStream() {
    this.streams = [];
    this.searchStream.qualificationId = this.selectedQualification.qualificationId;
    this.searchStream.courseId = this.selectedCourse.courseId;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.streams = result;
       // console.log(result);
      }
      else {
        this.streams = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  //domain
  getAllDomain() {
    this.domain = [];
    this.searchDomain.parentDomainId = 0;
    this.domainService.getAllDomain(this.searchDomain).subscribe((result) => {
      if (result) {
        this.domain = result;
      }
      else {
        this.domain = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  changeDomain() {
    var domainId = this.saveForm.get("DomainId").value;
    this.selectedDomain = this.domain.filter(x => x.domainId == domainId)[0];
    this.getAllSubDomain();
  }

  //subdomain
  getAllSubDomain() {
    this.subdomain = [];
    this.searchSubDomain.parentDomainId = this.selectedDomain.domainId;
    this.domainService.getAllDomain(this.searchSubDomain).subscribe((result) => {
      if (result) {
        this.subdomain = result;
      }
      else {
        this.subdomain = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  loadSpecificSubDomain(domainId) {
    this.subdomain = [];
    this.searchSubDomain.parentDomainId = domainId;
    this.domainService.getAllDomain(this.searchSubDomain).subscribe((result) => {
      if (result) {
        this.subdomain = result;
      }
      else {
        this.subdomain = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }
  //locations
  getAllLocation() {
    this.locations = [];
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onLocationChange() {
    // this.selectedLocationCode = this.selectedLocation.locationCode;
    // this.selectedLocationOffice = this.selectedLocation.locationOffice;
  }

  //functions
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = 1;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
      }
      else {
        this.functions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  onFunctionChange() {
    //console.log(this.selectedFunction);
    this.functionId = this.selectedFunction.functionId;
    this.getAllDepartment();
  }

  //department
  getAllDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = 1;
    this.searchDepartment.functionId = this.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
       // console.log(this.departments);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  //position
  getAllPosition() {
    this.positions = [];
    this.searchPosition.verticalId = 1;
    this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
      }
      else {
        this.positions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      //this.loadSelectPicker();
    });
  }

  //position
  getCandidate() {
    this.searchCandidateData.candidateId = this.candidateId
    this.candidateService.getCandidateData(this.searchCandidateData).subscribe((result) => {
      if (result) {
       //console.log(result);
        if (result.aadharNo != "") {
          this.selectedGenderId = result.genderId;
          this.selectedQualification = this.qualifications.filter(x => x.qualificationId == result.qualificationId)[0];
          this.getAllCourse();
          this.loadSpecificStream(result.qualificationId, result.courseId);
          this.loadSpecificSubDomain(result.domainId);
          this.getAllCompletionYearsAndMonths();
        }
        else {
          this.selectedGenderId = result.genderId;
        }
        var larr = result.languageIds.split(',');
        var arr = [];
        for (var i = 0; i < larr.length; i++) {
          arr.push(parseInt(larr[i]));
        }
        this.saveForm.patchValue({
          GenderId: result.genderId
        })
        if (result.aadharNo == "") {
          this.isAadhar = 0;
        }
        else {
          this.isAadhar = 1;
        }
        if (result.cmdUpdateStatus == 0) {
          this.isCMDDisabled = 0;
        }
        else {
          this.isCMDDisabled = 1;
        }

        setTimeout(() => {
          //this.loadMultiSelectPicker();
          this.candidateData = result;
          this.saveForm.patchValue({
            PrefixId: result.prefixId,
            FullName: result.fullName,
            DOB: result.dob,
            Age: result.age,
            //GenderId: result.genderId,
            EmailId: result.emailId,
            ContactNo: result.contactNo,
            AadharNo: result.aadharNo,
            MotherTongueId: result.motherTongueId,
            LanguageIds: arr,
            QualificationId: result.qualificationId,
            CourseId: result.courseId,
            StreamId: result.streamId,
            MarksPercentage: parseInt(result.marksPercentage),
            CompletionYear: parseInt(result.completionYear),
            QualificationTypeId: result.qualificationTypeId,
            ExperienceYear: result.experienceYear,
            ExperienceMonth: result.experienceMonth,
            CurrentCTC: result.currentCTC,
            CurrentEmployer: result.currentEmployer,
            CurrentDesignation: result.currentDesignation,
            DomainId: result.domainId,
            SubDomainId: result.subDomainId,
            StateId: result.stateId,
            ParentRelationshipId: result.parentRelationshipId,
            ChildRelationshipId: result.childRelationshipId,
            RelationshipNotes: "",
            PreviousApplied: result.previousApplied,
            RelativeStatus: result.relativeStatus,
            RelativeName: result.relativeName,
            RelativeContactNo: result.relativeContactNo,
            CMDApprovalStatus: result.cmdApprovalStatus
          })


          if (result.relativeStatus != 0) {
            this.isRelative = false;
          }
          else {
            this.isRelative = true;
          }

          if (Number(result.ParentRelationshipId) >= 2) {
            this.isRelationshipStatus = false;
            this.isCloseRelationship = true;
            this.isOtherRelationship = false;

          }
          else if (Number(result.parentRelationshipId) == 1) {
            this.isRelationshipStatus = false;
            this.isCloseRelationship = false;
            this.isOtherRelationship = true;
          }
          else {
            this.isRelationshipStatus = true
            this.isCloseRelationship = true;
            this.isOtherRelationship = true;
          }
          this.loadSelectPicker();
          var dothis = this;
          if ((this.saveForm.value.ExperienceYear > 0 || this.saveForm.value.ExperienceMonth > 0)) {
            this.isExperience = true;
            var domainidval = "";
            // console.log("Domains");
            // console.log(dothis.domain);
            for (var d = 0; d < dothis.domain.length; d++) {
              var nextd = parseInt(d.toString()) + 1;
              if (dothis.domain[d].domainId == result.domainId) {
                domainidval = nextd + ": " + dothis.domain[d].domainId;
              }
            }
            setTimeout(() => {
              jQuery('select[name=DomainId]').val(domainidval);
              jQuery('.domainid').selectpicker('refresh');
            });
          }
        });
      }
      else {
        //this.positions = [];
      }

      if (result.cmdApprovalRequired.toString() == "1") {
        this.isApprovalRequired = true;
        this.idbtnHide = false;
        this.saveForm.patchValue({
          CMDApprovalRequired: 1
        })
        jQuery('.ddlstatus').selectpicker('refresh');
      }
      else {
        this.isApprovalRequired = false;
      }
      if (result.cmdApprovalStatus.toString() == "1") {
        this.isApprovalStatus = true;
        this.saveForm.patchValue({
          CMDApprovalNo: result.cmdApprovalNo
        })


      }
      else {
        this.isApprovalStatus = false;
      }

    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();

    });
    //jQuery('.ddlstatus').selectpicker('refresh');
  }

  onPositionChange() {
    this.positionId = this.selectedPosition.positionId;
    this.getAllGrade();
  }

  //grade
  getAllGrade() {
    this.grades = [];
    this.searchGrade.verticalId = 1;
    this.searchGrade.positionId = this.positionId;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
      }
      else {
        this.grades = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      this.loadSelectPicker();
    });
  }

  startCandidate() {
    var flag = 0;
    if (this.selectedLocation == undefined) {
      flag = 1;
    }
    else {
    }
    if (this.iom == undefined) {
      flag = 1;
    }
    else {
    }
    if (flag == 0) {
      this.candidateDetailData = [];
      this.showTable = true;
      this.iomNo = this.iom;
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker({
          size: 4
        });
        jQuery('.selectpicker').selectpicker('refresh');
        this.loadDatePicker();
        // jQuery('.custom-file input').change(function (e) {
        //   var files = [];
        //   for (var i = 0; i < jQuery(this)[0].files.length; i++) {
        //     files.push(jQuery(this)[0].files[i].name);
        //   }
        //   jQuery(this).next('.custom-file-label').html(files.join(', '));
        // });

      });
    }
    else {
      this.showTable = false;
    }
  }

  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  loadMultiSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpickermulti').selectpicker({
        size: 6
      });
      var select_items = ["1", "3", "4"];
      jQuery('.selectpickermulti').selectpicker('val', select_items);
      jQuery('.selectpickermulti').selectpicker('refresh');
    });
  }

  clearForm() {
    setTimeout(() => {
      jQuery('.selectpicker').val('').trigger('change');
      jQuery('.selectpicker').not(".no-remove").find('option').remove();
      jQuery('.selectpicker').selectpicker('refresh');
      jQuery(".datepicker").parent(".input-group").datepicker('setDate', null);
      this.loadDatePicker();
    });
  }


  onReset() {
    this.submitted = false;
    this.saveForm.reset();
    this.getAllExperience();
    this.getAllLocation();
    this.getAllState();
    this.getAllFunction();
    this.getAllPosition();
    this.getAllPrefix();
    this.getAllLanguages();
    this.getAllQualification();
    this.getAllDomain();
    this.getAllCompletionYearsAndMonths();
  }
  // isFieldValid(field: string) {
  //   return (!this.saveForm.get(field).valid && this.saveForm.get(field).touched) ||
  //     (this.saveForm.get(field).untouched && this.onSubmit);
  // }

  onSubmit() {
    //console.log(this.saveForm);
    var flag = 0;
    if (this.saveForm.value.CMDApprovalRequired == "") {
      flag = 1;
      jQuery(".msgcmdrequired").show();
    }
    else {
      jQuery(".msgcmdrequired").hide();
      if(this.saveForm.value.CMDApprovalRequired==1){
        if (this.cmdfileToUpload == null) {
          flag = 1;
          jQuery(".msgcmdfile").show();
        }
        else {
          jQuery(".msgcmdfile").hide();
        }
        if(this.saveForm.value.CMDApprovalNo==""){
          jQuery(".msgcmdno").show();
          flag=1;
        }
        else{
          jQuery(".msgcmdno").hide();
        }
      }
      else{
        flag=0;
      }
    }
    if (flag == 0) {
      this.saveForm.patchValue({
        GenderId: Number(this.saveForm.get("GenderId").value),
        Age: Number(this.saveForm.get("Age").value),
        LanguageIds: String(this.saveForm.get("LanguageIds").value),
        MarksPercentage: parseFloat(this.saveForm.get("MarksPercentage").value),
        CurrentCTC: parseFloat(this.saveForm.get("CurrentCTC").value),
        PreviousApplied: this.saveForm.get("PreviousApplied").value,
        RelativeStatus: this.saveForm.get("RelativeStatus").value,
        CreatedBy: this.createdBy,
        SourceChannelId: 5,
        VendorId: this.candidateId,
        RequisitionDetailId: this.requisitionDetailId
      })

      const formData = new FormData();
      formData.append("CandidateId", this.candidateId.toString());
      formData.append("CMDApprovalRequired", this.saveForm.value.CMDApprovalRequired);
      formData.append("CMDApprovalStatus", "1");
      formData.append("CMDApprovalNo", this.saveForm.value.CMDApprovalNo);
      formData.append("ManagementFile", this.cmdfileToUpload);
      formData.append("CreatedBy", this.createdBy.toString());
     // console.log(formData);
      this.SpinnerService.show();
      this.candidateService.updateCMDApproval(formData).subscribe((result) => {
        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "Success");
         // console.log(result);
          this.getCandidate();
          this.idbtnHide = false;
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }

      }, error => {
        // display form values on success
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
        this.SpinnerService.hide();
      });      
    }
  }

  changeCMDApprovalRequired() {
    if (this.saveForm.value.CMDApprovalRequired == 1) {
      this.isApprovalRequired = true;
      // this.saveForm.controls['CMDApprovalStatus'].setValidators([Validators.required]);
      // this.saveForm.controls['CMDApprovalStatus'].updateValueAndValidity();
      // setTimeout(() => {
      //   jQuery("select[name=CMDApprovalStatus]").val("0");
      //   jQuery("select[name=CMDApprovalStatus]").selectpicker('refresh');
      // });
    }
    else {
      this.isApprovalRequired = false;
      // this.saveForm.controls['CMDApprovalStatus'].clearValidators();
      // this.saveForm.controls['CMDApprovalStatus'].updateValueAndValidity();
      // setTimeout(() => {
      //   jQuery('.ddlstatus').selectpicker('refresh');
      // });
    }
  }

  changeCMDApprovalStatus() {
    if (this.saveForm.value.CMDApprovalStatus == 1) {
      this.isApprovalStatus = true;
      this.saveForm.controls['CMDApprovalNo'].setValidators([Validators.required]);
      this.saveForm.controls['CMDApprovalNo'].updateValueAndValidity();
    }
    else {
      this.isApprovalStatus = false;
      this.saveForm.controls['CMDApprovalNo'].clearValidators();
      this.saveForm.controls['CMDApprovalNo'].updateValueAndValidity();
    }
  }

  gotoCandidateList() {
    this.persistance.set('pagename', "rmrequisitionlist");
    this.persistance.set('paramid', this.persistance.get('paramid'));
    this.persistance.set('previouspageparams',this.persistance.get('previouspagefilter'));
    this.persistance.set('tabledisplayStartcandi',this.persistance.get('tabledisplayStartcandi'));
    this._route.navigate(['/app/my-action/all-positions/candidate-list']);
  }
}
