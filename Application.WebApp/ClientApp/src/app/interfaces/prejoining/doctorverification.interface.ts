export interface IDoctorVerificationCandidateList {
    requsitaionDetailsId: number;
    candidateId: number;
    candidateNo: string;
    requisitionNo: string;
    candidateFullName: string;
    locationId: number;
    locationName: string;
    verticalId: number;
    verticalName: string;
    designation: number;
    designationName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
    medicalallyFit: boolean;
    medicalallyFitStatus: string;
    verificationStatus: string;
    createdOn: Date;
}
export interface ISearchDoctorVerificationReportDetails {
    medicalDocumentCollectionId: number;
    requisitionDetailId: number;
    candidateId: number;
    isActive: true
}
export interface IDoctorVerificationReportDetails {
    medicalDocumentCollectionId: number;
    requisitionDetailId: number;
    candidateId: number;
    name: string;
    position: string;
    functionName: string;
    location: string;
    grade: string;
    doumentType: number;
    doumentTypeName: string;
    doumentParticular: number;
    doumentParticularName: string;
    documentNameId: number;
    documentName: string;
    document: string;
    remarks: string;
    medicalDocumentDoctorApprovalId: number;
    approvalListId: number;
    approvalListName: string;
    approvalRemarks: string;
    createdBy: number;
    medicallyFit:boolean;
}
