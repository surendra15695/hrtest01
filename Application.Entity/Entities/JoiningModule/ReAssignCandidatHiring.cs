using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.JoiningModule
{
    public class ReAssignCandidatHiringList
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string OnBoardingManagerName { get; set; }
        public string EmailId { get; set; }
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
        public long CandidateBVGReportId { get; set; }
        public string BVGReportStatus { get; set; }
        public string DateofJoining { get; set; }
        public long JoiningCheckListId { get; set; }
        public string JoiningCheckListStatus { get; set; }
        public string EmpId { get; set; }
        public string EmpployeeNo { get; set; }
        public long HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long HiringTeamId { get; set; }
        public long ModeofJoiningId { get; set; }
        public string ModeofJoining { get; set; }
    }

    public class ReAssignCandidatHiringListSearch
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string Name { get; set; }
        public long? VerticalId { get; set; }
        public long? LocationId { get; set; }
        public long? FunctionId { get; set; }
        public long? HiringStatus { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
    }
    public class ReAssignHiringList
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string OnBoardingManagerName { get; set; }
        public string EmailId { get; set; }
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
        public long CandidateBVGReportId { get; set; }
        public string BVGReportStatus { get; set; }
        public string DateofJoining { get; set; }
        public long JoiningCheckListId { get; set; }
        public string JoiningCheckListStatus { get; set; }
        public string EmpId { get; set; }
        public string EmpployeeNo { get; set; }
        public long HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long HiringTeamId { get; set; }
        public long ModeofJoiningId { get; set; }
        public string ModeofJoining { get; set; }
    }

    public class ReAssignHiringListSearch
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string Name { get; set; }
        public long? VerticalId { get; set; }
        public long? LocationId { get; set; }
        public long? FunctionId { get; set; }
        public long? HiringStatus { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
    }

    // Added By Anif on 17-02-2023

    public class SearchDiscontinuedCandidate
    {
        public int ? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int ? BatchId { get; set; }
        public string BatchNo { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string LastTrainingFrom { get; set; }
        public string LastTrainingTo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
    }
    public class DiscontinuedCandidateList
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpployeeNo { get; set; }
        public int BatchId { get; set; }
        public string BatchNo { get; set; }
        public string FullName { get; set; }
        public string DesignationName { get; set; }
        public int Vertical { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string EmailId { get; set; }
        public string Contact { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string DateofJoining { get; set; }
        public string ModeofJoining { get; set; }
        public string LastTrainingDate { get; set; }
        public string ReassignStatus { get; set; }
        public long RequisitionDetailId { get; set; }
    }

}
