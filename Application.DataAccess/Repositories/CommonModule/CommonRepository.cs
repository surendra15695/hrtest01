using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreJoiningModule;
using Application.Entity.Entities.ReportModule;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;
using Dapper;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Application.DataAccess.Repositories.CommonModule
{
    public class CommonRepository : DatabaseContext, ICommonRepository
    {
        public CommonRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

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
        public async Task<List<Age>> GetAllAge()
        {
            try
            {
                List<Age> returnList = new List<Age>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_Age_GetAll";
                    connection.Open();
                    returnList = connection.Query<Age>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<State>> GetAllState()
        {
            try
            {
                List<State> returnList = new List<State>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_State_GetAll";
                    connection.Open();
                    returnList = connection.Query<State>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Years>> GetAllYears()
        {
            try
            {
                List<Years> returnList = new List<Years>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_Years_GetAll";
                    connection.Open();
                    returnList = connection.Query<Years>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Months>> GetAllMonths()
        {
            try
            {
                List<Months> returnList = new List<Months>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_Months_GetAll";
                    connection.Open();
                    returnList = connection.Query<Months>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Experience>> GetAllExperience()
        {
            try
            {
                List<Experience> returnList = new List<Experience>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_Experience_GetAll";
                    connection.Open();
                    returnList = connection.Query<Experience>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Country>> GetAllCountry(SearchCountry search)
        {
            try
            {
                List<Country> returnList = new List<Country>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CountryId", search.CountryId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Country_GetAll";
                    connection.Open();
                    returnList = connection.Query<Country>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<StateCountry>> GetAllStateCountry(SearchStateCountry search)
        {
            try
            {
                List<StateCountry> returnList = new List<StateCountry>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StateId", search.StateId);
                    para.Add("@CountryId", search.CountryId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_StateCountry_GetAll";
                    connection.Open();
                    returnList = connection.Query<StateCountry>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Religion>> GetAllReligion(SearchReligion search)
        {
            try
            {
                List<Religion> returnList = new List<Religion>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReligionId", search.ReligionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Religion_GetAll";
                    connection.Open();
                    returnList = connection.Query<Religion>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Caste>> GetAllCaste(SearchCaste search)
        {
            try
            {
                List<Caste> returnList = new List<Caste>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CasteId", search.CasteId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Caste_GetAll";
                    connection.Open();
                    returnList = connection.Query<Caste>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ExternalTrainer>> GetAllExternalTrainer(SearchTrainer search)
        {
            try
            {
                List<ExternalTrainer> returnList = new List<ExternalTrainer>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductorId", search.InductorId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_ExternalTrainer_GetAll";
                    connection.Open();
                    returnList = connection.Query<ExternalTrainer>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CountryList>> GetAllCountryList(SearchCountryList search)
        {
            try
            {
                List<CountryList> returnList = new List<CountryList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CountryId", search.CountryId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CountryList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CountryList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RelationshipList>> GetAllRelationship(SearchRelation search)
        {
            try
            {
                List<RelationshipList> returnList = new List<RelationshipList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RelationshipId", search.RelationshipId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Relationship_GetAll";
                    connection.Open();
                    returnList = connection.Query<RelationshipList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RelationshipList>> GetAllFamilyRelationship(SearchRelation search)
        {
            try
            {
                List<RelationshipList> returnList = new List<RelationshipList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RelationshipId", search.RelationshipId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FamilyRelationship_getAll";
                    connection.Open();
                    returnList = connection.Query<RelationshipList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NationalityList>> GetAllNationality(SearchNationality search)
        {
            try
            {
                List<NationalityList> returnList = new List<NationalityList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@NationalityId", search.NationalityId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Nationality_GetAll";
                    connection.Open();
                    returnList = connection.Query<NationalityList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<BloodGroup>> GetAllBloodGroup(SearchBloodGroup search)
        {
            try
            {
                List<BloodGroup> returnList = new List<BloodGroup>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BloodGroupId", search.BloodGroupId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_BloodGroup_GetAll";
                    connection.Open();
                    returnList = connection.Query<BloodGroup>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<QulificationUniversityBoard>> GetAllQulificationUniversityBoard(SearchQulificationUniversityBoard search)
        {
            try
            {
                List<QulificationUniversityBoard> returnList = new List<QulificationUniversityBoard>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QulificationUniversityBoardId", search.QulificationUniversityBoardId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_QulificationUniversityBoard_GetAll";
                    connection.Open();
                    returnList = connection.Query<QulificationUniversityBoard>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<QulificationClassGaradeDivision>> GetAllQulificationClassGaradeDivision(SearchQulificationClassGaradeDivision search)
        {
            try
            {
                List<QulificationClassGaradeDivision> returnList = new List<QulificationClassGaradeDivision>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QulificationClassGaradeDivisionId", search.QulificationClassGaradeDivisionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_QulificationClassGaradeDivision_GetAll";
                    connection.Open();
                    returnList = connection.Query<QulificationClassGaradeDivision>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SalaryAccountHeadPrevious>> GetAllSalaryAccountHeadPrevious(SearchSalaryAccountHeadPrevious search)
        {
            try
            {
                List<SalaryAccountHeadPrevious> returnList = new List<SalaryAccountHeadPrevious>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryAccountHeadPreviousId", search.SalaryAccountHeadPreviousId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SalaryAccountHeadPrevious_GetAll";
                    connection.Open();
                    returnList = connection.Query<SalaryAccountHeadPrevious>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<AttachmentDocumentType>> GetAllAttachmentDocumentType(SearchAttachmentDocumentType search)
        {
            try
            {
                List<AttachmentDocumentType> returnList = new List<AttachmentDocumentType>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentTypeId", search.AttachmentDocumentTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_AttachmentDocumentType_GetAll";
                    connection.Open();
                    returnList = connection.Query<AttachmentDocumentType>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AttachmentDocumentParticular>> GetAllAttachmentDocumentParticular(SearchAttachmentDocumentParticular search)
        {
            try
            {
                List<AttachmentDocumentParticular> returnList = new List<AttachmentDocumentParticular>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentParticularId", search.AttachmentDocumentParticularId);
                    para.Add("@AttachmentDocumentTypeId", search.AttachmentDocumentTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_AttachmentDocumentParticular_GetAll";
                    connection.Open();
                    returnList = connection.Query<AttachmentDocumentParticular>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<AttachmentDocumentNameDetails>> GetAllAttachmentDocumentName(SearchAttachmentDocumentName search)
        {
            try
            {
                List<AttachmentDocumentNameDetails> returnList = new List<AttachmentDocumentNameDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentNameId", search.AttachmentDocumentNameId);
                    para.Add("@AttachmentDocumentParticularId", search.AttachmentDocumentParticularId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_AttachmentDocumentName_GetAll";
                    connection.Open();
                    returnList = connection.Query<AttachmentDocumentNameDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AttachmentDocumentNameDetails>> GetFilteredAttachmentDocumentName(SearchAttachmentDocumentName search)
        {
            try
            {
                List<AttachmentDocumentNameDetails> returnList = new List<AttachmentDocumentNameDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentNameId", search.AttachmentDocumentNameId);
                    para.Add("@AttachmentDocumentParticularId", search.AttachmentDocumentParticularId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FiltredAttachmentDocumentName_GetAll";
                    connection.Open();
                    returnList = connection.Query<AttachmentDocumentNameDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<DownloadPDFList>> GetAllDownloadPDFHandBook(SearchDownloadPDF search)
        {
            try
            {
                List<DownloadPDFList> returnList = new List<DownloadPDFList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PdfDocId", search.PDFDocId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "USP_PdfDocumentForHandBook_getAll";
                    connection.Open();
                    returnList = connection.Query<DownloadPDFList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "pdfmaster";
                    foreach (var List in returnList)
                    {
                        if (List.DocumentPath != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPath);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.DocumentPath = CandiadateSignature;
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
        //arg

        public async Task<List<UploadPDFList>> GetAllAttachmentPDF(SearchPDFUpload search)
        {
            try
            {
                List<UploadPDFList> returnList = new List<UploadPDFList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PdfDocId", search.PDFDocId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "USP_PdfDocument_getAll";
                    connection.Open();
                    returnList = connection.Query<UploadPDFList>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    String ContainerReference = "pdfmaster";
                    foreach (var List in returnList)
                    {
                        if (List.DocumentPath != null)
                        {
                            string Document = Path.GetFileName(List.DocumentPath);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.DocumentPath = CandiadateSignature;
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

        public async Task<List<RoleWiseDocumentOutput>> GetRoleWiseDocument(RoleWiseDocumentInput search)
        {
            try
            {
                List<RoleWiseDocumentOutput> returnList = new List<RoleWiseDocumentOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentNameId", search.AttachmentDocumentNameId);
                    const string procName = "Usp_AttachmentDocumentNameRoleWithName_Get";
                    connection.Open();
                    returnList = connection.Query<RoleWiseDocumentOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ApprovalList>> GetAllApprovalList(SearchApprovalList search)
        {
            try
            {
                List<ApprovalList> returnList = new List<ApprovalList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ApprovalListId", search.ApprovalListId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_ApprovalList_GetAll";
                    connection.Open();
                    returnList = connection.Query<ApprovalList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FatherOccupation>> GetAllFatherOccupationList(SearchFatherOccupation search)
        {
            try
            {
                List<FatherOccupation> returnList = new List<FatherOccupation>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OccupationId", search.OccupationId);
                    const string procName = "Usp_OccupationforFatherGetAll";
                    connection.Open();
                    returnList = connection.Query<FatherOccupation>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Occupation>> GetAllOccupationList(SearchOccupation search)
        {
            try
            {
                List<Occupation> returnList = new List<Occupation>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OccupationId", search.OccupationId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Occcupation_GetAll";
                    connection.Open();
                    returnList = connection.Query<Occupation>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Doctors>> GetAllDoctorsList(SearchDoctors search)
        {
            try
            {
                List<Doctors> returnList = new List<Doctors>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DoctorsId", search.DoctorsId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Doctors_GetAll";
                    connection.Open();
                    returnList = connection.Query<Doctors>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Batch>> GetAllBatch(BatchParam search)
        {
            try
            {
                List<Batch> returnList = new List<Batch>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", search.BatchId);
                    para.Add("@Vertical", search.Vertical);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Batch_GetAll";
                    connection.Open();
                    returnList = connection.Query<Batch>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> OccupationInsertUpdate(Occupation formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@OccupationId", formData.OccupationId);
                    para.Add("@OccupationName", formData.OccupationName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Occcupation_InsertUpdate";
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

        public async Task<ReturnMessage> QulificationUniversityBoardInsertUpdate(QulificationUniversityBoard formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QulificationUniversityBoardId", formData.QulificationUniversityBoardId);
                    para.Add("@QulificationUniversityBoardName", formData.QulificationUniversityBoardName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_QulificationUniversityBoard_InsertUpdate";
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

        public async Task<ReturnMessage> ReligionInsertUpdate(Religion formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReligionId", formData.ReligionId);
                    para.Add("@ReligionName", formData.ReligionName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Religion_InsertUpdate";
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
        public async Task<ReturnMessage> CasteInsertUpdate(Caste formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CasteId", formData.CasteId);
                    para.Add("@CasteName", formData.CasteName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Caste_InsertUpdate";
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

        public async Task<ReturnMessage> ExternalTrainersInsertUpdate(ExternalTrainer formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductorId", formData.InductorId);
                    para.Add("@InductorName", formData.InductorName);
                    para.Add("@InductorEmail", formData.InductorEmail);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_ExternalTrainer_InsertUpdate";
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

        public async Task<ReturnMessage> CountryListInsertUpdate(CountryList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CountryId", formData.CountryId);
                    para.Add("@CountryName", formData.CountryName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Country_InsertUpdate";
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

        public async Task<ReturnMessage> RelationshipInsertUpdate(RelationshipList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RelationshipId", formData.RelationshipId);
                    para.Add("@RelationshipName", formData.RelationshipName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Relationship_InsertUpdate";
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

        public async Task<ReturnMessage> FamilyRelationshipInsertUpdate(RelationshipList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RelationshipId", formData.RelationshipId);
                    para.Add("@RelationshipName", formData.RelationshipName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_FamilyRelationship_InsertUpdate";
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
        public async Task<ReturnMessage> NatioanalityInsertUpdate(NationalityList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@NationalityId", formData.NationalityId);
                    para.Add("@NationalityName", formData.NationalityName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Nationality_InsertUpdate";
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

        public async Task<ReturnMessage> InsertUpdateInductionMode(ModeOfInductionParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionModeId", Param.InductionModeId);
                    para.Add("@InductionModeName", Param.InductionModeName);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_InductionMode_InsertUpdate";
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
        public async Task<ReturnMessage> AttachmentDocumentTypeInsertUpdate(AttachmentDocumentType formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentTypeId", formData.AttachmentDocumentTypeId);
                    para.Add("@AttachmentDocumentTypeName", formData.AttachmentDocumentTypeName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_AttachmentDocumentType_InsertUpdate";
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

        public async Task<List<ModeOfInduction>> GetAllInductionMode(AllModeOfInductionParam Param)
        {
            try
            {
                List<ModeOfInduction> returnList = new List<ModeOfInduction>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionModeId", Param.InductionModeId);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_InductionMode_GetAll";
                    connection.Open();
                    returnList = connection.Query<ModeOfInduction>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> AttachmentDocumentParticularInsertUpdate(AttachmentDocumentParticular formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AttachmentDocumentParticularId", formData.AttachmentDocumentParticularId);
                    para.Add("@AttachmentDocumentTypeId", formData.AttachmentDocumentTypeId);
                    para.Add("@AttachmentDocumentParticularName", formData.AttachmentDocumentParticularName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_AttachmentDocumentParticular_InsertUpdate";
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

        public async Task<ReturnMessage> InsertUpdateInductionVenue(InductionVenueParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionVenueId", Param.InductionVenueId);
                    para.Add("@InductionVenueName", Param.InductionVenueName);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_InductionVenue_InsertUpdate";
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
        public async Task<ReturnMessage> AttachmentDocumentNameInsertUpdate(AttachmentDocumentNameDetails formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@AttachmentDocumentNameId", formData.AttachmentDocumentNameId);
                    para.Add("@AttachmentDocumentParticularId", formData.AttachmentDocumentParticularId);
                    para.Add("@AttachmentDocumentName", formData.AttachmentDocumentName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_AttachmentDocumentName_InsertUpdate";
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
        public async Task<ReturnMessage> AttachmentPDFInsertUpdate(UploadPDFList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@PdfDocId", formData.PDFDocId);
                    para.Add("@DocumentTypeId", formData.AttachmentDocumentTypeId);
                    para.Add("@DocumentParticularId", formData.AttachmentDocumentParticularId);
                    para.Add("@DocumentNameId", formData.AttachmentDocumentNameId);
                    para.Add("@FileName", formData.FileName);
                    para.Add("@DocumentPath", formData.DocumentPath);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_PdfDocument_InsertUpdate";
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
        public async Task<List<AllInductionVenue>> GetAllInductionVenue(AllInductionVenueParam Param)
        {
            try
            {
                List<AllInductionVenue> returnList = new List<AllInductionVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionVenueId", Param.InductionVenueId);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_InductionVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllInductionVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<OnBoardingManager>> GetAllOnBoardingManager(SearchOnBoardingManager search)
        {
            try
            {
                List<OnBoardingManager> returnList = new List<OnBoardingManager>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_OnBoardingManager_GetAll";
                    connection.Open();
                    returnList = connection.Query<OnBoardingManager>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<OnBoardingCoOrdinator>> GetAllOnBoardingCoOrdinator(SearchOnBoardingCoOrdinator search)
        {
            try
            {
                List<OnBoardingCoOrdinator> returnList = new List<OnBoardingCoOrdinator>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    const string procName = "Usp_OnBoardingCoOrdinator_GetAll";
                    connection.Open();
                    returnList = connection.Query<OnBoardingCoOrdinator>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> DoctorInsertUpdate(DoctorsInsertUpdateParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@DoctorsId", Param.DoctorsId);
                    para.Add("@DoctorsName", Param.DoctorsName);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);

                    const string procName = "Usp_Doctors_InsertUpdate";
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

        public async Task<List<MenuAccess>> GetAllMenuAccess(SearchMenuAccess search)
        {
            try
            {
                List<MenuAccess> returnList = new List<MenuAccess>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", search.RoleId);
                    para.Add("@IsCheck", search.IsCheck);
                    const string procName = "Usp_MenuAccess_GetAll";
                    connection.Open();
                    returnList = connection.Query<MenuAccess>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> MenuAccessInsert(InsertMenuaccesParam formdata)
        {
            try
            {
                DataTable dtMenuacces = CommonUtility.ToDataTable<MenuAccessInsert>(formdata.MenuAccessInsert);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@MenuAccessRole", dtMenuacces, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formdata.CreatedBy);


                    const string procName = "Usp_MenuAccess_Insert";
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

        public async Task<List<UserRole>> GetAllUserRole(SearchUserRole search)
        {
            try
            {
                List<UserRole> returnList = new List<UserRole>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_UserRole_GetAll";
                    connection.Open();
                    returnList = connection.Query<UserRole>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<UserRoleForHandHold>> GetUserRoleHandHolding(SearchUserRole search)
        {
            try
            {
                List<UserRoleForHandHold> returnList = new List<UserRoleForHandHold>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_UserRoleHandHolding";
                    connection.Open();
                    returnList = connection.Query<UserRoleForHandHold>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<UserwiseRole>> GetAllUserWiseRole(SearchUserRole search)
        {
            try
            {
                List<UserwiseRole> returnList = new List<UserwiseRole>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId == 0 ? null : search.FunctionId);
                    const string procName = "Usp_UserWiseRole_GetAll";
                    connection.Open();
                    returnList = connection.Query<UserwiseRole>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<UserwiseRole>> GetAllUserWiseRoleWithAutoUserId(SearchUserRole search)
        {
            try
            {
                List<UserwiseRole> returnList = new List<UserwiseRole>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId == 0 ? null : search.FunctionId);
                    const string procName = "Usp_UserWiseRoleWithAutoUserId_GetAll";
                    connection.Open();
                    returnList = connection.Query<UserwiseRole>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UserRoleInsert(UserRoleSave formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@AutoUserId", formdata.AutoUserId);
                    para.Add("@RoleId", formdata.RoleId);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_UserRole_Insert";
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

        public async Task<List<RoleWiseUser>> GetAllRolewiseUser(SearchRoleWiseUser search)
        {
            try
            {
                List<RoleWiseUser> returnList = new List<RoleWiseUser>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", search.RoleId);
                    const string procName = "Usp_RoleWiseUser_GetAll";
                    connection.Open();
                    returnList = connection.Query<RoleWiseUser>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<EmployeeDetails>> GetAllEmployeeForSign(SearchEmployee search)
        {
            try
            {
                List<EmployeeDetails> returnList = new List<EmployeeDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmployeeId", search.EmployeeNo);
                    para.Add("@autouserId", search.AutoUserId);
                    para.Add("@RoleIds", search.RoleIds);
                    const string procName = "Usp_EmployeeDetailsForSignature_get";
                    connection.Open();
                    returnList = connection.Query<EmployeeDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<ReturnMessage> InsertUpdateSignature(InsertUpdateSignatureData formData)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@signatureId", formData.SignatureId);
                    para.Add("@EmployeeId", formData.EmployeeId);
                    para.Add("@EmployeeNo", formData.EmployeeNo);
                    para.Add("@EmployeeName", formData.EmployeeName);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@FileName", formData.Filename);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_EmployeeSignature_InsUp";
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

        public async Task<List<InsertUpdateSignatureData>> GetEmployeeSignature(SearchEmployeeForSign formData)
        {
            try
            {
                String ContainerReference = "signatureupload";
                List<InsertUpdateSignatureData> returnList = new List<InsertUpdateSignatureData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmployeeId", formData.EmployeeId);
                    para.Add("@autouserId", formData.AutoUserId);
                    para.Add("@RoleIds", formData.RoleIds);
                    const string procName = "Usp_EmployeeSignature_getAll";
                    connection.Open();
                    returnList = connection.Query<InsertUpdateSignatureData>(procName, para, commandType: CommandType.StoredProcedure).ToList();

                    foreach (var List in returnList)
                    {
                        if (List.Filename != null)
                        {
                            string Document = Path.GetFileName(List.Filename);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Filename = CandiadateSignature;
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
        public async Task<List<RoleWiseUser>> GetAllRolewiseUserForHandHold(SearchRoleWiseUser search)
        {
            try
            {
                List<RoleWiseUser> returnList = new List<RoleWiseUser>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", search.RoleId);
                    const string procName = "Usp_RoleWiseUser_GetAllForHandHoldingLocWise";
                    connection.Open();
                    returnList = connection.Query<RoleWiseUser>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RoleLocationWiseUser>> GetAllRoleLocationwiseUser(searchRoleLocationWiseUser search)
        {
            try
            {
                List<RoleLocationWiseUser> returnList = new List<RoleLocationWiseUser>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", search.RoleId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_RoleAndLocationWiseUser_GetAll";
                    connection.Open();
                    returnList = connection.Query<RoleLocationWiseUser>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<GetTicByLocationData>> GetAllTicByLocation(SearchTicByLocation search)
        {
            try
            {
                List<GetTicByLocationData> returnList = new List<GetTicByLocationData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", search.locationId);
                    const string procName = "Usp_LocationWiseTrainingIncharge_GetForScheduleInduction";
                    connection.Open();
                    returnList = connection.Query<GetTicByLocationData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RoleWiseUser>> GetAllRolewiseUserReassign(SearchRoleWiseUser search)
        {
            try
            {
                List<RoleWiseUser> returnList = new List<RoleWiseUser>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", search.RoleId);
                    const string procName = "USP_reassignCandidate_GetAll";
                    connection.Open();
                    returnList = connection.Query<RoleWiseUser>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Status>> GetAllHiringStatus()
        {
            try
            {
                List<Status> returnList = new List<Status>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_HiringStatus_GetAll";
                    connection.Open();
                    returnList = connection.Query<Status>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InductionTemplateInsertUpdate(InductionTemplate formData)
        {
            try
            {
                DataTable inductionTemplatedetails = CommonUtility.ToDataTable<InductionTemplateDetails>(formData.InductionTemplateDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionTemplateId", formData.InductionTemplateId);
                    para.Add("@InductionTemplateName", formData.InductionTemplateName);
                    para.Add("@VerticalId", formData.VerticalID);
                    para.Add("@IsBatch", formData.IsBatch);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@InductionTemplateDtl", inductionTemplatedetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_InductionTemplate_InsertUpdate";
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

        public async Task<ReturnMessage> TrainingTittleInsertUpdate(TrainingTittleFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TrainingTittleId", formData.TrainingTittleId);
                    para.Add("@TrainingTittleName", formData.TrainingTittleName);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_TrainingTittle_InsertUpdate";
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
        public async Task<List<TrainingTittleDataList>> GetAllTrainingTittle(SearchTrainingtittle Param)
        {
            try
            {
                List<TrainingTittleDataList> returnList = new List<TrainingTittleDataList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TrainingTittleId", Param.TrainingTittleId);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_TrainingTittle_GetAll";
                    connection.Open();
                    returnList = connection.Query<TrainingTittleDataList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InductionTemplateHdrGet>> GetAllInductionTemplate(SearchInductionTemplate Param)
        {
            try
            {
                List<InductionTemplateHdrGet> returnList = new List<InductionTemplateHdrGet>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionTemplateId", Param.InductionTemplateId);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_InductionTemplate_GetAll";
                    connection.Open();
                    returnList = connection.Query<InductionTemplateHdrGet>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InductionTemplateDetail>> GetAllInductionTemplateDetails(SearchInductionTemplate Param)
        {
            try
            {
                List<InductionTemplateDetail> returnList = new List<InductionTemplateDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionTemplateId", Param.InductionTemplateId);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_InductionTemplateDetails_GetAll";
                    connection.Open();
                    returnList = connection.Query<InductionTemplateDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<UploadEmployeeMaster> UploadEmployeeMaster(DataTable dtObject)
        {
            //AppConfiguration ac = new AppConfiguration();
            //IDbConnection Connection = new SqlConnection(ac.sqlConnectionString);
            try
            {
                UploadEmployeeMaster rm = new UploadEmployeeMaster();
                DataTable dt = new DataTable();
                dt.Clear();
                dt.Columns.Add("EmployeeNo");
                dt.Columns.Add("EmployeeName");
                dt.Columns.Add("OrganizationalUnit");
                dt.Columns.Add("Position");
                dt.Columns.Add("EmployeeGroup");
                dt.Columns.Add("EmployeeSubGroup");
                dt.Columns.Add("PersonnelSubArea");
                dt.Columns.Add("CostCenterText");
                dt.Columns.Add("CostCenter");
                dt.Columns.Add("DOB");
                dt.Columns.Add("DOJ");
                dt.Columns.Add("DOR");
                dt.Columns.Add("EmailId");
                dt.Columns.Add("AdharNo");

                foreach (DataRow value in dtObject.Rows)
                {
                    dt.Rows.Add(value.ItemArray);
                }


                //using(var dbconnection = Connection)
                //{
                //    dbconnection.Open();
                //    var queyparam = new DynamicParameters();
                //    queyparam.Add("@EmployeeData", dt.AsTableValuedParameter("UDT_CsvEmployeeMaster"));
                //    var returnList = await dbconnection.QueryMultipleAsync("Usp_CsvUploadEmployeeMaster", queyparam, commandType: CommandType.StoredProcedure, commandTimeout: 2000);
                //    rm.ReturnMessage = returnList.Read<ReturnMessage>().ToList();
                //    rm.employeeDatas = returnList.Read<EmployeeData>().ToList();
                //    return await Task.FromResult(rm);
                //}

                // DataTable dtObjects = CommonUtility.ToDataTable<List<EmployeeData>>(dtObject);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmployeeData", dt, DbType.Object, ParameterDirection.Input, null);
                    //const string procName = "Usp_UploadEmployeeMaster";
                    const string procName = "Usp_CsvUploadEmployeeMaster";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure, commandTimeout: 3000);

                    //rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    rm.ReturnMessage = returnList.Read<ReturnMessage>().ToList();
                    rm.employeeDatas = returnList.Read<EmployeeData>().ToList();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<List<MenuAccess>> GetAllUserMenuAccess(SearchMenuAccess search)
        {
            try
            {
                List<MenuAccess> returnList = new List<MenuAccess>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", search.RoleId);
                    const string procName = "Usp_MenuWiseAccess_GetAll";
                    connection.Open();
                    returnList = connection.Query<MenuAccess>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<State>> StateGetAll(SearchState search)
        {
            try
            {
                List<State> returnList = new List<State>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StateId", search.StateId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_StateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<State>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<State>> StateGetAllByCountry(SearchStateByCountry search)
        {
            try
            {
                List<State> returnList = new List<State>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CountryId", search.CountryId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_StateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<State>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CountryStateLocationMappingGet>> CountryStateLocationGet(CountryStateLocationMappingGetFormData search)
        {
            try
            {
                List<CountryStateLocationMappingGet> returnList = new List<CountryStateLocationMappingGet>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@CountryId", search.CountryId);
                    para.Add("@StateId", search.StateId);
                    para.Add("@LocationId", search.LocationId);
                    const string procName = "Usp_M_CountryStateLocationMap_Get";
                    connection.Open();
                    returnList = connection.Query<CountryStateLocationMappingGet>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CountryStateLocationInsertUpdate(CountryStateLocationMapping formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@MapId", formdata.MapId);
                    para.Add("@CountryId", formdata.CountryId);
                    para.Add("@StateId", formdata.StateId);
                    para.Add("@LocationId", formdata.LocationId);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_M_CountryStateLocationMap_InsertUpdate";
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

        public async Task<ReturnMessage> StateInsertUpdate(StateFormData formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@StateId", formdata.StateId);
                    para.Add("@StateName", formdata.StateName);
                    para.Add("@CountryId", formdata.CountryId);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_State_InsertUpdate";
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
        public async Task<List<HiringStatus>> GetHiringStatus(SearchHiringStatus search)
        {
            try
            {
                List<HiringStatus> returnList = new List<HiringStatus>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    const string procName = "Usp_GetAll_Hiring_Status";
                    connection.Open();
                    returnList = connection.Query<HiringStatus>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<getArea>> GetAllArea(searcharea search)
        {
            try
            {
                List<getArea> returnList = new List<getArea>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_LocationWise_Area_GetAll";
                    connection.Open();
                    returnList = connection.Query<getArea>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertUpdateRolewiseUsrVerFunc(InsertupdateRoleWiseUsrVertData Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                DataTable dtUserWiseRoleVerticalFunctionDetails;
                if (Param.UserWiseRoleVerticalFunctionDetails == null)
                {
                    dtUserWiseRoleVerticalFunctionDetails = null;
                    using (IDbConnection connection = base.GetConnection())
                    {
                        var para = new DynamicParameters();
                        para.Add("@RoleMapId", Param.RoleMapId);
                        para.Add("@RoleId", Param.RoleId);
                        para.Add("@IsActive", Param.IsActive);
                        para.Add("@CreatedBy", Param.CreatedBy);
                        para.Add("@VerticalId", Param.VerticalId);
                        para.Add("@AutoUserId", Param.AutoUserId);
                        const string procName = "USP_RoleWiseUserVerticalFunctionalMapHeaderInsUp";
                        connection.Open();
                        rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        return await Task.FromResult(rm);
                    }
                }
                else
                {
                    dtUserWiseRoleVerticalFunctionDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleVerticalFunctionDetails>(Param.UserWiseRoleVerticalFunctionDetails);
                    using (IDbConnection connection = base.GetConnection())
                    {
                        var para = new DynamicParameters();
                        para.Add("@RoleMapId", Param.RoleMapId);
                        para.Add("@RoleId", Param.RoleId);
                        para.Add("@IsActive", Param.IsActive);
                        para.Add("@CreatedBy", Param.CreatedBy);
                        para.Add("@VerticalId", Param.VerticalId);
                        para.Add("@AutoUserId", Param.AutoUserId);
                        para.Add("@RoleVerticalFunction", dtUserWiseRoleVerticalFunctionDetails, DbType.Object, ParameterDirection.Input, null);
                        const string procName = "USP_RoleWiseUserVerticalFunctionalMapHeaderInsUp";
                        connection.Open();
                        rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        return await Task.FromResult(rm);
                    }


                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> InsertupdateRoleWiseUsrLoctFunc(InsertupdateRoleWiseUsrLocData Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                DataTable dtUserWiseRoleLocationFunctionDetails;
                //DataTable dtUserWiseRoleLocationAreaDetails;
                //if ((Param.UserWiseRoleLocationFunctionDetails.Count == 0)&&(Param.UserWiseRoleLocationAreaDetails.Count != 0))
                //{
                //    dtUserWiseRoleLocationFunctionDetails = null;
                //    dtUserWiseRoleLocationAreaDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleLocationAreaDetails>(Param.UserWiseRoleLocationAreaDetails);
                //    using (IDbConnection connection = base.GetConnection())
                //    {
                //        var para = new DynamicParameters();
                //        para.Add("@RoleMapId", Param.RoleMapId);
                //        para.Add("@RoleId", Param.RoleId);
                //        para.Add("@IsActive", Param.IsActive);
                //        para.Add("@CreatedBy", Param.CreatedBy);
                //        para.Add("@LocationIds", Param.LocationId);
                //        para.Add("@VerticalIds", Param.VerticalId);
                //        para.Add("@AutoUserIds", Param.AutoUserId);
                //        para.Add("@RoleLocationArea", dtUserWiseRoleLocationAreaDetails, DbType.Object, ParameterDirection.Input, null);
                //        const string procName = "USP_RoleWiseUserLocationFunctionMapHeaderInsUp";
                //        connection.Open();
                //        rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                //        return await Task.FromResult(rm);
                //    }
                //}
                //else if ((Param.UserWiseRoleLocationFunctionDetails.Count != 0) && (Param.UserWiseRoleLocationAreaDetails.Count == 0))
                //{
                //dtUserWiseRoleLocationAreaDetails = null;
                dtUserWiseRoleLocationFunctionDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleLocationFunctionDetails>(Param.UserWiseRoleLocationFunctionDetails);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleMapId", Param.RoleMapId);
                    para.Add("@RoleId", Param.RoleId);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    para.Add("@LocationIds", Param.LocationId);
                    para.Add("@VerticalIds", Param.VerticalId);
                    para.Add("@AutoUserIds", Param.AutoUserId);
                    para.Add("@area", Param.Area);
                    para.Add("@RoleLocationFunction", dtUserWiseRoleLocationFunctionDetails, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "USP_RoleWiseUserLocationFunctionMapHeaderInsUp";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
                //}
                //else if ((Param.UserWiseRoleLocationFunctionDetails.Count == 0) && (Param.UserWiseRoleLocationAreaDetails.Count == 0))
                //{
                //    dtUserWiseRoleLocationFunctionDetails = null;
                //    dtUserWiseRoleLocationAreaDetails = null;
                //    using (IDbConnection connection = base.GetConnection())
                //    {
                //        var para = new DynamicParameters();
                //        para.Add("@RoleMapId", Param.RoleMapId);
                //        para.Add("@RoleId", Param.RoleId);
                //        para.Add("@IsActive", Param.IsActive);
                //        para.Add("@CreatedBy", Param.CreatedBy);
                //        para.Add("@LocationIds", Param.LocationId);
                //        para.Add("@VerticalIds", Param.VerticalId);
                //        para.Add("@AutoUserIds", Param.AutoUserId);
                //        const string procName = "USP_RoleWiseUserLocationFunctionMapHeaderInsUp";
                //        connection.Open();
                //        rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                //        return await Task.FromResult(rm);
                //    }
                //}
                //else
                //{
                //    dtUserWiseRoleLocationFunctionDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleLocationFunctionDetails>(Param.UserWiseRoleLocationFunctionDetails);
                //    dtUserWiseRoleLocationAreaDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleLocationAreaDetails>(Param.UserWiseRoleLocationAreaDetails);
                //    using (IDbConnection connection = base.GetConnection())
                //    {
                //        var para = new DynamicParameters();
                //        para.Add("@RoleMapId", Param.RoleMapId);
                //        para.Add("@RoleId", Param.RoleId);
                //        para.Add("@IsActive", Param.IsActive);
                //        para.Add("@CreatedBy", Param.CreatedBy);
                //        para.Add("@LocationIds", Param.LocationId);
                //        para.Add("@VerticalIds", Param.VerticalId);
                //        para.Add("@AutoUserIds", Param.AutoUserId);
                //        para.Add("@RoleLocationFunction", dtUserWiseRoleLocationFunctionDetails, DbType.Object, ParameterDirection.Input, null);
                //        para.Add("@RoleLocationArea", dtUserWiseRoleLocationAreaDetails, DbType.Object, ParameterDirection.Input, null);
                //        const string procName = "USP_RoleWiseUserLocationFunctionMapHeaderInsUp";
                //        connection.Open();
                //        rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                //        return await Task.FromResult(rm);
                //    }


                //}

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<ClaimStatus>> GetAllClaimStatus(SearchClaimStatus search)
        {
            try
            {
                List<ClaimStatus> returnList = new List<ClaimStatus>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ClaimStatusId", search.ClaimStatusId);
                    para.Add("@ClaimStatusName", search.ClaimStatusName);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "[Usp_ClaimStatus_GetAll]";
                    connection.Open();
                    returnList = connection.Query<ClaimStatus>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<GetAllUserWiseRoleVerticalFunctionDetails>> GetAllRolewiseUsrVerFunc(SearchAllUserWiseRoleVerticalFunc Param)
        {
            try
            {
                List<GetAllUserWiseRoleVerticalFunctionDetails> returnList = new List<GetAllUserWiseRoleVerticalFunctionDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "USP_RoleWiseUserVerticalFunctionalMapHeaderGet";
                    connection.Open();
                    returnList = connection.Query<GetAllUserWiseRoleVerticalFunctionDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<GetAllUserWiseRoleLocationFunctionDetails>> GetRoleWiseUsrLocaFunc(SearchAllUserWiseRoleLocationFunc Param)
        {
            try
            {
                List<GetAllUserWiseRoleLocationFunctionDetails> returnList = new List<GetAllUserWiseRoleLocationFunctionDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "USP_RoleWiseUserLocationFunctionMapHeaderGet";
                    connection.Open();
                    returnList = connection.Query<GetAllUserWiseRoleLocationFunctionDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UpdateDocumentRole(UpdateDocumentrole formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@AttachmentDocumentNameId", formData.AttachmentDocumentNameId);
                    para.Add("@AttachmentDocumentParticularId", formData.AttachmentDocumentParticularId);
                    para.Add("@RoleIds", formData.RoleIds);
                    const string procName = "Usp_AttachmentDocumentNameRole_Update";
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

        public async Task<List<GetLocationFunction>> GetFunctionWiseLocation(GetLocationFunctionSearch Param)
        {
            try
            {
                List<GetLocationFunction> returnList = new List<GetLocationFunction>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@functionIds", Param.FunctionIds);
                    const string procName = "Usp_FunctionWise_Location";
                    connection.Open();
                    returnList = connection.Query<GetLocationFunction>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertUpdateCostCenter(CostCenterData formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CostCenterMapId", formdata.CostCenterMapId);
                    para.Add("@SubAreaId", formdata.SubAreaId);
                    para.Add("@CostCenterId", formdata.CostcenterId);
                    para.Add("@CostCenterName", formdata.CostcenterText);
                    para.Add("@VerticalIds", formdata.verticalId);
                    para.Add("@FunctionIds", formdata.FunctionId);
                    para.Add("@LocationIds", formdata.LocationId);
                    para.Add("@StateIds", formdata.StateId);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_CostCenterMapping_InsUp";
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

        public async Task<List<GetCostCenterData>> GetCostCenterGridData(SearchCostCenterData search)
        {
            try
            {
                List<GetCostCenterData> returnList = new List<GetCostCenterData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CostCenterMapId", search.CostCenterMapId);
                    const string procName = "Usp_CostCenterMappingTbl_Get";
                    connection.Open();
                    returnList = connection.Query<GetCostCenterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<BatchWiseCandidateList>> GetBatchWiseCandidateList(SearchBatchWiseCandidate Param)
        {
            try
            {
                List<BatchWiseCandidateList> returnList = new List<BatchWiseCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", Param.BatchId);
                    const string procName = "Usp_BatchWiseCandidate_GetAll";
                    connection.Open();
                    returnList = connection.Query<BatchWiseCandidateList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<DashBoard> GetdashboardValuesOfRm(SearchDashBoard Param)
        {
            try
            {
                DashBoard returnList = new DashBoard();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutouserId", Param.AutoUserId);
                    const string procName = "Usp_GetRMDashBoardValueByAutoUserId";
                    connection.Open();
                    returnList = connection.Query<DashBoard>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FlexiReportHeader>> GetAllFlexiReportHeader(SearchFlexiReportList search)
        {
            try
            {
                List<FlexiReportHeader> returnList = new List<FlexiReportHeader>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportHeaderId", search.HeaderId);
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@headerType", search.HeaderType);
                    const string procName = "Usp_FlexiReportHeader_GetAll";
                    connection.Open();
                    returnList = connection.Query<FlexiReportHeader>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> FlexiReportHeaderInsertUpdate(FlexiReport formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportHeaderId", formData.ReportHeaderId);
                    para.Add("@ReportHeaderName", formData.ReportHeaderName);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_FlexiReportHeader_InsertUpdate";
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

        public async Task<ReturnMessage> GetAllEmployeeData()
        {
            try
            {
                List<EmployeeDataDetails> returnList = new List<EmployeeDataDetails>();
                ReturnMessage returnVals1 = new ReturnMessage();
                ReturnMessage returnVals2 = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_AllEmployeeMasterData_get";
                    connection.Open();
                    returnList = connection.Query<EmployeeDataDetails>(procName, para, commandType: CommandType.StoredProcedure, commandTimeout: 5000).ToList();
                    if (returnList.Count > 0)
                    {
                        //COSMOS
                        var connectionCosmos = new SqlConnection("Data Source = mrfdigitalcorporateserver.database.windows.net; Initial Catalog = cosmosdb; User ID = mrfdigicorpadmin; Password = !Espl@2024@mrF");
                        connectionCosmos.Open();
                        DataTable dtUserWiseRoleLocationFunctionDetails = CommonUtility.ToDataTable<EmployeeDataDetails>(returnList);
                        const string procName2 = "Usp_Employee_Landing_Table_Data";
                        var param1 = new DynamicParameters();
                        param1.Add("@tableData", dtUserWiseRoleLocationFunctionDetails, DbType.Object, ParameterDirection.Input, null);
                        returnVals1 = connectionCosmos.Query<ReturnMessage>(procName2, param1, commandType: CommandType.StoredProcedure, commandTimeout: int.MaxValue).FirstOrDefault();
                        connectionCosmos.Dispose();

                        ////IOM 
                        var connectionIom = new SqlConnection("Data Source = mrfdigitalcorporateserver.database.windows.net; Initial Catalog = digitaliom; User ID = mrfdigicorpadmin; Password = !Espl@2024@mrF");
                        connectionIom.Open();
                        const string procName3 = "Usp_Employee_Landing_Table_Data";
                        DataTable value = CommonUtility.ToDataTable<EmployeeDataDetails>(returnList);
                        var param2 = new DynamicParameters();
                        param2.Add("@tableData", dtUserWiseRoleLocationFunctionDetails, DbType.Object, ParameterDirection.Input, null);
                        returnVals2 = connectionIom.Query<ReturnMessage>(procName3, param2, commandType: CommandType.StoredProcedure, commandTimeout: int.MaxValue).FirstOrDefault();



                        //if (returnVals.SuccessFlag == 2)
                        //{
                        //    const string procName3 = "SP_PROC_NEWEMPLOYEEINSERT";
                        //    connectionCosmos.Query(procName3, commandType: CommandType.StoredProcedure, commandTimeout: int.MaxValue).FirstOrDefault();
                        //}
                        //else
                        //{
                        //    throw new Exception();
                        //}
                        
                        connectionIom.Dispose();
                    }

                    return await Task.FromResult(returnVals1);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Ankita
        public async Task<List<CandidateOnboardingEmailStatusOutputNew>> CandidateOnboardingEmailStatus(CandidateOnboardingEmailStatusInput formData)
        {
            try
            {
                List<CandidateOnboardingEmailStatusOutputNew> dataList = new List<CandidateOnboardingEmailStatusOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_CandidateOnboardingEmail_Status";
                    connection.Open();
                    dataList = connection.Query<CandidateOnboardingEmailStatusOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<GetAllEmailTypeToSendMail>> GetAllEmailTypeToSendMail()
        {
            try
            {
                List<GetAllEmailTypeToSendMail> dataList = new List<GetAllEmailTypeToSendMail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    const string procName = "Usp_GetAllEmailTypeToSendMail";
                    connection.Open();
                    dataList = connection.Query<GetAllEmailTypeToSendMail>(procName, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AllEmailAndDetails>> GetAllEmailsByTypeID(GetEmailList getEmailList)
        {
            try
            {
                List<AllEmailAndDetails> dataList = new List<AllEmailAndDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmailTypeId", getEmailList.EmailTypeId);
                    para.Add("@CreatedBy", getEmailList.CreatedBy);
                    para.Add("@IsPending", getEmailList.IsPending);
                    const string procName = "Usp_GetAllEmailsByTypeID";
                    connection.Open();
                    dataList = connection.Query<AllEmailAndDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async void SendMailForSelectedItems(List<AllEmailAndDetails> allEmails)
        {
            try
            {

                for (int i = 0; i < allEmails.Count; i++)
                {
                    bool flag = true;
                    string mailIssue = "";
                    try
                    {
                        CommonUtility.sendEmailViaWebApi(allEmails[i].ToEmailId, allEmails[i].EmailSubject, allEmails[i].EmailBody);
                        flag = true;
                    }
                    catch (Exception ex)
                    {
                        mailIssue = ex.Message;
                        flag = false;
                    }
                    finally
                    {
                        var para = new DynamicParameters();
                        para.Add("@AutoId", allEmails[i].AutoId);
                        para.Add("@IsScccess", flag);
                        para.Add("@MailIssue", mailIssue);
                        const string procName = "Usp_UpdateMailSendStatus";
                        IDbConnection connection = base.GetConnection();
                        connection.Open();
                        var value = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        connection.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async void SendMailForUpdatedSchedule(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                using (IDbConnection connection = GetConnection())
                {

                    for (int i = 0; i < allEmails.Count; i++)
                    {
                        string EmailBody = "";
                        bool flag = true;
                        string mailIssue = "";
                        try
                        {
                            List<CandidateWiseScheduleDetails> scheduleDetails = new List<CandidateWiseScheduleDetails>();
                            List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();

                            //get email template
                            var emailtemplateparam = new DynamicParameters();
                            emailtemplateparam.Add("@TemplateTypeId", 71);
                            emailtemplateparam.Add("@TemplateId", null);
                            emailtemplateparam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailtemplateparam, commandType: CommandType.StoredProcedure).ToList();

                            //get schedule details
                            var parameter = new DynamicParameters();
                            parameter.Add("@CandidateId", allEmails[i].CandidateId);
                            const string procName = "Usp_GetInductionScheduleDetailsByCandidate";
                            scheduleDetails = connection.Query<CandidateWiseScheduleDetails>(procName, parameter, commandType: CommandType.StoredProcedure).ToList();

                            EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            string tableBodyData = "";
                            string tableheaderData = "<html> <head></head><body>" +
                                     "<table style = 'width: 100%; border: 1px solid #000; border-collapse: collapse;'><thead><tr>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Training Title</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>From Date</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>To Date</th >" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>From Time</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>To Time</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Details of Sessions</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Trainer</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Mode</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Location</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Venue</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Coordinator</th>" +
                                     "<th style = 'border: 1px solid #000; padding:4px;text-align:left;'>Remarks</th>" +
                                     "</tr></thead><tbody>";
                            if (scheduleDetails.Count > 0)
                            {
                                foreach (var item1 in scheduleDetails)
                                {
                                    tableBodyData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.TraingTitle + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.DateFrom + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.DateTo + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.TimeFrom + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.TimeTo + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.DetailsofSession + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.TrainerName + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.InductionModeName + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.LocationOffice + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.InductionVenueName + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.InductionCoOrdinatorName + "</td>" +
                                       "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td>" +
                                       "</tr>";

                                }
                            }

                            string tableHeaderClose = "</tbody></table></body></html>";
                            string finalTableResult = tableheaderData + tableBodyData + tableHeaderClose;
                            EmailBody = EmailBody.Replace("@~@candidateName", allEmails[i].FullName);
                            EmailBody = EmailBody.Replace("@~@candidateNo", allEmails[i].CandidateNo);
                            EmailBody = EmailBody.Replace("@~@Table", finalTableResult);
                            CommonUtility.sendEmailViaWebApi(allEmails[i].ToEmailId, allEmails[i].EmailSubject, EmailBody);
                            flag = true;
                        }
                        catch (Exception ex)
                        {
                            mailIssue = ex.Message;
                            flag = false;
                        }
                        finally
                        {
                            var updateCandidateParam = new DynamicParameters();
                            updateCandidateParam.Add("@AutoId", allEmails[i].AutoId);
                            updateCandidateParam.Add("@CandidateId", allEmails[i].CandidateId);
                            updateCandidateParam.Add("@EmailBody", EmailBody);
                            updateCandidateParam.Add("@Emailto", allEmails[i].ToEmailId);
                            const string updateproc = "Usp_UpdateScheduleInductionMailDetails";
                            connection.Query(updateproc, updateCandidateParam, commandType: CommandType.StoredProcedure);
                            connection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async void ShareWithCandidateSendMail(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                using (IDbConnection connection = GetConnection())
                {


                    for (int i = 0; i < allEmails.Count; i++)
                    {
                        bool flag = true;
                        string mailIssue = "";
                        string inductionTemplateDescription = "";
                        string accommodationTemplateDescription = "";
                        int MailStatus = 0;
                        string EmailBody = "";
                        EmailBodyDetails emailBodydata = new EmailBodyDetails();
                        List<CandidateInductionDetails> candidateInductionDetails = new List<CandidateInductionDetails>();
                        List<CandidateAccommodationDetails> candidateAccommodationDetails = new List<CandidateAccommodationDetails>();
                        try
                        {


                            // GET EMAIL BODY
                            var para = new DynamicParameters();
                            para.Add("@CandidateId", allEmails[i].CandidateId);
                            para.Add("@RequisitionDetailId", allEmails[i].RequisitionDetailId);
                            const string procName = "Usp_EmailBody_GetAll";
                            connection.Open();
                            emailBodydata = connection.Query<EmailBodyDetails>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                            // GET INDUCTION DETAILS

                            var para1 = new DynamicParameters();
                            para1.Add("@CandidateId", allEmails[i].CandidateId);
                            para1.Add("@RequisitionDetailId", allEmails[i].RequisitionDetailId);
                            const string procName1 = "Usp_CandidateinductionDetailsForEmail_GetAll";
                            // connection.Open();
                            candidateInductionDetails = connection.Query<CandidateInductionDetails>(procName1, para1, commandType: CommandType.StoredProcedure).ToList();

                            // GET ACCOMMODATION DETAILS

                            var para2 = new DynamicParameters();
                            para2.Add("@CandidateId", allEmails[i].CandidateId);
                            para2.Add("@RequisitionDetailId", allEmails[i].RequisitionDetailId);
                            const string procName2 = "Usp_CandidateAccommodationDetailsForEmail_GetAll";
                            //connection.Open();
                            candidateAccommodationDetails = connection.Query<CandidateAccommodationDetails>(procName2, para2, commandType: CommandType.StoredProcedure).ToList();


                            // PREPARE DATA TO SEND EMAIL

                            List<InductionAccommodationTemplate> accomodationInductionTemplateList = new List<InductionAccommodationTemplate>();
                            var inductionAccommodationTemplateParam = new DynamicParameters();
                            inductionAccommodationTemplateParam.Add("@InductionAccommodationId", null);
                            inductionAccommodationTemplateParam.Add("@IsActive", true);
                            const string inductionAccommodationTemplateProcName = "Usp_InductionAccommodationTemplate_GetAll";
                            //connection.Open();
                            accomodationInductionTemplateList = connection.Query<InductionAccommodationTemplate>(inductionAccommodationTemplateProcName, inductionAccommodationTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                            if (emailBodydata != null && candidateInductionDetails.Count > 0)
                            {

                                string inductionTableData = "";

                                foreach (var item1 in candidateInductionDetails)
                                {
                                    inductionTableData += "<tr><td colspan='8' style='border:1px solid #000; padding: 3px 5px; text-align: center;'>" + item1.TrainingTittle + "</td></tr>";
                                    //foreach (var item2 in item1.TrainingDetails) //added by Amartya for duplicate record issue
                                    // {
                                    inductionTableData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.InductionDate + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.FromTime + "-" + item1.ToTime + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.DetailsOfSession + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.Location + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.Venue + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.PersonToMeet + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.AccommocationRequire + "</td>" +
                                                  "<td style='border: 1px solid #000; padding:4px;'>" + item1.Remarks + "</td></tr>";
                                    // }

                                }
                                if (accomodationInductionTemplateList.Count > 0)
                                {
                                    inductionTemplateDescription = accomodationInductionTemplateList[0].InductionTemplate;
                                    if (inductionTemplateDescription != "")
                                    {
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@CandidateName", emailBodydata.CandidateName);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@BatchNo", emailBodydata.BatchNo);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Location", emailBodydata.Location);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Function", emailBodydata.Function);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Department", emailBodydata.Department);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Position", emailBodydata.Position);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@Grade", emailBodydata.Grade);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@JoiningDate", emailBodydata.JoiningDate);
                                        inductionTemplateDescription = inductionTemplateDescription.Replace("@~@InductionDetails", inductionTableData);

                                    }

                                }

                            }
                            if (emailBodydata != null && candidateAccommodationDetails.Count > 0)
                            {
                                string accommodationTableData = "";
                                foreach (var item1 in candidateAccommodationDetails)
                                {
                                    accommodationTableData += "<tr><td style='border: 1px solid #000; padding:4px;'>" + item1.FromDate + "-" + item1.ToDate + "</td>" +
                                                      "<td style='border: 1px solid #000; padding:4px;'>" + item1.Location + "</td>" +
                                                      "<td style='border: 1px solid #000; padding:4px;'>" + item1.Accommodation + "</td></tr>";
                                }

                                if (accomodationInductionTemplateList.Count > 0)
                                {
                                    accommodationTemplateDescription = accomodationInductionTemplateList[0].AccommodationTemplate;
                                    if (accommodationTemplateDescription != "")
                                    {
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@CandidateName", emailBodydata.CandidateName);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@BatchNo", emailBodydata.BatchNo);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Location", emailBodydata.Location);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Function", emailBodydata.Function);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Department", emailBodydata.Department);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Position", emailBodydata.Position);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@Grade", emailBodydata.Grade);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@JoiningDate", emailBodydata.JoiningDate);
                                        accommodationTemplateDescription = accommodationTemplateDescription.Replace("@~@AccommodationDetails", accommodationTableData);
                                    }
                                }

                            }
                            CommonUtility.SendEmailViaWebApiWithAttachment(emailBodydata.CandidateEmailId, "Welcome to MRF - Induction Details", emailBodydata.EmailBody, inductionTemplateDescription, accommodationTemplateDescription);

                            // CommonUtility.sendEmailViaWebApi(allEmails[i].ToEmailId, allEmails[i].EmailSubject, emailBodydata.EmailBody);
                            flag = true;
                            MailStatus = 1;
                        }
                        catch (Exception ex)
                        {
                            mailIssue = ex.Message;
                            flag = false;
                            MailStatus = 2;
                        }
                        finally
                        {
                            var para = new DynamicParameters();
                            para.Add("@CandidateId", emailBodydata.CandidateId);
                            para.Add("@RequisitiondetailId", emailBodydata.RequisitionDetailId);
                            para.Add("@IsSent", MailStatus);
                            para.Add("@MailBody", MailStatus);
                            const string procName = "Usp_UpdateShareWithCandidateMailDetails";
                            // connection.Open();
                            connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                            connection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async void BookAccommodationEmail(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                using (IDbConnection connection = GetConnection())
                {
                    for (int i = 0; i < allEmails.Count; i++)
                    {
                        bool flag = true;
                        string mailIssue = "";
                        string EmailBody = "";
                        try
                        {
                            List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                            List<AccomodationDetailsCadidateWise> accomodationDetailsCadidateWises = new List<AccomodationDetailsCadidateWise>();
                            var emailTemplateParam1 = new DynamicParameters();
                            emailTemplateParam1.Add("@TemplateTypeId", 72);
                            emailTemplateParam1.Add("@TemplateId", null);
                            emailTemplateParam1.Add("@IsActive", true);
                            const string emailTemplateProcName1 = "Usp_EmailTemplate_GetAll";
                            connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName1, emailTemplateParam1, commandType: CommandType.StoredProcedure).ToList();

                            var qureyparam = new DynamicParameters();
                            qureyparam.Add("@CandidateId", allEmails[i].CandidateId);
                            const string spname = "Usp_getAccomodationDetailsCanidateWise";
                            accomodationDetailsCadidateWises = connection.Query<AccomodationDetailsCadidateWise>(spname, qureyparam, commandType: CommandType.StoredProcedure).ToList();
                            if (emailTemplateBodyList[0].TemplateDescription != null)
                            {
                                if (allEmails[i].ToEmailId != null)
                                {
                                     EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                    EmailBody = EmailBody.Replace("@~@FromDate", accomodationDetailsCadidateWises[0].FromDate);
                                    EmailBody = EmailBody.Replace("@~@date", accomodationDetailsCadidateWises[0].FromDate);
                                    EmailBody = EmailBody.Replace("@~@ToDate", accomodationDetailsCadidateWises[0].ToDate);
                                    EmailBody = EmailBody.Replace("@~@candidateName", allEmails[i].FullName);
                                    EmailBody = EmailBody.Replace("@~@candidateNo", allEmails[i].CandidateNo);
                                    EmailBody = EmailBody.Replace("@~@location", accomodationDetailsCadidateWises[0].LocationOffice);
                                   
                             
                                }
                            }

                            CommonUtility.sendEmailViaWebApi(allEmails[i].ToEmailId, allEmails[i].EmailSubject, EmailBody);
                            flag = true;
                        }
                        catch (Exception ex)
                        {
                            mailIssue = ex.Message;
                            flag = false;
                        }
                        finally
                        {
                            var updateparam = new DynamicParameters();
                            updateparam.Add("@CandidateId", allEmails[i].CandidateId);
                            updateparam.Add("@AutoId", allEmails[i].AutoId);
                            updateparam.Add("@EmailBody", EmailBody);
                            const string storeprocname = "Usp_UpdateAccomodationMailTrigger";
                            connection.Query(storeprocname, updateparam, commandType: CommandType.StoredProcedure);
                            connection.Close();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async void SendEmailNaukriCandidates(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                IDbConnection connection = base.GetConnection();
                for (int i = 0; i < allEmails.Count; i++)
                {
                    int MailStatus = 0;
                    ReturnMessage rm = new ReturnMessage();
                    Random generator = new Random();
                    string password = generator.Next(0, 1000000).ToString("D6");
                    string SaltKey = Guid.NewGuid().ToString();
                    string EncodePass = CommonUtility.EncodePassword(password, SaltKey);
                    var para = new DynamicParameters();
                    para.Add("@EmailId", allEmails[i].ToEmailId);
                    para.Add("@Name", allEmails[i].FullName);
                    para.Add("@CandidatePass", EncodePass);
                    para.Add("@SaltKey", SaltKey);
                    para.Add("@SourceChannelId", 6);
                    para.Add("@RequisitionDetailId", allEmails[i].RequisitionDetailId);
                    const string procName = "Usp_CandidateRegistration_Naukri";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    connection.Close();

                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();

                    if (rm.SuccessFlag == 1)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 5);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        connection.Close();

                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", allEmails[i].FullName);
                            EmailBody = EmailBody.Replace("@~@departmentName", allEmails[i].DepartmentName);
                            EmailBody = EmailBody.Replace("@~@functionName", allEmails[i].FunctionName);
                            EmailBody = EmailBody.Replace("@~@positionName", allEmails[i].PositionName);
                            EmailBody = EmailBody.Replace("@~@userId", allEmails[i].RequisitionNo);
                            EmailBody = EmailBody.Replace("@~@refNo", rm.RefNo);
                            EmailBody = EmailBody.Replace("@~@password", password);
                            EmailBody = EmailBody.Replace("@~@userId", allEmails[i].RequisitionNo);
                            EmailBody = EmailBody.Replace("@~@link", "https://mrfhrportalprod.azurewebsites.net/login");

                            try
                            {
                                CommonUtility.sendEmailViaWebApi(allEmails[i].ToEmailId, "Application - MRF Ltd", EmailBody);
                                MailStatus = 1;
                            }
                            catch (Exception ex)
                            {
                                EmailBody = ex.ToString();
                                MailStatus = 2;
                            }
                            finally
                            {
                                connection.Open();
                                ReturnMessage rm1 = new ReturnMessage();
                                var para1 = new DynamicParameters();
                                para1.Add("@NaukriId", allEmails[i].NaukriId);
                                para1.Add("@MailContent", EmailBody);
                                para1.Add("@Status", MailStatus);
                                const string procName1 = "Usp_UpdateNaukriCandidateProfile";
                                rm = connection.Query<ReturnMessage>(procName1, para1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                                connection.Close();
                            }

                        }
                    }
                }

                SendNaukriCandidateTestMail();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async void SendNaukriCandidateTestMail()
        {
            try
            {
                List<TestEmailList> testEmails = new List<TestEmailList>();
                IDbConnection connection = GetConnection();
                var para = new DynamicParameters();
                const string procName = "Usp_SendTestEmail";
                connection.Open();
                testEmails = connection.Query<TestEmailList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                connection.Close();

                foreach (var data in testEmails)
                {
                    int MailStatus = 0;
                    ReturnMessage rm = new ReturnMessage();
                    string EmailBody = "<html>" +
                        "<head></head>" +
                        "<body style='font-family:calibri;'>" +
                        data.EmailTemplate +
                        "</body>" +
                        "</html>";
                    try
                    {
                        CommonUtility.sendEmailViaWebApi(data.EmailId, "Application - MRF Ltd", EmailBody);
                        MailStatus = 1;
                    }
                    catch (Exception ex)
                    {
                        EmailBody = ex.ToString();
                        MailStatus = 2;
                    }
                    finally
                    {
                        var para1 = new DynamicParameters();
                        para1.Add("@IsSend", MailStatus);
                        para1.Add("@TestScheduleDetailId", data.TestScheduleDetailId);
                        const string procName1 = "Usp_UpdateTestEmailSend";
                        connection.Open();
                        var value = connection.Query<ReturnMessage>(procName1, para1, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        connection.Dispose();
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}


