using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.JoiningModule
{
    public class CandidateEmployee
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string CandidateFullName { get; set; }
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
        public string DateofJoining { get; set; }
        public long DocApprovalStatusId { get; set; }
        public string DocApprovalStatus { get; set; }
        public long SourceChannelId { get; set; }
        public string SourceChannelName { get; set; }
        public long CandidateOwnerId { get; set; }
        public string CandidateOwner { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public bool EmpStatusId { get; set; }
        public string EmpStatusName { get; set; }
        public long CandidateNoticePeriodBuyOutId { get; set; }
        public string NoticeperiodBuyoutStatus { get; set; }
        public long CandidateReallocationReimbursementEnableId { get; set; }
        public string ReallocationReimbursementEnableStatus { get; set; }

        public long HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
    }

    public class CandidateNoticePeriodBuyOutEnableSave
    {
        public string CandidateId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CandidateRelocationReimbursementEnableSave
    {
        public string CandidateId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CandidateEmployeeSearch
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string EmployeeNo { get; set; }
        public string RequisitionNo { get; set; }
        public long? Source { get; set; }
        public string Name { get; set; }
        public long? HiringStatus { get; set; }
        public bool? EmployeeStatus { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
    }
}
