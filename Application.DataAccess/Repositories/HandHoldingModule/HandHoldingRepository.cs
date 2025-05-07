using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.HandHoldingModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.HandHoldingModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace Application.DataAccess.Repositories.HandHoldingModule
{
    public class HandHoldingRepository : DatabaseContext, IHandHoldingRepository
    {
        public HandHoldingRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }
        public string localFilePath = null;
        public async Task<List<HandHoldingAllocationCandidate>> GetAllHandHoldingAllocationList(HandHoldingAllocationSearch search)
        {
            try
            {
                List<HandHoldingAllocationCandidate> dataList = new List<HandHoldingAllocationCandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@AllocationStatus", search.AllocationStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@roleId", search.RoleId);
                    para.Add("@autoUserId", search.AutoUserId);
                    const string procName = "Usp_HandHoldingCandidate_GetAll";
                    connection.Open();
                    dataList = connection.Query<HandHoldingAllocationCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
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
        public async Task<List<HandHoldingAllocationCandidate>> GetHandHoldingAllocationList(HandHoldingAllocationSearch search)
        {
            try
            {
                List<HandHoldingAllocationCandidate> dataList = new List<HandHoldingAllocationCandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@AllocationStatus", search.AllocationStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@roleId", search.RoleId);
                    para.Add("@autoUserId", search.AutoUserId);
                    const string procName = "Usp_handHoldingAllocation_getAll";
                    connection.Open();
                    dataList = connection.Query<HandHoldingAllocationCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<ConfirmationReviewDetail>> GetCandidateDetailsConfReview(SearchConfirmationReviewDetail search)
        {
            try
            {
                List<ConfirmationReviewDetail> dataList = new List<ConfirmationReviewDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@empNo", search.EmpNo);
                    para.Add("@candidateId", search.CandidateId);
                    
                    const string procName = "Usp_ConfirmationReview_getEmpDetails";
                    connection.Open();
                    dataList = connection.Query<ConfirmationReviewDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> HandHoldingAllocateInsertUpdate(HandHoldingAllocateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_HandHoldingAllocate_InsertUpdate";
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

        public async Task<List<AICAllocatedJobShadowCandidateList>> GetAllAICAllocatedJobShadowList(SearchAICAllocatedList search)
        {
            try
            {
                List<AICAllocatedJobShadowCandidateList> dataList = new List<AICAllocatedJobShadowCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@roleIds", search.RoleIds);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_HandHoldingAICCandidateJobShadow_GetAll";
                    connection.Open();
                    dataList = connection.Query<AICAllocatedJobShadowCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingAICJobShadowReviewInsertUpdate(AICHandHoldingJobShadowReviewFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@JobShadowReviewId", formData.JobShadowReviewId);
                    para.Add("@Question1Status", formData.Question1Status);
                    para.Add("@Question1Reason", formData.Question1Reason);
                    para.Add("@Question2Answer", formData.Question2Answer);
                    para.Add("@Question3Answer", formData.Question3Answer);
                    para.Add("@Question4Answer", formData.Question4Answer);
                    para.Add("@Question5Answer", formData.Question5Answer);
                    para.Add("@Question6Answer", formData.Question6Answer);
                    para.Add("@Question7Answer", formData.Question7Answer);
                    para.Add("@Question8Answer", formData.Question8Answer);
                    para.Add("@Question9Status", formData.Question9Status);
                    para.Add("@isactive", formData.isActive); //ab
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_HandHolding_JobShadow_InsertUpdate";
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

        public async Task<JobShadowReviewDetailsData> GetAllAICAllocatedJobShadowReviewDetails(SearchAICHandHoldingJobShadowReviewDetail search)
        {
            try
            {
                JobShadowReviewDetailsData dataList = new JobShadowReviewDetailsData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@JobShadowReviewId", search.JobShadowReviewId);
                    const string procName = "Usp_HandHoldingJobShadowReviewDetails";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.aICHandHoldingJobShadowReviewDetails = returnList.Read<AICHandHoldingJobShadowReviewDetails>().FirstOrDefault();
                    dataList.remarksDetailsDatas = returnList.Read<RemarksDetailsData>().ToList();
                    return await Task.FromResult(dataList);

                    //dataList = connection.Query<AICHandHoldingJobShadowReviewDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AICAllocatedListenCandidateList>> GetAllAICAllocatedListenList(SearchAICAllocatedList search)
        {
            try
            {
                List<AICAllocatedListenCandidateList> dataList = new List<AICAllocatedListenCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@roleIds", search.RoleIds);
                    const string procName = "Usp_HandHoldingAICCandidateListen_GetAll";
                    connection.Open();
                    dataList = connection.Query<AICAllocatedListenCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AICAllocatedHalfYearlyCandidateList>> GetAllAICAllocatedHalfYearlyList(SearchAICAllocatedList search)
        {
            try
            {
                List<AICAllocatedHalfYearlyCandidateList> dataList = new List<AICAllocatedHalfYearlyCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@roleIds", search.RoleIds);
                    const string procName = "Usp_HandHoldingAICCandidateHalfYearly_GetAll";
                    connection.Open();
                    dataList = connection.Query<AICAllocatedHalfYearlyCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AICAllocatedConfirmationCandidateList>> GetAllAICAllocatedConfirmationList(SearchAICAllocatedList search)
        {
            try
            {
                List<AICAllocatedConfirmationCandidateList> dataList = new List<AICAllocatedConfirmationCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@roleIds", search.RoleIds);
                    const string procName = "Usp_HandHoldingAICCandidateConfirmation_GetAll";
                    connection.Open();
                    dataList = connection.Query<AICAllocatedConfirmationCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<HandHoldingReviewQuestions>> GetAllHandHoldingReviewQuestions(HandHoldingReviewQuestions search)
        {
            try
            {
                List<HandHoldingReviewQuestions> dataList = new List<HandHoldingReviewQuestions>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReviewTypeId", search.ReviewTypeId);
                    const string procName = "Usp_HandHolding_ReviewQuestions_GetAll";
                    connection.Open();
                    dataList = connection.Query<HandHoldingReviewQuestions>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingAICListenReviewInsertUpdate(AICHandHoldingListenReviewFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@ListenReviewId", formData.ListenReviewId);
                    para.Add("@Question1Answer", formData.Question1Answer);
                    para.Add("@Question2Answer", formData.Question2Answer);
                    para.Add("@Question3Answer", formData.Question3Answer);
                    para.Add("@Question4Answer", formData.Question4Answer);
                    para.Add("@Question5Answer", formData.Question5Answer);
                    para.Add("@Question6Answer", formData.Question6Answer);
                    para.Add("@Question7Answer", formData.Question7Answer);
                    para.Add("@Question8Answer", formData.Question8Answer);
                    para.Add("@Question9Answer", formData.Question9Answer);
                    para.Add("@Question10Answer", formData.Question9Answer);
                    para.Add("@isActive", formData.isActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_HandHolding_Listen_InsertUpdate";
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

        public async Task<List<AICHandHoldingListenReviewDetails>> GetAllAICAllocatedListenReviewDetails(SearchAICHandHoldingListenReviewDetail search)
        {
            try
            {
                List<AICHandHoldingListenReviewDetails> dataList = new List<AICHandHoldingListenReviewDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@ListenReviewId", search.ListenReviewId);
                    const string procName = "Usp_HandHoldingListenReviewDetails";
                    connection.Open();
                    dataList = connection.Query<AICHandHoldingListenReviewDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingAICHalfYearlyReviewInsertUpdate(AICHandHoldingHalfYearlyReviewFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<AICHandHoldingHalfYearlyReviewDetailFormData>(formData.DetailFormData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@HalfYearlyReviewId", formData.HalfYearlyReviewId);
                    para.Add("@Question1Answer", formData.Question1Answer);
                    para.Add("@Question2Answer", formData.Question2Answer);
                    para.Add("@Question3Answer", formData.Question3Answer);
                    para.Add("@Question4Answer", formData.Question4Answer);
                    para.Add("@Question5Answer", formData.Question5Answer);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@ReviewFormDetails", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@isActive", formData.isActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_HandHolding_HalfYearly_InsertUpdate";
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

        public async Task<HandHoldingHalfYearlyData> GetAllAICAllocatedHalfYearlyReviewDetails(SearchAICHandHoldingHalfYearlyReviewDetail search)
        {
            try
            {
                HandHoldingHalfYearlyData dataList = new HandHoldingHalfYearlyData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HalfYearlyReviewId", search.HalfYearlyReviewId);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_HandHoldingHalfYearlyReviewDetails";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.HalfYearlyData = returnList.Read<AICHandHoldingHalfYearlyReviewDetailData>().FirstOrDefault();
                    dataList.HalfYearlyDetailData = returnList.Read<HandHoldingReviewQuestions>().ToList();
                    dataList.remarksDetailsDatas = returnList.Read<RemarksDetailsData>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingAICConfirmationReviewInsertUpdate(AICHandHoldingConfirmationFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<AICHandHoldingConfirmationReviewDetailFormData>(formData.DetailFormData);
                DataTable dtObject1 = CommonUtility.ToDataTable<AICHandHoldingConfirmationReviewAssignmentFormData>(formData.AssignmentData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@ConfirmationReviewId", formData.ConfirmationReviewId);
                    para.Add("@Question1Answer", formData.Question1Answer);
                    para.Add("@Question2Answer", formData.Question2Answer);
                    para.Add("@Question3Answer", formData.Question3Answer);
                    para.Add("@Question4Answer", formData.Question4Answer);
                    para.Add("@Question5Answer", formData.Question5Answer);
                    para.Add("@Question6Answer", formData.Question6Answer);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@ConfirmStatus", formData.ConfirmStatus);
                    para.Add("@ReviewFormDetails", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@AssignmentDetails", dtObject1, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_HandHolding_Confirmation_InsertUpdate";
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

        public async Task<HandHoldingConfirmationData> GetAllAICAllocatedConfirmationReviewDetails(SearchAICHandHoldingConfirmationReviewDetail search)
        {
            try
            {
                string ContainerReference = "signatureupload";
                HandHoldingConfirmationData dataList = new HandHoldingConfirmationData();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ConfirmationReviewId", search.ConfirmationReviewId);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_HandHoldingConfirmationReviewDetails";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ConfirmationData = returnList.Read<AICHandHoldingHalfConfirmationDetailData>().FirstOrDefault();
                    dataList.ConfirmationDetailData = returnList.Read<HandHoldingReviewQuestions>().ToList();
                    dataList.ConfirmationAssignmentData = returnList.Read<AICHandHoldingConfirmationReviewAssignmentFormData>().ToList();
                    dataList.remarksDetailsDatas = returnList.Read<RemarksDetailsData>().ToList();
                    

                    if (dataList.ConfirmationData.ReviewerSign !=null)
                    {
                        string Document = Path.GetFileName(dataList.ConfirmationData.ReviewerSign);
                        string reviewerSign = DownloadedFile(Document, ContainerReference);
                        dataList.ConfirmationData.ReviewerSign = reviewerSign;
                    }

                    if (dataList.ConfirmationData.HodReviewerSign != null)
                    {
                        string Document1 = Path.GetFileName(dataList.ConfirmationData.HodReviewerSign);
                        string hodreviewerSign = DownloadedFile(Document1, ContainerReference);
                        dataList.ConfirmationData.HodReviewerSign = hodreviewerSign;
                    }

                    if (dataList.ConfirmationData.HrHeadReviewerSign != null)
                    {
                        string Document2 = Path.GetFileName(dataList.ConfirmationData.HrHeadReviewerSign);
                        string hrheadreviewerSign = DownloadedFile(Document2, ContainerReference);
                        dataList.ConfirmationData.HrHeadReviewerSign = hrheadreviewerSign;
                    }

                    if (dataList.ConfirmationData.PlantHeadReviewerSign != null)
                    {
                        string Document3 = Path.GetFileName(dataList.ConfirmationData.PlantHeadReviewerSign);
                        string plantheadreviewerSign = DownloadedFile(Document3, ContainerReference);
                        dataList.ConfirmationData.PlantHeadReviewerSign = plantheadreviewerSign;
                    }


                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingHRFeedbackInsertUpdate(HandHoldingHRFeedbackFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@HRFeedbackId", formData.HRFeedbackId);
                    para.Add("@Question1Answer", formData.Question1Answer);
                    para.Add("@Question1Reason", formData.Question1Reason);
                    para.Add("@Question2Answer", formData.Question2Answer);
                    para.Add("@Question2Reason", formData.Question2Reason);
                    para.Add("@Question3Answer", formData.Question3Answer);
                    para.Add("@Question4Answer", formData.Question4Answer);
                    para.Add("@Question5Answer", formData.Question5Answer);
                    para.Add("@Question6Answer", formData.Question6Answer);
                    para.Add("@Question6Reason", formData.Question6Reason);
                    para.Add("@Question7Answer", formData.Question7Answer);
                    para.Add("@Question7Reason", formData.Question7Reason);
                    para.Add("@Question8Answer", formData.Question8Answer);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_HandHolding_HRFeedback_InsertUpdate";
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

        public async Task<List<HandHoldingHRFeedbackDetails>> GetAllHRFeedbackDetails(SearchHandHoldingHRFeedbackDetail search)
        {
            try
            {
                List<HandHoldingHRFeedbackDetails> dataList = new List<HandHoldingHRFeedbackDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_HandHoldingHRFeedbackDetails";
                    connection.Open();
                    dataList = connection.Query<HandHoldingHRFeedbackDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingHRReviewInsertUpdate(HandHoldingHRReviewFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@HRReviewId", formData.HRReviewId);
                    para.Add("@Question1Answer", formData.Question1Answer);
                    para.Add("@Question2Answer", formData.Question2Answer);
                    para.Add("@Question3Answer", formData.Question3Answer);
                    para.Add("@Question4Answer", formData.Question4Answer);
                    para.Add("@Question5Answer", formData.Question5Answer);
                    para.Add("@Question6Answer", formData.Question6Answer);
                    para.Add("@Question7Answer", formData.Question7Answer);
                    para.Add("@Question8Answer", formData.Question8Answer);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "USP_HandHolding_HRReview_InsertUpdate";
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

        public async Task<List<HandHoldingHRReviewDetails>> GetAllHRReviewDetails(SearchHandHoldingHRReviewDetail search)
        {
            try
            {
                List<HandHoldingHRReviewDetails> dataList = new List<HandHoldingHRReviewDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_HandHoldingHRReviewDetails";
                    connection.Open();
                    dataList = connection.Query<HandHoldingHRReviewDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<ApproverJobShadowCandidateList>> GetAllApproverJobShadowList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<ApproverJobShadowCandidateList> dataList = new List<ApproverJobShadowCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_HandHoldingApproverJobShadowReview_GetAll";
                    connection.Open();
                    dataList = connection.Query<ApproverJobShadowCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<HandholdingApproverCandidateListNew>> GetAllHandholdingApproverPendingList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<HandholdingApproverCandidateListNew> dataList = new List<HandholdingApproverCandidateListNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@roleIds", search.RoleIds);
                    const string procName = "Usp_HandHoldingProcessPendingAndApprovedAll_GetAll";
                    connection.Open();
                    dataList = connection.Query<HandholdingApproverCandidateListNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<HandholdingApproverCandidateListNew>> GetAllHandholdingConfirmationFormList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<HandholdingApproverCandidateListNew> dataList = new List<HandholdingApproverCandidateListNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@roleIds", search.RoleIds);
                    const string procName = "Usp_Handholding_ConfirmationForm_getAll";
                    connection.Open();
                    dataList = connection.Query<HandholdingApproverCandidateListNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<HandholdingApproverCandidateList>> GetAllHandholdingApproverAllocatedList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<HandholdingApproverCandidateList> dataList = new List<HandholdingApproverCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@roleIds", search.RoleIds);
                    const string procName = "Usp_HandHoldingProcessApprovedAll_GetAll";
                    connection.Open();
                    dataList = connection.Query<HandholdingApproverCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ApproverListenCandidateList>> GetAllApproverListenList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<ApproverListenCandidateList> dataList = new List<ApproverListenCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_HandHoldingApproverListenReview_GetAll";
                    connection.Open();
                    dataList = connection.Query<ApproverListenCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ApproverHalfYearlyCandidateList>> GetAllApproverHalfYearlyList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<ApproverHalfYearlyCandidateList> dataList = new List<ApproverHalfYearlyCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_HandHoldingApproverHalfYearlyReview_GetAll";
                    connection.Open();
                    dataList = connection.Query<ApproverHalfYearlyCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ApproverConfirmationCandidateList>> GetAllApproverConfirmationList(SearchHandHoldingApproverList search)
        {
            try
            {
                List<ApproverConfirmationCandidateList> dataList = new List<ApproverConfirmationCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpId", search.EmpId);
                    para.Add("@EmpName", search.EmpName);
                    para.Add("@EmpStatus", search.EmpStatus);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@ProbationId", search.ProbationId);
                    para.Add("@ReviewStatus", search.ReviewStatus);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@RoleIds", search.RoleIds);
                    const string procName = "Usp_HandHoldingApproverConfirmationReview_GetAll";
                    connection.Open();
                    dataList = connection.Query<ApproverConfirmationCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> HandHoldingApproverActionInsertUpdate(HandHoldingApproverActionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FormTypeId", formData.FormTypeId);
                    para.Add("@ReviewId", formData.ReviewId);
                    para.Add("@StatusId", formData.StatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@roleIds", formData.RoleIds);
                    const string procName = "Usp_HandHoldingApproverAction";
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
