using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.PreJoiningModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreJoiningModule;
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


namespace Application.DataAccess.Repositories.PreJoiningModule
{
    public class PreJoiningDetailsRepository : DatabaseContext, IPreJoiningDetailsRepository
    {
        public PreJoiningDetailsRepository(AppConfiguration appConfiguration)
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
        public async Task<ReturnMessage> CandidateBGVReportInsert(InsertUpdateCandidateBVGReportParam Param)
        {
            try
            {
                DataTable dtCandidateBGVreport = CommonUtility.ToDataTable<CandidateBVGReport>(Param.CandidateBVGReports);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateBVGReport", dtCandidateBGVreport, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateBVGReport_InsertUpdate";
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

        public async Task<ReturnMessage> CandidateJoiningDateInsert(CandidateJoiningDateInsertParam Param)
        {
            try
            {
                DataTable dtCandidateJoiningDate = CommonUtility.ToDataTable<CandidateJoiningDate>(Param.CandidateJoiningDates);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningDate", dtCandidateJoiningDate, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateJoiningDate_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1)
                    {
                        var templateId = 0;
                        if (Param.JoiningDateStatus == "Not Schedule")
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 60);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 65;
                        }
                        else
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 61);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            templateId = 66;
                        }
                        //if (emailTemplateBodyList.Count > 0 && Param.EmailId!=null)
                        //{
                        if (emailTemplateBodyList.Count > 0)
                        {
                            JoiningDetails joiningDetails = new JoiningDetails();
                            var paramss = new DynamicParameters();
                            paramss.Add("@CandidateJoiningDate", dtCandidateJoiningDate, DbType.Object, ParameterDirection.Input, null);
                            const string procedure = "Usp_ConfirmJoiningDetailsGet";
                            var returnList = connection.QueryMultiple(procedure, paramss, commandType: CommandType.StoredProcedure);
                            if (returnList != null)
                            {
                                joiningDetails.omDeatails = returnList.Read<OMDeatails>().AsList();
                                joiningDetails.rmDeatails = returnList.Read<RMDeatails>().AsList();
                                joiningDetails.candidateJoinDateDeatails = returnList.Read<CandidateJoinDateDeatails>().AsList();

                                if (joiningDetails.omDeatails[0].OM > 0)
                                {
                                    if (joiningDetails.omDeatails.Count > 0)
                                    {
                                        foreach (var item in joiningDetails.omDeatails)
                                        {
                                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                            List<CandidateJoinDateDeatails> body = joiningDetails.candidateJoinDateDeatails.Where(e => e.OMId == item.OM).ToList();

                                            string tableBodyData = "";
                                            string tableheaderData = "<html> <head></head><body>" +
                                                "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                                "</tr></thead><tbody>";
                                            foreach (var item1 in body)
                                            {
                                                tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.CandidateNo + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.FullName + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.DateofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.ModeofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.PositionCode + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                                   "</tr>";
                                            }
                                            string tableHeaderClose = "</tbody></table></body></html>";
                                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                                            EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                                            // CommonUtility.sendEmailViaWebApi(item.OMEmail, "Onboarding Team Reschedules Joining Date", EmailBody);
                                            IDbConnection Emailconnection = base.GetConnection();
                                            CommonUtility.InsertInMailTable(Emailconnection, 0, 0, 0, 18, Convert.ToInt32(templateId), item.OMEmail, EmailBody, "Onboarding Team Reschedules Joining Date", 0);
                                            Emailconnection.Close();
                                        }
                                        foreach (var item in joiningDetails.rmDeatails)
                                        {
                                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                            var body = joiningDetails.candidateJoinDateDeatails.Where(e => e.RMId == item.RM).ToList();
                                            string tableBodyData = "";
                                            string tableheaderData = "<html> <head></head><body>" +
                                                "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                                "</tr></thead><tbody>";
                                            foreach (var item1 in body)
                                            {
                                                tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.CandidateNo + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.FullName + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.DateofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.ModeofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.PositionCode + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                                   "</tr>";
                                            }
                                            string tableHeaderClose = "</tbody></table></body></html>";
                                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                                            EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                                            // CommonUtility.sendEmailViaWebApi(item.RMEmail, "Onboarding Team Reschedules Joining Date", EmailBody);
                                            IDbConnection Emailconnection1 = base.GetConnection();
                                            CommonUtility.InsertInMailTable(Emailconnection1, 0, 0, 0, 18, Convert.ToInt32(templateId), item.RMEmail, EmailBody, "Onboarding Team Reschedules Joining Date", 0);
                                            Emailconnection1.Close();
                                        }
                                    }
                                }
                            }
                        }
                            
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
        public async Task<ReturnMessage> CandidateUpdateJoiningDate(CandidateJoiningDateInsertParam Param)
        {
            try
            {
                DataTable dtCandidateJoiningDate = CommonUtility.ToDataTable<CandidateJoiningDate>(Param.CandidateJoiningDates);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningDate", dtCandidateJoiningDate, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_UpdateCandidateJoiningDate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1)
                    {
                       
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 61);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                    
                        //if (emailTemplateBodyList.Count > 0 && Param.EmailId!=null)
                        //{
                        if (emailTemplateBodyList.Count > 0)
                        {
                            JoiningDetails joiningDetails = new JoiningDetails();
                            var paramss = new DynamicParameters();
                            paramss.Add("@CandidateJoiningDate", dtCandidateJoiningDate, DbType.Object, ParameterDirection.Input, null);
                            const string procedure = "Usp_ConfirmJoiningDetailsGet";
                            var returnList = connection.QueryMultiple(procedure, paramss, commandType: CommandType.StoredProcedure);
                            if (returnList != null)
                            {
                                joiningDetails.omDeatails = returnList.Read<OMDeatails>().AsList();
                                joiningDetails.rmDeatails = returnList.Read<RMDeatails>().AsList();
                                joiningDetails.candidateJoinDateDeatails = returnList.Read<CandidateJoinDateDeatails>().AsList();

                                if (joiningDetails.omDeatails[0].OM > 0)
                                {
                                    if (joiningDetails.omDeatails.Count > 0)
                                    {
                                        foreach (var item in joiningDetails.omDeatails)
                                        {
                                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                            List<CandidateJoinDateDeatails> body = joiningDetails.candidateJoinDateDeatails.Where(e => e.OMId == item.OM).ToList();

                                            string tableBodyData = "";
                                            string tableheaderData = "<html> <head></head><body>" +
                                                "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                                "</tr></thead><tbody>";
                                            foreach (var item1 in body)
                                            {
                                                tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.CandidateNo + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.FullName + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.DateofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.ModeofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.PositionCode + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                                   "</tr>";
                                            }
                                            string tableHeaderClose = "</tbody></table></body></html>";
                                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                                            EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                                            IDbConnection db = base.GetConnection();
                                            db.Open();
                                            CommonUtility.InsertInMailTable(db, 0, 0, 0, 19, 66, item.OMEmail, EmailBody, "Onboarding Team Reschedules Joining Date", Convert.ToInt32(Param.CreatedBy));
                                            db.Close();
                                            //CommonUtility.sendEmailViaWebApi(item.OMEmail, "Onboarding Team Reschedules Joining Date", EmailBody);

                                        }
                                        foreach (var item in joiningDetails.rmDeatails)
                                        {
                                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                            var body = joiningDetails.candidateJoinDateDeatails.Where(e => e.RMId == item.RM).ToList();
                                            string tableBodyData = "";
                                            string tableheaderData = "<html> <head></head><body>" +
                                                "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                                "</tr></thead><tbody>";
                                            foreach (var item1 in body)
                                            {
                                                tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.CandidateNo + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.FullName + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.DateofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.ModeofJoining + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.PositionCode + "</td>" +
                                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                                   "</tr>";
                                            }
                                            string tableHeaderClose = "</tbody></table></body></html>";
                                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                                            EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                                            IDbConnection db = base.GetConnection();
                                            db.Open();
                                            CommonUtility.InsertInMailTable(db, 0, 0, 0, 19, 66, item.RMEmail, EmailBody, "Onboarding Team Reschedules Joining Date", Convert.ToInt32(Param.CreatedBy));
                                            db.Close();
                                            // CommonUtility.sendEmailViaWebApi(item.RMEmail, "Onboarding Team Reschedules Joining Date", EmailBody);
                                        }
                                    }
                                }
                            }
                        }
                        
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
        public async Task<ReturnMessage> BatchJoiningDateUpdate(BatchJoiningDateUpdate Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@DateofJoining", Param.DateofJoining);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_BatchJoiningDate_Update";
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

        public async Task<ReturnMessage> CandidateJoiningDateInsert(InsertUpdateCandidateBVGReportParam Param)
        {
            try
            {
                DataTable dtCandidateBVGReport = CommonUtility.ToDataTable<CandidateBVGReport>(Param.CandidateBVGReports);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateBVGReport", dtCandidateBVGReport, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);


                    const string procName = "Usp_CandidateBVGReport_InsertUpdate";
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

        public async Task<ReturnMessage> CandidateJoiningTypeDetailsInsert(CandidateJoiningTypeDetailsParam Param)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@JoinigType", Param.JoinigType);
                    para.Add("@Vertical", Param.Vertical);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateJoiningTypeDetails_Insert";
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

        public async Task<ReturnMessage> CandidateOnBoardingAssignInsert(CandidateOnBoardingAssignInsertParam param)//Piu
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", param.CandidateId);
                    para.Add("@OnBoardingManager", param.OnBoardingManager);
                    para.Add("@CreatedBy", param.CreatedBy);
                    const string procName = "Usp_CandidateOnBoardingAssign_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<OMOnbMailDetails> omonbMailParam = new List<OMOnbMailDetails>();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 59);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        if (emailTemplateBodyList.Count > 0)
                        {
                            var onbMailParam = new DynamicParameters();
                            onbMailParam.Add("@CandidateId", param.CandidateId);
                            const string prosName = "Usp_OMOnBoardingDetailsCandidateWise";
                            omonbMailParam = connection.Query<OMOnbMailDetails>(prosName, onbMailParam,commandType: CommandType.StoredProcedure).ToList();
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            string tableBodyData = "";
                            string tableheaderData = "<html> <head></head><body>" +
                                "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                "</tr></thead><tbody>";
                            foreach (var item1 in omonbMailParam)
                            {
                                tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.Id + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Name + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Doj + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Moj + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.PosCode + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                   "</tr>";
                            }
                            string tableHeaderClose = "</tbody></table></body></html>";
                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                            EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                            EmailBody = EmailBody.Replace("@~@JoiningDate", param.DOJ);
                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, 0, 0, 0, 20, 64, param.EmailId.ToString(), EmailBody, "Recruitment Team sends the candidate to Onboarding Team", Convert.ToInt32(param.CreatedBy));
                            db.Close();
                            //CommonUtility.sendEmailViaWebApi(param.EmailId.ToString(), "Recruitment Team sends the candidate to Onboarding Team ", EmailBody);

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

        public async Task<ReturnMessage> CandidateOnBoardingCoordinatorAssignInsert(CandidateOnBoardingCoordinatorAssignParam Param)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@OnBoardingCoordinator", Param.OnBoardingCoordinator);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    para.Add("@CandidateOnBoardingCoordinatorId", Param.CandidateOnBoardingCoordinatorId);
                    const string procName = "Usp_CandidateOnBoardingCoordinatorAssign_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1)
                    {
                        if (Param.ReallocationType == "A")
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 66);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        }
                        else
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 64);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        }
                        if (emailTemplateBodyList.Count > 0)
                        {
                            List<OMOnbMailDetails> omonbMailParam = new List<OMOnbMailDetails>();
                            var eparam = new DynamicParameters();
                            eparam.Add("@CandidateId", Param.CandidateId);
                            const string sproc = "Usp_OMOnBoardingDetailsCandidateWise";
                            omonbMailParam = connection.Query<OMOnbMailDetails>(sproc, eparam, commandType: CommandType.StoredProcedure).ToList();

                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            string tableBodyData = "";
                            string tableheaderData = "<html> <head></head><body>" +
                                "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                "</tr></thead><tbody>";
                            foreach (var item1 in omonbMailParam)
                            {
                                tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.Id + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Name + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Doj + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Moj + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.PosCode + "</td>" +
                                   "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                   "</tr>";
                            }
                            string tableHeaderClose = "</tbody></table></body></html>";
                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                            EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, Convert.ToInt32(Param.CandidateId), 0, 0, 21, 0, Param.EmailId, EmailBody, "Allocation of New joiners for Induction", Convert.ToInt32(Param.CreatedBy));
                            db.Close();
                            //CommonUtility.sendEmailViaWebApi(Param.EmailId, "Allocation of New joiners for Induction", EmailBody);

                            //string[] JoiningDates = Param.JoiningDate.Split(',');
                            //foreach (string DOJ in JoiningDates)
                            //{
                            //    string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            //    EmailBody = EmailBody.Replace("@~@JoiningDate", DOJ);


                            //}
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

        public async Task<List<TrainingInchargeDetails>> GetTrainingInchargeDetails(SearchTrainingInchargeDetails Param)
        {
            try
            {
                List<TrainingInchargeDetails> returnList = new List<TrainingInchargeDetails>();
                DataTable locationDetailsIds = CommonUtility.ToDataTable<LocationIdDetails>(Param.LocationDetailIds);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    //para.Add("@InductionVenueId", Param.InductionVenueId);
                    para.Add("@LocationDetailsIds", locationDetailsIds, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_TrainingInChargeDetails_Get";
                    connection.Open();
                    returnList = connection.Query<TrainingInchargeDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<HiringStausIdForReleaseCandidate>> GetReleaseCandidateStageToRequisitionTag(SearchHiringStausIdForReleaseCandidate Param)
        {
            try
            {
                List<HiringStausIdForReleaseCandidate> returnList = new List<HiringStausIdForReleaseCandidate>();

                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", Param.RequisitionDetailId);
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "Usp_RequisitionHiring_Stage_GetAll";
                    connection.Open();
                    returnList = connection.Query<HiringStausIdForReleaseCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<BatchesPendingReportingVenue>> GetAllBatchesPendingReportingVenue(AllBatchesPendingReportingVenueParam Param)
        {
            try
            {
                List<BatchesPendingReportingVenue> returnList = new List<BatchesPendingReportingVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchNo", Param.BatchNo);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);
                    para.Add("@DtofJoiningFrom", Param.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", Param.DtofJoiningTo);
                    para.Add("@VerticalId", Param.VerticalId);
                    const string procName = "Usp_BatchesPendingReportingVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<BatchesPendingReportingVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<BatchesPendingReportingVenue>> GetAllBatchesForReassign(AllBatchesPendingReportingVenueParam Param)
        {
            try
            {
                List<BatchesPendingReportingVenue> returnList = new List<BatchesPendingReportingVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchNo", Param.BatchNo);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);
                    para.Add("@DtofJoiningFrom", Param.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", Param.DtofJoiningTo);
                    para.Add("@VerticalId", Param.VerticalId);
                    const string procName = "Usp_BatchesForReassignCandidate";
                    connection.Open();
                    returnList = connection.Query<BatchesPendingReportingVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<CandidateInductionShedule> GetAllCandidateInductionSchedule(GetAllCandidateInductionScheduleparam Param)
        {
            try
            {
                CandidateInductionShedule dataList = new CandidateInductionShedule();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateInductionScheduleId", Param.CandidateInductionScheduleId);

                    const string procName = "Usp_CandidateInductionSchedule_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);

                    dataList.CandidateInductionShedules = returnList.Read<CandidateInductionSheduleHeader>().FirstOrDefault();
                    dataList.CandidateInductionSheduleDetails = returnList.Read<CandidateInductionSheduleDetails>().ToList();

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateJoining>> GetAllCandidateJoiningDate(CandidateJoiningSearch Param)
        {
            try
            {
                List<CandidateJoining> returnList = new List<CandidateJoining>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "Usp_CandidateJoiningDate_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateJoining>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OnBoardingCoordinateBookAccommodation> GetAllCandidateOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param)
        {
            try
            {
                OnBoardingCoordinateBookAccommodation dataList = new OnBoardingCoordinateBookAccommodation();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "USP_CandidateOnBoardingCoordinateBookAccommodation_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ReportingVenu = returnList.Read<ReportingVenuAccomodation>().FirstOrDefault();
                    dataList.CandidateAccomodationDetails = returnList.Read<CandidateListOnBoarding>().ToList();
                    dataList.CandidateInductionScheduleByBatchs = returnList.Read<CandidateInductionScheduleByBatch>().ToList();
                    dataList.CandidateInductionScheduleByIndividuals = returnList.Read<CandidateInductionScheduleByIndividual>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OnBoardingCoordinateBookAccommodation> GetAllBatchOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param)
        {
            try
            {
                OnBoardingCoordinateBookAccommodation dataList = new OnBoardingCoordinateBookAccommodation();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    const string procName = "USP_BatchOnBoardingCoordinateBookAccommodation_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ReportingVenu = returnList.Read<ReportingVenuAccomodation>().FirstOrDefault();
                    dataList.CandidateAccomodationDetails = returnList.Read<CandidateListOnBoarding>().ToList();
                    dataList.CandidateInductionScheduleByBatchs = returnList.Read<CandidateInductionScheduleByBatch>().ToList();
                    dataList.CandidateInductionScheduleByIndividuals = returnList.Read<CandidateInductionScheduleByIndividual>().ToList();
                    dataList.BatchCandidatesScheduleDates = returnList.Read<BatchCandidatesScheduleDate>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DoctorsApprovalCandidateList>> GetAllDoctorsApprovalCandidateList(DoctorsApprovalCandidateParam Param)
        {
            try
            {
                List<DoctorsApprovalCandidateList> returnList = new List<DoctorsApprovalCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@MedicalDocumentDoctorApprovalId", Param.MedicalDocumentDoctorApprovalId);
                    para.Add("@RequsitaionDetailsId", Param.RequsitaionDetailsId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@FromDate", Param.FromDate);
                    para.Add("@ToDate", Param.ToDate);
                    para.Add("@Name", Param.Name);
                    para.Add("@DoctorsId", Param.DoctorsId);
                    para.Add("@Pending", Param.Pending);
                    const string procName = "Usp_DoctorsApprovalCandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<DoctorsApprovalCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateListOnBoarding>> GetAllForCandidateListOnBoarding(CandidateListOnBoardingParam param)
        {
            try
            {
                List<CandidateListOnBoarding> returnList = new List<CandidateListOnBoarding>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", param.RequisitionDetailId);
                    para.Add("@CandidateId", param.CandidateId);
                    para.Add("@OnBordingMangerId", param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", param.OnBordingCoordinatorId);
                    para.Add("@AllocationPendig", param.AllocationPendig);
                    para.Add("@FromDate", param.FromDate);
                    para.Add("@ToDate", param.ToDate);
                    para.Add("@Name", param.Name);
                    para.Add("@VerticalId", param.VerticalId);
                    para.Add("@LocationId", param.LocationId);
                    para.Add("@FunctionId", param.FunctionId);
                    const string procName = "Usp_CandidateListOnBoarding_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateListOnBoarding>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CallbackRequestCandidate>> GetAllCallbackRequestCandidate(searchCallbackRequetsCandidate param)
        {
            try
            {
                List<CallbackRequestCandidate> returnList = new List<CallbackRequestCandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CallbackHistoryId", param.CallbackHistoryId);
                    para.Add("@CandidateNo", param.CandidateNo);
                    para.Add("@CandidateName", param.CandidateName);
                    para.Add("@VerticalId", param.VerticalId);
                    const string procName = "Usp_RO_CallbackRequest_CandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CallbackRequestCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateListOnBoarding>> GetAllIndividualOnBoardingPendingSchedule(OnBoardingPendingScheduleIndividualParam Param)
        {
            try
            {
                List<CandidateListOnBoarding> returnList = new List<CandidateListOnBoarding>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);
                    para.Add("@CandidateName", Param.CandidateName);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@FunctionId", Param.FunctionId);

                    const string procName = "Usp_OnBoardingPendingScheduleIndividual_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateListOnBoarding>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateListOnBoarding>> GetAllOnBoardingBatchPendingScheduleDetails(OnBoardingBatchPendingScheduleDetailsParam Param)
        {
            try
            {
                List<CandidateListOnBoarding> returnList = new List<CandidateListOnBoarding>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);
                    para.Add("@DtofJoiningFrom", Param.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", Param.DtofJoiningTo);
                    para.Add("@CandidateName", Param.CandidateName);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@FunctionId", Param.FunctionId);

                    const string procName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateListOnBoarding>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OnBoardingCoordinateBookAccommodation> GetAllOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param)
        {
            try
            {
                OnBoardingCoordinateBookAccommodation dataList = new OnBoardingCoordinateBookAccommodation();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "USP_OnBoardingCoordinateBookAccommodation_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);

                    dataList.CandidateAccomodationDetails = returnList.Read<CandidateListOnBoarding>().ToList();
                    dataList.CandidateInductionScheduleByBatchs = returnList.Read<CandidateInductionScheduleByBatch>().ToList();
                    dataList.CandidateInductionScheduleByIndividuals = returnList.Read<CandidateInductionScheduleByIndividual>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateListOnBoarding>> GetAllOnBoardingCoordinatorPendingJoiningTypeList(OnBoardingCoordinatorPendingJoiningTypeListParam Param)
        {
            try
            {
                List<CandidateListOnBoarding> returnList = new List<CandidateListOnBoarding>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", Param.RequisitionDetailId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);

                    para.Add("@DtofJoiningFrom", Param.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", Param.DtofJoiningTo);

                    para.Add("@CandidateName", Param.CandidateName);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@FunctionId", Param.FunctionId);

                    const string procName = "Usp_OnBoardingCoordinatorPendingJoiningTypeList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateListOnBoarding>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<PendingReportingVenueIndividual>> GetAllPendingReportingVenueIndividual(PendingReportingVenueIndividualParam Param)
        {
            try
            {
                List<PendingReportingVenueIndividual> returnList = new List<PendingReportingVenueIndividual>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);
                    para.Add("@CandidateName", Param.CandidateName);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@FunctionId", Param.FunctionId);
                    const string procName = "Usp_PendingReportingVenueIndividual_GetAll";
                    connection.Open();
                    returnList = connection.Query<PendingReportingVenueIndividual>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ReportingVenue>> GetAllReportingVenue(AllReportingVenueParam Param)
        {
            try
            {
                List<ReportingVenue> returnList = new List<ReportingVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@ReportingVenueId", Param.ReportingVenueId);
                    para.Add("@IsActive", Param.IsActive);

                    const string procName = "Usp_ReportingVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<ReportingVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OnBoardingCoordinatorCheckingAddReportingVenue> GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue(OnBoardingCoordinatorAddReportingVenueByBatchOrCandidateParam Param)
        {
            try
            {
                OnBoardingCoordinatorCheckingAddReportingVenue returnList = new OnBoardingCoordinatorCheckingAddReportingVenue();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);

                    const string procName = "USP_OnBoardingCoordinatorGetReportingVenueByBatchOrCandidate";
                    connection.Open();
                    returnList = connection.Query<OnBoardingCoordinatorCheckingAddReportingVenue>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<BatchWiseOnBoardingPendingShedule>> GetBatchWiseOnBoardingPendingShedule(BatchWiseOnBoardingPendingSheduleParams Param)
        {
            try
            {
                List<BatchWiseOnBoardingPendingShedule> returnList = new List<BatchWiseOnBoardingPendingShedule>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchNo", Param.BatchNo);
                    para.Add("@OnBordingMangerId", Param.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", Param.OnBordingCoordinatorId);
                    para.Add("@DtofJoiningFrom", Param.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", Param.DtofJoiningTo);
                    para.Add("@VerticalId", Param.VerticalId);
                    const string procName = "Usp_OnBoardingPendingScheduleBatchWise_GetAll";
                    connection.Open();
                    returnList = connection.Query<BatchWiseOnBoardingPendingShedule>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<PreJoiningCandidateList>> GetPreJoiningCandidateList(SearchPreJoiningCandidateList search)
        {
            try
            {
                List<PreJoiningCandidateList> returnList = new List<PreJoiningCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@Name", search.Name);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@DocApprovalStatusId", search.DocApprovalStatusId);
                    para.Add("@RMDocApprovalStatusId", search.RMDocApprovalStatusId);
                    para.Add("@OMDocApprovalStatusId", search.OMDocApprovalStatusId);
                    para.Add("@PreEmployeeMedicalStatus", search.PreEmployeeMedicalStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@HiringStatus", search.HiringStatus);
                    const string procName = "Usp_PreJoiningCandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<PreJoiningCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusPreJoiningCandidateList>> CampusGetPreJoiningCandidateList(CampusSearchPreJoiningCandidateList search)
        {
            try
            {
                List<CampusPreJoiningCandidateList> returnList = new List<CampusPreJoiningCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@Name", search.Name);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@DocApprovalStatusId", search.DocApprovalStatusId);
                    para.Add("@RMDocApprovalStatusId", search.RMDocApprovalStatusId);
                    para.Add("@OMDocApprovalStatusId", search.OMDocApprovalStatusId);
                    para.Add("@PreEmployeeMedicalStatus", search.PreEmployeeMedicalStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@HiringStatus", search.HiringStatus);
                    const string procName = "Usp_CampusCandidateMgmtPage_get";
                    connection.Open();
                    returnList = connection.Query<CampusPreJoiningCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertMovingCandidateJoiningType(MovingCandidateJoiningTypeParam Param)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@JoinIngType", Param.JoinIngType);
                    para.Add("@Vertical", Param.Vertical);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateJoiningTypeMove_Insert";
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

        public async Task<ReturnMessage> InsertUpdateCandidateInductionSchedule(CandidateInductionScheduleInsertUpdateParam Param)//Piu
        {
            try
            {
                DataTable dtCandidateInductionScheduleDetails = CommonUtility.ToDataTable<UDTCandidateInductionScheduled>(Param.CandidateInductionScheduleDetails);
                DataTable dtCandidateInductionScheduleDetails1 = CommonUtility.ToDataTable<UDTCandidateInductionScheduled1>(Param.CandidateInductionScheduleDetails1);
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                List<CandidateListOnBoarding> batchCandidateList = new List<CandidateListOnBoarding>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateInductionScheduleId", Param.CandidateInductionScheduleId);
                    para.Add("@JoinigType", Param.JoinigType);
                    para.Add("@TemplateId", Param.TemplateId);
                    para.Add("@TemplateDetails", Param.TemplateDetails);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@CandidateInductionScheduleDetails", dtCandidateInductionScheduleDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);


                    const string procName = "Usp_CandidateInductionSchedule_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    //if (rm.SuccessFlag == 1)
                    //{
                    //    var batchCandidate = new DynamicParameters();
                    //    batchCandidate.Add("@BatchId", Param.BatchId);
                    //    batchCandidate.Add("@CandidateId", Param.CandidateId);
                    //    //const string batchCandidateProcName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                    //    const string batchCandidateProcName = "Usp_getCandiateDetailsFor_BatchAndIndividual";
                    //    batchCandidateList = connection.Query<CandidateListOnBoarding>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                    //    var emailTemplateParam = new DynamicParameters();
                    //    emailTemplateParam.Add("@TemplateTypeId", 71);
                    //    emailTemplateParam.Add("@TemplateId", null);
                    //    emailTemplateParam.Add("@IsActive", true);
                    //    const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                    //    emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                    //    if (emailTemplateBodyList.Count > 0)
                    //    {
                    //        foreach (var items in batchCandidateList)
                    //        {
                    //            if (items.EmailId != "")
                    //            {

                                   
                    //                    foreach (var item in Param.CandidateInductionScheduleDetails1)
                    //                    {
                    //                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                    //                        EmailBody = EmailBody.Replace("@~@candidateName", items.CandidateFullName);
                    //                        EmailBody = EmailBody.Replace("@~@candidateNo", items.CandidateNo);
                    //                       // EmailBody = EmailBody.Replace("@~@password", Param.Password);
                    //                        EmailBody = EmailBody.Replace("@~@trainingTitle", item.TraingTitle);
                    //                        EmailBody = EmailBody.Replace("@~@formDate", item.DateFrom);
                    //                        EmailBody = EmailBody.Replace("@~@toDate", item.DateTo);
                    //                        EmailBody = EmailBody.Replace("@~@formTime", item.TimeFrom);
                    //                        EmailBody = EmailBody.Replace("@~@toTime", item.TimeTo);
                    //                        EmailBody = EmailBody.Replace("@~@sessions", item.DetailsofSession);
                    //                        EmailBody = EmailBody.Replace("@~@trainer", item.TrainerName);
                    //                        EmailBody = EmailBody.Replace("@~@mode", item.InductioneName);
                    //                        EmailBody = EmailBody.Replace("@~@location", item.LocationName);
                    //                        EmailBody = EmailBody.Replace("@~@venue", item.InductionVenueName);
                    //                        EmailBody = EmailBody.Replace("@~@coordinator", item.InductionCoOrdinatorName);
                    //                        EmailBody = EmailBody.Replace("@~@remarks", item.Remarks);
                    //                        CommonUtility.sendEmailViaWebApi(items.EmailId, "Update Induction Plan  - MRF Limited", EmailBody);
                    //                        //CommonUtility.sendEmailViaWebApi("anifurmondal95@gmail.com", "Clarification Needed –Submitted  Documents - MRF Limited", EmailBody);
                    //                    }
                    //                }
                    //            }
                    //        }
                    //    }
                    
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> ReassignCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule Param)//Piu
        {
            try
            {
                DataTable dtCandidateInductionScheduleDetails = CommonUtility.ToDataTable<UDTReassignCandidateNewInductionScheduled>(Param.ReassignCandidateNewInductionScheduleDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateInductionScheduleId", Param.CandidateInductionScheduleId);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@ReassignNewInductionScheduleDetails", dtCandidateInductionScheduleDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_ReassignCandidate_NewInductionSchedule_Insert";
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
        public async Task<ReturnMessage> ReassignIndividualCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule Param)//Piu
        {
            try
            {
                DataTable dtCandidateInductionScheduleDetails = CommonUtility.ToDataTable<UDTReassignCandidateNewInductionScheduled>(Param.ReassignCandidateNewInductionScheduleDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateInductionScheduleId", Param.CandidateInductionScheduleId);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@ReassignNewInductionScheduleDetails", dtCandidateInductionScheduleDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_ReassignindividualCandidate_NewInductionSchedule_Insert";
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
        public async Task<ReturnMessage> InsertUpdateCandidateOnBoardingCoordinatorAccomodation(CandidateOnBoardingCoordinatorAccomodationInsertUpdateParam Param)//Piu
        {
            try
            {
                DataTable dtCandidateAccomodationDetails = CommonUtility.ToDataTable<UDTCandidateAccomodationDetail>(Param.UDTCandidateAccomodationDetail);
                List<CandidateListOnBoarding> batchCandidateList = new List<CandidateListOnBoarding>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateAccomodationHeaderId", Param.CandidateAccomodationHeaderId);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    //para.Add("@IsActive", Param.IsActive);
                    para.Add("@CandidateAccomodationDetails", dtCandidateAccomodationDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    //para.Add("@ticMailIds", Param.EmailId);
                    const string procName = "Usp_CandidateOnBoardingCoordinatorAccomodation_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    //List<EmailTemplate> emailTemplateBodyList1 = new List<EmailTemplate>();
                    if (rm.SuccessFlag == 1)
                    {
                        //    // mail for TIC 
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 63);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        if (Param.EmailId == null)
                        {
                            Param.EmailId = "";
                        }
                        if (Param.EmailId != "")
                        {
                            string[] Emails = Param.EmailId.Split(',');

                            foreach (string EmailIds in Emails)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                List<OMOnbMailDetails> omonbMailParam = new List<OMOnbMailDetails>();
                                
                                var onbMailParam = new DynamicParameters();
                                onbMailParam.Add("@CandidateId", Param.CandidateId);
                                onbMailParam.Add("@BatchId", Param.BatchId);
                                const string prosName = "Usp_OMOnBoardingDetailsCandidateAndBatchWise";
                                omonbMailParam = connection.Query<OMOnbMailDetails>(prosName, onbMailParam, commandType: CommandType.StoredProcedure).ToList();
                                string tableBodyData = "";
                                string tableheaderData = "<html> <head></head><body>" +
                                    "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                    "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. ID</th>" +
                                    "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Cand. Name</th>" +
                                    "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Date of Joining</th >" +
                                    "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode of Joining</th>" +
                                    "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Position Code</th>" +
                                    "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                    "</tr></thead><tbody>";
                                foreach (var item1 in omonbMailParam)
                                {
                                    tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.Id + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.Name + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.Doj + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.Moj + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.PosCode + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                       "</tr>";
                                }
                                string tableHeaderClose = "</tbody></table></body></html>";
                                string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                                EmailBody = EmailBody.Replace("@~@joiningdate", Param.joiningDate);
                                EmailBody = EmailBody.Replace("@~@fromdate", Param.FromDate);
                                EmailBody = EmailBody.Replace("@~@todate", Param.ToDate);
                                EmailBody = EmailBody.Replace("@~@table", finalTableResult);
                                //CommonUtility.sendEmailViaWebApi(EmailIds, "Accommodation Details request for Training in Charge", EmailBody);


                                //EmailBody = EmailBody.Replace("@~@FromDate", Param.UDTCandidateAccomodationDetail[0].FromDate);
                                //EmailBody = EmailBody.Replace("@~@ToDate", Param.UDTCandidateAccomodationDetail[0].ToDate);
                                //EmailBody = EmailBody.Replace("@~@JoiningDate", Param.joiningDate);
                            }
                        }
                    }

                    //    //mail for candidates

                    //    var batchCandidate = new DynamicParameters();
                    //    batchCandidate.Add("@BatchId", Param.BatchId);
                    //    batchCandidate.Add("@CandidateId", Param.CandidateId);
                    //    const string batchCandidateProcName = "Usp_getCandiateDetailsFor_BatchAndIndividual";
                    //    batchCandidateList = connection.Query<CandidateListOnBoarding>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                    //    var emailTemplateParam1 = new DynamicParameters();
                    //    emailTemplateParam1.Add("@TemplateTypeId", 72);
                    //    emailTemplateParam1.Add("@TemplateId", null);
                    //    emailTemplateParam1.Add("@IsActive", true);
                    //    const string emailTemplateProcName1 = "Usp_EmailTemplate_GetAll";
                    //    emailTemplateBodyList1 = connection.Query<EmailTemplate>(emailTemplateProcName1, emailTemplateParam1, commandType: CommandType.StoredProcedure).ToList();

                    //    foreach (var items in batchCandidateList)
                    //    {
                    //        if (items.EmailId != "")
                    //        {
                    //            string EmailBody = emailTemplateBodyList1[0].TemplateDescription;
                    //            EmailBody = EmailBody.Replace("@~@FromDate", Param.UDTCandidateAccomodationDetail[0].FromDate);
                    //            EmailBody = EmailBody.Replace("@~@date", Param.UDTCandidateAccomodationDetail[0].FromDate);
                    //            EmailBody = EmailBody.Replace("@~@ToDate", Param.UDTCandidateAccomodationDetail[0].ToDate);
                    //            EmailBody = EmailBody.Replace("@~@candidateName", items.CandidateFullName);
                    //            EmailBody = EmailBody.Replace("@~@candidateNo", items.CandidateNo);
                    //            EmailBody = EmailBody.Replace("@~@location", Param.Location);
                    //            // EmailBody = EmailBody.Replace("@~@password", Param.Password);
                    //            CommonUtility.sendEmailViaWebApi(items.EmailId, "Accommodation Details request for Training in Charge", EmailBody);
                    //        }
                    //    }
                    //}


                    return await Task.FromResult(rm);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> CandidateReassignTraining(CandidateTrainingReassignForBatch Param)
        {
            try
            {
                DataTable dtReassignCandidateInductionDetails = CommonUtility.ToDataTable<UDTReassignCandidateInductionDetails>(Param.reassignCandidateInductionDetails);
                DataTable dtCandidateInductionScheduleDetails = CommonUtility.ToDataTable<UDTCandidateInductionScheduleCandidateDetails>(Param.candidateInductionScheduleCandidateDetails);
                DataTable dtCandidateAccomodationDetails = CommonUtility.ToDataTable<UDTCandidateAccomodationDetails>(Param.candidateAccomodationDetails);
                DataTable dtTrainingInchargeAccomodationDetails = CommonUtility.ToDataTable<UDTTrainingInchargeAccomodationDetailsReassign>(Param.trainingInchargeAccomodationDetailsReassign);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@CandidateNo", Param.CandidateNo);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@RequisitionDetailsId", Param.RequisitionDetailsId);
                    para.Add("@ReassignCandidateInductionScheduleDetails", dtReassignCandidateInductionDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CandidateInductionScheduleCandidateDetails", dtCandidateInductionScheduleDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CandidateAccomodationDetails", dtCandidateAccomodationDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TrainingInchargeAccomodationDetails", dtTrainingInchargeAccomodationDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateTrainingReassignmentInsert";
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
        public async Task<ReturnMessage> IndividualCandidateReassignTraining(CandidateTrainingReassignForBatch Param)
        {
            try
            {
                DataTable dtReassignCandidateInductionDetails = CommonUtility.ToDataTable<UDTReassignCandidateInductionDetails>(Param.reassignCandidateInductionDetails);
                DataTable dtCandidateInductionScheduleDetails = CommonUtility.ToDataTable<UDTCandidateInductionScheduleCandidateDetails>(Param.candidateInductionScheduleCandidateDetails);
                DataTable dtCandidateAccomodationDetails = CommonUtility.ToDataTable<UDTCandidateAccomodationDetails>(Param.candidateAccomodationDetails);
                DataTable dtTrainingInchargeAccomodationDetails = CommonUtility.ToDataTable<UDTTrainingInchargeAccomodationDetailsReassign>(Param.trainingInchargeAccomodationDetailsReassign);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@CandidateNo", Param.CandidateNo);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@RequisitionDetailsId", Param.RequisitionDetailsId);
                    para.Add("@ReassignCandidateInductionScheduleDetails", dtReassignCandidateInductionDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CandidateInductionScheduleCandidateDetails", dtCandidateInductionScheduleDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CandidateAccomodationDetails", dtCandidateAccomodationDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TrainingInchargeAccomodationDetails", dtTrainingInchargeAccomodationDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_IndividualCandidateTrainingReassignmentInsert";
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

        public async Task<ReturnMessage> InsertUpdateCandidateReportingVenue(InsertUpdateCandidateReportingVenueParam Param)//Piu
        {
            try
            {
                List<CandidateListOnBoardingNew> batchCandidateList = new List<CandidateListOnBoardingNew>();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateReprtingVenueId", Param.CandidateReprtingVenueId);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@ReprtingVenue", Param.ReprtingVenue);
                    para.Add("@ReprtingVenueAddress", Param.ReprtingVenueAddress);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateReportingVenue_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        var batchCandidate = new DynamicParameters();
                        batchCandidate.Add("@BatchId", Param.BatchId);
                        batchCandidate.Add("@CandidateId", Param.CandidateId);
                        //const string batchCandidateProcName = "Usp_OnBoardingPendingScheduleBatchDetails_GetAll";
                        const string batchCandidateProcName = "Usp_getCandiateDetailsFor_BatchAndIndividual";
                        batchCandidateList = connection.Query<CandidateListOnBoardingNew>(batchCandidateProcName, batchCandidate, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 73);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (Param.CandidateReprtingVenueId > 0) //added on 22-02-2024 for client needed that mail will trigger only on update
                        {
                            if (emailTemplateBodyList.Count > 0)
                            {
                                foreach (var items in batchCandidateList)
                                {
                                    if (items.EmailId != "")
                                    {
                                        if (items.HiringStatusId >= 48) //added on 22-02-2024 for client needed that mail will trigger only on update
                                        {
                                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                            EmailBody = EmailBody.Replace("@~@candidateNo", items.CandidateNo);
                                            EmailBody = EmailBody.Replace("@~@candidateName", items.CandidateFullName);
                                            EmailBody = EmailBody.Replace("@~@password", Param.Password);
                                            EmailBody = EmailBody.Replace("@~@venue", Param.ReportingVenueName);
                                            EmailBody = EmailBody.Replace("@~@venueAddress", Param.ReprtingVenueAddress);
                                            IDbConnection db = base.GetConnection();
                                            db.Open();
                                            CommonUtility.InsertInMailTable(db, Convert.ToInt32(items.CandidateId), 0, 0, 23, 83, items.EmailId, EmailBody, "Change Reporting Venue - MRF Limited", Convert.ToInt32(Param.CreatedBy));
                                            db.Close();
                                            //CommonUtility.sendEmailViaWebApi(items.EmailId, "Change Reporting Venue - MRF Limited", EmailBody);
                                        }
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

        public async Task<ReturnMessage> InsertUpdateReportingVenue(ReportingVenueParam Param)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportingVenueId", Param.ReportingVenueId);
                    para.Add("@ReportingVenueName", Param.ReportingVenueName);
                    para.Add("@ReportingVenueAddress", Param.ReportingVenueAddress);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_ReportingVenue_InsertUpdate";
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

        public async Task<ReturnMessage> MedicalDocumentDoctorApprovalAssignInsert(MedicalDocumentDoctor param)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", param.CandidateId);
                    para.Add("@Doctors", param.Doctors);
                    para.Add("@CreatedBy", param.CreatedBy);
                    const string procName = "Usp_MedicalDocumentDoctorApprovalAssign_Insert";
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

        //public async Task<ReturnMessage> UploadCandidateBGVReport(UploadCandidateBGVReportParam Param)
        //{
        //    try
        //    {

        //        ReturnMessage rm = new ReturnMessage();
        //        using (IDbConnection connection = base.GetConnection())
        //        {
        //            var para = new DynamicParameters();
        //            para.Add("@CandidateBVGReportId", Param.CandidateBVGReportId);
        //            para.Add("@BVGReport", Param.BVGReport);
        //            para.Add("@CreatedBy", Param.CreatedBy);
        //            const string procName = "Usp_CandidateBVGReportUpload_Update";
        //            connection.Open();
        //            rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //            return await Task.FromResult(rm);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<ReturnMessage> UploadCandidateBGVReport(UploadCandidateBGVReportParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateBVGReportId", Param.CandidateBVGReportId);
                    para.Add("@BVGReport", Param.BVGReport);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateBVGReportUpload_Update";
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

        public async Task<ReturnMessage> InsertUpdateTrainingInchargeAccomodation(TrainingAccomodationInsertUpdateParam Param)
        {
            try
            {
                DataTable dtTrainingInchargeAccomodation = CommonUtility.ToDataTable<UDTTrainingInchargeAccomodation>(Param.TrainingInchargeAccomodationDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateAccomodationHeaderId", Param.CandidateAccomodationHeaderId);
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@FromDate", Param.FromDate);
                    para.Add("@ToDate", Param.ToDate);
                    para.Add("@Location", Param.Location);
                    para.Add("@InductionVenue", Param.InductionVenue);
                    //para.Add("@IsActive", Param.IsActive);
                    para.Add("@TrainingInchargeAccomodationDetails", dtTrainingInchargeAccomodation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_CandidateAccomodationByTrainingIncharge_InsertUpdate";
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

        public async Task<List<BatchAccomodationPendingForTraining>> GetAllBatchesPendingAccomodationForTrainingIncharge(BatchAccomodationPendingForTrainingInchargeParam Param)
        {
            try
            {
                List<BatchAccomodationPendingForTraining> returnList = new List<BatchAccomodationPendingForTraining>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@BatchNo", Param.BatchNo);
                    para.Add("@DtofJoiningFrom", Param.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", Param.DtofJoiningTo);
                    para.Add("@AutoUserId", Param.AutoUserId);
                    //const string procName = "USP_BatchAccomodationPendingForTrainingIncharge";
                    const string procName = "USP_BatchAccomodationBookedPendingForTrainingIncharge";
                    connection.Open();
                    returnList = connection.Query<BatchAccomodationPendingForTraining>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateAccomodationPendingForTraining>> GetAllCandidatePendingAccomodationForTrainingIncharge(CandidateAccomodationPendingForTrainingInchargeParam Param)
        {
            try
            {
                List<CandidateAccomodationPendingForTraining> returnList = new List<CandidateAccomodationPendingForTraining>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@CandidateNo", Param.CandidateNo);
                    para.Add("@CandidateName", Param.CandidateName);
                    para.Add("@FromDate", Param.FromDate);
                    para.Add("@ToDate", Param.ToDate);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@FunctionId", Param.FunctionId);
                    para.Add("@VenueId", Param.VenueId);
                    para.Add("@DepartmentId", Param.DepartmentId);
                    para.Add("@PositionId", Param.PositionId);
                    para.Add("@AutoUserId", Param.AutoUserId);
                    // const string procName = "USP_CandidateAccomodationPendingForTrainingIncharge";

                    const string procName = "USP_CandidateAccomodationBookedPendingForTrainingIncharge";
                    connection.Open();
                    returnList = connection.Query<CandidateAccomodationPendingForTraining>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<TrainingInchargeAccomodationDetails> GetTrainingAccomodationDetails(TrainingInchargeAccomodationDetailsParam Param)
        {
            try
            {
                TrainingInchargeAccomodationDetails dataList = new TrainingInchargeAccomodationDetails();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@CandidateAccomodationHeaderId", Param.CandidateAccomodationHeaderId);
                    para.Add("@CandidateAccomodationDetailsId", Param.CandidateAccomodationDetailsId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@AutoUserId", Param.AutoUserId);
                    const string procName = "USP_TrainingInchargeAccomodationDetails";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.trainingAccomodationCandidate = returnList.Read<TrainingAccomodationCandidate>().FirstOrDefault();
                    dataList.TrainingAccomodationCandidateDetails = returnList.Read<TrainingAccomodationCandidateList>().ToList();
                    dataList.trainingAccomodationRequiredCandidateList = returnList.Read<TraningAccomodationRequiredCandidateList>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> InsertShareWithCandidateAndSaveAcknowlwdgement(InsertUpdateCandidateWelcomeAcknowledgementParam Param)
        {
            try
            {
                DataTable dtShareWithCandidate = CommonUtility.ToDataTable<UDTShareWithCandidate>(Param.ShareWithCandidates);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ShareWithCandidateHeaderId", Param.ShareWithCandidateHeaderId);
                    para.Add("@ShareWithCandidates", dtShareWithCandidate, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TemplateId", Param.TemplateId);
                    para.Add("@TemplateBody", Param.TemplateBody);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@Remarks", Param.Remarks);
                    para.Add("@MailingStatus", Param.MailingStatus);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "USP_ShareWithCandidate";
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

        public async Task<ReturnMessage> InsertShareWithCandidate(InsertUpdateCandidateOnBoardingCoordinatorAccomodationParam Param)
        {
            try
            {
                DataTable dtShareWithCandidate = CommonUtility.ToDataTable<UDTShareWithCandidate>(Param.ShareWithCandidates);
                DataTable dtCabdidateAdditionalDocumentId = CommonUtility.ToDataTable<UDTCandidateAdditionalDocumentId>(Param.CandidateAdditionalDocumentId);
                DataTable dtShareWithCandidateForSchedular=null;
                DataTable dtShareWithCandidateInductionForSchedular = null; ;
                DataTable dtShareWithCandidateAccommodationForSchedular=null;
                if (Param.ShareWithCandidatesForSchedular.Count>0)  // By Anifur on 21-08-2022
                {
                     dtShareWithCandidateForSchedular = CommonUtility.ToDataTable<UDTShareWithCandidatesForSchedular>(Param.ShareWithCandidatesForSchedular);
                }
                if (Param.shareWithCandidatesInductionForSchedular.Count>0)  // By Anifur on 21-08-2022
                {
                     dtShareWithCandidateInductionForSchedular = CommonUtility.ToDataTable<UDTShareWithCandidatesInductionForSchedular>(Param.shareWithCandidatesInductionForSchedular);
                }
                if (Param.shareWithCandidatesAccommodationForSchedular.Count>0)  // By Anifur on 21-08-2022
                {
                     dtShareWithCandidateAccommodationForSchedular = CommonUtility.ToDataTable<UDTShareWithCandidatesAccommodationForSchedular>(Param.shareWithCandidatesAccommodationForSchedular);
                }
                ReturnMessage rm = new ReturnMessage();
                List<InductionAccommodationTemplate> accomodationInductionTemplateList = new List<InductionAccommodationTemplate>();
                string inductionTemplateDescription = "";
                string accommodationTemplateDescription = "";
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ShareWithCandidateHeaderId", Param.ShareWithCandidateHeaderId);
                    para.Add("@ShareWithCandidates", dtShareWithCandidate, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CandidateAddDocIds", dtCabdidateAdditionalDocumentId, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ShareWithCandidateForSchedular", dtShareWithCandidateForSchedular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ShareWithCandidateAccommodationForSchedular", dtShareWithCandidateAccommodationForSchedular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ShareWithCandidateInductionForSchedular", dtShareWithCandidateInductionForSchedular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TemplateId", Param.TemplateId);
                    para.Add("@TemplateBody", Param.TemplateBody);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@Remarks", Param.Remarks);
                    para.Add("@MailingStatus", Param.MailingStatus);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    //const string procName = "USP_ShareWithCandidate";
                    const string procName = "USP_ShareWithCandidate_withSchedular";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    //if (rm.SuccessFlag == 1)
                    //{

                    //    var inductionAccommodationTemplateParam = new DynamicParameters();
                    //    inductionAccommodationTemplateParam.Add("@InductionAccommodationId", null);
                    //    inductionAccommodationTemplateParam.Add("@IsActive", true);
                    //    const string inductionAccommodationTemplateProcName = "Usp_InductionAccommodationTemplate_GetAll";
                    //    //connection.Open();
                    //    accomodationInductionTemplateList = connection.Query<InductionAccommodationTemplate>(inductionAccommodationTemplateProcName, inductionAccommodationTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                    //    if (Param.ShareWithCandidatesInductionAccommodationAttachment.Count > 0)
                    //    {

                    //        foreach (var item in Param.ShareWithCandidatesInductionAccommodationAttachment)
                    //        {
                    //            string accommodationTableData = "";
                    //            string inductionTableData = "";
                    //            foreach (var item1 in item.CandidateAccommodationDetailsForAttachment)
                    //            {
                    //                accommodationTableData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.FromDate + "-" + item1.ToDate + "</td>" +
                    //                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.Location + "</td>" +
                    //                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.Accommodation + "</td></tr>";
                    //            }

                    //            foreach (var item1 in item.CandidateInductionDetailsForAttachment)
                    //            {
                    //                inductionTableData += "<tr><td colspan='8' style='border:1px solid #000; padding: 3px 5px; text-align: center;'>" + item1.TrainingTittle + "</td></tr>";
                    //                //foreach (var item2 in item1.TrainingDetails) //added by Amartya for duplicate record issue
                    //                // {
                    //                inductionTableData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].InductionDate + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].FromTime + "-" + item1.TrainingDetails[0].ToTime + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].DetailsOfSession + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].Location + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].Venue + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].PersontoMeet + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].AccommodationRequire + "</td>" +
                    //                              "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainingDetails[0].Remarks + "</td></tr>";
                    //                // }

                    //            }

                    //            if (accomodationInductionTemplateList.Count > 0)
                    //            {
                    //                inductionTemplateDescription = accomodationInductionTemplateList[0].InductionTemplate;
                    //                accommodationTemplateDescription = accomodationInductionTemplateList[0].AccommodationTemplate;
                    //                if (accommodationTemplateDescription != "")
                    //                {
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@CandidateName", item.CandidateName);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@BatchNo", item.BatchNo);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Location", item.Location);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Function", item.Function);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Department", item.Department);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Position", item.Position);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Grade", item.Grade);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@JoiningDate", item.JoiningDate);
                    //                    accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@AccommodationDetails", accommodationTableData);
                    //                }


                    //                if (inductionTemplateDescription != "")
                    //                {
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@CandidateName", item.CandidateName);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@BatchNo", item.BatchNo);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Location", item.Location);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Function", item.Function);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Department", item.Department);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Position", item.Position);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Grade", item.Grade);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@JoiningDate", item.JoiningDate);
                    //                    inductionTemplateDescription = inductionTemplateDescription.Replace("@~@InductionDetails", inductionTableData);

                    //                }
                    //            }

                    //            CommonUtility.sendEmailViaWebApiWithAttachment(item.CandidateEmailId, "Accommodation & Induction Details", item.EmailBody, inductionTemplateDescription, accommodationTemplateDescription);
                    //            //CommonUtility.sendEmailViaWebApiWithAttachment("anifurmondal95@gmail.com", "Accommodation & Induction Details", item.EmailBody, inductionTemplateDescription, accommodationTemplateDescription);
                    //        }
                    //    }
                    //}
                    return await Task.FromResult(rm);
                    //return null;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EditAccomodationInduction> GetAllEditAccomodationInductionDetails(EditAccomodationInductionDetailsParam Param)
        {
            try
            {
                EditAccomodationInduction dataList = new EditAccomodationInduction();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "USP_EditAccomodationInductionDetails";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EditAccomodationCandidateDetail = returnList.Read<EditAccomodationCandidate>().FirstOrDefault();
                    dataList.TrainingEditAccomodationInductionSheduleDetails = returnList.Read<EditAccomodationInductionShedule>().ToList();
                    dataList.TrainingEditAccomodationForCandidateDetails = returnList.Read<EditAccomodationForCandidate>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<EditAccomodationInductionForBatchNew> GetAllEditAccomodationInductionDetailsForBatch(EditAccomodationInductionDetailsParam Param)
        {
            try
            {
                EditAccomodationInductionForBatchNew dataList = new EditAccomodationInductionForBatchNew();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "USP_EditAccomodationInductionDetailsForBatch";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EditAccomodationCandidateDetailForBatchNew = returnList.Read<EditAccomodationCandidateForBatchNew>().FirstOrDefault();
                    dataList.TrainingEditAccomodationInductionSheduleDetailsForBatch = returnList.Read<EditAccomodationInductionSheduleForBatch>().ToList();
                    dataList.TrainingEditAccomodationForCandidateDetailsForBatch = returnList.Read<EditAccomodationForCandidateForBatch>().ToList();
                    dataList.EditAccomodationRequiredCandidatesForBatch = returnList.Read<EditAccomodationRequiredCandidateForBatch>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EditAccomodationInductionBatch> GetAllBatchEditAccomodationInductionDetails(EditAccomodationInductionDetailsParamBatch Param)
        {
            try
            {
                EditAccomodationInductionBatch dataList = new EditAccomodationInductionBatch();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    //para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@LocationId", Param.LocationId);
                    const string procName = "USP_ViewAccomodationInductionDetailsForBatch";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EditAccomodationCandidateDetailBatch = returnList.Read<EditAccomodationCandidateBatch>().FirstOrDefault();
                    dataList.TrainingEditAccomodationInductionSheduleDetailsBatch = returnList.Read<EditAccomodationInductionSheduleBatch>().ToList();
                    dataList.TrainingEditAccomodationForCandidateDetailsBatch = returnList.Read<EditAccomodationForCandidateBatch>().ToList();
                    dataList.TrainingEditAccomodationRequiredCandidate = returnList.Read<TrainingEditAccomodationRequiredCandidates>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<InductionDetailsForBatchReassignCandidate> GetAllInductionDetailsForBatchForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate Param)
        {
            try
            {
                InductionDetailsForBatchReassignCandidate dataList = new InductionDetailsForBatchReassignCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "USP_GetBatchAccomodationInductionDetailsForDiscontinuedCandidates";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.inductionReportingVenueDetails = returnList.Read<BatchInductionReportingvenueDetails>().FirstOrDefault();
                    dataList.batchInductionScheduleDetail = returnList.Read<BatchInductionScheduleDetailsForReassign>().ToList();
                    dataList.reaasingCandidatesDetail = returnList.Read<ReassignCandidateDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<InductionDetailsForIndividualReassignCandidate> GetAllInductionDetailsForIndividualForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate Param)
        {
            try
            {
                InductionDetailsForIndividualReassignCandidate dataList = new InductionDetailsForIndividualReassignCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    para.Add("@CandidateId", Param.CandidateId);
                    const string procName = "USP_GetBatchAccomodationInductionDetailsForDiscontinuedIndividualCandidates";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.batchInductionScheduleDetail = returnList.Read<BatchInductionScheduleDetails>().ToList();
                    dataList.reaasingCandidatesDetail = returnList.Read<ReassignCandidateDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<GetEditAccomodation> GetEditAccomodationForEditing(GetAllEditAccomodationParam Param)
        {
            try
            {
                GetEditAccomodation dataList = new GetEditAccomodation();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateAccomodationHeaderId", Param.CandidateAccomodationHeaderId);

                    const string procName = "USP_EditAccomodation_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EditCandidateData = returnList.Read<GetEditCandidate>().FirstOrDefault();
                    dataList.TrainingGetEditAccomodationForCandidateDetails = returnList.Read<GetEditAccomodationForCandidate>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateWelcomeAcknowledgementStatus>> GetAllCandidateWelcomeAcknowledgementStatus(CandidateWelcomeAcknowledgementStatusParam Param)
        {
            try
            {
                List<CandidateWelcomeAcknowledgementStatus> returnList = new List<CandidateWelcomeAcknowledgementStatus>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@CandidateName", Param.CandidateName);
                    para.Add("@RequisitionNo", Param.RequisitionNo);
                    para.Add("@VerticalId", Param.VerticalId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@FunctionId", Param.FunctionId);
                    para.Add("@GradeId", Param.GradeId);
                    para.Add("@DocumentStatusId", Param.DocumentStatusId);
                    para.Add("@EmployeeMedicalId", Param.EmployeeMedicalId);
                    para.Add("@HiringStatusId", Param.HiringStatusId);
                    const string procName = "USP_CandidateWelcomeAcknowledgement_Status";
                    connection.Open();
                    returnList = connection.Query<CandidateWelcomeAcknowledgementStatus>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateJoiningCheck>> GetAllCandidateJoiningCheckList(CandidateJoiningCheckListParam Param)
        {
            try
            {
                List<CandidateJoiningCheck> returnList = new List<CandidateJoiningCheck>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", Param.CandidateId);

                    const string procName = "USP_CandidateJoiningCheckList";
                    connection.Open();
                    returnList = connection.Query<CandidateJoiningCheck>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<OnBoardingDocumentVerification> GetOnBoardingDocumentVerification(OnBoardingDocumentVerificationParam Param)
        {
            try
            {
                OnBoardingDocumentVerification dataList = new OnBoardingDocumentVerification();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", Param.CandidateId);

                    const string procName = "USP_OnBoardingDocumentVerification";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateOnBoardingDocumentVerificationData = returnList.Read<CandidateOnBoardingDocumentVerification>().FirstOrDefault();
                    dataList.CandidateOnBoardingUploadedDocuments = returnList.Read<CandidateOnBoardingUploadedDocument>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<AllCandidateJoiningCheckListModel> GetAllCandidateJoiningCheckForOnBoardingCoordinator(AllCandidateJoiningCheckListParam Param)
        {
            try
            {
                AllCandidateJoiningCheckListModel dataList = new AllCandidateJoiningCheckListModel();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", Param.CandidateId);

                    const string procName = "USP_AllCandidateJoiningCheckList_NEW";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.OnBoardingCoordinatorJoiningCheck = returnList.Read<OnBoardingCoordinatorJoiningCheckList>().FirstOrDefault();
                    dataList.OnBoardingCoordinatorOnBoardingChecks = returnList.Read<OnBoardingCoordinatorOnBoardingCheckList>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CandidateInductionPlan> GetCandidateInductionPlan(CandidateInductionPlanParam Param)
        {
            try
            {
                CandidateInductionPlan dataList = new CandidateInductionPlan();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@HiringStatus", Param.HiringStatus);

                    const string procName = "USP_CandidateInductionPlan";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateInductionPlanShedule = returnList.Read<CandidateInductionPlanShedule>().FirstOrDefault();
                    dataList.CandidateInductionPlanShedules = returnList.Read<CandidateInductionPlanSheduleDetails>().ToList();
                    dataList.CandidateInductionPlanAccomodations = returnList.Read<CandidateInductionPlanAccomodation>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertCandidateJoiningForm(CandidateJoiningFormParam Param)
        {
            try
            {
                DataTable dtFamilyMemberDetail = CommonUtility.ToDataTable<FamilyMemberDetails>(Param.FamilyMemberDetails);
                DataTable dtImmediateRelativeDetail = CommonUtility.ToDataTable<ImmediateRelativeDetails>(Param.ImmediateRelativeDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ConfirmJoiningFormId", Param.ConfirmJoiningFormId);
                    para.Add("@JoiningDate", Param.JoiningDate);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@IsDraft", Param.IsDraft);

                    para.Add("@FamilyHeaderId", Param.FamilyHeaderId);
                    para.Add("@Name", Param.Name);
                    para.Add("@Dob", Param.Dob);
                    para.Add("@BloodGroup", Param.BloodGroup);
                    para.Add("@Res_Address", Param.Res_Address);
                    para.Add("@Res_PinCode", Param.Res_PinCode);
                    para.Add("@Per_Address", Param.Per_Address);
                    para.Add("@Per_PinCode", Param.Per_PinCode);
                    para.Add("@EmailId", Param.EmailId);
                    para.Add("@PersonalAccidentalInsuranceId", Param.PersonalAccidentalInsuranceId);
                    para.Add("@NomineeName", Param.NomineeName);
                    para.Add("@RelationShip", Param.RelationShip);
                    para.Add("@FullAddress", Param.FullAddress);
                    para.Add("@RefName", Param.RefName);
                    para.Add("@JoiningCandidateHeaderId", Param.JoiningCandidateHeaderId);
                    para.Add("@JoiningCandidateName", Param.JoiningCandidateName);
                    para.Add("@EmpNo", Param.EmpNo);
                    para.Add("@Designation", Param.Designation);

                    para.Add("@Department", Param.Department);
                    para.Add("@PanNo", Param.PanNo);
                    para.Add("@JoiningCandidateMobileNo", Param.JoiningCandidateMobileNo);
                    para.Add("@GraduateEducationalInstitute", Param.GraduateEducationalInstitute);
                    para.Add("@PastEmployee", Param.PastEmployee);
                    para.Add("@NoOfSecurity", Param.NoOfSecurity);
                    para.Add("@CreatedBy", Param.CreatedBy);

                    para.Add("@FamilyMemberDetails", dtFamilyMemberDetail, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ImmediateRelativeDetails", dtImmediateRelativeDetail, DbType.Object, ParameterDirection.Input, null);

                    const string procName = "USP_CandidateJoiningForm";
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

        public async Task<PreJoiningDocumentCollection> GetPreJoiningDocumentCollectionData(PreJoiningDocumentCollectionSearch search)
        {
            try
            {
                PreJoiningDocumentCollection dataList = new PreJoiningDocumentCollection();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@JoiningDocumentCollectionId", search.JoiningDocumentCollectionId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@HiringStatus", search.HiringStatus);
                    const string procName = "Usp_JoininingDocumentCollection_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.PreJoiningDocumentFormData = returnList.Read<PreJoiningDocumentFormData>().FirstOrDefault();
                    dataList.PreJoiningDocumentAttachmentData = returnList.Read<PreJoiningDocumentAttachmentData>().ToList();

                    String ContainerReference = "";

                    if (dataList.PreJoiningDocumentAttachmentData.Count > 0)
                    {
                        foreach (var List in dataList.PreJoiningDocumentAttachmentData)
                        {
                            //if (List.DocumentPath != "" && List.DocumentPath != "NOT AVAILABLE" && List.DoumentNameId != 9)
                            //{
                            ContainerReference = "candidatedocument";
                            string Document = Path.GetFileName(List.DocumentPath);
                            string DocumentPath = DownloadedFile(Document, ContainerReference);
                            List.DocumentPath = DocumentPath;
                            //}
                            //else
                            //{
                            //    if (List.DocumentPath == "")
                            //    {
                            //        List.DocumentPath = "";
                            //    }
                            //    else
                            //    {
                            //        List.DocumentPath = "NOT AVAILABLE";
                            //    }

                            //}

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

        public async Task<ReturnMessage> PreJoiningDocumentCollectionDataSave(PreJoiningDocumentFormData formData)
        {
            try
            {
                DataTable dtAttch = CommonUtility.ToDataTable<PreJoiningDocumentAttachmentData>(formData.PreJoiningDocumentAttachmentData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@JoiningDocumentCollectionId", formData.JoiningDocumentCollectionId);
                    para.Add("@OfferDocumentCollectionId", formData.OfferDocumentCollectionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Remarks", formData.AdditionalRemarks);
                    para.Add("@JoiningDocumentColectionDocument", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_JoiningDocumentCollection_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<DetailsList> detailsList = new List<DetailsList>();
                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 107);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        var detailListParam = new DynamicParameters();
                        detailListParam.Add("@candiateId", formData.CandidateId);
                        const string detailListProcName = "USP_getOCnameByCandidateId";
                        detailsList = connection.Query<DetailsList>(detailListProcName, detailListParam, commandType: CommandType.StoredProcedure).ToList();

                        if (emailTemplateBodyList.Count > 0)
                        {
                            //foreach (char EmailIds in param.EmailId)
                            //{
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@onboardingName", detailsList[0].EmpName);

                            IDbConnection db = base.GetConnection();
                            db.Open();
                            CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 24, 113, detailsList[0].EmpEmailId.ToString(), EmailBody, "Requested Clarification / Submitted", Convert.ToInt32(formData.CreatedBy));
                            db.Close();
                            //CommonUtility.sendEmailViaWebApi(detailsList[0].EmpEmailId.ToString(), "Requested Clarification / Submitted ", EmailBody);
                            //}
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

        public async Task<ReturnMessage> CandidateRMJoiningCheckListSave(RMJoiningCheckListSave formData)
        {
            try
            {
                DataTable dtAttch = CommonUtility.ToDataTable<CandidateRMJoiningCheckListDetailsSave>(formData.CandidateRMJoiningCheckListDetailsSave);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateRMJoiningCheckListId", formData.CandidateRMJoiningCheckListId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateRMJoiningCheckListDetails", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateRMJoiningCheckList_InsertUpdate";
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

        public async Task<ReturnMessage> CandidateOnBoardingJoiningCheckListSave(OnboardingJoiningCheckListSave formData)
        {
            try
            {
                DataTable dtAttch = CommonUtility.ToDataTable<CandidateOnboardingJoiningCheckListDetailsSave>(formData.CandidateOnboardingJoiningCheckListDetailsSave);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateOnboardingJoiningCheckListId", formData.CandidateOnboardingJoiningCheckListId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@Complete", formData.Complete);
                    para.Add("@CandidateOnboardingJoiningCheckListDetails", dtAttch, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateOnboardingJoiningCheckList_InsertUpdate";
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


        public async Task<CandidateJoingForm> GetCandidateJoiningForm(CandidateJoingFormSearch search)
        {
            try
            {
                CandidateJoingForm dataList = new CandidateJoingForm();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateJoiningFormId", search.CandidateJoiningFormId);
                    const string procName = "Usp_CandidateJoiningForm_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateJoingFormData = returnList.Read<CandidateJoingFormData>().FirstOrDefault();
                    dataList.CandidateJoingFormFamily = returnList.Read<CandidateJoingFormFamily>().ToList();
                    dataList.CandidateJoingFormImidiateRelatives = returnList.Read<CandidateJoingFormImidiateRelatives>().ToList();
                    dataList.CandidateJoiningFormApprovalStatus = returnList.Read<CandidateJoiningFormApprovalStatus>().ToList();
                    dataList.candidateRemarksDetails = returnList.Read<CandidateRemarksDetails>().ToList();

                    String ContainerReference = "candidatejoiningform";

                    if (dataList.CandidateJoingFormData != null)//Piu
                    {
                        if (dataList.CandidateJoingFormData.Signature!="")  // Added By Anif on 18-11-2022 as no signature available 
                        {
                            string Document = Path.GetFileName(dataList.CandidateJoingFormData.Signature);
                            string DocumentPath = DownloadedFile(Document, ContainerReference);
                            dataList.CandidateJoingFormData.Signature = DocumentPath;
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

        public async Task<ReturnMessage> SaveCandidateJoiningForm(CandidateJoingFormData formData)
        {
            try
            {
                DataTable dtFamily = CommonUtility.ToDataTable<CandidateJoingFormFamily>(formData.CandidateJoingFormFamily);
                DataTable dtImdReltavive = CommonUtility.ToDataTable<CandidateJoingFormImidiateRelatives>(formData.CandidateJoingFormImidiateRelatives);
                DataTable remarksData = CommonUtility.ToDataTable<RemaksData>(formData.remaksData);
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", formData.CandidateJoiningFormId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@BloodGroup", formData.BloodGroupId);
                    para.Add("@ResidentialAddress", formData.ResidentialAddress);
                    para.Add("@ResidentialPin", formData.ResidentialPin);
                    para.Add("@SameAsResidential", formData.SameAsResidential);
                    para.Add("@PermanentAddress", formData.PermanentAddress);
                    para.Add("@PermanentPin", formData.PermanentPin);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PhoneNo", formData.PhoneNo);
                    para.Add("@Date", formData.Date);
                    para.Add("@AcidentalPolicyNominee", formData.AcidentalPolicyNominee);
                    para.Add("@AcidentalPolicyNomineeRelationShip", formData.AcidentalPolicyNomineeRelationShip);
                    para.Add("@AcidentalPolicyNomineeRelationOtherShipName", formData.OtherRelationName);
                    para.Add("@AcidentalPolicyNomineeAddress", formData.AcidentalPolicyNomineeAddress);
                    para.Add("@AcidentalPolicyName", formData.AcidentalPolicyName);
                    para.Add("@SEBIApplicable", formData.SEBIApplicable);
                    para.Add("@SEBIName", formData.SEBIName);
                    para.Add("@SEBIEmployeeNo", formData.SEBIEmployeeNo);
                    para.Add("@SEBIDesignation", formData.SEBIDesignation);
                    para.Add("@SEBIDepartment", formData.SEBIDepartment);
                    para.Add("@SEBIPanNo", formData.SEBIPanNo);
                    para.Add("@SEBIMobileNo", formData.SEBIMobileNo);
                    para.Add("@SEBIInsTitute", formData.SEBIInsTitute);
                    para.Add("@SEBIPastEmployer", formData.SEBIPastEmployer);
                    para.Add("@SEBINoofSecurity", formData.SEBINoofSecurity);
                    para.Add("@SEBIDesigName", formData.SEBIDesigName);
                    para.Add("@SEBIDesigPAN", formData.SEBIDesigPAN);
                    para.Add("@SEBIDesigPhone", formData.SEBIDesigPhone);
                    para.Add("@JoiningLetterDate", formData.JoiningLetterDate);
                    para.Add("@JoiningLetterDesignation", formData.JoiningLetterDesignation);
                    para.Add("@JoiningDate", formData.JoiningDate);
                    para.Add("@SignatureDate", formData.SignatureDate);
                    para.Add("@SignaturePlace", formData.SignaturePlace);
                    para.Add("@Signature", formData.Signature);
                    para.Add("@IsDraft", formData.IsDraft);
                    para.Add("@CandidateJoiningFamily", dtFamily, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CandidateImidiateRelatives", dtImdReltavive, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@FamilyDetailsFormPath", formData.FamilyDetailsFormPath);
                    para.Add("@AccidentInsuranceFormPath", formData.AccidentInsuranceFormPath);
                    para.Add("@SEBIDisclosureFormPath", formData.SEBIDisclosureFormPath);
                    para.Add("@JoiningReportFormPath", formData.JoiningReportFormPath);
                    para.Add("@remarks", remarksData, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CandidateJoiningForm_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (formData.IsDraft == false && rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 107);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            var candidateDetailsParam = new DynamicParameters();
                            candidateDetailsParam.Add("@candiateId", formData.CandidateId);
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            const string candidateDetailsProcName = "USP_getOCnameByCandidateId"; //need to run on prod created by Amartya on 04th Sept,2023
                            var ocDetailsForEmail = connection.Query<GetOcDetailsByCandidate>(candidateDetailsProcName, candidateDetailsParam, commandType: CommandType.StoredProcedure).ToList();
                            if (ocDetailsForEmail.Count > 0)
                            {
                                EmailBody = EmailBody.Replace("@~@candidateName", ocDetailsForEmail[0].FullName);
                                EmailBody = EmailBody.Replace("@~@onboardingName", ocDetailsForEmail[0].EmpName);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 25, 113, ocDetailsForEmail[0].EmpEmailId, EmailBody, "Requested Clarification / Submitted", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
                                // CommonUtility.sendEmailViaWebApi(ocDetailsForEmail[0].EmpEmailId, "Requested Clarification / Submitted", EmailBody);
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
        public async Task<ReturnMessage> UpdateCandidateJoiningFamilyDetailsForm(UpdateCandidateJoiningFormFamilydetails formData)
        {
            try
            {
                DataTable dtFamily = CommonUtility.ToDataTable<CandidateJoingFormFamilyUpdate>(formData.CandidateJoingFormFamily);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", formData.CandidateJoiningFormId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@NewFullName", formData.NewFullName);
                    para.Add("@OldFullName", formData.OldFullName);
                    para.Add("@FullNameChanged", formData.FullNameChanged);
                    para.Add("@NewBloodGroup", formData.NewBloodGroup);
                    para.Add("@OldBloodGroup", formData.OldBloodGroup);
                    para.Add("@BloodGroupChanged", formData.BloodGroupChanged);
                    para.Add("@NewResidentialAddress", formData.NewResidentialAddress);
                    para.Add("@OldResidentialAddress", formData.OldResidentialAddress);
                    para.Add("@ResidentialAddressChanged", formData.ResidentialAddressChanged);
                    para.Add("@NewResidentialPin", formData.NewResidentialPin);
                    para.Add("@OldResidentialPin", formData.OldResidentialPin);
                    para.Add("@ResidentialPinChanged", formData.ResidentialPinChanged);
                    para.Add("@NewSameAsResidential", formData.NewSameAsResidential);
                    para.Add("@OldSameAsResidential", formData.OldSameAsResidential);
                    para.Add("@SameAsResidentialChanged", formData.SameAsResidentialChanged);
                    para.Add("@NewPermanentAddress", formData.NewPermanentAddress);
                    para.Add("@OldPermanentAddress", formData.OldPermanentAddress);
                    para.Add("@PermanentAddressChanged", formData.PermanentAddressChanged);
                    para.Add("@NewPermanentPin", formData.NewPermanentPin);
                    para.Add("@OldPermanentPin", formData.OldPermanentPin);
                    para.Add("@PermanentPinChanged", formData.PermanentPinChanged);
                    para.Add("@NewEmailId", formData.NewEmailId);
                    para.Add("@OldEmailId", formData.OldEmailId);
                    para.Add("@EmailIdChanged", formData.EmailIdChanged);
                    para.Add("@NewPhoneNo", formData.NewPhoneNo);
                    para.Add("@OldPhoneNo", formData.OldPhoneNo);
                    para.Add("@PhoneNoChanged", formData.PhoneNoChanged);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CandidateJoiningFamily", dtFamily, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CandidateJoiningForm_FamilyDetailsUpdate";
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
        public async Task<ReturnMessage> UpdateCandidateJoiningSEBIInitialDisclosureForm(UpdateSEBIInitialDisclosuerDetails formData)
        {
            try
            {
                DataTable dtImmediaterelative = CommonUtility.ToDataTable<UpadteSEBIImmediateRelatives>(formData.CandidateImidiateRelatives);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", formData.CandidateJoiningFormId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@NewSEBIName", formData.NewSEBIName);
                    para.Add("@OldSEBIName", formData.OldSEBIName);
                    para.Add("@SEBINameChanged", formData.SEBINameChanged);
                    para.Add("@NewSEBIPanNo", formData.NewSEBIPanNo);
                    para.Add("@OldSEBIPanNo", formData.OldSEBIPanNo);
                    para.Add("@SEBIPanNoChanged", formData.SEBIPanNoChanged);
                    para.Add("@NewSEBIMobileNo", formData.NewSEBIMobileNo);
                    para.Add("@OldSEBIMobileNo", formData.OldSEBIMobileNo);
                    para.Add("@SEBIMobileNoChanged", formData.SEBIMobileNoChanged);
                    para.Add("@NewSEBIinstitute", formData.NewSEBIinstitute);
                    para.Add("@OldSEBIinstitute", formData.OldSEBIinstitute);
                    para.Add("@SEBIinstituteChanged", formData.SEBIinstituteChanged);
                    para.Add("@NewSEBIPastEmployer", formData.NewSEBIPastEmployer);
                    para.Add("@OldSEBIPastEmployer", formData.OldSEBIPastEmployer);
                    para.Add("@SEBIPastEmployeChanged", formData.SEBIPastEmployeChanged);
                    para.Add("@NewSEBINoOfSecurity", formData.NewSEBINoOfSecurity);
                    para.Add("@OldSEBINoOfSecurity", formData.OldSEBINoOfSecurity);
                    para.Add("@SEBINoOfSecurityChanged", formData.SEBINoOfSecurityChanged);
                    para.Add("@NewSEBIDesigName", formData.NewSEBIDesigName);
                    para.Add("@OldSEBIDesigName", formData.OldSEBIDesigName);
                    para.Add("@SEBIDesigNameChanged", formData.SEBIDesigNameChanged);
                    para.Add("@NewSEBIDesigPanNo", formData.NewSEBIDesigPanNo);
                    para.Add("@OldSEBIDesigPanNo", formData.OldSEBIDesigPanNo);
                    para.Add("@SEBIDesigPanNoChanged", formData.SEBIDesigPanNoChanged);
                    para.Add("@NewSEBIDesigMobile", formData.NewSEBIDesigMobile);
                    para.Add("@OldSEBIDesigMobile", formData.OldSEBIDesigMobile);
                    para.Add("@SEBIDesigMobileChanged", formData.SEBIDesigMobileChanged);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CandidateImidiateRelatives", dtImmediaterelative, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CandidateJoiningForm_SEBIDetailsUpdate";
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
        public async Task<ReturnMessage> UpdateAccidentInsurancePolicyForm(UpdateAccidentInsurancePolicy formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", formData.CandidateJoiningFormId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@NewAcidentalPolicyNominee", formData.NewAcidentalPolicyNominee);
                    para.Add("@OldAcidentalPolicyNominee", formData.OldAcidentalPolicyNominee);
                    para.Add("@AcidentalPolicyNomineeChanged", formData.AcidentalPolicyNomineeChanged);
                    para.Add("@NewAcidentalPolicyNomineeRelationShip", formData.NewAcidentalPolicyNomineeRelationShip);
                    para.Add("@OldAcidentalPolicyNomineeRelationShip", formData.OldAcidentalPolicyNomineeRelationShip);
                    para.Add("@AcidentalPolicyNomineeRelationShipChanged", formData.AcidentalPolicyNomineeRelationShipChanged);
                    para.Add("@NewAcidentalPolicyNomineeAddress", formData.NewAcidentalPolicyNomineeAddress);
                    para.Add("@OldAcidentalPolicyNomineeAddress", formData.OldAcidentalPolicyNomineeAddress);
                    para.Add("@AcidentalPolicyNomineeAddressChanged", formData.AcidentalPolicyNomineeAddressChanged);
                    para.Add("@CreatedBy", formData.CreatedBy);                    
                    const string procName = "Usp_CandidateJoiningForm_AccidentPolicy_Update";
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
        public async Task<ReturnMessage> UpdateJoiningReportform(UpdateJoiningReport formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", formData.CandidateJoiningFormId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@SignaturePlace", formData.SignaturePlace);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_JoiningReportForm_Update";
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
        public async Task<CandidateJoiningFormPDFData> GetCandidateJoiningFormPDF(CandidateJoingFormSearch Param)
        {
            try
            {
                CandidateJoiningFormPDFData dataList = new CandidateJoiningFormPDFData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", Param.CandidateJoiningFormId);
                    para.Add("@CandidateId", Param.CandidateId);

                    const string procName = "Usp_CandidateJoiningFormPDF_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);

                    dataList.CandidateData = returnList.Read<CandidateJoiningFormPDFHeader>().FirstOrDefault();
                    dataList.FamilyDetail = returnList.Read<CandidateJoiningFormFamilyDetailData>().ToList();
                    dataList.ImmediateRelativeDetail = returnList.Read<CandidateJoiningFormRelativeDetailData>().ToList();

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> ShareWithInductorInsert(ShareWithInductor formData)
        {
            try
            {
                DataTable dtInductionDetail = CommonUtility.ToDataTable<ShareWithInductorData>(formData.ShareWithInductorDetail);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsBatch", formData.IsBatch);
                    para.Add("@ShareWithInductorDetail", dtInductionDetail, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_ShareWithInductors";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<InductorEmailAndEmailBodyData> emailAndEmailBodyData = new List<InductorEmailAndEmailBodyData>();
                    if (rm.SuccessFlag == 1)
                    {

                        foreach (var item in formData.ShareWithInductorDetail)
                        {

                            var inductoremailParam = new DynamicParameters();
                            inductoremailParam.Add("@CandidateId", item.CandidateId);
                            inductoremailParam.Add("@BatchId", item.BatchId);
                            inductoremailParam.Add("@AutoUserId", item.AutoUserId);
                            inductoremailParam.Add("@IsBatch", formData.IsBatch);
                            const string inductorEmailProcName = "Usp_InductionDetailsForInductorMail_GetAll";
                            emailAndEmailBodyData = connection.Query<InductorEmailAndEmailBodyData>(inductorEmailProcName, inductoremailParam, commandType: CommandType.StoredProcedure).ToList();

                            if (emailAndEmailBodyData.Count > 0)
                            {
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 65);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                                if (emailTemplateBodyList.Count > 0)
                                {
                                    string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                    EmailBody = EmailBody.Replace("@~@Inductor", item.InductorName);
                                    EmailBody = EmailBody.Replace("@~@JoiningDate", formData.JoiningDate);
                                    EmailBody = EmailBody.Replace("​​​​​​​@~@InductionDetails", emailAndEmailBodyData[0].EmailBody);
                                    // CommonUtility.sendEmailViaWebApiWithInductionAttachmebt(emailAndEmailBodyData[0].EmailId, "Induction Details", EmailBody, emailAndEmailBodyData[0].EmailBody);
                                     //CommonUtility.sendEmailViaWebApiWithInductionAttachmebt(emailAndEmailBodyData[0].EmailId, "Induction Details", EmailBody, formData.EmailAttachment);
                                   
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

        public async Task<JoiningFormFamilyDetailsUpdateHistoryList> GetJoiningFormFamilyDetailsUpdateHistory(SearchFamilyDetailsUpdateHistory search)
        {
            try
            {
                JoiningFormFamilyDetailsUpdateHistoryList dataList = new JoiningFormFamilyDetailsUpdateHistoryList();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", search.CandidateJoiningFormId);
                    para.Add("@CandidateId", search.CandidateId);                    
                    const string procName = "Usp_CandidateJoiningFormFamily_UpdateHistory_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.FamilyDetailsFormOtherData = returnList.Read<FamilyDetailsFormOtherDetails>().ToList();
                    dataList.FamilyMemberUpdateDetails = returnList.Read<FamilyMemberUpdateDetails>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<SEBIInitialDisclosureUpdateHistoryList> GetSEBIDisclosureUpdateHistory(SearchSEBIInitialDisclosureUpdateHistory search)
        {
            try
            {
                SEBIInitialDisclosureUpdateHistoryList dataList = new SEBIInitialDisclosureUpdateHistoryList();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", search.CandidateJoiningFormId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateJoiningFormSEBI_UpdateHistory_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.SEBIInitialDisclosure = returnList.Read<SEBIInitialDisclosureDetails>().ToList();
                    dataList.SEBIImmediativeRelative = returnList.Read<SEBIImmediateRelatives>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<AccidentInsurancePolicyUpdateHistoryList>> GetAccidentInsurancPolicyUpdateHistory(SearchAccidentInsurancePolicyUpdateHistory search)
        {
            try
            {
                List<AccidentInsurancePolicyUpdateHistoryList> returnList = new List<AccidentInsurancePolicyUpdateHistoryList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", search.CandidateJoiningFormId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateJoiningFormAccidentInsurance_UpdateHistory_GetAll";
                    connection.Open();
                    returnList = connection.Query<AccidentInsurancePolicyUpdateHistoryList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<SearchJoiningReportHistoryList>> GetJoiningReportHistory(SearchJoiningReportHistory search)
        {
            try
            {
                List<SearchJoiningReportHistoryList> returnList = new List<SearchJoiningReportHistoryList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateJoiningFormId", search.CandidateJoiningFormId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_JoiningReportForm_UpdateHistory_GetAll";
                    connection.Open();
                    returnList = connection.Query<SearchJoiningReportHistoryList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<SearchMRFPPFList>> getMRFPPFhistory(SearchMRFPPFHistory search)
        {
            try
            {
                List<SearchMRFPPFList> returnList = new List<SearchMRFPPFList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_MRFPPF_UpdateHistory_GetAll";
                    connection.Open();
                    returnList = connection.Query<SearchMRFPPFList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> DiscontinueCandidates(discontinuecandidate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_DiscontinueCandidates";
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
        public async Task<List<getbatchcandidate>> getbatchidfromcandidateid(searchbatchcandidate formData)
        {
            try
            {

                List<getbatchcandidate> returnList = new List<getbatchcandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "USP_GetBatchIdFromCandidateId";
                    connection.Open();
                    returnList = connection.Query<getbatchcandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<GetAdditionalDocumentList>> GetAdditionalDocumentList(searchbatchcandidate formData)
        {
            try
            {

                List<GetAdditionalDocumentList> returnList = new List<GetAdditionalDocumentList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_AdditionalDocumentGet";
                    connection.Open();
                    returnList = connection.Query<GetAdditionalDocumentList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> DeleteCandidateInductionScheduleDetail(DeleteCandidateInductionScheduleDetail formData)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateInductionScheduleDetailsId", formData.CandidateInductionScheduleDetailsId);
                    const string procName = "Usp_DeleteCandidateDetails_CandidateInductionScheduleDetails";
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

        public async Task<ReturnMessage> UpdateShareWithCandidateDoc(UpdateAdditionalDoc formData)
        {
            try
            {
               
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ShareWithCandidateHeaderId", formData.ShareWithCandidateHeaderId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CandidateJoiningDocumentIds", formData.CandidateJoiningDocumentIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_UpdateAdditionalDocumentForShareWithCandidate";
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

        public async Task<ReturnMessage> InserrtUpdateSignature(SignatureInsUpData formData)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candidateId", formData.CandidateId);
                    para.Add("@CandidateJoiningFormId", formData.CandidateJoiningFormId);
                    para.Add("@SignaturePic", formData.SignaturePic);
                    
                    const string procName = "Usp_CandidateJoiningFormSignature_InsUp";
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

        public async Task<List<SignatureInsUpData>> GetSignatureCandidate(SignatureInsUpData formData)
        {
            try
            {

                List<SignatureInsUpData> returnList = new List<SignatureInsUpData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_CandidateJoiningFormSignature_Get";
                    connection.Open();
                    returnList = connection.Query<SignatureInsUpData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "candidatejoiningform";
                    foreach (var List in returnList)
                    {
                        if (List.SignaturePic != null)
                        {
                            string Document = Path.GetFileName(List.SignaturePic);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.SignaturePic = CandiadateSignature;
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

        public async Task<ReturnMessage> DiscontinueIndividualCandidate(DiscontinueIndividualCandidateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);                    
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@Remarks", formData.Remarks);
                    const string procName = "Usp_DiscontinueIndividual_Candidate";
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
        public async Task<ReturnMessage> DeleteInductionSchedule(DeleteInductionScheduleParam formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@BatchId", formData.BatchId);
                    const string procName = "Usp_ClearDataWhileChangeScheduleForInduction";
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

        public async Task<List<CandidateJoiningRelationShip>> GetJoiningRelationShip(SearchJoiningRelationShip formData)
        {
            try
            {
                List<CandidateJoiningRelationShip> returnList = new List<CandidateJoiningRelationShip>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@isActive", formData.IsActive);
                    
                    const string procName = "Usp_CandidateJoiningRelationShip_getAll";
                    connection.Open();
                    returnList = connection.Query<CandidateJoiningRelationShip>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
