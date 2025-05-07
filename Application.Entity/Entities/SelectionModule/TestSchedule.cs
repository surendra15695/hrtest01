using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.SelectionModule
{
    public class TestSchedule
    {
    }

    public class TestScheduleFormData
    {
        public long RequisitionDetailId { get; set; }
        public int TestTypeId { get; set; }
        public string TestLink { get; set; }
        public string TestFromDate { get; set; }
        public string TestToDate { get; set; }
        public int TestVenueId { get; set; }
        public string TestContactName { get; set; }
        public string TestContactNo { get; set; }
        public bool IsTestTravel { get; set; }
        public int TestEmailTemplateId { get; set; }
        public string TestEmailTemplate { get; set; }
        public string CandidateIds { get; set; }
        public long CreatedBy { get; set; }
        public string VenueName { get; set; }
        public string VanueAddress { get; set; }
        public string ContactName { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
    }

    public class TestRequisitionForEmailDetails         //arghya, Date-29.07.22 
    {
        public string RequsitionNo { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
    }

    public class SearchTestRequisitionForEmailDetails
    {
        public long RequisitionDetailId { get; set; }
    }                                                    //Till this

    public class TestScheduleDetail
    {
        public long TestScheduleDetailId { get; set; }
        public long CandidateId { get; set; }
        public int TestTypeId { get; set; }
        public string TestLink { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int VenueId { get; set; }
        public string ContactPersonName { get; set; }
        public string ContactNo { get; set; }
        public bool IsTravel { get; set; }
        public int EmailTemplateId { get; set; }

    }

    public class SearchTestScheduleDetail
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
    }

    public class SearchTestResult
    {
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
    }

    public class TestResultDetail
    {
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
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
        public string UploadStatus { get; set; }
        public int ? TestResultStatus { get; set; }

    }

    public class SearchCandidateTestTravelReimbursement
    {
        public long? CandidateId { get; set; }
        public long? TestScheduleDetailId { get; set; }
        public long? RequisitionDetailId { get; set; }
    }

    public class CandidateTestTravelReimbursement
    {
        public long TestScheduleDetailId { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public int StateId { get; set; }
        public string TestDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string JourneyType { get; set; }
        public int ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
    }
    public class CampusCandidateTestTravelReimbursement
    {
        public long TestScheduleDetailId { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string TestDate { get; set; }
        public string VenueName { get; set; }
        public string JourneyType { get; set; }
        public int ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
    }
    public class SearchTestTravelReimbursement
    {
        public long? CandidateId { get; set; }
        public long? TestScheduleDetailId { get; set; }
        public long? RequisitionDetailId { get; set; }
    }

    public class TestTravelReimbursementDetailData
    {
        public long TravelReimbursementId { get; set; }
        public long TestScheduleDetailId { get; set; }
        public string TestName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string TestDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public string DocumentPathForPDF { get; set; }
        public int ClaimStatusId { get; set; }
        public List<TestTravelReimbursementJourneyList> TravelReimbursementJourneyListData { get; set; }
        public List<TestTravelReimbursementAttachmentList> TravelReimbursementAttachmentListData { get; set; }
    }
    public class CampusTestTravelReimbursementDetailData
    {
        public long TravelReimbursementId { get; set; }
        public long TestScheduleDetailId { get; set; }
        public string TestName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public string TestDate { get; set; }
        public string VenueName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public int ClaimStatusId { get; set; }
        public string ProfileSignature { get; set; }
        public List<TestTravelReimbursementJourneyList> TravelReimbursementJourneyListData { get; set; }
        public List<TestTravelReimbursementAttachmentList> TravelReimbursementAttachmentListData { get; set; }
    }

    public class TestTravelReimbursement
    {
        public TestTravelReimbursementDetail TestTravelReimbursementData { get; set; }
        public List<TestTravelReimbursementJourneyList> TestTravelReimbursementJourneyListData { get; set; }
        public List<TestTravelReimbursementAttachmentList> TestTravelReimbursementAttachmentListData { get; set; }
    }
    public class CampusTestTravelReimbursement
    {
        public CampusTestTravelReimbursementDetail TestTravelReimbursementData { get; set; }
        public List<TestTravelReimbursementJourneyList> TestTravelReimbursementJourneyListData { get; set; }
        public List<TestTravelReimbursementAttachmentList> TestTravelReimbursementAttachmentListData { get; set; }
    }
    public class TestTravelReimbursementDetail
    {
        public long TravelReimbursementId { get; set; }
        public long TestScheduleDetailId { get; set; }
        public string TestName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string TestDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public string DocumentPathForPDF { get; set; }
        public int ClaimStatusId { get; set; }

    }
    public class CampusTestTravelReimbursementDetail
    {
        public long TravelReimbursementId { get; set; }
        public long TestScheduleDetailId { get; set; }
        public string TestName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public string TestDate { get; set; }
        public string VenueName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public int ClaimStatusId { get; set; }
        public string ProfileSignature { get; set; }
    }
    public class TestTravelReimbursementJourneyList
    {
        public long AutoId { get; set; }
        public long TravelReimbursementId { get; set; }
        public int JourneyTypeId { get; set; }
        public string JourneyTypeName { get; set; }
        public string JourneyDate { get; set; }
        public string JourneySource { get; set; }
        public string JourneyDestination { get; set; }
        public int TravelModeId { get; set; }
        public string TravelModeName { get; set; }
        public int ClaimAmount { get; set; }
    }

    public class TestTravelReimbursementAttachmentList
    {
        public long AutoId { get; set; }
        public long TravelReimbursementId { get; set; }
        public int JourneyTypeId { get; set; }
        public string JourneyTypeName { get; set; }
        public int TicketId { get; set; }
        public string TicketName { get; set; }
        public string AttachmentLink { get; set; }
    }

    public class TestTravelReimbursementFormData
    {
        public long TravelReimbursementId { get; set; }
        public long TestScheduleDetailId { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public string IFSC { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementDocument { get; set; }
        public string DocumentPathForPDF { get; set; }
        public long CreatedBy { get; set; }
        public string PreviousAttachmentIds { get; set; }
        public string PreviousJourneyIds { get; set; }
        public List<TestTravelJourneyData> JourneyData { get; set; }
        public List<TestTravelAttachmentData> AttachmentData { get; set; }
    }

    public class TestTravelJourneyData
    {
        public long AutoId { get; set; }
        public int JourneyTypeId { get; set; }
        public string JourneyDate { get; set; }
        public string JourneySource { get; set; }
        public string JourneyDestination { get; set; }
        public int TravelModeId { get; set; }
        public int ClaimAmount { get; set; }
    }

    public class TestTravelAttachmentData
    {
        public long AutoId { get; set; }
        public int JourneyTypeId { get; set; }
        public int TicketId { get; set; }
        public string AttachmentLink { get; set; }
    }

    public class RMTestTravelReimbursementList
    {
        public long TestScheduleDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string TestDate { get; set; }
        public string TestName { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string DepartmentName { get; set; }
        public string FunctionName { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
        public string ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
        public string ModeOfJourney { get; set; }
        public string ModeOfTravel { get; set; }
        public string DocumentPathForPDF { get; set; }
    }
    public class CampusTestTravelReimbursementList
    {
        public long TestScheduleDetailId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public int IsOffCampus { get; set; }
        public string TestDate { get; set; }
        public string TestName { get; set; }
        public string VenueName { get; set; }
        public string ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
        public string ModeOfJourney { get; set; }
        public string ModeOfTravel { get; set; }
        public string CampusForId { get; set; }
        public string HrOpsAssigned { get; set; }
        public string HrOpsAssignedAutoUserId { get; set; }
    }
    public class SearchRMTestTravelReimbursementList
    {
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? TestScheduleDetailId { get; set; }
        //public int InterviewId { get; set; }
        public int? VerticalId { get; set; }
        public int? PositionId { get; set; }
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public int? ClaimStatusId { get; set; }
        public long? AutoUserId { get; set; }
    }
    public class SearchCampusTestTravelReimbursementList
    {
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? TestScheduleDetailId { get; set; }
        //public int InterviewId { get; set; }
        public int? ClaimStatusId { get; set; }
    }
    public class TestTravelReimbursementActionFormData
    {
        public string TestScheduleDetailIds { get; set; }
        public int ClaimStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateNo { get; set; }
        public string Password { get; set; }
        public string ReimbursementName { get; set; }
        public int? Flag { get; set; }
    }

    public class TestTravelClarificationList
    {
        public string ClarificationRemarks { get; set; }
        public string CreatedByName { get; set; }
    }

    public class SearchTestTravelClarificationList
    {
        public long? TestScheduleDetailId { get; set; }
    }
}
