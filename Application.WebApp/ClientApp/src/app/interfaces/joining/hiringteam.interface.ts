export interface IReassignHiringCandidateList {
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    onBoardingManagerName:string;
    requisitionNo: string;
    emailId:string;
    candidateFullName: string;
    verticalId: number;
    verticalName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    gradeId: number;
    gradeName: string;
    candidateBVGReportId: number;
    bVGReportStatus: string;
    dateofJoining: string;
    joiningCheckListId: number;
    joiningCheckListStatus: string;
    empId: string;
    empployeeNo: string;
    hiringStatusId: number;
    hiringStatusName: string;
    modeofJoiningId: number;
    modeofJoining: string;
    checked: boolean;
}

export interface IOnboardingManager {
    autoUserId: number;
    empName: string;
}
export interface ISearchonboardingManager {
    requisitionDetailId: string;
}
export interface IsearchEmployeeNo {
    candidateId: number;
}
export interface IEmployeeNo {
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    candidateFullName: string;
    candidateEmployeeNoId: number;
    empployeeNo: string;
    empId: number;
}
export interface ICandidateRelocationReimbursementList {
    candidateReimbursementBillSubmitId: number;
    requisitionDetailId: number;
    candidateId: number;
    empId: number;
    empNo: string;
    candidateFullName: string;
    dateofJoining: string;
    verticalId: number;
    verticalName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    locationId: number;
    locationName: string;
    gradeId: number;
    gradeName: string;
    amount: number;
}
