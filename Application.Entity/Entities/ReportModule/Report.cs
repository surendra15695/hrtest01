using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.ReportModule
{
    class Report
    {
    }

    public class SourceChannelMonthWiseList
    {
        public int RowNum { get; set; }
        public int SourceChannleId { get; set; }
        public string SourceChannelName { get; set; }
        public DateTime SourceDate { get; set; }
        public string SourceMonth { get; set; }
        public int CandidateCount { get; set; }

    }

    public class SearchSourceChannelMonthWiseList
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }



    //Bhagyashri
    public class BGVReportInput
    {
        public string Candidateno { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
        public int GradeId { get; set; }
        public string RequisitionNo { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
    }



    //Bhagyashri
    public class BGVReportOutput
    {
        public string Candidateno { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string EmploymentStatus { get; set; }
        public string DateOfEnabling { get; set; }
        public string DateOfUploadingReport { get; set; }
        public int BGVStatusId { get; set; }
        public string BGVStateName { get; set; }
        public string BGVReportStatusname { get; set; }
        public string JoiningDate { get; set; }


    }

    public class BGVReportOutputNew
    {
        public int SerialNo { get; set; }
        public string Candidateno { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        //public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        //public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        //public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        //public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        //public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string EmploymentStatus { get; set; }
        public string DateOfEnabling { get; set; }
        public string DateOfUploadingReport { get; set; }
        //public int BGVStatusId { get; set; }
        // public string BGVStateName { get; set; }
        public string BGVReportStatusname { get; set; }
        // public string JoiningDate { get; set; }


    }
    //Bhagyashri
    public class ReceruitmentFunnelReportOutput
    {
        public int SerialNumber { get; set; }
        public string MonthYear { get; set; }
        public int NoOfRequisitions { get; set; }
        public int TotalPositionsRequested { get; set; }
        public int Submitted { get; set; }
        public int Shortlisted { get; set; }
        public int Selected { get; set; }
        public int Offered { get; set; }
        public int OfferDeclined { get; set; }
        public int Joined { get; set; }


    }

    public class RecruitmentFunnelReportSearch
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }


    //Bhagyashri
    public class RecruiterPerformanceReportOutput
    {
        public int RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int PositionId { get; set; }
        public int NoOfPosition { get; set; }
        public string Position { get; set; }
        public string RecruiterName { get; set; }
        public int Noofcandidatessourced { get; set; }
        public int Noofcandidatesshortlisted { get; set; }
        public int noofcandidatesnotattendedinterview { get; set; }
        public int Noofcandidatesselected { get; set; }
        public int Yettoputupforapproval { get; set; }
        public int AwaitingCMDsapproval { get; set; }
        public int Noofcandidatesoffered { get; set; }
        public int Noofcandidatesdeclined { get; set; }
        public int NoofcandidatesJoined { get; set; }
        public int DaystakenRequisitiontojoining { get; set; }
        public int DaystakenRequisitiontoselection { get; set; }
        public int DaysTakenSelectiontoCMDApvl { get; set; }
        public int DaystakenCMDApvltoJoining { get; set; }
        public int Noofdayssinceopen { get; set; }
        public int NoofpositionsclosedwithinTAT { get; set; }
        public int Noofemployeesstillactive { get; set; }
        public int Noofemployeesresignedinsixmonths { get; set; }

        public int Noofemployeesresignedtotal { get; set; }

    }
    public class RecruiterPerformanceReportOutputNew
    {
        public int SerialNo { get; set; }
        public int RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public int PositionId { get; set; }
        public int NoOfPosition { get; set; }
        public string Position { get; set; }
        public string RecruiterName { get; set; }
        public int Noofcandidatessourced { get; set; }
        public int Noofcandidatesshortlisted { get; set; }
        public int noofcandidatesnotattendedinterview { get; set; }
        public int Noofcandidatesselected { get; set; }
        public int Yettoputupforapproval { get; set; }
        public int AwaitingCMDsapproval { get; set; }
        public int Noofcandidatesoffered { get; set; }
        public int Noofcandidatesdeclined { get; set; }
        public int NoofcandidatesJoined { get; set; }
        public int DaystakenRequisitiontojoining { get; set; }
        public int DaystakenRequisitiontoselection { get; set; }
        public int DaysTakenSelectiontoCMDApvl { get; set; }
        public int DaystakenCMDApvltoJoining { get; set; }
        public int Noofdayssinceopen { get; set; }
        public int NoofpositionsclosedwithinTAT { get; set; }
        public int Noofemployeesstillactive { get; set; }
        public int Noofemployeesresignedinsixmonths { get; set; }

        public int Noofemployeesresignedtotal { get; set; }

    }
    //Bhagyashri
    public class RecruiterPerformanceReportInput
    {
        public string RequisitionNo { get; set; }
        public int? RequistionId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public int? PositionId { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public int verticalId { get; set; }
        public int functionId { get; set; }


    }


    //Bhagyashri
    public class PreEmploymentReportOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string Name { get; set; }
        public string EmpId { get; set; }
        public string EmpNo { get; set; }//Piu
        public string RequisitionNo { get; set; }
        public int RequisitionId { get; set; }
        public string VerticalName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string Designation { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string EmploymentStatus { get; set; }
        public string DateofMedicalReportsenttoDoctor { get; set; }
        public string DateofDoctorVerification { get; set; }
        public string PreemploymentMedicalStatus { get; set; }
        public string DoctorDetails { get; set; }
        public int PreemployDoctorsIdmentMedicalStatus { get; set; }
        public string DoctorRemarks { get; set; }
    }

    public class PreEmploymentReportOutputNew
    {
        public int SerialNo { get; set; }
        public string CandidateNo { get; set; }
        public string Name { get; set; }
        //public string EmpId { get; set; }
        public string EmpNo { get; set; }//Piu
        public string RequisitionNo { get; set; }
        //public int RequisitionId { get; set; }
        public string VerticalName { get; set; }
        //public int VerticalId { get; set; }
        //public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        //public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        //public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        //public int PositionId { get; set; }
        public string Designation { get; set; }
        //public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string EmploymentStatus { get; set; }
        public string DateofMedicalReportsenttoDoctor { get; set; }
        public string DateofDoctorVerification { get; set; }
        public string PreemploymentMedicalStatus { get; set; }
        public string DoctorDetails { get; set; }
        public int PreemployDoctorsIdmentMedicalStatus { get; set; }
        public string DoctorRemarks { get; set; }
    }

    //Bhagyashri
    public class PreEmploymentReportInput
    {
        public string CandidateNo { get; set; }
        public string EmpId { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
        public int PositionId { get; set; }
        public int DepartmentId { get; set; }
        public int GradeId { get; set; }
        public string DoctorsName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }


    }
    //Arnab
    public class InterviewPanelReportInput
    {
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public string RequisitionNo { get; set; }
        public int? PositionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? InterviewTypeId { get; set; }
        public int? AutoUserId { get; set; }
        public int? VenueId { get; set; }
    }
    //Arnab
    public class InterviewPanelReportOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string PositionName { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocation { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewTime { get; set; }//Piu
        public string InterviewName { get; set; }
        public string InterviewVenue { get; set; }
        public string ModeOfInterview { get; set; }
        public string InterviewStatus { get; set; }
        public string AssessmentStatus { get; set; }
        public string HiringStatusName { get; set; }
    }
    public class InterviewPanelReportOutputNew
    {
        public int SerialNo { get; set; }
        //public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string RMName { get; set; }
        public string PositionName { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocation { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewTime { get; set; }//Piu
        public string InterviewName { get; set; }
        public string InterviewVenue { get; set; }
        public string ModeOfInterview { get; set; }
        public string InterviewStatus { get; set; }
        public string AssessmentStatus { get; set; }
        public string HiringStatusName { get; set; }
    }

    //Arnab
    public class HiringManagerReportInput
    {
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? GradeId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }

    //Arnab
    public class HiringManagerReportOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public string FullName { get; set; }
        public string Designation { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocation { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string HiringStatusName { get; set; }
    }
    public class HiringManagerReportOutputNew
    {
        public int SerialNo { get; set; }
        //public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        //public int EmpId { get; set; }
        public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public string RMName { get; set; }
        public string Designation { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PostingLocation { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public string HiringStatusName { get; set; }
    }
    //Bhagyashri
    public class VacancyReportInput
    {


        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public string Reqno { get; set; }
        public int? AllocatedAutoUserId { get; set; }

    }

    //Bhagyashri
    public class ConsultantPerformanceInput
    {
        public int VendorId { get; set; }
        public string RequisitionNo { get; set; }

    }

    //Bhagyashri
    public class ConsultantPerformanceOutput
    {

        public string RequisitionNo { get; set; }
        public string Consultantname { get; set; }
        public int VendorId { get; set; }
        public int Noofcandidatessubmitted { get; set; }
        public int Noofcandidatesshortlisted { get; set; }
        public int noofcandidatesnotattendedinterview { get; set; }
        public int Noofcandidatesselected { get; set; }
        public int Noofcandidatesoffered { get; set; }
        public int Noofcandidatesdeclinedaftergivenoffer { get; set; }
        public int NoofcandidatesJoined { get; set; }
        public int NoofcandidatesjoinedwithinTAT { get; set; }
        public int AverageTimeTaken { get; set; }
        public int Noofemployeesstillactive { get; set; }
        public int Noofemployeesresignedin6months { get; set; }
        public int Noofemployeesresignedtotal { get; set; }

    }
    public class ConsultantPerformanceOutputNew
    {

        public string RequisitionNo { get; set; }
        public string VendorName { get; set; }
        public int VendorId { get; set; }
        public int SubmitCount { get; set; }
        public int ShortlistCount { get; set; }
        public int NAICount { get; set; }
        public int SelectedCount { get; set; }
        public int OfferedCount { get; set; }
        public int DeclinedCount { get; set; }
        public int JoinedCount { get; set; }
        public int JoinedwithinTATCount { get; set; }
        public int ActiveEmp { get; set; }
        public int ResigEmp { get; set; }
        public int TotalResign { get; set; }
        public string EmpId { get; set; }
        public string DateofJoining { get; set; }
        public string DOL { get; set; }
        public string AverageTime { get; set; }

    }

    //Bhagyashri
    public class VacancyReportOutput
    {

        public string VerticalName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int SAPManPower { get; set; }
        public int TotalApprovedIncludingVacancy { get; set; }
        public int TotalVacancy { get; set; }
        public int HoldPositions { get; set; }
        public int TotalRequired { get; set; }
        public string Reqno { get; set; }
        public int Selected { get; set; }
        public int ApprovalInProgress { get; set; }
        public int Offered { get; set; }
        public int Joined { get; set; }
        public int YetToSelect { get; set; }


    }

    public class VacancyReportOutputNew
    {
        public int SerialNo { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
        public int Regular { get; set; }
        public int Buffer { get; set; }
        public string RequisitionNo { get; set; }
        public int TotalVacancy { get; set; }
        public int Required { get; set; }
        public int HoldCount { get; set; }
        public int SelectedCount { get; set; }
        public int SAP { get; set; }
        public int ApprovalInProgressCount { get; set; }
        public int OfferedCount { get; set; }
        public int JoinedCount { get; set; }
        public int Yettojoin { get; set; }
        public int TrainingAtHO { get; set; }


    }
    //Bhagyashri
    public class SapVarianceReportInput
    {

        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }

    }

    //Bhagyashri
    public class ConsPaymentTrackerReportOutput
    {

        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string Name { get; set; }
        public string EmpId { get; set; }
        public string RequisitionNo { get; set; }
        public int RequisitionId { get; set; }
        public string VerticalName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string Designation { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DOJ { get; set; }
        public int Status { get; set; }
        public string CreditNoteEnabled { get; set; }
        public string MRFExp { get; set; }
        public string RecConsultantName { get; set; }
        public int BillableCTC { get; set; }
        public int Servicecharge { get; set; }
        public int Servicechargeamount { get; set; }
        public int GST { get; set; }
        public int GSTAmount { get; set; }
        public int BillAmount { get; set; }
        public string PRNO { get; set; }
        public string PONO { get; set; }
        public string ServiceEntryNo { get; set; }
        public string PaymentStatus { get; set; }


    }


    //Bhagyashri
    public class ConsPaymentTrackerReportInput
    {

        public string CandidateNo { get; set; }
        public string EmpId { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
        public int PositionId { get; set; }
        public int DepartmentId { get; set; }
        public int GradeId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }


    //Bhagyashri
    public class SapVarianceReportOutput
    {

        public string VerticalName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int SAPManPower { get; set; }
        public int DigitalManPower { get; set; }
        public int Varience { get; set; }


    }

    //Bhagyashri
    //Bhagyashri
    public class CandidateAttritionOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string DateofJoining { get; set; }
        public string DOL { get; set; }
        public string ReasonforGap { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public int VerticalId { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public int FunctionId { get; set; }
        public string DepartmentName { get; set; }
        public int DepartmentId { get; set; }
        public string GradeName { get; set; }
        public string Designation { get; set; }
        public string SourceChannelName { get; set; }
        public string CandidateOwner { get; set; }
        public string RefEmployeeId { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string PermanentHomeTown { get; set; }
        public string NativeState { get; set; }
        public string PresentState { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageNames { get; set; }
        public string FatherOccupation { get; set; }
        //public string MotherOccupation { get; set; }
        public int NoOfSibilings { get; set; }
        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public string MaritialStatus { get; set; }
        public string SpouseOccupation { get; set; }
        public int NoOfChildren { get; set; }
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string StreamName { get; set; }
        public string QualificationTypeName { get; set; }
        public string Instutation { get; set; }
        public string InstitutionAddress { get; set; }
        public string QulificationUniversityBoardName { get; set; }
        public int YearOfPassing { get; set; }
        public int MarksPercentage { get; set; }
        public int PreviousExperienceYear { get; set; }//Piu
        public int PreviousExperienceMonth { get; set; }//Piu
        public int MRFExperienceYear { get; set; }//Piu
        public int MRFExperienceMonth { get; set; }//Piu
        public int TotalExperienceYear { get; set; }//Piu
        public int TotalExperienceMonth { get; set; }//Piu
        public string PreviousEmployer { get; set; }
    }

    public class SearchFuntionalHeadattrition
    {

        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public int FunctionId { get; set; }
        public string Fullname { get; set; }
        public int AutoUserId { get; set; }
        public int GradeId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }
    public class FuntionalHeadAttritionforAll
    {
        public string CandidateNo { get; set; }
        public string EmpId { get; set; }
        public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public string Fullname { get; set; }
        public int AutoUserId { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public string Age { get; set; }
        public string DateofJoining { get; set; }
        public string DOL { get; set; }
        public string CurrentDesignation { get; set; }
        public string SourceChannelName { get; set; }
        public string CandidateOwner { get; set; }
        public string ContactNo { get; set; }
        public string RefEmployeeId { get; set; }
        public string EmailId { get; set; }
        public string PermanentHomeTown { get; set; }
        public string NativeState { get; set; }
        public string PresentState { get; set; }
        public string Instutation { get; set; }
        public string InstitutionAddress { get; set; }
        public string YearOfPassing { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageNames { get; set; }
        public int NoOfSibilings { get; set; }
        public string FatherOccupation { get; set; }
        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public string SpouseOccupation { get; set; }
        public string NoOfChildren { get; set; }
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string StreamName { get; set; }
        public string QualificationTypeName { get; set; }
        public string QulificationUniversityBoardName { get; set; }
        public string MarksPercentage { get; set; }
        public string PreviousWorkExperience { get; set; }
        public string MRFExperience { get; set; }
        public string TotalExperience { get; set; }
        public int PreviousExperienceYear { get; set; }//Piu
        public int PreviousExperienceMonth { get; set; }//Piu
        public int MRFExperienceYear { get; set; }//Piu
        public int MRFExperienceMonth { get; set; }//Piu
        public int TotalExperienceYear { get; set; }//Piu
        public int TotalExperienceMonth { get; set; }//Piu
        public string PreviousEmployer { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class FunctionalHeadNameAll
    {
        public int ApproverAutoUserId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
    }


    public class CandidateAttritionReportInput
    {
        public string RequisitionNo { get; set; }
        public string CandidateNo { get; set; }
        public int? VerticalId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }


    public class SearchRequisitionReport
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? RequisitionApprovalStatus { get; set; }
        public int? RequisitionProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public int? HiringManagerId { get; set; }
        public int? AllocatedAutoUserId { get; set; }
        public int? RequisitionTypeId { get; set; }
        public int? FunctionId { get; set; }
    }

    public class RequisitionReportList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public string JobTypeName { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOn { get; set; }
        public string CreatedByUserName { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public int AbsorbedCount { get; set; }
        public string ApprovalStatus { get; set; }
        public string ProcessStatus { get; set; }
        public string RMProcessStatus { get; set; }
        public string AllocatedRMUserName { get; set; }
        public string SalaryName { get; set; }
        public string RequisitionType { get; set; }
        public long HiringManagerAutoUserId { get; set; }
    }

    public class ResignationReportList
    {
        public long ResignationDetailId { get; set; }
        public long ResignationId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public string verticalName { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationCode { get; set; }
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

    public class SearchResignationReport
    {
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

    public class SuccessionPlanReportList
    {
        public long SuccessionPlanDetailId { get; set; }
        public long SuccessionPlanId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public long EmpId { get; set; }
        public string Designation { get; set; }
        public string OldGradeName { get; set; }
        public string verticalName { get; set; }
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
    }

    public class SearchSuccessionPlanReport
    {
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ReplacementStatusId { get; set; }
        public int? SuccessionPlanApprovalStatus { get; set; }
        public int? SuccessionPlanProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public long? ApproverAutoUserId { get; set; }
    }

    public class TransferReportList
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
        public string DOT { get; set; }
    }

    public class SearchTransferReport
    {
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? ReplacementStatusId { get; set; }
        public int? TransferApprovalStatus { get; set; }
        public int? TransferProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public long? ApproverAutoUserId { get; set; }
    }

    public class RequisitionHistoryReportList
    {
        public long RequisitionDetailHistoryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string RequisitionType { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public string RequisitionHistoryNo { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public string VerticalName { get; set; }
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
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public int RequisitionApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public string IOMNo { get; set; }
        public string ManagementApprovalDocument { get; set; }
        public string JDDocument { get; set; }
    }

    public class SearchRequisitionHistoryReport
    {
        public string RequisitionNo { get; set; }
        public long? RequistionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string IOMNo { get; set; }
        public int? RequisitionApprovalStatus { get; set; }
        public int? CreatedBy { get; set; }
        public int? ApproverAutoUserId { get; set; }
        public int? FunctionId { get; set; }
    }

    public class SearchRequisitionCandidateReport
    {
        public string RequisitionNo { get; set; }
        public string SourceChannelId { get; set; }
        public string HiringStatusId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }

    public class RequisitionCandidateReportList
    {
        public string RequisitionNo { get; set; }
        public string CandidateNo { get; set; }
        public int CandidateId { get; set; }
        public string Prefix { get; set; }
        public string PrefixName { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string QualificationTypeName { get; set; }
        public string DOB { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageNames { get; set; }
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string StreamName { get; set; }
        public string MarksPercentage { get; set; }
        public string CompletionYear { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public string Domainname { get; set; }
        public string SubDomainname { get; set; }
        public string StateName { get; set; }
        public string PreviousAppliedName { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeStatusName { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int SourceChannelId { get; set; }
        public string SourceChannelName { get; set; }
        public string CandidateOwner { get; set; }
        public string ReferralEmpNo { get; set; }
        public string ReferralDesignation { get; set; }
        public int Age { get; set; }
        public string HiringStatusName { get; set; }
        public int ParentRelationshipId { get; set; }
        public string ParentRelationshipName { get; set; }
        public int ChildRelationshipId { get; set; }
        public string ChildRelationshipName { get; set; }
    }

    public class SearchCandidateTrackerReport
    {
        public string RequisitionNo { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
        public long? HiringStatusId { get; set; }
    }

    public class CandidateTrackerReportList
    {
        public long RequisitionDetailId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string LocationOffice { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string SourceChannelName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string Qualification { get; set; }
        public string ManagementStatus { get; set; }
        public string JoiningDate { get; set; }
        public string JoiningStatus { get; set; }
        public string ProcessDate { get; set; }
        public string ApprovedDate { get; set; }
        public string Replacement { get; set; }
    }

    public class SearchEmployeeSalaryReport
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? FunctionId { get; set; }
        public int? PositionId { get; set; }
        public int? GradeId { get; set; }
        public int? DepartmentId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }

    //Arnab
    public class OnBoardingCompletedReportInput
    {
        public string CandidateNo { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FullName { get; set; }
    }
    public class OnBoardingCompletedReportOutput
    {
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string DOB { get; set; }
        public string DateofJoining { get; set; }
        public string VerticalName { get; set; }
        public string CommunicationAddress { get; set; }
        public string PermanentAddress { get; set; }
        public string PermanentArea { get; set; }
        public string PermanentState { get; set; }
        public string CommunicationState { get; set; }
        public string PermanentPin { get; set; }
        public string CommunicationPin { get; set; }
        public string CommunicationPrimaryContactNo { get; set; }
        public string CommunicationAlternateContactNo { get; set; }
        public string PermanentContactNo { get; set; }
        public string NameOfFather { get; set; }
        public string DOBofFather { get; set; }
        public string NameOfMother { get; set; }
        public string DOBofMother { get; set; }
        public string GraduationCollegeName { get; set; }
        public string GraduationUniversityName { get; set; }
        public string GraduationCourseName { get; set; }
        public string GraduationYearOfPassing { get; set; }
        public string PostGraduationCollegeName { get; set; }
        public string PostGraduationUniversityName { get; set; }
        public string PostGraduationCourseName { get; set; }
        public string PostGraduationYearOfPassing { get; set; }
        public string PreviousOrganizationName1 { get; set; }
        public string PreviousOrganizationDOJ1 { get; set; }
        public string PreviousOrganizationDOE1 { get; set; }
        public string PreviousOrganizationName2 { get; set; }
        public string PreviousOrganizationDOJ2 { get; set; }
        public string PreviousOrganizationDOE2 { get; set; }
        public string PreviousOrganizationName3 { get; set; }
        public string PreviousOrganizationDOJ3 { get; set; }
        public string PreviousOrganizationDOE3 { get; set; }
        public string PreviousOrganizationName4 { get; set; }
        public string PreviousOrganizationDOJ4 { get; set; }
        public string PreviousOrganizationDOE4 { get; set; }
        public string PreviousOrganizationName5 { get; set; }
        public string PreviousOrganizationDOJ5 { get; set; }
        public string PreviousOrganizationDOE5 { get; set; }
        public string PreviousOrganizationName6 { get; set; }
        public string PreviousOrganizationDOJ6 { get; set; }
        public string PreviousOrganizationDOE6 { get; set; }
        public string PreviousOrganizationName7 { get; set; }
        public string PreviousOrganizationDOJ7 { get; set; }
        public string PreviousOrganizationDOE7 { get; set; }
        public string PreviousOrganizationName8 { get; set; }
        public string PreviousOrganizationDOJ8 { get; set; }
        public string PreviousOrganizationDOE8 { get; set; }
        public string PreviousOrganizationName9 { get; set; }
        public string PreviousOrganizationDOJ9 { get; set; }
        public string PreviousOrganizationDOE9 { get; set; }
        public string PreviousOrganizationName10 { get; set; }
        public string PreviousOrganizationDOJ10 { get; set; }
        public string PreviousOrganizationDOE10 { get; set; }

        public string PANNo { get; set; }
        public string AadharNo { get; set; }
        public string BloodGroupName { get; set; }
        public string EmailId { get; set; }

    }

    //Arnab
    public class ResignationReportInput
    {
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? PositionId { get; set; }
        public int? LocationId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class NewJoinersReportInput
    {
        public int? VerticalId { get; set; }
        public int? DepartmentId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class NewJoinersReportBatchWiseCandidateInput
    {
        public int BatchId { get; set; }
        public int? VerticalId { get; set; }
        public int? DepartmentId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class NewJoinersReportBatchInput
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class ResignationReportOutput
    {
        public int ResignationDetailId { get; set; }
        public int ResignationId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public string JobTypeName { get; set; }
        public string JobDescriptionName { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public string ProcessStatus { get; set; }
        public string TargetDate { get; set; }
        public string ReplacementStatusName { get; set; }
        public string ReasonName { get; set; }
        public string DOR { get; set; }
        public string LWD { get; set; }
    }
    public class NewJoinersReportOutput
    {
        public int CandidateId { get; set; }
        public string CandidateFullName { get; set; }
        public string ModeofJoiningName { get; set; }
        public string DateofJoining { get; set; }
        public string Month { get; set; }
        public string GradeName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationName { get; set; }
        public string PositionName { get; set; }

    }
    public class NewJoinersReportBatchOutput
    {
        public int BatchId { get; set; }
        public string BatchNo { get; set; }
        public string DateofJoining { get; set; }
        public string Month { get; set; }
        public string TotalCandidates { get; set; }

    }
    //Arnab
    public class CompanyDoctorReportInput
    {
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
        public int? AutoUserId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }

    }
    //Arnab
    public class CompanyDoctorReportOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public int EmpId { get; set; }
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
        public string PreEmploymentMedicalStatus { get; set; }
        public string Remarks { get; set; }
    }
    public class CompanyDoctorReportOutputNew
    {
        public int SerialNo { get; set; }
        //public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        //public int EmpId { get; set; }
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
        public string PreEmploymentMedicalStatus { get; set; }
        public string Remarks { get; set; }
    }
    //Arnab
    public class ConsultantListInput
    {
        public string VendorName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    //Arnab
    public class ConsultantListOutput
    {
        public string VendorName { get; set; }
        public string ContactPersonName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public int AgreementStatus { get; set; }
        public string AgreementValidityDate { get; set; }
        public string Rates { get; set; }
        public string Remarks { get; set; }
    }

    public class EmployeeSalaryReport
    {
        public long RequisitionDetailId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateNo { get; set; }//Piu
        public string VerticalName { get; set; } //Piu
        public string RequisitionNo { get; set; }
        public string FullName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }//Piu
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public string Designation { get; set; }//Piu
        public string DOJ { get; set; }//Piu
        public string DOL { get; set; }//Piu
        public string EmploymentStatus { get; set; }//Piu
        public int PreviousExperienceYear { get; set; }//Piu
        public int PreviousExperienceMonth { get; set; }//Piu
        public int MRFExperienceYear { get; set; }//Piu
        public int MRFExperienceMonth { get; set; }//Piu
        public int TotalExperienceYear { get; set; }//Piu
        public int TotalExperienceMonth { get; set; }//Piu
        public double ProposedCTC { get; set; }//Piu
        public double ProposedBasic { get; set; }//Piu
        public double MonthlyGrossSalaryOffered { get; set; }//Piu
        public string MRFAllowance { get; set; }
    }

    public class SearchLeadTimeReport
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long AllocatedUserId { get; set; }
    }

    public class LeadTimeReport
    {
        public string MonthYear { get; set; }
        public int Stage1 { get; set; }
        public int Stage2 { get; set; }
        public int Stage3 { get; set; }
    }

    public class SearchInterviewOrganisedReport
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }

    public class InterviewOrganisedReport
    {
        public string InterviewDate { get; set; }
        public string LocationCode { get; set; }
        public string FunctionName { get; set; }
        public string PositionName { get; set; }
        public int Attended { get; set; }
        public int Selected { get; set; }
    }

    public class CandidateManagementReportList
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
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
        public string ReportingManagerNotApproveDoc { get; set; }
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
        public string PreEmploymentMedicalRemarks { get; set; }
        public int BVGReportStatusId { get; set; }
    }
    public class SearchCandidateManagementReport
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
        public long? AllocatedAutoUserId { get; set; }
    }

    public class SearchReqFuncRequisition
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
        public long? CreatedBy { get; set; }
        public int? RequisitionTypeId { get; set; }
        public long? HiringManagerId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? RequisitionApprovalStatus { get; set; }
        public long? RequisitionProcessStatus { get; set; }
        public long? ApproverAutoUserId { get; set; }
    }

    public class ReqFuncRequisition
    {
        public int SerialNo { get; set; }
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public string RequestedBy { get; set; }
        public string RequestType { get; set; }
        public string CreatedByUserName { get; set; }
        public string RequisitionType { get; set; }
        public string CreatedOn { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int RequestApproved { get; set; }
        public int RequestPending { get; set; }
        public int RequestRejected { get; set; }
        public int HoldCount { get; set; }
        public int CloseCount { get; set; }
        public int OpenCount { get; set; }
        public int ProfileSubmitted { get; set; }
        public int ProfileShortlisted { get; set; }
        public int ProfileNotAttened { get; set; }
        public int ProfileSelected { get; set; }
        public int ProfileApprovalPending { get; set; }
        public int ProfileAwaitingApproval { get; set; }
        public int ProfileOffered { get; set; }
        public int ProfileDeclined { get; set; }
        public int DaysSinceOpen { get; set; }
        public int RequisitionJoining { get; set; }
        public int RequisitionSelection { get; set; }
        public int SelectionApproval { get; set; }
        public int ApprovalJoining { get; set; }
        public string JobTypeName { get; set; }
        public string Date { get; set; }
        public string JobDescription { get; set; }
        public string AllocatedRMUserName { get; set; }
        public string ProcessStatus { get; set; }
        public string SalaryName { get; set; }
        public string StatusName { get; set; }
        public string JobDescriptionName { get; set; }
        public long HiringManagerAutoUserId { get; set; }
        public int YetToPut { get; set; }
    }
    public class ReqFuncRequisitionNew
    {
        public int SerialNo { get; set; }
        public string RequisitionNo { get; set; }
        public string RequestedBy { get; set; }
        //public string RequestType { get; set; }
        public string RequisitionType { get; set; }
        public string CreatedOn { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int RequestApproved { get; set; }
        public int RequestPending { get; set; }
        public int RequestRejected { get; set; }
        public int HoldCount { get; set; }
        public int CloseCount { get; set; }
        public int OpenCount { get; set; }
        public int ProfileSubmitted { get; set; }
        public int ProfileShortlisted { get; set; }
        public int ProfileNotAttened { get; set; }
        public int ProfileSelected { get; set; }
        public int ProfileApprovalPending { get; set; }
        public int ProfileAwaitingApproval { get; set; }
        public int ProfileOffered { get; set; }
        public int ProfileDeclined { get; set; }
        public int DaysSinceOpen { get; set; }
        public int RequisitionJoining { get; set; }
        public int RequisitionSelection { get; set; }
        public int SelectionApproval { get; set; }
        public int ApprovalJoining { get; set; }
        public string JobTypeName { get; set; }
        public string Date { get; set; }
        public string JobDescription { get; set; }
        public string AllocatedRMUserName { get; set; }
        public string ProcessStatus { get; set; }
        public string SalaryName { get; set; }
        public string StatusName { get; set; }
        public string JobDescriptionName { get; set; }
        public long HiringManagerAutoUserId { get; set; }
        public int YetToPut { get; set; }
    }
    public class SearchReqFuncOfferedCandidate
    {
        //public string CandidateNo { get; set; }
        //public string EmpNo { get; set; }
        public string RequisitionNo { get; set; }
        public int LocationId { get; set; }
        public int VerticalId { get; set; }
        public string FunctionId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? CreatedBy { get; set; }
        public long? ApproverAutoUserId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
        public long? HiringManagerId { get; set; }
        public int RequisitionTypeId { get; set; }
        public int RequisitionApprovalStatus { get; set; }
        public int RequisitionProcessStatus { get; set; }
    }

    public class ReqFuncOfferedCandidate
    {
        public int SerialNo { get; set; }
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public string VerticalName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string CurrentDesignation { get; set; }
        public string Designation { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateOfJoining { get; set; }
        public string StatusName { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long ApproverAutoUserId { get; set; }
    }
    public class ReqFuncOfferedCandidateNew
    {
        public int SerialNo { get; set; }
        //public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        //public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        //public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public string VerticalName { get; set; }
        //public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        //public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string CurrentDesignation { get; set; }
        //public string Designation { get; set; }
        //public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateOfJoining { get; set; }
        public string StatusName { get; set; }
        //public int HiringStatusId { get; set; }
        //public string HiringStatusName { get; set; }
        //public long ApproverAutoUserId { get; set; }
    }
    public class SearchFuncAttrition
    {
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string FunctionId { get; set; }
        public string GradeId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long AutoUserId { get; set; }
    }

    public class FuncAttrition
    {
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string DOJ { get; set; }
        public string DOL { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string Designation { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string SourceChannel { get; set; }
        public string CandidateOwner { get; set; }
        public string ReferredEmpNo { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string HomeTown { get; set; }
        public string NativeState { get; set; }
        public string PresentState { get; set; }
        public string MotherTongue { get; set; }
        public string LanguageKnown { get; set; }
        public string FatherOccupation { get; set; }
        public string MotherOccupation { get; set; }
        public string NoOfSiblings { get; set; }
        public string NoOfBrothers { get; set; }
        public string NoOfSisters { get; set; }
        public string MaritalStatus { get; set; }
        public string SpouseOccupation { get; set; }
        public string NoOfChildren { get; set; }
        public string HighestQualification { get; set; }
        public string HighestQualificationCourse { get; set; }
        public string HighestQualificationStream { get; set; }
        public string HighestQualificationType { get; set; }
        public string HighestQualificationUniversity { get; set; }
        public string HighestQualificationMarks { get; set; }
        public string PreviousEmployer { get; set; }
    }

    public class SearchRecruitmentManagerRequisition
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
        public long? CreatedBy { get; set; }
        public int? RequisitionTypeId { get; set; }
        public long? HiringManagerId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? RequisitionApprovalStatus { get; set; }
        public int? RequisitionProcessStatus { get; set; }
    }

    public class RecruitmentManagerRequisition
    {
        public int SerialNo { get; set; }
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public string RequestedBy { get; set; }
        public string RequestType { get; set; }
        public string CreatedOn { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int RequestApproved { get; set; }
        public int RequestPending { get; set; }
        public int RequestRejected { get; set; }
        public int HoldCount { get; set; }
        public int AbsorbedCount { get; set; }//Piu
        public int OpenCount { get; set; }
        public int ProfileSubmitted { get; set; }
        public int ProfileShortlisted { get; set; }
        public int ProfileNotAttendedInterview { get; set; }//Piu
        public int ProfileSelected { get; set; }
        public int ProfileYetToPutApproval { get; set; }//Piu
        public int ProfilePendingApproval { get; set; }//Piu
        // public int ProfileAwaitingApproval { get; set; }
        public int ProfileOffered { get; set; }
        public int ProfileCandidateDeclined { get; set; }//Piu
        public string NoOfSinceOpen { get; set; }//Piu
        //public int RequisitionJoining { get; set; }
        //public int RequisitionSelection { get; set; }
        //public int SelectionApproval { get; set; }
        //public int ApprovalJoining { get; set; }
        public string JobTypeName { get; set; }
        public string JobDescriptionName { get; set; }
        //public string AllocatedTo { get; set; }
        public string SalaryName { get; set; }
        public string RequisitionStatus { get; set; }
        public long HiringManagerAutoUserId { get; set; }
        public string ProcessStatus { get; set; }
        public string ApprovalStatus { get; set; }
        public string AllocatedRMUserName { get; set; }
        //public string StatusName { get; set; }
        public string TargetDate { get; set; }//Piu
        public string CreatedByUserName { get; set; }
        public string RequisitionType { get; set; }

    }
    public class RecruitmentManagerRequisitionNew
    {
        public int SerialNo { get; set; }
        //public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public string RequestedBy { get; set; }
        public string RequestType { get; set; }
        public string CreatedOn { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int RequestApproved { get; set; }
        public int RequestPending { get; set; }
        public int RequestRejected { get; set; }
        public int HoldCount { get; set; }
        public int AbsorbedCount { get; set; }//Piu
        public int OpenCount { get; set; }
        public int ProfileSubmitted { get; set; }
        public int ProfileShortlisted { get; set; }
        public int ProfileNotAttendedInterview { get; set; }//Piu
        public int ProfileSelected { get; set; }
        public int ProfileYetToPutApproval { get; set; }//Piu
        public int ProfilePendingApproval { get; set; }//Piu
        // public int ProfileAwaitingApproval { get; set; }
        public int ProfileOffered { get; set; }
        public int ProfileCandidateDeclined { get; set; }//Piu
        public string NoOfSinceOpen { get; set; }//Piu
        //public int RequisitionJoining { get; set; }
        //public int RequisitionSelection { get; set; }
        //public int SelectionApproval { get; set; }
        //public int ApprovalJoining { get; set; }
        public string JobTypeName { get; set; }
        public string JobDescriptionName { get; set; }
        //public string AllocatedTo { get; set; }
        public string SalaryName { get; set; }
        public string RequisitionStatus { get; set; }
        public long HiringManagerAutoUserId { get; set; }
        public string ProcessStatus { get; set; }
        public string ApprovalStatus { get; set; }
        public string AllocatedRMUserName { get; set; }
        //public string StatusName { get; set; }
        public string TargetDate { get; set; }//Piu
        public string CreatedByUserName { get; set; }
        public string RequisitionType { get; set; }

    }
    public class InterviewFeedbacklist
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string ContactNo { get; set; }
        public string CommunicationAlternativeContactNo { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
        public string DOJ { get; set; }
        public string StatusName { get; set; }
        public string EmploymentStatus { get; set; }
        public string InterviewPannelMemberName { get; set; }
        public string RecruiterName { get; set; }
        public string PlaceOfFinalInterview { get; set; }
        public string DateOfFinalInterview { get; set; }
        public string TimeOfFinalInterview { get; set; }
        public int ApplicationSystemRate { get; set; }
        public int ExplanationRate { get; set; }
        public int HelpfulRate { get; set; }
        public int InformativeRate { get; set; }
        public int InterviewProcessRate { get; set; }
        public int ComfortableRate { get; set; }
        public int RecomendedRate { get; set; }
        public string OverallExperience { get; set; }
        public string Suggestion { get; set; }
        public int AverageScore { get; set; }
    }
    public class InterviewFeedbacklistNew
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
        public string EmpNo { get; set; }
        public string FullName { get; set; }
        public string ContactNo { get; set; }
        public string CommunicationAlternativeContactNo { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
        public string DOJ { get; set; }
        public string StatusName { get; set; }
        public string EmploymentStatus { get; set; }
        public string InterviewPannelMemberName { get; set; }
        public string RecruiterName { get; set; }
        public string PlaceOfFinalInterview { get; set; }
        public string DateOfFinalInterview { get; set; }
        public string TimeOfFinalInterview { get; set; }
        public int ApplicationSystemRate { get; set; }
        public int ExplanationRate { get; set; }
        public int HelpfulRate { get; set; }
        public int InformativeRate { get; set; }
        public int InterviewProcessRate { get; set; }
        public int ComfortableRate { get; set; }
        public int RecomendedRate { get; set; }
        public string OverallExperience { get; set; }
        public string Suggestion { get; set; }
        public int AverageScore { get; set; }
    }
    public class InterviewFeedbackSearch
    {
        public string RequisitionNo { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public string CandidateNo { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }

    //Arnab
    public class RecruitmentCostInput
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
    public class RecruitmentCostOutput
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
        public string WorkExperience { get; set; }
        public string ConsultantName { get; set; }
        public decimal TotalBillAmount { get; set; }
        public string CreditNoteEnabled { get; set; }
    }

    //Arnab
    public class CampusCandidateReportInput
    {
        public int? AllocatedAutoUserId { get; set; }
        public string RequisitionNo { get; set; }
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
    }
    public class CampusCandidateReportOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DOB { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public string NativeState { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageKnown { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public string FatherOccupation { get; set; }
        public string MotherOccupation { get; set; }
        public string CourseName { get; set; }
        public string Stream { get; set; }
        public string InstutationName { get; set; }
        public string Marks { get; set; }
        public string YearOfPassing { get; set; }
    }
    public class SearchSalaryStatistics
    {
        public int? GradeId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }
    public class SalaryStatisticsList
    {
        public string GradeName { get; set; }
        public int TotalCTC { get; set; }
        public int MinCTC { get; set; }
        public int FirstQuartile { get; set; }
        public int Average { get; set; }
        public int ThirdQuartile { get; set; }
        public int MaxCTC { get; set; }
        public double ModeCTC { get; set; }
    }
    public class SearchNewJoinersRecruitmentActivity
    {
        public int? LocationId { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }
    public class NewJoinersRecruitmentActivityList
    {
        public string LocationOffice { get; set; }
        public int Attrition { get; set; }
        public int NewVacancy { get; set; }
        public int Expansion { get; set; }
        public int GrandTotal { get; set; }
    }
    public class NewJoinersRecruitmentActivityListNew
    {
        public string LocationOffice { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public int Attrition { get; set; }
        public int NewVacancy { get; set; }
        public int Expansion { get; set; }
        public int GrandTotal { get; set; }
    }
    public class SearchNewJoinersExternalRecruitment
    {
        public int? GradeId { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }
    public class NewJoinersExternalRecruitmentList
    {
        public string GradeName { get; set; }
        public string Level { get; set; }
        public int Vacancy { get; set; }
        public string Months { get; set; }
        public string Years { get; set; }

    }
    public class NewJoinersExternalRecruitmentListNew
    {
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string RequisitionNo { get; set; }
        public string DateofJoining { get; set; }
        public string OfferedDate { get; set; }
        public string FullName { get; set; }
        public string GradeName { get; set; }
        public string Level { get; set; }
        public int vacancy { get; set; }
        public string Months { get; set; }
        public string Years { get; set; }

    }

    public class NewJoinersManufacturingSalesandMarketingWisePositionInput
    {
        public int? VerticalId { get; set; }
        public int? AllocatedAutoUserId { get; set; }
    }
    public class NewJoinersManufacturingSalesandMarketingWisePositionOutput
    {
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string Months { get; set; }
        public string Years { get; set; }
        public int NewPositions { get; set; }
        public int AgainstExpansion { get; set; }
        public int AgainstAttrition { get; set; }
    }
    //Arnab
    public class HROpsAttritionInput
    {
        public string EmployeeNo { get; set; }
        public string FullName { get; set; }
        public int? VerticalId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public int? GradeId { get; set; }
        public int? AllocatedAutoUserId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class HROpsAttritionOutput
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string DOJ { get; set; }
        public string DOL { get; set; }
        public string DOR { get; set; }
        public string LWD { get; set; }
        public string ReasonName { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string GradeName { get; set; }
        public string PositionName { get; set; }
        public string Designation { get; set; }
        public string SourceChannelName { get; set; }
        public string CandidateOwner { get; set; }
        public string RefEmployeeId { get; set; }
        public string EmpEmailId { get; set; }
        public string ContactNo { get; set; }
        public string PermanentHomeTown { get; set; }
        public string NativeState { get; set; }
        public string PresentState { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguagsKnown { get; set; }
        public string FatherOccupation { get; set; }
        public int NoOfSibilings { get; set; }
        public int NoOfBrothers { get; set; }
        public int NoOfSisters { get; set; }
        public string SpouseOccupation { get; set; }
        public int NoOfChildren { get; set; }
        public string MaritialStatus { get; set; }
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public string StreamName { get; set; }
        public string QualificationTypeName { get; set; }
        public string QulificationUniversityBoardName { get; set; }
        public decimal MarksPercentage { get; set; }
        public int PreviousExperienceYear { get; set; }
        public int PreviousExperienceMonth { get; set; }
        public int MRFExperienceYear { get; set; }
        public int MRFExperienceMonth { get; set; }
        public string PreviousEmployer { get; set; }
        public int TotalExperienceYear { get; set; }
        public int TotalExperienceMonth { get; set; }
    }
    public class NewJoinersOverallVerticalWiseList
    {
        public string VerticalName { get; set; }
        public int Vacancy { get; set; }
        public string Months { get; set; }
        public string Years { get; set; }
    }
    public class SearchNewJoinersOverallVerticalWise
    {
        public int? VerticalId { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }
    public class NewJoinersRecruitmentModeList
    {
        public string RecruitmentMode { get; set; }
        public int Vacancy { get; set; }
        public string Months { get; set; }
        public string Years { get; set; }
    }
    public class SearchNewJoinersRecruitmentMode
    {
        public string RecruitmentMode { get; set; }
        public string Month { get; set; }
        public string Year { get; set; }
        public long? AllocatedAutoUserId { get; set; }
    }
    public class SearchFlexiList
    {
        public string HeaderId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }
    public class SearchFlexiRequisitionList
    {
        public string HeaderId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
    }
    public class SearchFlexCandidateiList
    {
        public string HeaderId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public int? DepartmentId { get; set; }
    }
    public class FlexiAllList
    {
        public long? ReportHeaderId { get; set; }
        public string ReportHeaderName { get; set; }
        public string CreatedOn { get; set; }
    }

    public class FlexiListGetAllCandiate
    {
        public string CandidateName { get; set; }
        public string CandidateEmail { get; set; }
        public int Age { get; set; }
        public string AadharNo { get; set; }
        public string HighestQualification { get; set; }
        public string LanguageKnown { get; set; }
        public string MotherTongue { get; set; }
        public string Qualification { get; set; }
        public string CandidateNo { get; set; }
        public string HiringStatus { get; set; }
        public string EmployeeNo { get; set; }

        public string Course { get; set; }
        public string Stream { get; set; }
        public string Experience { get; set; }
        public string PresentComapny { get; set; }
        public string Designation { get; set; }
        public string Relatives { get; set; }
        public string CandidateOwner { get; set; }
        public string MappedToReq { get; set; }
        public string ReqNo { get; set; }
        public string ReqStatus { get; set; }
        public string MrfPrev { get; set; }
        public string ApplicationFormStatus { get; set; }
        public string IsReffeded { get; set; }
        public string CreatedDate { get; set; }
        public string Source { get; set; }
        public string DateOfSubmission { get; set; }

    }
    public class FlexiListGetAllReq
    {
        public string RequisitionNo { get; set; }
        public string RequisitionType { get; set; }
        public string RequestedBy { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string GradeName { get; set; }
        //ADDED
        public string Date { get; set; }
        public string IOM { get; set; }
        public string Approved { get; set; }
        public string Requested { get; set; }
        public string Hold { get; set; }
        public string Closed { get; set; }
        public string Type { get; set; }
        public string Target { get; set; }
        public string TotalCandidate { get; set; }
        public string JD { get; set; }
        public string RequisitionStatus { get; set; }
        public string SalaryRange { get; set; }
        public string CreatedDate { get; set; }
    }
    public class CandidateDocumentReportOutputNew
    {
        public int? CandidateId { get; set; }
        public string CandidateFullName { get; set; }
        public string DepartmentName { get; set; }
        public string Plant { get; set; }
        public long Grade { get; set; }
        public string Qualification { get; set; }
        public string Mobile_No { get; set; }
        public string FamilyDetails { get; set; }
        public string MRF_PPF { get; set; }
        public string Resume { get; set; }
        public string Interview_Assessment { get; set; }
        public string Salary_Fitment { get; set; }
        public string Management_Approval { get; set; }
        public string Offer_Letter { get; set; }
        public string Tenth_Marksheet { get; set; }
        public string Twelveth_Marksheet { get; set; }
        public string Diploma_Certificate { get; set; }
        public string Diploma_Marksheet { get; set; }
        public string PG_Diploma_Certificate { get; set; }
        public string Post_Graduate_Marksheet { get; set; }
        public string Degree_Certificate { get; set; }
        public string Degree_Marksheet { get; set; }
        public string Post_Graduate_Certificate { get; set; }
        public string Post_Graduate_Mark_sheet { get; set; }
        public string Doctoral_Certificate { get; set; }
        public string ExpOrRelvletterCurrEmp { get; set; }
        public string ExpOrRelvletterPreviEmp { get; set; }
        public string MedicalReportsApproved { get; set; }
        public string ADHAR { get; set; }
        public string PAN { get; set; }
        public string BGV_Report { get; set; }
        public string ESIDeclarationForm { get; set; }
        public string Form2PFNomination { get; set; }
        public string GratuityNominationForm { get; set; }
        public string CompositeDeclarationFormAutoTransfer { get; set; }
        public string PersonalAccidentInsPolicyForm { get; set; }
        public string SuperannuationBeneficiaryForm { get; set; }
        public string SEBIInitialDisclosure { get; set; }
        public string BankMandateForm { get; set; }
        public string BankStatementOrCancChequeOrPassbook { get; set; }
        public string Family_Details_Form { get; set; }
        public string Joining_Report_Form { get; set; }
        public string Eighth_Pass_Certificate { get; set; }
    }

    public class CandidateDocumentReportInput
    {
        public int? CandidateId { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
    }

    public class GetAllcandidateIndividualtabInput
    {
        public int? CandidateId { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string CandidateName { get; set; }
        public int? VerticalId { get; set; }
        public int? LocationId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class GetAllcandidateIndividualtabOutputNew
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
    public class GetAllbatchtabInput
    {
        public string BatchNo { get; set; }
        public int? OnBordingMangerId { get; set; }
        public int? OnBordingCoordinatorId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public int? VerticalId { get; set; }

    }
    public class GetAllbatchtabOutputNew
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
    public class CandidateInductionSheduleOutputNew
    {
        public string BatchNo { get; set; }
        public CandidateInductionSheduOutputNewleHeader CandidateInductionShedules { get; set; }
        public List<CandidateInductionSheduleOutputNewDetails> CandidateInductionSheduleDetails { get; set; }
    }
    public class CandidateInductionSheduOutputNewleHeader
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
        public string candidateFullName { get; set; }
        public string CandidateNoInduction { get; set; }


    }
    public class CandidateInductionSheduleOutputNewDetails
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
        public string candidateFullName { get; set; }
        public string CandidateNoInduction { get; set; }


    }
    public class GetAllCandidateInductionScheduleInput
    {
        public long? CandidateInductionScheduleId { get; set; }
    }
    public class BatchWiseViewCandidateDetailsInput
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
    public class BatchWiseViewCandidateDetailsOutputNew
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
    public class ReimbursementdetailsReportInput
    {
        public int? VerticalId { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
    }
    public class ReimbursementdetailsReportOutputNew
    {
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public string EmpNo { get; set; }
        public string DepartmentName { get; set; }
        public string Location { get; set; }
        public string GradeName { get; set; }
        public string DateofJoining { get; set; }
        public string MedicalSubmission { get; set; }
        public string MedicalProcessing { get; set; }
        public string TravelSubmission { get; set; }
        public string TravelProcessing { get; set; }
    }

    public class InductionFeedbackDetailsInput
    {
        public int? VerticalId { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
        public string JoiningType { get; set; }

    }

    public class InductionFeedbackDetailsOutputNew
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmpployeeNo { get; set; }
        public string FunctionName { get; set; }
        public string GradeName { get; set; }
        public string DepartmentName { get; set; }
        public string Question_Type { get; set; }
        public string Question_Name { get; set; }
        public string Given_Answer { get; set; }
        public string BatchNo { get; set; }
        public int? BatchId { get; set; }
        public long? TotalCandidates { get; set; }
        public string Completion { get; set; }
    }
    public class candidateviewfeedbackInput
    {
        public int? CandidateId { get; set; }

    }
    public class candidateviewfeedbackOutputNew
    {
        public string? JoiningType { get; set; }
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmpployeeNo { get; set; }
        public string FunctionName { get; set; }
        public string GradeName { get; set; }
        public string DepartmentName { get; set; }
        public string Question_Type { get; set; }
        public string Question_Name { get; set; }
        public string Given_Answer { get; set; }
    }
    public class ViewCandidateFeedbackReportInput
    {
        public int? BatchId { get; set; }
    }
    public class ViewCandidateFeedbackReportOutputNew
    {
        public int? BatchId { get; set; }
        public string BatchNo { get; set; }
        public string CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmpployeeNo { get; set; }
        public string VerticalName { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string GradeName { get; set; }
        public string DepartmentName { get; set; }

        public class GetHandholding
        {
            public string EmpNo { get; set; }
            public string EmpName { get; set; }

        }
        public class HandHoldingReportGet
        {
            public string EmpNo { get; set; }
            public string EmpName { get; set; }
            public string LocationOffice { get; set; }
            public string AllocatedUserName { get; set; }
            public string Probation { get; set; }
            public string JobshadowFilledBy { get; set; }
            public string JobshadowApprover { get; set; }
            public string HrFeedBackFilledBy { get; set; }
            public string HrReviewFilledBy { get; set; }
            public string ListeningFromFilledBy { get; set; }
            public string HalfYearlyReviewFilledBy { get; set; }
            public string HalfYearlyApprovedBy { get; set; }
            public string AnnualConfReviewFilledBy { get; set; }
            public string AnnualConfReviewStageOne { get; set; }
            public string AnnualConfReviewStageTwo { get; set; }
            public string AnnualConfReviewStageThree { get; set; }

        }
    }
}

