export interface IUploadMedicalDocument {
  MedicalDocumentCollectionId: number;
  RequisitionDetailId: number;
  CandidateId: number;
  IsActive: boolean;
}

export interface IMedicalDocumentData {
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
  medicalDocumentRemarks: IMedicalDocumentRemarks[];
}
export interface IMedicalDocumentRemarks {
  offerDocumentCollectionRemarksId:number;
  createdBy: string;
  remarks: string;
  createdOn: string;
}