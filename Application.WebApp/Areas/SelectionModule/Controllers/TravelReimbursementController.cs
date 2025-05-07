using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.SelectionModule.Controllers
{
    [Route("api/travelreimbursement")]
    [ApiController]
    public class TravelReimbursementController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ITravelReimbursementService travelReimbursementService;
        public TravelReimbursementController(ITravelReimbursementService travelReimbursementService, IWebHostEnvironment environment)
        {
            this.travelReimbursementService = travelReimbursementService;
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
            var cloudStorageAccountname = this.travelReimbursementService.CloudStorageAccountname();

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


        [HttpPost]
        [Route("getcandidatetravelreimbursementlist")]
        public async Task<IActionResult> GetCandidateTravelReimbursementList(SearchCandidateTravelReimbursement search)
        {
            try
            {
                var response = await this.travelReimbursementService.GetCandidateTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getCampuscandidateinterviewtravelreimbursementlist")]
        public async Task<IActionResult> GetCampusCandidateInterviewTravelReimbursementList(SearchCandidateTravelReimbursement search)
        {
            try
            {
                var response = await this.travelReimbursementService.GetCampusCandidateInterviewTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //[HttpPost]
        //[Route("addtravelreimbursement")]
        //public async Task<IActionResult> AddTravelReimbursement(IFormCollection data)
        //{
        //    try
        //    {
        //        int rows = 0;
        //        TravelReimbursementFormData formData = new TravelReimbursementFormData();
        //        string BankStatementDocument = "";
        //        string AttachmentValues = data["AttachmentData"];
        //        formData.AttachmentData = JsonConvert.DeserializeObject<List<TravelAttachmentData>>(AttachmentValues);
        //        int RowCount = formData.AttachmentData.Count;
        //        String[] documents = new String[RowCount];
        //        string FileDataName = "";
        //        for (var i = 0; i < Request.Form.Files.Count; i++)
        //        {
        //            string fileName = "";
        //            string filepath = "";
        //            var file = Request.Form.Files[i];
        //            string HostUrl = this.environment.ContentRootPath;
        //            FileDataName = Request.Form.Files[i].Name;
        //            if (FileDataName.Contains("AttachmentFiles_"))
        //            {
        //                filepath = "UploadedFiles/TravelReimbursement/JourneyAttachment";
        //            }
        //            else
        //            {
        //                filepath = "UploadedFiles/TravelReimbursement/BankStatementAttachment";
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
        //                string fullPath = Path.Combine(uploadpath, fileName);
        //                using (var stream = new FileStream(fullPath, FileMode.Create))
        //                {
        //                    file.CopyTo(stream);
        //                }
        //            }
        //            if (FileDataName.Contains("AttachmentFiles_"))
        //            {
        //                int rowNumber = Convert.ToInt32(FileDataName.Replace("AttachmentFiles_", "").ToString());
        //                formData.AttachmentData[rowNumber].AttachmentLink = "/" + filepath + "/" + fileName;
        //            }
        //            else
        //            {
        //                BankStatementDocument = "/" + filepath + "/" + fileName;
        //            }
        //            rows++;
        //        }
        //        formData.TravelReimbursementId = Convert.ToInt32(data["TravelReimbursementId"]);
        //        formData.InterviewDetailId = Convert.ToInt32(data["InterviewDetailId"]);
        //        formData.CommunicationAddress = data["CommunicationAddress"];
        //        formData.PinCode = data["PinCode"];
        //        formData.BankAccountName = data["BankAccountName"];
        //        formData.BankAccountNumber = data["BankAccountNumber"];
        //        formData.BankName = data["BankName"];
        //        formData.IFSC = data["IFSC"];
        //        formData.BankBranch = data["BankBranch"];
        //        formData.BankStatementId = Convert.ToInt32(data["BankStatementId"]);
        //        formData.BankStatementDocument = BankStatementDocument;
        //        formData.PreviousAttachmentIds = data["PreviousAttachmentIds"];
        //        formData.PreviousJourneyIds = data["PreviousJourneyIds"];
        //        string JourneyValues = data["JourneyData"];
        //        formData.JourneyData = JsonConvert.DeserializeObject<List<TravelJourneyData>>(JourneyValues);
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
        //        var response = await this.travelReimbursementService.TravelReimbursementInsertUpdate(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


        [HttpPost]
        [Route("addtravelreimbursement")]
        public async Task<IActionResult> AddTravelReimbursement(IFormCollection data)
        {
            try
            {
                int rows = 0;
                var httpRequest = HttpContext.Request;
                ContainerReference = "travelreimbursement";
                string BankStatementDocument = "";
                string fileAttachment = "";
                string FileDataName = "";
                string DocumentPathForPDF = "";
                //string FName = "";

                TravelReimbursementFormData formData = new TravelReimbursementFormData();
                string AttachmentValues = data["AttachmentData"];
                formData.AttachmentData = JsonConvert.DeserializeObject<List<TravelAttachmentData>>(AttachmentValues);
                formData.InterviewDetailId = Convert.ToInt32(data["InterviewDetailId"]);

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;

                    if (FileDataName.Contains("AttachmentFiles_"))
                    {
                        ContainerReference = "travelreimbursement";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileAttachment = Path.Combine("/travelreimbursement", fileName);
                        fileAttachment = fileAttachment.Replace("\\", "/");

                        if (FileDataName.Contains("AttachmentFiles_"))
                        {
                            int rowNumber = Convert.ToInt32(FileDataName.Replace("AttachmentFiles_", "").ToString());
                            formData.AttachmentData[rowNumber].AttachmentLink = fileAttachment;

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
                            BankStatementDocument = fileAttachment;

                            if (file.Length > 0)
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    await Request.Form.Files[i].CopyToAsync(memoryStream);
                                    await UploadToAzureAsync(Request.Form.Files[i]);
                                }
                            }
                        }
                        rows++;
                    }
                    else if (FileDataName.Contains("theFile"))
                    {
                        ContainerReference = "candidatedocument";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename +"_" + formData.InterviewDetailId.ToString() + "_" + "travelreimbursement.pdf";
                        DocumentPathForPDF = "/candidatedocument" + "/" + fileName;
                        DocumentPathForPDF = DocumentPathForPDF.Replace("\\", "/");
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
                        ContainerReference = "travelreimbursement";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        BankStatementDocument = Path.Combine("/travelreimbursement", fileName);
                        BankStatementDocument = BankStatementDocument.Replace("\\", "/");

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

                formData.TravelReimbursementId = Convert.ToInt32(data["TravelReimbursementId"]);
                
                formData.CommunicationAddress = data["CommunicationAddress"];
                formData.PinCode = data["PinCode"];
                formData.BankAccountName = data["BankAccountName"];
                formData.BankAccountNumber = data["BankAccountNumber"];
                formData.BankName = data["BankName"];
                formData.IFSC = data["IFSC"];
                formData.BankBranch = data["BankBranch"];
                formData.BankStatementId = Convert.ToInt32(data["BankStatementId"]);
                formData.BankStatementDocument = BankStatementDocument;
                formData.DocumentPathForPDF = DocumentPathForPDF;
                formData.PreviousAttachmentIds = data["PreviousAttachmentIds"];
                formData.PreviousJourneyIds = data["PreviousJourneyIds"];
                string JourneyValues = data["JourneyData"];
                formData.JourneyData = JsonConvert.DeserializeObject<List<TravelJourneyData>>(JourneyValues);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.travelReimbursementService.TravelReimbursementInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campusaddtravelreimbursement")]
        public async Task<IActionResult> CampusAddTravelReimbursement(IFormCollection data)
        {
            try
            {
                int rows = 0;
                var httpRequest = HttpContext.Request;
                ContainerReference = "travelreimbursement";
                string BankStatementDocument = "";
                string fileAttachment = "";
                string FileDataName = "";
                //string FName = "";

                TravelReimbursementFormData formData = new TravelReimbursementFormData();
                string AttachmentValues = data["AttachmentData"];
                formData.AttachmentData = JsonConvert.DeserializeObject<List<TravelAttachmentData>>(AttachmentValues);

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;

                    if (FileDataName.Contains("AttachmentFiles_"))
                    {
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileAttachment = Path.Combine("/travelreimbursement", fileName);
                        fileAttachment = fileAttachment.Replace("\\", "/");

                        if (FileDataName.Contains("AttachmentFiles_"))
                        {
                            int rowNumber = Convert.ToInt32(FileDataName.Replace("AttachmentFiles_", "").ToString());
                            formData.AttachmentData[rowNumber].AttachmentLink = fileAttachment;

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
                            BankStatementDocument = fileAttachment;

                            if (file.Length > 0)
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    await Request.Form.Files[i].CopyToAsync(memoryStream);
                                    await UploadToAzureAsync(Request.Form.Files[i]);
                                }
                            }
                        }
                        rows++;
                    }
                    else
                    {
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        BankStatementDocument = Path.Combine("/travelreimbursement", fileName);
                        BankStatementDocument = BankStatementDocument.Replace("\\", "/");

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

                formData.TravelReimbursementId = Convert.ToInt32(data["TravelReimbursementId"]);
                formData.InterviewDetailId = Convert.ToInt32(data["InterviewDetailId"]);
                formData.CommunicationAddress = data["CommunicationAddress"];
                formData.PinCode = data["PinCode"];
                formData.BankAccountName = data["BankAccountName"];
                formData.BankAccountNumber = data["BankAccountNumber"];
                formData.BankName = data["BankName"];
                formData.IFSC = data["IFSC"];
                formData.BankBranch = data["BankBranch"];
                formData.BankStatementId = Convert.ToInt32(data["BankStatementId"]);
                formData.BankStatementDocument = BankStatementDocument;
                formData.PreviousAttachmentIds = data["PreviousAttachmentIds"];
                formData.PreviousJourneyIds = data["PreviousJourneyIds"];
                string JourneyValues = data["JourneyData"];
                formData.JourneyData = JsonConvert.DeserializeObject<List<TravelJourneyData>>(JourneyValues);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.travelReimbursementService.CampusTravelReimbursementInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("gettravelreimbursement")]
        public async Task<IActionResult> GetCandidateTravelReimbursementData(SearchTravelReimbursement search)
        {
            try
            {
                TravelReimbursement travelReimbursement = new TravelReimbursement();
                travelReimbursement = await this.travelReimbursementService.GetCandidateTravelReimbursementData(search).ConfigureAwait(false);

                TravelReimbursementDetailData travelReimbursementDetail = new TravelReimbursementDetailData();
                if (travelReimbursement.TravelReimbursementData != null)
                {
                    travelReimbursementDetail.TravelReimbursementId = travelReimbursement.TravelReimbursementData.TravelReimbursementId;
                    travelReimbursementDetail.InterviewDetailId = travelReimbursement.TravelReimbursementData.InterviewDetailId;
                    travelReimbursementDetail.FullName = travelReimbursement.TravelReimbursementData.FullName;
                    travelReimbursementDetail.EmailId = travelReimbursement.TravelReimbursementData.EmailId;
                    travelReimbursementDetail.ContactNo = travelReimbursement.TravelReimbursementData.ContactNo;
                    travelReimbursementDetail.CommunicationAddress = travelReimbursement.TravelReimbursementData.CommunicationAddress;
                    travelReimbursementDetail.PinCode = travelReimbursement.TravelReimbursementData.PinCode;
                    travelReimbursementDetail.InterviewName = travelReimbursement.TravelReimbursementData.InterviewName;
                    travelReimbursementDetail.StateId = travelReimbursement.TravelReimbursementData.StateId;
                    travelReimbursementDetail.StateName = travelReimbursement.TravelReimbursementData.StateName;
                    travelReimbursementDetail.InterviewDate = travelReimbursement.TravelReimbursementData.InterviewDate;
                    travelReimbursementDetail.VenueName = travelReimbursement.TravelReimbursementData.VenueName;
                    travelReimbursementDetail.PositionName = travelReimbursement.TravelReimbursementData.PositionName;
                    travelReimbursementDetail.FunctionName = travelReimbursement.TravelReimbursementData.FunctionName;
                    travelReimbursementDetail.BankAccountName = travelReimbursement.TravelReimbursementData.BankAccountName;
                    travelReimbursementDetail.BankAccountNumber = travelReimbursement.TravelReimbursementData.BankAccountNumber;
                    travelReimbursementDetail.BankName = travelReimbursement.TravelReimbursementData.BankName;
                    travelReimbursementDetail.IFSC = travelReimbursement.TravelReimbursementData.IFSC;
                    travelReimbursementDetail.BankBranch = travelReimbursement.TravelReimbursementData.BankBranch;
                    travelReimbursementDetail.BankStatementId = travelReimbursement.TravelReimbursementData.BankStatementId;
                    travelReimbursementDetail.BankStatementName = travelReimbursement.TravelReimbursementData.BankStatementName;
                    travelReimbursementDetail.BankStatementDocument = travelReimbursement.TravelReimbursementData.BankStatementDocument;
                    travelReimbursementDetail.DocumentPathForPDF = travelReimbursement.TravelReimbursementData.DocumentPathForPDF;
                    travelReimbursementDetail.ClaimStatusId = travelReimbursement.TravelReimbursementData.ClaimStatusId;
                    travelReimbursementDetail.TravelReimbursementJourneyListData = travelReimbursement.TravelReimbursementJourneyListData;
                    travelReimbursementDetail.TravelReimbursementAttachmentListData = travelReimbursement.TravelReimbursementAttachmentListData;
                    travelReimbursementDetail.ProfileSignature = travelReimbursement.TravelReimbursementData.ProfileSignature; //by kuntal
                }
                return this.Ok(travelReimbursementDetail);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusinterviewtravelreimbursement")]
        public async Task<IActionResult> GetCampusCandidateInterviewTravelReimbursementData(SearchTravelReimbursement search)
        {
            try
            {
                CampusTravelReimbursement travelReimbursement = new CampusTravelReimbursement();
                travelReimbursement = await this.travelReimbursementService.GetCampusCandidateInterviewTravelReimbursementData(search).ConfigureAwait(false);

                CampusInterviewTravelReimbursementDetailData travelReimbursementDetail = new CampusInterviewTravelReimbursementDetailData();
                travelReimbursementDetail.TravelReimbursementId = travelReimbursement.TravelReimbursementData.TravelReimbursementId;
                travelReimbursementDetail.InterviewDetailId = travelReimbursement.TravelReimbursementData.InterviewDetailId;
                travelReimbursementDetail.FullName = travelReimbursement.TravelReimbursementData.FullName;
                travelReimbursementDetail.EmailId = travelReimbursement.TravelReimbursementData.EmailId;
                travelReimbursementDetail.PhoneNo = travelReimbursement.TravelReimbursementData.PhoneNo;
                travelReimbursementDetail.CommunicationAddress = travelReimbursement.TravelReimbursementData.CommunicationAddress;
                travelReimbursementDetail.PinCode = travelReimbursement.TravelReimbursementData.PinCode;
                travelReimbursementDetail.InterviewName = travelReimbursement.TravelReimbursementData.InterviewName;
                travelReimbursementDetail.StateId = travelReimbursement.TravelReimbursementData.StateId;
                travelReimbursementDetail.StateName = travelReimbursement.TravelReimbursementData.StateName;
                travelReimbursementDetail.InterviewDate = travelReimbursement.TravelReimbursementData.InterviewDate;
                travelReimbursementDetail.VenueName = travelReimbursement.TravelReimbursementData.VenueName;
                travelReimbursementDetail.FunctionName = travelReimbursement.TravelReimbursementData.FunctionName;
                travelReimbursementDetail.BankAccountName = travelReimbursement.TravelReimbursementData.BankAccountName;
                travelReimbursementDetail.BankAccountNumber = travelReimbursement.TravelReimbursementData.BankAccountNumber;
                travelReimbursementDetail.BankName = travelReimbursement.TravelReimbursementData.BankName;
                travelReimbursementDetail.IFSC = travelReimbursement.TravelReimbursementData.IFSC;
                travelReimbursementDetail.BankBranch = travelReimbursement.TravelReimbursementData.BankBranch;
                travelReimbursementDetail.BankStatementId = travelReimbursement.TravelReimbursementData.BankStatementId;
                travelReimbursementDetail.BankStatementName = travelReimbursement.TravelReimbursementData.BankStatementName;
                travelReimbursementDetail.BankStatementDocument = travelReimbursement.TravelReimbursementData.BankStatementDocument;
                travelReimbursementDetail.ClaimStatusId = travelReimbursement.TravelReimbursementData.ClaimStatusId;
                travelReimbursementDetail.TravelReimbursementJourneyListData = travelReimbursement.TravelReimbursementJourneyListData;
                travelReimbursementDetail.TravelReimbursementAttachmentListData = travelReimbursement.TravelReimbursementAttachmentListData;
                travelReimbursementDetail.ProfileSignature = travelReimbursement.TravelReimbursementData.ProfileSignature; //by kuntal
                return this.Ok(travelReimbursementDetail);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getrmtravelreimbursementlist")]
        public async Task<IActionResult> GetRMTravelReimbursementList(SearchRMTravelReimbursementList search)
        {
            try
            {
                var response = await this.travelReimbursementService.GetRMTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampustravelreimbursementlist")]
        public async Task<IActionResult> GetCampusTravelReimbursementList(SearchCampusTravelReimbursementList search)
        {
            try
            {
                var response = await this.travelReimbursementService.GetCampusTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatetravelreimbursementstatus")]
        public async Task<IActionResult> UpdateTravelReimbursementStatus(TravelReimbursementActionFormData formdata)
        {
            try
            {
                var response = await this.travelReimbursementService.TravelReimbursementActionInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("assigninterviewtravel")]
        public async Task<IActionResult> AssignTnterviewTravel(AssignTnterviewTravelFormData formdata)
        {
            try
            {
                var response = await this.travelReimbursementService.AssignTnterviewTravel(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("assigntesttravel")]
        public async Task<IActionResult> AssignTestTravel(AssignTestTravelFormData formdata)
        {
            try
            {
                var response = await this.travelReimbursementService.AssignTestTravel(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("gettravelclarificationlist")]
        public async Task<IActionResult> GetTravelClarificationList(SearchTravelClarificationList formdata)
        {
            try
            {
                var response = await this.travelReimbursementService.GetTravelClarificationList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
