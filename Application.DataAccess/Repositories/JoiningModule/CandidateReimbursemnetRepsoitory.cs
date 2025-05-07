using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CandidateModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
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

namespace Application.DataAccess.Repositories.JoiningModule
{
    public class CandidateReimbursemnetRepsoitory : DatabaseContext, ICandidateReimbursemnetRepoitory
    {
        public CandidateReimbursemnetRepsoitory(AppConfiguration appConfiguration)
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

        public async Task<List<ReimbursementApprovalStatus>> GetReimbursementApprovalStatus(ReimbursementApprovalStatusSearch search)
        {
            try
            {
                List<ReimbursementApprovalStatus> returnList = new List<ReimbursementApprovalStatus>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StatusId", search.StatusId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CandidateReimbursementApprovalStatus_GetAll";
                    connection.Open();
                    returnList = connection.Query<ReimbursementApprovalStatus>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<EmployeeReimbursementMedicalList>> GetMedicalReimbursemtCandidateList(EmployeeReimbursementSearch search)
        {
            try
            {
                List<EmployeeReimbursementMedicalList> returnList = new List<EmployeeReimbursementMedicalList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateMedicalReimbursementId", search.CandidateMedicalReimbursementId);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_CandidateEmployementMedicalReimbursementList_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmployeeReimbursementMedicalList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EmployeeMedicalReimbursement> GetMedicalReimbursemtCandidate(EmployeeReimbursementSearch search)
        {
            try
            {
                EmployeeMedicalReimbursement dataList = new EmployeeMedicalReimbursement();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateMedicalReimbursementId", search.CandidateMedicalReimbursementId);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_CandidateEmployementMedicalReimbursement_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EmployeeReimbursementMatserData = returnList.Read<EmployeeReimbursementMatserData>().FirstOrDefault();
                    dataList.EmployeeReimbursementDetails = returnList.Read<EmployeeReimbursementDetails>().ToList();

                    String ContainerReference = "candidatereimbursementbill";

                    if (dataList.EmployeeReimbursementMatserData.BillDetails != null)
                    {
                        string Document = Path.GetFileName(dataList.EmployeeReimbursementMatserData.BillDetails);
                        string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                        dataList.EmployeeReimbursementMatserData.BillDetails = CandiadateSignature;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Argg start
        public async Task<EmployeeMedicalReimbursementMedical> GetMedicalReimbursemtCandidate1(EmployeeReimbursementSearch search)
        {
            try
            {
                EmployeeMedicalReimbursementMedical dataList = new EmployeeMedicalReimbursementMedical();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateMedicalReimbursementId", search.CandidateMedicalReimbursementId);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_CandidateEmployementMedicalReimbursement_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EmployeeReimbursementMatserData1 = returnList.Read<EmployeeReimbursementMatserData1>().FirstOrDefault();
                    dataList.EmployeeReimbursementDetailsMedical = returnList.Read<EmployeeReimbursementDetailsMedical>().ToList();

                    String ContainerReference = "candidatereimbursementbill";

                    if (dataList.EmployeeReimbursementMatserData1.BillDetails != null)
                    {
                        string Document = Path.GetFileName(dataList.EmployeeReimbursementMatserData1.BillDetails);
                        string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                        dataList.EmployeeReimbursementMatserData1.BillDetails = CandiadateSignature;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }//Argg end


        public async Task<EmployeeMedicalReimbursementMedical2> GetMedicalReimbursemtCandidate2(EmployeeReimbursementSearch search)
        {
            try
            {
                EmployeeMedicalReimbursementMedical2 dataList = new EmployeeMedicalReimbursementMedical2();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateMedicalReimbursementId", search.CandidateMedicalReimbursementId);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_CandidateEmployementMedicalReimbursement_GetAllApproveRemarks";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EmployeeReimbursementMatserData1 = returnList.Read<EmployeeReimbursementMatserData1>().FirstOrDefault();
                    dataList.EmployeeReimbursementDetailsMedical = returnList.Read<EmployeeReimbursementDetailsMedical>().ToList();
                    dataList.EmployeeMedicalReimbursementMedicalApproval = returnList.Read<EmployeeMedicalReimbursementMedicalApproval>().ToList();

                    //String ContainerReference = "candidatereimbursementbill";

                    if (dataList.EmployeeReimbursementMatserData1.BillDetails != null)
                    {
                        //String ContainerReference = "candidatereimbursementbill";
                        String ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.EmployeeReimbursementMatserData1.BillDetails);
                        string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                        dataList.EmployeeReimbursementMatserData1.BillDetails = CandiadateSignature;
                    }
                    if (dataList.EmployeeReimbursementMatserData1.DocumentPathForPDF != "")
                    {
                        String ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.EmployeeReimbursementMatserData1.DocumentPathForPDF);
                        string MedicalReimbursementPDF = DownloadedFile(Document, ContainerReference);
                        dataList.EmployeeReimbursementMatserData1.DocumentPathForPDF = MedicalReimbursementPDF;
                    }
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }//Argg end




        public async Task<ReturnMessage> SaveMedicalReimbursemtCandidate(EmployeeReimbursementData formData)
        {
            try
            {
                DataTable dtDEtails = CommonUtility.ToDataTable<EmployeeReimbursementDetails>(formData.EmployeeReimbursementDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateMedicalReimbursementId", formData.CandidateMedicalReimbursementId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpId", formData.EmpId);
                    para.Add("@Location", formData.Location);
                    para.Add("@DateofJoin", formData.DateofJoining);
                    para.Add("@BillDetails", formData.BillDetails);
                    para.Add("@DocumentPath", formData.HtmlstringPath);
                    para.Add("@Date", formData.Date);
                    para.Add("@TotalAmount", formData.TotalAmount);
                    para.Add("@CandidateMedicalReimbursementDetails", dtDEtails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ApprovalStatus", formData.ApprovalStatus);
                    para.Add("@ApprovalRemarks", formData.ApprovalRemarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateEmployemenMedicalReimbursement_InsertUpdate";
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

        public async Task<List<EmployeeTravelReimbursementListData>> GetTravelReimbursementListCandidate(EmployeeTravelReimbursementSearch search)
        {
            try
            {
                List<EmployeeTravelReimbursementListData> returnList = new List<EmployeeTravelReimbursementListData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateTravelReimbursementId", search.CandidateTravelReimbursementId);
                    const string procName = "Usp_CandidateTravelReimbursementList_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmployeeTravelReimbursementListData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EmployeeTravelReimbursement> GetTravelReimbursementCandidate(EmployeeTravelReimbursementSearch search)
        {
            try
            {
                EmployeeTravelReimbursement dataList = new EmployeeTravelReimbursement();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateTravelReimbursementId", search.CandidateTravelReimbursementId);
                    const string procName = "Usp_CandidateTravelReimbursement_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.EmployeeTravelReimbursementMasterData = returnList.Read<EmployeeTravelReimbursementMasterData>().FirstOrDefault();
                    dataList.EmployeeTravelJourneyDetails = returnList.Read<EmployeeTravelJourneyDetails>().ToList();
                    dataList.EmployeeTravelAttachmentDetails = returnList.Read<EmployeeTravelAttachmentDetails>().ToList();
                    dataList.EmployeeTravelForRemarks = returnList.Read<EmployeeTravelForRemarks>().ToList();

                    if (dataList.EmployeeTravelAttachmentDetails.Count > 0)
                    {
                        if (dataList.EmployeeTravelAttachmentDetails[0].AttachmentLink != "")
                        {
                            String ContainerReference = "candidatedocument";
                            foreach (var List in dataList.EmployeeTravelAttachmentDetails)
                            {
                                if (List.AttachmentLink != null)
                                {
                                    string Document = Path.GetFileName(List.AttachmentLink);
                                    string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                                    List.AttachmentLink = CandiadateSignature;
                                }
                            }
                        }
                    }
                    if (dataList.EmployeeTravelReimbursementMasterData.DocumentPathForPDF != "") 
                    {
                        String ContainerReference = "candidatedocument";
                        string Document = Path.GetFileName(dataList.EmployeeTravelReimbursementMasterData.DocumentPathForPDF);
                        string JoiningTravelReimbursementPDF = DownloadedFile(Document, ContainerReference);
                        dataList.EmployeeTravelReimbursementMasterData.DocumentPathForPDF = JoiningTravelReimbursementPDF;
                    }
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveTravelReimbursementCandidate(EmployeeTravelReimbursementData1 formData) //Argg
        {
            try
            {
                DataTable dtJourney = CommonUtility.ToDataTable<EmployeeTravelJourneyDetails>(formData.EmployeeTravelJourneyDetails);
                DataTable dtAttachment = CommonUtility.ToDataTable<EmployeeTravelAttachmentDetails>(formData.EmployeeTravelAttachmentDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateTravelReimbursementId", formData.CandidateTravelReimbursementId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@DateofInduction", formData.DateofInduction);
                    para.Add("@PlaceofInduction", formData.PlaceofInduction);
                    para.Add("@PlaceofInductionDesc", formData.PlaceofInductionDesc);
                    para.Add("@PreviousAttachmentIds", formData.PreviousAttachmentIds);
                    para.Add("@PreviousJourneyIds", formData.PreviousJourneyIds);
                    para.Add("@Documentpath", formData.Htmlstringpath);
                    para.Add("@JourneyData", dtJourney, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AttachmentData", dtAttachment, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ApprovalRemarks ", formData.ApprovalRemarks);//Argg
                    para.Add("@ApprovalStatus  ", formData.ApprovalStatus);//Argg
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateTravelReimbursement_InsertUpdate";
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
        public async Task<List<EmployeeNoticePeriodReimbursement>> GetNoticePeriodReimbursemtCandidateList(EmployeeNoticePeriodReimbursementSearch search)
        {
            try
            {
                List<EmployeeNoticePeriodReimbursement> returnList = new List<EmployeeNoticePeriodReimbursement>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNoticePeriodBuyOutDaysId", search.CandidateNoticePeriodBuyOutDaysId);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_CandidateNoticePeriodReimbursementList_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmployeeNoticePeriodReimbursement>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "employeenoticeperiodreimbursement";
                    foreach (var List in returnList)
                    {
                        if (List.Document != null)
                        {
                            string Document = Path.GetFileName(List.Document);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Document = CandiadateSignature;
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

        public async Task<List<EmployeeNoticePeriodReimbursement>> GetNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursementSearch search)
        {
            try
            {
                List<EmployeeNoticePeriodReimbursement> returnList = new List<EmployeeNoticePeriodReimbursement>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNoticePeriodBuyOutDaysId", search.CandidateNoticePeriodBuyOutDaysId);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_CandidateNoticePeriodReimbursementList_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmployeeNoticePeriodReimbursement>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    //String ContainerReference = "employeenoticeperiodreimbursement";
                    foreach (var List in returnList)
                    {
                        if (List.Document != null)
                        {
                            String ContainerReference = "employeenoticeperiodreimbursement";
                            string Document = Path.GetFileName(List.Document);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Document = CandiadateSignature;
                        }
                        if (List.DocumentPath != "")
                        {
                            String ContainerReference = "employeenoticeperiodreimbursement";
                            string Document = Path.GetFileName(List.DocumentPath);
                            string NoticePeriodBuyoutReimbursementPDF = DownloadedFile(Document, ContainerReference);
                            List.DocumentPath = NoticePeriodBuyoutReimbursementPDF;
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

        public async Task<ReturnMessage> SaveNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursement formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNoticePeriodBuyOutDaysId", formData.CandidateNoticePeriodBuyOutDaysId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@NoticePeriodDays", formData.NoticePeriodDays);
                    para.Add("@NoticePeroiodServed", formData.NoticePeroiodServed);
                    para.Add("@RemainingDays", formData.RemainingDays);
                    para.Add("@Amount", formData.Amount);
                    para.Add("@Document", formData.Document);
                    para.Add("@Documentpath", formData.HtmlstringPath);
                    para.Add("@ApprovalStatus", formData.ApprovalStatus);
                    para.Add("@ApprovalRemarks", formData.ApprovalRemarks);
                    para.Add("@DateOfResigation", formData.DateOfResigation);
                    para.Add("@NoticePeriodRecovery", formData.NoticePeriodRecovery);
                    para.Add("@RecoveryAmountPerDay", formData.RecoveryAmountPerDay);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateNoticePeriodReimbursement_InsertUpdate";
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
        public async Task<List<CandidateMedicalReimbursementApprovalList>> GetMedicalReimbursementApprovalList(CandidateMedicalReimbursementApprovalListSearch search)
        {
            try
            {
                List<CandidateMedicalReimbursementApprovalList> returnList = new List<CandidateMedicalReimbursementApprovalList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateMedicalReimbursementId", search.CandidateMedicalReimbursementId);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@Name", search.Name);
                    para.Add("@Location", search.Location);
                    para.Add("@Function", search.Function);
                    para.Add("@Department", search.Department);
                    para.Add("@ApprovalStatus", search.ApprovalStatus);
                    const string procName = "Usp_CandidateMedicalReimbursementApprovalList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateMedicalReimbursementApprovalList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "candidatedocument";
                    foreach (var List in returnList)
                    {
                        if (List.DocumentPathForPDF != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPathForPDF);
                            string MedicalReimbursementPDF = DownloadedFile(Document, ContainerReference);
                            List.DocumentPathForPDF = MedicalReimbursementPDF;
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

        public async Task<ReturnMessage> SaveMedicalReimbursementApproval(CandidateMedicalReimbursementApproval formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateMedicalReimbursementId", formData.CandidateMedicalReimbursementId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@ApprovalStatus", formData.ApprovalStatus);
                    para.Add("@ApprovalRemarks", formData.ApprovalRemarks);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateEmployementMedicalReimbursementApproval_InsertUpdate";
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

        public async Task<List<CandidateTravelReimbursementApprovalList>> GetTravelReimbursementApprovalList(CandidateTravellReimbursementApprovalListSearch search)
        {
            try
            {
                List<CandidateTravelReimbursementApprovalList> returnList = new List<CandidateTravelReimbursementApprovalList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateTravelReimbursementId", search.CandidateTravelReimbursementId);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@Name", search.Name);
                    para.Add("@Location", search.Location);
                    para.Add("@Function", search.Function);
                    para.Add("@Department", search.Department);
                    para.Add("@ApprovalStatus", search.ApprovalStatus);
                    const string procName = "Usp_CandidateTravelReimbursementApprovalList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateTravelReimbursementApprovalList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "candidatedocument";
                    foreach (var List in returnList)
                    {
                        if (List.DocumentPathForPDF != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPathForPDF);
                            string JoiningTravelReimbursementPDF = DownloadedFile(Document, ContainerReference);
                            List.DocumentPathForPDF = JoiningTravelReimbursementPDF;
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

        public async Task<ReturnMessage> SaveTravelReimbursementApproval(CandidateTravelReimbursementApproval formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateTravelReimbursementId", formData.CandidateTravelReimbursementId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@ApprovalStatus", formData.ApprovalStatus);
                    para.Add("@ApprovalRemarks", formData.ApprovalRemarks);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateTravelReimbursementApproval_InsertUpdate";
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

        public async Task<List<CandidateNoticePeriodBuyOutApprovalList>> GetCandidateNoticePeriodBuyOutApprovalList(CandidateNoticePeriodBuyOutApprovalListSearch search)
        {
            try
            {
                List<CandidateNoticePeriodBuyOutApprovalList> returnList = new List<CandidateNoticePeriodBuyOutApprovalList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNoticePeriodBuyOutDaysId", search.CandidateNoticePeriodBuyOutDaysId);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@Name", search.Name);
                    para.Add("@Location", search.Location);
                    para.Add("@Function", search.Function);
                    para.Add("@Department", search.Department);
                    para.Add("@ApprovalStatus", search.ApprovalStatus);
                    const string procName = "Usp_CandidateNoticePeriodBuyOutApprovalList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateNoticePeriodBuyOutApprovalList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "employeenoticeperiodreimbursement";
                    foreach (var List in returnList)
                    {
                        if (List.DocumentPathForHtml != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPathForHtml);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.DocumentPathForHtml = CandiadateSignature;
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
        public async Task<ReturnMessage> SaveCandidateNoticePeriodBuyOutApproval(CandidateNoticePeriodBuyOutApproval formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNoticePeriodBuyOutDaysId", formData.CandidateNoticePeriodBuyOutDaysId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@ApprovalStatus", formData.ApprovalStatus);
                    para.Add("@ApprovalRemarks", formData.ApprovalRemarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateNoticePeriodBuyOutApproval_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {
                        if (formData.ApprovalStatus == 2)
                        {
                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 77);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@EmpName", formData.CandidateName);
                                EmailBody = EmailBody.Replace("@~@EmpNo", formData.EmpNo);
                                EmailBody = EmailBody.Replace("@~@Password", formData.Passworrd);
                                EmailBody = EmailBody.Replace("@~@ReimbursementName", formData.ReimbursementName);
                                //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Reimbursement Claim  - Clarification Needed", EmailBody);
                                IDbConnection db =base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 34, 85, formData.EmailId, EmailBody, "Schedule Interview -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
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

        public async Task<List<CandidateReimbursementBillSubmitList>> GetCandidateReimbursementBillSubmitList(CandidateReimbursementBillSubmitListSearch search)
        {
            try
            {
                List<CandidateReimbursementBillSubmitList> returnList = new List<CandidateReimbursementBillSubmitList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateReimbursementBillSubmitId", search.CandidateReimbursementBillSubmitId);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@Name", search.Name);
                    para.Add("@Vertical", search.Vertical);
                    para.Add("@Location", search.Location);
                    para.Add("@Function", search.Function);
                    para.Add("@Department", search.Department);
                    para.Add("@Pending", search.Pending);
                    const string procName = "Usp_CandidateReimbursementBillSubmitList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateReimbursementBillSubmitList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    String ContainerReference = "candidatereimbursementbill";
                    foreach (var List in returnList)
                    {
                        if (List.Document != "")
                        {
                            string document = Path.GetFileName(List.Document);
                            string AttachmentLink = DownloadedFile(document, ContainerReference);
                            List.Document = AttachmentLink;
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

        public async Task<ReturnMessage> SaveCandidateReimbursementBillSubmit(CandidateReimbursementBillSubmitSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateReimbursementBillSubmitId", formData.CandidateReimbursementBillSubmitId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Amount", formData.Amount);
                    para.Add("@Document", formData.Document);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateReimbursementBillSubmit_Insert";
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

        public async Task<List<CandidateReimbursementBillSubmitList>> GetCandidateReimbursementBillSubmitListForDownload(CandidateReimbursementBillSubmitListSearchForZip search)
        {
            try
            {
                List<CandidateReimbursementBillSubmitList> returnList = new List<CandidateReimbursementBillSubmitList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateIds", search.CandidateId);

                    const string procName = "Usp_CandidateNoticePeriodBuyOutApprovalList_GetAllForZip";
                    connection.Open();
                    returnList = connection.Query<CandidateReimbursementBillSubmitList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    foreach (var List in returnList)
                    {
                        if (List.DocumentPathForHtml != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPathForHtml);
                            string CandiadateSignature = DownloadedFile(Document, "employeenoticeperiodreimbursement");
                            List.DocumentPathForHtml = CandiadateSignature;
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

        public async Task<List<EmployeeTravelReimbursementForZip>> GetTravelReimbursementCandidateForAll(CandidateReimbursementBillSubmitListSearchForZip search)
        {
            try
            {
                List<EmployeeTravelReimbursementForZip> returnList = new List<EmployeeTravelReimbursementForZip>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    //para.Add("@CandidateTravelReimbursementId", search.CandidateTravelReimbursementId);
                    const string procName = "Usp_CandidateTravelReimbursement_GetAllForZip";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    returnList = connection.Query<EmployeeTravelReimbursementForZip>(procName, para, commandType: CommandType.StoredProcedure).ToList();


                    String ContainerReference = "candidatereimbursementbill";
                    foreach (var List in returnList)
                    {
                        if (List.AttachmentLink != null)
                        {
                            string Document = Path.GetFileName(List.AttachmentLink);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.AttachmentLink = CandiadateSignature;
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
        public async Task<List<EmployeeReimbursementMedicalList>> GetCandidateMedicalReimbursementDwnloadAll(CandidateReimbursementBillSubmitListSearchForZip search)
        {
            try
            {
                string ContainerReference = "candidatereimbursementbill";
                List<EmployeeReimbursementMedicalList> returnList = new List<EmployeeReimbursementMedicalList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CandidateEmployementMedicalReimbursementListDocument_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmployeeReimbursementMedicalList>(procName, para, commandType: CommandType.StoredProcedure).ToList();


                    foreach (var List in returnList)
                    {
                        if (List.BillDetails != null)
                        {
                            string Document = Path.GetFileName(List.BillDetails);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.BillDetails = CandiadateSignature;
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
    }
}

