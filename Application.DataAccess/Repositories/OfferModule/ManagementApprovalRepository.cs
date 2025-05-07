using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
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

namespace Application.DataAccess.Repositories.OfferModule
{
    public class ManagementApprovalRepository : DatabaseContext, IManagementApprovalRepository
    {
        public ManagementApprovalRepository(AppConfiguration appConfiguration)
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
        //public async Task<ManagementApproval> GetManagementApprovalData(SearchManagementApproval search)  // By Amartya on 05-08-2023
        //{
        //    try
        //    {
        //        ManagementApproval dataList = new ManagementApproval();
        //        using (IDbConnection connection = base.GetConnection())
        //        {
        //            var para = new DynamicParameters();
        //            para.Add("@ManagementApprovalId", search.ManagementApprovalId);
        //            para.Add("@CandidateId", search.CandidateId);
        //            para.Add("@RequisitionDetailId", search.RequisitionDetailId);
        //            const string procName = "Usp_ManagementApproval_GetAll";
        //            connection.Open();
        //            //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
        //            //return await Task.FromResult(returnList);
        //            var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
        //            dataList.ManagementApprovalMaster = returnList.Read<ManagementApprovalMasterData>().FirstOrDefault();
        //            dataList.ManagementApprovalCandidates = returnList.Read<ManagementApprovalCandidates>().ToList();
        //            dataList.ManagementApprovalVacancy = returnList.Read<ManagementApprovalVacancy>().ToList();
        //            dataList.ManagementApprovalSigntureFrom = returnList.Read<ManagementApprovalSigntureFrom>().ToList();
        //            dataList.ManagementApprovalSigntureTo = returnList.Read<ManagementApprovalSigntureTo>().ToList();

        //            String ContainerReference = "managementapprovaldocumentapproved";
        //            foreach (var List in dataList.ManagementApprovalCandidates)
        //            {
        //                if (List.ApprovedDocument != "")
        //                {
        //                    string CandiadateApprovedDocument = Path.GetFileName(List.ApprovedDocument);
        //                    string AttachmentLink = DownloadedFile(CandiadateApprovedDocument, ContainerReference);
        //                    List.ApprovedDocument = AttachmentLink;
        //                }
        //            }
        //            return await Task.FromResult(dataList);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<ManagementApprovalGet> GetManagementApprovalData(SearchManagementApproval search)  // By Amartya on 05-08-2023
        {
            try
            {
                ManagementApprovalGet dataList = new ManagementApprovalGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", search.ManagementApprovalId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_ManagementApproval_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ManagementApprovalMaster = returnList.Read<ManagementApprovalMasterData>().FirstOrDefault();
                    dataList.ManagementApprovalCandidatesget = returnList.Read<ManagementApprovalCandidatesGet>().ToList();
                    dataList.ManagementApprovalVacancy = returnList.Read<ManagementApprovalVacancy>().ToList();
                    dataList.ManagementApprovalSigntureFrom = returnList.Read<ManagementApprovalSigntureFrom>().ToList();
                    dataList.ManagementApprovalSigntureTo = returnList.Read<ManagementApprovalSigntureTo>().ToList();

                    String ContainerReference = "managementapprovaldocumentapproved";
                    foreach (var List in dataList.ManagementApprovalCandidatesget)
                    {
                        if (List.ApprovedDocument != "")
                        {
                            string CandiadateApprovedDocument = Path.GetFileName(List.ApprovedDocument);
                            string AttachmentLink = DownloadedFile(CandiadateApprovedDocument, ContainerReference);
                            List.ApprovedDocument = AttachmentLink;
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


        public async Task<ReturnMessage> InsertManagementApproval(ManagementApprovalMasterSaveNew formData)  
        {
            try
            {
                DataTable dtCandidate = CommonUtility.ToDataTable<ManagementApprovalCandidatesGet>(formData.ManagementApprovalCandidates);
                DataTable dtVacancy = CommonUtility.ToDataTable<ManagementApprovalVacancy>(formData.ManagementApprovalVacancy);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", formData.ManagementApprovalId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@From", formData.From);
                    para.Add("@To", formData.To);
                    para.Add("@Date", formData.Date);
                    para.Add("@Note", formData.Note);
                    para.Add("@BottomNote", formData.BottomNote);
                    para.Add("@SignatureNeededFrom", formData.SignatureNeededFrom);
                    para.Add("@SignatureNeededTo", formData.SignatureNeededTo);
                    para.Add("@ManagementApprovalVacancy", dtVacancy, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ManagementApprovalCandidates", dtCandidate, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ManagementApproval_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1 && formData.Flag == "1")
                    {
                        //offline
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 86);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (formData.OCMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                // CommonUtility.sendEmailViaWebApi(formData.OCMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 9, 93, formData.OCMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
                            }
                        }
                        if (formData.OHMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);

                                // CommonUtility.sendEmailViaWebApi(formData.OHMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 9, 93, formData.OHMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
                            }
                        }
                        if (formData.OMMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                //CommonUtility.sendEmailViaWebApi(formData.OMMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 9, 93, formData.OMMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
                            }
                        }
                        if (formData.HTMailIds != "" && formData.StatusFlag == "1")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                // CommonUtility.sendEmailViaWebApi(formData.HTMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 9, 93, formData.HTMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
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

        public async Task<ManagementApprovalGet> ViewManagementApprovalData(SearchManagementApproval search)    // By Amartya on 05-08-2023
        {
            try
            {
                ManagementApprovalGet dataList = new ManagementApprovalGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", search.ManagementApprovalId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_ManagementApprovalView_getAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ManagementApprovalMaster = returnList.Read<ManagementApprovalMasterData>().FirstOrDefault();
                    dataList.ManagementApprovalCandidatesget = returnList.Read<ManagementApprovalCandidatesGet>().ToList();
                    dataList.ManagementApprovalVacancy = returnList.Read<ManagementApprovalVacancy>().ToList();
                    dataList.ManagementApprovalSigntureFrom = returnList.Read<ManagementApprovalSigntureFrom>().ToList();
                    dataList.ManagementApprovalSigntureTo = returnList.Read<ManagementApprovalSigntureTo>().ToList();

                    String ContainerReference = "managementapprovaldocumentapproved";
                    foreach (var List in dataList.ManagementApprovalCandidatesget)
                    {
                        if (List.ApprovedDocument != "")
                        {
                            string CandiadateApprovedDocument = Path.GetFileName(List.ApprovedDocument);
                            string AttachmentLink = DownloadedFile(CandiadateApprovedDocument, ContainerReference);
                            List.ApprovedDocument = AttachmentLink;
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



        //public async Task<ManagementApproval> ViewManagementApprovalData(SearchManagementApproval search)    // By Amartya on 05-08-2023
        //{
        //    try
        //    {
        //        ManagementApproval dataList = new ManagementApproval();
        //        using (IDbConnection connection = base.GetConnection())
        //        {
        //            var para = new DynamicParameters();
        //            para.Add("@ManagementApprovalId", search.ManagementApprovalId);
        //            para.Add("@CandidateId", search.CandidateId);
        //            para.Add("@RequisitionDetailId", search.RequisitionDetailId);
        //            const string procName = "Usp_ManagementApprovalView_getAll";
        //            connection.Open();
        //            //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
        //            //return await Task.FromResult(returnList);
        //            var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
        //            dataList.ManagementApprovalMaster = returnList.Read<ManagementApprovalMasterData>().FirstOrDefault();
        //            dataList.ManagementApprovalCandidates = returnList.Read<ManagementApprovalCandidates>().ToList();
        //            dataList.ManagementApprovalVacancy = returnList.Read<ManagementApprovalVacancy>().ToList();
        //            dataList.ManagementApprovalSigntureFrom = returnList.Read<ManagementApprovalSigntureFrom>().ToList();
        //            dataList.ManagementApprovalSigntureTo = returnList.Read<ManagementApprovalSigntureTo>().ToList();

        //            String ContainerReference = "managementapprovaldocumentapproved";
        //            foreach (var List in dataList.ManagementApprovalCandidates)
        //            {
        //                if (List.ApprovedDocument != "")
        //                {
        //                    string CandiadateApprovedDocument = Path.GetFileName(List.ApprovedDocument);
        //                    string AttachmentLink = DownloadedFile(CandiadateApprovedDocument, ContainerReference);
        //                    List.ApprovedDocument = AttachmentLink;
        //                }
        //            }
        //            return await Task.FromResult(dataList);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<ManagementApproval> CampusGetManagementApprovalData(SearchManagementApproval search)
        {
            try
            {
                ManagementApproval dataList = new ManagementApproval();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", search.ManagementApprovalId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_CampusGenerateMgmtApproval_get";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ManagementApprovalMaster = returnList.Read<ManagementApprovalMasterData>().FirstOrDefault();
                    dataList.ManagementApprovalCandidates = returnList.Read<ManagementApprovalCandidates>().ToList();
                    dataList.ManagementApprovalVacancy = returnList.Read<ManagementApprovalVacancy>().ToList();
                    dataList.ManagementApprovalSigntureFrom = returnList.Read<ManagementApprovalSigntureFrom>().ToList();
                    dataList.ManagementApprovalSigntureTo = returnList.Read<ManagementApprovalSigntureTo>().ToList();

                    String ContainerReference = "managementapprovaldocumentapproved";
                    foreach (var List in dataList.ManagementApprovalCandidates)
                    {
                        if (List.ApprovedDocument != "")
                        {
                            string CandiadateApprovedDocument = Path.GetFileName(List.ApprovedDocument);
                            string AttachmentLink = DownloadedFile(CandiadateApprovedDocument, ContainerReference);
                            List.ApprovedDocument = AttachmentLink;
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

        public async Task<ReturnMessage> InsertManagementApproval(ManagementApprovalMasterSave formData)
        {
            try
            {
                DataTable dtCandidate = CommonUtility.ToDataTable<ManagementApprovalCandidates>(formData.ManagementApprovalCandidates);
                DataTable dtVacancy = CommonUtility.ToDataTable<ManagementApprovalVacancy>(formData.ManagementApprovalVacancy);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", formData.ManagementApprovalId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@From", formData.From);
                    para.Add("@To", formData.To);
                    para.Add("@Date", formData.Date);
                    para.Add("@Note", formData.Note);
                    para.Add("@BottomNote", formData.BottomNote);
                    para.Add("@SignatureNeededFrom", formData.SignatureNeededFrom);
                    para.Add("@SignatureNeededTo", formData.SignatureNeededTo);
                    para.Add("@ManagementApprovalVacancy", dtVacancy, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ManagementApprovalCandidates", dtCandidate, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ManagementApproval_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1 && formData.Flag == "1")
                    {
                        //offline
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 86);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (formData.OCMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                //CommonUtility.sendEmailViaWebApi(formData.OCMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                            }
                        }
                        if (formData.OHMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);

                               // CommonUtility.sendEmailViaWebApi(formData.OHMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                            }
                        }
                        if (formData.OMMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                               // CommonUtility.sendEmailViaWebApi(formData.OMMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);

                            }
                        }
                        if (formData.HTMailIds != "" && formData.StatusFlag == "1")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                //CommonUtility.sendEmailViaWebApi(formData.HTMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);

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


        public async Task<ReturnMessage> CampusCandiateInsertManagementApproval(ManagementApprovalMasterSave formData)
        {
            try
            {
                DataTable dtCandidate = CommonUtility.ToDataTable<ManagementApprovalCandidates>(formData.ManagementApprovalCandidates);
                DataTable dtVacancy = CommonUtility.ToDataTable<ManagementApprovalVacancy>(formData.ManagementApprovalVacancy);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", formData.ManagementApprovalId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@From", formData.From);
                    para.Add("@To", formData.To);
                    para.Add("@Date", formData.Date);
                    para.Add("@Note", formData.Note);
                    para.Add("@BottomNote", formData.BottomNote);
                    para.Add("@SignatureNeededFrom", formData.SignatureNeededFrom);
                    para.Add("@SignatureNeededTo", formData.SignatureNeededTo);
                    para.Add("@ManagementApprovalVacancy", dtVacancy, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ManagementApprovalCandidates", dtCandidate, DbType.Object, ParameterDirection.Input, null);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCandiateManagementApproval_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1 && formData.Flag == "1")
                    {
                        //offline
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 86);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (formData.OCMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                               // CommonUtility.sendEmailViaWebApi(formData.OCMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                IDbConnection db=base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 45, 93, formData.OCMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
                            }
                        }
                        if (formData.OHMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);

                                //  CommonUtility.sendEmailViaWebApi(formData.OHMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 45, 93, formData.OHMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
                            }
                        }
                        if (formData.OMMailIds != "")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                //CommonUtility.sendEmailViaWebApi(formData.OMMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 45, 93, formData.OMMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
                            }
                        }
                        if (formData.HTMailIds != "" && formData.StatusFlag == "1")
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateId", formData.CandidateId);
                                EmailBody = EmailBody.Replace("@@CandidateName", formData.CandidateName);
                                //CommonUtility.sendEmailViaWebApi(formData.HTMailIds, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 45, 93, formData.HTMailIds, EmailBody, "Candidate Called Back by Recruitment Team <" + formData.CandidateId + ">-<" + formData.CandidateName + ">", Convert.ToInt32(formData.CreatedBy));
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

        public async Task<ReturnMessage> UpdateManagementApproval(ManagementApprovalMasterUpdate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", formData.ManagementApprovalId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@ApprovedDocument", formData.ApprovedDocument);
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ManagementApproval_Update";
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

        public async Task<ReturnMessage> CampusCanidateUpdateManagementApproval(ManagementApprovalMasterUpdate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", formData.ManagementApprovalId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@ApprovedDocument", formData.ApprovedDocument);
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCandidateMgmtApproval_Update";
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

        public async Task<ReturnMessage> ReuploadManagementApproval(ManagementApprovalMasterUpdate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ManagementApprovalId", formData.ManagementApprovalId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@ApprovedDocument", formData.ApprovedDocument);
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ReuploadManagementApproval";
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
