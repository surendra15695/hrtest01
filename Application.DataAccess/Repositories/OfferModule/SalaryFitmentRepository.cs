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
    public class SalaryFitmentRepository : DatabaseContext, ISalaryFitmentRepository
    {
        public SalaryFitmentRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public async Task<SalaryFitment> GetSalaryFitmentData(SearchSalaryFitment search)
        {
            try
            {
                SalaryFitment dataList = new SalaryFitment();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryFitmentId", search.SalaryFitmentId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_SalaryFitment_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.SalaryFitmentMaster = returnList.Read<SalaryFitmentMaster>().FirstOrDefault();
                    dataList.SalaryFitmentRemaks = returnList.Read<SalaryFitmentRemaks>().ToList();
                    dataList.SalaryFitmentDetails = returnList.Read<SalaryFitmentDetails>().ToList();
                    dataList.SalaryFitmentSalaryDetails= returnList.Read<SalaryFitmentSalaryDetails>().ToList();
                    dataList.SalaryFitmentSalaryDetailsFormat = returnList.Read<SalaryFitmentSalaryDetailsFormat>().ToList();
                    dataList.SalaryFitmentExperience = returnList.Read<SalaryFitmentExperience>().ToList();
                    dataList.SalaryFitmentInternalEmployee = returnList.Read<SalaryFitmentInternalEmployee>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SalaryFitment> GetCampusSalaryFitmentData(SearchSalaryFitment search)
        {
            try
            {
                SalaryFitment dataList = new SalaryFitment();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryFitmentId", search.SalaryFitmentId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CampusSalaryFitment_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.SalaryFitmentMaster = returnList.Read<SalaryFitmentMaster>().FirstOrDefault();
                    dataList.SalaryFitmentRemaks = returnList.Read<SalaryFitmentRemaks>().ToList();
                    dataList.SalaryFitmentDetails = returnList.Read<SalaryFitmentDetails>().ToList();
                    dataList.SalaryFitmentSalaryDetails = returnList.Read<SalaryFitmentSalaryDetails>().ToList();
                    dataList.SalaryFitmentSalaryDetailsFormat = returnList.Read<SalaryFitmentSalaryDetailsFormat>().ToList();
                    dataList.SalaryFitmentExperience = returnList.Read<SalaryFitmentExperience>().ToList();
                    dataList.SalaryFitmentInternalEmployee = returnList.Read<SalaryFitmentInternalEmployee>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Piu Biswas
        public async Task<ReturnMessage> SaveSalaryFitment(SalaryFitmentMasterData formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                DataTable dtSalRemaks = CommonUtility.ToDataTable<SalaryFitmentRemaks>(formData.SalaryFitmentRemaks);
                DataTable dtExper = CommonUtility.ToDataTable<SalaryFitmentExperience>(formData.SalaryFitmentExperience);
                DataTable dtInterEmp = CommonUtility.ToDataTable<SalaryFitmentInternalEmployee>(formData.SalaryFitmentInternalEmployee);
                DataTable dtSalaryDtls = CommonUtility.ToDataTable<SalaryFitmentSalaryDetails>(formData.SalaryFitmentSalaryDetails);
                DataTable dtSalaryDtlsFrmt = CommonUtility.ToDataTable<SalaryFitmentSalaryDetailsFormat>(formData.SalaryFitmentSalaryDetailsFormat);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryFitmentId", formData.SalaryFitmentId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailId);
                    para.Add("@SalaryFitmentDetailsId", formData.SalaryFitmentDetailsId);
                    para.Add("@Probation", formData.Probation);
                    para.Add("@Location", formData.Location);
                    para.Add("@Designation", formData.Designation);
                    para.Add("@Grade", formData.Grade);
                    para.Add("@Template", formData.Template);
                    para.Add("@CTC", formData.CTC);
                    para.Add("@CTCIncrementPercent", formData.CTCIncrementPercent);
                    para.Add("@BasicIncrementPercent", formData.BasicIncrementPercent);
                    para.Add("@SalaryFitmentRemarks", dtSalRemaks, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentSalaryDetails", dtSalaryDtls, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentSalaryDetailsFormat", dtSalaryDtlsFrmt, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentExperience", dtExper, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentInternalEmployee", dtInterEmp, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@DocumentPath", formData.Documentpath);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Salary_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1 && formData.SalaryFitmentId == 0)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@candidateId", formData.CandidateId);
                        const string requisitionProcName = "Usp_Get_CampusRequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                        if (requisitionDetailsForEmail.Count > 0)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 16);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@candidateName", requisitionDetailsForEmail[0].FullName);
                            EmailBody = EmailBody.Replace("@~@userId", requisitionDetailsForEmail[0].CandidateNo);
                            //CommonUtility.sendEmailViaWebApi(requisitionDetailsForEmail[0].EmailId, "Indicative Components of Salary  Proposal - MRF Limited", EmailBody);
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 14, 11, requisitionDetailsForEmail[0].EmailId, EmailBody, "Indicative Components of Salary  Proposal - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                        }
                    }
                    if (rm.SuccessFlag == 1 && formData.SalaryFitmentId != 0)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@candidateId", formData.CandidateId);
                        const string requisitionProcName = "Usp_Get_CampusRequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                        if (requisitionDetailsForEmail.Count > 0)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 17);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@candidateName", requisitionDetailsForEmail[0].FullName);
                            EmailBody = EmailBody.Replace("@~@userId", requisitionDetailsForEmail[0].CandidateNo);
                            //CommonUtility.sendEmailViaWebApi(requisitionDetailsForEmail[0].EmailId, " Indicative Components of Salary  Proposal - Revised - MRF Limited", EmailBody);
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 14, 14, requisitionDetailsForEmail[0].EmailId, EmailBody, "Indicative Components of Salary  Proposal - Revised - MRF Limited", Convert.ToInt32(formData.CreatedBy));

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
        public async Task<ReturnMessage> CampusSaveSalaryFitment(SalaryFitmentMasterData formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                DataTable dtSalRemaks = CommonUtility.ToDataTable<SalaryFitmentRemaks>(formData.SalaryFitmentRemaks);
                DataTable dtExper = CommonUtility.ToDataTable<SalaryFitmentExperience>(formData.SalaryFitmentExperience);
                DataTable dtInterEmp = CommonUtility.ToDataTable<SalaryFitmentInternalEmployee>(formData.SalaryFitmentInternalEmployee);
                DataTable dtSalaryDtls = CommonUtility.ToDataTable<SalaryFitmentSalaryDetails>(formData.SalaryFitmentSalaryDetails);
                DataTable dtSalaryDtlsFrmt = CommonUtility.ToDataTable<SalaryFitmentSalaryDetailsFormat>(formData.SalaryFitmentSalaryDetailsFormat);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryFitmentId", formData.SalaryFitmentId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailId);
                    para.Add("@SalaryFitmentDetailsId", formData.SalaryFitmentDetailsId);
                    para.Add("@Probation", formData.Probation);
                    para.Add("@Location", formData.Location);
                    para.Add("@Designation", formData.Designation);
                    para.Add("@Grade", formData.Grade);
                    para.Add("@Template", formData.Template);
                    para.Add("@CTC", formData.CTC);
                    para.Add("@CTCIncrementPercent", formData.CTCIncrementPercent);
                    para.Add("@BasicIncrementPercent", formData.BasicIncrementPercent);
                    para.Add("@SalaryFitmentRemarks", dtSalRemaks, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentSalaryDetails", dtSalaryDtls, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentSalaryDetailsFormat", dtSalaryDtlsFrmt, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentExperience", dtExper, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@SalaryFitmentInternalEmployee", dtInterEmp, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusSalary_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1 && formData.SalaryFitmentId == 0)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@candidateId", formData.CandidateId);
                        const string requisitionProcName = "Usp_Get_CampusRequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                        if (requisitionDetailsForEmail.Count > 0)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 16);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@candidateName", requisitionDetailsForEmail[0].FullName);
                            EmailBody = EmailBody.Replace("@~@userId", requisitionDetailsForEmail[0].CandidateNo);
                           // CommonUtility.sendEmailViaWebApi(requisitionDetailsForEmail[0].EmailId, "Indicative Components of Salary  Proposal - MRF Limited", EmailBody);
                            IDbConnection db= base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 47, 11, requisitionDetailsForEmail[0].EmailId, EmailBody, "Indicative Components of Salary  Proposal - MRF Limited", Convert.ToInt32(formData.CreatedBy));
                            db.Close();
                        }
                    }
                    if (rm.SuccessFlag == 1 && formData.SalaryFitmentId != 0)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@candidateId", formData.CandidateId);
                        const string requisitionProcName = "Usp_Get_CampusRequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                        if (requisitionDetailsForEmail.Count > 0)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 17);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@candidateName", requisitionDetailsForEmail[0].FullName);
                            EmailBody = EmailBody.Replace("@~@userId", requisitionDetailsForEmail[0].CandidateNo);
                            //CommonUtility.sendEmailViaWebApi(requisitionDetailsForEmail[0].EmailId, " Indicative Components of Salary  Proposal - Revised - MRF Limited", EmailBody);
                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 47, 11, requisitionDetailsForEmail[0].EmailId, EmailBody, "Indicative Components of Salary  Proposal - MRF Limited", Convert.ToInt32(formData.CreatedBy));
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
        public async Task<ReturnMessage> UpdateSalaryFitmentCandidate(SalaryFitmentAcceptance formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    //test 
                    var para = new DynamicParameters();
                    para.Add("@SalaryFitmentId", formData.SalaryFitmentId);
                    para.Add("@SalaryFitmentDetailsId", formData.SalaryFitmentDetailsId);
                    para.Add("@Acceptance", formData.Acceptance);
                    para.Add("@Reamrks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_SalaryFitmentAcceptance_Update";
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
        public async Task<ReturnMessage> UpdateCampusSalaryFitmentCandidate(SalaryFitmentAcceptance formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    //test 
                    var para = new DynamicParameters();
                    para.Add("@SalaryFitmentId", formData.SalaryFitmentId);
                    para.Add("@SalaryFitmentDetailsId", formData.SalaryFitmentDetailsId);
                    para.Add("@Acceptance", formData.Acceptance);
                    para.Add("@Reamrks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusSalaryFitmentAcceptance_Update";
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
    }
}
