export interface ICandidateAssessmentList {
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
    coOrdinatiorId: number;
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
    totalAssignment: number;
    assessmentRelesed: number;
    assessmentStatus: string;
    feedBackStatusId: number;
    feedBackStatus: string;
    hiringStatusId: number;
    hiringStatus: string;
    checked: boolean;
}
export interface IBatchAssessment {
    batchId: number;
    batchNo: string;
    coOrdinatiorId: number;
    dateofJoining: string;
    modeofJoining: number;
    modeofJoiningName: string;
    totalCandidates: number;
    totalAssignment: number;
    assessmentRelesed: number;
    assessmentStatus: string;
}

export interface IAssessemenrAssignReleaseList {
    batchId: number;
    candidateId: string;
    assessmentAssignId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    assessmentId: number;
    assessmentName: string;
    assessmentTypeName: string;
    isAssigned: boolean;
    isChecked: boolean;
}
export interface ISearchAssessmentAssignReleaseList {
    batchId: number;
    candidateId: string;
}

export interface IEvaluateAssessmentListBatch {
    batchId: number;
    batchNo: string;
    coOrdinatiorId: number;
    userId: number;
    dateofJoining: string;
    totalAssignment: number;
    assessmentRelesed: number;
    assessmentStatus: string;
    batchesAssementEvaluateDetailsList: IBatchesAssementEvaluateDetailsList[];
}
export interface IBatchesAssementEvaluateDetailsList {
    batchId: number;
    assessmentReleaseId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    assessmentId: number;
    assessmentName: string;
    assessmentTypeId: number;
    assessmentTypeName: string;
    assignedOn: string;
    status: string;
    download: string;
}
export interface ISearchEvaluateAssessmentListBatch {
    batchId: number;
    candidateId: number;
    coOrdinatiorId: number;
}
export interface IEvaluateFeedbackListBatch {
    batchId: number;
    batchNo: string;
    coOrdinatiorId: number;
    userId: number;
    dateofJoining: string;
    totalAssignment: number;
    assessmentRelesed: number;
    assessmentStatus: string;   
    batchesFeedbackDetailsList: IBatchesAssementFeedbackDetailsList[];
}
export interface IEvaluateFeedbackListBatchNew {
  batchId: number;
  batchNo: string;
  coOrdinatiorId: number;
  userId: number;
  dateofJoining: string;
  totalAssignment: number;
  assessmentRelesed: number;
  assessmentStatus: string;
  batchesFeedbackDetailsList: IBatchesAssementFeedbackDetailsListNew[];
}
export interface IBatchesAssementFeedbackDetailsList {
    batchId: number;
    assessmentReleaseId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    assessmentId: number;
    assessmentName: string;
    assessmentTypeId: number;
    assessmentTypeName: string;
    assignedOn: string;
    isAssigned: boolean;
    createdOn: string;
    candidate: number;
    assessmentDone: number;
    assessmentNotDone:number;
    v3BatchId: number;
    feedbackDone: number;
    feedbackNotDone: number;
  evaluatebutton: boolean;

}
export interface IBatchesAssementFeedbackDetailsListNew {
  batchId: number;
  assessmentReleaseId: number;
  candidateInductionScheduleDetailsId: number;
  traingTitle: string;
  assessmentId: number;
  assessmentName: string;
  assessmentTypeId: number;
  assessmentTypeName: string;
  assignedOn: string;
  isAssigned: boolean;
  createdOn: string;
  candidate: number;
  assessmentDone: number;
  assessmentNotDone: number;
  v3BatchId: number;
  feedbackDone: number;
  feedbackNotDone: number;
  evaluatebutton: boolean;
  feedBackAssignId: number;
  feedBackId: number;
  feedChecked: number;

}
export interface ISearchEvaluateFeedbackListBatch {
    batchId: number;
    candidateId: number;
    coOrdinatiorId: number;
}
export interface ISearchEvaluateFeedbackRereleaseListBatch {
    batchId: number;
    candidateId: any;
}
export interface ISearchAssessmentEvaluation {
    batchId: number;
    candidateId: number;
    assessmentId: number;
    candidateInductionScheduleDetailsId: number;
}
export interface IAssessmentEvaluate {
    batchId: number;
    candidateId: number;
    assessmentId: number;
    assessmentName: string
    candidateInductionScheduleDetailsId: number;
    candidateEvaluationQuestionMaster: ICandidateEvaluationQuestionMaster[];
}

export interface IAssessmentEvaluateScore {
  candidateId: number;
  candidateNo: string;
  score: number;
}

export interface ICandidateEvaluationQuestionMaster {
    batchId: number;
    candidateId: number;
    assessmentId: number;
    candidateInductionScheduleDetailsId: number;
    assessmentQuestionOrder: number;
    candidateAssessmentQuestionId: number;
    assessmentQuestionAnswer: string;
    assessmentQuestionTypeId: number;
    assessmentQuestionType: string;
    candidateEvaluationQuestionAnswer: ICandidateEvaluationQuestionAnswer[];
}
export interface ICandidateEvaluationQuestionAnswer {
    batchId: number;
    assessmentId: number;
    candidateInductionScheduleDetailsId: number;
    candidateId: number;
    candidateNo: string
    candidateAssessmentQuestionId: number;
    assessmentQuestionOrder: number;
    candidateAssessmentQuestionAnswerOptionId: number;
    assessmentAnswer: string
    assessmentQuestionTypeId: number;
    assessmentQuestionType: string
    singleChoiseQuestionStatus: boolean;
    descreptiveQuestionStatus: boolean;
    correctAnswer: number;
}

export interface ISearchUploadAssessment {
    candidateAssessmentId: number;
    batchId: number;
    candidateId: number;
    candidateInductionScheduleDetailsId: number;
}
export interface IUploadAssessmentDetails {
    candidateAssessmentEvalutaionUploadId: number;
    candidateAssessmentId: number;
    assessmentName: string;
    batchId: number;
    candidateId: number;
    candidateInductionScheduleDetailsId: number;
    filePath: string;
    candidateEvaluationUploadDetailsView: ICandidateEvaluationUploadDetailsView[];
}
export interface ICandidateEvaluationUploadDetailsView {
    candidateAssessmentEvalutaionUploadId: number;
    candidateAssessmentEvalutaionUploadDetailsId: number;
    employeeId: string;
    employeeName: string;
    evaluatorComments: string;
    score: number;
    totalQuestion: number;
    remarks: string;
}
export interface ISearchViewAssessment {
    candidateId: number;
}
export interface IViewAssessment {
    candidateId: number;
    candidateNo: string;
    candidateName: string;
    assessmentTypeId: number;
    overAllPercentage: number;
    candidateEvaluationQuestionShowData: ICandidateEvaluationQuestionShowData[];
}
export interface ICandidateEvaluationQuestionShowData {
    CandidateId: number;
    AssessmentId: number;
    AssessmentName: string;
    assessmentTypeId: number;
    Total: number;
    CandidateEvaluationAnswerData: ICandidateEvaluationAnswerData[];
}
export interface ICandidateEvaluationAnswerData {
    candidateId: number;
    candidateInductionScheduleDetailsId: number;
    traingTitle: string;
    assessmentId: number;
    assessmentQuestionOrder: number;
    candidateAssessmentQuestionId: number;
    assessmentQuestion: string;
    assessmentAnswer: string;
    questionStatus: boolean;
}
export interface ISearchBatchAssessmentSummary {
    candidateId: number;
    batchId: number;
    coOrdinatorId: number;
}
export interface IBatchAssessmentSummaryPending{
    candidateAssessmentSummaryMasterPending: ICandidateAssessmentSummaryShowPending[];
}
export interface ICandidateAssessmentSummaryShowPending {
    assessmentEvaluationSummaryId: number;
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    empId: number;
    empNo: string;
    employeeStatusId: number;
    employeeStatusName: string;
    candidateFullName: string;
    age: number;
    emailId: string;
    contactNo: string;
    batchId: number;
    batchNo: string;
    qualificationId: number;
    qualificationName: string;
    coOrdinatiorId: number;
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
    workAreaId: number;
    workAreaName: string;
    traingLocationId: number;
    traingLocationName: string;
    candidateAssessmentSummaryPendingDetails: ICandidateAssessmentSummaryPendingDetails[];
}
export interface ICandidateAssessmentSummaryPendingDetails {
    candidateId: number;
    assessmentId: number;
    assessmentName: string;
    assessmentAssignId: number;
    assesmentStatus: string;
}
export interface IBatchAssessmentSummary {
    candidateAssessmentSummaryMaster: ICandidateAssessmentSummaryShow[];

}
export interface ICandidateAssessmentSummaryShow {
    remarks: string;
    assessmentEvaluationSummaryId: number;
    requisitionDetailId: number;
    candidateId: number;
    candidateNo: string;
    empId: number;
    empNo: string;
    employeeStatusId: number;
    employeeStatusName: string;
    candidateFullName: string;
    age: number;
    emailId: string;
    contactNo: string;
    batchId: number;
    batchNo: string;
    qualificationId: number;
    qualificationName: string;
    coOrdinatiorId: number;
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
    workAreaId: number;
    workAreaName: string;
    traingLocationId: number;
    traingLocationName: string;
    candidateAssessmentSummaryDetails: ICandidateAssessmentSummaryDetails[];
}
export interface ICandidateAssessmentSummaryDetails {
    workArea: string;
    assessmentEvaluationSummaryId: number;
    uploded: boolean;
    candidateId: number;
    assessmentId: number;
    assessmentName: string;
    assessmentPercent: number;
    candidateInductionScheduleDetailsId: number;
    assessmentRemarks: string;
}
export interface ISearchCandidateAssessmentSummary {
    candidateId: number;
    batchId: number;
    coOrdinatorId: number;
}
export interface ICandidateAssessmentSummary {
    candidateAssessmentSummaryMaster: ICandidateAssessmentSummaryShow[];
}
