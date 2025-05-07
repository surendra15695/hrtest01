using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.VendorModule
{
    public class VendorJob
    {
    }

    public class CurrentJob
    {
        public int JobDescriptonMasterId { get; set; }
        public string StateName { get; set; }
        public string CreatedOn { get; set; }
        public int IsSubmitted { get; set; }
        public int IsNew { get; set; }
        public string JobPurpose { get; set; }
        public string JobSummary { get; set; }
        public string JobType { get; set; }
        public string Range { get; set; }
    }

    public class SearchCurrentJob
    {
        public int? PositionId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
    }

    public class VendorActivityList
    {
        public int JobDescriptonMasterId { get; set; }
        public string Message { get; set; }
        public string Designation { get; set; }
        public int IsSubmitted { get; set; }
        public int IsNew { get; set; }
        public string JobPurpose { get; set; }
        public string JobSummary { get; set; }
    }
    public class SearchActivityList
    {
        public int? PositionId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
    }

    public class VendorJobList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string JDDocument { get; set; }
        public int SalaryId { get; set; }
        public string SalaryName { get; set; }
        public string JobSummary { get; set; }
        public string RestrictedJD { get; set; }
        public string AllocatedDate { get; set; }
        public int SubmittedCandidateCount { get; set; }
        public int JDShowCount { get; set; }
        public int RestrictedJDShowCount { get; set; }
        public int SalaryShowCount { get; set; }
        public string Notes{get;set;}
    }

    public class SearchVendorJobList
    {
        public int VendorId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? PositionId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public int? StateId { get; set; }
        public bool? IsActive { get; set; }
    }
}
