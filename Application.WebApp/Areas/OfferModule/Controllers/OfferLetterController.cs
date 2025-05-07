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
//using HiQPdf;

namespace Application.WebApp.Areas.OfferModule.Controllers
{
    [Route("api/ofeerletter")]
    [ApiController]
    public class OfferLetterController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IOfferLetterService offerletterservice;
        public OfferLetterController(IOfferLetterService offerletterservice, IWebHostEnvironment environment)
        {
            this.offerletterservice = offerletterservice;
            this.environment = environment;
        }
        public string ContainerReference = null;
        string fileName = "";
        private async Task UploadToAzureAsync(IFormFile file)
        {

            var cloudStorageAccountname = this.offerletterservice.CloudStorageAccountname();
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
        [Route("insertofferletter")]
        public async Task<IActionResult> InsertOfferLetter(IFormCollection data)
        {
            try
            {
                OfferLetterInsert formData = new OfferLetterInsert();
                formData.OfferLetterId = Convert.ToInt32(data["OfferLetterId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);

                ContainerReference = "candidatedocument";
                var httpRequest = HttpContext.Request;
                string FileDataName = "";
                fileName = "";
                var file = Request.Form.Files[0];
                FileDataName = Request.Form.Files[0].Name;
                var timestamp = DateTime.Now.ToFileTime();
                string timestampfilename = Convert.ToString(timestamp);
                fileName = timestampfilename + "_" + formData.CandidateId.ToString() + "_offerletter.pdf";
                if (file.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await Request.Form.Files[0].CopyToAsync(memoryStream);
                        await UploadToAzureAsync(Request.Form.Files[0]);
                    }

                }
                formData.Documentpath = "/" + ContainerReference + "/" + fileName;

                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.EmailTemplateId = Convert.ToInt32(data["EmailTemplateId"]);
                formData.EmailTemplateDetails = data["EmailTemplateDetails"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                //byte[] pdfBuffer = null;
                //HtmlToPdf htmlToPdfConverter = new HtmlToPdf();
                //htmlToPdfConverter.Document.PageOrientation = PdfPageOrientation.Portrait;
                //htmlToPdfConverter.Document.Margins=new PdfMargins(10,10,10,10);

                //string finalOfferLetter = "<html><head></head><body>"+ formData.EmailTemplateDetails + "</body</html>";

                //pdfBuffer = htmlToPdfConverter.ConvertHtmlToMemory(finalOfferLetter, "");
                ////string path = HostingEnvironment.MapPath("~/Files/GeneratedQAP/");
                ////string filedata = Path.Combine(path + FileName);
                ////System.IO.File.WriteAllBytes(filedata, pdfBuffer);
                //string HostUrl = this.environment.ContentRootPath;
                //string filepath = "UploadedFiles/OfferLetter";
                //string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                //if (!Directory.Exists(uploadpath))
                //{
                //    Directory.CreateDirectory(uploadpath);
                //}
                //string filedata = Path.Combine(uploadpath+"/" + formData.CandidateId.ToString()+".pdf");
                //System.IO.File.WriteAllBytes(filedata, pdfBuffer);

                var response = await this.offerletterservice.InsertOfferLetter(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campusinsertofferletter")]
        public async Task<IActionResult> CampusInsertOfferLetter(IFormCollection data)
        {
            try
            {
                OfferLetterInsert formData = new OfferLetterInsert();
                formData.OfferLetterId = Convert.ToInt32(data["OfferLetterId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                ContainerReference = "candidatedocument";
                var httpRequest = HttpContext.Request;
                string FileDataName = "";
                fileName = "";
                var file = Request.Form.Files[0];
                FileDataName = Request.Form.Files[0].Name;
                var timestamp = DateTime.Now.ToFileTime();
                string timestampfilename = Convert.ToString(timestamp);
                fileName = timestampfilename + "_" + formData.CandidateId.ToString() + "_offerletter.pdf";
                if (file.Length > 0)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await Request.Form.Files[0].CopyToAsync(memoryStream);
                        await UploadToAzureAsync(Request.Form.Files[0]);
                    }

                }
                formData.Documentpath = "/" + ContainerReference + "/" + fileName;
                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.EmailTemplateId = Convert.ToInt32(data["EmailTemplateId"]);
                formData.EmailTemplateDetails = data["EmailTemplateDetails"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.CandidateName = data["CandidateName"];
                formData.CandidateNo = data["CandidateNo"];

                //byte[] pdfBuffer = null;
                //HtmlToPdf htmlToPdfConverter = new HtmlToPdf();
                //htmlToPdfConverter.Document.PageOrientation = PdfPageOrientation.Portrait;
                //htmlToPdfConverter.Document.Margins=new PdfMargins(10,10,10,10);

                //string finalOfferLetter = "<html><head></head><body>"+ formData.EmailTemplateDetails + "</body</html>";

                //pdfBuffer = htmlToPdfConverter.ConvertHtmlToMemory(finalOfferLetter, "");
                ////string path = HostingEnvironment.MapPath("~/Files/GeneratedQAP/");
                ////string filedata = Path.Combine(path + FileName);
                ////System.IO.File.WriteAllBytes(filedata, pdfBuffer);
                //string HostUrl = this.environment.ContentRootPath;
                //string filepath = "UploadedFiles/OfferLetter";
                //string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                //if (!Directory.Exists(uploadpath))
                //{
                //    Directory.CreateDirectory(uploadpath);
                //}
                //string filedata = Path.Combine(uploadpath+"/" + formData.CandidateId.ToString()+".pdf");
                //System.IO.File.WriteAllBytes(filedata, pdfBuffer);

                var response = await this.offerletterservice.CampusInsertOfferLetter(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updateofferletter")]
        public async Task<IActionResult> UpdateOfferLetter(IFormCollection data)
        {
            try
            {
                OfferLetterUpdate formData = new OfferLetterUpdate();
                formData.OfferLetterId = Convert.ToInt32(data["OfferLetterId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.Accepted = Convert.ToInt32(data["Accepted"]);
                formData.Comments = data["Comments"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.offerletterservice.UpdateOfferLetter(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatecampusofferletter")]
        public async Task<IActionResult> UpdateCampusOfferLetter(IFormCollection data)
        {
            try
            {
                OfferLetterUpdate formData = new OfferLetterUpdate();
                formData.OfferLetterId = Convert.ToInt32(data["OfferLetterId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.RequsitaionDetailsId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.Accepted = Convert.ToInt32(data["Accepted"]);
                formData.Comments = data["Comments"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.offerletterservice.UpdateCampusOfferLetter(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getofferletter")]
        public async Task<IActionResult> GetOfferLetter(SearchOfferLetter search)
        {
            try
            {
                OfferLetterData offerLetterData = new OfferLetterData();
                offerLetterData = await this.offerletterservice.GetOfferLetter(search).ConfigureAwait(false);
                OfferLetter offerLetter = new OfferLetter();
                if (offerLetterData.OfferLetterDetails!=null)
                {
                    offerLetter.OfferLetterId = offerLetterData.OfferLetterDetails.OfferLetterId;
                    offerLetter.RequsitaionDetailsId = offerLetterData.OfferLetterDetails.RequsitaionDetailsId;
                    offerLetter.CandidateId = offerLetterData.OfferLetterDetails.CandidateId;
                    offerLetter.Name = offerLetterData.OfferLetterDetails.Name;
                    offerLetter.Position = offerLetterData.OfferLetterDetails.Position;
                    offerLetter.FunctionName = offerLetterData.OfferLetterDetails.FunctionName;
                    offerLetter.Location = offerLetterData.OfferLetterDetails.Location;
                    offerLetter.Grade = offerLetterData.OfferLetterDetails.Grade;
                    offerLetter.ProposedBasic = offerLetterData.OfferLetterDetails.ProposedBasic;
                    offerLetter.ProposedCTC = offerLetterData.OfferLetterDetails.ProposedCTC;
                    offerLetter.TemplateId = offerLetterData.OfferLetterDetails.TemplateId;
                    offerLetter.Accepted = offerLetterData.OfferLetterDetails.Accepted;
                    offerLetter.TemplateDetails = offerLetterData.OfferLetterDetails.TemplateDetails;
                    offerLetter.SalaryTemplateList = offerLetterData.SalaryTemplateList;
                    offerLetter.Remarks = offerLetterData.OfferLetterDetails.Remarks;//.OfferLetterDetails.SalaryTemplateList;
                    offerLetter.AcknowlagementRemarks = offerLetterData.OfferLetterDetails.AcknowlagementRemarks;
                }
                return this.Ok(offerLetter);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusofferletter")]
        public async Task<IActionResult> GetCampusOfferLetter(SearchOfferLetter search)
        {
            try
            {
                OfferLetterData offerLetterData = new OfferLetterData();
                offerLetterData = await this.offerletterservice.GetCampusOfferLetter(search).ConfigureAwait(false);
                OfferLetter offerLetter = new OfferLetter();
                if (offerLetterData.OfferLetterDetails != null)
                {
                    offerLetter.OfferLetterId = offerLetterData.OfferLetterDetails.OfferLetterId;
                    offerLetter.RequsitaionDetailsId = offerLetterData.OfferLetterDetails.RequsitaionDetailsId;
                    offerLetter.CandidateId = offerLetterData.OfferLetterDetails.CandidateId;
                    offerLetter.Name = offerLetterData.OfferLetterDetails.Name;
                    offerLetter.Position = offerLetterData.OfferLetterDetails.Position;
                    offerLetter.FunctionName = offerLetterData.OfferLetterDetails.FunctionName;
                    offerLetter.Location = offerLetterData.OfferLetterDetails.Location;
                    offerLetter.Grade = offerLetterData.OfferLetterDetails.Grade;
                    offerLetter.ProposedBasic = offerLetterData.OfferLetterDetails.ProposedBasic;
                    offerLetter.ProposedCTC = offerLetterData.OfferLetterDetails.ProposedCTC;
                    offerLetter.TemplateId = offerLetterData.OfferLetterDetails.TemplateId;
                    offerLetter.Accepted = offerLetterData.OfferLetterDetails.Accepted;
                    offerLetter.TemplateDetails = offerLetterData.OfferLetterDetails.TemplateDetails;
                    offerLetter.SalaryTemplateList = offerLetterData.SalaryTemplateList;
                    offerLetter.Remarks = offerLetterData.OfferLetterDetails.Remarks;//.OfferLetterDetails.SalaryTemplateList;
                    offerLetter.AcknowlagementRemarks = offerLetterData.OfferLetterDetails.AcknowlagementRemarks;
                }
                return this.Ok(offerLetter);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
