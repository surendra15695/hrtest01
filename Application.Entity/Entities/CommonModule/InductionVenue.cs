using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class InductionVenueParam
    {
        public int? InductionVenueId { get; set; }
        public string InductionVenueName { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class AllInductionVenueParam
    {
        public int? InductionVenueId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class AllInductionVenue
    {
        public int? InductionVenueId { get; set; }
        public string InductionVenueName { get; set; }
        public int LocationId { get; set; }
        public Boolean? IsActive { get; set; }
        public Boolean? IsExternal { get; set; }
    }
    public class InductionVenueWithExternal
    {
        public int? InductionVenueId { get; set; }
        public string InductionVenueName { get; set; }
        public int LocationId { get; set; }
        public Boolean? IsActive { get; set; }
        public Boolean? IsExternal { get; set; }
    }
    public class InductionVenueInserUpdateParam
    {
        public int? InductionVenueId { get; set; }
        public string InductionVenueName { get; set; }
        public int LocationId { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
        public Boolean? IsExternal { get; set; }
    }

    public class SearchReportingVenue
    {
        public int? ReportingVenueId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class AllReportingVenue
    {
        public int? ReportingVenueId { get; set; }
        public string ReportingVenueName { get; set; }
        public string ReportingVenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
    }

    public class ReportingVenueInsertUpdate
    {
        public int? ReportingVenueId { get; set; }
        public string ReportingVenueName { get; set; }
        public string ReportingVenueAddress { get; set; }
        public Boolean IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
    //External Induction Venue
    public class ExternalInductionVenueInserUpdateParam
    {
        public int? ExternalVenueId { get; set; }
        public string ExternalVenueName { get; set; }
        public string ExternalVenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }


    public class AllExternalInductionVenue
    {
        public int? ExternalVenueId { get; set; }
        public string ExternalVenueName { get; set; }
        public string ExternalVenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
    }

    public class SearchExternalInductionVenue
    {
        public int? ExternalVenueId { get; set; }
        public Boolean? IsActive { get; set; }
    }

    public class SearchLocationWiseTrainingInCharge
    {
        public int? LocationId { get; set; }
        public long? AutoId { get; set; }
    }
    public class AllLocationWiseTrainingInCharge
    {
        public int? AutoUserId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public Boolean? IsActive { get; set; }
        public Boolean? IsExternal { get; set; }
        public long AutoId { get; set; }
    }
    public class LocationWiseTrainingInChargeInsertUpdate
    {
        public int? LocationId { get; set; }
        public int? AutoUserId { get; set; }
        public int? CreatedBy { get; set; }
        public Boolean? IsActive { get; set; }
        public Boolean? IsExternal { get; set; }
        public long AutoId { get; set; }
    }
    public class InductionTemplate
    {
        public int? InductionTemplateId { get; set; }
        public string InductionTemplateName { get; set; }
        public int VerticalID { get; set; }
        public List<InductionTemplateDetails> InductionTemplateDetails { get; set; }
        public bool IsActive { get; set; }
        public bool IsBatch { get; set; }
        public int CreatedBy { get; set; }

    }
    public class InductionTemplateDetails
    {

        public int? InductionTemplateDetailId { get; set; }
        public int? InductionTemplateId { get; set; }
        public int? TraingTitleId { get; set; }    // Added By Anif on 25-11-2022
        public string TraingTitle { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string DetailsofSession { get; set; }
        public int? VerticalId { get; set; }
        public int Trainer { get; set; }
        public string TrainerName { get; set; }
        public int InductionMode { get; set; }
        public int Location { get; set; }
        public string LocationName { get; set; }
        public int InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int InductionCoOrdinator { get; set; }
        public string InductionCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public bool IsExternal { get; set; }
        public int Index { get; set; }
        public bool? RowEditMode { get; set; }
    }

    public class InductionTemplateHdrGet
    {
        public int InductionTemplateId { get; set; }
        public string InductionTemplateName { get; set; }
        public int VerticalId { get; set; }
        public bool IsActive { get; set; }
        public bool IsBatch { get; set; }
        public int CreatedBy { get; set; }

    }
    public class InductionTemplateDetail
    {
        public int InductionTemplateId { get; set; }
        public string InductionTemplateName { get; set; }
        public int TemplateVerticalId { get; set; }
        public int InductionTemplateDetailId { get; set; }
        public int TraingTitleId { get; set; }  // Added by Anif on 25-11-2022
        public string TraingTitle { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string DetailsofSession { get; set; }
        public int VerticalId { get; set; }
        public int Trainer { get; set; }
        public string TrainerName { get; set; }
        public int InductionMode { get; set; }
        public string InductionModeName { get; set; }
        public int Location { get; set; }
        public string LocationName { get; set; }
        public int InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int InductionCoOrdinator { get; set; }
        public string InductionCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
        public bool IsBatch { get; set; }
        public bool IsExternal { get; set; }


    }

    public class SearchInductionTemplate
    {
        public int? InductionTemplateId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsBatch { get; set; }
    }
    public class SearchInterviewVenue
    {
        public int? InterviewVenueId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class SearchTestVenue
    {
        public int? TestVenueId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    //Piu Biswas
    public class AllInterviewVenue
    {
        public int? VenueId { get; set; }
        public string VenueName { get; set; }
        public int? StateId { get; set; }
        public string StateName { get; set; }
        public string VenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class AllTestVenue
    {
        public int? testVenueId { get; set; }
        public string TestVenueName { get; set; }
        public int? StateId { get; set; }
        public string StateName { get; set; }
        public string TestVenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class InterviewVenueInsertUpdate
    {
        public int? InterviewVenueId { get; set; }
        public int? StateId { get; set; }
        public string InterviewVenueName { get; set; }
        public string InterviewVenueAddress { get; set; }
        public Boolean IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class TestVenueInsertUpdate
    {
        public int? TestVenueId { get; set; }
        public int? StateId { get; set; }
        public string TestVenueName { get; set; }
        public string TestVenueAddress { get; set; }
        public Boolean IsActive { get; set; }
        public int CreatedBy { get; set; }

    }

    public class InsertupdateRoleWiseUsrVertData
    {
        public int? RoleMapId { get; set; }
        public int? RoleId { get; set; }
        public Boolean IsActive { get; set; }
        public string VerticalId { get; set; }
        public string AutoUserId { get; set; }
        public int? CreatedBy { get; set; }
        public List<UDT_UserWiseRoleVerticalFunctionDetails> UserWiseRoleVerticalFunctionDetails { get; set; }
    }
    public class UDT_UserWiseRoleVerticalFunctionDetails
    {
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class InsertupdateRoleWiseUsrLocData
    {
        public int? RoleMapId { get; set; }
        public int? RoleId { get; set; }
        public Boolean IsActive { get; set; }
        public string LocationId { get; set; }
        public string VerticalId { get; set; }
        public string AutoUserId { get; set; }
        public int? CreatedBy { get; set; }
        public List<UDT_UserWiseRoleLocationFunctionDetails> UserWiseRoleLocationFunctionDetails { get; set; }
        //public List<UDT_UserWiseRoleLocationAreaDetails> UserWiseRoleLocationAreaDetails { get; set; }
        public string Area { get; set; }
    }
    public class UDT_UserWiseRoleLocationFunctionDetails
    {
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class UDT_UserWiseRoleLocationAreaDetails
    {
        public int? LocationId { get; set; }
        public int? AreaId { get; set; }
    }
    public class GetAllUserWiseRoleVerticalFunctionDetails
    {
        public int? RoleMapId { get; set; }
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
        public string VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string AutoUserId { get; set; }
        public string EmployeeName { get; set; }
        public string FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? CreatedBy { get; set; }
        public Boolean IsActive { get; set; }

    }
    public class GetAllUserWiseRoleLocationFunctionDetails
    {
        public int? RoleMapId { get; set; }
        public int? RoleId { get; set; }
        public string RoleName { get; set; }
        public string VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string LocationId { get; set; }
        public string LocationName { get; set; }
        public string AutoUserId { get; set; }
        public string EmployeeName { get; set; }
        public string FunctionId { get; set; }
        public string FunctionName { get; set; }
        public string AreaId { get; set; }
        public string AreaName { get; set; }
        public int? CreatedBy { get; set; }
        public Boolean IsActive { get; set; }

    }
    public class SearchAllUserWiseRoleVerticalFunc
    {
        public Boolean? IsActive { get; set; }
    }
    public class SearchAllUserWiseRoleLocationFunc
    {
        public Boolean? IsActive { get; set; }
    }
    public class searcharea
    {
        public int? LocationId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class getArea
    {
        public int SubAreaId { get; set; }
        public string SubAreaName { get; set; }
        public int LocationId { get; set; }
        public Boolean IsActive { get; set; }
    }
    public class UpdateDocumentrole
    {
        public int? AttachmentDocumentNameId { get; set; }
        public int? AttachmentDocumentParticularId { get; set; }
        public string RoleIds { get; set; }
    }
    public class SearchTrainingtittle
    {
        public int TrainingTittleId { get; set; }
        public Boolean? IsActive { get; set; }

    }
    public class TrainingTittleDataList
    {
        public int TrainingTittleId { get; set; }
        public string TrainingTittleName { get; set; }
        public bool IsActive { get; set; }
    }
    public class TrainingTittleFormData
    {
        public int TrainingTittleId { get; set; }
        public string TrainingTittleName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class GetLocationFunctionSearch
    {
        public string FunctionIds { get; set; }
    }
    public class GetLocationFunction
    {
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
    }

    public class CostCenterData
    {
        public int CostCenterMapId { get; set; }
        public int SubAreaId { get; set; }
        public int CostcenterId { get; set; }
        public string CostcenterText { get; set; }
        public string verticalId { get; set; }
        public string FunctionId { get; set; }
        public string LocationId { get; set; }
        public string StateId { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }

    }
    public class GetCostCenterData
    {
        public int CostCenterMapId { get; set; }
        public int SubAreaId { get; set; }
        public string SubAreaName { get; set; }
        public int CostCenterId { get; set; }
        public string CostCenterName { get; set; }
        public string VerticalId { get; set; }
        public string Verticalname { get; set; }
        public string FunctionId { get; set; }
        public string functionname { get; set; }
        public string LocationId { get; set; }
        public string Locationname { get; set; }
        public string StateId { get; set; }
        public string Statename { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedOn { get; set; }
    }
    public class SearchCostCenterData
    {
        public int CostCenterMapId { get; set; }
    }
    public class SearchBatchWiseCandidate
    {
        public int BatchId { get; set; }
    }
    public class BatchWiseCandidateList
    {
        public int RequisitionDetailId { get; set; }
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
    public class SearchFlexiReportList
    {
        public int? HeaderId { get; set; }
        public bool? IsActive { get; set; }
        public int HeaderType { get; set; }
    }
    public class FlexiReportHeader
    {
        public int ReportHeaderId { get; set; }
        public string ReportHeaderName { get; set; }
        public bool IsActive { get; set; }
        public int HeaderType { get; set; }
    }
    public class FlexiReport
    {
        public int ReportHeaderId { get; set; }
        public string ReportHeaderName { get; set; }
        public bool IsActive { get; set; }       
    }

    public class EmployeeDataDetails
    {
        public int EmpId { get; set; }
        public string? EmpNo { get; set; }
        public string? EmpName { get; set; }
        public string? Designation { get; set; }
        public int VerticalId { get; set; }
        public string? VerticalName { get; set; }
        public int FunctionId { get; set; }
        public string? FunctionName { get; set; }
        public int GradeId { get; set; }
        public string? GradeName { get; set; }
        public string? EmpEmailId { get; set; }
        public int CostCenterId { get; set; }
        public string? CostCenterName { get; set; }
        public int LocationId { get; set; }
        public string? LocationOffice { get; set; }
        public int SubAreaId { get; set; }
        public string? SubAreaName { get; set;}
        public string? Dateofbirth { get;set; }
        public string? Dateofjoining { get;set; } 
        public string? Dateofleaving { get; set; }
        public string? AadharNo { get; set; }
        public bool IsExternal { get; set; }
        public int PositionId { get; set; }
    }
}
