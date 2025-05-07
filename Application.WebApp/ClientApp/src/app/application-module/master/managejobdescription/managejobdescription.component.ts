import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { JobdescriptionService } from 'src/app/services/common/jobdescription/jobdescription.service';
import { FunctionService } from 'src/app/services/common/function/function.service';
import { DepartmentService } from 'src/app/services/common/department/department.service';
import { PositionService } from 'src/app/services/common/position/position.service';
import { LocationService } from 'src/app/services/common/location/location.service';
import { GradeService } from 'src/app/services/common/grade/grade.service';
import { QualificationService } from 'src/app/services/common/qualification/qualification.service';
import { CourseService } from 'src/app/services/common/course/course.service';
import { IndustryService } from 'src/app/services/common/industry/industry.service';
import { StreamService } from 'src/app/services/common/stream/stream.service';
import { CommonService } from 'src/app/services/common/common/common.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { LanguageService } from 'src/app/services/common/language/language.service';
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { VerticalService } from 'src/app/services/common/vertical/vertical.service';
import { ISearchQualificationCourse } from 'src/app/interfaces/common/course.interface';
import { ISearchQualificationCourseStream } from 'src/app/interfaces/common/stream.interface';
import { isNullOrUndefined } from 'util';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';

declare var jQuery: any;

@Component({
  selector: 'app-managejobdescription',
  templateUrl: './managejobdescription.component.html',
  styleUrls: ['./managejobdescription.component.css']
})

export class ManagejobdescriptionComponent implements OnInit {
  @ViewChild('managementFileImport', { static: false }) managementFileImport: ElementRef;
  submitted = false;
  JobDescList: any[] = [];
  VerticalList: any[] = [];
  VerticalID: number;
  FunctionList: any[] = [];
  DepartmentList: any[] = [];
  PositionList: any[] = [];
  LocationList: any[] = [];
  GradeList: any[] = [];
  IndustryList: any[] = [];
  QualificationList: any[] = [];
  CourseList: any[] = [];
  StreamList: any[] = [];
  LanguageList: any[] = [];
  ExperienceList: any[] = [];
  AgeList: any[] = [];
  createdBy: number;
  managementfileToUpload: File = null;
  SelectedQualification: Array<number>;
  saveForm = new FormGroup({
    Name: new FormControl('')
  });

  //languages
  languages: ILanguage[] = [];
  selectedLanguages: ILanguage;
  searchLanguages: ISearchLanguage = {
    languageId: null,
    isActive: null
  }
  languageId: number;
  languageName: string;

  //INTERFACES
  searchCourse: ISearchQualificationCourse = {
    qualificationId: null,
    courseId: null,
    isActive: true
  }

  searchStream: ISearchQualificationCourseStream = {
    qualificationId: null,
    courseId: null,
    streamId: null,
    isActive: true
  }

  pageName: string = "JD Template";
  showBackBtn: boolean = false;
  constructor(
    private qualificationService: QualificationService,
    private jobDescService: JobdescriptionService,
    private verticalService: VerticalService,
    private functionService: FunctionService,
    private departmentService: DepartmentService,
    private positionService: PositionService,
    private locationService: LocationService,
    private spinnerService: NgxSpinnerService,
    private industryService: IndustryService,
    private notiService: NotificationService,
    private gradeService: GradeService,
    private courseService: CourseService,
    private streamService: StreamService,
    private languageService: LanguageService,
    private commonService: CommonService,
    private persistance: PersistanceService,
    private fb: FormBuilder
  ) {
    this.createdBy = this.persistance.get('loggedinuser').autoUserId;
  }

  ngOnInit() {
    this.loadDataTable();
    this.createForm();


    this.getAllVertical();
    this.getAllIndustry();
    this.getAllExperience();
    this.getAllQualification();
    this.getAllLanguage();
    this.getAllAge();
    this.getAllJobDescription();
    this.tableOptionDropDown();
  }
  tableOptionDropDown() {
    setTimeout(() => {
      var body_ = jQuery('body');
      var dropdownMenu,
        table_responsive = jQuery('.table-responsive');
      table_responsive.on('show.bs.dropdown', function (e) {
        dropdownMenu = jQuery(e.target).find('.dropdown-menu');
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
  loadSelectPicker() {
    setTimeout(() => {
      jQuery('.selectpicker').selectpicker({
        size: 6
      });
      jQuery('.selectpicker').selectpicker('refresh');
    });
  }

  createForm() {
    this.saveForm = this.fb.group({
      JobDescriptionId: [0, Validators.required],
      JobDescriptionName: ['', Validators.required],
      VerticalId: [null, Validators.required],
      FunctionId: [null, Validators.required],
      DepartmentId: [null, Validators.required],
      PositionId: [null, Validators.required],
      LocationId: [null, Validators.required],
      GradeId: [null, Validators.required],
      ReportsTo: ['', Validators.required],
      NoOfReportees: [null, Validators.required],
      IndustryId: [null, Validators.required],
      ExperienceId: [null, Validators.required],
      AgeId: [null, Validators.required],
      QualificationId: [null, Validators.required],
      CourseId: [null, [Validators.required]],
      StreamId: [null, [Validators.required]],
      LanguageId: [0, Validators.required],
      AnyOtherLanguage: [''],
      RestrictedJD: [''],
      JobPurpose: ['', Validators.required],
      JobSummary: ['', Validators.required],
      KPIs: ['<p>&nbsp;</p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p><strong>Staff reporting: Individual Contributor</strong></p>  ', Validators.required],
      //Dimensions:['', Validators.required],      
      Knowledge: ['<p><strong>Knowledge (Technical / Functional)</strong></p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p><strong>Skills and Ability</strong></p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p><strong>Internal Stake holders</strong></p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p>&nbsp;</p>    <p><strong>External Stake holders</strong></p>  ', Validators.required],
      // Skills:['', Validators.required],      
      // ExternalStakeHolders:['', Validators.required],      
      // InternalStakeHolders:['', Validators.required],
      // JDDocument:[''],      
      IsActive: [true],
      CreatedBy: this.createdBy
    })
  }

  onFileChange(files: FileList) {

    if (files[0].size > 2097152) {
      this.notiService.showError("File should be less than 2MB!", "Error");
      this.managementFileImport.nativeElement.innerText = "Choose file";
      this.managementfileToUpload = null;
    } else {
      this.managementFileImport.nativeElement.innerText = files[0].name;
      this.managementfileToUpload = files.item(0);
      //console.log(this.managementfileToUpload);
    }
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
    //debugger
    // if(this.saveForm.value.JobDescriptionId == 0){
    //   if (this.managementfileToUpload == null) {
    //     this.notiService.showError("Please upload a file!", "Error");
    //     return false;
    //   }
    // }
    // else{
    //   if(this.saveForm.value.JDDocument == ''){
    //     this.notiService.showError("Please upload a file!", "Error");
    //     return false;
    //   }
    // }       

    const formData = new FormData();

    var flag = 0;
    if (this.saveForm.invalid) {
      flag = 1;
      this.validateAllFormFields(this.saveForm);
    }
    if (this.saveForm.value.LanguageId.length == 0) {
      jQuery(".msglanguagesknown").show();
      flag = 1;
    }
    else {
      jQuery(".msglanguagesknown").hide();
    }
    if (flag == 0) {
      formData.append("JobDescriptionId", this.saveForm.value.JobDescriptionId);
      formData.append("JobDescriptionName", this.saveForm.value.JobDescriptionName.toString());
      formData.append("VerticalId", this.saveForm.value.VerticalId.toString());
      formData.append("LocationId", this.saveForm.get("LocationId").value.join(','));
      formData.append("FunctionId", this.saveForm.value.FunctionId.toString());
      formData.append("DepartmentId", this.saveForm.value.DepartmentId.toString());
      formData.append("PositionId", this.saveForm.value.PositionId.toString());
      formData.append("GradeId", this.saveForm.get("GradeId").value.join(','));
      formData.append("ReportsTo", this.saveForm.value.ReportsTo.toString());
      formData.append("NoOfReportees", this.saveForm.value.NoOfReportees.toString());
      formData.append("IndustryId", this.saveForm.get("IndustryId").value.join(','));
      formData.append("ExperienceId", this.saveForm.get("ExperienceId").value.join(','));
      formData.append("AgeId", this.saveForm.get("AgeId").value.join(','));
      formData.append("QualificationId", this.saveForm.get("QualificationId").value.join(','));
      formData.append("CourseId", this.saveForm.get("CourseId").value.join(','));
      formData.append("StreamId", this.saveForm.get("StreamId").value.join(','));
      /*formData.append("LanguageId", this.saveForm.get("LanguageId").value.join(','));*/
      formData.append("LanguageId", String(this.saveForm.value.LanguageId));
      formData.append("AnyOtherLanguage", this.saveForm.value.AnyOtherLanguage.toString());
      formData.append("JobPurpose", this.saveForm.value.JobPurpose.toString());
      formData.append("JobSummary", this.saveForm.value.JobSummary.toString());
      formData.append("KPIs", this.saveForm.value.KPIs.toString());
      formData.append("IsEnabled","false");
      //formData.append("Dimensions", this.saveForm.value.Dimensions.toString());
      formData.append("Knowledge", this.saveForm.value.Knowledge.toString());
      //formData.append("Skills", this.saveForm.value.Skills.toString());
      //formData.append("ExternalStakeHolders", this.saveForm.value.ExternalStakeHolders.toString());
      //formData.append("InternalStakeHolders", this.saveForm.value.InternalStakeHolders.toString());
      formData.append("RestrictedJD", this.saveForm.value.RestrictedJD.toString());
      formData.append("IsActive", this.saveForm.value.IsActive);
      formData.append("CreatedBy", this.saveForm.value.CreatedBy);
      if (this.saveForm.value.JobDescriptionId == 0) { formData.append("JDDocument", this.managementfileToUpload); }
      else { formData.append("JDDocument", this.saveForm.value.JDDocument); }

      this.spinnerService.show();
      this.jobDescService.saveJobDescription(formData).subscribe((response: any) => {
        if (response.successFlag == 1) {
          this.notiService.showSuccess(response.msg, "Success");
          this.createForm();
          this.getAllJobDescription();
          (document.getElementById("jd-template-list") as HTMLDivElement).style.display = 'block';
          (document.getElementById("btnAddNew") as HTMLDivElement).style.display = 'block';
          (document.getElementById("jd-template-form") as HTMLDivElement).style.display = 'none';
          (document.getElementById("btnBack") as HTMLDivElement).style.display = 'none';
          this.pageName = "JD Template";
          this.showBackBtn = false;
          this.tableOptionDropDown();
        }
        else {
          this.notiService.showError(response.msg, "Error");
        }
      }, error => {
        this.notiService.showError("Something went wrong.. Try again later..", "")
        this.spinnerService.hide();
        console.log(error);
      }, () => {
        this.spinnerService.hide();
      })
    } else {
      this.notiService.showError("Please fill all the required fields !!", "Error");
    }

  }
  arr : string[]=[];
  num : number[]=[1,2,3,4];
  onClickshow()
  {
    this.arr=[];
    console.log("chck",this.saveForm.value.LocationId[0])
    console.log("chck",this.LocationList)
    for(let i=0;i<this.saveForm.value.LocationId.length;i++)
    {
      for(let j=0;j<this.LocationList.length;j++)
      {
        
        if(this.saveForm.value.LocationId[i]==this.LocationList[j].locationId)
        {
          console.log("TRY",this.LocationList[j].locationOffice)
          this.arr.push(this.LocationList[j].locationOffice);
          console.log("TRY",this.arr)
          
        }
      }
    }
    // this.notiService.showSuccess(this.arr, "Selected");
     
      
  }

  //onSubmit() {
  //  var flag = 0;
  //  this.submitted = true;
  //  const formData = new FormData();
  //  // stop here if form is invalid
  //  console.log(this.saveForm.value);
  //  if (this.saveForm.invalid) {
  //    flag = 1;
  //    this.validateAllFormFields(this.saveForm);


  //    formData.append("JobDescriptionId", this.saveForm.value.JobDescriptionId);
  //    if (this.saveForm.value.JobDescriptionName != "") {
  //      formData.append("JobDescriptionName", this.saveForm.value.JobDescriptionName.toString());
  //    }
  //    else {
  //      this.notiService.showError("Job Description required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.VerticalId)) {

  //      formData.append("VerticalId", this.saveForm.value.VerticalId.toString());
  //    }
  //    else {
  //      this.notiService.showError("Vertical required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.LocationId)) {

  //      formData.append("LocationId", this.saveForm.get("LocationId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Location required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.FunctionId)) {

  //      formData.append("FunctionId", this.saveForm.get("FunctionId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Function required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.DepartmentId)) {

  //      formData.append("DepartmentId", this.saveForm.get("DepartmentId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Department required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.PositionId)) {

  //      formData.append("PositionId", this.saveForm.get("PositionId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Position required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.GradeId)) {

  //      formData.append("GradeId", this.saveForm.get("GradeId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Grade required...", "")
  //    }

  //    if (this.saveForm.value.ReportsTo != "") {

  //      formData.append("ReportsTo", this.saveForm.value.ReportsTo.toString());
  //    }
  //    else {
  //      this.notiService.showError("Reports To required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.NoOfReportees)) {

  //      formData.append("NoOfReportees", this.saveForm.value.NoOfReportees.toString());
  //    }
  //    else {
  //      this.notiService.showError("NoOfReportees To required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.IndustryId)) {

  //      formData.append("IndustryId", this.saveForm.get("IndustryId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Industry required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.ExperienceId)) {

  //      formData.append("ExperienceId", this.saveForm.get("ExperienceId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Experience required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.AgeId)) {

  //      formData.append("AgeId", this.saveForm.get("AgeId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Age required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.QualificationId)) {

  //      formData.append("QualificationId", this.saveForm.get("QualificationId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Qualification required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.CourseId)) {

  //      formData.append("CourseId", this.saveForm.get("CourseId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Course required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.StreamId)) {

  //      formData.append("StreamId", this.saveForm.get("StreamId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Stream required...", "")
  //    }
  //    if (!isNullOrUndefined(this.saveForm.value.LanguageId)) {

  //      formData.append("LanguageId", this.saveForm.get("LanguageId").value.join(','));
  //    }
  //    else {
  //      this.notiService.showError("Language required...", "")
  //    }
  //    if (this.saveForm.value.JobSummary != "") {

  //      formData.append("JobSummary", this.saveForm.value.JobSummary.toString());
  //    }
  //    else {
  //      this.notiService.showError("JobSummary required...", "")
  //    }
  //    if (this.saveForm.value.JobPurpose != "") {

  //      formData.append("JobPurpose", this.saveForm.value.JobPurpose.toString());
  //    }
  //    else {
  //      this.notiService.showError("Main Purpose required...", "")
  //    }
  //    if (this.saveForm.value.KPIs != "") {

  //      formData.append("KPIs", this.saveForm.value.KPIs.toString());
  //    }
  //    else {
  //      this.notiService.showError("KPIs required...", "")
  //    }
  //    if (this.saveForm.value.Knowledge != "") {

  //      formData.append("Knowledge", this.saveForm.value.Knowledge.toString());
  //    }
  //    else {
  //      this.notiService.showError("Knowledge required...", "")
  //    }
  //    if (this.saveForm.value.RestrictedJD != "") {

  //      formData.append("RestrictedJD", this.saveForm.value.RestrictedJD.toString());
  //    }
  //    else {
  //      this.notiService.showError("RestrictedJD required...", "")
  //    }


  //  }

  //  // if(this.saveForm.value.JobDescriptionId == 0){
  //  //   if (this.managementfileToUpload == null) {
  //  //     this.notiService.showError("Please upload a file!", "Error");
  //  //     return false;
  //  //   }
  //  // }
  //  // else{
  //  //   if(this.saveForm.value.JDDocument == ''){
  //  //     this.notiService.showError("Please upload a file!", "Error");
  //  //     return false;
  //  //   }
  //  // }       
  //  else {

  //    formData.append("AnyOtherLanguage", this.saveForm.value.AnyOtherLanguage.toString());
  //    //formData.append("Dimensions", this.saveForm.value.Dimensions.toString());
  //    //formData.append("Skills", this.saveForm.value.Skills.toString());
  //    //formData.append("ExternalStakeHolders", this.saveForm.value.ExternalStakeHolders.toString());
  //    //formData.append("InternalStakeHolders", this.saveForm.value.InternalStakeHolders.toString());
  //    formData.append("IsActive", this.saveForm.value.IsActive);
  //    formData.append("CreatedBy", this.saveForm.value.CreatedBy);
  //    if (this.saveForm.value.JobDescriptionId == 0) { formData.append("JDDocument", this.managementfileToUpload); }
  //    else { formData.append("JDDocument", this.saveForm.value.JDDocument); }

  //    this.spinnerService.show();
  //    this.jobDescService.saveJobDescription(formData).subscribe((response: any) => {
  //      if (response.successFlag == 1) {
  //        this.notiService.showSuccess(response.msg, "Success");
  //        this.createForm();
  //        this.getAllJobDescription();
  //      }
  //      else {
  //        this.notiService.showError(response.msg, "Error");
  //      }
  //    }, error => {
  //      this.notiService.showError("Something went wrong.. Try again later..", "")
  //      this.spinnerService.hide();
  //      console.log(error);
  //    }, () => {
  //      this.spinnerService.hide();
  //    })
  //  }

  //}


  onEdit(rowData: any) {
    this.pageName = "Edit JD Template";
    this.showBackBtn = true;
    let data: any = {
      'JobDescriptionId': rowData.jobDescriptionId,
      'VerticalId': rowData.verticalId,
      // 'IsActive': true
      'IsActive': rowData.isActive
    }
    this.spinnerService.hide();
    this.jobDescService.getAllJobDescriptionDetails(data).subscribe((response: any[]) => {
      //console.log("JD Details: ", response[0]);
      (document.getElementById("jd-template-list") as HTMLDivElement).style.display = 'none';
      (document.getElementById("btnAddNew") as HTMLDivElement).style.display = 'none';
      (document.getElementById("jd-template-form") as HTMLDivElement).style.display = 'block';

      this.VerticalID = response[0].verticalId;
      this.onChangeVertical(response[0].verticalId);
      this.onChangeFunction(response[0].functionId);
      this.onChangePosition(response[0].positionId);

      let arrNumQualification: Array<number> = [];
      for (let item of response[0].qualificationId.split(',')) {
        arrNumQualification.push(Number(item));
      }
      this.onChangeQualification(arrNumQualification);

      let arrNumCourse: Array<number> = [];
      for (let item of response[0].courseId.split(',')) {
        arrNumCourse.push(Number(item));
      }
      this.onChangeCourse(arrNumCourse);

      let arrNumLocation: Array<number> = [];
      for (let item of response[0].locationId.split(',')) {
        arrNumLocation.push(Number(item));
      }

      let arrNumGrade: Array<number> = [];
      for (let item of response[0].gradeId.split(',')) {
        arrNumGrade.push(Number(item));
      }

      let arrNumIndustry: Array<number> = [];
      for (let item of response[0].industryId.split(',')) {
        arrNumIndustry.push(Number(item));
      }

      let arrNumExperience: Array<number> = [];
      for (let item of response[0].experienceId.split(',')) {
        arrNumExperience.push(Number(item));
      }

      let arrNumAge: Array<number> = [];
      for (let item of response[0].ageId.split(',')) {
        arrNumAge.push(Number(item));
      }

      let arrNumStream: Array<number> = [];
      for (let item of response[0].streamId.split(',')) {
        arrNumStream.push(Number(item));
      }

      let arrNumLanguage: Array<number> = [];
      for (let item of response[0].languageId.split(',')) {
        arrNumLanguage.push(parseInt(item));
      }
      //  setTimeout(() => {
      this.saveForm.patchValue({
        JobDescriptionId: response[0].jobDescriptionId,
        JobDescriptionName: response[0].jobDescriptionName,
        VerticalId: response[0].verticalId,
        FunctionId: response[0].functionId == 0 ? "Select" : response[0].functionId,
        DepartmentId: response[0].departmentId == 0 ? "Select" : response[0].departmentId,
        PositionId: response[0].positionId == 0 ? "Select" : response[0].positionId,
        LocationId: arrNumLocation,
        GradeId: arrNumGrade[0] == 0 ? "Select" : arrNumGrade,
        ReportsTo: response[0].reportsTo,
        NoOfReportees: response[0].noOfReportees,
        IndustryId: arrNumIndustry[0] == 0 ? "Select" : arrNumIndustry,
        ExperienceId: arrNumExperience[0] == 0 ? "Select" : arrNumExperience,
        AgeId: arrNumAge[0] == 0 ? "Select" : arrNumAge,
        QualificationId: arrNumQualification[0] == 0 ? "Select" : arrNumQualification,
        CourseId: arrNumCourse[0] == 0 ? "Select" : arrNumCourse,
        StreamId: arrNumStream[0] == 0 ? "Select" : arrNumStream,
        LanguageId: arrNumLanguage,
        AnyOtherLanguage: response[0].anyOtherLanguage,
        RestrictedJD: response[0].restrictedJD,
        JobPurpose: response[0].jobPurpose,
        JobSummary: response[0].jobSummary,
        KPIs: response[0].kpIs,
        //Dimensions: response[0].dimensions,
        Knowledge: response[0].knowledge,
        //Skills: response[0].skills, 
        //JDDocument: response[0].jdDocument,     
        //ExternalStakeHolders: response[0].externalStakeHolders,
        //InternalStakeHolders: response[0].internalStakeHolders,      
        IsActive: response[0].isActive,
        CreatedBy: response[0].createdBy
        // });
      })
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.spinnerService.hide();
      this.loadSelectPicker();
    });
  }

  getAllJobDescription() {
    this.spinnerService.show();
    this.saveForm.value.IsActive = null;
    this.jobDescService.getAllJobDescription(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.JobDescList = response;
        //console.log("JD: ", this.JobDescList);
      }
      else {
        this.JobDescList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "");
      this.spinnerService.hide();
      console.log(error);
    }, () => {
      this.loadDataTable();
      this.spinnerService.hide();
    })
  }

  getAllVertical() {
    this.verticalService.getAllVertical(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.VerticalList = response;
        //console.log("VerticalList: ", response);                
      }
      else {
        this.VerticalList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangeVertical(verticalID: any) {
    let data: any = {
      'VerticalId': verticalID,
      'IsActive': true
    }

    this.VerticalID = verticalID;
    this.getVerticalFunction(data);
    this.getAllVerticalPosition(data);
    this.getAllVerticalLocation(data);
  }

  getVerticalFunction(data: any) {
    this.functionService.getAllVerticalFunction(data).subscribe((response: any) => {
      if (response) {
        this.FunctionList = response;
        //console.log("FunList: ", this.FunctionList);                
      }
      else {
        this.FunctionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangeFunction(functionID: any) {
    let data: any = {
      'VerticalId': this.VerticalID,
      'FunctionId': functionID,
      'IsActive': true
    }

    this.getAllFunctionDepartment(data);
  }

  getAllFunctionDepartment(data: any) {
    this.departmentService.getAllFunctionDepartment(data).subscribe((response: any) => {
      if (response) {
        this.DepartmentList = response;
        //console.log("Dept List: ", this.DepartmentList);                
      }
      else {
        this.DepartmentList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllVerticalPosition(data: any) {
    this.positionService.getAllVerticalPosition(data).subscribe((response: any) => {
      if (response) {
        this.PositionList = response;
        //console.log("Dept List: ", this.DepartmentList);                
      }
      else {
        this.PositionList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangePosition(PositionID: any) {

    let data: any = {
      'PositionId': PositionID,
      'IsActive': true
    };

    this.getAllPositionGrade(data);
  }

  getAllVerticalLocation(data: any) {
    this.locationService.getAllLocation(data).subscribe((response: any) => {
      if (response) {
        let Arr: any[] = [...response, { "locationId": 0, "locationOffice": "All" }];
        this.LocationList = Arr;

        //console.log("Loc List: ", this.LocationList);                
      }
      else {
        this.LocationList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllPositionGrade(data: any) {
    this.gradeService.getAllPositionGrade(data).subscribe((response: any) => {
      if (response) {
        this.GradeList = response;
        //console.log("Grade List: ", this.GradeList);                               
      }
      else {
        this.GradeList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllIndustry() {
    this.industryService.getAllIndustry(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.IndustryList = response;
        //console.log("Industry: ", this.IndustryList);               
      }
      else {
        this.IndustryList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllExperience() {
    this.commonService.getAllExperience().subscribe((response: any) => {
      if (response) {
        this.ExperienceList = response;
        //console.log("Exp: ", this.ExperienceList);               
      }
      else {
        this.ExperienceList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllAge() {
    this.commonService.getAllAge().subscribe((response: any) => {
      if (response) {
        this.AgeList = response;
        //console.log("Age List: ", this.AgeList);               
      }
      else {
        this.AgeList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  getAllQualification() {
    this.qualificationService.getAllQualification(this.saveForm.value).subscribe((response: any) => {
      if (response) {
        this.QualificationList = response;
      }
      else {
        this.QualificationList = [];
      }
    }, error => {
      this.notiService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    })
  }

  onChangeQualification(QualificationID: any) {
    var qualificationId = QualificationID.join(',');
    this.SelectedQualification = QualificationID;
    this.CourseList = [];
    if (qualificationId != "") {
      var splitQualification = qualificationId.split(",");
      for (var i = 0; i < splitQualification.length; i++) {
        this.getAllQualificationCourse(splitQualification[i]);
      }
    }
    else {
      this.CourseList = [];
      this.StreamList = [];
    }

    // let Data: any = {
    //   "QualificationId": QualificationID,
    //   "IsActive": true
    // }

    // this.SelectedQualification = QualificationID;
    // this.getAllQualificationCourse(Data);
  }

  getAllQualificationCourse(QualificationID: any) {
    this.searchCourse.qualificationId = Number(QualificationID);
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        for (var i = 0; i < result.length; i++) {
          this.CourseList.push({
            courseId: result[i].courseId,
            courseName: result[i].courseName,
            qualificationId: result[i].qualificationId,
            qualificationName: result[i].qualificationName,
            isActive: true,
          })
        }
        //this.courses = result;
        //this.streams = [];
      }
      else {
        //this.courses = [];
        //this.streams = [];
      }
    }, error => {
      console.log(error);
    });

    //FOR SINGLE SELECTION
    // this.courseService.getAllQualificationCourse(Data).subscribe((response: any[]) => {                  
    //   if(response.length != 0){
    //     this.CourseList = response;
    //   }
    //   else{
    //     this.CourseList = [];
    //   }      
    // }, error => {      
    //   this.notiService.showError("Something went wrong.. Try again later..", "")
    //   console.log(error);      
    // })
  }

  onChangeCourse(CourseID: any) {
    var courseId = CourseID.join(',');
    var qualificationId = this.SelectedQualification.join(',');
    this.StreamList = [];

    if (courseId != "") {
      var splitCourse = courseId.split(",");
      var splitQualification = qualificationId.split(",");
      for (var i = 0; i < splitQualification.length; i++) {
        for (var j = 0; j < splitCourse.length; j++) {
          this.getAllQualificationCourseStream(splitQualification[i], splitCourse[j]);
        }
      }
    }
    else {
      this.StreamList = [];
    }

    //FOR SINGLE SELECTION
    // let Data: any = {
    //   "QualificationId": this.SelectedQualification,
    //   "CourseId": CourseID
    // }

    // this.getAllQualificationCourseStream(Data);
  }

  getAllQualificationCourseStream(qualificationId, courseid) {
    this.searchStream.qualificationId = Number(qualificationId);
    this.searchStream.courseId = Number(courseid);
    this.streamService.getAllQualificationCourseStream(this.searchStream).subscribe((result) => {
      if (result) {
        //this.streams = result;
        for (var i = 0; i < result.length; i++) {
          this.StreamList.push({
            streamId: result[i].streamId,
            streamName: result[i].streamName,
            courseId: result[i].courseId,
            courseName: result[i].courseName,
            qualificationId: result[i].qualificationId,
            qualificationName: result[i].qualificationName,
            isActive: true
          })
        }
      }
      else {
        //this.streams = [];
      }
    }, error => {
      console.log(error);
    });

    //FOR SINGLE SELECTION OF COURSE
    // this.streamService.getAllQualificationCourseStream(Data).subscribe((response: any[]) => {                  
    //   if(response.length != 0){
    //     this.StreamList = response;
    //   }
    //   else{
    //     this.StreamList = [];
    //   }      
    // }, error => {      
    //   this.notiService.showError("Something went wrong.. Try again later..", "")
    //   console.log(error);      
    // })
  }

  getAllLanguage() {
    //this.saveForm.value.IsActive = true;
    //this.languageService.getAllLanguage(this.saveForm.value).subscribe((response: any) => {
    //  if (response.length != 0) {
    //    this.LanguageList = response;
    //  }
    //  else {
    //    this.LanguageList = [];
    //  }
    //}, error => {
    //  this.notiService.showError("Something went wrong.. Try again later..", "")
    //  console.log(error);
    //})
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

  addNew() {
    (document.getElementById("jd-template-list") as HTMLDivElement).style.display = 'none';
    (document.getElementById("btnAddNew") as HTMLDivElement).style.display = 'none';
    (document.getElementById("jd-template-form") as HTMLDivElement).style.display = 'block';
    // (document.getElementById("btnBack") as HTMLDivElement).style.display = 'block';
    this.showBackBtn = true;
    this.pageName = "New JD Template";
    this.createForm();
    this.tableOptionDropDown();
  }

  onClickCancel() {
    (document.getElementById("jd-template-list") as HTMLDivElement).style.display = 'block';
    (document.getElementById("btnAddNew") as HTMLDivElement).style.display = 'block';
    (document.getElementById("jd-template-form") as HTMLDivElement).style.display = 'none';
    (document.getElementById("btnBack") as HTMLDivElement).style.display = 'none';
    this.pageName = "JD Template";
    this.showBackBtn = false;
    this.createForm();
    this.tableOptionDropDown();
  }
  onClickSaveAsDraft(){
        const formData = new FormData();
        formData.append("JobDescriptionId", this.saveForm.value.JobDescriptionId);
        formData.append("JobDescriptionName", this.saveForm.value.JobDescriptionName.toString());
        formData.append("VerticalId", this.saveForm.value.VerticalId.toString());
        formData.append("LocationId", this.saveForm.get("LocationId").value.join(','));
        formData.append("FunctionId", this.saveForm.value.FunctionId.toString());
        formData.append("DepartmentId", this.saveForm.value.DepartmentId.toString());
        formData.append("PositionId", this.saveForm.value.PositionId.toString());
        formData.append("GradeId", this.saveForm.get("GradeId").value.join(','));
        formData.append("ReportsTo", this.saveForm.value.ReportsTo.toString());
        formData.append("NoOfReportees", this.saveForm.value.NoOfReportees.toString());
        formData.append("IndustryId", this.saveForm.get("IndustryId").value.join(','));
        formData.append("ExperienceId", this.saveForm.get("ExperienceId").value.join(','));
        formData.append("AgeId", this.saveForm.get("AgeId").value.join(','));
        formData.append("QualificationId", this.saveForm.get("QualificationId").value.join(','));
        formData.append("CourseId", this.saveForm.get("CourseId").value.join(','));
        formData.append("StreamId", this.saveForm.get("StreamId").value.join(','));
        formData.append("LanguageId", String(this.saveForm.value.LanguageId));
        formData.append("AnyOtherLanguage", this.saveForm.value.AnyOtherLanguage.toString());
        formData.append("JobPurpose", this.saveForm.value.JobPurpose.toString());
        formData.append("JobSummary", this.saveForm.value.JobSummary.toString());
        formData.append("KPIs", this.saveForm.value.KPIs.toString());
        formData.append("IsEnabled","true");
        formData.append("Knowledge", this.saveForm.value.Knowledge.toString());
        formData.append("RestrictedJD", this.saveForm.value.RestrictedJD.toString());
        formData.append("IsActive", this.saveForm.value.IsActive);
        formData.append("CreatedBy", this.saveForm.value.CreatedBy);
        if (this.saveForm.value.JobDescriptionId == 0) {
           formData.append("JDDocument", this.managementfileToUpload); 
        }
        else { 
          formData.append("JDDocument", this.saveForm.value.JDDocument); 
        }
        this.spinnerService.show();
        this.jobDescService.saveJobDescription(formData).subscribe((response: any) => {
          if (response.successFlag == 1) {
            this.notiService.showSuccess(response.msg, "Success");
            this.createForm();
            this.getAllJobDescription();
            (document.getElementById("jd-template-list") as HTMLDivElement).style.display = 'block';
            (document.getElementById("btnAddNew") as HTMLDivElement).style.display = 'block';
            (document.getElementById("jd-template-form") as HTMLDivElement).style.display = 'none';
            (document.getElementById("btnBack") as HTMLDivElement).style.display = 'none';
            this.pageName = "JD Template";
            this.showBackBtn = false;
            this.tableOptionDropDown();
          }
          else {
            this.notiService.showError(response.msg, "Error");
          }
        }, error => {
          this.notiService.showError("Something went wrong.. Try again later..", "")
          this.spinnerService.hide();
          console.log(error);
        }, () => {
          this.spinnerService.hide();
        })
    
  }

  onBackClick() {
    (document.getElementById("jd-template-list") as HTMLDivElement).style.display = 'block';
    (document.getElementById("btnAddNew") as HTMLDivElement).style.display = 'block';
    (document.getElementById("jd-template-form") as HTMLDivElement).style.display = 'none';
    (document.getElementById("btnBack") as HTMLDivElement).style.display = 'none';
    this.pageName = "JD Template";
    this.showBackBtn = false;
    this.createForm();
    this.tableOptionDropDown();
  }
}
