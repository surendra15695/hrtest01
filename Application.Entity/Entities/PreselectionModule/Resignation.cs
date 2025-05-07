using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.PreselectionModule
{
    public class ResignationFormData
    {
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public long CreatedBy { get; set; }
        public string SepIntFiles { get; set; }
        public List<ResignationDataObject> ResignationData { get; set; }
        public List<UniqueFunctionIds> UniqueFunctionIds { get; set; } // Added By Kuntal on 20-07-2022 for sending email on transfer creation
    }

    // Added this class by Kuntal on 20-07-2022 for email sending on transfer creation
    public class UniqueFunctionIds
    {
        public int FunctionId { get; set; }
    }

    public class ResignationDataObject
    {
        public int AutoId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string DOR { get; set; }
        public string LWD { get; set; }
        public string TargetDate { get; set; }
        public int ReasonId { get; set; }
        public int ReplacementStatusId { get; set; }
        public string Remarks { get; set; }
    }

    public class ResignationUpdateFormData
    {
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string DOR { get; set; }
        public string LWD { get; set; }
        public string SepInt { get; set; }
        public string TargetDate { get; set; }
        public long ResignationDetailId { get; set; }
        public string Remarks { get; set; }
        public string ClarificationRemarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class ResignationList
    {
        public long ResignationDetailId { get; set; }
        public long ResignationId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOn { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int ResignationApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int ResignationProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string JDDocument { get; set; }
        public int ReplacementStatusId { get; set; }
        public string ReplacementStatusName { get; set; }
        public int ReasonId { get; set; }
        public string ReasonName { get; set; }
        public string DOR { get; set; }
        public string LWD { get; set; }
        public string SepInt { get; set; }
    }

    public class SearchResignationList
    {
        public long? ResignationId { get; set; }
        public long? ResignationDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ReplacementStatusId { get; set; }
        public int? ReasonId { get; set; }
        public int? ResignationApprovalStatus { get; set; }
        public int? ResignationProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public int? ApproverAutoUserId { get; set; }
    }

    public class ResignationAcknowledgementFormData
    {
        public long ResignationDetailId { get; set; }
        public int AcknowledgementStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class MergeResignationData
    {
        public long ResignationDetailId { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string TargetDate { get; set; }
    }

    public class MergeResignationFormData
    {
        public int CreatedBy { get; set; }
        public List<MergeResignationData> ResignationData { get; set; }
    }

    public class ResignationApproveRejectFormData
    {
        public long ResignationDetailId { get; set; }
        public int StatusId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchResignationHoldRelease
    {
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class ResignationHoldRelease
    {
        public long ResignationDetailId { get; set; }
        public long ResignationId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOn { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int ResignationApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int ResignationProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string JDDocument { get; set; }
        public int ReplacementStatusId { get; set; }
        public string ReplacementStatusName { get; set; }
        public int ReasonId { get; set; }
        public string ReasonName { get; set; }
        public bool CheckStatus { get; set; }
        public string LWD{get;set;}
        public string DOR{get;set;}
    }

    public class ResignationHoldReleaseData
    {
        public int AutoId { get; set; }
        public long ResignationDetailId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string Remarks { get; set; }
        public string TargetDate { get; set; }

    }

    public class ResignationHoldReleaseSubmitFormData
    {
        public List<ResignationHoldReleaseData> HoldReleaseResignationData { get; set; }
        public long CreatedBy { get; set; }
    }

    public class ResignationClarificationFormData
    {
        public long ResignationDetailId { get; set; }
        public string ClarificationRemarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchResignationClarification
    {
        public long ResignationDetailId { get; set; }
    }

    public class ResignationClarificationList
    {
        public long ResignationDetailId { get; set; }
        public string ClarificationRemarks { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedOn { get; set; }
    }
    public class DeleteResignationFormData
    {
        public int TypeId { get; set; }
        public long DataId { get; set; }
        public long CreatedBy { get; set; }
    }

}
