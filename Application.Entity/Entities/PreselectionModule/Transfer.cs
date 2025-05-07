using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.PreselectionModule
{
    public class Transfer
    {
    }
    public class SearchVacancyList
    {
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int VerticalId { get; set; }
    }

    public class VacancyList
    {
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public int FunctionId{get;set;}
        public string FunctionName{get;set;}
        public int DepartmentId{get;set;}
        public string DepartmentName{get;set;}
    }

    public class TransferFormData
    {
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public long CreatedBy { get; set; }
        public List<TransferDataObject> TransferData { get; set; }
        public List<TrasferUniqueFunctionIds> UniqueFunctionId { get; set; }
    }

    // Added this class by Kuntal on 20-07-2022 for email sending on requiusition creation
    public class TrasferUniqueFunctionIds
    {
        public int FunctionId { get; set; }
    }

    public class TransferDataObject
    {
        public int AutoId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public int OldFunctionId { get; set; }
        public int OldDepartmentId { get; set; }
        public int NewVerticalId { get; set; }
        public int NewLocationId { get; set; }
        public int NewFunctionId { get; set; }
        public int NewDepartmentId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string DOT { get; set; }
        public string TargetDate { get; set; }
        public int ReplacementStatusId { get; set; }
        public string Remarks { get; set; }
    }

    public class TransferList
    {
        public long TransferDetailId { get; set; }
        public long TransferId { get; set; }
        public int SerialNo { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public int OldVerticalId { get; set; }
        public string OldVerticalName { get; set; }
        public int OldLocationId { get; set; }
        public string OldLocationNo { get; set; }
        public int OldDepartmentId { get; set; }
        public string OldDepartmentName { get; set; }
        public int OldFunctionId { get; set; }
        public string OldFunctionName { get; set; }
        public int NewVerticalId { get; set; }
        public string NewVerticalName { get; set; }
        public int NewLocationId { get; set; }
        public string NewLocationNo { get; set; }
        public int NewFunctionId { get; set; }
        public string NewFunctionName { get; set; }
        public int NewDepartmentId { get; set; }
        public string NewDepartmentName { get; set; }
        public long ForRequisitionDetailId { get; set; }
        public string ForRequisitionNo { get; set; }
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
        public string CreatedOnDate { get; set; }
        public string CreatedOnTime { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int TransferApprovalStatusId { get; set; }
        public int FunctionId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int TransferProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string JDDocument { get; set; }
        public int ReplacementStatusId { get; set; }
        public string ReplacementStatusName { get; set; }
        public string DOT{get;set;}
        public string OLDLocation { get; set; }
        public string NEWLocation { get; set; }

    }
    public class TransferListNew
    {
        
        public int SerialNo { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }        
        public string OldVerticalName { get; set; }
        public string OldLocationNo { get; set; }
        public string OldDepartmentName { get; set; }
        public string OldFunctionName { get; set; }
        public string NewVerticalName { get; set; }
        public string NewLocationNo { get; set; }
        public string NewFunctionName { get; set; }
        public string NewDepartmentName { get; set; }
        public string ForRequisitionNo { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public string JobTypeName { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOnDate { get; set; }
        public string CreatedOnTime { get; set; }
        public string CreatedByUserName { get; set; }
        public string ApprovalStatus { get; set; }
        public string ProcessStatus { get; set; }
        public string ReplacementStatusName { get; set; }
        public string DOT { get; set; }
        public string OLDLocation { get; set; }
        public string NEWLocation { get; set; }

    }

    public class SearchTransferList
    {
        public long? TransferId { get; set; }
        public long? TransferDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ReplacementStatusId { get; set; }
        public int? TransferApprovalStatus { get; set; }
        public int? TransferProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public long? ApproverAutoUserId{get;set;}
    }

    public class TransferAcknowledgementFormData
    {
        public long TransferDetailId { get; set; }
        public int AcknowledgementStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class MergeTransferData
    {
        public long TransferDetailId { get; set; }
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

    public class MergeTransferFormData
    {
        public int CreatedBy { get; set; }
        public List<MergeTransferData> TransferData { get; set; }
    }

    public class TransferApproveRejectFormData
    {
        public long TransferDetailId { get; set; }
        public int StatusId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchTransferHoldRelease
    {
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class TransferHoldRelease
    {
        public long TransferDetailId { get; set; }
        public long TransferId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public int OldVerticalId { get; set; }
        public string OldVerticalName { get; set; }
        public int OldLocationId { get; set; }
        public string OldLocationNo { get; set; }
        public int OldDepartmentId { get; set; }
        public string OldDepartmentName { get; set; }
        public int OldFunctionId { get; set; }
        public string OldFunctionName { get; set; }
        public int NewVerticalId { get; set; }
        public string NewVerticalName { get; set; }
        public int NewLocationId { get; set; }
        public string NewLocationNo { get; set; }
        public int NewFunctionId { get; set; }
        public string NewFunctionName { get; set; }
        public int NewDepartmentId { get; set; }
        public string NewDepartmentName { get; set; }
        public long ForRequisitionDetailId { get; set; }
        public string ForRequisitionNo { get; set; }
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
        public int TransferApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int TransferProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string JDDocument { get; set; }
        public int ReplacementStatusId { get; set; }
        public string ReplacementStatusName { get; set; }
        public bool CheckStatus { get; set; }
        public string DOT{get;set;}
    }

    public class TransferHoldReleaseData
    {
        public int AutoId { get; set; }
        public long TransferDetailId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string Remarks { get; set; }
        public string TargetDate { get; set; }

    }

    public class TransferHoldReleaseSubmitFormData
    {
        public List<TransferHoldReleaseData> HoldReleaseTransferData { get; set; }
        public long CreatedBy { get; set; }
    }
    public class DeleteTransferList
    {
        public long? TransferDetailId { get; set; }
    }
}
