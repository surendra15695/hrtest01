using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CampusModule
{
    public class CampusRequisitionFormData
    {
        public int CampusYearId { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int CampusCourseId { get; set; }
        public int CampusStreamId { get; set; }
        public string CampusRequisitionData { get; set; }
        public List<CampusRequisitionDataObject> RequisitionData { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CampusRequisitionDataObject
    {
        public int AutoId { get; set; }
        public int RequisitionTypeId { get; set; }
        public string RequisitionTitle { get; set; }
        public int FunctionId { get; set; }
        public int CollegeCategoryId { get; set; }
        public int CandidateCount { get; set; }
    }

    public class CampusRequisitionList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public string RequestedOn { get; set; }
        public string CampusYearName { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int CampusCourseId { get; set; }
        public string CourseName { get; set; }
        public int CampusStreamId { get; set; }
        public string StreamName { get; set; }
        public int CollegeCategoryId { get; set; }
        public string CollegeCategoryName { get; set; }
        public int CandidateCount { get; set; }
        public int CandidateSelected { get; set; }
        public int CandidateJoined { get; set; }
        public string StatusName { get; set; }
        public string RequisitionTitle { get; set; }
        public int RequisitionTypeId { get; set; }
        public string RequisitionTypeName { get; set; }
    }

    public class SearchCampusRequisitionList
    {
        public int? CampusYearId { get; set; }
        public string RequisitionNo { get; set; }
        public long? RequistionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? VerticalId { get; set; }
        public int? CampusCourseId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? CreatedBy { get; set; }
        public int? CampusProcessStatusId { get; set; }
    }

    public class SaerchCampusLink
    {
        public int? CampusCourseId { get; set; }
        public int? CampusYearId { get; set; }
        public long? CampusLinkId { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class CampusLinkList
    {
        public long CampusLinkId { get; set; }
        public int CampusYearId { get; set; }
        public string CampusYearName { get; set; }
        public int CampusCourseId { get; set; }
        public string CourseName { get; set; }
        public string CampusLink { get; set; }
        public int CampusForId { get; set; }
        public string CampusForName { get; set; }
        public string CreatedOn { get; set; }
        public int CandidateCount { get; set; }
        public string CampusTemplate { get; set; }
        public int DisableStatus { get; set; }
    }

    public class CampusLinkFormData
    {
        public int CampusYearId { get; set; }
        public int CampusCourseId { get; set; }
        public int CampusForId { get; set; }
        public string CampusTemplate { get; set; }
        public long CreatedBy { get; set; }

        public string Appurl { get; set; }
    }

    public class UpdateCampusLinkTemplate
    {
        public int CampusLinkId { get; set; }
        public string CampusLinkTemplate { get; set; }
        public bool IsActive { get; set; }
        public int CampusYearId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class CampusCollegeLinkFormData
    {
        public long CampusLinkId { get; set; }
        public string CampusCollegeIds { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CampusCollegeLinklSharedList
    {
        public int CampusCollegeId { get; set; }
        public string CollegeName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string CollegeAddress { get; set; }
        public int CollegeCategoryId { get; set; }
        public string CollegeCategoryName { get; set; }
        public string ContactName { get; set; }
        public string ContactDesignation { get; set; }
        public string ContactEmailId { get; set; }
        public string ContactNo { get; set; }
        public bool IsActive { get; set; }
        public int CampusLinkStatus { get; set; }
        public string CollegeType { get; set; }
    }

    public class SearchCampusCollegeLinklSharedList
    {
        public long CampusLinkId { get; set; }
        public int StateId { get; set; }
        public int CollegeCategoryId { get; set; }
    }

    public class SearchCampusRequisitionTitle
    {
        public int? CampusYearId { get; set; }
        public int? CampusCourseId { get; set; }
    }

    public class CampusRequisitionTitleList
    {
        public long RequisitionDetailId { get; set; }
        public string RequisitionTitle { get; set; }
        public int CampusCourseId { get; set; }
        public int CampusYearId { get; set; }
        public int VerticalId { get; set; }
    }

    public class CampusCandidateList
    {
        public long CampusLinkId { get; set; }
        public string CandidateNo { get; set; }
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HighestQualification { get; set; }
        public int PreplacementId { get; set; }
        public int CanceledId { get; set; }
        public string Course { get; set; }
        public string Stream { get; set; }
        public string Institite { get; set; }
        public int VerticalId { get; set; }
        public string verticalName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public string FunctionNameInterview { get; set; }
        public string Resume { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public string InstititeLocation { get; set; }
        public string StatusName { get; set; }
        public string InterviewComName { get; set; }
        public int Flag { get; set; }

    }

    public class SearchCampusCandidateDetail
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public int? HiringStatusId { get; set; }
        public string GenderIds { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
        public string MotherTongueIds { get; set; }
        public string QualificationIds { get; set; }
        public string CourseIds { get; set; }
        public string StreamIds { get; set; }
        public decimal? FromPercentage { get; set; }
        public decimal? ToPercentage { get; set; }
        public string DomainIds { get; set; }
        public string SubDomainIds { get; set; }
        public string StateIds { get; set; }
        public string SourceChannelId { get; set; }
        public long? CreatedBy { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CampusLinkId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? FromExperience { get; set; }
        public int? ToExperience { get; set; }
        public string CompletionYears { get; set; }
        public string InstitutionIds { get; set; }
        public string QualificationTypeIds { get; set; }
        public string CurrentEmployer { get; set; }
        public string Designation { get; set; }
        public string RelativeStatus { get; set; }
        public int? PreviousApplied { get; set; }
        public int? NativeStateIds { get; set; }
        public int? PresentStateIds { get; set; }
        public int? FatherOccupation { get; set; }
        public int? MotherOccupation { get; set; }
        public int? FromHeight { get; set; }
        public int? ToHeight { get; set; }
        public int? FromWeight { get; set; }
        public int? ToWeight { get; set; }
        public string Disability { get; set; }
        public string EyeSightCorrected { get; set; }
        public string Health { get; set; }
        public string Siblings { get; set; }
        public string Commitment { get; set; }
        public string WorkingShift { get; set; }
        public string JobTypePriyority { get; set; }
        public string CriticalFactor { get; set; }
        public string ExtraCurricularActivity { get; set; }
        public string LanguageIds { get; set; }

    }
    public class SearchCampusStatus
    {
        public bool? IsActive { get; set; }
    }
    public class CampusStatusList
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
    public class CampusCandidateHiringStatusFormData
    {
        public string CandidateIds { get; set; }
        public long CampusLinkId { get; set; }
        public int HiringStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CampusTestScheduleFormData
    {
        public long CampusLinkId { get; set; }
        public int TestTypeId { get; set; }
        public string TestLink { get; set; }
        public string TestFromDate { get; set; }
        public string TestToDate { get; set; }
        public string TestVenueName { get; set; }
        public string TestInstituteEmail { get; set; }
        public string TestContactName { get; set; }
        public string TestContactNo { get; set; }
        public bool IsTestTravel { get; set; }
        public string TravelModes { get; set; }
        public int TestEmailTemplateId { get; set; }
        public string TestEmailTemplate { get; set; }
        public string CandidateIds { get; set; }
        public long CreatedBy { get; set; }
        public string EmailId { get; set; }
        public string TestVenueAddress { get; set; }

    }
    public class CampusTalkScheduleFormData
    {
        public long placementScheduleMasterId { get; set; }
        public long CampusLinkId { get; set; }
        public int TalkTypeId { get; set; }
        public string TalkLink { get; set; }
        public string TalkFromDate { get; set; }
        public string TalkToDate { get; set; }
        public string TalkVenueName { get; set; }
        public string InstituteEmailId { get; set; }
        public string TalkContactName { get; set; }
        public string TalkContactNo { get; set; }
        // public bool IsTestTravel { get; set; }
        //  public int TestEmailTemplateId { get; set; }
        public string TalkEmailTemplate { get; set; }
        public string CandidateIds { get; set; }
        public long CreatedBy { get; set; }
    }
    public class CampusTestScheduleDetail
    {
        public long TestScheduleDetailId { get; set; }
        public long CandidateId { get; set; }
        public int TestTypeId { get; set; }
        public string TestLink { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VenueName { get; set; }
        public string VenueAddress { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactNo { get; set; }
        public bool IsTravel { get; set; }
        public int EmailTemplateId { get; set; }


    }
    public class InterviewScheduleDetailForCandidate
    {
        public long InterviewDetailId { get; set; }
        public long CandidateId { get; set; }
        public long InterviewId { get; set; }
        public int InterviewRoomId { get; set; }
        public int InterviewTypeId { get; set; }
        public string InterviewLink { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InterviewSlot { get; set; }
        public int VenueId { get; set; }
        public string VenueName { get; set; }
        public string HRAutoUserIds { get; set; }
        public string InterviewerAutoUserIds { get; set; }
        public bool IsAccomodation { get; set; }
        public string AccomodationDetails { get; set; }
        public bool IsTravel { get; set; }
        public string TravelModes { get; set; }
        public bool IsFormAnexture { get; set; }
        public string ScheduleComments { get; set; }
        public int EmailTemplateId { get; set; }
        public string VenueAddress { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
    }
    public class SearchInterviewScheduleDetailForCandidate
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
    }
    //added by arghya date-29.09.2022

    public class CampusTestScheduleDetailForGetAll
    {
        public long TestScheduleDetailId { get; set; }
        public long CandidateId { get; set; }
        public int TestTypeId { get; set; }
        public string TestLink { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VenueName { get; set; }
        public string InstituteEmailId { get; set; }
        public string VenueAddress { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactNo { get; set; }
        public bool IsTravel { get; set; }
        public string TravelModes { get; set; }
        public int EmailTemplateId { get; set; }
    }
    public class SearchCampusTestScheduleDetailForGetAll
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
    }
    //added by arghya date-28.09.2022
    public class CampusTalkScheduleDetailForGetAll
    {
        public long PlacementScheduleDetailId { get; set; }
        public long CandidateId { get; set; }
        public int TalkTypeId { get; set; }
        public string TALKLINK { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VenueName { get; set; }
        public string InstituteEmailId { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactNo { get; set; }
        public string EmailTemplate { get; set; }
    }
    public class SearchCampusTalkScheduleDetailForGetAll
    {
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
    }
    public class CampusTalkScheduleDetail
    {
        public long TalkScheduleDetailId { get; set; }
        public long CandidateId { get; set; }
        public int TalkTypeId { get; set; }
        public string TalkLink { get; set; }
        public string TalkFromDate { get; set; }
        public string TalkToDate { get; set; }
        public string TalkVenueName { get; set; }
        public string TalkContactName { get; set; }
        public string TalkContactNo { get; set; }
        public int TalkEmailTemplate { get; set; }
        public long CreatedBy { get; set; }

    }

    public class SearchCampusTestScheduleDetail
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long? CampusLinkId { get; set; }
    }

    public class SearchCampusTestResult
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public long? CampusLinkId { get; set; }
    }

    public class CampusTestResultDetail
    {
        public long RequisitionDetailId { get; set; }
        public string AttemptId { get; set; }
        public string TestPin { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string DOB { get; set; }
        public string TestCompletionDate { get; set; }
        public int ScoreObtained { get; set; }
        public int Apptitude { get; set; }
        public int ReadingExercise { get; set; }
        public int WrittenExercise { get; set; }
        public int Technical { get; set; }
        public string TestResult { get; set; }

    }

    public class CampusInterviewScheduleFormData
    {
        public string CandidateIds { get; set; }
        public long CampusLinkId { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int InterviewId { get; set; }
        public int InterviewTypeId { get; set; }
        public string InterviewLink { get; set; }
        public int InterviewRoomId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InterviewSlot { get; set; }
        public string VenueName { get; set; }
        public string HRAutoUserIds { get; set; }
        public string InterviewerAutoUserIds { get; set; }
        public bool IsTravel { get; set; }
        public string TravelModes { get; set; }
        public bool IsAccomodation { get; set; }
        public string AccomodationDetails { get; set; }
        public bool IsFormAnexture { get; set; }
        public string ScheduleComments { get; set; }
        public int EmailTemplateId { get; set; }
        public string EmailTemplate { get; set; }
        public long CreatedBy { get; set; }
        public string EmailId { get; set; }
        public string InterviewVenueAddress { get; set; }
        public string InterviewContactNo { get; set; }
        public string InterviewContactName { get; set; }
    }

    public class CampusInterviewScheduleDetail
    {
        public long InterviewDetailId { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public long CandidateId { get; set; }
        public long InterviewId { get; set; }
        public int InterviewRoomId { get; set; }
        public int InterviewTypeId { get; set; }
        public string InterviewLink { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InterviewSlot { get; set; }
        public string VenueName { get; set; }
        public string HRAutoUserIds { get; set; }
        public string InterviewerAutoUserIds { get; set; }
        public bool IsAccomodation { get; set; }
        public string AccomodationDetails { get; set; }
        public bool IsTravel { get; set; }
        public string TravelModes { get; set; }
        public bool IsFormAnexture { get; set; }
        public string ScheduleComments { get; set; }
        public int EmailTemplateId { get; set; }
    }

    public class SearchCampusInterviewScheduleDetail
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CampusLinkId { get; set; }
    }

    public class SearchCampusVerticalFunction
    {
        public long CandidateId { get; set; }
        public long CampusLinkId { get; set; }
    }

    public class CampusCandidateVertical
    {
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
    }

    public class CampusCandidateFunction
    {
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
    }
    public class CampusCandidatePosition
    {
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int PositionId { get; set; }
        public string Positionname { get; set; }
    }
    public class CampusCandidateLocation
    {
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int LocationId { get; set; }
        public string Locationname { get; set; }
    }
    public class CandidateMappedList
    {
        public int FunctionId { get; set; }
        public int StatusId { get; set; }
        public int CandidateId { get; set; }
        public int VerticalId { get; set; }
        public int HiringStatusId { get; set; }
        public string StatusName { get; set; }
        public string FunctionName { get; set; }
        public string VerticalName { get; set; }
        public string CandidateNo { get; set; }

        public string FullName { get; set; }
        public string RoundName { get; set; }
    }

    public class CampusCandidateVerticalFunction
    {
        public List<CampusCandidateVertical> CampusVertical { get; set; }
        public List<CampusCandidateFunction> CampusFunction { get; set; }
        //public List<CampusCandidatePosition> CampusPosition { get; set; }
        //public List<CampusCandidateLocation> CampusLocation { get; set; }
        public List<CandidateMappedList> MappedList { get; set; }
    }


    public class CampusCandidateVerticalFunctionFormData
    {
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchCampusRequisitionMap
    {
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
    }

    public class CampusRequisitionMapList
    {
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
    }
    public class SearchRequisitionListForCampusMap
    {
        public int? RequisitionDetailId { get; set; }
        public int? IsDummy { get; set; }
    }
    public class RequisitionListForCampusRequisitionMap
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentIdm { get; set; }
        public string DepartmentName { get; set; }
    }

    public class CampusCandidateRequistionMapFormData
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }

    }

    public class SearchCampusRequisitionData
    {
        public long RequisitionDetailId { get; set; }
    }

    public class CampusRequisitionData
    {
        public int RequisitionTypeId { get; set; }
        public string RequisitionTitle { get; set; }
        public int FunctionId { get; set; }
        public int CandidateCount { get; set; }
        public int CollegeCategoryId { get; set; }
    }

    public class CampusRequisitionUpdateFormData
    {
        public int? RequisitionDetailId { get; set; }
        public int? RequisitionTypeId { get; set; }
        public string RequisitionTitle { get; set; }
        public int? FunctionId { get; set; }
        public int? CandidateCount { get; set; }
        public int? CollegeCategoryId { get; set; }
        public int? StatusId { get; set; }
        public long? CreatedBy { get; set; }
    }

    public class CampusCandidateProfileData
    {
        public string FullName { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string GenderName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string HomeTown { get; set; }
        public string NativeState { get; set; }
        public string PresentState { get; set; }
        public string MotherTongue { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageKnown { get; set; }
        public string LanguageNames { get; set; }
        public string EyeSightCorrected { get; set; }
        public string EyeSightLeft { get; set; }
        public string EyeSightRight { get; set; }
        public string FatherOccupation { get; set; }
        public string MotherOccupation { get; set; }
        public string Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public string HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int HighestQualification { get; set; }
        public string Siblings { get; set; }
        public string Commitment { get; set; }
        public string AnyWhere { get; set; }
        public string WorkinginShift { get; set; }
        public string JobPriority { get; set; }
        public string CriticalFactor { get; set; }
        public string MostPreferdBenifit { get; set; }
        public string ExtraCurricularActivities { get; set; }
        public string Resume { get; set; }
        public string Reamrks { get; set; }
        public string Application { get; set; }
    }

    public class CampusCandidateProfileAcademicData
    {
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string CourseStatus { get; set; }
        public string StreamName { get; set; }
        public string Institution { get; set; }
        public string YearOfPassing { get; set; }
        public string Marks { get; set; }
        public string StateName { get; set; }
    }

    public class CampusCandidateProfileDetail
    {
        public List<CampusCandidateProfileData> ProfileData { get; set; }
        public List<CampusCandidateProfileAcademicData> AcademicData { get; set; }
    }
    public class RegistrationDetail
    {
        public List<CandidateDetails> ProfileData { get; set; }
        public List<CandidateRegistrationAcademicData> AcademicData { get; set; }
        public List<CandidateProfileOtherAcademicDataNew> OtherAcademicData { get; set; }
    }

    public class CandidateRegistrationAcademicData
    {
        public string Course { get; set; }
        public string CourseStatus { get; set; }
        public string YearOfPassing { get; set; }
        public int VisualOrder { get; set; }
        public int Stream { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public string Marks { get; set; }
    }
    public class CandidateProfileOtherAcademicData
    {
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string CourseStatus { get; set; }
        public string Specalization { get; set; }
        public string Institution { get; set; }
        public string InstitutionName { get; set; }
        public string InstitutionLocation { get; set; }
        public string YearOfPassing { get; set; }
        public string Marks { get; set; }
    }
    public class CandidateProfileOtherAcademicDataNew
    {
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public string YearOfPassing { get; set; }
        public string Marks { get; set; }
    }
    public class CandidateDetails
    {
        public string CampusLinkId { get; set; }
        public string FullName { get; set; }
        public string GenderId { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public string NativeState { get; set; }
        public string PresentState { get; set; }
        public string MotherTongue { get; set; }
        public string LanguageIds { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public string FatherOccupation { get; set; }
        public string MotherOccupation { get; set; }
        public string Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public string HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public string HighestQualification { get; set; }
        public string NoofSiblings { get; set; }
        public string YearsCommitments { get; set; }
        public string AnyWhereinIndia { get; set; }
        public string JobTypePriority { get; set; }
        public string CriticalFactor { get; set; }
        public string MostPreferdBenifit { get; set; }
        public string ExtraCurricularActivities { get; set; }
        public string ActiveArrears { get; set; }
        public string WorkinginShift { get; set; }
        public string Resume { get; set; }
        public string IsEnabled { get; set; }
    }
    public class SearchCampusCandidateProfile
    {
        public long? CandidateId { get; set; }
    }
    public class RegistrationRemarks
    {
        public int RemarksId { get; set; }
        public int AutoUserId { get; set; }
        public int CandidateId { get; set; }
        public int FormtypeId { get; set; }
        public int CampusLinkId { get; set; }
        public string Remarks { get; set; }
    }
    public class SearchCampusCandidateRemarks
    {
        public long? CandidateId { get; set; }
        public int FormtypeId { get; set; }
    }
    public class EnableDisableCampusLinkFormData
    {
        public long CampusLinkId { get; set; }
        public int Status { get; set; }
    }

    public class UpdateInstituteFormData
    {
        public string CandidateId { get; set; }
        public string InstituteName { get; set; }
    }
    public class UpdateCampusProfileData
    {
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Dob { get; set; }
        public string EmailId { get; set; }
        public string phoneno { get; set; }
        public string hometwon { get; set; }
        public int highestQualification { get; set; }
        public int VisualOrder { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }

    }
    public class RejectDeclineData
    {
        public int CandidateId { get; set; }
        public int HiringStatusId { get; set; }
        public int CreatedBy { get; set; }
        public string Remarks { get; set; }

    }
    public class AcknowledgedData
    {
        public int CandidateId { get; set; }
        public int HiringStatusId { get; set; }
        public string Remarks { get; set; }

    }
    public class Cancelplacement
    {
        public String CandidateIds { get; set; }
        public String CandidateName { get; set; }
        public string Institute { get; set; }
        public string Course { get; set; }
        public string Stream { get; set; }
        public String EmailId { get; set; }

    }

    public class StageGetAssesmentCandidate
    {
        public string FullName { get; set; }
        public string StateName { get; set; }
        public string HomeTown { get; set; }
        public int StageGetAssesmentMasterId { get; set; }
    }

    public class GetStageGetAssesmentComponentData
    {
        public int ComponentId { get; set; }
        public string ComponentName { get; set; }
        public bool isHeader { get; set; }

    }
    public class SearchCandiateByReq
    {
        public int RequistionDeatilsId { get; set; }

    }

    public class ReqCandidateDetails
    {
        public string CandidateNo { get; set; }
        public int CandidateId { get; set; }
        public int RequisitionDetailId { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public string HigestQualification { get; set; }
        public string CourseName { get; set; }
        public string StreamName { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public int StatusId { get; set; }
        public string Statusname { get; set; }
        public string EmailId { get; set; }
        public int OptionVisible { get; set; }
    }

    public class SelectionComunicationIns
    {
        public string CandidateIds { get; set; }

        public string CandiateName { get; set; }
        public string Emails { get; set; }
        public string Functions { get; set; }
        public string Template { get; set; }
        public int CreatedBy { get; set; }
        public int RequisitionDetailsId { get; set; }

    }
    public class CandidateWiseSelectionSearach
    {
        public int CandidateId { get; set; }
    }

    public class CandidateWiseSelection
    {
        public int CandidateId { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public int HiringStatusId { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public int LocationId { get; set; }

    }

    public class CampusCandidateSelectionAcknowledgeData
    {
        public int CandidateId { get; set; }
        public int HiringStatusId { get; set; }
        public int LocationId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class MapRequistionDeatils
    {
        public int CandidateId { get; set; }
        public int RequistionType { get; set; }
        public int SelectedRequitionDetails { get; set; }
        public int CreatedBy { get; set; }
    }

    public class InstituteEmailIds
    {
        public int CandidateId { get; set; }
        public string InstituteEmailId { get; set; }
        public string ContactPersonName { get; set; }
        public string FullName { get; set; }
    }
}

