using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.PreselectionModule
{
    public class SuccessionPlanFormData
    {
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public long CreatedBy { get; set; }
        public List<SuccessionPlanDataObject> SuccessionPlanData { get; set; }
        public List<SuccessionPlanUniqueFunctionIds> UniqueFunctionId { get; set; }
    }

    // Added this class by Kuntal on 20-07-2022 for email sending on requiusition creation
    public class SuccessionPlanUniqueFunctionIds
    {
        public int FunctionId { get; set; }
    }

    public class SuccessionPlanDataObject
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
        public string TargetDate { get; set; }
        public int ReplacementStatusId { get; set; }
        public string Remarks { get; set; }
    }

    public class SuccessionPlanList
    {
        public long SuccessionPlanDetailId { get; set; }
        public long SuccessionPlanId { get; set; }
        public int SerialNo { get; set; }
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
        public string CreatedOnDate { get; set; }
        public string CreatedOnTime { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int SuccessionPlanApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int SuccessionPlanProcessStatusId { get; set; }
        public int ? ProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string JDDocument { get; set; }
        public int ReplacementStatusId { get; set; }
        public string ReplacementStatusName { get; set; }
        public string LocationOffice { get; set; }
        public string DOR { get; set; }
        public int IsReqDetailExists { get; set; }
        public string RequisitionNo { get; set; }
    }
    public class SuccessionPlanListNew
    {
        
        public int SerialNo { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public string LocationNo { get; set; }
        public string FunctionName { get; set; }        
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public string JobTypeName { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOnDate { get; set; }
        public string CreatedOnTime { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ProcessStatus { get; set; }
        public string ReplacementStatusName { get; set; }
        public string LocationOffice { get; set; }
        public string DOR { get; set; }
        public string RequisitionNo { get; set; }
    }

    public class SearchSuccessionPlanList
    {
        public long? SuccessionPlanId { get; set; }
        public long? SuccessionPlanDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ReplacementStatusId { get; set; }
        public int? SuccessionPlanApprovalStatus { get; set; }
        public int? SuccessionPlanProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public long? ApproverAutoUserId{get;set;}
    }

    public class SuccessionPlanAcknowledgementFormData
    {
        public long SuccessionPlanDetailId { get; set; }
        public int AcknowledgementStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class MergeSuccessionPlanData
    {
        public long SuccessionPlanDetailId { get; set; }
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

    public class MergeSuccessionPlanFormData
    {
        public int CreatedBy { get; set; }
        public List<MergeSuccessionPlanData> SuccessionPlanData { get; set; }
    }

    public class SuccessionPlanApproveRejectFormData
    {
        public long SuccessionPlanDetailId { get; set; }
        public int StatusId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchSuccessionPlanHoldRelease
    {
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SuccessionPlanHoldRelease
    {
        public long SuccessionPlanDetailId { get; set; }
        public long SuccessionPlanId { get; set; }
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
        public int SuccessionPlanApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int SuccessionPlanProcessStatusId { get; set; }
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

    public class SuccessionPlanHoldReleaseData
    {
        public int AutoId { get; set; }
        public long SuccessionPlanDetailId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string Remarks { get; set; }
        public string TargetDate { get; set; }

    }

    public class SuccessionPlanHoldReleaseSubmitFormData
    {
        public List<SuccessionPlanHoldReleaseData> HoldReleaseSuccessionPlanData { get; set; }
        public long CreatedBy { get; set; }
    }
    public class DeleteSuccessionPlanList
    {
        public long? SuccessionPlanDetailId { get; set; }
    }
}
