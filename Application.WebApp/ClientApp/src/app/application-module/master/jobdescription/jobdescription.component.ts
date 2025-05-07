import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ILocation, ISearchLocation } from '../../../interfaces/common/location.interface';
import { LocationService } from '../../../services/common/location/location.service';
import { IJobDescriptionDetail } from '../../../interfaces/common/jobdescription.interface';
import { IFunctionDepartment, ISearchDepartment } from '../../../interfaces/common/department.interface';
import { IJobType, ISearchJobType } from '../../../interfaces/common/jobtype.interface';
import { IPositionVerticalDetail, ISearchPosition, IPositionGrade, ISearchPositionGrade } from '../../../interfaces/common/position.interface';
import { FunctionService } from '../../../services/common/function/function.service';
import { LanguageService } from '../../../services/common/language/language.service';
import { IndustryService } from '../../../services/common/industry/industry.service';
import { DepartmentService } from '../../../services/common/department/department.service';
import { PositionService } from '../../../services/common/position/position.service';
import { JobdescriptionService } from '../../../services/common/jobdescription/jobdescription.service';
import { ISearchStream, IStream, IQualificationCourseStream, ISearchQualificationCourseStream } from '../../../interfaces/common/stream.interface';
import { StreamService } from '../../../services/common/stream/stream.service';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from 'src/app/interfaces/common/course.interface';
import { CourseService } from '../../../services/common/course/course.service';
import { IQualification, ISearchQualification } from 'src/app/interfaces/common/qualification.interface';
import { QualificationService } from '../../../services/common/qualification/qualification.service';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';
import { IVerticalFunction, ISearchFunction } from '../../../interfaces/common/function.interface';
import { IVertical } from '../../../interfaces/common/vertical.interface';
import { IIndustry, ISearchIndustry } from 'src/app/interfaces/common/industry.interface';
import { IAge, IExperience } from 'src/app/interfaces/common/common.interface';
import { CommonService } from '../../../services/common/common/common.service';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../sharedservices/notification.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
declare var jQuery: any;

@Component({
  selector: 'app-jobdescription',
  templateUrl: './jobdescription.component.html',
  styleUrls: ['./jobdescription.component.css']
})
export class JobdescriptionComponent implements OnInit {
  @ViewChild('jobdescriptionfile', { static: false }) jobdescriptionfile: ElementRef;
  flag: number = 0;
  isSubmit: false;
  jobDescriptionForm: FormGroup;
  jobDescriptionMaster: IJobDescriptionDetail[] = [];
  //vertical
  verticals: IVertical[] = [];
  selectedVertical: IVertical;
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
  //qualification
  qualifications: IQualification[] = [];
  selectedQualification: IQualification;
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }
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
  //industry
  industries: IIndustry[] = [];
  selectedIndustry: IIndustry;
  searchIndustry: ISearchIndustry = {
    industryId: null,
    isActive: null,
  }
  //
  ages: IAge[] = [];
  experiences: IExperience[] = [];
  fileDocument: string;
  createdBy:number;
  constructor(
    private notificationService:NotificationService,
    private locationService: LocationService,
    private positionService: PositionService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private courseService: CourseService,
    private languageService: LanguageService,
    private jobDescriptionService: JobdescriptionService,
    private streamService: StreamService,
    private qualificationService: QualificationService,
    private industryService: IndustryService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private toasterService: ToastrService,
     private persistance: PersistanceService)
      { this.createdBy = this.persistance.get('loggedinuser').autoUserId;   
    this.createForm();
    this.getAllVerticals();
    this.getAllQualification();
    this.getAllLanguages();
    this.getAllIndustry();
    this.getAllAge();
    this.getAllExperience();
  }
  ngOnInit() {

  }

  createForm() {
    this.jobDescriptionForm = this.fb.group({
      JobDescriptionId: [0],
      JobDescriptionName: ['', Validators.required],
      VerticalId: [0, Validators.required],
      LocationId: [0, Validators.required],
      FunctionId: [0, Validators.required],
      DepartmentId: [0, Validators.required],
      PositionId: [0, Validators.required],
      GradeId: [0, Validators.required],
      ReportsTo: ['', Validators.required],
      NoOfReportees: [0, Validators.required],
      IndustryId: ['', Validators.required],
      ExperienceId: [0, Validators.required],
      AgeId: [0, Validators.required],
      QualificationId: [0, Validators.required],
      CourseId: [0, Validators.required],
      StreamId: [0, Validators.required],
      LanguageId: [0, Validators.required],
      AnyOtherLanguage: [''],
      JobPurpose: ['', Validators.required],
      JobSummary: ['', Validators.required],
      KPIs: [''],
      Dimensions: [''],
      Knowledge: ['', Validators.required],
      Skills: ['', Validators.required],
      ExternalStakeHolders: [''],
      InternalStakeHolders: [''],
      RestrictedJD: [''],
      JDDocument: [''],
      IsActive:[true],
      CreatedBy:[this.createdBy]
    });
  }

  //verticals
  getAllVerticals() {
    this.verticals = [];
    this.verticals.push({ verticalId: 2, verticalName: "Plant", isActive: true });
    this.verticals.push({ verticalId: 1, verticalName: "Corporate", isActive: true });
    this.verticals.push({ verticalId: 3, verticalName: "Sales & Marketing", isActive: true });
  }

  changeVertical() {
    var verticalId = this.jobDescriptionForm.get("VerticalId").value;
    this.selectedVertical = this.verticals.filter(x => x.verticalId == verticalId)[0];
    this.getAllLocation();
    this.getAllPosition();
    this.getAllFunction();
  }

  //locations
  getAllLocation() {
    this.locations = [];
    this.searchLocation.verticalId = this.selectedVertical.verticalId;
    console.log(this.searchLocation);
    this.locationService.getAllLocation(this.searchLocation).subscribe((result) => {
      if (result) {
        this.locations = result;
        console.log(result);
      }
      else {
        this.locations = [];
      }
    }, error => {
      console.log(this.locations);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  //industry
  getAllIndustry() {
    this.industries = [];
    this.searchIndustry.isActive = true;
    this.industryService.getAllIndustry(this.searchIndustry).subscribe((result) => {
      if (result) {
        this.industries = result;
        console.log(result);
      }
      else {
        this.industries = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  //age
  getAllAge() {
    this.ages = [];
    this.commonService.getAllAge().subscribe((result) => {
      if (result) {
        this.ages = result;
        console.log(result);
      }
      else {
        this.ages = [];
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

  //functions
  getAllFunction() {
    this.functions = [];
    this.searchFunction.verticalId = this.selectedVertical.verticalId;
    this.functionService.getAllVerticalFunction(this.searchFunction).subscribe((result) => {
      if (result) {
        this.functions = result;
        console.log(result);
      }
      else {
        this.functions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  changeFunction() {
    var functionId = this.jobDescriptionForm.get("FunctionId").value;
    this.selectedFunction = this.functions.filter(x => x.functionId == functionId)[0];
    this.getAllDepartment();
  }

  //department
  getAllDepartment() {
    this.departments = [];
    this.searchDepartment.verticalId = this.selectedVertical.verticalId;
    this.searchDepartment.functionId = this.selectedFunction.functionId;
    this.departmentService.getAllFunctionDepartment(this.searchDepartment).subscribe((result) => {
      if (result) {
        this.departments = result;
        console.log(result);
      }
      else {
        this.departments = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  //position
  getAllPosition() {
    this.positions = [];
    this.searchPosition.verticalId = this.selectedVertical.verticalId;
    this.positionService.getAllVerticalPosition(this.searchPosition).subscribe((result) => {
      if (result) {
        this.positions = result;
        console.log(result);
      }
      else {
        this.positions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
  }

  changePosition() {
    var positionId = this.jobDescriptionForm.get("PositionId").value;
    this.selectedPosition = this.positions.filter(x => x.positionId == positionId)[0];
    this.getAllGrade();
  }

  //grade
  getAllGrade() {
    this.grades = [];
    this.searchGrade.verticalId = this.selectedVertical.verticalId;
    this.searchGrade.positionId = this.selectedPosition.positionId;
    this.positionService.getAllPositionGrade(this.searchGrade).subscribe((result) => {
      if (result) {
        this.grades = result;
        console.log(result);
      }
      else {
        this.grades = [];
      }
    }, error => {
      console.log(error);
    }, () => {
      setTimeout(() => {
        jQuery('.selectpicker').selectpicker('refresh');
      });
    });
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
  }

  changeQualification() {
    var qualificationId = this.jobDescriptionForm.get("QualificationId").value;
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
    var courseId = this.jobDescriptionForm.get("CourseId").value;
    var qualificationId = this.jobDescriptionForm.get("QualificationId").value;
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

  onSubmit() {
    this.jobDescriptionForm.patchValue({
      JDDocument:this.fileDocument,
      IndustryId:this.jobDescriptionForm.get("IndustryId").value.join(',')
    })
    console.log(this.jobDescriptionForm.value);
    this.jobDescriptionService.saveJobDescription(this.jobDescriptionForm.value).subscribe((result) => {
      if (result) {
        console.log(result);
        this.notificationService.showSuccess(result.msg, "Job Description");
      }
      else {
      }
    }, error => {
      console.log(error);
      this.notificationService.showError("Something went wrong.. Try again later..", "Job Description");
    }, () => {
      
    });
  }
}
