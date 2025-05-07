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
    public class JoiningDetailsRepository : DatabaseContext, IJoininingDetailsRepository
    {
        public JoiningDetailsRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }

        public async Task<List<ReAssignCandidatHiringList>> GetCandidateListReAssignHiring(ReAssignCandidatHiringListSearch search)
        {
            try
            {
                List<ReAssignCandidatHiringList> returnList = new List<ReAssignCandidatHiringList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@Name", search.Name);
                    para.Add("@VerticalId", search.VerticalId); 
                    para.Add("@LocationId", search.LocationId); 
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@HiringStatus", search.HiringStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    const string procName = "Usp_CandidateListJoiniongManagementAssignList_GetAll";
                    connection.Open();
                    returnList = connection.Query<ReAssignCandidatHiringList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ReAssignHiringList>> GetListReAssignHiring(ReAssignHiringListSearch search)
        {
            try
            {
                List<ReAssignHiringList> returnList = new List<ReAssignHiringList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@Name", search.Name);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@HiringStatus", search.HiringStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    const string procName = "Usp_JoiniongManagementCandidateListAssignList_GetAll";
                    connection.Open();
                    returnList = connection.Query<ReAssignHiringList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        // by arghya on 11.11.2022

        public async Task<ReturnMessage> SaveJoiningHiringTeamAssign(CandidatHiringTeamSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@HiringTeamId", formData.HiringTeamId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateJoiningHiringTeam_Insert";
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

        public async Task<List<CandidatHiringTeamAssigned>> GetJoiningHiringTeamAssigned(CandidatHiringTeamAssignedSearch search)
        {
            try
            {
                List<CandidatHiringTeamAssigned> returnList = new List<CandidatHiringTeamAssigned>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateJoiningHiringTeam_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidatHiringTeamAssigned>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateJoiningConfirmation>> GetCandidateJoiningConfirmation(CandidateJoiningConfirmationSearch search)
        {
            try
            {
                List<CandidateJoiningConfirmation> returnList = new List<CandidateJoiningConfirmation>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_CandidateJoiningConfirmationHiringTeam_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateJoiningConfirmation>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveCandidateJoiningConfirmation(CandidateJoiningConfirmationSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@ProceedforJoining", formData.ProceedforJoining);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateJoiningConfirmationHiringTeam_Insert";
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

        public async Task<ReturnMessage> SaveCandidateEmployeeNo(CandidateEmployeeNoSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpployeeId", formData.EmpployeeId);
                    para.Add("@EmpployeeNo", formData.EmpployeeNo);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateEmployeeNo_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 76);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@EmployeeName", formData.candidateName);
                            EmailBody = EmailBody.Replace("@~@EmployeeNo",formData.EmpployeeNo);
                            EmailBody = EmailBody.Replace("@~@Password", formData.Password);
                            //CommonUtility.sendEmailViaWebApi(formData.emailId, "Your Employee Number - MRF.LTD", EmailBody);
                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, 0, Convert.ToInt32(formData.CandidateId), 0, 35, 1, formData.emailId, EmailBody, "Your Employee Number - MRF.LTD", Convert.ToInt32(formData.CreatedBy));
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

        public async Task<List<CandidateEmployeeNo>> GetCandidateEmployeeNo(CandidateEmployeeNoSearch search)
        {
            try
            {
                List<CandidateEmployeeNo> returnList = new List<CandidateEmployeeNo>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateEmployeeNo_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateEmployeeNo>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateOfferDocument(DocumentUpdateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionDocumentId", formData.OfferDocumentCollectionDocumentId);
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@DoumentType", formData.DoumentType);
                    para.Add("@DoumentParticular", formData.DoumentParticular);
                    para.Add("@DoumentName", formData.DoumentName);
                    para.Add("@ApprovalRemarks", formData.ApprovalRemarks);
                    para.Add("@AdditionalDocument", formData.AdditionalDocument);
                    para.Add("@DocumentNameId", formData.DocumentNameId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@DocumentPath", formData.DocumentPath);
                    para.Add("@Document", formData.Document);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_OfferDocumentCollectionUpdate";
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


        public async Task<List<DiscontinuedCandidateList>> GetAllDiscontinuedCandidate(SearchDiscontinuedCandidate search)
        {
            try
            {
                List<DiscontinuedCandidateList> returnList = new List<DiscontinuedCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@BatchNo", search.BatchNo);
                    para.Add("@EmployeeNo", search.EmployeeNo);
                    para.Add("@EmployeeName", search.EmployeeName);
                    para.Add("@LastTrainingFrom", search.LastTrainingFrom);
                    para.Add("@LastTrainingTo", search.LastTrainingTo);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_DiscontinuedCandidate_GetAll";

                    connection.Open();
                    returnList = connection.Query<DiscontinuedCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
