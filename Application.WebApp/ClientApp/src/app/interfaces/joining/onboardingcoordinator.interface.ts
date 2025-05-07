export interface ICandidateMedicalReimbursementlist {
    candidateMedicalReimbursementId: number;
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
    totalAmount: number;
    approvalStatus: number;
    statusName: string;
    isActive: boolean;
    checked: boolean;
}
//Anifur
export interface ICandidateTravelReimbursementList {
    candidateTravelReimbursementId: number;
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
    dateofInduction: string;
    placeofInduction: number;
    placeofInductionDesc: string;
    totalAmount: number
    approvalStatus: number;
    statusName: string;
    isActive: boolean;
    checked: boolean;
}
export interface ICandidateNoticePeriodBuyOutList {
    candidateNoticePeriodBuyOutDaysId: number;
    requisitionDetailId: number;
    candidateId: number;
    empId: number;
    empNo: string;
    candidateFullName: string;
    dateofJoining: string;
    documentPath: string;
    documentPathForHtml:string;
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
    days: number;
    amount: number;
    approvalStatus: number;
    statusName: string;
    isActive: boolean;
  checked: boolean;
  emailId: string;
}

// Anifur
