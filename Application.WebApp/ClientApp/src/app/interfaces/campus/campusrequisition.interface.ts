export interface ICampusRequisitionDataArray{
    autoId:number;
    requisitionTypeId:number;
    requisitionTitle:string;
    functionId:number;
    collegeCategoryId:number;
    candidateCount:number;
}

export interface ICampusRequisitionDataDetailArray{
    autoId:number;
    requisitionTypeId:number;
    requisitionTypeName:string;
    requisitionTitle:string;
    functionId:number;
    functionName:string;
    collegeCategoryId:number;
    collegeCategoryName:string;
    candidateCount:number;
}

export interface ICampusRequisition{
    CampusYearId:number;
    VerticalId:number;
    LocationId:number;
    CampusCourseId:number;
    CampusStreamId:number;
    CampusRequisitionData:string;
    //RequisitionData:ICampusRequisitionDataArray[];
    CreatedBy:number;
}

export interface ICampusRequisitionList{
    requisitionDetailId:number;
    requisitionId:number;
    requisitionNo:string;
    requestedOn:string;
    campusYearName:string;
    verticalId:number;
    verticalName:string;
    functionId:number;
    functionName:string;
    campusCourseId:number;
    courseName:string;
    campusStreamId:number;
    streamName:string;
    collegeCategoryId:number;
    collegeCategoryName:string;
    candidateCount:number;
    candidateSelected:number;
    candidateJoined:number;
    statusName:string;
}

export interface ICampusLink{
    campusLinkId:number;
    campusYearId:number;
    campusYearName:string;
    campusCourseId:number;
    courseName:string;
    campusLink:string;
    campusForId:number;
    campusForName:string;
    createdOn:string;
    candidateCount:number;
    campusTemplate:string;
    disableStatus:number;
}

export interface ISearchCampusLink{
    campusCourseId:number;
    campusYearId:number;
    campusLinkId:number;
    createdBy:number;
}

export interface ICampusLinkFormData{
    campusYearId:number;
    campusCourseId:number;
    campusForId:number;
    campusTemplate:string;
    createdBy:number;
}

export interface ICampusCollegeLinkFormData{
    campusLinkId:number;
    campusCollegeIds:string;
    createdBy:number;
}

export interface ISharedCampusCollegeLink{
    campusCollegeId:number;
    collegeName:string;
    countryId:number;
    countryName:string;
    stateId:number;
    statename:string;
    collegeAddress:string;
    collegeCategoryId:number;
    collegeCategoryName:string;
    contactName:string;
    contactDesignation:string;
    contactEmailId:string;
    contactNo:string;
    isActive:boolean;
    campusLinkStatus:number;
}

export interface ISearchCampusCollegeLinklSharedList{
    campusLinkId:number;
    stateId:number;
    collegeCategoryId:number;
}

export interface ISearchCampusRequisitionTitle{
    campusYearId:number;
    campusCourseId:number;
}

export interface ICampusRequisitionTitleList{
    campusYearId:number;
    campusCourseId:number;
    requisitionDetailId:number;
    requisitionTitle:string;
    verticalId:number;
}

export interface ICampusCandidateList{
    campusLinkId:number;
    candidateNo:string;
    candidateId:number;
    fullName:string;
    genderId:number;
    genderName:string;
    dob:string;
    age:string;
    emailId:string;
    contactNo:string;
    aadharNo:string;
    highestQualification:string;
    course:string;
    stream:string;
    institute:string;
    verticalId:number;
    verticalName:string;
    functionId:number;
    functionName:string;
    resume:string;
    hrFeedbackCount:number;
    assessmentCount:number;
    applicationCount:number;
    hiringStatusId:number;
    hiringStatusName:string;
}


export interface ISearchCampusCandidate {
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
    CampusLinkId: number;
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
}
export interface ISearchCampusCandidateNew {
    CandidateNo: string;
    CandidateName: string;
    HiringStatusId: number;
    GenderIds: string;
    FromAge: number;
    ToAge: number;
    AadharNo: string;
    ContactNo: string;
    EmailId: string;
    MotherTongueIds: string;
    NativeStateIds: number;
    PresentStateIds: number;
    InstitutionIds: string;
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
    CampusLinkId: number;
    FromDate: string;
    ToDate: string;
    FromHeight: number;
    ToHeight: number;
    FromWeight: number;
    ToWeight: number;
    Disability:string;
    Health:string;
    EyeSightCorrected:string;
    Siblings:string;
    Commitment:string;
    WorkingShift:string;
    JobTypePriyority:string;
    CriticalFactor:string;
    ExtraCurricularActivity:string;
    LanguageIds:string;
    FromExperience: number;
    ToExperience: number;
    CompletionYears: string;
    QualificationTypeIds: string;
    CurrentEmployer: string;
    Designation: string;
    RelativeStatus: string;
    PreviousApplied: number;
    FatherOccupation:number;
    MotherOccupation:number;
}
export interface ICampusCandidateHiringStatusFormData{
    candidateIds: string,
    campusLinkId: number,
    createdBy: number,
    remarks: string,
    hiringStatusId: number
}

export interface ICampusTestScheduleFormData{
    CampusLinkId:number;
    TestTypeId:number;
    TestLink:string;
    TestFromDate:string;
    TestToDate:string;
    TestVenueName:string;
    TestContactName:string;
    TestContactNo:string;
    IsTestTravel:boolean;
    TestEmailTemplateId:number;
    TestEmailTemplate:string;
    CandidateIds:string;
    CreatedBy:number;
    EmailId: string;
}
export interface ICampusTestScheduleFormDataForUpdate{
    CampusLinkId:number;
    TestTypeId:number;
    TestLink:string;
    TestFromDate:string;
    TestToDate:string;
    TestVenueName:string;
    TestContactName:string;
    TestInstituteEmail:string;
    TestContactNo:string;
    IsTestTravel:boolean;
    TravelModes:string;
    TestEmailTemplateId:number;
    TestEmailTemplate:string;
    CandidateIds:string;
    CreatedBy:number;
    EmailId: string;
  //TestVenueId: number;
  TestVenueAddress: string;
}
export interface ICampusTalkScheduleFormData{
    placementScheduleMasterId:number;
    CampusLinkId:number;
    TalkTypeId:number;
    TalkLink:string;
    TalkFromDate:string;
    TalkToDate:string;
    TalkVenueName:string;
    TalkContactName:string;
    TalkContactNo:string;  
    TalkEmailTemplate:string;
    CandidateIds:number;
    CreatedBy:number;
    InstituteEmailId:string;
    EmailId: string
}
export interface ICampusTalkScheduleFormDataNew{
    placementScheduleMasterId:number;
    CampusLinkId:number;
    TalkTypeId:number;
    TalkLink:string;
    TalkFromDate:string;
    TalkToDate:string;
    TalkVenueName:string;
    TalkContactName:string;
    TalkContactNo:string;  
    TalkEmailTemplate:string;
    CandidateIds:string;
    CreatedBy:number;
    InstituteEmailId:string;
    EmailId: string
}
export interface TCampusTestScheduleDetail{
    venueId: any;
    testScheduleDetailId:number;
    candidateId:number;
    testTypeId:number;
    testLink:string;
    fromDate:string;
    toDate:string;
  venueName: string;
  venueAddress: string;
    contactPersonName:string;
    instituteEmailId:string;
    contactNo:string;
    isTravel:boolean;
    travelModes:string;
    emailTemplateId:number;
}
export interface TCampusTalkScheduleDetail {
  placementScheduleDetailId: number;
  candidateId: number;
  talkTypeId: number;
  TALKLINK: string;
  fromDate: string;
  toDate: string;
  venueName: string;
  instituteEmailId: string;
  contactPersonName: string;
  contactNo: string;
  emailTemplate: number;
}

export interface ISearchCampusTestScheduleDetail{
    candidateId:number;
    requisitionDetailId:number;
    campusLinkId:number;
}
export interface ISearchCampusTalkScheduleDetail {
  candidateId: number;
  campusLinkId: number;
}

export interface ISearchCampusTestResult{
    requisitionDetailId:number;
    campusLinkId:number;
    candidateId:number;
}

export interface ICampusTestResult{
    requisitionDetailId:number;
    campusLinkId:number;
    attemptId:string;
    testPin:string;
    candidateNo:string;
    fullName:string;
    emailId:string;
    aadharNo:string;
    contactNo:string;
    DOB:string;
    testCompletionDate:string;
    scoreObtained:number;
    apptitude:number;
    readingExercise:number;
    writtenExercise:number;
    technical:number;
    testResult:number;
}

export interface ICampusTestResult1{
  AttemptId: string;
  TestPin: string;
  CandidateNo: string;
  FullName: string;
  EmailId: string;
  AadharNo: string;
  ContactNo: string;
  DOB: string;
  TestCompletionDate: string;
  ScoreObtained: number;
  Aptitude: number;
  ReadingExercise: number;
  WrittenExercise: number;
  Technical: number;
  TestResult: number;
}

export interface ICampusInterviewScheduleFormData{
    CampusLinkId:number;
    InterviewId:number;
    VerticalId:number;
    FunctionId:number;
    InterviewTypeId:number;
    InterviewLink:string;
    InterviewRoomId:number;
    FromDate:string;
    ToDate:string;
    InterviewSlot:string;
    VenueName:string;
    HRAutoUserIds:string;
    InterviewerAutoUserIds:string;    
    IsAccomodation:boolean;
    AccomodationDetails:string;
    IsFormAnexture:boolean;
    ScheduleComments:string;
    IsTravel:boolean;
    TravelModes:string;
    EmailTemplateId:number;
    EmailTemplate:string;
    CandidateIds:string;
    CreatedBy:number;
    EmailId: string;
}
export interface ICampusForInterviewScheduleFormData{
    CampusLinkId:number;
    InterviewId:number;
    VerticalId:number;
    FunctionId:number;
    InterviewTypeId:number;
    InterviewLink:string;
    InterviewRoomId:number;
    FromDate:string;
    ToDate:string;
    InterviewSlot:string;
    VenueName:string;
    HRAutoUserIds:string;
    InterviewerAutoUserIds:string;    
    IsAccomodation:boolean;
    AccomodationDetails:string;
    IsFormAnexture:boolean;
    ScheduleComments:string;
    IsTravel:boolean;
    TravelModes:string;
    EmailTemplateId:number;
    EmailTemplate:string;
    CandidateIds:string;
    CreatedBy:number;
    ContactName: string;
    ContactNo: string;
  EmailId: string;
  InterviewVenueAddress: string;//Piu
}
//argh


export interface ISearchCampusInterviewScheduleDetail{
    candidateId:number;
    requisitionDetailId:number;
    campusLinkId:number;
}

export interface ICampusInterviewScheduleDetail{
    interviewDetailId:number;
    candidateId:number;
    verticalId:number;
    functionId:number;
    interviewId:number;
    interviewRoomId:number;
    interviewTypeId:number;
    interviewLink:string;
    fromDate:string;
    toDate:string;
    interviewSlot:string;
    venueName:string;
    hrAutoUserIds:string;
    interviewerAutoUserIds:string;
    isAccomodation:boolean;
    accomodationDetails:string;
    isTravel:boolean;
    travelModes:string;
    isFormAnexture:boolean;
    scheduleComments:string;
    emailTemplateId:number;
}
