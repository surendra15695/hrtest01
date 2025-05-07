using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.JoiningModule
{
    public class FeedbackQuestionType
    {
        public long FeedBackQuestionTypeId { get; set; }
        public string FeedBackQuestionTypeName { get; set; }
        public bool IsActive { get; set; }
    }

    public class FeedbackQuestionTypeSearch
    {
        public long? FeedBackQuestionTypeId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class FeedBackQuestionOption
    {
        public long FeedBackQuestionTypeId { get; set; }
        public string FeedBackQuestionTypeName { get; set; }
        public long FeedBackQuestionTypeOptionId { get; set; }
        public string FeedBackQuestionOptionTypeName { get; set; }
        public bool IsActive { get; set; }
    }

    public class FeedBackQuestionOptionSearch
    {
        public long? FeedBackQuestionTypeId { get; set; }
        public long? FeedBackQuestionTypeOptionId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class FeedBackList
    {
        public long SL { get; set; }
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long FeedBackTypeId { get; set; }
        public string FeedBackTypeName { get; set; }
        public long EmpId { get; set; }
        public string EmpName { get; set; }
        public bool IsActive { get; set; }
        public bool IsEnabled { get; set; }
        public int CreatedBy { get; set; }
        public string ModifiedOn { get; set; }
    }
    public class FeedBackScheduleList
    {        
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long FeedBackTypeId { get; set; }
        public string FeedBackTypeName { get; set; }
     
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public long FeedBackScheduleId { get; set; }
        public long NumberOfDays { get; set; }
    }


    public class FeedBackListSearch
    {
        public long? FeedBackId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class FeedBack
    {
        public FeedBackMasterData FeedBackMasterData { get; set; }
        public List<FeedBackQuestionDataDetails> FeedBackQuestionDataDetails { get; set; }
    }

    public class FeedBackMasterData
    {
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long FeedbackTypeId { get; set; }
        public string FeedBackTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class FeedBackQuestionDataDetails
    {
        public long FeedBackQuestionId { get; set; }
        public long FeedBackId { get; set; }
        public long FeedBackQuestionOrder { get; set; }
        public long FeedBackQuestionTypeId { get; set; }
        public string FeedBackQuestionTypeName { get; set; }
        public long FeedBackQuestionTypeOptionId { get; set; }
        public string FeedBackQuestionOptionTypeName { get; set; }
        public string FeedBackQuestion { get; set; }
        public string FeedBackAnswer { get; set; }

    }
    public class FeedBackSearch
    {
        public long? FeedBackId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class FeedBackSave
    {
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long FeedBackTypeId { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<FeedBackQuestionData> FeedBackQuestionData { get; set; }
        public bool IsEnabled { get; set; }
    }

    public class FeedBackQuestionData
    {
        public long FeedBackQuestionId { get; set; }
        public long FeedBackId { get; set; }
        public long FeedBackQuestionOrder { get; set; }
        public long FeedBackQuestionTypeId { get; set; }
        public string FeedBackQuestionTypeName { get; set; }
        public long FeedBackQuestionTypeOptionId { get; set; }
        public string FeedBackQuestionOptionTypeName { get; set; }
        public string FeedBackQuestion { get; set; }
        public string FeedBackAnswer { get; set; }
    }
    public class FeedBackScheduleSearch
    {
        public long FeedBackId { get; set; }
 public long FeedbackTypeId { get; set; }
    }
    public class FeedBackScheduleSave
    {
        public long FeedBackScheduleId { get; set; }
        public long FeedBackId { get; set; }
        public long FeedBackTypeId { get; set; }
        public int NumberOfDays { get; set; }
        public long CreatedBy { get; set; }
    }
    public class FeedBackAssignSave
    {
        public long FeedBackId { get; set; }
        public long FeedBackTypeId { get; set; }
        //public long BatchId { get; set; }
        public long CandidateId { get; set; }
        public int vertical { get; set; }
        public int? trainingTittleId { get; set; }
        public long CreatedBy { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }

    }

    public class CandidateFeedBack
    {
        public CandidateFeedBackMaster CandidateFeedBackMaster { get; set; }
        public List<CandidateFeedBackDetails> CandidateFeedBackDetails { get; set; }
    }

    public class CandidateFeedBackMasterData
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
        public List<CandidateFeedBackDetails> CandidateFeedBackDetails { get; set; }
    }
    public class CandidateFeedBackMaster
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

    public class CandidateFeedBackDetails
    {
        public long FeedBackAssignId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public string AssignedOn { get; set; }
        public decimal Score { get; set; }
        public string Status { get; set; }
    }

    public class CandidateFeedBackSearch
    {
        public long? CandidateId { get; set; }
    }

    public class FeedBackCandidate
    {
        public List<FeedBackMasterDataCandidate> FeedBackMasterDataCandidate { get; set; }
        public List<FeedBackQuestionDataDetailsCandidate> FeedBackQuestionDataDetailsCandidate { get; set; }
        //public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }

    public class FeedBackMasterDataCandidate
    {
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateFeedBackId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public string TrainingTitle { get; set; }
        public decimal FeedBackAvg { get; set; }
    }

    public class FeedBackQuestionDataDetailsCandidate
    {
        public long CandidateFeedBackQuestionId { get; set; }
        public long CandidateFeedBackId { get; set; }
        public long FeedBackQuestionId { get; set; }
        public long FeedBackQuestionOrder { get; set; }
        public string FeedBackQuestion { get; set; }
        public long FeedBackQuestionTypeId { get; set; }
        public long FeedBackQuestionTypeOptionId { get; set; }
        public string FeedBackQuestionTypeName { get; set; }
        public string FeedBackAnswer { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        //public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }

    public class FeedBackSearchCandidate
    {
        public long? CandidateId { get; set; }
        public long? FeedBackId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class FeedBackShowDataCandidate
    {
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateFeedBackId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public string TrainingTitle { get; set; }
        public List<FeedBackQuestionDataDetailsCandidate> FeedBackQuestionDataDetailsCandidate { get; set; }
    }
    //public class FeedBackQuestionAnswerOptionCandidate
    //{
    //    public long CandidateAssessmentQuestionAnswerOptionId { get; set; }
    //    public long CandidateAssessmentId { get; set; }
    //    public long AssessmentQuestionAnswerOptionId { get; set; }
    //    public long AssessmentQuestionId { get; set; }
    //    public long CandidateAssessmentQuestionId { get; set; }
    //    public long AssessmentQuestionOrder { get; set; }
    //    public long AssessmentQuestionAnswerOrder { get; set; }
    //    public string AssessmentAnswer { get; set; }
    //    public bool IsAnswer { get; set; }
    //}
    public class FeedBackSaveCandidate
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateFeedBackId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long FeedBackId { get; set; }
        public int CreatedBy { get; set; }
        public List<FeedBackQuestionAnswerDataCandidate> FeedBackQuestionAnswerDataCandidate { get; set; }
    }

    public class FeedBackQuestionAnswerDataCandidate
    {
        public long CandidateFeedBackQuestionId { get; set; }
        public long FeedBackQuestionId { get; set; }
        public long CandidateFeedBackId { get; set; }
        public long FeedBackQuestionOrder { get; set; }
        public string FeedBackQuestion { get; set; }
        public long FeedBackQuestionTypeId { get; set; }
        public string FeedBackQuestionAnswer { get; set; }
    }



    public class CandidateFeedbackMasterData
    {
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public long EmpNo { get; set; }
        public string DateOfJoining { get; set; }
        public int BatchId { get; set; }
        public string BatchNo { get; set; }
        public string DesignationName { get; set; }
        public string GradeName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocationName { get; set; }
    }

    public class CandidateFeedbackDetailData
    {
        public long AssessmentAssignId { get; set; }
        public long FeedbackId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; } 
        public string ReleaseDate { get; set; } 
        public string AssignedOn { get; set; }
        public string OverallRating { get; set; }
        public string FeedbackStatusId { get; set; }
        public bool Feedbackbutton { get; set; }
        public bool ButtonAppears { get; set; }
    }

    public class CandidateFeedbackOverallData
    {
        public CandidateFeedbackMasterData CandidateData { get; set; }
        public List<CandidateFeedbackDetailData> CandidateDetailData { get; set; }
    }

    public class CandidateWiseFeedbackData
    {
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public long EmpNo { get; set; }
        public string DateOfJoining { get; set; }
        public int BatchId { get; set; }
        public string BatchNo { get; set; }
        public string DesignationName { get; set; }
        public string GradeName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocationName { get; set; }
        public List<CandidateFeedbackDetailData> CandidateDetailData { get; set; }
    }

    public class ViewFeedBackCandidate
    {
        public long FeedBackId { get; set; }
        public string FeedBackName { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public long CandidateFeedBackId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public string TrainingTitle { get; set; }
        public decimal FeedBackAvg { get; set; }
        public List<FeedBackQuestionDataDetailsCandidate> FeedBackQuestionDataDetailsCandidate { get; set; }
        //public List<AssessmentQuestionAnswerOptionCandidate> AssessmentQuestionAnswerOptionCandidate { get; set; }
    }


    public class OnboardingCandidateInductionFeedback
    {
        public ViewFeedBackCandidate FeedbackData { get; set; }
    }

    public class NewJoinerFeedbackListInput
    {
        public int? CandidateId { get; set; }
        public int? BatchId { get; set; }
        public int? CoOrdinatorId { get; set; }
    }
    public class NewJoinerFeedbackListOutput
    {
        public int CandidateId { get; set; }
        public int BatchId { get; set; }
        public int CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public bool FeedbackDone { get; set; }
    }
}
