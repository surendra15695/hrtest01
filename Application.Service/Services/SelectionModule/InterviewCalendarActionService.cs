using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.SelectionModule
{
    public class InterviewCalendarActionService : IInterviewCalendarActionService
    {
        
        private readonly IInterviewCalendarActionRepository interviewCalendarActionRepository;
        public InterviewCalendarActionService(IInterviewCalendarActionRepository interviewCalendarActionRepository)
        {
            this.interviewCalendarActionRepository = interviewCalendarActionRepository;
        }
        public string CloudStorageAccountname()
        {
            return this.interviewCalendarActionRepository.CloudStorageAccountname();
        }
        public async Task<List<InterviewCalendarList>> GetPanelistCalendar(SearchInterviewCalendar formData)
        {
            return await this.interviewCalendarActionRepository.GetPanelistCalendar(formData);
        }
        public async Task<List<MyCalendarList>> GetCalendarList(SearchMyCalendar formData)
        {
            return await this.interviewCalendarActionRepository.GetCalendarList(formData);
        }

        public async Task<ReturnMessage> InterviewCalendarActionInsert(InterviewCalendarActionFormData formData)
        {
            return await this.interviewCalendarActionRepository.InterviewCalendarActionInsert(formData);
        }

        public async Task<ReturnMessage> AddInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formData)
        {
            return await this.interviewCalendarActionRepository.AddInterviewCalendarAssessment(formData);
        }

        public async Task<ReturnMessage> AddInterviewCalendarAssessmentWithPDFGeneration(InterviewCalendarAssessmentFormDataWithPDFGeneration formData)
        {
            return await this.interviewCalendarActionRepository.AddInterviewCalendarAssessmentWithPDFGeneration(formData);
        }

        public async Task<ReturnMessage> AddCampusInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formData)
        {
            return await this.interviewCalendarActionRepository.AddCampusInterviewCalendarAssessment(formData);
        }

        public async Task<List<InterviewCalendarAssessmentList>> GetInterviewCalendarAssessmentList(SearchInterviewCalendarAssessment formData)
        {
            return await this.interviewCalendarActionRepository.GetInterviewCalendarAssessmentList(formData);
        }

        public async Task<ReturnMessage> InterviewFeedbackInsert(InterviewFeedbackFormData formData)
        {
            return await this.interviewCalendarActionRepository.InterviewFeedbackInsert(formData);
        }
        public async Task<ReturnMessage> InsertUpdateStatusMyCampusCalander(InsertStatusMyCampusCalander formData)
        {
            return await this.interviewCalendarActionRepository.InsertUpdateStatusMyCampusCalander(formData);
        }
        public async Task<List<InterviewFeedback>> GetInterviewFeedback(SearchInterviewFeedback formData)
        {
            return await this.interviewCalendarActionRepository.GetInterviewFeedback(formData);
        }

        public async Task<List<InterviewClarificationList>> GetInterviewClarificationList(SearchInterviewClarificationList formData)
        {
            return await this.interviewCalendarActionRepository.GetInterviewClarificationList(formData);
        }
        public async Task<List<CampusMyCalenderData>> GetMyCalenderList(SearchMyCampusCalendar formData)
        {
            return await this.interviewCalendarActionRepository.GetMyCalenderList(formData);
        }

        public async Task<List<CampusViewCandidateData>> CampusViewCandidateDetails(ViewCandidateSearchData formData)
        {
            return await this.interviewCalendarActionRepository.CampusViewCandidateDetails(formData);
        }

        public async Task<List<InterviewCampusCalendarAssessmentList>> GetCampusInterviewCalendarAssessmentList(SearchCapmusInterviewCalendarAssessment formData)
        {
            return await this.interviewCalendarActionRepository.GetCampusInterviewCalendarAssessmentList(formData);
        }
        public async Task<List<InterviewDetailsData>> getInterviewDetails(SearchInterviewDeatils formData)
        {
            return await this.interviewCalendarActionRepository.getInterviewDetails(formData);
        }
        public async Task<ReturnMessage> InsertUpdateStageGateAssesment(StageGateAssesmentData formData)
        {
            return await this.interviewCalendarActionRepository.InsertUpdateStageGateAssesment(formData);
        }
        public async Task<List<StageGateData>> GetFillStageGateDetails(SearchInterviewDeatils formData)
        {
            return await this.interviewCalendarActionRepository.GetFillStageGateDetails(formData);
        }

        public async Task<List<RmCalenderData>> GetRmPageInterview(RmCalenderSearchData formData)
        {
            return await this.interviewCalendarActionRepository.GetRmPageInterview(formData);
        }

        public async Task<List<RmCandidateCalenderData>> GetCandidateListCampusCandidate(RmCandidateCalenderSearchData formData)
        {
            return await this.interviewCalendarActionRepository.GetCandidateListCampusCandidate(formData);
        }

        public async Task<ReturnMessage> InsertUpCampusInterviewName(InsUpCampusInterview formData)
        {
            return await this.interviewCalendarActionRepository.InsertUpCampusInterviewName(formData);
        }

        public async Task<List<CampusInterviewNameData>> GetCampusInterviewName(CampusInterviewNameSearch formData)
        {
            return await this.interviewCalendarActionRepository.GetCampusInterviewName(formData);
        }

        public async Task<List<CampusInterviewAssesmentData>> GetCampusInterviewAssesmentList(SearchInterviewAssesment formData)
        {
            return await this.interviewCalendarActionRepository.GetCampusInterviewAssesmentList(formData);
        }

        public async Task<List<CampusInterviewCalendarAssessmentList>> CampusGetInterviewCalendarAssessmentList(CampusSearchInterviewCalendarAssessment formData)
        {
            return await this.interviewCalendarActionRepository.CampusGetInterviewCalendarAssessmentList(formData);
        }
    }
}
