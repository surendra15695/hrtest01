import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { RouterModule, Routes, Router } from '@angular/router';
import { Validators } from '@angular/forms';
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
import { JobtypeService } from '../../../../../services/common/jobtype/jobtype.service';
import { CommonService } from '../../../../../services/common/common/common.service';
import { LanguageService } from '../../../../../services/common/language/language.service';
import { CandidateService } from '../../../../../services/preselection/candidate/candidate.service';
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
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;

@Component({
  selector: 'app-referaddcandidate',
  templateUrl: './referaddcandidate.component.html',
  styleUrls: ['./referaddcandidate.component.css']
})
export class ReferaddcandidateComponent implements OnInit {
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
  experiences: IYears[] = [];
  CompletionYear: IYears[] = [];
  Months: IMonths[] = [];
  State: IState[] = [];
  createdBy: number;
  isRelative: boolean = true;
  requisitionDetailId: number;
  vendorId: number;
  isCloseRelationship = true;
  isOtherRelationship = true;
  isExperience: boolean = false;
  calcAge: string;
  calcGenderId: number;
  invalidFileName:boolean=false;
  constructor(
    private notificationService: NotificationService,
    private SpinnerService: NgxSpinnerService,
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
    private persistance: PersistanceService) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
    this.vendorId = this.persistance.get('loggedinuser').mapId;
    if (this.persistance.get('pagename') != null) {
      if (this.persistance.get('pagename') == "refercurrentjobs") {
        this.requisitionDetailId = this.persistance.get('paramid');
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
      } else {
        this._route.navigate(['/app/vendor/currentjob']);
      }
    }
    else {
      this._route.navigate(['/app/vendor/currentjob']);
    }
  }

  ngAfterViewInit() {
    this.setGenderId();
    this.loadDatePicker();
  }

  setGenderId() {
    setTimeout(() => {
      document.getElementById("radio1").click();
    });
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
        dothis.saveForm.patchValue({ DOB: e.target.value });
        //this.saveForm.value.Age=age;
        dothis.calcAge = age.toString();
        jQuery("#txtAge").val(age);
      }
      else {
        jQuery("#txtAge").val("");
        dothis.calcAge = "0";
        dothis.saveForm.patchValue({ DOB: "" });
      }
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
    this.saveForm = this.fb.group({
      PrefixId: [undefined, [Validators.required]],
      FullName: ['', [Validators.required]],
      DOB: ['', [Validators.required]],
      Age: ['',],
      GenderId: ['', [Validators.required]],
      //EmailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      EmailId: ['', [Validators.required, Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]],
      ContactNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      AadharNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{12}$")]],
      MotherTongueId: [undefined, [Validators.required]],
      LanguageIds: [undefined, [Validators.required]],
      QualificationId: [undefined, [Validators.required]],
      CourseId: [undefined, [Validators.required]],
      StreamId: [undefined, [Validators.required]],
      MarksPercentage: ['', [Validators.required, Validators.pattern("^(?!0\\d)\\d{1,2}(\\.\\d{1,2})?$")]],
      CompletionYear: [undefined, [Validators.required]],
      QualificationTypeId: [undefined, [Validators.required]],
      ExperienceYear: [undefined, [Validators.required]],
      ExperienceMonth: [undefined, [Validators.required]],
      CurrentCTC: [''],
      CurrentEmployer: [''],
      CurrentDesignation: [''],
      DomainId: [undefined],
      SubDomainId: [undefined],
      StateId: [undefined, [Validators.required]],
      PreviousApplied: [undefined, [Validators.required]],
      RelativeStatus: [undefined, [Validators.required]],
      RelativeName: [''],
      RelativeContactNo: [''],
      SourceChannelId: [0],
      ParentRelationshipId: [undefined, [Validators.required]],
      ChildRelationshipId: [undefined],
      RelationshipNotes: [''],
      CreatedBy: [0],
      VendorId: [0],
      RequisitionDetailId: [0],
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
  //qualification
  getAllQualification() {
    this.qualifications = [];
    this.qualificationService.getAllQualification(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;
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

  changeQualification(evt) {
    var qualificationId = evt;
    this.selectedQualification = this.qualifications.filter(x => x.qualificationId == qualificationId)[0];
    this.saveForm.patchValue({
      CourseId: undefined,
      StreamId: undefined
    })
    this.getAllCourse();
  }
  //Course
  getAllCourse() {
    this.courses = [];
    this.searchCourse.qualificationId = this.selectedQualification.qualificationId;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.courses = result;
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

  changeCourse(evt) {
    var courseId = evt;
    var qualificationId = this.saveForm.get("QualificationId").value;
    this.selectedCourse = this.courses.filter(x => x.courseId == courseId && x.qualificationId == qualificationId)[0];
    this.saveForm.patchValue({
      StreamId: undefined
    })
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

  changeDomain(evt) {
    var domainId = evt;
    this.selectedDomain = this.domain.filter(x => x.domainId == domainId)[0];
    this.saveForm.patchValue({
      SubDomainId: undefined
    })
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
    this.isCloseRelationship = true;
    this.isOtherRelationship = true;
    this.saveForm.reset();
    this.saveForm.patchValue({ CurrentCTC: 0 });
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
    this.isRelative = true;
    this.isExperience = false;
    this.setGenderId();

  }
  isFieldValid(field: string) {
    return (!this.saveForm.get(field).valid && this.saveForm.get(field).touched) ||
      (this.saveForm.get(field).untouched && this.onSubmit);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onSubmit() {
    var flag = 0;
    this.calcGenderId = this.saveForm.get("GenderId").value;
    this.submitted = true;
    // stop here if form is invalid
    if (this.saveForm.invalid) {
      flag = 1;
      this.validateAllFormFields(this.saveForm);
    }
    if (this.saveForm.value.PrefixId == undefined || this.saveForm.value.PrefixId == "") {
      jQuery(".msgprefixid").show()
      flag = 1;
    }
    else {
      jQuery(".msgprefixid").hide();
    }
    if (this.saveForm.value.MotherTongueId == undefined || this.saveForm.value.MotherTongueId == "") {
      jQuery(".msgmothertongurid").show();
      flag = 1;
    }
    else {
      jQuery(".msgmothertongurid").hide();
    }
    if (this.saveForm.value.LanguageIds=="" || this.saveForm.value.LanguageIds==undefined) {
      jQuery(".msglanguagesknown").show();
      flag = 1;
    }
    else {
      jQuery(".msglanguagesknown").hide();
    }
    if (this.saveForm.value.QualificationId == undefined || this.saveForm.value.QualificationId == "") {
      jQuery(".msgqualificationid").show();
      flag = 1;
    }
    else {
      jQuery(".msgqualificationid").hide();
    }
    if (this.saveForm.value.CourseId == undefined || this.saveForm.value.CourseId == "") {
      jQuery(".msgcourseid").show();
      flag = 1;
    }
    else {
      jQuery(".msgcourseid").hide();
    }
    if (this.saveForm.value.StreamId == undefined || this.saveForm.value.StreamId == "") {
      jQuery(".msgstreamid").show();
      flag = 1;
    }
    else {
      jQuery(".msgstreamid").hide();
    }
    if (this.saveForm.value.CompletionYear == undefined || this.saveForm.value.CompletionYear == "") {
      jQuery(".mscompletionyearid").show();
      flag = 1;
    }
    else {
      jQuery(".mscompletionyearid").hide();
    }
    if (this.saveForm.value.QualificationTypeId == undefined || this.saveForm.value.QualificationTypeId == "") {
      jQuery(".msgqualificationtypeid").show();
      flag = 1;
    }
    else {
      jQuery(".msgqualificationtypeid").hide();
    }
    // if (this.saveForm.value.DomainId == undefined || this.saveForm.value.DomainId == "") {
    //   jQuery(".msgdomainid").show();
    //   flag = 1;
    // }
    // else {
    //   jQuery(".msgdomainid").hide();
    // }
    // if (this.saveForm.value.SubDomainId == undefined || this.saveForm.value.SubDomainId == "") {
    //   jQuery(".msgsubdomainid").show();
    //   flag = 1;
    // }
    // else {
    //   jQuery(".msgsubdomainid").hide();
    // }
    if (this.saveForm.value.StateId == undefined || this.saveForm.value.StateId == "") {
      jQuery(".msgstateid").show();
      flag = 1;
    }
    else {
      jQuery(".msgstateid").hide();
    }
    if (this.saveForm.value.ParentRelationshipId == undefined || this.saveForm.value.ParentRelationshipId == "") {
      jQuery(".msgparentrelationshipid").show();
      flag = 1
    }
    else {
      jQuery(".msgparentrelationshipid").hide();
      if (this.isCloseRelationship == false) {
        if (this.saveForm.value.ChildRelationshipId == undefined || this.saveForm.value.ChildRelationshipId == "") {
          jQuery(".msgchildrelationshipid").show();
          flag = 1
        }
        else {
          jQuery(".msgchildrelationshipid").hide();
        }
      }
      else {

      }
    }
    if (this.saveForm.value.RelativeStatus == "0" || this.saveForm.value.RelativeStatus == "1") {
      jQuery(".msgrelativestatusid").hide();
    }
    else {
      jQuery(".msgrelativestatusid").show();
      flag = 1;
    }
    if (this.saveForm.value.PreviousApplied == "0" || this.saveForm.value.PreviousApplied == "1") {
      jQuery(".msgpreviousappliedid").hide();
    }
    else {
      jQuery(".msgpreviousappliedid").show();
      flag = 1;
    }
    if (this.isExperience == true) {
      if (this.saveForm.value.ExperienceYear > 0) {
        jQuery(".msgyearid").hide();
        if ((parseInt(this.saveForm.value.ExperienceMonth) >= 0 || this.saveForm.value.ExperienceMonth != "")) {
          jQuery(".msgmonthid").hide();
        }
        else {
          jQuery(".msgmonthid").show();
          flag = 1;
        }
      }
      else if (this.saveForm.value.ExperienceYear == 0) {
        if (this.saveForm.value.ExperienceMonth > 0) {
          jQuery(".msgmonthid").hide();
          jQuery(".msgyearid").hide();
        }
        else {
          jQuery(".msgyearid").show();
          jQuery(".msgmonthid").show();
          flag = 1;
        }
      }
      else {
        jQuery(".msgyearid").show();
        flag = 1;
      }
      if (this.saveForm.value.DomainId == undefined || this.saveForm.value.DomainId == "" || this.saveForm.value.DomainId == "0") {
        jQuery(".msgdomainid").show();
        flag = 1;
      }
      else {
        jQuery(".msgdomainid").hide();
      }
      if (this.saveForm.value.SubDomainId == undefined || this.saveForm.value.SubDomainId == "" || this.saveForm.value.SubDomainId == "0") {
        jQuery(".msgsubdomainid").show();
        flag = 1;
      }
      else {
        jQuery(".msgsubdomainid").hide();
      }
    }
    else {
      if (this.saveForm.value.ExperienceYear == "0") {
        jQuery(".msgyearid").hide();
      }
      else {
        jQuery(".msgyearid").show();
        flag = 1;
      }
      if (this.saveForm.value.ExperienceMonth == "0") {
        jQuery(".msgmonthid").hide();
      }
      else {
        jQuery(".msgmonthid").show();
        flag = 1;
      }
    }
    if (this.candidatefileToUpload == null) {
      flag = 1;
      //this.notificationService.showError("Please attach the resume !!", "Error");
      jQuery(".msgfile").show();
    }
    else {
      jQuery(".msgfile").hide();
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
        SourceChannelId: 4,
        VendorId: this.vendorId,
        RequisitionDetailId: this.requisitionDetailId
      })

      const formData = new FormData();
      formData.append("PrefixId", this.saveForm.value.PrefixId);
      formData.append("FullName", this.saveForm.value.FullName);
      formData.append("DOB", this.saveForm.value.DOB);
      formData.append("Age", this.saveForm.value.Age);
      formData.append("GenderId", this.saveForm.value.GenderId);
      formData.append("EmailId", this.saveForm.value.EmailId);
      formData.append("ContactNo", this.saveForm.value.ContactNo);
      formData.append("AadharNo", this.saveForm.value.AadharNo);
      formData.append("MotherTongueId", this.saveForm.value.MotherTongueId);
      formData.append("LanguageIds", this.saveForm.value.LanguageIds);
      formData.append("QualificationId", this.saveForm.value.QualificationId);
      formData.append("StreamId", this.saveForm.value.StreamId);
      formData.append("CourseId", this.saveForm.value.CourseId);
      formData.append("MarksPercentage", this.saveForm.value.MarksPercentage);
      formData.append("CompletionYear", this.saveForm.value.CompletionYear);
      formData.append("QualificationTypeId", this.saveForm.value.QualificationTypeId);
      formData.append("ExperienceYear", this.saveForm.value.ExperienceYear);
      formData.append("ExperienceMonth", this.saveForm.value.ExperienceMonth);
      if (this.isExperience == false) {
        formData.append("CurrentCTC", "0");
        formData.append("CurrentEmployer", "");
        formData.append("CurrentDesignation", "");
        formData.append("DomainId", "0");
        formData.append("SubDomainId", "0");
      }
      else {
        formData.append("CurrentCTC", this.saveForm.value.CurrentCTC);
        formData.append("CurrentEmployer", this.saveForm.value.CurrentEmployer);
        formData.append("CurrentDesignation", this.saveForm.value.CurrentDesignation);
        formData.append("DomainId", this.saveForm.value.DomainId);
        formData.append("SubDomainId", this.saveForm.value.SubDomainId);
      }
      formData.append("StateId", this.saveForm.value.StateId);
      formData.append("PreviousApplied", this.saveForm.value.PreviousApplied);
      formData.append("RelativeStatus", this.saveForm.value.RelativeStatus);
      formData.append("RelativeName", this.saveForm.value.RelativeName);
      formData.append("RelativeContactNo", this.saveForm.value.RelativeContactNo);
      formData.append("SourceChannelId", this.saveForm.value.SourceChannelId);
      formData.append("ParentRelationshipId", this.saveForm.value.ParentRelationshipId);
      if (this.saveForm.value.ParentRelationshipId == "1") {
        formData.append("ChildRelationshipId", this.saveForm.value.ChildRelationshipId);
        formData.append("RelationshipNotes", "");
      }
      else {
        formData.append("ChildRelationshipId", "0");
        formData.append("RelationshipNotes", this.saveForm.value.RelationshipNotes);
      }

      formData.append("CreatedBy", this.saveForm.value.CreatedBy);
      formData.append("VendorId", "0");
      formData.append("RequisitionDetailId", this.saveForm.value.RequisitionDetailId);
      formData.append("CandidateResumeFile", this.candidatefileToUpload);
      var agedata = this.calcAge;
      this.SpinnerService.show();
      this.candidateService.createCandidateProfile(formData).subscribe((result) => {
        if (result.successFlag == 1) {
          this.SpinnerService.hide();
          this.notificationService.showSuccess(result.msg, "Success");
          this.candidatefileToUpload = null;
          this.candidateResumeImport.nativeElement.innerHTML = "Choose file";
          jQuery(".custom-file-input").val('');
          this.isCloseRelationship = true;
          this.isOtherRelationship = true;
          this.onReset();
          document.getElementById("radio1").click();
        }
        else {
          this.SpinnerService.hide();
          this.notificationService.showError(result.msg, "Error");
          jQuery("#txtAge").val(agedata);
          if (this.calcGenderId == 1) {
            document.getElementById("radio1").click();
          }
          else if (this.calcGenderId == 2) {
            document.getElementById("radio2").click();
          }
          else {
            document.getElementById("radio3").click();
          }
        }

      }, error => {
        // display form values on success
        this.SpinnerService.hide();
        this.notificationService.showError("Something went wrong.. Try again later..", "")
        jQuery("#txtAge").val(agedata);
        if (this.calcGenderId == 1) {
          document.getElementById("radio1").click();
        }
        else if (this.calcGenderId == 2) {
          document.getElementById("radio2").click();
        }
        else {
          document.getElementById("radio3").click();
        }
      });

    }
    else {
      this.notificationService.showError("Please fill all the required fields !!", "Error");
    }
  }

  changeRelativeStatus() {
    if (this.saveForm.value.RelativeStatus == 1) {
      this.isRelative = false;
      this.saveForm.controls['RelativeName'].setValidators([Validators.required]);
      this.saveForm.controls['RelativeContactNo'].setValidators([Validators.required]);
      this.saveForm.controls['RelativeName'].updateValueAndValidity();
      this.saveForm.controls['RelativeContactNo'].updateValueAndValidity();
    }
    else {
      this.isRelative = true;
      this.saveForm.controls['RelativeName'].clearValidators();
      this.saveForm.controls['RelativeContactNo'].clearValidators();
      this.saveForm.controls['RelativeName'].updateValueAndValidity();
      this.saveForm.controls['RelativeContactNo'].updateValueAndValidity();
    }
  }

  changeRelationship() {
    if (this.saveForm.value.ParentRelationshipId == 1) {
      this.isCloseRelationship = false;
      this.isOtherRelationship = true;
      this.saveForm.controls['ChildRelationshipId'].setValidators([Validators.required]);
      this.saveForm.controls['ChildRelationshipId'].updateValueAndValidity();
      this.saveForm.controls['RelationshipNotes'].clearValidators();
      this.saveForm.controls['RelationshipNotes'].updateValueAndValidity();
    }
    else {
      this.isCloseRelationship = true;
      this.isOtherRelationship = false;
      this.saveForm.controls['RelationshipNotes'].setValidators([Validators.required]);
      this.saveForm.controls['RelationshipNotes'].updateValueAndValidity();
      this.saveForm.controls['ChildRelationshipId'].clearValidators();
      this.saveForm.controls['ChildRelationshipId'].updateValueAndValidity();
    }
    this.loadSelectPicker();
  }

  gotoJobs() {
    this.persistance.set('pagename', null);
    this._route.navigate(['/app/current-jobs/refer']);
  }

  changeExperience() {
    if ((this.saveForm.value.ExperienceYear > 0 || this.saveForm.value.ExperienceMonth > 0)) {
      this.isExperience = true;
      this.saveForm.controls['CurrentEmployer'].setValidators([Validators.required]);
      this.saveForm.controls['CurrentCTC'].setValidators([Validators.required, Validators.pattern("^(?!0\\d)\\d{1,12}(\\.\\d{1,2})?$")]);
      this.saveForm.controls['CurrentDesignation'].setValidators([Validators.required]);
      this.saveForm.controls['DomainId'].setValidators([Validators.required]);
      this.saveForm.controls['SubDomainId'].setValidators([Validators.required]);
      this.saveForm.controls['CurrentCTC'].updateValueAndValidity();
      this.saveForm.controls['CurrentEmployer'].updateValueAndValidity();
      this.saveForm.controls['CurrentDesignation'].updateValueAndValidity();
      this.saveForm.controls['DomainId'].updateValueAndValidity();
      this.saveForm.controls['SubDomainId'].updateValueAndValidity();
    }
    else {
      this.isExperience = false;
      this.saveForm.controls['CurrentCTC'].clearValidators();
      this.saveForm.controls['CurrentDesignation'].clearValidators();
      this.saveForm.controls['CurrentEmployer'].clearValidators();
      this.saveForm.controls['DomainId'].clearValidators();
      this.saveForm.controls['SubDomainId'].clearValidators();
      this.saveForm.controls['CurrentCTC'].updateValueAndValidity();
      this.saveForm.controls['CurrentEmployer'].updateValueAndValidity();
      this.saveForm.controls['CurrentDesignation'].updateValueAndValidity();
      this.saveForm.controls['DomainId'].updateValueAndValidity();
      this.saveForm.controls['SubDomainId'].updateValueAndValidity();
    }
    setTimeout(() => {
      jQuery(".domains").selectpicker({
        size: 6
      })
      jQuery(".domains").selectpicker("refresh");
    });
  }

}
