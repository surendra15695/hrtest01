export interface ICurrentJob
{
    jobDescriptonId :number;
    stateName :string;
    createdOn  :string;
    isSubmitted :number;
    isNew :number;
    jobPurpose :string;
    jobSummary :string;
    jobType :string;
    range :string;
}
export interface ISearchCurrentJob
{
    locationId:number;
    functionId:number;
    positionId:number;
}

export interface IVendorJobList{
    requisitionDetailId:number;
    requisitionId:number;
    requisitionNo:string;
    locationId:number;
    locationNo:string;
    stateId:number;
    stateName:string;
    functionId:number;
    functionName:string;
    departmentId:number;
    departmentName:string;
    positionId:number;
    positionName:string;
    jobTypeId:number;
    jobTypeName:string;
    jobDescriptionId:string;
    jobDescriptionName:string;
    jdDocument:string;
    salaryId:number;
    salaryName:string;
    allocatedDate:string;
    SubmittedCandidateCount:number;
    jdShowCount:number;
    restrictedJDShowCount:number;
    salaryShowCount:number;
    jobSummary:string;
    restrictedJD:string;
    notes:string;
}

export interface ISearchVendorJobList{
    vendorId:number;
    requisitionDetailId:number;
    fromDate:string;
    toDate:string;
    positionId:number;
    functionId:number;
    locationId:number;
    stateId:number;
    isActive:boolean;
}