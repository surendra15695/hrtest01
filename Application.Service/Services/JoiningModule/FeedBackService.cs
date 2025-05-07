using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.Service.Services.JoiningModule
{
    public class FeedBackService : IFeedBackService
    {
        private readonly IFeedBackRepository feedbackrepository;
        public FeedBackService(IFeedBackRepository feedbackrepository)
        {
            this.feedbackrepository = feedbackrepository;
        }

        public async Task<List<FeedbackQuestionType>> GetFeedbackQuestionType(FeedbackQuestionTypeSearch Param)
        {
            return await this.feedbackrepository.GetFeedbackQuestionType(Param);
        }

        public async Task<List<FeedBackQuestionOption>> GetFeedBackQuestionOption(FeedBackQuestionOptionSearch Param)
        {
            return await this.feedbackrepository.GetFeedBackQuestionOption(Param);
        }

        /// <summary>
        /// GetFeedBackList service
        /// </summary>
        /// <param name="Param"></param>
        /// <returns></returns>
        public async Task<List<FeedBackList>> GetFeedBackList(FeedBackListSearch Param)
        {
            return await this.feedbackrepository.GetFeedBackList(Param);
        }

        /// <summary>
        /// GetFeedBackData Service
        /// </summary>
        /// <param name="Param"></param>
        /// <returns></returns>
        public async Task<FeedBack> GetFeedBackData(FeedBackSearch Param)
        {
            return await this.feedbackrepository.GetFeedBackData(Param);
        }

        /// <summary>
        /// FeedBackSave Service
        /// </summary>
        /// <param name="formdata"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackSave(FeedBackSave formdata)
        {
            return await this.feedbackrepository.FeedBackSave(formdata);
        }

        /// <summary>
        /// FeedBackAssignSave - Service
        /// </summary>
        /// <param name="formdata"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackAssignSave(FeedBackAssignSave formdata)
        {
            return await this.feedbackrepository.FeedBackAssignSave(formdata);
        }

        /// <summary>
        /// FeedBackScheduleSave - Service
        /// </summary>
        /// <param name="formdata"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackScheduleSave(FeedBackScheduleSave formdata)
        {
            return await this.feedbackrepository.FeedBackScheduleSave(formdata);
        }


        /// <summary>
        /// FeedBackScheduleSave - Service
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns> 
        public async Task<FeedBackScheduleList> GetFeedBackScheduleData(FeedBackScheduleSearch search)
        {
            return await this.feedbackrepository.GetFeedBackScheduleData(search);
        }

        /// <summary>
        /// FeedBackScheduleSave - Service
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns> 
        public async Task<ReturnMessage> DeleteFeedBackData(FeedBackScheduleSearch search)
        {
            return await this.feedbackrepository.DeleteFeedBackData(search);
        }

        /// <summary>
        /// GetCandidateFeedBackData - Service
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<CandidateFeedBack> GetCandidateFeedBackData(CandidateFeedBackSearch search)
        {
            return await this.feedbackrepository.GetCandidateFeedBackData(search);
        }

        /// <summary>
        /// GetFeedBackDataCandidate - Service
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<FeedBackCandidate> GetFeedBackDataCandidate(FeedBackSearchCandidate search)
        {
            return await this.feedbackrepository.GetFeedBackDataCandidate(search);
        }

        /// <summary>
        /// FeedBackSaveCandidate - Service
        /// </summary>
        /// <param name="formdata"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackSaveCandidate(FeedBackSaveCandidate formdata)
        {
            return await this.feedbackrepository.FeedBackSaveCandidate(formdata);
        }

        public async Task<CandidateFeedbackOverallData> GetCandidateWiseFeedBackData(CandidateFeedBackSearch search)
        {
            return await this.feedbackrepository.GetCandidateWiseFeedBackData(search);
        }
        public async Task<List<NewJoinerFeedbackListOutput>> CandidateFeedbackReleaseListForNewJoiner(NewJoinerFeedbackListInput search)
        {
            return await this.feedbackrepository.CandidateFeedbackReleaseListForNewJoiner(search);
        }
    }
}
