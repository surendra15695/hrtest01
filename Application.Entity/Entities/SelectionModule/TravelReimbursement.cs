using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.SelectionModule
{

    public class SearchCandidateTravelReimbursement
    {
        public long? CandidateId { get; set; }
        public long? InterviewDetailId { get; set; }
        public long? RequisitionDetailId { get; set; }
    }

    public class CandidateTravelReimbursement
    {
        public long InterviewDetailId { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string CandidateNo { get; set; }
        public int StateId { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string JourneyType { get; set; }
        public int ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
    }
    public class CampusCandidateInterviewTravelReimbursement
    {
        public long InterviewDetailId { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string CandidateNo { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string FunctionName { get; set; }
        public string JourneyType { get; set; }
        public int ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
    }
    public class SearchTravelReimbursement
    {
        public long? CandidateId { get; set; }
        public long? InterviewDetailId { get; set; }
        public long? RequisitionDetailId { get; set; }
    }

    public class TravelReimbursementDetailData
    {
        public long TravelReimbursementId { get; set; }
        public long InterviewDetailId { get; set; }
        public string InterviewName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public string IFSC { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public string DocumentPathForPDF { get; set; }
        public int ClaimStatusId { get; set; }
        public List<TravelReimbursementJourneyList> TravelReimbursementJourneyListData { get; set; }
        public List<TravelReimbursementAttachmentList> TravelReimbursementAttachmentListData { get; set; }
        public string ProfileSignature { get; set; } //by kuntal
    }
    public class CampusInterviewTravelReimbursementDetailData
    {
        public long TravelReimbursementId { get; set; }
        public long InterviewDetailId { get; set; }
        public string InterviewName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string FunctionName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string BankBranch { get; set; }
        public string IFSC { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public int ClaimStatusId { get; set; }
        public List<TravelReimbursementJourneyList> TravelReimbursementJourneyListData { get; set; }
        public List<TravelReimbursementAttachmentList> TravelReimbursementAttachmentListData { get; set; }
        public string ProfileSignature { get; set; } //by kuntal
    }
    public class TravelReimbursement
    {
        public TravelReimbursementDetail TravelReimbursementData { get; set; }
        public List<TravelReimbursementJourneyList> TravelReimbursementJourneyListData { get; set; }
        public List<TravelReimbursementAttachmentList> TravelReimbursementAttachmentListData { get; set; }
    }
    public class CampusTravelReimbursement
    {
        public CampusTravelReimbursementDetail TravelReimbursementData { get; set; }
        public List<TravelReimbursementJourneyList> TravelReimbursementJourneyListData { get; set; }
        public List<TravelReimbursementAttachmentList> TravelReimbursementAttachmentListData { get; set; }
    }
    public class TravelReimbursementDetail
    {
        public long TravelReimbursementId { get; set; }
        public long InterviewDetailId { get; set; }
        public string InterviewName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get;set; }
        public string FunctionName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public int ClaimStatusId { get; set; }
        public string DocumentPathForPDF { get; set; }
        //by kuntal
        public string ProfileSignature { get; set; }

    }
    public class CampusTravelReimbursementDetail
    {
        public long TravelReimbursementId { get; set; }
        public long InterviewDetailId { get; set; }
        public string InterviewName { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string FunctionName { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementName { get; set; }
        public string BankStatementDocument { get; set; }
        public int ClaimStatusId { get; set; }
        //by kuntal
        public string ProfileSignature { get; set; }

    }
    public class TravelReimbursementJourneyList
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

    public class TravelReimbursementAttachmentList
    {
        public long AutoId { get; set; }
        public long TravelReimbursementId { get; set; }
        public int JourneyTypeId { get; set; }
        public string JourneyTypeName { get; set; }
        public int TicketId { get; set; }
        public string TicketName { get; set; }
        public string AttachmentLink { get; set; }
    }

    public class TravelReimbursementFormData
    {
        public long TravelReimbursementId { get; set; }
        public long InterviewDetailId { get; set; }
        public string CommunicationAddress { get; set; }
        public string PinCode { get; set; }
        public string BankAccountName { get; set; }
        public string BankAccountNumber { get; set; }
        public string DocumentPathForPDF { get; set; }
        public string BankName { get; set; }
        public string IFSC { get; set; }
        public string BankBranch { get; set; }
        public int BankStatementId { get; set; }
        public string BankStatementDocument { get; set; }
        public long CreatedBy { get; set; }
        public string PreviousAttachmentIds { get; set; }
        public string PreviousJourneyIds { get; set; }
        public List<TravelJourneyData> JourneyData { get; set; }
        public List<TravelAttachmentData> AttachmentData { get; set; }
    }

    public class TravelJourneyData
    {
        public long AutoId { get; set; }
        public int JourneyTypeId { get; set; }
        public string JourneyDate { get; set; }
        public string JourneySource { get; set; }
        public string JourneyDestination { get; set; }
        public int TravelModeId { get; set; }
        public int ClaimAmount { get; set; }
    }

    public class TravelAttachmentData
    {
        public long AutoId { get; set; }
        public int JourneyTypeId { get; set; }
        public int TicketId { get; set; }
        public string AttachmentLink { get; set; }
    }

    public class RMTravelReimbursementList
    {
        public long InterviewDetailId { get;set; }
        public string RequisitionNo { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string InterviewDate { get; set; }
        public string InterviewName { get; set; }
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
    public class CampusTravelReimbursementList
    {
        public long InterviewDetailId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public int IsOffCampus { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string FunctionName { get; set; }
        public string ClaimAmount { get; set; }
        public int ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
        public string ModeOfJourney { get; set; }
        public string ModeOfTravel { get; set; }
        public string CampusForId { get; set; }
        public string HrOpsAssigned { get; set; }
        public string HrOpsAssignedAutoUserId { get; set; }
    }
    public class SearchRMTravelReimbursementList
    {
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int InterviewId { get; set; }
        public int VerticalId { get; set; }
        public int PositionId { get; set; }
        public int DepartmentId { get; set; }
        public int FunctionId { get; set; }
        public int LocationId { get; set; }
        public int ClaimStatusId { get; set; }
        public long? AutoUserId { get; set; }
    }
    public class SearchCampusTravelReimbursementList
    {
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int InterviewId { get; set; }
        public int FunctionId { get; set; }
        public int ClaimStatusId { get; set; }
    }
    public class TravelReimbursementActionFormData
    {
        public string InterviewDetailIds { get; set; }
        public int ClaimStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateNo { get; set; }
        public string Password { get; set; }
        public string ReimbursementName { get; set; }
        public int? Flag { get; set; }
    }
    public class AssignTnterviewTravelFormData
    {
        public string InterviewDetailIds { get; set; }
        public int AutoUserId { get; set; }
    }
    public class AssignTestTravelFormData
    {
        public string TestScheduleDetailIds { get; set; }
        public int AutoUserId { get; set; }
    }
    public class TravelClarificationList
    {
        public string ClarificationRemarks { get; set; }
        public string CreatedByName { get; set; }
    }

    public class SearchTravelClarificationList
    {
        public long? InterviewDetailId { get; set; }
    }

}
