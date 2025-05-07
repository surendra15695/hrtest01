using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    class CandidateOnboardingEmailStatus
    {
    }
    public class CandidateOnboardingEmailStatusInput
    {
        public string CandidateNo { get; set; }
        public string ToDate { get; set; }
        public string FromDate { get; set; }
    }
    public class CandidateOnboardingEmailStatusOutputNew
    { 
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string CandidateEmailId { get; set; }
        public string Department { get; set; }
        public string BatchNo { get; set; }
        //public string Function { get; set; }
        public string Grade { get; set; }
        public string JoiningDate { get; set; }
        public string Location { get; set; }
        public string Position { get; set; }
        public string mail_status { get; set; }
    }

    public class GetAllEmailTypeToSendMail
    {
        public int TypeId { get; set; }
        public string TypeName { get; set; }
        public string APIName { get; set; }
    }

    public class AllEmailAndDetails
    {
        public int ? AutoId { get; set; }
        public string ? BatchNo { get; set; }
        public int ? CandidateId { get; set; }
        public string ? CandidateNo { get; set; }
        public string ? FullName { get; set; }
        public string ? ToEmailId { get; set; }
        public int ? RequisitionDetailId { get; set; }
        public string ? Department {  get; set; }
        public string ? Function {  get; set; }
        public string ? Grade {  get; set; }
        public string ? JoiningDate { get; set; }
        public string ? Location { get; set; }
        public string ? Position { get; set; }
        public string ? EmailBody { get; set; }
        public string ? EmailSubject { get; set; }
        public int ? SourceChannelId { get; set; }

        public int NaukriId { get; set; }
        public string? PositionName { get; set; }
        public string? DepartmentName { get; set; }
        public string? FunctionName { get; set; }
        public string? RequisitionNo { get; set; }

    }

    public class GetEmailList
    {
       public int EmailTypeId {get;set;}
       public int CreatedBy   {get;set;}
        public bool IsPending   {get;set;}
    }
    public class TestEmailList
    {
        public long TestScheduleDetailId { get; set; }
        public string EmailId { get; set; }
        public string EmailTemplate { get; set; }
    }
    public class CandidateWiseScheduleDetails
    {
        public int CandidateInductionScheduleCandidateDetailsId { get; set; }
        public int CandidateInductionScheduleDetailsId { get; set; }
        public int CandidateId { get; set; }
        public string? TraingTitle { get; set; }
        public string? DateFrom { get; set; }
        public string? DateTo { get; set; }
        public string? TimeFrom { get; set; }
        public string? TimeTo { get; set; }
        public string? DetailsofSession { get; set; }
        public int Trainer { get; set; }
        public string? TrainerName { get; set; }
        public int InductionMode { get; set; }
        public string? InductionModeName { get; set; }
        public int Location { get; set; }
        public string? LocationOffice { get; set; }
        public int InductionVenue { get; set; }
        public string? InductionVenueName { get; set; }
        public int InductionCoOrdinator { get; set; }
        public string? InductionCoOrdinatorName { get; set; }
        public string? Remarks { get; set; }


    }
    public class EmailBodyDetails
    {
        public long EmailDetailsId { get; set; }
        public string BatchNo { get; set; }
        public string CandidateEmailId { get; set; }
        public int? CandidateId { get; set; }
        public string CandidateName { get; set; }
        public int? RequisitionDetailId { get; set; }
        public string Department { get; set; }
        public string EmailBody { get; set; }
        public string Function { get; set; }
        public string Grade { get; set; }
        public string JoiningDate { get; set; }
        public string Location { get; set; }
        public string Position { get; set; }
    }
    public class CandidateInductionDetails
    {
        public long? ShareWithCandidateInductionDetailsId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string AccommocationRequire { get; set; }
        public string DetailsOfSession { get; set; }
        public string FromTime { get; set; }
        public string ToTime { get; set; }
        public string InductionDate { get; set; }
        public string Location { get; set; }
        public string PersonToMeet { get; set; }
        public string TrainingTittle { get; set; }
        public string Venue { get; set; }
        public string Remarks { get; set; }

    }
    public class CandidateAccommodationDetails
    {
        public long? ShareWithCandidateAccommodationDetailsId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string Accommodation { get; set; }
        public string Location { get; set; }
    }
    public class AccomodationDetailsCadidateWise
    {
        public string? Accomodation { get; set; }
        public string? FromDate { get; set; }
        public string? ToDate { get; set; }
        public string? LocationOffice { get; set; }
        public string? IsActive { get; set; }
    }
}
