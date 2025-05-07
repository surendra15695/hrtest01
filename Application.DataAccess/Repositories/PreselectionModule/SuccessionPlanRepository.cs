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
    public class SuccessionPlanRepository : DatabaseContext, ISuccessionPlanRepository
    {
        public SuccessionPlanRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<ReturnMessage> SuccessionPlanInsert(SuccessionPlanFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<SuccessionPlanDataObject>(formData.SuccessionPlanData);
                ReturnMessage rm = new ReturnMessage(); 
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RoleHolderEmail> roleHolderEmailDetails = new List<RoleHolderEmail>();
                List<SuccessionPlanDetailEmail> successionPlanDetailEmail = new List<SuccessionPlanDetailEmail>();

                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@SuccessionPlanData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_SuccessionPlan_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 47);
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
                                        var successionPlanDetailParam = new DynamicParameters();
                                        successionPlanDetailParam.Add("@SuccessionPlanId", rm.Id);
                                        const string successionPlanDetailProcName = "Usp_SuccessionPlanDetails_GetAll";
                                        successionPlanDetailEmail = connection.Query<SuccessionPlanDetailEmail>(successionPlanDetailProcName, successionPlanDetailParam, commandType: CommandType.StoredProcedure).ToList();

                                        // Get particular list for a function
                                        var modifiedList = successionPlanDetailEmail.FindAll(x => x.FunctionId == item.FunctionId);

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
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + "Succession Plan" + "</td>" +
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

        public async Task<List<SuccessionPlanList>> GetAllSuccessionPlanList(SearchSuccessionPlanList formData)
        {
            try
            {
                List<SuccessionPlanList> dataList = new List<SuccessionPlanList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SuccessionPlanId", formData.SuccessionPlanId);
                    para.Add("@SuccessionPlanDetailId", formData.SuccessionPlanDetailId);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@SuccessionPlanApprovalStatus", formData.SuccessionPlanApprovalStatus);
                    para.Add("@SuccessionPlanProcessStatus", formData.SuccessionPlanProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_SuccessionPlan_GetAll";
                    connection.Open();
                    dataList = connection.Query<SuccessionPlanList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<SuccessionPlanListNew>> GetAllSuccessionPlanListReport(SearchSuccessionPlanList formData)
        {
            try
            {
                List<SuccessionPlanListNew> dataList = new List<SuccessionPlanListNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SuccessionPlanId", formData.SuccessionPlanId);
                    para.Add("@SuccessionPlanDetailId", formData.SuccessionPlanDetailId);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@SuccessionPlanApprovalStatus", formData.SuccessionPlanApprovalStatus);
                    para.Add("@SuccessionPlanProcessStatus", formData.SuccessionPlanProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_SuccessionPlan_GetAll";
                    connection.Open();
                    dataList = connection.Query<SuccessionPlanListNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> SuccessionPlanAcknowledgement(SuccessionPlanAcknowledgementFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SuccessionPlanDetailId", formData.SuccessionPlanDetailId);
                    para.Add("@AcknowledgementStatusId", formData.AcknowledgementStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_SuccessionPlanAcknowledgement";
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

        public async Task<ReturnMessage> MergeSuccessionPlan(MergeSuccessionPlanFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<MergeSuccessionPlanData>(formData.SuccessionPlanData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SuccessionPlanData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_MergeSuccessionPlan";
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

        public async Task<ReturnMessage> SuccessionPlanApproveReject(SuccessionPlanApproveRejectFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SuccessionPlanDetailId", formData.SuccessionPlanDetailId);
                    para.Add("@StatusId", formData.StatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_SuccessionPlanApproveReject";
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

        public async Task<List<SuccessionPlanHoldRelease>> GetAllSuccessionPlanHoldReleaseList(SearchSuccessionPlanHoldRelease formData)
        {
            try
            {
                List<SuccessionPlanHoldRelease> dataList = new List<SuccessionPlanHoldRelease>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_SuccessionPlanHoldRelease_GetAll";
                    connection.Open();
                    dataList = connection.Query<SuccessionPlanHoldRelease>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateHoldRelease(SuccessionPlanHoldReleaseSubmitFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<SuccessionPlanHoldReleaseData>(formData.HoldReleaseSuccessionPlanData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HoldReleaseSuccessionPlanData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_SuccessionPlanHoldRelease_InsertUpdate";
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
        public async Task<ReturnMessage> DeleteBeforeSuccessionPlan(DeleteSuccessionPlanList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SuccessionPlanDetailId", formData.SuccessionPlanDetailId);
                    const string procName = "Usp_DeleteSuccessionPlanDetails";
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
