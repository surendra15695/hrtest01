export interface ISearchInterviewCalendar{
    AutoUserId:number;
    InterviewId:number;
    PositionId:number;
    VenueId:number;
    InterviewTypeId:number;
    HiringStatusId:number;
    FunctionId:number;
    DepartmentId:number;
    LocationId:number;
    FromDate:string;
    ToDate:string;
    AcceptStatus:number;
}

export interface IInterviewCalendarList{
    calendarId:number;
    candidateId:number;
    candidateNo:string;
    requisitionDetailId:number;
    fullName:string;
    interviewName:string;
    venueName:string;
    interviewType:string;
    functionName:string;
    departmentName:string;
    locationNo:string;
    locationOffice:string;
    positionName:string;
    hiringStatusId:number;
    hiringStatusName:string;
    scheduleComments:string;
    fromDate:string;
    toDate:string;
    interviewSlot:string;
    referalEmpNo:string;
    referalDesignation:string;
    referalGrade:string;
    calendarAcceptStatusId:number;
    calendarAcceptStatusName:string;
    assessmentFilledStatus:string;
    popoverContent:string;
    hrPanel:number;
    applicationCount:number;
}

export interface ICalendarList{
    interviewName: string;
    venueName: string;
    interviewType: string;
    functionName: string;
    departmentName: string;
    locationNo: string;
    locationOffice: string;
    positionName: string;
    calendarAcceptStatusId: number;
    calendarAcceptStatusName: string;
    fromDate: string;
    noOfCandidate: number;
}

export interface IInterviewCalendarActionFormData{
    CalendarIds:string;
    AcceptStatus:number;
    Remarks:string;
    CreatedBy:number;
}
export interface IInterviewCalendarActionFormDataNew{
    CalendarIds:string;
    AcceptStatus:number;
    Remarks:string;
    CreatedBy:number;
    CandidateId: string;
}
//arg
export interface IInterviewCalendarAssessmentListData{
    CalendarId:number;
    PersonalityScore:number;
    CommunicationScore:number;
    SubjectScore:number;
    ApptitudeScore:number;
    OverallScore:number;
    // NoticePeriod:number;
    // ExpectedSalary:number;
    NoticePeriod:string;
    ExpectedSalary:string;
    StateId:number;
    PreferredLocation:string;
    OtherComments:string;
    ActionStatus:number;
}

export interface IInterviewCalendarAssessmentFormData{
    InterviewCalendarAssessmentData:IInterviewCalendarAssessmentListData[];
    CreatedBy:number;
    CandidateIds:string;
}

export interface ISearchInterviewCalendarAssessment{
    CalendarIds:string;
    CandidateId:number;
    RequisitionDetailId:number;
}

export interface IInterviewCalendarAssessmentList{
    calendarId:number;
    candidateId:number;
    candidateNo:string;
    fullName:string;
    requisitionDetailId:number;
    positionName:string;
    interviewName:string;
    interviewDate:string;
    personalityScore:number;
    communicationScore:number;
    subjectScore:number;
    apptitudeScore:number;
    overallScore:number;
    // noticePeriod:number;
    // expectedSalary:number;
    noticePeriod:string;
    expectedSalary:string;
    stateId:number;
    preferredLocation:string;
    otherComments:string;
    actionStatus:number;
    InterviewerName:string;
    stateName:string;
    actionStatusName:string;
}

export interface IInterviewAssesmentRecord{
    fullName:string;
    positionName:string;
    interviewName:string;
    interviewDate:string;
    assessmentList:IInterviewCalendarAssessmentList[];
}

export interface IInterviewFeedbackFormData{
    calendarId:number;
    medicalDetails:string;
    parentIncomeDetails:string;
    dependentDetails:string;
    higherStudiesDetails:string;
    underStandingDetails:string;
    createdBy:number;
}

export interface ISearchInterviewFeedback{
    candidateId:number;
    calendarId:number;
    requisitionDetailId:number;
}

export interface IInterviewFeedback{
    calendarId:number;
    candidateId:number;
    candidateNo:string;
    fullName:string;
    requisitionDetailId:number;
    positionName:string;
    interviewName:string;
    medicalDetails:string;
    parentIncomeDetails:string;
    dependentDetails:string;
    higherStudiesDetails:string;
    underStandingDetails:string;
    createdByName:string;
}

export interface IInterviewHRFeedbackRecord{
    fullName:string;
    positionName:string;
    interviewName:string;
    assessmentList:IInterviewFeedback[];
}

export interface IInterviewClarificationList{
    calendarId:number;
    remarks:string;
    createdByName:string;
}

export interface ISearchInterviewClarificationList{
    calendarId:number;
    requisitionDetailId:number;
    candidateId:number;
}

export interface IInterviewClarificationListData{
    calendarId:number;
    createdByName:string;
    clarificationCount:boolean;
    clarificationData:IInterviewClarificationData[];
}

export interface IInterviewClarificationData{
    remarks:string;
    createdByName:string;
}

export interface ISearchinterviewCalenderClarification {
  calendarId: number;
  requisitionDetailId: number;
  candidateId: number;
}
export interface IinterviewCalendarReportList {
  candidateId: number;
  candidateNo: string;
  fullName: string;
  positionName: string;
  verticalName: string;
  functionName: string;
  departmentName: string;
  postingLocation: string;
  interviewDate: string;
  interviewName: string;
  interviewVenue: string;
  modeOfInterview: string;
  interviewStatus: string;
  interviewPanelMembers: string;
  applicationFormStatus: number;
  hrFeedBackStatus: number;
  assessmentStatus: number;
  hiringStatusName: string;

}
export interface IAllocatedUserLists {
  assignedRole: string;
  assignedRoleName: string;
  autoUserId: number;
  createdBy: number;
  employeeName: string;
  functionId: number;
  functionName: string;
  isActive: boolean;
  verticalId: number;
  verticalName: string;
  empNo: number;
}
export interface ISearchAllocatedUser {
  userId: number;
  roleIds: number;
  isActive: boolean
}



