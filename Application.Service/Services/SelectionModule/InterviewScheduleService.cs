using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.SelectionModule
{
    public class InterviewScheduleService : IInterviewScheduleService
    {
        private readonly IInterviewScheduleRepository interviewScheduleRepository;

        public InterviewScheduleService(IInterviewScheduleRepository interviewScheduleRepository)
        {
            this.interviewScheduleRepository = interviewScheduleRepository;
        }

        public async Task<ReturnMessage> InterviewScheduleInsert(InterviewScheduleFormData formData)
        {
            return await this.interviewScheduleRepository.InterviewScheduleInsert(formData);
        }

        public async Task<InterviewScheduleDetail> GetInterviewScheduleDetail(SearchInterviewScheduleDetail formData)
        {
            return await this.interviewScheduleRepository.GetInterviewScheduleDetail(formData);
        }

        public async Task<ReturnMessage> CandidateInterviewFeedbackInsertUpdate(CandidateInterviedwFeedbackData formData)
        {
            return await this.interviewScheduleRepository.CandidateInterviewFeedbackInsertUpdate(formData);
        }
        public async Task<ReturnMessage> CampusCandidateInterviewFeedbackInsertUpdate(CampusCandidateInterviedwFeedbackDataInsert formData)
        {
            return await this.interviewScheduleRepository.CampusCandidateInterviewFeedbackInsertUpdate(formData);
        }

        public async Task<CandidateInterviedwFeedbackData> GetCandidateInterviewFeedbackDetail(SearchCandidateInterviewFeedback formData)
        {
            return await this.interviewScheduleRepository.GetCandidateInterviewFeedbackDetail(formData);
        }
        public async Task<CampusCandidateInterviedwFeedbackData> GetCampusCandidateInterviewFeedbackDetail(SearchCampusCandidateInterviewFeedbackData formData)
        {
            return await this.interviewScheduleRepository.GetCampusCandidateInterviewFeedbackDetail(formData);
        }

        public async Task<List<CandidateInterviewFeedbackList>> GetCandidateInterviewFeedbackList(SearchCandidateInterviewFeedback formData)
        {
            return await this.interviewScheduleRepository.GetCandidateInterviewFeedbackList(formData);
        }
        public async Task<List<CampusCandidateInterviewFeedbackNew>> GetCampusCandidateInterviewFeedbackList(SearchCampusCandidateInterviewFeedback formData)
        {
            return await this.interviewScheduleRepository.GetCampusCandidateInterviewFeedbackList(formData);
        }
        public async Task<RequisitionForEmailDetails> GetRequisitionDetailsForEmail(SearchRequisitionForEmailDetails formData)
        {
            return await this.interviewScheduleRepository.GetRequisitionDetailsForEmail(formData);
        }
    }
}
