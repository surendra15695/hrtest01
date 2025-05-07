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
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.OfferModule
{
    public class DocumentCollectionRepository : DatabaseContext, IDocumentCollectionRepository
    {
        public DocumentCollectionRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        {
            tempDirectory = Path.GetTempPath();
        }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }

        public string localFilePath = null;
        private string tempDirectory;
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
        //public async Task<string> DownloadedFile(string filename, string ContainerReference)
        //{
        //    IDbConnection connection = base.GetConnection();
        //    string ContainerName = base.GetContainerName();
        //    string AzureConnectionString = base.GetAzureConnectionString();
        //    string token = "sv=2022-11-02&ss=b&srt=o&sp=rwlac&se=2027-04-05T18:29:30Z&st=2024-04-05T10:29:30Z&spr=https&sig=u8o7Nj1DAl%2B2i%2B5IMoeUmNcZr%2FLpWcOSmgho%2BUeDTTg%3D";
        //    MemoryStream ms = new MemoryStream();
        //    AppConfiguration ac = new AppConfiguration();
        //    DatabaseContext dc = new DatabaseContext(ac);
        //    try
        //    {
        //        if (CloudStorageAccount.TryParse(AzureConnectionString.ToString(), out CloudStorageAccount storageAccount))
        //        {
        //            CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
        //            CloudBlobContainer container = BlobClient.GetContainerReference(ContainerReference);
        //            CloudBlob file = container.GetBlobReference(filename);
        //            localFilePath = file.StorageUri.PrimaryUri.AbsoluteUri.ToString() + token;
        //            using (HttpClient client = new HttpClient())
        //            {
        //                // Download the file bytes asynchronously
        //                byte[] fileBytes = await client.GetByteArrayAsync(localFilePath);

        //                // Get the file name from the URL
        //                string fileName = Path.GetFileName(localFilePath);

        //                // Create the full file path in the temporary directory
        //                string filePath = Path.Combine(tempDirectory, fileName);

        //                // Write the file bytes to the temporary file
        //                File.WriteAllBytes(filePath, fileBytes);
        //                localFilePath = filePath;
        //                 // Return the file path
        //            }

        //        }
        //        return localFilePath;
        //    }
        //    catch (Exception ex)
        //    {
        //        return (ex.Message.ToString());
        //    }
        //}
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
        public async Task<ReturnMessage> InsertDocumentCollection(DocumentCollectionFormMasterData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidateDetailsForEmail> candidateDetailsForEmail = new List<CandidateDetailsForEmail>();

                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmailTemplateId", formData.EmailTemplateId);
                    para.Add("@EmailTemplateName", formData.EmailTemplate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_OfferDocumentCollection_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    if (rm.SuccessFlag == 1)
                    {
                        //var requisitionDetailsparam = new DynamicParameters();
                        //requisitionDetailsparam.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                        //const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                        //requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 40);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            var CandidateIds = formData.CandidateId.Split(',');
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            for (int i = 0; i < CandidateIds.Length; i++)
                            {
                                var candidateDetailsParam = new DynamicParameters();
                                candidateDetailsParam.Add("@CandidateId", CandidateIds[i]);
                                const string candidateDetailsProcName = "Usp_Get_CandidateDetails_ForEmail";
                                candidateDetailsForEmail = connection.Query<CandidateDetailsForEmail>(candidateDetailsProcName, candidateDetailsParam, commandType: CommandType.StoredProcedure).ToList();
                                if (candidateDetailsForEmail.Count > 0)
                                {

                                    var EmailBodyNew = EmailBody.Replace("@~@candidateName", candidateDetailsForEmail[0].FullName);
                                    //EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                                    //EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                                    //EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                                    //EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                                    //EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                                    //EmailBody = EmailBody.Replace("@~@Location", requisitionDetailsForEmail[0].LocationOffice);
                                    //EmailBody = EmailBody.Replace("@~@RequisitionNo", requisitionDetailsForEmail[0].RequisitionNo);
                                    IDbConnection Emailconnection = base.GetConnection();

                                    //CommonUtility.sendEmailViaWebApi(candidateDetailsForEmail[0].EmailId, "Document Collection -  MRF Limited", EmailBodyNew);
                                    CommonUtility.InsertInMailTable(Emailconnection, Convert.ToInt32(CandidateIds[i]), 0, 0,11, 46, candidateDetailsForEmail[0].EmailId, EmailBodyNew, "Document Collection -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                    Emailconnection.Close();
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
        public async Task<ReturnMessage> CampusInsertDocumentCollection(DocumentCollectionFormMasterData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidateDetailsForEmail> candidateDetailsForEmail = new List<CandidateDetailsForEmail>();

                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmailTemplateId", formData.EmailTemplateId);
                    para.Add("@EmailTemplateName", formData.EmailTemplate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusOfferDocumentCollection_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    if (rm.SuccessFlag == 1)
                    {
                        //var requisitionDetailsparam = new DynamicParameters();
                        //requisitionDetailsparam.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                        //const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                        //requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 40);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            var CandidateIds = formData.CandidateId.Split(',');
                            for (int i = 0; i < CandidateIds.Length; i++)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                var candidateDetailsParam = new DynamicParameters();
                                candidateDetailsParam.Add("@CandidateId", CandidateIds[i]);
                                const string candidateDetailsProcName = "Usp_Get_CandidateDetails_ForEmail";
                                candidateDetailsForEmail = connection.Query<CandidateDetailsForEmail>(candidateDetailsProcName, candidateDetailsParam, commandType: CommandType.StoredProcedure).ToList();
                                if (candidateDetailsForEmail.Count > 0)
                                {
                                    EmailBody = EmailBody.Replace("@~@candidateName", candidateDetailsForEmail[0].FullName);
                                    //EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                                    //EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                                    //EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                                    //EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                                    //EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                                    //EmailBody = EmailBody.Replace("@~@Location", requisitionDetailsForEmail[0].LocationOffice);
                                    //EmailBody = EmailBody.Replace("@~@RequisitionNo", requisitionDetailsForEmail[0].RequisitionNo);

                                    //CommonUtility.sendEmailViaWebApi(candidateDetailsForEmail[0].EmailId, "Document Collection -  MRF Limited", EmailBody);

                                    IDbConnection db=base.GetConnection();
                                    db.Open();
                                    CommonUtility.InsertInMailTable(db, Convert.ToInt32(CandidateIds[i]), 0, 0, 44, 46, candidateDetailsForEmail[0].EmailId, EmailBody, "Document Collection -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                    db.Close();
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
        public async Task<ReturnMessage> UpdateDocumentCollection(DocumentCollectionFormData formData)
        {
            try
            {
                DataTable dtSalary = CommonUtility.ToDataTable<SalaryData>(formData.SalaryDetails);
                DataTable dtAttch = CommonUtility.ToDataTable<AttachmentData>(formData.AttachmentDetails);
                DataTable dtReamarks = CommonUtility.ToDataTable<RemaksData>(formData.RemaksDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Salary", dtSalary, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Document", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Remarks", dtReamarks, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AttachmentDocumnetNameIdsToDelete", formData.AttachmentDocumnetNameIdsToDelete);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_OfferDocumentCollection_Update";
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
        public async Task<ReturnMessage> CampusUpdateDocumentCollection(DocumentCollectionFormData formData)
        {
            try
            {
                DataTable dtSalary = CommonUtility.ToDataTable<SalaryData>(formData.SalaryDetails);
                DataTable dtAttch = CommonUtility.ToDataTable<AttachmentData>(formData.AttachmentDetails);
                DataTable dtReamarks = CommonUtility.ToDataTable<RemaksData>(formData.RemaksDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Salary", dtSalary, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Document", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Remarks", dtReamarks, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AttachmentDocumnetNameIdsToDelete", formData.AttachmentDocumnetNameIdsToDelete);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusOfferDocumentCollection_Update";
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
        public async Task<ReturnMessage> UploadEmployeeDocumentFromEDMS(UploadDocumentFormDataEDMS formData)
        {
            try
            {
                DataTable dtAttch = CommonUtility.ToDataTable<DocumentAttachmentDataEDMS>(formData.AttachmentDocDetailsEDMS);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmployeeDocumentCollectionId", formData.EmployeeDocumentCollectionId);
                    para.Add("@EmployeeId", formData.EmployeeId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@Document", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_EmployeeDocumentCollection_InsertUpdate";
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

        public async Task<DocumentCollectionGet> GetDocumentCollectionData(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet dataList = new DocumentCollectionGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", search.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    // const string procName = "Usp_OfferDocumentCollection_GetAll";
                    const string procName = "Usp_CandidateViewDocument_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.DocumentCollectionData = returnList.Read<DocumentCollectionDataRecruiterAll>().FirstOrDefault();
                    dataList.SalaryDetails = returnList.Read<SalaryData>().ToList();
                    dataList.AttachmentDataGet = returnList.Read<AttachmentDataGet>().ToList();
                    dataList.RemaksDetails = returnList.Read<RemaksData>().ToList();


                    String ContainerReference = "";

                    if (dataList.AttachmentDataGet.Count > 0)
                    {
                        foreach (var List in dataList.AttachmentDataGet)
                        {
                            if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId != 9)
                            {
                                var pathsplit = List.DocumentPath.Split("/");  // Added by anif on 18-11-2022 for dynamic ContainerReference

                                // ContainerReference = "candidatedocument";
                                
                                if (pathsplit[0] == List.DocumentPath) {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    ContainerReference = pathsplit[1];
                                    string Document = Path.GetFileName(List.DocumentPath);
                                    string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                    List.DocumentPath = DocumentPath;
                                }
                               
                            }
                            else if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId == 9)
                            {
                                ContainerReference = "medicaldocuments";
                                string Document = Path.GetFileName(List.DocumentPath);
                                string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                List.DocumentPath = DocumentPath;

                            }
                            else
                            {
                                if (List.DocumentPath == "")
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    List.DocumentPath = "NOT AVAILABLE";
                                }

                            }

                        }

                    }
                    if (dataList.DocumentCollectionData != null)
                    {
                        ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.DocumentCollectionData.CandidateResume);
                        string CandidateResume =  DownloadedFile(Document, ContainerReference);
                        dataList.DocumentCollectionData.CandidateResume = CandidateResume;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<DocumentCollectionGet> GetCampusDocumentCollectionData(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet dataList = new DocumentCollectionGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", search.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    // const string procName = "Usp_OfferDocumentCollection_GetAll";
                    const string procName = "Usp_CampusCandidateViewDocument_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.DocumentCollectionData = returnList.Read<DocumentCollectionDataRecruiterAll>().FirstOrDefault();
                    dataList.SalaryDetails = returnList.Read<SalaryData>().ToList();
                    dataList.AttachmentDataGet = returnList.Read<AttachmentDataGet>().ToList();
                    dataList.RemaksDetails = returnList.Read<RemaksData>().ToList();


                    String ContainerReference = "";

                    if (dataList.AttachmentDataGet.Count > 0)
                    {
                        foreach (var List in dataList.AttachmentDataGet)
                        {
                            if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId != 9)
                            {
                                var pathsplit = List.DocumentPath.Split("/");  // Added by anif on 18-11-2022 for dynamic ContainerReference

                                // ContainerReference = "candidatedocument";

                                if (pathsplit[0] == List.DocumentPath)
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    ContainerReference = pathsplit[1];
                                    string Document = Path.GetFileName(List.DocumentPath);
                                    string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                    List.DocumentPath = DocumentPath;
                                }

                            }
                            else if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId == 9)
                            {
                                ContainerReference = "medicaldocuments";
                                string Document = Path.GetFileName(List.DocumentPath);
                                string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                List.DocumentPath = DocumentPath;

                            }
                            else
                            {
                                if (List.DocumentPath == "")
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    List.DocumentPath = "NOT AVAILABLE";
                                }

                            }

                        }

                    }
                    if (dataList.DocumentCollectionData != null)
                    {
                        ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.DocumentCollectionData.CandidateResume);
                        string CandidateResume =  DownloadedFile(Document, ContainerReference);
                        dataList.DocumentCollectionData.CandidateResume = CandidateResume;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<DocumentPathList>> DownloadFolder(DownloadFile_Model search)
        {
            try
            {
                List<DocumentPathList> returnList = new List<DocumentPathList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", search.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateDocumentPath_GetAll";
                    connection.Open();
                    returnList = connection.Query<DocumentPathList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<DocumentCollectionGet> GetDocumentCollectionDatAForAdditional(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet dataList = new DocumentCollectionGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", search.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    // const string procName = "Usp_OfferDocumentCollection_GetAll";
                    const string procName = "Usp_CandidateViewDocumentWithAddditionalDocument_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.DocumentCollectionData = returnList.Read<DocumentCollectionDataRecruiterAll>().FirstOrDefault();
                    dataList.SalaryDetails = returnList.Read<SalaryData>().ToList();
                    dataList.AttachmentDataGet = returnList.Read<AttachmentDataGet>().ToList();
                    dataList.RemaksDetails = returnList.Read<RemaksData>().ToList();


                    String ContainerReference = "";

                    if (dataList.AttachmentDataGet.Count > 0)
                    {
                        foreach (var List in dataList.AttachmentDataGet)
                        {
                            if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId != 9)
                            {
                                var pathsplit = List.DocumentPath.Split("/");  // Added by anif on 18-11-2022 for dynamic ContainerReference

                                // ContainerReference = "candidatedocument";
                                if (pathsplit[0] == List.DocumentPath)
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    ContainerReference = pathsplit[1];
                                    string Document = Path.GetFileName(List.DocumentPath);
                                    string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                    List.DocumentPath = DocumentPath;
                                }
                            }
                            else if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId == 9)
                            {
                                ContainerReference = "medicaldocuments";
                                string Document = Path.GetFileName(List.DocumentPath);
                                string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                List.DocumentPath = DocumentPath;

                            }
                            else
                            {
                                if (List.DocumentPath == "")
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    List.DocumentPath = "NOT AVAILABLE";
                                }

                            }

                        }

                    }
                    if (dataList.DocumentCollectionData != null)
                    {
                        ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.DocumentCollectionData.CandidateResume);
                        string CandidateResume =  DownloadedFile(Document, ContainerReference);
                        dataList.DocumentCollectionData.CandidateResume = CandidateResume;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<DocumentCollectionGet> GetCampusDocumentCollectionDatAForAdditional(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet dataList = new DocumentCollectionGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", search.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", search.RequsitaionDetailsId);
                    para.Add("@CandidateId", search.CandidateId);
                    // const string procName = "Usp_OfferDocumentCollection_GetAll";
                    const string procName = "Usp_CampusCandidateViewDocumentWithAddditionalDocument_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.DocumentCollectionData = returnList.Read<DocumentCollectionDataRecruiterAll>().FirstOrDefault();
                    dataList.SalaryDetails = returnList.Read<SalaryData>().ToList();
                    dataList.AttachmentDataGet = returnList.Read<AttachmentDataGet>().ToList();
                    dataList.RemaksDetails = returnList.Read<RemaksData>().ToList();


                    String ContainerReference = "";

                    if (dataList.AttachmentDataGet.Count > 0)
                    {
                        foreach (var List in dataList.AttachmentDataGet)
                        {
                            if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId != 9)
                            {
                                var pathsplit = List.DocumentPath.Split("/");  // Added by anif on 18-11-2022 for dynamic ContainerReference

                                // ContainerReference = "candidatedocument";
                                if (pathsplit[0] == List.DocumentPath)
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    ContainerReference = pathsplit[1];
                                    string Document = Path.GetFileName(List.DocumentPath);
                                    string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                    List.DocumentPath = DocumentPath;
                                }
                            }
                            else if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId == 9)
                            {
                                ContainerReference = "medicaldocuments";
                                string Document = Path.GetFileName(List.DocumentPath);
                                string DocumentPath =  DownloadedFile(Document, ContainerReference);
                                List.DocumentPath = DocumentPath;

                            }
                            else
                            {
                                if (List.DocumentPath == "")
                                {
                                    List.DocumentPath = "";
                                }
                                else
                                {
                                    List.DocumentPath = "NOT AVAILABLE";
                                }

                            }

                        }

                    }
                    if (dataList.DocumentCollectionData != null)
                    {
                        ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.DocumentCollectionData.CandidateResume);
                        string CandidateResume =  DownloadedFile(Document, ContainerReference);
                        dataList.DocumentCollectionData.CandidateResume = CandidateResume;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> ApproveDocumentCollection(DocumentCollectionApprovalFormData formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                DataTable dtSalary = CommonUtility.ToDataTable<SalaryApprovalData>(formData.SalaryDetails);
                DataTable dtAttch = CommonUtility.ToDataTable<AttachmentApprovalData>(formData.AttachmentDetails);
                DataTable dtReamarks = CommonUtility.ToDataTable<RemaksData>(formData.RemaksDetails);
                ReturnMessage rm = new ReturnMessage();
                var flag = 0;
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Isprocedforjoin", formData.IsProcedForJoining);
                    para.Add("@Salary", dtSalary, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Document", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Remarks", dtReamarks, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    para.Add("@IsEnabledForMedical", formData.IsEnabledForMed);
                    para.Add("@CreatedBy", formData.CreatedBy);

                   // const string procName = "Usp_OfferDocumentCollectionApproval_Update";
                    const string procName = "Usp_OfferDocumentCollectionApprovalWithAdditional_Update";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var templateId = 0;
                        foreach (var item in formData.AttachmentDetails)
                        {
                            if (item.DoumentNameId == 9 && item.ApprovalStatus == 2)
                            {
                                flag = 1;
                            }
                            else if (item.DoumentNameId == 23 && item.ApprovalStatus == 2)
                            {
                                flag = 2;
                            }
                            else if (item.ApprovalStatus == 2)
                            {
                                flag = 3;
                            }
                        }
                        if (flag == 3)
                        {
                            var requisitionDetailsparam = new DynamicParameters();
                            requisitionDetailsparam.Add("@RequisitionDetailId", formData.RequsitaionDetailsId);
                            const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                            requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 15);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId =47;
                        }
                        else if (flag == 1)
                        {

                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 69);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 79;
                        }
                        else if (flag == 2)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 70);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 80;
                        }
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.CandidateName);
                            EmailBody = EmailBody.Replace("@~@candidateNo", formData.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@password", formData.Password);
                            EmailBody = EmailBody.Replace("@~@userId", formData.CandidateNo); //rm.RefNo
                            //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Clarification Needed –Submitted  Documents - MRF Limited", EmailBody);
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 12, Convert.ToInt32(templateId), formData.EmailId, EmailBody, "Clarification Needed –Submitted  Documents - MRF Limited", Convert.ToInt32(formData.CreatedBy));

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
        public async Task<ReturnMessage> ApproveCampusDocumentCollection(DocumentCollectionApprovalFormData formData)
        {
            try
            {
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                DataTable dtSalary = CommonUtility.ToDataTable<SalaryApprovalData>(formData.SalaryDetails);
                DataTable dtAttch = CommonUtility.ToDataTable<AttachmentApprovalData>(formData.AttachmentDetails);
                DataTable dtReamarks = CommonUtility.ToDataTable<RemaksData>(formData.RemaksDetails);
                ReturnMessage rm = new ReturnMessage();
                var flag = 0;
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequsitaionDetailsId", formData.RequsitaionDetailsId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Isprocedforjoin", formData.IsProcedForJoining);
                    para.Add("@Salary", dtSalary, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Document", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Remarks", dtReamarks, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    para.Add("@IsEnabledForMedical", formData.IsEnabledForMed);
                    para.Add("@CreatedBy", formData.CreatedBy);

                    // const string procName = "Usp_OfferDocumentCollectionApproval_Update";
                    const string procName = "Usp_CampusOfferDocumentCollectionApprovalWithAdditional_Update";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        foreach (var item in formData.AttachmentDetails)
                        {
                            if (item.DoumentNameId == 9 && item.ApprovalStatus == 2)
                            {
                                flag = 1;
                            }
                            else if (item.DoumentNameId == 23 && item.ApprovalStatus == 2)
                            {
                                flag = 2;
                            }
                            else if (item.ApprovalStatus == 2)
                            {
                                flag = 3;
                            }
                        }
                        if (flag == 3)
                        {
                            var requisitionDetailsparam = new DynamicParameters();
                            requisitionDetailsparam.Add("@RequisitionDetailId", formData.RequsitaionDetailsId);
                            const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                            requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 15);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        }
                        else if (flag == 1)
                        {

                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 69);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        }
                        else if (flag == 2)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 70);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        }
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.CandidateName);
                            EmailBody = EmailBody.Replace("@~@candidateNo", formData.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@password", formData.Password);
                            EmailBody = EmailBody.Replace("@~@userId", rm.RefNo);
                            //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Clarification Needed –Submitted  Documents - MRF Limited", EmailBody);
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

