using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CandidateModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CandidateModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DataAccess.Utility;
using Application.DataAccess.Repositories.CommonModule;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using System.Net.Http;


namespace Application.DataAccess.Repositories.CandidateModule
{
    public class CandidateRepository : DatabaseContext, ICandidateRepository
    {

        public CandidateRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        {
            tempDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory);

        }
        private string tempDirectory;
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
        //public async Task<string> DownloadedFile(string filename, string ContainerReference)
        //{
        //    //string tempDirectory = Path.GetTempPath();
        //    IDbConnection connection = base.GetConnection();
        //    string ContainerName = base.GetContainerName();
        //    string AzureConnectionString = base.GetAzureConnectionString();
        //    string token = "?sv=2022-11-02&ss=b&srt=o&sp=rwlac&se=2027-04-05T18:29:30Z&st=2024-04-05T10:29:30Z&spr=https&sig=u8o7Nj1DAl%2B2i%2B5IMoeUmNcZr%2FLpWcOSmgho%2BUeDTTg%3D";
        //    string logFilePath = "C:\\Sayan\\Download.txt";
        //    LogToFile(logFilePath, "Starting the process");
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
        //            //localFilePath = "https://www.princexml.com/samples/invoice/invoicesample.pdf";
        //            LogToFile(logFilePath, "Before Downloading");
        //            using (HttpClient client = new HttpClient())
        //            {
        //                // Download the file bytes asynchronously
        //                byte[] fileBytes = await client.GetByteArrayAsync(localFilePath);

        //                // Get the file name from the URL
        //                string fileName = Path.GetFileName(filename);

        //                // Create the full file path in the temporary directory
        //                string filePath = Path.Combine(tempDirectory, fileName);
        //                LogToFile(logFilePath, "Before Writing");
        //                // Write the file bytes to the temporary file
        //                File.WriteAllBytes(filePath, fileBytes);
        //                LogToFile(logFilePath, $"File downloaded: {fileName}");
        //                localFilePath = filePath;
        //                // Return the file path
        //            }

        //        }
        //        return localFilePath;
        //    }
        //    catch (Exception ex)
        //    {
        //        LogToFile(logFilePath, $"Error downloading file: {ex.Message}");
        //        return (ex.Message.ToString());
        //    }
        //}
        //public async Task<string> DownloadedFiletest(string filename, string ContainerReference,string folderpath)
        //{
        //    //string tempDirectory = Path.GetTempPath();
        //    IDbConnection connection = base.GetConnection();
        //    string ContainerName = base.GetContainerName();
        //    string AzureConnectionString = base.GetAzureConnectionString();
        //    string token = "?sv=2022-11-02&ss=b&srt=o&sp=rwlac&se=2027-04-05T18:29:30Z&st=2024-04-05T10:29:30Z&spr=https&sig=u8o7Nj1DAl%2B2i%2B5IMoeUmNcZr%2FLpWcOSmgho%2BUeDTTg%3D";
        //    string logFilePath = folderpath+"\\LogFile.txt";
        //    //LogToFile(logFilePath, "Starting the process");
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
        //            //localFilePath = file.StorageUri.PrimaryUri.AbsoluteUri.ToString() + token;
        //            localFilePath = "https://www.princexml.com/samples/invoice/invoicesample.pdf";
        //            //LogToFile(logFilePath, "Before Downloading");
        //            if (!Directory.Exists(folderpath))
        //            {
        //                Directory.CreateDirectory(folderpath);
        //            }
        //            if (!File.Exists(logFilePath))
        //            {
        //                // Create the log file if it doesn't exist
        //                using (StreamWriter createWriter = File.CreateText(logFilePath))
        //                {
        //                    createWriter.WriteLine($"{DateTime.Now}: Log file created.");
        //                }
        //            }
        //            using (HttpClient client = new HttpClient())
        //            {
        //                // Download the file bytes asynchronously
        //                byte[] fileBytes = await client.GetByteArrayAsync(localFilePath);

        //                // Get the file name from the URL
        //                string fileName = Path.GetFileName(filename);
        //                LogToFile(logFilePath, "Before Downloading");
        //                // Create the full file path in the temporary directory
        //                string filePath = Path.Combine(folderpath, fileName);
        //                //LogToFile(logFilePath, "Before Writing");
        //                // Write the file bytes to the temporary file
        //                 System.IO.File.WriteAllBytesAsync(filePath, fileBytes);
        //                LogToFile(logFilePath, "After Downloading");
        //                //LogToFile(logFilePath, $"File downloaded: {fileName}");
        //                localFilePath = filePath;
        //                // Return the file path
        //            }

        //        }
        //        return localFilePath;
        //    }
        //    catch (Exception ex)
        //    {
        //        LogToFile(logFilePath, $"Error downloading file: {ex.Message}");
        //        return (ex.Message.ToString());
        //    }
        //}
        //private void LogToFile(string filePath, string logMessage)
        //{
        //    try
        //    {
        //        using (StreamWriter writer = new StreamWriter(filePath, true))
        //        {
        //            writer.WriteLine($"{DateTime.Now}: {logMessage}");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle or log any errors that occur during logging
        //        Console.WriteLine($"Error writing to log file: {ex.Message}");
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

        //        //Define the permissions and expiry for the SAS token

        //       BlobSasBuilder sasBuilder = new BlobSasBuilder()
        //       {
        //           BlobContainerName = containerName,
        //           BlobName = blobName,
        //           Resource = "b", // "b" for blob
        //            StartsOn = DateTimeOffset.UtcNow,
        //           ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), // Adjust expiry as needed
        //            Protocol = SasProtocol.Https
        //       };

        //        //Set permissions(e.g., read permission)
        //        sasBuilder.SetPermissions(BlobSasPermissions.Read);

        //        //Generate the SAS token URI
        //       Uri sasUri = blobClient.GenerateSasUri(sasBuilder);

        //        //Get the SAS token from the URI

        //       string sasToken = sasUri.Query;

        //        return sasToken;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message; // Handle error or return default SAS token
        //    }
        //}

        public async Task<List<CandidateDetail>> GetCandidate(SearchCandidate search)
        {
            try
            {
                List<CandidateDetail> returnList = new List<CandidateDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@Search", search.Search);
                    const string procName = "Usp_Candidate_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> EditCampuscandidateApplicationform(EditCampusCandidate formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", formdata.AutoUserId);
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@FormtypeId", formdata.FormtypeId);
                    para.Add("@Remarks", formdata.Remarks);
                    const string procName = "Usp_EditCampusCandidateProfileApplicationForm_GetAll";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 111);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formdata.Name);
                            EmailBody = EmailBody.Replace("@~@candidateNo", formdata.CandidateNo);
                            CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Application Form - Edit Access ", EmailBody); //NEED TO OPEN
                            //IDbConnection db =base.GetConnection();
                            //db.Open();                            
                            //CommonUtility.InsertInMailTable(db, Convert.ToInt32(formdata.CandidateId), 0, 0, 42, 117, formdata.EmailId, EmailBody, "Application Form - Edit Access", Convert.ToInt32(formdata.AutoUserId));
                            //db.Close();
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
        public async Task<ReturnMessage> Editcampuscandidateregistrationform(EditCampusCandidateRegistration formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", formdata.AutoUserId);
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@FormtypeId", formdata.FormtypeId);
                    para.Add("@Remarks", formdata.Remarks);
                    const string procName = "Usp_EditCampusCandidateProfileRegistrationForm_GetAll";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 109);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formdata.Name);
                            EmailBody = EmailBody.Replace("@~@candidateNo", formdata.CandidateNo);
                            CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Registration Form - Edit Access ", EmailBody); //NEED TO OPEN
                            //IDbConnection db = base.GetConnection();
                            //db.Open();
                            //CommonUtility.InsertInMailTable(db, Convert.ToInt32(formdata.CandidateId), 0, 0, 43, 115, formdata.EmailId, EmailBody, "Registration Form - Edit Access", Convert.ToInt32(formdata.AutoUserId));
                            //db.Close();
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
        public async Task<ReturnMessage> SaveCandidateStatus(CandidateStatus formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@RequisitionId", formdata.RequisitionId);
                    para.Add("@Remarks", formdata.Remarks);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    para.Add("@StatusId", formdata.StatusId);
                    const string procName = "Usp_CandidateStatus_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveCandidateCMDStatus(CandidateCmdStatus formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@CMDApprovalDocument", formdata.CMDApprovalDocument);
                    para.Add("@CMDApprovalNo", formdata.CMDApprovalNo);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    para.Add("@CMDApprovalRequired", formdata.CMDApprovalRequired);
                    para.Add("@CMDApprovalStatus", formdata.CMDApprovalStatus);
                    const string procName = "Usp_CandidateCMDStatus_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> SaveCandidate(Candidate formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                List<VendorRequisitionDetailsForEmail> vendorRequisitionDetailsForEmail = new List<VendorRequisitionDetailsForEmail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@PrefixId", formdata.PrefixId);
                    para.Add("@FullName", formdata.FullName);
                    para.Add("@GenderId", formdata.GenderId);
                    para.Add("@DOB", formdata.DOB);
                    para.Add("@Age", formdata.Age);
                    para.Add("@EmailId", formdata.EmailId);
                    para.Add("@ContactNo", formdata.ContactNo);
                    para.Add("@AadharNo", formdata.AadharNo);
                    para.Add("@MotherTongueId", formdata.MotherTongueId);
                    para.Add("@LaguageIds", formdata.LanguageIds);
                    para.Add("@QualificationId", formdata.QualificationId);
                    para.Add("@CourseId", formdata.CourseId);
                    para.Add("@StreamId", formdata.StreamId);
                    para.Add("@MarksPercentage", formdata.MarksPercentage);
                    para.Add("@CompletionYear", formdata.CompletionYear);
                    para.Add("@QualificationTypeId", formdata.QualificationTypeId);
                    para.Add("@ExperienceYear", formdata.ExperienceYear);
                    para.Add("@ExperienceMonth", formdata.ExperienceMonth);
                    para.Add("@CurrentCTC", formdata.CurrentCTC);
                    para.Add("@CurrentEmployer", formdata.CurrentEmployer);
                    para.Add("@CurrentDesignation", formdata.CurrentDesignation);
                    para.Add("@DomainId", formdata.DomainId);
                    para.Add("@SubDomainId", formdata.SubDomainId);
                    para.Add("@StateId", formdata.StateId);
                    para.Add("@PreviousApplied", formdata.PreviousApplied);
                    para.Add("@RelativeStatus", formdata.RelativeStatus);
                    para.Add("@RelativeName", formdata.RelativeName);
                    para.Add("@RelativeContactNo", formdata.RelativeContactNo);
                    para.Add("@ParentRelationshipId", formdata.ParentRelationshipId);
                    para.Add("@ChildRelationshipId", formdata.ChildRelationshipId);
                    para.Add("@RelationshipNotes", formdata.RelationshipNotes);
                    para.Add("@Resume", formdata.Resume);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    para.Add("@Status", formdata.Status);
                    para.Add("@SourceChannelId", formdata.SourceChannelId);
                    para.Add("@VendorId", formdata.VendorId);
                    para.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                    para.Add("@InternalCandidateRemarks", formdata.InternalCandidateRemarks);
                    const string procName = "Usp_Candidate_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    if (rm.SuccessFlag == 1 && (formdata.SourceChannelId == 4))
                    {
                        //if ((formdata.SourceChannelId == 1 || formdata.SourceChannelId==5))
                        if (formdata.RequisitionDetailId != 0)
                        {
                            var requisitionDetailsparam = new DynamicParameters();
                            requisitionDetailsparam.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                            const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                            requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();

                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 4);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", formdata.FullName);
                                EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                                EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                                EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                                EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                                EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                                EmailBody = EmailBody.Replace("@~@Location", requisitionDetailsForEmail[0].LocationOffice);
                                EmailBody = EmailBody.Replace("@~@RequisitionNo", requisitionDetailsForEmail[0].RequisitionNo);
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 4, 1, 6, formdata.EmailId, EmailBody, "Job Application -  MRF Limited", Convert.ToInt32(formdata.CreatedBy));
                                //CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Job Application -  MRF Limited", EmailBody);
                            }

                        }
                        else
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 49);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", formdata.FullName);
                                EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                                EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 4, 1, 56, formdata.EmailId, EmailBody, "Registration Successful -  MRF Limited", Convert.ToInt32(formdata.CreatedBy));
                                //CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Registration Successful -  MRF Limited", EmailBody);
                            }

                        }



                    }
                    if ((rm.SuccessFlag == 1) && (formdata.SourceChannelId == 1))
                    {
                        if (formdata.RequisitionDetailId != 0)
                        {
                            var requisitionDetailsparam = new DynamicParameters();
                            requisitionDetailsparam.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                            const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                            requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
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


                                EmailBody = EmailBody.Replace("@~@Candidate", formdata.FullName);
                                EmailBody = EmailBody.Replace("@~@Pos", requisitionDetailsForEmail[0].PositionName);
                                EmailBody = EmailBody.Replace("@~@Dep", requisitionDetailsForEmail[0].DepartmentName);
                                EmailBody = EmailBody.Replace("@~@Fun", requisitionDetailsForEmail[0].FunctionName);
                                EmailBody = EmailBody.Replace("@~@Loc", requisitionDetailsForEmail[0].LocationOffice);
                                EmailBody = EmailBody.Replace("@~@State", formdata.state);
                                EmailBody = EmailBody.Replace("@~@ReqNo", requisitionDetailsForEmail[0].RequisitionNo);
                                EmailBody = EmailBody.Replace("@~@UserId", rm.CandidateNo);
                                EmailBody = EmailBody.Replace("@~@Password", "welcome@1234");
                                CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 1, 1, 74, formdata.EmailId, EmailBody, "Job Application - MRF Limited", Convert.ToInt32(formdata.CreatedBy));
                                //edit by sayandeep Dey
                                //CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Job Application - MRF Limited", EmailBody);
                            }
                        }

                    }
                    if (rm.SuccessFlag == 1 && (formdata.SourceChannelId == 5))
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 3);
                        emailTemplateParam.Add("@TemplateId", 73);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@Candidate", formdata.FullName);
                            EmailBody = EmailBody.Replace("@~@UderId", rm.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@Pwd", "welcome@1234");
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 5, 1, 73, formdata.EmailId, EmailBody, "Registration Successful -  MRF Limited", Convert.ToInt32(formdata.CreatedBy));
                            //CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Registration Successful -  MRF Limited", EmailBody);
                        }
                    }
                    if (rm.SuccessFlag == 99 && formdata.SourceChannelId == 5)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                        const string requisitionProcName = "Usp_Get_VendorRequisitionDetailsForEmail";
                        vendorRequisitionDetailsForEmail = connection.Query<VendorRequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();

                        string EmailBody = "<html>" +
                            "<head></head>" +
                            "<body style='font-family:calibri;'>" +
                            "<h3>Vendor " + rm.VendorName + ",</h3>" +
                            "<h4>Submitted existing candidate profile for </h4>" +
                            "<h4>Position " + vendorRequisitionDetailsForEmail[0].PositionName + ",</h4>" +
                            "<h4>Department " + vendorRequisitionDetailsForEmail[0].DepartmentName + ",</h4>" +
                            "<h4>Function " + vendorRequisitionDetailsForEmail[0].FunctionName + ",</h4>" +
                            "<h4>Location " + vendorRequisitionDetailsForEmail[0].LocationOffice + ",</h4>" +
                            "<h4>Requisition No " + vendorRequisitionDetailsForEmail[0].RequisitionNo + ",</h4>" +
                            "<div>Candidate details</div>" +
                            "<br/>" +
                            "<div>Candidate No : " + rm.ExistedCandidateId + "</div>" +
                            "<div>Candidate Name : " + rm.ExistedCandidateName + "</div>" +
                            "</body>" +
                            "</html>";

                        //var emailTemplateParam = new DynamicParameters();
                        //emailTemplateParam.Add("@TemplateTypeId", 4);
                        //emailTemplateParam.Add("@TemplateId", null);
                        //emailTemplateParam.Add("@IsActive", true);
                        //const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        ////connection.Open();
                        //emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        //string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                        //EmailBody = EmailBody.Replace("@~@candidateName", formdata.FullName);
                        //EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                        //EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                        //EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                        //EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                        //EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                        //EmailBody = EmailBody.Replace("@~@Location", requisitionDetailsForEmail[0].LocationOffice);
                        //EmailBody = EmailBody.Replace("@~@RequisitionNo", requisitionDetailsForEmail[0].RequisitionNo);

                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 5, 1, 0, vendorRequisitionDetailsForEmail[0].RMEmailId, EmailBody, "Candidate Exist -  MRF Limited", Convert.ToInt32(formdata.CreatedBy));
                        //CommonUtility.sendEmailViaWebApi(vendorRequisitionDetailsForEmail[0].RMEmailId, "Candidate Exist -  MRF Limited", EmailBody);

                    }

                    //for update candidate
                    if (rm.SuccessFlag == 1 && formdata.SourceChannelId == 0)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 106);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", null);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formdata.FullName);
                            EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 1, 112, formdata.EmailId, EmailBody, "Job Application -  MRF Limited", Convert.ToInt32(formdata.CreatedBy));
                            //CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Job Application -  MRF Limited", EmailBody);
                        }

                        //string EmailBody = "<html>" +
                        //"<head></head>" +
                        //"<body style='font-family:calibri;'>" +
                        //"<h3>Dear " + formdata.FullName + ",</h3>" +
                        //"<div>User Id : " + rm.CandidateNo + "</div>" +

                        //"<br/>" +
                        //"<div>You profile is update successfully </div>" +
                        //"<div>Please find the below link to fill the profile details to initiate selection process</div>" +
                        //"<a href='https://mrfhruat.azurewebsites.net/login'>CLICK HERE</a>" +
                        //"</body>" +
                        //"</html>";


                    }
                    return await Task.FromResult(rm);
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> SaveCampusCandidate(CampusCandidateUpdate formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@PrefixId", formdata.PrefixId);
                    para.Add("@FullName", formdata.FullName);
                    para.Add("@GenderId", formdata.GenderId);
                    para.Add("@DOB", formdata.DOB);
                    para.Add("@Age", formdata.Age);
                    para.Add("@EmailId", formdata.EmailId);
                    para.Add("@ContactNo", formdata.ContactNo);
                    para.Add("@AadharNo", formdata.AadharNo);
                    para.Add("@MotherTongueId", formdata.MotherTongueId);
                    para.Add("@LaguageIds", formdata.LanguageIds);
                    para.Add("@StateId", formdata.StateId);
                    para.Add("@PreviousApplied", formdata.PreviousApplied);
                    para.Add("@RelativeStatus", formdata.RelativeStatus);
                    para.Add("@RelativeName", formdata.RelativeName);
                    para.Add("@RelativeContactNo", formdata.RelativeContactNo);
                    para.Add("@Resume", formdata.Resume);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    const string procName = "Usp_CampusCandidate_Update";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    return await Task.FromResult(rm);
                }
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> CreateCandidateProfile(CandidateDetails formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                List<VendorRequisitionDetailsForEmail> vendorRequisitionDetailsForEmail = new List<VendorRequisitionDetailsForEmail>();
                string Saltkey = Guid.NewGuid().ToString();
                string EncodePass = CommonUtility.EncodePassword(formdata.Password, Saltkey);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@PrefixId", formdata.PrefixId);
                    para.Add("@FullName", formdata.FullName);
                    para.Add("@GenderId", formdata.GenderId);
                    para.Add("@DOB", formdata.DOB);
                    para.Add("@Age", formdata.Age);
                    para.Add("@EmailId", formdata.EmailId);
                    para.Add("@ContactNo", formdata.ContactNo);
                    para.Add("@AadharNo", formdata.AadharNo);
                    para.Add("@MotherTongueId", formdata.MotherTongueId);
                    para.Add("@LaguageIds", formdata.LanguageIds);
                    para.Add("@QualificationId", formdata.QualificationId);
                    para.Add("@CourseId", formdata.CourseId);
                    para.Add("@StreamId", formdata.StreamId);
                    para.Add("@MarksPercentage", formdata.MarksPercentage);
                    para.Add("@CompletionYear", formdata.CompletionYear);
                    para.Add("@QualificationTypeId", formdata.QualificationTypeId);
                    para.Add("@ExperienceYear", formdata.ExperienceYear);
                    para.Add("@ExperienceMonth", formdata.ExperienceMonth);
                    para.Add("@CurrentCTC", formdata.CurrentCTC);
                    para.Add("@CurrentEmployer", formdata.CurrentEmployer);
                    para.Add("@CurrentDesignation", formdata.CurrentDesignation);
                    para.Add("@DomainId", formdata.DomainId);
                    para.Add("@SubDomainId", formdata.SubDomainId);
                    para.Add("@StateId", formdata.StateId);
                    para.Add("@PreviousApplied", formdata.PreviousApplied);
                    para.Add("@RelativeStatus", formdata.RelativeStatus);
                    para.Add("@RelativeName", formdata.RelativeName);
                    para.Add("@RelativeContactNo", formdata.RelativeContactNo);
                    para.Add("@ParentRelationshipId", formdata.ParentRelationshipId);
                    para.Add("@ChildRelationshipId", formdata.ChildRelationshipId);
                    para.Add("@RelationshipNotes", formdata.RelationshipNotes);
                    para.Add("@Resume", formdata.Resume);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    para.Add("@Status", formdata.Status);
                    para.Add("@SourceChannelId", 2);
                    para.Add("@VendorId", formdata.VendorId);
                    para.Add("@RequisitionDetailId", 0);
                    para.Add("@InternalCandidateRemarks", formdata.InternalCandidateRemarks);
                    para.Add("@Password", EncodePass);
                    para.Add("@saltkey", Saltkey);
                    const string procName = "Usp_CreateCandidateProfile_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 3);
                        emailTemplateParam.Add("@TemplateId", 72);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@CandidateName", formdata.FullName);
                            EmailBody = EmailBody.Replace("@~@UserId", rm.RefNo);
                            EmailBody = EmailBody.Replace("@~@Password", formdata.Password);
                            CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Registration Successful - MRF Limited", EmailBody);  // NEED TO OPEN
                            //CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 2, 72, formdata.EmailId, EmailBody, "Registration Successful - MRF Limited", 0);
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


        public async Task<List<CandidateDetailData>> GetCandidateDetail(SearchCandidateDetail search)
        {
            try
            {
                List<CandidateDetailData> returnList = new List<CandidateDetailData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@GenderIds", search.GenderIds);
                    para.Add("@FromAge", search.FromAge);
                    para.Add("@ToAge", search.ToAge);
                    para.Add("@AadharNo", search.AadharNo);
                    para.Add("@ContactNo", search.ContactNo);
                    para.Add("@EmailId", search.EmailId);
                    para.Add("@MotherTongueIds", search.MotherTongueIds);
                    para.Add("@QualificationIds", search.QualificationIds);
                    para.Add("@CourseIds", search.CourseIds);
                    para.Add("@StreamIds", search.StreamIds);
                    para.Add("@FromPercentage", search.FromPercentage);
                    para.Add("@ToPercentage", search.ToPercentage);
                    para.Add("@DomainIds", search.DomainIds);
                    para.Add("@SubDomainIds", search.SubDomainIds);
                    para.Add("@StateIds", search.StateIds);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FromExperience", search.FromExperience);
                    para.Add("@ToExperience", search.ToExperience);
                    para.Add("@CompletionYears", search.CompletionYears);
                    para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    para.Add("@CurrentEmployer", search.CurrentEmployer);
                    para.Add("@Designation", search.Designation);
                    para.Add("@RelativeStatus", search.RelativeStatus);
                    para.Add("@PreviousApplied", search.PreviousApplied);
                    para.Add("@CandidateOwner", search.CandidateOwner);
                    const string procName = "Usp_CandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateDetailData>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    //String ContainerReference = "candidateresume";
                    foreach (var List in returnList)
                    {
                        if (List.Resume != null)
                        {
                            String ContainerReference = "candidateresume";
                            string Document = Path.GetFileName(List.Resume);
                            //string CandiadateSignature = await  DownloadedFiletest(Document, ContainerReference,search.folderPath);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                        if (List.Applicationform != null)
                        {
                            String ContainerReference = "candidatedocument";
                            string Document = Path.GetFileName(List.Applicationform);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Applicationform = CandiadateSignature;
                        }
                        if (List.CandiadatePhoto != null)
                        {
                            String ContainerReference = "candidateprofile";
                            string Document = Path.GetFileName(List.CandiadatePhoto);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.CandiadatePhoto = CandiadateSignature;
                        }
                        if (List.CMDApprovalDocument != null)
                        {
                            String ContainerReference = "candidatemanagementapprovaldocument";
                            string Document = Path.GetFileName(List.CMDApprovalDocument);
                            string CMDApprovalDocument = DownloadedFile(Document, ContainerReference);
                            List.CMDApprovalDocument = CMDApprovalDocument;
                        }
                    }


                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CandidateDetaildummyData>> GetCandidatedummyDetail(SearchCandidateDetail search)
        {
            try
            {
                List<CandidateDetaildummyData> returnList = new List<CandidateDetaildummyData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@GenderIds", search.GenderIds);
                    para.Add("@FromAge", search.FromAge);
                    para.Add("@ToAge", search.ToAge);
                    para.Add("@AadharNo", search.AadharNo);
                    para.Add("@ContactNo", search.ContactNo);
                    para.Add("@EmailId", search.EmailId);
                    para.Add("@MotherTongueIds", search.MotherTongueIds);
                    para.Add("@QualificationIds", search.QualificationIds);
                    para.Add("@CourseIds", search.CourseIds);
                    para.Add("@StreamIds", search.StreamIds);
                    para.Add("@FromPercentage", search.FromPercentage);
                    para.Add("@ToPercentage", search.ToPercentage);
                    para.Add("@DomainIds", search.DomainIds);
                    para.Add("@SubDomainIds", search.SubDomainIds);
                    para.Add("@StateIds", search.StateIds);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FromExperience", search.FromExperience);
                    para.Add("@ToExperience", search.ToExperience);
                    para.Add("@CompletionYears", search.CompletionYears);
                    para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    para.Add("@CurrentEmployer", search.CurrentEmployer);
                    para.Add("@Designation", search.Designation);
                    para.Add("@RelativeStatus", search.RelativeStatus);
                    para.Add("@PreviousApplied", search.PreviousApplied);
                    para.Add("@CandidateOwner", search.CandidateOwner);
                    const string procName = "Usp_CandidateListdummy_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateDetaildummyData>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "candidateresume";
                    foreach (var List in returnList)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                    }


                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<CandidateDetailData>> CandidateDetailsSalaryFitment(SearchCandidateDetail search)
        {
            try
            {
                List<CandidateDetailData> returnList = new List<CandidateDetailData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@GenderIds", search.GenderIds);
                    para.Add("@FromAge", search.FromAge);
                    para.Add("@ToAge", search.ToAge);
                    para.Add("@AadharNo", search.AadharNo);
                    para.Add("@ContactNo", search.ContactNo);
                    para.Add("@EmailId", search.EmailId);
                    para.Add("@MotherTongueIds", search.MotherTongueIds);
                    para.Add("@QualificationIds", search.QualificationIds);
                    para.Add("@CourseIds", search.CourseIds);
                    para.Add("@StreamIds", search.StreamIds);
                    para.Add("@FromPercentage", search.FromPercentage);
                    para.Add("@ToPercentage", search.ToPercentage);
                    para.Add("@DomainIds", search.DomainIds);
                    para.Add("@SubDomainIds", search.SubDomainIds);
                    para.Add("@StateIds", search.StateIds);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FromExperience", search.FromExperience);
                    para.Add("@ToExperience", search.ToExperience);
                    para.Add("@CompletionYears", search.CompletionYears);
                    para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    para.Add("@CurrentEmployer", search.CurrentEmployer);
                    para.Add("@Designation", search.Designation);
                    para.Add("@RelativeStatus", search.RelativeStatus);
                    para.Add("@PreviousApplied", search.PreviousApplied);
                    para.Add("@CandidateOwner", search.CandidateOwner);
                    const string procName = "Usp_SalaryFitmentCandidate_get";
                    connection.Open();
                    returnList = connection.Query<CandidateDetailData>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "candidateresume";
                    foreach (var List in returnList)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                    }


                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateDetailData>> GetCvDropCandidateList(filtercandidatedetail search)
        {
            try
            {
                List<CandidateDetailData> returnList = new List<CandidateDetailData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@HiringStatusIds", search.HiringStatusId);
                    para.Add("@requisitionMapped", search.RequisitionDetailId);
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@CandidateNo", search.CandidateNo);
                    //para.Add("@CandidateName", search.CandidateName);
                    //para.Add("@HiringStatusId", search.HiringStatusId);
                    //para.Add("@GenderIds", search.GenderIds);
                    //para.Add("@FromAge", search.FromAge);
                    //para.Add("@ToAge", search.ToAge);
                    //para.Add("@AadharNo", search.AadharNo);
                    //para.Add("@ContactNo", search.ContactNo);
                    //para.Add("@EmailId", search.EmailId);
                    //para.Add("@MotherTongueIds", search.MotherTongueIds);
                    //para.Add("@LanguageKnownIds", search.LanguageKnownIds);
                    //para.Add("@QualificationIds", search.QualificationIds);
                    //para.Add("@CourseIds", search.CourseIds);
                    //para.Add("@StreamIds", search.StreamIds);
                    //para.Add("@FromPercentage", search.FromPercentage);
                    //para.Add("@ToPercentage", search.ToPercentage);
                    //para.Add("@DomainIds", search.DomainIds);
                    //para.Add("@SubDomainIds", search.SubDomainIds);
                    //para.Add("@StateIds", search.StateIds);
                    //para.Add("@SourceChannelId", search.SourceChannelId);
                    //para.Add("@CreatedBy", search.CreatedBy);
                    //para.Add("@FromDate", search.FromDate);
                    //para.Add("@ToDate", search.ToDate);
                    //para.Add("@FromExperience", search.FromExperience);
                    //para.Add("@ToExperience", search.ToExperience);
                    //para.Add("@CompletionYears", search.CompletionYears);
                    //para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    //para.Add("@CurrentEmployer", search.CurrentEmployer);
                    //para.Add("@Designation", search.Designation);
                    //para.Add("@RelativeStatus", search.RelativeStatus);
                    //para.Add("@PreviousApplied", search.PreviousApplied);
                    //para.Add("@CandidateOwner", search.CandidateOwner);
                    //para.Add("@University", search.University);
                    //para.Add("@Institution", search.Institution);
                    //para.Add("@ApplicationCount", search.ApplicationCount);
                    //para.Add("@RequisitionStatus", search.RequisitionStatus);


                    //para.Add("@FunctionId", search.FunctionId);
                    //para.Add("@LocationId", search.LocationId);
                    //para.Add("@InterviewStatus", search.HiringStatusId);
                    //para.Add("@Comments", search.Comments);
                    //para.Add("@CandidateNo", search.CandidateNo);
                    //para.Add("@CandidateName", search.CandidateName);
                    //para.Add("@HiringStatusId", search.HiringStatusId);
                    //para.Add("@GenderIds", search.GenderIds);
                    //para.Add("@FromAge", search.FromAge);
                    //para.Add("@ToAge", search.ToAge);
                    //para.Add("@AadharNo", search.AadharNo);
                    //para.Add("@ContactNo", search.ContactNo);
                    //para.Add("@EmailId", search.EmailId);
                    //para.Add("@MotherTongueIds", search.MotherTongueIds);
                    //para.Add("@LanguageKnownIds", search.LanguageKnownIds);
                    //para.Add("@QualificationIds", search.QualificationIds);
                    //para.Add("@CourseIds", search.CourseIds);
                    //para.Add("@StreamIds", search.StreamIds);
                    //para.Add("@FromPercentage", search.FromPercentage);
                    //para.Add("@ToPercentage", search.ToPercentage);
                    //para.Add("@DomainIds", search.DomainIds);
                    //para.Add("@SubDomainIds", search.SubDomainIds);
                    //para.Add("@StateIds", search.StateIds);
                    //para.Add("@SourceChannelId", search.SourceChannelId);
                    //para.Add("@CreatedBy", search.CreatedBy);
                    //para.Add("@FromDate", search.FromDate);
                    //para.Add("@ToDate", search.ToDate);
                    //para.Add("@FromExperience", search.FromExperience);
                    //para.Add("@ToExperience", search.ToExperience);
                    //para.Add("@CompletionYears", search.CompletionYears);
                    //para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    //para.Add("@CurrentEmployer", search.CurrentEmployer);
                    //para.Add("@Designation", search.Designation);
                    //para.Add("@RelativeStatus", search.RelativeStatus);
                    //para.Add("@PreviousApplied", search.PreviousApplied);
                    //para.Add("@CandidateOwner", search.CandidateOwner);
                    //para.Add("@University", search.University);
                    //para.Add("@Institution", search.Institution);
                    //para.Add("@ApplicationCount", search.ApplicationCount);
                    //para.Add("@RequisitionStatus", search.RequisitionStatus);
                    //para.Add("@RequisitionNo", search.RequisitionNo);
                    //para.Add("@VerticalId", search.VerticalId);
                    //para.Add("@FunctionId", search.FunctionId);
                    //para.Add("@LocationId", search.LocationId);
                    const string procName = "Usp_CvDropCandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateDetailData>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "candidateresume";
                    foreach (var List in returnList)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                    }


                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<CandidateDetailData>> GetCvDropCandidateListNew(filtercandidatedetailNew search)
        {
            try
            {
                List<CandidateDetailData> returnList = new List<CandidateDetailData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@HiringStatusIds", search.HiringStatusId);
                    para.Add("@requisitionMapped", search.RequisitionDetailId);
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@CandidateName", search.CandidateName);
                    //para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@GenderIds", search.GenderIds);
                    para.Add("@FromAge", search.FromAge);
                    para.Add("@ToAge", search.ToAge);
                    para.Add("@AadharNo", search.AadharNo);
                    para.Add("@ContactNo", search.ContactNo);
                    para.Add("@EmailId", search.EmailId);
                    para.Add("@MotherTongueIds", search.MotherTongueIds);
                    para.Add("@LanguageKnownIds", search.LanguageKnownIds);
                    para.Add("@QualificationIds", search.QualificationIds);
                    para.Add("@CourseIds", search.CourseIds);
                    para.Add("@StreamIds", search.StreamIds);
                    para.Add("@FromPercentage", Convert.ToDecimal(search.FromPercentage));
                    para.Add("@ToPercentage", Convert.ToDecimal(search.ToPercentage));
                    para.Add("@DomainIds", search.DomainIds);
                    para.Add("@SubDomainIds", search.SubDomainIds);
                    para.Add("@StateIds", search.StateIds);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FromExperience", search.FromExperience);
                    para.Add("@ToExperience", search.ToExperience);
                    para.Add("@CompletionYears", search.CompletionYears);
                    para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    para.Add("@CurrentEmployer", search.CurrentEmployer);
                    para.Add("@Designation", search.Designation);
                    para.Add("@RelativeStatus", search.RelativeStatus);
                    para.Add("@PreviousApplied", search.PreviousApplied);
                    para.Add("@CandidateOwner", search.CandidateOwner);
                    para.Add("@University", search.University);
                    para.Add("@Institution", search.Institution);
                    para.Add("@ApplcationFormStatus", search.ApplicationCount);
                    para.Add("@RMProcessStatus", search.RequisitionStatus);
                    para.Add("@RefferedVerticalId", search.RefferedVerticalId);
                    para.Add("@RefferedFunctionId", search.RefferedFunctionId);
                    para.Add("@RefferedDepartmentId", search.RefferedDepartmentId);
                    para.Add("@pagesize", search.pagesize);
                    para.Add("@pagenumber", search.pagenumber);
                    //para.Add("@FunctionId", search.FunctionId);
                    //para.Add("@LocationId", search.LocationId);
                    //para.Add("@InterviewStatus", search.HiringStatusId);
                    //para.Add("@Comments", search.Comments);
                    //para.Add("@CandidateNo", search.CandidateNo);
                    //para.Add("@CandidateName", search.CandidateName);
                    //para.Add("@HiringStatusId", search.HiringStatusId);
                    //para.Add("@GenderIds", search.GenderIds);
                    //para.Add("@FromAge", search.FromAge);
                    //para.Add("@ToAge", search.ToAge);
                    //para.Add("@AadharNo", search.AadharNo);
                    //para.Add("@ContactNo", search.ContactNo);
                    //para.Add("@EmailId", search.EmailId);
                    //para.Add("@MotherTongueIds", search.MotherTongueIds);
                    //para.Add("@LanguageKnownIds", search.LanguageKnownIds);
                    //para.Add("@QualificationIds", search.QualificationIds);
                    //para.Add("@CourseIds", search.CourseIds);
                    //para.Add("@StreamIds", search.StreamIds);
                    //para.Add("@FromPercentage", search.FromPercentage);
                    //para.Add("@ToPercentage", search.ToPercentage);
                    //para.Add("@DomainIds", search.DomainIds);
                    //para.Add("@SubDomainIds", search.SubDomainIds);
                    //para.Add("@StateIds", search.StateIds);
                    //para.Add("@SourceChannelId", search.SourceChannelId);
                    //para.Add("@CreatedBy", search.CreatedBy);
                    //para.Add("@FromDate", search.FromDate);
                    //para.Add("@ToDate", search.ToDate);
                    //para.Add("@FromExperience", search.FromExperience);
                    //para.Add("@ToExperience", search.ToExperience);
                    //para.Add("@CompletionYears", search.CompletionYears);
                    //para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    //para.Add("@CurrentEmployer", search.CurrentEmployer);
                    //para.Add("@Designation", search.Designation);
                    //para.Add("@RelativeStatus", search.RelativeStatus);
                    //para.Add("@PreviousApplied", search.PreviousApplied);
                    //para.Add("@CandidateOwner", search.CandidateOwner);
                    //para.Add("@University", search.University);
                    //para.Add("@Institution", search.Institution);
                    //para.Add("@ApplicationCount", search.ApplicationCount);
                    //para.Add("@RequisitionStatus", search.RequisitionStatus);
                    //para.Add("@RequisitionNo", search.RequisitionNo);
                    //para.Add("@VerticalId", search.VerticalId);
                    //para.Add("@FunctionId", search.FunctionId);
                    //para.Add("@LocationId", search.LocationId);

                    const string procName = "Usp_DropCvCandidateList_getAll";
                    connection.Open();
                    returnList = connection.Query<CandidateDetailData>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "candidateresume";
                    foreach (var List in returnList)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                    }


                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CVDropCandidateDataList>> GetAllCVDropCandidateDetails(cvdropcandidate search)
        {
            try
            {
                List<CVDropCandidateDataList> returnList = new List<CVDropCandidateDataList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@HiringStatusIds", search.HiringStatusId);
                    para.Add("@requisitionMapped", search.requisitionMapped);
                    para.Add("@requisitionDetailId", search.requisitionDetailId);

                    const string procName = "Usp_CvDropReqCandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CVDropCandidateDataList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "candidateresume";
                    foreach (var List in returnList)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                    }


                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //comment by kuntal
        public async Task<ReturnMessage> CreateUserRegistration(CandidateRegistration formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    string SaltKey = Guid.NewGuid().ToString();
                    string EncodePass = CommonUtility.EncodePassword(formdata.Password, SaltKey);
                    var para = new DynamicParameters();
                    para.Add("@EmailId", formdata.EmailId);
                    para.Add("@Name", formdata.Name);
                    para.Add("@SaltKey", SaltKey);
                    para.Add("@CandidatePass", EncodePass);
                    para.Add("@SourceChannelId", 2);
                    const string procName = "Usp_CandidateRegistration";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 3);
                        emailTemplateParam.Add("@TemplateId", 72);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@CandidateName", formdata.Name);
                            EmailBody = EmailBody.Replace("@~@UserId", rm.RefNo);
                            EmailBody = EmailBody.Replace("@~@Password", formdata.Password);
                           // CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Registration Successful - MRF Limited", EmailBody);
                            CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 2, 72, formdata.EmailId, EmailBody, "Registration Successful - MRF Limited", 0);

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

        public async Task<CandidateData> GetCandidateData(SearchCandidateData search)
        {
            try
            {
                CandidateData returnList = new CandidateData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_Candidate_Get";
                    connection.Open();
                    returnList = connection.Query<CandidateData>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    String ContainerReference = "candidateresume";
                    if (returnList.Resume != null && returnList.Resume != "")
                    {
                        string Document = Path.GetFileName(returnList.Resume);
                        string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                        returnList.Resume = CandiadateSignature;
                    }

                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CampusCandidateDataGet> GetCampusCandidateData(SearchCandidateData search)
        {
            try
            {
                CampusCandidateDataGet returnList = new CampusCandidateDataGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CampusCandidateUpdateProfile_Get";
                    connection.Open();
                    returnList = connection.Query<CampusCandidateDataGet>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    String ContainerReference = "candidateresume";
                    if (returnList.Resume != null && returnList.Resume != "")
                    {
                        string Document = Path.GetFileName(returnList.Resume);
                        string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                        returnList.Resume = CandiadateSignature;
                    }

                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> CandidateApplyJob(ApplyJobExternal formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    para.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    const string procName = "Usp_CandidateApplyJob";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
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


                            EmailBody = EmailBody.Replace("@~@Candidate", formdata.Name);
                            EmailBody = EmailBody.Replace("@~@Pos", formdata.position);
                            EmailBody = EmailBody.Replace("@~@Dep", formdata.department);
                            EmailBody = EmailBody.Replace("@~@Fun", formdata.function);
                            EmailBody = EmailBody.Replace("@~@Loc", formdata.location);
                            EmailBody = EmailBody.Replace("@~@State", formdata.state);
                            EmailBody = EmailBody.Replace("@~@ReqNo", formdata.reqno);
                            EmailBody = EmailBody.Replace("@~@UserId", formdata.CandidateNo);
                            CommonUtility.sendEmailViaWebApi(formdata.EmailId, "Job Application - MRF Limited", EmailBody); // NEED TO OPEN
                            //CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formdata.CandidateId), 0, 0, 3, 74, formdata.EmailId, EmailBody, "Job Application - MRF Limited", 0);

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

        public async Task<List<InternalCandidate>> GetInternalCandidate(SearchInternalCandidate search)
        {
            try
            {
                List<InternalCandidate> returnList = new List<InternalCandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", search.CreatedBy);
                    const string procName = "Usp_CheckInternalCandidateProfile";
                    connection.Open();
                    returnList = connection.Query<InternalCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CandidateCheckProfileUpdate(CandidateApplyJob formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formdata.CandidateId);
                    // para.Add("@RequisitionDetailId", formdata.RequisitionDetailId);
                    // para.Add("@CreatedBy", formdata.CreatedBy);
                    const string procName = "Usp_CandidateProfileUpdateCheck";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;

                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CandidateHiringRemarks>> GetCandidateHiringRemarks(SearchCandidateHiringRemarks search)
        {
            try
            {
                List<CandidateHiringRemarks> returnList = new List<CandidateHiringRemarks>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    const string procName = "Usp_GetCandidateHistoryStatusRemarks";
                    connection.Open();
                    returnList = connection.Query<CandidateHiringRemarks>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateOfferRejectRemarks>> GetCandidateOfferRejectRemarks(SearchCandidateOfferRejectRemarks search)
        {
            try
            {
                List<CandidateOfferRejectRemarks> returnList = new List<CandidateOfferRejectRemarks>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_GetCandidateOfferRejectRemarks";
                    connection.Open();
                    returnList = connection.Query<CandidateOfferRejectRemarks>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SalaryFitmentList>> GetSalaryFitmentNewList(SearchSalaryFitment search)
        {
            try
            {
                List<SalaryFitmentList> returnList = new List<SalaryFitmentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_SalaryFitmentCandidateDetails_GetAll";
                    connection.Open();
                    returnList = connection.Query<SalaryFitmentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<OutputNaukriCandidate>> GetNaukriCandidate(InputNaukriCandidate search)
        {
            try
            {
                List<OutputNaukriCandidate> returnList = new List<OutputNaukriCandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_Get_NaukriCandidate";
                    connection.Open();
                    returnList = connection.Query<OutputNaukriCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ReqSitionDetailsData>> GetRequisitionDetailsForCandiateSearch(Searchrequisition search)
        {
            try
            {
                List<ReqSitionDetailsData> returnList = new List<ReqSitionDetailsData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@VerticalIds", search.VerticalIds);
                    para.Add("@FunctionIds", search.FunctionIds);
                    para.Add("@LocationIds", search.LocationIds);

                    const string procName = "Usp_getRequitionByLocFuncVert_Cvdrop";
                    connection.Open();
                    returnList = connection.Query<ReqSitionDetailsData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
