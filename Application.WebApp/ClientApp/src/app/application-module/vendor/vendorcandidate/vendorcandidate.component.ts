import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { ICandidate, ISearchCandidate } from '../../../interfaces/preselection/candidate.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../interfaces/common/jobtype.interface';
import { IDomain, ISearchDomain } from '../../../interfaces/common/domain.interface';
import { IPrefix, ISearchPrefix } from '../../../interfaces/common/prefix.interface';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';
import { IJobDescription, ISearchJobDescription } from '../../../interfaces/common/jobdescription.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { FunctionService } from '../../../services/common/function/function.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { JobtypeService } from '../../../services/common/jobtype/jobtype.service';
import { CommonService } from '../../../services/common/common/common.service';
import { LanguageService } from '../../../services/common/language/language.service';
import { CandidateService } from '../../../services/preselection/candidate/candidate.service';
import { DomainService } from '../../../services/common/domain/domain.service';
import { ISearchStream, IStream, IQualificationCourseStream, ISearchQualificationCourseStream } from '../../../interfaces/common/stream.interface';
import { StreamService } from '../../../services/common/stream/stream.service';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from 'src/app/interfaces/common/course.interface';
import { CourseService } from '../../../services/common/course/course.service';
import { IQualification, IQualificationType, ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { QualificationService } from '../../../services/common/qualification/qualification.service';
import { IAge, IExperience, IMonths, IYears } from 'src/app/interfaces/common/common.interface';
import { NotificationService } from '../../../sharedservices/notification.service';
import { ToastrService } from 'ngx-toastr';
import { DecimalPipe } from '@angular/common';
declare var jQuery: any;

@Component({
  selector: 'app-vendorcandidate',
  templateUrl: './vendorcandidate.component.html',
  styleUrls: ['./vendorcandidate.component.css']
})
export class VendorcandidateComponent implements OnInit {
  @ViewChild('tDate', { static: false }) tDate: ElementRef;
  @ViewChild('candidateResumeImport', { static: false }) candidateResumeImport: ElementRef;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

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
  candidatefileToUpload: File = null;
  candidateDetailData: any;//ICandidateDetailData[]=[];
  //
  ages: IAge[] = [];
  experiences: IExperience[] = [];
  CompletionYear: IYears[] = [];
  Months: IMonths[] = [];
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

    private toasterService: ToastrService
  ) {
    this.getAllExperience();
    this.getAllLocation();
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
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      todayHighlight: true
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
  ngOnInit() {
    this.saveForm = this.fb.group({
      PrefixId: ['', [Validators.required]],
      FullName: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      GenderId: ['', [Validators.required]],
      EmailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      ContactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      AadharNo: ['', [Validators.required]],
      MotherTongueId: ['', [Validators.required]],
      LanguageIds: ['', [Validators.required]],
      QualificationId: ['', [Validators.required]],
      CourseId: ['', [Validators.required]],
      StreamId: ['', [Validators.required]],
      MarksPercentage: ['', [Validators.required]],
      CompletionYear: ['', [Validators.required]],
      QualificationTypeId: ['', [Validators.required]],
      ExperienceYear: ['', [Validators.required]],
      ExperienceMonth: ['', [Validators.required]],
      CurrentCTC: ['', [Validators.required]],
      CurrentEmployer: ['', [Validators.required]],
      CurrentDesignation: ['', [Validators.required]],
      DomainId: ['', [Validators.required]],
      SubDomainId: ['', [Validators.required]],
      StateId: ['', [Validators.required]],
      PreviousApplied: ['', [Validators.required]],
      RelativeStatus: [''],
      RelativeName: ['', [Validators.required]],
      RelativeContactNo: ['', [Validators.required]],
      Resume: [''],
      SourceChannelId: [3],
      ParentRelationshipId: [1],
      ChildRelationshipId: [1],
      RelationshipNotes: [''],
      CMDApprovalRequired: [0],
      CMDApprovalStatus: [false],
      CMDApprovalNo: [''],
      CMDApprovalDocument: ['']
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
    this.commonService.getAllYears().subscribe((result) => {
      if (result) {
        this.CompletionYear = result;
        console.log(result);
      }
      else {
        this.CompletionYear = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
    this.Months = [];
    this.commonService.getAllMonths().subscribe((result) => {
      if (result) {
        this.Months = result;
        console.log(result);
      }
      else {
        this.Months = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  //experience
  getAllExperience() {
    this.experiences = [];
    this.commonService.getAllExperience().subscribe((result) => {
      if (result) {
        this.experiences = result;
        console.log(result);
      }
      else {
        this.experiences = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }
  //languages
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
  //qualification
  getAllQualification() {
    this.qualifications = [];
    this.qualificationService.getAllQualification(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;
        console.log(result);
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
        console.log(result);
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
        console.log(result);
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
  getAllStream() {
    this.streams = [];
    this.searchStream.qualificationId = this.selectedQualification.qualificationId;
    this.searchStream.courseId = this.selectedCourse.courseId;
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        this.streams = result;
        console.log(result);
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
    console.log(this.selectedFunction);
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
        console.log(this.departments);
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
        jQuery('.custom-file input').change(function (e) {
          var files = [];
          for (var i = 0; i < jQuery(this)[0].files.length; i++) {
            files.push(jQuery(this)[0].files[i].name);
          }
          jQuery(this).next('.custom-file-label').html(files.join(', '));
        });

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
  }
  isFieldValid(field: string) {
    return (!this.saveForm.get(field).valid && this.saveForm.get(field).touched) ||
      (this.saveForm.get(field).untouched && this.onSubmit);
  }
  onSubmit() {
    console.log(this.saveForm);

    this.submitted = true;
    // stop here if form is invalid
    if (this.saveForm.invalid) {
      this.notificationService.showError("Please provide valid inputs!!", "")
      return;
    }
    else {
      this.saveForm.patchValue({
        Resume: "",//this.fileDocument,
        GenderId: Number(this.saveForm.get("GenderId").value),
        Age: Number(this.saveForm.get("Age").value),
        LanguageIds: Number(this.saveForm.get("LanguageIds").value),
        MarksPercentage: parseFloat(this.saveForm.get("MarksPercentage").value),
        CurrentCTC: parseFloat(this.saveForm.get("CurrentCTC").value),
        PreviousApplied: Boolean(JSON.parse(this.saveForm.get("PreviousApplied").value)),
        RelativeStatus: Boolean(JSON.parse(this.saveForm.get("RelativeStatus").value))
      })

      this.candidateService.saveCandidateDetails(this.saveForm.value).subscribe((result) => {
        // display form values on success
        this.notificationService.showSuccess(result.msg, "Add Candidate");
        console.log(result);
      }, error => {
        // display form values on success
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        console.log(error);
      });
      console.log();
    }
  }

  
}
