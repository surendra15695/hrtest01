using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.SelectionModule
{
    public class InterviewCalendarActionRepository : DatabaseContext, IInterviewCalendarActionRepository
    {
        public InterviewCalendarActionRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public async Task<List<InterviewCalendarList>> GetPanelistCalendar(SearchInterviewCalendar formData)
        {
            try
            {
                List<InterviewCalendarList> dataList = new List<InterviewCalendarList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@VenueId", formData.VenueId);
                    para.Add("@InterviewTypeId", formData.InterviewTypeId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AcceptStatus", formData.AcceptStatus);
                    const string procName = "Usp_PanelistCalendar_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewCalendarList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<MyCalendarList>> GetCalendarList(SearchMyCalendar formData)
        {
            try
            {
                List<MyCalendarList> dataList = new List<MyCalendarList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@VenueId", formData.VenueId);
                    para.Add("@InterviewTypeId", formData.InterviewTypeId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AcceptStatus", formData.AcceptStatus);
                    const string procName = "Usp_PanelistCalendar_CandidateCount_GetAll";
                    connection.Open();
                    dataList = connection.Query<MyCalendarList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InterviewCalendarActionInsert(InterviewCalendarActionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CalendarIds", formData.CalendarIds);
                    para.Add("@AcceptStatus", formData.AcceptStatus);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_InterviewCalendarAction_Insert";
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

        public async Task<ReturnMessage> AddInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidadateDetailsForEmail> candidateEmailDetails = new List<CandidadateDetailsForEmail>();
                DataTable dtObject = CommonUtility.ToDataTable<InterviewCalendarAssessmentListData>(formData.InterviewCalendarAssessmentData);
                var candidateIds = formData.CandidateIds.Split(",");
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarAssessment", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CalendarAssessment_InsertUpdate";
                    connection.Open();

                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (rm.SuccessFlag == 1)
                    {
                        foreach (var item in candidateIds)
                        {
                            var candidateEmailParameter = new DynamicParameters();
                            candidateEmailParameter.Add("@CandidateId", Convert.ToInt64(item));
                            candidateEmailParameter.Add("@CandidateNo", null);
                            const string candidateDFetailsProcName = "Usp_Get_CandidateDetailsForEmail";
                            candidateEmailDetails = connection.Query<CandidadateDetailsForEmail>(candidateDFetailsProcName, candidateEmailParameter, commandType: CommandType.StoredProcedure).ToList();
                            if (candidateEmailDetails.Count > 0)
                            {
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 21);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                //connection.Open();
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", candidateEmailDetails[0].FullName);
                                EmailBody = EmailBody.Replace("@~@userId", candidateEmailDetails[0].CandidateNo);

                                //CommonUtility.sendEmailViaWebApi(candidateEmailDetails[0].EmailId, "Interview Feedback - MRF Limited", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(item), 0, 0, 28, 13, candidateEmailDetails[0].EmailId, EmailBody, "Interview Feedback - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                db.Close();

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
        public async Task<ReturnMessage> AddInterviewCalendarAssessmentWithPDFGeneration(InterviewCalendarAssessmentFormDataWithPDFGeneration formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidadateDetailsForEmail> candidateEmailDetails = new List<CandidadateDetailsForEmail>();
                DataTable dtObject = CommonUtility.ToDataTable<InterviewCalendarAssessmentListDataWithPDFGeneration>(formData.InterviewCalendarAssessmentData);
                var candidateIds = formData.CandidateIds.Split(",");
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarAssessment", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CalendarAssessmentWithPDFGeneration_InsertUpdate";
                    connection.Open();

                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (rm.SuccessFlag == 1)
                    {
                        foreach (var item in candidateIds)
                        {
                            var candidateEmailParameter = new DynamicParameters();
                            candidateEmailParameter.Add("@CandidateId", Convert.ToInt64(item));
                            candidateEmailParameter.Add("@CandidateNo", null);
                            const string candidateDFetailsProcName = "Usp_Get_CandidateDetailsForEmail";
                            candidateEmailDetails = connection.Query<CandidadateDetailsForEmail>(candidateDFetailsProcName, candidateEmailParameter, commandType: CommandType.StoredProcedure).ToList();
                            if (candidateEmailDetails.Count > 0)
                            {
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 21);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                //connection.Open();
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", candidateEmailDetails[0].FullName);
                                EmailBody = EmailBody.Replace("@~@userId", candidateEmailDetails[0].CandidateNo);

                                CommonUtility.sendEmailViaWebApi(candidateEmailDetails[0].EmailId, "Interview Feedback - MRF Limited", EmailBody); //NEED TO OPEN

                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(item), 0, 0, 30, 103, candidateEmailDetails[0].EmailId, EmailBody, "Interview Feedback - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
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

        public async Task<ReturnMessage> AddCampusInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidadateDetailsForEmail> candidateEmailDetails = new List<CandidadateDetailsForEmail>();
                DataTable dtObject = CommonUtility.ToDataTable<InterviewCalendarAssessmentListData>(formData.InterviewCalendarAssessmentData);
                var candidateIds = formData.CandidateIds.Split(",");
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarAssessment", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCalendarAssessment_InsertUpdate";
                    connection.Open();

                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (rm.SuccessFlag == 1)
                    {
                        foreach (var item in candidateIds)
                        {
                            var candidateEmailParameter = new DynamicParameters();
                            candidateEmailParameter.Add("@CandidateId", Convert.ToInt64(item));
                            candidateEmailParameter.Add("@CandidateNo", null);
                            const string candidateDFetailsProcName = "Usp_Get_CandidateDetailsForEmail";
                            candidateEmailDetails = connection.Query<CandidadateDetailsForEmail>(candidateDFetailsProcName, candidateEmailParameter, commandType: CommandType.StoredProcedure).ToList();
                            if (candidateEmailDetails.Count > 0)
                            {
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 21);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                //connection.Open();
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", candidateEmailDetails[0].FullName);
                                EmailBody = EmailBody.Replace("@~@userId", candidateEmailDetails[0].CandidateNo);

                                //CommonUtility.sendEmailViaWebApi(candidateEmailDetails[0].EmailId, "Interview Feedback - MRF Limited", EmailBody);
                                IDbConnection db= base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(item), 0, 0, 48, 13, candidateEmailDetails[0].EmailId, EmailBody, "Interview Feedback - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
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
        public async Task<List<InterviewCalendarAssessmentList>> GetInterviewCalendarAssessmentList(SearchInterviewCalendarAssessment formData)
        {
            try
            {
                List<InterviewCalendarAssessmentList> dataList = new List<InterviewCalendarAssessmentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarIds", formData.CalendarIds);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_CalendarAssesment_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewCalendarAssessmentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusInterviewCalendarAssessmentList>> CampusGetInterviewCalendarAssessmentList(CampusSearchInterviewCalendarAssessment formData)
        {
            try
            {
                List<CampusInterviewCalendarAssessmentList> dataList = new List<CampusInterviewCalendarAssessmentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    
                    para.Add("@candidateId", formData.CandidateId);
                    para.Add("@interviewDeatilId", formData.InterviewDeatilsId);
                    const string procName = "Usp_CampusInterviewAssesment_getByInterviewDeatil";
                    connection.Open();
                    dataList = connection.Query<CampusInterviewCalendarAssessmentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<ReturnMessage> InterviewFeedbackInsert(InterviewFeedbackFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarId", formData.CalendarId);
                    para.Add("@MedicalDetails", formData.MedicalDetails);
                    para.Add("@ParentIncomeDetails", formData.ParentIncomeDetails);
                    para.Add("@DependentDetails", formData.DependentDetails);
                    para.Add("@HigherStudiesDetails", formData.HigherStudiesDetails);
                    para.Add("@UnderstandingDetails", formData.UnderstandingDetails);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CalendarFeedback_InsertUpdate";
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



        public async Task<ReturnMessage> InsertUpdateStatusMyCampusCalander(InsertStatusMyCampusCalander formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarId", formData.CalendarIds);
                    para.Add("@AcceptStatus", formData.AcceptStatus);
                    para.Add("@candidateIds", formData.CandidateIds);
                    const string procName = "Usp_UpdateAcceptStatus_interviewCalender";
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

        public async Task<List<InterviewFeedback>> GetInterviewFeedback(SearchInterviewFeedback formData)
        {
            try
            {
                List<InterviewFeedback> dataList = new List<InterviewFeedback>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarId", formData.CalendarId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_CalendarFeedback_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewFeedback>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InterviewClarificationList>> GetInterviewClarificationList(SearchInterviewClarificationList formData)
        {
            try
            {
                List<InterviewClarificationList> dataList = new List<InterviewClarificationList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarId", formData.CalendarId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_InterviewClarification_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewClarificationList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusMyCalenderData>> GetMyCalenderList(SearchMyCampusCalendar formData)
        {
            try
            {
                List<CampusMyCalenderData> dataList = new List<CampusMyCalenderData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@VenueId", formData.VenueId);
                    para.Add("@InterviewTypeId", formData.InterviewTypeId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AcceptStatus", formData.AcceptStatus);
                    const string procName = "Usp_CampusMyCalender_getAll";
                    connection.Open();
                    dataList = connection.Query<CampusMyCalenderData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusViewCandidateData>> CampusViewCandidateDetails(ViewCandidateSearchData formData)
        {
            try
            {
                List<CampusViewCandidateData> dataList = new List<CampusViewCandidateData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewMasterId", formData.InterviewMasterId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@FullName", formData.FullName);
                    const string procName = "Usp_viewcandidateMyCampus_getDetails";
                    connection.Open();
                    dataList = connection.Query<CampusViewCandidateData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InterviewCampusCalendarAssessmentList>> GetCampusInterviewCalendarAssessmentList(SearchCapmusInterviewCalendarAssessment formData)
        {
            try
            {
                List<InterviewCampusCalendarAssessmentList> dataList = new List<InterviewCampusCalendarAssessmentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CalendarIds", formData.CalendarIds);
                    para.Add("@CandidateId", formData.CandidateId);

                    const string procName = "Usp_CampusCalendarAssesment_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewCampusCalendarAssessmentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InterviewDetailsData>> getInterviewDetails(SearchInterviewDeatils formData)
        {
            try
            {
                List<InterviewDetailsData> dataList = new List<InterviewDetailsData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candidateId", formData.CandidateId);
                    const string procName = "Usp_CampusInterviewDetails_getByCandiate";
                    connection.Open();
                    dataList = connection.Query<InterviewDetailsData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertUpdateStageGateAssesment(StageGateAssesmentData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                DataTable dtMarks = CommonUtility.ToDataTable<MarksTable>(formData.marksTables);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candiadteId", formData.CandidateId);
                    para.Add("@totalMarks", formData.TotalMarks);
                    para.Add("@createdBy", formData.CreatedBy);
                    para.Add("@stagegateTotal", dtMarks, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_SatgeGateAssesment_insUpdate";
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

        public async Task<List<StageGateData>> GetFillStageGateDetails(SearchInterviewDeatils formData)
        {
            try
            {
                List<StageGateData> dataList = new List<StageGateData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candiateId", formData.CandidateId);
                    const string procName = "Usp_SatgeGateAssesment_GetByCandidate";
                    connection.Open();
                    dataList = connection.Query<StageGateData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RmCalenderData>> GetRmPageInterview(RmCalenderSearchData formData)
        {
            try
            {
                List<RmCalenderData> dataList = new List<RmCalenderData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", formData.RoleId);
                    const string procName = "Usp_CampusMyCalenderCampusManger_get";
                    connection.Open();
                    dataList = connection.Query<RmCalenderData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RmCandidateCalenderData>> GetCandidateListCampusCandidate(RmCandidateCalenderSearchData formData)
        {
            try
            {
                List<RmCandidateCalenderData> dataList = new List<RmCandidateCalenderData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@interviewMasterId", formData.InterviewMasterId);
                    const string procName = "Usp_CampusMyCalender_Candiate_get";
                    connection.Open();
                    dataList = connection.Query<RmCandidateCalenderData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertUpCampusInterviewName(InsUpCampusInterview formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
               
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@interviewId", formData.InterviewId);
                    para.Add("@interviewname", formData.InterviewName);
                    para.Add("@createdBy", formData.CreatedBy);
                    para.Add("@isactive", formData.IsActive);
                    const string procName = "Usp_CampusInterviewName_InsUp";
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

        public async Task<List<CampusInterviewNameData>> GetCampusInterviewName(CampusInterviewNameSearch formData)
        {
            try
            {
                List<CampusInterviewNameData> dataList = new List<CampusInterviewNameData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewNameId", formData.InterviewNameId);
                    const string procName = "Usp_CampusInterviewName_getAll";
                    connection.Open();
                    dataList = connection.Query<CampusInterviewNameData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusInterviewAssesmentData>> GetCampusInterviewAssesmentList(SearchInterviewAssesment formData)
        {
            try
            {
                List<CampusInterviewAssesmentData> dataList = new List<CampusInterviewAssesmentData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candiateId", formData.CandidateId);
                    para.Add("@functionId", formData.FunctionId);
                    const string procName = "Usp_campusInterviewAssesmentList_get";
                    connection.Open();
                    dataList = connection.Query<CampusInterviewAssesmentData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
