export interface ISearchJoinningDocument {
    joiningDocumentCollectionId: number;
    requisitionDetailId: number;
    candidateId: number;
}
export interface IJoiningDocumentData {
    // preJoiningDocumentFormData: IPreJoiningDocumentFormData;
    joiningDocumentCollectionId: number;
    requisitionDetailId: number;
    candidateId: number;
    name: string;
    offerDocumentCollectionId: number;
    additionalRemarks: string;
    additionalDocumentID: string;
    createdBy: number;
    preJoiningDocumentAttachmentData: IPreJoiningDocumentAttachmentData[];
}
export interface IPreJoiningDocumentFormData {
    joiningDocumentCollectionId: number;
    requisitionDetailId: number;
    candidateId: number;
    name: string;
    offerDocumentCollectionId: number;
    additionalRemarks: string;
    createdBy: number;
}
export interface IPreJoiningDocumentAttachmentData {
    candidateId: number;
    offerDocumentCollectionId: number;
    offerDocumentCollectionDocumentId: number;
    doumentType: number;
    doumentTypName: string;
    doumentParticular: number;
    doumentParticularName: string;
    doumentNameId: number;
    doumentName: string;
    document: string;
    documentPath: string;
    approvalListId: number;
    approvalListName: string;
    approvalRemarks: string;
}

export interface IJoiningDocumentFormFiles {
    file: File;
    doumentNameId: number;
}
