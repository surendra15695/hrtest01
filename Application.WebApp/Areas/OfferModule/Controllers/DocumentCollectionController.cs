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
using Azure.Storage.Blobs;
using System.IO.Compression;

namespace Application.WebApp.Areas.OfferModule.Controllers
{
    [Route("api/documentcollection")]
    [ApiController]
    public class DocumentCollectionController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IDocumentCollectionService documentcollectionService;
        public DocumentCollectionController(IDocumentCollectionService documentcollectionService, IWebHostEnvironment environment)
        {
            this.documentcollectionService = documentcollectionService;
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

            var cloudStorageAccountname = this.documentcollectionService.CloudStorageAccountname();
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
        [Route("insertdocumentcollection")]
        public async Task<IActionResult> InsertDocumentCollection(DocumentCollectionFormMasterData formdata)
        {
            try
            {
                var response = await this.documentcollectionService.InsertDocumentCollection(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campusinsertdocumentcollection")]
        public async Task<IActionResult> CampusInsertDocumentCollection(DocumentCollectionFormMasterData formdata)
        {
            try
            {
                var response = await this.documentcollectionService.CampusInsertDocumentCollection(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatedocumentcollection")]
        public async Task<IActionResult> UpdateDocumentCollection(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                ContainerReference = "candidatedocument";
                string additinalFile = "";
                string uploadFile = "";
                string FileDataName = "";

                DocumentCollectionFormData formData = new DocumentCollectionFormData();
                string AttachmentData = data["AttachmentDetails"];
                formData.AttachmentDetails = JsonConvert.DeserializeObject<List<AttachmentData>>(AttachmentData);

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;
                    if (FileDataName.Contains("UploadFile"))
                    {
                        foreach (var attachments in formData.AttachmentDetails)
                        {
                            if ("UploadFile_" + attachments.DoumentNameId.ToString() == FileDataName)
                            {

                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                                uploadFile = Path.Combine("/candidatedocument", fileName);
                                uploadFile = uploadFile.Replace("\\", "/");

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

                        formData.AttachmentDetails[i].DocumentPath = uploadFile;
                    }
                    else if (FileDataName.Contains("AdditionalFile"))
                    {
                        foreach (var attachments in formData.AttachmentDetails)
                        {
                            if ("AdditionalFile_" + attachments.OfferDocumentCollectionDocumentId.ToString() == FileDataName)
                            {
                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                                additinalFile = Path.Combine("/candidatedocument", fileName);
                                additinalFile = additinalFile.Replace("\\", "/");

                                if (file.Length > 0)
                                {
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }

                                attachments.DocumentPath = additinalFile;
                            }
                        }
                    }
                }


                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.AttachmentDocumnetNameIdsToDelete = data["AttachmentDocumnetNameIdsToDelete"];
                string SalaryData = data["SalaryDetails"];
                formData.SalaryDetails = JsonConvert.DeserializeObject<List<SalaryData>>(SalaryData);
                string RemaksData = data["RemaksDetails"];
                formData.RemaksDetails = JsonConvert.DeserializeObject<List<RemaksData>>(RemaksData);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.documentcollectionService.UpdateDocumentCollection(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campusupdatedocumentcollection")]
        public async Task<IActionResult> CampusUpdateDocumentCollection(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                ContainerReference = "candidatedocument";
                string additinalFile = "";
                string uploadFile = "";
                string FileDataName = "";

                DocumentCollectionFormData formData = new DocumentCollectionFormData();
                string AttachmentData = data["AttachmentDetails"];
                formData.AttachmentDetails = JsonConvert.DeserializeObject<List<AttachmentData>>(AttachmentData);

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;
                    if (FileDataName.Contains("UploadFile"))
                    {
                        foreach (var attachments in formData.AttachmentDetails)
                        {
                            if ("UploadFile_" + attachments.DoumentNameId.ToString() == FileDataName)
                            {

                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                                uploadFile = Path.Combine("/candidatedocument", fileName);
                                uploadFile = uploadFile.Replace("\\", "/");

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

                        formData.AttachmentDetails[i].DocumentPath = uploadFile;
                    }
                    else if (FileDataName.Contains("AdditionalFile"))
                    {
                        foreach (var attachments in formData.AttachmentDetails)
                        {
                            if ("AdditionalFile_" + attachments.OfferDocumentCollectionDocumentId.ToString() == FileDataName)
                            {
                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                                additinalFile = Path.Combine("/candidatedocument", fileName);
                                additinalFile = additinalFile.Replace("\\", "/");

                                if (file.Length > 0)
                                {
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[i].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[i]);
                                    }
                                }

                                attachments.DocumentPath = additinalFile;
                            }
                        }
                    }
                }


                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.AttachmentDocumnetNameIdsToDelete = data["AttachmentDocumnetNameIdsToDelete"];
                string SalaryData = data["SalaryDetails"];
                formData.SalaryDetails = JsonConvert.DeserializeObject<List<SalaryData>>(SalaryData);
                string RemaksData = data["RemaksDetails"];
                formData.RemaksDetails = JsonConvert.DeserializeObject<List<RemaksData>>(RemaksData);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.documentcollectionService.CampusUpdateDocumentCollection(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("uploademployeedocument")]
        public async Task<IActionResult> UploadEmployeeDocumentFromEDMS(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                ContainerReference = "candidatedocument";
                string additinalFile = "";
                string uploadFile = "";
                string FileDataName = "";

                UploadDocumentFormDataEDMS formData = new UploadDocumentFormDataEDMS();
                string AttachmentData = data["AttachmentDetails"];
                formData.AttachmentDocDetailsEDMS = JsonConvert.DeserializeObject<List<DocumentAttachmentDataEDMS>>(AttachmentData);

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;
                    if (FileDataName.Contains("UploadFile_"))
                    {
                        foreach (var attachments in formData.AttachmentDocDetailsEDMS)
                        {
                            if ("UploadFile_" + attachments.DoumentNameId.ToString() == FileDataName)
                            {

                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                                uploadFile = Path.Combine("/candidatedocument", fileName);
                                uploadFile = uploadFile.Replace("\\", "/");

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

                        formData.AttachmentDocDetailsEDMS[i].DocumentPath = uploadFile;
                    }
                }
                formData.EmployeeId = Convert.ToInt32(data["EmpId"]);
                formData.EmployeeDocumentCollectionId = Convert.ToInt32(data["EmployeeDocumentCollectionId"]);
                formData.Remarks = data["Remarks"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.documentcollectionService.UploadEmployeeDocumentFromEDMS(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //[HttpPost]
        //[Route("updatedocumentcollection")]
        //public async Task<IActionResult> UpdateDocumentCollection(IFormCollection data)
        //{
        //    try
        //    {

        //        DocumentCollectionFormData formData = new DocumentCollectionFormData();
        //        formData.OfferDocumentCollectionId = Convert.ToInt32(data["OfferDocumentCollectionId"]);
        //        string AttachmentData = data["AttachmentDetails"];
        //        formData.AttachmentDetails = JsonConvert.DeserializeObject<List<AttachmentData>>(AttachmentData);
        //        //for (var i = 0; i < formData.AttachmentDetails.Count; i++)
        //        //{
        //        string fileName = "";

        //        for (var j = 0; j < Request.Form.Files.Count; j++)
        //        {
        //            var fileOrg = Request.Form.Files[j];
        //            //FileNamechack = ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"');
        //            //var file1 = formData1.AttachmentDetails[i].Document;
        //            //if (ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"').Contains(formData1.AttachmentDetails[i].Document))
        //            //{
        //            var timestamp = DateTime.Now.ToFileTime();
        //            string timestampfilename = Convert.ToString(timestamp);
        //            //formData1.CandidateId= Convert.ToInt32(data["CandidateId"])
        //            fileName = data["CandidateId"] + "_" + timestampfilename + "_" + ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"');
        //            string HostUrl = this.environment.ContentRootPath;
        //            string filepath = "UploadedFiles/CadidateDocument/" + Convert.ToInt32(data["CandidateId"]);
        //            string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
        //            if (!Directory.Exists(uploadpath))
        //            {
        //                Directory.CreateDirectory(uploadpath);
        //            }
        //            if (fileOrg.Length > 0)
        //            {

        //                string fullPath = Path.Combine(uploadpath, fileName);
        //                using (var stream = new FileStream(fullPath, FileMode.Create))
        //                {
        //                    fileOrg.CopyTo(stream);
        //                }
        //            }
        //            string FileDataName = Request.Form.Files[j].Name;
        //            if (FileDataName.Contains("UploadFile"))
        //            {
        //                foreach (var attachments in formData.AttachmentDetails)
        //                {
        //                    if ("UploadFile_" + attachments.DoumentNameId.ToString() == FileDataName)
        //                    {
        //                        attachments.DocumentPath = filepath + "/" + fileName;
        //                    }
        //                }
        //                formData.AttachmentDetails[j].DocumentPath = filepath + "/" + fileName;
        //            }
        //            else if (FileDataName.Contains("AdditionalFile"))
        //            {
        //                foreach (var attachments in formData.AttachmentDetails)
        //                {
        //                    if ("AdditionalFile_" + attachments.OfferDocumentCollectionDocumentId.ToString() == FileDataName)
        //                    {
        //                        attachments.DocumentPath = filepath + "/" + fileName;
        //                    }
        //                }
        //            }

        //            //break;
        //            //}
        //        }

        //        //}



        //        //DocumentCollectionFormData formData = new DocumentCollectionFormData();

        //        formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
        //        formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
        //        formData.AttachmentDocumnetNameIdsToDelete = data["AttachmentDocumnetNameIdsToDelete"];
        //        string SalaryData = data["SalaryDetails"];
        //        formData.SalaryDetails = JsonConvert.DeserializeObject<List<SalaryData>>(SalaryData);
        //        string RemaksData = data["RemaksDetails"];
        //        formData.RemaksDetails = JsonConvert.DeserializeObject<List<RemaksData>>(RemaksData);
        //        //formData.Signature = "/" + filepathSignature + "/" + fileNameSignature;
        //        formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


        //        var response = await this.documentcollectionService.UpdateDocumentCollection(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


        //[HttpPost]
        //[Route("getdocumentcollectiondata")]
        //public async Task<IActionResult> GetDocumentCollectionData(SearchDocumentCollection search)
        //{
        //    try
        //    {
        //        List<DocumentCollectionDataRecruiterAll> DocuemntCollectionList = new List<DocumentCollectionDataRecruiterAll>();
        //        DocuemntCollectionList = await this.documentcollectionService.GetDocumentCollectionData(search).ConfigureAwait(false);
        //        List<SalaryData> allSalaryDataList = new List<SalaryData>();
        //        List<AttachmentData> allAttachmentDataList = new List<AttachmentData>();
        //        List<RemaksData> allRemaksDataList = new List<RemaksData>();
        //        var DocuemntCollectionCallList =
        //      from x in DocuemntCollectionList
        //      group x by new
        //      {
        //          x.OfferDocumentCollectionId,
        //          x.RequsitaionDetailsId,
        //          x.CandidateId,
        //          x.CandidateFullName,
        //          x.CandidateEmailId,
        //          x.CandidatePhone,
        //          x.CandidateGender,
        //          x.Age,
        //          x.AadharNo,
        //          x.MotherTongue,
        //          x.LanguageKnown,
        //          x.HighestQualification,
        //          x.Course,
        //          x.Stream,
        //          x.Percentage,
        //          x.YearofCompletion,
        //          x.QualificationType,
        //          x.Totalexperience,
        //          x.CurrentCTC,
        //          x.CurrentEmployer,
        //          x.Designation,
        //          x.Domain,
        //          x.SubDomain,
        //          x.CurrentLocation,
        //          x.AnyPreviousApplicationHistoryinMRF,
        //          x.AnyRelativeWorkingonMRF,
        //          x.Source,
        //          x.CandidateOwner,
        //          x.CandidateResume,
        //          x.MonthlyTotal,
        //          x.YearlyTotal,
        //          x.SalaryOfferDocumentCollectionId,
        //          x.AttachementOfferDocumentCollectionId,
        //          x.RemarksOfferDocumentCollectionId
        //      } into DocuemntCollectionCall
        //      select new DocumentCollectionDataRecruiter()
        //      {
        //          OfferDocumentCollectionId = DocuemntCollectionCall.Key.OfferDocumentCollectionId,
        //          RequsitaionDetailsId = DocuemntCollectionCall.Key.RequsitaionDetailsId,
        //          CandidateId = DocuemntCollectionCall.Key.CandidateId,
        //          CandidateFullName = DocuemntCollectionCall.Key.CandidateFullName,
        //          CandidateEmailId = DocuemntCollectionCall.Key.CandidateEmailId,
        //          CandidatePhone = DocuemntCollectionCall.Key.CandidatePhone,
        //          CandidateGender = DocuemntCollectionCall.Key.CandidateGender,
        //          Age = DocuemntCollectionCall.Key.Age,
        //          AadharNo = DocuemntCollectionCall.Key.AadharNo,
        //          MotherTongue = DocuemntCollectionCall.Key.MotherTongue,
        //          LanguageKnown = DocuemntCollectionCall.Key.LanguageKnown,
        //          HighestQualification = DocuemntCollectionCall.Key.HighestQualification,
        //          Course = DocuemntCollectionCall.Key.Course,
        //          Stream = DocuemntCollectionCall.Key.Stream,
        //          Percentage = DocuemntCollectionCall.Key.Percentage,
        //          YearofCompletion = DocuemntCollectionCall.Key.YearofCompletion,
        //          QualificationType = DocuemntCollectionCall.Key.QualificationType,
        //          Totalexperience = DocuemntCollectionCall.Key.Totalexperience,
        //          CurrentCTC = DocuemntCollectionCall.Key.CurrentCTC,
        //          CurrentEmployer = DocuemntCollectionCall.Key.CurrentEmployer,
        //          Designation = DocuemntCollectionCall.Key.Designation,
        //          Domain = DocuemntCollectionCall.Key.Domain,
        //          SubDomain = DocuemntCollectionCall.Key.SubDomain,
        //          CurrentLocation = DocuemntCollectionCall.Key.CurrentLocation,
        //          AnyPreviousApplicationHistoryinMRF = DocuemntCollectionCall.Key.AnyPreviousApplicationHistoryinMRF,
        //          AnyRelativeWorkingonMRF = DocuemntCollectionCall.Key.AnyRelativeWorkingonMRF,
        //          Source = DocuemntCollectionCall.Key.Source,
        //          CandidateOwner = DocuemntCollectionCall.Key.CandidateOwner,
        //          CandidateResume = DocuemntCollectionCall.Key.CandidateResume,
        //          MonthlyTotal = DocuemntCollectionCall.Key.MonthlyTotal,
        //          YearlyTotal = DocuemntCollectionCall.Key.YearlyTotal,
        //          SalaryDetails = DocuemntCollectionList.Select(m => new SalaryData
        //          {
        //              OfferDocumentCollectionSalaryId = m.OfferDocumentCollectionSalaryId,
        //              OfferDocumentCollectionId = m.OfferDocumentCollectionId,
        //              EmolumntId = m.EmolumntId,
        //              EmolumntName = m.EmolumntName,
        //              Monthly = m.Monthly,
        //              Yerly = m.Yerly,
        //              EmolumntVerifyStatus = m.EmolumntVerifyStatus,
        //              EmolumntVerifyRemarks = m.EmolumntVerifyRemarks
        //          }).Where(x => x.OfferDocumentCollectionId == DocuemntCollectionCall.Key.SalaryOfferDocumentCollectionId).ToList(),
        //          AttachmentDetails = DocuemntCollectionList.Select(n => new AttachmentData
        //          {
        //              OfferDocumentCollectionDocumentId = n.OfferDocumentCollectionDocumentId,
        //              OfferDocumentCollectionId = n.OfferDocumentCollectionId,
        //              DoumentType = n.DoumentType,
        //              DoumentParticular = n.DoumentParticular,
        //              DoumentName = n.DoumentName,
        //              Document = n.Document,
        //              DocumentPath = n.DocumentPath,
        //              ApprovalStatus = n.ApprovalStatus,
        //              ApprovalRemarks = n.ApprovalRemarks,
        //              AdditionalDocument = n.AdditionalDocument,
        //              ModifyStatus = n.ModifyStatus
        //          }).Where(x => x.OfferDocumentCollectionId == DocuemntCollectionCall.Key.AttachementOfferDocumentCollectionId).ToList(),
        //          RemaksDetails = DocuemntCollectionList.Select(p => new RemaksData
        //          {
        //              OfferDocumentCollectionRemarksId = p.OfferDocumentCollectionRemarksId,
        //              OfferDocumentCollectionId = p.OfferDocumentCollectionId,
        //              RemarksType = p.RemarksType,
        //              Reamrks = p.Reamrks,
        //              ReamrksReply = p.ReamrksReply,
        //              CreatedByName = p.CreatedByName
        //          }).Where(x => x.OfferDocumentCollectionId == DocuemntCollectionCall.Key.AttachementOfferDocumentCollectionId).ToList()
        //      };
        //        dynamic response = new ExpandoObject();
        //        //var response = await this.candidateprofileService.GetCandidateProfile(search).ConfigureAwait(false);
        //        response.data = DocuemntCollectionCallList;
        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("getdocumentcollectiondata")]
        public async Task<IActionResult> GetDocumentCollectionData(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet DocumentCollectionGet = new DocumentCollectionGet();
                DocumentCollectionGet = await this.documentcollectionService.GetDocumentCollectionData(search).ConfigureAwait(false);

                DocumentCollectionDataRecruiterGet DocumentCollectionDataRecruiter = new DocumentCollectionDataRecruiterGet();
                if (DocumentCollectionGet.DocumentCollectionData != null)
                {
                    DocumentCollectionDataRecruiter.OfferDocumentCollectionId = DocumentCollectionGet.DocumentCollectionData.OfferDocumentCollectionId;
                    DocumentCollectionDataRecruiter.RequsitaionDetailsId = DocumentCollectionGet.DocumentCollectionData.RequsitaionDetailsId;
                    DocumentCollectionDataRecruiter.CandidateId = DocumentCollectionGet.DocumentCollectionData.CandidateId;
                    DocumentCollectionDataRecruiter.CandidateFullName = DocumentCollectionGet.DocumentCollectionData.CandidateFullName;
                    DocumentCollectionDataRecruiter.CandidateEmailId = DocumentCollectionGet.DocumentCollectionData.CandidateEmailId;
                    DocumentCollectionDataRecruiter.CandidatePhone = DocumentCollectionGet.DocumentCollectionData.CandidatePhone;
                    DocumentCollectionDataRecruiter.CandidateGender = DocumentCollectionGet.DocumentCollectionData.CandidateGender;
                    DocumentCollectionDataRecruiter.Age = DocumentCollectionGet.DocumentCollectionData.Age;
                    DocumentCollectionDataRecruiter.AadharNo = DocumentCollectionGet.DocumentCollectionData.AadharNo;
                    DocumentCollectionDataRecruiter.MotherTongue = DocumentCollectionGet.DocumentCollectionData.MotherTongue;
                    DocumentCollectionDataRecruiter.LanguageKnown = DocumentCollectionGet.DocumentCollectionData.LanguageKnown;
                    DocumentCollectionDataRecruiter.HighestQualification = DocumentCollectionGet.DocumentCollectionData.HighestQualification;
                    DocumentCollectionDataRecruiter.Course = DocumentCollectionGet.DocumentCollectionData.Course;
                    DocumentCollectionDataRecruiter.Stream = DocumentCollectionGet.DocumentCollectionData.Stream;
                    DocumentCollectionDataRecruiter.Percentage = DocumentCollectionGet.DocumentCollectionData.Percentage;
                    DocumentCollectionDataRecruiter.YearofCompletion = DocumentCollectionGet.DocumentCollectionData.YearofCompletion;
                    DocumentCollectionDataRecruiter.QualificationType = DocumentCollectionGet.DocumentCollectionData.QualificationType;
                    DocumentCollectionDataRecruiter.Totalexperience = DocumentCollectionGet.DocumentCollectionData.Totalexperience;
                    DocumentCollectionDataRecruiter.CurrentCTC = DocumentCollectionGet.DocumentCollectionData.CurrentCTC;
                    DocumentCollectionDataRecruiter.CurrentEmployer = DocumentCollectionGet.DocumentCollectionData.CurrentEmployer;
                    DocumentCollectionDataRecruiter.Designation = DocumentCollectionGet.DocumentCollectionData.Designation;
                    DocumentCollectionDataRecruiter.Domain = DocumentCollectionGet.DocumentCollectionData.Domain;
                    DocumentCollectionDataRecruiter.SubDomain = DocumentCollectionGet.DocumentCollectionData.SubDomain;
                    DocumentCollectionDataRecruiter.CurrentLocation = DocumentCollectionGet.DocumentCollectionData.CurrentLocation;
                    DocumentCollectionDataRecruiter.AnyPreviousApplicationHistoryinMRF = DocumentCollectionGet.DocumentCollectionData.AnyPreviousApplicationHistoryinMRF;
                    DocumentCollectionDataRecruiter.AnyRelativeWorkingonMRF = DocumentCollectionGet.DocumentCollectionData.AnyRelativeWorkingonMRF;
                    DocumentCollectionDataRecruiter.Source = DocumentCollectionGet.DocumentCollectionData.Source;
                    DocumentCollectionDataRecruiter.CandidateOwner = DocumentCollectionGet.DocumentCollectionData.CandidateOwner;
                    DocumentCollectionDataRecruiter.CandidateResume = DocumentCollectionGet.DocumentCollectionData.CandidateResume;
                    DocumentCollectionDataRecruiter.MonthlyTotal = DocumentCollectionGet.DocumentCollectionData.MonthlyTotal;
                    DocumentCollectionDataRecruiter.YearlyTotal = DocumentCollectionGet.DocumentCollectionData.YearlyTotal;
                    DocumentCollectionDataRecruiter.IsEnabled = DocumentCollectionGet.DocumentCollectionData.IsEnabled;
                    DocumentCollectionDataRecruiter.CreatedBy = DocumentCollectionGet.DocumentCollectionData.CreatedBy;
                    DocumentCollectionDataRecruiter.SalaryDetails = DocumentCollectionGet.SalaryDetails;
                    DocumentCollectionDataRecruiter.AttachmentDetails = DocumentCollectionGet.AttachmentDataGet;
                    DocumentCollectionDataRecruiter.RemaksDetails = DocumentCollectionGet.RemaksDetails;
                }
                return this.Ok(DocumentCollectionDataRecruiter);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusdocumentcollectiondata")]
        public async Task<IActionResult> GetCampusDocumentCollectionData(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet DocumentCollectionGet = new DocumentCollectionGet();
                DocumentCollectionGet = await this.documentcollectionService.GetCampusDocumentCollectionData(search).ConfigureAwait(false);

                DocumentCollectionDataRecruiterGet DocumentCollectionDataRecruiter = new DocumentCollectionDataRecruiterGet();
                if (DocumentCollectionGet.DocumentCollectionData != null)
                {
                    DocumentCollectionDataRecruiter.OfferDocumentCollectionId = DocumentCollectionGet.DocumentCollectionData.OfferDocumentCollectionId;
                    DocumentCollectionDataRecruiter.RequsitaionDetailsId = DocumentCollectionGet.DocumentCollectionData.RequsitaionDetailsId;
                    DocumentCollectionDataRecruiter.CandidateId = DocumentCollectionGet.DocumentCollectionData.CandidateId;
                    DocumentCollectionDataRecruiter.CandidateFullName = DocumentCollectionGet.DocumentCollectionData.CandidateFullName;
                    DocumentCollectionDataRecruiter.CandidateEmailId = DocumentCollectionGet.DocumentCollectionData.CandidateEmailId;
                    DocumentCollectionDataRecruiter.CandidatePhone = DocumentCollectionGet.DocumentCollectionData.CandidatePhone;
                    DocumentCollectionDataRecruiter.CandidateGender = DocumentCollectionGet.DocumentCollectionData.CandidateGender;
                    DocumentCollectionDataRecruiter.Age = DocumentCollectionGet.DocumentCollectionData.Age;
                    DocumentCollectionDataRecruiter.AadharNo = DocumentCollectionGet.DocumentCollectionData.AadharNo;
                    DocumentCollectionDataRecruiter.MotherTongue = DocumentCollectionGet.DocumentCollectionData.MotherTongue;
                    DocumentCollectionDataRecruiter.LanguageKnown = DocumentCollectionGet.DocumentCollectionData.LanguageKnown;
                    DocumentCollectionDataRecruiter.HighestQualification = DocumentCollectionGet.DocumentCollectionData.HighestQualification;
                    DocumentCollectionDataRecruiter.Course = DocumentCollectionGet.DocumentCollectionData.Course;
                    DocumentCollectionDataRecruiter.Stream = DocumentCollectionGet.DocumentCollectionData.Stream;
                    DocumentCollectionDataRecruiter.Percentage = DocumentCollectionGet.DocumentCollectionData.Percentage;
                    DocumentCollectionDataRecruiter.YearofCompletion = DocumentCollectionGet.DocumentCollectionData.YearofCompletion;
                    DocumentCollectionDataRecruiter.QualificationType = DocumentCollectionGet.DocumentCollectionData.QualificationType;
                    DocumentCollectionDataRecruiter.Totalexperience = DocumentCollectionGet.DocumentCollectionData.Totalexperience;
                    DocumentCollectionDataRecruiter.CurrentCTC = DocumentCollectionGet.DocumentCollectionData.CurrentCTC;
                    DocumentCollectionDataRecruiter.CurrentEmployer = DocumentCollectionGet.DocumentCollectionData.CurrentEmployer;
                    DocumentCollectionDataRecruiter.Designation = DocumentCollectionGet.DocumentCollectionData.Designation;
                    DocumentCollectionDataRecruiter.Domain = DocumentCollectionGet.DocumentCollectionData.Domain;
                    DocumentCollectionDataRecruiter.SubDomain = DocumentCollectionGet.DocumentCollectionData.SubDomain;
                    DocumentCollectionDataRecruiter.CurrentLocation = DocumentCollectionGet.DocumentCollectionData.CurrentLocation;
                    DocumentCollectionDataRecruiter.AnyPreviousApplicationHistoryinMRF = DocumentCollectionGet.DocumentCollectionData.AnyPreviousApplicationHistoryinMRF;
                    DocumentCollectionDataRecruiter.AnyRelativeWorkingonMRF = DocumentCollectionGet.DocumentCollectionData.AnyRelativeWorkingonMRF;
                    DocumentCollectionDataRecruiter.Source = DocumentCollectionGet.DocumentCollectionData.Source;
                    DocumentCollectionDataRecruiter.CandidateOwner = DocumentCollectionGet.DocumentCollectionData.CandidateOwner;
                    DocumentCollectionDataRecruiter.CandidateResume = DocumentCollectionGet.DocumentCollectionData.CandidateResume;
                    DocumentCollectionDataRecruiter.MonthlyTotal = DocumentCollectionGet.DocumentCollectionData.MonthlyTotal;
                    DocumentCollectionDataRecruiter.YearlyTotal = DocumentCollectionGet.DocumentCollectionData.YearlyTotal;
                    DocumentCollectionDataRecruiter.IsEnabled = DocumentCollectionGet.DocumentCollectionData.IsEnabled;
                    DocumentCollectionDataRecruiter.CreatedBy = DocumentCollectionGet.DocumentCollectionData.CreatedBy;
                    DocumentCollectionDataRecruiter.SalaryDetails = DocumentCollectionGet.SalaryDetails;
                    DocumentCollectionDataRecruiter.AttachmentDetails = DocumentCollectionGet.AttachmentDataGet;
                    DocumentCollectionDataRecruiter.RemaksDetails = DocumentCollectionGet.RemaksDetails;
                }
                return this.Ok(DocumentCollectionDataRecruiter);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        // Adde By Anif on 11-11-2022
        [HttpPost]
        [Route("downloadfolder")]
        public async Task<IActionResult> DownloadFolder(DownloadFile_Model search)
        {
            try
            {
                var response = await this.documentcollectionService.DownloadFolder(search).ConfigureAwait(false);



                //  if (response.Count>0)
                //  {
                Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                var cloudStorageAccountname = this.documentcollectionService.CloudStorageAccountname();
                var localFilePath = "";
                foreach (var item in response)
                {
                    if (item.DocumentPath != "")
                    {
                        var pathsplit = item.DocumentPath.Split("/");

                        //var pathsplit = response[1].DocumentPath.Split("/");
                        if (pathsplit[1] != "UploadedFiles")
                        {
                            string filepath = Path.GetFileName(item.DocumentPath.ToString());
                            string fullfilepath = "https://hrportaldocumentstorage.blob.core.windows.net/" + pathsplit[1] + "/" + filepath;

                            BlobClient blobClient = new BlobClient(cloudStorageAccountname, pathsplit[1], filepath);
                            
                            // BlobClient blobClient = new BlobClient(cloudStorageAccountname, "candidateresume", "133089186138371426_generated (19).pdf");
                            if (CloudStorageAccount.TryParse(cloudStorageAccountname, out CloudStorageAccount storageAccount))
                            {
                                CloudBlobClient blobCloudClient = storageAccount.CreateCloudBlobClient();                                
                                CloudBlobContainer container = blobCloudClient.GetContainerReference(pathsplit[1]);
                                CloudBlob file = container.GetBlobReference(filepath);
                                bool s = await container.GetBlockBlobReference(filepath).ExistsAsync();
                                //localFilePath = file.StorageUri.PrimaryUri.AbsoluteUri.ToString();
                                if (s==true)
                                {
                                    using (var stream = new MemoryStream())
                                    {
                                        await blobClient.DownloadToAsync(stream);
                                        stream.Position = 0;
                                        // files.Add(fullfilepath, stream);
                                        files.Add(filepath, stream);
                                    }
                                }
                              

                            }

                        }

                    }

                }

                string fileNameZip = "Document_" + DateTime.Now.ToString("yyyy-MM-dd") + ".zip";

                byte[] compressedBytes;
                using (var outStream = new MemoryStream())
                {
                    using (var archive = new ZipArchive(outStream, ZipArchiveMode.Create, true))
                    {
                        foreach (var file in files)
                        {
                            var fileInArchive = archive.CreateEntry(file.Key, CompressionLevel.Optimal);
                            using (var entryStream = fileInArchive.Open())
                            using (var fileToCompressStream = new MemoryStream(file.Value.ToArray()))
                            {
                                fileToCompressStream.CopyTo(entryStream);
                            }
                        }
                    }
                    compressedBytes = outStream.ToArray();
                }
                return File(compressedBytes, "application/zip", fileNameZip);

                //}
                // return this.Ok(DocumentCollectionDataRecruiter);
                // return null;
                //return File(compressedBytes, "application/zip", fileNameZip);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("getdocumentcollectiondataforadditional")]
        public async Task<IActionResult> GetDocumentCollectionDatAForAdditional(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet DocumentCollectionGet = new DocumentCollectionGet();
                DocumentCollectionGet = await this.documentcollectionService.GetDocumentCollectionDatAForAdditional(search).ConfigureAwait(false);

                DocumentCollectionDataRecruiterGet DocumentCollectionDataRecruiter = new DocumentCollectionDataRecruiterGet();
                if (DocumentCollectionGet.DocumentCollectionData != null)
                {
                    DocumentCollectionDataRecruiter.OfferDocumentCollectionId = DocumentCollectionGet.DocumentCollectionData.OfferDocumentCollectionId;
                    DocumentCollectionDataRecruiter.RequsitaionDetailsId = DocumentCollectionGet.DocumentCollectionData.RequsitaionDetailsId;
                    DocumentCollectionDataRecruiter.CandidateId = DocumentCollectionGet.DocumentCollectionData.CandidateId;
                    DocumentCollectionDataRecruiter.CandidateFullName = DocumentCollectionGet.DocumentCollectionData.CandidateFullName;
                    DocumentCollectionDataRecruiter.CandidateEmailId = DocumentCollectionGet.DocumentCollectionData.CandidateEmailId;
                    DocumentCollectionDataRecruiter.CandidatePhone = DocumentCollectionGet.DocumentCollectionData.CandidatePhone;
                    DocumentCollectionDataRecruiter.CandidateGender = DocumentCollectionGet.DocumentCollectionData.CandidateGender;
                    DocumentCollectionDataRecruiter.Age = DocumentCollectionGet.DocumentCollectionData.Age;
                    DocumentCollectionDataRecruiter.AadharNo = DocumentCollectionGet.DocumentCollectionData.AadharNo;
                    DocumentCollectionDataRecruiter.MotherTongue = DocumentCollectionGet.DocumentCollectionData.MotherTongue;
                    DocumentCollectionDataRecruiter.LanguageKnown = DocumentCollectionGet.DocumentCollectionData.LanguageKnown;
                    DocumentCollectionDataRecruiter.HighestQualification = DocumentCollectionGet.DocumentCollectionData.HighestQualification;
                    DocumentCollectionDataRecruiter.Course = DocumentCollectionGet.DocumentCollectionData.Course;
                    DocumentCollectionDataRecruiter.Stream = DocumentCollectionGet.DocumentCollectionData.Stream;
                    DocumentCollectionDataRecruiter.Percentage = DocumentCollectionGet.DocumentCollectionData.Percentage;
                    DocumentCollectionDataRecruiter.YearofCompletion = DocumentCollectionGet.DocumentCollectionData.YearofCompletion;
                    DocumentCollectionDataRecruiter.QualificationType = DocumentCollectionGet.DocumentCollectionData.QualificationType;
                    DocumentCollectionDataRecruiter.Totalexperience = DocumentCollectionGet.DocumentCollectionData.Totalexperience;
                    DocumentCollectionDataRecruiter.CurrentCTC = DocumentCollectionGet.DocumentCollectionData.CurrentCTC;
                    DocumentCollectionDataRecruiter.CurrentEmployer = DocumentCollectionGet.DocumentCollectionData.CurrentEmployer;
                    DocumentCollectionDataRecruiter.Designation = DocumentCollectionGet.DocumentCollectionData.Designation;
                    DocumentCollectionDataRecruiter.Domain = DocumentCollectionGet.DocumentCollectionData.Domain;
                    DocumentCollectionDataRecruiter.SubDomain = DocumentCollectionGet.DocumentCollectionData.SubDomain;
                    DocumentCollectionDataRecruiter.CurrentLocation = DocumentCollectionGet.DocumentCollectionData.CurrentLocation;
                    DocumentCollectionDataRecruiter.AnyPreviousApplicationHistoryinMRF = DocumentCollectionGet.DocumentCollectionData.AnyPreviousApplicationHistoryinMRF;
                    DocumentCollectionDataRecruiter.AnyRelativeWorkingonMRF = DocumentCollectionGet.DocumentCollectionData.AnyRelativeWorkingonMRF;
                    DocumentCollectionDataRecruiter.Source = DocumentCollectionGet.DocumentCollectionData.Source;
                    DocumentCollectionDataRecruiter.CandidateOwner = DocumentCollectionGet.DocumentCollectionData.CandidateOwner;
                    DocumentCollectionDataRecruiter.CandidateResume = DocumentCollectionGet.DocumentCollectionData.CandidateResume;
                    DocumentCollectionDataRecruiter.MonthlyTotal = DocumentCollectionGet.DocumentCollectionData.MonthlyTotal;
                    DocumentCollectionDataRecruiter.YearlyTotal = DocumentCollectionGet.DocumentCollectionData.YearlyTotal;
                    DocumentCollectionDataRecruiter.IsEnabled = DocumentCollectionGet.DocumentCollectionData.IsEnabled;
                    DocumentCollectionDataRecruiter.CreatedBy = DocumentCollectionGet.DocumentCollectionData.CreatedBy;
                    DocumentCollectionDataRecruiter.SalaryDetails = DocumentCollectionGet.SalaryDetails;
                    DocumentCollectionDataRecruiter.AttachmentDetails = DocumentCollectionGet.AttachmentDataGet;
                    DocumentCollectionDataRecruiter.RemaksDetails = DocumentCollectionGet.RemaksDetails;
                }
                return this.Ok(DocumentCollectionDataRecruiter);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusdocumentcollectiondataforadditional")]
        public async Task<IActionResult> GetCampusDocumentCollectionDatAForAdditional(SearchDocumentCollection search)
        {
            try
            {
                DocumentCollectionGet DocumentCollectionGet = new DocumentCollectionGet();
                DocumentCollectionGet = await this.documentcollectionService.GetCampusDocumentCollectionDatAForAdditional(search).ConfigureAwait(false);

                DocumentCollectionDataRecruiterGet DocumentCollectionDataRecruiter = new DocumentCollectionDataRecruiterGet();
                if (DocumentCollectionGet.DocumentCollectionData != null)
                {
                    DocumentCollectionDataRecruiter.OfferDocumentCollectionId = DocumentCollectionGet.DocumentCollectionData.OfferDocumentCollectionId;
                    DocumentCollectionDataRecruiter.RequsitaionDetailsId = DocumentCollectionGet.DocumentCollectionData.RequsitaionDetailsId;
                    DocumentCollectionDataRecruiter.CandidateId = DocumentCollectionGet.DocumentCollectionData.CandidateId;
                    DocumentCollectionDataRecruiter.CandidateFullName = DocumentCollectionGet.DocumentCollectionData.CandidateFullName;
                    DocumentCollectionDataRecruiter.CandidateEmailId = DocumentCollectionGet.DocumentCollectionData.CandidateEmailId;
                    DocumentCollectionDataRecruiter.CandidatePhone = DocumentCollectionGet.DocumentCollectionData.CandidatePhone;
                    DocumentCollectionDataRecruiter.CandidateGender = DocumentCollectionGet.DocumentCollectionData.CandidateGender;
                    DocumentCollectionDataRecruiter.Age = DocumentCollectionGet.DocumentCollectionData.Age;
                    DocumentCollectionDataRecruiter.AadharNo = DocumentCollectionGet.DocumentCollectionData.AadharNo;
                    DocumentCollectionDataRecruiter.MotherTongue = DocumentCollectionGet.DocumentCollectionData.MotherTongue;
                    DocumentCollectionDataRecruiter.LanguageKnown = DocumentCollectionGet.DocumentCollectionData.LanguageKnown;
                    DocumentCollectionDataRecruiter.HighestQualification = DocumentCollectionGet.DocumentCollectionData.HighestQualification;
                    DocumentCollectionDataRecruiter.Course = DocumentCollectionGet.DocumentCollectionData.Course;
                    DocumentCollectionDataRecruiter.Stream = DocumentCollectionGet.DocumentCollectionData.Stream;
                    DocumentCollectionDataRecruiter.Percentage = DocumentCollectionGet.DocumentCollectionData.Percentage;
                    DocumentCollectionDataRecruiter.YearofCompletion = DocumentCollectionGet.DocumentCollectionData.YearofCompletion;
                    DocumentCollectionDataRecruiter.QualificationType = DocumentCollectionGet.DocumentCollectionData.QualificationType;
                    DocumentCollectionDataRecruiter.Totalexperience = DocumentCollectionGet.DocumentCollectionData.Totalexperience;
                    DocumentCollectionDataRecruiter.CurrentCTC = DocumentCollectionGet.DocumentCollectionData.CurrentCTC;
                    DocumentCollectionDataRecruiter.CurrentEmployer = DocumentCollectionGet.DocumentCollectionData.CurrentEmployer;
                    DocumentCollectionDataRecruiter.Designation = DocumentCollectionGet.DocumentCollectionData.Designation;
                    DocumentCollectionDataRecruiter.Domain = DocumentCollectionGet.DocumentCollectionData.Domain;
                    DocumentCollectionDataRecruiter.SubDomain = DocumentCollectionGet.DocumentCollectionData.SubDomain;
                    DocumentCollectionDataRecruiter.CurrentLocation = DocumentCollectionGet.DocumentCollectionData.CurrentLocation;
                    DocumentCollectionDataRecruiter.AnyPreviousApplicationHistoryinMRF = DocumentCollectionGet.DocumentCollectionData.AnyPreviousApplicationHistoryinMRF;
                    DocumentCollectionDataRecruiter.AnyRelativeWorkingonMRF = DocumentCollectionGet.DocumentCollectionData.AnyRelativeWorkingonMRF;
                    DocumentCollectionDataRecruiter.Source = DocumentCollectionGet.DocumentCollectionData.Source;
                    DocumentCollectionDataRecruiter.CandidateOwner = DocumentCollectionGet.DocumentCollectionData.CandidateOwner;
                    DocumentCollectionDataRecruiter.CandidateResume = DocumentCollectionGet.DocumentCollectionData.CandidateResume;
                    DocumentCollectionDataRecruiter.MonthlyTotal = DocumentCollectionGet.DocumentCollectionData.MonthlyTotal;
                    DocumentCollectionDataRecruiter.YearlyTotal = DocumentCollectionGet.DocumentCollectionData.YearlyTotal;
                    DocumentCollectionDataRecruiter.IsEnabled = DocumentCollectionGet.DocumentCollectionData.IsEnabled;
                    DocumentCollectionDataRecruiter.CreatedBy = DocumentCollectionGet.DocumentCollectionData.CreatedBy;
                    DocumentCollectionDataRecruiter.SalaryDetails = DocumentCollectionGet.SalaryDetails;
                    DocumentCollectionDataRecruiter.AttachmentDetails = DocumentCollectionGet.AttachmentDataGet;
                    DocumentCollectionDataRecruiter.RemaksDetails = DocumentCollectionGet.RemaksDetails;
                }
                return this.Ok(DocumentCollectionDataRecruiter);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("approvedocumentcollection")]
        public async Task<IActionResult> ApproveDocumentCollection(IFormCollection data)
        {
            try
            {

                DocumentCollectionApprovalFormData formData = new DocumentCollectionApprovalFormData();

                formData.OfferDocumentCollectionId = Convert.ToInt32(data["OfferDocumentCollectionId"]);
                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.EmailId = data["EmailId"];
                formData.IsProcedForJoining = Convert.ToInt32(data["IsProcedForJoining"]);
                formData.CandidateNo = data["CandidateNo"];
                formData.CandidateName = data["CandidateName"];
                formData.Password = data["Password"];
                string SalaryData = data["SalaryDetails"];
                formData.SalaryDetails = JsonConvert.DeserializeObject<List<SalaryApprovalData>>(SalaryData);
                string RemaksData = data["RemaksDetails"];
                formData.RemaksDetails = JsonConvert.DeserializeObject<List<RemaksData>>(RemaksData);
                string AttachmentData = data["AttachmentDetails"];
                formData.AttachmentDetails = JsonConvert.DeserializeObject<List<AttachmentApprovalData>>(AttachmentData);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                if (data["IsEnabledForMed"].ToString().Length > 0)
                {
                    formData.IsEnabledForMed = Convert.ToBoolean(data["IsEnabledForMed"]);
                }
                if(data["IsEnabledForMed"].ToString().Length == 0)
                {
                    formData.IsEnabledForMed = false;
                }
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.documentcollectionService.ApproveDocumentCollection(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("approvecampusdocumentcollection")]
        public async Task<IActionResult> ApproveCampusDocumentCollection(IFormCollection data)
        {
            try
            {

                DocumentCollectionApprovalFormData formData = new DocumentCollectionApprovalFormData();

                formData.OfferDocumentCollectionId = Convert.ToInt32(data["OfferDocumentCollectionId"]);
                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.EmailId = data["EmailId"];
                formData.IsProcedForJoining = Convert.ToInt32(data["IsProcedForJoining"]);
                formData.CandidateNo = data["CandidateNo"];
                formData.CandidateName = data["CandidateName"];
                formData.Password = data["Password"];
                string SalaryData = data["SalaryDetails"];
                formData.SalaryDetails = JsonConvert.DeserializeObject<List<SalaryApprovalData>>(SalaryData);
                string RemaksData = data["RemaksDetails"];
                formData.RemaksDetails = JsonConvert.DeserializeObject<List<RemaksData>>(RemaksData);
                string AttachmentData = data["AttachmentDetails"];
                formData.AttachmentDetails = JsonConvert.DeserializeObject<List<AttachmentApprovalData>>(AttachmentData);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);
                if (data["IsEnabledForMed"].ToString().Length > 0)
                {
                    formData.IsEnabledForMed = Convert.ToBoolean(data["IsEnabledForMed"]);
                }
                if (data["IsEnabledForMed"].ToString().Length == 0)
                {
                    formData.IsEnabledForMed = false;
                }
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.documentcollectionService.ApproveCampusDocumentCollection(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }


}

