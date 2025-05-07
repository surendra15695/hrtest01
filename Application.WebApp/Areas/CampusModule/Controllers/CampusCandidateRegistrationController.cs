using Application.Entity.Entities.CampusModule;
using Application.Service.Services.Interfaces.CampusModule;
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

namespace Application.WebApp.Areas.CampusModule.Controllers
{

    [Route("api/campuscandidateregistration")]
    [ApiController]
    public class CampusCandidateRegistrationController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICampusCandidateRegistrationService campuscandidateregistrationservice;
        public CampusCandidateRegistrationController(ICampusCandidateRegistrationService campuscandidateregistrationservice, IWebHostEnvironment environment)
        {
            this.campuscandidateregistrationservice = campuscandidateregistrationservice;
            this.environment = environment;
        }
        //uat
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        // live
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");
        public string ContainerReference = null;
        string fileName = "";

        [HttpPost]
        [Route("getcampuscandidate")]
        public async Task<IActionResult> GetCampusCandidate(CampusCandidateSearch search)
        {
            try
            {
                CampusCandidate CampusCandidate = new CampusCandidate();
                CampusCandidate = await this.campuscandidateregistrationservice.GetCampusCandidate(search).ConfigureAwait(false);

                CampusCandidateData CampusCandidateData = new CampusCandidateData();
                if (CampusCandidate.CampusCandidateMasterData != null)
                {
                    CampusCandidateData.CampusCandidateId = CampusCandidate.CampusCandidateMasterData.CampusCandidateId;
                    CampusCandidateData.CampusLinkId = CampusCandidate.CampusCandidateMasterData.CampusLinkId;
                    CampusCandidateData.CandidateId = CampusCandidate.CampusCandidateMasterData.CandidateId;
                    CampusCandidateData.FullName = CampusCandidate.CampusCandidateMasterData.FullName;
                    CampusCandidateData.Gender = CampusCandidate.CampusCandidateMasterData.Gender;
                    CampusCandidateData.GenderName = CampusCandidate.CampusCandidateMasterData.GenderName;
                    CampusCandidateData.DOB = CampusCandidate.CampusCandidateMasterData.DOB;
                    CampusCandidateData.Age = CampusCandidate.CampusCandidateMasterData.Age;
                    CampusCandidateData.EmailId = CampusCandidate.CampusCandidateMasterData.EmailId;
                    CampusCandidateData.PhoneNo = CampusCandidate.CampusCandidateMasterData.PhoneNo;
                    CampusCandidateData.AadharNo = CampusCandidate.CampusCandidateMasterData.AadharNo;
                    CampusCandidateData.HomeTown = CampusCandidate.CampusCandidateMasterData.HomeTown;
                    CampusCandidateData.NativeState = CampusCandidate.CampusCandidateMasterData.NativeState;
                    CampusCandidateData.NativeStateName = CampusCandidate.CampusCandidateMasterData.NativeStateName;
                    CampusCandidateData.PresentState = CampusCandidate.CampusCandidateMasterData.PresentState;
                    CampusCandidateData.PresentStateName = CampusCandidate.CampusCandidateMasterData.PresentStateName;
                    CampusCandidateData.MotherTongue = CampusCandidate.CampusCandidateMasterData.MotherTongue;
                    CampusCandidateData.MotherTongueName = CampusCandidate.CampusCandidateMasterData.MotherTongueName;
                    CampusCandidateData.LanguageKnown = CampusCandidate.CampusCandidateMasterData.LanguageKnown;
                    CampusCandidateData.LanguageKnownName = CampusCandidate.CampusCandidateMasterData.LanguageKnownName;
                    CampusCandidateData.Height = CampusCandidate.CampusCandidateMasterData.Height;
                    CampusCandidateData.Weight = CampusCandidate.CampusCandidateMasterData.Weight;
                    CampusCandidateData.EyeSightCorrected = CampusCandidate.CampusCandidateMasterData.EyeSightCorrected;
                    CampusCandidateData.EyeSightRight = CampusCandidate.CampusCandidateMasterData.EyeSightRight;
                    CampusCandidateData.EyeSightLeft = CampusCandidate.CampusCandidateMasterData.EyeSightLeft;
                    CampusCandidateData.FatherOccupation = CampusCandidate.CampusCandidateMasterData.FatherOccupation;
                    CampusCandidateData.FatherOccupationName = CampusCandidate.CampusCandidateMasterData.FatherOccupationName;
                    CampusCandidateData.MotherOccupation = CampusCandidate.CampusCandidateMasterData.MotherOccupation;
                    CampusCandidateData.MotherOccupationName = CampusCandidate.CampusCandidateMasterData.MotherOccupationName;
                    CampusCandidateData.Disability = CampusCandidate.CampusCandidateMasterData.Disability;
                    CampusCandidateData.DisabilityDetails = CampusCandidate.CampusCandidateMasterData.DisabilityDetails;
                    CampusCandidateData.HealthIssue = CampusCandidate.CampusCandidateMasterData.HealthIssue;
                    CampusCandidateData.HealthIssueDetails = CampusCandidate.CampusCandidateMasterData.HealthIssueDetails;
                    CampusCandidateData.NoofSiblings = CampusCandidate.CampusCandidateMasterData.NoofSiblings;
                    CampusCandidateData.MRFRealtive = CampusCandidate.CampusCandidateMasterData.MRFRealtive;
                    CampusCandidateData.RealtiveName = CampusCandidate.CampusCandidateMasterData.RealtiveName;
                    CampusCandidateData.RealtiveMobileNo = CampusCandidate.CampusCandidateMasterData.RealtiveMobileNo;
                    CampusCandidateData.YearsCommitments = CampusCandidate.CampusCandidateMasterData.YearsCommitments;
                    CampusCandidateData.AnyWhereinIndia = CampusCandidate.CampusCandidateMasterData.AnyWhereinIndia;
                    CampusCandidateData.WorkinginShift = CampusCandidate.CampusCandidateMasterData.WorkinginShift;
                    CampusCandidateData.JobTypePriority = CampusCandidate.CampusCandidateMasterData.JobTypePriority;
                    CampusCandidateData.CriticalFactor = CampusCandidate.CampusCandidateMasterData.CriticalFactor;
                    CampusCandidateData.MostPreferdBenifit = CampusCandidate.CampusCandidateMasterData.MostPreferdBenifit;
                    CampusCandidateData.ExtraCurricularActivities = CampusCandidate.CampusCandidateMasterData.ExtraCurricularActivities;
                    CampusCandidateData.Resume = CampusCandidate.CampusCandidateMasterData.Resume;
                    CampusCandidateData.CreatedBy = CampusCandidate.CampusCandidateMasterData.CreatedBy;

                    CampusCandidateData.CampusCandidateHighSchool = CampusCandidate.CampusCandidateHighSchool;
                    CampusCandidateData.CampusCandidateHigherSecondary = CampusCandidate.CampusCandidateHigherSecondary;
                    CampusCandidateData.CampusCandidateDiploma = CampusCandidate.CampusCandidateDiploma;
                    CampusCandidateData.CampusCandidateGraduation = CampusCandidate.CampusCandidateGraduation;
                    CampusCandidateData.CampusCandidatePostGraduate = CampusCandidate.CampusCandidatePostGraduate;
                    CampusCandidateData.CampusCandidateOtherQulifiaction = CampusCandidate.CampusCandidateOtherQulifiaction;
                }
                return this.Ok(CampusCandidateData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.campuscandidateregistrationservice.CloudStorageAccountname();

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
        [Route("savecampuscandidate")]
        public async Task<IActionResult> SaveCampusCandidate(IFormCollection data)
        {

            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";
                             
                if (file.Length > 0)
                {
                    var timestamp = DateTime.Now.ToFileTime();
                    string timestampfilename = Convert.ToString(timestamp);
                    fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    fileResume = Path.Combine("/candidateresume", fileName);
                    fileResume = fileResume.Replace("\\", "/");                   
                              
                      await UploadToAzureAsync(file);
                    

                }


                CampusCandidateSave formData = new CampusCandidateSave();
                formData.CampusCandidateId = Convert.ToInt32(data["CampusCandidateId"]);
                formData.CampusLinkId = Convert.ToInt32(data["CampusLinkId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.FullName = data["FullName"];
                formData.Gender = Convert.ToInt32(data["Gender"]);
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.EmailId = data["EmailId"];
                formData.PhoneNo = data["PhoneNo"];
                formData.AadharNo = data["AadharNo"];
                formData.HomeTown = data["HomeTown"];
                formData.NativeState = Convert.ToInt32(data["NativeState"]);
                formData.PresentState = Convert.ToInt32(data["PresentState"]);
                formData.MotherTongue = Convert.ToInt32(data["MotherTongue"]);
                formData.LanguageKnown = data["LanguageKnown"];
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["EyeSightRight"];
                formData.EyeSightLeft = data["EyeSightLeft"];
                formData.FatherOccupation = Convert.ToInt32(data["FatherOccupation"]);
                formData.MotherOccupation = Convert.ToInt32(data["MotherOccupation"]);
                formData.Disability = Convert.ToBoolean(data["Disability"]);
                formData.DisabilityDetails = data["DisabilityDetails"];
                formData.HealthIssue = Convert.ToBoolean(data["HealthIssue"]);
                formData.HealthIssueDetails = data["HealthIssueDetails"];
                formData.NoofSiblings = Convert.ToInt32(data["NoofSiblings"]);
                formData.MRFRealtive = Convert.ToBoolean(data["MRFRealtive"]);
                formData.RealtiveName = data["RealtiveName"];
                formData.RealtiveMobileNo = data["RealtiveMobileNo"];
                formData.YearsCommitments = Convert.ToInt32(data["YearsCommitments"]);
                formData.AnyWhereinIndia = Convert.ToInt32(data["AnyWhereinIndia"]);
                formData.WorkinginShift = Convert.ToInt32(data["WorkinginShift"]);
                formData.JobTypePriority = Convert.ToInt32(data["JobTypePriority"]);
                formData.CriticalFactor = Convert.ToInt32(data["CriticalFactor"]);
                formData.MostPreferdBenifit = Convert.ToInt32(data["MostPreferdBenifit"]);
                formData.ExtraCurricularActivities = data["ExtraCurricularActivities"];
                formData.ActiveArrears = Convert.ToInt32(data["ActiveArrears"]);
                formData.Resume = fileResume;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.DeletedIds = data["DeletedIds"];
                formData.HighestQualification = Convert.ToInt32(data["HighestQualification"]);
                string CampusCandidateAcademic = data["CampusCandidateAcademic"];
                string CampusCandidateAnyOtherAcademic = data["CampusCandidateAnyOtherAcademic"];
                formData.CampusCandidateAcademic = JsonConvert.DeserializeObject<List<CampusCandidateAcademic>>(CampusCandidateAcademic);
                formData.CampusCandidateAnyOtherAcademic = JsonConvert.DeserializeObject<List<CandidateAnyOtherAcademic>>(CampusCandidateAnyOtherAcademic);


                var response = await this.campuscandidateregistrationservice.SaveCampusCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("saveoffcampuscandidate")]
        public async Task<IActionResult> SaveOffCampusCandidate(IFormCollection data)
        {

            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";

                if (file.Length > 0)
                {
                    var timestamp = DateTime.Now.ToFileTime();
                    string timestampfilename = Convert.ToString(timestamp);
                    fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    fileResume = Path.Combine("/candidateresume", fileName);
                    fileResume = fileResume.Replace("\\", "/");

                   await UploadToAzureAsync(file);


                }


                OffCampusCandidateSaveNew formData = new OffCampusCandidateSaveNew();
                formData.CampusCandidateId = Convert.ToInt32(data["CampusCandidateId"]);
                formData.CampusLinkId = Convert.ToInt32(data["CampusLinkId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.FullName = data["FullName"];
                formData.Gender = Convert.ToInt32(data["Gender"]);
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.EmailId = data["EmailId"];
                formData.PhoneNo = data["PhoneNo"];
                formData.AadharNo = data["AadharNo"];
                formData.HomeTown = data["HomeTown"];
                formData.NativeState = Convert.ToInt32(data["NativeState"]);
                formData.PresentState = Convert.ToInt32(data["PresentState"]);
                formData.MotherTongue = Convert.ToInt32(data["MotherTongue"]);
                formData.LanguageKnown = data["LanguageKnown"];
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["EyeSightRight"];
                formData.EyeSightLeft = data["EyeSightLeft"];
                formData.FatherOccupation = Convert.ToInt32(data["FatherOccupation"]);
                formData.MotherOccupation = Convert.ToInt32(data["MotherOccupation"]);
                formData.Disability = Convert.ToBoolean(data["Disability"]);
                formData.DisabilityDetails = data["DisabilityDetails"];
                formData.HealthIssue = Convert.ToBoolean(data["HealthIssue"]);
                formData.HealthIssueDetails = data["HealthIssueDetails"];
                formData.NoofSiblings = Convert.ToInt32(data["NoofSiblings"]);
                formData.MRFRealtive = Convert.ToBoolean(data["MRFRealtive"]);
                formData.RealtiveName = data["RealtiveName"];
                formData.RealtiveMobileNo = data["RealtiveMobileNo"];
                formData.YearsCommitments = Convert.ToInt32(data["YearsCommitments"]);
                formData.AnyWhereinIndia = Convert.ToInt32(data["AnyWhereinIndia"]);
                formData.WorkinginShift = Convert.ToInt32(data["WorkinginShift"]);
                formData.JobTypePriority = Convert.ToInt32(data["JobTypePriority"]);
                formData.CriticalFactor = Convert.ToInt32(data["CriticalFactor"]);
                formData.MostPreferdBenifit = Convert.ToInt32(data["MostPreferdBenifit"]);
                formData.ExtraCurricularActivities = data["ExtraCurricularActivities"];
                formData.ActiveArrears = Convert.ToInt32(data["ActiveArrears"]);
                formData.Resume = fileResume;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.DeletedIds = data["DeletedIds"];
                formData.HighestQualification = Convert.ToInt32(data["HighestQualification"]);
                string CampusCandidateAcademic = data["CampusCandidateAcademic"];
                string CampusCandidateAnyOtherAcademic = data["CampusCandidateAnyOtherAcademic"];
                formData.CampusCandidateAcademic = JsonConvert.DeserializeObject<List<CampusCandidateAcademic>>(CampusCandidateAcademic);
                formData.CampusCandidateAnyOtherAcademic = JsonConvert.DeserializeObject<List<CandidateAnyOtherAcademic>>(CampusCandidateAnyOtherAcademic);

                var response = await this.campuscandidateregistrationservice.SaveOffCampusCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("editcampuscandidate")]
        public async Task<IActionResult> EditCampusCandidate(IFormCollection data)
        {

            try
            {
               


                CampusCandidateSave formData = new CampusCandidateSave();
                formData.CampusCandidateId = Convert.ToInt32(data["CampusCandidateId"]);
                formData.CampusLinkId = Convert.ToInt32(data["CampusLinkId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.FullName = data["FullName"];
                formData.Gender = Convert.ToInt32(data["Gender"]);
                formData.DOB = data["DOB"];
                formData.Age = 0;
                formData.EmailId = data["EmailId"];
                formData.PhoneNo = data["PhoneNo"];
                formData.AadharNo = data["AadharNo"];
                formData.HomeTown = data["HomeTown"];
                formData.NativeState = Convert.ToInt32(data["NativeState"]);
                formData.PresentState = Convert.ToInt32(data["PresentState"]);
                formData.MotherTongue = Convert.ToInt32(data["MotherTongue"]);
                formData.LanguageKnown = data["LanguageKnown"];
                formData.Height = Convert.ToInt32(data["Height"]);
                formData.Weight = Convert.ToDecimal(data["Weight"]);
                formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
                formData.EyeSightRight = data["EyeSightRight"];
                formData.EyeSightLeft = data["EyeSightLeft"];
                formData.FatherOccupation = Convert.ToInt32(data["FatherOccupation"]);
                formData.MotherOccupation = Convert.ToInt32(data["MotherOccupation"]);
                formData.Disability = Convert.ToBoolean(data["Disability"]);
                formData.DisabilityDetails = data["DisabilityDetails"];
                formData.HealthIssue = Convert.ToBoolean(data["HealthIssue"]);
                formData.HealthIssueDetails = data["HealthIssueDetails"];
                formData.NoofSiblings = Convert.ToInt32(data["NoofSiblings"]);
                formData.MRFRealtive = Convert.ToBoolean(data["MRFRealtive"]);
                formData.RealtiveName = data["RealtiveName"];
                formData.RealtiveMobileNo = data["RealtiveMobileNo"];
                formData.YearsCommitments = Convert.ToInt32(data["YearsCommitments"]);
                formData.AnyWhereinIndia = Convert.ToInt32(data["AnyWhereinIndia"]);
                formData.WorkinginShift = Convert.ToInt32(data["WorkinginShift"]);
                formData.JobTypePriority = Convert.ToInt32(data["JobTypePriority"]);
                formData.CriticalFactor = Convert.ToInt32(data["CriticalFactor"]);
                formData.MostPreferdBenifit = Convert.ToInt32(data["MostPreferdBenifit"]);
                formData.ExtraCurricularActivities = data["ExtraCurricularActivities"];
                formData.ActiveArrears = Convert.ToInt32(data["ActiveArrears"]);
                formData.Resume = null;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.DeletedIds = data["DeletedIds"];
                formData.HighestQualification = Convert.ToInt32(data["HighestQualification"]);
                string CampusCandidateAcademic = data["CampusCandidateAcademic"];
                string CampusCandidateAnyOtherAcademic = data["CampusCandidateAnyOtherAcademic"];
                formData.CampusCandidateAcademic = JsonConvert.DeserializeObject<List<CampusCandidateAcademic>>(CampusCandidateAcademic);
                formData.CampusCandidateAnyOtherAcademic = JsonConvert.DeserializeObject<List<CandidateAnyOtherAcademic>>(CampusCandidateAnyOtherAcademic);


                var response = await this.campuscandidateregistrationservice.SaveCampusCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //[HttpPost]
        //[Route("savecampuscandidate")]
        //public async Task<IActionResult> SaveCampusCandidate(IFormCollection data)
        //{

        //    try
        //    {
        //        ContainerReference = "";
        //        string fileName = "";
        //        var file = Request.Form.Files[0];
        //        string HostUrl = this.environment.ContentRootPath;
        //        string filepath = "UploadedFiles/CandidateResume";
        //        string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
        //        if (!Directory.Exists(uploadpath))
        //        {
        //            Directory.CreateDirectory(uploadpath);
        //        }
        //        if (file.Length > 0)
        //        {
        //            var timestamp = DateTime.Now.ToFileTime();
        //            string timestampfilename = Convert.ToString(timestamp);
        //            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //            string fullPath = Path.Combine(uploadpath, fileName);
        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }

        //        }


        //        CampusCandidateSave formData = new CampusCandidateSave();
        //        formData.CampusCandidateId = Convert.ToInt32(data["CampusCandidateId"]);
        //        formData.CampusLinkId = Convert.ToInt32(data["CampusLinkId"]);
        //        formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
        //        formData.FullName = data["FullName"];
        //        formData.Gender = Convert.ToInt32(data["Gender"]);
        //        formData.DOB = data["DOB"];
        //        formData.Age = 0;
        //        formData.EmailId = data["EmailId"];
        //        formData.PhoneNo = data["PhoneNo"];
        //        formData.AadharNo = data["AadharNo"];
        //        formData.HomeTown = data["HomeTown"];
        //        formData.NativeState = Convert.ToInt32(data["NativeState"]);
        //        formData.PresentState = Convert.ToInt32(data["PresentState"]);
        //        formData.MotherTongue = Convert.ToInt32(data["MotherTongue"]);
        //        formData.LanguageKnown = data["LanguageKnown"];
        //        formData.Height = Convert.ToInt32(data["Height"]);
        //        formData.Weight = Convert.ToDecimal(data["Weight"]);
        //        formData.EyeSightCorrected = Convert.ToBoolean(data["EyeSightCorrected"]);
        //        formData.EyeSightRight = data["EyeSightRight"];
        //        formData.EyeSightLeft = data["EyeSightLeft"];
        //        formData.FatherOccupation = Convert.ToInt32(data["FatherOccupation"]);
        //        formData.MotherOccupation = Convert.ToInt32(data["MotherOccupation"]);
        //        formData.Disability = Convert.ToBoolean(data["Disability"]);
        //        formData.DisabilityDetails = data["DisabilityDetails"];
        //        formData.HealthIssue = Convert.ToBoolean(data["HealthIssue"]);
        //        formData.HealthIssueDetails = data["HealthIssueDetails"];
        //        formData.NoofSiblings = Convert.ToInt32(data["NoofSiblings"]);
        //        formData.MRFRealtive = Convert.ToBoolean(data["MRFRealtive"]);
        //        formData.RealtiveName = data["RealtiveName"];
        //        formData.RealtiveMobileNo = data["RealtiveMobileNo"];
        //        formData.YearsCommitments = Convert.ToInt32(data["YearsCommitments"]);
        //        formData.AnyWhereinIndia = Convert.ToInt32(data["AnyWhereinIndia"]);
        //        formData.WorkinginShift = Convert.ToInt32(data["WorkinginShift"]);
        //        formData.JobTypePriority = Convert.ToInt32(data["JobTypePriority"]);
        //        formData.CriticalFactor = Convert.ToInt32(data["CriticalFactor"]);
        //        formData.MostPreferdBenifit = Convert.ToInt32(data["MostPreferdBenifit"]);
        //        formData.ExtraCurricularActivities = Convert.ToInt32(data["ExtraCurricularActivities"]);
        //        formData.Resume = "/" + filepath + "/" + fileName;
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
        //        formData.DeletedIds = data["DeletedIds"];
        //        formData.HighestQualification = Convert.ToInt32(data["HighestQualification"]);
        //        string CampusCandidateAcademic = data["CampusCandidateAcademic"];
        //        string CampusCandidateAnyOtherAcademic = data["CampusCandidateAnyOtherAcademic"];
        //        formData.CampusCandidateAcademic = JsonConvert.DeserializeObject<List<CampusCandidateAcademic>>(CampusCandidateAcademic);
        //        formData.CampusCandidateAnyOtherAcademic = JsonConvert.DeserializeObject<List<CandidateAnyOtherAcademic>>(CampusCandidateAnyOtherAcademic);


        //        var response = await this.campuscandidateregistrationservice.SaveCampusCandidate(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("getallcanditatedetailsforexcel")]
        public async Task<IActionResult> GetAllDetailsForExcel(CampusCandidateSearchForExcel search)
        {
            try
            {
                var response = await this.campuscandidateregistrationservice.GetCandidatesForexcelDwnld(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}

