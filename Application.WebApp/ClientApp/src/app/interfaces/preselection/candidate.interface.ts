// import { Interface } from "readline";

export interface ICandidate {
    candidateNo: string;
    candidateId: number;
    prefixId: number;
    prefix: string;
    fullName: string
    genderId: number;
    genderName: string;
    age: number;
    dOB: string;
    emailId: string;
    contactNo: string;
    aadharNo: string;
    motherTongueId: number;
    motherTongue: string;
    laguageIds: string;
    languages: string;
    qualificationId: number;
    qualification: string;
    courseId: number;
    course: string;
    stream: string;
    streamId: number;
    marksPercentage: any;
    completionYear: number;
    qualificationTypeId: number;
    qualificationType: string;
    experienceYear: number;
    experienceMonth: number;
    currentCTC: any;
    currentEmployer: string;
    currentDesignation: string;
    domainId: number;
    domain: string;
    subDomainId: number;
    subDomain: string;
    stateId: number;
    state: string;
    previousApplied: boolean;
    relativeStatus: boolean;
    relativeName: string;
    relativeContactNo: string;
    parentRelationshipId: number;
    childRelationshipId: number;
    relationshipNotes: string;
    cmdApprovalRequired: number;
    cmdApprovalStatus: boolean;
    cmdApprovalNo: string;
    cmdApprovalDocument: string;
    resume: string;
    isemployee: boolean;
    createdBy: number;
    status: string;
}
export interface ISearchCandidate {
    candidateId: number;
    isActive: boolean;
    search: string;
}

export interface ICandidateCMDStatus {
    candidateId: number;
    cmdApprovalRequired: number;
    cmdApprovalStatus: boolean;
    cmdApprovalNo: string;
    cmdApprovalDocument: string;
}
export interface ICandidateDetail {
    candidateNo: string;
    candidateId: number;
    prefix: string;
    fullName: string
    genderName: string;
    age: number;
    dOB: string;
    emailId: string;
    contactNo: string;
    aadharNo: string;
    motherTongue: string;
    languages: string;
    qualification: string;
    course: string;
    stream: string;
    marksPercentage: any;
    completionYear: number;
    qualificationType: string;
    experienceYear: number;
    experienceMonth: number;
    currentCTC: any;
    currentEmployer: string;
    currentDesignation: string;
    domain: string;
    subDomain: string;
    stateId: number;
    state: string;
    previousApplied: boolean;
    relativeStatus: boolean;
    relativeName: string;
    relativeContactNo: string;
    parentRelationshipId: number;
    childRelationshipId: number;
    relationshipNotes: string;
    cmdApprovalRequired: number;
    cmdApprovalStatus: boolean;
    cmdApprovalNo: string;
    cmdApprovalDocument: string;
    resume: string;
    isemployee: boolean;
    status: string;
    sourceChannelName: string;
    createdBy: string;
    testOption: number;
    hrFeedbackCount: number;
    assessmentCount: number;
    applicationCount: number;
    clarificationCount: number;
}

export interface ICandidateStatus {
    requisitionId: number;
    candidateId: number;
    statusId: number;
    createdBy: number;
    remarks: string;
}

export interface ICandidateDetailData {
    candidateNo: string;
    candidateId: number;
    prefixId: number;
    prefixName: string;
    fullName: string;
    genderId: number;
    genderName: string;
    dob: string;
    age: number;
    emailId: string;
    contactNo: string;
    aadharNo: string;
    motherTongueId: number
    motherTongueName: string;
    laguageIds: string;
    languageNames: string;
    qualificationId: number;
    qualificationName: string;
    courseId: number;
    courseName: string;
    streamId: number;
    streamName: string;
    marksPercentage: string;
    completionYear: number;
    qualificationTypeId: number;
    qualificationTypeName: string;
    experienceYear: number;
    experienceMonth: number;
    currentCTC: string;
    currentEmployer: string;
    currentDesignation: string;
    domainId: number;
    domainName: string;
    subDomainId: number;
    subDomainName: string;
    stateId: number;
    stateName: string;
    previousApplied: number;
    previousAppliedName: string;
    relativeStatus: number;
    relativeStatusName: string;
    relativeName: string;
    relativeContactNo: string;
    sourceChannelId: number;
    sourceChannelName: string;
    createdBy: number;
    candidateOwner: string;
    hiringStatusId: number;
    hiringStatusName: string;
    prevHiringId: number;
    resume: string;
    referalEmpNo: string;
    referalDesignation: string;
    referalGrade: string;
    parentRelationshipId: number;
    childRelationshipId: number;
    parentRelationshipName: string;
    childRelationshipName: string;
    relationshipNotes: string;
    cmdApprovalRequired: number;
    cmdApprovalStatus: number;
    cmdApprovalNo: string;
    cmdApprovalDocument: string;
    popoverContent: string;
    cmdUpdateStatus: number;
    testOption: number;
    hrFeedbackCount: number;
    assessmentCount: number;
    applicationCount: number;
  clarificationCount: number;
  isInternal: boolean;
  managementApprovalFlag: boolean;
  ohMailId: string;
  ocMailId: string;
  omMailId: string;
  htMailId: string;
  statusFlag: number;
}
export interface ICandidateDetailDataNew {
    candidateNo: string;
    candidateId: number;
    candiadatePhoto: string;
    prefixId: number;
    prefixName: string;
    fullName: string;
    genderId: number;
    genderName: string;
    dob: string;
    age: number;
    emailId: string;
    contactNo: string;
    aadharNo: string;
    motherTongueId: number
    motherTongueName: string;
    laguageIds: string;
    languageNames: string;
    qualificationId: number;
    qualificationName: string;
    courseId: number;
    courseName: string;
    streamId: number;
    streamName: string;
    marksPercentage: string;
    completionYear: number;
    qualificationTypeId: number;
    qualificationTypeName: string;
    experienceYear: number;
    experienceMonth: number;
    currentCTC: string;
    currentEmployer: string;
    currentDesignation: string;
    domainId: number;
    domainName: string;
    subDomainId: number;
    subDomainName: string;
    stateId: number;
    stateName: string;
    previousApplied: number;
    previousAppliedName: string;
    relativeStatus: number;
    relativeStatusName: string;
    relativeName: string;
    relativeContactNo: string;
    sourceChannelId: number;
    sourceChannelName: string;
    createdBy: number;
    candidateOwner: string;
    hiringStatusId: number;
    hiringStatusName: string;
    prevHiringId: number;
    resume: string;
    referalEmpNo: string;
    referalDesignation: string;
    referalGrade: string;
    parentRelationshipId: number;
    childRelationshipId: number;
    parentRelationshipName: string;
    childRelationshipName: string;
    relationshipNotes: string;
    cmdApprovalRequired: number;
    cmdApprovalStatus: number;
    cmdApprovalNo: string;
    cmdApprovalDocument: string;
    popoverContent: string;
    cmdUpdateStatus: number;
    testOption: number;
    hrFeedbackCount: number;
    assessmentCount: number;
    applicationCount: number;
  clarificationCount: number;
  isInternal: boolean;
  managementApprovalFlag: boolean;
  ohMailId: string;
  ocMailId: string;
  omMailId: string;
  htMailId: string;
  statusFlag: number;
}
export interface ICandidateDetailDataForPosition {  //Arnab
    candidateNo: string;
    candidateId: number;
    prefixId: number;
    prefixName: string;
    fullName: string;
    genderId: number;
    genderName: string;
    dob: string;
    age: number;
    emailId: string;
    contactNo: string;
    aadharNo: string;
    motherTongueId: number
    motherTongueName: string;
    laguageIds: string;
    languageNames: string;
    qualificationId: number;
    qualificationName: string;
    courseId: number;
    courseName: string;
    streamId: number;
    streamName: string;
    marksPercentage: string;
    completionYear: number;
    qualificationTypeId: number;
    qualificationTypeName: string;
    experienceYear: number;
    experienceMonth: number;
    currentCTC: string;
    currentEmployer: string;
    currentDesignation: string;
    domainId: number;
    domainName: string;
    subDomainId: number;
    subDomainName: string;
    stateId: number;
    stateName: string;
    previousApplied: number;
    previousAppliedName: string;
    relativeStatus: number;
    relativeStatusName: string;
    relativeName: string;
    relativeContactNo: string;
    sourceChannelId: number;
    sourceChannelName: string;
    createdBy: number;
    candidateOwner: string;
    hiringStatusId: number;
    hiringStatusName: string;
    prevHiringId: number;
    resume: string;
    referalEmpNo: string;
    referalDesignation: string;
    referalGrade: string;
    parentRelationshipId: number;
    childRelationshipId: number;
    parentRelationshipName: string;
    childRelationshipName: string;
    relationshipNotes: string;
    cmdApprovalRequired: number;
    cmdApprovalStatus: number;
    cmdApprovalNo: string;
    cmdApprovalDocument: string;
    popoverContent: string;
    cmdUpdateStatus: number;
    testOption: number;
    hrFeedbackCount: number;
    assessmentCount: number;
    applicationCount: number;
  clarificationCount: number;
  isInternal: boolean;
  managementApprovalFlag: boolean;
  ohMailId: string;
  ocMailId: string;
  omMailId: string;
  htMailId: string;
  statusFlag: number;
  requisitionNo: string;
  positionName: string;
}

export interface ISearchCandidateDetail {
    CandidateId: number;
    CandidateName: string;
    HiringStatusId: number;
    GenderIds: string;
    FromAge: number;
    ToAge: number;
    AadharNo: string;
    ContactNo: string;
    EmailId: string;
    MotherTongueIds: string;
    QualificationIds: string;
    CourseIds: string;
    StreamIds: string;
    FromPercentage: number;
    ToPercentage: number;
    DomainIds: string;
    SubDomainIds: string;
    StateIds: string;
    SourceChannelId: string;
    CreatedBy: number;
    RequisitionDetailId: number;
    FromDate: string;
    ToDate: string;
    FromExperience: number;
    ToExperience: number;
    CompletionYears: string;
    QualificationTypeIds: string;
    CurrentEmployer: string;
    Designation: string;
    RelativeStatus: string;
  PreviousApplied: number;
  //CandidateOwner: string;
}
export interface IcandidateremarksList{
    CandidateId: number;
    RequisitionDetailId: number;
    HiringStatusId: number;
    IsActive: boolean;
}//argg

export interface InaukriCandidate{
    RequisitionDetailId: number;
}

export interface Ifiltercandidate {
    CandidateId: number;
    HiringStatusId: String;
    formDate: String;
    RequisitionDetailId : Boolean; 
}
export interface IfiltercandidateNew {     //arg
    CandidateId: number;
    CandidateName: string;
    HiringStatusId: string;
    //formDate: string;
    RequisitionDetailId : number; 
    CandidateNo: string;
    GenderIds: string;
    FromAge: number;
    ToAge: number;
    AadharNo: string;
    ContactNo: string;
    EmailId: string;
    MotherTongueIds: string;
    LanguageKnownIds: string;
    QualificationIds: string;
    CourseIds: string;
    StreamIds: string;
    FromPercentage: number;
    ToPercentage: number;
    DomainIds: string;
    SubDomainIds: string;
    StateIds: string;
    SourceChannelId: string;
    CreatedBy: number;
    FromDate: string;
    ToDate: string;
    FromExperience: number;
    ToExperience: number;
    CompletionYears: string;
    QualificationTypeIds: string;
    CurrentEmployer: string;
    Designation: string;
    RelativeStatus: string;
    PreviousApplied: string;
    CandidateOwner: string;
    University: string;
    Institution: string;
    ApplicationCount: string;
    RequisitionStatus: string;
    RequisitionNo: string;
    VerticalId: string;
    FunctionId: string;
    LocationId: string;
    Interview: string;
    InterviewassessmentForm: string;
    RefferedVerticalId: number;
    RefferedFunctionId: number;
    RefferedDepartmentId: number;
    pagesize:number;
    pagenumber:number;
}
       
export interface cvdropcandidatedetail {
    CandidateId: number;
    HiringStatusId: String;
    formDate: String;
    requisitionMapped : Boolean; 
    requisitionDetailId : number;
}

export interface ISearchCandidateOwner {
  CandidateId: number;
  CandidateName: string;
  HiringStatusId: number;
  GenderIds: string;
  FromAge: number;
  ToAge: number;
  AadharNo: string;
  ContactNo: string;
  EmailId: string;
  MotherTongueIds: string;
  QualificationIds: string;
  CourseIds: string;
  StreamIds: string;
  FromPercentage: number;
  ToPercentage: number;
  DomainIds: string;
  SubDomainIds: string;
  StateIds: string;
  SourceChannelId: string;
  CreatedBy: number;
  RequisitionDetailId: number;
  FromDate: string;
  ToDate: string;
  FromExperience: number;
  ToExperience: number;
  CompletionYears: string;
  QualificationTypeIds: string;
  CurrentEmployer: string;
  Designation: string;
  RelativeStatus: string;
  PreviousApplied: number;
  CandidateOwner: string;
}

export interface IModeOfJoining {
    modeofJoiningId: number;
    modeofJoiningName: string;
    isActive: boolean;
}
export interface ISearchModeOfJoining {
    modeofJoiningId: number;
    isActive: number;
}
export interface ICandidateJoiningFormDetailsForPDF {
    candidateJoiningFormId: number;
    candidateId: number;
    requisitionDetailId: number;
    fullName: string;
    dob: string;
    bloodGroupName: string;
    residentialAddress: string;
    residentialPin: string;
    permanentAddress: string;
    permanentPin: string;
    emailId: string;
    phoneNo: string;
    date: string;
    employeeNo: string;
    joiningLetterDate: string;
    joiningDate: string;
    signatureDate: string;
    signaturePlace: string;
    signature: string;
    grade: string;
    position: string;
    location: string;
    designation: string;
    designatedPersonName: string;
    designatedPersonDesignation: string;
    designatedPersonEmployeeNo: string;
    designatedPersonDepartment: string;
    designatedPersonPAN: string;
    designatedPersonMobileNo: string;
    designatedPersonInstitute: string;
    designatedPersonPastEmployer: string;
    designatedPersonNoofSecurity: string;
    financialRelationshipName: string;
    financialRelationshipPAN: string;
    financialRelationshipMobileNo: string;
    accidentalPolicyNominee: string;
    accidentalPolicyRelationShipName: string;
    accidentalPolicyNomineeAddress: string;
    accidentalPolicyHolderName: string;
    familyDetail: ICandidateJoiningFormFamilyDetailData[];
    immediateRelativeDetail: CandidateJoiningFormRelativeDetailData[];
}
export interface ICandidateJoiningFormFamilyDetailData {
    candidateJoiningFormId: number;
    candidateJoiningFamilyLineId: number;
    familyName: string;
    familyRelationShip: string;
    familyRelationShipName: string;
    familyDOB: string;
}

export interface CandidateJoiningFormRelativeDetailData {
    candidateJoiningFormId: number
    candidateImmediateRelativesLineId: number
    immediateRelativesName: string;
    immediateRelativesPAN: string;
    immediateRelativesPhone: string;
    immediateRelativesNoofSecurity: number;
}

export interface IJoiningFormFamilyDetailsPDF {
    candidateName: string;
    dob: string;
    bloodGroup: string;
    residentialAddress: string;
    residentialPIN: string;
    permanentAdress: string;
    permanentPIN: string;
    email: string;
    mobile: string;
    signatureDate: string;
    //documentPath:string;
    familyMemberList: IFamilyMemberList[];

}

export interface IJoiningFormFamilyDetailsPDFForUpload {
    candidateName: string;
    dob: string;
    bloodGroup: string;
    residentialAddress: string;
    residentialPIN: string;
    permanentAdress: string;
    permanentPIN: string;
    email: string;
    mobile: string;
    signatureDate: string;
    documentPath:string;
    familyMemberList: IFamilyMemberList[];

}
export interface IFamilyMemberList {
    memberName: string;
    relationwithEmployee: string;
    memberDOB: string;
}
export interface IJoiningReportPDF {
    candidateName: string;
    employeeNo: string;
    grade: string;
    location: string;
    department: string;
    probation: string;
    date: string;
    joiningDate: string;
    designation: string;
}

export interface IJoiningReportPDFForUpload {
    candidateName: string;
    employeeNo: string;
    grade: string;
    location: string;
    department: string;
    probation: string;
    date: string;
    joiningDate: string;
    designation: string;
    documentPath:string;
}
export interface IAccidentInsurancePolicyPDF {
    accidentPolicyRelationShipName: string;
    accidentPolicyNomineeName: string;
    accidentPolicyNomineeAddress: string;
    accidentPolicyHolderName: string;
}
export interface IAccidentInsurancePolicyPDFForUpload {
    accidentPolicyRelationShipName: string;
    accidentPolicyNomineeName: string;
    accidentPolicyNomineeAddress: string;
    accidentPolicyHolderName: string;
    documentPath:string;
}
export interface ISEBIDisclosurePDF {
    designatedPersonName: string;
    designatedPersonEmployeeNo: string;
    designatedPersonDepartment: string;
    designatedPersonDesignation: string;
    designatedPersonPAN: string;
    designatedPersonMobile: string;
    designatedPersonInstitute: string;
    designatedPersonPastEmployer: string;
    designatedPersonNoOfSecurityHeld: string;
    currentDate: string;
    financialRelationshipName: string,
    financialRelationshipPAN: string,
    financialRelationshipMobileNo: string,
    signatureDate: string,
    signaturePlace: string,
    immediateRelatives: IImmediateRelatives[];
}
export interface ISEBIDisclosurePDFForUpload {
    designatedPersonName: string;
    designatedPersonEmployeeNo: string;
    designatedPersonDepartment: string;
    designatedPersonDesignation: string;
    designatedPersonPAN: string;
    designatedPersonMobile: string;
    designatedPersonInstitute: string;
    designatedPersonPastEmployer: string;
    designatedPersonNoOfSecurityHeld: string;
    currentDate: string;
    financialRelationshipName: string,
    financialRelationshipPAN: string,
    financialRelationshipMobileNo: string,
    signatureDate: string,
    signaturePlace: string,
    documentPath:string;
    immediateRelatives: IImmediateRelatives[];
}
export interface IImmediateRelatives {
    immediateRelativesName: string;
    immediateRelativesPAN: string;
 iImmediateRelativesPhone: string,
    immediateRelativesNoofSecurity: number;
}


export interface ICandidateCVData {
  candidateNo: string;
  candidateId: number;
  CandidateIds: string;
  prefixId: number;
  prefixName: string;
  fullName: string;
  genderId: number;
  genderName: string;
  dob: string;
  age: number;
  emailId: string;
  contactNo: string;
  aadharNo: string;
  motherTongueId: number
  motherTongueName: string;
  laguageIds: string;
  languageNames: string;
  qualificationId: number;
  qualificationName: string;
  courseId: number;
  courseName: string;
  streamId: number;
  streamName: string;
  marksPercentage: string;
  completionYear: number;
  qualificationTypeId: number;
  qualificationTypeName: string;
  experienceYear: number;
  experienceMonth: number;
  currentCTC: string;
  currentEmployer: string;
  currentDesignation: string;
  domainId: number;
  domainName: string;
  subDomainId: number;
  subDomainName: string;
  stateId: number;
  stateName: string;
  previousApplied: number;
  previousAppliedName: string;
  relativeStatus: number;
  relativeStatusName: string;
  relativeName: string;
  relativeContactNo: string;
  sourceChannelId: number;
  sourceChannelName: string;
  createdBy: number;
  candidateOwner: string;
  hiringStatusId: number;
  hiringStatusName: string;
  resume: string;
  referalEmpNo: string;
  referalDesignation: string;
  referalGrade: string;
  parentRelationshipId: number;
  childRelationshipId: number;
  parentRelationshipName: string;
  childRelationshipName: string;
  relationshipNotes: string;
  cmdApprovalRequired: number;
  cmdApprovalStatus: number;
  cmdApprovalNo: string;
  cmdApprovalDocument: string;
  popoverContent: string;
  cmdUpdateStatus: number;
  testOption: number;
  hrFeedbackCount: number;
  assessmentCount: number;
  applicationCount: number;
  clarificationCount: number;
  checked: boolean;
  requisitionDetailId: number;
  Position :string;
  Department:string;
  Location:string;
  state:string;
  Requisitionno:string;
}
