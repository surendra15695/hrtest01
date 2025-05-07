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
using System.IO;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Net.Http.Headers;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace Application.DataAccess.Repositories.CandidateModule
{
    public class CandidateProfileRepository : DatabaseContext, ICandidateProfileRepository
    {
        public CandidateProfileRepository(AppConfiguration appConfiguration)
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
        public async Task<ReturnMessage> SaveCandidateProfile(CandidateProfileFormData formData)
        {
            try
            {   
                DataTable dtFMBack = CommonUtility.ToDataTable<FamilyBackgound>(formData.FamilyBackGroundDetails);
                DataTable dtMRFRelation = CommonUtility.ToDataTable<MRFRelationShip>(formData.MRFRelationShipDetails);
                DataTable dtTyreCompanyRelation = CommonUtility.ToDataTable<TyreCompanyRelation>(formData.TyreCompanyRelationShipDetails);
                DataTable dtAcademic = CommonUtility.ToDataTable<Academic>(formData.AcademicDetails);
                DataTable dtCertification = CommonUtility.ToDataTable<Certification>(formData.CertificationDetails);
                DataTable dtMembership = CommonUtility.ToDataTable<Membership>(formData.MembershipDetails);
                DataTable dtExtraCarricular = CommonUtility.ToDataTable<ExtraCarricularActivities>(formData.ExtraCarricularActivitiesDetails);
                DataTable dtLanguageKnown = CommonUtility.ToDataTable<LanguageKnown>(formData.LanguageKnownDetails);
                DataTable dtPreviousAssignment = CommonUtility.ToDataTable<PeviousAssignment>(formData.PeviousAssignmentDetails);
                DataTable dtMRFPreInterview = CommonUtility.ToDataTable<MRFPreInterview>(formData.MRFPreInterviewDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateProfileId", formData.CandidateProfileId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@CandiadatePhoto", formData.CandiadatePhoto);
                    para.Add("@PositionAppliedFor", formData.PositionAppliedFor);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@Age", formData.Age);
                    para.Add("@CommunicationAddress", formData.CommunicationAddress);
                    para.Add("@CommunicationState", formData.CommunicationStateId);
                    para.Add("@CommunicationCountry", formData.CommunicationCountryId);
                    para.Add("@CommunicationPin", formData.CommunicationPin);
                    para.Add("@CommunicationPhoneNo", formData.CommunicationPhoneNo);
                    para.Add("@CommunicationAlternativeContactNo", formData.CommunicationAlternativeContactNo);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PermanentAddress", formData.PermanentAddress);
                    para.Add("@PermanentState", formData.PermanentStateId);
                    para.Add("@PermanentCountry", formData.PermanentCountryId);
                    para.Add("@PermanentPin", formData.PermanentPin);
                    para.Add("@PermanentPhone", formData.PermanentPhone);
                    para.Add("@PermanentHomeTown", formData.PermanentHomeTown);
                    para.Add("@PermanentNativeState", formData.PermanentNativeStateId);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@UANNO", formData.UANNO);
                    para.Add("@PANNo", formData.PANNo);
                    para.Add("@Nationality", formData.NationalityId);
                    para.Add("@Religion", formData.ReligionId);
                    para.Add("@Caste", formData.CasteId);
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    para.Add("@BloodGroup", formData.BloodGroupId);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@EyeSightRight", formData.EyeSightRight);
                    para.Add("@EyeSightLeft", formData.EyeSightLeft);
                    para.Add("@CronicMajorIllness", formData.CronicMajorIllness);
                    para.Add("@CronicMajorIllnessDetails", formData.CronicMajorIllnessDetails);
                    para.Add("@HandiCap", formData.HandiCap);
                    para.Add("@HandiCapDetails", formData.HandiCapDetails);
                    para.Add("@IdentificationMarks1", formData.IdentificationMarks1);
                    para.Add("@IdentificationMarks2", formData.IdentificationMarks2);
                    para.Add("@FamilyBackGround", dtFMBack, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MRFRealtives", formData.MRFRealtives);
                    para.Add("@MRFRelation", dtMRFRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TyreCompanyRealtionShip", formData.TyreCompanyRealtionShip);
                    para.Add("@TyreCompanyRelation", dtTyreCompanyRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Academic", dtAcademic, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ReasonforGap", formData.ReasonforGap);
                    para.Add("@CertificationDetails", dtCertification, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MembershipDetails", dtMembership, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@DetailsofPublication", formData.DetailsofPublication);
                    para.Add("@ExtraCarricularActivities", dtExtraCarricular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@LanguageKnown", dtLanguageKnown, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreOrganisationName", formData.PreOrganisationName);
                    para.Add("@PreOrganisationAddress", formData.PreOrganisationAddress);
                    para.Add("@PreOrganisationTurnOver", formData.PreOrganisationTurnOver);
                    para.Add("@PreOrganisationMainProduct", formData.PreOrganisationMainProduct);
                    para.Add("@PreOrganisationJoinedas", formData.PreOrganisationJoinedas);
                    para.Add("@PreOrganisationJoinDate", formData.PreOrganisationJoinDate);
                    para.Add("@PreOrganisationPresentPosition", formData.PreOrganisationPresentPosition);
                    para.Add("@PreOrganisationPresentPositionDate", formData.PreOrganisationPresentPositionDate);
                    para.Add("@PreOrganisationGap", formData.PreOrganisationGap);
                    para.Add("@PreOrganisationBasic", formData.PreOrganisationBasic);
                    para.Add("@PreOrganisationHRA", formData.PreOrganisationHRA);
                    para.Add("@PreOrganisationOtherAllowances", formData.PreOrganisationOtherAllowances);
                    para.Add("@PreOrganisationAnualComponents", formData.PreOrganisationAnualComponents);
                    para.Add("@PreOrganisationVariablePay", formData.PreOrganisationVariablePay);
                    para.Add("@PreOrganisationBenefits", formData.PreOrganisationBenefits);
                    para.Add("@PreOrganisationRetrial", formData.PreOrganisationRetrial);
                    para.Add("@PreOrganisationOthers", formData.PreOrganisationOthers);
                    para.Add("@PreOrganisationTotalCTC", formData.PreOrganisationTotalCTC);
                    para.Add("@PeviousAssignment", dtPreviousAssignment, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreviousAssignmentGap", formData.PreviousAssignmentGap);
                    para.Add("@Ref1Name", formData.Ref1Name);
                    para.Add("@Ref1Position", formData.Ref1Position);
                    para.Add("@Ref1Organisation", formData.Ref1Organisation);
                    para.Add("@Ref1Location", formData.Ref1Location);
                    para.Add("@Ref1ContactNo", formData.Ref1ContactNo);
                    para.Add("@Ref1EmailId", formData.Ref1EmailId);
                    para.Add("@Ref2Name", formData.Ref2Name);
                    para.Add("@Ref2Position", formData.Ref2Position);
                    para.Add("@Ref2Organisation", formData.Ref2Organisation);
                    para.Add("@Ref2Location", formData.Ref2Location);
                    para.Add("@Ref2ContactNo", formData.Ref2ContactNo);
                    para.Add("@Ref2EmailId", formData.Ref2EmailId);
                    para.Add("@Ref3Name", formData.Ref3Name);
                    para.Add("@Ref3Position", formData.Ref3Position);
                    para.Add("@Ref3Organisation", formData.Ref3Organisation);
                    para.Add("@Ref3Location", formData.Ref3Location);
                    para.Add("@Ref3ContactNo", formData.Ref3ContactNo);
                    para.Add("@Ref3EmailId", formData.Ref3EmailId);
                    para.Add("@PreInterViewMRF", formData.PreInterViewMRF);
                    para.Add("@MRFPreInterviewDetails", dtMRFPreInterview, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CriminalCase", formData.CriminalCase);
                    para.Add("@CriminalCaseDetails", formData.CriminalCaseDetails);
                    para.Add("@PreviousEmployemntEnquiry", formData.PreviousEmployemntEnquiry);
                    para.Add("@PreviousEmployemntEnquiryDetails", formData.PreviousEmployemntEnquiryDetails);
                    para.Add("@AdditionoalDetails", formData.AdditionoalDetails);
                    para.Add("@JobPortal", formData.JobPortal);
                    para.Add("@LinkedIn", formData.LinkedIn);
                    para.Add("@CareerSite", formData.CareerSite);
                    para.Add("@PaperAdvertisement", formData.PaperAdvertisement);
                    para.Add("@EmployeeReferal", formData.EmployeeReferal);
                    para.Add("@RefNameofEmployee", formData.RefNameofEmployee);
                    para.Add("@RefEmployeeId", formData.RefEmployeeId);
                    para.Add("@RefEmployeeDesignation", formData.RefEmployeeDesignation);
                    para.Add("@RefEmployeeLocation", formData.RefEmployeeLocation);
                    para.Add("@RefEmployeeFunction", formData.RefEmployeeFunction);
                    para.Add("@RefEmployeeKnowing", formData.RefEmployeeKnowing);
                    para.Add("@ConsultantApplicable", formData.ConsultantApplicable);
                    para.Add("@Consultant", formData.Consultant);
                    para.Add("@OtherSource", formData.OtherSource);
                    para.Add("@expectedCTC", formData.expectedCTC);
                    para.Add("@joiningDaysRequired", formData.joiningDaysRequired);
                    para.Add("@joiningComments", formData.joiningComments);
                    para.Add("@SignatureDate", formData.SignatureDate);
                    para.Add("@SignaturePlace", formData.SignaturePlace);
                    para.Add("@Signature", formData.Signature);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@SubmitStatus", formData.SubmitStatus);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    const string procName = "Usp_CandidateProfile_InsertUpdate";
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
        public async Task<ReturnMessage> SaveCandidateProfileApplicationForm(CandidateProfileFormDataCopy formData)
        {
            try
            {
                DataTable dtFMBack = CommonUtility.ToDataTable<FamilyBackgound>(formData.FamilyBackGroundDetails);
                DataTable dtMRFRelation = CommonUtility.ToDataTable<MRFRelationShip>(formData.MRFRelationShipDetails);
                DataTable dtTyreCompanyRelation = CommonUtility.ToDataTable<TyreCompanyRelation>(formData.TyreCompanyRelationShipDetails);
                DataTable dtAcademic = CommonUtility.ToDataTable<Academic>(formData.AcademicDetails);
                DataTable dtCertification = CommonUtility.ToDataTable<Certification>(formData.CertificationDetails);
                DataTable dtMembership = CommonUtility.ToDataTable<Membership>(formData.MembershipDetails);
                DataTable dtExtraCarricular = CommonUtility.ToDataTable<ExtraCarricularActivities>(formData.ExtraCarricularActivitiesDetails);
                DataTable dtLanguageKnown = CommonUtility.ToDataTable<LanguageKnown>(formData.LanguageKnownDetails);
                DataTable dtPreviousAssignment = CommonUtility.ToDataTable<PeviousAssignment>(formData.PeviousAssignmentDetails);
                DataTable dtMRFPreInterview = CommonUtility.ToDataTable<MRFPreInterview>(formData.MRFPreInterviewDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateProfileId", formData.CandidateProfileId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@CandiadatePhoto", formData.CandiadatePhoto);
                    para.Add("@PositionAppliedFor", formData.PositionAppliedFor);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@Age", formData.Age);
                    para.Add("@CommunicationAddress", formData.CommunicationAddress);
                    para.Add("@CommunicationState", formData.CommunicationStateId);
                    para.Add("@CommunicationCountry", formData.CommunicationCountryId);
                    para.Add("@CommunicationPin", formData.CommunicationPin);
                    para.Add("@CommunicationPhoneNo", formData.CommunicationPhoneNo);
                    para.Add("@CommunicationAlternativeContactNo", formData.CommunicationAlternativeContactNo);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PermanentAddress", formData.PermanentAddress);
                    para.Add("@PermanentState", formData.PermanentStateId);
                    para.Add("@PermanentCountry", formData.PermanentCountryId);
                    para.Add("@PermanentPin", formData.PermanentPin);
                    para.Add("@PermanentPhone", formData.PermanentPhone);
                    para.Add("@PermanentHomeTown", formData.PermanentHomeTown);
                    para.Add("@PermanentNativeState", formData.PermanentNativeStateId);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@UANNO", formData.UANNO);
                    para.Add("@PANNo", formData.PANNo);
                    para.Add("@Nationality", formData.NationalityId);
                    para.Add("@Religion", formData.ReligionId);
                    para.Add("@Caste", formData.CasteId);
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    para.Add("@BloodGroup", formData.BloodGroupId);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@EyeSightRight", formData.EyeSightRight);
                    para.Add("@EyeSightLeft", formData.EyeSightLeft);
                    para.Add("@CronicMajorIllness", formData.CronicMajorIllness);
                    para.Add("@CronicMajorIllnessDetails", formData.CronicMajorIllnessDetails);
                    para.Add("@HandiCap", formData.HandiCap);
                    para.Add("@HandiCapDetails", formData.HandiCapDetails);
                    para.Add("@IdentificationMarks1", formData.IdentificationMarks1);
                    para.Add("@IdentificationMarks2", formData.IdentificationMarks2);
                    para.Add("@FamilyBackGround", dtFMBack, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MRFRealtives", formData.MRFRealtives);
                    para.Add("@MRFRelation", dtMRFRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TyreCompanyRealtionShip", formData.TyreCompanyRealtionShip);
                    para.Add("@TyreCompanyRelation", dtTyreCompanyRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Academic", dtAcademic, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ReasonforGap", formData.ReasonforGap);
                    para.Add("@CertificationDetails", dtCertification, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MembershipDetails", dtMembership, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@DetailsofPublication", formData.DetailsofPublication);
                    para.Add("@ExtraCarricularActivities", dtExtraCarricular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@LanguageKnown", dtLanguageKnown, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreOrganisationName", formData.PreOrganisationName);
                    para.Add("@PreOrganisationAddress", formData.PreOrganisationAddress);
                    para.Add("@PreOrganisationTurnOver", formData.PreOrganisationTurnOver);
                    para.Add("@PreOrganisationMainProduct", formData.PreOrganisationMainProduct);
                    para.Add("@PreOrganisationJoinedas", formData.PreOrganisationJoinedas);
                    para.Add("@PreOrganisationJoinDate", formData.PreOrganisationJoinDate);
                    para.Add("@PreOrganisationPresentPosition", formData.PreOrganisationPresentPosition);
                    para.Add("@PreOrganisationPresentPositionDate", formData.PreOrganisationPresentPositionDate);
                    para.Add("@PreOrganisationGap", formData.PreOrganisationGap);
                    para.Add("@PreOrganisationBasic", formData.PreOrganisationBasic);
                    para.Add("@PreOrganisationHRA", formData.PreOrganisationHRA);
                    para.Add("@PreOrganisationOtherAllowances", formData.PreOrganisationOtherAllowances);
                    para.Add("@PreOrganisationAnualComponents", formData.PreOrganisationAnualComponents);
                    para.Add("@PreOrganisationVariablePay", formData.PreOrganisationVariablePay);
                    para.Add("@PreOrganisationBenefits", formData.PreOrganisationBenefits);
                    para.Add("@PreOrganisationRetrial", formData.PreOrganisationRetrial);
                    para.Add("@PreOrganisationOthers", formData.PreOrganisationOthers);
                    para.Add("@PreOrganisationTotalCTC", formData.PreOrganisationTotalCTC);
                    para.Add("@PeviousAssignment", dtPreviousAssignment, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreviousAssignmentGap", formData.PreviousAssignmentGap);
                    para.Add("@Ref1Name", formData.Ref1Name);
                    para.Add("@Ref1Position", formData.Ref1Position);
                    para.Add("@Ref1Organisation", formData.Ref1Organisation);
                    para.Add("@Ref1Location", formData.Ref1Location);
                    para.Add("@Ref1ContactNo", formData.Ref1ContactNo);
                    para.Add("@Ref1EmailId", formData.Ref1EmailId);
                    para.Add("@Ref2Name", formData.Ref2Name);
                    para.Add("@Ref2Position", formData.Ref2Position);
                    para.Add("@Ref2Organisation", formData.Ref2Organisation);
                    para.Add("@Ref2Location", formData.Ref2Location);
                    para.Add("@Ref2ContactNo", formData.Ref2ContactNo);
                    para.Add("@Ref2EmailId", formData.Ref2EmailId);
                    para.Add("@Ref3Name", formData.Ref3Name);
                    para.Add("@Ref3Position", formData.Ref3Position);
                    para.Add("@Ref3Organisation", formData.Ref3Organisation);
                    para.Add("@Ref3Location", formData.Ref3Location);
                    para.Add("@Ref3ContactNo", formData.Ref3ContactNo);
                    para.Add("@Ref3EmailId", formData.Ref3EmailId);
                    para.Add("@PreInterViewMRF", formData.PreInterViewMRF);
                    para.Add("@MRFPreInterviewDetails", dtMRFPreInterview, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CriminalCase", formData.CriminalCase);
                    para.Add("@CriminalCaseDetails", formData.CriminalCaseDetails);
                    para.Add("@PreviousEmployemntEnquiry", formData.PreviousEmployemntEnquiry);
                    para.Add("@PreviousEmployemntEnquiryDetails", formData.PreviousEmployemntEnquiryDetails);
                    para.Add("@AdditionoalDetails", formData.AdditionoalDetails);
                    para.Add("@JobPortal", formData.JobPortal);
                    para.Add("@LinkedIn", formData.LinkedIn);
                    para.Add("@CareerSite", formData.CareerSite);
                    para.Add("@PaperAdvertisement", formData.PaperAdvertisement);
                    para.Add("@EmployeeReferal", formData.EmployeeReferal);
                    para.Add("@RefNameofEmployee", formData.RefNameofEmployee);
                    para.Add("@RefEmployeeId", formData.RefEmployeeId);
                    para.Add("@RefEmployeeDesignation", formData.RefEmployeeDesignation);
                    para.Add("@RefEmployeeLocation", formData.RefEmployeeLocation);
                    para.Add("@RefEmployeeFunction", formData.RefEmployeeFunction);
                    para.Add("@RefEmployeeKnowing", formData.RefEmployeeKnowing);
                    para.Add("@ConsultantApplicable", formData.ConsultantApplicable);
                    para.Add("@Consultant", formData.Consultant);
                    para.Add("@OtherSource", formData.OtherSource);
                    para.Add("@expectedCTC", formData.expectedCTC);
                    para.Add("@joiningDaysRequired", formData.joiningDaysRequired);
                    para.Add("@joiningComments", formData.joiningComments);
                    para.Add("@SignatureDate", formData.SignatureDate);
                    para.Add("@SignaturePlace", formData.SignaturePlace);
                    para.Add("@Signature", formData.Signature);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@SubmitStatus", formData.SubmitStatus);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    para.Add("@DocumentpathHtml", formData.Htmlfilepath);
                    para.Add("@IsInternalRef", formData.IsInternalRef);
                    para.Add("@InternalRefName", formData.InternalRefName);
                    //  const string procName = "Usp_CandidateProfile_InsertUpdate";
                    const string procName = "Usp_CandidateApplicationForm_InsertUpdate";
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
        public async Task<ReturnMessage> SaveCampusCandidateProfileApplicationForm(CandidateProfileFormDataCopyFOrCampus formData)
        {
            try
            {
                DataTable dtFMBack = CommonUtility.ToDataTable<FamilyBackgound>(formData.FamilyBackGroundDetails);
                DataTable dtMRFRelation = CommonUtility.ToDataTable<MRFRelationShip>(formData.MRFRelationShipDetails);
                DataTable dtTyreCompanyRelation = CommonUtility.ToDataTable<TyreCompanyRelation>(formData.TyreCompanyRelationShipDetails);
                DataTable dtAcademic = CommonUtility.ToDataTable<Academic>(formData.AcademicDetails);
                DataTable dtCertification = CommonUtility.ToDataTable<Certification>(formData.CertificationDetails);
                DataTable dtMembership = CommonUtility.ToDataTable<Membership>(formData.MembershipDetails);
                DataTable dtExtraCarricular = CommonUtility.ToDataTable<ExtraCarricularActivities>(formData.ExtraCarricularActivitiesDetails);
                DataTable dtLanguageKnown = CommonUtility.ToDataTable<LanguageKnown>(formData.LanguageKnownDetails);
                DataTable dtPreviousAssignment = CommonUtility.ToDataTable<PeviousAssignment>(formData.PeviousAssignmentDetails);
                DataTable dtMRFPreInterview = CommonUtility.ToDataTable<MRFPreInterview>(formData.MRFPreInterviewDetails);
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateProfileId", formData.CandidateProfileId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@CandiadatePhoto", formData.CandiadatePhoto);
                    para.Add("@PositionAppliedFor", formData.PositionAppliedFor);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@Age", formData.Age);
                    para.Add("@CommunicationAddress", formData.CommunicationAddress);
                    para.Add("@CommunicationState", formData.CommunicationStateId);
                    para.Add("@CommunicationCountry", formData.CommunicationCountryId);
                    para.Add("@CommunicationPin", formData.CommunicationPin);
                    para.Add("@CommunicationPhoneNo", formData.CommunicationPhoneNo);
                    para.Add("@CommunicationAlternativeContactNo", formData.CommunicationAlternativeContactNo);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PermanentAddress", formData.PermanentAddress);
                    para.Add("@PermanentState", formData.PermanentStateId);
                    para.Add("@PermanentCountry", formData.PermanentCountryId);
                    para.Add("@PermanentPin", formData.PermanentPin);
                    para.Add("@PermanentPhone", formData.PermanentPhone);
                    para.Add("@PermanentHomeTown", formData.PermanentHomeTown);
                    para.Add("@PermanentNativeState", formData.PermanentNativeStateId);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@UANNO", formData.UANNO);
                    para.Add("@PANNo", formData.PANNo);
                    para.Add("@Nationality", formData.NationalityId);
                    para.Add("@Religion", formData.ReligionId);
                    para.Add("@Caste", formData.CasteId);
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    para.Add("@BloodGroup", formData.BloodGroupId);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@EyeSightRight", formData.EyeSightRight);
                    para.Add("@EyeSightLeft", formData.EyeSightLeft);
                    para.Add("@CronicMajorIllness", formData.CronicMajorIllness);
                    para.Add("@CronicMajorIllnessDetails", formData.CronicMajorIllnessDetails);
                    para.Add("@HandiCap", formData.HandiCap);
                    para.Add("@HandiCapDetails", formData.HandiCapDetails);
                    para.Add("@IdentificationMarks1", formData.IdentificationMarks1);
                    para.Add("@IdentificationMarks2", formData.IdentificationMarks2);
                    para.Add("@FamilyBackGround", dtFMBack, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MRFRealtives", formData.MRFRealtives);
                    para.Add("@MRFRelation", dtMRFRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TyreCompanyRealtionShip", formData.TyreCompanyRealtionShip);
                    para.Add("@TyreCompanyRelation", dtTyreCompanyRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Academic", dtAcademic, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ReasonforGap", formData.ReasonforGap);
                    para.Add("@CertificationDetails", dtCertification, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MembershipDetails", dtMembership, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@DetailsofPublication", formData.DetailsofPublication);
                    para.Add("@ExtraCarricularActivities", dtExtraCarricular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@LanguageKnown", dtLanguageKnown, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreOrganisationName", formData.PreOrganisationName);
                    para.Add("@PreOrganisationAddress", formData.PreOrganisationAddress);
                    para.Add("@PreOrganisationTurnOver", formData.PreOrganisationTurnOver);
                    para.Add("@PreOrganisationMainProduct", formData.PreOrganisationMainProduct);
                    para.Add("@PreOrganisationJoinedas", formData.PreOrganisationJoinedas);
                    para.Add("@PreOrganisationJoinDate", formData.PreOrganisationJoinDate);
                    para.Add("@PreOrganisationPresentPosition", formData.PreOrganisationPresentPosition);
                    para.Add("@PreOrganisationPresentPositionDate", formData.PreOrganisationPresentPositionDate);
                    para.Add("@PreOrganisationGap", formData.PreOrganisationGap);
                    para.Add("@PreOrganisationBasic", formData.PreOrganisationBasic);
                    para.Add("@PreOrganisationHRA", formData.PreOrganisationHRA);
                    para.Add("@PreOrganisationOtherAllowances", formData.PreOrganisationOtherAllowances);
                    para.Add("@PreOrganisationAnualComponents", formData.PreOrganisationAnualComponents);
                    para.Add("@PreOrganisationVariablePay", formData.PreOrganisationVariablePay);
                    para.Add("@PreOrganisationBenefits", formData.PreOrganisationBenefits);
                    para.Add("@PreOrganisationRetrial", formData.PreOrganisationRetrial);
                    para.Add("@PreOrganisationOthers", formData.PreOrganisationOthers);
                    para.Add("@PreOrganisationTotalCTC", formData.PreOrganisationTotalCTC);
                    para.Add("@PeviousAssignment", dtPreviousAssignment, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreviousAssignmentGap", formData.PreviousAssignmentGap);
                    para.Add("@Ref1Name", formData.Ref1Name);
                    para.Add("@Ref1Position", formData.Ref1Position);
                    para.Add("@Ref1Organisation", formData.Ref1Organisation);
                    para.Add("@Ref1Location", formData.Ref1Location);
                    para.Add("@Ref1ContactNo", formData.Ref1ContactNo);
                    para.Add("@Ref1EmailId", formData.Ref1EmailId);
                    para.Add("@Ref2Name", formData.Ref2Name);
                    para.Add("@Ref2Position", formData.Ref2Position);
                    para.Add("@Ref2Organisation", formData.Ref2Organisation);
                    para.Add("@Ref2Location", formData.Ref2Location);
                    para.Add("@Ref2ContactNo", formData.Ref2ContactNo);
                    para.Add("@Ref2EmailId", formData.Ref2EmailId);
                    para.Add("@Ref3Name", formData.Ref3Name);
                    para.Add("@Ref3Position", formData.Ref3Position);
                    para.Add("@Ref3Organisation", formData.Ref3Organisation);
                    para.Add("@Ref3Location", formData.Ref3Location);
                    para.Add("@Ref3ContactNo", formData.Ref3ContactNo);
                    para.Add("@Ref3EmailId", formData.Ref3EmailId);
                    para.Add("@PreInterViewMRF", formData.PreInterViewMRF);
                    para.Add("@MRFPreInterviewDetails", dtMRFPreInterview, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CriminalCase", formData.CriminalCase);
                    para.Add("@CriminalCaseDetails", formData.CriminalCaseDetails);
                    para.Add("@PreviousEmployemntEnquiry", formData.PreviousEmployemntEnquiry);
                    para.Add("@PreviousEmployemntEnquiryDetails", formData.PreviousEmployemntEnquiryDetails);
                    para.Add("@AdditionoalDetails", formData.AdditionoalDetails);
                    para.Add("@JobPortal", formData.JobPortal);
                    para.Add("@CampusPlacement", formData.CampusPlacement); //added later based on requirement on 02-12-2023
                    para.Add("@LinkedIn", formData.LinkedIn);
                    para.Add("@CareerSite", formData.CareerSite);
                    para.Add("@PaperAdvertisement", formData.PaperAdvertisement);
                    para.Add("@EmployeeReferal", formData.EmployeeReferal);
                    para.Add("@RefNameofEmployee", formData.RefNameofEmployee);
                    para.Add("@RefEmployeeId", formData.RefEmployeeId);
                    para.Add("@RefEmployeeDesignation", formData.RefEmployeeDesignation);
                    para.Add("@RefEmployeeLocation", formData.RefEmployeeLocation);
                    para.Add("@RefEmployeeFunction", formData.RefEmployeeFunction);
                    para.Add("@RefEmployeeKnowing", formData.RefEmployeeKnowing);
                    para.Add("@ConsultantApplicable", formData.ConsultantApplicable);
                    para.Add("@Consultant", formData.Consultant);
                    para.Add("@OtherSource", formData.OtherSource);
                    para.Add("@expectedCTC", formData.expectedCTC);
                    para.Add("@joiningDaysRequired", formData.joiningDaysRequired);
                    para.Add("@joiningComments", formData.joiningComments);
                    para.Add("@SignatureDate", formData.SignatureDate);
                    para.Add("@SignaturePlace", formData.SignaturePlace);
                    para.Add("@Signature", formData.Signature);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@SubmitStatus", formData.SubmitStatus);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    para.Add("@DocumentpathHtml", formData.Htmlfilepath);
                    //  const string procName = "Usp_CandidateProfile_InsertUpdate";
                    const string procName = "Usp_CampusCandidateApplicationForm_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 2 && rm.SenderEmailId != null && formData.IsEnabled == false)
                    {


                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 112);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateNo", rm.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.FullName);
                            CommonUtility.sendEmailViaWebApi(rm.SenderEmailId, "Application Form  - Candidate Edit Completed", EmailBody); //NEED TO OPEN
                            //IDbConnection db =base.GetConnection();
                            //db.Open();
                            //CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 41, 118, rm.SenderEmailId, EmailBody, "Application Form  - Candidate Edit Completed", Convert.ToInt32(formData.CreatedBy));
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
        public async Task<ReturnMessage> Insertcandidateprofileupdateppf(CandidateProfileFormDataCopy formData)
        {
            try
            {
                DataTable dtFMBack = CommonUtility.ToDataTable<FamilyBackgound>(formData.FamilyBackGroundDetails);
                DataTable dtMRFRelation = CommonUtility.ToDataTable<MRFRelationShip>(formData.MRFRelationShipDetails);
                DataTable dtTyreCompanyRelation = CommonUtility.ToDataTable<TyreCompanyRelation>(formData.TyreCompanyRelationShipDetails);
                DataTable dtAcademic = CommonUtility.ToDataTable<Academic>(formData.AcademicDetails);
                DataTable dtCertification = CommonUtility.ToDataTable<Certification>(formData.CertificationDetails);
                DataTable dtMembership = CommonUtility.ToDataTable<Membership>(formData.MembershipDetails);
                DataTable dtExtraCarricular = CommonUtility.ToDataTable<ExtraCarricularActivities>(formData.ExtraCarricularActivitiesDetails);
                DataTable dtLanguageKnown = CommonUtility.ToDataTable<LanguageKnown>(formData.LanguageKnownDetails);
                DataTable dtPreviousAssignment = CommonUtility.ToDataTable<PeviousAssignment>(formData.PeviousAssignmentDetails);
                DataTable dtMRFPreInterview = CommonUtility.ToDataTable<MRFPreInterview>(formData.MRFPreInterviewDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateProfileId", formData.CandidateProfileId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@CandiadatePhoto", formData.CandiadatePhoto);
                    para.Add("@PositionAppliedFor", formData.PositionAppliedFor);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@Age", formData.Age);
                    para.Add("@CommunicationAddress", formData.CommunicationAddress);
                    para.Add("@CommunicationState", formData.CommunicationStateId);
                    para.Add("@CommunicationCountry", formData.CommunicationCountryId);
                    para.Add("@CommunicationPin", formData.CommunicationPin);
                    para.Add("@CommunicationPhoneNo", formData.CommunicationPhoneNo);
                    para.Add("@CommunicationAlternativeContactNo", formData.CommunicationAlternativeContactNo);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PermanentAddress", formData.PermanentAddress);
                    para.Add("@PermanentState", formData.PermanentStateId);
                    para.Add("@PermanentCountry", formData.PermanentCountryId);
                    para.Add("@PermanentPin", formData.PermanentPin);
                    para.Add("@PermanentPhone", formData.PermanentPhone);
                    para.Add("@PermanentHomeTown", formData.PermanentHomeTown);
                    para.Add("@PermanentNativeState", formData.PermanentNativeStateId);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@UANNO", formData.UANNO);
                    para.Add("@PANNo", formData.PANNo);
                    para.Add("@Nationality", formData.NationalityId);
                    para.Add("@Religion", formData.ReligionId);
                    para.Add("@Caste", formData.CasteId);
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    para.Add("@BloodGroup", formData.BloodGroupId);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@EyeSightRight", formData.EyeSightRight);
                    para.Add("@EyeSightLeft", formData.EyeSightLeft);
                    para.Add("@CronicMajorIllness", formData.CronicMajorIllness);
                    para.Add("@CronicMajorIllnessDetails", formData.CronicMajorIllnessDetails);
                    para.Add("@HandiCap", formData.HandiCap);
                    para.Add("@HandiCapDetails", formData.HandiCapDetails);
                    para.Add("@IdentificationMarks1", formData.IdentificationMarks1);
                    para.Add("@IdentificationMarks2", formData.IdentificationMarks2);
                    para.Add("@FamilyBackGround", dtFMBack, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MRFRealtives", formData.MRFRealtives);
                    para.Add("@MRFRelation", dtMRFRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@TyreCompanyRealtionShip", formData.TyreCompanyRealtionShip);
                    para.Add("@TyreCompanyRelation", dtTyreCompanyRelation, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Academic", dtAcademic, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@ReasonforGap", formData.ReasonforGap);
                    para.Add("@CertificationDetails", dtCertification, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@MembershipDetails", dtMembership, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@DetailsofPublication", formData.DetailsofPublication);
                    para.Add("@ExtraCarricularActivities", dtExtraCarricular, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@LanguageKnown", dtLanguageKnown, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreOrganisationName", formData.PreOrganisationName);
                    para.Add("@PreOrganisationAddress", formData.PreOrganisationAddress);
                    para.Add("@PreOrganisationTurnOver", formData.PreOrganisationTurnOver);
                    para.Add("@PreOrganisationMainProduct", formData.PreOrganisationMainProduct);
                    para.Add("@PreOrganisationJoinedas", formData.PreOrganisationJoinedas);
                    para.Add("@PreOrganisationJoinDate", formData.PreOrganisationJoinDate);
                    para.Add("@PreOrganisationPresentPosition", formData.PreOrganisationPresentPosition);
                    para.Add("@PreOrganisationPresentPositionDate", formData.PreOrganisationPresentPositionDate);
                    para.Add("@PreOrganisationGap", formData.PreOrganisationGap);
                    para.Add("@PreOrganisationBasic", formData.PreOrganisationBasic);
                    para.Add("@PreOrganisationHRA", formData.PreOrganisationHRA);
                    para.Add("@PreOrganisationOtherAllowances", formData.PreOrganisationOtherAllowances);
                    para.Add("@PreOrganisationAnualComponents", formData.PreOrganisationAnualComponents);
                    para.Add("@PreOrganisationVariablePay", formData.PreOrganisationVariablePay);
                    para.Add("@PreOrganisationBenefits", formData.PreOrganisationBenefits);
                    para.Add("@PreOrganisationRetrial", formData.PreOrganisationRetrial);
                    para.Add("@PreOrganisationOthers", formData.PreOrganisationOthers);
                    para.Add("@PreOrganisationTotalCTC", formData.PreOrganisationTotalCTC);
                    para.Add("@PeviousAssignment", dtPreviousAssignment, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@PreviousAssignmentGap", formData.PreviousAssignmentGap);
                    para.Add("@Ref1Name", formData.Ref1Name);
                    para.Add("@Ref1Position", formData.Ref1Position);
                    para.Add("@Ref1Organisation", formData.Ref1Organisation);
                    para.Add("@Ref1Location", formData.Ref1Location);
                    para.Add("@Ref1ContactNo", formData.Ref1ContactNo);
                    para.Add("@Ref1EmailId", formData.Ref1EmailId);
                    para.Add("@Ref2Name", formData.Ref2Name);
                    para.Add("@Ref2Position", formData.Ref2Position);
                    para.Add("@Ref2Organisation", formData.Ref2Organisation);
                    para.Add("@Ref2Location", formData.Ref2Location);
                    para.Add("@Ref2ContactNo", formData.Ref2ContactNo);
                    para.Add("@Ref2EmailId", formData.Ref2EmailId);
                    para.Add("@Ref3Name", formData.Ref3Name);
                    para.Add("@Ref3Position", formData.Ref3Position);
                    para.Add("@Ref3Organisation", formData.Ref3Organisation);
                    para.Add("@Ref3Location", formData.Ref3Location);
                    para.Add("@Ref3ContactNo", formData.Ref3ContactNo);
                    para.Add("@Ref3EmailId", formData.Ref3EmailId);
                    para.Add("@PreInterViewMRF", formData.PreInterViewMRF);
                    para.Add("@MRFPreInterviewDetails", dtMRFPreInterview, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CriminalCase", formData.CriminalCase);
                    para.Add("@CriminalCaseDetails", formData.CriminalCaseDetails);
                    para.Add("@PreviousEmployemntEnquiry", formData.PreviousEmployemntEnquiry);
                    para.Add("@PreviousEmployemntEnquiryDetails", formData.PreviousEmployemntEnquiryDetails);
                    para.Add("@AdditionoalDetails", formData.AdditionoalDetails);
                    para.Add("@JobPortal", formData.JobPortal);
                    para.Add("@LinkedIn", formData.LinkedIn);
                    para.Add("@CareerSite", formData.CareerSite);
                    para.Add("@PaperAdvertisement", formData.PaperAdvertisement);
                    para.Add("@EmployeeReferal", formData.EmployeeReferal);
                    para.Add("@RefNameofEmployee", formData.RefNameofEmployee);
                    para.Add("@RefEmployeeId", formData.RefEmployeeId);
                    para.Add("@RefEmployeeDesignation", formData.RefEmployeeDesignation);
                    para.Add("@RefEmployeeLocation", formData.RefEmployeeLocation);
                    para.Add("@RefEmployeeFunction", formData.RefEmployeeFunction);
                    para.Add("@RefEmployeeKnowing", formData.RefEmployeeKnowing);
                    para.Add("@ConsultantApplicable", formData.ConsultantApplicable);
                    para.Add("@Consultant", formData.Consultant);
                    para.Add("@OtherSource", formData.OtherSource);
                    para.Add("@expectedCTC", formData.expectedCTC);
                    para.Add("@joiningDaysRequired", formData.joiningDaysRequired);
                    para.Add("@joiningComments", formData.joiningComments);
                    para.Add("@SignatureDate", formData.SignatureDate);
                    para.Add("@SignaturePlace", formData.SignaturePlace);
                    para.Add("@Signature", formData.Signature);

                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@SubmitStatus", formData.SubmitStatus);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    //  const string procName = "Usp_CandidateProfile_InsertUpdate";
                    const string procName = "Usp_CandidateApplicationForm_InsertUpdate";
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
        public async Task<CandidateProfile> GetCandidateProfile(SearchCandidateProfile search)
        {
            try
            {
                CandidateProfile dataList = new CandidateProfile();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateProfileId", search.CandidateProfileId);
                    const string procName = "Usp_CandidateProfile_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateProfileData = returnList.Read<CandidateProfileFormMasterData>().FirstOrDefault();
                    dataList.FamilyBackGroundDetails = returnList.Read<FamilyBackgound>().ToList();
                    dataList.MRFRelationShipDetails = returnList.Read<MRFRelationShip>().ToList();
                    dataList.TyreCompanyRelationShipDetails = returnList.Read<TyreCompanyRelation>().ToList();
                    dataList.AcademicDetails = returnList.Read<Academic>().ToList();
                    dataList.CertificationDetails = returnList.Read<Certification>().ToList();
                    dataList.MembershipDetails = returnList.Read<Membership>().ToList();
                    dataList.ExtraCarricularActivitiesDetails = returnList.Read<ExtraCarricularActivities>().ToList();
                    dataList.LanguageKnownDetails = returnList.Read<LanguageKnown>().ToList();
                    dataList.PeviousAssignmentDetails = returnList.Read<PeviousAssignment>().ToList();
                    dataList.MRFPreInterviewDetails = returnList.Read<MRFPreInterview>().ToList();

                    String ContainerReference = "candidateprofile";
                    if (dataList.CandidateProfileData.Signature != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.CandidateProfileData.Signature);
                        string CandiadateSignature = DownloadedFile(SignatureName, ContainerReference);
                        dataList.CandidateProfileData.Signature = CandiadateSignature;
                    }
                    if (dataList.CandidateProfileData.CandiadatePhoto != "")
                    {
                        string CandiadatePhotoName = Path.GetFileName(dataList.CandidateProfileData.CandiadatePhoto);
                        string CandiadatePhoto = DownloadedFile(CandiadatePhotoName, ContainerReference);
                        dataList.CandidateProfileData.CandiadatePhoto = CandiadatePhoto;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CampusCandidateProfile> GetCampusCandidateProfile(SearchCandidateProfile search)
        {
            try
            {
                CampusCandidateProfile dataList = new CampusCandidateProfile();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateProfileId", search.CandidateProfileId);
                    const string procName = "Usp_CampusCandidateProfile_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateProfileData = returnList.Read<CampusCandidateProfileFormMasterData>().FirstOrDefault();
                    dataList.FamilyBackGroundDetails = returnList.Read<FamilyBackgound>().ToList();
                    dataList.MRFRelationShipDetails = returnList.Read<MRFRelationShip>().ToList();
                    dataList.TyreCompanyRelationShipDetails = returnList.Read<TyreCompanyRelation>().ToList();
                    dataList.AcademicDetails = returnList.Read<Academic>().ToList();
                    dataList.CertificationDetails = returnList.Read<Certification>().ToList();
                    dataList.MembershipDetails = returnList.Read<Membership>().ToList();
                    dataList.ExtraCarricularActivitiesDetails = returnList.Read<ExtraCarricularActivities>().ToList();
                    dataList.LanguageKnownDetails = returnList.Read<LanguageKnown>().ToList();
                    dataList.PeviousAssignmentDetails = returnList.Read<PeviousAssignment>().ToList();
                    dataList.MRFPreInterviewDetails = returnList.Read<MRFPreInterview>().ToList();

                    String ContainerReference = "candidateprofile";
                    if (dataList.CandidateProfileData.Signature != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.CandidateProfileData.Signature);
                        string CandiadateSignature = DownloadedFile(SignatureName, ContainerReference);
                        dataList.CandidateProfileData.Signature = CandiadateSignature;
                    }
                    if (dataList.CandidateProfileData.CandiadatePhoto != "")
                    {
                        string CandiadatePhotoName = Path.GetFileName(dataList.CandidateProfileData.CandiadatePhoto);
                        string CandiadatePhoto = DownloadedFile(CandiadatePhotoName, ContainerReference);
                        dataList.CandidateProfileData.CandiadatePhoto = CandiadatePhoto;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CandidateProfileCopy> GetCandidateProfileApplication(SearchCandidateProfile search)
        {
            try
            {
                CandidateProfileCopy dataList = new CandidateProfileCopy();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateProfileId", search.CandidateProfileId);
                    //const string procName = "Usp_CandidateProfile_GetAll";
                    const string procName = "Usp_CandidateProfileApplicationForm_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateProfileData = returnList.Read<CandidateProfileFormMasterDataCopy>().FirstOrDefault();
                    dataList.FamilyBackGroundDetails = returnList.Read<FamilyBackgound>().ToList();
                    dataList.MRFRelationShipDetails = returnList.Read<MRFRelationShip>().ToList();
                    dataList.TyreCompanyRelationShipDetails = returnList.Read<TyreCompanyRelation>().ToList();
                    dataList.AcademicDetails = returnList.Read<Academic>().ToList();
                    dataList.CertificationDetails = returnList.Read<Certification>().ToList();
                    dataList.MembershipDetails = returnList.Read<Membership>().ToList();
                    dataList.ExtraCarricularActivitiesDetails = returnList.Read<ExtraCarricularActivities>().ToList();
                    dataList.LanguageKnownDetails = returnList.Read<LanguageKnown>().ToList();
                    dataList.PeviousAssignmentDetails = returnList.Read<PeviousAssignment>().ToList();
                    dataList.MRFPreInterviewDetails = returnList.Read<MRFPreInterview>().ToList();
                    //if (dataList.CandidateProfileData!=null)
                    //{
                    //    if (dataList.CandidateProfileData.MRFRealtives == 'false')
                    //    {

                    //    }

                    //}

                    String ContainerReference = "candidateprofile";
                    if (dataList.CandidateProfileData.Signature != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.CandidateProfileData.Signature);
                        string CandiadateSignature = DownloadedFile(SignatureName, ContainerReference);
                        dataList.CandidateProfileData.Signature = CandiadateSignature;
                    }
                    if (dataList.CandidateProfileData.CandiadatePhoto != "")
                    {
                        string CandiadatePhotoName = Path.GetFileName(dataList.CandidateProfileData.CandiadatePhoto);
                        string CandiadatePhoto = DownloadedFile(CandiadatePhotoName, ContainerReference);
                        dataList.CandidateProfileData.CandiadatePhoto = CandiadatePhoto;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<CampusCandidateProfileCopy> GetCampusCandidateProfileApplication(SearchCandidateProfile search)
        {
            try
            {
                CampusCandidateProfileCopy dataList = new CampusCandidateProfileCopy();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateProfileId", search.CandidateProfileId);
                    //const string procName = "Usp_CandidateProfile_GetAll";
                    const string procName = "Usp_CampusCandidateProfileApplicationForm_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CandidateProfileData = returnList.Read<CampusCandidateProfileFormMasterDataCopy>().FirstOrDefault(); //added later on 04-12-2023
                    dataList.FamilyBackGroundDetails = returnList.Read<FamilyBackgound>().ToList();
                    dataList.MRFRelationShipDetails = returnList.Read<MRFRelationShip>().ToList();
                    dataList.TyreCompanyRelationShipDetails = returnList.Read<TyreCompanyRelation>().ToList();
                    dataList.AcademicDetails = returnList.Read<Academic>().ToList();
                    dataList.CertificationDetails = returnList.Read<Certification>().ToList();
                    dataList.MembershipDetails = returnList.Read<Membership>().ToList();
                    dataList.ExtraCarricularActivitiesDetails = returnList.Read<ExtraCarricularActivities>().ToList();
                    dataList.LanguageKnownDetails = returnList.Read<LanguageKnown>().ToList();
                    dataList.PeviousAssignmentDetails = returnList.Read<PeviousAssignment>().ToList();
                    dataList.MRFPreInterviewDetails = returnList.Read<MRFPreInterview>().ToList();
                    //if (dataList.CandidateProfileData!=null)
                    //{
                    //    if (dataList.CandidateProfileData.MRFRealtives == 'false')
                    //    {

                    //    }

                    //}

                    String ContainerReference = "candidateprofile";
                    if (dataList.CandidateProfileData.Signature != "")
                    {
                        string SignatureName = Path.GetFileName(dataList.CandidateProfileData.Signature);
                        string CandiadateSignature = DownloadedFile(SignatureName, ContainerReference);
                        dataList.CandidateProfileData.Signature = CandiadateSignature;
                    }
                    if (dataList.CandidateProfileData.CandiadatePhoto != "")
                    {
                        string CandiadatePhotoName = Path.GetFileName(dataList.CandidateProfileData.CandiadatePhoto);
                        string CandiadatePhoto = DownloadedFile(CandiadatePhotoName, ContainerReference);
                        dataList.CandidateProfileData.CandiadatePhoto = CandiadatePhoto;
                    }

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UpdateCandidateProfileStatus(CandidateProfileAStatusFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@IsEnabled", formData.IsEnabled);
                    const string procName = "Usp_CandidateProfile_Enable";
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

