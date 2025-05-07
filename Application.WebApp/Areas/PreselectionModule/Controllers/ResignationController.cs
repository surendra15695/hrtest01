using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.PreselectionModule.Controllers
{
    [Route("api/resignation")]
    [ApiController]
    public class ResignationController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IResignationService resignationService;
        public ResignationController(IResignationService resignationService, IWebHostEnvironment environment)
        {
            this.resignationService = resignationService;
            this.environment = environment;
        }



        //uat
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        //live
        CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");
        public string ContainerReference = null;
        string fileName = "";

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.resignationService.CloudStorageAccountname();
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
        [Route("generateresignation")]
        public async Task<IActionResult> GenerateResignation(IFormCollection data)
        {
            try
            {
                ContainerReference = "resignationfiles";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResignation = "";
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
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            //fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            fileResignation = Path.Combine("/resignationfiles", fileName);
                            fileResignation = fileResignation.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }

                ResignationFormData formData = new ResignationFormData();
                formData.LocationId = Convert.ToInt32(data["LocationId"]);
                formData.VerticalId = Convert.ToInt32(data["VerticalId"]);
                string ResignationValue = data["ResignationData"];
                formData.ResignationData = JsonConvert.DeserializeObject<List<ResignationDataObject>>(ResignationValue);
                string UniqueIds = data["UniqueFunctionIds"];
                formData.UniqueFunctionIds = JsonConvert.DeserializeObject<List<UniqueFunctionIds>>(UniqueIds);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.SepIntFiles = fileResignation;
                var response = await this.resignationService.ResignationInsert(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateresignation")]
        public async Task<IActionResult> UpdateResignation(IFormCollection data)
        {
            try
            {
                ContainerReference = "resignationfiles";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResignation = "";
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
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            //fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            fileResignation = Path.Combine("/resignationfiles", fileName);
                            fileResignation = fileResignation.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }


                ResignationUpdateFormData formData = new ResignationUpdateFormData();
                formData.DepartmentId = Convert.ToInt32(data["DepartmentId"]);
                formData.PositionId = Convert.ToInt32(data["PositionId"]);
                formData.GradeId = Convert.ToInt32(data["GradeId"]);
                formData.JobTypeId = Convert.ToInt32(data["JobTypeId"]);
                formData.JobDescriptionId = Convert.ToInt32(data["JobDescriptionId"]);
                formData.DOR = data["DOR"];
                formData.LWD = data["LWD"];
                formData.SepInt = data["SepInt"];
                formData.TargetDate = data["TargetDate"];
                formData.ResignationDetailId = Convert.ToInt32(data["ResignationDetailId"]);
                formData.Remarks = data["Remarks"];
                formData.ClarificationRemarks = data["ClarificationRemarks"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.SepInt = fileResignation;
                var response = await this.resignationService.ResignationUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getresignationlist")]
        public async Task<IActionResult> GetAllResignationList(SearchResignationList search)
        {
            try
            {
                var response = await this.resignationService.GetAllResignationList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("acknowledgeresignation")]
        public async Task<IActionResult> ResignationAcknowledgement(ResignationAcknowledgementFormData formdata)
        {
            try
            {
                var response = await this.resignationService.ResignationAcknowledgement(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("mergeresignation")]
        public async Task<IActionResult> MergeResignation(MergeResignationFormData formdata)
        {
            try
            {
                var response = await this.resignationService.MergeResignation(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("resignationapprovereject")]
        public async Task<IActionResult> ResignationApproveReject(ResignationApproveRejectFormData formData)
        {
            try
            {
                var response = await this.resignationService.ResignationApproveReject(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getresignationholdreleaselist")]
        public async Task<IActionResult> GetAllResignationHoldReleaseList(SearchResignationHoldRelease search)
        {
            try
            {
                var response = await this.resignationService.GetAllResignationHoldReleaseList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateholdrelease")]
        public async Task<IActionResult> UpdateHoldRelease(ResignationHoldReleaseSubmitFormData formData)
        {
            try
            {
                var response = await this.resignationService.UpdateHoldRelease(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("sendclarification")]
        public async Task<IActionResult> SendClarification(ResignationClarificationFormData formData)
        {
            try
            {
                var response = await this.resignationService.SendClarification(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallresignationclarification")]
        public async Task<IActionResult> GetAllResignationClarification(SearchResignationClarification search)
        {
            try
            {
                var response = await this.resignationService.GetAllResignationClarification(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("deleteresignation")]
        public async Task<IActionResult> DeleteResignation(DeleteResignationFormData formData)
        {
            try
            {
                var response = await this.resignationService.DeleteResignation(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
