using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CandidateModule;
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
    public class InterviewScheduleRepository : DatabaseContext, IInterviewScheduleRepository
    {
        public InterviewScheduleRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<ReturnMessage> InterviewScheduleInsert(InterviewScheduleFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@InterviewTypeId", formData.InterviewTypeId);
                    para.Add("@InterviewLink", formData.InterviewLink);
                    para.Add("@InterviewRoomId", formData.InterviewRoomId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@InterviewSlot", formData.InterviewSlot);
                    para.Add("@VenueId", formData.VenueId);
                    para.Add("@HRAutoUserIds", formData.HRAutoUserIds);
                    para.Add("@InterviewerAutoUserIds", formData.InterviewerAutoUserIds);
                    para.Add("@IsTravel", formData.IsTravel);
                    para.Add("@TravelModes", formData.TravelModes);
                    para.Add("@IsAccomodation", formData.IsAccomodation);
                    para.Add("@AccomodationDetails", formData.AccomodationDetails);
                    para.Add("@IsFormAnexture", formData.IsFormAnexture);
                    para.Add("@ScheduleComments", formData.ScheduleComments);
                    para.Add("@EmailTemplateId", formData.EmailTemplateId);
                    para.Add("@EmailTemplate", formData.EmailTemplate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_InterviewSchedule_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                    List<VendorRequisitionDetailsForEmail> vendorRequisitionDetailsForEmail = new List<VendorRequisitionDetailsForEmail>();
                    if (rm.SuccessFlag == 1)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                        const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                        var templateId = 0;
                        if (formData.InterviewTypeId == 1)
                        {
                            //offline
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 28);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 20;
                        }
                        else
                        {
                            //online
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 19);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 2;
                        }

                        if(formData.EmailTemplate != null)
                        {
                            string EmailBody = formData.EmailTemplate;

                            List<string> EmailIds = formData.EmailId.Split(',').ToList();                           
                            List<string> CandidateIds = formData.candidateNo.Split(',').ToList();


                            for (var i = 0; i < EmailIds.Count; i++)
                            {
                                IDbConnection Emailconnection = base.GetConnection();
                                string EmailBodyformail = EmailBody.Replace("@~@ContactNo", CandidateIds[i].ToString());
                                // CommonUtility.sendEmailViaWebApi(EmailIds[i], "Interview Scheduled - MRF Limited", EmailBodyformail);
                                CommonUtility.InsertInMailTable(Emailconnection, 0, 0, 0, 8, Convert.ToInt32(templateId), EmailIds[i], EmailBodyformail, "Interview Scheduled - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                Emailconnection.Close();
                            }
                        }
                        else 
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@fromDate", formData.FromDate);
                                EmailBody = EmailBody.Replace("@~@VenueName", formData.VenueName);
                                EmailBody = EmailBody.Replace("@~@VanueAddress", formData.VanueAddress);
                                EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                                EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                                EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                                EmailBody = EmailBody.Replace("@~@ContactName", formData.ContactName);
                                EmailBody = EmailBody.Replace("@~@ContactNo", formData.ContactNo);
                                EmailBody = EmailBody.Replace("@~@CandidateNo", formData.candidateNo);
                                EmailBody = EmailBody.Replace("@~@InterviewLink", formData.InterviewLink);
                                if (formData.IsTravel == true)
                                {
                                    EmailBody = EmailBody.Replace("@~@IsTravel", "Yes");
                                }
                                else { EmailBody = EmailBody.Replace("@~@IsTravel", "No"); }
                                EmailBody = EmailBody.Replace("@~@TravelMode", formData.travelModeDesc);
                                EmailBody = EmailBody.Replace("@~@InterviewAccomodationDetails", formData.AccomodationDetails);

                                //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Interview Scheduled - MRF Limited", EmailBody);
                                CommonUtility.InsertInMailTable(connection, 0, 0, 0, 8, Convert.ToInt32(templateId), formData.EmailId, EmailBody, "Interview Scheduled - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                            }
                            

                        }

                        //Need to be change for CandidateName in Email~

                        //if (emailTemplateBodyList.Count > 0)
                        //{
                        //    CandidateData returnList = new CandidateData();          //Arghya on 27.07.22
                        //    string[] multiSelectedCandidate = formData.CandidateIds.Split(new char[] { ',' });
                        //    foreach (string candidate_ID in multiSelectedCandidate)
                        //    {

                        //        if (candidate_ID != "")
                        //        {
                        //            var Candidatepara = new DynamicParameters();
                        //            Candidatepara.Add("@CandidateId", candidate_ID);
                        //            const string CandidateprocName = "Usp_Candidate_Get";
                        //            returnList = connection.Query<CandidateData>(CandidateprocName, Candidatepara, commandType: CommandType.StoredProcedure).FirstOrDefault();

                        //            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                        //            EmailBody = EmailBody.Replace("@~@fromDate", formData.FromDate);
                        //            EmailBody = EmailBody.Replace("@~@VenueName", formData.VenueName);
                        //            EmailBody = EmailBody.Replace("@~@VanueAddress", formData.VanueAddress);
                        //            EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                        //            EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                        //            EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                        //            EmailBody = EmailBody.Replace("@~@ContactName", formData.ContactName);
                        //            EmailBody = EmailBody.Replace("@~@ContactNo", formData.ContactNo);
                        //            EmailBody = EmailBody.Replace("@~@CandidateNo", formData.candidateNo);
                        //            EmailBody = EmailBody.Replace("@~@CandidateName", returnList.FullName);
                        //            if (formData.IsTravel == true)
                        //            {
                        //                EmailBody = EmailBody.Replace("@~@IsTravel", "Yes");
                        //            }
                        //            else { EmailBody = EmailBody.Replace("@~@IsTravel", "No"); }
                        //            EmailBody = EmailBody.Replace("@~@TravelMode", formData.travelModeDesc);
                        //            EmailBody = EmailBody.Replace("@~@InterviewAccomodationDetails", formData.AccomodationDetails);

                        //            CommonUtility.sendEmailViaWebApi(returnList.EmailId, "Job Application -  MRF Limited", EmailBody);
                        //        }
                        //    }


                        //}
                    }

                        return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<RequisitionForEmailDetails> GetRequisitionDetailsForEmail(SearchRequisitionForEmailDetails formData)  //arghya D-29.07.22
        {
            try
            {
                RequisitionForEmailDetails dataList = new RequisitionForEmailDetails();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId",formData.RequisitionDetailId);
                    const string procName = "Usp_Get_RequisitionDetailsForEmail";
                    dataList = connection.Query<RequisitionForEmailDetails>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        

        public async Task<InterviewScheduleDetail> GetInterviewScheduleDetail(SearchInterviewScheduleDetail formData)
        {
            try
            {
                InterviewScheduleDetail dataList = new InterviewScheduleDetail();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_InterviewSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewScheduleDetail>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<ReturnMessage> CandidateInterviewFeedbackInsertUpdate(CandidateInterviedwFeedbackData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    para.Add("@ApplicationSystemRate", formData.ApplicationSystemRate);
                    para.Add("@ExplanationRate", formData.ExplanationRate);
                    para.Add("@HelpfulRate", formData.HelpfulRate);
                    para.Add("@InformativeRate", formData.InformativeRate);
                    para.Add("@InterviewProcessRate", formData.InterviewProcessRate);
                    para.Add("@ComfortableRate", formData.ComfortableRate);
                    para.Add("@RecomendedRate", formData.RecomendedRate);
                    para.Add("@OverallExperience", formData.OverallExperience);
                    para.Add("@Suggestion", formData.Suggestion);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_CandidateInterviewFeedback_InsertUpdate";
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
        public async Task<ReturnMessage> CampusCandidateInterviewFeedbackInsertUpdate(CampusCandidateInterviedwFeedbackDataInsert formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    para.Add("@ApplicationSystemRate", formData.ApplicationSystemRate);
                    para.Add("@ExplanationRate", formData.ExplanationRate);
                    para.Add("@HelpfulRate", formData.HelpfulRate);
                    para.Add("@InformativeRate", formData.InformativeRate);
                    para.Add("@InterviewProcessRate", formData.InterviewProcessRate);
                    para.Add("@ComfortableRate", formData.ComfortableRate);
                    para.Add("@RecomendedRate", formData.RecomendedRate);
                    para.Add("@OverallExperience", formData.OverallExperience);
                    para.Add("@Suggestion", formData.Suggestion);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_CampusCandidateInterviewFeedback_InsertUpdate";
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

        public async Task<CandidateInterviedwFeedbackData> GetCandidateInterviewFeedbackDetail(SearchCandidateInterviewFeedback formData)
        {
            try
            {
                CandidateInterviedwFeedbackData dataList = new CandidateInterviedwFeedbackData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_CandidateInterviewFeedback_Get";
                    connection.Open();
                    dataList = connection.Query<CandidateInterviedwFeedbackData>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CampusCandidateInterviedwFeedbackData> GetCampusCandidateInterviewFeedbackDetail(SearchCampusCandidateInterviewFeedbackData formData)
        {
            try
            {
                CampusCandidateInterviedwFeedbackData dataList = new CampusCandidateInterviedwFeedbackData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    const string procName = "Usp_CampusCandidateInterviewFeedback_Get";
                    connection.Open();
                    dataList = connection.Query<CampusCandidateInterviedwFeedbackData>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateInterviewFeedbackList>> GetCandidateInterviewFeedbackList(SearchCandidateInterviewFeedback formData)
        {
            try
            {
                List<CandidateInterviewFeedbackList> dataList = new List<CandidateInterviewFeedbackList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_CandidateInterviewFeedback_GetAll";
                    connection.Open();
                    dataList = connection.Query<CandidateInterviewFeedbackList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusCandidateInterviewFeedbackNew>> GetCampusCandidateInterviewFeedbackList(SearchCampusCandidateInterviewFeedback formData)
        {
            try
            {
                List<CampusCandidateInterviewFeedbackNew> dataList = new List<CampusCandidateInterviewFeedbackNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@IsEnable", formData.IsEnable);
                    const string procName = "Usp_CampusCandidateInterviewFeedback_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusCandidateInterviewFeedbackNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
