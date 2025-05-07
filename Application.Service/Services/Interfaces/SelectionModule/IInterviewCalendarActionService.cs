using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.SelectionModule
{
    public interface IInterviewCalendarActionService
    {
        string CloudStorageAccountname();
        Task<List<InterviewCalendarList>> GetPanelistCalendar(SearchInterviewCalendar formData);
        Task<List<MyCalendarList>> GetCalendarList(SearchMyCalendar formData);
        Task<ReturnMessage> InterviewCalendarActionInsert(InterviewCalendarActionFormData formData);
        Task<ReturnMessage> AddInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formData);
        Task<ReturnMessage> AddInterviewCalendarAssessmentWithPDFGeneration(InterviewCalendarAssessmentFormDataWithPDFGeneration formData);
        Task<List<InterviewCalendarAssessmentList>> GetInterviewCalendarAssessmentList(SearchInterviewCalendarAssessment formData);
        Task<ReturnMessage> InterviewFeedbackInsert(InterviewFeedbackFormData formData);
        Task<List<InterviewFeedback>> GetInterviewFeedback(SearchInterviewFeedback formData);
        Task<List<InterviewClarificationList>> GetInterviewClarificationList(SearchInterviewClarificationList formData);
        Task<List<CampusMyCalenderData>> GetMyCalenderList(SearchMyCampusCalendar formData);
        Task<List<CampusViewCandidateData>> CampusViewCandidateDetails(ViewCandidateSearchData formData);
        Task<ReturnMessage> InsertUpdateStatusMyCampusCalander(InsertStatusMyCampusCalander formData);
        Task<List<InterviewCampusCalendarAssessmentList>> GetCampusInterviewCalendarAssessmentList(SearchCapmusInterviewCalendarAssessment formData);
        Task<ReturnMessage> AddCampusInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formData);
        Task<List<InterviewDetailsData>> getInterviewDetails(SearchInterviewDeatils formData);
        Task<ReturnMessage> InsertUpdateStageGateAssesment(StageGateAssesmentData formData);
        Task<List<StageGateData>> GetFillStageGateDetails(SearchInterviewDeatils formData);
        Task<List<RmCalenderData>> GetRmPageInterview(RmCalenderSearchData formData);
        Task<List<RmCandidateCalenderData>> GetCandidateListCampusCandidate(RmCandidateCalenderSearchData formData);
        Task<ReturnMessage> InsertUpCampusInterviewName(InsUpCampusInterview formData);
        Task<List<CampusInterviewNameData>> GetCampusInterviewName(CampusInterviewNameSearch formData);
        Task<List<CampusInterviewAssesmentData>> GetCampusInterviewAssesmentList(SearchInterviewAssesment formData);
        Task<List<CampusInterviewCalendarAssessmentList>> CampusGetInterviewCalendarAssessmentList(CampusSearchInterviewCalendarAssessment formData);
    }
}
