export interface ITestScheduleFormData{
    RequisitionDetailId:number;
    TestTypeId:number;
    TestLink:string;
    TestFromDate:string;
    TestToDate:string;
    TestVenueId:number;
    TestContactName:string;
    TestContactNo:string;
    IsTestTravel:boolean;
    TestEmailTemplateId:number;
    TestEmailTemplate:string;
    CandidateIds:string;
    CreatedBy: number;
    VenueName:    string;
    EmailId:      string;
    VanueAddress: string;
    ContactName:  string;
  ContactNo: string;
  


}

export interface TTestScheduleDetail{
    testScheduleDetailId:number;
    candidateId:number;
    testTypeId:number;
    testLink:string;
    fromDate:string;
    toDate:string;
    venueId:number;
    contactPersonName:string;
    contactNo:string;
    isTravel:boolean;
    emailTemplateId:number;
}

export interface ISearchTestScheduleDetail{
    candidateId:number;
    requisitionDetailId:number;
}

export interface ISearchTestResult{
    requisitionDetailId:number;
    candidateId:number;
}

export interface ITestResult{
    requisitionDetailId:number;
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

export interface ITestResult1 {
  RequisitionNo: string;
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
  UploadStatus: string;
}
