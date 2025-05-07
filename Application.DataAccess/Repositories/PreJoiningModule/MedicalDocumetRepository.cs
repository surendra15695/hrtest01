using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.PreJoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreJoiningModule;
using Dapper;
using System;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace Application.DataAccess.Repositories.PreJoiningModule
{
    public class MedicalDocumetRepository : DatabaseContext, IMedicalDocumentRepository
    {
        public MedicalDocumetRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public async Task<MedicalDocumentGet> GetMedicalDocumentCollectionData(SearchMedicalDocumentCollection search)
        {
            try
            {
                MedicalDocumentGet dataList = new MedicalDocumentGet();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@MedicalDocumentCollectionId", search.MedicalDocumentCollectionId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_MedicalDocumentCollection_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.MedicalDocumentCollection = returnList.Read<MedicalDocumentCollection>().FirstOrDefault();
                    dataList.MedicalDocumentRemarks = returnList.Read<MedicalDocumentRemarks>().ToList();

                    String ContainerReference = "medicaldocuments";
                    if (dataList.MedicalDocumentCollection!= null)
                    {

                        if (dataList.MedicalDocumentCollection.Document != null && dataList.MedicalDocumentCollection.Document!="") // && !="" condition added by anif on 26-08-2022
                        {
                            string Document = Path.GetFileName(dataList.MedicalDocumentCollection.Document);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            dataList.MedicalDocumentCollection.Document = CandiadateSignature;
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

        public async Task<ReturnMessage> MedicalDocumentDoctorApprovalUpdate(MedicalDocumentDoctorApproval param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@MedicalDocumentDoctorApprovalId", param.MedicalDocumentDoctorApprovalId);
                    para.Add("@MedicalallyFit", param.MedicalallyFit);
                    para.Add("@MedicalallyFitRemarks", param.MedicalallyFitRemarks);
                    para.Add("@CreatedBy", param.CreatedBy);
                    para.Add("@path", param.PreviousString);
                    const string procName = "Usp_MedicalDocumentDoctorApproval_Update";
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

        //public async Task<ReturnMessage> SaveMedicalDocumentCollection(MedicalDocumentCollectionData formData)
        //{
        //    try
        //    {
        //        ReturnMessage rm = new ReturnMessage();
        //        using (IDbConnection connection = base.GetConnection())
        //        {
        //            var para = new DynamicParameters();
        //            para.Add("@MedicalDocumentCollectionId", formData.MedicalDocumentCollectionId);
        //            para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
        //            para.Add("@CandidateId", formData.CandidateId);
        //            para.Add("@DoumentType", formData.DoumentType);
        //            para.Add("@DoumentParticular", formData.DoumentParticular);
        //            para.Add("@DoumentName", formData.DoumentName);
        //            para.Add("@Document", formData.Document);
        //            para.Add("@Remarks", formData.Remarks);
        //            para.Add("@CreatedBy", formData.CreatedBy);
        //            const string procName = "Usp_MedicalDocumentCollection_InsertUpdate";
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

        public async Task<ReturnMessage> SaveMedicalDocumentCollection(MedicalDocumentCollectionData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@MedicalDocumentCollectionId", formData.MedicalDocumentCollectionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@DoumentType", formData.DoumentType);
                    para.Add("@DoumentParticular", formData.DoumentParticular);
                    para.Add("@DoumentName", formData.DoumentName);
                    para.Add("@Document", formData.Document);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_MedicalDocumentCollection_InsertUpdate";
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
    }
}
