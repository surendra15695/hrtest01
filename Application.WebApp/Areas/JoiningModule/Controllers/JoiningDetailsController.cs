using Application.Entity.Entities.JoiningModule;
using Application.Service.Services.Interfaces.JoiningModule;
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

namespace Application.WebApp.Areas.JoiningModule.Controllers
{
    [Route("api/joiningdetails")]
    [ApiController]
    public class JoiningDetailsController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IJoiningDetailsService joiningdetailsservice;


        public JoiningDetailsController(IJoiningDetailsService joiningdetailsservice, IWebHostEnvironment environment)
        {
            this.joiningdetailsservice = joiningdetailsservice;
            this.environment = environment;
        }
        public string ContainerReference = null;
        string fileName = "";

        [HttpPost]
        [Route("getcandidatelistreassignhiring")]
        public async Task<IActionResult> GetCandidateListReAssignHiring(ReAssignCandidatHiringListSearch search)
        {
            try
            {
                var response = await this.joiningdetailsservice.GetCandidateListReAssignHiring(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getlistreassignforrejectcandidate")]
        public async Task<IActionResult> GetListReAssignHiring(ReAssignHiringListSearch search)
        {
            try
            {
                var response = await this.joiningdetailsservice.GetListReAssignHiring(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getalldiscontinuedcandidate")]
        public async Task<IActionResult> GetAllDiscontinuedCandidate(SearchDiscontinuedCandidate search)
        {
            try
            {
                var response = await this.joiningdetailsservice.GetAllDiscontinuedCandidate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("savejoininghiringteamassign")]
        public async Task<IActionResult> SaveJoiningHiringTeamAssign(CandidatHiringTeamSave formdata)
        {
            try
            {
                var response = await this.joiningdetailsservice.SaveJoiningHiringTeamAssign(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getjoininghiringteamassigned")]
        public async Task<IActionResult> GetJoiningHiringTeamAssigned(CandidatHiringTeamAssignedSearch search)
        {
            try
            {
                var response = await this.joiningdetailsservice.GetJoiningHiringTeamAssigned(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatejoiningconfirmation")]
        public async Task<IActionResult> GetCandidateJoiningConfirmation(CandidateJoiningConfirmationSearch search)
        {
            try
            {
                var response = await this.joiningdetailsservice.GetCandidateJoiningConfirmation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savecandidatejoiningconfirmation")]
        public async Task<IActionResult> SaveCandidateJoiningConfirmation(CandidateJoiningConfirmationSave formdata)
        {
            try
            {
                var response = await this.joiningdetailsservice.SaveCandidateJoiningConfirmation(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savecandidateemployeeno")]
        public async Task<IActionResult> SaveCandidateEmployeeNo(CandidateEmployeeNoSave formdata)
        {
            try
            {
                var response = await this.joiningdetailsservice.SaveCandidateEmployeeNo(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidateemployeeno")]
        public async Task<IActionResult> GetCandidateEmployeeNo(CandidateEmployeeNoSearch search)
        {
            try
            {
                var response = await this.joiningdetailsservice.GetCandidateEmployeeNo(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateofferdocument")]
        public async Task<IActionResult> UpdateOfferDocument(IFormCollection data)
        {
            try
            {
               // string fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                string filepath = "UploadedFiles/"+data["DocumentPath"];
                string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                string fileDocument = "";
                //if (!Directory.Exists(uploadpath))
                //{
                //    Directory.CreateDirectory(uploadpath);
                //}
                //if (file.Length > 0)
                //{
                //    var timestamp = DateTime.Now.ToFileTime();
                //    string timestampfilename = Convert.ToString(timestamp);
                //    fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //    string fullPath = Path.Combine(uploadpath, fileName);
                //    using (var stream = new FileStream(fullPath, FileMode.Create))
                //    {
                //        file.CopyTo(stream);
                //    }
                //}

                DocumentUpdateFormData formData = new DocumentUpdateFormData();
                formData.OfferDocumentCollectionDocumentId = Convert.ToInt32(data["OfferDocumentCollectionDocumentId"]);
                formData.OfferDocumentCollectionId = Convert.ToInt32(data["OfferDocumentCollectionId"]);
                formData.DoumentType = Convert.ToInt32(data["DocumentType"]);
                formData.DoumentParticular = Convert.ToInt32(data["DocumentParticular"]);
                formData.DoumentName = data["DocumentName"];
                formData.Document = data["Document"];
                formData.ApprovalRemarks = data["ApprovalRemarks"];
                formData.AdditionalDocument = Convert.ToBoolean(data["AdditionalDocument"]);
               //formData.DocumentPath = "/" + filepath + "/" + fileName;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.DocumentNameId = Convert.ToInt32(data["DocumentNameId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);

                if (Request.Form.Files.Count > 0)
                {
                    foreach (var file1 in Request.Form.Files)
                    {
                      var filePath = Path.Combine(environment.ContentRootPath, "UploadedFiles");
                        //    if (!Directory.Exists(filePath))
                        //    {
                        //        Directory.CreateDirectory(filePath);
                        //    }
                        if (file.Length > 0)
                        {
                            var timestamp = DateTime.Now.ToFileTime();
                            string timestampfilename = Convert.ToString(timestamp);
                            var fileName1 = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            fileName = fileName1.Replace(" ", "");
                            if (formData.DocumentNameId == 25)
                            {
                                ContainerReference = "candidateresume";
                            }
                            else if (formData.DocumentNameId == 20)
                            {
                                ContainerReference = "bvgreport";
                            }

                            else if (formData.DocumentNameId == 9)
                            {
                                ContainerReference = "medicaldocuments";
                            }
                            else
                            {
                                ContainerReference = "candidatedocument";
                            }
                                fileDocument = Path.Combine("/"+ ContainerReference, fileName);
                            fileDocument = fileDocument.Replace("\\", "/");
                            //using (var memoryStream = new MemoryStream())
                            //{
                            //    await file1.CopyToAsync(memoryStream);
                            //    System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                            //    await UploadToAzureAsync(file1);
                            //}
                            if (file.Length > 0)
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    await file1.CopyToAsync(memoryStream);
                                    await UploadToAzureAsync(file1);
                                }
                            }

                        }
                    }
                }
                formData.DocumentPath = fileDocument;
                var response = await this.joiningdetailsservice.UpdateOfferDocument(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.joiningdetailsservice.CloudStorageAccountname();
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
    }
}
