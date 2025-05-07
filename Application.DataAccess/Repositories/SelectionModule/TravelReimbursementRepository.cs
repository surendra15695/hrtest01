using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.DataAccess.Utility;
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
    public class TravelReimbursementRepository : DatabaseContext, ITravelReimbursementRepository
    {
        public TravelReimbursementRepository(AppConfiguration appConfiguration)
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
        public async Task<List<CandidateTravelReimbursement>> GetCandidateTravelReimbursementList(SearchCandidateTravelReimbursement formData)
        {
            try
            {
                List<CandidateTravelReimbursement> dataList = new List<CandidateTravelReimbursement>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    const string procName = "Usp_CandidateTravelReimbursementList";
                    connection.Open();
                    dataList = connection.Query<CandidateTravelReimbursement>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusCandidateInterviewTravelReimbursement>> GetCampusCandidateInterviewTravelReimbursementList(SearchCandidateTravelReimbursement formData)
        {
            try
            {
                List<CampusCandidateInterviewTravelReimbursement> dataList = new List<CampusCandidateInterviewTravelReimbursement>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    const string procName = "Usp_CampusCandidateInterviewTravelReimbursementList";
                    connection.Open();
                    dataList = connection.Query<CampusCandidateInterviewTravelReimbursement>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<TravelReimbursement> GetCandidateTravelReimbursementData(SearchTravelReimbursement formData)
        {
            try
            {
                TravelReimbursement dataList = new TravelReimbursement();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    const string procName = "Usp_CandidateTravelReimbursement_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.TravelReimbursementData = returnList.Read<TravelReimbursementDetail>().FirstOrDefault();
                    dataList.TravelReimbursementJourneyListData = returnList.Read<TravelReimbursementJourneyList>().ToList();
                    dataList.TravelReimbursementAttachmentListData = returnList.Read<TravelReimbursementAttachmentList>().ToList();

                    //String ContainerReference = "";
                    if (dataList.TravelReimbursementData != null)
                    {
                        if (dataList.TravelReimbursementData.ProfileSignature != "")
                        {
                            String ContainerReference = "candidateprofile";
                            string SignatureName = Path.GetFileName(dataList.TravelReimbursementData.ProfileSignature);
                            string CandiadateSignature = DownloadedFile(SignatureName, ContainerReference);
                            dataList.TravelReimbursementData.ProfileSignature = CandiadateSignature;
                        }
                        if (dataList.TravelReimbursementData.BankStatementDocument != "")
                        {
                            String ContainerReference = "travelreimbursement";
                            string SignatureName = Path.GetFileName(dataList.TravelReimbursementData.BankStatementDocument);
                            string BankStatementDocument = DownloadedFile(SignatureName, ContainerReference);
                            dataList.TravelReimbursementData.BankStatementDocument = BankStatementDocument;
                        }
                        if (dataList.TravelReimbursementData.DocumentPathForPDF != "")
                        {
                            String ContainerReference = "candidatedocument";
                            string Document = Path.GetFileName(dataList.TravelReimbursementData.DocumentPathForPDF);
                            string InterviewReimbursementPDF = DownloadedFile(Document, ContainerReference);
                            dataList.TravelReimbursementData.DocumentPathForPDF = InterviewReimbursementPDF;
                        }
                    }
                        foreach (var List in dataList.TravelReimbursementAttachmentListData)
                        {
                            if (List.AttachmentLink != "")
                            {
                                String ContainerReference = "travelreimbursement";
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
        public async Task<CampusTravelReimbursement> GetCampusCandidateInterviewTravelReimbursementData(SearchTravelReimbursement formData)
        {
            try
            {
                CampusTravelReimbursement dataList = new CampusTravelReimbursement();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    const string procName = "Usp_CampusCandidateInterviewTravelReimbursement_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.TravelReimbursementData = returnList.Read<CampusTravelReimbursementDetail>().FirstOrDefault();
                    dataList.TravelReimbursementJourneyListData = returnList.Read<TravelReimbursementJourneyList>().ToList();
                    dataList.TravelReimbursementAttachmentListData = returnList.Read<TravelReimbursementAttachmentList>().ToList();

                    String ContainerReference = "travelreimbursement";

                    if (dataList.TravelReimbursementData.BankStatementDocument != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.TravelReimbursementData.BankStatementDocument);
                        string BankStatementDocument = DownloadedFile(SignatureName, ContainerReference);
                        dataList.TravelReimbursementData.BankStatementDocument = BankStatementDocument;
                    }
                    if (dataList.TravelReimbursementData.ProfileSignature != "")
                    {
                        string ProfileSignature = Path.GetFileName(dataList.TravelReimbursementData.ProfileSignature);
                        string ProfileSignaturedoc = DownloadedFile(ProfileSignature, "candidateprofile");
                        dataList.TravelReimbursementData.ProfileSignature = ProfileSignaturedoc;
                    }
                    foreach (var List in dataList.TravelReimbursementAttachmentListData)
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
        public async Task<ReturnMessage> TravelReimbursementInsertUpdate(TravelReimbursementFormData formData)
        {
            try
            {
                DataTable dtObject1 = CommonUtility.ToDataTable<TravelJourneyData>(formData.JourneyData);
                DataTable dtObject2 = CommonUtility.ToDataTable<TravelAttachmentData>(formData.AttachmentData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TravelReimbursementId", formData.TravelReimbursementId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
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
                    const string procName = "Usp_TravelReimbursement_InsertUpdate";
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
        public async Task<ReturnMessage> CampusTravelReimbursementInsertUpdate(TravelReimbursementFormData formData)
        {
            try
            {
                DataTable dtObject1 = CommonUtility.ToDataTable<TravelJourneyData>(formData.JourneyData);
                DataTable dtObject2 = CommonUtility.ToDataTable<TravelAttachmentData>(formData.AttachmentData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TravelReimbursementId", formData.TravelReimbursementId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
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
                    const string procName = "Usp_CampusInterviewTravelReimbursement_InsertUpdate";
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
        public async Task<List<RMTravelReimbursementList>> GetRMTravelReimbursementList(SearchRMTravelReimbursementList formData)
        {
            try
            {
                List<RMTravelReimbursementList> dataList = new List<RMTravelReimbursementList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@ClaimStatusId", formData.ClaimStatusId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    const string procName = "Usp_TravelReimbusement_GetAll";
                    connection.Open();
                    dataList = connection.Query<RMTravelReimbursementList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "candidatedocument";
                    foreach (var List in dataList)
                    {
                        if (List.DocumentPathForPDF != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPathForPDF);
                            string InterviewReimbursementPDF = DownloadedFile(Document, ContainerReference);
                            List.DocumentPathForPDF = InterviewReimbursementPDF;
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
        public async Task<List<CampusTravelReimbursementList>> GetCampusTravelReimbursementList(SearchCampusTravelReimbursementList formData)
        {
            try
            {
                List<CampusTravelReimbursementList> dataList = new List<CampusTravelReimbursementList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@ClaimStatusId", formData.ClaimStatusId);
                    const string procName = "Usp_CampusInterviewTravelReimbusement_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusTravelReimbursementList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> TravelReimbursementActionInsert(TravelReimbursementActionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidadateDetailsForEmail> candidateEmailDetails = new List<CandidadateDetailsForEmail>();
                string[] candidateNos = new string[] { }; 
                if (formData.CandidateNo!=null)
                {
                     candidateNos = formData.CandidateNo.Split(",");
                }
                
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewDetailIds", formData.InterviewDetailIds);
                    para.Add("@ClaimStatusId", formData.ClaimStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TravelReimbursementAction_Insert";
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

                                IDbConnection Emailconnection = base.GetConnection();
                                // CommonUtility.sendEmailViaWebApi(candidateEmailDetails[0].EmailId, "Clarification Needed – Travel Reimbursement", EmailBody);
                                CommonUtility.InsertInMailTable(Emailconnection, Convert.ToInt32(candidateEmailDetails[0].CandidateId), 0, 0, 16, 15, candidateEmailDetails[0].EmailId, EmailBody, "Clarification Needed – Travel Reimbursement", Convert.ToInt32(formData.CreatedBy));
                                Emailconnection.Close();
                            }
                            
                        }

                    }
                    if (rm.SuccessFlag == 1 && formData.ClaimStatusId == 2 && formData.Flag == 1)
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
                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(candidateEmailDetails[0].CandidateId), 0, 0, 16, 85, candidateEmailDetails[0].EmailId, EmailBody, "Clarification Needed – Travel Reimbursement", Convert.ToInt32(formData.CreatedBy));
                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> AssignTnterviewTravel(AssignTnterviewTravelFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewDetailIds", formData.InterviewDetailIds);
                    para.Add ("@AutoUserId", formData.AutoUserId);
                    const string procName = "Usp_CampusInterviewAssignRecruitmentOperation_InsertUpdate";
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    connection.Open();
                    
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> AssignTestTravel(AssignTestTravelFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestScheduleDetailIds", formData.TestScheduleDetailIds);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    const string procName = "Usp_CampusTestAssignRecruitmentOperation_InsertUpdate";
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    connection.Open();

                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<TravelClarificationList>> GetTravelClarificationList(SearchTravelClarificationList formData)
        {
            try
            {
                List<TravelClarificationList> dataList = new List<TravelClarificationList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    const string procName = "Usp_TravelReimbursementClarification_GetAll";
                    connection.Open();
                    dataList = connection.Query<TravelClarificationList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
