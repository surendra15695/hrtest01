export interface ISuccessionPlanDetailData{
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
    targetDate:string;
    replacementStatusId:number;
    remarks:string;
}

export interface ISuccessionPlanDetailDataArray{
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
    targetDate:string;
    replacementStatusId:number;
    replacementStatusName:string;
    remarks:string;
}

export interface ISuccessionPlanList{
    successionPlanDetailId:number;
    successionPlanId:number;
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
    successionPlanApprovalStatusId:number;
    approvalStatus:string;
    approvalStatusIcon:string;
    successionPlanProcessStatusId:number;
    processStatus:string;
    processStatusIcon:string;
    jdDocument:string;
    replacementStatusId:number;
    replacementStatusName: string;
    isReqDetailExists: number;
}

export interface ISearchSuccessionPlanList{
    successionPlanDetailId:number;
    successionPlanId:number;
    locationId:number;
    verticalId:number;
    fromDate:string;
    toDate:string;
    replacementnStatusId:number;
    successionPlanApprovalStatus:number;
    successionPlanProcessStatus:number;
    createdBy:number;
}

export interface ISuccessPlanFormData{
    LocationId:number;
    VerticalId:number;
    CreatedBy:number;
    SuccessionPlanData: ISuccessionPlanDetailData[];
    UniqueFunctionId: any[];
}

export interface ISuccessionPlanRequisition{
    SuccessionPlanDetailId:number;
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

export interface IMergeSuccessionPlanFormData{
    SuccessionPlanData:ISuccessionPlanRequisition[],
    CreatedBy:number;
}


export interface ISearchSuccessionPlanHoldRelease{
    locationId:number;
    verticalId:number;
    createdBy:number;
}

export interface ISuccessionPlanHoldRelease{
    successionPlanDetailId:number;
    successionPlanId:number;
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
    successionPlanApprovalStatusId:number;
    approvalStatus:string;
    approvalStatusIcon:string;
    successionPlanProcessStatusId:number;
    processStatus:string;
    processStatusIcon:string;
    jdDocument:string;
    replacementStatusId:number;
    replacementStatusName:string;
    newReplacementStatusId:number;
    checkStatus:boolean;
    remarks:string;
    gradeList:IRequisitionPositionGrade[];
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

export interface ISuccessionPlanHoldReleaseData{
    AutoId:number;
    SuccessionPlanDetailId:number;
    PositionId:number;
    GradeId:number;
    JobTypeId:number;
    JobDescriptionId:number;
    TargetDate:string;
    Remarks:string;
}

export interface ISuccessionPlanHoldReleaseSubmitFormData{
    HoldReleaseSuccessionPlanData:ISuccessionPlanHoldReleaseData[];
    CreatedBy:number;
}

export interface ISearchSuccessionPlanClarification {
  SuccessionPlanDetailId: number;
}
