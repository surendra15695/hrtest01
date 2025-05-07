using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Dapper;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.PreselectionModule
{
    public class RequisitionRepository : DatabaseContext, IRequisitionRepository
    {
        public RequisitionRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

        public string localFilePath = null;
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public string DownloadedFile(string filename, string ContainerReference)
        {
            IDbConnection connection = base.GetConnection();
            string ContainerName = base.GetContainerName();
            string AzureConnectionString = base.GetAzureConnectionString();
            MemoryStream ms = new MemoryStream();
            AppConfiguration ac = new AppConfiguration();
            DatabaseContext dc = new DatabaseContext(ac);
            try
            {
                if (CloudStorageAccount.TryParse(AzureConnectionString.ToString(), out CloudStorageAccount storageAccount))
                {
                    CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = BlobClient.GetContainerReference(ContainerReference);
                    CloudBlob file = container.GetBlobReference(filename);
                    localFilePath = file.StorageUri.PrimaryUri.AbsoluteUri.ToString();

                }
                return localFilePath;
            }
            catch (Exception ex)
            {
                return (ex.Message.ToString());
            }
        }
        //public string DownloadedFile(string filename, string ContainerReference)
        //{
        //    IDbConnection connection = base.GetConnection();
        //    string AzureConnectionString = base.GetAzureConnectionString();
        //    string blobEndpoint = base.GetBlobEndPoint(); //Blob end point in appsettings.json
        //    string sasToken = GenerateSasToken(blobEndpoint, ContainerReference, filename);
        //    return $"{blobEndpoint}/{ContainerReference}/{filename}{sasToken}";
        //}
        //private string GenerateSasToken(string blobEndpoint, string containerName, string blobName)
        //{
        //    try
        //    {
        //        string connectionString = base.GetAzureConnectionString(); // Update with your actual connection string params
        //        BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
        //        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        //        BlobClient blobClient = containerClient.GetBlobClient(blobName);

        //        // Define the permissions and expiry for the SAS token
        //        BlobSasBuilder sasBuilder = new BlobSasBuilder()
        //        {
        //            BlobContainerName = containerName,
        //            BlobName = blobName,
        //            Resource = "b", // "b" for blob
        //            StartsOn = DateTimeOffset.UtcNow,
        //            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), // Adjust expiry as needed
        //            Protocol = SasProtocol.Https
        //        };

        //        // Set permissions (e.g., read permission)
        //        sasBuilder.SetPermissions(BlobSasPermissions.Read);

        //        // Generate the SAS token URI
        //        Uri sasUri = blobClient.GenerateSasUri(sasBuilder);

        //        // Get the SAS token from the URI
        //        string sasToken = sasUri.Query;

        //        return sasToken;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message; // Handle error or return default SAS token
        //    }
        //}
        public async Task<ReturnMessage> RequisitionInsert(RequisitionFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<RequisitionDataObject>(formData.RequisitionData);
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RoleHolderEmail> roleHolderEmailDetails = new List<RoleHolderEmail>();
                List<RequisitionDetailsForRoleHolderEmail> requisitionDeatailsForRoleHolder = new List<RequisitionDetailsForRoleHolderEmail>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@IOMNo", formData.IOMNo);
                    para.Add("@ManagementApprovalDocument", formData.ManagementApprovalDocument);
                    para.Add("@RequisitionData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Requisition_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag==1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 44);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            if (formData.UniqueFunctionIds.Count > 0 && formData.UniqueFunctionIds != null)
                            {

                                foreach (var item in formData.UniqueFunctionIds)
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
                                        var requisitionDeatilsRoleHolderParam = new DynamicParameters();
                                        requisitionDeatilsRoleHolderParam.Add("@RequisitionId", rm.Id);
                                        const string requisitionDetailsRoleHolderProcName = "Usp_RequisitionDetailsForRoleHolder_GetAll";
                                        requisitionDeatailsForRoleHolder = connection.Query<RequisitionDetailsForRoleHolderEmail>(requisitionDetailsRoleHolderProcName, requisitionDeatilsRoleHolderParam, commandType: CommandType.StoredProcedure).ToList();

                                        // Get particular list for a function
                                        var modifiedList = requisitionDeatailsForRoleHolder.FindAll(x => x.FunctionId == item.FunctionId);

                                        // Prepare dynamic table
                                        string requisitionTableHeaderOpen = "<html> <head></head><body>" +
                                            "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Req No </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Date </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;' > Location </th >" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Function </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Department </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Posotion </th>" +
                                            "</tr></thead><tbody>";
                                        if (modifiedList.Count > 0)
                                        {

                                            foreach (var item1 in modifiedList)
                                            {
                                                requisitionTableData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.RequisitionNo + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.TargetDate + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.LocationOffice + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.FunctionName + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.DepartmentName + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.PositionName + "</td></tr>";
                                            }
                                        }
                                        string requisitionTableHeaderClose = "</tbody></table></body></html>";
                                        string finalTableResult = requisitionTableHeaderOpen + requisitionTableData + requisitionTableHeaderClose;

                                        // Replace emailbody with table
                                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                        EmailBody = EmailBody.Replace("@~@Table", finalTableResult);
                                       // CommonUtility.sendEmailViaWebApi(roleHolderEmailDetails[0].RoleHolderEmailId, "Pending Action - Recruitment", EmailBody);
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
        public async Task<ReturnMessage> RequisitionInsertWithDummy(RequisitionFormDatawithDummy formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<RequisitionDataObjectWithDummy>(formData.RequisitionData);
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RoleHolderEmail> roleHolderEmailDetails = new List<RoleHolderEmail>();
                List<RequisitionDetailsForRoleHolderEmail> requisitionDeatailsForRoleHolder = new List<RequisitionDetailsForRoleHolderEmail>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@IOMNo", formData.IOMNo);
                    para.Add("@ManagementApprovalDocument", formData.ManagementApprovalDocument);
                    para.Add("@RequisitionData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    //const string procName = "Usp_Requisition_InsertUpdate";
                    const string procName = "Usp_Requisition_InsertUpdate_WithDummyTag";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 44);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            if (formData.UniqueFunctionIds.Count > 0 && formData.UniqueFunctionIds != null)
                            {

                                foreach (var item in formData.UniqueFunctionIds)
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
                                        var requisitionDeatilsRoleHolderParam = new DynamicParameters();
                                        requisitionDeatilsRoleHolderParam.Add("@RequisitionId", rm.Id);
                                        const string requisitionDetailsRoleHolderProcName = "Usp_RequisitionDetailsForRoleHolder_GetAll";
                                        requisitionDeatailsForRoleHolder = connection.Query<RequisitionDetailsForRoleHolderEmail>(requisitionDetailsRoleHolderProcName, requisitionDeatilsRoleHolderParam, commandType: CommandType.StoredProcedure).ToList();

                                        // Get particular list for a function
                                        var modifiedList = requisitionDeatailsForRoleHolder.FindAll(x => x.FunctionId == item.FunctionId);

                                        // Prepare dynamic table
                                        string requisitionTableHeaderOpen = "<html> <head></head><body>" +
                                            "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Req No </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Date </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;' > Location </th >" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Function </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Department </th>" +
                                            "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'> Posotion </th>" +
                                            "</tr></thead><tbody>";
                                        if (modifiedList.Count > 0)
                                        {

                                            foreach (var item1 in modifiedList)
                                            {
                                                requisitionTableData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.RequisitionNo + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.TargetDate + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.LocationOffice + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.FunctionName + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.DepartmentName + "</td>" +
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + item1.PositionName + "</td></tr>";
                                            }
                                        }
                                        string requisitionTableHeaderClose = "</tbody></table></body></html>";
                                        string finalTableResult = requisitionTableHeaderOpen + requisitionTableData + requisitionTableHeaderClose;

                                        // Replace emailbody with table
                                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                        EmailBody = EmailBody.Replace("@~@Table", finalTableResult);
                                       // CommonUtility.sendEmailViaWebApi(roleHolderEmailDetails[0].RoleHolderEmailId, "Pending Action - Recruitment", EmailBody);
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

        public async Task<ReturnMessage> CheckIOMNo(IOMFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@IOMNo", formData.IOMNo);
                    const string procName = "Usp_IOM_GetAll";
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
        public async Task<List<DummyRequisitionList>> GetAllDummyRequisitionList(SearchDummyRequisition formData)
        {
            try
            {
                List<DummyRequisitionList> dataList = new List<DummyRequisitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@IOMNo", formData.IOMNo);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@LoggedInUserRoleIds", formData.LoggedInUserRoleIds);
                    para.Add("@ModuleId", formData.ModuleId);
                    const string procName = "Usp_DummyRequisition_GetAll";
                    connection.Open();
                    dataList = connection.Query<DummyRequisitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "managementapprovaldocument";
                    foreach (var List in dataList)
                    {
                        if (List.ManagementApprovalDocument != "")
                        {
                            string Managementapprovaldocument = Path.GetFileName(List.ManagementApprovalDocument);
                            string AttachmentLink = DownloadedFile(Managementapprovaldocument, ContainerReference);
                            List.ManagementApprovalDocument = AttachmentLink;
                        }
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RequisitionList>> GetAllRequisitionList(SearchRequisition formData)
        {
            try
            {
                List<RequisitionList> dataList = new List<RequisitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@IOMNo", formData.IOMNo);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@LoggedInUserRoleIds", formData.LoggedInUserRoleIds);
                    para.Add("@ModuleId", formData.ModuleId);
                    const string procName = "Usp_Requisition_GetAll";
                    connection.Open();
                    dataList = connection.Query<RequisitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "managementapprovaldocument";
                    foreach (var List in dataList)
                    {
                        if (List.ManagementApprovalDocument != "")
                        {
                            string Managementapprovaldocument = Path.GetFileName(List.ManagementApprovalDocument);
                            string AttachmentLink = DownloadedFile(Managementapprovaldocument, ContainerReference);
                            List.ManagementApprovalDocument = AttachmentLink;
                        }
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RequisitionList>> GetAllRequisitionHMList(SearchRequisition formData)
        {
            try
            {
                List<RequisitionList> dataList = new List<RequisitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@IOMNo", formData.IOMNo);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@@LoggedInUserRoleIds", formData.LoggedInUserRoleIds);
                    para.Add("@ModuleId", formData.ModuleId);
                    const string procName = "Usp_RequisitionHM_GetAll";
                    connection.Open();
                    dataList = connection.Query<RequisitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "managementapprovaldocument";
                    foreach (var List in dataList)
                    {
                        if (List.ManagementApprovalDocument != "")
                        {
                            string Managementapprovaldocument = Path.GetFileName(List.ManagementApprovalDocument);
                            string AttachmentLink = DownloadedFile(Managementapprovaldocument, ContainerReference);
                            List.ManagementApprovalDocument = AttachmentLink;
                        }
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RequistionDetailsList>> GetDetailsRequisition(SearchRequisition formData)
        {
            try
            {
                List<RequistionDetailsList> dataList = new List<RequistionDetailsList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_RequisitionDetails_GetAll";
                    connection.Open();
                    dataList = connection.Query<RequistionDetailsList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    
                    return await Task.FromResult(dataList);
                }
                    
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }
        public async Task<List<TaggedRequisitionList>> GetCandidateTaggedRequisition(SearchCandidateTaggedRequisition formData)
        {
            try
            {
                List<TaggedRequisitionList> dataList = new List<TaggedRequisitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_CandidateRequisitiontagged_GetAll";
                    connection.Open();
                    dataList = connection.Query<TaggedRequisitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    return await Task.FromResult(dataList);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<List<RequisitionHistoryList>> GetAllRequisitionHistoryList(SearchRequisitionHistory formData)
        {
            try
            {
                List<RequisitionHistoryList> dataList = new List<RequisitionHistoryList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailHistoryId", formData.RequisitionDetailHistoryId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@IOMNo", formData.IOMNo);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_RequisitionHistory_GetAll";
                    connection.Open();
                    dataList = connection.Query<RequisitionHistoryList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HoldUpdateForRequisition(SearchHoldRequisition formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@OnHold", formData.OnHold);
                    const string procName = "Usp_HoldUpdateForRequisition";
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
        public async Task<ReturnMessage> RequisitionAllocateToRM(RequisitionAllocationFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@SalaryId", formData.SalaryId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RequisitionAllocateToRM";
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

        public async Task<ReturnMessage> RequisitionAllocateSourceChannel(RequisitionSourceFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<RequisitionSourceChannelFeature>(formData.SourceChannelFeature);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@HiringManagerId", formData.HiringManagerId);
                    para.Add("@SelectionGuideId", formData.SelectionGuideId);
                    para.Add("@VendorIds", formData.VendorIds);
                    para.Add("@SourceChannelFeature", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RequisitionAllocateSourceChannel";
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

        public async Task<ReturnMessage> RequisitionApproveReject(RequisitionApproveRejectFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailHistoryId", formData.RequisitionDetailHistoryId);
                    para.Add("@StatusId", formData.StatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RequisitionApproveReject";
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

        public async Task<ReturnMessage> UpdateRequisitionCandidateHiringStatus(RequisitionCandidateHiringStatusFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateHiringAction";
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
        public async Task<List<CandidateHigringList>> GetCandiadateHiringStatus(SearchCandidateHigringList search)
        {
            try
            {
                List<CandidateHigringList> returnList = new List<CandidateHigringList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@IsActive", search.IsActive);                  
                    const string procName = "Usp_CandidateHiringAction_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateHigringList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CandidateHigringList>> GetCampusCandiadateHiringStatus(SearchCandidateHigringList search)
        {
            try
            {
                List<CandidateHigringList> returnList = new List<CandidateHigringList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CampusCandidateHiringAction_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateHigringList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UpdateRequisitionCandidateHiringStatusForCancel(RequisitionCandidateHiringStatusFormDataForCancel formData)//Piu
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@PrevHiringId", formData.PrevHiringId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateCancelInterviewAction";
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

        public async Task<ReturnMessage> UpdateRequisitionCVCandidateTag(RequisitionCVCandidateTagList formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formdata.CandidateIds);
                    para.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                    //para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    const string procName = "Usp_CvDropCandidateList_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1 )
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 3);
                        emailTemplateParam.Add("@TemplateId", 74);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;


                            EmailBody = EmailBody.Replace("@~@Candidate", formdata.fullName);
                            EmailBody = EmailBody.Replace("@~@Pos", formdata.position);
                            EmailBody = EmailBody.Replace("@~@Dep", formdata.department);
                            EmailBody = EmailBody.Replace("@~@Fun", formdata.function);
                            EmailBody = EmailBody.Replace("@~@Loc", formdata.location);
                            EmailBody = EmailBody.Replace("@~@State", formdata.state);
                            EmailBody = EmailBody.Replace("@~@ReqNo", formdata.reqno);
                            EmailBody = EmailBody.Replace("@~@UserId", formdata.userId);
                            // CommonUtility.sendEmailViaWebApi(formdata.emailId, "Job Application - MRF Limited", EmailBody);
                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, 0, 0, 0, 26, 74, formdata.emailId, EmailBody, "Job Application - MRF Limited", 1);
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
        public async Task<ReturnMessage> UpdateRequisitionCVCandidateTagNew(RequisitionCVCandidateTagListNew formdata)
        {
            try
            {

                DataTable dtcandetailscvdrop = CommonUtility.ToDataTable<CandidateDetailsCvDropTag>(formdata.CandidateDetailsCvDropTag);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formdata.CandidateIds);
                    para.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                    //para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    const string procName = "Usp_CvDropCandidateList_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 3);
                        emailTemplateParam.Add("@TemplateId", 74);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            for (int i = 0; i < dtcandetailscvdrop.Rows.Count; i++)
                            {

                                EmailBody = EmailBody.Replace("@~@Candidate", dtcandetailscvdrop.Rows[i]["CandidateName"].ToString());
                                EmailBody = EmailBody.Replace("@~@Pos", dtcandetailscvdrop.Rows[i]["Position"].ToString());
                                EmailBody = EmailBody.Replace("@~@Dep", dtcandetailscvdrop.Rows[i]["Department"].ToString());
                                EmailBody = EmailBody.Replace("@~@Fun", dtcandetailscvdrop.Rows[i]["Function"].ToString());
                                EmailBody = EmailBody.Replace("@~@Loc", dtcandetailscvdrop.Rows[i]["Location"].ToString());
                                EmailBody = EmailBody.Replace("@~@State", dtcandetailscvdrop.Rows[i]["State"].ToString());
                                EmailBody = EmailBody.Replace("@~@ReqNo", dtcandetailscvdrop.Rows[i]["ReqNo"].ToString());
                                EmailBody = EmailBody.Replace("@~@UserId", dtcandetailscvdrop.Rows[i]["UserId"].ToString());
                                // CommonUtility.sendEmailViaWebApi(dtcandetailscvdrop.Rows[i]["EmailId"].ToString(), "Job Application - MRF Limited", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, 0, 0, 0, 27, 74, dtcandetailscvdrop.Rows[i]["EmailId"].ToString(), EmailBody, "Job Application - MRF Limited", 1);
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
        public async Task<ReturnMessage> DeleteCandidates(DeleteCandidates formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    const string procName = "Usp_CandidatesDelete";
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
        public async Task<ReturnMessage> CandidatesUpdateprofileMail(CandidateUpdateProfile formData)
        {
            try
            {
                DataTable dtcandetails = CommonUtility.ToDataTable<CandidateDetailsMail>(formData.CandidateDetailsMail);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    for(int i = 0; i < dtcandetails.Rows.Count; i++)
                    {
                        string EmailBody = formData.Template;
                        EmailBody = EmailBody.Replace("@~@candidateName", dtcandetails.Rows[i]["CandidateName"].ToString());
                        EmailBody = EmailBody.Replace("@~@candidateNo", dtcandetails.Rows[i]["CandidateId"].ToString());
                        CommonUtility.sendEmailViaWebApi(dtcandetails.Rows[i]["EmailId"].ToString(), "MRF Selection - Candidate Profile", EmailBody);  // NEED TO OPEN
                        //CommonUtility.InsertInMailTable(connection, Convert.ToInt32(dtcandetails.Rows[i]["CandidateId"].ToString()), 0, 0, 6, 0, dtcandetails.Rows[i]["EmailId"].ToString(), EmailBody, "MRF Selection - Candidate Profile", 0);
                    }
                    rm.SuccessFlag=1;
                    rm.Msg = "Mail Sent Successfully";
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UpdateRequisitionCandidateRejectDeclineCallBack(RequisitionCandidateHiringStatusFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateRejectDeclineCallBackReleaseAction";
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
        public async Task<ReturnMessage> DiscontinueCandidateFromBatch(DiscontinueCandidateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@Remarks", formData.Remarks);
                    const string procName = "Usp_DisconinueBatchCandidate";
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
        public async Task<ReturnMessage> InsertCallBackHistory(CallbackHistoryInsertFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CallBackHistoryId", formData.CallBackHistoryId);
                    para.Add("@RequisitionId", formData.RequisitionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CurrentHiringStatusId", formData.CurrentHiringStatusId);
                    para.Add("@IsFromBeginning", formData.IsFromBeginning);
                    para.Add("@CallBackRemarks", formData.CallBackRemarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CallbackHistory_Insert";
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
        public async Task<ReturnMessage> ApproveRejectCallbackRequest(CallbackRequestCandidateApproval formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<UDTCandidateRequisitionDetails>(formData.Requisitionwisecandidate);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateCallBackDetails", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@ApprovalStatusId", formData.ApprovalStatusId);
                    para.Add("@ApprovedBy", formData.ApprovedBy);
                    const string procName = "Usp_ROCallBackCandidateAcknowledgement";
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

        public async Task<List<SourceChannelJobList>> GetSourceChannelJobList(SearchSourceChannelJobList search)
        {
            try
            {
                List<SourceChannelJobList> returnList = new List<SourceChannelJobList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@StateId", search.StateId);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@RoleIds", search.RoleIds);
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@VerticalId", search.LocationId);
                    const string procName = "Usp_RequisitionAllocatedToSourceChannel_GetAll";
                    connection.Open();
                    returnList = connection.Query<SourceChannelJobList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> AssignReleasedCandidateToRequisition(AssignReleasedCandidateToRequisionData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@AssignedHiringStatusId", formData.AssignedHiringStatusId);
                    para.Add("@AssignedByUserId", formData.AssignedByUserId);
                    const string procName = "Usp_RealesedCandidateRequisitionTag";
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
        public async Task<List<RequisitionHoldRelease>> GetRequisitionHoldRelease(SearchRequisitionHoldRelease search)
        {
            try
            {
                List<RequisitionHoldRelease> returnList = new List<RequisitionHoldRelease>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@LocationId", search.LocationId);
                    const string procName = "Usp_RequisitionHoldRelease_GetAll";
                    connection.Open();
                    returnList = connection.Query<RequisitionHoldRelease>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UploadNaukriFeedBack> UploadNaukriProfile(DataTable dtObject)
        {
            try
            {
                UploadNaukriFeedBack uploadNaukriFeedBack = new UploadNaukriFeedBack();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@NaukriProfileData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_UploadNaukriProfile";
                    connection.Open();
                    var value = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    if (value != null)
                    {
                        uploadNaukriFeedBack.ReturnMessage = value.Read<ReturnMessage>().FirstOrDefault();
                        uploadNaukriFeedBack.candidateDetailForExcelUploads = value.Read<CandidateDetailForExcelUpload>().ToList();
                    }
                    
                    return await Task.FromResult(uploadNaukriFeedBack);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateHoldRelease(RequisitionHoldReleaseSubmitFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<RequisitionHoldReleaseData>(formData.HoldReleaseRequisitionData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HoldReleaseRequisitionData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RequisitionHoldRelease_InsertUpdate";
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

        public async Task<List<RequisitionSourceChannelDetailList>> GetRequisitionSourceChannelDetailList(SearchRequisitionSourceChannelDetailList search)
        {
            try
            {
                List<RequisitionSourceChannelDetailList> returnList = new List<RequisitionSourceChannelDetailList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_RequisitionSourcingChannel_GetAll";
                    connection.Open();
                    returnList = connection.Query<RequisitionSourceChannelDetailList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<MergeRequisitionDetailsList>> GetMergeRequisitionDetailsList(SearchMergeRequisitionList search)
        {
            try
            {
                List<MergeRequisitionDetailsList> returnList = new List<MergeRequisitionDetailsList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@RequisitionType", search.RequisitionType);
                    const string procName = "Usp_MergeRequisitionData_GetAll";
                    connection.Open();
                    returnList = connection.Query<MergeRequisitionDetailsList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ddlRequsitionList>> ddlRequsitionListgetAll(SearchddlRequsitionListgetAll search)
        {
            try
            {
                List<ddlRequsitionList> returnList = new List<ddlRequsitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LoggedinUserId", search.LoggedinUserId);
                    para.Add("@functionId", search.FunctionId);
                    para.Add("@locationId", search.LocationId);
                    para.Add("@vertical", search.VerticalId);
                    const string procName = "Usp_DDLRequisition_GetAll";
                    connection.Open();
                    returnList = connection.Query<ddlRequsitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> DeleteBeforeRequisition(DeleteBeforeRequisitionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TypeId", formData.TypeId);
                    para.Add("@DataId", formData.DataId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_DeleteBeforeRequisition";
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
        public async Task<ReturnMessage> UnMappedCandidateRequsitionInsertUpdate(UnMappedCandidateRequsitionInsertUpdate formData)
        {
            try
            {
                DataTable dtcandetails = CommonUtility.ToDataTable<CandidateDetailsCvDropTag>(formData.CandidateDetailsCvDropTag);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailsId", formData.RequisitionDetailsId);
                    para.Add("@NewRequisitionTag", formData.NewRequisitionTag);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RequisitionMap_InserUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 3);
                        emailTemplateParam.Add("@TemplateId", 74);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            for (int i = 0; i < dtcandetails.Rows.Count; i++)
                            {

                                EmailBody = EmailBody.Replace("@~@Candidate", dtcandetails.Rows[i]["CandidateName"].ToString());
                                EmailBody = EmailBody.Replace("@~@Pos", dtcandetails.Rows[i]["Position"].ToString());
                                EmailBody = EmailBody.Replace("@~@Dep", dtcandetails.Rows[i]["Department"].ToString());
                                EmailBody = EmailBody.Replace("@~@Fun", dtcandetails.Rows[i]["Function"].ToString());
                                EmailBody = EmailBody.Replace("@~@Loc", dtcandetails.Rows[i]["Location"].ToString());
                                EmailBody = EmailBody.Replace("@~@State", dtcandetails.Rows[i]["State"].ToString());
                                EmailBody = EmailBody.Replace("@~@ReqNo", dtcandetails.Rows[i]["ReqNo"].ToString());
                                EmailBody = EmailBody.Replace("@~@UserId", dtcandetails.Rows[i]["UserId"].ToString());
                                // CommonUtility.sendEmailViaWebApi(dtcandetails.Rows[i]["EmailId"].ToString(), "Job Application - MRF Limited", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, 0, 0, 0, 29, 103, dtcandetails.Rows[i]["EmailId"].ToString(), EmailBody, "New Joiners Assessment Summary - MRF Limited", Convert.ToInt32(formData.CreatedBy));
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

    }
}
