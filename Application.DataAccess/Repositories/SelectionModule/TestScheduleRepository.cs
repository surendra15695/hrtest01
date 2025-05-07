using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CandidateModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
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

namespace Application.DataAccess.Repositories.SelectionModule
{
    public class TestScheduleRepository : DatabaseContext, ITestScheduleRepository
    {
        public TestScheduleRepository(AppConfiguration appConfiguration)
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
        public async Task<ReturnMessage> TestScheduleInsert(TestScheduleFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@TestTypeId", formData.TestTypeId);
                    para.Add("@TestLink", formData.TestLink);
                    para.Add("@FromDate", formData.TestFromDate);
                    para.Add("@ToDate", formData.TestToDate);
                    para.Add("@VenueId", formData.TestVenueId);
                    para.Add("@ContactPersonName", formData.TestContactName);
                    para.Add("@ContactNo", formData.TestContactNo);
                    para.Add("@IsTravel", formData.IsTestTravel);
                    para.Add("@EmailTemplateId", formData.TestEmailTemplateId);
                    para.Add("@EmailTemplate", formData.TestEmailTemplate);
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TestSchedule_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                    List<VendorRequisitionDetailsForEmail> vendorRequisitionDetailsForEmail = new List<VendorRequisitionDetailsForEmail>();
                    if (rm.SuccessFlag == 1)
                    {
                        var requisitionDetailsparam = new DynamicParameters();
                        requisitionDetailsparam.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                        const string requisitionProcName = "Usp_Get_RequisitionDetailsForEmail";
                        requisitionDetailsForEmail = connection.Query<RequisitionDetailsForEmail>(requisitionProcName, requisitionDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                        var templateId=0;   

                        if (formData.TestTypeId == 1)
                        {
                            //offline
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 41);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 48;
                        }
                        else
                        {
                            //online
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 42);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 49;
                        }

                        if(formData.TestEmailTemplate != null)
                        {
                            string EmailBody = formData.TestEmailTemplate;
                            List<string> EmailIds = formData.EmailId.Split(',').ToList();
                            for (var i = 0; i < EmailIds.Count; i++)
                            {
                                IDbConnection Emailconnection = base.GetConnection();
                                // CommonUtility.sendEmailViaWebApi(EmailIds[i], "Schedule Test -  MRF Limited", EmailBody);
                                CommonUtility.InsertInMailTable(Emailconnection, 0, 0, 0, 7, Convert.ToInt32(templateId), EmailIds[i], EmailBody, "Schedule Test -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                Emailconnection.Close();
                            }
                        }
                        else
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@fromDate", formData.TestFromDate);
                                EmailBody = EmailBody.Replace("@~@VenueName", formData.VenueName);
                                EmailBody = EmailBody.Replace("@~@VanueAddress", formData.VanueAddress);
                                EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                                EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                                EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                                EmailBody = EmailBody.Replace("@~@ContactName", formData.ContactName);
                                EmailBody = EmailBody.Replace("@~@ContactNo", formData.ContactNo);
                                EmailBody = EmailBody.Replace("@~@TestLink", formData.TestLink);

                                // CommonUtility.sendEmailViaWebApi(formData.EmailId, "Schedule Test -  MRF Limited", EmailBody);
                                CommonUtility.InsertInMailTable(connection, 0, 0, 0, 7, Convert.ToInt32(templateId), formData.EmailId, EmailBody, "Schedule Test -  MRF Limited", Convert.ToInt32(formData.CreatedBy));

                            }
                        }

                        // Need to be change Interview Schedule candidate Email~

                        //if (emailTemplateBodyList.Count > 0)
                        //{
                        //    CandidateData returnList = new CandidateData();
                        //    string[] multiIds = formData.CandidateIds.Split(new char[] { ',' });
                        //    foreach (string cId in multiIds)
                        //    {
                        //        if (cId != "")
                        //        {
                        //            var Candidatepara = new DynamicParameters();
                        //            Candidatepara.Add("@CandidateId", cId);
                        //            const string CandidateprocName = "Usp_Candidate_Get";
                        //            returnList = connection.Query<CandidateData>(CandidateprocName, Candidatepara, commandType: CommandType.StoredProcedure).FirstOrDefault();

                        //            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                        //            EmailBody = EmailBody.Replace("@~@fromDate", formData.TestFromDate);
                        //            EmailBody = EmailBody.Replace("@~@VenueName", formData.VenueName);
                        //            EmailBody = EmailBody.Replace("@~@VanueAddress", formData.VanueAddress);
                        //            EmailBody = EmailBody.Replace("@~@Position", requisitionDetailsForEmail[0].PositionName);
                        //            EmailBody = EmailBody.Replace("@~@Department", requisitionDetailsForEmail[0].DepartmentName);
                        //            EmailBody = EmailBody.Replace("@~@Function", requisitionDetailsForEmail[0].FunctionName);
                        //            EmailBody = EmailBody.Replace("@~@ContactName", formData.ContactName);
                        //            EmailBody = EmailBody.Replace("@~@ContactNo", formData.ContactNo);
                        //            EmailBody = EmailBody.Replace("@~@TestLink", formData.TestLink);
                        //            EmailBody = EmailBody.Replace("@~@CandidateName", returnList.FullName);


                        //            CommonUtility.sendEmailViaWebApi(returnList.EmailId, "Schedule Test -  MRF Limited", EmailBody);
                        //        }
                        //    }

                        //}
                    }

                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<TestRequisitionForEmailDetails> GetTestRequisitionDetailsForEmail(SearchTestRequisitionForEmailDetails formData)  //Arghya D-29.07.22
        {
            try
            {
                TestRequisitionForEmailDetails dataList = new TestRequisitionForEmailDetails();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_Get_RequisitionDetailsForEmail";
                    dataList = connection.Query<TestRequisitionForEmailDetails>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UploadTestResult(DataTable dtObject)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestResultData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_UploadTestResult";
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

        public async Task<TestScheduleDetail> GetTestScheduleDetail(SearchTestScheduleDetail formData)
        {
            try
            {
                TestScheduleDetail dataList = new TestScheduleDetail();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_TestSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<TestScheduleDetail>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<TestResultDetail>> GetTestReult(SearchTestResult formData)
        {
            try
            {
                List<TestResultDetail> dataList = new List<TestResultDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_TestResult_GetAll";
                    connection.Open();
                    dataList = connection.Query<TestResultDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateTestTravelReimbursement>> GetCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement formData)
        {
            try
            {
                List<CandidateTestTravelReimbursement> dataList = new List<CandidateTestTravelReimbursement>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    const string procName = "Usp_CandidateTestTravelReimbursementList";
                    connection.Open();
                    dataList = connection.Query<CandidateTestTravelReimbursement>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusCandidateTestTravelReimbursement>> GetCampusCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement formData)
        {
            try
            {
                List<CampusCandidateTestTravelReimbursement> dataList = new List<CampusCandidateTestTravelReimbursement>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    const string procName = "Usp_CampusCandidateTestTravelReimbursementList";
                    connection.Open();
                    dataList = connection.Query<CampusCandidateTestTravelReimbursement>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<TestTravelReimbursement> GetCandidateTestTravelReimbursementData(SearchTestTravelReimbursement formData)
        {
            try
            {
                TestTravelReimbursement dataList = new TestTravelReimbursement();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    const string procName = "Usp_CandidateTestTravelReimbursement_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.TestTravelReimbursementData = returnList.Read<TestTravelReimbursementDetail>().FirstOrDefault();
                    dataList.TestTravelReimbursementJourneyListData = returnList.Read<TestTravelReimbursementJourneyList>().ToList();
                    dataList.TestTravelReimbursementAttachmentListData = returnList.Read<TestTravelReimbursementAttachmentList>().ToList();

                    //String ContainerReference = "testtravelreimbursement";
                    
                    if (dataList.TestTravelReimbursementData.BankStatementDocument!= "")
                    {
                        String ContainerReference = "testtravelreimbursement";
                        string SignatureName = Path.GetFileName(dataList.TestTravelReimbursementData.BankStatementDocument);
                        string BankStatementDocument = DownloadedFile(SignatureName, ContainerReference);
                        dataList.TestTravelReimbursementData.BankStatementDocument = BankStatementDocument;
                    }
                    if (dataList.TestTravelReimbursementData.DocumentPathForPDF != "")
                    {
                        String ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.TestTravelReimbursementData.DocumentPathForPDF);
                        string TestReimbursementPDF = DownloadedFile(Document, ContainerReference);
                        dataList.TestTravelReimbursementData.DocumentPathForPDF = TestReimbursementPDF;
                    }
                    foreach (var List in dataList.TestTravelReimbursementAttachmentListData)
                    {
                        if (List.AttachmentLink != "")
                        {
                            String ContainerReference = "testtravelreimbursement";
                            string CandiadatePhotoName = Path.GetFileName(List.AttachmentLink);
                            string AttachmentLink = DownloadedFile(CandiadatePhotoName, ContainerReference);
                            List.AttachmentLink = AttachmentLink;
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
        public async Task<CampusTestTravelReimbursement> GetCampusCandidateTestTravelReimbursementData(SearchTestTravelReimbursement formData)
        {
            try
            {
                CampusTestTravelReimbursement dataList = new CampusTestTravelReimbursement();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    const string procName = "Usp_CampusCandidateTestTravelReimbursement_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.TestTravelReimbursementData = returnList.Read<CampusTestTravelReimbursementDetail>().FirstOrDefault();
                    dataList.TestTravelReimbursementJourneyListData = returnList.Read<TestTravelReimbursementJourneyList>().ToList();
                    dataList.TestTravelReimbursementAttachmentListData = returnList.Read<TestTravelReimbursementAttachmentList>().ToList();

                    String ContainerReference = "testtravelreimbursement";

                    if (dataList.TestTravelReimbursementData.BankStatementDocument != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.TestTravelReimbursementData.BankStatementDocument);
                        string BankStatementDocument = DownloadedFile(SignatureName, ContainerReference);
                        dataList.TestTravelReimbursementData.BankStatementDocument = BankStatementDocument;
                    }
                    if (dataList.TestTravelReimbursementData.ProfileSignature != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.TestTravelReimbursementData.ProfileSignature);
                        string BankStatementDocument = DownloadedFile(SignatureName, "candidateprofile");
                        dataList.TestTravelReimbursementData.ProfileSignature = BankStatementDocument;
                    }
                    foreach (var List in dataList.TestTravelReimbursementAttachmentListData)
                    {
                        if (List.AttachmentLink != "")
                        {
                            string CandiadatePhotoName = Path.GetFileName(List.AttachmentLink);
                            string AttachmentLink = DownloadedFile(CandiadatePhotoName, ContainerReference);
                            List.AttachmentLink = AttachmentLink;
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
        public async Task<ReturnMessage> TestTravelReimbursementInsertUpdate(TestTravelReimbursementFormData formData)
        {
            try
            {
                DataTable dtObject1 = CommonUtility.ToDataTable<TestTravelJourneyData>(formData.JourneyData);
                DataTable dtObject2 = CommonUtility.ToDataTable<TestTravelAttachmentData>(formData.AttachmentData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TravelReimbursementId", formData.TravelReimbursementId);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    para.Add("@CommunicationAddress", formData.CommunicationAddress);
                    para.Add("@PinCode", formData.PinCode);
                    para.Add("@BankAccountName", formData.BankAccountName);
                    para.Add("@BankAccountNumber", formData.BankAccountNumber);
                    para.Add("@BankName", formData.BankName);
                    para.Add("@IFSC", formData.IFSC);
                    para.Add("@BankBranch", formData.BankBranch);
                    para.Add("@BankStatementId", formData.BankStatementId);
                    para.Add("@BankStatementDocument", formData.BankStatementDocument);
                    para.Add("@DocumentPathForPDF", formData.DocumentPathForPDF);
                    para.Add("@PreviousJourneyIds", formData.PreviousJourneyIds);
                    para.Add("@PreviousAttachmentIds", formData.PreviousAttachmentIds);
                    para.Add("@JourneyData", dtObject1, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AttachmentData", dtObject2, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TestTravelReimbursement_InsertUpdate";
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
        public async Task<ReturnMessage> CampusTestTravelReimbursementInsertUpdate(TestTravelReimbursementFormData formData)
        {
            try
            {
                DataTable dtObject1 = CommonUtility.ToDataTable<TestTravelJourneyData>(formData.JourneyData);
                DataTable dtObject2 = CommonUtility.ToDataTable<TestTravelAttachmentData>(formData.AttachmentData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TravelReimbursementId", formData.TravelReimbursementId);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    para.Add("@CommunicationAddress", formData.CommunicationAddress);
                    para.Add("@PinCode", formData.PinCode);
                    para.Add("@BankAccountName", formData.BankAccountName);
                    para.Add("@BankAccountNumber", formData.BankAccountNumber);
                    para.Add("@BankName", formData.BankName);
                    para.Add("@IFSC", formData.IFSC);
                    para.Add("@BankBranch", formData.BankBranch);
                    para.Add("@BankStatementId", formData.BankStatementId);
                    para.Add("@BankStatementDocument", formData.BankStatementDocument);
                    para.Add("@PreviousJourneyIds", formData.PreviousJourneyIds);
                    para.Add("@PreviousAttachmentIds", formData.PreviousAttachmentIds);
                    para.Add("@JourneyData", dtObject1, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AttachmentData", dtObject2, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusTestTravelReimbursement_InsertUpdate";
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
        public async Task<List<RMTestTravelReimbursementList>> GetRMTestTravelReimbursementList(SearchRMTestTravelReimbursementList formData)
        {
            try
            {
                List<RMTestTravelReimbursementList> dataList = new List<RMTestTravelReimbursementList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@ClaimStatusId", formData.ClaimStatusId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    const string procName = "Usp_TestTravelReimbusement_GetAll";
                    connection.Open();
                    dataList = connection.Query<RMTestTravelReimbursementList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    
                    String ContainerReference = "candidatedocument";
                    foreach (var List in dataList)
                    {
                        if (List.DocumentPathForPDF != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPathForPDF);
                            string TestReimbursementPDF = DownloadedFile(Document, ContainerReference);
                            List.DocumentPathForPDF = TestReimbursementPDF;
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
        public async Task<List<CampusTestTravelReimbursementList>> GetCampusTestTravelReimbursementList(SearchCampusTestTravelReimbursementList formData)
        {
            try
            {
                List<CampusTestTravelReimbursementList> dataList = new List<CampusTestTravelReimbursementList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    para.Add("@ClaimStatusId", formData.ClaimStatusId);
                    const string procName = "Usp_CampusTestTravelReimbusement_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusTestTravelReimbursementList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> TestTravelReimbursementActionInsert(TestTravelReimbursementActionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidadateDetailsForEmail> candidateEmailDetails = new List<CandidadateDetailsForEmail>();
                string[] candidateNos = new string[] { };
                if (formData.CandidateNo != null)
                {
                    candidateNos = formData.CandidateNo.Split(",");
                }
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestScheduleDetailIds", formData.TestScheduleDetailIds);
                    para.Add("@ClaimStatusId", formData.ClaimStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TestTravelReimbursementAction_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();


                    if (rm.SuccessFlag == 1 && formData.ClaimStatusId == 2)
                    {
                        foreach (var item in candidateNos)
                        {
                            var candidateEmailParameter = new DynamicParameters();
                            candidateEmailParameter.Add("@CandidateId", null);
                            candidateEmailParameter.Add("@CandidateNo", item);
                            const string candidateDFetailsProcName = "Usp_Get_CandidateDetailsForEmail";
                            candidateEmailDetails = connection.Query<CandidadateDetailsForEmail>(candidateDFetailsProcName, candidateEmailParameter, commandType: CommandType.StoredProcedure).ToList();
                            if (candidateEmailDetails.Count > 0)
                            {
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 14);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                //connection.Open();
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", candidateEmailDetails[0].FullName);
                                EmailBody = EmailBody.Replace("@~@userId", candidateEmailDetails[0].CandidateNo);
                                // CommonUtility.sendEmailViaWebApi(candidateEmailDetails[0].EmailId, "Clarification Needed – Travel Reimbursement", EmailBody);
                                IDbConnection Emailconnection = base.GetConnection();
                                CommonUtility.InsertInMailTable(Emailconnection, Convert.ToInt32(candidateEmailDetails[0].CandidateId), 0, 0, 15, 17, candidateEmailDetails[0].EmailId, EmailBody, "Clarification Needed – Travel Reimbursement", Convert.ToInt32(formData.CreatedBy));
                                Emailconnection.Close();
                            }

                        }

                    }
                    if (rm.SuccessFlag == 1 && formData.ClaimStatusId == 2 && formData.Flag == 1)//Piu
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 77);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                        EmailBody = EmailBody.Replace("@~@EmpName", candidateEmailDetails[0].FullName);
                        EmailBody = EmailBody.Replace("@~@EmpNo", candidateEmailDetails[0].EmpNo);
                        EmailBody = EmailBody.Replace("@~@Password", formData.Password);
                        EmailBody = EmailBody.Replace("@~@ReimbursementName", formData.ReimbursementName);
                        //CommonUtility.sendEmailViaWebApi(candidateEmailDetails[0].EmailId, "Clarification Needed – Travel Reimbursement", EmailBody);
                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(candidateEmailDetails[0].CandidateId), 0, 0, 15, 85, candidateEmailDetails[0].EmailId, EmailBody, "Clarification Needed – Travel Reimbursement", Convert.ToInt32(formData.CreatedBy));
                    }//Piu
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<TestTravelClarificationList>> GetTestTravelClarificationList(SearchTestTravelClarificationList formData)
        {
            try
            {
                List<TestTravelClarificationList> dataList = new List<TestTravelClarificationList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestScheduleDetailId", formData.TestScheduleDetailId);
                    const string procName = "Usp_TestTravelReimbursementClarification_GetAll";
                    connection.Open();
                    dataList = connection.Query<TestTravelClarificationList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
