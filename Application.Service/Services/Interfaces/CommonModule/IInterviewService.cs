using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IInterviewService
    {
        Task<List<Interview>> GetAllInterview(SearchInterview search);
        Task<List<InterviewRoom>> GetAllInterviewRoom(SearchInterviewRoom search);
        Task<List<InterviewPanelMember>> GetAllInterviewPanelMember(SearchInterviewPanelMember search);
        Task<List<PanelMemberList>> GetAllPanelMemberList(SearchPanelMemberList search);
        Task<ReturnMessage> SaveInterviewRoom(InterviewRoomSave formdata);
        Task<ReturnMessage> SaveInterviewPanelMember(InterviewPanelMemberSave formdata);
        Task<List<InterviewPanelMemberMapList>> GetAllInterviewPanelMemberMapList(SearchInterviewPanelMemberMapList search);
        Task<ReturnMessage> SaveInterviewPanelMemberMapping(SaveInterviewPanelMemberMap formdata);
        Task<List<InterviewStatus>> GetAllInterviewStatus(SearchInterviewStatus search);
        Task<ReturnMessage> CampusCandidateInterviewFeedbackListInsertUpdate(CampusCandidateInterviewFeedbackList formdata);
    }
}
