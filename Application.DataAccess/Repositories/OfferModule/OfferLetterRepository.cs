using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.OfferModule
{
    public class OfferLetterRepository : DatabaseContext, IOfferLetterRepository
    {
        public OfferLetterRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }
        //Piu Biswas
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public async Task<ReturnMessage> InsertOfferLetter(OfferLetterInsert formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferLetterId", formData.OfferLetterId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);                   
                    para.Add("@EmailTemplateId", formData.EmailTemplateId);
                    para.Add("@EmailTemplateDetails", formData.EmailTemplateDetails);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@DocumentPath", formData.Documentpath);
                    const string procName = "Usp_OfferLetter_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@candidateId", formData.CandidateId);
                        const string requisitionProcName = "Usp_Get_CampusRequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();

                        if (requisitionDetailsForEmail.Count > 0)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 18);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@candidateName", requisitionDetailsForEmail[0].FullName);
                            EmailBody = EmailBody.Replace("@~@userId", requisitionDetailsForEmail[0].CandidateNo);
                            // CommonUtility.sendEmailViaWebApi(requisitionDetailsForEmail[0].EmailId, "Offer Letter - MRF Limited", formData.EmailTemplateDetails);
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 15, 10, requisitionDetailsForEmail[0].EmailId, formData.EmailTemplateDetails, "Offer Letter - MRF Limited", Convert.ToInt32(formData.CreatedBy));
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
        public async Task<ReturnMessage> CampusInsertOfferLetter(OfferLetterInsert formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferLetterId", formData.OfferLetterId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@EmailTemplateId", formData.EmailTemplateId);
                    para.Add("@EmailTemplateDetails", formData.EmailTemplateDetails);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@DocumentPath", formData.Documentpath);
                    const string procName = "Usp_CampusOfferLetter_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@candidateId", formData.CandidateId);
                        const string requisitionProcName = "Usp_Get_CampusRequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();

                        if (requisitionDetailsForEmail.Count > 0)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 18);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.CandidateName);
                            EmailBody = EmailBody.Replace("@~@userId", formData.CandidateNo);
                            //CommonUtility.sendEmailViaWebApi(requisitionDetailsForEmail[0].EmailId, "Offer Letter - MRF Limited", EmailBody);
                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 46, 10, requisitionDetailsForEmail[0].EmailId, EmailBody, "Offer Letter - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                            db.Close();
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
        public async Task<ReturnMessage> UpdateOfferLetter(OfferLetterUpdate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferLetterId", formData.OfferLetterId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);                    
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Accepted", formData.Accepted);
                    para.Add("@Comments", formData.Comments);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_OfferLetter_Update";
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
        public async Task<ReturnMessage> UpdateCampusOfferLetter(OfferLetterUpdate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferLetterId", formData.OfferLetterId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Accepted", formData.Accepted);
                    para.Add("@Comments", formData.Comments);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusOfferLetter_Update";
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
        public async Task<OfferLetterData> GetOfferLetter(SearchOfferLetter search)
        {
            try
            {
                OfferLetterData dataList = new OfferLetterData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferLetterId", search.OfferLetterId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    const string procName = "Usp_OfferLetter_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.OfferLetterDetails = returnList.Read<OfferLetter>().FirstOrDefault();
                    dataList.SalaryTemplateList = returnList.Read<OfferLetterSalaryTemplate>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<OfferLetterData> GetCampusOfferLetter(SearchOfferLetter search)
        {
            try
            {
                OfferLetterData dataList = new OfferLetterData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferLetterId", search.OfferLetterId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    const string procName = "Usp_CampusOfferLetter_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.OfferLetterDetails = returnList.Read<OfferLetter>().FirstOrDefault();
                    dataList.SalaryTemplateList = returnList.Read<OfferLetterSalaryTemplate>().ToList();
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
