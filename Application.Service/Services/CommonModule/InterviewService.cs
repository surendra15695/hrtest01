using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class InterviewService : IInterviewService
    {
        private readonly IInterviewRepository interviewRepository;

        public InterviewService(IInterviewRepository interviewRepository)
        {
            this.interviewRepository = interviewRepository;
        }
        public async Task<List<Interview>> GetAllInterview(SearchInterview search)
        {
            return await this.interviewRepository.GetAllInterview(search);
        }

        public async Task<List<InterviewRoom>> GetAllInterviewRoom(SearchInterviewRoom search)
        {
            return await this.interviewRepository.GetAllInterviewRoom(search);
        }

        public async Task<List<InterviewPanelMember>> GetAllInterviewPanelMember(SearchInterviewPanelMember search)
        {
            return await this.interviewRepository.GetAllInterviewPanelMember(search);
        }
        public async Task<List<PanelMemberList>> GetAllPanelMemberList(SearchPanelMemberList search)
        {
            return await this.interviewRepository.GetAllPanelMemberList(search);
        }

        public async Task<ReturnMessage> SaveInterviewRoom(InterviewRoomSave formData)
        {
            return await this.interviewRepository.SaveInterviewRoom(formData);
        }

        public async Task<ReturnMessage> SaveInterviewPanelMember(InterviewPanelMemberSave formData)
        {
            return await this.interviewRepository.SaveInterviewPanelMember(formData);
        }
        public async Task<List<InterviewPanelMemberMapList>> GetAllInterviewPanelMemberMapList(SearchInterviewPanelMemberMapList search)
        {
            return await this.interviewRepository.GetAllInterviewPanelMemberMapList(search);
        }
        public async Task<ReturnMessage> SaveInterviewPanelMemberMapping(SaveInterviewPanelMemberMap formData)
        {
            return await this.interviewRepository.SaveInterviewPanelMemberMapping(formData);
        }
        public async Task<List<InterviewStatus>> GetAllInterviewStatus(SearchInterviewStatus search)
        {
            return await this.interviewRepository.GetAllInterviewStatus(search);
        }
        public async Task<ReturnMessage> CampusCandidateInterviewFeedbackListInsertUpdate(CampusCandidateInterviewFeedbackList formData)
        {
            return await this.interviewRepository.CampusCandidateInterviewFeedbackListInsertUpdate(formData);
        }
    }
}
