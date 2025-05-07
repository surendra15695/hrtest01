
export interface IInterviewScheduleFormData{
    RequisitionDetailId:number;
    InterviewId:number;
    InterviewTypeId:number;
    InterviewLink:string;
    InterviewRoomId:number;
    FromDate:string;
    ToDate:string;
    InterviewSlot:string;
    VenueId:number;
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
    CreatedBy: number;
    EmailId: string;
    VenueName: string;
    VanueAddress: string;
    ContactName: string;
    ContactNo: string;
    candidateNo: string;
    travelModeDesc: string;
    interviewAccomodationDetails: string;
}

export interface ISearchInterviewScheduleDetail{
    candidateId:number;
    requisitionDetailId:number;
}

export interface IInterviewScheduleDetail{
    interviewDetailId:number;
    candidateId:number;
    interviewId:number;
    interviewRoomId:number;
    interviewTypeId:number;
    interviewLink:string;
    fromDate:string;
    toDate:string;
    interviewSlot:string;
    venueId:number;
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
export interface IInterviewScheduleDetailUpdate{
    interviewDetailId:number;
    candidateId:number;
    interviewId:number;
    interviewRoomId:number;
    interviewTypeId:number;
    interviewLink:string;
    fromDate:string;
    toDate:string;
    interviewSlot:string;
    venueId:number;
    hrAutoUserIds:string;
    interviewerAutoUserIds:string;
    isAccomodation:boolean;
    accomodationDetails:string;
    isTravel:boolean;
    travelModes:string;
    isFormAnexture:boolean;
    scheduleComments:string;
    emailTemplateId:number;
    venueName: string;
}

export interface IInterviewScheduleDetailUpdateNew{
    interviewDetailId:number;
    candidateId:number;
    interviewId:number;
    interviewRoomId:number;
    interviewTypeId:number;
    interviewLink:string;
    fromDate:string;
    toDate:string;
    interviewSlot:string;
    venueId:number;
    hrAutoUserIds:string;
    interviewerAutoUserIds:string;
    isAccomodation:boolean;
    accomodationDetails:string;
    isTravel:boolean;
    travelModes:string;
    isFormAnexture:boolean;
    scheduleComments:string;
    emailTemplateId:number;
    venueName: string;
    venueAddress:string;
    verticalId:number;
    functionId:number;
}

export interface ISearchCandidateInterviewFeedback
{
    CandidateId:number;
    RequisitionDetailId:number;
    InterviewDetailId:number;
}

export interface ICandidateInterviewFeedbackList{
    requisitionDetailId:number;
    interviewDetailId:number;
    interviewDate:string;
    venueName:string;
    positionName:string;
    functionName:string;
    filledStatus:number;
}

export interface ICandidateInterviewFeedbackData{
    candidateId:number;
    interviewDetailId:number;
    requisitionDetailId:number;
    applicationSystemRate:number;
    explanationRate:number;
    helpfulRate:number;
    informativeRate:number;
    interviewProcessRate:number;
    comfortableRate:number;
    recomendedRate:number;
    overallExperience:string;
    suggestion:string;
    createdBy:number;    
}
export interface ISearchCampusCandidateInterviewFeedback {
  candidateId: number;
}

export interface ICampusCandidateInterviewFeedbackList {
  candidateId: number;
  interviewDetailId: number;
  interviewDate: string;
  venueName: string;
  functionName: string;
  filledStatus: number;
  isEnable: number;
}

export interface ICampusCandidateInterviewFeedbackData {
  candidateId: number;
  interviewDetailId: number;
  applicationSystemRate: number;
  explanationRate: number;
  helpfulRate: number;
  informativeRate: number;
  interviewProcessRate: number;
  comfortableRate: number;
  recomendedRate: number;
  overallExperience: string;
  suggestion: string;
  createdBy: number;
}
