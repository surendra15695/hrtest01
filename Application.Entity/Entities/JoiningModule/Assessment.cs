using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.JoiningModule
{
    public class AssessmentType
    {
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }

    }

    public class AssessmentTypeSearch
    {
        public long? AssessmentTypeId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class AssessmentQuestionTypeAll
    {
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }

    }

    public class AssessmentQuestionTypeSearch
    {
        public long? AssessmentQuestionTypeId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class AssessmentList
    {
        public long SL { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public long EmpId { get; set; }
        public string EmpName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string ModifiedOn { get; set; }
    }

    public class AssessmentListSearch
    {
        public long? AssessmentId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class Assessment
    {
        public AssessmentMasterData AssessmentMasterData { get; set; }
        public List<AssessmentQuestionDataDetails> AssessmentQuestionDataDetails { get; set; }
        public List<AssessmentQuestionAnswerOption> AssessmentQuestionAnswerOption { get; set; }
    }

    public class AssessmentData
    {
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<AssessmentQuestionData> AssessmentQuestionData { get; set; }
        public List<AssessmentQuestionAnswerOption> AssessmentQuestionAnswerOption { get; set; }
    }

    public class AssessmentShowData
    {
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public bool IsActive { get; set; }
        public int IsAssigned { get; set; }
        public int CreatedBy { get; set; }
        public List<AssessmentQuestionDataDetails> AssessmentQuestionDataDetails { get; set; }
    }
    public class AssessmentQuestionDataDetails
    {
        public long AssessmentQuestionId { get; set; }
        public long AssessmentId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public string AssessmentQuestion { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
        public List<AssessmentQuestionAnswerOption> AssessmentQuestionAnswerOption { get; set; }
    }
    public class AssessmentMasterData
    {
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public int IsAssigned { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class AssessmentQuestionData
    {
        public long AssessmentQuestionId { get; set; }
        public long AssessmentId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public string AssessmentQuestion { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
    }

    public class AssessmentQuestionAnswerOption
    {
        public long AssessmentQuestionAnswerOptionId { get; set; }
        public long AssessmentId { get; set; }
        public long AssessmentQuestionId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public long AssessmentQuestionAnswerOrder { get; set; }
        public string AssessmentAnswer { get; set; }
        public bool CorrectAnswer { get; set; }
    }

    public class AssessmentSearch
    {
        public long? AssessmentId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class AssessmentSave
    {
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<AssessmentQuestionData> AssessmentQuestionData { get; set; }
        public List<AssessmentQuestionAnswerOption> AssessmentQuestionAnswerOption { get; set; }
    }

    public class IndusctionTraningList
    {
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
    }
    public class IndusctionTraningListSearch
    {
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
    }
    public class UploadedAssessmentSearch
    {
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? EmployeeNo { get; set; }
        public long? AssessmentId { get; set; }
    }
    public class UploadedAssessmentList
    {
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CandidateId { get; set; }
        public long EmpNo { get; set; }
        public string EmpName { get; set; }
        public string EvaluatorComments { get; set; }
        public long Score { get; set; }
        public string Remarks { get; set; }
        public long IsActive { get; set; }
        public string CurrentStatus { get; set; }
    }

    public class AssessmentAssignSave
    {
        public long AssessmentId { get; set; }
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long TrainingTittleId { get; set; }
        public long vertical { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CreatedBy { get; set; }

    }
    public class InductionProgrammeCoOrdinatiorAssign
    {
        public long InductionProgrammeCoOrdinatiorAssignId { get; set; }
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long CoOrdinatiorId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class InductionProgrammeCoOrdinatiorAssigned
    {
        public long InductionProgrammeCoOrdinatiorAssignId { get; set; }
        public long CoOrdinatiorId { get; set; }
        public String EmpName { get; set; }
    }
    public class InductionProgrammeCoOrdinatiorAssignedSearch
    {
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
    }

    public class BatchReleaseListGetAll
    {
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long ModeofJoining { get; set; }
        public string ModeofJoiningName { get; set; }
        public int TotalCandidates { get; set; }
        public int TotalAssignment { get; set; }
        public int AssessmentRelesed { get; set; }
        public string AssessmentStatus { get; set; }
        public int FeedBackStatusId { get; set; }
        public string FeedBackStatus { get; set; }
    }

    public class BatchReleaseListGetAllSearch
    {
        public string BatchNo { get; set; }
        public long? CoOrdinatiorId { get; set; }
        public int? AssesmentStatus { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public int? VerticalId { get; set; }
    }

    public class AssessementAssignReleaseList
    {
        public long BatchId { get; set; }
        public string CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public long AssessmentAssignId { get; set; }
        public int CreatedDate { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public string AssessmentTypeName { get; set; }
        public bool IsAssigned { get; set; }
        public bool isChecked { get; set; }
        public long AssessmentReleaseId { get; set; }
    }
    public class FeedbackAssignReleaseList
    {
        public long BatchId { get; set; }
        public string CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public long FeedBackAssignId { get; set; }
        public int CreatedDate { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public string FeedBackTypeName { get; set; }
        public bool IsAssigned { get; set; }
        public bool FeedChecked { get; set; }
        public long FeedbackReleaseId { get; set; }
    }
    public class AssessementAssignReleaseListSearch
    {
        public long? BatchId { get; set; }
        public string CandidateId { get; set; }
    }
    public class FeedbackAssignReleaseListSearch
    {
        public long? BatchId { get; set; }
        public string CandidateId { get; set; }
    }
    public class DeleteAssessmentSearch
    {
        public long AssessmentId { get; set; }
    }

    public class AssementAssignReleaseSave
    {
        public long BatchId { get; set; }
        public string CandidateId { get; set; }
        public List<AssessementAssignReleaseDetails> AssessementAssignReleaseDetails { get; set; }
        public long CreatedBy { get; set; }
        public string Password { get; set; }//Piu
        public List<TrainingTitleList> TrainingTitle { get; set; }//Piu
    }
    public class FeedbackAssignReleaseSave
    {
        public long BatchId { get; set; }
        public string CandidateId { get; set; }
        public List<FeedbackAssignReleaseDetails> FeedbackAssignReleaseDetails { get; set; }
        public long CreatedBy { get; set; }
    }
    public class AssementAssignReleaseSaveCandiddate
    {
        public long BatchId { get; set; }
        public string CandidateId { get; set; }
        public List<AssessementAssignReleaseDetailsCandidate> AssessementAssignReleaseDetails { get; set; }
        public long CreatedBy { get; set; }
        public string Password { get; set; }
        public List<TrainingTitleList> TrainingTitle { get; set; }
    }
    public class FeedBackAssignReleaseSaveCandiddate
    {
        public long BatchId { get; set; }
        public string CandidateId { get; set; }
        public List<FeedbackAssignReleaseDetailsCandidate> FeedBackAssignReleaseDetails { get; set; }
        public long CreatedBy { get; set; }
        public string Password { get; set; }
        public List<TrainingTitleList> TrainingTitle { get; set; }
    }
    public class TrainingTitleList   //Piu
    {
        public string TrainingTitle { get; set; }
    }//Piu

    public class AssessementAssignReleaseDetails
    {
        public long AssessmentAssignId { get; set; }
        public long AssessmentId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public bool IsAssigned { get; set; }
    }
    public class FeedbackAssignReleaseDetails
    {
        public long FeedbackAssignId { get; set; }
        public long FeedbackId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public bool IsAssigned { get; set; }
    }
    public class AssessementAssignReleaseDetailsCandidate
    {
        public long AssessmentAssignId { get; set; }
        public long AssessmentId { get; set; }
        public int CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public bool IsAssigned { get; set; }
    }
    public class FeedbackAssignReleaseDetailsCandidate
    {
        public long FeedBackAssignId { get; set; }
        public long FeedBackId { get; set; }
        public int CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public bool IsAssigned { get; set; }
    }
    public class CandidateAssessmentReleaseList
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long TotalAssignment { get; set; }
        public long AssessmentRelesed { get; set; }
        public string AssessmentStatus { get; set; }
        public long FeedBackStatusId { get; set; }
        public string FeedBackStatus { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatus { get; set; }
        public bool ? IsReassigned { get; set; }
    }

    public class CandidateAssessmentReleaseListForNewJoinerlist
    {
        public List<CandidateAssessmentReleaseList> CandidateAssessmentReleaseList { get; set; }
        public List<CandidateWiseAssesment> CandidateWiseAssesment { get; set; }
        public List<CandidateWiseFeedback> CandidateWiseFeedback { get; set; }
    }

    public class CandidateWiseAssesment
    {
        public int AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public int AssessmentAssignId { get; set; }
        public int CandidateId { get; set; }
        public string AssesmentStatus { get; set; }
    }
    public class CandidateWiseFeedback
    {
        public int AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public int AssessmentAssignId { get; set; }
        public int CandidateId { get; set; }
        public string FeedbackStatus { get; set; }
    }

    public class CandidateAssessmentReleaseListSearch
    {
        public long? CandidateId { get; set; }
        public long? BatchId { get; set; }
        public string CandidateNo { get; set; }
        public string Name { get; set; }
        public string EmpNo { get; set; }
        public long? Location { get; set; }
        public long? Function { get; set; }
        public long? AssesmentStatus { get; set; }
        public long? CoOrdinatorId { get; set; }
        public int? VerticalId { get; set; }
    }

    public class CandidateAssessment
    {
        public CandidateAssessmentMaster CandidateAssessmentMaster { get; set; }
        public List<CandidateAssessmentDetails> CandidateAssessmentDetails { get; set; }
    }
    public class CandidateAssessmentMasterData
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public decimal TotalScore { get; set; }
        public List<CandidateAssessmentDetails> CandidateAssessmentDetails { get; set; }
    }
    public class CandidateAssessmentMaster
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public decimal TotalScore { get; set; }
    }

    public class CandidateAssessmentDetails
    {
        public long AssessmentReleaseId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public string AssignedOn { get; set; }
        public decimal Score { get; set; }
        public string Status { get; set; }
        public string AssessmentTypeName { get; set; }
    }

    public class CandidateAssessmentSearch
    {
        public long? CandidateId { get; set; }
    }

    ////
    ///

    public class AssessmentCandidate
    {
        public AssessmentMasterDataCandidate AssessmentMasterDataCandidate { get; set; }
        public List<AssessmentQuestionDataDetailsCandidate> AssessmentQuestionDataDetailsCandidate { get; set; }
        public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }

    public class AssessmentDataCandidate
    {
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public List<AssessmentQuestionDataCandidate> AssessmentQuestionDataCandidate { get; set; }
        public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }

    public class AssessmentShowDataCandidate
    {
        public long AssessmentId { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public List<AssessmentQuestionDataDetailsCandidate> AssessmentQuestionDataDetailsCandidate { get; set; }
    }
    public class AssessmentQuestionDataDetailsCandidate
    {
        public long CandidateAssessmentQuestionId { get; set; }
        public long AssessmentQuestionId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public string AssessmentQuestion { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
        public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }
    public class AssessmentMasterDataCandidate
    {
        public long AssessmentId { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class AssessmentQuestionDataCandidate
    {
        public long CandidateAssessmentQuestionId { get; set; }
        public long AssessmentQuestionId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public string AssessmentQuestion { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
    }

    public class AssessmentQuestionAnswerOptionCandidate
    {
        public long CandidateAssessmentQuestionAnswerOptionId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long AssessmentQuestionAnswerOptionId { get; set; }
        public long AssessmentQuestionId { get; set; }
        public long CandidateAssessmentQuestionId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public long AssessmentQuestionAnswerOrder { get; set; }
        public string AssessmentAnswer { get; set; }
        public bool IsAnswer { get; set; }
    }

    public class AssessmentSearchCandidate
    {
        public long? CandidateId { get; set; }
        public long? AssessmentId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class AssessmentSaveCandidate
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long AssessmentId { get; set; }
        public int CreatedBy { get; set; }
        public List<AssessmentQuestionDataCandidate> AssessmentQuestionDataCandidate { get; set; }
        public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }
    public class BatchesFeedbackList
    {
        public BatchesFeedbackListMatster BatchesFeedbackListMatster { get; set; }
        public List<BatchesFeedbackDetailsList> BatchesFeedbackDetailsList { get; set; }
    }
    public class BatchesFeedbackListMatster
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CoOrdinatiorId { get; set; }
        public long UserId { get; set; }
        public string DateofJoining { get; set; }
        public long TotalAssignment { get; set; }
        public long AssessmentRelesed { get; set; }
        public string AssessmentStatus { get; set; }
    }
    public class BatchesFeedbackDetailsList
    {
        public long CandidateId { get; set; }
        public long BatchId { get; set; }
        public long AssessmentAssignId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public string AssignedOn { get; set; }
        public bool IsAssigned { get; set; }
        public string CreatedOn { get; set; }
        public long Candidate { get; set; }
        public long AssessmentDone { get; set; }
        public long AssessmentNotDone { get; set; }
        public long V3BatchId { get; set; }
        public long FeedbackDone { get; set; }
        public long FeedbackNotDone { get; set; }
        public bool evaluatebutton { get; set; }
        public long FeedBackAssignId { get; set; }
        public long FeedBackId { get; set; }
        public int FeedChecked { get; set; }
    }
    public class BatchesFeedbackData
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CoOrdinatiorId { get; set; }
        public long UserId { get; set; }
        public string DateofJoining { get; set; }
        public long TotalAssignment { get; set; }
        public long AssessmentRelesed { get; set; }
        public string AssessmentStatus { get; set; }
        public List<BatchesFeedbackDetailsList> BatchesFeedbackDetailsList { get; set; }
    }
    public class BatchesAssementEvaluateList
    {
        public BatchesAssementEvaluateListMatster BatchesAssementEvaluateListMatster { get; set; }
        public List<BatchesAssementEvaluateDetailsList> BatchesAssementEvaluateDetailsList { get; set; }
    }

    public class BatchesAssementEvaluateData
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CoOrdinatiorId { get; set; }
        public long UserId { get; set; }
        public string DateofJoining { get; set; }
        public long TotalAssignment { get; set; }
        public long AssessmentRelesed { get; set; }
        public string AssessmentStatus { get; set; }
        public List<BatchesAssementEvaluateDetailsList> BatchesAssementEvaluateDetailsList { get; set; }
    }

    public class BatchesAssementEvaluateListMatster
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long CoOrdinatiorId { get; set; }
        public long UserId { get; set; }
        public string DateofJoining { get; set; }
        public long TotalAssignment { get; set; }
        public long AssessmentRelesed { get; set; }
        public string AssessmentStatus { get; set; }
    }

    public class BatchesAssementEvaluateDetailsList
    {
        public long CandidateId { get; set; }
        public long BatchId { get; set; }
        public long AssessmentReleaseId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public string AssessmentTypeName { get; set; }
        public string AssignedOn { get; set; }
        public string Status { get; set; }
        public string AssessmentStatus { get; set; }
        public string Download { get; set; }
        public long TotalNoCandidate { get; set; }
        public long FilledNoCandidate { get; set; }
        public bool evaluatebutton { get; set; }
    }

    public class BatchesAssementEvaluateListSearch
    {
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? CoOrdinatiorId { get; set; }
    }

    public class BatchesFeedbackListSearch
    {
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? CoOrdinatiorId { get; set; }
    }

    public class CandidateEvaluation
    {
        public CandidateEvaluationMaster CandidateEvaluationMaster { get; set; }
        public List<CandidateEvaluationQuestionMaster> CandidateEvaluationQuestionMaster { get; set; }
        public List<CandidateEvaluationQuestionAnswer> CandidateEvaluationQuestionAnswer { get; set; }
    }

    public class CandidateEvaluationData
    {
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public List<CandidateEvaluationQuestionMaster> CandidateEvaluationQuestionMaster { get; set; }
    }
    public class CandidateEvaluationMaster
    {
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
    }

    public class CandidateEvaluationQuestionMaster
    {
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public long CandidateAssessmentQuestionId { get; set; }
        public string AssessmentQuestionAnswer { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
        public List<CandidateEvaluationQuestionAnswer> CandidateEvaluationQuestionAnswer { get; set; }
    }

    public class CandidateEvaluationQuestion
    {
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public long CandidateAssessmentQuestionId { get; set; }
        public string AssessmentQuestionAnswer { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
    }

    public class CandidateEvaluationQuestionAnswer
    {
        public long BatchId { get; set; }
        public long AssessmentId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long CandidateAssessmentQuestionId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public long CandidateAssessmentQuestionAnswerOptionId { get; set; }
        public string AssessmentAnswer { get; set; }
        public long AssessmentQuestionTypeId { get; set; }
        public string AssessmentQuestionType { get; set; }
        public bool SingleChoiseQuestionStatus { get; set; }
        public bool DescreptiveQuestionStatus { get; set; }
        public long CorrectAnswer { get; set; }

    }

    public class CandidateEvaluationSearch
    {
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? AssessmentId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
    }

    public class CandidateEvaluationSave
    {
        public int CreatedBy { get; set; }
        public List<CandidateEvaluationAnswerSave> CandidateEvaluationAnswerSave { get; set; }
    }

    public class CandidateScore
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long Score { get; set; }

    }

    public class CandidateEvaluationAnswerSave
    {
        public long CandidateAssessmentDescQuestionEvaluationId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateAssessmentQuestionId { get; set; }
        public long CandidateAssessmentQuestionAnswerOptionId { get; set; }
        public bool IsCorrect { get; set; }
    }

    public class CandidateEvaluationUploadSave
    {
        public long CandidateAssessmentId { get; set; }
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string FilePath { get; set; }
        public long CreatedBy { get; set; }
        public List<CandidateEvaluationUploadDetailsSave> CandidateEvaluationUploadDetailsSave { get; set; }
    }
    public class CandidateEvaluationUploadDataCsv
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EvaluatorComments { get; set; }
        public long Score { get; set; }
        public long TotalQuestion { get; set; }
        public string Remarks { get; set; }
        //public List<CandidateEvaluationUploadDataCsv> candidateEvaluationUploadDataCsv { get; set; }
    }


    public class CandidateEvaluationUploadDetailsSave
    {
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EvaluatorComments { get; set; }
        public long Score { get; set; }
        public long TotalQuestion { get; set; }
        public string Remarks { get; set; }
    }

    public class CandidateEvaluationUploadView
    {
        public CandidateEvaluationUploadViewMaster CandidateEvaluationUploadViewMaster { get; set; }
        public List<CandidateEvaluationUploadDetailsView> CandidateEvaluationUploadDetailsView { get; set; }
    }
    public class CandidateEvaluationUploadViewMaster
    {
        public long CandidateAssessmentEvalutaionUploadId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string FilePath { get; set; }
    }
    public class CandidateEvaluationUploadViewData
    {
        public long CandidateAssessmentEvalutaionUploadId { get; set; }
        public long CandidateAssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string FilePath { get; set; }
        public List<CandidateEvaluationUploadDetailsView> CandidateEvaluationUploadDetailsView { get; set; }
    }

    public class CandidateEvaluationUploadViewSearch
    {
        public long? CandidateAssessmentId { get; set; }
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
    }

    public class CandidateEvaluationUploadDetailsView
    {
        public long CandidateAssessmentEvalutaionUploadId { get; set; }
        public long CandidateAssessmentEvalutaionUploadDetailsId { get; set; }
        public string EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EvaluatorComments { get; set; }
        public long Score { get; set; }
        public long TotalQuestion { get; set; }
        public string Remarks { get; set; }
    }

    public class CandidateAssessmentEvaluationView
    {
        public CandidateAssessmentEvaluationMaster CandidateAssessmentEvaluationMaster { get; set; }
        public List<CandidateEvaluationQuestionShowData> CandidateEvaluationQuestionShowData { get; set; }
        public List<CandidateEvaluationAnswerData> CandidateEvaluationAnswerData { get; set; }
    }

    public class CandidateAssessmentEvaluationMaster
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public decimal OverAllPercentage { get; set; }
    }
    public class CandidateAssessmentEvaluationViewShow
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public decimal OverAllPercentage { get; set; }
        public List<CandidateEvaluationQuestionShowData> CandidateEvaluationQuestionShowData { get; set; }
    }

    public class CandidateEvaluationQuestionShowData
    {
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentTypeId { get; set; }
        public decimal Total { get; set; }
        public List<CandidateEvaluationAnswerData> CandidateEvaluationAnswerData { get; set; }
    }

    public class CandidateEvaluationQuestionData
    {
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public decimal Total { get; set; }
    }

    public class CandidateEvaluationAnswerData
    {
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long AssessmentId { get; set; }
        public long AssessmentQuestionOrder { get; set; }
        public long CandidateAssessmentQuestionId { get; set; }
        public string AssessmentQuestion { get; set; }
        public string AssessmentAnswer { get; set; }
        public bool QuestionStatus { get; set; }
    }

    public class CandidateAssessmentEvaluationViewSearch
    {
        public long? CandidateId { get; set; }
    }

    public class CandidateAssessmentSummary
    {
        public List<CandidateAssessmentSummaryShow> CandidateAssessmentSummaryShow { get; set; }
        public List<CandidateAssessmentSummaryDetails> CandidateAssessmentSummaryDetails { get; set; }
    }

    public class CandidateAssessmentSummaryMaster
    {
        public long AssessmentEvaluationSummaryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public long Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long QualificationId { get; set; }
        public string QualificationName { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long WorkAreaId { get; set; }
        public string WorkAreaName { get; set; }
        public long TraingLocationId { get; set; }
        public string TraingLocationName { get; set; }
    }

    public class CandidateAssessmentSummaryView
    {
        public List<CandidateAssessmentSummaryShow> CandidateAssessmentSummaryMaster { get; set; }
    }
    public class CandidateAssessmentSummaryShow
    {
        public long AssessmentEvaluationSummaryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public long Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long QualificationId { get; set; }
        public string QualificationName { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long WorkAreaId { get; set; }
        public string WorkAreaName { get; set; }
        public long TraingLocationId { get; set; }
        public string TraingLocationName { get; set; }
        public List<CandidateAssessmentSummaryDetails> CandidateAssessmentSummaryDetails { get; set; }
    }

    public class CandidateAssessmentSummaryDetails
    {
        public long AssessmentEvaluationSummaryId { get; set; }
        public bool Uploded { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public decimal AssessmentPercent { get; set; }
        public string AssessmentRemarks { get; set; }
        public string WorkArea { get; set; }
    }

    public class CandidateAssessmentSummaryPending
    {
        public List<CandidateAssessmentSummaryShowPending> CandidateAssessmentSummaryShowPending { get; set; }
        public List<CandidateAssessmentSummaryPendingDetails> CandidateAssessmentSummaryPendingDetails { get; set; }
    }
    public class CandidateAssessmentSummaryShowPending
    {
        public long AssessmentEvaluationSummaryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public long Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long QualificationId { get; set; }
        public string QualificationName { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long WorkAreaId { get; set; }
        public string WorkAreaName { get; set; }
        public long TraingLocationId { get; set; }
        public string TraingLocationName { get; set; }
        public List<CandidateAssessmentSummaryPendingDetails> CandidateAssessmentSummaryPendingDetails { get; set; }
    }
    public class CandidateAssessmentSummaryPendingDetails
    {
        public long CandidateId { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public long AssessmentAssignId { get; set; }
        public string AssesmentStatus { get; set; }
    }
    public class CandidateAssessmentSummaryViewPending
    {
        public List<CandidateAssessmentSummaryShowPending> CandidateAssessmentSummaryMasterPending { get; set; }
    }
    public class CandidateAssessmentSummaryMasterPending
    {
        public long AssessmentEvaluationSummaryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public long Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long QualificationId { get; set; }
        public string QualificationName { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long WorkAreaId { get; set; }
        public string WorkAreaName { get; set; }
        public long TraingLocationId { get; set; }
        public string TraingLocationName { get; set; }
    }
    public class CandidateAssessmentSummarySave
    {
        public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public long CreatedBy { get; set; }
        public List<CandidateAssessmentSummaryDetailsSave> CandidateAssessmentSummaryDetailsSave { get; set; }
        public List<Detaillist> Detaillist { get; set; }
    }
    public class Detaillist
    {
        public long AssessmentEvaluationSummaryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public long EmployeeStatusId { get; set; }
        public string EmployeeStatusName { get; set; }
        public string CandidateFullName { get; set; }
        public long Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public long BatchId { get; set; }
        public string BatchNo { get; set; }
        public long QualificationId { get; set; }
        public string QualificationName { get; set; }
        public long CoOrdinatiorId { get; set; }
        public string DateofJoining { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long WorkAreaId { get; set; }
        public string WorkAreaName { get; set; }
        public long TraingLocationId { get; set; }
        public string TraingLocationName { get; set; }
        public List<CandidateAssessmentSummaryDetails> CandidateAssessmentSummaryDetails { get; set; }
    }
    public class CandidateAssessmentSummaryDetailsSave
    {
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public bool Uploded { get; set; }
        public long AssessmentId { get; set; }
        public string AssessmentName { get; set; }
        public decimal AssessmentPercent { get; set; }
        public string AssessmentRemarks { get; set; }
        public string WorkArea { get; set; }
    }

    public class CandidateAssessmentSummarySearch
    {
        public long? CandidateId { get; set; }
        public long? BatchId { get; set; }
        public long? CoOrdinatorId { get; set; }
        public bool ? IsReassigned { get; set; }
    }
    public class CandidateAssessmentSummaryPendingSearch
    {
        public long? CandidateId { get; set; }
        public long? BatchId { get; set; }
        public long? CoOrdinatorId { get; set; }
    }
    public class EmailIds
    {
        public string EmpEmailId { get; set; }
    }
}







