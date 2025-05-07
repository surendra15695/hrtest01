using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.SelectionModule
{
    public interface IInterviewScheduleRepository
    {
        Task<ReturnMessage> InterviewScheduleInsert(InterviewScheduleFormData formData);
        Task<RequisitionForEmailDetails> GetRequisitionDetailsForEmail(SearchRequisitionForEmailDetails formData);
        Task<InterviewScheduleDetail> GetInterviewScheduleDetail(SearchInterviewScheduleDetail formData);
        Task<ReturnMessage> CandidateInterviewFeedbackInsertUpdate(CandidateInterviedwFeedbackData formData);
        Task<ReturnMessage> CampusCandidateInterviewFeedbackInsertUpdate(CampusCandidateInterviedwFeedbackDataInsert formData);
        Task<CandidateInterviedwFeedbackData> GetCandidateInterviewFeedbackDetail(SearchCandidateInterviewFeedback formData);
        Task<CampusCandidateInterviedwFeedbackData> GetCampusCandidateInterviewFeedbackDetail(SearchCampusCandidateInterviewFeedbackData formData);
        Task<List<CandidateInterviewFeedbackList>> GetCandidateInterviewFeedbackList(SearchCandidateInterviewFeedback formData);
        Task<List<CampusCandidateInterviewFeedbackNew>> GetCampusCandidateInterviewFeedbackList(SearchCampusCandidateInterviewFeedback formData);
    }
}
