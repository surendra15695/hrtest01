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
    public class ResignationRepository : DatabaseContext, IResignationRepository
    {
        public ResignationRepository(AppConfiguration appConfiguration)
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

        //        Define the permissions and expiry for the SAS token

        //       BlobSasBuilder sasBuilder = new BlobSasBuilder()
        //       {
        //           BlobContainerName = containerName,
        //           BlobName = blobName,
        //           Resource = "b", // "b" for blob
        //            StartsOn = DateTimeOffset.UtcNow,
        //           ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), // Adjust expiry as needed
        //            Protocol = SasProtocol.Https
        //       };

        //        Set permissions(e.g., read permission)
        //        sasBuilder.SetPermissions(BlobSasPermissions.Read);

        //        Generate the SAS token URI
        //       Uri sasUri = blobClient.GenerateSasUri(sasBuilder);

        //        Get the SAS token from the URI

        //       string sasToken = sasUri.Query;

        //        return sasToken;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message; // Handle error or return default SAS token
        //    }
        //}
        public async Task<ReturnMessage> ResignationInsert(ResignationFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<ResignationDataObject>(formData.ResignationData);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RoleHolderEmail> roleHolderEmailDetails = new List<RoleHolderEmail>();
                List<ResignationDetailEmail> resignationDetailEmail = new List<ResignationDetailEmail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@SepIntFiles", formData.SepIntFiles);
                    para.Add("@ResignationData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Resignation_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 45);
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
                                        requisitionDeatilsRoleHolderParam.Add("@ResignationId", rm.Id);
                                        const string requisitionDetailsRoleHolderProcName = "Usp_ResignationDetails_GetAll";
                                        resignationDetailEmail = connection.Query<ResignationDetailEmail>(requisitionDetailsRoleHolderProcName, requisitionDeatilsRoleHolderParam, commandType: CommandType.StoredProcedure).ToList();

                                        // Get particular list for a function
                                        var modifiedList = resignationDetailEmail.FindAll(x => x.FunctionId == item.FunctionId);

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
                                                    "<td style='border: 1px solid #000; padding:4px;'>" + "Resignation" + "</td>" +
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

        public async Task<ReturnMessage> ResignationUpdate(ResignationUpdateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationDetailId", formData.ResignationDetailId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@JobTypeId", formData.JobTypeId);
                    para.Add("@JobDescriptionId", formData.JobDescriptionId);
                    para.Add("@TargetDate", formData.TargetDate);
                    para.Add("@DOR", formData.DOR);
                    para.Add("@LWD", formData.LWD);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@SepInt", formData.SepInt);
                    para.Add("@ClarificationRemarks", formData.ClarificationRemarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Resignation_Update";
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

        public async Task<List<ResignationList>> GetAllResignationList(SearchResignationList formData)
        {
            try
            {
                List<ResignationList> dataList = new List<ResignationList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationId", formData.ResignationId);
                    para.Add("@ResignationDetailId", formData.ResignationDetailId);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@ReasonId", formData.ReasonId);
                    para.Add("@ResignationApprovalStatus", formData.ResignationApprovalStatus);
                    para.Add("@ResignationProcessStatus", formData.ResignationProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Resignation_GetAll";
                    connection.Open();
                    dataList = connection.Query<ResignationList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "resignationfiles";
                    foreach (var List in dataList)
                    {
                        if (List.SepInt != null)
                        {
                            string SepInt = Path.GetFileName(List.SepInt);
                            string CandiadateResinationDoc = DownloadedFile(SepInt, ContainerReference);
                            List.SepInt = CandiadateResinationDoc;
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

        public async Task<ReturnMessage> ResignationAcknowledgement(ResignationAcknowledgementFormData formData)
        {
            try
            {                
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationDetailId", formData.ResignationDetailId);
                    para.Add("@AcknowledgementStatusId", formData.AcknowledgementStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ResignationAcknowledgement";
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

        public async Task<ReturnMessage> MergeResignation(MergeResignationFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<MergeResignationData>(formData.ResignationData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_MergeResignation";
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

        public async Task<ReturnMessage> ResignationApproveReject(ResignationApproveRejectFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationDetailId", formData.ResignationDetailId);
                    para.Add("@StatusId", formData.StatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ResignationApproveReject";
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

        public async Task<List<ResignationHoldRelease>> GetAllResignationHoldReleaseList(SearchResignationHoldRelease formData)
        {
            try
            {
                List<ResignationHoldRelease> dataList = new List<ResignationHoldRelease>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ResignationHoldRelease_GetAll";
                    connection.Open();
                    dataList = connection.Query<ResignationHoldRelease>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateHoldRelease(ResignationHoldReleaseSubmitFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<ResignationHoldReleaseData>(formData.HoldReleaseResignationData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HoldReleaseResignationData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ResignationHoldRelease_InsertUpdate";
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

        public async Task<ReturnMessage> SendClarification(ResignationClarificationFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationDetailId", formData.ResignationDetailId);
                    para.Add("@ClarificationRemarks", formData.ClarificationRemarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ResignationClarification_Insert";
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

        public async Task<List<ResignationClarificationList>> GetAllResignationClarification(SearchResignationClarification formData)
        {
            try
            {
                List<ResignationClarificationList> dataList = new List<ResignationClarificationList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ResignationDetailId", formData.ResignationDetailId);
                    const string procName = "Usp_ResignationClarification_GetAll";
                    connection.Open();
                    dataList = connection.Query<ResignationClarificationList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> DeleteResignation(DeleteResignationFormData formData)
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
                    const string procName = "Usp_DeleteBeforeResignation";
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
