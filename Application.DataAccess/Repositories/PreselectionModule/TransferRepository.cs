using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.PreselectionModule
{
    public class TransferRepository : DatabaseContext, ITransferRepository
    {
        public TransferRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

        public async Task<List<VacancyList>> GetAllVacancyList(SearchVacancyList formData)
        {
            try
            {
                List<VacancyList> dataList = new List<VacancyList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    const string procName = "Usp_Vacancy_GetAll";
                    connection.Open();
                    dataList = connection.Query<VacancyList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> TransferInsert(TransferFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<TransferDataObject>(formData.TransferData);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RoleHolderEmail> roleHolderEmailDetails = new List<RoleHolderEmail>();
                List<TrasferDetailEmail> trasferDetailEmail = new List<TrasferDetailEmail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@TransferData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Transfer_InsertUpdate";
                    connection.Open();

                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 46);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            if (formData.UniqueFunctionId.Count > 0 && formData.UniqueFunctionId != null)
                            {

                                foreach (var item in formData.UniqueFunctionId)
                                {
                                    string requisitionTableData = "";

                                    // For Getting Functional Head Email Id
                                    var roleholderDetailsParam = new DynamicParameters();
                                    roleholderDetailsParam.Add("@VerticalId", formData.VerticalId);
                                    roleholderDetailsParam.Add("@FunctionId", item.FunctionId);
                                    roleholderDetailsParam.Add("@RoleTypeId", 1);
                                    const string roleHolderDetailsProcName = "Usp_Get_RoleHolderEmail";
                                    roleHolderEmailDetails = connection.Query<RoleHolderEmail>(roleHolderDetailsProcName, roleholderDetailsParam, commandType: CommandType.StoredProcedure).ToList();
                                    if (roleHolderEmailDetails.Count > 0)
                                    {
                                        // For Getting Requisition Details For Role Holder
                                        var trasferDetailParam = new DynamicParameters();
                                        trasferDetailParam.Add("@TrasferId", rm.Id);
                                        const string trasferDetailProcName = "Usp_TrasferDetails_GetAll";
                                        trasferDetailEmail = connection.Query<TrasferDetailEmail>(trasferDetailProcName, trasferDetailParam, commandType: CommandType.StoredProcedure).ToList();

                                        // Get particular list for a function
                                        var modifiedList = trasferDetailEmail.FindAll(x => x.NewFunctionId == item.FunctionId);

                                        // Prepare dynamic table
                                        string requisitionTableHeaderOpen = "<html> <head></head><body>" +
                                            "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Request </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Emp Id </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;' > Name </th >" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Designation </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Location </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Function </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Department </th>" +
                                            "</tr></thead><tbody>";
                                        if (modifiedList.Count > 0)
                                        {

                                            foreach (var item1 in modifiedList)
                                            {
                                                requisitionTableData += "<tr>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + "Transfer" + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.EmpId + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.EmpName + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.Designation + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.LocationOffice + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.FunctionName +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.DepartmentName + "</td></tr>";
                                            }
                                        }
                                        string requisitionTableHeaderClose = "</tbody></table></body></html>";
                                        string finalTableResult = requisitionTableHeaderOpen + requisitionTableData + requisitionTableHeaderClose;

                                        // Replace emailbody with table
                                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                        EmailBody = EmailBody.Replace("@~@Table", finalTableResult);
                                        //CommonUtility.sendEmailViaWebApi(roleHolderEmailDetails[0].RoleHolderEmailId, "Pending Action - Recruitment", EmailBody);
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

        public async Task<List<TransferList>> GetAllTransferList(SearchTransferList formData)
        {
            try
            {
                List<TransferList> dataList = new List<TransferList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TransferId", formData.TransferId);
                    para.Add("@TransferDetailId", formData.TransferDetailId);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@TransferApprovalStatus", formData.TransferApprovalStatus);
                    para.Add("@TransferProcessStatus", formData.TransferProcessStatus);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Transfer_GetAll";
                    connection.Open();
                    dataList = connection.Query<TransferList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<TransferListNew>> GetAllTransferListReport(SearchTransferList formData)
        {
            try
            {
                List<TransferListNew> dataList = new List<TransferListNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TransferId", formData.TransferId);
                    para.Add("@TransferDetailId", formData.TransferDetailId);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@TransferApprovalStatus", formData.TransferApprovalStatus);
                    para.Add("@TransferProcessStatus", formData.TransferProcessStatus);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Transfer_GetAll";
                    connection.Open();
                    dataList = connection.Query<TransferListNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> TransferAcknowledgement(TransferAcknowledgementFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TransferDetailId", formData.TransferDetailId);
                    para.Add("@AcknowledgementStatusId", formData.AcknowledgementStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TransferAcknowledgement";
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

        public async Task<ReturnMessage> MergeTransfer(MergeTransferFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<MergeTransferData>(formData.TransferData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TransferData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_MergeTransfer";
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

        public async Task<ReturnMessage> TransferApproveReject(TransferApproveRejectFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TransferDetailId", formData.TransferDetailId);
                    para.Add("@StatusId", formData.StatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TransferApproveReject";
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

        public async Task<List<TransferHoldRelease>> GetAllTransferHoldReleaseList(SearchTransferHoldRelease formData)
        {
            try
            {
                List<TransferHoldRelease> dataList = new List<TransferHoldRelease>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TransferHoldRelease_GetAll";
                    connection.Open();
                    dataList = connection.Query<TransferHoldRelease>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<TransferHoldRelease>> GettransferholdreleaselistPlant(SearchTransferHoldRelease formData)
        {
            try
            {
                List<TransferHoldRelease> dataList = new List<TransferHoldRelease>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TransferHoldReleasePlant_GetAll";
                    connection.Open();
                    dataList = connection.Query<TransferHoldRelease>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateHoldRelease(TransferHoldReleaseSubmitFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<TransferHoldReleaseData>(formData.HoldReleaseTransferData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HoldReleaseTransferData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TransferHoldRelease_InsertUpdate";
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
        public async Task<ReturnMessage> DeleteBeforeTransfer(DeleteTransferList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TransferDetailId", formData.TransferDetailId);
                    const string procName = "Usp_DeleteTransferList";
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
