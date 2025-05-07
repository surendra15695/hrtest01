using Application.Entity.Entities.PreJoiningModule;
using Application.Service.Services.Interfaces.PreJoiningModule;
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
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
// Added By Anif on 16-11-2022
using System.Text;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using Document = iTextSharp.text.Document;
using PageSize = iTextSharp.text.PageSize;

namespace Application.WebApp.Areas.PreJoiningModule
{
    [Route("api/prejoiningdetails")]
    [ApiController]
    public class PreJoiningDetailsController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IPreJoiningDetailsService prejoiningdetailsservice;

        public PreJoiningDetailsController(IPreJoiningDetailsService prejoiningdetailsservice, IWebHostEnvironment environment)
        {
            this.prejoiningdetailsservice = prejoiningdetailsservice;
            this.environment = environment;
        }

        //uat
        // CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        //live
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");

        public string ContainerReference = null;
        string fileName = "";

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.prejoiningdetailsservice.CloudStorageAccountname();

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

        private async Task UploadToAzureAsyncForm(IFormFile file, string sContentType)
        {
            var cloudStorageAccountname = this.prejoiningdetailsservice.CloudStorageAccountname();

            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(cloudStorageAccountname.ToString());
            var CloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
            var cloudBlobContainer = CloudBlobClient.GetContainerReference("systemgeneratedpdfforms");
            if (await cloudBlobContainer.CreateIfNotExistsAsync())
            {
                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Off });
            }
            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(file.FileName);
            cloudBlockBlob.Properties.ContentType = sContentType;
            await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream());
        }

        [HttpPost]
        [Route("getJoiningRelationShip")]
        public async Task<IActionResult> GetJoiningRelationShip(SearchJoiningRelationShip search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetJoiningRelationShip(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getprejoiningcandidatelist")]
        public async Task<IActionResult> GetPreJoiningCandidateList(SearchPreJoiningCandidateList search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetPreJoiningCandidateList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("campusgetprejoiningcandidatelist")]
        public async Task<IActionResult> GetPreJoiningCandidateList(CampusSearchPreJoiningCandidateList search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CampusGetPreJoiningCandidateList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpPost]
        [Route("getAllDoctorsApprovalCandidateList")]
        public async Task<IActionResult> GetAllDoctorsApprovalCandidateList(DoctorsApprovalCandidateParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllDoctorsApprovalCandidateList(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("MedicalDocumentDoctorApprovalAssignInsert")]
        public async Task<IActionResult> MedicalDocumentDoctorApprovalAssignInsert(MedicalDocumentDoctor param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.MedicalDocumentDoctorApprovalAssignInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getAllForCandidateListOnBoarding")]
        public async Task<IActionResult> GetAllForCandidateListOnBoarding(CandidateListOnBoardingParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllForCandidateListOnBoarding(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcallbackrequestcandidate")]
        public async Task<IActionResult> GetAllCallbackRequestCandidate(searchCallbackRequetsCandidate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCallbackRequestCandidate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("OnBoardingCoordinatorAllocation")]
        public async Task<IActionResult> OnBoardingCoordinatorAllocation(CandidateOnBoardingCoordinatorAssignParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateOnBoardingCoordinatorAssignInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("OnBoardingCoordinatorPendingJoiningType")]
        public async Task<IActionResult> GetAllForCandidateListOnBoarding(OnBoardingCoordinatorPendingJoiningTypeListParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllOnBoardingCoordinatorPendingJoiningTypeList(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("CandidateOnBoardingAssignInsert")]
        public async Task<IActionResult> CandidateOnBoardingAssignInsert(CandidateOnBoardingAssignInsertParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateOnBoardingAssignInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("CandidateJoiningTypeDetailsInsert")]
        public async Task<IActionResult> CandidateJoiningTypeDetailsInsert(CandidateJoiningTypeDetailsParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateJoiningTypeDetailsInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("CandidateJoiningDateInsert")]
        public async Task<IActionResult> CandidateJoiningDateInsert(CandidateJoiningDateInsertParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateJoiningDateInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("CandidateJoiningDateUpdate")]
        public async Task<IActionResult> CandidateUpdateJoiningDate(CandidateJoiningDateInsertParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateUpdateJoiningDate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("batchjoiningdateupdate")]
        public async Task<IActionResult> BatchJoiningDateUpdate(BatchJoiningDateUpdate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.BatchJoiningDateUpdate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("CandidateBGVReportInsert")]
        public async Task<IActionResult> CandidateBGVReportInsert(InsertUpdateCandidateBVGReportParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateBGVReportInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getAllCandidateJoiningDate")]
        public async Task<IActionResult> GetAllCandidateJoiningDate(CandidateJoiningSearch param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidateJoiningDate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //GetBatchWiseOnBoardingPendingShedule
        [HttpPost]
        [Route("GetBatchWiseOnBoardingPendingShedule")]
        public async Task<IActionResult> GetBatchWiseOnBoardingPendingShedule(BatchWiseOnBoardingPendingSheduleParams param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetBatchWiseOnBoardingPendingShedule(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllOnBoardingBatchPendingScheduleDetails
        [HttpPost]
        [Route("GetAllOnBoardingBatchPendingScheduleDetails")]
        public async Task<IActionResult> GetAllOnBoardingBatchPendingScheduleDetails(OnBoardingBatchPendingScheduleDetailsParam Param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllOnBoardingBatchPendingScheduleDetails(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllIndividualOnBoardingPendingSchedule
        [HttpPost]
        [Route("GetAllIndividualOnBoardingPendingSchedule")]
        public async Task<IActionResult> GetAllIndividualOnBoardingPendingSchedule(OnBoardingPendingScheduleIndividualParam Param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllIndividualOnBoardingPendingSchedule(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertMovingCandidateJoiningType
        [HttpPost]
        [Route("InsertMovingCandidateJoiningType")]
        public async Task<IActionResult> InsertMovingCandidateJoiningType(MovingCandidateJoiningTypeParam Param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertMovingCandidateJoiningType(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        ////UploadCandidateBGVReport
        //[HttpPost]
        //[Route("UploadCandidateBGVReport")]
        //public async Task<IActionResult> UploadCandidateBGVReport(IFormCollection data)
        //{
        //    try
        //    {
        //        string fileName = "";
        //        var file = Request.Form.Files[0];
        //        string HostUrl = this.environment.ContentRootPath;
        //        string filepath = "UploadedFiles/BVGReport";
        //        string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
        //        if (!Directory.Exists(uploadpath))
        //        {
        //            Directory.CreateDirectory(uploadpath);
        //        }
        //        if (file.Length > 0)
        //        {
        //            var timestamp = DateTime.Now.ToFileTime();
        //            string timestampfilename = Convert.ToString(timestamp);
        //            fileName = timestampfilename + "_" + Convert.ToInt32(data["CandidateBVGReportId"])+"_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //            string fullPath = Path.Combine(uploadpath, fileName);
        //            using (var stream = new FileStream(fullPath, FileMode.Create))
        //            {
        //                file.CopyTo(stream);
        //            }
        //        }
        //        UploadCandidateBGVReportParam formData = new UploadCandidateBGVReportParam();
        //        formData.CandidateBVGReportId = Convert.ToInt32(data["CandidateBVGReportId"]);
        //        formData.BVGReport = "/" + filepath + "/" + fileName;

        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

        //        var response = await this.prejoiningdetailsservice.UploadCandidateBGVReport(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        //UploadCandidateBGVReport
        [HttpPost]
        [Route("UploadCandidateBGVReport")]
        public async Task<IActionResult> UploadCandidateBGVReport(IFormCollection data)
        {
            try
            {
                ContainerReference = "bvgreport";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileBVG = "";

                if (httpRequest.Form.Files.Count > 0)
                {
                    foreach (var file1 in httpRequest.Form.Files)
                    {
                        var filePath = Path.Combine(environment.ContentRootPath, "UploadedFiles");
                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        if (file.Length > 0)
                        {
                            var timestamp = DateTime.Now.ToFileTime();
                            string timestampfilename = Convert.ToString(timestamp);
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ","");
                            //fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            fileBVG = Path.Combine("/bvgreport", fileName);
                            fileBVG = fileBVG.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }

                        }
                    }
                }


                UploadCandidateBGVReportParam formData = new UploadCandidateBGVReportParam();
                formData.CandidateBVGReportId = data["CandidateBVGReportId"];
                formData.BVGReport = fileBVG;

                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.prejoiningdetailsservice.UploadCandidateBGVReport(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //InsertUpdateCandidateInductionSchedule
        [HttpPost]
        [Route("InsertUpdateCandidateInductionSchedule")]
        public async Task<IActionResult> InsertUpdateCandidateInductionSchedule(CandidateInductionScheduleInsertUpdateParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertUpdateCandidateInductionSchedule(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Reassing Candidate New InductionSchedule Insert
        [HttpPost]
        [Route("ReassignCandidateNewInductionScheduleInsert")]
        public async Task<IActionResult> ReassignCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.ReassignCandidateNewInductionScheduleInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("ReassignIndividualCandidateNewInductionScheduleInsert")]
        public async Task<IActionResult> ReassignIndividualCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.ReassignIndividualCandidateNewInductionScheduleInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidateInductionSchedule
        [HttpPost]
        [Route("GetAllCandidateInductionSchedule")]
        public async Task<IActionResult> GetAllCandidateInductionSchedule(GetAllCandidateInductionScheduleparam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidateInductionSchedule(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertUpdateReportingVenue
        [HttpPost]
        [Route("InsertUpdateReportingVenue")]
        public async Task<IActionResult> InsertUpdateReportingVenue(ReportingVenueParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertUpdateReportingVenue(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllReportingVenue
        [HttpPost]
        [Route("GetAllReportingVenue")]
        public async Task<IActionResult> GetAllReportingVenue(AllReportingVenueParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllReportingVenue(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllBatchesPendingReportingVenue
        [HttpPost]
        [Route("GetAllBatchesPendingReportingVenue")]
        public async Task<IActionResult> GetAllBatchesPendingReportingVenue(AllBatchesPendingReportingVenueParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllBatchesPendingReportingVenue(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllBatchesPendingReportingVenue
        [HttpPost]
        [Route("getallbatchforreassign")]
        public async Task<IActionResult> GetAllBatchesForReassign(AllBatchesPendingReportingVenueParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllBatchesForReassign(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllPendingReportingVenueIndividual
        [HttpPost]
        [Route("GetAllPendingReportingVenueIndividual")]
        public async Task<IActionResult> GetAllPendingReportingVenueIndividual(PendingReportingVenueIndividualParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllPendingReportingVenueIndividual(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertUpdateCandidateOnBoardingCoordinatorAccomodation
        [HttpPost]
        [Route("InsertUpdateCandidateOnBoardingCoordinatorAccomodation")]
        public async Task<IActionResult> InsertUpdateCandidateOnBoardingCoordinatorAccomodation(CandidateOnBoardingCoordinatorAccomodationInsertUpdateParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertUpdateCandidateOnBoardingCoordinatorAccomodation(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        // Batch Candiate Reassign Training 
        [HttpPost]
        [Route("candidatereassigntraining")]
        public async Task<IActionResult> CandidateReassignTraining(CandidateTrainingReassignForBatch param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateReassignTraining(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("individualcandidatereassigntraining")]
        public async Task<IActionResult> IndividualCandidateReassignTraining(CandidateTrainingReassignForBatch param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.IndividualCandidateReassignTraining(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidateOnBoardingCoordinateBookAccommodation
        [HttpPost]
        [Route("GetAllCandidateOnBoardingCoordinateBookAccommodation")]
        public async Task<IActionResult> GetAllCandidateOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidateOnBoardingCoordinateBookAccommodation(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("Gettraininginchargedetails")]
        public async Task<IActionResult> GetTrainingInchargeDetails(SearchTrainingInchargeDetails param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetTrainingInchargeDetails(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getreleasecandidatestagetorequisitiontag")]
        public async Task<IActionResult> GetReleaseCandidateStageToRequisitionTag(SearchHiringStausIdForReleaseCandidate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetReleaseCandidateStageToRequisitionTag(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllBatchOnBoardingCoordinateBookAccommodation
        [HttpPost]
        [Route("GetAllBatchOnBoardingCoordinateBookAccommodation")]
        public async Task<IActionResult> GetAllBatchOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllBatchOnBoardingCoordinateBookAccommodation(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertUpdateCandidateReportingVenue
        [HttpPost]
        [Route("InsertUpdateCandidateReportingVenue")]
        public async Task<IActionResult> InsertUpdateCandidateReportingVenue(InsertUpdateCandidateReportingVenueParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertUpdateCandidateReportingVenue(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue
        [HttpPost]
        [Route("GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue")]
        public async Task<IActionResult> GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue(OnBoardingCoordinatorAddReportingVenueByBatchOrCandidateParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //training
        //InsertUpdateTrainingInchargeAccomodation
        [HttpPost]
        [Route("InsertUpdateTrainingInchargeAccomodation")]
        public async Task<IActionResult> InsertUpdateTrainingInchargeAccomodation(TrainingAccomodationInsertUpdateParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertUpdateTrainingInchargeAccomodation(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidatePendingAccomodationForTrainingIncharge
        [HttpPost]
        [Route("GetAllCandidatePendingAccomodationForTrainingIncharge")]
        public async Task<IActionResult> GetAllCandidatePendingAccomodationForTrainingIncharge(CandidateAccomodationPendingForTrainingInchargeParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidatePendingAccomodationForTrainingIncharge(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllBatchesPendingAccomodationForTrainingIncharge
        [HttpPost]
        [Route("GetAllBatchesPendingAccomodationForTrainingIncharge")]
        public async Task<IActionResult> GetAllBatchesPendingAccomodationForTrainingIncharge(BatchAccomodationPendingForTrainingInchargeParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllBatchesPendingAccomodationForTrainingIncharge(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetTrainingAccomodationDetails
        [HttpPost]
        [Route("GetTrainingAccomodationDetails")]
        public async Task<IActionResult> GetTrainingAccomodationDetails(TrainingInchargeAccomodationDetailsParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetTrainingAccomodationDetails(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetEditAccomodationForEditing
        [HttpPost]
        [Route("GetEditAccomodationForEditing")]
        public async Task<IActionResult> GetEditAccomodationForEditing(GetAllEditAccomodationParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetEditAccomodationForEditing(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Get All Edit Accomodation Induction Details Individuals
        [HttpPost]
        [Route("GetAllEditAccomodationInductionDetails")]
        public async Task<IActionResult> GetAllEditAccomodationInductionDetails(EditAccomodationInductionDetailsParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllEditAccomodationInductionDetails(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Get All Edit Accomodation Induction Details For Batch
        [HttpPost]
        [Route("GetAllEditAccomodationInductionDetailsForBatch")]
        public async Task<IActionResult> GetAllEditAccomodationInductionDetailsForBatch(EditAccomodationInductionDetailsParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllEditAccomodationInductionDetailsForBatch(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Get All View Accomodation Induction Details For Batch
        [HttpPost]
        [Route("GetAllViewAccomodationInductionDetailsForBatch")]
        public async Task<IActionResult> GetAllBatchEditAccomodationInductionDetails(EditAccomodationInductionDetailsParamBatch param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllBatchEditAccomodationInductionDetails(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Get All Induction Details For Batch For Reassign
        [HttpPost]
        [Route("getallinductiondetailsforbatchforreaasigncandidate")]
        public async Task<IActionResult> GetAllInductionDetailsForBatchForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllInductionDetailsForBatchForReassignCandidate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallinductiondetailsforindividualforreaasigncandidate")]
        public async Task<IActionResult> GetAllInductionDetailsForIndividualForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllInductionDetailsForIndividualForReassignCandidate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertShareWithCandidate
        [HttpPost]
        [Route("InsertShareWithCandidatewithattachment")]
        public async Task<IActionResult> InsertShareWithCandidate(InsertUpdateCandidateOnBoardingCoordinatorAccomodationParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertShareWithCandidate(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("InsertShareWithCandidate")]
        public async Task<IActionResult> InsertShareWithCandidateAndSaveAcknowlwdgement(InsertUpdateCandidateWelcomeAcknowledgementParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertShareWithCandidateAndSaveAcknowlwdgement(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidateWelcomeAcknowledgementStatus
        [HttpPost]
        [Route("GetAllCandidateWelcomeAcknowledgementStatus")]
        public async Task<IActionResult> GetAllCandidateWelcomeAcknowledgementStatus(CandidateWelcomeAcknowledgementStatusParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidateWelcomeAcknowledgementStatus(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidateJoiningCheckList
        [HttpPost]
        [Route("GetAllCandidateJoiningCheckList")]
        public async Task<IActionResult> GetAllCandidateJoiningCheckList(CandidateJoiningCheckListParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidateJoiningCheckList(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetOnBoardingDocumentVerification
        [HttpPost]
        [Route("GetOnBoardingDocumentVerification")]
        public async Task<IActionResult> GetOnBoardingDocumentVerification(OnBoardingDocumentVerificationParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetOnBoardingDocumentVerification(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidateJoiningCheckForOnBoardingCoordinator
        [HttpPost]
        [Route("GetAllCandidateJoiningCheckForOnBoardingCoordinator")]
        public async Task<IActionResult> GetAllCandidateJoiningCheckForOnBoardingCoordinator(AllCandidateJoiningCheckListParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAllCandidateJoiningCheckForOnBoardingCoordinator(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetCandidateInductionPlan
        [HttpPost]
        [Route("GetCandidateInductionPlan")]
        public async Task<IActionResult> GetCandidateInductionPlan(CandidateInductionPlanParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetCandidateInductionPlan(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertCandidateJoiningForm
        [HttpPost]
        [Route("InsertCandidateJoiningForm")]
        public async Task<IActionResult> InsertCandidateJoiningForm(CandidateJoiningFormParam param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.InsertCandidateJoiningForm(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getprejoiningdocumentcollectiondata")]
        public async Task<IActionResult> GetPreJoiningDocumentCollectionData(PreJoiningDocumentCollectionSearch search)
        {
            try
            {
                PreJoiningDocumentCollection PreJoiningDocumentCollection = new PreJoiningDocumentCollection();
                PreJoiningDocumentCollection = await this.prejoiningdetailsservice.GetPreJoiningDocumentCollectionData(search).ConfigureAwait(false);

                PreJoiningDocumentFormData PreJoiningDocumentFormData = new PreJoiningDocumentFormData();
                PreJoiningDocumentFormData.JoiningDocumentCollectionId = PreJoiningDocumentCollection.PreJoiningDocumentFormData.JoiningDocumentCollectionId;
                PreJoiningDocumentFormData.RequisitionDetailId = PreJoiningDocumentCollection.PreJoiningDocumentFormData.RequisitionDetailId;
                PreJoiningDocumentFormData.CandidateId = PreJoiningDocumentCollection.PreJoiningDocumentFormData.CandidateId;
                PreJoiningDocumentFormData.Name = PreJoiningDocumentCollection.PreJoiningDocumentFormData.Name;
                PreJoiningDocumentFormData.OfferDocumentCollectionId = PreJoiningDocumentCollection.PreJoiningDocumentFormData.OfferDocumentCollectionId;
                PreJoiningDocumentFormData.AdditionalRemarks = PreJoiningDocumentCollection.PreJoiningDocumentFormData.AdditionalRemarks;
                PreJoiningDocumentFormData.AdditionalDocumentID = PreJoiningDocumentCollection.PreJoiningDocumentFormData.AdditionalDocumentID;
                PreJoiningDocumentFormData.CreatedBy = PreJoiningDocumentCollection.PreJoiningDocumentFormData.CreatedBy;
                PreJoiningDocumentFormData.HiringStatusId = PreJoiningDocumentCollection.PreJoiningDocumentFormData.HiringStatusId;
                PreJoiningDocumentFormData.HiringStatusName = PreJoiningDocumentCollection.PreJoiningDocumentFormData.HiringStatusName;
                PreJoiningDocumentFormData.PreJoiningDocumentAttachmentData = PreJoiningDocumentCollection.PreJoiningDocumentAttachmentData;
                return this.Ok(PreJoiningDocumentFormData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("prejoiningdocumentcollectiondatasave")]
        public async Task<IActionResult> PreJoiningDocumentCollectionDataSave(IFormCollection data)
        {
            try
            {

                var httpRequest = HttpContext.Request;
                ContainerReference = "candidatedocument";
                //string BankStatementDocument = "";
                string fileAttachment = "";
                string FileDataName = "";

                PreJoiningDocumentFormData formData = new PreJoiningDocumentFormData();
                formData.JoiningDocumentCollectionId = Convert.ToInt32(data["JoiningDocumentCollectionId"]);
                string AttachmentData = data["AttachmentDetails"];
                formData.PreJoiningDocumentAttachmentData = JsonConvert.DeserializeObject<List<PreJoiningDocumentAttachmentData>>(AttachmentData);
                //string fileName = "";

                for (var j = 0; j < Request.Form.Files.Count; j++)
                {
                    //var fileOrg = Request.Form.Files[j];
                    //var timestamp = DateTime.Now.ToFileTime();
                    //string timestampfilename = Convert.ToString(timestamp);
                    //fileName = data["CandidateId"] + "_" + timestampfilename + "_" + ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"');
                    //string HostUrl = this.environment.ContentRootPath;
                    //string filepath = "UploadedFiles/CadidateDocument/" + Convert.ToInt32(data["CandidateId"]);
                    //string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                    //if (!Directory.Exists(uploadpath))
                    //{
                    //    Directory.CreateDirectory(uploadpath);
                    //}
                    //if (fileOrg.Length > 0)
                    //{

                    //    string fullPath = Path.Combine(uploadpath, fileName);
                    //    using (var stream = new FileStream(fullPath, FileMode.Create))
                    //    {
                    //        fileOrg.CopyTo(stream);
                    //    }
                    //}

                    var file = Request.Form.Files[j];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[j].Name;
                    fileName = "";
                    //string FileDataName = Request.Form.Files[j].Name;
                    if (FileDataName.Contains("UploadFile"))
                    {

                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileAttachment = Path.Combine("/candidatedocument", fileName);
                        fileAttachment = fileAttachment.Replace("\\", "/");

                        foreach (var attachments in formData.PreJoiningDocumentAttachmentData)
                        {
                            if ("UploadFile_" + attachments.DoumentNameId.ToString() == FileDataName)
                            {
                                //attachments.DocumentPath = filepath + "/" + fileName;
                                attachments.DocumentPath = fileAttachment;
                            }
                        }

                        if (file.Length > 0)
                        {
                            using (var memoryStream = new MemoryStream())
                            {
                                await Request.Form.Files[j].CopyToAsync(memoryStream);
                                await UploadToAzureAsync(Request.Form.Files[j]);
                            }
                        }
                        // formData.PreJoiningDocumentAttachmentData[j].DocumentPath = filepath + "/" + fileName;
                        formData.PreJoiningDocumentAttachmentData[j].DocumentPath = fileAttachment;
                    }
                }

                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.OfferDocumentCollectionId = Convert.ToInt32(data["OfferDocumentCollectionId"]);
                formData.AdditionalRemarks = data["AdditionalRemarks"];

                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.prejoiningdetailsservice.PreJoiningDocumentCollectionDataSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidatermJoiningchecklistsave")]
        public async Task<IActionResult> CandidateRMJoiningCheckListSave(RMJoiningCheckListSave param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateRMJoiningCheckListSave(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Candidateonboardingjoiningchecklistsave")]
        public async Task<IActionResult> CandidateOnBoardingJoiningCheckListSave(OnboardingJoiningCheckListSave param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.CandidateOnBoardingJoiningCheckListSave(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getcandidatejoiningform")]
        public async Task<IActionResult> GetCandidateJoiningForm(CandidateJoingFormSearch search)
        {
            try
            {
                CandidateJoingForm CandidateJoingForm = new CandidateJoingForm();
                CandidateJoingForm = await this.prejoiningdetailsservice.GetCandidateJoiningForm(search).ConfigureAwait(false);

                CandidateJoingFormData CandidateJoingFormData = new CandidateJoingFormData();
                if (CandidateJoingForm.CandidateJoingFormData != null)
                {
                    CandidateJoingFormData.CandidateJoiningFormId = CandidateJoingForm.CandidateJoingFormData.CandidateJoiningFormId;
                    CandidateJoingFormData.CandidateId = CandidateJoingForm.CandidateJoingFormData.CandidateId;
                    CandidateJoingFormData.RequisitionDetailId = CandidateJoingForm.CandidateJoingFormData.RequisitionDetailId;
                    CandidateJoingFormData.FullName = CandidateJoingForm.CandidateJoingFormData.FullName;
                    CandidateJoingFormData.DOB = CandidateJoingForm.CandidateJoingFormData.DOB;
                    CandidateJoingFormData.BloodGroupId = CandidateJoingForm.CandidateJoingFormData.BloodGroupId;
                    CandidateJoingFormData.BloodGroupName = CandidateJoingForm.CandidateJoingFormData.BloodGroupName;
                    CandidateJoingFormData.ResidentialAddress = CandidateJoingForm.CandidateJoingFormData.ResidentialAddress;
                    CandidateJoingFormData.ResidentialPin = CandidateJoingForm.CandidateJoingFormData.ResidentialPin;
                    CandidateJoingFormData.SameAsResidential = CandidateJoingForm.CandidateJoingFormData.SameAsResidential;
                    CandidateJoingFormData.PermanentAddress = CandidateJoingForm.CandidateJoingFormData.PermanentAddress;
                    CandidateJoingFormData.PermanentPin = CandidateJoingForm.CandidateJoingFormData.PermanentPin;
                    CandidateJoingFormData.EmailId = CandidateJoingForm.CandidateJoingFormData.EmailId;
                    CandidateJoingFormData.PhoneNo = CandidateJoingForm.CandidateJoingFormData.PhoneNo;
                    CandidateJoingFormData.Date = CandidateJoingForm.CandidateJoingFormData.Date;
                    CandidateJoingFormData.AcidentalPolicyNominee = CandidateJoingForm.CandidateJoingFormData.AcidentalPolicyNominee;
                    CandidateJoingFormData.AcidentalPolicyNomineeRelationShip = CandidateJoingForm.CandidateJoingFormData.AcidentalPolicyNomineeRelationShip;
                    CandidateJoingFormData.RelationShipName = CandidateJoingForm.CandidateJoingFormData.RelationShipName;
                    CandidateJoingFormData.AcidentalPolicyNomineeAddress = CandidateJoingForm.CandidateJoingFormData.AcidentalPolicyNomineeAddress;
                    CandidateJoingFormData.AcidentalPolicyName = CandidateJoingForm.CandidateJoingFormData.AcidentalPolicyName;
                    CandidateJoingFormData.SEBIApplicable = CandidateJoingForm.CandidateJoingFormData.SEBIApplicable;
                    CandidateJoingFormData.SEBIName = CandidateJoingForm.CandidateJoingFormData.SEBIName;
                    CandidateJoingFormData.SEBIEmployeeNo = CandidateJoingForm.CandidateJoingFormData.SEBIEmployeeNo;
                    CandidateJoingFormData.SEBIDesignation = CandidateJoingForm.CandidateJoingFormData.SEBIDesignation;
                    CandidateJoingFormData.SEBIDesignationName = CandidateJoingForm.CandidateJoingFormData.SEBIDesignationName;
                    CandidateJoingFormData.SEBIDepartment = CandidateJoingForm.CandidateJoingFormData.SEBIDepartment;
                    CandidateJoingFormData.SEBIDepartmentName = CandidateJoingForm.CandidateJoingFormData.SEBIDepartmentName;
                    CandidateJoingFormData.SEBIPanNo = CandidateJoingForm.CandidateJoingFormData.SEBIPanNo;
                    CandidateJoingFormData.SEBIMobileNo = CandidateJoingForm.CandidateJoingFormData.SEBIMobileNo;
                    CandidateJoingFormData.SEBIInsTitute = CandidateJoingForm.CandidateJoingFormData.SEBIInsTitute;
                    CandidateJoingFormData.SEBIPastEmployer = CandidateJoingForm.CandidateJoingFormData.SEBIPastEmployer;
                    CandidateJoingFormData.SEBINoofSecurity = CandidateJoingForm.CandidateJoingFormData.SEBINoofSecurity;
                    CandidateJoingFormData.SEBIDesigName = CandidateJoingForm.CandidateJoingFormData.SEBIDesigName;
                    CandidateJoingFormData.SEBIDesigPAN = CandidateJoingForm.CandidateJoingFormData.SEBIDesigPAN;
                    CandidateJoingFormData.SEBIDesigPhone = CandidateJoingForm.CandidateJoingFormData.SEBIDesigPhone;
                    CandidateJoingFormData.JoiningLetterDate = CandidateJoingForm.CandidateJoingFormData.JoiningLetterDate;
                    CandidateJoingFormData.JoiningLetterDesignation = CandidateJoingForm.CandidateJoingFormData.JoiningLetterDesignation;
                    CandidateJoingFormData.JoiningLetterDesignationName = CandidateJoingForm.CandidateJoingFormData.JoiningLetterDesignationName;
                    CandidateJoingFormData.JoiningDate = CandidateJoingForm.CandidateJoingFormData.JoiningDate;
                    CandidateJoingFormData.SignatureDate = CandidateJoingForm.CandidateJoingFormData.SignatureDate;
                    CandidateJoingFormData.SignaturePlace = CandidateJoingForm.CandidateJoingFormData.SignaturePlace;
                    CandidateJoingFormData.Signature = CandidateJoingForm.CandidateJoingFormData.Signature;
                    CandidateJoingFormData.IsDraft = CandidateJoingForm.CandidateJoingFormData.IsDraft;
                    CandidateJoingFormData.CreatedBy = CandidateJoingForm.CandidateJoingFormData.CreatedBy;
                    CandidateJoingFormData.HiringStatusId = CandidateJoingForm.CandidateJoingFormData.HiringStatusId;
                    CandidateJoingFormData.CandidateJoingFormFamily = CandidateJoingForm.CandidateJoingFormFamily;
                    CandidateJoingFormData.CandidateJoingFormImidiateRelatives = CandidateJoingForm.CandidateJoingFormImidiateRelatives;
                    CandidateJoingFormData.CandidateJoiningFormApprovalStatus = CandidateJoingForm.CandidateJoiningFormApprovalStatus;
                    CandidateJoingFormData.OtherRelationName = CandidateJoingForm.CandidateJoingFormData.OtherRelationName;
                    CandidateJoingFormData.candidateRemarksDetails = CandidateJoingForm.candidateRemarksDetails;
                }
                return this.Ok(CandidateJoingFormData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savecandidatejoiningform")]
        public async Task<IActionResult> SaveCandidateJoiningForm(IFormCollection data)
        {
            try
            {
                string fileJoiningform = "";
                string familyDetails = "";
                string personalAccident = "";
                string sebidisclosure = "";
                string joiningReport = "";
                CandidateJoingFormData formData = new CandidateJoingFormData();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                if (Request.Form.Files.Count > 0)
                {
                    ContainerReference = "candidatejoiningform";
                    fileName = "";

                    var file = Request.Form.Files[0];

                    string HostUrl = this.environment.ContentRootPath;
                    var httpRequest = HttpContext.Request;
                    
                    //if (httpRequest.Form.Files.Count > 0)
                    if (Request.Form.Files.Count > 0)
                    {
                        for (var i= 0; i < Request.Form.Files.Count;i++)
                        {
                            var filePath = Path.Combine(environment.ContentRootPath, "UploadedFiles");
                           
                            if (Request.Form.Files[i].Length > 0)
                            {
                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                if (ContentDispositionHeaderValue.Parse(Request.Form.Files[i].ContentDisposition).Name.Contains("FamilyDetailsPdf"))
                                {
                                    ContainerReference = "systemgeneratedpdfforms";
                                    fileName = timestampfilename + "_" + formData.CandidateId + "_FamilyDetails.pdf";
                                    familyDetails = "/systemgeneratedpdfforms/" + fileName;
                                    familyDetails = familyDetails.Replace("\\", "/");
                                    using (var memoryStream = new MemoryStream())
                                    { 
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }
                                else if (ContentDispositionHeaderValue.Parse(Request.Form.Files[i].ContentDisposition).Name.Contains("AccidentPolicyPdf"))
                                {
                                    ContainerReference = "systemgeneratedpdfforms";
                                    fileName = timestampfilename + "_" + formData.CandidateId + "_AccidentPolicy.pdf";
                                    personalAccident = "/systemgeneratedpdfforms/" + fileName;
                                    personalAccident = personalAccident.Replace("\\", "/");
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }
                                else if (ContentDispositionHeaderValue.Parse(Request.Form.Files[i].ContentDisposition).Name.Contains("SEBIDisclosurePdf"))
                                {
                                    ContainerReference = "systemgeneratedpdfforms";
                                    fileName = timestampfilename + "_" + formData.CandidateId + "_SebiDisclosurePdf.pdf";
                                    sebidisclosure = "/systemgeneratedpdfforms/" + fileName;
                                    sebidisclosure = sebidisclosure.Replace("\\", "/");
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }
                                else if (ContentDispositionHeaderValue.Parse(Request.Form.Files[i].ContentDisposition).Name.Contains("JoiningReportPdf"))
                                {
                                    ContainerReference = "systemgeneratedpdfforms";
                                    fileName = timestampfilename + "_" + formData.CandidateId + "_JoiningReportPdf.pdf";
                                    joiningReport = "/systemgeneratedpdfforms/" + fileName;
                                    joiningReport = joiningReport.Replace("\\", "/");
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }

                                else
                                {
                                    ContainerReference = "candidatejoiningform";
                                    //fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                                    fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                                    fileJoiningform = Path.Combine("/candidatejoiningform", fileName);
                                    fileJoiningform = fileJoiningform.Replace("\\", "/");
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }

                            }
                        }
                    }
                }



                
                formData.FamilyDetailsHTML = data["FamilyDetailsHTML"];
                formData.AccidentPolicyHTML = data["AccidentPolicyHTML"];
                formData.SEBIDisclosureHTML = data["SEBIDisclosureHTML"];
                formData.JoiningReportHTML = data["JoiningReportHTML"];
                formData.CandidateJoiningFormId = Convert.ToInt32(data["CandidateJoiningFormId"]);
                
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.FullName = data["FullName"];
                formData.DOB = data["DOB"];
                formData.BloodGroupId = Convert.ToInt32(data["BloodGroupId"]);
                formData.ResidentialAddress = data["ResidentialAddress"];
                formData.ResidentialPin = data["ResidentialPin"];
                formData.SameAsResidential = Convert.ToBoolean(data["SameAsResidential"]);
                formData.PermanentAddress = data["PermanentAddress"];
                formData.PermanentPin = data["PermanentPin"];
                formData.EmailId = data["EmailId"];
                formData.PhoneNo = data["PhoneNo"];
                formData.Date = data["Date"];
                formData.AcidentalPolicyNominee = data["AcidentalPolicyNominee"];
                formData.OtherRelationName = data["AcidentalPolicyNomineeOtherRelationShip"];
                if (data["AcidentalPolicyNomineeRelationShip"]=="0")
                {
                    formData.AcidentalPolicyNomineeRelationShip = null;
                }
                else
                {
                    formData.AcidentalPolicyNomineeRelationShip = Convert.ToInt32(data["AcidentalPolicyNomineeRelationShip"]);
                }
                formData.AcidentalPolicyNomineeAddress = data["AcidentalPolicyNomineeAddress"];
                formData.AcidentalPolicyName = data["AcidentalPolicyName"];
                formData.SEBIApplicable = Convert.ToBoolean(data["SEBIApplicable"]);
                formData.SEBIName = data["SEBIName"];
                formData.SEBIEmployeeNo = data["SEBIEmployeeNo"];
                formData.SEBIEmployeeNo = data["SEBIEmployeeNo"];
                formData.SEBIDesignation = Convert.ToInt32(data["SEBIDesignation"]);
                formData.SEBIDepartment = Convert.ToInt32(data["SEBIDepartment"]);
                formData.SEBIPanNo = data["SEBIPanNo"];
                formData.SEBIMobileNo = data["SEBIMobileNo"];
                formData.SEBIInsTitute = data["SEBIInsTitute"];
                formData.SEBIPastEmployer = data["SEBIPastEmployer"];
                formData.SEBINoofSecurity = Convert.ToInt32(data["SEBINoofSecurity"]);
                formData.SEBIDesigName = data["SEBIDesigName"];
                formData.SEBIDesigPAN = data["SEBIDesigPAN"];
                formData.SEBIDesigPhone = data["SEBIDesigPhone"];
                formData.JoiningLetterDate = data["JoiningLetterDate"];
                formData.JoiningLetterDesignation = Convert.ToInt32(data["JoiningLetterDesignation"]);
                formData.JoiningDate = data["JoiningDate"];
                formData.SignatureDate = data["SignatureDate"];
                formData.SignaturePlace = data["SignaturePlace"];
                formData.Remarks = data["Remarks"];
                
                if (fileJoiningform == "")
                {
                    formData.Signature = "";
                }
                else
                {
                    formData.Signature = fileJoiningform;
                }

                formData.IsDraft = Convert.ToBoolean(data["IsDraft"]);
                string CandidateJoingFormFamily = data["CandidateJoingFormFamily"];
                formData.CandidateJoingFormFamily = JsonConvert.DeserializeObject<List<CandidateJoingFormFamily>>(CandidateJoingFormFamily);
                string CandidateJoingFormImidiateRelatives = data["CandidateJoingFormImidiateRelatives"];
                formData.CandidateJoingFormImidiateRelatives = JsonConvert.DeserializeObject<List<CandidateJoingFormImidiateRelatives>>(CandidateJoingFormImidiateRelatives);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string RemarksData = data["RemaksDetails"];
                formData.remaksData = JsonConvert.DeserializeObject<List<RemaksData>>(RemarksData);


                //using (StringWriter sw = new StringWriter())
                //{

                //    StringBuilder sb = new StringBuilder(formData.FamilyDetailsHTML);
                //    StringBuilder sb1 = new StringBuilder(formData.AccidentPolicyHTML);
                //    StringBuilder sb2 = new StringBuilder(formData.SEBIDisclosureHTML);
                //    StringBuilder sb3 = new StringBuilder(formData.JoiningReportHTML);

                //    StringReader sr = new StringReader(sb.ToString());
                //    StringReader sr1 = new StringReader(sb1.ToString());
                //    StringReader sr2 = new StringReader(sb2.ToString());
                //    StringReader sr3 = new StringReader(sb3.ToString());

                //    Document pdfDoc = new Document(PageSize.A4);
                //    Document pdfDoc1 = new Document(PageSize.A4);
                //    Document pdfDoc2 = new Document(PageSize.A4);
                //    Document pdfDoc3 = new Document(PageSize.A4);
                //    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                //    HTMLWorker htmlparser1 = new HTMLWorker(pdfDoc1);
                //    HTMLWorker htmlparser2 = new HTMLWorker(pdfDoc2);
                //    HTMLWorker htmlparser3 = new HTMLWorker(pdfDoc3);

                //    // Upload Family Details Form
                //    if (formData.FamilyDetailsHTML != "")
                //    {
                //        using (MemoryStream memoryStream = new MemoryStream())
                //        {
                //            PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                //            pdfDoc.Open();
                //            htmlparser.Parse(sr);
                //            pdfDoc.Close();
                //            byte[] bytes = memoryStream.ToArray();
                //            var stream = new MemoryStream(bytes);
                //            var timestamp = DateTime.Now.ToFileTime();
                //            string timestampfilename = Convert.ToString(timestamp);
                //            familyDetails = timestampfilename + "_" + formData.CandidateId + "_FamilyDetails.pdf";
                //            IFormFile file = new FormFile(stream, 0, bytes.Length, "name", familyDetails);
                //            // var file= File(memoryStream, "application/pdf", "FamilyDetails.pdf");
                //            memoryStream.Close();
                //            await UploadToAzureAsyncForm(file, "application/pdf");
                //        }
                //    }



                //    // Upload Accident Insurance Policy Form
                //    if (formData.AccidentPolicyHTML != "")
                //    {
                //        using (MemoryStream memoryStream1 = new MemoryStream())
                //        {
                //            PdfWriter writer1 = PdfWriter.GetInstance(pdfDoc1, memoryStream1);
                //            pdfDoc1.Open();
                //            htmlparser1.Parse(sr1);
                //            pdfDoc1.Close();
                //            byte[] bytes1 = memoryStream1.ToArray();
                //            var stream1 = new MemoryStream(bytes1);
                //            var timestamp = DateTime.Now.ToFileTime();
                //            string timestampfilename = Convert.ToString(timestamp);
                //            personalAccident = timestampfilename + "_" + formData.CandidateId + "_Accident_Insurance_Policy.pdf";
                //            IFormFile file = new FormFile(stream1, 0, bytes1.Length, "name", personalAccident);
                //            // var file= File(memoryStream, "application/pdf", "FamilyDetails.pdf");
                //            memoryStream1.Close();
                //            await UploadToAzureAsyncForm(file, "application/pdf");
                //        }
                //    }

                //    // Upload SEBI Disclosure Form
                //    if (formData.SEBIDisclosureHTML != "")
                //    {
                //        using (MemoryStream memoryStream2 = new MemoryStream())
                //        {
                //            PdfWriter writer2 = PdfWriter.GetInstance(pdfDoc2, memoryStream2);
                //            pdfDoc2.Open();
                //            htmlparser2.Parse(sr2);
                //            pdfDoc2.Close();
                //            byte[] bytes2 = memoryStream2.ToArray();
                //            var stream2 = new MemoryStream(bytes2);
                //            var timestamp = DateTime.Now.ToFileTime();
                //            string timestampfilename = Convert.ToString(timestamp);
                //            sebidisclosure = timestampfilename + "_" + formData.CandidateId + "_SEBI_Disclosure.pdf";
                //            IFormFile file = new FormFile(stream2, 0, bytes2.Length, "name", sebidisclosure);
                //            // var file= File(memoryStream, "application/pdf", "FamilyDetails.pdf");
                //            memoryStream2.Close();
                //            await UploadToAzureAsyncForm(file, "application/pdf");
                //        }
                //    }

                //    // Upload Joining Report Form
                //    if (formData.JoiningReportHTML != "")
                //    {
                //        using (MemoryStream memoryStream3 = new MemoryStream())
                //        {
                //            PdfWriter writer3 = PdfWriter.GetInstance(pdfDoc3, memoryStream3);
                //            pdfDoc3.Open();
                //            htmlparser3.Parse(sr3);
                //            pdfDoc3.Close();
                //            byte[] bytes3 = memoryStream3.ToArray();
                //            var stream3 = new MemoryStream(bytes3);
                //            var timestamp = DateTime.Now.ToFileTime();
                //            string timestampfilename = Convert.ToString(timestamp);
                //            joiningReport = timestampfilename + "_" + formData.CandidateId + "_Joining_Report.pdf";
                //            IFormFile file = new FormFile(stream3, 0, bytes3.Length, "name", joiningReport);
                //            // var file= File(memoryStream, "application/pdf", "FamilyDetails.pdf");
                //            memoryStream3.Close();
                //            await UploadToAzureAsyncForm(file, "application/pdf");
                //        }
                //    }


                //}


                if (formData.FamilyDetailsHTML != "")
                {
                    //formData.FamilyDetailsFormPath = "/systemgeneratedpdfforms/" + formData.CandidateId + "_FamilyDetails.pdf";
                    //formData.FamilyDetailsFormPath = "/systemgeneratedpdfforms/"+ familyDetails;
                    formData.FamilyDetailsFormPath = familyDetails;
                }
                else
                {
                    formData.FamilyDetailsFormPath = "";
                }
                if (formData.AccidentPolicyHTML != "")
                {
                    //formData.AccidentInsuranceFormPath = "/systemgeneratedpdfforms/" + formData.CandidateId + "_Accident_Insurance_Policy.pdf";
                    formData.AccidentInsuranceFormPath =personalAccident;
                }
                else
                {
                    formData.AccidentInsuranceFormPath = "";
                }
                if (formData.SEBIDisclosureHTML != "")
                {
                    //formData.SEBIDisclosureFormPath = "/systemgeneratedpdfforms/" + formData.CandidateId + "_SEBI_Disclosure.pdf";
                    formData.SEBIDisclosureFormPath =sebidisclosure;
                }
                else
                {
                    formData.SEBIDisclosureFormPath = "";
                }
                if (formData.JoiningReportHTML != "")
                {
                    // formData.JoiningReportFormPath = "/systemgeneratedpdfforms/" + formData.CandidateId + "_Joining_Report.pdf";
                    formData.JoiningReportFormPath =joiningReport;
                }
                else
                {
                    formData.JoiningReportFormPath = "";
                }
                var response = await this.prejoiningdetailsservice.SaveCandidateJoiningForm(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatecandidatejoiningfamilydetailsform")]
        public async Task<IActionResult> UpdateCandidateJoiningFamilyDetailsForm(IFormCollection data)
        {
            try
            {
                string fileJoiningform = "";

                UpdateCandidateJoiningFormFamilydetails formData = new UpdateCandidateJoiningFormFamilydetails();
                formData.CandidateJoiningFormId = Convert.ToInt32(data["CandidateJoiningFormId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.NewFullName = data["NewFullName"];
                formData.OldFullName = data["OldFullName"];
                formData.FullNameChanged = Convert.ToBoolean(data["FullNameChanged"]);
                //  formData.DOB = data["DOB"];
                formData.NewBloodGroup = Convert.ToInt32(data["NewBloodGroup"]);
                formData.OldBloodGroup = Convert.ToInt32(data["OldBloodGroup"]);
                formData.BloodGroupChanged = Convert.ToBoolean(data["BloodGroupChanged"]);
                formData.NewResidentialAddress = data["NewResidentialAddress"];
                formData.OldResidentialAddress = data["OldResidentialAddress"];
                formData.ResidentialAddressChanged = Convert.ToBoolean(data["ResidentialAddressChanged"]);
                formData.NewResidentialPin = data["NewResidentialPin"];
                formData.OldResidentialPin = data["OldResidentialPin"];
                formData.ResidentialPinChanged = Convert.ToBoolean(data["ResidentialPinChanged"]);
                formData.NewSameAsResidential = Convert.ToBoolean(data["NewSameAsResidential"]);
                formData.OldSameAsResidential = Convert.ToBoolean(data["OldSameAsResidential"]);
                formData.SameAsResidentialChanged = Convert.ToBoolean(data["SameAsResidentialChanged"]);
                formData.NewPermanentAddress = data["NewPermanentAddress"];
                formData.OldPermanentAddress = data["OldPermanentAddress"];
                formData.PermanentAddressChanged = Convert.ToBoolean(data["PermanentAddressChanged"]);
                formData.NewPermanentPin = data["NewPermanentPin"];
                formData.OldPermanentPin = data["OldPermanentPin"];
                formData.PermanentPinChanged = Convert.ToBoolean(data["PermanentPinChanged"]);
                formData.NewEmailId = data["NewEmailId"];
                formData.OldEmailId = data["OldEmailId"];
                formData.EmailIdChanged = Convert.ToBoolean(data["EmailIdChanged"]);
                formData.NewPhoneNo = data["NewPhoneNo"];
                formData.OldPhoneNo = data["OldPhoneNo"];
                formData.PhoneNoChanged = Convert.ToBoolean(data["PhoneNoChanged"]);
                //  formData.Date = data["Date"];

                string CandidateJoingFormFamily = data["CandidateJoingFormFamily"];
                formData.CandidateJoingFormFamily = JsonConvert.DeserializeObject<List<CandidateJoingFormFamilyUpdate>>(CandidateJoingFormFamily);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.prejoiningdetailsservice.UpdateCandidateJoiningFamilyDetailsForm(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatecandidatesebiinitialdisclosure")]
        public async Task<IActionResult> UpdateCandidateJoiningSEBIInitialDisclosureForm(IFormCollection data)
        {
            try
            {
                string fileJoiningform = "";

                UpdateSEBIInitialDisclosuerDetails formData = new UpdateSEBIInitialDisclosuerDetails();
                formData.CandidateJoiningFormId = Convert.ToInt32(data["CandidateJoiningFormId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.NewSEBIName = data["NewSEBIName"];
                formData.OldSEBIName = data["OldSEBIName"];
                formData.SEBINameChanged = Convert.ToBoolean(data["SEBINameChanged"]);                
                formData.NewSEBIPanNo = data["NewSEBIPanNo"];
                formData.OldSEBIPanNo = data["OldSEBIPanNo"];                
                formData.SEBIPanNoChanged = Convert.ToBoolean(data["SEBIPanNoChanged"]);
                formData.NewSEBIMobileNo = data["NewSEBIMobileNo"];
                formData.OldSEBIMobileNo = data["OldSEBIMobileNo"];
                formData.SEBIMobileNoChanged = Convert.ToBoolean(data["SEBIMobileNoChanged"]);
                formData.NewSEBIinstitute = data["NewSEBIinstitute"];
                formData.OldSEBIinstitute = data["OldSEBIinstitute"];
                formData.SEBIinstituteChanged = Convert.ToBoolean(data["SEBIinstituteChanged"]);
                formData.NewSEBIPastEmployer = data["NewSEBIPastEmployer"];
                formData.OldSEBIPastEmployer = data["OldSEBIPastEmployer"];
                formData.SEBIPastEmployeChanged = Convert.ToBoolean(data["SEBIPastEmployeChanged"]);
                formData.NewSEBINoOfSecurity = Convert.ToInt32(data["NewSEBINoOfSecurity"]);
                formData.OldSEBINoOfSecurity = Convert.ToInt32(data["OldSEBINoOfSecurity"]);
                formData.SEBINoOfSecurityChanged = Convert.ToBoolean(data["SEBINoOfSecurityChanged"]);
                formData.NewSEBIDesigName = data["NewSEBIDesigName"];
                formData.OldSEBIDesigName = data["OldSEBIDesigName"];
                formData.SEBIDesigNameChanged = Convert.ToBoolean(data["SEBIDesigNameChanged"]);
                formData.NewSEBIDesigPanNo = data["NewSEBIDesigPanNo"];
                formData.OldSEBIDesigPanNo = data["OldSEBIDesigPanNo"];
                formData.SEBIDesigPanNoChanged = Convert.ToBoolean(data["SEBIDesigPanNoChanged"]);
                formData.NewSEBIDesigMobile = data["NewSEBIDesigMobile"];
                formData.OldSEBIDesigMobile = data["OldSEBIDesigMobile"];
                formData.SEBIDesigMobileChanged = Convert.ToBoolean(data["SEBIDesigMobileChanged"]);
                string ImmediativeRelative = data["ImmediateRelative"];
                formData.CandidateImidiateRelatives = JsonConvert.DeserializeObject<List<UpadteSEBIImmediateRelatives>>(ImmediativeRelative);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.prejoiningdetailsservice.UpdateCandidateJoiningSEBIInitialDisclosureForm(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updateaccidentinsurancepolicy")]
        public async Task<IActionResult> UpdateAccidentInsurancePolicyForm(IFormCollection data)
        {
            try
            {


                UpdateAccidentInsurancePolicy formData = new UpdateAccidentInsurancePolicy();
                formData.CandidateJoiningFormId = Convert.ToInt32(data["CandidateJoiningFormId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.NewAcidentalPolicyNominee = data["NewAcidentalPolicyNominee"];
                formData.OldAcidentalPolicyNominee = data["OldAcidentalPolicyNominee"];
                formData.AcidentalPolicyNomineeChanged = Convert.ToBoolean(data["AcidentalPolicyNomineeChanged"]);
                formData.NewAcidentalPolicyNomineeRelationShip = Convert.ToInt32(data["NewAcidentalPolicyNomineeRelationShip"]);
                formData.OldAcidentalPolicyNomineeRelationShip = Convert.ToInt32(data["OldAcidentalPolicyNomineeRelationShip"]);
                formData.AcidentalPolicyNomineeRelationShipChanged = Convert.ToBoolean(data["AcidentalPolicyNomineeRelationShipChanged"]);
                formData.NewAcidentalPolicyNomineeAddress = data["NewAcidentalPolicyNomineeAddress"];
                formData.OldAcidentalPolicyNomineeAddress = data["OldAcidentalPolicyNomineeAddress"];
                formData.AcidentalPolicyNomineeAddressChanged = Convert.ToBoolean(data["AcidentalPolicyNomineeAddressChanged"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.prejoiningdetailsservice.UpdateAccidentInsurancePolicyForm(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatejoiningReportform")]
        public async Task<IActionResult> UpdateJoiningReportform(IFormCollection data)
        {
            try
            {


                UpdateJoiningReport formData = new UpdateJoiningReport();
                formData.CandidateJoiningFormId = Convert.ToInt32(data["CandidateJoiningFormId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.SignaturePlace = data["SignaturePlace"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.prejoiningdetailsservice.UpdateJoiningReportform(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcandidatejoiningformpdf")]
        public async Task<IActionResult> GetCandidateJoiningFormPDF(CandidateJoingFormSearch search)
        {
            try
            {
                CandidateJoiningFormPDFData CandidateJoingForm = new CandidateJoiningFormPDFData();
                CandidateJoingForm = await this.prejoiningdetailsservice.GetCandidateJoiningFormPDF(search).ConfigureAwait(false);

                CandidateJoiningPDFData CandidateJoingFormData = new CandidateJoiningPDFData();
                if (CandidateJoingForm.CandidateData != null)
                {
                    CandidateJoingFormData.CandidateJoiningFormId = CandidateJoingForm.CandidateData.CandidateJoiningFormId;
                    CandidateJoingFormData.CandidateId = CandidateJoingForm.CandidateData.CandidateId;
                    CandidateJoingFormData.RequisitionDetailId = CandidateJoingForm.CandidateData.RequisitionDetailId;
                    CandidateJoingFormData.FullName = CandidateJoingForm.CandidateData.FullName;
                    CandidateJoingFormData.DOB = CandidateJoingForm.CandidateData.DOB;
                    CandidateJoingFormData.BloodGroupName = CandidateJoingForm.CandidateData.BloodGroupName;
                    CandidateJoingFormData.ResidentialAddress = CandidateJoingForm.CandidateData.ResidentialAddress;
                    CandidateJoingFormData.ResidentialPin = CandidateJoingForm.CandidateData.ResidentialPin;
                    CandidateJoingFormData.PermanentAddress = CandidateJoingForm.CandidateData.PermanentAddress;
                    CandidateJoingFormData.PermanentPin = CandidateJoingForm.CandidateData.PermanentPin;
                    CandidateJoingFormData.EmailId = CandidateJoingForm.CandidateData.EmailId;
                    CandidateJoingFormData.PhoneNo = CandidateJoingForm.CandidateData.PhoneNo;
                    CandidateJoingFormData.Date = CandidateJoingForm.CandidateData.Date;
                    CandidateJoingFormData.EmployeeNo = CandidateJoingForm.CandidateData.EmployeeNo;
                    CandidateJoingFormData.JoiningLetterDate = CandidateJoingForm.CandidateData.JoiningLetterDate;
                    CandidateJoingFormData.JoiningDate = CandidateJoingForm.CandidateData.JoiningDate;
                    CandidateJoingFormData.SignatureDate = CandidateJoingForm.CandidateData.SignatureDate;
                    CandidateJoingFormData.SignaturePlace = CandidateJoingForm.CandidateData.SignaturePlace;
                    CandidateJoingFormData.Signature = CandidateJoingForm.CandidateData.Signature;
                    CandidateJoingFormData.Grade = CandidateJoingForm.CandidateData.Grade;
                    CandidateJoingFormData.Position = CandidateJoingForm.CandidateData.Position;
                    CandidateJoingFormData.Location = CandidateJoingForm.CandidateData.Location;
                    CandidateJoingFormData.Designation = CandidateJoingForm.CandidateData.Designation;
                    CandidateJoingFormData.DesignatedPersonName = CandidateJoingForm.CandidateData.DesignatedPersonName;
                    CandidateJoingFormData.DesignatedPersonDesignation = CandidateJoingForm.CandidateData.DesignatedPersonDesignation;
                    CandidateJoingFormData.DesignatedPersonEmployeeNo = CandidateJoingForm.CandidateData.DesignatedPersonEmployeeNo;
                    CandidateJoingFormData.DesignatedPersonDepartment = CandidateJoingForm.CandidateData.DesignatedPersonDepartment;
                    CandidateJoingFormData.DesignatedPersonPAN = CandidateJoingForm.CandidateData.DesignatedPersonPAN;
                    CandidateJoingFormData.DesignatedPersonMobileNo = CandidateJoingForm.CandidateData.DesignatedPersonMobileNo;
                    CandidateJoingFormData.DesignatedPersonInstitute = CandidateJoingForm.CandidateData.DesignatedPersonInstitute;
                    CandidateJoingFormData.DesignatedPersonPastEmployer = CandidateJoingForm.CandidateData.DesignatedPersonPastEmployer;
                    CandidateJoingFormData.DesignatedPersonNoofSecurity = CandidateJoingForm.CandidateData.DesignatedPersonNoofSecurity;
                    CandidateJoingFormData.FinancialRelationshipName = CandidateJoingForm.CandidateData.FinancialRelationshipName;
                    CandidateJoingFormData.FinancialRelationshipPAN = CandidateJoingForm.CandidateData.FinancialRelationshipPAN;
                    CandidateJoingFormData.JoiningLetterDate = CandidateJoingForm.CandidateData.JoiningLetterDate;
                    CandidateJoingFormData.FinancialRelationshipMobileNo = CandidateJoingForm.CandidateData.FinancialRelationshipMobileNo;
                    CandidateJoingFormData.AccidentalPolicyNominee = CandidateJoingForm.CandidateData.AccidentalPolicyNominee;
                    CandidateJoingFormData.AccidentalPolicyRelationShipName = CandidateJoingForm.CandidateData.AccidentalPolicyRelationShipName;
                    CandidateJoingFormData.AccidentalPolicyNomineeAddress = CandidateJoingForm.CandidateData.AccidentalPolicyNomineeAddress;
                    CandidateJoingFormData.AccidentalPolicyHolderName = CandidateJoingForm.CandidateData.AccidentalPolicyHolderName;
                    CandidateJoingFormData.FamilyDetail = CandidateJoingForm.FamilyDetail;
                    CandidateJoingFormData.ImmediateRelativeDetail = CandidateJoingForm.ImmediateRelativeDetail;
                }
                return this.Ok(CandidateJoingFormData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("plansharewithinductor")]
        public async Task<IActionResult> ShareWithInductorInsert(ShareWithInductor param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.ShareWithInductorInsert(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getjoiningformfamilydetailsupdatehistory")]
        public async Task<IActionResult> GetJoiningFormFamilyDetailsUpdateHistory(SearchFamilyDetailsUpdateHistory search)
        {
            try
            {
                JoiningFormFamilyDetailsUpdateHistoryList familyDetailsUpdateHistory = new JoiningFormFamilyDetailsUpdateHistoryList();
                familyDetailsUpdateHistory = await this.prejoiningdetailsservice.GetJoiningFormFamilyDetailsUpdateHistory(search).ConfigureAwait(false);

                FinalFamilyDetailsFormUpdateData finalFamilyDetails = new FinalFamilyDetailsFormUpdateData();
                FamilyDetailsFormOtherDetailsData familyFormUpdateHistoryDetails = new FamilyDetailsFormOtherDetailsData();
                if (familyDetailsUpdateHistory.FamilyDetailsFormOtherData.Count > 0)
                {
                    finalFamilyDetails.familyDetailsForms = familyDetailsUpdateHistory.FamilyDetailsFormOtherData.Select(x =>
                     {
                         return new FamilyDetailsFormOtherDetailsData
                         {
                             CandidateJoiningFormFamilyHistoryId = x.CandidateJoiningFormFamilyHistoryId,
                             CandidateJoiningFormId = x.CandidateJoiningFormId,
                             CandidateId = x.CandidateId,
                             RequisitionDetailId = x.RequisitionDetailId,
                             NewFullName = x.NewFullName,
                             OldFullName = x.OldFullName,
                             NewBloodGroupId = x.NewBloodGroupId,
                             NewBloodGroupName = x.NewBloodGroupName,
                             OldBloodGroupId = x.OldBloodGroupId,
                             OldBloodGroupName = x.OldBloodGroupName,
                             NewResidentialAddress = x.NewResidentialAddress,
                             OldResidentialAddress = x.OldResidentialAddress,
                             NewResidentialPin = x.NewResidentialPin,
                             OldResidentialPin = x.OldResidentialPin,
                             NewSameAsResidential = x.NewSameAsResidential,
                             OldSameAsResidential = x.OldSameAsResidential,
                             NewPermanentAddress = x.NewPermanentAddress,
                             OldPermanentAddress = x.OldPermanentAddress,
                             NewPermanentPin = x.NewPermanentPin,
                             OldPermanentPin = x.OldPermanentPin,
                             NewEmail = x.NewEmail,
                             OldEmail = x.OldEmail,
                             NewPhoneNo = x.NewPhoneNo,
                             OldPhoneNo = x.OldPhoneNo,
                             ModifiedBy = x.ModifiedBy,
                             ModifiedDate = x.ModifiedDate,
                             FamilyMemberUpdateDetailsData = familyDetailsUpdateHistory.FamilyMemberUpdateDetails.Where(Y => Y.CandidateJoiningFormFamilyHistoryId == x.CandidateJoiningFormFamilyHistoryId).ToList()
                         };
                     }).ToList();

                }
                return this.Ok(finalFamilyDetails);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsebidisclosureupdatehistory")]
        public async Task<IActionResult> GetSEBIDisclosureUpdateHistory(SearchSEBIInitialDisclosureUpdateHistory search)
        {
            try
            {
                SEBIInitialDisclosureUpdateHistoryList sebiUpdateHistory = new SEBIInitialDisclosureUpdateHistoryList();
                sebiUpdateHistory = await this.prejoiningdetailsservice.GetSEBIDisclosureUpdateHistory(search).ConfigureAwait(false);

                FinalSEBIDisclosureDetailsData finalSEBIDisclosureDetails = new FinalSEBIDisclosureDetailsData();
                FamilyDetailsFormOtherDetailsData familyFormUpdateHistoryDetails = new FamilyDetailsFormOtherDetailsData();
                if (sebiUpdateHistory.SEBIInitialDisclosure.Count > 0)
                {
                    finalSEBIDisclosureDetails.FinalSEBIDisclosureData = sebiUpdateHistory.SEBIInitialDisclosure.Select(x =>
                    {
                        return new SEBIInitialDisclosureDetailsData
                        {
                            CandidateJoiningFormSEBIHistoryId = x.CandidateJoiningFormSEBIHistoryId,
                            CandidateJoiningFormId = x.CandidateJoiningFormId,
                            CandidateId = x.CandidateId,
                            RequisitionDetailId = x.RequisitionDetailId,
                            NewSEBIName = x.NewSEBIName,
                            OldSEBIName = x.OldSEBIName,
                            NewSEBIPanNo = x.NewSEBIPanNo,
                            OldSEBIPanNo = x.OldSEBIPanNo,
                            NewSEBIMobileNo = x.NewSEBIMobileNo,
                            OldSEBIMobileNo = x.OldSEBIMobileNo,
                            NewSEBIInstitute = x.NewSEBIInstitute,
                            OldSEBIInstitute = x.OldSEBIInstitute,
                            NewSEBIPastEmplpoyer = x.NewSEBIPastEmplpoyer,
                            OldSEBIPastEmplpoyer = x.OldSEBIPastEmplpoyer,
                            NewSEBINoOfSecurity = x.NewSEBINoOfSecurity,
                            OldSEBINoOfSecurity = x.OldSEBINoOfSecurity,
                            NewSEBIDesigName = x.NewSEBIDesigName,
                            OldSEBIDesigName = x.OldSEBIDesigName,
                            NewSEBIDesigPanNo = x.NewSEBIDesigPanNo,
                            OldSEBIDesigPanNo = x.OldSEBIDesigPanNo,
                            NewSEBIDesigPhoneNo = x.NewSEBIDesigPhoneNo,
                            OldSEBIDesigPhoneNo = x.OldSEBIDesigPhoneNo,
                            ModifiedBy = x.ModifiedBy,
                            ModifiedDate = x.ModifiedDate,
                            SEBIImmediativeRelativeData = sebiUpdateHistory.SEBIImmediativeRelative.Where(Y => Y.CandidateJoiningFormSEBIHistoryId == x.CandidateJoiningFormSEBIHistoryId).ToList()
                        };
                    }).ToList();

                }
                return this.Ok(finalSEBIDisclosureDetails);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getaccidentinsurancepolicyupdatehistiry")]
        public async Task<IActionResult> GetAccidentInsurancPolicyUpdateHistory(SearchAccidentInsurancePolicyUpdateHistory search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAccidentInsurancPolicyUpdateHistory(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getjoiningreporthistory")]
        public async Task<IActionResult> GetJoiningReportHistory(SearchJoiningReportHistory search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetJoiningReportHistory(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getmrfppfhistory")]
        public async Task<IActionResult> getMRFPPFhistory(SearchMRFPPFHistory search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.getMRFPPFhistory(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("discontinuecandidates")]
        public async Task<IActionResult> DiscontinueCandidates(discontinuecandidate search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.DiscontinueCandidates(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("Getbatchidfromcandidateid")]
        public async Task<IActionResult> getbatchidfromcandidateid(searchbatchcandidate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.getbatchidfromcandidateid(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("deletecandidateinductionscheduledetail")]
        public async Task<IActionResult> DeleteCandidateInductionScheduleDetail(DeleteCandidateInductionScheduleDetail param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.DeleteCandidateInductionScheduleDetail(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getadditionaldocumentlist")]
        public async Task<IActionResult> GetAdditionalDocumentList(searchbatchcandidate param)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetAdditionalDocumentList(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatesharewithcandidate")]
        public async Task<IActionResult> UpdateShareWithCandidateDoc(UpdateAdditionalDoc search)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.UpdateShareWithCandidateDoc(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("discontinueindividualcandidate")]
        public async Task<IActionResult> DiscontinueIndividualCandidate(DiscontinueIndividualCandidateFormData formData)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.DiscontinueIndividualCandidate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("deleteinductionschedule")]
        public async Task<IActionResult> DeleteInductionSchedule(DeleteInductionScheduleParam formData)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.DeleteInductionSchedule(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("inserrtupdatesignature")]
        public async Task<IActionResult> InserrtUpdateSignature(IFormCollection data)
        {
            try
            {
                string fileJoiningform = "";
                if (Request.Form.Files.Count > 0)
                {
                    ContainerReference = "candidatejoiningform";
                    fileName = "";

                    var file = Request.Form.Files[0];

                    string HostUrl = this.environment.ContentRootPath;
                    var httpRequest = HttpContext.Request;
                    //if (httpRequest.Form.Files.Count > 0)
                    if (Request.Form.Files.Count > 0)
                    {
                        foreach (var file1 in Request.Form.Files)
                        {
                            var filePath = Path.Combine(environment.ContentRootPath, "UploadedFiles");
                            if (!Directory.Exists(filePath))
                            {
                                Directory.CreateDirectory(filePath);
                            }
                            if (file.Length > 0)
                            {
                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                //fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                                fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                                fileJoiningform = Path.Combine("/candidatejoiningform", fileName);
                                fileJoiningform = fileJoiningform.Replace("\\", "/");
                                using (var memoryStream = new MemoryStream())
                                {
                                    await file1.CopyToAsync(memoryStream);
                                    System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                    await UploadToAzureAsync(file1);
                                }

                            }
                        }
                    }
                }

                SignatureInsUpData signatureInsUpData = new SignatureInsUpData();
                signatureInsUpData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                signatureInsUpData.RequisitionDetailId= Convert.ToInt32(data["RequisitionDetailId"]);
                signatureInsUpData.CandidateJoiningFormId = Convert.ToInt32(data["CandidateJoiningFormId"]);
                signatureInsUpData.SignaturePic = fileJoiningform;
                var response = await this.prejoiningdetailsservice.InserrtUpdateSignature(signatureInsUpData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("getsignaturecandidate")]
        public async Task<IActionResult> GetSignatureCandidate(SignatureInsUpData formData)
        {
            try
            {
                var response = await this.prejoiningdetailsservice.GetSignatureCandidate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}



