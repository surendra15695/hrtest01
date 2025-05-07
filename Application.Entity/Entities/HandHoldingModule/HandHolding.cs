using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.HandHoldingModule
{
    class HandHolding
    {
    }

    public class HandHoldingAllocationSearch
    {
        public string EmpId { get; set; }
        public string EmpName { get; set; }
        public int? EmpStatus { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? ProbationId { get; set; }
        public int? AllocationStatus { get; set; }
        public int? VerticalId { get; set; }
        public string RoleId { get; set; }
        public int AutoUserId { get; set; }
    }

    public class HandHoldingAllocationCandidate
    {
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public int? ElidgbleFeedBack { get; set; }
        public int? ElidgbleReview { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int AllocationStatus { get; set; }
        public string AllocatedUserName { get; set; }
        public int? ReviewId { get; set; }
        public int? FeedbackId { get; set; }
    }

    public class HandHoldingAllocateFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long AutoUserId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchAICAllocatedList
    {
        public string EmpId { get; set; }
        public string EmpName { get; set; }
        public int? EmpStatus { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? ProbationId { get; set; }
        public int? ReviewStatus { get; set; }
        public int? VerticalId { get; set; }
        public long? AutoUserId { get; set; }
        public string RoleIds { get; set; }
    }

    public class AICAllocatedJobShadowCandidateList
    {
        public long JobShadowReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class AICAllocatedListenCandidateList
    {
        public long ListenReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class AICAllocatedHalfYearlyCandidateList
    {
        public long HalfYearlyReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class AICAllocatedConfirmationCandidateList
    {
        public long ConfirmationReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class AICHandHoldingJobShadowReviewFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long JobShadowReviewId { get; set; }
        public int Question1Status { get; set; }
        public string Question1Reason { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question7Answer { get; set; }
        public string Question8Answer { get; set; }
        public int Question9Status { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
        public Boolean isActive { get; set; } //ab
    }

    public class SearchAICHandHoldingJobShadowReviewDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long JobShadowReviewId { get; set; }
        //public List<RemarksDetailsData> remarksDetailsDatas { get; set; }
    }

    public class RemarksDetailsData
    {
        public int HandHoldingRemarksId { get; set; }
        public string Remarks { get; set; }
        public string CreatedBy { get; set; }

    }

    public class AICHandHoldingJobShadowReviewDetails
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public long JobShadowReviewId { get; set; }
        public int Question1Status { get; set; }
        public string Question1StatusName { get; set; }
        public string Question1Reason { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question7Answer { get; set; }
        public string Question8Answer { get; set; }
        public int Question9Status { get; set; }
        public string Question9StatusName { get; set; }
        public string Remarks { get; set; }
        public string Reviewer { get; set; }
        public string Approver { get; set; }
        public int ApprovalStatusId { get; set; }
        public string ApprovalRemarks { get; set; }

        public string ApprovedBy { get; set; }

        //public List<RemarksDetailsData> remarksDetailsDatas { get; set; }

    }
    public class JobShadowReviewDetailsData
    {
        public AICHandHoldingJobShadowReviewDetails aICHandHoldingJobShadowReviewDetails { get; set; }
        public List<RemarksDetailsData> remarksDetailsDatas { get; set; }
    }

    public class HandHoldingReviewQuestions
    {
        public int ReviewTypeId { get; set; }
        public int ReviewQuestionId { get; set; }
        public string ReviewQuestion { get; set; }
        public string Rating { get; set; }
        public string ReviewComments { get; set; }
    }

    public class AICHandHoldingListenReviewFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long ListenReviewId { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question7Answer { get; set; }
        public string Question8Answer { get; set; }
        public string Question9Answer { get; set; }
        public string Question10Answer { get; set; }
        public Boolean isActive { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchAICHandHoldingListenReviewDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long ListenReviewId { get; set; }
    }

    public class AICHandHoldingListenReviewDetails
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public long ListenReviewId { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question7Answer { get; set; }
        public string Question8Answer { get; set; }
        public string Question9Answer { get; set; }
        public string Question10Answer { get; set; }
        public string Remarks { get; set; }
        public string Reviewer { get; set; }
        public string Approver { get; set; }
        public int ApprovalStatusId { get; set; }
        public string ApprovalRemarks { get; set; }
    }

    public class AICHandHoldingHalfYearlyReviewFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long HalfYearlyReviewId { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
        public bool isActive { get; set; }
        public List<AICHandHoldingHalfYearlyReviewDetailFormData> DetailFormData { get; set; }
    }

    public class AICHandHoldingHalfYearlyReviewDetailFormData
    {
        public int ReviewFormId { get; set; }
        public int ReviewQuestionId { get; set; }
        public string Rating { get; set; }
        public string ReviewComments { get; set; }
    }

    public class SearchAICHandHoldingHalfYearlyReviewDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long HalfYearlyReviewId { get; set; }
    }

    public class AICHandHoldingHalfYearlyReviewDetailData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Remarks { get; set; }
        public string Reviewer { get; set; }
        public string Approver { get; set; }
        public int ApprovalStatusId { get; set; }
        public string ApprovalRemarks { get; set; }
    }

    public class HandHoldingHalfYearlyData
    {
        public AICHandHoldingHalfYearlyReviewDetailData HalfYearlyData { get; set; }
        public List<HandHoldingReviewQuestions> HalfYearlyDetailData { get; set; }
        public List<RemarksDetailsData> remarksDetailsDatas { get; set; }
    }

    public class AICHandHoldingHalfYearlyReviewDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Remarks { get; set; }
        public List<HandHoldingReviewQuestions> HalfYearlyReviewDetailList { get; set; }
    }

    public class AICHandHoldingConfirmationFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long ConfirmationReviewId { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public int ConfirmStatus { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
        public List<AICHandHoldingConfirmationReviewDetailFormData> DetailFormData { get; set; }
        public List<AICHandHoldingConfirmationReviewAssignmentFormData> AssignmentData { get; set; }
    }

    public class AICHandHoldingConfirmationReviewDetailFormData
    {
        public int ReviewFormId { get; set; }
        public int ReviewQuestionId { get; set; }
        public string Rating { get; set; }
        public string ReviewComments { get; set; }
    }

    public class AICHandHoldingConfirmationReviewAssignmentFormData
    {
        public string Assignments { get; set; }
        public string Rating { get; set; }
        public string AssignmentComments { get; set; }
    }

    public class SearchAICHandHoldingConfirmationReviewDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long ConfirmationReviewId { get; set; }
    }

    public class AICHandHoldingHalfConfirmationDetailData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public int ConfirmStatus { get; set; }
        public string ConfirmStatusName { get; set; }
        public string Remarks { get; set; }
        public string Reviewer { get; set; }
        public string Approver { get; set; }
        public int ApprovalStatusId { get; set; }
        public string ApprovalRemarks { get; set; }
        public string HodReviewerName { get; set; }
        public string HrHeadReviewerName { get; set; }
        public string PlantHeadReviewerName { get; set; }
        public string ReviewerReviewOn { get; set; }
        public string HodRemarksOn { get; set; }
        public string HeadPlantHrRemarksOn { get; set; }
        public string PlantHeadRemarksOn { get; set; }
        public string ReviewerSign { get; set; }
        public string HodReviewerSign { get; set; }
        public string HrHeadReviewerSign { get; set; }
        public string PlantHeadReviewerSign { get; set; }


    }

    public class HandHoldingConfirmationData
    {
        public AICHandHoldingHalfConfirmationDetailData ConfirmationData { get; set; }
        public List<HandHoldingReviewQuestions> ConfirmationDetailData { get; set; }
        public List<AICHandHoldingConfirmationReviewAssignmentFormData> ConfirmationAssignmentData { get; set; }
        public List<RemarksDetailsData> remarksDetailsDatas { get; set; }

    }

    public class HandHoldingHRFeedbackFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long? HRFeedbackId { get; set; }
        public string Question1Answer { get; set; }
        public string Question1Reason { get; set; }
        public string Question2Answer { get; set; }
        public string Question2Reason { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question6Reason { get; set; }
        public string Question7Answer { get; set; }
        public string Question7Reason { get; set; }
        public string Question8Answer { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchHandHoldingHRFeedbackDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
    }

    public class HandHoldingHRFeedbackDetails
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string Reviewer { get; set; }
        public long HRFeedbackId { get; set; }
        public string Question1Answer { get; set; }
        public string Question1Reason { get; set; }
        public string Question2Answer { get; set; }
        public string Question2Reason { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question6Reason { get; set; }
        public string Question7Answer { get; set; }
        public string Question7Reason { get; set; }
        public string Question8Answer { get; set; }
    }

    public class HandHoldingHRReviewFormData
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public long? HRReviewId { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question7Answer { get; set; }
        public string Question8Answer { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchHandHoldingHRReviewDetail
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
    }

    public class HandHoldingHRReviewDetails
    {
        public long CandidateId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long HRReviewId { get; set; }
        public string Reviewer { get; set; }
        public string Question1Answer { get; set; }
        public string Question2Answer { get; set; }
        public string Question3Answer { get; set; }
        public string Question4Answer { get; set; }
        public string Question5Answer { get; set; }
        public string Question6Answer { get; set; }
        public string Question7Answer { get; set; }
        public string Question8Answer { get; set; }
    }


    public class SearchHandHoldingApproverList
    {
        public string EmpId { get; set; }
        public string EmpName { get; set; }
        public int? EmpStatus { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? ProbationId { get; set; }
        public int? ReviewStatus { get; set; }
        public int? VerticalId { get; set; }
        public long? AutoUserId { get; set; }
        public string RoleIds { get; set; }
    }

    public class HandholdingApproverCandidateList
    {
        public long HandholdApprovalId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class HandholdingApproverCandidateListNew
    {
        public long HandholdApprovalId { get; set; }
        public long VerticalId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public long CandidateId { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string StatusId { get; set; }
        public string Joindate { get; set; }
        public string PendingStatus { get; set; }
        public string ConfirmationDue { get; set; }

    }

    public class ApproverJobShadowCandidateList
    {
        public long JobShadowReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class ApproverListenCandidateList
    {
        public long ListenReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class ApproverHalfYearlyCandidateList
    {
        public long HalfYearlyReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class ApproverConfirmationCandidateList
    {
        public long ConfirmationReviewId { get; set; }
        public long CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string EmployeeStatus { get; set; }
        public string DOJ { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string ConfirmationDue { get; set; }
        public int ReviewStatus { get; set; }
        public string ReviewStatusName { get; set; }
    }

    public class HandHoldingApproverActionFormData
    {
        public int FormTypeId { get; set; }
        public long ReviewId { get; set; }
        public int StatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
        public string RoleIds { get; set; }
    }

    public class DownloadFormsString
    {
       public string Empids { get; set; }
        public List<DownloadFormsStringValues> DownloadFormsStringValues { get; set; }
    }
    public class DownloadFormsStringValues
    {
        public string EmpNo { get; set; }
        public string Documentstring { get; set; }
    }
    public class ConfirmationReviewDetail
    {
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string CurrentDesignation { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string QualificationName { get; set; }
        public string DOJ { get; set; }
        public string Age { get; set; }
        public string CurrentCTC { get; set; }
        public string DuedateConfirmation { get; set; }
    }
    public class SearchConfirmationReviewDetail
    {
        public string EmpNo { get; set; }
        public int CandidateId { get; set; }
    }

}
