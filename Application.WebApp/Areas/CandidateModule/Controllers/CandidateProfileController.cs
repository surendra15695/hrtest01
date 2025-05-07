using Application.Entity.Entities.CandidateModule;
using Application.Service.Services.Interfaces.CandidateModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
//using System.Threading.Tasks;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Dynamic;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.Data;

namespace Application.WebApp.Areas.CandidateModule.Controllers
{
    [Route("api/candidateprofile")]
    [ApiController]
    public class CandidateProfileController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICandidateProfileService candidateprofileService;
        public CandidateProfileController(ICandidateProfileService candidateprofileService, IWebHostEnvironment environment)
        {
            this.candidateprofileService = candidateprofileService;
            this.environment = environment;
        }


        //uat
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        //live
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");
        public string ContainerReference = null;
        string fileName = "";

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.candidateprofileService.CloudStorageAccountname();
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(cloudStorageAccountname.ToString());
            var CloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            var cloudBlobContainer = CloudBlobClient.GetContainerReference(ContainerReference);
            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Off });
            }
            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
            cloudBlockBlob.Properties.ContentType = file.ContentType;
            await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream());
        }

        [HttpPost]
        [Route("insertcandidateprofile")]
        public async Task<IActionResult> InsertCandidateProfile(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                //ContainerReference = "candidateprofile";
                string fileImage = "";
                string fileSignature = "";
                string FileDataName = "";
                string htmlfile = "";
                CandidateProfileFormDataCopy formData = new CandidateProfileFormDataCopy();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                //string FName = "";
                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;

                    if (FileDataName.Contains("CandidateSignature"))
                    {

                        var timestamp = DateTime.Now.ToFileTime();
                        ContainerReference = "candidateprofile";
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileSignature = Path.Combine("/candidateprofile", fileName);
                        fileSignature = fileSignature.Replace("\\", "/");

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                    else if (FileDataName.Contains("htmlfile"))
                    {
                        ContainerReference = "candidatedocument";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        //fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        fileName = timestampfilename + "_" + formData.CandidateId.ToString()+"_" + "ApplicationForm.pdf";
                        htmlfile = "/candidatedocument/"+ fileName;
                        htmlfile = htmlfile.Replace("\\", "/");
                        formData.Htmlfilepath = htmlfile;
                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                    else
                    {
                        ContainerReference = "candidateprofile";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileImage = Path.Combine("/candidateprofile", fileName);
                        fileImage = fileImage.Replace("\\", "/");

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                }

                
                
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.FullName = data["FullName"];
                if (fileImage == "")
                {
                    formData.CandiadatePhoto = "";
                }
                else
                {
                    formData.CandiadatePhoto = fileImage;
                }

               
                formData.PositionAppliedFor = data["PositionAppliedFor"];
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.CommunicationAddress = data["CommunicationAddress"];
                formData.CommunicationStateId = Convert.ToInt32(data["CommunicationStateId"]);
                formData.CommunicationCountryId = Convert.ToInt32(data["CommunicationCountryId"]);
                formData.CommunicationPin = data["CommunicationPin"];
                formData.CommunicationPhoneNo = data["CommunicationPhoneNo"];
                formData.CommunicationAlternativeContactNo = data["CommunicationAlternativeContactNo"];
                formData.EmailId = data["EmailId"];
                formData.PermanentAddress = data["PermanentAddress"];
                formData.PermanentStateId = Convert.ToInt32(data["PermanentStateId"]);
                formData.PermanentCountryId = Convert.ToInt32(data["PermanentCountryId"]);
                formData.PermanentPin = data["PermanentPin"];
                formData.PermanentPhone = data["PermanentPhone"];
                formData.PermanentHomeTown = data["PermanentHomeTown"];
                formData.PermanentNativeStateId = Convert.ToInt32(data["PermanentNativeStateId"]);
                formData.AadharNo = data["AadharNo"];
                formData.UANNO = data["UANNO"];
                formData.PANNo = data["PANNo"];
                formData.NationalityId = Convert.ToInt32(data["NationalityId"]);
                formData.ReligionId = Convert.ToInt32(data["ReligionId"]);
                formData.CasteId = Convert.ToInt32(data["CasteId"]);
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.BloodGroupId = Convert.ToInt32(data["BloodGroupId"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["EyeSightRight"];
                formData.EyeSightLeft = data["EyeSightLeft"];
                formData.CronicMajorIllness = Convert.ToBoolean(data["CronicMajorIllness"]);
                formData.CronicMajorIllnessDetails = data["CronicMajorIllnessDetails"];
                formData.HandiCap = Convert.ToBoolean(data["HandiCap"]);
                formData.HandiCapDetails = data["HandiCapDetails"];
                formData.IdentificationMarks1 = data["IdentificationMarks1"];
                formData.IdentificationMarks2 = data["IdentificationMarks2"];
                string FamilyBackgound = data["FamilyBackGroundDetails"];
                formData.FamilyBackGroundDetails = JsonConvert.DeserializeObject<List<FamilyBackgound>>(FamilyBackgound);
                //formData.MRFRealtives = Convert.ToBoolean(data["MRFRealtives"]);
                formData.MRFRealtives = data["MRFRealtives"];
                string MRFRelation = data["MRFRelation"];
                formData.MRFRelationShipDetails = JsonConvert.DeserializeObject<List<MRFRelationShip>>(MRFRelation);
                //formData.TyreCompanyRealtionShip = Convert.ToBoolean(data["TyreCompanyRealtionShip"]);
                formData.TyreCompanyRealtionShip =data["TyreCompanyRealtionShip"];
                string TyreCompanyRelation = data["TyreCompanyRelationShipDetails"];
                formData.TyreCompanyRelationShipDetails = JsonConvert.DeserializeObject<List<TyreCompanyRelation>>(TyreCompanyRelation);
                string Academic = data["AcademicDetails"];
                formData.AcademicDetails = JsonConvert.DeserializeObject<List<Academic>>(Academic);
                formData.ReasonforGap = data["ReasonforGap"];
                string Certification = data["CertificationDetails"];
                formData.CertificationDetails = JsonConvert.DeserializeObject<List<Certification>>(Certification);
                string Membership = data["MembershipDetails"];
                formData.MembershipDetails = JsonConvert.DeserializeObject<List<Membership>>(Membership);
                formData.DetailsofPublication = data["DetailsofPublication"];
                string ExtraCarriculars = data["ExtraCarricularActivitiesDetails"];
                formData.ExtraCarricularActivitiesDetails = JsonConvert.DeserializeObject<List<ExtraCarricularActivities>>(ExtraCarriculars);
                string LanguageKnown = data["LanguageKnownDetails"];
                formData.LanguageKnownDetails = JsonConvert.DeserializeObject<List<LanguageKnown>>(LanguageKnown);
                formData.PreOrganisationName = data["PreOrganisationName"];
                formData.PreOrganisationAddress = data["PreOrganisationAddress"];
                formData.PreOrganisationTurnOver = Convert.ToDecimal(data["PreOrganisationTurnOver"]);
                formData.PreOrganisationMainProduct = data["PreOrganisationMainProduct"];
                formData.PreOrganisationJoinedas = data["PreOrganisationJoinedas"];
                formData.PreOrganisationJoinDate = data["PreOrganisationJoinDate"];
                formData.PreOrganisationPresentPosition = data["PreOrganisationPresentPosition"];
                formData.PreOrganisationPresentPositionDate = data["PreOrganisationPresentPositionDate"];
                formData.PreOrganisationGap = data["PreOrganisationGap"];
                formData.PreOrganisationBasic = Convert.ToDecimal(data["PreOrganisationBasic"]);
                formData.PreOrganisationHRA = Convert.ToDecimal(data["PreOrganisationHRA"]);
                formData.PreOrganisationOtherAllowances = Convert.ToDecimal(data["PreOrganisationOtherAllowances"]);
                formData.PreOrganisationAnualComponents = Convert.ToDecimal(data["PreOrganisationAnualComponents"]);
                formData.PreOrganisationVariablePay = Convert.ToDecimal(data["PreOrganisationVariablePay"]);
                formData.PreOrganisationBenefits = Convert.ToDecimal(data["PreOrganisationBenefits"]);
                formData.PreOrganisationRetrial = Convert.ToDecimal(data["PreOrganisationRetrial"]);
                formData.PreOrganisationOthers = Convert.ToDecimal(data["PreOrganisationOthers"]);
                formData.PreOrganisationTotalCTC = Convert.ToDecimal(data["PreOrganisationTotalCTC"]);
                string PeviousAssignment = data["PrePeviousAssignmentDetails"];
                formData.PeviousAssignmentDetails = JsonConvert.DeserializeObject<List<PeviousAssignment>>(PeviousAssignment);
                formData.PreviousAssignmentGap = data["PreviousAssignmentGap"];
                formData.Ref1Name = data["Ref1Name"];
                formData.Ref1Position = data["Ref1Position"];
                formData.Ref1Organisation = data["Ref1Organisation"];
                formData.Ref1Location = data["Ref1Location"];
                formData.Ref1ContactNo = data["Ref1ContactNo"];
                formData.Ref1EmailId = data["Ref1EmailId"];
                formData.Ref2Name = data["Ref2Name"];
                formData.Ref2Position = data["Ref2Position"];
                formData.Ref2Organisation = data["Ref2Organisation"];
                formData.Ref2Location = data["Ref2Location"];
                formData.Ref2ContactNo = data["Ref2ContactNo"];
                formData.Ref2EmailId = data["Ref2EmailId"];
                formData.Ref3Name = data["Ref3Name"];
                formData.Ref3Position = data["Ref3Position"];
                formData.Ref3Organisation = data["Ref3Organisation"];
                formData.Ref3Location = data["Ref3Location"];
                formData.Ref3ContactNo = data["Ref3ContactNo"];
                formData.Ref3EmailId = data["Ref3EmailId"];
                //formData.PreInterViewMRF = Convert.ToBoolean(data["PreInterViewMRF"]);
                formData.PreInterViewMRF = data["PreInterViewMRF"];
                string MRFPreInterview = data["MRFPreInterviewDetails"];
                formData.MRFPreInterviewDetails = JsonConvert.DeserializeObject<List<MRFPreInterview>>(MRFPreInterview);
               //formData.CriminalCase = Convert.ToBoolean(data["CriminalCase"]);
                formData.CriminalCase = data["CriminalCase"];
                formData.CriminalCaseDetails = data["CriminalCaseDetails"];
              //  formData.PreviousEmployemntEnquiry = Convert.ToBoolean(data["PreviousEmployemntEnquiry"]);
                formData.PreviousEmployemntEnquiry = data["PreviousEmployemntEnquiry"];
                formData.PreviousEmployemntEnquiryDetails = data["PreviousEmployemntEnquiryDetails"];
                formData.AdditionoalDetails = data["AdditionoalDetails"];
                formData.JobPortal = Convert.ToBoolean(data["JobPortal"]);
                formData.LinkedIn = Convert.ToBoolean(data["LinkedIn"]);
                formData.CareerSite = Convert.ToBoolean(data["CareerSite"]);
                formData.PaperAdvertisement = Convert.ToBoolean(data["PaperAdvertisement"]);
                formData.EmployeeReferal = Convert.ToBoolean(data["EmployeeReferal"]);
                formData.RefNameofEmployee = data["RefNameofEmployee"];
                formData.RefEmployeeId = data["RefEmployeeId"];
                formData.RefEmployeeDesignation = data["RefEmployeeDesignation"];
                formData.RefEmployeeLocation = data["RefEmployeeLocation"];
                formData.RefEmployeeFunction = data["RefEmployeeFunction"];
                formData.RefEmployeeKnowing = data["RefEmployeeKnowing"];
                formData.ConsultantApplicable = Convert.ToBoolean(data["ConsultantApplicable"]);
                formData.Consultant = Convert.ToInt32(data["Consultant"]);
                formData.OtherSource = data["OtherSource"];
                formData.expectedCTC = Convert.ToDecimal(data["expectedCTC"]);
                formData.joiningDaysRequired = Convert.ToInt32(data["joiningDaysRequired"]);
                formData.joiningComments = data["joiningComments"];
                formData.SignatureDate = data["SignatureDate"];
                formData.SignaturePlace = data["SignaturePlace"];
                formData.Signature = fileSignature;
                formData.CreatedBy = data["CreatedBy"];
                formData.SubmitStatus = Convert.ToInt32(data["SubmitStatus"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                formData.IsInternalRef = Convert.ToBoolean(data["IsInternalRef"]);
                formData.InternalRefName = data["InternalRefName"];

                var response = await this.candidateprofileService.SaveCandidateProfileApplicationForm(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("insertcampuscandidateprofile")]
        public async Task<IActionResult> InsertCampusCandidateProfile(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                //ContainerReference = "candidateprofile";
                string fileImage = "";
                string fileSignature = "";
                string FileDataName = "";
                string htmlfile = "";
                CandidateProfileFormDataCopyFOrCampus formData = new CandidateProfileFormDataCopyFOrCampus();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                //string FName = "";
                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;

                    if (FileDataName.Contains("CandidateSignature"))
                    {

                        var timestamp = DateTime.Now.ToFileTime();
                        ContainerReference = "candidateprofile";
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileSignature = Path.Combine("/candidateprofile", fileName);
                        fileSignature = fileSignature.Replace("\\", "/");

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                    else if (FileDataName.Contains("htmlfile"))
                    {
                        ContainerReference = "candidatedocument";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        //fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        fileName = timestampfilename + "_" + formData.CandidateId.ToString() + "_" + "ApplicationForm.pdf";
                        htmlfile = "/candidatedocument/" + fileName;
                        htmlfile = htmlfile.Replace("\\", "/");
                        formData.Htmlfilepath = htmlfile;
                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                    else
                    {
                        ContainerReference = "candidateprofile";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileImage = Path.Combine("/candidateprofile", fileName);
                        fileImage = fileImage.Replace("\\", "/");

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                }



                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.FullName = data["FullName"];
                if (fileImage == "")
                {
                    formData.CandiadatePhoto = "";
                }
                else
                {
                    formData.CandiadatePhoto = fileImage;
                }


                formData.PositionAppliedFor = data["PositionAppliedFor"];
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.CommunicationAddress = data["CommunicationAddress"];
                formData.CommunicationStateId = Convert.ToInt32(data["CommunicationStateId"]);
                formData.CommunicationCountryId = Convert.ToInt32(data["CommunicationCountryId"]);
                formData.CommunicationPin = data["CommunicationPin"];
                formData.CommunicationPhoneNo = data["CommunicationPhoneNo"];
                formData.CommunicationAlternativeContactNo = data["CommunicationAlternativeContactNo"];
                formData.EmailId = data["EmailId"];
                formData.PermanentAddress = data["PermanentAddress"];
                formData.PermanentStateId = Convert.ToInt32(data["PermanentStateId"]);
                formData.PermanentCountryId = Convert.ToInt32(data["PermanentCountryId"]);
                formData.PermanentPin = data["PermanentPin"];
                formData.PermanentPhone = data["PermanentPhone"];
                formData.PermanentHomeTown = data["PermanentHomeTown"];
                formData.PermanentNativeStateId = Convert.ToInt32(data["PermanentNativeStateId"]);
                formData.AadharNo = data["AadharNo"];
                formData.UANNO = data["UANNO"];
                formData.PANNo = data["PANNo"];
                formData.NationalityId = Convert.ToInt32(data["NationalityId"]);
                formData.ReligionId = Convert.ToInt32(data["ReligionId"]);
                formData.CasteId = Convert.ToInt32(data["CasteId"]);
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.BloodGroupId = Convert.ToInt32(data["BloodGroupId"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["EyeSightRight"];
                formData.EyeSightLeft = data["EyeSightLeft"];
                formData.CronicMajorIllness = Convert.ToBoolean(data["CronicMajorIllness"]);
                formData.CronicMajorIllnessDetails = data["CronicMajorIllnessDetails"];
                formData.HandiCap = Convert.ToBoolean(data["HandiCap"]);
                formData.HandiCapDetails = data["HandiCapDetails"];
                formData.IdentificationMarks1 = data["IdentificationMarks1"];
                formData.IdentificationMarks2 = data["IdentificationMarks2"];
                string FamilyBackgound = data["FamilyBackGroundDetails"];
                formData.FamilyBackGroundDetails = JsonConvert.DeserializeObject<List<FamilyBackgound>>(FamilyBackgound);
                //formData.MRFRealtives = Convert.ToBoolean(data["MRFRealtives"]);
                formData.MRFRealtives = data["MRFRealtives"];
                string MRFRelation = data["MRFRelation"];
                formData.MRFRelationShipDetails = JsonConvert.DeserializeObject<List<MRFRelationShip>>(MRFRelation);
                //formData.TyreCompanyRealtionShip = Convert.ToBoolean(data["TyreCompanyRealtionShip"]);
                formData.TyreCompanyRealtionShip = data["TyreCompanyRealtionShip"];
                string TyreCompanyRelation = data["TyreCompanyRelationShipDetails"];
                formData.TyreCompanyRelationShipDetails = JsonConvert.DeserializeObject<List<TyreCompanyRelation>>(TyreCompanyRelation);
                string Academic = data["AcademicDetails"];
                formData.AcademicDetails = JsonConvert.DeserializeObject<List<Academic>>(Academic);
                formData.ReasonforGap = data["ReasonforGap"];
                string Certification = data["CertificationDetails"];
                formData.CertificationDetails = JsonConvert.DeserializeObject<List<Certification>>(Certification);
                string Membership = data["MembershipDetails"];
                formData.MembershipDetails = JsonConvert.DeserializeObject<List<Membership>>(Membership);
                formData.DetailsofPublication = data["DetailsofPublication"];
                string ExtraCarriculars = data["ExtraCarricularActivitiesDetails"];
                formData.ExtraCarricularActivitiesDetails = JsonConvert.DeserializeObject<List<ExtraCarricularActivities>>(ExtraCarriculars);
                string LanguageKnown = data["LanguageKnownDetails"];
                formData.LanguageKnownDetails = JsonConvert.DeserializeObject<List<LanguageKnown>>(LanguageKnown);
                formData.PreOrganisationName = data["PreOrganisationName"];
                formData.PreOrganisationAddress = data["PreOrganisationAddress"];
                formData.PreOrganisationTurnOver = Convert.ToDecimal(data["PreOrganisationTurnOver"]);
                formData.PreOrganisationMainProduct = data["PreOrganisationMainProduct"];
                formData.PreOrganisationJoinedas = data["PreOrganisationJoinedas"];
                formData.PreOrganisationJoinDate = data["PreOrganisationJoinDate"];
                formData.PreOrganisationPresentPosition = data["PreOrganisationPresentPosition"];
                formData.PreOrganisationPresentPositionDate = data["PreOrganisationPresentPositionDate"];
                formData.PreOrganisationGap = data["PreOrganisationGap"];
                formData.PreOrganisationBasic = Convert.ToDecimal(data["PreOrganisationBasic"]);
                formData.PreOrganisationHRA = Convert.ToDecimal(data["PreOrganisationHRA"]);
                formData.PreOrganisationOtherAllowances = Convert.ToDecimal(data["PreOrganisationOtherAllowances"]);
                formData.PreOrganisationAnualComponents = Convert.ToDecimal(data["PreOrganisationAnualComponents"]);
                formData.PreOrganisationVariablePay = Convert.ToDecimal(data["PreOrganisationVariablePay"]);
                formData.PreOrganisationBenefits = Convert.ToDecimal(data["PreOrganisationBenefits"]);
                formData.PreOrganisationRetrial = Convert.ToDecimal(data["PreOrganisationRetrial"]);
                formData.PreOrganisationOthers = Convert.ToDecimal(data["PreOrganisationOthers"]);
                formData.PreOrganisationTotalCTC = Convert.ToDecimal(data["PreOrganisationTotalCTC"]);
                string PeviousAssignment = data["PrePeviousAssignmentDetails"];
                formData.PeviousAssignmentDetails = JsonConvert.DeserializeObject<List<PeviousAssignment>>(PeviousAssignment);
                formData.PreviousAssignmentGap = data["PreviousAssignmentGap"];
                formData.Ref1Name = data["Ref1Name"];
                formData.Ref1Position = data["Ref1Position"];
                formData.Ref1Organisation = data["Ref1Organisation"];
                formData.Ref1Location = data["Ref1Location"];
                formData.Ref1ContactNo = data["Ref1ContactNo"];
                formData.Ref1EmailId = data["Ref1EmailId"];
                formData.Ref2Name = data["Ref2Name"];
                formData.Ref2Position = data["Ref2Position"];
                formData.Ref2Organisation = data["Ref2Organisation"];
                formData.Ref2Location = data["Ref2Location"];
                formData.Ref2ContactNo = data["Ref2ContactNo"];
                formData.Ref2EmailId = data["Ref2EmailId"];
                formData.Ref3Name = data["Ref3Name"];
                formData.Ref3Position = data["Ref3Position"];
                formData.Ref3Organisation = data["Ref3Organisation"];
                formData.Ref3Location = data["Ref3Location"];
                formData.Ref3ContactNo = data["Ref3ContactNo"];
                formData.Ref3EmailId = data["Ref3EmailId"];
                //formData.PreInterViewMRF = Convert.ToBoolean(data["PreInterViewMRF"]);
                formData.PreInterViewMRF = data["PreInterViewMRF"];
                string MRFPreInterview = data["MRFPreInterviewDetails"];
                formData.MRFPreInterviewDetails = JsonConvert.DeserializeObject<List<MRFPreInterview>>(MRFPreInterview);
                //formData.CriminalCase = Convert.ToBoolean(data["CriminalCase"]);
                formData.CriminalCase = data["CriminalCase"];
                formData.CriminalCaseDetails = data["CriminalCaseDetails"];
                //  formData.PreviousEmployemntEnquiry = Convert.ToBoolean(data["PreviousEmployemntEnquiry"]);
                formData.PreviousEmployemntEnquiry = data["PreviousEmployemntEnquiry"];
                formData.PreviousEmployemntEnquiryDetails = data["PreviousEmployemntEnquiryDetails"];
                formData.AdditionoalDetails = data["AdditionoalDetails"];
                formData.JobPortal = Convert.ToBoolean(data["JobPortal"]);
                formData.CampusPlacement = Convert.ToBoolean(data["CampusPlacement"]);
                formData.LinkedIn = Convert.ToBoolean(data["LinkedIn"]);
                formData.CareerSite = Convert.ToBoolean(data["CareerSite"]);
                formData.PaperAdvertisement = Convert.ToBoolean(data["PaperAdvertisement"]);
                formData.EmployeeReferal = Convert.ToBoolean(data["EmployeeReferal"]);
                formData.RefNameofEmployee = data["RefNameofEmployee"];
                formData.RefEmployeeId = data["RefEmployeeId"];
                formData.RefEmployeeDesignation = data["RefEmployeeDesignation"];
                formData.RefEmployeeLocation = data["RefEmployeeLocation"];
                formData.RefEmployeeFunction = data["RefEmployeeFunction"];
                formData.RefEmployeeKnowing = data["RefEmployeeKnowing"];
                formData.ConsultantApplicable = Convert.ToBoolean(data["ConsultantApplicable"]);
                formData.Consultant = Convert.ToInt32(data["Consultant"]);
                formData.OtherSource = data["OtherSource"];
                formData.expectedCTC = Convert.ToDecimal(data["expectedCTC"]);
                formData.joiningDaysRequired = Convert.ToInt32(data["joiningDaysRequired"]);
                formData.joiningComments = data["joiningComments"];
                formData.SignatureDate = data["SignatureDate"];
                formData.SignaturePlace = data["SignaturePlace"];
                formData.Signature = fileSignature;
                formData.CreatedBy = data["CreatedBy"];
                formData.SubmitStatus = Convert.ToInt32(data["SubmitStatus"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);

                var response = await this.candidateprofileService.SaveCampusCandidateProfileApplicationForm(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        ///by sayandeep for MRF PPF

        [HttpPost]
        [Route("candidateprofileupdateppf")]
        public async Task<IActionResult> Insertcandidateprofileupdateppf(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                ContainerReference = "candidateprofile";
                string fileImage = "";
                string fileSignature = "";
                string FileDataName = "";
                //string FName = "";
                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;

                    if (FileDataName.Contains("CandidateSignature"))
                    {

                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileSignature = Path.Combine("/candidateprofile", fileName);
                        fileSignature = fileSignature.Replace("\\", "/");

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                    else
                    {
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileImage = Path.Combine("/candidateprofile", fileName);
                        fileImage = fileImage.Replace("\\", "/");

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[i].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[i]);
                            }
                        }
                    }
                }

                CandidateProfileFormDataCopy formData = new CandidateProfileFormDataCopy();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.FullName = data["FullName"];
                if (fileImage == "")
                {
                    formData.CandiadatePhoto = "";
                }
                else
                {
                    formData.CandiadatePhoto = fileImage;
                }
                formData.PositionAppliedFor = data["PositionAppliedFor"];
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.CommunicationAddress = data["CommunicationAddress"];
                formData.CommunicationStateId = Convert.ToInt32(data["CommunicationStateId"]);
                formData.CommunicationCountryId = Convert.ToInt32(data["CommunicationCountryId"]);
                formData.CommunicationPin = data["CommunicationPin"];
                formData.CommunicationPhoneNo = data["CommunicationPhoneNo"];
                formData.CommunicationAlternativeContactNo = data["CommunicationAlternativeContactNo"];
                formData.EmailId = data["EmailId"];
                formData.PermanentAddress = data["PermanentAddress"];
                formData.PermanentStateId = Convert.ToInt32(data["PermanentStateId"]);
                formData.PermanentCountryId = Convert.ToInt32(data["PermanentCountryId"]);
                formData.PermanentPin = data["PermanentPin"];
                formData.PermanentPhone = data["PermanentPhone"];
                formData.PermanentHomeTown = data["PermanentHomeTown"];
                formData.PermanentNativeStateId = Convert.ToInt32(data["PermanentNativeStateId"]);
                formData.AadharNo = data["AadharNo"];
                formData.UANNO = data["UANNO"];
                formData.PANNo = data["PANNo"];
                formData.NationalityId = Convert.ToInt32(data["NationalityId"]);
                formData.ReligionId = Convert.ToInt32(data["ReligionId"]);
                formData.CasteId = Convert.ToInt32(data["CasteId"]);
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.BloodGroupId = Convert.ToInt32(data["BloodGroupId"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["EyeSightRight"];
                formData.EyeSightLeft = data["EyeSightLeft"];
                formData.CronicMajorIllness = Convert.ToBoolean(data["CronicMajorIllness"]);
                formData.CronicMajorIllnessDetails = data["CronicMajorIllnessDetails"];
                formData.HandiCap = Convert.ToBoolean(data["HandiCap"]);
                formData.HandiCapDetails = data["HandiCapDetails"];
                formData.IdentificationMarks1 = data["IdentificationMarks1"];
                formData.IdentificationMarks2 = data["IdentificationMarks2"];
                string FamilyBackgound = data["FamilyBackGroundDetails"];
                formData.FamilyBackGroundDetails = JsonConvert.DeserializeObject<List<FamilyBackgound>>(FamilyBackgound);
                //formData.MRFRealtives = Convert.ToBoolean(data["MRFRealtives"]);
                formData.MRFRealtives = data["MRFRealtives"];
                string MRFRelation = data["MRFRelation"];
                formData.MRFRelationShipDetails = JsonConvert.DeserializeObject<List<MRFRelationShip>>(MRFRelation);
                //formData.TyreCompanyRealtionShip = Convert.ToBoolean(data["TyreCompanyRealtionShip"]);
                formData.TyreCompanyRealtionShip = data["TyreCompanyRealtionShip"];
                string TyreCompanyRelation = data["TyreCompanyRelationShipDetails"];
                formData.TyreCompanyRelationShipDetails = JsonConvert.DeserializeObject<List<TyreCompanyRelation>>(TyreCompanyRelation);
                string Academic = data["AcademicDetails"];
                formData.AcademicDetails = JsonConvert.DeserializeObject<List<Academic>>(Academic);
                formData.ReasonforGap = data["ReasonforGap"];
                string Certification = data["CertificationDetails"];
                formData.CertificationDetails = JsonConvert.DeserializeObject<List<Certification>>(Certification);
                string Membership = data["MembershipDetails"];
                formData.MembershipDetails = JsonConvert.DeserializeObject<List<Membership>>(Membership);
                formData.DetailsofPublication = data["DetailsofPublication"];
                string ExtraCarriculars = data["ExtraCarricularActivitiesDetails"];
                formData.ExtraCarricularActivitiesDetails = JsonConvert.DeserializeObject<List<ExtraCarricularActivities>>(ExtraCarriculars);
                string LanguageKnown = data["LanguageKnownDetails"];
                formData.LanguageKnownDetails = JsonConvert.DeserializeObject<List<LanguageKnown>>(LanguageKnown);
                formData.PreOrganisationName = data["PreOrganisationName"];
                formData.PreOrganisationAddress = data["PreOrganisationAddress"];
                formData.PreOrganisationTurnOver = Convert.ToDecimal(data["PreOrganisationTurnOver"]);
                formData.PreOrganisationMainProduct = data["PreOrganisationMainProduct"];
                formData.PreOrganisationJoinedas = data["PreOrganisationJoinedas"];
                formData.PreOrganisationJoinDate = data["PreOrganisationJoinDate"];
                formData.PreOrganisationPresentPosition = data["PreOrganisationPresentPosition"];
                formData.PreOrganisationPresentPositionDate = data["PreOrganisationPresentPositionDate"];
                formData.PreOrganisationGap = data["PreOrganisationGap"];
                formData.PreOrganisationBasic = Convert.ToDecimal(data["PreOrganisationBasic"]);
                formData.PreOrganisationHRA = Convert.ToDecimal(data["PreOrganisationHRA"]);
                formData.PreOrganisationOtherAllowances = Convert.ToDecimal(data["PreOrganisationOtherAllowances"]);
                formData.PreOrganisationAnualComponents = Convert.ToDecimal(data["PreOrganisationAnualComponents"]);
                formData.PreOrganisationVariablePay = Convert.ToDecimal(data["PreOrganisationVariablePay"]);
                formData.PreOrganisationBenefits = Convert.ToDecimal(data["PreOrganisationBenefits"]);
                formData.PreOrganisationRetrial = Convert.ToDecimal(data["PreOrganisationRetrial"]);
                formData.PreOrganisationOthers = Convert.ToDecimal(data["PreOrganisationOthers"]);
                formData.PreOrganisationTotalCTC = Convert.ToDecimal(data["PreOrganisationTotalCTC"]);
                string PeviousAssignment = data["PrePeviousAssignmentDetails"];
                formData.PeviousAssignmentDetails = JsonConvert.DeserializeObject<List<PeviousAssignment>>(PeviousAssignment);
                formData.PreviousAssignmentGap = data["PreviousAssignmentGap"];
                formData.Ref1Name = data["Ref1Name"];
                formData.Ref1Position = data["Ref1Position"];
                formData.Ref1Organisation = data["Ref1Organisation"];
                formData.Ref1Location = data["Ref1Location"];
                formData.Ref1ContactNo = data["Ref1ContactNo"];
                formData.Ref1EmailId = data["Ref1EmailId"];
                formData.Ref2Name = data["Ref2Name"];
                formData.Ref2Position = data["Ref2Position"];
                formData.Ref2Organisation = data["Ref2Organisation"];
                formData.Ref2Location = data["Ref2Location"];
                formData.Ref2ContactNo = data["Ref2ContactNo"];
                formData.Ref2EmailId = data["Ref2EmailId"];
                formData.Ref3Name = data["Ref3Name"];
                formData.Ref3Position = data["Ref3Position"];
                formData.Ref3Organisation = data["Ref3Organisation"];
                formData.Ref3Location = data["Ref3Location"];
                formData.Ref3ContactNo = data["Ref3ContactNo"];
                formData.Ref3EmailId = data["Ref3EmailId"];
                //formData.PreInterViewMRF = Convert.ToBoolean(data["PreInterViewMRF"]);
                formData.PreInterViewMRF = data["PreInterViewMRF"];
                string MRFPreInterview = data["MRFPreInterviewDetails"];
                formData.MRFPreInterviewDetails = JsonConvert.DeserializeObject<List<MRFPreInterview>>(MRFPreInterview);
                //formData.CriminalCase = Convert.ToBoolean(data["CriminalCase"]);
                formData.CriminalCase = data["CriminalCase"];
                formData.CriminalCaseDetails = data["CriminalCaseDetails"];
                //  formData.PreviousEmployemntEnquiry = Convert.ToBoolean(data["PreviousEmployemntEnquiry"]);
                formData.PreviousEmployemntEnquiry = data["PreviousEmployemntEnquiry"];
                formData.PreviousEmployemntEnquiryDetails = data["PreviousEmployemntEnquiryDetails"];
                formData.AdditionoalDetails = data["AdditionoalDetails"];
                formData.JobPortal = Convert.ToBoolean(data["JobPortal"]);
                formData.LinkedIn = Convert.ToBoolean(data["LinkedIn"]);
                formData.CareerSite = Convert.ToBoolean(data["CareerSite"]);
                formData.PaperAdvertisement = Convert.ToBoolean(data["PaperAdvertisement"]);
                formData.EmployeeReferal = Convert.ToBoolean(data["EmployeeReferal"]);
                formData.RefNameofEmployee = data["RefNameofEmployee"];
                formData.RefEmployeeId = data["RefEmployeeId"];
                formData.RefEmployeeDesignation = data["RefEmployeeDesignation"];
                formData.RefEmployeeLocation = data["RefEmployeeLocation"];
                formData.RefEmployeeFunction = data["RefEmployeeFunction"];
                formData.RefEmployeeKnowing = data["RefEmployeeKnowing"];
                formData.ConsultantApplicable = Convert.ToBoolean(data["ConsultantApplicable"]);
                formData.Consultant = Convert.ToInt32(data["Consultant"]);
                formData.OtherSource = data["OtherSource"];
                formData.expectedCTC = Convert.ToDecimal(data["expectedCTC"]);
                formData.joiningDaysRequired = Convert.ToInt32(data["joiningDaysRequired"]);
                formData.joiningComments = data["joiningComments"];
                formData.SignatureDate = data["SignatureDate"];
                formData.SignaturePlace = data["SignaturePlace"];
                formData.Signature = fileSignature;
                formData.CreatedBy = data["CreatedBy"];
                formData.SubmitStatus = Convert.ToInt32(data["SubmitStatus"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);

                var response = await this.candidateprofileService.Insertcandidateprofileupdateppf(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("insertcandidateprofile")]
        //public async Task<IActionResult> InsertCandidateProfile(IFormCollection data)
        //{
        //    try
        //    {
        //        string fileNameImage = "";
        //        string fileNameSignature = "";
        //        string fileImage = "";
        //        string fileSignature = "";
        //        string FileDataName = "";
        //        for (var i = 0; i < Request.Form.Files.Count; i++)
        //        {
        //            string fileName = "";
        //            string filepath = "";
        //            var file = Request.Form.Files[i];
        //            string HostUrl = this.environment.ContentRootPath;
        //            FileDataName = Request.Form.Files[i].Name;
        //            if (FileDataName.Contains("CandidateSignature"))
        //            {
        //                filepath = "UploadedFiles/CandidateProfile/Signature";
        //                fileSignature = filepath;
        //            }
        //            else
        //            {
        //                filepath = "UploadedFiles/CandidateProfile/Image";
        //                fileImage = filepath;
        //            }
        //            string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
        //            if (!Directory.Exists(uploadpath))
        //            {
        //                Directory.CreateDirectory(uploadpath);
        //            }
        //            if (file.Length > 0)
        //            {
        //                var timestamp = DateTime.Now.ToFileTime();
        //                string timestampfilename = Convert.ToString(timestamp);
        //                fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //                if (FileDataName.Contains("CandidateSignature"))
        //                {
        //                    fileNameSignature = fileName;
        //                }
        //                else
        //                {
        //                    fileNameImage = fileName;
        //                }
        //                string fullPath = Path.Combine(uploadpath, fileName);
        //                using (var stream = new FileStream(fullPath, FileMode.Create))
        //                {
        //                    file.CopyTo(stream);
        //                }
        //            }
        //        }


        //        CandidateProfileFormData formData = new CandidateProfileFormData();
        //        formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
        //        formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
        //        formData.FullName = data["FullName"];
        //        if(fileImage==""){
        //            formData.CandiadatePhoto ="";
        //        }
        //        else{
        //            formData.CandiadatePhoto = "/" + fileImage + "/" + fileNameImage;
        //        }
        //        formData.PositionAppliedFor = data["PositionAppliedFor"];
        //        formData.DOB = data["DOB"];
        //        formData.Age = 0;
        //        formData.CommunicationAddress = data["CommunicationAddress"];
        //        formData.CommunicationStateId = Convert.ToInt32(data["CommunicationStateId"]);
        //        formData.CommunicationCountryId = Convert.ToInt32(data["CommunicationCountryId"]);
        //        formData.CommunicationPin = data["CommunicationPin"];
        //        formData.CommunicationPhoneNo = data["CommunicationPhoneNo"];
        //        formData.CommunicationAlternativeContactNo = data["CommunicationAlternativeContactNo"];
        //        formData.EmailId = data["EmailId"];
        //        formData.PermanentAddress = data["PermanentAddress"];
        //        formData.PermanentStateId = Convert.ToInt32(data["PermanentStateId"]);
        //        formData.PermanentCountryId = Convert.ToInt32(data["PermanentCountryId"]);
        //        formData.PermanentPin = data["PermanentPin"];
        //        formData.PermanentPhone = data["PermanentPhone"];
        //        formData.PermanentHomeTown = data["PermanentHomeTown"];
        //        formData.PermanentNativeStateId = Convert.ToInt32(data["PermanentNativeStateId"]);
        //        formData.AadharNo = data["AadharNo"];
        //        formData.UANNO = data["UANNO"];
        //        formData.PANNo = data["PANNo"];
        //        formData.NationalityId = Convert.ToInt32(data["NationalityId"]);
        //        formData.ReligionId = Convert.ToInt32(data["ReligionId"]);
        //        formData.CasteId = Convert.ToInt32(data["CasteId"]);
        //        formData.Height = Convert.ToInt32(data["Height"]);
        //        formData.Weight = Convert.ToDecimal(data["Weight"]);
        //        formData.BloodGroupId = Convert.ToInt32(data["BloodGroupId"]);
        //        formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
        //        formData.EyeSightRight = data["EyeSightRight"];
        //        formData.EyeSightLeft = data["EyeSightLeft"];
        //        formData.CronicMajorIllness = Convert.ToBoolean(data["CronicMajorIllness"]);
        //        formData.CronicMajorIllnessDetails = data["CronicMajorIllnessDetails"];
        //        formData.HandiCap = Convert.ToBoolean(data["HandiCap"]);
        //        formData.HandiCapDetails = data["HandiCapDetails"];
        //        formData.IdentificationMarks1 = data["IdentificationMarks1"];
        //        formData.IdentificationMarks2 = data["IdentificationMarks2"];
        //        string FamilyBackgound = data["FamilyBackGroundDetails"];
        //        formData.FamilyBackGroundDetails = JsonConvert.DeserializeObject<List<FamilyBackgound>>(FamilyBackgound);
        //        formData.MRFRealtives = Convert.ToBoolean(data["MRFRealtives"]);
        //        string MRFRelation = data["MRFRelation"];
        //        formData.MRFRelationShipDetails = JsonConvert.DeserializeObject<List<MRFRelationShip>>(MRFRelation);
        //        formData.TyreCompanyRealtionShip = Convert.ToBoolean(data["TyreCompanyRealtionShip"]);
        //        string TyreCompanyRelation = data["TyreCompanyRelationShipDetails"];
        //        formData.TyreCompanyRelationShipDetails = JsonConvert.DeserializeObject<List<TyreCompanyRelation>>(TyreCompanyRelation);
        //        string Academic = data["AcademicDetails"];
        //        formData.AcademicDetails = JsonConvert.DeserializeObject<List<Academic>>(Academic);
        //        formData.ReasonforGap = data["ReasonforGap"];
        //        string Certification = data["CertificationDetails"];
        //        formData.CertificationDetails = JsonConvert.DeserializeObject<List<Certification>>(Certification);
        //        string Membership = data["MembershipDetails"];
        //        formData.MembershipDetails = JsonConvert.DeserializeObject<List<Membership>>(Membership);
        //        formData.DetailsofPublication = data["DetailsofPublication"];
        //        string ExtraCarriculars = data["ExtraCarricularActivitiesDetails"];
        //        formData.ExtraCarricularActivitiesDetails = JsonConvert.DeserializeObject<List<ExtraCarricularActivities>>(ExtraCarriculars);
        //        string LanguageKnown = data["LanguageKnownDetails"];
        //        formData.LanguageKnownDetails = JsonConvert.DeserializeObject<List<LanguageKnown>>(LanguageKnown);
        //        formData.PreOrganisationName = data["PreOrganisationName"];
        //        formData.PreOrganisationAddress = data["PreOrganisationAddress"];
        //        formData.PreOrganisationTurnOver = Convert.ToDecimal(data["PreOrganisationTurnOver"]);
        //        formData.PreOrganisationMainProduct = data["PreOrganisationMainProduct"];
        //        formData.PreOrganisationJoinedas = data["PreOrganisationJoinedas"];
        //        formData.PreOrganisationJoinDate = data["PreOrganisationJoinDate"];
        //        formData.PreOrganisationPresentPosition = data["PreOrganisationPresentPosition"];
        //        formData.PreOrganisationPresentPositionDate = data["PreOrganisationPresentPositionDate"];
        //        formData.PreOrganisationGap = data["PreOrganisationGap"];
        //        formData.PreOrganisationBasic = Convert.ToDecimal(data["PreOrganisationBasic"]);
        //        formData.PreOrganisationHRA = Convert.ToDecimal(data["PreOrganisationHRA"]);
        //        formData.PreOrganisationOtherAllowances = Convert.ToDecimal(data["PreOrganisationOtherAllowances"]);
        //        formData.PreOrganisationAnualComponents = Convert.ToDecimal(data["PreOrganisationAnualComponents"]);
        //        formData.PreOrganisationVariablePay = Convert.ToDecimal(data["PreOrganisationVariablePay"]);
        //        formData.PreOrganisationBenefits = Convert.ToDecimal(data["PreOrganisationBenefits"]);
        //        formData.PreOrganisationRetrial = Convert.ToDecimal(data["PreOrganisationRetrial"]);
        //        formData.PreOrganisationOthers = Convert.ToDecimal(data["PreOrganisationOthers"]);
        //        formData.PreOrganisationTotalCTC = Convert.ToDecimal(data["PreOrganisationTotalCTC"]);
        //        string PeviousAssignment = data["PrePeviousAssignmentDetails"];
        //        formData.PeviousAssignmentDetails = JsonConvert.DeserializeObject<List<PeviousAssignment>>(PeviousAssignment);
        //        formData.PreviousAssignmentGap = data["PreviousAssignmentGap"];
        //        formData.Ref1Name = data["Ref1Name"];
        //        formData.Ref1Position = data["Ref1Position"];
        //        formData.Ref1Organisation = data["Ref1Organisation"];
        //        formData.Ref1Location = data["Ref1Location"];
        //        formData.Ref1ContactNo = data["Ref1ContactNo"];
        //        formData.Ref1EmailId = data["Ref1EmailId"];
        //        formData.Ref2Name = data["Ref2Name"];
        //        formData.Ref2Position = data["Ref2Position"];
        //        formData.Ref2Organisation = data["Ref2Organisation"];
        //        formData.Ref2Location = data["Ref2Location"];
        //        formData.Ref2ContactNo = data["Ref2ContactNo"];
        //        formData.Ref2EmailId = data["Ref2EmailId"];
        //        formData.Ref3Name = data["Ref3Name"];
        //        formData.Ref3Position = data["Ref3Position"];
        //        formData.Ref3Organisation = data["Ref3Organisation"];
        //        formData.Ref3Location = data["Ref3Location"];
        //        formData.Ref3ContactNo = data["Ref3ContactNo"];
        //        formData.Ref3EmailId = data["Ref3EmailId"];
        //        formData.PreInterViewMRF = Convert.ToBoolean(data["PreInterViewMRF"]);
        //        string MRFPreInterview = data["MRFPreInterviewDetails"];
        //        formData.MRFPreInterviewDetails = JsonConvert.DeserializeObject<List<MRFPreInterview>>(MRFPreInterview);
        //        formData.CriminalCase = Convert.ToBoolean(data["CriminalCase"]);
        //        formData.CriminalCaseDetails = data["CriminalCaseDetails"];
        //        formData.PreviousEmployemntEnquiry = Convert.ToBoolean(data["PreviousEmployemntEnquiry"]);
        //        formData.PreviousEmployemntEnquiryDetails = data["PreviousEmployemntEnquiryDetails"];
        //        formData.AdditionoalDetails = data["AdditionoalDetails"];
        //        formData.JobPortal = Convert.ToBoolean(data["JobPortal"]);
        //        formData.LinkedIn = Convert.ToBoolean(data["LinkedIn"]);
        //        formData.CareerSite = Convert.ToBoolean(data["CareerSite"]);
        //        formData.PaperAdvertisement = Convert.ToBoolean(data["PaperAdvertisement"]);
        //        formData.EmployeeReferal = Convert.ToBoolean(data["EmployeeReferal"]);
        //        formData.RefNameofEmployee = data["RefNameofEmployee"];
        //        formData.RefEmployeeId = data["RefEmployeeId"];
        //        formData.RefEmployeeDesignation = data["RefEmployeeDesignation"];
        //        formData.RefEmployeeLocation = data["RefEmployeeLocation"];
        //        formData.RefEmployeeFunction = data["RefEmployeeFunction"];
        //        formData.RefEmployeeKnowing = data["RefEmployeeKnowing"];
        //        formData.ConsultantApplicable = Convert.ToBoolean(data["ConsultantApplicable"]);
        //        formData.Consultant = Convert.ToInt32(data["Consultant"]);
        //        formData.OtherSource = data["OtherSource"];
        //        formData.expectedCTC = Convert.ToDecimal(data["expectedCTC"]);
        //        formData.joiningDaysRequired = Convert.ToInt32(data["joiningDaysRequired"]);
        //        formData.joiningComments = data["joiningComments"];
        //        formData.SignatureDate = data["SignatureDate"];
        //        formData.SignaturePlace = data["SignaturePlace"];
        //        formData.Signature = "/" + fileSignature + "/" + fileNameSignature;
        //        formData.CreatedBy = data["CreatedBy"];
        //        formData.SubmitStatus =Convert.ToInt32(data["SubmitStatus"]);
        //        formData.IsEnabled =Convert.ToBoolean(data["IsEnabled"]);

        //        var response = await this.candidateprofileService.SaveCandidateProfile(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("updatecandidateprofile")]
        public async Task<IActionResult> UpdateCandidateProfile(IFormCollection data)
        {
            try
            {
                //string fileNameImage = "";
                //string fileNameSignature = "";
                //var fileImage = Request.Form.Files[0];
                //var fileSignature = Request.Form.Files[1];
                //string HostUrl = this.environment.ContentRootPath;
                //string filepathImage = "UploadedFiles/CandidateProfile/Image";
                //string filepathSignature = "UploadedFiles/CandidateProfile/Signature";
                //string uploadpathImage = Path.Combine(HostUrl, "wwwroot/" + filepathImage);
                //string uploadpathSignature = Path.Combine(HostUrl, "wwwroot/" + filepathSignature);
                //if (!Directory.Exists(uploadpathImage))
                //{
                //    Directory.CreateDirectory(uploadpathImage);
                //}
                //if (fileImage.Length > 0)
                //{
                //    var timestamp = DateTime.Now.ToFileTime();
                //    string timestampfilename = Convert.ToString(timestamp);
                //    fileNameImage = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(fileImage.ContentDisposition).FileName.Trim('"');
                //    string fullPath = Path.Combine(uploadpathImage, fileNameImage);
                //    using (var stream = new FileStream(fullPath, FileMode.Create))
                //    {
                //        fileImage.CopyTo(stream);
                //    }
                //}


                //if (!Directory.Exists(uploadpathSignature))
                //{
                //    Directory.CreateDirectory(uploadpathSignature);
                //}
                //if (fileSignature.Length > 0)
                //{
                //    var timestamp = DateTime.Now.ToFileTime();
                //    string timestampfilename = Convert.ToString(timestamp);
                //    fileNameSignature = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(fileSignature.ContentDisposition).FileName.Trim('"');
                //    string fullPath = Path.Combine(uploadpathSignature, fileNameSignature);
                //    using (var stream = new FileStream(fullPath, FileMode.Create))
                //    {
                //        fileSignature.CopyTo(stream);
                //    }
                //}

                var httpRequest = HttpContext.Request;
                ContainerReference = "candidateprofile";
                string fileImage = "";
                string fileSignature = "";
                string FileDataName = "";
                //string FName = "";
                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    foreach (var file1 in httpRequest.Form.Files)
                    {
                        fileName = "";
                        var file = Request.Form.Files[i];
                        string HostUrl = this.environment.ContentRootPath;
                        FileDataName = file1.Name;

                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        if (FileDataName.Contains("CandidateSignature"))
                        {
                            fileSignature = Path.Combine("/candidateprofile", fileName);
                            fileSignature = fileSignature.Replace("\\", "/");
                        }
                        else
                        {
                            fileImage = Path.Combine("/candidateprofile", fileName);
                            fileImage = fileImage.Replace("\\", "/");
                        }
                        var filePath = Path.Combine(environment.ContentRootPath);
                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        if (file.Length > 0)
                        {
                            //var timestamp = DateTime.Now.ToFileTime();
                            //string timestampfilename = Convert.ToString(timestamp);
                            //fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            //FName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }


                CandidateProfileFormData formData = new CandidateProfileFormData();
                formData.CandidateProfileId = Convert.ToInt32(data["CandidateProfileId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.FullName = data["FullName"];
                //formData.CandiadatePhoto = "/" + filepathImage + "/" + fileNameImage;
                if (fileImage == "")
                {
                    formData.CandiadatePhoto = "";
                }
                else
                {
                    formData.CandiadatePhoto = fileImage;
                }
                formData.PositionAppliedFor = data["PositionAppliedFor"];
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.CommunicationAddress = data["CommunicationAddress"];
                formData.CommunicationStateId = Convert.ToInt32(data["CommunicationStateId"]);
                //formData.CommunicationStateName = data["CommunicationStateName"];
                formData.CommunicationCountryId = Convert.ToInt32(data["CommunicationCountryId"]);
                //formData.CommunicationCountryName = data["CommunicationCountryName"];
                formData.CommunicationPin = data["CommunicationPin"];
                formData.CommunicationPhoneNo = data["CommunicationPhoneNo"];
                formData.CommunicationAlternativeContactNo = data["CommunicationContactNo"];
                formData.EmailId = data["EmailId"];
                formData.PermanentAddress = data["PermanentAddress"];
                formData.PermanentStateId = Convert.ToInt32(data["PermanentStateId"]);
                formData.PermanentCountryId = Convert.ToInt32(data["PermanentCountryId"]);
                formData.PermanentPin = data["PermanentPin"];
                formData.PermanentPhone = data["PermanentPhone"];
                formData.PermanentHomeTown = data["PermanentHomeTown"];
                formData.PermanentNativeStateId = Convert.ToInt32(data["PermanentNativeStateId"]);
                formData.AadharNo = data["AadharNo"];
                formData.UANNO = data["UANNO"];
                formData.PANNo = data["PANNo"];
                formData.NationalityId = Convert.ToInt32(data["NationalityId"]);
                formData.ReligionId = Convert.ToInt32(data["ReligionId"]);
                formData.CasteId = Convert.ToInt32(data["CasteId"]);
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.BloodGroupId = Convert.ToInt32(data["BloodGroupId"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["ExperienceYear"];
                formData.EyeSightLeft = data["ExperienceMonth"];
                formData.CronicMajorIllness = Convert.ToBoolean(data["CronicMajorIllness"]);
                formData.CronicMajorIllnessDetails = data["CronicMajorIllnessDetails"];
                formData.HandiCap = Convert.ToBoolean(data["HandiCap"]);
                formData.HandiCapDetails = data["HandiCapDetails"];
                formData.IdentificationMarks1 = data["IdentificationMarks1"];
                formData.IdentificationMarks2 = data["IdentificationMarks2"];
                string FamilyBackgound = data["FamilyBackGroundDetails"];
                formData.FamilyBackGroundDetails = JsonConvert.DeserializeObject<List<FamilyBackgound>>(FamilyBackgound);
                formData.MRFRealtives = Convert.ToBoolean(data["MRFRealtives"]);
                string MRFRelation = data["MRFRelation"];
                formData.MRFRelationShipDetails = JsonConvert.DeserializeObject<List<MRFRelationShip>>(MRFRelation);
                formData.TyreCompanyRealtionShip = Convert.ToBoolean(data["TyreCompanyRealtionShip"]);
                string TyreCompanyRelation = data["TyreCompanyRelationShipDetails"];
                formData.TyreCompanyRelationShipDetails = JsonConvert.DeserializeObject<List<TyreCompanyRelation>>(TyreCompanyRelation);
                string Academic = data["AcademicDetails"];
                formData.AcademicDetails = JsonConvert.DeserializeObject<List<Academic>>(Academic);
                formData.ReasonforGap = data["ReasonforGap"];
                string Certification = data["CertificationDetails"];
                formData.CertificationDetails = JsonConvert.DeserializeObject<List<Certification>>(Certification);
                string Membership = data["MembershipDetails"];
                formData.MembershipDetails = JsonConvert.DeserializeObject<List<Membership>>(Membership);
                formData.DetailsofPublication = data["DetailsofPublication"];
                string ExtraCarriculars = data["ExtraCarricularActivitiesDetails"];
                formData.ExtraCarricularActivitiesDetails = JsonConvert.DeserializeObject<List<ExtraCarricularActivities>>(ExtraCarriculars);
                string LanguageKnown = data["LanguageKnownDetails"];
                formData.LanguageKnownDetails = JsonConvert.DeserializeObject<List<LanguageKnown>>(LanguageKnown);
                formData.PreOrganisationName = data["PreOrganisationName"];
                formData.PreOrganisationAddress = data["PreOrganisationAddress"];
                formData.PreOrganisationTurnOver = Convert.ToDecimal(data["PreOrganisationTurnOver"]);
                formData.PreOrganisationMainProduct = data["PreOrganisationMainProduct"];
                formData.PreOrganisationJoinedas = data["PreOrganisationJoinedas"];
                formData.PreOrganisationJoinDate = data["PreOrganisationJoinDate"];
                formData.PreOrganisationPresentPosition = data["PreOrganisationPresentPosition"];
                formData.PreOrganisationPresentPositionDate = data["PreOrganisationPresentPositionDate"];
                formData.PreOrganisationGap = data["PreOrganisationGap"];
                formData.PreOrganisationBasic = Convert.ToDecimal(data["PreOrganisationBasic"]);
                formData.PreOrganisationHRA = Convert.ToDecimal(data["PreOrganisationHRA"]);
                formData.PreOrganisationOtherAllowances = Convert.ToDecimal(data["PreOrganisationOtherAllowances"]);
                formData.PreOrganisationAnualComponents = Convert.ToDecimal(data["PreOrganisationAnualComponents"]);
                formData.PreOrganisationVariablePay = Convert.ToDecimal(data["PreOrganisationVariablePay"]);
                formData.PreOrganisationBenefits = Convert.ToDecimal(data["PreOrganisationBenefits"]);
                formData.PreOrganisationRetrial = Convert.ToDecimal(data["PreOrganisationRetrial"]);
                formData.PreOrganisationOthers = Convert.ToDecimal(data["PreOrganisationOthers"]);
                formData.PreOrganisationTotalCTC = Convert.ToDecimal(data["PreOrganisationTotalCTC"]);
                string PeviousAssignment = data["PrePeviousAssignmentDetails"];
                formData.PeviousAssignmentDetails = JsonConvert.DeserializeObject<List<PeviousAssignment>>(PeviousAssignment);
                formData.PreviousAssignmentGap = data["PreviousAssignmentGap"];
                formData.Ref1Name = data["Ref1Name"];
                formData.Ref1Position = data["Ref1Position"];
                formData.Ref1Organisation = data["Ref1Organisation"];
                formData.Ref1Location = data["Ref1Location"];
                formData.Ref1ContactNo = data["Ref1ContactNo"];
                formData.Ref1EmailId = data["Ref1EmailId"];
                formData.Ref2Name = data["Ref2Name"];
                formData.Ref2Position = data["Ref2Position"];
                formData.Ref2Organisation = data["Ref2Organisation"];
                formData.Ref2Location = data["Ref2Location"];
                formData.Ref2ContactNo = data["Ref2ContactNo"];
                formData.Ref2EmailId = data["Ref2EmailId"];
                formData.Ref3Name = data["Ref3Name"];
                formData.Ref3Position = data["Ref3Position"];
                formData.Ref3Organisation = data["Ref3Organisation"];
                formData.Ref3Location = data["Ref3Location"];
                formData.Ref3ContactNo = data["Ref3ContactNo"];
                formData.Ref3EmailId = data["Ref3EmailId"];
                formData.PreInterViewMRF = Convert.ToBoolean(data["PreInterViewMRF"]);
                string MRFPreInterview = data["MRFPreInterviewDetails"];
                formData.MRFPreInterviewDetails = JsonConvert.DeserializeObject<List<MRFPreInterview>>(MRFPreInterview);
                formData.CriminalCase = Convert.ToBoolean(data["CriminalCase"]);
                formData.CriminalCaseDetails = data["CriminalCaseDetails"];
                formData.PreviousEmployemntEnquiry = Convert.ToBoolean(data["PreviousEmployemntEnquiry"]);
                formData.PreviousEmployemntEnquiryDetails = data["PreviousEmployemntEnquiryDetails"];
                formData.AdditionoalDetails = data["AdditionoalDetails"];
                formData.JobPortal = Convert.ToBoolean(data["JobPortal"]);
                formData.LinkedIn = Convert.ToBoolean(data["LinkedIn"]);
                formData.CareerSite = Convert.ToBoolean(data["CareerSite"]);
                formData.PaperAdvertisement = Convert.ToBoolean(data["PaperAdvertisement"]);
                formData.EmployeeReferal = Convert.ToBoolean(data["EmployeeReferal"]);
                formData.RefNameofEmployee = data["RefNameofEmployee"];
                formData.RefEmployeeId = data["RefEmployeeId"];
                formData.RefEmployeeDesignation = data["RefEmployeeDesignation"];
                formData.RefEmployeeLocation = data["RefEmployeeLocation"];
                formData.RefEmployeeFunction = data["RefEmployeeFunction"];
                formData.RefEmployeeKnowing = data["RefEmployeeKnowing"];
                formData.ConsultantApplicable = Convert.ToBoolean(data["ConsultantApplicable"]);
                formData.Consultant = Convert.ToInt32(data["Consultant"]);
                formData.OtherSource = data["OtherSource"];
                formData.SignatureDate = data["SignatureDate"];
                formData.SignaturePlace = data["SignaturePlace"];
                //formData.Signature = "/" + filepathSignature + "/" + fileNameSignature;
                formData.Signature = fileSignature;
                formData.CreatedBy = data["CreatedBy"];
                formData.SubmitStatus = Convert.ToInt32(data["SubmitStatus"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);

                var response = await this.candidateprofileService.SaveCandidateProfile(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("getallcandidateprofile")]
        //public async Task<IActionResult> GetAllCandidateProfile(SearchCandidateProfile search)
        //{
        //    try
        //    {

        //        List<CandidateProfileFormMasterData> CandidateList = new List<CandidateProfileFormMasterData>();
        //        CandidateList = await this.candidateprofileService.GetCandidateProfile(search).ConfigureAwait(false);

        //        List<FamilyBackgound> allFamilyList = new List<FamilyBackgound>();
        //        List<MRFRelationShip> allMRFRelationShipList = new List<MRFRelationShip>();
        //        List<TyreCompanyRelation> allTyreCompanyRelationList = new List<TyreCompanyRelation>();
        //        List<Academic> allAcademicList = new List<Academic>();
        //        List<Certification> allCertificationList = new List<Certification>();
        //        List<Membership> allMembershipList = new List<Membership>();
        //        List<ExtraCarricularActivities> allExtraCarricularActivitiesList = new List<ExtraCarricularActivities>();
        //        List<LanguageKnown> allLanguageKnownList = new List<LanguageKnown>();
        //        List<PeviousAssignment> allPeviousAssignmentList = new List<PeviousAssignment>();
        //        List<MRFPreInterview> allMRFPreInterviewList = new List<MRFPreInterview>();
        //        //CandidateList=GetAllCandidateProfile ()
        //        var CandidateCallList =
        //      from x in CandidateList
        //      group x by new
        //      {
        //          x.CandidateProfileId,
        //          x.CandidateId,
        //          x.RequisitionDetailId,
        //          x.FullName,
        //          x.CandiadatePhoto,
        //          x.PositionAppliedFor,
        //          x.DOB,
        //          x.Age,
        //          x.CommunicationAddress,
        //          x.CommunicationStateId,
        //          x.CommunicationCountryId,
        //          x.CommunicationPin,
        //          x.CommunicationPhoneNo,
        //          x.CommunicationAlternativeContactNo,
        //          x.EmailId,
        //          x.PermanentAddress,
        //          x.PermanentState,
        //          x.PermanentCountry,
        //          x.PermanentPin,
        //          x.PermanentPhone,
        //          x.PermanentHomeTown,
        //          x.PermanentNativeState,
        //          x.AadharNo,
        //          x.UANNO,
        //          x.PANNo,
        //          x.Nationality,
        //          x.Religion,
        //          x.Height,
        //          x.Weight,
        //          x.BloodGroup,
        //          x.EyeSightCorrected,
        //          x.EyeSightRight,
        //          x.EyeSightLeft,
        //          x.CronicMajorIllness,
        //          x.CronicMajorIllnessDetails,
        //          x.HandiCap,
        //          x.HandiCapDetails,
        //          x.IdentificationMarks1,
        //          x.IdentificationMarks2,
        //          x.MRFRealtives,
        //          x.TyreCompanyRealtionShip,
        //          x.ReasonforGap,
        //          x.DetailsofPublication,
        //          x.PreOrganisationName,
        //          x.PreOrganisationAddress,
        //          x.PreOrganisationTurnOver,
        //          x.PreOrganisationMainProduct,
        //          x.PreOrganisationJoinedas,
        //          x.PreOrganisationJoinDate,
        //          x.PreOrganisationPresentPosition,
        //          x.PreOrganisationPresentPositionDate,
        //          x.PreOrganisationGap,
        //          x.PreOrganisationBasic,
        //          x.PreOrganisationHRA,
        //          x.PreOrganisationOtherAllowances,
        //          x.PreOrganisationAnualComponents,
        //          x.PreOrganisationVariablePay,
        //          x.PreOrganisationBenefits,
        //          x.PreOrganisationRetrial,
        //          x.PreOrganisationOthers,
        //          x.PreOrganisationTotalCTC,
        //          x.PreviousAssignmentGap,
        //          x.Ref1Name,
        //          x.Ref1Position,
        //          x.Ref1Organisation,
        //          x.Ref1Location,
        //          x.Ref1ContactNo,
        //          x.Ref1EmailId,
        //          x.Ref2Name,
        //          x.Ref2Position,
        //          x.Ref2Organisation,
        //          x.Ref2Location,
        //          x.Ref2ContactNo,
        //          x.Ref2EmailId,
        //          x.Ref3Name,
        //          x.Ref3Position,
        //          x.Ref3Organisation,
        //          x.Ref3Location,
        //          x.Ref3ContactNo,
        //          x.Ref3EmailId,
        //          x.PreInterViewMRF,
        //          x.CriminalCase,
        //          x.CriminalCaseDetails,
        //          x.PreviousEmployemntEnquiry,
        //          x.PreviousEmployemntEnquiryDetails,
        //          x.AdditionoalDetails,
        //          x.JobPortal,
        //          x.LinkedIn,
        //          x.CareerSite,
        //          x.PaperAdvertisement,
        //          x.EmployeeReferal,
        //          x.RefNameofEmployee,
        //          x.RefEmployeeId,
        //          x.RefEmployeeDesignation,
        //          x.RefEmployeeLocation,
        //          x.RefEmployeeFunction,
        //          x.RefEmployeeKnowing,
        //          x.ConsultantApplicable,
        //          x.Consultant,
        //          x.OtherSource,
        //          x.SignatureDate,
        //          x.SignaturePlace,
        //          x.Signature,
        //          x.CreatedBy,
        //          x.FamilyBackgoundCandidateProfileId,
        //          x.MRFRelationShipCandidateProfileId,
        //          x.TyreCompanyRelationCandidateProfileId,
        //          x.AcademicCandidateProfileId,
        //          x.CertificationCandidateProfileId,
        //          x.MembershipCandidateProfileId,
        //          x.ExtraCarricularActivitiesCandidateProfileId,
        //          x.LanguageKnownCandidateProfileId,
        //          x.PeviousAssignmentCandidateProfileId,
        //          x.MRFPreInterviewCandidateProfileId
        //      } into CandidateCall
        //      select new CandidateProfileFormData()
        //      {
        //          CandidateProfileId = CandidateCall.Key.CandidateProfileId,
        //          CandidateId = CandidateCall.Key.CandidateId,
        //          RequisitionDetailId = CandidateCall.Key.RequisitionDetailId,
        //          FullName = CandidateCall.Key.FullName,
        //          CandiadatePhoto = CandidateCall.Key.CandiadatePhoto,
        //          PositionAppliedFor = CandidateCall.Key.PositionAppliedFor,
        //          DOB = CandidateCall.Key.DOB,
        //          Age = CandidateCall.Key.Age,
        //          CommunicationAddress = CandidateCall.Key.CommunicationAddress,
        //          CommunicationState = CandidateCall.Key.CommunicationStateId,
        //          CommunicationCountry = CandidateCall.Key.CommunicationCountryId,
        //          CommunicationPin = CandidateCall.Key.CommunicationPin,
        //          CommunicationPhoneNo = CandidateCall.Key.CommunicationPhoneNo,
        //          CommunicationAlternativeContactNo = CandidateCall.Key.CommunicationAlternativeContactNo,
        //          EmailId = CandidateCall.Key.EmailId,
        //          PermanentAddress = CandidateCall.Key.PermanentAddress,
        //          PermanentState = CandidateCall.Key.PermanentState,
        //          PermanentCountry = CandidateCall.Key.PermanentCountry,
        //          PermanentPin = CandidateCall.Key.PermanentPin,
        //          PermanentPhone = CandidateCall.Key.PermanentPhone,
        //          PermanentHomeTown = CandidateCall.Key.PermanentHomeTown,
        //          PermanentNativeState = CandidateCall.Key.PermanentNativeState,
        //          AadharNo = CandidateCall.Key.AadharNo,
        //          UANNO = CandidateCall.Key.UANNO,
        //          PANNo = CandidateCall.Key.PANNo,
        //          Nationality = CandidateCall.Key.Nationality,
        //          Religion = CandidateCall.Key.Religion,
        //          Height = CandidateCall.Key.Height,
        //          Weight = CandidateCall.Key.Weight,
        //          BloodGroup = CandidateCall.Key.BloodGroup,
        //          EyeSightCorrected = CandidateCall.Key.EyeSightCorrected,
        //          EyeSightRight = CandidateCall.Key.EyeSightRight,
        //          EyeSightLeft = CandidateCall.Key.EyeSightLeft,
        //          CronicMajorIllness = CandidateCall.Key.CronicMajorIllness,
        //          CronicMajorIllnessDetails = CandidateCall.Key.CronicMajorIllnessDetails,
        //          HandiCap = CandidateCall.Key.HandiCap,
        //          HandiCapDetails = CandidateCall.Key.HandiCapDetails,
        //          IdentificationMarks1 = CandidateCall.Key.IdentificationMarks1,
        //          IdentificationMarks2 = CandidateCall.Key.IdentificationMarks2,
        //          MRFRealtives = CandidateCall.Key.MRFRealtives,
        //          TyreCompanyRealtionShip = CandidateCall.Key.TyreCompanyRealtionShip,
        //          ReasonforGap = CandidateCall.Key.ReasonforGap,
        //          DetailsofPublication = CandidateCall.Key.DetailsofPublication,
        //          PreOrganisationName = CandidateCall.Key.PreOrganisationName,
        //          PreOrganisationAddress = CandidateCall.Key.PreOrganisationAddress,
        //          PreOrganisationTurnOver = CandidateCall.Key.PreOrganisationTurnOver,
        //          PreOrganisationMainProduct = CandidateCall.Key.PreOrganisationMainProduct,
        //          PreOrganisationJoinedas = CandidateCall.Key.PreOrganisationJoinedas,
        //          PreOrganisationJoinDate = CandidateCall.Key.PreOrganisationJoinDate,
        //          PreOrganisationPresentPosition = CandidateCall.Key.PreOrganisationPresentPosition,
        //          PreOrganisationPresentPositionDate = CandidateCall.Key.PreOrganisationPresentPositionDate,
        //          PreOrganisationGap = CandidateCall.Key.PreOrganisationGap,
        //          PreOrganisationBasic = CandidateCall.Key.PreOrganisationBasic,
        //          PreOrganisationHRA = CandidateCall.Key.PreOrganisationHRA,
        //          PreOrganisationOtherAllowances = CandidateCall.Key.PreOrganisationOtherAllowances,
        //          PreOrganisationAnualComponents = CandidateCall.Key.PreOrganisationAnualComponents,
        //          PreOrganisationVariablePay = CandidateCall.Key.PreOrganisationVariablePay,
        //          PreOrganisationBenefits = CandidateCall.Key.PreOrganisationBenefits,
        //          PreOrganisationRetrial = CandidateCall.Key.PreOrganisationRetrial,
        //          PreOrganisationOthers = CandidateCall.Key.PreOrganisationOthers,
        //          PreOrganisationTotalCTC = CandidateCall.Key.PreOrganisationTotalCTC,
        //          PreviousAssignmentGap = CandidateCall.Key.PreviousAssignmentGap,
        //          Ref1Name = CandidateCall.Key.Ref1Name,
        //          Ref1Position = CandidateCall.Key.Ref1Position,
        //          Ref1Organisation = CandidateCall.Key.Ref1Organisation,
        //          Ref1Location = CandidateCall.Key.Ref1Location,
        //          Ref1ContactNo = CandidateCall.Key.Ref1ContactNo,
        //          Ref1EmailId = CandidateCall.Key.Ref1EmailId,
        //          Ref2Name = CandidateCall.Key.Ref2Name,
        //          Ref2Position = CandidateCall.Key.Ref2Position,
        //          Ref2Organisation = CandidateCall.Key.Ref2Organisation,
        //          Ref2Location = CandidateCall.Key.Ref2Location,
        //          Ref2ContactNo = CandidateCall.Key.Ref2ContactNo,
        //          Ref2EmailId = CandidateCall.Key.Ref2EmailId,
        //          Ref3Name = CandidateCall.Key.Ref3Name,
        //          Ref3Position = CandidateCall.Key.Ref3Position,
        //          Ref3Organisation = CandidateCall.Key.Ref3Organisation,
        //          Ref3Location = CandidateCall.Key.Ref3Location,
        //          Ref3ContactNo = CandidateCall.Key.Ref3ContactNo,
        //          Ref3EmailId = CandidateCall.Key.Ref3EmailId,
        //          CriminalCase = CandidateCall.Key.CriminalCase,
        //          CriminalCaseDetails = CandidateCall.Key.CriminalCaseDetails,
        //          PreviousEmployemntEnquiry = CandidateCall.Key.PreviousEmployemntEnquiry,
        //          PreviousEmployemntEnquiryDetails = CandidateCall.Key.PreviousEmployemntEnquiryDetails,
        //          AdditionoalDetails = CandidateCall.Key.AdditionoalDetails,
        //          JobPortal = CandidateCall.Key.JobPortal,
        //          LinkedIn = CandidateCall.Key.LinkedIn,
        //          CareerSite = CandidateCall.Key.CareerSite,
        //          PaperAdvertisement = CandidateCall.Key.PaperAdvertisement,
        //          EmployeeReferal = CandidateCall.Key.EmployeeReferal,
        //          RefNameofEmployee = CandidateCall.Key.RefNameofEmployee,
        //          RefEmployeeId = CandidateCall.Key.RefEmployeeId,
        //          RefEmployeeDesignation = CandidateCall.Key.RefEmployeeDesignation,
        //          RefEmployeeLocation = CandidateCall.Key.RefEmployeeLocation,
        //          RefEmployeeFunction = CandidateCall.Key.RefEmployeeFunction,
        //          RefEmployeeKnowing = CandidateCall.Key.RefEmployeeKnowing,
        //          ConsultantApplicable = CandidateCall.Key.ConsultantApplicable,
        //          Consultant = CandidateCall.Key.Consultant,
        //          OtherSource = CandidateCall.Key.OtherSource,
        //          SignatureDate = CandidateCall.Key.SignatureDate,
        //          SignaturePlace = CandidateCall.Key.SignaturePlace,
        //          Signature = CandidateCall.Key.Signature,
        //          CreatedBy = CandidateCall.Key.CreatedBy,
        //          FamilyBackGroundDetails = CandidateList.Select(m => new FamilyBackgound
        //          {
        //              CandidateProfileId = m.CandidateProfileId,
        //              FamilyBackgoundLineId = m.FamilyBackgoundLineId,
        //              FamilyRelationShip = m.FamilyRelationShip,
        //              FamilyName = m.FamilyName,
        //              FamilyDOB = m.FamilyDOB,
        //              Education = m.Education,
        //              Occupation = m.Occupation,
        //              FamilyOrganisation = m.FamilyOrganisation
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.FamilyBackgoundCandidateProfileId).ToList(),
        //          MRFRelationShipDetails = CandidateList.Select(n => new MRFRelationShip
        //          {
        //              CandidateProfileId = n.CandidateProfileId,
        //              MRFRelationShipLineId = n.MRFRelationShipLineId,
        //              RelativeName = n.RelativeName,
        //              RelativeEmployeeId = n.RelativeEmployeeId,
        //              RelativeDesignation = n.RelativeDesignation,
        //              RelativeRelationShip = n.RelativeRelationShip
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.MRFRelationShipCandidateProfileId).ToList(),
        //          TyreCompanyRelationShipDetails = CandidateList.Select(o => new TyreCompanyRelation
        //          {
        //              CandidateProfileId = o.CandidateProfileId,
        //              TyreCompanyRelationLineId = o.TyreCompanyRelationLineId,
        //              TyreRelativeName = o.TyreRelativeName,
        //              TyreRelativeDesignation = o.TyreRelativeDesignation,
        //              TyreRelativeRelationShip = o.TyreRelativeRelationShip
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.TyreCompanyRelationCandidateProfileId).ToList(),
        //          AcademicDetails = CandidateList.Select(p => new Academic
        //          {
        //              CandidateProfileId = p.CandidateProfileId ,
        //              AcademicLineId = p.AcademicLineId,
        //              Qualification = p.Qualification,
        //              Course = p.Course,
        //              Specalization = p.Specalization,
        //              Instutation = p.Instutation,
        //              AcademicAddress = p.AcademicAddress,
        //              AcademicDurationTo = p.AcademicDurationTo,
        //              CourseType = p.CourseType,
        //              Subjects = p.Subjects,
        //              MonthOfPassing = p.MonthOfPassing,
        //              YearOfPassing = p.YearOfPassing,
        //              Grade = p.Grade,
        //              Marks = p.Marks
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.AcademicCandidateProfileId).ToList(),
        //          CertificationDetails = CandidateList.Select(q => new Certification
        //          {
        //              CandidateProfileId = q.CandidateProfileId,
        //              CertificationLineId = q.CertificationLineId,
        //              CertificationOrganisation = q.CertificationOrganisation,
        //              CertificationNatureofTraining = q.CertificationNatureofTraining,
        //              CertificationDurationFrom = q.CertificationDurationFrom,
        //              CertificationDurationTo = q.CertificationDurationTo
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.CertificationCandidateProfileId).ToList(),
        //          MembershipDetails = CandidateList.Select(r => new Membership
        //          {
        //              CandidateProfileId = r.CandidateProfileId,
        //              MembershipLineId = r.MembershipLineId,
        //              Institution = r.Institution,
        //              ClassofMemberShip = r.ClassofMemberShip,
        //              MembershipFrom = r.MembershipFrom
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.MembershipCandidateProfileId).ToList(),
        //          ExtraCarricularActivitiesDetails = CandidateList.Select(s => new ExtraCarricularActivities
        //          {
        //              CandidateProfileId = s.CandidateProfileId,
        //              ExtraCarricularActivitiesLineId = s.ExtraCarricularActivitiesLineId,
        //              NatureofActivities = s.NatureofActivities,
        //              LevelofAchivement = s.LevelofAchivement
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.ExtraCarricularActivitiesCandidateProfileId).ToList(),
        //          LanguageKnownDetails = CandidateList.Select(t => new LanguageKnown
        //          {
        //              CandidateProfileId = t.CandidateProfileId,
        //              LanguageKnownLineId = t.LanguageKnownLineId,
        //              MotherTongue = t.MotherTongue,
        //              Read = t.Read,
        //              Write = t.Write,
        //              Speak = t.Speak
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.LanguageKnownCandidateProfileId).ToList(),
        //          PeviousAssignmentDetails = CandidateList.Select(u => new PeviousAssignment
        //          {
        //              CandidateProfileId = u.CandidateProfileId,
        //              PeviousAssignmentLineId = u.PeviousAssignmentLineId,
        //              PeviousAssignmentFrom = u.PeviousAssignmentFrom,
        //              PeviousAssignmentTo = u.PeviousAssignmentTo,
        //              PeviousAssignmentOrganisation = u.PeviousAssignmentOrganisation,
        //              PeviousAssignmentAddress = u.PeviousAssignmentAddress,
        //              PeviousAssignmentPosition = u.PeviousAssignmentPosition,
        //              PeviousAssignmentDescriptionofWork = u.PeviousAssignmentDescriptionofWork,
        //              PeviousAssignmentCTC = u.PeviousAssignmentCTC
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.PeviousAssignmentCandidateProfileId).ToList(),
        //          MRFPreInterviewDetails = CandidateList.Select(v => new MRFPreInterview
        //          {
        //              CandidateProfileId = v.CandidateProfileId,
        //              MRFPreInterviewLineId = v.MRFPreInterviewLineId,
        //              Position = v.Position,
        //              Date = v.Date
        //          }).Where(x => x.CandidateProfileId == CandidateCall.Key.MRFPreInterviewCandidateProfileId).ToList(),
        //      };
        //        dynamic response = new ExpandoObject();
        //        //var response = await this.candidateprofileService.GetCandidateProfile(search).ConfigureAwait(false);
        //        response.data = CandidateCallList;
        //        return this.Ok(response);

        //        //return Content<object>(_httpStatusCode, response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

        //    }
        //}

        [HttpPost]
        [Route("getallcandidateprofile")]
        public async Task<IActionResult> GetAllCandidateProfile(SearchCandidateProfile search)
        {
            try
            {
                search.RequisitionDetailId = null;
                CandidateProfile CandidateProfile = new CandidateProfile();
                CandidateProfile = await this.candidateprofileService.GetCandidateProfile(search).ConfigureAwait(false);

                CandidateProfileFormData CandidateProfileData = new CandidateProfileFormData();
                if (CandidateProfile.CandidateProfileData != null)
                {
                    CandidateProfileData.CandidateId = CandidateProfile.CandidateProfileData.CandidateId;
                    CandidateProfileData.RequisitionDetailId = CandidateProfile.CandidateProfileData.RequisitionDetailId;
                    CandidateProfileData.CandidateProfileId = CandidateProfile.CandidateProfileData.CandidateProfileId;
                    CandidateProfileData.FullName = CandidateProfile.CandidateProfileData.FullName;
                    CandidateProfileData.CandiadatePhoto = CandidateProfile.CandidateProfileData.CandiadatePhoto;
                    CandidateProfileData.PositionAppliedFor = CandidateProfile.CandidateProfileData.PositionAppliedFor;
                    CandidateProfileData.DOB = CandidateProfile.CandidateProfileData.DOB;
                    CandidateProfileData.Age = CandidateProfile.CandidateProfileData.Age;
                    CandidateProfileData.CommunicationAddress = CandidateProfile.CandidateProfileData.CommunicationAddress;
                    CandidateProfileData.CommunicationStateId = CandidateProfile.CandidateProfileData.CommunicationStateId;
                    CandidateProfileData.CommunicationStateName = CandidateProfile.CandidateProfileData.CommunicationStateName;
                    CandidateProfileData.CommunicationCountryId = CandidateProfile.CandidateProfileData.CommunicationCountryId;
                    CandidateProfileData.CommunicationCountryName = CandidateProfile.CandidateProfileData.CommunicationCountryName;
                    CandidateProfileData.CommunicationPin = CandidateProfile.CandidateProfileData.CommunicationPin;
                    CandidateProfileData.CommunicationPhoneNo = CandidateProfile.CandidateProfileData.CommunicationPhoneNo;
                    CandidateProfileData.CommunicationAlternativeContactNo = CandidateProfile.CandidateProfileData.CommunicationAlternativeContactNo;
                    CandidateProfileData.EmailId = CandidateProfile.CandidateProfileData.EmailId;
                    CandidateProfileData.PermanentAddress = CandidateProfile.CandidateProfileData.PermanentAddress;
                    CandidateProfileData.PermanentStateId = CandidateProfile.CandidateProfileData.PermanentStateId;
                    CandidateProfileData.PermanentStateName = CandidateProfile.CandidateProfileData.PermanentStateName;
                    CandidateProfileData.PermanentCountryId = CandidateProfile.CandidateProfileData.PermanentCountryId;
                    CandidateProfileData.PermanentCountryName = CandidateProfile.CandidateProfileData.PermanentCountryName;
                    CandidateProfileData.PermanentPin = CandidateProfile.CandidateProfileData.PermanentPin;
                    CandidateProfileData.PermanentPhone = CandidateProfile.CandidateProfileData.PermanentPhone;
                    CandidateProfileData.PermanentHomeTown = CandidateProfile.CandidateProfileData.PermanentHomeTown;
                    CandidateProfileData.PermanentNativeStateId = CandidateProfile.CandidateProfileData.PermanentNativeStateId;
                    CandidateProfileData.PermanentNativeStateName = CandidateProfile.CandidateProfileData.PermanentNativeStateName;
                    CandidateProfileData.AadharNo = CandidateProfile.CandidateProfileData.AadharNo;
                    CandidateProfileData.UANNO = CandidateProfile.CandidateProfileData.UANNO;
                    CandidateProfileData.PANNo = CandidateProfile.CandidateProfileData.PANNo;
                    CandidateProfileData.NationalityId = CandidateProfile.CandidateProfileData.NationalityId;
                    CandidateProfileData.NationalityName = CandidateProfile.CandidateProfileData.NationalityName;
                    CandidateProfileData.ReligionId = CandidateProfile.CandidateProfileData.ReligionId;
                    CandidateProfileData.ReligionName = CandidateProfile.CandidateProfileData.ReligionName;
                    CandidateProfileData.CasteId = CandidateProfile.CandidateProfileData.CasteId;
                    CandidateProfileData.CasteName = CandidateProfile.CandidateProfileData.CasteName;
                    CandidateProfileData.Height = CandidateProfile.CandidateProfileData.Height;
                    CandidateProfileData.Weight = CandidateProfile.CandidateProfileData.Weight;
                    CandidateProfileData.BloodGroupId = CandidateProfile.CandidateProfileData.BloodGroupId;
                    CandidateProfileData.BloodGroupName = CandidateProfile.CandidateProfileData.BloodGroupName;
                    CandidateProfileData.EyeSightCorrected = CandidateProfile.CandidateProfileData.EyeSightCorrected;
                    CandidateProfileData.EyeSightRight = CandidateProfile.CandidateProfileData.EyeSightRight;
                    CandidateProfileData.EyeSightLeft = CandidateProfile.CandidateProfileData.EyeSightLeft;
                    CandidateProfileData.CronicMajorIllness = CandidateProfile.CandidateProfileData.CronicMajorIllness;
                    CandidateProfileData.CronicMajorIllnessDetails = CandidateProfile.CandidateProfileData.CronicMajorIllnessDetails;
                    CandidateProfileData.HandiCap = CandidateProfile.CandidateProfileData.HandiCap;
                    CandidateProfileData.HandiCapDetails = CandidateProfile.CandidateProfileData.HandiCapDetails;
                    CandidateProfileData.IdentificationMarks1 = CandidateProfile.CandidateProfileData.IdentificationMarks1;
                    CandidateProfileData.IdentificationMarks2 = CandidateProfile.CandidateProfileData.IdentificationMarks2;
                    CandidateProfileData.MRFRealtives = CandidateProfile.CandidateProfileData.MRFRealtives;
                    CandidateProfileData.TyreCompanyRealtionShip = CandidateProfile.CandidateProfileData.TyreCompanyRealtionShip;
                    CandidateProfileData.ReasonforGap = CandidateProfile.CandidateProfileData.ReasonforGap;
                    CandidateProfileData.DetailsofPublication = CandidateProfile.CandidateProfileData.DetailsofPublication;
                    CandidateProfileData.PreOrganisationName = CandidateProfile.CandidateProfileData.PreOrganisationName;
                    CandidateProfileData.PreOrganisationAddress = CandidateProfile.CandidateProfileData.PreOrganisationAddress;
                    CandidateProfileData.PreOrganisationTurnOver = CandidateProfile.CandidateProfileData.PreOrganisationTurnOver;
                    CandidateProfileData.PreOrganisationMainProduct = CandidateProfile.CandidateProfileData.PreOrganisationMainProduct;
                    CandidateProfileData.PreOrganisationJoinedas = CandidateProfile.CandidateProfileData.PreOrganisationJoinedas;
                    CandidateProfileData.PreOrganisationJoinDate = CandidateProfile.CandidateProfileData.PreOrganisationJoinDate;
                    CandidateProfileData.PreOrganisationPresentPosition = CandidateProfile.CandidateProfileData.PreOrganisationPresentPosition;
                    CandidateProfileData.PreOrganisationPresentPositionDate = CandidateProfile.CandidateProfileData.PreOrganisationPresentPositionDate;
                    CandidateProfileData.PreOrganisationGap = CandidateProfile.CandidateProfileData.PreOrganisationGap;
                    CandidateProfileData.PreOrganisationBasic = CandidateProfile.CandidateProfileData.PreOrganisationBasic;
                    CandidateProfileData.PreOrganisationHRA = CandidateProfile.CandidateProfileData.PreOrganisationHRA;
                    CandidateProfileData.PreOrganisationOtherAllowances = CandidateProfile.CandidateProfileData.PreOrganisationOtherAllowances;
                    CandidateProfileData.PreOrganisationAnualComponents = CandidateProfile.CandidateProfileData.PreOrganisationAnualComponents;
                    CandidateProfileData.PreOrganisationVariablePay = CandidateProfile.CandidateProfileData.PreOrganisationVariablePay;
                    CandidateProfileData.PreOrganisationBenefits = CandidateProfile.CandidateProfileData.PreOrganisationBenefits;
                    CandidateProfileData.PreOrganisationRetrial = CandidateProfile.CandidateProfileData.PreOrganisationRetrial;
                    CandidateProfileData.PreOrganisationOthers = CandidateProfile.CandidateProfileData.PreOrganisationOthers;
                    CandidateProfileData.PreOrganisationTotalCTC = CandidateProfile.CandidateProfileData.PreOrganisationTotalCTC;
                    CandidateProfileData.PreviousAssignmentGap = CandidateProfile.CandidateProfileData.PreviousAssignmentGap;
                    CandidateProfileData.Ref1Name = CandidateProfile.CandidateProfileData.Ref1Name;
                    CandidateProfileData.Ref1Position = CandidateProfile.CandidateProfileData.Ref1Position;
                    CandidateProfileData.Ref1Organisation = CandidateProfile.CandidateProfileData.Ref1Organisation;
                    CandidateProfileData.Ref1Location = CandidateProfile.CandidateProfileData.Ref1Location;
                    CandidateProfileData.Ref1ContactNo = CandidateProfile.CandidateProfileData.Ref1ContactNo;
                    CandidateProfileData.Ref1EmailId = CandidateProfile.CandidateProfileData.Ref1EmailId;
                    CandidateProfileData.Ref2Name = CandidateProfile.CandidateProfileData.Ref2Name;
                    CandidateProfileData.Ref2Position = CandidateProfile.CandidateProfileData.Ref2Position;
                    CandidateProfileData.Ref2Organisation = CandidateProfile.CandidateProfileData.Ref2Organisation;
                    CandidateProfileData.Ref2Location = CandidateProfile.CandidateProfileData.Ref2Location;
                    CandidateProfileData.Ref2ContactNo = CandidateProfile.CandidateProfileData.Ref2ContactNo;
                    CandidateProfileData.Ref2EmailId = CandidateProfile.CandidateProfileData.Ref2EmailId;
                    CandidateProfileData.Ref3Name = CandidateProfile.CandidateProfileData.Ref3Name;
                    CandidateProfileData.Ref3Position = CandidateProfile.CandidateProfileData.Ref3Position;
                    CandidateProfileData.Ref3Organisation = CandidateProfile.CandidateProfileData.Ref3Organisation;
                    CandidateProfileData.Ref3Location = CandidateProfile.CandidateProfileData.Ref3Location;
                    CandidateProfileData.Ref3ContactNo = CandidateProfile.CandidateProfileData.Ref3ContactNo;
                    CandidateProfileData.Ref3EmailId = CandidateProfile.CandidateProfileData.Ref3EmailId;
                    CandidateProfileData.PreInterViewMRF = CandidateProfile.CandidateProfileData.PreInterViewMRF;
                    CandidateProfileData.CriminalCase = CandidateProfile.CandidateProfileData.CriminalCase;
                    CandidateProfileData.CriminalCaseDetails = CandidateProfile.CandidateProfileData.CriminalCaseDetails;
                    CandidateProfileData.PreviousEmployemntEnquiry = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiry;
                    CandidateProfileData.PreviousEmployemntEnquiryDetails = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiryDetails;
                    CandidateProfileData.AdditionoalDetails = CandidateProfile.CandidateProfileData.AdditionoalDetails;
                    CandidateProfileData.JobPortal = CandidateProfile.CandidateProfileData.JobPortal;
                    CandidateProfileData.LinkedIn = CandidateProfile.CandidateProfileData.LinkedIn;
                    CandidateProfileData.CareerSite = CandidateProfile.CandidateProfileData.CareerSite;
                    CandidateProfileData.PaperAdvertisement = CandidateProfile.CandidateProfileData.PaperAdvertisement;
                    CandidateProfileData.EmployeeReferal = CandidateProfile.CandidateProfileData.EmployeeReferal;
                    CandidateProfileData.RefNameofEmployee = CandidateProfile.CandidateProfileData.RefNameofEmployee;
                    CandidateProfileData.RefEmployeeId = CandidateProfile.CandidateProfileData.RefEmployeeId;
                    CandidateProfileData.RefEmployeeDesignation = CandidateProfile.CandidateProfileData.RefEmployeeDesignation;
                    CandidateProfileData.RefEmployeeLocation = CandidateProfile.CandidateProfileData.RefEmployeeLocation;
                    CandidateProfileData.RefEmployeeFunction = CandidateProfile.CandidateProfileData.RefEmployeeFunction;
                    CandidateProfileData.RefEmployeeKnowing = CandidateProfile.CandidateProfileData.RefEmployeeKnowing;
                    CandidateProfileData.ConsultantApplicable = CandidateProfile.CandidateProfileData.ConsultantApplicable;
                    CandidateProfileData.Consultant = CandidateProfile.CandidateProfileData.Consultant;
                    CandidateProfileData.OtherSource = CandidateProfile.CandidateProfileData.OtherSource;
                    CandidateProfileData.expectedCTC = CandidateProfile.CandidateProfileData.expectedCTC;
                    CandidateProfileData.joiningDaysRequired = CandidateProfile.CandidateProfileData.joiningDaysRequired;
                    CandidateProfileData.joiningComments = CandidateProfile.CandidateProfileData.joiningComments;
                    CandidateProfileData.SignatureDate = CandidateProfile.CandidateProfileData.SignatureDate;
                    CandidateProfileData.SignaturePlace = CandidateProfile.CandidateProfileData.SignaturePlace;
                    CandidateProfileData.Signature = CandidateProfile.CandidateProfileData.Signature;
                    CandidateProfileData.CreatedBy = CandidateProfile.CandidateProfileData.CreatedBy;
                    CandidateProfileData.SubmitStatus = CandidateProfile.CandidateProfileData.SubmitStatus;
                    CandidateProfileData.IsEnabled = CandidateProfile.CandidateProfileData.IsEnabled;
                    CandidateProfileData.GenderName = CandidateProfile.CandidateProfileData.GenderName;
                    CandidateProfileData.FamilyBackGroundDetails = CandidateProfile.FamilyBackGroundDetails;
                    CandidateProfileData.MRFRelationShipDetails = CandidateProfile.MRFRelationShipDetails;
                    CandidateProfileData.TyreCompanyRelationShipDetails = CandidateProfile.TyreCompanyRelationShipDetails;
                    CandidateProfileData.AcademicDetails = CandidateProfile.AcademicDetails;
                    CandidateProfileData.CertificationDetails = CandidateProfile.CertificationDetails;
                    CandidateProfileData.MembershipDetails = CandidateProfile.MembershipDetails;
                    CandidateProfileData.ExtraCarricularActivitiesDetails = CandidateProfile.ExtraCarricularActivitiesDetails;
                    CandidateProfileData.LanguageKnownDetails = CandidateProfile.LanguageKnownDetails;
                    CandidateProfileData.PeviousAssignmentDetails = CandidateProfile.PeviousAssignmentDetails;
                    CandidateProfileData.MRFPreInterviewDetails = CandidateProfile.MRFPreInterviewDetails;
                    CandidateProfileData.ConsultantName = CandidateProfile.CandidateProfileData.ConsultantName;
                    CandidateProfileData.IsInternalRef = CandidateProfile.CandidateProfileData.IsInternalRef;
                    CandidateProfileData.InternalRefName = CandidateProfile.CandidateProfileData.InternalRefName;

                }
                return this.Ok(CandidateProfileData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcampuscandidateprofile")]
        public async Task<IActionResult> GetAllCampusCandidateProfile(SearchCandidateProfile search)
        {
            try
            {
                search.RequisitionDetailId = null;
                CampusCandidateProfile CandidateProfile = new CampusCandidateProfile();
                CandidateProfile = await this.candidateprofileService.GetCampusCandidateProfile(search).ConfigureAwait(false);

                CampusCandidateProfileFormData CandidateProfileData = new CampusCandidateProfileFormData();
                if (CandidateProfile.CandidateProfileData != null)
                {
                    CandidateProfileData.CandidateId = CandidateProfile.CandidateProfileData.CandidateId;
                    CandidateProfileData.RequisitionDetailId = CandidateProfile.CandidateProfileData.RequisitionDetailId;
                    CandidateProfileData.CandidateProfileId = CandidateProfile.CandidateProfileData.CandidateProfileId;
                    CandidateProfileData.FullName = CandidateProfile.CandidateProfileData.FullName;
                    CandidateProfileData.CandiadatePhoto = CandidateProfile.CandidateProfileData.CandiadatePhoto;
                    CandidateProfileData.PositionAppliedFor = CandidateProfile.CandidateProfileData.PositionAppliedFor;
                    CandidateProfileData.DOB = CandidateProfile.CandidateProfileData.DOB;
                    CandidateProfileData.Age = CandidateProfile.CandidateProfileData.Age;
                    CandidateProfileData.CommunicationAddress = CandidateProfile.CandidateProfileData.CommunicationAddress;
                    CandidateProfileData.CommunicationStateId = CandidateProfile.CandidateProfileData.CommunicationStateId;
                    CandidateProfileData.CommunicationStateName = CandidateProfile.CandidateProfileData.CommunicationStateName;
                    CandidateProfileData.CommunicationCountryId = CandidateProfile.CandidateProfileData.CommunicationCountryId;
                    CandidateProfileData.CommunicationCountryName = CandidateProfile.CandidateProfileData.CommunicationCountryName;
                    CandidateProfileData.CommunicationPin = CandidateProfile.CandidateProfileData.CommunicationPin;
                    CandidateProfileData.CommunicationPhoneNo = CandidateProfile.CandidateProfileData.CommunicationPhoneNo;
                    CandidateProfileData.CommunicationAlternativeContactNo = CandidateProfile.CandidateProfileData.CommunicationAlternativeContactNo;
                    CandidateProfileData.EmailId = CandidateProfile.CandidateProfileData.EmailId;
                    CandidateProfileData.PermanentAddress = CandidateProfile.CandidateProfileData.PermanentAddress;
                    CandidateProfileData.PermanentStateId = CandidateProfile.CandidateProfileData.PermanentStateId;
                    CandidateProfileData.PermanentStateName = CandidateProfile.CandidateProfileData.PermanentStateName;
                    CandidateProfileData.PermanentCountryId = CandidateProfile.CandidateProfileData.PermanentCountryId;
                    CandidateProfileData.PermanentCountryName = CandidateProfile.CandidateProfileData.PermanentCountryName;
                    CandidateProfileData.PermanentPin = CandidateProfile.CandidateProfileData.PermanentPin;
                    CandidateProfileData.PermanentPhone = CandidateProfile.CandidateProfileData.PermanentPhone;
                    CandidateProfileData.PermanentHomeTown = CandidateProfile.CandidateProfileData.PermanentHomeTown;
                    CandidateProfileData.PermanentNativeStateId = CandidateProfile.CandidateProfileData.PermanentNativeStateId;
                    CandidateProfileData.PermanentNativeStateName = CandidateProfile.CandidateProfileData.PermanentNativeStateName;
                    CandidateProfileData.AadharNo = CandidateProfile.CandidateProfileData.AadharNo;
                    CandidateProfileData.UANNO = CandidateProfile.CandidateProfileData.UANNO;
                    CandidateProfileData.PANNo = CandidateProfile.CandidateProfileData.PANNo;
                    CandidateProfileData.NationalityId = CandidateProfile.CandidateProfileData.NationalityId;
                    CandidateProfileData.NationalityName = CandidateProfile.CandidateProfileData.NationalityName;
                    CandidateProfileData.ReligionId = CandidateProfile.CandidateProfileData.ReligionId;
                    CandidateProfileData.ReligionName = CandidateProfile.CandidateProfileData.ReligionName;
                    CandidateProfileData.CasteId = CandidateProfile.CandidateProfileData.CasteId;
                    CandidateProfileData.CasteName = CandidateProfile.CandidateProfileData.CasteName;
                    CandidateProfileData.Height = CandidateProfile.CandidateProfileData.Height;
                    CandidateProfileData.Weight = CandidateProfile.CandidateProfileData.Weight;
                    CandidateProfileData.BloodGroupId = CandidateProfile.CandidateProfileData.BloodGroupId;
                    CandidateProfileData.BloodGroupName = CandidateProfile.CandidateProfileData.BloodGroupName;
                    CandidateProfileData.EyeSightCorrected = CandidateProfile.CandidateProfileData.EyeSightCorrected;
                    CandidateProfileData.EyeSightRight = CandidateProfile.CandidateProfileData.EyeSightRight;
                    CandidateProfileData.EyeSightLeft = CandidateProfile.CandidateProfileData.EyeSightLeft;
                    CandidateProfileData.CronicMajorIllness = CandidateProfile.CandidateProfileData.CronicMajorIllness;
                    CandidateProfileData.CronicMajorIllnessDetails = CandidateProfile.CandidateProfileData.CronicMajorIllnessDetails;
                    CandidateProfileData.HandiCap = CandidateProfile.CandidateProfileData.HandiCap;
                    CandidateProfileData.HandiCapDetails = CandidateProfile.CandidateProfileData.HandiCapDetails;
                    CandidateProfileData.IdentificationMarks1 = CandidateProfile.CandidateProfileData.IdentificationMarks1;
                    CandidateProfileData.IdentificationMarks2 = CandidateProfile.CandidateProfileData.IdentificationMarks2;
                    CandidateProfileData.MRFRealtives = CandidateProfile.CandidateProfileData.MRFRealtives;
                    CandidateProfileData.TyreCompanyRealtionShip = CandidateProfile.CandidateProfileData.TyreCompanyRealtionShip;
                    CandidateProfileData.ReasonforGap = CandidateProfile.CandidateProfileData.ReasonforGap;
                    CandidateProfileData.DetailsofPublication = CandidateProfile.CandidateProfileData.DetailsofPublication;
                    CandidateProfileData.PreOrganisationName = CandidateProfile.CandidateProfileData.PreOrganisationName;
                    CandidateProfileData.PreOrganisationAddress = CandidateProfile.CandidateProfileData.PreOrganisationAddress;
                    CandidateProfileData.PreOrganisationTurnOver = CandidateProfile.CandidateProfileData.PreOrganisationTurnOver;
                    CandidateProfileData.PreOrganisationMainProduct = CandidateProfile.CandidateProfileData.PreOrganisationMainProduct;
                    CandidateProfileData.PreOrganisationJoinedas = CandidateProfile.CandidateProfileData.PreOrganisationJoinedas;
                    CandidateProfileData.PreOrganisationJoinDate = CandidateProfile.CandidateProfileData.PreOrganisationJoinDate;
                    CandidateProfileData.PreOrganisationPresentPosition = CandidateProfile.CandidateProfileData.PreOrganisationPresentPosition;
                    CandidateProfileData.PreOrganisationPresentPositionDate = CandidateProfile.CandidateProfileData.PreOrganisationPresentPositionDate;
                    CandidateProfileData.PreOrganisationGap = CandidateProfile.CandidateProfileData.PreOrganisationGap;
                    CandidateProfileData.PreOrganisationBasic = CandidateProfile.CandidateProfileData.PreOrganisationBasic;
                    CandidateProfileData.PreOrganisationHRA = CandidateProfile.CandidateProfileData.PreOrganisationHRA;
                    CandidateProfileData.PreOrganisationOtherAllowances = CandidateProfile.CandidateProfileData.PreOrganisationOtherAllowances;
                    CandidateProfileData.PreOrganisationAnualComponents = CandidateProfile.CandidateProfileData.PreOrganisationAnualComponents;
                    CandidateProfileData.PreOrganisationVariablePay = CandidateProfile.CandidateProfileData.PreOrganisationVariablePay;
                    CandidateProfileData.PreOrganisationBenefits = CandidateProfile.CandidateProfileData.PreOrganisationBenefits;
                    CandidateProfileData.PreOrganisationRetrial = CandidateProfile.CandidateProfileData.PreOrganisationRetrial;
                    CandidateProfileData.PreOrganisationOthers = CandidateProfile.CandidateProfileData.PreOrganisationOthers;
                    CandidateProfileData.PreOrganisationTotalCTC = CandidateProfile.CandidateProfileData.PreOrganisationTotalCTC;
                    CandidateProfileData.PreviousAssignmentGap = CandidateProfile.CandidateProfileData.PreviousAssignmentGap;
                    CandidateProfileData.Ref1Name = CandidateProfile.CandidateProfileData.Ref1Name;
                    CandidateProfileData.Ref1Position = CandidateProfile.CandidateProfileData.Ref1Position;
                    CandidateProfileData.Ref1Organisation = CandidateProfile.CandidateProfileData.Ref1Organisation;
                    CandidateProfileData.Ref1Location = CandidateProfile.CandidateProfileData.Ref1Location;
                    CandidateProfileData.Ref1ContactNo = CandidateProfile.CandidateProfileData.Ref1ContactNo;
                    CandidateProfileData.Ref1EmailId = CandidateProfile.CandidateProfileData.Ref1EmailId;
                    CandidateProfileData.Ref2Name = CandidateProfile.CandidateProfileData.Ref2Name;
                    CandidateProfileData.Ref2Position = CandidateProfile.CandidateProfileData.Ref2Position;
                    CandidateProfileData.Ref2Organisation = CandidateProfile.CandidateProfileData.Ref2Organisation;
                    CandidateProfileData.Ref2Location = CandidateProfile.CandidateProfileData.Ref2Location;
                    CandidateProfileData.Ref2ContactNo = CandidateProfile.CandidateProfileData.Ref2ContactNo;
                    CandidateProfileData.Ref2EmailId = CandidateProfile.CandidateProfileData.Ref2EmailId;
                    CandidateProfileData.Ref3Name = CandidateProfile.CandidateProfileData.Ref3Name;
                    CandidateProfileData.Ref3Position = CandidateProfile.CandidateProfileData.Ref3Position;
                    CandidateProfileData.Ref3Organisation = CandidateProfile.CandidateProfileData.Ref3Organisation;
                    CandidateProfileData.Ref3Location = CandidateProfile.CandidateProfileData.Ref3Location;
                    CandidateProfileData.Ref3ContactNo = CandidateProfile.CandidateProfileData.Ref3ContactNo;
                    CandidateProfileData.Ref3EmailId = CandidateProfile.CandidateProfileData.Ref3EmailId;
                    CandidateProfileData.PreInterViewMRF = CandidateProfile.CandidateProfileData.PreInterViewMRF;
                    CandidateProfileData.CriminalCase = CandidateProfile.CandidateProfileData.CriminalCase;
                    CandidateProfileData.CriminalCaseDetails = CandidateProfile.CandidateProfileData.CriminalCaseDetails;
                    CandidateProfileData.PreviousEmployemntEnquiry = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiry;
                    CandidateProfileData.PreviousEmployemntEnquiryDetails = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiryDetails;
                    CandidateProfileData.AdditionoalDetails = CandidateProfile.CandidateProfileData.AdditionoalDetails;
                    CandidateProfileData.JobPortal = CandidateProfile.CandidateProfileData.JobPortal;
                    CandidateProfileData.CampusPlacement = CandidateProfile.CandidateProfileData.CampusPlacement;// added later on 02-12-2023
                    CandidateProfileData.LinkedIn = CandidateProfile.CandidateProfileData.LinkedIn;
                    CandidateProfileData.CareerSite = CandidateProfile.CandidateProfileData.CareerSite;
                    CandidateProfileData.PaperAdvertisement = CandidateProfile.CandidateProfileData.PaperAdvertisement;
                    CandidateProfileData.EmployeeReferal = CandidateProfile.CandidateProfileData.EmployeeReferal;
                    CandidateProfileData.RefNameofEmployee = CandidateProfile.CandidateProfileData.RefNameofEmployee;
                    CandidateProfileData.RefEmployeeId = CandidateProfile.CandidateProfileData.RefEmployeeId;
                    CandidateProfileData.RefEmployeeDesignation = CandidateProfile.CandidateProfileData.RefEmployeeDesignation;
                    CandidateProfileData.RefEmployeeLocation = CandidateProfile.CandidateProfileData.RefEmployeeLocation;
                    CandidateProfileData.RefEmployeeFunction = CandidateProfile.CandidateProfileData.RefEmployeeFunction;
                    CandidateProfileData.RefEmployeeKnowing = CandidateProfile.CandidateProfileData.RefEmployeeKnowing;
                    CandidateProfileData.ConsultantApplicable = CandidateProfile.CandidateProfileData.ConsultantApplicable;
                    CandidateProfileData.Consultant = CandidateProfile.CandidateProfileData.Consultant;
                    CandidateProfileData.OtherSource = CandidateProfile.CandidateProfileData.OtherSource;
                    CandidateProfileData.expectedCTC = CandidateProfile.CandidateProfileData.expectedCTC;
                    CandidateProfileData.joiningDaysRequired = CandidateProfile.CandidateProfileData.joiningDaysRequired;
                    CandidateProfileData.joiningComments = CandidateProfile.CandidateProfileData.joiningComments;
                    CandidateProfileData.SignatureDate = CandidateProfile.CandidateProfileData.SignatureDate;
                    CandidateProfileData.SignaturePlace = CandidateProfile.CandidateProfileData.SignaturePlace;
                    CandidateProfileData.Signature = CandidateProfile.CandidateProfileData.Signature;
                    CandidateProfileData.CreatedBy = CandidateProfile.CandidateProfileData.CreatedBy;
                    CandidateProfileData.SubmitStatus = CandidateProfile.CandidateProfileData.SubmitStatus;
                    CandidateProfileData.IsEnabled = CandidateProfile.CandidateProfileData.IsEnabled;
                    CandidateProfileData.GenderName = CandidateProfile.CandidateProfileData.GenderName;
                    CandidateProfileData.FamilyBackGroundDetails = CandidateProfile.FamilyBackGroundDetails;
                    CandidateProfileData.MRFRelationShipDetails = CandidateProfile.MRFRelationShipDetails;
                    CandidateProfileData.TyreCompanyRelationShipDetails = CandidateProfile.TyreCompanyRelationShipDetails;
                    CandidateProfileData.AcademicDetails = CandidateProfile.AcademicDetails;
                    CandidateProfileData.CertificationDetails = CandidateProfile.CertificationDetails;
                    CandidateProfileData.MembershipDetails = CandidateProfile.MembershipDetails;
                    CandidateProfileData.ExtraCarricularActivitiesDetails = CandidateProfile.ExtraCarricularActivitiesDetails;
                    CandidateProfileData.LanguageKnownDetails = CandidateProfile.LanguageKnownDetails;
                    CandidateProfileData.PeviousAssignmentDetails = CandidateProfile.PeviousAssignmentDetails;
                    CandidateProfileData.MRFPreInterviewDetails = CandidateProfile.MRFPreInterviewDetails;
                    CandidateProfileData.ConsultantName = CandidateProfile.CandidateProfileData.ConsultantName;
                }
                return this.Ok(CandidateProfileData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcandidateprofileapplication")]
        public async Task<IActionResult> GetAllCandidateProfileApplication(SearchCandidateProfile search)
        {
            try
            {
                search.RequisitionDetailId = null;
                CandidateProfileCopy CandidateProfile = new CandidateProfileCopy();
                CandidateProfile = await this.candidateprofileService.GetCandidateProfileApplication(search).ConfigureAwait(false);

                CandidateProfileFormDataCopy CandidateProfileData = new CandidateProfileFormDataCopy();
                if (CandidateProfile.CandidateProfileData != null)
                {
                    CandidateProfileData.CandidateId = CandidateProfile.CandidateProfileData.CandidateId;
                    CandidateProfileData.RequisitionDetailId = CandidateProfile.CandidateProfileData.RequisitionDetailId;
                    CandidateProfileData.CandidateProfileId = CandidateProfile.CandidateProfileData.CandidateProfileId;
                    CandidateProfileData.FullName = CandidateProfile.CandidateProfileData.FullName;
                    CandidateProfileData.CandiadatePhoto = CandidateProfile.CandidateProfileData.CandiadatePhoto;
                    CandidateProfileData.PositionAppliedFor = CandidateProfile.CandidateProfileData.PositionAppliedFor;
                    CandidateProfileData.DOB = CandidateProfile.CandidateProfileData.DOB;
                    CandidateProfileData.Age = CandidateProfile.CandidateProfileData.Age;
                    CandidateProfileData.CommunicationAddress = CandidateProfile.CandidateProfileData.CommunicationAddress;
                    CandidateProfileData.CommunicationStateId = CandidateProfile.CandidateProfileData.CommunicationStateId;
                    CandidateProfileData.CommunicationStateName = CandidateProfile.CandidateProfileData.CommunicationStateName;
                    CandidateProfileData.CommunicationCountryId = CandidateProfile.CandidateProfileData.CommunicationCountryId;
                    CandidateProfileData.CommunicationCountryName = CandidateProfile.CandidateProfileData.CommunicationCountryName;
                    CandidateProfileData.CommunicationPin = CandidateProfile.CandidateProfileData.CommunicationPin;
                    CandidateProfileData.CommunicationPhoneNo = CandidateProfile.CandidateProfileData.CommunicationPhoneNo;
                    CandidateProfileData.CommunicationAlternativeContactNo = CandidateProfile.CandidateProfileData.CommunicationAlternativeContactNo;
                    CandidateProfileData.EmailId = CandidateProfile.CandidateProfileData.EmailId;
                    CandidateProfileData.PermanentAddress = CandidateProfile.CandidateProfileData.PermanentAddress;
                    CandidateProfileData.PermanentStateId = CandidateProfile.CandidateProfileData.PermanentStateId;
                    CandidateProfileData.PermanentStateName = CandidateProfile.CandidateProfileData.PermanentStateName;
                    CandidateProfileData.PermanentCountryId = CandidateProfile.CandidateProfileData.PermanentCountryId;
                    CandidateProfileData.PermanentCountryName = CandidateProfile.CandidateProfileData.PermanentCountryName;
                    CandidateProfileData.PermanentPin = CandidateProfile.CandidateProfileData.PermanentPin;
                    CandidateProfileData.PermanentPhone = CandidateProfile.CandidateProfileData.PermanentPhone;
                    CandidateProfileData.PermanentHomeTown = CandidateProfile.CandidateProfileData.PermanentHomeTown;
                    CandidateProfileData.PermanentNativeStateId = CandidateProfile.CandidateProfileData.PermanentNativeStateId;
                    CandidateProfileData.PermanentNativeStateName = CandidateProfile.CandidateProfileData.PermanentNativeStateName;
                    CandidateProfileData.AadharNo = CandidateProfile.CandidateProfileData.AadharNo;
                    CandidateProfileData.UANNO = CandidateProfile.CandidateProfileData.UANNO;
                    CandidateProfileData.PANNo = CandidateProfile.CandidateProfileData.PANNo;
                    CandidateProfileData.NationalityId = CandidateProfile.CandidateProfileData.NationalityId;
                    CandidateProfileData.NationalityName = CandidateProfile.CandidateProfileData.NationalityName;
                    CandidateProfileData.ReligionId = CandidateProfile.CandidateProfileData.ReligionId;
                    CandidateProfileData.ReligionName = CandidateProfile.CandidateProfileData.ReligionName;
                    CandidateProfileData.CasteId = CandidateProfile.CandidateProfileData.CasteId;
                    CandidateProfileData.CasteName = CandidateProfile.CandidateProfileData.CasteName;
                    CandidateProfileData.Height = CandidateProfile.CandidateProfileData.Height;
                    CandidateProfileData.Weight = CandidateProfile.CandidateProfileData.Weight;
                    CandidateProfileData.BloodGroupId = CandidateProfile.CandidateProfileData.BloodGroupId;
                    CandidateProfileData.BloodGroupName = CandidateProfile.CandidateProfileData.BloodGroupName;
                    CandidateProfileData.EyeSightCorrected = CandidateProfile.CandidateProfileData.EyeSightCorrected;
                    CandidateProfileData.EyeSightRight = CandidateProfile.CandidateProfileData.EyeSightRight;
                    CandidateProfileData.EyeSightLeft = CandidateProfile.CandidateProfileData.EyeSightLeft;
                    CandidateProfileData.CronicMajorIllness = CandidateProfile.CandidateProfileData.CronicMajorIllness;
                    CandidateProfileData.CronicMajorIllnessDetails = CandidateProfile.CandidateProfileData.CronicMajorIllnessDetails;
                    CandidateProfileData.HandiCap = CandidateProfile.CandidateProfileData.HandiCap;
                    CandidateProfileData.HandiCapDetails = CandidateProfile.CandidateProfileData.HandiCapDetails;
                    CandidateProfileData.IdentificationMarks1 = CandidateProfile.CandidateProfileData.IdentificationMarks1;
                    CandidateProfileData.IdentificationMarks2 = CandidateProfile.CandidateProfileData.IdentificationMarks2;
                    CandidateProfileData.MRFRealtives = CandidateProfile.CandidateProfileData.MRFRealtives;
                    CandidateProfileData.TyreCompanyRealtionShip = CandidateProfile.CandidateProfileData.TyreCompanyRealtionShip;
                    CandidateProfileData.ReasonforGap = CandidateProfile.CandidateProfileData.ReasonforGap;
                    CandidateProfileData.DetailsofPublication = CandidateProfile.CandidateProfileData.DetailsofPublication;
                    CandidateProfileData.PreOrganisationName = CandidateProfile.CandidateProfileData.PreOrganisationName;
                    CandidateProfileData.PreOrganisationAddress = CandidateProfile.CandidateProfileData.PreOrganisationAddress;
                    CandidateProfileData.PreOrganisationTurnOver = CandidateProfile.CandidateProfileData.PreOrganisationTurnOver;
                    CandidateProfileData.PreOrganisationMainProduct = CandidateProfile.CandidateProfileData.PreOrganisationMainProduct;
                    CandidateProfileData.PreOrganisationJoinedas = CandidateProfile.CandidateProfileData.PreOrganisationJoinedas;
                    CandidateProfileData.PreOrganisationJoinDate = CandidateProfile.CandidateProfileData.PreOrganisationJoinDate;
                    CandidateProfileData.PreOrganisationPresentPosition = CandidateProfile.CandidateProfileData.PreOrganisationPresentPosition;
                    CandidateProfileData.PreOrganisationPresentPositionDate = CandidateProfile.CandidateProfileData.PreOrganisationPresentPositionDate;
                    CandidateProfileData.PreOrganisationGap = CandidateProfile.CandidateProfileData.PreOrganisationGap;
                    CandidateProfileData.PreOrganisationBasic = CandidateProfile.CandidateProfileData.PreOrganisationBasic;
                    CandidateProfileData.PreOrganisationHRA = CandidateProfile.CandidateProfileData.PreOrganisationHRA;
                    CandidateProfileData.PreOrganisationOtherAllowances = CandidateProfile.CandidateProfileData.PreOrganisationOtherAllowances;
                    CandidateProfileData.PreOrganisationAnualComponents = CandidateProfile.CandidateProfileData.PreOrganisationAnualComponents;
                    CandidateProfileData.PreOrganisationVariablePay = CandidateProfile.CandidateProfileData.PreOrganisationVariablePay;
                    CandidateProfileData.PreOrganisationBenefits = CandidateProfile.CandidateProfileData.PreOrganisationBenefits;
                    CandidateProfileData.PreOrganisationRetrial = CandidateProfile.CandidateProfileData.PreOrganisationRetrial;
                    CandidateProfileData.PreOrganisationOthers = CandidateProfile.CandidateProfileData.PreOrganisationOthers;
                    CandidateProfileData.PreOrganisationTotalCTC = CandidateProfile.CandidateProfileData.PreOrganisationTotalCTC;
                    CandidateProfileData.PreviousAssignmentGap = CandidateProfile.CandidateProfileData.PreviousAssignmentGap;
                    CandidateProfileData.Ref1Name = CandidateProfile.CandidateProfileData.Ref1Name;
                    CandidateProfileData.Ref1Position = CandidateProfile.CandidateProfileData.Ref1Position;
                    CandidateProfileData.Ref1Organisation = CandidateProfile.CandidateProfileData.Ref1Organisation;
                    CandidateProfileData.Ref1Location = CandidateProfile.CandidateProfileData.Ref1Location;
                    CandidateProfileData.Ref1ContactNo = CandidateProfile.CandidateProfileData.Ref1ContactNo;
                    CandidateProfileData.Ref1EmailId = CandidateProfile.CandidateProfileData.Ref1EmailId;
                    CandidateProfileData.Ref2Name = CandidateProfile.CandidateProfileData.Ref2Name;
                    CandidateProfileData.Ref2Position = CandidateProfile.CandidateProfileData.Ref2Position;
                    CandidateProfileData.Ref2Organisation = CandidateProfile.CandidateProfileData.Ref2Organisation;
                    CandidateProfileData.Ref2Location = CandidateProfile.CandidateProfileData.Ref2Location;
                    CandidateProfileData.Ref2ContactNo = CandidateProfile.CandidateProfileData.Ref2ContactNo;
                    CandidateProfileData.Ref2EmailId = CandidateProfile.CandidateProfileData.Ref2EmailId;
                    CandidateProfileData.Ref3Name = CandidateProfile.CandidateProfileData.Ref3Name;
                    CandidateProfileData.Ref3Position = CandidateProfile.CandidateProfileData.Ref3Position;
                    CandidateProfileData.Ref3Organisation = CandidateProfile.CandidateProfileData.Ref3Organisation;
                    CandidateProfileData.Ref3Location = CandidateProfile.CandidateProfileData.Ref3Location;
                    CandidateProfileData.Ref3ContactNo = CandidateProfile.CandidateProfileData.Ref3ContactNo;
                    CandidateProfileData.Ref3EmailId = CandidateProfile.CandidateProfileData.Ref3EmailId;
                    CandidateProfileData.PreInterViewMRF = CandidateProfile.CandidateProfileData.PreInterViewMRF;
                    CandidateProfileData.CriminalCase = CandidateProfile.CandidateProfileData.CriminalCase;
                    CandidateProfileData.CriminalCaseDetails = CandidateProfile.CandidateProfileData.CriminalCaseDetails;
                    CandidateProfileData.PreviousEmployemntEnquiry = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiry;
                    CandidateProfileData.PreviousEmployemntEnquiryDetails = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiryDetails;
                    CandidateProfileData.AdditionoalDetails = CandidateProfile.CandidateProfileData.AdditionoalDetails;
                    CandidateProfileData.JobPortal = CandidateProfile.CandidateProfileData.JobPortal;
                    CandidateProfileData.LinkedIn = CandidateProfile.CandidateProfileData.LinkedIn;
                    CandidateProfileData.CareerSite = CandidateProfile.CandidateProfileData.CareerSite;
                    CandidateProfileData.PaperAdvertisement = CandidateProfile.CandidateProfileData.PaperAdvertisement;
                    CandidateProfileData.EmployeeReferal = CandidateProfile.CandidateProfileData.EmployeeReferal;
                    CandidateProfileData.RefNameofEmployee = CandidateProfile.CandidateProfileData.RefNameofEmployee;
                    CandidateProfileData.RefEmployeeId = CandidateProfile.CandidateProfileData.RefEmployeeId;
                    CandidateProfileData.RefEmployeeDesignation = CandidateProfile.CandidateProfileData.RefEmployeeDesignation;
                    CandidateProfileData.RefEmployeeLocation = CandidateProfile.CandidateProfileData.RefEmployeeLocation;
                    CandidateProfileData.RefEmployeeFunction = CandidateProfile.CandidateProfileData.RefEmployeeFunction;
                    CandidateProfileData.RefEmployeeKnowing = CandidateProfile.CandidateProfileData.RefEmployeeKnowing;
                    CandidateProfileData.ConsultantApplicable = CandidateProfile.CandidateProfileData.ConsultantApplicable;
                    CandidateProfileData.Consultant = CandidateProfile.CandidateProfileData.Consultant;
                    CandidateProfileData.OtherSource = CandidateProfile.CandidateProfileData.OtherSource;
                    CandidateProfileData.expectedCTC = CandidateProfile.CandidateProfileData.expectedCTC;
                    CandidateProfileData.joiningDaysRequired = CandidateProfile.CandidateProfileData.joiningDaysRequired;
                    CandidateProfileData.joiningComments = CandidateProfile.CandidateProfileData.joiningComments;
                    CandidateProfileData.SignatureDate = CandidateProfile.CandidateProfileData.SignatureDate;
                    CandidateProfileData.SignaturePlace = CandidateProfile.CandidateProfileData.SignaturePlace;
                    CandidateProfileData.Signature = CandidateProfile.CandidateProfileData.Signature;
                    CandidateProfileData.CreatedBy = CandidateProfile.CandidateProfileData.CreatedBy;
                    CandidateProfileData.SubmitStatus = CandidateProfile.CandidateProfileData.SubmitStatus;
                    CandidateProfileData.IsEnabled = CandidateProfile.CandidateProfileData.IsEnabled;
                    CandidateProfileData.GenderName = CandidateProfile.CandidateProfileData.GenderName;
                    CandidateProfileData.FamilyBackGroundDetails = CandidateProfile.FamilyBackGroundDetails;
                    CandidateProfileData.MRFRelationShipDetails = CandidateProfile.MRFRelationShipDetails;
                    CandidateProfileData.TyreCompanyRelationShipDetails = CandidateProfile.TyreCompanyRelationShipDetails;
                    CandidateProfileData.AcademicDetails = CandidateProfile.AcademicDetails;
                    CandidateProfileData.CertificationDetails = CandidateProfile.CertificationDetails;
                    CandidateProfileData.MembershipDetails = CandidateProfile.MembershipDetails;
                    CandidateProfileData.ExtraCarricularActivitiesDetails = CandidateProfile.ExtraCarricularActivitiesDetails;
                    CandidateProfileData.LanguageKnownDetails = CandidateProfile.LanguageKnownDetails;
                    CandidateProfileData.PeviousAssignmentDetails = CandidateProfile.PeviousAssignmentDetails;
                    CandidateProfileData.MRFPreInterviewDetails = CandidateProfile.MRFPreInterviewDetails;
                    CandidateProfileData.ConsultantName = CandidateProfile.CandidateProfileData.ConsultantName;
                    CandidateProfileData.IsInternalRef = CandidateProfile.CandidateProfileData.IsInternalRef;
                    CandidateProfileData.InternalRefName = CandidateProfile.CandidateProfileData.InternalRefName;
                }
                return this.Ok(CandidateProfileData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcampuscandidateprofileapplication")]
        public async Task<IActionResult> GetAllCampusCandidateProfileApplication(SearchCandidateProfile search)
        {
            try
            {
                search.RequisitionDetailId = null;
                CampusCandidateProfileCopy CandidateProfile = new CampusCandidateProfileCopy();
                CandidateProfile = await this.candidateprofileService.GetCampusCandidateProfileApplication(search).ConfigureAwait(false);

                CampusCandidateProfileFormDataCopy CandidateProfileData = new CampusCandidateProfileFormDataCopy();
                if (CandidateProfile.CandidateProfileData != null)
                {
                    CandidateProfileData.CandidateId = CandidateProfile.CandidateProfileData.CandidateId;
                    CandidateProfileData.RequisitionDetailId = CandidateProfile.CandidateProfileData.RequisitionDetailId;
                    CandidateProfileData.CandidateProfileId = CandidateProfile.CandidateProfileData.CandidateProfileId;
                    CandidateProfileData.FullName = CandidateProfile.CandidateProfileData.FullName;
                    CandidateProfileData.CandiadatePhoto = CandidateProfile.CandidateProfileData.CandiadatePhoto;
                    CandidateProfileData.PositionAppliedFor = CandidateProfile.CandidateProfileData.PositionAppliedFor;
                    CandidateProfileData.DOB = CandidateProfile.CandidateProfileData.DOB;
                    CandidateProfileData.Age = CandidateProfile.CandidateProfileData.Age;
                    CandidateProfileData.CommunicationAddress = CandidateProfile.CandidateProfileData.CommunicationAddress;
                    CandidateProfileData.CommunicationStateId = CandidateProfile.CandidateProfileData.CommunicationStateId;
                    CandidateProfileData.CommunicationStateName = CandidateProfile.CandidateProfileData.CommunicationStateName;
                    CandidateProfileData.CommunicationCountryId = CandidateProfile.CandidateProfileData.CommunicationCountryId;
                    CandidateProfileData.CommunicationCountryName = CandidateProfile.CandidateProfileData.CommunicationCountryName;
                    CandidateProfileData.CommunicationPin = CandidateProfile.CandidateProfileData.CommunicationPin;
                    CandidateProfileData.CommunicationPhoneNo = CandidateProfile.CandidateProfileData.CommunicationPhoneNo;
                    CandidateProfileData.CommunicationAlternativeContactNo = CandidateProfile.CandidateProfileData.CommunicationAlternativeContactNo;
                    CandidateProfileData.EmailId = CandidateProfile.CandidateProfileData.EmailId;
                    CandidateProfileData.PermanentAddress = CandidateProfile.CandidateProfileData.PermanentAddress;
                    CandidateProfileData.PermanentStateId = CandidateProfile.CandidateProfileData.PermanentStateId;
                    CandidateProfileData.PermanentStateName = CandidateProfile.CandidateProfileData.PermanentStateName;
                    CandidateProfileData.PermanentCountryId = CandidateProfile.CandidateProfileData.PermanentCountryId;
                    CandidateProfileData.PermanentCountryName = CandidateProfile.CandidateProfileData.PermanentCountryName;
                    CandidateProfileData.PermanentPin = CandidateProfile.CandidateProfileData.PermanentPin;
                    CandidateProfileData.PermanentPhone = CandidateProfile.CandidateProfileData.PermanentPhone;
                    CandidateProfileData.PermanentHomeTown = CandidateProfile.CandidateProfileData.PermanentHomeTown;
                    CandidateProfileData.PermanentNativeStateId = CandidateProfile.CandidateProfileData.PermanentNativeStateId;
                    CandidateProfileData.PermanentNativeStateName = CandidateProfile.CandidateProfileData.PermanentNativeStateName;
                    CandidateProfileData.AadharNo = CandidateProfile.CandidateProfileData.AadharNo;
                    CandidateProfileData.UANNO = CandidateProfile.CandidateProfileData.UANNO;
                    CandidateProfileData.PANNo = CandidateProfile.CandidateProfileData.PANNo;
                    CandidateProfileData.NationalityId = CandidateProfile.CandidateProfileData.NationalityId;
                    CandidateProfileData.NationalityName = CandidateProfile.CandidateProfileData.NationalityName;
                    CandidateProfileData.ReligionId = CandidateProfile.CandidateProfileData.ReligionId;
                    CandidateProfileData.ReligionName = CandidateProfile.CandidateProfileData.ReligionName;
                    CandidateProfileData.CasteId = CandidateProfile.CandidateProfileData.CasteId;
                    CandidateProfileData.CasteName = CandidateProfile.CandidateProfileData.CasteName;
                    CandidateProfileData.Height = CandidateProfile.CandidateProfileData.Height;
                    CandidateProfileData.Weight = CandidateProfile.CandidateProfileData.Weight;
                    CandidateProfileData.BloodGroupId = CandidateProfile.CandidateProfileData.BloodGroupId;
                    CandidateProfileData.BloodGroupName = CandidateProfile.CandidateProfileData.BloodGroupName;
                    CandidateProfileData.EyeSightCorrected = CandidateProfile.CandidateProfileData.EyeSightCorrected;
                    CandidateProfileData.EyeSightRight = CandidateProfile.CandidateProfileData.EyeSightRight;
                    CandidateProfileData.EyeSightLeft = CandidateProfile.CandidateProfileData.EyeSightLeft;
                    CandidateProfileData.CronicMajorIllness = CandidateProfile.CandidateProfileData.CronicMajorIllness;
                    CandidateProfileData.CronicMajorIllnessDetails = CandidateProfile.CandidateProfileData.CronicMajorIllnessDetails;
                    CandidateProfileData.HandiCap = CandidateProfile.CandidateProfileData.HandiCap;
                    CandidateProfileData.HandiCapDetails = CandidateProfile.CandidateProfileData.HandiCapDetails;
                    CandidateProfileData.IdentificationMarks1 = CandidateProfile.CandidateProfileData.IdentificationMarks1;
                    CandidateProfileData.IdentificationMarks2 = CandidateProfile.CandidateProfileData.IdentificationMarks2;
                    CandidateProfileData.MRFRealtives = CandidateProfile.CandidateProfileData.MRFRealtives;
                    CandidateProfileData.TyreCompanyRealtionShip = CandidateProfile.CandidateProfileData.TyreCompanyRealtionShip;
                    CandidateProfileData.ReasonforGap = CandidateProfile.CandidateProfileData.ReasonforGap;
                    CandidateProfileData.DetailsofPublication = CandidateProfile.CandidateProfileData.DetailsofPublication;
                    CandidateProfileData.PreOrganisationName = CandidateProfile.CandidateProfileData.PreOrganisationName;
                    CandidateProfileData.PreOrganisationAddress = CandidateProfile.CandidateProfileData.PreOrganisationAddress;
                    CandidateProfileData.PreOrganisationTurnOver = CandidateProfile.CandidateProfileData.PreOrganisationTurnOver;
                    CandidateProfileData.PreOrganisationMainProduct = CandidateProfile.CandidateProfileData.PreOrganisationMainProduct;
                    CandidateProfileData.PreOrganisationJoinedas = CandidateProfile.CandidateProfileData.PreOrganisationJoinedas;
                    CandidateProfileData.PreOrganisationJoinDate = CandidateProfile.CandidateProfileData.PreOrganisationJoinDate;
                    CandidateProfileData.PreOrganisationPresentPosition = CandidateProfile.CandidateProfileData.PreOrganisationPresentPosition;
                    CandidateProfileData.PreOrganisationPresentPositionDate = CandidateProfile.CandidateProfileData.PreOrganisationPresentPositionDate;
                    CandidateProfileData.PreOrganisationGap = CandidateProfile.CandidateProfileData.PreOrganisationGap;
                    CandidateProfileData.PreOrganisationBasic = CandidateProfile.CandidateProfileData.PreOrganisationBasic;
                    CandidateProfileData.PreOrganisationHRA = CandidateProfile.CandidateProfileData.PreOrganisationHRA;
                    CandidateProfileData.PreOrganisationOtherAllowances = CandidateProfile.CandidateProfileData.PreOrganisationOtherAllowances;
                    CandidateProfileData.PreOrganisationAnualComponents = CandidateProfile.CandidateProfileData.PreOrganisationAnualComponents;
                    CandidateProfileData.PreOrganisationVariablePay = CandidateProfile.CandidateProfileData.PreOrganisationVariablePay;
                    CandidateProfileData.PreOrganisationBenefits = CandidateProfile.CandidateProfileData.PreOrganisationBenefits;
                    CandidateProfileData.PreOrganisationRetrial = CandidateProfile.CandidateProfileData.PreOrganisationRetrial;
                    CandidateProfileData.PreOrganisationOthers = CandidateProfile.CandidateProfileData.PreOrganisationOthers;
                    CandidateProfileData.PreOrganisationTotalCTC = CandidateProfile.CandidateProfileData.PreOrganisationTotalCTC;
                    CandidateProfileData.PreviousAssignmentGap = CandidateProfile.CandidateProfileData.PreviousAssignmentGap;
                    CandidateProfileData.Ref1Name = CandidateProfile.CandidateProfileData.Ref1Name;
                    CandidateProfileData.Ref1Position = CandidateProfile.CandidateProfileData.Ref1Position;
                    CandidateProfileData.Ref1Organisation = CandidateProfile.CandidateProfileData.Ref1Organisation;
                    CandidateProfileData.Ref1Location = CandidateProfile.CandidateProfileData.Ref1Location;
                    CandidateProfileData.Ref1ContactNo = CandidateProfile.CandidateProfileData.Ref1ContactNo;
                    CandidateProfileData.Ref1EmailId = CandidateProfile.CandidateProfileData.Ref1EmailId;
                    CandidateProfileData.Ref2Name = CandidateProfile.CandidateProfileData.Ref2Name;
                    CandidateProfileData.Ref2Position = CandidateProfile.CandidateProfileData.Ref2Position;
                    CandidateProfileData.Ref2Organisation = CandidateProfile.CandidateProfileData.Ref2Organisation;
                    CandidateProfileData.Ref2Location = CandidateProfile.CandidateProfileData.Ref2Location;
                    CandidateProfileData.Ref2ContactNo = CandidateProfile.CandidateProfileData.Ref2ContactNo;
                    CandidateProfileData.Ref2EmailId = CandidateProfile.CandidateProfileData.Ref2EmailId;
                    CandidateProfileData.Ref3Name = CandidateProfile.CandidateProfileData.Ref3Name;
                    CandidateProfileData.Ref3Position = CandidateProfile.CandidateProfileData.Ref3Position;
                    CandidateProfileData.Ref3Organisation = CandidateProfile.CandidateProfileData.Ref3Organisation;
                    CandidateProfileData.Ref3Location = CandidateProfile.CandidateProfileData.Ref3Location;
                    CandidateProfileData.Ref3ContactNo = CandidateProfile.CandidateProfileData.Ref3ContactNo;
                    CandidateProfileData.Ref3EmailId = CandidateProfile.CandidateProfileData.Ref3EmailId;
                    CandidateProfileData.PreInterViewMRF = CandidateProfile.CandidateProfileData.PreInterViewMRF;
                    CandidateProfileData.CriminalCase = CandidateProfile.CandidateProfileData.CriminalCase;
                    CandidateProfileData.CriminalCaseDetails = CandidateProfile.CandidateProfileData.CriminalCaseDetails;
                    CandidateProfileData.PreviousEmployemntEnquiry = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiry;
                    CandidateProfileData.PreviousEmployemntEnquiryDetails = CandidateProfile.CandidateProfileData.PreviousEmployemntEnquiryDetails;
                    CandidateProfileData.AdditionoalDetails = CandidateProfile.CandidateProfileData.AdditionoalDetails;
                    CandidateProfileData.JobPortal = CandidateProfile.CandidateProfileData.JobPortal;
                    CandidateProfileData.Campusplacement = CandidateProfile.CandidateProfileData.CampusPlacement; //added later on 04-12-2023
                    CandidateProfileData.LinkedIn = CandidateProfile.CandidateProfileData.LinkedIn;
                    CandidateProfileData.CareerSite = CandidateProfile.CandidateProfileData.CareerSite;
                    CandidateProfileData.PaperAdvertisement = CandidateProfile.CandidateProfileData.PaperAdvertisement;
                    CandidateProfileData.EmployeeReferal = CandidateProfile.CandidateProfileData.EmployeeReferal;
                    CandidateProfileData.RefNameofEmployee = CandidateProfile.CandidateProfileData.RefNameofEmployee;
                    CandidateProfileData.RefEmployeeId = CandidateProfile.CandidateProfileData.RefEmployeeId;
                    CandidateProfileData.RefEmployeeDesignation = CandidateProfile.CandidateProfileData.RefEmployeeDesignation;
                    CandidateProfileData.RefEmployeeLocation = CandidateProfile.CandidateProfileData.RefEmployeeLocation;
                    CandidateProfileData.RefEmployeeFunction = CandidateProfile.CandidateProfileData.RefEmployeeFunction;
                    CandidateProfileData.RefEmployeeKnowing = CandidateProfile.CandidateProfileData.RefEmployeeKnowing;
                    CandidateProfileData.ConsultantApplicable = CandidateProfile.CandidateProfileData.ConsultantApplicable;
                    CandidateProfileData.Consultant = CandidateProfile.CandidateProfileData.Consultant;
                    CandidateProfileData.OtherSource = CandidateProfile.CandidateProfileData.OtherSource;
                    CandidateProfileData.expectedCTC = CandidateProfile.CandidateProfileData.expectedCTC;
                    CandidateProfileData.joiningDaysRequired = CandidateProfile.CandidateProfileData.joiningDaysRequired;
                    CandidateProfileData.joiningComments = CandidateProfile.CandidateProfileData.joiningComments;
                    CandidateProfileData.SignatureDate = CandidateProfile.CandidateProfileData.SignatureDate;
                    CandidateProfileData.SignaturePlace = CandidateProfile.CandidateProfileData.SignaturePlace;
                    CandidateProfileData.Signature = CandidateProfile.CandidateProfileData.Signature;
                    CandidateProfileData.CreatedBy = CandidateProfile.CandidateProfileData.CreatedBy;
                    CandidateProfileData.SubmitStatus = CandidateProfile.CandidateProfileData.SubmitStatus;
                    CandidateProfileData.IsEnabled = CandidateProfile.CandidateProfileData.IsEnabled;
                    CandidateProfileData.GenderName = CandidateProfile.CandidateProfileData.GenderName;
                    CandidateProfileData.FamilyBackGroundDetails = CandidateProfile.FamilyBackGroundDetails;
                    CandidateProfileData.MRFRelationShipDetails = CandidateProfile.MRFRelationShipDetails;
                    CandidateProfileData.TyreCompanyRelationShipDetails = CandidateProfile.TyreCompanyRelationShipDetails;
                    CandidateProfileData.AcademicDetails = CandidateProfile.AcademicDetails;
                    CandidateProfileData.CertificationDetails = CandidateProfile.CertificationDetails;
                    CandidateProfileData.MembershipDetails = CandidateProfile.MembershipDetails;
                    CandidateProfileData.ExtraCarricularActivitiesDetails = CandidateProfile.ExtraCarricularActivitiesDetails;
                    CandidateProfileData.LanguageKnownDetails = CandidateProfile.LanguageKnownDetails;
                    CandidateProfileData.PeviousAssignmentDetails = CandidateProfile.PeviousAssignmentDetails;
                    CandidateProfileData.MRFPreInterviewDetails = CandidateProfile.MRFPreInterviewDetails;
                    CandidateProfileData.ConsultantName = CandidateProfile.CandidateProfileData.ConsultantName;
                }
                return this.Ok(CandidateProfileData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("enabledisablecandidateprofile")]
        public async Task<IActionResult> UpdateCandidateProfileStatus(CandidateProfileAStatusFormData formdata)
        {
            try
            {
                var response = await this.candidateprofileService.UpdateCandidateProfileStatus(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}












