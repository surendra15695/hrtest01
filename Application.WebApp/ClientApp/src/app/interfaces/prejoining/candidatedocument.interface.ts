export interface ICandidateOfferDocument {
    offerDocumentCollectionId: number;
    requsitaionDetailsId: number;
    candidateId: number;
    candidateFullName: string;
    candidateEmailId: string;
    candidatePhone: string;
    candidateGender: string;
    age: string;
    aadharNo: string;
    motherTongue: string;
    languageKnown: string;
    highestQualification: string;
    course: string;
    stream: string;
    percentage: string;
    yearofCompletion: string;
    qualificationType: string;
    totalexperience: string;
    currentCTC: string;
    currentEmployer: string;
    designation: string;
    domain: string;
    subDomain: string;
    currentLocation: string;
    anyPreviousApplicationHistoryinMRF: string;
    anyRelativeWorkingonMRF: string;
    source: string;
    candidateOwner: string;
    candidateResume: string;
    monthlyTotal: number;
    yearlyTotal: number;
    createdBy: number;
    isEnabled: boolean;
    salaryDetails: IPreviousSalaryDetails[];
    attachmentDetails: IOfferDocumentAttachmentDetails[];
    remaksDetails: IOfferDocumentRemarksDetails[];
}

export interface IPreviousSalaryDetails {
    offerDocumentCollectionSalaryId: number;
    offerDocumentCollectionId: number;
    emolumntId: number;
    emolumntName: string;
    monthly: number;
    yerly: number;
    emolumntVerifyStatus: number;
    emolumntVerifyRemarks: string;
    createdBy: number;
}

export interface IOfferDocumentAttachmentDetails {
    offerDocumentCollectionDocumentId: number;
    offerDocumentCollectionId: number;
    doumentType: number;
    doumentTypName: string;
    doumentParticular: number;
    doumentParticularName: string;
    doumentNameId: number;
    doumentName: string;
    document: string;
    documentPath: string;
    approvalStatus: number;
    approvalRemarks: string;
    additionalDocument: boolean;
    modifyStatus: number;
    roleId: string;
    disabledField: boolean;
    createdBy: number;
    modifiedOn: string;  // Added By anif
    modifyBy: string;  // Added By anif
}
export interface IOfferDocumentAttachmentDetailsNew {
    offerDocumentCollectionDocumentId: number;
    offerDocumentCollectionId: number;
    doumentType: number;
    doumentTypName: string;
    doumentParticular: number;
    doumentParticularName: string;
    doumentNameId: number;
    doumentName: string;
    document: string;
    documentPath: string;
    approvalStatus: number;
    approvalRemarks: string;
    additionalDocument: boolean;
    modifyStatus: number;
    roleId: string;
    disabledField: boolean;
    createdBy: number;
    orderColumn:number;
    modifiedOn: string;  // Added By anif
    modifyBy: string;  // Added By anif
}

export interface IOfferDocumentRemarksDetails {
    offerDocumentCollectionRemarksId: number;
    offerDocumentCollectionId: number;
    remarksType: number;
    reamrks: string;
    reamrksReply: string;
    createdBy: number;
    createdByName: string;
    createdOn: string;
    candidateFullName: string;
    modifiedOn: string;
}

export interface ISearchCandidateOfferDocument {
    offerDocumentCollectionId: number;
    requsitaionDetailsId: number;
    candidateId: number;
}

export interface IAttachedDocumentArrayList {
    doumentType: number;
    doumentTypName: string;
    documents: IAttachedDocument[];
}

export interface ISubmittedAttachedDocumentArrayList {
    doumentType: number;
    doumentTypName: string;
    documents: IOfferDocumentAttachmentDetailsNew[];
    // disabledField:boolean;
}

export interface IAttachedDocument {
    offerDocumentCollectionDocumentId: number;
    offerDocumentCollectionId: number;
    doumentType: number;
    doumentTypName: string;
    doumentParticular: number;
    doumentParticularName: string;
    doumentNameId: number;
    doumentName: string;
    document: string;
    documentPath: string;
    approvalStatus: number;
    approvalRemarks: string;
    additionalDocument: boolean;
    modifyStatus: number;
    createdBy: number;
    documentFileSrc: any;
    documentFile: File;
}

export interface IAttachmentApprovalData {
    offerDocumentCollectionDocumentId: number;
    offerDocumentCollectionId: number;
    doumentType: number;
    doumentParticular: number;
    doumentNameId: number;
    approvalStatus: number;
    approvalRemarks: string;
    createdBy: number;
    isAdditional: boolean;  // Added By Anif on 07-12-2022
}

export interface IDocumentCollectionFormData {
    offerDocumentCollectionId: number;
    requsitaionDetailsId: number;
    candidateId: string;
    emailTemplateId: number;
    emailTemplate: string;
    createdBy: number;
}