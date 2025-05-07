using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.SelectionModule
{
    class InterviewSchedule
    {
    }

    public class InterviewScheduleFormData
    {
        public string CandidateIds{get;set;}
        public long RequisitionDetailId { get; set; }
        public int InterviewId { get; set; }
        public int InterviewTypeId { get; set; }
        public string InterviewLink { get; set; }
        public int InterviewRoomId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InterviewSlot { get; set; }
        public int VenueId { get; set; }
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
        public string VenueName { get; set; }
        public string VanueAddress { get; set; }
        public string ContactName { get; set; }
        public string ContactNo { get; set; }
        public string candidateNo { get; set; }
        public string interviewAccomodationDetails { get; set; }
        public string travelModeDesc { get; set; }
        public string CandidateName { get; set; }

    }
    public class RequisitionForEmailDetails          //arghya, Date-29.07.22 
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

    public class SearchRequisitionForEmailDetails
    {
        public long RequisitionDetailId { get; set; }
    }                                                  // Till this

    public class InterviewScheduleDetail{
        public long InterviewDetailId{get;set;}
        public long CandidateId{get;set;}
        public long InterviewId{get;set;}
        public int InterviewRoomId{get;set;}
        public int InterviewTypeId{get;set;}
        public string InterviewLink{get;set;}
        public string FromDate{get;set;}
        public string ToDate{get;set;}
        public string InterviewSlot{get;set;}
        public int VenueId{get;set;}
        public string HRAutoUserIds{get;set;}
        public string InterviewerAutoUserIds{get;set;}
        public bool IsAccomodation{get;set;}
        public string AccomodationDetails{get;set;}
        public bool IsTravel{get;set;}
        public string TravelModes{get;set;}
        public bool IsFormAnexture{get;set;}
        public string ScheduleComments{get;set;}
        public int EmailTemplateId{get;set;}
    }

    public class SearchInterviewScheduleDetail{
        public long CandidateId{get;set;}
        public long RequisitionDetailId{get;set;}
    }

    public class SearchCandidateInterviewFeedback
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? InterviewDetailId { get; set; }
    }
    public class SearchCampusCandidateInterviewFeedback
    {
        public int? CandidateId { get; set; }
        public int? IsEnable { get; set; }
    }
    public class CampusCandidateInterviewFeedbackNew
    {
        public int InterviewDetailId { get; set; }
        public int CandidateId { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string FunctionName { get; set; }
        public int FilledStatus { get; set; }
        public int IsEnable { get; set; }
    }

    public class CandidateInterviewFeedbackList
    {
        public long RequisitionDetailId { get; set; }
        public long InterviewDetailId { get; set; }
        public string InterviewDate { get; set; }
        public string VenueName { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public int FilledStatus { get; set; }
    }

    public class CandidateInterviedwFeedbackData
    {
        public long CandidateId { get; set; }
        public long InterviewDetailId { get; set; }
        public long RequisitionDetailId { get; set; }
        public int ApplicationSystemRate { get; set; }
        public int ExplanationRate { get; set; }
        public int HelpfulRate { get; set; }
        public int InformativeRate { get; set; }
        public int InterviewProcessRate { get; set; }
        public int ComfortableRate { get; set; }
        public int RecomendedRate { get; set; }
        public string OverallExperience { get; set; }
        public string Suggestion { get; set; }
        public long CreatedBy { get; set; }
    }
    public class CampusCandidateInterviedwFeedbackDataInsert
    {
        public long CandidateId { get; set; }
        public long? InterviewDetailId { get; set; }
        public int ApplicationSystemRate { get; set; }
        public int ExplanationRate { get; set; }
        public int HelpfulRate { get; set; }
        public int InformativeRate { get; set; }
        public int InterviewProcessRate { get; set; }
        public int ComfortableRate { get; set; }
        public int RecomendedRate { get; set; }
        public string OverallExperience { get; set; }
        public string Suggestion { get; set; }
        public long CreatedBy { get; set; }
    }
    public class CampusCandidateInterviedwFeedbackData
    {
        public long CandidateId { get; set; }
        public long InterviewDetailId { get; set; }
        public int ApplicationSystemRate { get; set; }
        public int ExplanationRate { get; set; }
        public int HelpfulRate { get; set; }
        public int InformativeRate { get; set; }
        public int InterviewProcessRate { get; set; }
        public int ComfortableRate { get; set; }
        public int RecomendedRate { get; set; }
        public string OverallExperience { get; set; }
        public string Suggestion { get; set; }
        public long CreatedBy { get; set; }
    }
    public class SearchCampusCandidateInterviewFeedbackData
    {
        public long? CandidateId { get; set; }
        public long? InterviewDetailId { get; set; }
    }
}
