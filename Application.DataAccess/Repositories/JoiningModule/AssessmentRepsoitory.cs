using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.PreJoiningModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Application.DataAccess.Repositories.JoiningModule
{
    public class AssessmentRepsoitory : DatabaseContext, IAssessmentRepository
    {
        public AssessmentRepsoitory(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }
        public async Task<List<AssessmentType>> GetAssessmentType(AssessmentTypeSearch search)
        {
            try
            {
                List<AssessmentType> returnList = new List<AssessmentType>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentTypeId", search.AssessmentTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_AssessmentType_GetAll";
                    connection.Open();
                    returnList = connection.Query<AssessmentType>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveAssessmentType(AssessmentType formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentTypeId", formData.AssessmentTypeId);
                    para.Add("@AssessmentTypeName", formData.AssessmentTypeName);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_AssessmentType_InsertUpdate";
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

        public async Task<List<AssessmentQuestionTypeAll>> GetAssessmentQuestionTypeAll(AssessmentQuestionTypeSearch search)
        {
            try
            {
                List<AssessmentQuestionTypeAll> returnList = new List<AssessmentQuestionTypeAll>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentQuestionTypeId", search.AssessmentQuestionTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_AssessmentQuestionType_GetAll";
                    connection.Open();
                    returnList = connection.Query<AssessmentQuestionTypeAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<AssessmentList>> GetAssessmentList(AssessmentListSearch search)
        {
            try
            {
                List<AssessmentList> returnList = new List<AssessmentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentId", search.AssessmentId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_AssessmentList_GetAll";
                    connection.Open();
                    returnList = connection.Query<AssessmentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Assessment> GetAssessmentData(AssessmentSearch search)
        {
            try
            {
                Assessment dataList = new Assessment();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentId", search.AssessmentId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Assessment_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.AssessmentMasterData = returnList.Read<AssessmentMasterData>().FirstOrDefault();
                    dataList.AssessmentQuestionDataDetails = returnList.Read<AssessmentQuestionDataDetails>().ToList();
                    dataList.AssessmentQuestionAnswerOption = returnList.Read<AssessmentQuestionAnswerOption>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> AssessmentSave(AssessmentSave formData)
        {
            try
            {
                DataTable dtQuestion = CommonUtility.ToDataTable<AssessmentQuestionData>(formData.AssessmentQuestionData);
                DataTable dtAnswer = CommonUtility.ToDataTable<AssessmentQuestionAnswerOption>(formData.AssessmentQuestionAnswerOption);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentId", formData.AssessmentId);
                    para.Add("@AssessmentName", formData.AssessmentName);
                    para.Add("@AssessmentTypeId", formData.AssessmentTypeId);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AssessmentQuestion", dtQuestion, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AssessmentQuestionAnswerOption", dtAnswer, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_Assessment_InsertUpdate";
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

        public async Task<List<IndusctionTraningList>> GetIndusctionTraningList(IndusctionTraningListSearch search)
        {
            try
            {
                List<IndusctionTraningList> returnList = new List<IndusctionTraningList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_InductionTraningList_GetAll";
                    connection.Open();
                    returnList = connection.Query<IndusctionTraningList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> AssessmentAssignSave(AssessmentAssignSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentId", formData.AssessmentId);
                    //para.Add("@BatchId", formData.BatchId);
                    para.Add("@TrainingTittleId", formData.TrainingTittleId);
                    para.Add("@vertical", formData.vertical);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CandidateInductionScheduleDetailsId", formData.CandidateInductionScheduleDetailsId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_AssessmentAssign_InsertUpdate";
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

        public async Task<ReturnMessage> InductionProgrammeCoOrdinatiorAssignSave(InductionProgrammeCoOrdinatiorAssign formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionProgrammeCoOrdinatiorAssignId", formData.InductionProgrammeCoOrdinatiorAssignId);
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CoOrdinatiorId", formData.CoOrdinatiorId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_InductionProgrammeCoOrdinatiorAssign_InsertUpdate";
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

        public async Task<List<InductionProgrammeCoOrdinatiorAssigned>> InductionProgrammeCoOrdinatiorAssignedGet(InductionProgrammeCoOrdinatiorAssignedSearch search)
        {
            try
            {
                List<InductionProgrammeCoOrdinatiorAssigned> returnList = new List<InductionProgrammeCoOrdinatiorAssigned>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_InductionProgrammeCoOrdinatiorAssigned_GetAll";
                    connection.Open();
                    returnList = connection.Query<InductionProgrammeCoOrdinatiorAssigned>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<BatchReleaseListGetAll>> BatchReleaseListGetAll(BatchReleaseListGetAllSearch search)
        {
            try
            {
                List<BatchReleaseListGetAll> returnList = new List<BatchReleaseListGetAll>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchNo", search.BatchNo);
                    para.Add("@CoOrdinatorId", search.CoOrdinatiorId);
                    para.Add("@AssesmentStatus", search.AssesmentStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@VerticalId", search.VerticalId);
                    const string procName = "Usp_BatchesAssementReleaseList_GetAll";
                    connection.Open();
                    returnList = connection.Query<BatchReleaseListGetAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AssessementAssignReleaseList>> AssessementAssignReleaseList(AssessementAssignReleaseListSearch search)
        {
            try
            {
                List<AssessementAssignReleaseList> returnList = new List<AssessementAssignReleaseList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_AssementAssignReleaseList_GetAll";
                    connection.Open();
                    returnList = connection.Query<AssessementAssignReleaseList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AssessementAssignReleaseList>> AssessementAssignReReleaseList(AssessementAssignReleaseListSearch search)
        {
            try
            {
                List<AssessementAssignReleaseList> returnList = new List<AssessementAssignReleaseList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_AssementAssignReReleaseList_byCandidateIds";
                    connection.Open();
                    returnList = connection.Query<AssessementAssignReleaseList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<FeedbackAssignReleaseList>> GetEvaluateFeedbackReRelease(FeedbackAssignReleaseListSearch search)
        {
            try
            {
                List<FeedbackAssignReleaseList> returnList = new List<FeedbackAssignReleaseList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_FeedbackAssignReReleaseList_byCandidateIds";
                    connection.Open();
                    returnList = connection.Query<FeedbackAssignReleaseList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> AssementAssignReleaseSave(AssementAssignReleaseSave formData)
        {
            try
            {
                DataTable dtAssmentDate = CommonUtility.ToDataTable<AssessementAssignReleaseDetails>(formData.AssessementAssignReleaseDetails);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();//Piu
                List<CandidateListOnBoarding> batchCandidateList = new List<CandidateListOnBoarding>();//Piu
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AssessmentAssignRelease", dtAssmentDate, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_AssementAssignRelease_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)//Piu
                    {
                        var batchCandidate = new DynamicParameters();
                        batchCandidate.Add("@BatchId", formData.BatchId);
                        const string batchCandidateProcName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                        batchCandidateList = connection.Query<CandidateListOnBoarding>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 78);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        if (emailTemplateBodyList.Count > 0)
                        {
                            foreach (var items in batchCandidateList)
                            {
                                if (items.EmailId != "")
                                {
                                    foreach (var item in formData.TrainingTitle)
                                    {
                                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                        EmailBody = EmailBody.Replace("@~@EmpName", items.CandidateFullName);
                                        EmailBody = EmailBody.Replace("@~@EmpNo", items.EmpNp);
                                        EmailBody = EmailBody.Replace("@~@Password", formData.Password);
                                        EmailBody = EmailBody.Replace("@~@TrainingTitle", item.TrainingTitle);
                                        // CommonUtility.sendEmailViaWebApi(items.EmailId, "Complete  Assessment "+item.TrainingTitle+" - MRF Limited", EmailBody);
                                        IDbConnection db = base.GetConnection();
                                        db.Open();
                                        CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 31, 103, items.EmailId, EmailBody, "Complete  Assessment " + item.TrainingTitle + " - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                        db.Close();
                                    }
                                }
                            }
                        }
                    }//Piu
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> FeedbackAssignReleaseSave(FeedbackAssignReleaseSave formData)
        {
            try
            {
                DataTable dtAssmentDate = CommonUtility.ToDataTable<FeedbackAssignReleaseDetails>(formData.FeedbackAssignReleaseDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@FeedbackAssignRelease", dtAssmentDate, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_FeedbackAssignRelease_InsertUpdate";
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

        public async Task<ReturnMessage> AssementAssignReleaseSaveForCandidate(AssementAssignReleaseSaveCandiddate formData)
        {
            try
            {
                DataTable dtAssmentDate = CommonUtility.ToDataTable<AssessementAssignReleaseDetailsCandidate>(formData.AssessementAssignReleaseDetails);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidateListOnBoarding> batchCandidateList = new List<CandidateListOnBoarding>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();                    
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@batchid", formData.BatchId);
                    para.Add("@AssessmentAssignRelease", dtAssmentDate, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_AssementAssignRelease_InsertUpdateForCandidate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var batchCandidate = new DynamicParameters();
                        batchCandidate.Add("@BatchId", formData.BatchId);
                        const string batchCandidateProcName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                        batchCandidateList = connection.Query<CandidateListOnBoarding>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 78);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        if (emailTemplateBodyList.Count > 0)
                        {
                            foreach (var items in batchCandidateList)
                            {
                                if (items.EmailId != "")
                                {
                                    foreach (var item in formData.TrainingTitle)
                                    {
                                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                        EmailBody = EmailBody.Replace("@~@EmpName", items.CandidateFullName);
                                        EmailBody = EmailBody.Replace("@~@EmpNo", items.EmpNp);
                                        EmailBody = EmailBody.Replace("@~@Password", formData.Password);
                                        EmailBody = EmailBody.Replace("@~@TrainingTitle", item.TrainingTitle);
                                        //CommonUtility.sendEmailViaWebApi(items.EmailId, "Complete  Assessment " + item.TrainingTitle + " - MRF Limited", EmailBody);
                                        IDbConnection db = base.GetConnection();
                                        db.Open();
                                        CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 32, 86, items.EmailId, EmailBody, "Complete  Assessment " + item.TrainingTitle + " - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                        db.Close();

                                    }
                                }
                            }
                        }
                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> FeedbackAssignReleaseSaveForCandidate(FeedBackAssignReleaseSaveCandiddate formData)
        {
            try
            {
                DataTable dtAssmentDate = CommonUtility.ToDataTable<FeedbackAssignReleaseDetailsCandidate>(formData.FeedBackAssignReleaseDetails);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidateListOnBoarding> batchCandidateList = new List<CandidateListOnBoarding>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@batchid", formData.BatchId);
                    para.Add("@FeedbackAssignRelease", dtAssmentDate, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_FeedbackAssignRelease_InsertUpdateForCandidate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    //if (rm.SuccessFlag == 1)
                    //{
                    //    var batchCandidate = new DynamicParameters();
                    //    batchCandidate.Add("@BatchId", formData.BatchId);
                    //    const string batchCandidateProcName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                    //    batchCandidateList = connection.Query<CandidateListOnBoarding>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                    //    var emailTemplateParam = new DynamicParameters();
                    //    emailTemplateParam.Add("@TemplateTypeId", 78);
                    //    emailTemplateParam.Add("@TemplateId", null);
                    //    emailTemplateParam.Add("@IsActive", true);
                    //    const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                    //    emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                    //    if (emailTemplateBodyList.Count > 0)
                    //    {
                    //        foreach (var items in batchCandidateList)
                    //        {
                    //            if (items.EmailId != "")
                    //            {
                    //                foreach (var item in formData.TrainingTitle)
                    //                {
                    //                    string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                    //                    EmailBody = EmailBody.Replace("@~@EmpName", items.CandidateFullName);
                    //                    EmailBody = EmailBody.Replace("@~@EmpNo", items.EmpNp);
                    //                    EmailBody = EmailBody.Replace("@~@Password", formData.Password);
                    //                    EmailBody = EmailBody.Replace("@~@TrainingTitle", item.TrainingTitle);
                    //                    CommonUtility.sendEmailViaWebApi(items.EmailId, "Complete  Assessment " + item.TrainingTitle + " - MRF Limited", EmailBody);
                    //                }
                    //            }
                    //        }
                    //    }
                    //}
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> DeleteAssessment(DeleteAssessmentSearch search)
        {
            try
            {                
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AssessmentId", search.AssessmentId);
                    const string procName = "Usp_InductionAssessment_Delete";
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


        public async Task<CandidateAssessmentReleaseListForNewJoinerlist> CandidateAssessmentReleaseListGetAll(CandidateAssessmentReleaseListSearch search)
        {
            try
            {
                CandidateAssessmentReleaseListForNewJoinerlist dataList = new CandidateAssessmentReleaseListForNewJoinerlist();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@Name", search.Name);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@Location", search.Location);
                    para.Add("@Function", search.Function);
                    para.Add("@AssesmentStatus", search.AssesmentStatus);
                    para.Add("@CoOrdinatorId", search.CoOrdinatorId);
                    para.Add("@VerticalId", search.VerticalId);
                    const string procName = "Usp_CandidateAssessmentReleaseList_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateAssessmentReleaseList = returnList.Read<CandidateAssessmentReleaseList>().ToList();
                    dataList.CandidateWiseAssesment = returnList.Read<CandidateWiseAssesment>().ToList();
                    dataList.CandidateWiseFeedback = returnList.Read<CandidateWiseFeedback>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<CandidateAssessmentReleaseListForNewJoinerlist> CandidateAssessmentReleaseListGetAllforNewJoinerList(CandidateAssessmentReleaseListSearch search)
        {
            try
            {
                CandidateAssessmentReleaseListForNewJoinerlist dataList = new CandidateAssessmentReleaseListForNewJoinerlist();
               //List<CandidateAssessmentReleaseList> CandidateAssessmentReleaseList = new List<CandidateAssessmentReleaseList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@Name", search.Name);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@Location", search.Location);
                    para.Add("@Function", search.Function);
                    para.Add("@AssesmentStatus", search.AssesmentStatus);
                    para.Add("@CoOrdinatorId", search.CoOrdinatorId);
                    para.Add("@VerticalId", search.VerticalId);
                    const string procName = "Usp_CandidateAssessmentReleaseList_GetAllForNewJoiner";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateAssessmentReleaseList = returnList.Read<CandidateAssessmentReleaseList>().ToList();
                    dataList.CandidateWiseAssesment = returnList.Read<CandidateWiseAssesment>().ToList();
                    dataList.CandidateWiseFeedback = returnList.Read<CandidateWiseFeedback>().ToList();
                    //returnList = connection.Query<CandidateAssessmentReleaseListForNewJoinerlist>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CandidateAssessment> GetCandidateAssessmentData(CandidateAssessmentSearch search)
        {
            try
            {
                CandidateAssessment dataList = new CandidateAssessment();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateAssessmentList_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateAssessmentMaster = returnList.Read<CandidateAssessmentMaster>().FirstOrDefault();
                    dataList.CandidateAssessmentDetails = returnList.Read<CandidateAssessmentDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AssessmentCandidate> GetAssessmentDataCandidate(AssessmentSearchCandidate search)
        {
            try
            {
                AssessmentCandidate dataList = new AssessmentCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@AssessmentId", search.AssessmentId);
                    para.Add("@CandidateInductionScheduleDetailsId", search.CandidateInductionScheduleDetailsId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CandidateAssessment_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.AssessmentMasterDataCandidate = returnList.Read<AssessmentMasterDataCandidate>().FirstOrDefault();
                    dataList.AssessmentQuestionDataDetailsCandidate = returnList.Read<AssessmentQuestionDataDetailsCandidate>().ToList();
                    dataList.AssessmentQuestionAnswerOptionCandidate = returnList.Read<AssessmentQuestionAnswerOptionCandidate>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> AssessmentSaveCandidate(AssessmentSaveCandidate formData)
        {
            try
            {
                DataTable dtQuestion = CommonUtility.ToDataTable<AssessmentQuestionDataCandidate>(formData.AssessmentQuestionDataCandidate);
                DataTable dtAnswer = CommonUtility.ToDataTable<AssessmentQuestionAnswerOptionCandidate>(formData.AssessmentQuestionAnswerOptionCandidate);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateAssessmentId", formData.CandidateAssessmentId);
                    para.Add("@AssessmentId", formData.AssessmentId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateInductionScheduleDetailsId", formData.CandidateInductionScheduleDetailsId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AssessmentQuestion", dtQuestion, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AssessmentQuestionAnswerOption", dtAnswer, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_AssessmentCandidate_Insert";
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

        public async Task<BatchesAssementEvaluateList> GetEvaluateAssessmentBatchList(BatchesAssementEvaluateListSearch search)
        {
            try
            {
                BatchesAssementEvaluateList dataList = new BatchesAssementEvaluateList();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CoOrdinatorId", search.CoOrdinatiorId);
                    const string procName = "Usp_BatchesAssementEvaluateList_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.BatchesAssementEvaluateListMatster = returnList.Read<BatchesAssementEvaluateListMatster>().FirstOrDefault();
                    dataList.BatchesAssementEvaluateDetailsList = returnList.Read<BatchesAssementEvaluateDetailsList>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<BatchesFeedbackList> GetEvaluateFeedbackBatchList(BatchesFeedbackListSearch search)
        {
            try
            {
                BatchesFeedbackList dataList = new BatchesFeedbackList();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CoOrdinatorId", search.CoOrdinatiorId);
                    const string procName = "Usp_BatchesAssementFeedback_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.BatchesFeedbackListMatster = returnList.Read<BatchesFeedbackListMatster>().FirstOrDefault();
                    dataList.BatchesFeedbackDetailsList = returnList.Read<BatchesFeedbackDetailsList>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CandidateEvaluation> GetCandidateAssessmentEvaluation(CandidateEvaluationSearch search)
        {
            try
            {
                CandidateEvaluation dataList = new CandidateEvaluation();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@AssessmentId", search.AssessmentId);
                    para.Add("@CandidateInductionScheduleDetailsId", search.CandidateInductionScheduleDetailsId);
                    const string procName = "Usp_CandidateAssessmentEvaluation_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateEvaluationMaster = returnList.Read<CandidateEvaluationMaster>().FirstOrDefault();
                    dataList.CandidateEvaluationQuestionMaster = returnList.Read<CandidateEvaluationQuestionMaster>().ToList();
                    dataList.CandidateEvaluationQuestionAnswer = returnList.Read<CandidateEvaluationQuestionAnswer>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CandidateAssessmentEvaluationSave(CandidateEvaluationSave formData)
        {
            try
            {
                DataTable dtAnswer = CommonUtility.ToDataTable<CandidateEvaluationAnswerSave>(formData.CandidateEvaluationAnswerSave);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CandidateAssessmentQuestionEvaluation", dtAnswer, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CandidateAssessmentEvaluation_InsertUpdate";
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

        public async Task<List<CandidateScore>> GetCandidateEvaluationAnswerScore(CandidateEvaluationSave formData)
        {
            try
            {
                List<CandidateScore> dataList = new List<CandidateScore>();
                DataTable dtAnswer = CommonUtility.ToDataTable<CandidateEvaluationAnswerSave>(formData.CandidateEvaluationAnswerSave);
                
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CandidateAssessmentQuestionEvaluation", dtAnswer, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CandidateAssessmentEvaluation_Score";
                    connection.Open();
                    dataList = connection.Query<CandidateScore>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CandidateEvaluationUploadView> CandidateEvaluationUploadGet(CandidateEvaluationUploadViewSearch search)
        {
            try
            {
                CandidateEvaluationUploadView dataList = new CandidateEvaluationUploadView();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateAssessmentId", search.CandidateAssessmentId);
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateInductionScheduleDetailsId", search.CandidateInductionScheduleDetailsId);
                    const string procName = "Usp_CandidateAssessmentEvalutaionUpload_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateEvaluationUploadViewMaster = returnList.Read<CandidateEvaluationUploadViewMaster>().FirstOrDefault();
                    dataList.CandidateEvaluationUploadDetailsView = returnList.Read<CandidateEvaluationUploadDetailsView>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CandidateEvaluationUploadSave(CandidateEvaluationUploadSave formData)
        {
            try
            {
                DataTable dtDEtails = CommonUtility.ToDataTable<CandidateEvaluationUploadDetailsSave>(formData.CandidateEvaluationUploadDetailsSave);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateAssessmentId", formData.CandidateAssessmentId);
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CandidateInductionScheduleDetailsId", formData.CandidateInductionScheduleDetailsId);
                    para.Add("@FilePath", formData.FilePath);
                    para.Add("@CandidateAssessmentEvalutaionUploadDetails", dtDEtails, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateAssessmentEvalutaionUpload_InsertUpdate";
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

        public async Task<CandidateAssessmentSummary> CandidateAssessmentSummaryGet(CandidateAssessmentSummarySearch search)
        {
            try
            {
                CandidateAssessmentSummary dataList = new CandidateAssessmentSummary();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CoOrdinatorId", search.CoOrdinatorId);
                    para.Add("@IsReassigned", search.IsReassigned);
                    // const string procName = "Usp_AssessmentSummary_GetAll";  // Previouse 
                    const string procName = "Usp_Get_BatchAndIndividualCandidate_AssessmentSummary";  //  Added By anif 12-12-2022
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateAssessmentSummaryShow = returnList.Read<CandidateAssessmentSummaryShow>().ToList();
                    dataList.CandidateAssessmentSummaryDetails = returnList.Read<CandidateAssessmentSummaryDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            } 
        }

        public async Task<CandidateAssessmentSummaryPending> CandidateAssessmentSummaryPendingListGet(CandidateAssessmentSummaryPendingSearch search)
        {
            try
            {
                CandidateAssessmentSummaryPending dataList = new CandidateAssessmentSummaryPending();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CoOrdinatorId", search.CoOrdinatorId);
                    const string procName = "Usp_Get_BatchAndIndividualCandidate_Pendinglist";  
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateAssessmentSummaryShowPending = returnList.Read<CandidateAssessmentSummaryShowPending>().ToList();
                    dataList.CandidateAssessmentSummaryPendingDetails = returnList.Read<CandidateAssessmentSummaryPendingDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CandidateAssessmentSummarySave(CandidateAssessmentSummarySave formData)
        {
            try
            {
                DataTable dtDEtails = CommonUtility.ToDataTable<CandidateAssessmentSummaryDetailsSave>(formData.CandidateAssessmentSummaryDetailsSave);
                DataTable detallist = CommonUtility.ToDataTable<Detaillist>(formData.Detaillist);
                List<EmailIds> emailidsList = new List<EmailIds>();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();//Piu
                List<CandidateListOnBoarding> batchCandidateList = new List<CandidateListOnBoarding>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@AssessmentEvaluationSummaryDetails", dtDEtails, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_AssessmentSummary_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)//Piu
                    {
                        var batchCandidate = new DynamicParameters();
                        batchCandidate.Add("@BatchId", formData.BatchId);
                        const string batchCandidateProcName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                        batchCandidateList = connection.Query<CandidateListOnBoarding>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                        var emailids = new DynamicParameters();
                        const string emailidsProcName = "Usp_OMEmailId_GetAll";
                        emailidsList = connection.Query<EmailIds>(emailidsProcName, emailids, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 99);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        if (emailTemplateBodyList.Count > 0)
                        {
                            foreach (var items in emailidsList)
                            {
                                if (items.EmpEmailId != "")
                                {
                                    foreach (var item in formData.Detaillist)
                                    {
                                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                        EmailBody = EmailBody.Replace("@~@NameOfTrainee", item.CandidateFullName);
                                        EmailBody = EmailBody.Replace("@~@EmpNo", item.EmpNo);
                                        EmailBody = EmailBody.Replace("@~@Age", item.Age.ToString());
                                        EmailBody = EmailBody.Replace("@~@Qualification", item.QualificationName);
                                        EmailBody = EmailBody.Replace("@~@Function", item.FunctionName);
                                        EmailBody = EmailBody.Replace("@~@Department", item.DepartmentName);
                                        EmailBody = EmailBody.Replace("@~@Designation", item.DesignationName);
                                        EmailBody = EmailBody.Replace("@~@Grade", item.GradeName);
                                        EmailBody = EmailBody.Replace("@~@Location", item.LocationName);
                                        EmailBody = EmailBody.Replace("@~@WorkArea", item.WorkAreaName);
                                        EmailBody = EmailBody.Replace("@~@TrainingLocation", item.TraingLocationName);
                                        //CommonUtility.sendEmailViaWebApi(items.EmpEmailId, "New Joiners Assessment Summary - MRF Limited", EmailBody);
                                        IDbConnection db = base.GetConnection();
                                        db.Open();
                                        CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 33, 103, items.EmpEmailId, EmailBody, "New Joiners Assessment Summary - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                        db.Close();
                                    }
                                }
                            }
                        }
                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> CandidateAssessmentSummarySaveIndividual(CandidateAssessmentSummarySave formData)
        {
            try
            {
                DataTable dtDEtails = CommonUtility.ToDataTable<CandidateAssessmentSummaryDetailsSave>(formData.CandidateAssessmentSummaryDetailsSave);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@AssessmentEvaluationSummaryDetails", dtDEtails, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_AssessmentSummaryIndividual_InsertUpdate";
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
        public async Task<CandidateAssessmentEvaluationView> GetCandidateAssessmentEvaluationView(CandidateAssessmentEvaluationViewSearch search)
        {
            try
            {
                CandidateAssessmentEvaluationView dataList = new CandidateAssessmentEvaluationView();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateAssessmentEvaluationView_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateAssessmentEvaluationMaster = returnList.Read<CandidateAssessmentEvaluationMaster>().FirstOrDefault();
                    dataList.CandidateEvaluationQuestionShowData = returnList.Read<CandidateEvaluationQuestionShowData>().ToList();
                    dataList.CandidateEvaluationAnswerData = returnList.Read<CandidateEvaluationAnswerData>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<UploadedAssessmentList>> GetUploadedAssessmentEvaluation(UploadedAssessmentSearch search)
        {
            try
            {
                List<UploadedAssessmentList> returnList = new List<UploadedAssessmentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@EmployeeNo", search.EmployeeNo);
                    para.Add("@AssessmentId", search.AssessmentId);
                    const string procName = "Usp_GetUploadedAssessmentEvaluation";
                    connection.Open();
                    returnList = connection.Query<UploadedAssessmentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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



