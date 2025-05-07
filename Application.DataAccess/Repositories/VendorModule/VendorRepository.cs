using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.VendorModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.VendorModule;
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

namespace Application.DataAccess.Repositories.VendorModule
{
    public class VendorRepository : DatabaseContext, IVendorRepository
    {
        public VendorRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public string localFilePath = null;

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
        public async Task<List<Vendor>> GetAllVendor(SearchVendor search)
        {
            try
            {
                List<Vendor> returnList = new List<Vendor>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorId", search.VendorId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Vendor_GetAll";
                    connection.Open();
                    returnList = connection.Query<Vendor>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> InvoiceInsertUpdate(InsertUpdateForInvoiceParam Param)
        {
            try
            {
                DataTable dtInvoiceDetails = CommonUtility.ToDataTable<VendorInvoiceDetails>(Param.VendorInvoiceDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorInvoiceId", Param.VendorInvoiceId);
                    para.Add("@VendorId", Param.VendorId);
                    para.Add("@CandidateId", Param.CandidateId);
                    para.Add("@InvoicePath", Param.InvoicePath);
                    para.Add("@Remarks", Param.Remarks);
                    para.Add("@InvoiceStatus", Param.InvoiceStatus);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    para.Add("@CreatedOn", Param.CreatedOn);
                    para.Add("@ModifiedBy", Param.ModifiedBy);
                    para.Add("@ModifiedOn", Param.ModifiedOn);
                    para.Add("@VendorInvoiceDetails", dtInvoiceDetails, DbType.Object, ParameterDirection.Input, null);

                    const string procName = "Usp_VendorInvoice_InsertUpdate";
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

        //Arnab
        public async Task<ReturnMessage> CreditNoteInsertUpdate(InsertUpdarteForCreditNoteInput Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorInvoiceId", Param.VendorInvoiceId);
                    para.Add("@VendorCreditNoteId", Param.VendorCreditNoteId);
                    para.Add("@CreditNoteStatus", Param.CreditNoteStatus);
                    para.Add("@TotalBillAmount", Param.TotalBillAmount);
                    para.Add("@CreditBillAmount", Param.CreditBillAmount);
                    para.Add("@Remarks", Param.Remarks);
                    para.Add("@UploadDocument", Param.UploadDocument);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    para.Add("@CreatedOn", Param.CreatedOn);
                    para.Add("@ModifiedBy", Param.ModifiedBy);
                    para.Add("@ModifiedOn", Param.ModifiedOn);

                    const string procName = "Usp_VendorCreditNote_InsertUpdate";
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

        public async Task<ReturnMessage> VendorInsertUpdate(VendorFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                //  string SaltKey = Guid.NewGuid().ToString();
                // string EncodePass = CommonUtility.EncodePassword(formData.Password, SaltKey);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorId", formData.VendorId);
                    //para.Add("@VendorUserId", formData.VendorUserId);
                    //para.Add("@Password", EncodePass);
                    //para.Add("@SaltKey", SaltKey);
                    para.Add("@VendorName", formData.VendorName);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@AlternateEmailId", formData.AlternateEmailId);
                    para.Add("@ContactNo", formData.ContactNo);
                    para.Add("@StateId", formData.StateId);
                    para.Add("@City", formData.City);
                    para.Add("@Street", formData.Street);
                    para.Add("@ZipCode", formData.ZipCode);
                    para.Add("@ContactPersonName", formData.ContactPersonName);
                    para.Add("@AgreementValidityDate", formData.AgreementValidityDate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Vendor_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1 && formData.VendorId == 0)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 103);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                        EmailBody = EmailBody.Replace("@~@Name", formData.VendorName);
                        EmailBody = EmailBody.Replace("@~@UserId", rm.RefNo);
                        EmailBody = EmailBody.Replace("@~@Password", "welcome@1234");
                        //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Vendor Registration -  MRF Limited", EmailBody);
                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 5, 108, formData.EmailId, EmailBody, "Vendor Registration -  MRF Limited", Convert.ToInt32(formData.CreatedBy));

                    }
                    //{


                    //    string EmailBody = "<html>" +
                    //        "<head></head>" +
                    //        "<body style='font-family:calibri;'>" +
                    //        "<h3>Hi " + formData.VendorName + ",</h3>" +
                    //        "<h4>Your vendor id had been created successfully. Please find the below details </h4>" +
                    //        "<h4>User Id :" + rm.RefNo + ",</h4>" +
                    //        "<h4>Password : welcome@1234 </h4>" +
                    //        "<h4>Link : <a href='https://mrfhrportalprod.azurewebsites.net/login'>Click here</a> to Login</h4>" +
                    //        "<br/>" +
                    //        "</body>" +
                    //        "</html>";
                    //    CommonUtility.sendEmailViaWebApi(formData.EmailId, "Vendor Registration -  MRF Limited", EmailBody);

                    //}
                    if (rm.SuccessFlag == 1 && formData.VendorId != 0)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 104);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                        EmailBody = EmailBody.Replace("@~@Name", formData.VendorName);
                        EmailBody = EmailBody.Replace("@~@UserId", rm.RefNo);
                        EmailBody = EmailBody.Replace("@~@Password", "welcome@1234");
                        // CommonUtility.sendEmailViaWebApi(formData.EmailId, "Vendor Details Update -  MRF Limited", EmailBody);
                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 5, 109, formData.EmailId, EmailBody, "Vendor Details Update -  MRF Limited", Convert.ToInt32(formData.CreatedBy));

                    }
                    //{


                    //    string EmailBody = "<html>" +
                    //        "<head></head>" +
                    //        "<body style='font-family:calibri;'>" +
                    //        "<h3>Hi " + formData.VendorName + ",</h3>" +
                    //        "<h4>Your vendor details has been updated successfully. Please find the below details </h4>" +
                    //        "<h4>User Id :" + formData.VendorUserID + ",</h4>" +
                    //        "<h4>Password : welcome@1234 </h4>" +
                    //        "<h4>Link : <a href='https://mrfhrportalprod.azurewebsites.net/login'>Click here</a> to Login</h4>" +
                    //        "<br/>" +
                    //        "</body>" +
                    //        "</html>";
                    //    CommonUtility.sendEmailViaWebApi(formData.EmailId, "Vendor Details Update -  MRF Limited", EmailBody);

                    //}
                    return await Task.FromResult(rm);


                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VendorCandidateDetail>> GetAllVendorJoinedCandidate(SearchVendorcandidate search)
        {
            try
            {
                List<VendorCandidateDetail> returnList = new List<VendorCandidateDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@CandidateName", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_VendorCandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<VendorCandidateDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Arnab
        public async Task<List<ProcessInvoiceListForRMOutput>> GetAllProcessInvoiceCandidateListForRM(ProcessInvoiceListForRMInput search)
        {
            try
            {
                List<ProcessInvoiceListForRMOutput> returnList = new List<ProcessInvoiceListForRMOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VendorName ", search.VendorName);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_ProcessInvoiceCandidateListForRM_GetAll";
                    connection.Open();
                    returnList = connection.Query<ProcessInvoiceListForRMOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "vendorinvoice";
                    foreach (var List in returnList)
                    {
                        if (List.InvoicePath != null)
                        {
                            string Document = Path.GetFileName(List.InvoicePath);
                            string InvoicePath = DownloadedFile(Document, ContainerReference);
                            List.InvoicePath = InvoicePath;
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
        //Arnab
        public async Task<List<ProcessInvoiceListForRMOutput>> GetAllProcessInvoiceCandidateListForRO(ProcessInvoiceListForRMInput search)
        {
            try
            {
                List<ProcessInvoiceListForRMOutput> returnList = new List<ProcessInvoiceListForRMOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VendorName ", search.VendorName);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_ProcessInvoiceCandidateListForRO_GetAll";
                    connection.Open();
                    returnList = connection.Query<ProcessInvoiceListForRMOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "vendorinvoice";
                    foreach (var List in returnList)
                    {
                        if (List.InvoicePath != null)
                        {
                            string Document = Path.GetFileName(List.InvoicePath);
                            string InvoicePath = DownloadedFile(Document, ContainerReference);
                            List.InvoicePath = InvoicePath;
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
        //Arnab
        public async Task<List<ProcessCreditNoteListForRMOutput>> GetAllProcessCreditNoteCandidateListForRM(ProcessCredeitNoteListForRMInput search)
        {
            try
            {
                List<ProcessCreditNoteListForRMOutput> returnList = new List<ProcessCreditNoteListForRMOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VendorName ", search.VendorName);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_ProcessCreditNoteCandidateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<ProcessCreditNoteListForRMOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "vendorcreditnote";
                    foreach (var List in returnList)
                    {
                        if (List.CreditNoteDocument != null)
                        {
                            string Document = Path.GetFileName(List.CreditNoteDocument);
                            string CreditNoteDocument = DownloadedFile(Document, ContainerReference);
                            List.CreditNoteDocument = CreditNoteDocument;
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
        //Arnab
        public async Task<List<ProcessCreditNoteListForRMOutput>> GetAllProcessCreditNoteCandidateListForRO(ProcessCredeitNoteListForRMInput search)
        {
            try
            {
                List<ProcessCreditNoteListForRMOutput> returnList = new List<ProcessCreditNoteListForRMOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VendorName ", search.VendorName);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_ProcessCreditNoteCandidateListForRO_GetAll";
                    connection.Open();
                    returnList = connection.Query<ProcessCreditNoteListForRMOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "vendorcreditnote";
                    foreach (var List in returnList)
                    {
                        if (List.CreditNoteDocument != null)
                        {
                            string Document = Path.GetFileName(List.CreditNoteDocument);
                            string CreditNoteDocument = DownloadedFile(Document, ContainerReference);
                            List.CreditNoteDocument = CreditNoteDocument;
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

        public async Task<ReturnMessage> UploadVendorInvoice(VendorUploadInvoiceFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@InvoicePath", formData.InvoicePath);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Vendor_UploadInvoice";
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

        public async Task<ReturnMessage> VendorInvoiceAction(VendorInvoiceActionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorInvoiceIds", formData.VendorInvoiceIds);
                    para.Add("@InvoiceStatusId", formData.InvoiceStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_VendorInvoiceAction_Insert";
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

        public async Task<List<VendorClarificationRemarks>> GetAllVendorInvoiceClarificationRemarks(SearchVendorClarificationRemarks search)
        {
            try
            {
                List<VendorClarificationRemarks> returnList = new List<VendorClarificationRemarks>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorInvoiceId", search.VendorInvoiceId);
                    const string procName = "Usp_VendorInvoiceClarification_GetAll";
                    connection.Open();
                    returnList = connection.Query<VendorClarificationRemarks>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UploadVendorInvoiceUpdate(VendorInvoiceUpdateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorInvoiceId", formData.VendorInvoiceId);
                    para.Add("@InvoicePath", formData.InvoicePath);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Vendor_UploadInvoice_Update";
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

        public async Task<List<VendorCandidateDetail>> GetAllVendorRaiseCreditnote(SearchVendorcandidate search)
        {
            try
            {
                List<VendorCandidateDetail> returnList = new List<VendorCandidateDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    para.Add("@CandidateName", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_VendorCreditNote_GetAll";
                    connection.Open();
                    returnList = connection.Query<VendorCandidateDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> ReleaseInvoiceInsertUpdate(ReleaseInvoiceInsertUpdateParam formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@VendorInvoiceId", formData.VendorInvoiceId);
                    para.Add("@VendorId", formData.VendorId);
                    para.Add("@InvoiceStatus", formData.InvoiceStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_VendorReleaseInvoice_InsertUpdate";
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

        public async Task<ReturnMessage> VendorCreditNoteClarificationinsertupdate(CreditNoteClarificationUpdateParam formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorCreditNoteIds", formData.VendorCreditNoteIds);
                    para.Add("@CreditNoteStatus", formData.CreditNoteStatus);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_VendorCreditNoteClarification_InsertUpdate";
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
