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
    [Route("api/managementapproval")]
    [ApiController]
    public class ManagementApprovalController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IManagementApprovalService managementapprovalservice;

        public ManagementApprovalController(IManagementApprovalService managementapprovalservice, IWebHostEnvironment environment)
        {
            this.managementapprovalservice = managementapprovalservice;
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
            var cloudStorageAccountname = this.managementapprovalservice.CloudStorageAccountname();
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


        //[HttpPost]
        //[Route("getmanagementapprovaldata")]
        //public async Task<IActionResult> GetManagementApprovaltData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        //{
        //    try
        //    {
        //        ManagementApproval ManagementApproval = new ManagementApproval();
        //        ManagementApprovalMaster ManagementApprovalMaster = new ManagementApprovalMaster();
        //        ManagementApproval = await this.managementapprovalservice.GetManagementApprovalData(search).ConfigureAwait(false);
        //        if (ManagementApproval.ManagementApprovalMaster != null)
        //        {
        //            ManagementApprovalMaster.ManagementApprovalId = ManagementApproval.ManagementApprovalMaster.ManagementApprovalId;
        //            ManagementApprovalMaster.CandidateId = ManagementApproval.ManagementApprovalMaster.CandidateId;
        //            ManagementApprovalMaster.From = ManagementApproval.ManagementApprovalMaster.From;
        //            ManagementApprovalMaster.To = ManagementApproval.ManagementApprovalMaster.To;
        //            ManagementApprovalMaster.Date = ManagementApproval.ManagementApprovalMaster.Date;
        //            ManagementApprovalMaster.Note = ManagementApproval.ManagementApprovalMaster.Note;
        //            ManagementApprovalMaster.BottomNote = ManagementApproval.ManagementApprovalMaster.BottomNote;
        //            ManagementApprovalMaster.SignatureNeededFrom = ManagementApproval.ManagementApprovalMaster.SignatureNeededFrom;
        //            ManagementApprovalMaster.SignatureNeededTo = ManagementApproval.ManagementApprovalMaster.SignatureNeededTo;
        //            ManagementApprovalMaster.ApprovedDocument = ManagementApproval.ManagementApprovalMaster.ApprovedDocument;
        //            ManagementApprovalMaster.ManagementApprovalCandidates = ManagementApproval.ManagementApprovalCandidates;
        //            ManagementApprovalMaster.ManagementApprovalVacancy = ManagementApproval.ManagementApprovalVacancy;
        //            ManagementApprovalMaster.ManagementApprovalSigntureFrom = ManagementApproval.ManagementApprovalSigntureFrom;
        //            ManagementApprovalMaster.ManagementApprovalSigntureTo = ManagementApproval.ManagementApprovalSigntureTo;
        //        }
        //        return this.Ok(ManagementApprovalMaster);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}
        [HttpPost]
        [Route("getmanagementapprovaldata")]
        public async Task<IActionResult> GetManagementApprovaltData(SearchManagementApproval search)  // By Amartya on 05-08-2023
        {
            try
            {
                ManagementApprovalGet ManagementApproval = new ManagementApprovalGet();
                ManagementApprovalMasterGet ManagementApprovalMaster = new ManagementApprovalMasterGet();
                ManagementApproval = await this.managementapprovalservice.GetManagementApprovalData(search).ConfigureAwait(false);
                if (ManagementApproval.ManagementApprovalMaster != null)
                {
                    ManagementApprovalMaster.ManagementApprovalId = ManagementApproval.ManagementApprovalMaster.ManagementApprovalId;
                    ManagementApprovalMaster.CandidateId = ManagementApproval.ManagementApprovalMaster.CandidateId;
                    ManagementApprovalMaster.From = ManagementApproval.ManagementApprovalMaster.From;
                    ManagementApprovalMaster.To = ManagementApproval.ManagementApprovalMaster.To;
                    ManagementApprovalMaster.Date = ManagementApproval.ManagementApprovalMaster.Date;
                    ManagementApprovalMaster.Note = ManagementApproval.ManagementApprovalMaster.Note;
                    ManagementApprovalMaster.BottomNote = ManagementApproval.ManagementApprovalMaster.BottomNote;
                    ManagementApprovalMaster.SignatureNeededFrom = ManagementApproval.ManagementApprovalMaster.SignatureNeededFrom;
                    ManagementApprovalMaster.SignatureNeededTo = ManagementApproval.ManagementApprovalMaster.SignatureNeededTo;
                    ManagementApprovalMaster.ApprovedDocument = ManagementApproval.ManagementApprovalMaster.ApprovedDocument;
                    ManagementApprovalMaster.ManagementApprovalCandidatesget = ManagementApproval.ManagementApprovalCandidatesget;
                    ManagementApprovalMaster.ManagementApprovalVacancy = ManagementApproval.ManagementApprovalVacancy;
                    ManagementApprovalMaster.ManagementApprovalSigntureFrom = ManagementApproval.ManagementApprovalSigntureFrom;
                    ManagementApprovalMaster.ManagementApprovalSigntureTo = ManagementApproval.ManagementApprovalSigntureTo;
                }
                return this.Ok(ManagementApprovalMaster);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //[HttpPost]
        //[Route("getmanagementapprovaldataviewpage")]
        //public async Task<IActionResult> ViewManagementApprovaltData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        //{
        //    try
        //    {
        //        ManagementApproval ManagementApproval = new ManagementApproval();
        //        ManagementApprovalMaster ManagementApprovalMaster = new ManagementApprovalMaster();
        //        ManagementApproval = await this.managementapprovalservice.ViewManagementApprovalData(search).ConfigureAwait(false);
        //        if (ManagementApproval.ManagementApprovalMaster != null)
        //        {
        //            ManagementApprovalMaster.ManagementApprovalId = ManagementApproval.ManagementApprovalMaster.ManagementApprovalId;
        //            ManagementApprovalMaster.CandidateId = ManagementApproval.ManagementApprovalMaster.CandidateId;
        //            ManagementApprovalMaster.From = ManagementApproval.ManagementApprovalMaster.From;
        //            ManagementApprovalMaster.To = ManagementApproval.ManagementApprovalMaster.To;
        //            ManagementApprovalMaster.Date = ManagementApproval.ManagementApprovalMaster.Date;
        //            ManagementApprovalMaster.Note = ManagementApproval.ManagementApprovalMaster.Note;
        //            ManagementApprovalMaster.BottomNote = ManagementApproval.ManagementApprovalMaster.BottomNote;
        //            ManagementApprovalMaster.SignatureNeededFrom = ManagementApproval.ManagementApprovalMaster.SignatureNeededFrom;
        //            ManagementApprovalMaster.SignatureNeededTo = ManagementApproval.ManagementApprovalMaster.SignatureNeededTo;
        //            ManagementApprovalMaster.ApprovedDocument = ManagementApproval.ManagementApprovalMaster.ApprovedDocument;
        //            ManagementApprovalMaster.ManagementApprovalCandidates = ManagementApproval.ManagementApprovalCandidates;
        //            ManagementApprovalMaster.ManagementApprovalVacancy = ManagementApproval.ManagementApprovalVacancy;
        //            ManagementApprovalMaster.ManagementApprovalSigntureFrom = ManagementApproval.ManagementApprovalSigntureFrom;
        //            ManagementApprovalMaster.ManagementApprovalSigntureTo = ManagementApproval.ManagementApprovalSigntureTo;
        //        }
        //        return this.Ok(ManagementApprovalMaster);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("getmanagementapprovaldataviewpage")]
        public async Task<IActionResult> ViewManagementApprovaltData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        {
            try
            {
                ManagementApprovalGet ManagementApproval = new ManagementApprovalGet();
                ManagementApprovalMasterGet ManagementApprovalMaster = new ManagementApprovalMasterGet();
                ManagementApproval = await this.managementapprovalservice.ViewManagementApprovalData(search).ConfigureAwait(false);
                if (ManagementApproval.ManagementApprovalMaster != null)
                {
                    ManagementApprovalMaster.ManagementApprovalId = ManagementApproval.ManagementApprovalMaster.ManagementApprovalId;
                    ManagementApprovalMaster.CandidateId = ManagementApproval.ManagementApprovalMaster.CandidateId;
                    ManagementApprovalMaster.From = ManagementApproval.ManagementApprovalMaster.From;
                    ManagementApprovalMaster.To = ManagementApproval.ManagementApprovalMaster.To;
                    ManagementApprovalMaster.Date = ManagementApproval.ManagementApprovalMaster.Date;
                    ManagementApprovalMaster.Note = ManagementApproval.ManagementApprovalMaster.Note;
                    ManagementApprovalMaster.BottomNote = ManagementApproval.ManagementApprovalMaster.BottomNote;
                    ManagementApprovalMaster.SignatureNeededFrom = ManagementApproval.ManagementApprovalMaster.SignatureNeededFrom;
                    ManagementApprovalMaster.SignatureNeededTo = ManagementApproval.ManagementApprovalMaster.SignatureNeededTo;
                    ManagementApprovalMaster.ApprovedDocument = ManagementApproval.ManagementApprovalMaster.ApprovedDocument;
                    ManagementApprovalMaster.ManagementApprovalCandidatesget = ManagementApproval.ManagementApprovalCandidatesget;
                    ManagementApprovalMaster.ManagementApprovalVacancy = ManagementApproval.ManagementApprovalVacancy;
                    ManagementApprovalMaster.ManagementApprovalSigntureFrom = ManagementApproval.ManagementApprovalSigntureFrom;
                    ManagementApprovalMaster.ManagementApprovalSigntureTo = ManagementApproval.ManagementApprovalSigntureTo;
                }
                return this.Ok(ManagementApprovalMaster);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("insertmanagementapproval")]
        public async Task<IActionResult> InsertManagementApproval(IFormCollection data)   // By Amartya on 05-08-2023
        {
            try
            {
                ManagementApprovalMasterSaveNew formData = new ManagementApprovalMasterSaveNew();
                formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
                formData.CandidateId = data["CandidateId"];
                formData.From = data["From"];
                formData.To = data["To"];
                formData.Date = data["Date"];
                formData.Note = data["Note"];
                formData.BottomNote = data["BottomNote"];
                formData.SignatureNeededFrom = data["SignatureNeededFrom"];
                formData.SignatureNeededTo = data["SignatureNeededTo"];



                string ManagementApprovalCandidates = data["ManagementApprovalCandidates"];
                formData.ManagementApprovalCandidates = JsonConvert.DeserializeObject<List<ManagementApprovalCandidatesGet>>(ManagementApprovalCandidates);
                string ManagementApprovalVacancy = data["ManagementApprovalVacancy"];
                formData.ManagementApprovalVacancy = JsonConvert.DeserializeObject<List<ManagementApprovalVacancy>>(ManagementApprovalVacancy);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.OHMailIds = data["OHMailIds"];
                formData.OMMailIds = data["OMMailIds"];
                formData.OCMailIds = data["OCMailIds"];
                formData.HTMailIds = data["HTMailIds"];
                formData.StatusFlag = data["StatusFlag"];
                formData.Flag = data["Flag"];
                formData.CandidateName = data["CandidateName"];



                var response = await this.managementapprovalservice.InsertManagementApproval(formData).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("campusgetmanagementapprovaldata")]
        public async Task<IActionResult> CampusGetManagementApprovalData(SearchManagementApproval search)
        {
            try
            {
                ManagementApproval ManagementApproval = new ManagementApproval();
                ManagementApprovalMaster ManagementApprovalMaster = new ManagementApprovalMaster();
                ManagementApproval = await this.managementapprovalservice.CampusGetManagementApprovalData(search).ConfigureAwait(false);
                if (ManagementApproval.ManagementApprovalMaster != null)
                {
                    ManagementApprovalMaster.ManagementApprovalId = ManagementApproval.ManagementApprovalMaster.ManagementApprovalId;
                    ManagementApprovalMaster.CandidateId = ManagementApproval.ManagementApprovalMaster.CandidateId;
                    ManagementApprovalMaster.From = ManagementApproval.ManagementApprovalMaster.From;
                    ManagementApprovalMaster.To = ManagementApproval.ManagementApprovalMaster.To;
                    ManagementApprovalMaster.Date = ManagementApproval.ManagementApprovalMaster.Date;
                    ManagementApprovalMaster.Note = ManagementApproval.ManagementApprovalMaster.Note;
                    ManagementApprovalMaster.BottomNote = ManagementApproval.ManagementApprovalMaster.BottomNote;
                    ManagementApprovalMaster.SignatureNeededFrom = ManagementApproval.ManagementApprovalMaster.SignatureNeededFrom;
                    ManagementApprovalMaster.SignatureNeededTo = ManagementApproval.ManagementApprovalMaster.SignatureNeededTo;
                    ManagementApprovalMaster.ApprovedDocument = ManagementApproval.ManagementApprovalMaster.ApprovedDocument;
                    ManagementApprovalMaster.ManagementApprovalCandidates = ManagementApproval.ManagementApprovalCandidates;
                    ManagementApprovalMaster.ManagementApprovalVacancy = ManagementApproval.ManagementApprovalVacancy;
                    ManagementApprovalMaster.ManagementApprovalSigntureFrom = ManagementApproval.ManagementApprovalSigntureFrom;
                    ManagementApprovalMaster.ManagementApprovalSigntureTo = ManagementApproval.ManagementApprovalSigntureTo;
                }
                return this.Ok(ManagementApprovalMaster);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("insertmanagementapproval")]
        //public async Task<IActionResult> InsertManagementApproval(IFormCollection data)  // By Amartya on 05-08-2023
        //{
        //    try
        //    {
        //        ManagementApprovalMasterSave formData = new ManagementApprovalMasterSave();
        //        formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
        //        formData.CandidateId = data["CandidateId"];
        //        formData.From = data["From"];
        //        formData.To = data["To"];
        //        formData.Date = data["Date"];
        //        formData.Note = data["Note"];
        //        formData.BottomNote = data["BottomNote"];
        //        formData.SignatureNeededFrom = data["SignatureNeededFrom"];
        //        formData.SignatureNeededTo = data["SignatureNeededTo"];

        //        string ManagementApprovalCandidates = data["ManagementApprovalCandidates"];
        //        formData.ManagementApprovalCandidates = JsonConvert.DeserializeObject<List<ManagementApprovalCandidates>>(ManagementApprovalCandidates);
        //        string ManagementApprovalVacancy = data["ManagementApprovalVacancy"];
        //        formData.ManagementApprovalVacancy = JsonConvert.DeserializeObject<List<ManagementApprovalVacancy>>(ManagementApprovalVacancy);
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
        //        formData.OHMailIds = data["OHMailIds"];
        //        formData.OMMailIds = data["OMMailIds"];
        //        formData.OCMailIds = data["OCMailIds"];
        //        formData.HTMailIds = data["HTMailIds"];
        //        formData.StatusFlag = data["StatusFlag"];
        //        formData.Flag = data["Flag"];
        //        formData.CandidateName = data["CandidateName"];

        //        var response = await this.managementapprovalservice.InsertManagementApproval(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


        [HttpPost]
        [Route("campuscandaiteinsertmanagementapproval")]
        public async Task<IActionResult> CampusCandiateInsertManagementApproval(IFormCollection data)
        {
            try
            {
                ManagementApprovalMasterSave formData = new ManagementApprovalMasterSave();
                formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
                formData.CandidateId = data["CandidateId"];
                formData.From = data["From"];
                formData.To = data["To"];
                formData.Date = data["Date"];
                formData.Note = data["Note"];
                formData.BottomNote = data["BottomNote"];
                formData.SignatureNeededFrom = data["SignatureNeededFrom"];
                formData.SignatureNeededTo = data["SignatureNeededTo"];

                string ManagementApprovalCandidates = data["ManagementApprovalCandidates"];
                formData.ManagementApprovalCandidates = JsonConvert.DeserializeObject<List<ManagementApprovalCandidates>>(ManagementApprovalCandidates);
                string ManagementApprovalVacancy = data["ManagementApprovalVacancy"];
                formData.ManagementApprovalVacancy = JsonConvert.DeserializeObject<List<ManagementApprovalVacancy>>(ManagementApprovalVacancy);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.OHMailIds = data["OHMailIds"];
                formData.OMMailIds = data["OMMailIds"];
                formData.OCMailIds = data["OCMailIds"];
                formData.HTMailIds = data["HTMailIds"];
                formData.StatusFlag = data["StatusFlag"];
                formData.Flag = data["Flag"];
                formData.CandidateName = data["CandidateName"];

                var response = await this.managementapprovalservice.CampusCandiateInsertManagementApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatemanagementapproval")]
        public async Task<IActionResult> UpdateManagementApproval(IFormCollection data)
        {
            try
            {
                ContainerReference = "managementapprovaldocumentapproved";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";

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
                            fileDocument = Path.Combine("/managementapprovaldocumentapproved", fileName);
                            fileDocument = fileDocument.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }

                ManagementApprovalMasterUpdate formData = new ManagementApprovalMasterUpdate();
                formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateIds = data["CandidateIds"];
                formData.ApprovedDocument = fileDocument;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.managementapprovalservice.UpdateManagementApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("campusupdatemanagementapproval")]
        public async Task<IActionResult> CampusUpdateManagementApproval(IFormCollection data)
        {
            try
            {
                ContainerReference = "managementapprovaldocumentapproved";
                fileName = "";
                //var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";

                if (httpRequest.Form.Files.Count > 0)
                {
                    foreach (var file1 in httpRequest.Form.Files)
                    {
                        var filePath = Path.Combine(environment.ContentRootPath, "UploadedFiles");
                        if (!Directory.Exists(filePath))
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        if (file1.Length > 0)
                        {
                            var timestamp = DateTime.Now.ToFileTime();
                            string timestampfilename = Convert.ToString(timestamp);
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"').Replace(" ","");
                            fileDocument = Path.Combine("/managementapprovaldocumentapproved", fileName);
                            fileDocument = fileDocument.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }

                ManagementApprovalMasterUpdate formData = new ManagementApprovalMasterUpdate();
                formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateIds = data["CandidateIds"];
                formData.ApprovedDocument = fileDocument;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.managementapprovalservice.CampusCanidateUpdateManagementApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("reuploadmanagementapproval")]
        public async Task<IActionResult> ReuploadManagementApproval(IFormCollection data)
        {
            try
            {
                ContainerReference = "managementapprovaldocumentapproved";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";

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
                            fileDocument = Path.Combine("/managementapprovaldocumentapproved", fileName);
                            fileDocument = fileDocument.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }

                ManagementApprovalMasterUpdate formData = new ManagementApprovalMasterUpdate();
                formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateIds = data["CandidateIds"];
                formData.ApprovedDocument = fileDocument;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.managementapprovalservice.ReuploadManagementApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //[HttpPost]
        //[Route("updatemanagementapproval")]
        //public async Task<IActionResult> UpdateManagementApproval(IFormCollection data)
        //{
        //    try
        //    {
        //        string fileName = "";
        //        var file = Request.Form.Files[0];
        //        string HostUrl = this.environment.ContentRootPath;
        //        string filepath = "UploadedFiles/ManagementApprovalDocumentApproved";
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
        //        ManagementApprovalMasterUpdate formData = new ManagementApprovalMasterUpdate();
        //        formData.ManagementApprovalId = Convert.ToInt32(data["ManagementApprovalId"]);
        //        formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
        //        formData.CandidateIds = data["CandidateIds"];
        //        formData.ApprovedDocument = "/" + filepath + "/" + fileName;                
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

        //        var response = await this.managementapprovalservice.UpdateManagementApproval(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


    }
}

