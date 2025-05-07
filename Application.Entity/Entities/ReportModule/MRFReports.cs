using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.ReportModule
{
    class MRFReports
    {
    }
    public class NoticePeriod
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string PostingLocation { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public decimal TotalCTC { get; set; }
        public int NoticePeriodDays { get; set; }
        public int NoticePeriodServedDays { get; set; }
        public int RemainingDays { get; set; }
        public decimal NoticePeriodAmount { get; set; }

    }
    public class NoticePeriodNew
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public string VerticalName { get; set; }
        public string Location { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        //public decimal TotalCTC { get; set; }
        public int NoticePeriodDays { get; set; }
        public int NoticePeriodServedDays { get; set; }
        public int RemainingDays { get; set; }
        public decimal NoticePeriodAmount { get; set; }

    }
    public class SearchNoticePeriod
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? GradeId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class NoticePeriodSavingCost
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public decimal TotalCTC { get; set; }
        public string CreatedOn { get; set; }
        public string SavingCost { get; set; }
        public string PerofCTC { get; set; }
    }

    public class SearchNoticePeriodSavingCost
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? GradeId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }

    public class RelocationReport
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string PostingLocation { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string PresentAddress { get; set; }
        public double BillAmount { get; set; }
    }
    public class RelocationReportNew
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public string VerticalName { get; set; }
        public string Location { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string MRFOfferedBasic { get; set; }
        public string PresentAddress { get; set; }
        public double BillAmount { get; set; }
    }

    public class SearchRelocationReport
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class SearchTravelReimbursementReport
    {
        public string RequisitionNo { get; set; }
        public string CandidateNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VerticalId { get; set; }
        public int? PositionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public int? ClaimStatusId { get; set; }
        public long? AutoUserId { get; set; }
    }
    public class TravelReimbursementReport
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string ReimbursementType { get; set; }
        public string TestInterviewDate { get; set; }
        public DateTime TestInterviewDateTime { get; set; }
        public string TestInterviewName { get; set; }
        public string TestInterviewVenue { get; set; }
        public string ModeOfJourney { get; set; }
        public string ModeOfTravel { get; set; }
        public decimal? ClaimAmount { get; set; }
        public string ClaimStatusName { get; set; }


    }
    public class TravelReimbursementReportNew
    {
        public int SerialNo { get; set; }
        //public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string Phone { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string ReimbursementType { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewTime { get; set; }
        public string InterviewName { get; set; }
        public string InterviewVenue { get; set; }
        public string ModeOfJourney { get; set; }
        public string ModeOfTravel { get; set; }
        public decimal? ClaimAmount { get; set; }
        public string ClaimStatus { get; set; }


    }
    public class SearchCandidateDetails
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public int? AutoUserId { get; set; }
        public string EmpNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VerticalId { get; set; }
        public string FunctionId { get; set; }
        public string LocationId { get; set; }
        public string DepartmentId { get; set; }
        public int? ToAge { get; set; }
        public int? FromAge { get; set; }
        public string GradeId { get; set; }
        public string SourceChannelId { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
        public int? GenderId { get; set; }
        public int? InterviewStatus { get; set; }
        public int? HiringStatusId { get; set; }
        public string HiringStatusIds { get; set; }
        public string RequisitionNo { get; set; }
        public int? University { get; set; }
        public int? QulificationUniversityBoardId { get; set; }
        public string MotherTongueIds { get; set; }
        public string PermanentNativeState { get; set; }
        public string CommunicationState { get; set; }
        public string QualificationTypeIds { get; set; }
        public int? CandidateBVGReportId { get; set; }
        public string LanguageKnownIds { get; set; }
        public string QualificationIds { get; set; }
        public int? QualificationId { get; set; }
        public string QualificationName { get; set; }
        public string CourseIds { get; set; }
        public string Instutation { get; set; }
        public string CompletionYears { get; set; }
        public string StreamIds { get; set; }
        public int? CronicMajorIllnessId { get; set; }
        public int? HandiCapId { get; set; }
        public string EyeSightCorrected { get; set; }
        public string BloodGroup { get; set; }
        public int MRFRelativeStatus { get; set; }
        public string SpouseOccupation { get; set; }
        public string NoOfSibilings { get; set; }
        public string HomeTown { get; set; }
        public string DocumentStatus { get; set; }
        public string FatherOccupation { get; set; }
        public decimal? FromPercentage { get; set; }
        public decimal? ToPercentage { get; set; }
        public int pagesize { get; set; }
        public int pagenumber   { get; set; }
    }
    //mas
    public class CandidateDetailsInput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public string FullName { get; set; }
        public string AadharNo { get; set; }
        public string PANNo { get; set; }
        public string UANNO { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AlternateContactNo { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public string HiringStatus { get; set; }
        public string EmploymentStatus { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string DateOfOffer { get; set; }
        public string SourceChannelName { get; set; }
        public string Administrator { get; set; }
        public string CandidateOwner { get; set; }
        public string MotherToung { get; set; }
        public string LanguageKnown { get; set; }
        public string NativeState { get; set; }
        public string PresesntState { get; set; }
        public string HomeTown { get; set; }
        public string FatherOccupation { get; set; }
        public string CronicMajorIllness { get; set; }
        public string EyeSightCorrected { get; set; }
        public string EyeSightLeft { get; set; }
        public string EyeSightRight { get; set; }
        public int NoOfSibilings { get; set; }
        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public string SpouseOccupation { get; set; }
        public int NoOfChildren { get; set; }
        public string MaritialStatus { get; set; }

        public string MRFTotalCTCOffered { get; set; }
        public string BasicOfferedMonthly { get; set; }
        public string MonthlyGrossSalaryOffered { get; set; }
        public string MRFAllowanceOfferedMonthly { get; set; }
        public string JoiningChecklistStatus { get; set; }
        public string Qualification1Name { get; set; }
        public string Qualification2Name { get; set; }
        public string Qualification3Name { get; set; }
        public string Qualification4Name { get; set; }
        public string Qualification5Name { get; set; }
        public string Qualification6Name { get; set; }
        public string Qual1CourseName { get; set; }
        public string Qual2CourseName { get; set; }
        public string Qual3CourseName { get; set; }
        public string Qual4CourseName { get; set; }
        public string Qual5CourseName { get; set; }
        public string Qual6CourseName { get; set; }
        public string UniversityBoard1 { get; set; }
        public string UniversityBoard2 { get; set; }
        public string UniversityBoard3 { get; set; }
        public string UniversityBoard4 { get; set; }
        public string UniversityBoard5 { get; set; }
        public string UniversityBoard6 { get; set; }
        public string PreviousOrganizationName1 { get; set; }
        public string PreviousOrganizationName2 { get; set; }
        public string PreviousOrganizationName3 { get; set; }
        public string PreviousOrganizationName4 { get; set; }
        public string PreviousOrganizationName5 { get; set; }
        public string PreviousOrganizationName6 { get; set; }
        public string Instutation1 { get; set; }
        public string Instutation2 { get; set; }
        public string Instutation3 { get; set; }
        public string Instutation4 { get; set; }
        public string Instutation5 { get; set; }
        public string Instutation6 { get; set; }
        public string InstitutionAddress1 { get; set; }
        public string InstitutionAddress2 { get; set; }
        public string InstitutionAddress3 { get; set; }
        public string InstitutionAddress4 { get; set; }
        public string InstitutionAddress5 { get; set; }
        public string InstitutionAddress6 { get; set; }
        public string YearOfPassing1 { get; set; }
        public string YearOfPassing2 { get; set; }
        public string YearOfPassing3 { get; set; }
        public string YearOfPassing4 { get; set; }
        public string YearOfPassing5 { get; set; }
        public string YearOfPassing6 { get; set; }
        public string PercentOfMarks1 { get; set; }
        public string PercentOfMarks2 { get; set; }
        public string PercentOfMarks3 { get; set; }
        public string PercentOfMarks4 { get; set; }
        public string PercentOfMarks5 { get; set; }
        public string PercentOfMarks6 { get; set; }

        public string PreviousEmploymentCTC1 { get; set; }
        public string PreviousEmploymentCTC2 { get; set; }
        public string PreviousEmploymentCTC3 { get; set; }
        public string PreviousEmploymentCTC4 { get; set; }
        public string PreviousEmploymentCTC5 { get; set; }
        public string PreviousEmploymentCTC6 { get; set; }

        public string PreviousEmploymentDesignation1 { get; set; }
        public string PreviousEmploymentDesignation2 { get; set; }
        public string PreviousEmploymentDesignation3 { get; set; }
        public string PreviousEmploymentDesignation4 { get; set; }
        public string PreviousEmploymentDesignation5 { get; set; }
        public string PreviousEmploymentDesignation6 { get; set; }
        public string PreviousEmpHistory { get; set; }
        public string Stream { get; set; }
        public string JoiningYear { get; set; }
        public string HelthIssue { get; set; }
        public string Disability { get; set; }
        public string BloodGroupName { get; set; }
        public string PreviousExperienceYear { get; set; }
        public string PreviousExperienceMonth { get; set; }
        public string MRFExperienceYear { get; set; }
        public string MRFExperienceMonth { get; set; }
        public string MRFRelativeStatus { get; set; }
        public string MRFRelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public string Apptitude { get; set; }

        public string Technical { get; set; }
        public string ScoreObtained { get; set; }
        public string ReadingExercise { get; set; }
        public string WrittenExercise { get; set; }
        public string TestUploadedDate { get; set; }
        public string BVGReport { get; set; }
        public string RefEmployeeId { get; set; }
        public string DoctorDetails { get; set; }
        public string DoctorRemarks { get; set; }
        public string AttachmentDocumentName { get; set; }

    }

    public class SearchHROpsResignation
    {
        public string EmpNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VerticalId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }

    }
    public class HROpsResignation //Piu 
    {
        public int SerialNo { get; set; }
        public string RequestedBy { get; set; }
        public string RequestedOn { get; set; }
       // public DateTime RequestedOnDate { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string Designation { get; set; }
        public string DOR { get; set; }
        public string LWD { get; set; }
        public string Reason { get; set; }



    }
    public class SearchVendorCandidateReport
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string CandidateNo { get; set; }
        public long? AutoUserId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class VendorCandidateReport
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string DateOfSubmission { get; set; }
        public string DOJ { get; set; }
        public string DOL { get; set; }
        public string HiringStatusName { get; set; }
        public decimal? BillAmountRaised { get; set; }
        public string PaymentStatus { get; set; }
        public string CreditNoteApplicable { get; set; }

    }
    public class VendorCandidateReportNew
    {
        //public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string DateOfSubmission { get; set; }
        public string DOJ { get; set; }
        public string DOL { get; set; }
        public string Source { get; set; }
        public string HiringStatusName { get; set; }
        public decimal? BillAmountRaised { get; set; }
        public string PaymentStatus { get; set; }
        public string CreditNoteApplicable { get; set; }

    }
    public class SearchDocumentStatus
    {
        public string RequisitionNo { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VerticalId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        //public int? RMDocApprovalStatusId { get; set; }
        public int? OMDocApprovalStatusId { get; set; }
    }
    public class DocumentStatus
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long? EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        //public DateTime DOJDATE { get; set; }
        public string EmploymentStatus { get; set; }
        public string DocStatus { get; set; }
        public string DocPendingDetails { get; set; }
        //public string OnboardingDocStatus { get; set; }
        //public string RecruiterDocPendingDetails { get; set; }
        //public string OnboardingDocPendingDetails { get; set; }
    }
    public class DocumentStatusNew
    {
        //public long? CandidateId { get; set; }
        public int SerialNo { get; set; }
        public string CandidateNo { get; set; }
        //public long? EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public string VerticalName { get; set; }
        public string LocationName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        //public DateTime DOJDATE { get; set; }
        public string EmploymentStatus { get; set; }
        public string DocStatus { get; set; }
        public string DocPendingDetails { get; set; }
        //public string OnboardingDocStatus { get; set; }
        //public string RecruiterDocPendingDetails { get; set; }
        //public string OnboardingDocPendingDetails { get; set; }
    }
    public class SearchInterviewCalender
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? PositionId { get; set; }
        public string CandidateNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VenueId { get; set; }
        public int? InterviewTypeId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }
    public class InterviewCalender
    {
        public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
         public string RequisitionNo { get; set; }
        public string FullName { get; set; }
        public string PositionName { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocation { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewTime { get; set; }// Piu
        public string InterviewName { get; set; }
        public string InterviewVenue { get; set; }
        public string ModeOfInterview { get; set; }
        public string InterviewStatus { get; set; }
        public string InterviewPanelMembers { get; set; }
        public string ApplicationFormStatus { get; set; } //Piu
        public string HRFeedBackStatus { get; set; }// Piu
        public string AssessmentStatus { get; set; }//Piu
        public string HiringStatusName { get; set; }
    }
    public class InterviewCalenderNEW
    {
        public int SerialNo { get; set; }
        //public long? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public string FullName { get; set; }
        public string PositionName { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocation { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewTime { get; set; }// Piu
        public string InterviewName { get; set; }
        public string InterviewVenue { get; set; }
        public string ModeOfInterview { get; set; }
        public string InterviewStatus { get; set; }
        public string InterviewPanelMembers { get; set; }
        public string ApplicationFormStatus { get; set; } //Piu
        public string HRFeedBackStatus { get; set; }// Piu
        public string AssessmentStatus { get; set; }//Piu
        public string HiringStatusName { get; set; }
    }
    public class SearchEmployeeSalary
    {
        public string RequisitionNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? PositionId { get; set; }
        public int? GradeId { get; set; }
        public int? LocationId { get; set; }
        public long? AllocatedAutoUserId { get; set; }

    }
    public class EmployeeSalary
    {
        public long? ManagementApprovalId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string ProposedCTC { get; set; }
    }
    //Arnab
    public class RecruitmentCostSavingInput
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmployeeNo { get; set; }
        public string RequisitionNo { get; set; }
        public string CandidateName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? GradeId { get; set; }
        public int? AllocatedAutoUserId { get; set; }
        public int? CreatedBy { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }
    public class RecruitmentCostSavingOutput
    {
        public string CandidateNo { get; set; }
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string Designation { get; set; }
        public string DateofJoining { get; set; }
        public string EmploymentStatus { get; set; }
        public string SourceChannelName { get; set; }
        public string CandidateOwner { get; set; }
        public decimal TotalCTC { get; set; }
        public decimal BillableCTC { get; set; }
        public decimal CostSavingPercent { get; set; }
        public decimal SavingsInCost { get; set; }

    }
}

