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
using System.Net.Http.Headers;
using Microsoft.WindowsAzure.Storage;
using System.Data;
using Microsoft.WindowsAzure.Storage.Blob;

namespace Application.WebApp.Areas.CandidateModule.Controllers
{
    [Route("api/candidate")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICandidateService candidateService;
        public CandidateController(ICandidateService candidateService, IWebHostEnvironment environment)
        {
            this.candidateService = candidateService;
            this.environment = environment;
        }


        //uat
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        //live
       // CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");
        public string ContainerReference = null;
        string fileName = "";

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname= this.candidateService.CloudStorageAccountname();

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
        //[Route("createcandidateprofile")]
        //public async Task<IActionResult> CreateCandidateProfile(IFormCollection data)
        //{
        //    try
        //    {
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
        //        Candidate formData = new Candidate();
        //        formData.PrefixId = Convert.ToInt32(data["PrefixId"]);
        //        formData.Age = 0;
        //        formData.FullName = data["FullName"];
        //        formData.GenderId = Convert.ToInt32(data["GenderId"]);
        //        formData.DOB = data["DOB"];
        //        formData.EmailId = data["EmailId"];
        //        formData.ContactNo = data["ContactNo"];
        //        formData.AadharNo = data["AadharNo"];
        //        formData.MotherTongueId = Convert.ToInt32(data["MotherTongueId"]);
        //        formData.LanguageIds = data["LanguageIds"];
        //        formData.QualificationId = Convert.ToInt32(data["QualificationId"]);
        //        formData.StreamId = Convert.ToInt32(data["StreamId"]);
        //        formData.CourseId = Convert.ToInt32(data["CourseId"]);
        //        formData.MarksPercentage = Convert.ToDecimal(data["MarksPercentage"]);
        //        formData.CompletionYear = Convert.ToInt32(data["CompletionYear"]);
        //        formData.QualificationTypeId = Convert.ToInt32(data["QualificationTypeId"]);
        //        formData.ExperienceYear = Convert.ToInt32(data["ExperienceYear"]);
        //        formData.ExperienceMonth = Convert.ToInt32(data["ExperienceMonth"]);
        //        formData.CurrentCTC = Convert.ToDecimal(data["CurrentCTC"]);
        //        formData.CurrentEmployer = data["CurrentEmployer"];
        //        formData.CurrentDesignation = data["CurrentDesignation"];
        //        formData.DomainId = Convert.ToInt32(data["DomainId"]);
        //        formData.SubDomainId = Convert.ToInt32(data["SubDomainId"]);
        //        formData.StateId = Convert.ToInt32(data["StateId"]);
        //        formData.PreviousApplied = Convert.ToInt32(data["PreviousApplied"]);
        //        formData.RelativeStatus = Convert.ToInt32(data["RelativeStatus"]);
        //        formData.RelativeName = data["RelativeName"];
        //        formData.RelativeContactNo = data["RelativeContactNo"];
        //        formData.ParentRelationshipId = Convert.ToInt32(data["ParentRelationshipId"]);
        //        formData.ChildRelationshipId = Convert.ToInt32(data["ChildRelationshipId"]);
        //        formData.RelationshipNotes = data["RelationshipNotes"];
        //        formData.Resume = "/" + filepath + "/" + fileName;
        //        formData.SourceChannelId = Convert.ToInt32(data["SourceChannelId"]);
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
        //        formData.VendorId = Convert.ToInt32(data["VendorId"]);
        //        formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
        //        formData.InternalCandidateRemarks = data["InternalCandidateRemarks"];
        //        var response = await this.candidateService.SaveCandidate(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("createcandidateprofile")]
        public async Task<IActionResult> CreateCandidateProfile(IFormCollection data)
        {
            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";

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
                            fileResume = Path.Combine("/candidateresume", fileName);
                            fileResume = fileResume.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }

                        }
                    }
                }


                Candidate formData = new Candidate();
                formData.PrefixId = Convert.ToInt32(data["PrefixId"]);
                formData.Age = 0;
                formData.FullName = data["FullName"];
                formData.GenderId = Convert.ToInt32(data["GenderId"]);
                formData.DOB = data["DOB"];
                formData.EmailId = data["EmailId"];
                formData.ContactNo = data["ContactNo"];
                formData.AadharNo = data["AadharNo"];
                formData.MotherTongueId = Convert.ToInt32(data["MotherTongueId"]);
                formData.LanguageIds = data["LanguageIds"];
                formData.QualificationId = Convert.ToInt32(data["QualificationId"]);
                formData.StreamId = Convert.ToInt32(data["StreamId"]);
                formData.CourseId = Convert.ToInt32(data["CourseId"]);
                formData.MarksPercentage = Convert.ToDecimal(data["MarksPercentage"]);
                formData.CompletionYear = Convert.ToInt32(data["CompletionYear"]);
                formData.QualificationTypeId = Convert.ToInt32(data["QualificationTypeId"]);
                formData.ExperienceYear = Convert.ToInt32(data["ExperienceYear"]);
                formData.ExperienceMonth = Convert.ToInt32(data["ExperienceMonth"]);
                formData.CurrentCTC = Convert.ToDecimal(data["CurrentCTC"]);
                formData.CurrentEmployer = data["CurrentEmployer"];
                formData.CurrentDesignation = data["CurrentDesignation"];
                formData.DomainId = Convert.ToInt32(data["DomainId"]);
                formData.SubDomainId = Convert.ToInt32(data["SubDomainId"]);
                formData.StateId = Convert.ToInt32(data["StateId"]);
                formData.PreviousApplied = Convert.ToInt32(data["PreviousApplied"]);
                formData.RelativeStatus = Convert.ToInt32(data["RelativeStatus"]);
                formData.RelativeName = data["RelativeName"];
                formData.RelativeContactNo = data["RelativeContactNo"];
                formData.ParentRelationshipId = Convert.ToInt32(data["ParentRelationshipId"]);
                formData.ChildRelationshipId = Convert.ToInt32(data["ChildRelationshipId"]);
                formData.RelationshipNotes = data["RelationshipNotes"];
                formData.Resume = fileResume;
                formData.SourceChannelId = Convert.ToInt32(data["SourceChannelId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.VendorId = Convert.ToInt32(data["VendorId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.InternalCandidateRemarks = data["InternalCandidateRemarks"];
                var response = await this.candidateService.SaveCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("createnewcandidateprofile")]
        public async Task<IActionResult> CreateNewCandidateProfile(IFormCollection data)
        {
            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";

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
                            fileResume = Path.Combine("/candidateresume", fileName);
                            fileResume = fileResume.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }

                        }
                    }
                }


                CandidateDetails formData = new CandidateDetails();
                formData.PrefixId = Convert.ToInt32(data["PrefixId"]);
                formData.Age = 0;
                formData.FullName = data["FullName"];
                formData.GenderId = Convert.ToInt32(data["GenderId"]);
                formData.DOB = data["DOB"];
                formData.EmailId = data["EmailId"];
                formData.ContactNo = data["ContactNo"];
                formData.AadharNo = data["AadharNo"];
                formData.MotherTongueId = Convert.ToInt32(data["MotherTongueId"]);
                formData.LanguageIds = data["LanguageIds"];
                formData.QualificationId = Convert.ToInt32(data["QualificationId"]);
                formData.StreamId = Convert.ToInt32(data["StreamId"]);
                formData.CourseId = Convert.ToInt32(data["CourseId"]);
                formData.MarksPercentage = Convert.ToDecimal(data["MarksPercentage"]);
                formData.CompletionYear = Convert.ToInt32(data["CompletionYear"]);
                formData.QualificationTypeId = Convert.ToInt32(data["QualificationTypeId"]);
                formData.ExperienceYear = Convert.ToInt32(data["ExperienceYear"]);
                formData.ExperienceMonth = Convert.ToInt32(data["ExperienceMonth"]);
                formData.CurrentCTC = Convert.ToDecimal(data["CurrentCTC"]);
                formData.CurrentEmployer = data["CurrentEmployer"];
                formData.CurrentDesignation = data["CurrentDesignation"];
                formData.DomainId = Convert.ToInt32(data["DomainId"]);
                formData.SubDomainId = Convert.ToInt32(data["SubDomainId"]);
                formData.StateId = Convert.ToInt32(data["StateId"]);
                formData.PreviousApplied = Convert.ToInt32(data["PreviousApplied"]);
                formData.RelativeStatus = Convert.ToInt32(data["RelativeStatus"]);
                formData.RelativeName = data["RelativeName"];
                formData.RelativeContactNo = data["RelativeContactNo"];
                formData.ParentRelationshipId = Convert.ToInt32(data["ParentRelationshipId"]);
                formData.ChildRelationshipId = Convert.ToInt32(data["ChildRelationshipId"]);
                formData.RelationshipNotes = data["RelationshipNotes"];
                formData.Resume = fileResume;
                formData.SourceChannelId = Convert.ToInt32(data["SourceChannelId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.VendorId = Convert.ToInt32(data["VendorId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.InternalCandidateRemarks = data["InternalCandidateRemarks"];
                formData.Password = data["Password"];
                var response = await this.candidateService.CreateCandidateProfile(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("updatecandidateprofile")]
        public async Task<IActionResult> UpdateCandidateProfile(IFormCollection data)
        {
            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";

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
                            fileResume = Path.Combine("/candidateresume", fileName);
                            fileResume = fileResume.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }


                Candidate formData = new Candidate();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.PrefixId = Convert.ToInt32(data["PrefixId"]);
                formData.Age = 0;
                formData.FullName = data["FullName"];
                formData.GenderId = Convert.ToInt32(data["GenderId"]);
                formData.DOB = data["DOB"];
                formData.EmailId = data["EmailId"];
                formData.ContactNo = data["ContactNo"];
                formData.AadharNo = data["AadharNo"];
                formData.MotherTongueId = Convert.ToInt32(data["MotherTongueId"]);
                formData.LanguageIds = data["LanguageIds"];
                formData.QualificationId = Convert.ToInt32(data["QualificationId"]);
                formData.StreamId = Convert.ToInt32(data["StreamId"]);
                formData.CourseId = Convert.ToInt32(data["CourseId"]);
                formData.MarksPercentage = Convert.ToDecimal(data["MarksPercentage"]);
                formData.CompletionYear = Convert.ToInt32(data["CompletionYear"]);
                formData.QualificationTypeId = Convert.ToInt32(data["QualificationTypeId"]);
                formData.ExperienceYear = Convert.ToInt32(data["ExperienceYear"]);
                formData.ExperienceMonth = Convert.ToInt32(data["ExperienceMonth"]);
                formData.CurrentCTC = Convert.ToDecimal(data["CurrentCTC"]);
                formData.CurrentEmployer = data["CurrentEmployer"];
                formData.CurrentDesignation = data["CurrentDesignation"];
                formData.DomainId = Convert.ToInt32(data["DomainId"]);
                formData.SubDomainId = Convert.ToInt32(data["SubDomainId"]);
                formData.StateId = Convert.ToInt32(data["StateId"]);
                formData.PreviousApplied = Convert.ToInt32(data["PreviousApplied"]);
                formData.RelativeStatus = Convert.ToInt32(data["RelativeStatus"]);
                formData.RelativeName = data["RelativeName"];
                formData.RelativeContactNo = data["RelativeContactNo"];
                formData.ParentRelationshipId = Convert.ToInt32(data["ParentRelationshipId"]);
                formData.ChildRelationshipId = Convert.ToInt32(data["ChildRelationshipId"]);
                formData.RelationshipNotes = data["RelationshipNotes"];
                formData.Resume = fileResume;
                formData.SourceChannelId = Convert.ToInt32(data["SourceChannelId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.VendorId = Convert.ToInt32(data["VendorId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.InternalCandidateRemarks = data["InternalCandidateRemarks"];
                var response = await this.candidateService.SaveCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("Updateonlycandidateprofile")]
        public async Task<IActionResult> UpdateOnlyCandidateProfile(IFormCollection data)
        {
            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                //var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";

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
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"');
                            fileResume = Path.Combine("/candidateresume", fileName);
                            fileResume = fileResume.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                //System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }

                        }
                    }
                }

                Candidate formData = new Candidate();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.PrefixId = Convert.ToInt32(data["PrefixId"]);
                formData.Age = 0;
                formData.FullName = data["FullName"];
                formData.GenderId = Convert.ToInt32(data["GenderId"]);
                formData.DOB = data["DOB"];
                formData.EmailId = data["EmailId"];
                formData.ContactNo = data["ContactNo"];
                formData.AadharNo = data["AadharNo"];
                formData.MotherTongueId = Convert.ToInt32(data["MotherTongueId"]);
                formData.LanguageIds = data["LanguageIds"];
                formData.QualificationId = Convert.ToInt32(data["QualificationId"]);
                formData.StreamId = Convert.ToInt32(data["StreamId"]);
                formData.CourseId = Convert.ToInt32(data["CourseId"]);
                formData.MarksPercentage = Convert.ToDecimal(data["MarksPercentage"]);
                formData.CompletionYear = Convert.ToInt32(data["CompletionYear"]);
                formData.QualificationTypeId = Convert.ToInt32(data["QualificationTypeId"]);
                formData.ExperienceYear = Convert.ToInt32(data["ExperienceYear"]);
                formData.ExperienceMonth = Convert.ToInt32(data["ExperienceMonth"]);
                formData.CurrentCTC = Convert.ToDecimal(data["CurrentCTC"]);
                formData.CurrentEmployer = data["CurrentEmployer"];
                formData.CurrentDesignation = data["CurrentDesignation"];
                formData.DomainId = Convert.ToInt32(data["DomainId"]);
                formData.SubDomainId = Convert.ToInt32(data["SubDomainId"]);
                formData.StateId = Convert.ToInt32(data["StateId"]);
                formData.PreviousApplied = Convert.ToInt32(data["PreviousApplied"]);
                formData.RelativeStatus = Convert.ToInt32(data["RelativeStatus"]);
                formData.RelativeName = data["RelativeName"];
                formData.RelativeContactNo = data["RelativeContactNo"];
                formData.Resume = fileResume;
                var response = await this.candidateService.SaveCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("Updateonlycampuscandidateprofile")]
        public async Task<IActionResult> UpdateOnlyCampusCandidateProfile(IFormCollection data)
        {
            try
            {
                ContainerReference = "candidateresume";
                fileName = "";
                //var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileResume = "";

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
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"');
                            fileResume = Path.Combine("/candidateresume", fileName);
                            fileResume = fileResume.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                //System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }

                        }
                    }
                }

                CampusCandidateUpdate formData = new CampusCandidateUpdate();
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.PrefixId = Convert.ToInt32(data["PrefixId"]);
                formData.Age = Convert.ToInt32(data["Age"]); ;
                formData.FullName = data["FullName"];
                formData.GenderId = Convert.ToInt32(data["GenderId"]);
                formData.DOB = data["DOB"];
                formData.EmailId = data["EmailId"];
                formData.ContactNo = data["ContactNo"];
                formData.AadharNo = data["AadharNo"];
                formData.MotherTongueId = Convert.ToInt32(data["MotherTongueId"]);
                formData.LanguageIds = data["LanguageIds"];
                formData.StateId = Convert.ToInt32(data["StateId"]);
                formData.PreviousApplied = Convert.ToInt32(data["PreviousApplied"]);
                formData.RelativeStatus = Convert.ToInt32(data["RelativeStatus"]);
                formData.RelativeName = data["RelativeName"];
                formData.RelativeContactNo = data["RelativeContactNo"];
                formData.Resume = fileResume;
                var response = await this.candidateService.SaveCampusCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcandidateprofile")]
        public async Task<IActionResult> GetCandidateProfile(SearchCandidate search)
        {
            try
            {
                var response = await this.candidateService.GetCandidate(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("editcampuscandidateapplicationform")]
        public async Task<IActionResult> EditCampuscandidateApplicationform(EditCampusCandidate search)
        {
            try
            {
                var response = await this.candidateService.EditCampuscandidateApplicationform(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("editcampuscandidateregistrationform")]
        public async Task<IActionResult> Editcampuscandidateregistrationform(EditCampusCandidateRegistration search)
        {
            try
            {
                var response = await this.candidateService.Editcampuscandidateregistrationform(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("savecandidateprofile")]
        public async Task<IActionResult> SaveCandidateProfile(Candidate formdata)
        {
            try
            {
                var response = await this.candidateService.SaveCandidate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savecandidatestatus")]
        public async Task<IActionResult> SaveCandidateStatus(CandidateStatus search)
        {
            try
            {
                var response = await this.candidateService.SaveCandidateStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("savecandidatecmdstatus")]
        public async Task<IActionResult> SaveCandidateCMDStatus(IFormCollection data)
        {
            try
            {
                try
                {
                    ContainerReference = "candidatemanagementapprovaldocument";
                    string ManagementApprovalDocument = "";
                    fileName = "";
                    if (Request.Form.Files.Count > 0)
                    {
                        var file = Request.Form.Files[0];
                    
                        string HostUrl = this.environment.ContentRootPath;
                        var httpRequest = HttpContext.Request;
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
                                    ManagementApprovalDocument = Path.Combine("/candidatemanagementapprovaldocument", fileName);
                                    ManagementApprovalDocument = ManagementApprovalDocument.Replace("\\", "/");
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
                    

                    CandidateCmdStatus formData = new CandidateCmdStatus();
                    formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                    formData.CMDApprovalRequired = Convert.ToInt32(data["CMDApprovalRequired"]);
                    formData.CMDApprovalStatus = Convert.ToInt32(data["CMDApprovalStatus"]);
                    formData.CMDApprovalNo = data["CMDApprovalNo"];
                    formData.CMDApprovalDocument = ManagementApprovalDocument;
                    var response = await this.candidateService.SaveCandidateCMDStatus(formData).ConfigureAwait(false);

                    return this.Ok(response);
                }
                catch (Exception ex)
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                }

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("savecandidatecmdstatus")]
        //public async Task<IActionResult> SaveCandidateCMDStatus(IFormCollection data)
        //{
        //    try
        //    {
        //        try
        //        {
        //            string entirepath = "";
        //            string fileName = "";
        //            if (Request.Form.Files.Count > 0)
        //            {
        //                var file = Request.Form.Files[0];
        //                string HostUrl = this.environment.ContentRootPath;
        //                string filepath = "UploadedFiles/CandidateManagementApprovalDocument";
        //                string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
        //                if (!Directory.Exists(uploadpath))
        //                {
        //                    Directory.CreateDirectory(uploadpath);
        //                }
        //                if (file.Length > 0)
        //                {
        //                    var timestamp = DateTime.Now.ToFileTime();
        //                    string timestampfilename = Convert.ToString(timestamp);
        //                    fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
        //                    string fullPath = Path.Combine(uploadpath, fileName);
        //                    using (var stream = new FileStream(fullPath, FileMode.Create))
        //                    {
        //                        file.CopyTo(stream);
        //                    }
        //                }
        //                entirepath = "/" + filepath + "/" + fileName;
        //            }
        //            else
        //            {
        //                entirepath = "";
        //            }
        //            CandidateCmdStatus formData = new CandidateCmdStatus();
        //            formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
        //            formData.CMDApprovalRequired = Convert.ToInt32(data["CMDApprovalRequired"]);
        //            formData.CMDApprovalStatus = Convert.ToInt32(data["CMDApprovalStatus"]);
        //            formData.CMDApprovalNo = data["CMDApprovalNo"];
        //            formData.CMDApprovalDocument = entirepath;
        //            var response = await this.candidateService.SaveCandidateCMDStatus(formData).ConfigureAwait(false);

        //            return this.Ok(response);
        //        }
        //        catch (Exception ex)
        //        {
        //            return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("getcandidatelist")]
        public async Task<IActionResult> GetCandidateList(SearchCandidateDetail search)
        {
            try
            {
                //search.folderPath = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\UploadFile");
                var response = await this.candidateService.GetCandidateDetail(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcandidatedummylist")]
        public async Task<IActionResult> GetCandidatedummyList(SearchCandidateDetail search)
        {
            try
            {
                var response = await this.candidateService.GetCandidatedummyDetail(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidatedetailssalaryfitment")]
        public async Task<IActionResult> CandidateDetailsSalaryFitment(SearchCandidateDetail search)
        {
            try
            {
                var response = await this.candidateService.CandidateDetailsSalaryFitment(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //comment by kuntal
        [HttpPost]
        [Route("createaccount")]
        public async Task<IActionResult> CreateUserRegistration(CandidateRegistration formdata)
        {
            try
            {
                var response = await this.candidateService.CreateUserRegistration(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatedata")]
        public async Task<IActionResult> GetCandidateData(SearchCandidateData search)
        {
            try
            {
                var response = await this.candidateService.GetCandidateData(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampuscandidateupdatedata")]
        public async Task<IActionResult> GetCampusCandidateData(SearchCandidateData search)
        {
            try
            {
                var response = await this.candidateService.GetCampusCandidateData(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getCvDropCandidateList")]
        public async Task<IActionResult> GetCvDropCandidateList(filtercandidatedetail search)
        {
            try
            {
                var response = await this.candidateService.GetCvDropCandidateList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcvdropcandidatelistnew")]
        public async Task<IActionResult> GetCvDropCandidateListNew(filtercandidatedetailNew search)
        {
            try
            {
                
                var response = await this.candidateService.GetCvDropCandidateListNew(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("GetAllCVDropList")]
        public async Task<IActionResult> GetAllCVDropCandidateDetails(cvdropcandidate search)
        {
            try
            {
                var response = await this.candidateService.GetAllCVDropCandidateDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("candidateapplyjob")]
        public async Task<IActionResult> CandidateApplyJob(ApplyJobExternal formdata)
        {
            try
            {
                var response = await this.candidateService.CandidateApplyJob(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getinternalcandidate")]
        public async Task<IActionResult> GetInternalCandidate(SearchInternalCandidate search)
        {
            try
            {
                var response = await this.candidateService.GetInternalCandidate(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("candidatecheckProfileUpdate")]
        public async Task<IActionResult> CandidateCheckProfileUpdate(CandidateApplyJob formdata)
        {
            try
            {
                var response = await this.candidateService.CandidateCheckProfileUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatehiringremarks")]
        public async Task<IActionResult> GetCandidateHiringRemarks(SearchCandidateHiringRemarks search)
        {
            try
            {
                var response = await this.candidateService.GetCandidateHiringRemarks(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcandidateofferrejectremarks")]
        public async Task<IActionResult> GetCandidateOfferRejectRemarks(SearchCandidateOfferRejectRemarks search)
        {
            try
            {
                var response = await this.candidateService.GetCandidateOfferRejectRemarks(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsalaryfitmentlistnew")]
        public async Task<IActionResult> GetSalaryFitmentNewList(SearchSalaryFitment search)
        {
            try
            {
                var response = await this.candidateService.GetSalaryFitmentNewList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getnaukricandidate")]
        public async Task<IActionResult> GetNaukriCandidate(InputNaukriCandidate search)
        {
            try
            {
                var response = await this.candidateService.GetNaukriCandidate(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getrequitiondetailsforcvdrop")]
        public async Task<IActionResult> GetRequisitionDetailsForCandiateSearch(Searchrequisition search)
        {
            try
            {
                var response = await this.candidateService.GetRequisitionDetailsForCandiateSearch(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
