export interface ICandidateRegistration{
    emailId:string;
    name:string;
    password:string;
}

export interface ICandidateData{
    candidateId:number;
    prefixId:number;
    fullName:string;
    genderId:number;
    dob:string;
    age:number;
    emailId:string;
    contactNo:string;
    aadharNo:string;
    motherTongueId:number
    laguageIds:string;
    qualificationId:number;
    courseId:number;
    streamId:number;
    marksPercentage:string;
    completionYear:number;
    qualificationTypeId:number;
    experienceYear:number;
    experienceMonth:number;
    currentCTC:string;
    currentEmployer:string;
    currentDesignation:string;
    domainId:number;
    subDomainId:number;
    stateId:number;
    previousApplied:number;
    relativeStatus:number;
    relativeName:string;
    relativeContactNo:string;
    cmdApprovalRequired:number;
    cmdApprovalStatus:number;
    cmdApprovalNo:string;
    cmdApprovalDocument:string;
    resume:string;
    cmdUpdateStatus:number;
    testOption:number;
    hrFeedbackCount:number;
    assessmentCount:number;
    applicationCount:number;
    clarificationCount:number;
    internalCandidateRemarks:string;
}

export interface ISearchCandidateData{
    candidateId:number;
}

export interface ICandidateApplyJob{
    candidateId:number;
    requisitionDetailId:number;
    createdBy:number;
}
export interface IApplyJob{
    candidateId:number;
    requisitionDetailId:number;
    createdBy:number;
    position:string;
    department:string;
    function :string;
    location:string;
    state:string;
    reqno:number;
    EmailId:string;
    Name:String;
    candidate:number;
}
export interface IInternalCandidate{
    candidateId:number;
}

export interface ISearchInternalCandidate{
    CreatedBy:number;
}

export interface IOnboardingManager {
    autoUserId: number;
    empName: string;
}

export interface ISearchonboardingManager {
     requisitionDetailId :string;
}
