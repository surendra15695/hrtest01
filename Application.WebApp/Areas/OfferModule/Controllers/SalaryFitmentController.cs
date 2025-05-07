using Application.Entity.Entities.OfferModule;
using Application.Service.Services.Interfaces.OfferModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using System.Data;
using System.Dynamic;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Application.WebApp.Areas.OfferModule.Controllers
{
    [Route("api/salaryfitment")]
    [ApiController]
    public class SalaryFitmentController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ISalaryFitmentService salaryfitmentService;
        public SalaryFitmentController(ISalaryFitmentService salaryfitmentservice, IWebHostEnvironment environment)
        {
            this.salaryfitmentService = salaryfitmentservice;
            this.environment = environment;
        }
        public string ContainerReference = null;
        string fileName = "";
        private async Task UploadToAzureAsync(IFormFile file)
        {

            var cloudStorageAccountname = this.salaryfitmentService.CloudStorageAccountname();
            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(cloudStorageAccountname.ToString());
            var CloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            var cloudBlobContainer = CloudBlobClient.GetContainerReference(ContainerReference);
            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Off });
            }
            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
            cloudBlockBlob.Properties.ContentType = "application/pdf";
            await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream());
        }


        [HttpPost]
        [Route("getsalaryfitmentData")]
        public async Task<IActionResult> GetSalaryFitmentData(SearchSalaryFitment search)
        {
            try
            {
                SalaryFitment SalaryFitment = new SalaryFitment();
                SalaryFitment = await this.salaryfitmentService.GetSalaryFitmentData(search).ConfigureAwait(false);

                SalaryFitmentData SalaryFitmentData = new SalaryFitmentData();
                if (SalaryFitment.SalaryFitmentMaster != null)
                {
                    SalaryFitmentData.RequsitaionDetailsId = SalaryFitment.SalaryFitmentMaster.RequsitaionDetailsId;
                    SalaryFitmentData.CandidateId = SalaryFitment.SalaryFitmentMaster.CandidateId;
                    SalaryFitmentData.CandidateFullName = SalaryFitment.SalaryFitmentMaster.CandidateFullName;
                    SalaryFitmentData.CandidateEmailId = SalaryFitment.SalaryFitmentMaster.CandidateEmailId;
                    SalaryFitmentData.CandidatePhone = SalaryFitment.SalaryFitmentMaster.CandidatePhone;
                    SalaryFitmentData.CandidateGender = SalaryFitment.SalaryFitmentMaster.CandidateGender;
                    SalaryFitmentData.Age = SalaryFitment.SalaryFitmentMaster.Age;
                    SalaryFitmentData.AadharNo = SalaryFitment.SalaryFitmentMaster.AadharNo;
                    SalaryFitmentData.MotherTongue = SalaryFitment.SalaryFitmentMaster.MotherTongue;
                    SalaryFitmentData.LanguageKnown = SalaryFitment.SalaryFitmentMaster.LanguageKnown;
                    SalaryFitmentData.HighestQualification = SalaryFitment.SalaryFitmentMaster.HighestQualification;
                    SalaryFitmentData.Course = SalaryFitment.SalaryFitmentMaster.Course;
                    SalaryFitmentData.Stream = SalaryFitment.SalaryFitmentMaster.Stream;
                    SalaryFitmentData.Percentage = SalaryFitment.SalaryFitmentMaster.Percentage;
                    SalaryFitmentData.YearofCompletion = SalaryFitment.SalaryFitmentMaster.YearofCompletion;
                    SalaryFitmentData.QualificationType = SalaryFitment.SalaryFitmentMaster.QualificationType;
                    SalaryFitmentData.Totalexperience = SalaryFitment.SalaryFitmentMaster.Totalexperience;
                    SalaryFitmentData.CurrentCTC = SalaryFitment.SalaryFitmentMaster.CurrentCTC;
                    SalaryFitmentData.CurrentEmployer = SalaryFitment.SalaryFitmentMaster.CurrentEmployer;
                    SalaryFitmentData.Designation = SalaryFitment.SalaryFitmentMaster.Designation;
                    SalaryFitmentData.Domain = SalaryFitment.SalaryFitmentMaster.Domain;
                    SalaryFitmentData.SubDomain = SalaryFitment.SalaryFitmentMaster.SubDomain;
                    SalaryFitmentData.CurrentLocation = SalaryFitment.SalaryFitmentMaster.CurrentLocation;
                    SalaryFitmentData.AnyPreviousApplicationHistoryinMRF = SalaryFitment.SalaryFitmentMaster.AnyPreviousApplicationHistoryinMRF;
                    SalaryFitmentData.AnyRelativeWorkingonMRF = SalaryFitment.SalaryFitmentMaster.AnyRelativeWorkingonMRF;
                    SalaryFitmentData.Source = SalaryFitment.SalaryFitmentMaster.Source;
                    SalaryFitmentData.CandidateOwner = SalaryFitment.SalaryFitmentMaster.CandidateOwner;
                    SalaryFitmentData.CandidateResume = SalaryFitment.SalaryFitmentMaster.CandidateResume;
                    SalaryFitmentData.HiringStatusId = SalaryFitment.SalaryFitmentMaster.HiringStatusId;
                    SalaryFitmentData.HiringStatusName = SalaryFitment.SalaryFitmentMaster.HiringStatusName;
                    //SalaryFitmentDetails SalaryFitmentDetails = new SalaryFitmentDetails();
                    //SalaryFitmentDetails.SalaryFitmentDetailsId = SalaryFitmentData.SalaryFitmentDetails.Add (SalaryFitmentDetails.SalaryFitmentDetailsId)

                    SalaryFitmentData.SalaryFitmentRemaks = SalaryFitment.SalaryFitmentRemaks.ToList();
                    SalaryFitmentData.SalaryFitmentExperience = SalaryFitment.SalaryFitmentExperience.ToList();
                    SalaryFitmentData.SalaryFitmentInternalEmployee = SalaryFitment.SalaryFitmentInternalEmployee.ToList();
                    SalaryFitmentData.SalaryFitmentDetails = SalaryFitment.SalaryFitmentDetails.ToList();
                    foreach (var data in SalaryFitmentData.SalaryFitmentDetails)
                    {
                        data.SalaryFitmentSalaryDetails = SalaryFitment.SalaryFitmentSalaryDetails.Where(x => x.SalaryFitmentDetailsId == data.SalaryFitmentDetailsId).ToList();
                    }
                    foreach (var data in SalaryFitmentData.SalaryFitmentDetails)
                    {
                        data.SalaryFitmentSalaryDetailsFormat = SalaryFitment.SalaryFitmentSalaryDetailsFormat.Where(x => x.SalaryFitmentDetailsId == data.SalaryFitmentDetailsId).ToList();
                    }
                }
                return this.Ok(SalaryFitmentData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampussalaryfitmentData")]
        public async Task<IActionResult> GetCampusSalaryFitmentData(SearchSalaryFitment search)
        {
            try
            {
                SalaryFitment SalaryFitment = new SalaryFitment();
                SalaryFitment = await this.salaryfitmentService.GetCampusSalaryFitmentData(search).ConfigureAwait(false);

                SalaryFitmentData SalaryFitmentData = new SalaryFitmentData();
                if (SalaryFitment.SalaryFitmentMaster != null)
                {
                    SalaryFitmentData.RequsitaionDetailsId = SalaryFitment.SalaryFitmentMaster.RequsitaionDetailsId;
                    SalaryFitmentData.CandidateId = SalaryFitment.SalaryFitmentMaster.CandidateId;
                    SalaryFitmentData.CandidateFullName = SalaryFitment.SalaryFitmentMaster.CandidateFullName;
                    SalaryFitmentData.CandidateEmailId = SalaryFitment.SalaryFitmentMaster.CandidateEmailId;
                    SalaryFitmentData.CandidatePhone = SalaryFitment.SalaryFitmentMaster.CandidatePhone;
                    SalaryFitmentData.CandidateGender = SalaryFitment.SalaryFitmentMaster.CandidateGender;
                    SalaryFitmentData.Age = SalaryFitment.SalaryFitmentMaster.Age;
                    SalaryFitmentData.AadharNo = SalaryFitment.SalaryFitmentMaster.AadharNo;
                    SalaryFitmentData.MotherTongue = SalaryFitment.SalaryFitmentMaster.MotherTongue;
                    SalaryFitmentData.LanguageKnown = SalaryFitment.SalaryFitmentMaster.LanguageKnown;
                    SalaryFitmentData.HighestQualification = SalaryFitment.SalaryFitmentMaster.HighestQualification;
                    SalaryFitmentData.Course = SalaryFitment.SalaryFitmentMaster.Course;
                    SalaryFitmentData.Stream = SalaryFitment.SalaryFitmentMaster.Stream;
                    SalaryFitmentData.Percentage = SalaryFitment.SalaryFitmentMaster.Percentage;
                    SalaryFitmentData.YearofCompletion = SalaryFitment.SalaryFitmentMaster.YearofCompletion;
                    SalaryFitmentData.QualificationType = SalaryFitment.SalaryFitmentMaster.QualificationType;
                    SalaryFitmentData.Totalexperience = SalaryFitment.SalaryFitmentMaster.Totalexperience;
                    SalaryFitmentData.CurrentCTC = SalaryFitment.SalaryFitmentMaster.CurrentCTC;
                    SalaryFitmentData.CurrentEmployer = SalaryFitment.SalaryFitmentMaster.CurrentEmployer;
                    SalaryFitmentData.Designation = SalaryFitment.SalaryFitmentMaster.Designation;
                    SalaryFitmentData.Domain = SalaryFitment.SalaryFitmentMaster.Domain;
                    SalaryFitmentData.SubDomain = SalaryFitment.SalaryFitmentMaster.SubDomain;
                    SalaryFitmentData.CurrentLocation = SalaryFitment.SalaryFitmentMaster.CurrentLocation;
                    SalaryFitmentData.AnyPreviousApplicationHistoryinMRF = SalaryFitment.SalaryFitmentMaster.AnyPreviousApplicationHistoryinMRF;
                    SalaryFitmentData.AnyRelativeWorkingonMRF = SalaryFitment.SalaryFitmentMaster.AnyRelativeWorkingonMRF;
                    SalaryFitmentData.Source = SalaryFitment.SalaryFitmentMaster.Source;
                    SalaryFitmentData.CandidateOwner = SalaryFitment.SalaryFitmentMaster.CandidateOwner;
                    SalaryFitmentData.CandidateResume = SalaryFitment.SalaryFitmentMaster.CandidateResume;
                    SalaryFitmentData.HiringStatusId = SalaryFitment.SalaryFitmentMaster.HiringStatusId;
                    SalaryFitmentData.HiringStatusName = SalaryFitment.SalaryFitmentMaster.HiringStatusName;
                    //SalaryFitmentDetails SalaryFitmentDetails = new SalaryFitmentDetails();
                    //SalaryFitmentDetails.SalaryFitmentDetailsId = SalaryFitmentData.SalaryFitmentDetails.Add (SalaryFitmentDetails.SalaryFitmentDetailsId)

                    SalaryFitmentData.SalaryFitmentRemaks = SalaryFitment.SalaryFitmentRemaks.ToList();
                    SalaryFitmentData.SalaryFitmentExperience = SalaryFitment.SalaryFitmentExperience.ToList();
                    SalaryFitmentData.SalaryFitmentInternalEmployee = SalaryFitment.SalaryFitmentInternalEmployee.ToList();
                    SalaryFitmentData.SalaryFitmentDetails = SalaryFitment.SalaryFitmentDetails.ToList();
                    foreach (var data in SalaryFitmentData.SalaryFitmentDetails)
                    {
                        data.SalaryFitmentSalaryDetails = SalaryFitment.SalaryFitmentSalaryDetails.Where(x => x.SalaryFitmentDetailsId == data.SalaryFitmentDetailsId).ToList();
                    }
                    foreach (var data in SalaryFitmentData.SalaryFitmentDetails)
                    {
                        data.SalaryFitmentSalaryDetailsFormat = SalaryFitment.SalaryFitmentSalaryDetailsFormat.Where(x => x.SalaryFitmentDetailsId == data.SalaryFitmentDetailsId).ToList();
                    }
                }
                return this.Ok(SalaryFitmentData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("insertsalaryfitment")]
        public async Task<IActionResult> InsertSalaryFitment(IFormCollection data)
        {
            try
            {
                SalaryFitmentMasterData formData = new SalaryFitmentMasterData();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);

                ContainerReference = "candidatedocument";
                var httpRequest = HttpContext.Request;
                string FileDataName = "";
                fileName = "";
                var file = Request.Form.Files[0];

                FileDataName = Request.Form.Files[0].Name;
                var timestamp = DateTime.Now.ToFileTime();
                string timestampfilename = Convert.ToString(timestamp);
                fileName = timestampfilename + "_" + formData.CandidateId.ToString() + "_salaryfitment.pdf";
                if (file.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await Request.Form.Files[0].CopyToAsync(memoryStream);
                        await UploadToAzureAsync(Request.Form.Files[0]);
                    }
                    
                }
                formData.Documentpath = "/" + ContainerReference + "/" + fileName;

                formData.RequsitaionDetailId = Convert.ToInt32(data["RequsitaionDetailId"]);
                formData.SalaryFitmentDetailsId = Convert.ToInt32(data["SalaryFitmentDetailsId"]);
                formData.SalaryFitmentId = Convert.ToInt32(data["SalaryFitmentId"]);
                formData.Probation = Convert.ToInt32(data["Probation"]);
                formData.Location = Convert.ToInt32(data["Location"]);
                //formData.Designation = Convert.ToInt32(data["Designation"]);
                formData.Designation = data["Designation"];
                formData.Grade = Convert.ToInt32(data["Grade"]);
                formData.CTC = Convert.ToDecimal(data["CTC"]);
                formData.CTCIncrementPercent = Convert.ToDecimal(data["CTCIncrementPercent"]);
                formData.BasicIncrementPercent = Convert.ToDecimal(data["BasicIncrementPercent"]);
                string SalaryFitmentRemaks = data["SalaryFitmentRemaks"];
                formData.SalaryFitmentRemaks = JsonConvert.DeserializeObject<List<SalaryFitmentRemaks>>(SalaryFitmentRemaks);
                string SalaryFitmentSalaryDetails = data["SalaryFitmentSalaryDetails"];
                formData.SalaryFitmentSalaryDetails = JsonConvert.DeserializeObject<List<SalaryFitmentSalaryDetails>>(SalaryFitmentSalaryDetails);
                string SalaryFitmentSalaryDetailsFormat = data["SalaryFitmentSalaryDetailsFormat"];
                formData.SalaryFitmentSalaryDetailsFormat = JsonConvert.DeserializeObject<List<SalaryFitmentSalaryDetailsFormat>>(SalaryFitmentSalaryDetailsFormat);
                string SalaryFitmentExperience = data["SalaryFitmentExperience"];
                formData.SalaryFitmentExperience = JsonConvert.DeserializeObject<List<SalaryFitmentExperience>>(SalaryFitmentExperience);
                string SalaryFitmentInternalEmployee = data["SalaryFitmentInternalEmployee"];
                formData.SalaryFitmentInternalEmployee = JsonConvert.DeserializeObject<List<SalaryFitmentInternalEmployee>>(SalaryFitmentInternalEmployee);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.salaryfitmentService.SaveSalaryFitment(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campusinsertsalaryfitment")]
        public async Task<IActionResult> CampusInsertSalaryFitment(IFormCollection data)
        {
            try
            {
                SalaryFitmentMasterData formData = new SalaryFitmentMasterData();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequsitaionDetailId = Convert.ToInt32(data["RequsitaionDetailId"]);
                formData.SalaryFitmentDetailsId = Convert.ToInt32(data["SalaryFitmentDetailsId"]);
                formData.SalaryFitmentId = Convert.ToInt32(data["SalaryFitmentId"]);
                formData.Probation = Convert.ToInt32(data["Probation"]);
                formData.Location = Convert.ToInt32(data["Location"]);
                //formData.Designation = Convert.ToInt32(data["Designation"]);
                formData.Designation = data["Designation"];
                formData.Grade = Convert.ToInt32(data["Grade"]);
                formData.CTC = Convert.ToDecimal(data["CTC"]);
                formData.CTCIncrementPercent = Convert.ToDecimal(data["CTCIncrementPercent"]);
                formData.BasicIncrementPercent = Convert.ToDecimal(data["BasicIncrementPercent"]);
                string SalaryFitmentRemaks = data["SalaryFitmentRemaks"];
                formData.SalaryFitmentRemaks = JsonConvert.DeserializeObject<List<SalaryFitmentRemaks>>(SalaryFitmentRemaks);
                string SalaryFitmentSalaryDetails = data["SalaryFitmentSalaryDetails"];
                formData.SalaryFitmentSalaryDetails = JsonConvert.DeserializeObject<List<SalaryFitmentSalaryDetails>>(SalaryFitmentSalaryDetails);
                string SalaryFitmentSalaryDetailsFormat = data["SalaryFitmentSalaryDetailsFormat"];
                formData.SalaryFitmentSalaryDetailsFormat = JsonConvert.DeserializeObject<List<SalaryFitmentSalaryDetailsFormat>>(SalaryFitmentSalaryDetailsFormat);
                string SalaryFitmentExperience = data["SalaryFitmentExperience"];
                formData.SalaryFitmentExperience = JsonConvert.DeserializeObject<List<SalaryFitmentExperience>>(SalaryFitmentExperience);
                string SalaryFitmentInternalEmployee = data["SalaryFitmentInternalEmployee"];
                formData.SalaryFitmentInternalEmployee = JsonConvert.DeserializeObject<List<SalaryFitmentInternalEmployee>>(SalaryFitmentInternalEmployee);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.salaryfitmentService.CampusSaveSalaryFitment(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatesalaryfitmentcandidate")]
        public async Task<IActionResult> UpdateSalaryFitmentCandidate(IFormCollection data)
        {
            try
            {
                SalaryFitmentAcceptance formData = new SalaryFitmentAcceptance();
                formData.SalaryFitmentDetailsId = Convert.ToInt32(data["SalaryFitmentDetailsId"]);
                formData.SalaryFitmentId = Convert.ToInt32(data["SalaryFitmentId"]);
                formData.Acceptance = Convert.ToInt32(data["Acceptance"]);
                //formData.SalaryFitmentId = Convert.ToInt32(data["SalaryFitmentId"]);
                formData.Remarks = data["Remarks"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.salaryfitmentService.UpdateSalaryFitmentCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatecampussalaryfitmentcandidate")]
        public async Task<IActionResult> UpdateCampusSalaryFitmentCandidate(IFormCollection data)
        {
            try
            {
                SalaryFitmentAcceptance formData = new SalaryFitmentAcceptance();
                formData.SalaryFitmentDetailsId = Convert.ToInt32(data["SalaryFitmentDetailsId"]);
                formData.SalaryFitmentId = Convert.ToInt32(data["SalaryFitmentId"]);
                formData.Acceptance = Convert.ToInt32(data["Acceptance"]);
                //formData.SalaryFitmentId = Convert.ToInt32(data["SalaryFitmentId"]);
                formData.Remarks = data["Remarks"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.salaryfitmentService.UpdateCampusSalaryFitmentCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
