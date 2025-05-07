using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IInterviewRepository
    {
        Task<List<Interview>> GetAllInterview(SearchInterview search);
        Task<List<InterviewRoom>> GetAllInterviewRoom(SearchInterviewRoom search);
        Task<List<InterviewPanelMember>> GetAllInterviewPanelMember(SearchInterviewPanelMember search);
        Task<List<PanelMemberList>> GetAllPanelMemberList(SearchPanelMemberList search);
        Task<ReturnMessage> SaveInterviewRoom(InterviewRoomSave formData);
        Task<ReturnMessage> SaveInterviewPanelMember(InterviewPanelMemberSave formData);
        Task<List<InterviewPanelMemberMapList>> GetAllInterviewPanelMemberMapList(SearchInterviewPanelMemberMapList search);
        Task<ReturnMessage> SaveInterviewPanelMemberMapping(SaveInterviewPanelMemberMap formData);
        Task<List<InterviewStatus>> GetAllInterviewStatus(SearchInterviewStatus search);
        Task<ReturnMessage> CampusCandidateInterviewFeedbackListInsertUpdate(CampusCandidateInterviewFeedbackList formData);
    }
}
