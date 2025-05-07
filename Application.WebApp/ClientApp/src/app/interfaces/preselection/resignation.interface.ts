export interface IResignationDetailData{
    autoId:number;
    empNo:string;
    empName:string;
    empId:number;
    designation:string;
    oldGradeName:string;
    functionId:number;
    departmentId:number;
    positionId:number;
    gradeId:number;
    jobTypeId:number;
    jobDescriptionId:number;
    dor:string;
    lwd:string;
    targetDate:string;
    reasonId:number;
    replacementStatusId:number;
    remarks:string;
}

export interface IResignationDetailDataArray{
    autoId:number;
    empNo:string;
    empName:string;
    empId:number;
    designation:string;
    oldGradeName:string;
    functionId:number;
    functionName:string;
    departmentId:number;
    departmentName:string;
    positionId:number;
    positionName:string;
    gradeId:number;
    gradeName:string;
    jobTypeId:number;
    jobTypeName:string;
    jobDescriptionId:number;
    jobDescriptionName:string;
    dor:string;
    lwd:string;
    targetDate:string;
    reasonId:number;
    reasonName:string;
    replacementStatusId:number;
    replacementStatusName:string;
    remarks:string;
}

export interface IResignationList{
    resignationDetailId:number;
    resignationId:number;
    empId:number;
    empName:string;
    empNo:string;
    designation:string;
    oldGradeName:string;
    verticalId:number;
    locationId:number;
    locationNo:string;
    functionId:number;
    functionName:string;
    departmentId:number;
    departmentName:string;
    positionId:number;
    positionName:string;
    gradeId:number;
    gradeName:string;
    jobTypeId:number;
    jobTypeName:string;
    jobDescriptionId:number;
    jobDescriptionName:string;
    targetDate:string;
    createdOn:string;
    createdByAutoUserId:number;
    createdByUserName:string;
    createdByEmailId:string;
    resignationApprovalStatusId:number;
    approvalStatus:string;
    approvalStatusIcon:string;
    resignationProcessStatusId:number;
    processStatus:string;
    processStatusIcon:string;
    jdDocument:string;
    replacementStatusId:number;
    replacementStatusName:string;
    reasonId:number;
    reasonName:string;
    lwd:string;
    dor:string;
    sepInt:string;
}

export interface ISearchResignationList{
    resignationDetailId:number;
    resignationId:number;
    locationId:number;
    verticalId:number;
    fromDate:string;
    toDate:string;
    replacementnStatusId:number;
    reasonId:number;
    resignationApprovalStatus:number;
    resignationProcessStatus:number;
    createdBy:number;
    approverAutoUserId:number;
}

export interface IResignationRequisition{
    ResignationDetailId:number;
    VerticalId:number;
    LocationId:number;
    FunctionId:number;
    DepartmentId:number;
    PositionId:number;
    GradeId:number;
    JobTypeId:number;
    JobDescriptionId:number;
    TargetDate:string;
}

export interface IMergeResignationFormData{
    ResignationData:IResignationRequisition[],
    CreatedBy:number;
}

export interface ISearchResignationHoldRelease{
    locationId:number;
    verticalId:number;
    createdBy:number;
}

export interface IResignationHoldRelease{
    resignationDetailId:number;
    resignationId:number;
    empId:number;
    empName:string;
    empNo:string;
    designation:string;
    oldGradeName:string;
    verticalId:number;
    locationId:number;
    locationNo:string;
    functionId:number;
    functionName:string;
    departmentId:number;
    departmentName:string;
    positionId:number;
    positionName:string;
    gradeId:number;
    gradeName:string;
    jobTypeId:number;
    jobTypeName:string;
    jobDescriptionId:number;
    jobDescriptionName:string;
    targetDate:string;
    createdOn:string;
    createdByAutoUserId:number;
    createdByUserName:string;
    createdByEmailId:string;
    resignationApprovalStatusId:number;
    approvalStatus:string;
    approvalStatusIcon:string;
    resignationProcessStatusId:number;
    processStatus:string;
    processStatusIcon:string;
    jdDocument:string;
    replacementStatusId:number;
    replacementStatusName:string;
    newReplacementStatusId:number;
    reasonId:number;
    reasonName:string;
    checkStatus:boolean;
    remarks:string;
    gradeList:IRequisitionPositionGrade[];
    lwd:string;
    dor:string;
    jobdescriptionList:IFilteredJobList[];
}
export interface IFilteredJobList{
    jobDescriptionId:number;
    jobDescriptionName:string;
    verticalId:number;
    verticalName:string;
    locationId:number;
    locationOffice:string;
    positionId:number;
    positionName:string;
    departmentId:number;
    departmentName:string;
    functionId:number;
    functionName:string;
    isActive:boolean;
    createdBy:number;
}

export interface IRequisitionPositionGrade
{
    positionId:number;
    verticalId:string;
    gradeName:string;
    gradeId:number;
}

export interface IResignationHoldReleaseData{
    AutoId:number;
    ResignationDetailId:number;
    PositionId:number;
    GradeId:number;
    JobTypeId:number;
    JobDescriptionId:number;
    TargetDate:string;
    Remarks:string;
}

export interface IResignationHoldReleaseSubmitFormData{
    HoldReleaseResignationData:IResignationHoldReleaseData[];
    CreatedBy:number;
}

export interface IResignationClarification{
    clarificationRemarks:string;
    createdBy:number;
    createdByName:string;
}

export interface ISearchResignationClarification{
    resignationDetailId:number;
}