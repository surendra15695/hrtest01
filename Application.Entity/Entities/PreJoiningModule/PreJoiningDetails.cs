using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.PreJoiningModule
{
    public class PreJoiningCandidateList
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public string CandidateFullName { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int CurrentLocationId { get; set; }
        public string CurrentLocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int DocApprovalStatusId { get; set; }
        public string DocApprovalStatus { get; set; }
        public int ReportingManagerDocApprovalStatusId { get; set; }
        public string ReportingManagerDocApprovalStatus { get; set; }
        public string RecruitmentManagerNotApproveDoc { get; set; }
        public int OnboardingManagerDocApprovalStatusId { get; set; }
        public string OnboardingManagerDocApprovalStatus { get; set; }
        public string OnboardingManagerNotApproveDoc { get; set; }
        public string DocApprovalEMPNo { get; set; }
        public string DocApprovalEmpName { get; set; }
        public string DocApprovalDesignation { get; set; }
        public string CandidateOwner { get; set; }
        public int MedicalDocumentCollectionId { get; set; }
        public int MedicalDocumentDoctorApprovalId { get; set; }
        public int PreEmployeeMedicaStatuslId { get; set; }
        public string PreEmployeeMedicalStatus { get; set; }
        public int CandidateBVGReportId { get; set; }
        public string BVGReportStatus { get; set; }
        public string DateOfJoining { get; set; }
        public string JoiningDateStatus { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public int QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int StreamId { get; set; }
        public string StreamName { get; set; }
        public decimal MonthlyGross { get; set; }
        public int? OnBoardingManager { get; set; }
    }
    public class SearchPreJoiningCandidateList
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string Name { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? GradeId { get; set; }
        public int? DocApprovalStatusId { get; set; }
        public int? RMDocApprovalStatusId { get; set; }
        public int? OMDocApprovalStatusId { get; set; }
        public int? PreEmployeeMedicalStatus { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public int? HiringStatus { get; set; }
    }

    public class DoctorsApprovalCandidateParam
    {
        public int? MedicalDocumentDoctorApprovalId { get; set; }
        public long? RequsitaionDetailsId { get; set; }
        public long? CandidateId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Name { get; set; }
        public long? DoctorsId { get; set; }
        public Boolean? Pending { get; set; }

    }

    public class DoctorsApprovalCandidateList
    {
        public long? RequsitaionDetailsId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int? Designation { get; set; }
        public string DesignationName { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long MedicalDocumentDoctorApprovalId { get; set; }
        public Boolean? MedicalallyFit { get; set; }
        public String MedicalallyFitStatus { get; set; }
        public String VerificationStatus { get; set; }
        public DateTime? CreatedOn { get; set; }
    }

    public class MedicalDocumentDoctor
    {
        public string CandidateId { get; set; }
        public int? Doctors { get; set; }
        public int? CreatedBy { get; set; }

    }

    public class CandidateListOnBoardingParam
    {
        public int? RequisitionDetailId { get; set; }
        public int? CandidateId { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public Boolean? AllocationPendig { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Name { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class searchCallbackRequetsCandidate
    {
        public int? CallbackHistoryId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public int VerticalId { get; set; }
    }

    public class CandidateOnBoardingAssignInsertParam
    {
        public string CandidateId { get; set; }
        public int? OnBoardingManager { get; set; }
        public int? CreatedBy { get; set; }
        public string DOJ { get; set; }//Piu
        public string EmailId { get; set; }//Piu
        public string Remarks { get; set; }//Piu
    }


    public class CandidateListOnBoarding
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }

        public string CandidateFullName { get; set; }

        public int? VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int? Designation { get; set; }
        public string DesignationName { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CurrentLocationId { get; set; }
        public string CurrentLocationName { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; }
        public string EmailId { get; set; }
        public string Contact { get; set; }

        public int? QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int? CourseId { get; set; }
        public string CourseName { get; set; }
        public int? StreamId { get; set; }
        public string StreamName { get; set; }
        public decimal MarksPercentage { get; set; }
        public int? ExperienceYear { get; set; }
        public int? ExperienceMonth { get; set; }
        public int? StateId { get; set; }
        public string StateName { get; set; }
        public string DateofJoining { get; set; }
        public int? ModeofJoining { get; set; }
        public string ModeofJoiningName { get; set; }
        public string PositionCode { get; set; }
        public string Remarks { get; set; }
        public int? DocApprovalStatusId { get; set; }
        public string DocApprovalStatus { get; set; }
        public string DocApprovalEMPNo { get; set; }
        public string DocApprovalEmpName { get; set; }
        public string DocApprovalDesignation { get; set; }
        public int? HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long? CandidateOnBoardingId { get; set; }
        public long? OnBoardingCoordinator { get; set; }
        public string CandidateOnBoardingCoordinatorName { get; set; }
        public long? InductionProgrammeCoOrdinatior { get; set; }
        public string InductionProgrammeCoOrdinatiorName { get; set; }
        public long? CandidateReprtingVenueId { get; set; }
        public long CandidateJoiningTypeDetailsId { get; set; }
        public decimal MonthlyGross { get; set; }
        public string CoordinatorName { get; set; }
        public string OnBoardingCoordinatorName { get; set; }
        public string RecruitmentManagerNotApproveDoc { get; set; }
        public string OnboardingManagerNotApproveDoc { get; set; }
        public string OnboardingCordinatorNotApproveDoc { get; set; }
        public string CommunicationAddress { get; set; }
        public long CommunicationState { get; set; }
        public string CommunicationStateName { get; set; }
        public string CommunicationPin { get; set; }
        public int? CandidateOnBoardingCoordinatorId { get; set; }
        public string RMEmailId { get; set; }//Piu
        public string EmpNp { get; set; }
        public int CandidateAccomodationHeaderId { get; set; }
    }
    public class CallbackRequestCandidate
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }

        public string CandidateFullName { get; set; }

        public int? VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int? Designation { get; set; }
        public string DesignationName { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CurrentLocationId { get; set; }
        public string CurrentLocationName { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; }
        public string EmailId { get; set; }
        public string Contact { get; set; }

        public int? QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int? CourseId { get; set; }
        public string CourseName { get; set; }
        public int? StreamId { get; set; }
        public string StreamName { get; set; }
        public decimal MarksPercentage { get; set; }
        public int? ExperienceYear { get; set; }
        public int? ExperienceMonth { get; set; }
        public int? StateId { get; set; }
        public string StateName { get; set; }
        public string DateofJoining { get; set; }
        public int? ModeofJoining { get; set; }
        public string ModeofJoiningName { get; set; }
        public string PositionCode { get; set; }
        public string Remarks { get; set; }
        public int? DocApprovalStatusId { get; set; }
        public string DocApprovalStatus { get; set; }

        public int? HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long? CandidateOnBoardingId { get; set; }

        public string CandidateOnBoardingCoordinatorName { get; set; }
        public long? InductionProgrammeCoOrdinatior { get; set; }
        public string InductionProgrammeCoOrdinatiorName { get; set; }
        public long? CandidateReprtingVenueId { get; set; }
        public long CandidateJoiningTypeDetailsId { get; set; }
        public string CoordinatorName { get; set; }
        public string OnBoardingCoordinatorName { get; set; }

        public string CommunicationAddress { get; set; }
        public long CommunicationState { get; set; }
        public string CommunicationStateName { get; set; }
        public string CommunicationPin { get; set; }
        public int ApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
    }
    public class CandidateOnBoardingCoordinatorAssignParam
    {
        public string CandidateId { get; set; }
        public int? OnBoardingCoordinator { get; set; }
        public int? CreatedBy { get; set; }
        public int? CandidateOnBoardingCoordinatorId { get; set; }
        public string EmailId { get; set; }
        public string JoiningDate { get; set; }
        public string ReallocationType { get; set; }
    }

    public class OnBoardingCoordinatorPendingJoiningTypeListParam
    {
        public int? RequisitionDetailId { get; set; }
        public int? CandidateId { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public string CandidateName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }


    public class CandidateJoiningTypeDetailsParam
    {
        public string CandidateId { get; set; }
        public string JoinigType { get; set; }

        public int? Vertical { get; set; }
        public int? BatchId { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class CandidateJoiningDateInsertParam
    {
        public List<CandidateJoiningDate> CandidateJoiningDates { get; set; }
        public string EmailId { get; set; }
        public string Remarks { get; set; }
        public string doj { get; set; }
        public int? CreatedBy { get; set; }
        public string JoiningDateStatus { get; set; }//Piu
    }

    public class CandidateJoiningDate
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string DateofJoining { get; set; }
        public string ModeofJoining { get; set; }
        public string PositionCode { get; set; }
        public string Remarks { get; set; }
        public string OnBoardingEmailId { get; set; }
    }
    public class BatchJoiningDateUpdate
    {
        public long? BatchId { get; set; }
        public string DateofJoining { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class GetAllCandidateJoiningDateParam
    {
        public string CandidateId { get; set; }
    }
    public class CandidateJoining
    {
        public long? RequisitionDetailId { get; set; }
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public int? ModeofJoing { get; set; }
        public string ModeofJoingName { get; set; }
        public string PositionCode { get; set; }
        public string Remarks { get; set; }
        public string OnBoardingEmailId { get; set; }//Piu
    }

    public class CandidateJoiningSearch
    {
        public string CandidateId { get; set; }
    }
    public class InsertUpdateCandidateBVGReportParam
    {
        public List<CandidateBVGReport> CandidateBVGReports { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class CandidateBVGReport
    {
        public int? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? CandidateBVGReportId { get; set; }

        public Boolean? BVGReportApplicable { get; set; }

    }
    public class BatchWiseOnBoardingPendingSheduleParams
    {
        public string BatchNo { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public int? VerticalId { get; set; }
    }
    public class BatchWiseOnBoardingPendingShedule
    {
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }
        public int? VerticalId { get; set; }
        public long? OnBoardingcoordinator { get; set; }
        public string UserId { get; set; }
        public string DateofJoining { get; set; }
        public long? CandidateOnBoardingId { get; set; }
        public String CandidateOnBoardingCoordinatorName { get; set; }
        public long? InductionProgrammeCoOrdinatior { get; set; }
        public String InductionProgrammeCoOrdinatiorName { get; set; }
        public long? TotalCandidates { get; set; }
    }
    public class OnBoardingBatchPendingScheduleDetailsParam
    {
        public int? BatchId { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public string CandidateName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class OnBoardingPendingScheduleIndividualParam
    {
        public int? CandidateId { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string CandidateName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class MovingCandidateJoiningTypeParam
    {
        public string CandidateId { get; set; }
        public string JoinIngType { get; set; }
        public int? Vertical { get; set; }
        public int? BatchId { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class UploadCandidateBGVReportParam
    {
        public string CandidateBVGReportId { get; set; }
        public string BVGReport { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class CandidateInductionScheduleInsertUpdateParam
    {
        public long? CandidateInductionScheduleId { get; set; }
        public string JoinigType { get; set; }
        public long? TemplateId { get; set; }
        public string TemplateDetails { get; set; }
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public int? CreatedBy { get; set; }
        public List<UDTCandidateInductionScheduled> CandidateInductionScheduleDetails { get; set; }
        public List<UDTCandidateInductionScheduled1> CandidateInductionScheduleDetails1 { get; set; }
        public string Password { get; set; }//Piu
    }
    public class UDTCandidateInductionScheduled
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public int? TrainingTittleId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }  // Added for multiple schedule
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public int? InductionMode { get; set; }
        public int? Location { get; set; }
        public int? InductionVenue { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string Remarks { get; set; }
        public bool? IsExternal { get; set; }
        public int? VerticalId { get; set; }
    }
    public class UDTCandidateInductionScheduled1
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }  // Added for multiple schedule
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public int? InductionMode { get; set; }
        public int? Location { get; set; }
        public int? InductionVenue { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string Remarks { get; set; }
        public bool? IsExternal { get; set; }
        public int? VerticalId { get; set; }
        public string InductioneName { get; set; }
        public string InductionVenueName { get; set; }
        public string InductionCoOrdinatorName { get; set; }
        public string LocationName { get; set; }
        public string TrainerName { get; set; }

    }

    // Added by anif on 14-01-2023

    public class ReassignCandidateNewInductionSchedule
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public int? CreatedBy { get; set; }
        public List<UDTReassignCandidateNewInductionScheduled> ReassignCandidateNewInductionScheduleDetails { get; set; }        
    }
    public class UDTReassignCandidateNewInductionScheduled
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public int? TrainingTittleId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }  
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public int? InductionMode { get; set; }
        public int? Location { get; set; }
        public int? InductionVenue { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string Remarks { get; set; }
        public bool? IsExternal { get; set; }
        public int? VerticalId { get; set; }
    }

    public class GetAllCandidateInductionScheduleparam
    {
        public long? CandidateInductionScheduleId { get; set; }
    }
    public class CandidateInductionShedule
    {
        public CandidateInductionSheduleHeader CandidateInductionShedules { get; set; }
        public List<CandidateInductionSheduleDetails> CandidateInductionSheduleDetails { get; set; }
    }
    public class CandidateInductionSheduleHeader
    {
        public long? CandidateInductionScheduleId { get; set; }
        public string JoinigType { get; set; }
        public string JoinigTypeDesc { get; set; }
        public long? TemplateId { get; set; }
        public string TemplateDetails { get; set; }
        public int? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class CandidateInductionSheduleDetails
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public int? TrainingTittleId { get; set; }  // Added by anif on 25-11-2022
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public int? Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
        public bool IsExternal { get; set; }
        public int VerticalId { get; set; }
    }
    public class ReportingVenueParam
    {
        public int? ReportingVenueId { get; set; }
        public string ReportingVenueName { get; set; }
        public string ReportingVenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class AllReportingVenueParam
    {
        public int? ReportingVenueId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class ReportingVenue
    {
        public int? ReportingVenueId { get; set; }
        public string ReportingVenueName { get; set; }
        public string ReportingVenueAddress { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class TrainingInchargeDetails
    {
        //public int? AutoUserId { get; set; }
        //public string TrainingInChargeName { get; set; }
        //public string TrainingInChargeEmailId { get; set; }
        //public decimal PhoneNumber { get; set; }
        public int? InductionVenueId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string LocationName { get; set; }
        public string TrainingInChargeEmail { get; set; }
        public bool? IsExternal { get; set; }
    }
    public class SearchTrainingInchargeDetails
    {
        //public string InductionVenueId { get; set; }
        public List<LocationIdDetails> LocationDetailIds { get; set; }

    }
    public class LocationIdDetails
    {
        public int? LocationId { get; set; }
        public bool? IsExternal { get; set; }
    }

    public class AllBatchesPendingReportingVenueParam
    {
        public string BatchNo { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public int? VerticalId { get; set; }

    }

    public class BatchesPendingReportingVenue
    {
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }
        public long? OnBoardingcoordinator { get; set; }
        public string CandidateOnBoardingCoordinatorName { get; set; }
        public string UserId { get; set; }
        public string DateofJoining { get; set; }
        public int? OnBoardingManagerId { get; set; }
        public int? ModeofJoining { get; set; }
        public string ModeofJoiningName { get; set; }
        public string AccomadationStatus { get; set; }
        public int AccomadationStatusId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public long? TotalCandidates { get; set; }
        public int ReportingVenueStatus { get; set; }
        public long? InductionProgrammeCoOrdinatior { get; set; }
        public string InductionProgrammeCoOrdinatiorName { get; set; }
        public int? VerticalId { get; set; }
        public int? WelcomeSendCounter { get; set; }
    }
    public class PendingReportingVenueIndividualParam
    {
        public int? CandidateId { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string CandidateName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class PendingReportingVenueIndividual
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }

        public string CandidateFullName { get; set; }

        public int? VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int? Designation { get; set; }
        public string DesignationName { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CurrentLocationId { get; set; }
        public string CurrentLocationName { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; }
        public string EmailId { get; set; }
        public string Contact { get; set; }

        public int? QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int? CourseId { get; set; }
        public string CourseName { get; set; }
        public int? StreamId { get; set; }
        public string StreamName { get; set; }
        public decimal MarksPercentage { get; set; }
        public int? ExperienceYear { get; set; }
        public int? ExperienceMonth { get; set; }
        public int? StateId { get; set; }
        public string StateName { get; set; }
        public string DateofJoining { get; set; }
        public int? ModeofJoining { get; set; }
        public string ModeofJoiningName { get; set; }
        public string PositionCode { get; set; }
        public string Remarks { get; set; }
        public int? DocApprovalStatusId { get; set; }
        public string DocApprovalStatus { get; set; }
        public string DocApprovalEMPNo { get; set; }
        public string DocApprovalEmpName { get; set; }
        public string DocApprovalDesignation { get; set; }
        public int? HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long? CandidateOnBoardingId { get; set; }
        public long? OnBoardingCoordinator { get; set; }
        public long? CandidateReprtingVenueId { get; set; }
        public long? InductionProgrammeCoOrdinatior { get; set; }
        public string InductionProgrammeCoOrdinatiorName { get; set; }
        public string AccomadationStatus { get; set; }
        public int AccomadationStatusId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public decimal MonthlyGross { get; set; }
        public string RecruitmentManagerNotApproveDoc { get; set; }
        public string OnboardingManagerNotApproveDoc { get; set; }
        public string OnboardingCordinatorNotApproveDoc { get; set; }
        public string CommunicationAddress { get; set; }
        public long CommunicationState { get; set; }
        public string CommunicationStateName { get; set; }
        public string CommunicationPin { get; set; }
        public string CoordinatorName { get; set; }
        public int CandidateAccomodationHeaderId { get; set; }
    }
    public class CandidateAccomodationDetail
    {
        public int? CandidateAccomodationDetailsId { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public int? TrainingInchangeId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class CandidateOnBoardingCoordinatorAccomodationInsertUpdateParam
    {
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? BatchId { get; set; }
        public int? CandidateId { get; set; }
        //public Boolean? IsActive { get; set; }
        public List<UDTCandidateAccomodationDetail> UDTCandidateAccomodationDetail { get; set; }
        public int? CreatedBy { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string joiningDate { get; set; }//Piu
        public string EmailId { get; set; }//Piu
        public string CandidateNo { get; set; }//Piu
        public string CandidateName { get; set; }//Piu
        public string Location { get; set; }//Piu
        public string Password { get; set; }//Piu
    }

    public class UDTCandidateAccomodationDetail
    {
        public int? CandidateAccomodationDetailsId { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public long? CandidateAccomodationId { get; set; }
        public int? CandidateId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
        public long? Location { get; set; }
        public bool? IsActive { get; set; }
    }
    public class CandidateTrainingReassignForBatch
    {
        public int BatchId { get; set; }
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int VerticalId { get; set; }
        public int RequisitionDetailsId { get; set; }
        public List<UDTReassignCandidateInductionDetails> reassignCandidateInductionDetails { get; set; }
        public List<UDTCandidateInductionScheduleCandidateDetails> candidateInductionScheduleCandidateDetails { get; set; }
        public List<UDTCandidateAccomodationDetails> candidateAccomodationDetails { get; set; }
        public List<UDTTrainingInchargeAccomodationDetailsReassign> trainingInchargeAccomodationDetailsReassign { get; set; }
        public int CreatedBy { get; set; }
    }
    public class UDTReassignCandidateInductionDetails
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public string BatchCandidateIds {get;set;}
    }
    public class UDTCandidateInductionScheduleCandidateDetails
    {
        public int CandidateInductionScheduleDetailsId { get; set; }
        public int CandidateInductionScheduleId { get; set; }
        public int CandidateId { get; set; }
    }
    public class UDTCandidateAccomodationDetails
    {
        public long CandidateAccomodationDetailsId { get; set; }
        public long CandidateAccomodationHeaderId { get; set; }
        public long CandidateAccomodationId { get; set; }
        public long CandidateId { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
        public long Location { get; set; }
        public bool IsActive { get; set; }
    }
    public class UDTTrainingInchargeAccomodationDetailsReassign
    {
        public long TrainingInchageAccomodationDetailsId { get; set; }
        public long CandidateAccomodationHeaderId { get; set; }
        public int CandidateId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int Location { get; set; }
        public int InductionVenue { get; set; }
        public string Accomodation { get; set; }
        public long CandidateAccomodationDetailsId { get; set; }
    }
    public class GetAllOnBoardingCoordinateBookAccommodationParam
    {
        public int? BatchId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class OnBoardingCoordinateBookAccommodation
    {
        public ReportingVenuAccomodation ReportingVenu { get; set; }
        public List<CandidateListOnBoarding> CandidateAccomodationDetails { get; set; }
        public List<CandidateInductionScheduleByBatch> CandidateInductionScheduleByBatchs { get; set; }
        public List<CandidateInductionScheduleByIndividual> CandidateInductionScheduleByIndividuals { get; set; }
        public List<BatchCandidatesScheduleDate> BatchCandidatesScheduleDates { get; set; }
    }
    public class ReportingVenuAccomodation
    {
        public string VenuName { get; set; }
        public string VenuAddress { get; set; }
    }
    public class CandidateInductionScheduleByBatch
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public int? Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
        public bool? IsExternal { get; set; }
    }
    public class CandidateInductionScheduleByIndividual
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }

    }
    public class InsertUpdateCandidateReportingVenueParam
    {
        public long? CandidateReprtingVenueId { get; set; }
        public long? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? ReprtingVenue { get; set; }

        public string ReprtingVenueAddress { get; set; }
        public int? CreatedBy { get; set; }
        public string Password { get; set; }//Piu
        public string ReportingVenueName { get; set; }

    }
    public class BatchCandidatesScheduleDate
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public int? TraingTitleId { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public int? Location { get; set; }
        public string BatchCandidateIds { get; set; }
    }

    public class OnBoardingCoordinatorAddReportingVenueByBatchOrCandidateParam
    {
        public int? BatchId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class OnBoardingCoordinatorCheckingAddReportingVenue
    {
        public long? CandidateReprtingVenueId { get; set; }
        public long? CandidateId { get; set; }
        public long? BatchId { get; set; }
        public long? VenueId { get; set; }
        public string ReprtingVenueAddress { get; set; }
    }
    //training
    public class BatchAccomodationPendingForTrainingInchargeParam
    {
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }

        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public long? AutoUserId { get; set; }
    }
    public class CandidateAccomodationPendingForTrainingInchargeParam
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? VenueId { get; set; }
        public int? DepartmentId { get; set; }
        public int? PositionId { get; set; }
        public long? AutoUserId { get; set; }
    }
    public class CandidateAccomodationPendingForTraining
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public int? Trainer { get; set; }
        public string CandidateFullName { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public string EmailId { get; set; }
        public string Contact { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? PositionId { get; set; }
        public string Positionlocation { get; set; }
        public long? CandidateReprtingVenueId { get; set; }
        public string ReprtingVenueAddress { get; set; }
        public string STATUS { get; set; }
        public long CandidateInductionScheduleId { get; set; }
        public long InductionLocation { get; set; }
        public string InductionLocationName { get; set; }
        public long InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }
    }
    public class BatchAccomodationPendingForTraining
    {
        public int? BatchId { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public int? Trainer { get; set; }
        public string BatchNo { get; set; }
        public string BatchName { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public long? Location { get; set; }
        public string LocationName { get; set; }
        public long? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long? PositionId { get; set; }
        public string PositionName { get; set; }
        public long? InductionLocation { get; set; }
        public string InductionLocationName { get; set; }
        public long? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public string ReprtingVenueAddress { get; set; }
        public string STATUS { get; set; }
        public long CandidateInductionScheduleId { get; set; }
    }

    public class TrainingAccomodationInsertUpdateParam
    {
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? BatchId { get; set; }
        public int? CandidateId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? Location { get; set; }
        public long? InductionVenue { get; set; }
        //public Boolean? IsActive { get; set; }
        public List<UDTTrainingInchargeAccomodation> TrainingInchargeAccomodationDetails { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class UDTTrainingInchargeAccomodation
    {
        public long? TrainingInchageAccomodationDetailsId { get; set; }
        public long? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateId { get; set; }
        public string Accomodation { get; set; }
        public long? CandidateAccomodationDetailsId { get; set; }
    }

    public class TrainingInchargeAccomodationDetailsParam
    {
        public int? BatchId { get; set; }
        public long? CandidateId { get; set; }
        public long? LocationId { get; set; }
        public long? AutoUserId { get; set; }
        public long? CandidateAccomodationDetailsId { get; set; }
        public long? CandidateAccomodationHeaderId { get; set; }
    }
    public class TrainingInchargeAccomodationDetails
    {
        public TrainingAccomodationCandidate trainingAccomodationCandidate { get; set; }
        public List<TrainingAccomodationCandidateList> TrainingAccomodationCandidateDetails { get; set; }
        public List<TraningAccomodationRequiredCandidateList> trainingAccomodationRequiredCandidateList { get; set; }
    }

    public class TrainingAccomodationCandidate
    {
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateAccomodationDetailsId { get; set; }
        public int? TrainerInchargeId { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public long Location { get; set; }
        public string LocationName { get; set; }
        public long InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public string ReprtingVenueAddress { get; set; }
        public string TotalCandidates { get; set; }


    }
    public class TrainingAccomodationCandidateList
    {
        public long? CandidateAccomodationHeaderId { get; set; }
        public long? TrainingInchageAccomodationDetailsId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string Accomodation { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long CandidateAccomodationDetailsId { get; set; }
    }
    public class TraningAccomodationRequiredCandidateList
    {
        public long CandidateAccomodationDetailsId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public long RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
    }
    public class EditAccomodationInductionDetailsParam
    {
        public int? BatchId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class EditAccomodationInductionDetailsParamBatch
    {
        public int? BatchId { get; set; }
        public int? LocationId { get; set; }
    }
    public class SearchInductionDetailsForBatchReassignCandidate
    {
        public int? BatchId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class GetAllEditAccomodationParam
    {
        public int? CandidateAccomodationHeaderId { get; set; }
    }

    public class EditAccomodationInduction
    {
        public EditAccomodationCandidate EditAccomodationCandidateDetail { get; set; }
        public List<EditAccomodationInductionShedule> TrainingEditAccomodationInductionSheduleDetails { get; set; }
        public List<EditAccomodationForCandidate> TrainingEditAccomodationForCandidateDetails { get; set; }
    }

    public class EditAccomodationCandidate
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long? BatchId { get; set; }
        public string BatchNo { get; set; }
        public string VenueName { get; set; }
        public int? VenueId { get; set; }
        public string VenueAddress { get; set; }
        public string ReprtingVenueAddress { get; set; }
        public string OnBoardingCoordinatrDetaills { get; set; }
    }

    public class EditAccomodationInductionShedule
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public string TimeFrom { get; set; }

        public string TimeTo { get; set; }
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorEmail { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class EditAccomodationForCandidate
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
        public bool IsAccomadateRequired { get; set; }
        public long CandidateAccomodationId { get; set; }
    }
    public class EditAccomodationInductionForBatch
    {
        public EditAccomodationCandidateForBatch EditAccomodationCandidateDetailForBatch { get; set; }
        public List<EditAccomodationInductionSheduleForBatch> TrainingEditAccomodationInductionSheduleDetailsForBatch { get; set; }
        public List<EditAccomodationForCandidateForBatch> TrainingEditAccomodationForCandidateDetailsForBatch { get; set; }
        public List<EditAccomodationRequiredCandidateForBatch> EditAccomodationRequiredCandidatesForBatch { get; set; }
    }
    public class EditAccomodationInductionForBatchNew
    {
        public EditAccomodationCandidateForBatchNew EditAccomodationCandidateDetailForBatchNew { get; set; }
        public List<EditAccomodationInductionSheduleForBatch> TrainingEditAccomodationInductionSheduleDetailsForBatch { get; set; }
        public List<EditAccomodationForCandidateForBatch> TrainingEditAccomodationForCandidateDetailsForBatch { get; set; }
        public List<EditAccomodationRequiredCandidateForBatch> EditAccomodationRequiredCandidatesForBatch { get; set; }
    }

    public class EditAccomodationCandidateForBatch
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long? BatchId { get; set; }
        public string BatchNo { get; set; }

        public int? VenueId { get; set; }
        public string VenueAddress { get; set; }
        public string ReprtingVenueAddress { get; set; }
    }
    public class EditAccomodationCandidateForBatchNew
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long? BatchId { get; set; }
        public string BatchNo { get; set; }

        public int? VenueId { get; set; }
        public string VenueName { get; set; }
        public string VenueAddress { get; set; }
        public string ReprtingVenueAddress { get; set; }
    }

    public class EditAccomodationInductionSheduleForBatch
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public string TimeFrom { get; set; }

        public string TimeTo { get; set; }
        public string DetailsofSession { get; set; }
        public string BatchCandidateIds { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class EditAccomodationForCandidateForBatch
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
        public bool IsAccomadateRequired { get; set; }
        public long CandidateAccomodationId { get; set; }
    }
    public class EditAccomodationRequiredCandidateForBatch
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public int? TraingTitleId { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public int? Location { get; set; }
        public string LocationName { get; set; }
        public string BatchCandidateIds { get; set; }
    }
    public class EditAccomodationInductionBatch
    {
        public EditAccomodationCandidateBatch EditAccomodationCandidateDetailBatch { get; set; }
        public List<EditAccomodationInductionSheduleBatch> TrainingEditAccomodationInductionSheduleDetailsBatch { get; set; }
        public List<EditAccomodationForCandidateBatch> TrainingEditAccomodationForCandidateDetailsBatch { get; set; }
        public List<TrainingEditAccomodationRequiredCandidates> TrainingEditAccomodationRequiredCandidate { get; set; }
    }
    public class EditAccomodationCandidateBatch
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long? BatchId { get; set; }
        public string BatchNo { get; set; }

        public int? VenueId { get; set; }
        public string VenueAddress { get; set; }
        public string ReprtingVenueAddress { get; set; }
        public string VenueName { get; set; }
    }

    public class EditAccomodationInductionSheduleBatch
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public string TimeFrom { get; set; }

        public string TimeTo { get; set; }
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class EditAccomodationForCandidateBatch
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
        public bool IsAccomadateRequired { get; set; }
        public long CandidateAccomodationId { get; set; }
    }
    public class TrainingEditAccomodationRequiredCandidates
    {
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public long? CandidateInductionScheduleId { get; set; }
        public int? TraingTitleId { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public int? Location { get; set; }
        public string LocationName { get; set; }
        public string BatchCandidateIds { get; set; }
    }
    public class InductionDetailsForBatchReassignCandidate
    {
        public BatchInductionReportingvenueDetails inductionReportingVenueDetails { get; set; }
        public List<BatchInductionScheduleDetailsForReassign> batchInductionScheduleDetail { get; set; }
        public List<ReassignCandidateDetails> reaasingCandidatesDetail { get; set; }
    }
    public class InductionDetailsForIndividualReassignCandidate
    {
        public List<BatchInductionScheduleDetails> batchInductionScheduleDetail { get; set; }
        public List<ReassignCandidateDetails> reaasingCandidatesDetail { get; set; }
    }
    public class BatchInductionReportingvenueDetails
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long? BatchId { get; set; }
        public string BatchNo { get; set; }

        public int? VenueId { get; set; }
        public string VenueAddress { get; set; }
        public string ReprtingVenueAddress { get; set; }
        public string VenueName { get; set; }
    }
    public class BatchInductionScheduleDetails
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public string TimeFrom { get; set; }

        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
        public bool IsExternal { get; set; }
        public  bool? IsActive { get; set; }
        public bool? IsNewReassigned { get; set; }
    }

    public class BatchInductionScheduleDetailsForReassign
    {
        public long? CandidateInductionScheduleId { get; set; }
        public long? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }

        public string TimeFrom { get; set; }

        public string TimeTo { get; set; }
        public string BatchCandidateIds { get; set; }
        public string DetailsofSession { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public int? InductionMode { get; set; }
        public string InductioneName { get; set; }
        public string Location { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenue { get; set; }
        public string InductionVenueName { get; set; }
        public int? InductionCoOrdinator { get; set; }
        public string TrainingCoOrdinatorName { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
        public bool IsExternal { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsNewReassigned { get; set; }
    }
    public class ReassignCandidateDetails
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
        public bool IsAccomadateRequired { get; set; }
    }
    public class GetEditAccomodation
    {
        public GetEditCandidate EditCandidateData { get; set; }
        public List<GetEditAccomodationForCandidate> TrainingGetEditAccomodationForCandidateDetails { get; set; }
    }

    public class GetEditCandidate
    {
        public int? CandidateId { get; set; }

        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
    }

    public class GetEditAccomodationForCandidate
    {
        public int? LocationId { get; set; }

        public string LocationName { get; set; }
        public int? CandidateAccomodationHeaderId { get; set; }
        public int? CandidateAccomodationDetailsId { get; set; }

        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accomodation { get; set; }
    }
    public class InsertUpdateCandidateWelcomeAcknowledgementParam
    {
        public int? ShareWithCandidateHeaderId { get; set; }
        public List<UDTShareWithCandidate> ShareWithCandidates { get; set; }
        public int? TemplateId { get; set; }
        public string TemplateBody { get; set; }
        public string CandidateId { get; set; }
        public string Remarks { get; set; }
        public int? MailingStatus { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class InsertUpdateCandidateOnBoardingCoordinatorAccomodationParam
    {
        public int? ShareWithCandidateHeaderId { get; set; }
        public List<UDTShareWithCandidate> ShareWithCandidates { get; set; }
        public List<UDTCandidateAdditionalDocumentId> CandidateAdditionalDocumentId { get; set; }  // Added by Anif on 25-01-2023
        public List<UDTShareWithCandidateInductionAccommodationAttachement> ShareWithCandidatesInductionAccommodationAttachment { get; set; } // Added by anif 08-11-2022
        public List<UDTShareWithCandidatesForSchedular> ShareWithCandidatesForSchedular { get; set; } // Added by anif 21-08-2023
        public List<UDTShareWithCandidatesAccommodationForSchedular> shareWithCandidatesAccommodationForSchedular { get; set; } // Added by anif 21-08-2023
        public List<UDTShareWithCandidatesInductionForSchedular> shareWithCandidatesInductionForSchedular { get; set; } // Added by anif 21-08-2023
        public int? TemplateId { get; set; }
        public string TemplateBody { get; set; }
        public string CandidateId { get; set; }
        public string Remarks { get; set; }
        public int? MailingStatus { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class UDTShareWithCandidate
    {

        public int? ShareWithCandidateId { get; set; }
        public int? TemplateId { get; set; }
        public int? ShareWithCandidateHeaderId { get; set; }
        public string CandidateJoiningDocumentId { get; set; }
        public int? CandidateRequisitionDetailsId { get; set; }
        public int? CandidateInductionScheduleDetailsId { get; set; }
        public int? CandidateId { get; set; }
        public string TemplateBody { get; set; }
        public Boolean? isSend { get; set; }
    }
    // Added below class by anif on 25-01-2023
    public class UDTCandidateAdditionalDocumentId
    {
       public int  CandidateId { get; set; }
       public int  DocumentId { get; set; }
    }
    // Added this calss by anif on 08-11-2022
    public class UDTShareWithCandidateInductionAccommodationAttachement
    {
        public string BatchNo { get; set; }
        public List<UDTcandidateAccommodationDetailsForAttachment> CandidateAccommodationDetailsForAttachment { get; set; } // Added by anif 08-11-2022
        public string CandidateEmailId { get; set; }
        public int? CandidateId { get; set; }
        public List<UDTcandidateInductionDetailsForAttachment> CandidateInductionDetailsForAttachment { get; set; } // Added by anif 08-11-2022
        public string CandidateName { get; set; }
        public string Department { get; set; }
        public string EmailBody { get; set; }
        public string Function { get; set; }
        public string Grade { get; set; }
        public string JoiningDate { get; set; }
        public string Location { get; set; }
        public string Position { get; set; }

    }
    // Added by anif on 21-08-2023
    public class UDTShareWithCandidatesForSchedular
    {
        public string BatchNo { get; set; }
        public string CandidateEmailId { get; set; }
        public int? CandidateId { get; set; }
        public int ? RequisitionDetailId { get; set; }
        public string CandidateName { get; set; }
        public string Department { get; set; }
        public string EmailBody { get; set; }
        public string Function { get; set; }
        public string Grade { get; set; }
        public string JoiningDate { get; set; }
        public string Location { get; set; }
        public string Position { get; set; }

    }
    public class UDTcandidateAccommodationDetailsForAttachment
    {
        public string Accommodation { get; set; }
        public string FromDate { get; set; }
        public string Location { get; set; }
        public string ToDate { get; set; }
    }
    // Added by anif on 21-08-2023
    public class UDTShareWithCandidatesAccommodationForSchedular
    {
        public int CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accommodation { get; set; }
        public string Location { get; set; }
        
    }
    public class UDTcandidateInductionDetailsForAttachment
    {
        public string TrainingTittle { get; set; }
        public List<UDTtrainingDetails> TrainingDetails { get; set; } // Added by anif 08-11-2022

    }
    // Added by Anif on 21-08-2023
    public class UDTShareWithCandidatesInductionForSchedular
    {
        public int CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public string AccommodationRequire { get; set; }
        public string DetailsOfSession { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public string InductionDate { get; set; }
        public string Location { get; set; }
        public string PersontoMeet { get; set; }
        public string TrainingTittle { get; set; }
        public string Venue { get; set; }
        public string Remarks { get; set; }
       
    }
    public class UDTtrainingDetails
    {
        public string AccommodationRequire { get; set; }
        public string DetailsOfSession { get; set; }
        public string FromTime { get; set; }
        public string InductionDate { get; set; }
        public string Location { get; set; }
        public string PersontoMeet { get; set; }
        public string Remarks { get; set; }
        public string ToTime { get; set; }
        public string Venue { get; set; }
    }

    public class InductionAccommodationTemplate
    {
        public int InductionAccommodationId { get; set; }
        public string InductionTemplate { get; set; }
        public string AccommodationTemplate { get; set; }
        public bool IsActive { get; set; }
    }

    // Till This on 08-11-2022
    public class CandidateWelcomeAcknowledgementStatusParam
    {
        public int? CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string RequisitionNo { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? GradeId { get; set; }
        public int? DocumentStatusId { get; set; }
        public int? EmployeeMedicalId { get; set; }
        public int? HiringStatusId { get; set; }
    }
    public class CandidateWelcomeAcknowledgementStatus
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public string RequisitionNo { get; set; }
        public string JoinigType { get; set; }
        public long? BatchId { get; set; }
        public string BatchNo { get; set; }
        public int? VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? Designation { get; set; }
        public string DesignationName { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateOfJoining { get; set; }
        public int? ShareWithCandidateHeader { get; set; }
        public int? SWCMailingStatus { get; set; }
        public string Remarks { get; set; }
        public int? HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public string OnboardingCoordinatorReamrks { get; set; }
        //public int? DocApprovalStatusId { get; set; }
        //public string DocApprovalStatus { get; set; }
        //public string EMPLOYEE_MEDICAL { get; set; }
        //public string BVGReport { get; set; }
        //public string DateofJoining { get; set; }
        //public int? HiringStatusId { get; set; }
        //public string HiringStatusName { get; set; }
    }

    public class CandidateJoiningCheckListParam
    {
        public int? CandidateId { get; set; }
    }
    public class CandidateJoiningCheck
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? Age { get; set; }
        public int? QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int? CourseId { get; set; }
        public string CourseName { get; set; }
        public int? StreamId { get; set; }
        public string StreamName { get; set; }
        public int? ExperienceYear { get; set; }
        public int? ExperienceMonth { get; set; }
        public string CompanyName { get; set; }
        public string DesignationName { get; set; }
        public string MRF_EMP_History { get; set; }
        public Boolean? RelativeStatus { get; set; }
        public string SourceChannelName { get; set; }
        public int? CandidateOwnerId { get; set; }
        public string CandidateOwner { get; set; }
        public int? HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
    }
    public class OnBoardingDocumentVerificationParam
    {
        public int? CandidateId { get; set; }
    }
    public class OnBoardingDocumentVerification
    {
        public CandidateOnBoardingDocumentVerification CandidateOnBoardingDocumentVerificationData { get; set; }
        public List<CandidateOnBoardingUploadedDocument> CandidateOnBoardingUploadedDocuments { get; set; }
    }

    public class CandidateOnBoardingDocumentVerification
    {
        public long? OfferDocumentCollectionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public string CandidateEmailId { get; set; }
        public string CandidatePhone { get; set; }
        public string CandidateGender { get; set; }
        public int? Age { get; set; }
        public string AadharNo { get; set; }
        public string MotherTongue { get; set; }
        public string LanguageKnown { get; set; }
        public string HighestQualification { get; set; }
        public string Course { get; set; }
        public string Stream { get; set; }
        public string Percentage { get; set; }
        public int? YearofCompletion { get; set; }
        public string QualificationType { get; set; }
        public string Totalexperience { get; set; }
        public decimal? CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string Designation { get; set; }
        public string Domain { get; set; }
        public string SubDomain { get; set; }
        public string CurrentLocation { get; set; }
        public string AnyPreviousApplicationHistoryinMRF { get; set; }
        public string AnyRelativeWorkingonMRF { get; set; }
        public string Source { get; set; }
        public string CandidateOwner { get; set; }
        public string CandidateResume { get; set; }
        public string DateofJoining { get; set; }
        public long? DesignationId { get; set; }
        public string DesignationName { get; set; }
        public long? LocationId { get; set; }
        public string LocationName { get; set; }
        public long? GradeId { get; set; }
        public string GradeName { get; set; }
        public long? CandidateRMJoiningCheckListId { get; set; }
    }

    public class CandidateOnBoardingUploadedDocument
    {
        public long? CandidateId { get; set; }
        public long? OfferDocumentCollectionId { get; set; }
        public long? OfferDocumentCollectionDocumentId { get; set; }
        public int? DoumentType { get; set; }
        public string DoumentTypName { get; set; }
        public int? DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public int? DoumentNameId { get; set; }
        public string DoumentName { get; set; }
        public string Document { get; set; }
        public string DocumentPath { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public long? CandidateRMJoiningCheckListDetailsId { get; set; }
        public long? CandidateRMJoiningCheckListId { get; set; }
        public string Remarks { get; set; }
        public bool IsUpload { get; set; }
        public string RoleId { get; set; }
    }
    public class AllCandidateJoiningCheckListParam
    {
        public int? CandidateId { get; set; }
    }
    public class AllCandidateJoiningCheckListModel
    {
        public OnBoardingCoordinatorJoiningCheckList OnBoardingCoordinatorJoiningCheck { get; set; }
        public List<OnBoardingCoordinatorOnBoardingCheckList> OnBoardingCoordinatorOnBoardingChecks { get; set; }
    }

    public class OnBoardingCoordinatorJoiningCheckList
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? Designation { get; set; }
        public string DesignationName { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateofJoining { get; set; }
        public int? ModeofJoining { get; set; }
        public string ModeofJoiningName { get; set; }
        public long? CandidateOnboardingJoiningCheckListId { get; set; }
        public bool? Complete { get; set; }

    }

    public class OnBoardingCoordinatorOnBoardingCheckList
    {
        public int? DoumentNameId { get; set; }
        public string DoumentName { get; set; }
        public string Document { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public string ApprovalRemarks { get; set; }
        public long? CandidateOnboardingJoiningCheckListDetailsId { get; set; }
        public long? CandidateOnboardingJoiningCheckListId { get; set; }
        public string Remarks { get; set; }
        public string RoleId { get; set; }

    }
    public class CandidateInductionPlanParam
    {
        public int? CandidateId { get; set; }
        public int? HiringStatus { get; set; }
    }
    public class CandidateInductionPlan
    {
        public CandidateInductionPlanShedule CandidateInductionPlanShedule { get; set; }
        public List<CandidateInductionPlanSheduleDetails> CandidateInductionPlanShedules { get; set; }
        public List<CandidateInductionPlanAccomodation> CandidateInductionPlanAccomodations { get; set; }
    }

    public class CandidateInductionPlanShedule
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }
        public string CandidateFullName { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int? PositionId { get; set; }
        public string PositionName { get; set; }
        public int? GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateofJoining { get; set; }
        public int? HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
    }
    public class CandidateInductionPlanSheduleDetails
    {
        public int? CandidateInductionScheduleDetailsId { get; set; }
        public string TraingTitle { get; set; }
        public string DateFrom { get; set; }
        public string DateTo { get; set; }
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
        public int? Trainer { get; set; }
        public string TrainerName { get; set; }
        public string DetailsofSession { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public int? InductionVenueId { get; set; }
        public string InductionVenueName { get; set; }
        public long? CandidateOnBoardingId { get; set; }
        public long OnBoardingCoordinator { get; set; }
    }
    public class CandidateInductionPlanAccomodation
    {
        public int? CandidateInductionScheduleDetailsId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? LocationId { get; set; }
        public string LocationName { get; set; }
        public string Accomodation { get; set; }
    }

    public class CandidateJoiningFormParam
    {
        public int? ConfirmJoiningFormId { get; set; }
        public string JoiningDate { get; set; }
        public Boolean? IsActive { get; set; }
        public Boolean? IsDraft { get; set; }
        public int? FamilyHeaderId { get; set; }
        public string Name { get; set; }
        public string Dob { get; set; }
        public string BloodGroup { get; set; }
        public string Res_Address { get; set; }
        public int? Res_PinCode { get; set; }
        public string Per_Address { get; set; }
        public int? Per_PinCode { get; set; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public int? PersonalAccidentalInsuranceId { get; set; }
        public string NomineeName { get; set; }
        public string RelationShip { get; set; }

        public string FullAddress { get; set; }
        public string RefName { get; set; }
        public int? JoiningCandidateHeaderId { get; set; }

        public string JoiningCandidateName { get; set; }
        public string EmpNo { get; set; }
        public string Designation { get; set; }
        public string Department { get; set; }
        public string PanNo { get; set; }
        public string JoiningCandidateMobileNo { get; set; }
        public string GraduateEducationalInstitute { get; set; }
        public string PastEmployee { get; set; }
        public int? NoOfSecurity { get; set; }
        public int? CreatedBy { get; set; }
        public List<FamilyMemberDetails> FamilyMemberDetails { get; set; }
        public List<ImmediateRelativeDetails> ImmediateRelativeDetails { get; set; }

    }

    public class FamilyMemberDetails
    {
        public int? FamilyMemberId { get; set; }
        public int? FamilyHeaderId { get; set; }
        public string MemberName { get; set; }
        public string RelationShip { get; set; }
        public string FamilyMemberDob { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class ImmediateRelativeDetails
    {
        public int? FamilyMemberId { get; set; }
        public int? JoiningCandidateHeaderId { get; set; }
        public string Name { get; set; }
        public string PanNo { get; set; }
        public string MobileNo { get; set; }

        public int? NoOfSecurity { get; set; }
    }

    public class PreJoiningDocumentCollection
    {
        public PreJoiningDocumentFormData PreJoiningDocumentFormData { get; set; }
        public List<PreJoiningDocumentAttachmentData> PreJoiningDocumentAttachmentData { get; set; }
    }
    public class PreJoiningDocumentFormData
    {
        public long JoiningDocumentCollectionId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string Name { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public string AdditionalRemarks { get; set; }
        public string AdditionalDocumentID { get; set; }
        public long CreatedBy { get; set; }
        public long HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public List<PreJoiningDocumentAttachmentData> PreJoiningDocumentAttachmentData { get; set; }
    }
    public class DetailsList
    {
        public string EmpName { get; set; }
        public string EmpEmailId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
    }
    public class GetOcDetailsByCandidate
    {
        public string EmpName { get; set; }
        public string EmpEmailId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }



    }
    public class PreJoiningDocumentAttachmentData
    {
        public long CandidateId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public long OfferDocumentCollectionDocumentId { get; set; }
        public int DoumentType { get; set; }
        public string DoumentTypName { get; set; }
        public int DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public int DoumentNameId { get; set; }
        public string DoumentName { get; set; }
        public string Document { get; set; }
        public string DocumentPath { get; set; }
        public int ApprovalListId { get; set; }
        public string ApprovalListName { get; set; }
        public string ApprovalRemarks { get; set; }
    }

    public class PreJoiningDocumentCollectionSearch
    {
        public long? JoiningDocumentCollectionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public long? HiringStatus { get; set; }
    }

    public class RMJoiningCheckListSave
    {
        public long CandidateRMJoiningCheckListId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long CreatedBy { get; set; }
        public List<CandidateRMJoiningCheckListDetailsSave> CandidateRMJoiningCheckListDetailsSave { get; set; }
    }

    public class CandidateRMJoiningCheckListDetailsSave
    {
        public long CandidateRMJoiningCheckListDetailsId { get; set; }
        public long CandidateRMJoiningCheckListId { get; set; }
        public int DoumentType { get; set; }
        public int DoumentParticular { get; set; }
        public int DoumentName { get; set; }
        public string Remarks { get; set; }
    }

    public class OnboardingJoiningCheckListSave
    {
        public long CandidateOnboardingJoiningCheckListId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public bool Complete { get; set; }
        public long CreatedBy { get; set; }
        public List<CandidateOnboardingJoiningCheckListDetailsSave> CandidateOnboardingJoiningCheckListDetailsSave { get; set; }
    }

    public class CandidateOnboardingJoiningCheckListDetailsSave
    {
        public long? CandidateOnboardingJoiningCheckListDetailsId { get; set; }
        public long? CandidateOnboardingJoiningCheckListId { get; set; }
        public int DoumentNameId { get; set; }
        public string Remarks { get; set; }
    }

    public class CandidateJoingForm
    {
        public CandidateJoingFormData CandidateJoingFormData { get; set; }
        public List<CandidateJoingFormFamily> CandidateJoingFormFamily { get; set; }
        public List<CandidateJoingFormImidiateRelatives> CandidateJoingFormImidiateRelatives { get; set; }
        public List<CandidateJoiningFormApprovalStatus> CandidateJoiningFormApprovalStatus { get; set; }
        public List<CandidateRemarksDetails> candidateRemarksDetails { get; set; }
    }

    public class CandidateRemarksDetails
    {
        public int OfferDocumentCollectionId { get; set; }
        public string Reamrks { get; set; }
        public int CreatedBy { get; set; }
        public int RemarksDocumentType { get; set; }
        public string FullName { get; set; }
    }

    public class CandidateJoiningFormApprovalStatus
    {
        public int DoumentName { get; set; }
        public string AttachmentDocumentName { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public string RemarksBy { get; set; }
    }

    public class CandidateJoingFormData
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string FullName { get; set; }
        public string DOB { get; set; }
        public long BloodGroupId { get; set; }
        public string BloodGroupName { get; set; }
        public string ResidentialAddress { get; set; }
        public string ResidentialPin { get; set; }
        public bool SameAsResidential { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPin { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string Date { get; set; }
        public string AcidentalPolicyNominee { get; set; }
        public int? AcidentalPolicyNomineeRelationShip { get; set; }
        public string OtherRelationName { get; set; }
        public string RelationShipName { get; set; }
        public string AcidentalPolicyNomineeAddress { get; set; }
        public string AcidentalPolicyName { get; set; }
        public bool SEBIApplicable { get; set; }
        public string SEBIName { get; set; }
        public string SEBIEmployeeNo { get; set; }
        public long SEBIDesignation { get; set; }
        public string SEBIDesignationName { get; set; }
        public long SEBIDepartment { get; set; }
        public string SEBIDepartmentName { get; set; }
        public string SEBIPanNo { get; set; }
        public string SEBIMobileNo { get; set; }
        public string SEBIInsTitute { get; set; }
        public string SEBIPastEmployer { get; set; }
        public int SEBINoofSecurity { get; set; }
        public string SEBIDesigName { get; set; }
        public string SEBIDesigPAN { get; set; }
        public string SEBIDesigPhone { get; set; }
        public string JoiningLetterDate { get; set; }
        public long JoiningLetterDesignation { get; set; }
        public string JoiningLetterDesignationName { get; set; }
        public string JoiningDate { get; set; }
        public string SignatureDate { get; set; }
        public string SignaturePlace { get; set; }
        public string Signature { get; set; }
        public bool IsDraft { get; set; }
        public long CreatedBy { get; set; }
        public int HiringStatusId { get; set; }
        public int IsEnabledForMedical { get; set; }

        public List<CandidateJoingFormFamily> CandidateJoingFormFamily { get; set; }
        public List<CandidateJoingFormImidiateRelatives> CandidateJoingFormImidiateRelatives { get; set; }
        public List<CandidateJoiningFormApprovalStatus> CandidateJoiningFormApprovalStatus { get; set; }
        public List<RemaksData> remaksData { get; set; }
        // Added by Anif on 16-11-2022
        public string FamilyDetailsHTML { get; set; }
        public string AccidentPolicyHTML { get; set; }
        public string SEBIDisclosureHTML { get; set; }
        public string JoiningReportHTML { get; set; }
        public string FamilyDetailsFormPath { get; set; }
        public string AccidentInsuranceFormPath { get; set; }
        public string SEBIDisclosureFormPath { get; set; }
        public string JoiningReportFormPath { get; set; }
        public string Remarks { get; set; }
        public List<CandidateRemarksDetails> candidateRemarksDetails { get; set; }

    }
    public class CandidateJoingFormMasterData
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string FullName { get; set; }
        public string DOB { get; set; }
        public string BloodGroupId { get; set; }
        public string BloodGroupName { get; set; }
        public string ResidentialAddress { get; set; }
        public string ResidentialPin { get; set; }
        public bool SameAsResidential { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPin { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string Date { get; set; }
        public string AcidentalPolicyNominee { get; set; }
        public int AcidentalPolicyNomineeRelationShip { get; set; }
        public string RelationShipName { get; set; }
        public string AcidentalPolicyNomineeAddress { get; set; }
        public string AcidentalPolicyName { get; set; }
        public bool SEBIApplicable { get; set; }
        public string SEBIName { get; set; }
        public string SEBIEmployeeNo { get; set; }
        public long SEBIDesignation { get; set; }
        public string SEBIDesignationName { get; set; }
        public long SEBIDepartment { get; set; }
        public string SEBIDepartmentName { get; set; }
        public string SEBIPanNo { get; set; }
        public string SEBIMobileNo { get; set; }
        public string SEBIInsTitute { get; set; }
        public string SEBIPastEmployer { get; set; }
        public int SEBINoofSecurity { get; set; }
        public string SEBIDesigName { get; set; }
        public string SEBIDesigPAN { get; set; }
        public string SEBIDesigPhone { get; set; }
        public string JoiningLetterDate { get; set; }
        public long JoiningLetterDesignation { get; set; }
        public string JoiningLetterDesignationName { get; set; }
        public string JoiningDate { get; set; }
        public string SignatureDate { get; set; }
        public string SignaturePlace { get; set; }
        public string Signature { get; set; }
        public bool IsDraft { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CandidateJoingFormFamily
    {
        public long CandidateJoiningFormId { get; set; }
        public int LineId { get; set; }
        public long CandidateJoiningFamilyLineId { get; set; }
        public string FamilyName { get; set; }
        public long FamilyRelationShip { get; set; }
        public string FamilyRelationShipName { get; set; }
        public string FamilyDOB { get; set; }
    }
    public class CandidateJoingFormImidiateRelatives
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateImidiateRelativesLineId { get; set; }
        public string ImidiateRelativesName { get; set; }
        public string ImidiateRelativesPAN { get; set; }
        public string ImidiateRelativesPhone { get; set; }
        public int ImidiateRelativesNoofSecurity { get; set; }
    }
    public class RemaksData
    {
        public long OfferDocumentCollectionRemarksId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public string RemarksType { get; set; }
        public string Reamrks { get; set; }
        public string ReamrksReply { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedOn { get; set; }
        public string CandidateFullName { get; set; }
        public string ModifiedOn { get; set; }
        public int DocumentType { get; set; }

    }
    public class CandidateJoingFormSearch
    {
        public long? CandidateJoiningFormId { get; set; }
        public long? CandidateId { get; set; }
    }

    public class CandidateJoiningPDFData
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string FullName { get; set; }
        public string DOB { get; set; }
        public string BloodGroupName { get; set; }
        public string ResidentialAddress { get; set; }
        public string ResidentialPin { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPin { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string Date { get; set; }
        public string EmployeeNo { get; set; }
        public string JoiningLetterDate { get; set; }
        public string JoiningDate { get; set; }
        public string SignatureDate { get; set; }
        public string SignaturePlace { get; set; }
        public string Signature { get; set; }
        public string Grade { get; set; }
        public string Position { get; set; }
        public string Location { get; set; }
        public string Designation { get; set; }
        public string DesignatedPersonName { get; set; }
        public string DesignatedPersonDesignation { get; set; }
        public string DesignatedPersonEmployeeNo { get; set; }
        public string DesignatedPersonDepartment { get; set; }
        public string DesignatedPersonPAN { get; set; }
        public string DesignatedPersonMobileNo { get; set; }
        public string DesignatedPersonInstitute { get; set; }
        public string DesignatedPersonPastEmployer { get; set; }
        public string DesignatedPersonNoofSecurity { get; set; }
        public string FinancialRelationshipName { get; set; }
        public string FinancialRelationshipPAN { get; set; }
        public string FinancialRelationshipMobileNo { get; set; }
        public string AccidentalPolicyNominee { get; set; }
        public string AccidentalPolicyRelationShipName { get; set; }
        public string AccidentalPolicyNomineeAddress { get; set; }
        public string AccidentalPolicyHolderName { get; set; }
        public List<CandidateJoiningFormFamilyDetailData> FamilyDetail { get; set; }
        public List<CandidateJoiningFormRelativeDetailData> ImmediateRelativeDetail { get; set; }

    }

    public class CandidateJoiningFormPDFData
    {
        public CandidateJoiningFormPDFHeader CandidateData { get; set; }
        public List<CandidateJoiningFormFamilyDetailData> FamilyDetail { get; set; }
        public List<CandidateJoiningFormRelativeDetailData> ImmediateRelativeDetail { get; set; }
    }

    public class CandidateJoiningFormPDFHeader
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string FullName { get; set; }
        public string DOB { get; set; }
        public string BloodGroupName { get; set; }
        public string ResidentialAddress { get; set; }
        public string ResidentialPin { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentPin { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string Date { get; set; }
        public string EmployeeNo { get; set; }
        public string JoiningLetterDate { get; set; }
        public string JoiningDate { get; set; }
        public string SignatureDate { get; set; }
        public string SignaturePlace { get; set; }
        public string Signature { get; set; }
        public string Grade { get; set; }
        public string Position { get; set; }
        public string Location { get; set; }
        public string Designation { get; set; }
        public string DesignatedPersonName { get; set; }
        public string DesignatedPersonDesignation { get; set; }
        public string DesignatedPersonEmployeeNo { get; set; }
        public string DesignatedPersonDepartment { get; set; }
        public string DesignatedPersonPAN { get; set; }
        public string DesignatedPersonMobileNo { get; set; }
        public string DesignatedPersonInstitute { get; set; }
        public string DesignatedPersonPastEmployer { get; set; }
        public string DesignatedPersonNoofSecurity { get; set; }
        public string FinancialRelationshipName { get; set; }
        public string FinancialRelationshipPAN { get; set; }
        public string FinancialRelationshipMobileNo { get; set; }
        public string AccidentalPolicyNominee { get; set; }
        public string AccidentalPolicyRelationShipName { get; set; }
        public string AccidentalPolicyNomineeAddress { get; set; }
        public string AccidentalPolicyHolderName { get; set; }

    }

    public class CandidateJoiningFormFamilyDetailData
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateJoiningFamilyLineId { get; set; }
        public string FamilyName { get; set; }
        public string FamilyRelationShip { get; set; }
        public string FamilyRelationShipName { get; set; }
        public string FamilyDOB { get; set; }

    }

    public class CandidateJoiningFormRelativeDetailData
    {
        public long CandidateJoiningFormId { get; set; }
        public long CandidateImmediateRelativesLineId { get; set; }
        public string ImmediateRelativesName { get; set; }
        public string ImmediateRelativesPAN { get; set; }
        public string IImmediateRelativesPhone { get; set; }
        public int ImmediateRelativesNoofSecurity { get; set; }

    }

    public class ShareWithInductor
    {
        public List<ShareWithInductorData> ShareWithInductorDetail { get; set; }
        public bool IsBatch { get; set; }
        public long CreatedBy { get; set; }
        public string JoiningDate { get; set; }   /// Added by anif 0n 15-11-2022
        public string EmailAttachment { get; set; }
    }

    public class ShareWithInductorData
    {
        public long? CandidateId { get; set; }
        public long? BatchId { get; set; }
        public long AutoUserId { get; set; }
        public string EmailBody { get; set; }
        //public string EmailAttachment { get; set; }
        public string InductorName { get; set; }  // Added By anif on 15-11-2022
    }

    // Added by anif this class on 15-11-2022
    public class InductorEmailAndEmailBodyData
    {
        public long ShareInductorId { get; set; }
        public long CandidateId { get; set; }
        public long BatchId { get; set; }
        public long AutoUserId { get; set; }
        public string EmailId { get; set; }
        public string EmailBody { get; set; }
    }
    // Anifur

    public class SearchHiringStausIdForReleaseCandidate
    {
        public int RequisitionDetailId { get; set; }
        public int CandidateId { get; set; }
    }
    public class HiringStausIdForReleaseCandidate
    {
        public int Id { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
    }
    // Added by anif on 01-12-2022
    public class UpdateCandidateJoiningFormFamilydetails
    {
        public int? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public string NewFullName { get; set; }
        public string OldFullName { get; set; }
        public bool FullNameChanged { get; set; }
        //@DOB[nvarchar] (10)=NULL,          
        public int? NewBloodGroup { get; set; }
        public int? OldBloodGroup { get; set; }
        public bool? BloodGroupChanged { get; set; }
        public string NewResidentialAddress { get; set; }
        public string OldResidentialAddress { get; set; }
        public bool? ResidentialAddressChanged { get; set; }
        public string NewResidentialPin { get; set; }
        public string OldResidentialPin { get; set; }
        public bool? ResidentialPinChanged { get; set; }
        public bool? NewSameAsResidential { get; set; }
        public bool? OldSameAsResidential { get; set; }
        public bool? SameAsResidentialChanged { get; set; }
        public string NewPermanentAddress { get; set; }
        public string OldPermanentAddress { get; set; }
        public bool? PermanentAddressChanged { get; set; }
        public string NewPermanentPin { get; set; }
        public string OldPermanentPin { get; set; }
        public bool? PermanentPinChanged { get; set; }
        public string NewEmailId { get; set; }
        public string OldEmailId { get; set; }
        public bool? EmailIdChanged { get; set; }
        public string NewPhoneNo { get; set; }
        public string OldPhoneNo { get; set; }
        public bool? PhoneNoChanged { get; set; }
        //@Date[nvarchar] (10)= NULL,                    
        public int? CreatedBy { get; set; }
        public List<CandidateJoingFormFamilyUpdate> CandidateJoingFormFamily { get; set; }
    }
    public class CandidateJoingFormFamilyUpdate
    {
        public int? CandidateJoiningFormId { get; set; }
        public int? LineId { get; set; }
        public int? CandidateJoiningFamilyLineId { get; set; }
        public string FamilyName { get; set; }
        public int? FamilyRelationShip { get; set; }
        public string FamilyRelationShipName { get; set; }
        public string FamilyDOB { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsNew { get; set; }
        public bool? IsReadOnly { get; set; }
    }
    public class SearchFamilyDetailsUpdateHistory
    {
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class JoiningFormFamilyDetailsUpdateHistoryList
    {
        //public JoiningFormFamilyDetailsUpdateHistoryList()
        //{
        //    FamilyMemberUpdateDetails = new List<FamilyMemberUpdateDetails>();
        //}
        public List<FamilyDetailsFormOtherDetails> FamilyDetailsFormOtherData { get; set; }
        public List<FamilyMemberUpdateDetails> FamilyMemberUpdateDetails { get; set; }
    }
    public class FamilyDetailsFormOtherDetails
    {
        public long? CandidateJoiningFormFamilyHistoryId { get; set; }
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string NewFullName { get; set; }
        public string OldFullName { get; set; }
        public int? NewBloodGroupId { get; set; }
        public string NewBloodGroupName { get; set; }
        public int? OldBloodGroupId { get; set; }
        public string OldBloodGroupName { get; set; }
        public string NewResidentialAddress { get; set; }
        public string OldResidentialAddress { get; set; }
        public string NewResidentialPin { get; set; }
        public string OldResidentialPin { get; set; }
        public bool? NewSameAsResidential { get; set; }
        public bool? OldSameAsResidential { get; set; }
        public string NewPermanentAddress { get; set; }
        public string OldPermanentAddress { get; set; }
        public string NewPermanentPin { get; set; }
        public string OldPermanentPin { get; set; }
        public string NewEmail { get; set; }
        public string OldEmail { get; set; }
        public string NewPhoneNo { get; set; }
        public string OldPhoneNo { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
    }
    public class FamilyMemberUpdateDetails
    {
        public long? CandidateJoiningFormFamilyHistoryId { get; set; }
        public long CandidateJoiningFormId { get; set; }
        public int? CandidateJoiningFamilyLineId { get; set; }
        public string FamilyName { get; set; }
        public int? FamilyRelationShip { get; set; }
        public string FamilyRelationShipName { get; set; }
        public string FamilyDOB { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsNew { get; set; }

    }
    public class FinalFamilyDetailsFormUpdateData
    {
        public FinalFamilyDetailsFormUpdateData()
        {
            familyDetailsForms = new List<FamilyDetailsFormOtherDetailsData>();
        }
        public List<FamilyDetailsFormOtherDetailsData> familyDetailsForms { get; set; }

    }

    public class FamilyDetailsFormOtherDetailsData
    {
        public long? CandidateJoiningFormFamilyHistoryId { get; set; }
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string NewFullName { get; set; }
        public string OldFullName { get; set; }
        public int? NewBloodGroupId { get; set; }
        public string NewBloodGroupName { get; set; }
        public int? OldBloodGroupId { get; set; }
        public string OldBloodGroupName { get; set; }
        public string NewResidentialAddress { get; set; }
        public string OldResidentialAddress { get; set; }
        public string NewResidentialPin { get; set; }
        public string OldResidentialPin { get; set; }
        public bool? NewSameAsResidential { get; set; }
        public bool? OldSameAsResidential { get; set; }
        public string NewPermanentAddress { get; set; }
        public string OldPermanentAddress { get; set; }
        public string NewPermanentPin { get; set; }
        public string OldPermanentPin { get; set; }
        public string NewEmail { get; set; }
        public string OldEmail { get; set; }
        public string NewPhoneNo { get; set; }
        public string OldPhoneNo { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
        public FamilyDetailsFormOtherDetailsData()
        {
            FamilyMemberUpdateDetailsData = new List<FamilyMemberUpdateDetails>();
        }
        public List<FamilyMemberUpdateDetails> FamilyMemberUpdateDetailsData { get; set; }

    }
    public class FamilyMemberUpdateDetailsData
    {
        public long? CandidateJoiningFormFamilyHistoryId { get; set; }
        public long CandidateJoiningFormId { get; set; }
        public int? CandidateJoiningFamilyLineId { get; set; }
        public string FamilyName { get; set; }
        public int? FamilyRelationShip { get; set; }
        public string FamilyRelationShipName { get; set; }
        public string FamilyDOB { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsNew { get; set; }

    }
    public class UpdateSEBIInitialDisclosuerDetails
    {
        public long? CandidateJoiningFormId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string NewSEBIName { get; set; }
        public string OldSEBIName { get; set; }
        public bool? SEBINameChanged { get; set; }
        //--@NewSEBIEmployeeNo{get;set;}
        //--@OldSEBIEmployeeNo{get;set;}
        //--@SEBIEmployeeNoChanged {get;set;}
        //--@NewSEBIDesignation{get;set;}
        //--@OldSEBIDesignation{get;set;}
        //--@SEBIDesignationChanged {get;set;}
        //--@NewSEBIDepartment{get;set;}
        //--@OldSEBIDepartment{get;set;}
        //--@SEBIDepartmentChanged {get;set;}
        public string NewSEBIPanNo { get; set; }
        public string OldSEBIPanNo { get; set; }
        public bool? SEBIPanNoChanged { get; set; }
        public string NewSEBIMobileNo { get; set; }
        public string OldSEBIMobileNo { get; set; }
        public bool? SEBIMobileNoChanged { get; set; }
        public string NewSEBIinstitute { get; set; }
        public string OldSEBIinstitute { get; set; }
        public bool? SEBIinstituteChanged { get; set; }
        public string NewSEBIPastEmployer { get; set; }
        public string OldSEBIPastEmployer { get; set; }
        public bool? SEBIPastEmployeChanged { get; set; }
        public int? NewSEBINoOfSecurity { get; set; }
        public int? OldSEBINoOfSecurity { get; set; }
        public bool? SEBINoOfSecurityChanged { get; set; }
        public string NewSEBIDesigName { get; set; }
        public string OldSEBIDesigName { get; set; }
        public bool? SEBIDesigNameChanged { get; set; }
        public string NewSEBIDesigPanNo { get; set; }
        public string OldSEBIDesigPanNo { get; set; }
        public bool? SEBIDesigPanNoChanged { get; set; }
        public string NewSEBIDesigMobile { get; set; }
        public string OldSEBIDesigMobile { get; set; }
        public bool? SEBIDesigMobileChanged { get; set; }
        public int? CreatedBy { get; set; }
        public List<UpadteSEBIImmediateRelatives> CandidateImidiateRelatives { get; set; }
    }
    public class UpadteSEBIImmediateRelatives
    {
        public long? CandidateJoiningFormId { get; set; }
        public int? LineId { get; set; }
        public string ImidiateRelativesName { get; set; }
        public string ImidiateRelativesPAN { get; set; }
        public string ImidiateRelativesPhone { get; set; }
        public int? ImidiateRelativesNoofSecurity { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsNew { get; set; }
        public bool? IsReadOnly { get; set; }
    }

    public class SearchSEBIInitialDisclosureUpdateHistory
    {
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
    }

    public class SEBIInitialDisclosureUpdateHistoryList
    {
        public List<SEBIInitialDisclosureDetails> SEBIInitialDisclosure { get; set; }
        public List<SEBIImmediateRelatives> SEBIImmediativeRelative { get; set; }
    }
    public class SEBIInitialDisclosureDetails
    {
        public long? CandidateJoiningFormSEBIHistoryId { get; set; }
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public string NewSEBIName { get; set; }
        public string OldSEBIName { get; set; }
        public string NewSEBIPanNo { get; set; }
        public string OldSEBIPanNo { get; set; }
        public string NewSEBIMobileNo { get; set; }
        public string OldSEBIMobileNo { get; set; }
        public string NewSEBIInstitute { get; set; }
        public string OldSEBIInstitute { get; set; }
        public string NewSEBIPastEmplpoyer { get; set; }
        public string OldSEBIPastEmplpoyer { get; set; }
        public int NewSEBINoOfSecurity { get; set; }
        public int OldSEBINoOfSecurity { get; set; }
        public string NewSEBIDesigName { get; set; }
        public string OldSEBIDesigName { get; set; }
        public string NewSEBIDesigPanNo { get; set; }
        public string OldSEBIDesigPanNo { get; set; }
        public string NewSEBIDesigPhoneNo { get; set; }
        public string OldSEBIDesigPhoneNo { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
    }
    public class SEBIImmediateRelatives
    {
        public long? CandidateJoiningFormSEBIHistoryId { get; set; }
        public long? CandidateJoiningFormId { get; set; }
        public int? LineId { get; set; }
        public string ImmediateRelativeName { get; set; }
        public string ImmediativeRelativePan { get; set; }
        public string ImmediativeRelativePhone { get; set; }
        public int? ImidiateRelativesNoofSecurity { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsNew { get; set; }

    }
    public class SEBIInitialDisclosureDetailsData
    {
        public long? CandidateJoiningFormSEBIHistoryId { get; set; }
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public string NewSEBIName { get; set; }
        public string OldSEBIName { get; set; }
        public string NewSEBIPanNo { get; set; }
        public string OldSEBIPanNo { get; set; }
        public string NewSEBIMobileNo { get; set; }
        public string OldSEBIMobileNo { get; set; }
        public string NewSEBIInstitute { get; set; }
        public string OldSEBIInstitute { get; set; }
        public string NewSEBIPastEmplpoyer { get; set; }
        public string OldSEBIPastEmplpoyer { get; set; }
        public int NewSEBINoOfSecurity { get; set; }
        public int OldSEBINoOfSecurity { get; set; }
        public string NewSEBIDesigName { get; set; }
        public string OldSEBIDesigName { get; set; }
        public string NewSEBIDesigPanNo { get; set; }
        public string OldSEBIDesigPanNo { get; set; }
        public string NewSEBIDesigPhoneNo { get; set; }
        public string OldSEBIDesigPhoneNo { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
        public SEBIInitialDisclosureDetailsData()
        {
            SEBIImmediativeRelativeData = new List<SEBIImmediateRelatives>();
        }
        public List<SEBIImmediateRelatives> SEBIImmediativeRelativeData { get; set; }
    }

    public class FinalSEBIDisclosureDetailsData
    {
        public FinalSEBIDisclosureDetailsData()
        {
            FinalSEBIDisclosureData = new List<SEBIInitialDisclosureDetailsData>();
        }
        public List<SEBIInitialDisclosureDetailsData> FinalSEBIDisclosureData { get; set; }
    }
    public class SearchAccidentInsurancePolicyUpdateHistory
    {
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class SearchJoiningReportHistory
    {
        public long? CandidateJoiningFormId { get; set; }
        public int? CandidateId { get; set; }
    }
    public class SearchMRFPPFHistory
    {
        public int? CandidateId { get; set; }
    }
    public class SearchJoiningReportHistoryList
    {
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
    }
    public class SearchMRFPPFList
    {
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
    }
    public class AccidentInsurancePolicyUpdateHistoryList
    {
        public long? CandidateJoiningFormInsuranceHistoryId { get; set; }
        public long? CandidateJoiningFormId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string NewAccidentPolicyNominee { get; set; }
        public string OldAccidentPolicyNominee { get; set; }
        public int? NewAccidentPolicyNomineeRelationShip { get; set; }
        public string NewAccidentPloicyRelationShipName { get; set; }
        public int? OldAccidentPolicyNomineeRelationShip { get; set; }
        public string OldAccidentPloicyRelationShipName { get; set; }
        public string NewAccidentPolicyNomineeAddress { get; set; }
        public string OldAccidentPolicyNomineeAddress { get; set; }
        public string ModifiedBy { get; set; }
        public string ModifiedDate { get; set; }
    }
    public class UpdateAccidentInsurancePolicy
    {
        public long? CandidateJoiningFormId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string NewAcidentalPolicyNominee { get; set; }
        public string OldAcidentalPolicyNominee { get; set; }
        public bool? AcidentalPolicyNomineeChanged { get; set; }
        public int? NewAcidentalPolicyNomineeRelationShip { get; set; }
        public int? OldAcidentalPolicyNomineeRelationShip { get; set; }
        public bool? AcidentalPolicyNomineeRelationShipChanged { get; set; }
        public string NewAcidentalPolicyNomineeAddress { get; set; }
        public string OldAcidentalPolicyNomineeAddress { get; set; }
        public bool? AcidentalPolicyNomineeAddressChanged { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class UpdateJoiningReport
    {
        public long? CandidateJoiningFormId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string SignaturePlace { get; set; }
        public int? CreatedBy { get; set; }
    }
        public class discontinuecandidate
    {
        public string CandidateIds { get; set; }
        public string Remarks { get; set; }
        public int? CreatedBy { get; set; }
    }

    // Added by anif on 01-12-2022 till this
    public class searchbatchcandidate
    {
        public int CandidateId { get; set; }
    }
    public class DeleteCandidateInductionScheduleDetail
    {
        public int CandidateInductionScheduleDetailsId { get; set; }
    }
    public class getbatchcandidate
    {
        public int BatchId { get; set; }
    }
    public class GetAdditionalDocumentList
    {
        public int ShareWithCandidateId { get; set; }
        public int TemplateId { get; set; }
        public int ShareWithCandidateHeaderId { get; set; }
        public int CandidateId { get; set; }
        public int CandidateJoiningDocumentId { get; set; }
        public string AttachmentDocumentName { get; set; }
        public int MailingStatus { get; set; }

    }
    public class UpdateAdditionalDoc
    {
        public int ShareWithCandidateHeaderId { get; set; }
        public int CandidateId { get; set; }
        public string CandidateJoiningDocumentIds { get; set; }
        public int CreatedBy { get; set; }

    }
    public class DiscontinueIndividualCandidateFormData
    {
        public int ? CandidateId { get; set; }        
        public int CreatedBy { get; set; }
        public string Remarks { get; set; }
    }

    public class SignatureInsUpData
    {
        public int? CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public int? CandidateJoiningFormId { get; set; }
        public string SignaturePic { get; set; }
    }
    public class CampusSearchPreJoiningCandidateList
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string Name { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? GradeId { get; set; }
        public int? DocApprovalStatusId { get; set; }
        public int? RMDocApprovalStatusId { get; set; }
        public int? OMDocApprovalStatusId { get; set; }
        public int? PreEmployeeMedicalStatus { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public int? HiringStatus { get; set; }
    }
    public class CampusPreJoiningCandidateList
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }

        public string ReqNo { get; set; }

        public int Vertical { get; set; }
        public string VerticalName { get; set; }
        public int Location { get; set; }
        public string LocationName { get; set; }
        public int Funcation { get; set; }

        public string FnctionName { get; set; }
        public int Department { get; set; }
        public string Departmentname { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int Grade { get; set; }

        public string GradeName { get; set; }
        public string DocumentStatus { get; set; }
        public string PreempMed { get; set; }
        public string JoiningDate { get; set; }

        public string JoinDateStatus { get; set; }
        public int HiringStatusId { get; set; }
        public string StatusName { get; set; }


    }
    public class CandidateJoiningRelationShip
    {
        public int RelationshipId { get; set; }
        public string RelationshipName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchJoiningRelationShip
    {
        public bool IsActive { get; set; }
    }

    public class CandidateListOnBoardingNew
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string CandidateFullName { get; set; }
        public string EmailId { get; set; }
        public int HiringStatusId { get; set; }
    }
    public class OMOnbMailDetails
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Doj { get; set; }
        public string Moj { get; set; }
        public string PosCode { get; set; }
        public string Remarks { get; set; }
    }
    public class JoiningDetails
    {
        public List<OMDeatails> omDeatails { get; set; } = new List<OMDeatails>();
        public List<RMDeatails> rmDeatails { get; set; } = new List<RMDeatails>();
        public List<CandidateJoinDateDeatails> candidateJoinDateDeatails { get; set; } = new List<CandidateJoinDateDeatails>();

    }
    public class OMDeatails
    {
        public int OM { get; set; }
        public string OMEmail { get; set; }
    }
    public class RMDeatails
    {
        public int RM { get; set; }
        public string RMEmail { get; set; }

    }
    public class CandidateJoinDateDeatails
    {
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string DateofJoining { get; set; }
        public string ModeofJoining { get; set; }
        public string PositionCode { get; set; }
        public string Remarks { get; set; }
        public int OMId { get; set; }
        public int RMId { get; set; }
    }
    public class DeleteInductionScheduleParam
    {
        public int CandidateId { get; set; }
        public int BatchId { get; set; }
    }
    

}