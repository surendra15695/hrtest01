using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.JoiningModule
{
    public interface IFeedBackRepository
    {
        Task<List<FeedbackQuestionType>> GetFeedbackQuestionType(FeedbackQuestionTypeSearch search);
        Task<List<FeedBackQuestionOption>> GetFeedBackQuestionOption(FeedBackQuestionOptionSearch search);
        Task<List<FeedBackList>> GetFeedBackList(FeedBackListSearch search);
        Task<FeedBack> GetFeedBackData(FeedBackSearch search);
        Task<ReturnMessage> FeedBackSave(FeedBackSave formdata);
        Task<ReturnMessage> FeedBackAssignSave(FeedBackAssignSave formdata);
        Task<ReturnMessage> FeedBackScheduleSave(FeedBackScheduleSave formdata);
        Task<FeedBackScheduleList> GetFeedBackScheduleData(FeedBackScheduleSearch search);
        Task<ReturnMessage> DeleteFeedBackData(FeedBackScheduleSearch search);
        Task<CandidateFeedBack> GetCandidateFeedBackData(CandidateFeedBackSearch search);
        Task<FeedBackCandidate> GetFeedBackDataCandidate(FeedBackSearchCandidate search);
        Task<ReturnMessage> FeedBackSaveCandidate(FeedBackSaveCandidate formdata);
        Task<CandidateFeedbackOverallData> GetCandidateWiseFeedBackData(CandidateFeedBackSearch search);
        Task<List<NewJoinerFeedbackListOutput>> CandidateFeedbackReleaseListForNewJoiner(NewJoinerFeedbackListInput formData);


    }
}
