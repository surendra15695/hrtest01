using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.SelectionModule
{
    public class InterviewCalendarAction
    {
    }

    public class SearchInterviewCalendar
    {
        public long AutoUserId { get; set; }
        public long InterviewId { get; set; }
        public int PositionId { get; set; }
        public int VenueId { get; set; }
        public int InterviewTypeId { get; set; }
        public int HiringStatusId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int LocationId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int AcceptStatus { get; set; }
    }

    public class InterviewCalendarList
    {
        public long CalendarId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public long RequisitionDetailId { get; set; }
        public string FullName { get; set; }
        public string InterviewName { get; set; }
        public string VenueName { get; set; }
        public string InterviewType { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
        public string PositionName { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public string ScheduleComments { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string InterviewSlot { get; set; }
        public string ReferalEmpNo { get; set; }
        public string ReferalDesignation { get; set; }
        public string ReferalGrade { get; set; }
        public int CalendarAcceptStatusId { get; set; }
        public string CalendarAcceptStatusName { get; set; }
        public string AssessmentFilledStatus { get; set; }
        public int HRPanel { get; set; }
        public int ApplicationCount{get;set;}
    }

    public class InterviewCalendarActionFormData
    {
        public string CandidateId { get; set; }
        public string CalendarIds { get; set; }
        public int AcceptStatus { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }

    }

    public class InterviewCalendarAssessmentListData
    {
        public long CalendarId { get; set; }
        public int PersonalityScore { get; set; }
        public int CommunicationScore { get; set; }
        public int SubjectScore { get; set; }
        public int ApptitudeScore { get; set; }
        public int OverallScore { get; set; }
        //public int NoticePeriod { get; set; }
        //public int ExpectedSalary { get; set; }
        public string NoticePeriod { get; set; }
        public string ExpectedSalary { get; set; }
        public int StateId { get; set; }
        public string PreferredLocation { get; set; }
        public string OtherComments { get; set; }
        public int ActionStatus { get; set; }
        public int? VerticalId  { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
    }

    public class InterviewCalendarAssessmentFormData
    {
        public List<InterviewCalendarAssessmentListData> InterviewCalendarAssessmentData { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateIds { get; set; }  
    }


    public class InterviewCalendarAssessmentListDataWithPDFGeneration
    {
        public long CalendarId { get; set; }
        public int PersonalityScore { get; set; }
        public int CommunicationScore { get; set; }
        public int SubjectScore { get; set; }
        public int ApptitudeScore { get; set; }
        public int OverallScore { get; set; }
        //public int NoticePeriod { get; set; }
        //public int ExpectedSalary { get; set; }
        public string NoticePeriod { get; set; }
        public string ExpectedSalary { get; set; }
        public int StateId { get; set; }
        public string PreferredLocation { get; set; }
        public string OtherComments { get; set; }
        public int ActionStatus { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? DepartmentId { get; set; }
        public long CandidateId { get; set; }
        public string DocumentPath { get; set; }
    }
    public class InterviewCalendarAssessmentHTMLString
    {
        public int? CandidateId { get; set; }
        public string HtmlString { get; set; }
    }


    public class InterviewCalendarAssessmentFormDataWithPDFGeneration
    {
        public List<InterviewCalendarAssessmentListDataWithPDFGeneration> InterviewCalendarAssessmentData { get; set; }
        public List<InterviewCalendarAssessmentHTMLString> HtmlString { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateIds { get; set; } 
    }

    public class SearchInterviewCalendarAssessment
    {
        public string CalendarIds { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }

    }
    public class CampusSearchInterviewCalendarAssessment
    {       
        public long? CandidateId { get; set; }
        public long? InterviewDeatilsId { get; set; }

    }

    public class SearchCapmusInterviewCalendarAssessment
    {
        public string CalendarIds { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }

    }

    public class InterviewCalendarAssessmentList
    {
        public long CalendarId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public long RequisitionDetailId { get; set; }
        public string PositionName { get; set; }
        public string InterviewName { get; set; }
        public string InterviewDate { get; set; }
        public int PersonalityScore { get; set; }
        public int CommunicationScore { get; set; }
        public int SubjectScore { get; set; }
        public int ApptitudeScore { get; set; }
        public int OverallScore { get; set; }
        //public int NoticePeriod { get; set; }
        //public int ExpectedSalary { get; set; }
        public string NoticePeriod { get; set; }
        public string ExpectedSalary { get; set; }
        public int StateId { get; set; }
        public string PreferredLocation { get; set; }
        public string OtherComments { get; set; }
        public int ActionStatus { get; set; }
        public string InterviewerName{get;set;}
        public string StateName{get;set;}
        public string ActionStatusName{get;set;}
        public long? InterviewerEmpId { get; set; }  // Added By Anif on 06-04-2023
    }

    public class CampusInterviewCalendarAssessmentList
    {
        public long CalendarId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public long RequisitionDetailId { get; set; }
        public string PositionName { get; set; }
        public string InterviewName { get; set; }
        public string InterviewDate { get; set; }
        public int PersonalityScore { get; set; }
        public int CommunicationScore { get; set; }
        public int SubjectScore { get; set; }
        public int ApptitudeScore { get; set; }
        public int OverallScore { get; set; }
        public string NoticePeriod { get; set; }
        public string ExpectedSalary { get; set; }
        public int StateId { get; set; }
        public string PreferredLocation { get; set; }
        public string OtherComments { get; set; }
        public int ActionStatus { get; set; }
        public string InterviewerName { get; set; }
        public string StateName { get; set; }
        public string ActionStatusName { get; set; }
    }

    public class InterviewCampusCalendarAssessmentList
    {
        public int InterviewDetailId { get; set; }

        public long CalendarId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }    
        public string InterviewDate { get; set; }
        public int PersonalityScore { get; set; }
        public int CommunicationScore { get; set; }
        public int SubjectScore { get; set; }
        public int ApptitudeScore { get; set; }
        public int OverallScore { get; set; }
        public string NoticePeriod { get; set; }
        public string ExpectedSalary { get; set; }
        public int StateId { get; set; }
        public string PreferredLocation { get; set; }
        public string OtherComments { get; set; }
        public int ActionStatus { get; set; }
        public string InterviewerName { get; set; }
        public string StateName { get; set; }
        public string ActionStatusName { get; set; }
    }

    public class InterviewFeedbackFormData
    {
        public long CalendarId { get; set; }
        public string MedicalDetails { get; set; }
        public string ParentIncomeDetails { get; set; }
        public string DependentDetails { get; set; }
        public string HigherStudiesDetails { get; set; }
        public string UnderstandingDetails { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchInterviewFeedback
    {
        public long? CalendarId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
    }

    public class InterviewFeedback{
        public long CalendarId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public long RequisitionDetailId { get; set; }
        public string PositionName { get; set; }
        public string InterviewName { get; set; }
        public string MedicalDetails { get; set; }
        public string ParentIncomeDetails { get; set; }
        public string DependentDetails { get; set; }
        public string HigherStudiesDetails { get; set; }
        public string UnderStandingDetails { get; set; }
        public string CreatedByName { get; set; }
    }

    public class InterviewClarificationList{
        public long CalendarId { get; set; }
        public string Remarks{get;set;}
        public string CreatedByName{get;set;}
    }

    public class SearchInterviewClarificationList{
        public long? CalendarId{get;set;}
        public long? RequisitionDetailId{get;set;}
        public long? CandidateId {get;set;}

    }

    public class SearchMyCalendar
    {
        public long AutoUserId { get; set; }
        public long InterviewId { get; set; }
        public int PositionId { get; set; }
        public int VenueId { get; set; }
        public int InterviewTypeId { get; set; }
        public int HiringStatusId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int LocationId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int AcceptStatus { get; set; }
    }
    public class SearchMyCampusCalendar
    {
        public long AutoUserId { get; set; }
        public long InterviewId { get; set; }
        public int PositionId { get; set; }
        public int VenueId { get; set; }
        public int InterviewTypeId { get; set; }
        public int HiringStatusId { get; set; }
        public int FunctionId { get; set; }
        public int VerticalId { get; set; }
        public int DepartmentId { get; set; }
        public int LocationId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int AcceptStatus { get; set; }
    }
    public class MyCalendarList
    {
        public string InterviewName { get; set; }
        public string VenueName { get; set; }
        public string InterviewType { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
        public string PositionName { get; set; }
        public int CalendarAcceptStatusId { get; set; }
        public string CalendarAcceptStatusName { get; set; }
        public string FromDate { get; set; }
        public int noOfCandidate { get; set; }
    }

    public class CampusMyCalenderData
    {
        public string FromDate { get; set; }
        public int NoOfCandidate { get; set; }
        public int FunctionId { get; set; }
        public int InterviewMasterId { get; set; }
        public string InterviewName { get; set; }
        public string VenueName { get; set; }
        public string InterviewType { get; set; }
        public string FunctionName { get; set; }
        public int CalendarAcceptStatusId { get; set; }
        public string CalendarAcceptStatusName { get; set; }

    }

    public class CampusViewCandidateData
    {
        public int CandidateId { get; set; }
        public string FromDate { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string VenueName { get; set; }
        public string InterviewType { get; set; }
        public int AcceptStatus { get; set; }
        public int ApplicationCount { get; set; }
        public int AssessmentFilledStatus { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public string Status { get; set; }
        public int CalendarId { get; set; }
        public int CampusForId { get; set; }
    }

    public class ViewCandidateSearchData
    {
        public int InterviewMasterId { get; set; }
        public int FunctionId { get; set; }
        public int AutoUserId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string FullName { get; set; }
    }

    public class InsertStatusMyCampusCalander
    {
        public int AcceptStatus { get; set; }
        public string CalendarIds { get; set; }
        public string CandidateIds { get; set; }
    }
    public class SearchInterviewDeatils
    {
        public int CandidateId { get; set; }

    }

    public class InterviewDetailsData
    {
        public string FunctionName { get; set; }
        public string RoundName { get; set; }
        public string InterviewDate { get; set; }
        public string Status { get; set; }
        public string PannelMemberName { get; set; }
        public string Assesmentstatus { get; set; }

    }
    public class StageGateAssesmentData
    {
        public int CandidateId { get; set; }
        public double TotalMarks { get; set; }
        public int CreatedBy { get; set; }
        public List<MarksTable> marksTables { get; set; }
    }

    public class MarksTable
    {
        public int RowId { get; set; }
        public int ColumnId { get; set; }
        public double Marks { get; set; }

    }
    public class StageGateData
    {
        public int CandidateId { get; set; }
        public double TotalMarks { get; set; }
        public int AssesmentDetailid { get; set; }
        public int RowId { get; set; }
        public int ColumnId { get; set; }
        public double Marks { get; set; }
        public bool IsActive { get; set; }
    }
    public class RmCalenderData
    {
        public int NoOfCanidate { get; set; }
        public long InterviewDetailId { get; set; }
        public string FromDate { get; set; }
        public string VenueName { get; set; }
        public string Status { get; set; }
        public string InterviewType { get; set; }
        public int InterviewMasterId { get; set; }
        public string FunctionName { get; set; }
        public string InterviewName { get; set; }
    }
    public class RmCalenderSearchData
    {
        public string RoleId { get; set; }
    }
    public class RmCandidateCalenderSearchData
    {
        public int InterviewMasterId { get; set; }
    }
    public class RmCandidateCalenderData
    {
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public int CandidateId { get; set; }
        public int Age { get; set; }
        public string HighestqualificationName { get; set; }
        public string CourseName { get; set; }
        public string Stream { get; set; }
        public string Marks { get; set; }
        public string InstituteName { get; set; }
        public string InstititeLocation { get; set; }
        public string ApllicationStatus { get; set; }
        public string AssesmentStatus { get; set; }
        public int HiringStatusId { get; set; }
        public string StatusName { get; set; }


    }
    public class InsUpCampusInterview
    {
        public int InterviewId { get; set; }
        public string InterviewName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class CampusInterviewNameSearch
    {
        public int InterviewNameId { get; set; }

    }

    public class CampusInterviewNameData
    {
        public int InterviewNameId { get; set; }
        public string InterviewName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class SearchInterviewAssesment
    {
        public int CandidateId { get; set; }
        public int FunctionId { get; set; }
    }
    public class CampusInterviewAssesmentData
    {
        public string FunctionName { get; set; }
        public string RoundName { get; set; }
        public string InterviewDate { get; set; }
        public string Status { get; set; }
        public int InterviewDetailId { get; set; }
        public string PannelMemberName { get; set; }
        public string assesmentstatus { get; set; }
    }
}
