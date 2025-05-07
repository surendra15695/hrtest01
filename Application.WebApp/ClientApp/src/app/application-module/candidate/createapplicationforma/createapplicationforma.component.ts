import { Title } from '@angular/platform-browser';
import { RouterModule, Routes, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IState, IDropDown } from 'src/app/interfaces/common/common.interface';
import { IVendor, ISearchVendor } from '../../../interfaces/vendor/vendor.interface';
import { ILanguage, ISearchLanguage } from '../../../interfaces/common/language.interface';
import { ICandidateData, ISearchCandidateData } from '../../../interfaces/candidate/candidate.interface';
import { ICourse, ISearchCourse, IQualificationCourse, ISearchQualificationCourse } from '../../../interfaces/common/course.interface';
import { IQulificationUniversityBoard, ISearchQulificationUniversityBoard } from '../../../interfaces/common/university.interface';
import { IQualification, IQualificationType, ISearchQualification, ISearchQulificationClassGaradeDivision, IQulificationClassGaradeDivision } from '../../../interfaces/common/qualification.interface';
import { IReligion, ISearchReligion } from 'src/app/interfaces/common/religion.interface';
import { ICaste, ISearchCaste } from 'src/app/interfaces/common/caste.interface';
import { IBloodGroup, ISearchBloodGroup } from 'src/app/interfaces/common/bloodgroup.interface';
import {
  ICandidateProfile, ISearchCandidateProfile, ICandidateFamilyDetails, IMRFPreInterviewDetails,
  ICandidateMRFRelatives, ICandidateTyreRelatives, ICandidateAcademicDetails, ICandidateCertificationDetails,
  ICandidateMembershipDetails, ICandidateExtraCarricularActivitiesDetails, ICandidateLanguageKnownDetails,
  ICandidatePeviousAssignmentDetails
} from '../../../interfaces/candidate/candidateprofile.interface'
import { ICountry, ISearchCountry } from '../../../interfaces/common/country.interface';
import {
  ICandidateFamilyDetailsArray, ICandidateMRFRelativesArray, ICandidatePeviousAssignmentDetailsArray,
  ICandidateLanguageKnownDetailsArray, ICandidateExtraCarricularActivitiesDetailsArray, ICandidateMembershipDetailsArray,
  ICandidateCertificationDetailsArray, ICandidateAcademicDetailsArray, ICandidateTyreRelativesArray,
  IMRFPreInterviewArray
} from '../../../interfaces/candidate/candidateprofile.interface';
import { ISearchPosition, IPositionVerticalDetail } from '../../../interfaces/common/position.interface';
import { PositionService } from '../../../services/common/position/position.service';
import { CommonService } from '../../../services/common/common/common.service';
import { VendorService } from '../../../services/vendor/vendor/vendor.service';
import { CandidateService } from '../../../services/candidate/candidate/candidate.service';
import { CourseService } from '../../../services/common/course/course.service';
import { QualificationService } from '../../../services/common/qualification/qualification.service';
import { LanguageService } from '../../../services/common/language/language.service';
import { CommondataService } from '../../../services/common/commondata/commondata.service';
import { NgxSpinnerService } from "ngx-spinner";
import { PersistanceService } from '../../../sharedservices/persitence.service';
import { NotificationService } from '../../../sharedservices/notification.service';
import { SSL_OP_NO_TLSv1_1 } from 'constants';
import { Observable, Observer, ReplaySubject } from 'rxjs';
import { LocationService } from 'src/app/services/common/location/location.service';
declare var jQuery: any;
declare var html2pdf: any;

@Component({
  selector: 'app-createapplicationforma',
  templateUrl: './createapplicationforma.component.html',
  styleUrls: ['./createapplicationforma.component.css']
})
export class CreateapplicationformaComponent implements OnInit {
  @ViewChild('fDate', { static: false }) fDate: ElementRef;
  @ViewChild('inDate', { static: false }) inDate: ElementRef;
  @ViewChild('fMDate', { static: false }) fMDate: ElementRef;
  @ViewChild('fCDate', { static: false }) fCDate: ElementRef;
  @ViewChild('tCDate', { static: false }) tCDate: ElementRef;
  @ViewChild('faDate', { static: false }) faDate: ElementRef;
  @ViewChild('taDate', { static: false }) taDate: ElementRef;
  @ViewChild('fwDate', { static: false }) fwDate: ElementRef;
  @ViewChild('twDate', { static: false }) twDate: ElementRef;
  @ViewChild('signatureFileImport', { static: false }) signatureFileImport: ElementRef;
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  defaultimg: any;
  file: File;
  profilepic: File;
  signaturefileToUpload: File;
  states: IState[] = [];
  religions: IReligion[] = [];
  searchReligion: ISearchReligion = {
    religionId: 0,
    isActive: true
  }
  applicationFormData: any;
  searchPosition: ISearchPosition = {
    verticalId: null,
    positionId: null,
    isActive: true
  }
  positions: IPositionVerticalDetail[] = [];
  positionId: number;
  mrfPreInterviewStatus: boolean;
  preInterviewArray: IMRFPreInterviewDetails[] = [];

  preInterviewPositionReq: boolean = false;
  preInterviewDateReq: boolean = false;
  preInterviewDetails: IMRFPreInterviewDetails[];

  countries: ICountry[] = [];
  searchCountry: ISearchCountry = {
    countryId: null,
    isActive: true
  }
  vendors: IVendor[] = [];
  searchVendor: ISearchVendor = {
    vendorId: null,
    isActive: null
  }

  samePermanentAddress: boolean = false;

  castes: ICaste[] = [];
  searchCaste: ISearchCaste = {
    casteId: 0,
    isActive: true
  }
  searchCandidateData: ISearchCandidateData = {
    candidateId: null
  }
  bloodGroups: IBloodGroup[] = [];
  searchBloodGroud: ISearchBloodGroup = {
    bloodGroupId: 0,
    isActive: true
  }

  qualifications: IQualification[] = [];
  searchQualification: ISearchQualification = {
    qualificationId: null,
    isActive: null
  }

  searchQualificationGrade: ISearchQulificationClassGaradeDivision = {
    qulificationClassGaradeDivisionId: null,
    isActive: null
  }
  academicQualificationGrade: IQulificationClassGaradeDivision[] = [];

  academicUniversity: IQulificationUniversityBoard[];
  searchUniversity: ISearchQulificationUniversityBoard = {
    qulificationUniversityBoardId: null,
    isActive: null
  }

  qualificationType: IQualificationType[] = [];

  courses: IQualificationCourse[] = [];
  searchCourse: ISearchQualificationCourse = {
    qualificationId: null,
    courseId: null,
    isActive: true
  }

  languages: ILanguage[] = [];
  searchLanguages: ISearchLanguage = {
    languageId: null,
    isActive: null
  }
  languageId: number;
  languageRead: boolean = false;
  languageWrite: boolean = false;
  languageSpeak: boolean = false;

  candidateProfile: any;
  searchCandidateProfile: ISearchCandidateProfile = {
    candidateId: null,
    candidateProfileId: null,
    requisitionDetailId: null
  }
  familyBackGroundDetails: ICandidateFamilyDetails[] = [];
  isFamily: boolean = false;

  familyRelationshipId: number;
  familyName: string;
  familyEducationId: number;
  familyOccupationId: number;
  familyOrganization: string;

  familyRelations: IDropDown[] = [];
  familyEducations: IDropDown[] = [];
  // familyOccupations: IDropDown[] = [];

  familyRelationReq: boolean = false;
  familyNameReq: boolean = false;
  familyDOBReq: boolean = false;
  familyEducationReq: boolean = false;
  familyOccupationReq: boolean = false;

  isMRFRelative: boolean = false;
  courseRemarks: boolean = false;
  academicRemarks: string;
  mrfRelationShipDetails: ICandidateMRFRelatives[] = [];

  mrfRelativeName: string;
  mrfRelativeEmployeeId: string;
  mrfRelativeDesignation: string;
  mrfRelativeRelationshipId: number;

  relativeRelations: IDropDown[] = [];

  mrfRelationReq: boolean = false;
  mrfNameReq: boolean = false;
  mrfEmpIdReq: boolean = false;
  mrfDesignationReq: boolean = false;

  isTyreRelative: boolean = false;
  tyreCompanyRelationShipDetails: ICandidateTyreRelatives[] = [];

  tyreRelativeName: string;
  tyreRelativeDesignation: string;
  tyreRelativeCompanyName: string;
  tyreRelativeRelationshipId: number;

  tyreNameReq: boolean = false;
  tyreDesignationReq: boolean = false;
  tyreRelativeCompanyReq: boolean = false;
  tyreRelationReq: boolean = false;


  isCertification: boolean = false;
  certificationDetails: ICandidateCertificationDetails[] = [];

  certificationOrganisation: string;
  certificationNatureofTraining: string;
  certificationDurationFrom: string;
  certificationDurationTo: string;

  certificationOrganisationReq: boolean = false;
  certificationNatureofTrainingReq: boolean = false;
  certificationDurationFromReq: boolean = false;
  certificationDurationToReq: boolean = false;

  membershipInstitution: string;
  membershipClass: string;
  membershipFrom: string;

  membershipInstitutionReq: boolean = false;
  membershipClassReq: boolean = false;
  membershipFromReq: boolean = false;

  membershipDetails: ICandidateMembershipDetails[];

  isActivity: boolean = false;
  extraCarricularActivitiesDetails: ICandidateExtraCarricularActivitiesDetails[] = [];

  natureofActivities: string;
  levelofAchivement: string;

  natureofActivitiesReq: boolean = false;
  levelofAchivementReq: boolean = false;

  academicDetails: ICandidateAcademicDetails[];

  academicMonths: IDropDown[] = [];
  academicYears: IDropDown[] = [];


  academicQualificationId: number;
  academicCourseId: number;
  academicMonthId: number;
  academicYearId: number;
  academicUniversityId: number;
  otherUniversityName: string;
  academicGradeId: number;
  academicPercentage: number;
  academicSubject: string;
  academicAddress: string;
  academicInstitution: string;
  academicStream: string;
  academicQualificationTypeId: number;
  mothertongueIdReq: boolean = false;

  academicQualificationIdReq: boolean = false;
  academicCourseIdReq: boolean = false;
  academicMonthIdReq: boolean = false;
  academicYearIdReq: boolean = false;
  academicUniversityIdReq: boolean = false;
  academicOtherUniversityNameReq: boolean = false;
  academicGradeIdReq: boolean = false;
  academicPercentageReq: boolean = false;
  academicSubjectReq: boolean = false;
  academicAddressReq: boolean = false;
  academicInstitutionReq: boolean = false;
  academicStreamReq: boolean = false;
  academicQualificationTypeIdReq: boolean = false;
  academicFromDateReq: boolean = false;
  academicToDateReq: boolean = false;
  showref2Name: boolean = false;
  showref2Positiona: boolean = false;
  showref3Name: boolean = false;
  mothertongueId: number;
  motherread: boolean = false;
  motherwrite: boolean = false;
  motherspeak: boolean = false;
  knownLanguageId: number;
  knownLanguageIdReq: boolean = false;
  languageKnownDetails: ICandidateLanguageKnownDetails[];

  arr: any = [];
  peviousAssignmentDetails: ICandidatePeviousAssignmentDetails[];

  workOrganization: string;
  workAddress: string;
  workPosition: string;
  workNature: string;
  workCTC: number;

  workFromDateReq: boolean = false;
  workToDateReq: boolean = false;
  workOrganizationReq: boolean = false;
  workAddressReq: boolean = false;
  workPositionReq: boolean = false;
  workNatureReq: boolean = false;
  workCTCReq: boolean = false;

  jobPortal: boolean = false;
  linkedIn: boolean = false;
  careerSite: boolean = false;
  paperAdvertisement: boolean = false;
  employeeReferral: boolean = false;
  consultantApplicable: boolean = false;
  consultant: number;
  otherSource: string;
  refNameofEmployee: string;

  criminalCase: boolean = false;
  previousEmployemntEnquiry: boolean = false;

  isExperinced: boolean = true;
  section1: boolean = true;
  section2: boolean = false;
  section3: boolean = false;
  section4: boolean = false;
  section5: boolean = false;
  section6: boolean = false;
  section7: boolean = false;
  section8: boolean = false;
  photoReq: boolean = false;
  identificationMarks2Req: boolean = false;
  identificationMarks1Req: boolean = false;
  eyeSightLeftReq: boolean = false;
  eyeSightRightReq: boolean = false;
  bloodGroupIdReq: boolean = false;
  eyeSightCorrected: boolean = false;
  weightReq: boolean = false;
  heightReq: boolean = false;
  casteIdReq: boolean = false;
  religionIdReq: boolean = false;
  nationalityIdReq: boolean = false;
  panNoReq: boolean = false;
  permanentNativeStateIdReq: boolean = false;
  permanentHomeTownReq: boolean = false;
  permanentPhoneReq: boolean = false;
  permanentPinReq: boolean = false;
  permanentCountryIdReq: boolean = false;
  permanentStateIdReq: boolean = false;
  permanentAddressReq: boolean = false;
  communicationAlternateContactNoReq: boolean = false;
  communicationPhoneNoReq: boolean = false;
  communicationPinReq: boolean = false;
  communicationAddressReq: boolean = false;
  additionoalDetailsReq: boolean = false;
  joiningCommentsReq: boolean = false;
  previousEmployemntEnquiryDetailsReq: boolean = false;
  criminalCaseDetailsReq: boolean = false;
  consultantApplicableOthers: boolean = false;
  consultantReq: boolean = false;
  showref1Name: boolean = false;
  showref1Position: boolean = false;
  showref1Organisation: boolean = false;
  showref1Location: boolean = false;
  showref1ContactNo: boolean = false;
  showref2Position: boolean = false;
  showref2Organisation: boolean = false;
  showref2Location: boolean = false;
  showref2ContactNo: boolean = false;
  showref3Position: boolean = false;
  showref3Organisation: boolean = false;
  showref3Location: boolean = false;
  showref3ContactNo: boolean = false;

  academicBorederClass = "border-box";

  workBorederClass = "border-box";

  languageBorderClass = "table table-bordered";

  candidateFamilyArray: ICandidateFamilyDetailsArray[] = [];
  candidateMRFRelativesArray: ICandidateMRFRelativesArray[] = [];
  candidatePeviousAssignmentDetailsArray: ICandidatePeviousAssignmentDetailsArray[];
  candidateLanguageKnownDetailsArray: ICandidateLanguageKnownDetailsArray[] = [];
  candidateExtraCarricularActivitiesDetailsArray: ICandidateExtraCarricularActivitiesDetailsArray[] = [];
  candidateMembershipDetailsArray: ICandidateMembershipDetailsArray[] = [];
  candidateCertificationDetailsArray: ICandidateCertificationDetailsArray[] = [];
  candidateAcademicDetailsArray: ICandidateAcademicDetailsArray[] = [];
  candidateTyreRelativesArray: ICandidateTyreRelativesArray[] = [];
  candidateMRFPreInterviewArray: IMRFPreInterviewArray[] = [];

  candidateId: number;
  internalRef: boolean = false;
  handicapReq: boolean = false;
  cronicIllnessReq: boolean = false;
  signatreData: any;
  ddlSelectedEyesightCorrected: number = 0;
  ddlSelectedHandicap: number;
  ddlSelectedCronicIllness: number;
  profilepictureData: any;
  // Added By anifur on 23-06-2022
  searchOccupation = {
    OccupationId: null,
    IsActive: true,
  }
  familyOccupations: any[] = [];
  mrfRealtivesValue: any;
  tyreCompanyRealtionShipValue: any;
  criminalCaseValue: any;
  previousEmployemntEnquiryValue: any;
  mrfPreInterviewStatusValue: any;
  mrfRelativesChange: boolean = false;
  tyreCompaniesRelativeChange: boolean = false;
  everInterviewMRFChange: boolean = false;
  criminalCaseChange: boolean = false;
  employmentEnquery: boolean = false;
  motherarr: any[] = []
  showUploadedSignature: boolean = false;
  serachRelationShip = {
    RelationshipName: "",
    RelationshipId: null,
    IsActive: true,
    CreatedBy: null
  }
  constructor(
    private commonService: CommonService,
    private SpinnerService: NgxSpinnerService,
    private notificationService: NotificationService,
    private courseService: CourseService,
    private qualificationService: QualificationService,
    private languageService: LanguageService,
    private candidateService: CandidateService,
    private vendorService: VendorService,
    private persistance: PersistanceService,
    private commonDataService: CommondataService,
    private positionService: PositionService,
    private _route: Router,
    private locationService: LocationService,

  ) {
    this.candidateId = this.persistance.get('loggedinuser').candidateId;
  }

  ngOnInit() {
    this.SpinnerService.show();
    //his.defaultimg = "assets/images/user.jpg";
    this.familyBackGroundDetails = [];
    this.mrfRelationShipDetails = [];
    this.tyreCompanyRelationShipDetails = [];
    this.academicDetails = [];
    this.certificationDetails = [];
    this.membershipDetails = [];
    this.extraCarricularActivitiesDetails = [];
    this.languageKnownDetails = [];
    this.peviousAssignmentDetails = [];
    this.preInterviewDetails = [];
    this.isExperinced = true
    this.getAllCountry();
    this.getAllVendor();
    this.loadDatePicker();
    this.loadMonthYearPicker();
    this.getAllState();
    this.getAllPosition();
    this.getAllBloodGroup();
    this.getAllCaste();
    this.getAllReligion();
    this.getAllFamilyEducations();
    this.getAllFamilyRelations();
    this.getAllFamilyOccupations();
    this.getAllRelativeRelations();
    this.getAllQualificationActive();
    this.getAllUniversity();
    this.getAllQualificationGrades();
    this.getAllYears();
    this.getAllMonths();
    this.getAllLanguages();
    this.getCandidateProfile();
    this.getCandidate();
  }

  openFileUpload() {
    jQuery(".file-upload").click();
  }

  onFileChanged(event) {
    this.profilepic = null;
    const files = event.target.files;
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.notificationService.showError("Only images are supported", "Error");
      return;
    }
    if (files[0].size > 2097152) {
      this.notificationService.showError("Image should be less than 2MB!", "Error");
      return
    }
    const reader = new FileReader();
    this.profilepic = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.defaultimg = reader.result;
      this.applicationFormData.candiadatePhoto = reader.result;
      this.profilepictureData = reader.result;
      //this.applicationFormData.candiadatePhoto = reader.result; 
    }
  }

  loadDatePicker() {
    var today = new Date();
    var dothis = this;
    jQuery(".datepicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      // endDate: today,
      todayHighlight: true
    }).on("change", function (e) {
      //var selecteddate = e.target.value;
    });

  }

  loadMonthYearPicker() {
    var today = new Date();
    var dothis = this;
    jQuery(".monthpicker").parent(".input-group").datepicker({
      autoclose: true,
      format: "dd/mm/yyyy",
      endDate: today,
      todayHighlight: true
    }).on("change", function (e) {
      //var selecteddate = e.target.value;
    });

  }

  getAllMonths() {
    this.academicMonths = [];
    this.academicMonths.push({ name: "Jan", id: 1 });
    this.academicMonths.push({ name: "Feb", id: 2 });
    this.academicMonths.push({ name: "Mar", id: 3 });
    this.academicMonths.push({ name: "Apr", id: 4 });
    this.academicMonths.push({ name: "May", id: 5 });
    this.academicMonths.push({ name: "Jun", id: 6 });
    this.academicMonths.push({ name: "Jul", id: 7 });
    this.academicMonths.push({ name: "Aug", id: 8 });
    this.academicMonths.push({ name: "Sep", id: 9 });
    this.academicMonths.push({ name: "Oct", id: 10 });
    this.academicMonths.push({ name: "Nov", id: 11 });
    this.academicMonths.push({ name: "Dec", id: 12 });
  }

  getAllYears() {
    this.academicYears = [];
    var currentyear = (new Date().getFullYear() + 1);
    for (var i = currentyear; i > currentyear - 40; i--) {
      this.academicYears.push({ id: parseInt(i.toString()), name: i.toString() });
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
    });
  }

  getAllCountry() {
    this.countries = [];
    this.commonDataService.getAllCountry(this.searchCountry).subscribe((result) => {
      if (result) {
        this.countries = result;
      }
      else {
        this.countries = [];
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
        this.academicUniversity.splice(0, 0, {
          qulificationUniversityBoardId: 0,
          qulificationUniversityBoardName: "Others",
          isActive: true
        })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllQualificationGrades() {
    this.academicQualificationGrade = [];
    this.commonService.getAllQualificationClassGradeDivision(this.searchQualificationGrade).subscribe((result) => {
      if (result) {
        this.academicQualificationGrade = result;
      }
      else {
        this.academicQualificationGrade = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllQualificationActive() {
    this.qualifications = [];
    this.courses = [];
    this.qualificationService.getAllQualificationActive(this.searchQualification).subscribe((result) => {
      if (result) {
        this.qualifications = result;

      }
      else {
        this.qualifications = [];
      }
    }, error => {
      console.log(error);
    }, () => {
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
    this.academicQualificationId = evt;
    this.getAllCourse();
  }
  //Course
  getAllCourse() {
    this.academicCourseId = undefined;
    this.courses = [];
    this.searchCourse.qualificationId = this.academicQualificationId;
    this.courseService.getAllQualificationCourse(this.searchCourse).subscribe((result) => {
      if (result) {
        this.courses = result;
      }
      else {
        this.courses = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  changeCourse(evt) {
    this.academicCourseId = evt;
    if (this.academicCourseId == 20) {
      this.courseRemarks = true;
    }
    else {
      this.courseRemarks = false;
    }
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

  getAllFamilyRelations() {
    this.familyRelations = [];
    var relationResult = [];
    // this.familyRelations.push({ name: "Father", id: 1 });
    // this.familyRelations.push({ name: "Mother", id: 2 });
    // this.familyRelations.push({ name: "Sibling(s)", id: 3 });
    // this.familyRelations.push({ name: "Spouse", id: 4 });
    // this.familyRelations.push({ name: "Children", id: 5 });
    // this.familyRelations.push({ name: "Others", id: 21 });
    this.commonService.getAllFamilyRelationship(this.serachRelationShip).subscribe((response: any) => {
      if (response) {
        relationResult = response;
        relationResult.forEach(element => {
          this.familyRelations.push({ name: element.relationshipName, id: element.relationshipId });
        })
      }
      else {
        //this.familyRelations = [];
      }
    }, error => {
      this.notificationService.showError("Something went wrong.. Try again later..", "")
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    })
  }

  getAllFamilyEducations() {
    this.familyEducations = [];
    this.familyEducations.push({ name: "Matriculation", id: 1 });
    this.familyEducations.push({ name: "Higher Secondary", id: 2 });
    this.familyEducations.push({ name: "Degree", id: 3 });
    this.familyEducations.push({ name: "Post Graduation", id: 4 });
    this.familyEducations.push({ name: "Doctorate", id: 5 });
  }

  getAllFamilyOccupations() {
    this.familyOccupations = [];
    // this.familyOccupations.push({ name: "Business", id: 1 });
    // this.familyOccupations.push({ name: "Govt. Employee", id: 2 });
    // this.familyOccupations.push({ name: "Private Sector", id: 3 });
    // this.familyOccupations.push({ name: "Housewife", id: 4 });
    // this.familyOccupations.push({ name: "Retired", id: 5 });
    this.commonService.getAllOccupation(this.searchOccupation).subscribe((result) => {
      if (result) {
        this.familyOccupations = result;
        // this.occupationList.splice(0, 0, {
        //    OccupationId :0,
        //  OccupationName :"All",
        //  IsActive :true,
        // })
      }
      else {
        this.familyOccupations = [];
        //   this.occupationList.splice(0, 0, {
        //     OccupationId :0,
        //   OccupationName :"All",
        //   IsActive :true,
        //  })
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllRelativeRelations() {
    //this.relativeRelations = [];
    // this.relativeRelations.push({ name: "Spouse", id: 2 });
    // this.relativeRelations.push({ name: "Parent", id: 3 });
    // this.relativeRelations.push({ name: "Child", id: 4 });
    // this.relativeRelations.push({ name: "Grand Parent", id: 8 });
    // this.relativeRelations.push({ name: "Grand Child", id: 9 });
    // this.relativeRelations.push({ name: "Brother", id: 10 });
    // this.relativeRelations.push({ name: "Sister", id: 11 });
    // this.relativeRelations.push({ name: "First Aunt", id: 12 });
    // this.relativeRelations.push({ name: "First Uncle", id: 13 });
    // this.relativeRelations.push({ name: "Niece", id: 14 });
    // this.relativeRelations.push({ name: "Nephew", id: 15 });
    // this.relativeRelations.push({ name: "First Cousin", id: 16 });
    // this.relativeRelations.push({ name: "Mother-In-Law", id: 17 });
    // this.relativeRelations.push({ name: "Father-In-Law", id: 18 });
    // this.relativeRelations.push({ name: "Son-In-Law", id: 19 });
    // this.relativeRelations.push({ name: "Daughter-In-Law", id: 20 });
    // this.relativeRelations.push({ name: "Others", id: 21 });
    this.SpinnerService.show();
    this.relativeRelations = [];
    let data = {
      IsActive: true
    }
    this.positionService.GetFamilyRelation(data).subscribe((result: IDropDown[]) => {
      if (result) {
        this.relativeRelations = result;
      }
      else {
        this.relativeRelations = [];
      }
      this.SpinnerService.hide();
    })
  }

  getAllPosition() {
    this.positions = [];
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
    });
  }

  getAllBloodGroup() {
    this.bloodGroups = [];
    this.commonService.getAllBloodGroup(this.searchBloodGroud).subscribe((result) => {
      if (result) {
        this.bloodGroups = result;
      }
      else {
        this.bloodGroups = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllReligion() {
    this.religions = [];
    this.commonService.getAllReligion(this.searchReligion).subscribe((result) => {
      if (result) {
        this.religions = result;
      }
      else {
        this.religions = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllCaste() {
    this.castes = [];
    this.commonService.getAllCaste(this.searchCaste).subscribe((result) => {
      if (result) {
        this.castes = result;
      }
      else {
        this.castes = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }

  getAllVendor() {
    this.vendors = [];
    this.searchVendor.isActive = true;
    this.searchVendor.vendorId = 0;
    this.vendorService.getAllVendor(this.searchVendor).subscribe((result) => {
      if (result) {
        this.vendors = result;
        this.vendors.push({
          vendorId: 0,
          vendorName: "Others",
          isActive: true,
          alternateContactNo: "",
          alternateEmailId: "",
          city: "",
          contactNo: "",
          emailId: "",
          stateId: 0,
          statename: "",
          street: "",
          termsOfService: "",
          website: "",
          zipCode: ""
        })
      }
      else {
        this.vendors = [];
      }
    }, error => {
      console.log(error);
    }, () => {
    });
  }
  getCandidate() {
    this.searchCandidateData.candidateId = this.candidateId;
    this.candidateService.getCandidateData(this.searchCandidateData).subscribe((result) => {
      if (result) {
        if (Number(result.experienceMonth) == 0 && Number(result.experienceYear) == 0)
          this.isExperinced = false;
      }
    })
  }
  getCandidateProfile() {
    this.candidateProfile = null;
    this.motherarr=[];
    this.searchCandidateProfile.candidateId = this.candidateId;
    this.candidateService.getCandidateProfileApplication(this.searchCandidateProfile).subscribe((result) => {
      if (result) {
        //console.log("hmm",result);
        this.candidateProfile = result;
        this.applicationFormData = this.candidateProfile
        if (this.candidateProfile != undefined && this.candidateProfile.candidateProfileId != 0) {
          this.mrfRealtivesValue = this.candidateProfile.mrfRealtives == null ? null : (this.candidateProfile.mrfRealtives == "False" || this.candidateProfile.mrfRealtives == "0") ? 0 : 1;;
          this.tyreCompanyRealtionShipValue = this.candidateProfile.tyreCompanyRealtionShip == null ? null : (this.candidateProfile.tyreCompanyRealtionShip == "False" || this.candidateProfile.tyreCompanyRealtionShip == "0") ? 0 : 1;
          this.criminalCaseValue = this.candidateProfile.criminalCase == null ? null : (this.candidateProfile.criminalCase == "False" || this.candidateProfile.criminalCase == "0") ? 0 : 1;
          this.previousEmployemntEnquiryValue = this.candidateProfile.previousEmployemntEnquiry == null ? null : (this.candidateProfile.previousEmployemntEnquiry == "False" || this.candidateProfile.previousEmployemntEnquiry == "0") ? 0 : 1;
          this.mrfPreInterviewStatusValue = this.candidateProfile.preInterViewMRF == null ? null : (this.candidateProfile.preInterViewMRF == "False" || this.candidateProfile.preInterViewMRF == "0") ? 0 : 1;

          if (this.candidateProfile.preInterViewMRF == "False" || this.candidateProfile.preInterViewMRF == "0" || this.candidateProfile.preInterViewMRF == null) {
            this.mrfPreInterviewStatus = false;
          }
          else {
            this.mrfPreInterviewStatus = true;
          }

          // MRF Relatives
          if (this.mrfRealtivesValue == 1) {
            this.mrfRelativesChange = true;
            this.candidateProfile.mrfRealtives = true;
          } else if (this.mrfRealtivesValue == 0) {
            this.mrfRelativesChange = true;
            this.candidateProfile.mrfRealtives = false;
          } else {
            this.mrfRelativesChange = false;
          }
          // Tyre company relative
          if (this.tyreCompanyRealtionShipValue == 1) {
            this.tyreCompaniesRelativeChange = true;
            this.candidateProfile.tyreCompanyRealtionShip = true;
          } else if (this.tyreCompanyRealtionShipValue == 0) {
            this.tyreCompaniesRelativeChange = true;
            this.candidateProfile.tyreCompanyRealtionShip = false;
          } else {
            this.tyreCompaniesRelativeChange = false;
          }
          // prev interview
          if (this.mrfPreInterviewStatusValue == 1) {
            this.everInterviewMRFChange = true;
            this.mrfPreInterviewStatus = true;
          } else if (this.mrfPreInterviewStatusValue == 0) {
            this.everInterviewMRFChange = true;
            this.mrfPreInterviewStatus = false;
          } else {
            this.everInterviewMRFChange = false;
          }
          // Criminal case
          if (this.criminalCaseValue == 1) {
            this.criminalCaseChange = true;
            this.candidateProfile.criminalCase = true;
          } else if (this.criminalCaseValue == 0) {
            this.criminalCaseChange = true;
            this.candidateProfile.criminalCase = false;
          } else {
            this.criminalCaseChange = false;
          }
          // Enquery
          if (this.previousEmployemntEnquiryValue == 1) {
            this.employmentEnquery = true;
            this.candidateProfile.previousEmployemntEnquiry = true;
          } else if (this.previousEmployemntEnquiryValue == 1) {
            this.employmentEnquery = true;
            this.candidateProfile.previousEmployemntEnquiry = false;
          } else {
            this.employmentEnquery = false;
          }
        }
        if (this.candidateProfile.signature != "") {
          this.showUploadedSignature = true;
        }
        if (this.candidateProfile.permanentCountryId == 0) {
          this.candidateProfile.permanentCountryId = undefined;
        }
        // if (this.candidateProfile.preInterViewMRF == true) {
        //   this.mrfPreInterviewStatus = true;
        // }
        // else {
        //   this.mrfPreInterviewStatus = false;
        // }
        // Added mother tongue
        if (this.candidateProfile.languageKnownDetails.length > 0) {
          var motherTongueObj = this.candidateProfile.languageKnownDetails[0];
          this.motherarr.push(motherTongueObj)
        }
        this.preInterviewDetails = this.candidateProfile.mrfPreInterviewDetails;
        this.familyBackGroundDetails = this.candidateProfile.familyBackGroundDetails;
        // console.log("Family details", this.familyBackGroundDetails);

        if (this.familyBackGroundDetails.length > 0) {
          this.isFamily = true;
        }
        else {
          this.isFamily = false;
        }
        this.mrfRelationShipDetails = this.candidateProfile.mrfRelationShipDetails;
        if (this.mrfRelationShipDetails.length > 0) {
          this.isMRFRelative = true;
        }
        else {
          this.isMRFRelative = false;
        }
        this.tyreCompanyRelationShipDetails = this.candidateProfile.tyreCompanyRelationShipDetails;
        if (this.tyreCompanyRelationShipDetails.length > 0) {
          this.isTyreRelative = true;
        }
        else {
          this.isTyreRelative = false;
        }
        if (this.candidateProfile.permanentNativeStateId == 0) {
          this.candidateProfile.permanentNativeStateId = undefined;
        }
        if (this.candidateProfile.nationalityId == 0) {
          this.candidateProfile.nationalityId = undefined;
        }
        if (this.candidateProfile.permanentStateId == 0) {
          this.candidateProfile.permanentStateId = undefined;
        }
        if (this.candidateProfile.religionId == 0) {
          this.candidateProfile.religionId = undefined;
        }
        if (this.candidateProfile.casteId == 0) {
          this.candidateProfile.casteId = undefined;
        }
        if (this.candidateProfile.bloodGroupId == 0) {
          this.candidateProfile.bloodGroupId = undefined;
        }
        this.jobPortal = this.candidateProfile.jobPortal;
        this.linkedIn = this.candidateProfile.linkedIn;
        this.careerSite = this.candidateProfile.careerSite;
        this.paperAdvertisement = this.candidateProfile.paperAdvertisement;
        this.employeeReferral = this.candidateProfile.employeeReferal;
        this.consultantApplicable = this.candidateProfile.consultantApplicable;
        this.internalRef = this.candidateProfile.isInternalRef;
        this.candidateProfile.internalRefName =this.candidateProfile.internalRefName;
        this.academicDetails = this.candidateProfile.academicDetails;
        // Added Based on Requirement
        this.academicDetails.forEach(element => {
          if (element.university == 0) {
            element.universityName = element.otherUniversityName;
          }
        })
        // till this
        this.certificationDetails = this.candidateProfile.certificationDetails;
        this.membershipDetails = this.candidateProfile.membershipDetails;
        this.extraCarricularActivitiesDetails = this.candidateProfile.extraCarricularActivitiesDetails;
        this.languageKnownDetails = this.candidateProfile.languageKnownDetails;
        this.peviousAssignmentDetails = this.candidateProfile.peviousAssignmentDetails;
        if (this.candidateProfile.candiadatePhoto == "") {
          this.defaultimg = "assets/images/user.jpg";
        }
        else {
          this.openFileforphoto(this.candidateProfile.candiadatePhoto);
          //this.defaultimg = this.candidateProfile.candiadatePhoto;
          
          //console.log("find",this.defaultimg)
        }
        if (this.candidateProfile.reasonforGap == "0") {
          this.candidateProfile.reasonforGap = "";
        }
        if (this.candidateProfile.previousAssignmentGap == "0") {
          this.candidateProfile.previousAssignmentGap = "";
        }
        if (this.candidateProfile.isEnabled == false) {
          this.persistance.set('candidateId', this.candidateProfile.candidateId);
          this.persistance.set('pagename', "candidateapplicationform");
          this.persistance.set('paramId', this.candidateProfile.requisitionDetailId);
          this._route.navigate(['/app/candidate-application/view']);
        }
        if (this.candidateProfile.eyeSightCorrected) {
          this.ddlSelectedEyesightCorrected = 1;
        } else {
          if (this.candidateProfile.candidateProfileId == 0) {
            this.ddlSelectedEyesightCorrected = null;
          } else {
            this.ddlSelectedEyesightCorrected = 2;
          }
        }
        if (this.candidateProfile.candidateProfileId == 0) {
          this.ddlSelectedHandicap = null;
        } else {
          this.ddlSelectedHandicap = 2;
          this.candidateProfile.handiCap == true ? this.ddlSelectedHandicap = 1 : this.ddlSelectedHandicap = 2;
          if (this.candidateProfile.handiCap == false) {
            this.candidateProfile.handiCapDetails = "";
          }
        }
        if (this.candidateProfile.candidateProfileId == 0) {
          this.ddlSelectedCronicIllness = null;
        } else {
          this.ddlSelectedCronicIllness = 2;
          this.candidateProfile.cronicMajorIllness == true ? this.ddlSelectedCronicIllness = 1 : this.ddlSelectedCronicIllness = 2;
          if (this.candidateProfile.cronicMajorIllness == false) {
            this.candidateProfile.cronicMajorIllnessDetails = "";
          }
        }

        //added later
        if (this.candidateProfile.candidateProfileId > 0) {
          var relativeStatus = this.candidateProfile.mrfRealtives == true ? 1 : 0;
          var tyreCompanyRealtionShip = this.candidateProfile.tyreCompanyRealtionShip == true ? 1 : 0;
          this.changeMRFRelativeStatus(relativeStatus);
          this.changeTyreRelativeStatus(tyreCompanyRealtionShip);

        }
        if (this.candidateProfile.candidateProfileId > 0) {
          this.candidateProfile.criminalCase == true ? this.criminalCaseValue = 1 : this.criminalCaseValue = 0;
          this.candidateProfile.criminalCase == true ? this.criminalCase = true : this.criminalCase = false;
          this.changeCriminalCase(this.criminalCaseValue);

        }

        if (this.candidateProfile.candidateProfileId > 0) {
          this.candidateProfile.previousEmployemntEnquiry == true ? this.previousEmployemntEnquiryValue = 1 : this.previousEmployemntEnquiryValue = 0;
          this.candidateProfile.previousEmployemntEnquiry == true ? this.previousEmployemntEnquiry = true : this.previousEmployemntEnquiry = false;
          this.changePreviousEmploymentEnquiry(this.previousEmployemntEnquiryValue);

        }
        if (this.candidateProfile.consultantApplicable == true) {
          this.consultant = this.candidateProfile.consultant;
        }

      }
      else {
      }
    }, error => {
      console.log(error);
    }, () => {
      this.SpinnerService.hide();
    });
  }
  removePreInterview(index) {
    this.preInterviewDetails.splice(index, 1);
  }

  addPreInterview() {
    var flag = 0;
    if (this.positionId == undefined) {
      this.preInterviewPositionReq = true;
      flag = 1;
    }
    else {
      this.preInterviewPositionReq = false;
    }
    if (this.inDate.nativeElement.value == undefined || this.inDate.nativeElement.value == "") {
      flag = 1;
      this.preInterviewDateReq = true;
    }
    else {
      this.preInterviewDateReq = false;
    }
    if (flag == 0) {
      this.preInterviewDetails.push({
        candidateProfileId: 0,
        mrfPreInterviewLineId: this.preInterviewDetails.length + 1,
        position: this.positionId,
        positionName: this.positions.filter(x => x.positionId == this.positionId)[0].positionName,
        interviewDate: this.inDate.nativeElement.value
      })
      this.positionId = undefined;
      this.inDate.nativeElement.value = "";
    }
  }
  addFamily() {
    var flag = 0;

    if (this.familyRelationshipId == undefined) {
      this.familyRelationReq = true;
      flag = 1;
    }
    else {
      this.familyRelationReq = false;
    }
    if (this.familyName == undefined || this.familyName == "") {
      this.familyNameReq = true;
      flag = 1;
    }
    else {
      this.familyNameReq = false;
    }
    if (this.fDate.nativeElement.value == undefined || this.fDate.nativeElement.value == "") {
      this.familyDOBReq = true;
      flag = 1;
    }
    else {
      this.familyDOBReq = false;
    }
    if (this.familyEducationId == undefined) {
      this.familyEducationReq = true;
      flag = 1;
    }
    else {
      this.familyEducationReq = false;
    }
    if (this.familyOccupationId == undefined) {
      this.familyOccupationReq = true;
      flag = 1;
    }
    else {
      this.familyOccupationReq = false;
    }
    // if (this.arr.length != 0) {
    //   var count = this.arr.length
    //   for (let i = 0; i < this.arr.length; i++) {
    //     // In below line we left children and brother and sister which having id 5 and 7 and 8 so multiple children and brother and sister can be added
    //     if (this.arr[i].familyRelationShip == this.familyRelationshipId && this.familyRelationshipId != 5 && this.familyRelationshipId != 7 && this.familyRelationshipId != 8) {
    //       this.notificationService.showError("Relationship already exists", "Error");
    //       flag = 1;
    //     }
    //   }

    // }
    if (this.familyBackGroundDetails.length != 0) {
      var count = this.familyBackGroundDetails.length
      for (let i = 0; i < this.familyBackGroundDetails.length; i++) {
        // In below line we left children and brother and sister which having id 5 and 7 and 8 so multiple children and brother and sister can be added
        if (this.familyBackGroundDetails[i].familyRelationShip == this.familyRelationshipId && this.familyRelationshipId != 5 && this.familyRelationshipId != 7 && this.familyRelationshipId != 8) {
          this.notificationService.showError("Relationship already exists", "Error");
          flag = 1;
        }
      }

    }
    if (flag == 0) {
      this.familyBackGroundDetails.push({
        candidateProfileId: 0,
        familyBackgoundLineId: this.familyBackGroundDetails.length + 1,
        familyRelationShip: this.familyRelationshipId,
        familyRelationShipName: this.familyRelations.filter(x => x.id == this.familyRelationshipId)[0].name,
        familyName: this.familyName,
        familyDOB: this.fDate.nativeElement.value,
        education: this.familyEducationId,
        educationName: this.familyEducations.filter(x => x.id == this.familyEducationId)[0].name,
        occupation: this.familyOccupationId,
        occupationName: this.familyOccupations.filter(x => x.occupationId == this.familyOccupationId)[0].occupationName,
        familyOrganisation: this.familyOrganization,
      })
      this.familyRelationshipId = undefined;
      this.familyName = "";
      this.fDate.nativeElement.value = "";
      this.familyEducationId = undefined;
      this.familyOccupationId = undefined;
      this.familyOrganization = "";
      this.arr = this.familyBackGroundDetails;
    }

  }

  removeFamily(index) {
    this.familyBackGroundDetails.splice(index, 1);
  }

  addMRFRelative() {
    var flag = 0;
    if (this.mrfRelativeEmployeeId == undefined || this.mrfRelativeEmployeeId == "") {
      this.mrfEmpIdReq = true;
      flag = 1;
    }
    else {
      this.mrfEmpIdReq = false;
    }
    if (this.mrfRelativeName == undefined || this.mrfRelativeName == "") {
      this.mrfNameReq = true;
      flag = 1;
    }
    else {
      this.mrfNameReq = false;
    }
    if (this.mrfRelativeDesignation == undefined || this.mrfRelativeDesignation == "") {
      this.mrfDesignationReq = true;
      flag = 1;
    }
    else {
      this.mrfDesignationReq = false;
    }
    if (this.mrfRelativeRelationshipId == undefined) {
      this.mrfRelationReq = true;
      flag = 1;
    }
    else {
      this.mrfRelationReq = false;
    }
    if (flag == 0) {
      this.mrfRelationShipDetails.push({
        candidateProfileId: 0,
        mrfRelationShipLineId: this.mrfRelationShipDetails.length + 1,
        relativeName: this.mrfRelativeName,
        relativeRelationShip: this.mrfRelativeRelationshipId,
        relativeRelationShipName: this.relativeRelations.filter(x => x.id == this.mrfRelativeRelationshipId)[0].name,
        relativeDesignation: this.mrfRelativeDesignation,
        relativeEmployeeId: this.mrfRelativeEmployeeId
      })
      if (this.mrfRelationShipDetails.length > 0) {
        this.isMRFRelative = true;
      }
      else {
        this.isMRFRelative = false;
      }
      this.mrfRelativeName = "";
      this.mrfRelativeRelationshipId = undefined;
      this.mrfRelativeDesignation = "";
      this.mrfRelativeEmployeeId = "";
    }
  }

  changeMRFRelativeStatus(evt) {
    // this.candidateProfile.mrfRealtives = evt;
    // this.isMRFRelative = evt;
    this.mrfRelativesChange = true;
    if (evt == 1) {
      this.candidateProfile.mrfRealtives = true;
      this.isMRFRelative = true;
    } else {
      this.candidateProfile.mrfRealtives = false;
      this.isMRFRelative = false;
    }
  }

  removeMRFRelative(index) {
    this.mrfRelationShipDetails.splice(index, 1);
  }

  changeTyreRelativeStatus(evt) {
    //this.candidateProfile.tyreCompanyRealtionShip = evt;
    //this.isTyreRelative = evt;
    this.tyreCompaniesRelativeChange = true;
    if (evt == 1) {
      this.candidateProfile.tyreCompanyRealtionShip = true;
      this.isTyreRelative = true;
    } else {
      this.candidateProfile.tyreCompanyRealtionShip = false;
      this.isTyreRelative = false;
    }
  }

  removeTyreRelative(index) {
    this.tyreCompanyRelationShipDetails.splice(index, 1);
  }

  addTyreRelative() {
    var flag = 0;
    if (this.tyreRelativeCompanyName == undefined || this.tyreRelativeCompanyName == "") {
      this.tyreRelativeCompanyReq = true;
      flag = 1;
    }
    else {
      this.tyreRelativeCompanyReq = false;
    }
    if (this.tyreRelativeName == undefined || this.tyreRelativeName == "") {
      this.tyreNameReq = true;
      flag = 1;
    }
    else {
      this.tyreNameReq = false;
    }
    if (this.tyreRelativeDesignation == undefined || this.tyreRelativeDesignation == "") {
      this.tyreDesignationReq = true;
      flag = 1;
    }
    else {
      this.tyreDesignationReq = false;
    }
    if (this.tyreRelativeRelationshipId == undefined) {
      this.tyreRelationReq = true;
      flag = 1;
    }
    else {
      this.tyreRelationReq = false;
    }
    if (flag == 0) {
      this.tyreCompanyRelationShipDetails.push({
        candidateProfileId: 0,
        tyreCompanyRelationLineId: this.tyreCompanyRelationShipDetails.length + 1,
        tyreRelativeName: this.tyreRelativeName,
        tyreRelativeRelationShip: this.tyreRelativeRelationshipId,
        tyreRelativeRelationShipName: this.relativeRelations.filter(x => x.id == this.tyreRelativeRelationshipId)[0].name,
        tyreRelativeDesignation: this.tyreRelativeDesignation,
        tyreRelativeCompanyName: this.tyreRelativeCompanyName
      })
      if (this.tyreCompanyRelationShipDetails.length > 0) {
        this.isTyreRelative = true;
      }
      else {
        this.isTyreRelative = false;
      }
      this.tyreRelativeName = "";
      this.tyreRelativeRelationshipId = undefined;
      this.tyreRelativeDesignation = "";
      this.tyreRelativeCompanyName = "";

    }
  }

  removeActivity(index) {
    this.extraCarricularActivitiesDetails.splice(index, 1);
  }

  addActivity() {
    var flag = 0;
    if (this.natureofActivities == undefined || this.natureofActivities == "") {
      this.natureofActivitiesReq = true;
      flag = 1;
    }
    else {
      this.natureofActivitiesReq = false;
    }
    if (this.levelofAchivement == undefined || this.levelofAchivement == "") {
      this.levelofAchivementReq = true;
      flag = 1;
    }
    else {
      this.levelofAchivementReq = false;
    }
    if (flag == 0) {
      this.extraCarricularActivitiesDetails.push({
        candidateProfileId: 0,
        extraCarricularActivitiesLineId: this.extraCarricularActivitiesDetails.length + 1,
        natureofActivities: this.natureofActivities,
        levelofAchivement: this.levelofAchivement
      })
      this.natureofActivities = "";
      this.levelofAchivement = "";
    }
  }

  removeCertification(index) {
    this.certificationDetails.splice(index, 1);
  }

  addCertification() {
    var flag = 0;
    if (this.certificationOrganisation == undefined || this.certificationOrganisation == "") {
      this.certificationOrganisationReq = true;
      flag = 1;
    }
    else {
      this.certificationOrganisationReq = false;
    }
    if (this.certificationNatureofTraining == undefined || this.certificationNatureofTraining == "") {
      this.certificationNatureofTrainingReq = true;
      flag = 1;
    }
    else {
      this.certificationNatureofTrainingReq = false;
    }
    if (this.fCDate.nativeElement.value == undefined || this.fCDate.nativeElement.value == "") {
      this.certificationDurationFromReq = true;
      flag = 1;
    }
    else {
      this.certificationDurationFromReq = false;
    }
    if (this.tCDate.nativeElement.value == undefined || this.tCDate.nativeElement.value == "") {
      this.certificationDurationToReq = true;
      flag = 1;
    }
    else {
      this.certificationDurationToReq = false;
    }
    if (this.fCDate.nativeElement.value == this.tCDate.nativeElement.value) {
      this.notificationService.showError("To Date and From Date Cann't be same", "Error");
      flag = 1;
    }
    else {
      const [fcday, fcmonth, fcyear] = this.fCDate.nativeElement.value.split('/');
      const fcdate = new Date(fcyear, fcmonth - 1, fcday);
      const [tcday, tcmonth, tcyear] = this.tCDate.nativeElement.value.split('/');
      const tcdate = new Date(tcyear, tcmonth - 1, tcday);
      if (fcdate > tcdate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
      // if (from[2] <= to[2]) {
      //   if (from[1] <= to[1]) {
      //     if (from[0] < to[0]) {

      //     }
      //     else {
      //       this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
      //       flag = 1;
      //     }
      //   }
      //   else {
      //     this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
      //     flag = 1;
      //   }
      // }
      // else {
      //   this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
      //   flag = 1;
      // }
    }
    if (flag == 0) {
      this.certificationDetails.push({
        candidateProfileId: 0,
        certificationLineId: this.certificationDetails.length + 1,
        certificationOrganisation: this.certificationOrganisation,
        certificationNatureofTraining: this.certificationNatureofTraining,
        certificationDurationFrom: this.fCDate.nativeElement.value,
        certificationDurationTo: this.tCDate.nativeElement.value,
      })
      this.certificationOrganisation = "";
      this.certificationNatureofTraining = "";
      this.fCDate.nativeElement.value = "";
      this.tCDate.nativeElement.value = "";
    }
  }

  removeMembership(index) {
    this.membershipDetails.splice(index, 1);
  }

  addMembership() {
    var flag = 0;
    if (this.membershipInstitution == undefined || this.membershipInstitution == "") {
      this.membershipInstitutionReq = true;
      flag = 1;
    }
    else {
      this.membershipInstitutionReq = false;
    }
    if (this.membershipClass == undefined || this.membershipClass == "") {
      this.membershipClassReq = true;
      flag = 1;
    }
    else {
      this.membershipClassReq = false;
    }
    if (this.fMDate.nativeElement.value == undefined || this.fMDate.nativeElement.value == "") {
      this.membershipFromReq = true;
      flag = 1;
    }
    else {
      this.membershipFromReq = false;
    }
    if (flag == 0) {
      this.membershipDetails.push({
        candidateProfileId: 0,
        membershipLineId: this.membershipDetails.length + 1,
        institution: this.membershipInstitution,
        classofMemberShip: this.membershipClass,
        membershipFrom: this.fMDate.nativeElement.value
      })
      this.membershipInstitution = "";
      this.membershipClass = "";
      this.fMDate.nativeElement.value = "";
    }
  }

  addQualification() {
    var flag = 0;
    if (this.academicQualificationId == undefined) {
      this.academicQualificationIdReq = true;
      flag = 1;
    }
    else {
      this.academicQualificationIdReq = false;
    }
    if (this.academicCourseId == undefined) {
      this.academicCourseIdReq = true;
      flag = 1;
    }
    else {
      this.academicCourseIdReq = false;
    }
    if (this.academicStream == undefined || this.academicStream == "") {
      this.academicStreamReq = true;
      flag = 1;
    }
    else {
      this.academicStreamReq = false;
    }
    if (this.academicInstitution == undefined || this.academicInstitution == "") {
      this.academicInstitutionReq = true;
      flag = 1;
    }
    else {
      this.academicInstitutionReq = false;
    }
    if (this.academicAddress == undefined || this.academicAddress == "") {
      this.academicAddressReq = true;
      flag = 1;
    }
    else {
      this.academicAddressReq = false;
    }
    if (this.academicUniversityId == undefined) {
      this.academicUniversityIdReq = true;
      flag = 1;
    }
    else {
      this.academicUniversityIdReq = false;
    }
    if (this.academicUniversityId == 0) {
      if (this.otherUniversityName == undefined || this.otherUniversityName == "") {
        this.academicOtherUniversityNameReq = true;
        flag = 1;
      } else {
        this.academicOtherUniversityNameReq = false;
      }
    }

    if (this.faDate.nativeElement.value == "") {
      this.academicFromDateReq = true;
      flag = 1;
    }
    else {
      this.academicFromDateReq = false;
    }
    if (this.taDate.nativeElement.value == "") {
      this.academicToDateReq = true;
      flag = 1;
    }
    else {
      this.academicToDateReq = false;
    }
    if (this.faDate.nativeElement.value == this.taDate.nativeElement.value) {
      this.notificationService.showError("To Date and From Date Cann't be same", "Error");
      flag = 1;
    }
    else {
      const [faday, famonth, fayear] = this.faDate.nativeElement.value.split('/');
      const fadate = new Date(fayear, famonth - 1, faday);
      const [taday, tamonth, tayear] = this.taDate.nativeElement.value.split('/');
      const tadate = new Date(tayear, tamonth - 1, taday);
      if (fadate > tadate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }
    }

    // if (this.faDate.nativeElement.value > this.taDate.nativeElement.value) {
    //   this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
    //   flag = 1;
    // }
    // if (this.faDate.nativeElement.value == this.taDate.nativeElement.value) {
    //   this.notificationService.showError("To Date and From Date Cann't be same", "Error");
    //   flag = 1;
    // }
    if (this.academicQualificationTypeId == undefined) {
      this.academicQualificationTypeIdReq = true;
      flag = 1;
    }
    else {
      this.academicQualificationTypeIdReq = false;
    }
    if (this.academicSubject == undefined || this.academicSubject == "") {
      this.academicSubjectReq = true;
      flag = 1;
    }
    else {
      this.academicSubjectReq = false;
    }
    if (this.academicMonthId == undefined) {
      this.academicMonthIdReq = true;
      flag = 1;
    }
    else {
      this.academicMonthIdReq = false;
    }
    if (this.academicYearId == undefined) {
      this.academicYearIdReq = true;
      flag = 1;
    }
    else {
      this.academicYearIdReq = false;
    }
    if (this.academicGradeId == undefined) {
      this.academicGradeIdReq = true;
      flag = 1;
    }
    else {
      this.academicGradeIdReq = false;
    }
    if (this.academicPercentage == undefined || this.academicPercentage == 0) {
      this.academicPercentageReq = true;
      flag = 1;
    }
    else {
      this.academicPercentageReq = false;
    }
    if (flag == 0) {
      this.academicDetails.push({
        candidateProfileId: 0,
        academicLineId: this.academicDetails.length + 1,
        qualification: this.academicQualificationId,
        qualificationName: this.qualifications.filter(x => x.qualificationId == this.academicQualificationId)[0].qualificationName,
        course: this.academicCourseId,
        courseName: this.courses.filter(x => x.courseId == this.academicCourseId)[0].courseName,
        courseRemarks: this.academicRemarks,
        specalization: this.academicStream,
        instutation: this.academicInstitution,
        academicAddress: this.academicAddress,
        university: this.academicUniversityId,
        otherUniversityName: this.otherUniversityName,
        //universityName: this.academicUniversity.filter(x => x.qulificationUniversityBoardId == this.academicUniversityId)[0].qulificationUniversityBoardName,  // Previous 
        universityName: this.academicUniversityId == 0 ? this.otherUniversityName : this.academicUniversity.filter(x => x.qulificationUniversityBoardId == this.academicUniversityId)[0].qulificationUniversityBoardName, // added as others to show
        academicDurationFrom: this.faDate.nativeElement.value,
        academicDurationTo: this.taDate.nativeElement.value,
        courseType: this.academicQualificationTypeId,
        courseTypeName: this.qualificationType.filter(x => x.qualificationTypeId == this.academicQualificationTypeId)[0].qualificationTypeName,
        subjects: this.academicSubject,
        monthOfPassing: this.academicMonthId,
        yearOfPassing: this.academicYearId,
        grade: this.academicGradeId,
        gradeName: this.academicQualificationGrade.filter(x => x.qulificationClassGaradeDivisionId == this.academicGradeId)[0].qulificationClassGaradeDivisionName,
        marks: this.academicPercentage
      })
      this.academicBorederClass = "border-box mb-2";
      this.academicQualificationId = undefined;
      this.courses = [];
      this.academicCourseId = undefined;
      this.academicStream = "";
      this.academicInstitution = "";
      this.academicAddress = "";
      this.academicUniversityId = undefined;
      this.faDate.nativeElement.value = "";
      this.taDate.nativeElement.value = "";
      this.academicQualificationTypeId = undefined;
      this.academicSubject = "";
      this.academicMonthId = undefined;
      this.academicYearId = undefined;
      this.academicGradeId = undefined;
      this.academicPercentage = undefined;
    }
  }
  convertToLocalDate(responseDate: any) {
    try {
      if (responseDate != null) {
        if (typeof (responseDate) === 'string') {
          if (String(responseDate.indexOf('T') >= 0)) {
            responseDate = responseDate.split('T')[0];
          }
          if (String(responseDate.indexOf('+') >= 0)) {
            responseDate = responseDate.split('+')[0];
          }
        }

        responseDate = new Date(responseDate);
        const newDate = new Date(responseDate.getFullYear(), responseDate.getMonth(), responseDate.getDate(), 0, 0, 0);
        const userTimezoneOffset = newDate.getTimezoneOffset() * 60000;

        const finalDate: Date = new Date(newDate.getTime() - userTimezoneOffset);
        return finalDate;//> Util.minDateValue ? finalDate : null;
      } else {
        return null;
      }
    } catch (error) {
      return responseDate;
    }
  }
  removeAcademicDetails(index) {
    this.academicDetails.splice(index, 1);
  }

  removeLanguage(index) {
    this.languageKnownDetails.splice(index, 1);
  }
  removemother(index){
    // this.motherarr.splice(index,1);
    //this.languageKnownDetails.splice(index, 1);
    this.motherarr=[];
  }

  addmother() {
    this.motherarr = [];
    var flag = 0;
    if (this.mothertongueId == undefined) {
      flag = 1;
      this.mothertongueIdReq = true;
    }
    else {
      this.mothertongueIdReq = false;
    }
    if (this.motherread == false && this.motherspeak == false && this.motherwrite == false) {
      flag = 1;
    }
    else {
      if (this.languageKnownDetails.length > 0) {
        this.languageKnownDetails.shift();
      }
      this.languageKnownDetails.splice(0, 0, {
        candidateProfileId: 0,
        languageKnownLineId: 1,
        motherTongue: this.mothertongueId,
        motherTongueName: this.languages.filter(x => x.languageId == this.mothertongueId)[0].languageName,
        read: this.motherread,
        write: this.motherwrite,
        speak: this.motherspeak
      })
      this.knownLanguageId = undefined;
      this.motherread = false;
      this.motherwrite = false;
      this.motherspeak = false;
      this.languageBorderClass = "table table-bordered";
      this.motherarr.push(this.languageKnownDetails[0]);
      // this.languageKnownDetails.shift();
    }

  }
  addLanguages() {
    var flag = 0;
    if (this.knownLanguageId == undefined) {
      flag = 1;
      this.knownLanguageIdReq = true;
    }
    else {
      this.knownLanguageIdReq = false;
    }
    if (this.knownLanguageId == this.motherarr[0].motherTongue) {
      this.notificationService.showError("Already Selected in Mother Tongue", "Error");
      flag = 1;
    }
    if ((this.languageRead == false && this.languageSpeak == false && this.languageWrite == false) || (this.knownLanguageId == this.motherarr[0].motherTongue)) {
      flag = 1;
    }
    else if (flag == 0) {
      if (this.languageKnownDetails.length > 0) {
        this.languageKnownDetails.push({
          candidateProfileId: 0,
          languageKnownLineId: this.languageKnownDetails.length + 2,
          motherTongue: this.knownLanguageId,
          motherTongueName: this.languages.filter(x => x.languageId == this.knownLanguageId)[0].languageName,
          read: this.languageRead,
          write: this.languageWrite,
          speak: this.languageSpeak
        })
      }
      else {
        this.languageKnownDetails.push({
          candidateProfileId: 0,
          languageKnownLineId: this.languageKnownDetails.length + 1,
          motherTongue: this.knownLanguageId,
          motherTongueName: this.languages.filter(x => x.languageId == this.knownLanguageId)[0].languageName,
          read: this.languageRead,
          write: this.languageWrite,
          speak: this.languageSpeak
        })
      }
      this.knownLanguageId = undefined;
      this.languageRead = false;
      this.languageWrite = false;
      this.languageSpeak = false;
      this.languageBorderClass = "table table-bordered";
    }
  }

  addExperience() {
    var flag = 0;
    if (this.fwDate.nativeElement.value == "") {
      flag = 1;
      this.workFromDateReq = true;
    }
    else {
      this.workFromDateReq = false;
    }
    if (this.twDate.nativeElement.value == "") {
      flag = 1;
      this.workToDateReq = true;
    }
    else {
      this.workToDateReq = false;
    }
    if (this.fwDate.nativeElement.value == this.twDate.nativeElement.value) {
      this.notificationService.showError("To Date and From Date can't be same", "Error");
      flag = 1;
    }
    else {
      const [fwday, fwmonth, fwyear] = this.fwDate.nativeElement.value.split('/');
      const fwdate = new Date(fwyear, fwmonth - 1, fwday);
      const [twday, twmonth, twyear] = this.twDate.nativeElement.value.split('/');
      const twdate = new Date(twyear, twmonth - 1, twday);
      if (fwdate > twdate) {
        this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
        flag = 1;
      }

      // if (from[2] <= to[2]) {
      //   if (from[1] <= to[1]) {
      //     if (from[0] < to[0]) {

      //     }
      //     else {
      //       this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
      //       flag = 1;
      //     }
      //   }
      //   else {
      //     this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
      //     flag = 1;
      //   }
      // }
      // else {
      //   this.notificationService.showError("To Date Cann't be less than from From Date !! Please provide actual date", "Error");
      //   flag = 1;
      // }
    }
    if (this.workOrganization == "" || this.workOrganization == undefined) {
      flag = 1;
      this.workOrganizationReq = true;
    }
    else {
      this.workOrganizationReq = false;
    }
    if (this.workAddress == "" || this.workAddress == undefined) {
      flag = 1;
      this.workAddressReq = true;
    }
    else {
      this.workAddressReq = false;
    }
    if (this.workPosition == "" || this.workPosition == undefined) {
      flag = 1;
      this.workPositionReq = true;
    }
    else {
      this.workPositionReq = false;
    }
    if (this.workNature == "" || this.workNature == undefined) {
      flag = 1;
      this.workNatureReq = true;
    }
    else {
      this.workNatureReq = false;
    }
    if (this.workCTC == undefined) {
      flag = 1;
      this.workCTCReq = true;
    }
    else {
      this.workCTCReq = false;
    }
    if (flag == 0) {
      this.peviousAssignmentDetails.push({
        candidateProfileId: 0,
        peviousAssignmentLineId: this.peviousAssignmentDetails.length + 1,
        peviousAssignmentFrom: this.fwDate.nativeElement.value,
        peviousAssignmentTo: this.twDate.nativeElement.value,
        peviousAssignmentOrganisation: this.workOrganization,
        peviousAssignmentAddress: this.workAddress,
        peviousAssignmentPosition: this.workPosition,
        peviousAssignmentDescriptionofWork: this.workNature,
        peviousAssignmentCTC: this.workCTC
      })

      // Added by anif on 14-07-2022
      this.fwDate.nativeElement.value = "";
      this.twDate.nativeElement.value = "";
      this.workOrganization = "";
      this.workAddress = "";
      this.workPosition = "";
      this.workNature = "";
      this.workCTC = undefined;

    }
  }

  removeWorkDetails(index) {
    this.peviousAssignmentDetails.splice(index, 1);
  }

  changeJobPortal(evt) {
    //ny kuntal
    this.jobPortal = true;
    this.candidateProfile.jobPortal = true;
    this.internalRef = false;
    this.candidateProfile.isInternalRef = false;
    this.linkedIn = false;
    this.candidateProfile.linkedIn = false;
    this.careerSite = false;
    this.candidateProfile.careerSite = false;
    this.paperAdvertisement = false;
    this.candidateProfile.paperAdvertisement = false;
    this.employeeReferral = false;
    this.candidateProfile.employeeReferal = false;
    this.candidateProfile.consultantApplicable = false;
    this.consultantApplicable = false;
  }

  changeLinkedIn(evt) {
    this.linkedIn = true;
    this.candidateProfile.linkedIn = true;
    this.internalRef = false;
    this.candidateProfile.isInternalRef = false;
    this.jobPortal = false;
    this.candidateProfile.jobPortal = false;
    this.careerSite = false;
    this.candidateProfile.careerSite = false;
    this.paperAdvertisement = false;
    this.candidateProfile.paperAdvertisement = false;
    this.employeeReferral = false;
    this.candidateProfile.employeeReferal = false;
    this.candidateProfile.consultantApplicable = false;
    this.consultantApplicable = false;
  }

  changeCareerSite(evt) {
    this.careerSite = true;
    this.candidateProfile.careerSite = true;
    this.internalRef = false;
    this.candidateProfile.isInternalRef = false;
    this.jobPortal = false;
    this.candidateProfile.jobPortal = false;
    this.linkedIn = false;
    this.candidateProfile.linkedIn = false;
    this.paperAdvertisement = false;
    this.candidateProfile.paperAdvertisement = false;
    this.employeeReferral = false;
    this.candidateProfile.employeeReferal = false;
    this.candidateProfile.consultantApplicable = false;
    this.consultantApplicable = false;
  }

  changePaperAdvertisement(evt) {
    this.paperAdvertisement = true;
    this.candidateProfile.paperAdvertisement = true;
    this.internalRef = false;
    this.candidateProfile.isInternalRef = false;
    this.jobPortal = false;
    this.candidateProfile.jobPortal = false;
    this.linkedIn = false;
    this.candidateProfile.linkedIn = false;
    this.careerSite = false;
    this.candidateProfile.careerSite = false;
    this.employeeReferral = false;
    this.candidateProfile.employeeReferal = false;
    this.candidateProfile.consultantApplicable = false;
    this.consultantApplicable = false;
  }

  changeEmpReferral(evt) {
    this.employeeReferral = true;
    this.candidateProfile.employeeReferal = true;
    this.internalRef = false;
    this.candidateProfile.isInternalRef = false;
    this.jobPortal = false;
    this.candidateProfile.jobPortal = false;
    this.linkedIn = false;
    this.candidateProfile.linkedIn = false;
    this.careerSite = false;
    this.candidateProfile.careerSite = false;
    this.paperAdvertisement = false;
    this.candidateProfile.paperAdvertisement = false;
    this.candidateProfile.consultantApplicable = false;
    this.consultantApplicable = false;
  }

  changeConsultantApplicable(evt) {
    this.candidateProfile.consultantApplicable = true;
    this.consultantApplicable = true;
    this.internalRef = false;
    this.candidateProfile.isInternalRef = false;
    this.jobPortal = false;
    this.candidateProfile.jobPortal = false;
    this.linkedIn = false;
    this.candidateProfile.linkedIn = false;
    this.careerSite = false;
    this.candidateProfile.careerSite = false;
    this.paperAdvertisement = false;
    this.candidateProfile.paperAdvertisement = false;
    this.employeeReferral = false;
    this.candidateProfile.employeeReferal = false;

    if (this.consultant == 0 && evt == true) {
      this.consultantApplicableOthers = true;
    }
    else {
      this.consultantApplicableOthers = false;
    }
  }
  Reference(event) {
    this.internalRef = true;
    this.candidateProfile.isInternalRef = true;
    this.jobPortal = false;
    this.candidateProfile.jobPortal = false;
    this.linkedIn = false;
    this.candidateProfile.linkedIn = false;
    this.careerSite = false;
    this.candidateProfile.careerSite = false;
    this.paperAdvertisement = false;
    this.candidateProfile.paperAdvertisement = false;
    this.employeeReferral = false;
    this.candidateProfile.employeeReferal = false;
    this.candidateProfile.consultantApplicable = false;
    this.consultantApplicable = false;
  }
  changeConsultant(evt) {
    if (this.consultant == 0) {
      this.consultantApplicableOthers = true;
    }
    else {
      this.consultantApplicableOthers = false;
    }
  }

  changeCriminalCase(evt) {
    // this.criminalCase = evt;
    // this.candidateProfile.criminalCase = evt;
    this.criminalCaseChange = true;
    if (evt == 1) {
      this.criminalCase = true;
      this.candidateProfile.criminalCase = true;
    } else {
      this.criminalCase = false;
      this.candidateProfile.criminalCase = false;
    }
  }

  changePreviousEmploymentEnquiry(evt) {
    // this.candidateProfile.previousEmployemntEnquiry = evt;
    // this.previousEmployemntEnquiry = evt;
    this.employmentEnquery = true;
    if (evt == 1) {
      this.candidateProfile.previousEmployemntEnquiry = true;
      this.previousEmployemntEnquiry = true;
    } else {
      this.candidateProfile.previousEmployemntEnquiry = false;
      this.previousEmployemntEnquiry = false;
    }
  }

  changeSamePermanent(evt) {
    if (evt == true) {
      this.candidateProfile.permanentAddress = this.candidateProfile.communicationAddress;
    }
    else {
      this.candidateProfile.permanentAddress = "";
    }
  }

  gotoSection2() {
    var flag = 0;
    var msg = "";
    if (this.candidateProfile.communicationAddress == "" || this.candidateProfile.communicationAddress == undefined) {
      flag = 1;
      this.communicationAddressReq = true;
    }
    else {
      this.communicationAddressReq = false;
    }
    if (this.candidateProfile.communicationPin == "" || this.candidateProfile.communicationPin == undefined) {
      flag = 1;
      this.communicationPinReq = true;
    }
    else {
      this.communicationPinReq = false;
    }
    if (this.candidateProfile.communicationAlternativeContactNo == "" || this.candidateProfile.communicationAlternativeContactNo == undefined) {
      flag = 1;
      this.communicationAlternateContactNoReq = true;
    }
    else {
      this.communicationAlternateContactNoReq = false;
    }
    if (this.candidateProfile.permanentAddress == "" || this.candidateProfile.permanentAddress == undefined) {
      flag = 1;
      this.permanentAddressReq = true;
    }
    else {
      this.permanentAddressReq = false;
    }
    if (this.candidateProfile.permanentStateId == undefined) {
      flag = 1;
      this.permanentStateIdReq = true;
    }
    else {
      this.permanentStateIdReq = false;
    }
    if (this.candidateProfile.permanentCountryId == undefined) {
      flag = 1;
      this.permanentCountryIdReq = true;
    }
    else {
      this.permanentCountryIdReq = false;
    }
    if (this.candidateProfile.permanentPin == "" || this.candidateProfile.permanentPin == undefined) {
      flag = 1;
      this.permanentPinReq = true;
    }
    else {
      this.permanentPinReq = false;
    }
    //Permanent Phone not required
    // if (this.candidateProfile.permanentPhone == "" || this.candidateProfile.permanentPhone == undefined) {
    //   flag = 1;
    //   this.permanentPhoneReq = true;
    // }
    // else {
    //   this.permanentPhoneReq = false;
    // }
    if (this.candidateProfile.permanentHomeTown == "" || this.candidateProfile.permanentHomeTown == undefined) {
      flag = 1;
      this.permanentHomeTownReq = true;
    }
    else {
      this.permanentHomeTownReq = false;
    }
    if (this.candidateProfile.permanentNativeStateId == undefined) {
      flag = 1;
      this.permanentNativeStateIdReq = true;
    }
    else {
      this.permanentNativeStateIdReq = false;
    }
    if (this.candidateProfile.panNo == "" || this.candidateProfile.panNo == undefined) {
      flag = 1;
      this.panNoReq = true;
    }
    else {
      this.panNoReq = false;
    }
    if (this.candidateProfile.nationalityId == undefined) {
      flag = 1;
      this.nationalityIdReq = true;
    }
    else {
      this.nationalityIdReq = false;
    }
    if (this.candidateProfile.religionId == undefined) {
      flag = 1;
      this.religionIdReq = true;
    }
    else {
      this.religionIdReq = false;
    }
    if (this.candidateProfile.casteId == undefined) {
      flag = 1;
      this.casteIdReq = true;
    }
    else {
      this.casteIdReq = false;
    }
    if (this.candidateProfile.height == undefined) {
      flag = 1;
      this.heightReq = true;
    }
    else {
      this.heightReq = false;
    }
    if (this.candidateProfile.weight == undefined) {
      flag = 1;
      this.weightReq = true;
    }
    else {
      this.weightReq = false;
    }
    if (this.candidateProfile.bloodGroupId == undefined) {
      flag = 1;
      this.bloodGroupIdReq = true;
    }
    else {
      this.bloodGroupIdReq = false;
    }
    if (this.ddlSelectedEyesightCorrected == null) {
      flag = 1;
      this.eyeSightCorrected = true;
    }
    else {
      this.eyeSightCorrected = false;
    }
    if ((this.candidateProfile.eyeSightRight == "" || this.candidateProfile.eyeSightRight == undefined) && this.candidateProfile.eyeSightCorrected == true) {
      flag = 1;
      this.eyeSightRightReq = true;
    }
    else {
      this.eyeSightRightReq = false;
    }
    if ((this.candidateProfile.eyeSightLeft == "" || this.candidateProfile.eyeSightLeft == undefined) && this.candidateProfile.eyeSightCorrected == true) {
      flag = 1;
      this.eyeSightLeftReq = true;
    }
    else {
      this.eyeSightLeftReq = false;
    }
    if (this.candidateProfile.handiCap == true && (this.candidateProfile.handiCapDetails == undefined || this.candidateProfile.handiCapDetails == "")) {
      flag = 1;
      this.handicapReq = true;
    }
    else {
      this.handicapReq = false;
    }
    if (this.candidateProfile.cronicMajorIllness == true && (this.candidateProfile.cronicMajorIllnessDetails == undefined || this.candidateProfile.cronicMajorIllnessDetails == "")) {
      flag = 1;
      this.cronicIllnessReq = true;
    }
    else {
      this.cronicIllnessReq = false;
    }
    // if (this.candidateProfile.identificationMarks1 == "" || this.candidateProfile.identificationMarks1 == undefined) {
    //   flag = 1;
    //   this.identificationMarks1Req = true;
    // }
    // else {
    //   this.identificationMarks1Req = false;
    // }
    if ((this.candidateProfile.identificationMarks2 == "" || this.candidateProfile.identificationMarks2 == undefined) && (this.candidateProfile.identificationMarks1 == "" || this.candidateProfile.identificationMarks1 == undefined)) {
      flag = 1;
      this.identificationMarks2Req = true;
    }
    else {
      this.identificationMarks2Req = false;
    }
    if (this.defaultimg == "assets/images/user.jpg") {
      flag = 1;
      this.photoReq = true;
    }
    else {
      this.photoReq = false;
    }

    if (flag == 0) {
      this.SaveStep1();
      this.section2 = true;
      this.section1 = false;
      setTimeout(() => {
        this.loadDatePicker();
      });
    }
    else {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }

  }

  SaveStep1() {
    var flag = 0;
    // var msg = "";
    // if (this.candidateProfile.communicationAddress == "" || this.candidateProfile.communicationAddress == undefined) {
    //   flag = 1;
    //   this.communicationAddressReq = true;
    // }
    // else {
    //   this.communicationAddressReq = false;
    // }
    // if (this.candidateProfile.communicationPin == "" || this.candidateProfile.communicationPin == undefined) {
    //   flag = 1;
    //   this.communicationPinReq = true;
    // }
    // else {
    //   this.communicationPinReq = false;
    // }
    // if (this.candidateProfile.communicationAlternativeContactNo == "" || this.candidateProfile.communicationAlternativeContactNo == undefined) {
    //   flag = 1;
    //   this.communicationAlternateContactNoReq = true;
    // }
    // else {
    //   this.communicationAlternateContactNoReq = false;
    // }
    // if (this.candidateProfile.permanentAddress == "" || this.candidateProfile.permanentAddress == undefined) {
    //   flag = 1;
    //   this.permanentAddressReq = true;
    // }
    // else {
    //   this.permanentAddressReq = false;
    // }
    // if (this.candidateProfile.permanentStateId == undefined) {
    //   flag = 1;
    //   this.permanentStateIdReq = true;
    // }
    // else {
    //   this.permanentStateIdReq = false;
    // }
    // if (this.candidateProfile.permanentCountryId == undefined) {
    //   flag = 1;
    //   this.permanentCountryIdReq = true;
    // }
    // else {
    //   this.permanentCountryIdReq = false;
    // }
    // if (this.candidateProfile.permanentPin == "" || this.candidateProfile.permanentPin == undefined) {
    //   flag = 1;
    //   this.permanentPinReq = true;
    // }
    // else {
    //   this.permanentPinReq = false;
    // }
    // if (this.candidateProfile.permanentPhone == "" || this.candidateProfile.permanentPhone == undefined) {
    //   flag = 1;
    //   this.permanentPhoneReq = true;
    // }
    // else {
    //   this.permanentPhoneReq = false;
    // }
    // if (this.candidateProfile.permanentHomeTown == "" || this.candidateProfile.permanentHomeTown == undefined) {
    //   flag = 1;
    //   this.permanentHomeTownReq = true;
    // }
    // else {
    //   this.permanentHomeTownReq = false;
    // }
    // if (this.candidateProfile.permanentNativeStateId == undefined) {
    //   flag = 1;
    //   this.permanentNativeStateIdReq = true;
    // }
    // else {
    //   this.permanentNativeStateIdReq = false;
    // }
    // if (this.candidateProfile.panNo == "" || this.candidateProfile.panNo == undefined) {
    //   flag = 1;
    //   this.panNoReq = true;
    // }
    // else {
    //   this.panNoReq = false;
    // }
    // if (this.candidateProfile.nationalityId == undefined) {
    //   flag = 1;
    //   this.nationalityIdReq = true;
    // }
    // else {
    //   this.nationalityIdReq = false;
    // }
    // if (this.candidateProfile.religionId == undefined) {
    //   flag = 1;
    //   this.religionIdReq = true;
    // }
    // else {
    //   this.religionIdReq = false;
    // }
    // if (this.candidateProfile.casteId == undefined) {
    //   flag = 1;
    //   this.casteIdReq = true;
    // }
    // else {
    //   this.casteIdReq = false;
    // }
    // if (this.candidateProfile.height == undefined) {
    //   flag = 1;
    //   this.heightReq = true;
    // }
    // else {
    //   this.heightReq = false;
    // }
    // if (this.candidateProfile.weight == undefined) {
    //   flag = 1;
    //   this.weightReq = true;
    // }
    // else {
    //   this.weightReq = false;
    // }
    // if (this.candidateProfile.bloodGroupId == undefined) {
    //   flag = 1;
    //   this.bloodGroupIdReq = true;
    // }
    // else {
    //   this.bloodGroupIdReq = false;
    // }
    // if (this.candidateProfile.eyeSightRight == "" || this.candidateProfile.eyeSightRight == undefined) {
    //   flag = 1;
    //   this.eyeSightRightReq = true;
    // }
    // else {
    //   this.eyeSightRightReq = false;
    // }
    // if (this.candidateProfile.eyeSightLeft == "" || this.candidateProfile.eyeSightLeft == undefined) {
    //   flag = 1;
    //   this.eyeSightLeftReq = true;
    // }
    // else {
    //   this.eyeSightLeftReq = false;
    // }
    // if (this.candidateProfile.handiCap == true && (this.candidateProfile.handiCapDetails == undefined || this.candidateProfile.handiCapDetails == "")) {
    //   flag = 1;
    //   this.handicapReq = true;
    // }
    // else {
    //   this.handicapReq = false;
    // }
    // if (this.candidateProfile.identificationMarks1 == "" || this.candidateProfile.identificationMarks1 == undefined) {
    //   flag = 1;
    //   this.identificationMarks1Req = true;
    // }
    // else {
    //   this.identificationMarks1Req = false;
    // }
    // if (this.candidateProfile.identificationMarks2 == "" || this.candidateProfile.identificationMarks2 == undefined) {
    //   flag = 1;
    //   this.identificationMarks2Req = true;
    // }
    // else {
    //   this.identificationMarks2Req = false;
    // }
    // if (this.defaultimg == "assets/images/user.jpg") {
    //   flag = 1;
    //   this.photoReq = true;
    // }
    // else {
    //   this.photoReq = false;
    // }
    if (flag == 0) {
      this.SaveApplicationForm('1');
      // setTimeout(() => {
      //   this.loadDatePicker();
      // });
    }
  }

  gotoSection1() {
    this.section2 = false;
    this.section1 = true;
    this.SaveStep2();
  }

  gotoSection3() {

    // Added by Anif on 20-06-2022 for family details validation
    // var flag = 0;
    // var msg = "";
    // if (this.familyBackGroundDetails.length == 0) {
    //   flag = 1;
    //   msg = "Please add atleast one family member";
    // }
    // else {

    // }
    // if (flag == 0) {
    //   this.section3 = true;
    //   this.section2 = false;
    //   this.academicBorederClass = "border-box mb-2";
    //   setTimeout(() => {
    //     //this.loadMonthYearPicker();
    //     this.loadDatePicker();
    //   });
    // } else {
    //   this.notificationService.showError(msg, "Error");
    // }
    this.SaveStep2();
    this.section3 = true;
    this.section2 = false;
    this.academicBorederClass = "border-box mb-2";
    setTimeout(() => {
      //this.loadMonthYearPicker();
      this.loadDatePicker();
    });

  }

  SaveStep2() {
    this.academicBorederClass = "border-box mb-2";
    this.SaveApplicationForm(1);
    setTimeout(() => {
      //this.loadMonthYearPicker();
      this.loadDatePicker();
    });
  }

  gotoPreviousSection2() {
    this.SaveStep3();
    this.section2 = true;
    this.section3 = false;
    this.academicBorederClass = "border-box mb-2";
    setTimeout(() => {
      //this.loadMonthYearPicker();
      this.loadDatePicker();
    });
  }

  gotoSection4() {
    if (this.academicDetails.length == 0) {
      this.academicBorederClass = "border-box mb-2 border-box-invalid";
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.academicBorederClass = "border-box mb-2";
      this.SaveStep3();
      this.section4 = true;
      this.section3 = false;
    }
  }

  SaveStep3() {
    if (this.academicDetails.length == 0) {
      this.academicBorederClass = "border-box mb-2 border-box-invalid";
    }
    else {
      this.academicBorederClass = "border-box mb-2";
      this.SaveApplicationForm('1');
    }
  }

  gotoPreviousSection3() {
    this.SaveStep4();
    this.section3 = true;
    this.section4 = false;
    this.academicBorederClass = "border-box mb-2";
    this.languageBorderClass = "";
    setTimeout(() => {
      this.loadDatePicker();
    });
  }

  gotoSection5() {
    if (this.languageKnownDetails.length == 0) {
      this.languageBorderClass = "table-bordered-invalid";
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
    else {
      this.languageBorderClass = "";
      this.SaveStep4();
      this.section5 = true;
      this.section4 = false;
    }
    setTimeout(() => {
      this.loadDatePicker();
    });
  }

  SaveStep4() {
    if (this.languageKnownDetails.length == 0) {
      this.languageBorderClass = "table-bordered-invalid";
    }
    else {
      this.languageBorderClass = "";
      this.motherarr = [];
      this.SaveApplicationForm('1');
    }
    setTimeout(() => {
      this.loadDatePicker();
    });
  }

  gotoPreviousSection4() {
    this.languageBorderClass = "table table-bordered";
    this.workBorederClass = "border-box mb-2";
    this.SaveStep5();
    this.section4 = true;
    this.section5 = false;
  }

  gotoSection6() {
    // if(this.peviousAssignmentDetails.length==0){
    //   this.workBorederClass="border-box mb-2 border-box-invalid";
    // }
    // else{
    this.workBorederClass = "border-box mb-2";
    this.SaveStep5();
    this.section6 = true;
    this.section5 = false;
    setTimeout(() => {
      this.loadDatePicker();
    });
    //}
  }

  SaveStep5() {
    this.workBorederClass = "border-box mb-2";
    this.SaveApplicationForm('1');
  }

  gotoPreviousSection5() {
    this.SaveStep6();
    this.section5 = true;
    this.section6 = false;
    setTimeout(() => {
      this.loadDatePicker();
    });
  }

  gotoSection7() {
    var flag = 0;
    if (this.candidateProfile.ref1Name == undefined || this.candidateProfile.ref1Name == "") {
      flag = 1;
      this.showref1Name = true
    }
    else {
      this.showref1Name = false
    }
    if (this.candidateProfile.ref1Position == undefined || this.candidateProfile.ref1Position == "") {
      flag = 1;
      this.showref1Position = true
    }
    else {
      this.showref1Position = false
    }
    if (this.candidateProfile.ref1Organisation == undefined || this.candidateProfile.ref1Organisation == "") {
      flag = 1;
      this.showref1Organisation = true
    }
    else {
      this.showref1Organisation = false
    }
    if (this.candidateProfile.ref1Location == undefined || this.candidateProfile.ref1Location == "") {
      flag = 1;
      this.showref1Location = true
    }
    else {
      this.showref1Location = false
    }
    if (this.candidateProfile.ref1ContactNo == undefined || this.candidateProfile.ref1ContactNo == "") {
      flag = 1;
      this.showref1ContactNo = true
    }
    else {
      this.showref1ContactNo = false
    }
    if (this.candidateProfile.ref2Name == undefined || this.candidateProfile.ref2Name == "") {
      flag = 1;
      this.showref2Name = true
    }
    else {
      this.showref2Name = false
    }
    if (this.candidateProfile.ref2Position == undefined || this.candidateProfile.ref2Position == "") {
      flag = 1;
      this.showref2Position = true
    }
    else {
      this.showref2Position = false
    }
    if (this.candidateProfile.ref2Organisation == undefined || this.candidateProfile.ref2Organisation == "") {
      flag = 1;
      this.showref2Organisation = true
    }
    else {
      this.showref2Organisation = false
    }
    if (this.candidateProfile.ref2Location == undefined || this.candidateProfile.ref2Location == "") {
      flag = 1;
      this.showref2Location = true;
    }
    else {
      this.showref2Location = false
    }
    if (this.candidateProfile.ref2ContactNo == undefined || this.candidateProfile.ref2ContactNo == "") {
      flag = 1;
      this.showref2ContactNo = true;
    }
    else {
      this.showref2ContactNo = false;
    }
    if (this.candidateProfile.ref3Name == undefined || this.candidateProfile.ref3Name == "") {
      flag = 1;
      this.showref3Name = true;
    }
    else {
      this.showref3Name = false
    }
    if (this.candidateProfile.ref3Position == undefined || this.candidateProfile.ref3Position == "") {
      flag = 1;
      this.showref3Position = true
    }
    else {
      this.showref3Position = false
    }
    if (this.candidateProfile.ref3Organisation == undefined || this.candidateProfile.ref3Organisation == "") {
      flag = 1;
      this.showref3Organisation = true
    }
    else {
      this.showref3Organisation = false
    }
    if (this.candidateProfile.ref3Location == undefined || this.candidateProfile.ref3Location == "") {
      flag = 1;
      this.showref3Location = true
    }
    else {
      this.showref3Location = false
    }
    if (this.candidateProfile.ref3ContactNo == undefined || this.candidateProfile.ref3ContactNo == "") {
      flag = 1;
      this.showref3ContactNo = true
    }
    else {
      this.showref3ContactNo = false
    }
    if (flag == 0) {
      this.SaveStep6();
      this.section7 = true;
      this.section6 = false;

      if (this.candidateProfile.preInterViewMRF == true) {
        setTimeout(() => {
          this.loadDatePicker();
        });
      }
    }
    else {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
  }
  changeInterviewDetailsStatus(evt) {
    this.everInterviewMRFChange = true;
    //this.mrfPreInterviewStatus = evt;
    if (evt == 1) {
      this.mrfPreInterviewStatus = true;
    } else {
      this.mrfPreInterviewStatus = false;
    }

    setTimeout(() => {
      this.loadDatePicker();
    });
  }

  SaveStep6() {
    this.SaveApplicationForm('1');
    setTimeout(() => {
      this.loadDatePicker();
    });
  }

  gotoPreviousSection6() {
    this.section6 = true;
    this.section7 = false;
  }

  gotoSection8() {
    var flag = 0;
    if (this.mrfPreInterviewStatus == true && this.preInterviewDetails.length == 0) {
      flag = 1;
      this.preInterviewPositionReq = true;
      this.preInterviewDateReq = true;
    }
    else {
      this.preInterviewPositionReq = false;
      this.preInterviewDateReq = false;
    }
    if (this.candidateProfile.joiningComments == "" || this.candidateProfile.joiningComments == undefined) {
      this.joiningCommentsReq = true;
      flag = 1;
    }
    else {
      this.joiningCommentsReq = false;
    }
    if (this.candidateProfile.additionoalDetails == "" || this.candidateProfile.additionoalDetails == undefined) {
      this.additionoalDetailsReq = true;
      flag = 1;
    }
    else {
      this.additionoalDetailsReq = false;
    }
    if (this.criminalCase == true && (this.candidateProfile.criminalCaseDetails == "" || this.candidateProfile.criminalCaseDetails == undefined)) {
      this.criminalCaseDetailsReq = true;
      flag = 1;
    }
    else {
      this.criminalCaseDetailsReq = false;
    }
    if (this.previousEmployemntEnquiry == true && (this.candidateProfile.previousEmployemntEnquiryDetails == "" || this.candidateProfile.previousEmployemntEnquiryDetails == undefined)) {
      this.previousEmployemntEnquiryDetailsReq = true;
      flag = 1;
    }
    else {
      this.previousEmployemntEnquiryDetailsReq = false;
    }
    if (flag == 0) {
      this.section8 = true;
      this.section7 = false;
    }
    else {
      this.notificationService.showError("Please fill all fields to proceed", "Error");
    }
  }

  saveStep7() {
    var flag = 0;
    if (this.mrfPreInterviewStatus == true && this.preInterviewDetails.length == 0) {
      flag = 1;
      this.preInterviewPositionReq = true;
      this.preInterviewDateReq = true;
    }
    else {
      this.preInterviewPositionReq = false;
      this.preInterviewDateReq = false;
    }
    if (this.candidateProfile.additionoalDetails == "" || this.candidateProfile.additionoalDetails == undefined) {
      this.additionoalDetailsReq = true;
      flag = 1;
    }
    else {
      this.additionoalDetailsReq = false;
    }
    if (this.criminalCase == true && (this.candidateProfile.criminalCaseDetails == "" || this.candidateProfile.criminalCaseDetails == undefined)) {
      this.criminalCaseDetailsReq = true;
      flag = 1;
    }
    else {
      this.criminalCaseDetailsReq = false;
    }
    if (this.previousEmployemntEnquiry == true && (this.candidateProfile.previousEmployemntEnquiryDetails == "" || this.candidateProfile.previousEmployemntEnquiryDetails == undefined)) {
      this.previousEmployemntEnquiryDetailsReq = true;
      flag = 1;
    }
    else {
      this.previousEmployemntEnquiryDetailsReq = false;
    }
    if (flag == 0) {
      this.SaveApplicationForm('1');
    }
  }

  gotoPreviousSection7() {
    this.section7 = true;
    this.section8 = false;
  }

  submit() {
    this.SpinnerService.show();
    var htmlString = "";
    this.applicationFormData = this.candidateProfile
    this.applicationFormData.religionName = this.religions.filter(e => e.religionId == this.candidateProfile.religionId)[0].religionName;
    this.candidateProfile.nationalityId == 1 ? this.applicationFormData.nationalityName = "Indian" : this.applicationFormData.nationalityName = "";
    this.applicationFormData.casteName = this.castes.filter(e => e.casteId == this.candidateProfile.casteId)[0].casteName;
    this.applicationFormData.bloodGroupName = this.bloodGroups.filter(e => e.bloodGroupId == this.candidateProfile.bloodGroupId)[0].bloodGroupName;
    this.applicationFormData.permanentCountryName = this.countries.filter(e => e.countryId == this.candidateProfile.permanentCountryId)[0].countryName;
    this.applicationFormData.permanentStateName = this.states.filter(e => e.stateId == this.candidateProfile.permanentStateId)[0].stateName;
    this.applicationFormData.permanentNativeStateName = this.states.filter(e => e.stateId == this.candidateProfile.permanentNativeStateId)[0].stateName;
    this.applicationFormData.signature = this.signatreData;
    this.applicationFormData.candiadatePhoto = this.profilepictureData;
    
    setTimeout(() => {
      htmlString = document.getElementById("printerdivApplicationForm").innerHTML;

      var dom = document.createElement('div');
      dom.innerHTML = htmlString;
      var opt = {
        margin: 6,
        filename: this.candidateId + "_SalaryFitment.pdf",
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, y: 2, scrollY: 0 },
        jsPDF: { format: 'A4', orientation: "portrait" },
      }

      html2pdf().set(opt).from(dom).toPdf().output('blob').then((data: any) => {
        this.file = data;
        jQuery("#confirmPopup").modal('show');
      })
      this.SpinnerService.hide()

    }, 500);
  }
  SaveApplicationForm(submitStatus) {
    var flag = 0;
    if (Number(submitStatus) == 2) {
      if (this.candidateProfile.isInternalRef == true) {
        if (this.candidateProfile.internalRefName == undefined) {
          this.notificationService.showError("Please Specify the Internal Reference", "Error");
          flag = 1;
        }
      }
      if (this.candidateProfile.signature == "") {
        if (this.signaturefileToUpload == null) {
          this.notificationService.showError("Signature is required", "Error");
          flag = 1;
        }
      }

    }
    if (flag == 0) {

      const formData = new FormData();
      formData.append("CandidateId", this.candidateProfile.candidateId.toString());
      formData.append("RequisitionDetailId", this.candidateProfile.requisitionDetailId.toString());
      formData.append("FullName", this.candidateProfile.fullName.toString());
      formData.append("PositionAppliedFor", this.candidateProfile.positionAppliedFor.toString());
      formData.append("DOB", this.candidateProfile.dob.toString());
      formData.append("CommunicationAddress", this.candidateProfile.communicationAddress.toString());
      formData.append("CommunicationStateId", this.candidateProfile.communicationStateId.toString());
      formData.append("CommunicationPin", this.candidateProfile.communicationPin.toString());
      formData.append("CommunicationPhoneNo", this.candidateProfile.communicationPhoneNo.toString());
      formData.append("CommunicationAlternativeContactNo", this.candidateProfile.communicationAlternativeContactNo.toString());
      formData.append("EmailId", this.candidateProfile.emailId.toString());
      formData.append("PermanentAddress", this.candidateProfile.permanentAddress.toString());
      formData.append("PermanentStateId", this.candidateProfile.permanentStateId.toString());
      formData.append("PermanentCountryId", this.candidateProfile.permanentCountryId.toString())
      formData.append("PermanentPin", this.candidateProfile.permanentPin.toString());
      //formData.append("PermanentPhone", this.candidateProfile.permanentPhone.toString()); commented on 08/02/24 to make permanent phn same as communication phn
      formData.append("PermanentPhone", this.candidateProfile.communicationPhoneNo.toString()); 
      formData.append("PermanentHomeTown", this.candidateProfile.permanentHomeTown.toString());
      formData.append("PermanentNativeStateId", this.candidateProfile.permanentNativeStateId.toString());
      formData.append("AadharNo", this.candidateProfile.aadharNo.toString());
      formData.append("UANNO", this.candidateProfile.uanno.toString());
      formData.append("PANNo", this.candidateProfile.panNo.toString());
      formData.append("NationalityId", this.candidateProfile.nationalityId.toString());
      formData.append("ReligionId", this.candidateProfile.religionId.toString());
      formData.append("CasteId", this.candidateProfile.casteId.toString());
      formData.append("Height", this.candidateProfile.height.toString());
      formData.append("Weight", this.candidateProfile.weight.toString());
      formData.append("BloodGroupId", this.candidateProfile.bloodGroupId.toString());
      formData.append("EyeSightCorrected", this.candidateProfile.eyeSightCorrected.toString());
      formData.append("EyeSightRight", this.candidateProfile.eyeSightRight.toString());
      formData.append("EyeSightLeft", this.candidateProfile.eyeSightLeft.toString());
      formData.append("CronicMajorIllness", this.candidateProfile.cronicMajorIllness.toString());
      if (this.candidateProfile.cronicMajorIllness == true) {
        formData.append("CronicMajorIllnessDetails", this.candidateProfile.cronicMajorIllnessDetails.toString());
      }
      else {
        formData.append("CronicMajorIllnessDetails", "");
      }
      formData.append("HandiCap", this.candidateProfile.handiCap.toString());
      if (this.candidateProfile.handiCap == true) {
        formData.append("HandiCapDetails", this.candidateProfile.handiCapDetails.toString());
      }
      else {
        formData.append("HandiCapDetails", "");
      }
      formData.append("IdentificationMarks1", this.candidateProfile.identificationMarks1.toString());
      formData.append("IdentificationMarks2", this.candidateProfile.identificationMarks2.toString());
      this.candidateFamilyArray = [];
      if (this.familyBackGroundDetails.length > 0) {
        for (var i = 0; i < this.familyBackGroundDetails.length; i++) {
          this.candidateFamilyArray.push({
            candidateProfileId: 0,
            // familyBackgoundLineId: i, // Previous
            familyBackgoundLineId: this.familyBackGroundDetails[i].familyBackgoundLineId,  // Changed on 30-06-2022
            familyRelationShip: this.familyBackGroundDetails[i].familyRelationShip,
            familyName: this.familyBackGroundDetails[i].familyName,
            familyDOB: this.familyBackGroundDetails[i].familyDOB,
            education: this.familyBackGroundDetails[i].education,
            occupation: this.familyBackGroundDetails[i].occupation,
            familyOrganisation: this.familyBackGroundDetails[i].familyOrganisation
          })
        }
      }
      formData.append("FamilyBackGroundDetails", JSON.stringify(this.candidateFamilyArray));
      //formData.append("MRFRealtives", this.candidateProfile.mrfRealtives.toString());
      formData.append("MRFRealtives", this.mrfRelativesChange == true ? (this.candidateProfile.mrfRealtives ? "1" : "0") : "-1");
      this.candidateMRFRelativesArray = [];
      for (var i = 0; i < this.mrfRelationShipDetails.length; i++) {
        this.candidateMRFRelativesArray.push({
          candidateProfileId: 0,
          mrfRelationShipLineId: i,
          relativeName: this.mrfRelationShipDetails[i].relativeName,
          relativeEmployeeId: this.mrfRelationShipDetails[i].relativeEmployeeId,
          relativeDesignation: this.mrfRelationShipDetails[i].relativeDesignation,
          relativeRelationShip: this.mrfRelationShipDetails[i].relativeRelationShip,
        })
      }
      formData.append("MRFRelation", JSON.stringify(this.candidateMRFRelativesArray));
      //formData.append("TyreCompanyRealtionShip", this.candidateProfile.tyreCompanyRealtionShip.toString());
      formData.append("TyreCompanyRealtionShip", this.tyreCompaniesRelativeChange == true ? (this.candidateProfile.tyreCompanyRealtionShip ? "1" : "0") : "-1");
      this.candidateTyreRelativesArray = [];
      for (var i = 0; i < this.tyreCompanyRelationShipDetails.length; i++) {
        this.candidateTyreRelativesArray.push({
          candidateProfileId: 0,
          tyreCompanyRelationLineId: i,
          tyreRelativeName: this.tyreCompanyRelationShipDetails[i].tyreRelativeName,
          tyreRelativeDesignation: this.tyreCompanyRelationShipDetails[i].tyreRelativeDesignation,
          tyreRelativeCompanyName: this.tyreCompanyRelationShipDetails[i].tyreRelativeCompanyName,
          tyreRelativeRelationShip: this.tyreCompanyRelationShipDetails[i].tyreRelativeRelationShip,
        })
      }
      formData.append("TyreCompanyRelationShipDetails", JSON.stringify(this.candidateTyreRelativesArray));
      this.candidateAcademicDetailsArray = [];
      for (var i = 0; i < this.academicDetails.length; i++) {
        this.candidateAcademicDetailsArray.push({
          candidateProfileId: 0,
          academicLineId: i,
          qualification: this.academicDetails[i].qualification,
          course: this.academicDetails[i].course,
          specalization: this.academicDetails[i].specalization,
          instutation: this.academicDetails[i].instutation,
          academicAddress: this.academicDetails[i].academicAddress,
          university: this.academicDetails[i].university,
          otherUniversityName: this.academicDetails[i].otherUniversityName, //this.otherUniversityName,
          academicDurationFrom: this.academicDetails[i].academicDurationFrom,
          academicDurationTo: this.academicDetails[i].academicDurationTo,
          courseType: this.academicDetails[i].courseType,
          subjects: this.academicDetails[i].subjects,
          monthOfPassing: this.academicDetails[i].monthOfPassing,
          yearOfPassing: this.academicDetails[i].yearOfPassing,
          grade: this.academicDetails[i].grade,
          marks: this.academicDetails[i].marks,
          courseRemarks: this.academicDetails[i].courseRemarks,
        })
      }
      formData.append("AcademicDetails", JSON.stringify(this.candidateAcademicDetailsArray));
      formData.append("ReasonforGap", this.candidateProfile.reasonforGap);
      this.candidateCertificationDetailsArray = [];
      for (var i = 0; i < this.certificationDetails.length; i++) {
        this.candidateCertificationDetailsArray.push({
          candidateProfileId: 0,
          certificationLineId: i,
          certificationOrganisation: this.certificationDetails[i].certificationOrganisation,
          certificationNatureofTraining: this.certificationDetails[i].certificationNatureofTraining,
          certificationDurationFrom: this.certificationDetails[i].certificationDurationFrom,
          certificationDurationTo: this.certificationDetails[i].certificationDurationTo,
        })
      }
      formData.append("CertificationDetails", JSON.stringify(this.candidateCertificationDetailsArray));
      this.candidateExtraCarricularActivitiesDetailsArray = [];
      for (var i = 0; i < this.extraCarricularActivitiesDetails.length; i++) {
        this.candidateExtraCarricularActivitiesDetailsArray.push({
          candidateProfileId: 0,
          extraCarricularActivitiesLineId: i,
          natureofActivities: this.extraCarricularActivitiesDetails[i].natureofActivities,
          levelofAchivement: this.extraCarricularActivitiesDetails[i].levelofAchivement,
        })
      }
      formData.append("ExtraCarricularActivitiesDetails", JSON.stringify(this.candidateExtraCarricularActivitiesDetailsArray));
      this.candidateLanguageKnownDetailsArray = [];
      for (var i = 0; i < this.languageKnownDetails.length; i++) {
        this.candidateLanguageKnownDetailsArray.push({
          candidateProfileId: 0,
          // languageKnownLineId: i, // Previous
          languageKnownLineId: this.languageKnownDetails[i].languageKnownLineId,  // Changed on 23-06-2022
          motherTongue: this.languageKnownDetails[i].motherTongue,
          read: this.languageKnownDetails[i].read,
          write: this.languageKnownDetails[i].write,
          speak: this.languageKnownDetails[i].speak,
        })
      }
      formData.append("LanguageKnownDetails", JSON.stringify(this.candidateLanguageKnownDetailsArray));
      this.candidatePeviousAssignmentDetailsArray = [];
      for (var i = 0; i < this.peviousAssignmentDetails.length; i++) {
        this.candidatePeviousAssignmentDetailsArray.push({
          candidateProfileId: 0,
          peviousAssignmentLineId: i,
          peviousAssignmentFrom: this.peviousAssignmentDetails[i].peviousAssignmentFrom,
          peviousAssignmentTo: this.peviousAssignmentDetails[i].peviousAssignmentTo,
          peviousAssignmentOrganisation: this.peviousAssignmentDetails[i].peviousAssignmentOrganisation,
          peviousAssignmentAddress: this.peviousAssignmentDetails[i].peviousAssignmentAddress,
          peviousAssignmentPosition: this.peviousAssignmentDetails[i].peviousAssignmentPosition,
          peviousAssignmentDescriptionofWork: this.peviousAssignmentDetails[i].peviousAssignmentDescriptionofWork,
          peviousAssignmentCTC: this.peviousAssignmentDetails[i].peviousAssignmentCTC,
        })
      }
      this.preInterviewArray = [];
      for (var i = 0; i < this.preInterviewDetails.length; i++) {
        this.preInterviewArray.push({
          candidateProfileId: 0,
          mrfPreInterviewLineId: i,
          position: this.preInterviewDetails[i].position,
          positionName: this.preInterviewDetails[i].positionName,
          interviewDate: this.preInterviewDetails[i].interviewDate
        })
      }
      // formData.append("PreInterViewMRF", this.mrfPreInterviewStatus.toString());
      formData.append("PreInterViewMRF", this.everInterviewMRFChange == true ? (this.mrfPreInterviewStatus ? "1" : "0") : "-1");
      formData.append("MRFPreInterviewDetails", JSON.stringify(this.preInterviewArray));
      formData.append("PrePeviousAssignmentDetails", JSON.stringify(this.candidatePeviousAssignmentDetailsArray));
      formData.append("PreviousAssignmentGap", this.candidateProfile.previousAssignmentGap.toString());
      formData.append("Ref1Name", this.candidateProfile.ref1Name.toString());
      formData.append("Ref1Position", this.candidateProfile.ref1Position.toString());
      formData.append("Ref1Organisation", this.candidateProfile.ref1Organisation.toString());
      formData.append("Ref1Location", this.candidateProfile.ref1Location.toString());
      formData.append("Ref1ContactNo", this.candidateProfile.ref1ContactNo.toString());
      formData.append("Ref1EmailId", this.candidateProfile.ref1EmailId.toString());
      formData.append("Ref2Name", this.candidateProfile.ref2Name.toString());
      formData.append("Ref2Position", this.candidateProfile.ref2Position.toString());
      formData.append("Ref2Organisation", this.candidateProfile.ref2Organisation.toString());
      formData.append("Ref2Location", this.candidateProfile.ref2Location.toString());
      formData.append("Ref2ContactNo", this.candidateProfile.ref2ContactNo.toString());
      formData.append("Ref2EmailId", this.candidateProfile.ref2EmailId.toString());
      formData.append("Ref3Name", this.candidateProfile.ref3Name.toString());
      formData.append("Ref3Position", this.candidateProfile.ref3Position.toString());
      formData.append("Ref3Organisation", this.candidateProfile.ref3Organisation.toString());
      formData.append("Ref3Location", this.candidateProfile.ref3Location.toString());
      formData.append("Ref3ContactNo", this.candidateProfile.ref3ContactNo.toString());
      formData.append("Ref3EmailId", this.candidateProfile.ref3EmailId.toString());
      //formData.append("CriminalCase", this.candidateProfile.criminalCase.toString());
      formData.append("CriminalCase", this.criminalCaseChange == true ? (this.candidateProfile.criminalCase ? "1" : "0") : "-1");
      formData.append("CriminalCaseDetails", this.candidateProfile.criminalCaseDetails.toString());
      //formData.append("PreviousEmployemntEnquiry", this.candidateProfile.previousEmployemntEnquiry.toString());
      formData.append("PreviousEmployemntEnquiry", this.employmentEnquery == true ? (this.candidateProfile.previousEmployemntEnquiry ? "1" : "0") : "-1");
      formData.append("PreviousEmployemntEnquiryDetails", this.candidateProfile.previousEmployemntEnquiryDetails.toString());
      formData.append("AdditionoalDetails", this.candidateProfile.additionoalDetails.toString());
      formData.append("JobPortal", this.candidateProfile.jobPortal.toString());
      formData.append("LinkedIn", this.candidateProfile.linkedIn.toString());
      formData.append("CareerSite", this.candidateProfile.careerSite.toString());
      formData.append("PaperAdvertisement", this.candidateProfile.paperAdvertisement.toString());
      formData.append("EmployeeReferal", this.candidateProfile.employeeReferal.toString());
      formData.append("RefNameofEmployee", this.candidateProfile.refNameofEmployee.toString());
      formData.append("RefEmployeeId", this.candidateProfile.refEmployeeId.toString());
      formData.append("RefEmployeeDesignation", this.candidateProfile.refEmployeeDesignation.toString());
      formData.append("RefEmployeeLocation", this.candidateProfile.refEmployeeLocation.toString());
      formData.append("RefEmployeeFunction", this.candidateProfile.refEmployeeFunction.toString());
      formData.append("RefEmployeeKnowing", this.candidateProfile.refEmployeeKnowing.toString());
      formData.append("ConsultantApplicable", this.candidateProfile.consultantApplicable.toString());
      if (this.consultant == undefined) {
        formData.append("Consultant", "0");
      }
      else {
        formData.append("Consultant", this.consultant.toString());
      }
      formData.append("IsInternalRef", this.candidateProfile.isInternalRef.toString());

      if (this.candidateProfile.internalRefName == undefined) {
        formData.append("InternalRefName", "");
      }
      else {
        formData.append("InternalRefName", this.candidateProfile.internalRefName);
      }
      formData.append("OtherSource", this.candidateProfile.otherSource.toString());
      formData.append("joiningDaysRequired", this.candidateProfile.joiningDaysRequired.toString());
      formData.append("joiningComments", this.candidateProfile.joiningComments.toString());
      formData.append("expectedCTC", this.candidateProfile.expectedCTC.toString());
      formData.append("CandidateSignature", this.signaturefileToUpload);
      formData.append("ProfilePic", this.profilepic);
      this.candidateMembershipDetailsArray = [];
      for (var i = 0; i < this.membershipDetails.length; i++) {
        this.candidateMembershipDetailsArray.push({
          candidateProfileId: 0,
          membershipLineId: i,
          institution: this.membershipDetails[i].institution,
          classofMemberShip: this.membershipDetails[i].classofMemberShip,
          membershipFrom: this.membershipDetails[i].membershipFrom
        })
      }
      formData.append("MembershipDetails", JSON.stringify(this.candidateMembershipDetailsArray));
      this.candidateMRFPreInterviewArray = [];
      //formData.append("MRFPreInterviewDetails", JSON.stringify(this.candidateMRFPreInterviewArray));
      formData.append("SubmitStatus", submitStatus);
      if (submitStatus == "1") {
        formData.append("IsEnabled", "true");
      }
      else {
        formData.append("IsEnabled", "false");
      }
      formData.append("htmlfile", this.file);
      this.SpinnerService.show();
      this.candidateService.saveCandidateProfile(formData).subscribe((result) => {
        if (result.successFlag == 1) {
          this.notificationService.showSuccess(result.msg, "Success");
          jQuery("#confirmPopup").modal('hide');
          this.getCandidateProfile();
          this.SpinnerService.hide();
        }
        else {
          this.notificationService.showError(result.msg, "Error");
          this.SpinnerService.hide();
        }

      }, error => {
        // display form values on success
        this.notificationService.showError("Somethingggg went wrong.. Try again later..", "");
        this.SpinnerService.hide();
      });

    }
  }

  onSignatureFileChange(files: FileList) {
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.notificationService.showError("Only images are supported", "Error");
      return;
    }
    if (files[0].size > 90000) {
      this.notificationService.showError("Image should be less than 80KB!", "Error");
      this.signatureFileImport.nativeElement.innerText = "Choose file";
      this.signaturefileToUpload = null;
    } else {
      this.signatureFileImport.nativeElement.innerText = files[0].name;
      this.signaturefileToUpload = files.item(0);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.signatreData = reader.result;
        //this.applicationFormData.signature = reader.result; 
      }

    }
  }

  changeCommunicationAddress(evt) {
    this.candidateProfile.communicationAddress = evt;
    if (this.samePermanentAddress == true) {
      this.candidateProfile.permanentAddress = evt;
    }
  }
  onChangeEyesightCorrected(eve) {
    // alert("Eyesight" + eve);
    if (eve == 1) {
      this.candidateProfile.eyeSightCorrected = true;
    } else {
      this.candidateProfile.eyeSightCorrected = false;
      this.candidateProfile.eyeSightRight = "";
      this.candidateProfile.eyeSightLeft = "";
    }
  }
  onChangeHandicap(eve) {
    // alert("Handicap" + eve);
    if (eve == 1) {
      this.candidateProfile.handiCap = true;
    } else {
      this.candidateProfile.handiCap = false;
      this.candidateProfile.handiCapDetails = "";
    }
  }
  onChangeChronicIllness(eve) {
    // alert("Chronic" + eve)
    if (eve == 1) {
      this.candidateProfile.cronicMajorIllness = true;
    } else {
      this.candidateProfile.cronicMajorIllness = false;
      this.candidateProfile.cronicMajorIllnessDetails = "";
    }
  }
  // Anif
  phtourl:any
  openFileforphoto(blobName: string): void {
    let regex = /\.net(.*)/;
    let match = blobName.match(regex);
    let extractedString = match ? match[1] : '';
    let filename = extractedString.split('/')[2];
    let containername = extractedString.split('/')[1];
    this.locationService.getTestfile(filename,containername).subscribe(response => {
      let blob:Blob=response.body as  Blob;
      const url = window.URL.createObjectURL(blob);
      this.phtourl=url;
      this.convertBase64CandidatePhoto(this.phtourl);
    });
  }
  convertBase64CandidatePhoto(imageUrl: string) {
    this.getBase64ImageFromURL(imageUrl).subscribe((base64Data: string) => {
      this.applicationFormData.candiadatePhoto = base64Data;
    });
  }
  getBase64ImageFromURL(url: string): Observable<string> {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = err => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }
  getBase64Image(img: HTMLImageElement): string {
    // We create a HTML canvas object that will create a 2d image
    var canvas: HTMLCanvasElement = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    // This will draw image
    ctx.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    let dataURL: string = canvas.toDataURL("image/png");
    //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
  }
}
