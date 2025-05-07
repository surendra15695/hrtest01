export interface ICandidateAssessmentData {
  requisitionDetailId: number;
  candidateId: number;
  candidateNo: string;
  empId: number;
  empNo: string;
  employeeStatusId: number;
  employeeStatusName: string;
  candidateFullName: string;
  emailId: string;
  contactNo: string;
  batchId: number;
  batchNo: string;
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
  totalScore: number;
  candidateAssessmentDetails: ICandidateAssessmentDetails[];
}
export interface ICandidateAssessmentDetails {
  assessmentReleaseId: number;
  candidateInductionScheduleDetailsId: number;
  traingTitle: string;
  assessmentId: number;
  assessmentName: string;
  assignedOn: string;
  score: number;
  status: string;
}
export interface ISearchCandidateAssessment {
  candidateId: number;
}

export interface ISearcheTakeAssessment {
  candidateId: number;
  assessmentId: number;
  candidateInductionScheduleDetailsId: number;
  isActive: boolean;
}
export interface ITakeAssessmentData {
  assessmentId: number;
  assessmentTypeId: number;
  assessmentName: string;
  candidateAssessmentId: number;
  candidateInductionScheduleDetailsId: number;
  candidateId: number;
  requisitionDetailId: number;
  createdBy: number;
  assessmentQuestionDataDetailsCandidate: IAssessmentQuestionDataDetailsCandidate[];

}
export interface IAssessmentQuestionDataDetailsCandidate {
  candidateAssessmentQuestionId: number;
  assessmentQuestionId: number;
  candidateAssessmentId: number;
  assessmentQuestionOrder: number;
  assessmentQuestion: string;
  assessmentQuestionTypeId: number;
  assessmentQuestionType: string;
  isAnswered:boolean;
  assessmentQuestionAnswerOptionCandidate: IAssessmentQuestionAnswerOptionCandidate[];
}
export interface IAssessmentQuestionAnswerOptionCandidate {
  candidateAssessmentQuestionAnswerOptionId: number;
  candidateAssessmentId: number;
  assessmentQuestionAnswerOptionId: number;
  assessmentQuestionId: number;
  candidateAssessmentQuestionId: number;
  assessmentQuestionOrder: number;
  assessmentQuestionAnswerOrder: number;
  assessmentAnswer: string;
  isAnswer: boolean;
}
export interface ISearchCandidateMedicalReimbursement {
  candidateMedicalReimbursementId: number;
  requisitionDetailId: number;
  candidateId: number;
  empId: number;
}
export interface ICandidateMedicalReimbursement {
  candidateMedicalReimbursementId: number;
  requisitionDetailId: number;
  candidateId: number;
  empId: number;
  empNo: string;
  candidateFullName: string;
  dateofJoining: string;
  location: string;
  billDetails: string;
  date: string;
  totalAmount: number;
  functionId: number;
  functionName: string;
  departmentId: number;
  departmentName: string;
  locationId: number;
  locationName: string;
  approvalStatus: number;
  approvalStatusName: string;
  isActive: boolean;
  createdBy: number;
  approvalRemarks: string
  // employeeReimbursementDetails: IEmployeeReimbursementDetails[];
}

export interface ICandidateMedicalReimbursementDetails {
  candidateMedicalReimbursementId: number;
  requisitionDetailId: number;
  candidateId: number;
  empId: number;
  empNo: string;
  candidateFullName: string;
  dateofJoining: string;
  location: string;
  billDetails: string;
  // billDetails: any[];
  date: string;
  totalAmount: number;
  approvalStatus: number;
  approvalStatusName: string;
  isActive: boolean;
  createdBy: number;
  functionId: number;
  functionName: string;
  departmentId: number;
  departmentName: string;
  locationId: number;
  locationName: string;
  gradeId: number;
  gradeName: string;
  designation: number;
  designationName: string;
  employeeReimbursementDetailsMedical: IEmployeeReimbursementDetails[]; //Argg
  employeeMedicalReimbursementMedicalApproval:IEmployeeMedicalReimbursementMedicalApproval[];
}
export interface IEmployeeReimbursementDetails {
  CandidateMedicalReimbursementDetailsId: number;
  CandidateMedicalReimbursementId: number;
  BillNo: string;
  BillDate: string;
  Amount: number
  IsActive: boolean;
  approvalRemarks: string;
  remarksby: string;
}

export interface IEmployeeMedicalReimbursementMedicalApproval {
  candidateMedicalReimbursementApprovalId:number;
  candidateMedicalReimbursementId:number;
  approvalStatus:string;
  remarksBy:string;
  statusName:string;
  approvalRemarksapprove:string;
  isActive :boolean;

}
export interface ISearchCandidateTravelReimbursement {
  candidateId: number;
  candidateTravelReimbursementId: number;
}
export interface ICandidateTravelReimbursement {
  candidateTravelReimbursementId: number
  requisitionDetailId: number
  candidateId: number
  candidateFullName: number;
  designation: number
  designationName: number;
  gradeId: number
  gradeName: number;
  dateofInduction: number;
  placeofInduction: number;
  placeofInductionDesc: number;
  amount: number;
  createdBy: number;
  approvalStatus: number;
  approvalRemarks: number
  approvalStatusName: number;
}
export interface ICandidateTravelReimbursementDetails {
  candidateTravelReimbursementId: number;
  requisitionDetailId: number;
  candidateId: number;
  candidateFullName: string;
  designation: number;
  designationName: string;
  gradeId: number;
  gradeName: string;
  functionId: number;
  functionName: string;
  departmentId: number;
  departmentName: string;
  postingLocationId: number;
  postingLocationName: string;
  dateofInduction: string;
  placeofInduction: number;
  placeofInductionDesc: string;
  amount: number;
  createdBy: number;
  approvalStatus: number;
  approvalStatusName: string;
  previousAttachmentIds: string;
  previousJourneyIds: string;
  empNo: string;
  employeeTravelJourneyDetails: IEmployeeTravelJourneyDetails[];
  employeeTravelAttachmentDetails: IEmployeeTravelAttachmentDetails[];
  employeeTravelForRemarks: IEmployeeTravelForRemarks[];
}
export interface IEmployeeTravelJourneyDetails {
  candidateTravelReimbursementId: number;
  candidateTravelReimbursementJourneyId: number;
  journeyTypeId: number;
  reportingLocation: string;
  from: string;
  to: string;
  travelModeId: number;
  claimAmount: number;
  createdBy: number;
}
export interface IEmployeeTravelAttachmentDetails {
  candidateTravelReimbursementId: number;
  candidateTravelReimbursementAttachmentId: number;
  journeyTypeId: number;
  ticketId: number;
  attachmentFile: string;
  attachmentLink: string;
  createdBy: number;
}
export interface ISearcheNoticePeriodBuyouteReimbursement {
  candidateId: number;
  requisitionDetailId: number;
  candidateNoticePeriodBuyOutDaysId: number;
  empId: number;
}
export interface INoticePeriodBuyouteReimbursement {
  candidateNoticePeriodBuyOutDaysId: number;
  requisitionDetailId: number;
  candidateId: number;
  empId: number;
  empNo: string;
  candidateFullName: string;
  dateofJoining: string;
  noticePeriodDays: number;
  noticePeroiodServed: number;
  remainingDays: number;
  document: string;
  amount: number;
  approvalStatus: number;
  approvalStatusName: string;
  isActive: boolean;
  createdBy: number;
  approvalRemarks: string;

}
export interface INoticePeriodBuyouteReimbursementNew {
  candidateNoticePeriodBuyOutDaysId: number;
  requisitionDetailId: number;
  candidateId: number;
  empId: number;
  empNo: string;
  candidateFullName: string;
  dateofJoining: string;
  noticePeriodDays: number;
  noticePeroiodServed: number;
  remainingDays: number;
  document: string;
  amount: number;
  approvalStatus: number;
  approvalStatusName: string;
  isActive: boolean;
  createdBy: number;
  approvalRemarks: string;
  documentPath: string;
  fullName: string;
  emailId: string;
}
export interface IEmployeeTravelForRemarks {
  candidateTravelReimbursementId: number;
  approvalRemarks: string;
  fullName: string;
  createdBy: number;
}


export interface ISearchCandidateJoiningFormDetails {
  candidateJoiningFormId: number;
  candidateId: number;
}
export interface ICandidateJoiningFormDetails {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  fullName: string;
  dob: string;
  bloodGroupId: number;
  bloodGroupName: string;
  residentialAddress: string;
  residentialPin: string;
  sameAsResidential: boolean;
  permanentAddress: string;
  permanentPin: string;
  emailId: string;
  phoneNo: string;
  date: string;
  acidentalPolicyNominee: string;
  acidentalPolicyNomineeRelationShip: number;
  relationShipName: string;
  acidentalPolicyNomineeAddress: string;
  acidentalPolicyName: string;
  sebiApplicable: boolean;
  sebiName: string;
  sebiEmployeeNo: string;
  sebiDesignation: number;
  sebiDesignationName: string;
  sebiDepartment: number;
  sebiDepartmentName: string;
  sebiPanNo: string;
  sebiMobileNo: string;
  sebiInsTitute: string;
  sebiPastEmployer: string;
  sebiNoofSecurity: number;
  sebiDesigName: string;
  sebiDesigPAN: string;
  sebiDesigPhone: string;
  joiningLetterDate: string;
  joiningLetterDesignation: number;
  joiningLetterDesignationName: string;
  joiningDate: string;
  signatureDate: string;
  signaturePlace: string;
  signature: string;
  isDraft: boolean;
  createdBy: number;
  hiringStatusId: number;
  candidateJoingFormFamily: ICandidateJoingFormFamily[];
  candidateJoingFormImidiateRelatives: ICandidateJoingFormImidiateRelatives[];
  candidateJoiningFormApprovalStatus: ICandidateJoiningFormApprovalStatus[];
  otherRelationName:string;
}
export interface ICandidateJoiningFormDetailsNew {
  candidateJoiningFormId: number;
  candidateId: number;
  requisitionDetailId: number;
  fullName: string;
  dob: string;
  bloodGroupId: number;
  bloodGroupName: string;
  residentialAddress: string;
  residentialPin: string;
  sameAsResidential: boolean;
  permanentAddress: string;
  permanentPin: string;
  emailId: string;
  phoneNo: string;
  date: string;
  acidentalPolicyNominee: string;
  acidentalPolicyNomineeRelationShip: number;
  relationShipName: string;
  acidentalPolicyNomineeAddress: string;
  acidentalPolicyName: string;
  sebiApplicable: boolean;
  sebiName: string;
  sebiEmployeeNo: string;
  sebiDesignation: number;
  sebiDesignationName: string;
  sebiDepartment: number;
  sebiDepartmentName: string;
  sebiPanNo: string;
  sebiMobileNo: string;
  sebiInsTitute: string;
  sebiPastEmployer: string;
  sebiNoofSecurity: number;
  sebiDesigName: string;
  sebiDesigPAN: string;
  sebiDesigPhone: string;
  joiningLetterDate: string;
  joiningLetterDesignation: number;
  joiningLetterDesignationName: string;
  joiningDate: string;
  signatureDate: string;
  signaturePlace: string;
  signature: string;
  isDraft: boolean;
  createdBy: number;
  hiringStatusId: number;
  candidateJoingFormFamily: ICandidateJoingFormFamily[];
  candidateJoingFormImidiateRelatives: ICandidateJoingFormImidiateRelatives[];
  candidateJoiningFormApprovalStatus: ICandidateJoiningFormApprovalStatus[];
  otherRelationName:string;
  candidateRemarksDetails:any[]
}
export interface ICandidateJoingFormFamily {
  candidateJoiningFormId: number;
  candidateJoiningFamilyLineId: number;
  familyName: string;
  familyRelationShip: number;
  familyRelationShipName: string;
  familyDOB: string;
  isReadOnly: boolean;
}
export interface ICandidateJoingFormImidiateRelatives {
  candidateJoiningFormId: number;
  candidateImidiateRelativesLineId: number;
  imidiateRelativesName: string;
  imidiateRelativesPAN: string;
  imidiateRelativesPhone: string;
  imidiateRelativesNoofSecurity: number;
  isReadOnly: boolean;
}
export interface ICandidateJoiningFormApprovalStatus {
  doumentName: number;
  attachmentDocumentName: string;
  approvalStatus: number;
  approvalRemarks: string;
}
export interface ICandidateInductionFeedback {
  candidateId: number;
  fullName: string;
  dateOfJoining: string;
  batchId: number;
  batchNo: string;
  designationName: string;
  gradeName: string;
  functionName: string;
  departmentName: string;
  postingLocationName: string;
  candidateDetailData: ICandidateFeedbackDetailData[];
}
export interface ICandidateFeedbackDetailData {
  assessmentAssignId: number;
  assessmentId: number;
  CandidateInductionScheduleDetailsId: number;
  traingTitle: string;
  assignedOn: string;
  overallRating: string;
  feedbackStatusId: string;
  feedBackId:number;
}
export interface ICandidateFeedbackDetails {
  feedBackId: number;
  feedBackName: string;
  candidateInductionScheduleDetailsId: number;
  candidateFeedBackId: number;
  candidateId: number;
  requisitionDetailId: number;
  createdBy: number;
  trainingTitle: string;
  feedBackQuestionDataDetailsCandidate: IFeedBackQuestionDataDetailsCandidate[];
}
export interface IFeedBackQuestionDataDetailsCandidate {
  candidateFeedBackQuestionId: number;
  candidateFeedBackId: number;
  feedBackQuestionId: number;
  feedBackQuestionOrder: number;
  feedBackQuestion: string;
  feedBackQuestionTypeId: number;
  feedBackQuestionTypeOptionId: number;
  feedBackQuestionTypeName: string;
  feedBackAnswer: string;
}
export interface ICandidateFeedbackQuestionSave {
  candidateFeedBackQuestionId: number;
  feedBackQuestionId: number;
  candidateFeedBackId: number;
  feedBackQuestionOrder: number;
  feedBackQuestion: string;
  feedBackQuestionTypeId: number;
  feedBackQuestionAnswer: string;
}
