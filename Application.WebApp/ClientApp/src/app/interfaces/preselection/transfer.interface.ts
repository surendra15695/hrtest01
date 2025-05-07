export interface ITransferDetailData{
    autoId:number;
    empNo:string;
    empName:string;
    empId:number;
    designation:string;
    oldGradeName:string;
    oldFunctionId:number;
    oldDepartmentId:number;
    newVerticalId:number;
    newLocationId:number;
    newFunctionId:number;
    newDepartmentId:number;
    requisitionDetailId:number;
    requisitionNo:string;
    positionId:number;
    gradeId:number;
    jobTypeId:number;
    jobDescriptionId:number;
    dot:string;
    targetDate:string;
    replacementStatusId:number;
    remarks:string;
}

export interface ITransferDetailDataArray{
    autoId:number;
    empNo:string;
    empName:string;
    empId:number;
    designation:string;
    oldGradeName:string;
    oldFunctionId:number;
    oldFunctionName:string;
    oldDepartmentId:number;
    oldDepartmentName:string;
    newVerticalId:number;
    newVerticalName:string;
    newLocationId:number;
    newLocationNo:string;
    newFunctionId:number;
    newFunctionName:string;
    newDepartmentId:number;
    newDepartmentName:string;
    requisitionNo:string;
    positionId:number;
    positionName:string;
    gradeId:number;
    gradeName:string;
    jobTypeId:number;
    jobTypeName:string;
    jobDescriptionId:number;
    jobDescriptionName:string;
    dot:string;
    targetDate:string;
    replacementStatusId:number;
    replacementStatusName:string;
    remarks:string;
}

export interface ITransferList{
    transferDetailId:number;
    transferId:number;
    empId:number;
    empName:string;
    empNo:string;
    designation:string;
    oldGradeName:string;
    oldVerticalId:number;
    oldVerticalName:string;
    oldLocationId:number;
    oldLocationNo:string;
    oldFunctionId:number;
    oldFunctionName:string;
    oldDepartmentId:number;
    oldDepartmentName:string;
    newVerticalId:number;
    newVerticalName:string;
    newLocationId:number;
    newLocationNo:string;
    newFunctionId:number;
    newFunctionName:string;
    newDepartmentId:number;
    newDepartmentName:string;
    forRequisitionDetailId:number;
    forRequisitionNo:string;
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
    transferApprovalStatusId:number;
    approvalStatus:string;
    approvalStatusIcon:string;
    transferProcessStatusId:number;
    processStatus:string;
    processStatusIcon:string;
    jdDocument:string;
    replacementStatusId:number;
    replacementStatusName:string;
    dot:string;
}

export interface ISearchTransferList{
    transferDetailId:number;
    transferId:number;
    locationId:number;
    verticalId:number;
    fromDate:string;
    toDate:string;
    replacementnStatusId:number;
    transferApprovalStatus:number;
    transferProcessStatus:number;
    createdBy:number;
    approverAutoUserId:number;
}

export interface ITransferFormData{
    LocationId:number;
    VerticalId:number;
    CreatedBy:number;
    TransferData: ITransferDetailData[];
    UniqueFunctionId: any[];
}

export interface ITransferRequisition{
    TransferDetailId:number;
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

export interface IMergeTransferFormData{
    TransferData:ITransferRequisition[],
    CreatedBy:number;
}

export interface ISearchVacancyList{
    locationId:number;
    verticalId:number;
    functionId:number;
    departmentId:number;
}

export interface IVacancyList{
    requisitionDetailId:number;
    requisitionNo:string;
    functionId:number;
    functionName:string;
    departmentId:number;
    departmentName:string;
}


export interface ISearchTransferHoldRelease{
    locationId:number;
    verticalId:number;
    createdBy:number;
}

export interface ITransferHoldRelease{
    transferDetailId:number;
    transferId:number;
    empId:number;
    empName:string;
    empNo:string;
    designation:string;
    oldGradeName:string;
    oldVerticalId:number;
    oldVerticalName:string;
    oldLocationId:number;
    oldLocationNo:string;
    oldFunctionId:number;
    oldFunctionName:string;
    oldDepartmentId:number;
    oldDepartmentName:string;
    newVerticalId:number;
    newVerticalName:string;
    newLocationId:number;
    newLocationNo:string;
    newFunctionId:number;
    newFunctionName:string;
    newDepartmentId:number;
    newDepartmentName:string;
    forRequisitionDetailId:number;
    forRequisitionNo:string;
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
    transferApprovalStatusId:number;
    approvalStatus:string;
    approvalStatusIcon:string;
    transferProcessStatusId:number;
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
}

export interface IRequisitionPositionGrade
{
    positionId:number;
    verticalId:string;
    gradeName:string;
    gradeId:number;
}

export interface ITransferHoldReleaseData{
    AutoId:number;
    TransferDetailId:number;
    PositionId:number;
    GradeId:number;
    JobTypeId:number;
    JobDescriptionId:number;
    TargetDate:string;
    Remarks:string;
}

export interface ITransferHoldReleaseSubmitFormData{
    HoldReleaseTransferData:ITransferHoldReleaseData[];
    CreatedBy:number;
}
export interface ISearchTransferClarification {
  transferDetailId: number;
}
