export interface IHandholdingAllocationCandidateSearch{
    empId:string;
    empName:string;
    empStatus:number;
    fromDate:string;
    toDate:string;
    locationId:number;
    functionId:number;
    probationId:number;
    allocationStatus:number;
}

export interface IHandholdingAllocationCandidate{
    candidateId:number;
    employeeNo:string;
    fullName:string;
    employeeStatus:string;
    doj:string;
    probation:string;
    designation:string;
    locationOffice:string;
    functionName:string;
    departmentName:string;
    gradeName:string;
    confirmationDue:string;
    allocationStatus:number;
    allocatedUserName:string;
}

export interface IHandHoldingHalfYearlyReviewFormData{
    CandidateId:number;
    EmpNo:string;
    HalfYearlyReviewId:number;
    Question1Answer:string;
    Question2Answer:string;
    Question3Answer:string;
    Question4Answer:string;
    Question5Answer:string;
    Remarks:string;
    DetailFormData:IHandHoldingHalfYearlyReviewDetailFormData[];
    CreatedBy:number;
}

export interface IHandHoldingHalfYearlyReviewDetailFormData{
    ReviewFormId:number;
    ReviewQuestionId:number;
    Rating:string;
    ReviewComments:string;
}