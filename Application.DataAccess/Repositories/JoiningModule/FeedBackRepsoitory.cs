using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.JoiningModule
{
    public class FeedBackRepsoitory : DatabaseContext, IFeedBackRepository
    {
        public FeedBackRepsoitory(AppConfiguration appConfiguration)
      : base(appConfiguration)
        { }

        public async Task<List<FeedbackQuestionType>> GetFeedbackQuestionType(FeedbackQuestionTypeSearch search)
        {
            try
            {
                List<FeedbackQuestionType> returnList = new List<FeedbackQuestionType>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackQuestionTypeId", search.FeedBackQuestionTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FeedBackQuestionType_GetAll";
                    connection.Open();
                    returnList = connection.Query<FeedbackQuestionType>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FeedBackQuestionOption>> GetFeedBackQuestionOption(FeedBackQuestionOptionSearch search)
        {
            try
            {
                List<FeedBackQuestionOption> returnList = new List<FeedBackQuestionOption>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackQuestionTypeId", search.FeedBackQuestionTypeId);
                    para.Add("@FeedBackQuestionTypeOptionId", search.FeedBackQuestionTypeOptionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FeedBackQuestionTypeOption_GetAll";
                    connection.Open();
                    returnList = connection.Query<FeedBackQuestionOption>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// GetFeedBackList - Data Access
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<List<FeedBackList>> GetFeedBackList(FeedBackListSearch search)
        {
            try
            {
                List<FeedBackList> returnList = new List<FeedBackList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackId", search.FeedBackId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FeedBackList_GetAll";
                    connection.Open();
                    returnList = connection.Query<FeedBackList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// GetFeedBackData - Data Access
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<FeedBack> GetFeedBackData(FeedBackSearch search)
        {
            try
            {
                FeedBack dataList = new FeedBack();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackId", search.FeedBackId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FeedBack_GetAll";
                    connection.Open();

                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.FeedBackMasterData = returnList.Read<FeedBackMasterData>().FirstOrDefault();
                    dataList.FeedBackQuestionDataDetails = returnList.Read<FeedBackQuestionDataDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// FeedBackSave - Data Access
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackSave(FeedBackSave formData)
        {
            try
            {
                DataTable dtQuestion = CommonUtility.ToDataTable<FeedBackQuestionData>(formData.FeedBackQuestionData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackId", formData.FeedBackId);
                    para.Add("@FeedBackName", formData.FeedBackName);
                    para.Add("@FeedBackTypeId", formData.FeedBackTypeId);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@FeedBackQuestion", dtQuestion, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    const string procName = "Usp_FeedBack_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

       
        /// <summary>
        /// FeedBackScheduleSave - Data Access Repo
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackScheduleSave(FeedBackScheduleSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackScheduleId", formData.FeedBackScheduleId);
                    para.Add("@FeedBackId", formData.FeedBackId);
                    para.Add("@FeedbackTypeId", formData.FeedBackTypeId);
                    para.Add("@NumberOfDays", formData.NumberOfDays);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_FeedBackSchedule_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// FeedBackScheduleSave - Data Access Repo
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        public async Task<FeedBackScheduleList> GetFeedBackScheduleData(FeedBackScheduleSearch search)
        {
            try
            {
                FeedBackScheduleList fdScheduleList = new FeedBackScheduleList();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackId", search.FeedBackId);
                    para.Add("@FeedbackTypeId", search.FeedbackTypeId);
                    const string procName = "Usp_FeedBackSchedule_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    fdScheduleList = returnList.Read<FeedBackScheduleList>().FirstOrDefault();
                    return await Task.FromResult(fdScheduleList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// FeedBackScheduleSave - Data Access Repo
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> DeleteFeedBackData(FeedBackScheduleSearch search)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackId", search.FeedBackId);
                    const string procName = "Usp_FeedBack_Delete";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// FeedBackAssignSave - Data Access Repo
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackAssignSave(FeedBackAssignSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FeedBackId", formData.FeedBackId);
                    para.Add("@FeedbackTypeId", formData.FeedBackTypeId);
                    //para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@TrainingTittleId", formData.trainingTittleId);
                    para.Add("@vertical", formData.vertical);
                    para.Add("@CandidateInductionScheduleDetailsId", formData.CandidateInductionScheduleDetailsId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_FeedBackAssign_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// GetCandidateFeedBackData - Data Access Repo
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<CandidateFeedBack> GetCandidateFeedBackData(CandidateFeedBackSearch search)
        {
            try
            {
                CandidateFeedBack dataList = new CandidateFeedBack();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateFeedBackList_GetAll";
                    connection.Open();

                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateFeedBackMaster = returnList.Read<CandidateFeedBackMaster>().FirstOrDefault();
                    dataList.CandidateFeedBackDetails = returnList.Read<CandidateFeedBackDetails>().ToList();

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// GetFeedBackDataCandidate - Data Access Repo
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        public async Task<FeedBackCandidate> GetFeedBackDataCandidate(FeedBackSearchCandidate search)
        {
            try
            {
                FeedBackCandidate dataList = new FeedBackCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@FeedBackId", search.FeedBackId);
                    para.Add("@CandidateInductionScheduleDetailsId", search.CandidateInductionScheduleDetailsId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CandidateFeedBack_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.FeedBackMasterDataCandidate = returnList.Read<FeedBackMasterDataCandidate>().ToList();
                    dataList.FeedBackQuestionDataDetailsCandidate = returnList.Read<FeedBackQuestionDataDetailsCandidate>().ToList();
                    //dataList.AssessmentQuestionAnswerOptionCandidate = returnList.Read<AssessmentQuestionAnswerOptionCandidate>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// FeedBackSaveCandidate - Data Access Repo
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        public async Task<ReturnMessage> FeedBackSaveCandidate(FeedBackSaveCandidate formData)
        {
            try
            {
                DataTable dtQuestionAnswer = CommonUtility.ToDataTable<FeedBackQuestionAnswerDataCandidate>(formData.FeedBackQuestionAnswerDataCandidate);
                //DataTable dtAnswer = CommonUtility.ToDataTable<AssessmentQuestionAnswerOptionCandidate>(formData.AssessmentQuestionAnswerOptionCandidate);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateFeedBackId", formData.CandidateFeedBackId);
                    para.Add("@FeedBackId", formData.FeedBackId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateInductionScheduleDetailsId", formData.CandidateInductionScheduleDetailsId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@FeedBackQuestionAnswer", dtQuestionAnswer, DbType.Object, ParameterDirection.Input, null);
                    //para.Add("@AssessmentQuestionAnswerOption", dtAnswer, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_FeedBackCandidate_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CandidateFeedbackOverallData> GetCandidateWiseFeedBackData(CandidateFeedBackSearch search)
        {
            try
            {
                CandidateFeedbackOverallData dataList = new CandidateFeedbackOverallData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateFeedbackList";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateData = returnList.Read<CandidateFeedbackMasterData>().FirstOrDefault();
                    dataList.CandidateDetailData = returnList.Read<CandidateFeedbackDetailData>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<NewJoinerFeedbackListOutput>> CandidateFeedbackReleaseListForNewJoiner(NewJoinerFeedbackListInput formData)
        {
            try
            {
                List<NewJoinerFeedbackListOutput> returnList = new List<NewJoinerFeedbackListOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CoOrdinatorId", formData.CoOrdinatorId);
                    const string procName = "Usp_CandidateFeedBackReleaseList_GetAllForNewJoiner";
                    connection.Open();
                    returnList = connection.Query<NewJoinerFeedbackListOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
