export interface IRequisitionDetailData {
    autoId: number;
    iomNo: string;
    functionId: number;
    departmentId: number;
    positionId: number;
    gradeId: number;
    jobTypeId: number;
    jobDescriptionId: number;
    targetDate: string;
    approveCount: number;
    requestCount: number;
    holdCount: number;
    isAutoApproved: boolean;
}

export interface IRequisitionDetailDataArray {
    autoId: number;
    iomNo: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    positionName: string;
    gradeId: number;
    gradeName: string;
    jobTypeId: number;
    jobTypeName: string;
    jobDescriptionId: number;
    jobDescriptionName: string;
    targetDate: string;
    approveCount: number;
    requestCount: number;
    holdCount: number;
    isAutoApproved: boolean;
}

export interface ISearchRequisition {
    requisitionNo: string;
    requistionId: number;
    requisitionDetailId: number;
    locationId: number;
    verticalId: number;
    fromDate: string;
    toDate: string;
    iOMNo: string;
    requisitionApprovalStatus: number;
    requisitionProcessStatus: number;
    createdBy: number;
    approverAutoUserId: number;
    allocatedUserId: number;
    requisitionTypeId: number;
}

export interface IRequisitionList {
    requisitionDetailId: number;
    requisitionId: number;
    requisitionNo: string;
    verticalId: number;
    locationId: number;
    locationNo: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    iomNo: string;
    positionName: string;
    gradeId: number;
    gradeName: string;
    jobTypeId: number;
    jobTypeName: string;
    jobDescriptionId: number;
    jobDescriptionName: string;
    createdByAutoUserId: number;
    createdByUserName: string;
    createdByEmailId: string;
    createdOn: string;
    targetDate: string;
    approveCount: number;
    requestCount: number;
    holdCount: number;
    absorbedCount: number;
    requisitionApprovalStatusId: number;
    approvalStatus: string;
    approvalStatusIcon: string;
    requisitionProcessStatusId: number;
    processStatus: string;
    processStatusIcon: string;
    rmProcessStatus: string;
    managementApprovalDocument: string;
    jDDocument: string;
    allocatedRMAutoUserId: number;
    allocatedRMUserName: string;
    allocatedRMEmailId: string;
    salaryId: number;
    salaryName: string;
    requisitionTypeId: number;
    requisitionType: string;
    hmPendingStatusCount: number;
    testStatus: number;
    hiringManagerAutoUserId: number;
    requestApproved: number;
    requestPending: number;
    requestRejected: number;
    totalCandidate: number;
}

export interface IRequisitionHistoryList {
    requisitionDetailHistoryId: number;
    requisitionDetailId: number;
    requisitionType: string;
    requisitionId: number;
    requisitionNo: string;
    locationId: number;
    locationNo: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    iomNo: string;
    positionName: string;
    gradeId: number;
    gradeName: string;
    jobTypeId: number;
    jobTypeName: string;
    jobDescriptionId: number;
    jobDescriptionName: string;
    createdByAutoUserId: number;
    createdByUserName: string;
    createdByEmailId: string;
    createdOn: string;
    targetDate: string;
    approveCount: number;
    requestCount: number;
    holdCount: number;
    requisitionApprovalStatusId: number;
    approvalStatus: string;
    approvalStatusIcon: string;
    managementApprovalDocument: string;
    jDDocument: string;
}

export interface IRequsitionSourceChannelFeature {
    SourceChannelId: number;
    JobDescriptionFeatureId: number;
    Notes: string;
}

export interface IRequisitionSourceFormData {
    RequisitionDetailId: number;
    HiringManagerId: number;
    SelectionGuideId: number;
    VendorIds: string;
    SourceChannelFeature: IRequsitionSourceChannelFeature[];
    CreatedBy: number;
}

export interface IRequisitionApproveReject {
    RequisitionDetailHistoryId: number;
    StatusId: number;
    Remarks: string;
    CreatedBy: number;
}

export interface IRequisitionCandidateHiringStatusFormData {
    candidateIds: string;
    requisitionDetailId: number;
    hiringStatusId: number;
    remarks: string;
    createdBy: number;
}
export interface IRequisitionCandidateHiringStatusFormDataForCancel {  //Piu
  candidateIds: string;
  requisitionDetailId: number;
  hiringStatusId: number;
  prevHiringId: number;
  remarks: string;
  createdBy: number;
}
export interface ISourceChannelJobList {
    requisitionDetailHistoryId: number;
    requisitionDetailId: number;
    requisitionId: number;
    requisitionNo: string;
    locationId: number;
    locationNo: string;
    stateId: number;
    stateName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    positionName: string;
    jobTypeId: number;
    jobTypeName: string;
    jobDescriptionId: string;
    jobDescriptionName: string;
    jdDocument: string;
    salaryId: number;
    salaryName: string;
    allocatedDate: string;
    jdShowCount: number;
    restrictedJDShowCount: number;
    salaryShowCount: number;
    jobSummary: string;
    restrictedJD: string;
    notes: string;
    sourceChannelId: number;
    appliedStatus: number;
}

export interface ISearchSourceChannelJobList {
    requisitionDetailId: number;
    fromDate: string;
    toDate: string;
    positionId: number;
    functionId: number;
    locationId: number;
    stateId: number;
    isActive: boolean;
    sourceChannelId: number;
    roleIds: string;
    candidateId: number;
}

export interface ISearchRequisitionHoldRelease {
    createdBy: number;
    locationId: number;
}

export interface IRequisitionHoldRelease {
    requisitionDetailHistoryId: number;
    requisitionDetailId: number;
    requisitionId: number;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    positionId: number;
    iomNo: string;
    positionName: string;
    gradeId: number;
    gradeName: string;
    jobTypeId: number;
    jobTypeName: string;
    jobDescriptionId: number;
    jobDescriptionName: string;
    targetDate: string;
    approveCount: number;
    requestCount: number;
    holdCount: number;
    newRequestCount: number;
    oldHoldCount: number;
    remarks: string;
    checkStatus: number;
    prevHoldCount: number;
}

export interface IRequisitionHoldReleaseData {
    AutoId: number;
    RequisitionDetailId: number;
    ApproveCount: number;
    RequestCount: number;
    HoldCount: number;
    Remarks: string;
    IsAutoApproved: number;
}

export interface holdReleaseSubmitFormData {
    HoldReleaseRequisitionData: IRequisitionHoldReleaseData[];
    CreatedBy: number;
}

export interface IIOMFormData {
    IOMNo: string;
}

export interface IRequisitionSourceChannelDetailList {
    requisitionDetailId: number;
    hiringManagerAutoUserId: number;
    selectionGuideId: number;
    sourceChannelId: number;
    featureIds: string;
    notes: string;
    vendorIds: string;
    isActive: boolean;
}

export interface ISearchRequisitionSourceChannelDetailList {
    requisitionDetailId: number;
}

export interface ISearchMergeRequisitionList {
    requisitionDetailId: number;
    requisitionType: number;
}

export interface IMergeRequisitionDetailsList {
    empId: number;
    empName: string;
    empNo: string;
    designation: string;
    gradeName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    DepartmentName: string;
    dor: string;
    lwd: string;
    sepInt: string;
}

export interface IDeleteBeforeRequisitionFormData {
    TypeId: number;
    DataId: number;
    CreatedBy: number;
}
export interface IDeleteBeforeTransferFormData {
  TransferDetailId: number;
}
export interface IDeleteBeforeSuccessionPlanFormData {
  SuccessionPlanDetailId: number;
}
export interface IHoldPositionRequisition{
  requisitionDetailId: number;
  requisitionNo: string;
  onHold: boolean;
}