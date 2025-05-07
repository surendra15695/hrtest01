export interface ISearchCandidateTravelReimbursement{
    CandidateId:number;
    RequisitionDetailId:number;
    InterviewDetailId:number;
}

export interface ICandidateTravelReimbursement{
    InterviewDate:string;
    VenueName:string;
    PositionName:string;
    FunctionName:string;
    JourneyType:string;
    ClaimAmount:number;
    claimStatusId:number;
    ClaimStatusName:string;
    candidateNo:string;
}

export interface ISearchTravelReimbursement{
    CandidateId:number;
    RequisitionDetailId:number;
    InterviewDetailId:number;
}

export class ITravelReimbursementJourneyList{
    autoId:number;
    travelReimbursementId:number;
    journeyTypeId:number;
    journeyTypeName:string;
    journeyDate:string;
    journeySource:string;
    journeyDestination:string;
    travelModeId:number;
    travelModeName:string;
    claimAmount:number;
}

export class ITravelReimbursementAttachmentList{
    autoId:number;
    travelReimbursementId:number;
    journeyTypeId:number;
    journeyTypeName:string;
    ticketId:number;
    ticketName:string;
    attachmentLink:number;
}

export class ITravelReimbursementDetailData{
    travelReimbursementId:number;
    interviewDetailId:number;
    interviewName:string;
    fullName:string;
    emailId:string;
    contactNo:string;
    communicationAddress:string;
    pinCode:string;
    stateId:number;
    interviewDate:string;
    venueName:string;
    positionName:string;
    functionName:string;
    bankAccountName:string;
    bankAccountNumber:string;
    bankName:string;
    ifsc:string;
    bankBranch:string;
    bankStatementId:number;
    bankStatementDocument:string;
    claimStatusId: number;
    //by kuntal
    ProfileSignature: string;
    travelReimbursementJourneyListData:ITravelReimbursementJourneyList[];
    travelReimbursementAttachmentListData: ITravelReimbursementAttachmentList[];
}

export class ITravelJourneyArray{
    AutoId:number;
    JourneyTypeId:number;
    JourneyDate:string;
    JourneySource:string;
    JourneyDestination:string;
    TravelModeId:number;
    ClaimAmount:number;
}

export class ITravelAttachmentArray{
    AutoId:number;
    JourneyTypeId:number;
    TicketId:number;
    AttachmentLink:string;
}

export class ITravelJourneyArrayData{
    AutoId:number;
    JourneyType:string;
    JourneyDate:string;
    JourneySource:string;
    JourneyDestination:string;
    TravelMode:string;
    ClaimAmount:number;
}

export class ITravelAttachmentArrayData{
    AutoId:number;
    JourneyType:string;
    TicketName:string;
    AttachmentLink:string;
}

export interface IRMTravelReimbursementList{
    interviewDetailId:number;
    requisitionNo:string;
    candidateNo:string;
    fullName:string;
    interviewDate:string;
    interviewName:string;
    venueName:string;
    positionName:string;
    departmentName:string;
    functionName:string;
    locationNo:string;
    locationOffice:string;
    claimAmount:string;
    claimStatusId:number;
    claimStatusName:string;
    modeOfJourney:string;
    modeOfTravel:string;
}

export interface ITravelReimbursementActionFormData{
    InterviewDetailIds: string,
    ClaimStatusId: number,
    Remarks: string,
    CreatedBy: number,
    CandidateNo:string;
}
export interface ITravelReimbursementActionFormDataNew {
  InterviewDetailIds: string,
  ClaimStatusId: number,
  Remarks: string,
  CreatedBy: number,
  CandidateNo: string;
  ReimbursementName: string;
  Password: string;
  Flag: number;
}

export interface ITravelClarificationList{
    clarificationRemarks:string;
    createdByName:string;
}

export interface ISearchTravelClarificationList{
    InterviewDetailId:number;
}


//Test
export interface ISearchCandidateTestTravelReimbursement{
    CandidateId:number;
    RequisitionDetailId:number;
    TestScheduleDetailId:number;
}

export interface ICandidateTestTravelReimbursement{
    TestDate:string;
    VenueName:string;
    PositionName:string;
    FunctionName:string;
    JourneyType:string;
    ClaimAmount:number;
    ClaimStatusId:number;
    ClaimStatusName:string;
}

export interface ISearchTestTravelReimbursement{
    CandidateId:number;
    RequisitionDetailId:number;
    TestScheduleDetailId:number;
}

export class ITestTravelReimbursementJourneyList{
    autoId:number;
    travelReimbursementId:number;
    journeyTypeId:number;
    journeyTypeName:string;
    journeyDate:string;
    journeySource:string;
    journeyDestination:string;
    travelModeId:number;
    travelModeName:string;
    claimAmount:number;
}

export class ITestTravelReimbursementAttachmentList{
    autoId:number;
    travelReimbursementId:number;
    journeyTypeId:number;
    journeyTypeName:string;
    ticketId:number;
    ticketName:string;
    attachmentLink:number;
}

export class ITestTravelReimbursementDetailData{
    travelReimbursementId:number;
    testScheduleDetailId:number;
    testName:string;
    fullName:string;
    emailId:string;
    contactNo:string;
    communicationAddress:string;
    pinCode:string;
    stateId:number;
    testDate:string;
    venueName:string;
    positionName:string;
    functionName:string;
    bankAccountName:string;
    bankAccountNumber:string;
    bankName:string;
    ifsc:string;
    bankBranch:string;
    bankStatementId:number;
    bankStatementDocument:string;
    claimStatusId:number;
    travelReimbursementJourneyListData:ITravelReimbursementJourneyList[];
    travelReimbursementAttachmentListData:ITravelReimbursementAttachmentList[];
}

export class ITestTravelJourneyArray{
    AutoId:number;
    JourneyTypeId:number;
    JourneyDate:string;
    JourneySource:string;
    JourneyDestination:string;
    TravelModeId:number;
    ClaimAmount:number;
}

export class ITestTravelAttachmentArray{
    AutoId:number;
    JourneyTypeId:number;
    TicketId:number;
    AttachmentLink:string;
}

export class ITestTravelJourneyArrayData{
    AutoId:number;
    JourneyType:string;
    JourneyDate:string;
    JourneySource:string;
    JourneyDestination:string;
    TravelMode:string;
    ClaimAmount:number;
}

export class ITestTravelAttachmentArrayData{
    AutoId:number;
    JourneyType:string;
    TicketName:string;
    AttachmentLink:string;
}

export interface IRMTestTravelReimbursementList{
    testScheduleDetailId:number;
    requisitionNo:string;
    candidateNo:string;
    fullName:string;
    testDate:string;
    testName:string;
    venueName:string;
    positionName:string;
    departmentName:string;
    functionName:string;
    locationNo:string;
    locationOffice:string;
    claimAmount:string;
    claimStatusId:number;
    claimStatusName:string;
    modeOfJourney:string;
    modeOfTravle:string;
}

export interface ITestTravelReimbursementActionFormData{
    testScheduleDetailIds: string,
    ClaimStatusId: number,
    Remarks: string,
    CreatedBy: number,
  CandidateNo: string; 
}
export interface ITestTravelReimbursementActionFormDataNew {
  testScheduleDetailIds: string,
  ClaimStatusId: number,
  Remarks: string,
  CreatedBy: number,
  CandidateNo: string;
  Password: string;
  ReimbursementName: string;
  Flag: number;
}
export interface ITestTravelClarificationList{
    clarificationRemarks:string;
    createdByName:string;
}

export interface ISearchTestTravelClarificationList{
    testScheduleDetailId:number;
}
