using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.VendorModule;
using Application.Service.Services.Interfaces.VendorModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.VendorModule
{

    [Route("api/vendor")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService vendorService;
        public VendorController(IVendorService vendorService)
        {
            this.vendorService = vendorService;
        }

        public string ContainerReference = null;
        string fileName = "";
        //private readonly IStatusService statusService;
        //private readonly ICommonService commonService;
        private IWebHostEnvironment environment;
        //public VendorController(
        //    IStatusService statusService,
        //    ICommonService commonService,
        //    IWebHostEnvironment environment
        //    )
        //{
        //    this.statusService = statusService;
        //    this.commonService = commonService;
        //    this.environment = environment;
        //}

        // private IWebHostEnvironment environment;
        [HttpPost]
        [Route("getallvendor")]
        public async Task<IActionResult> GetAllVendor(SearchVendor search)
        {
            try
            {
                var response = await this.vendorService.GetAllVendor(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //private async Task UploadToAzureAsync(IFormFile file)
        //{
        //    var cloudStorageAccountname = this.statusService.CloudStorageAccountname();
        //    CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(cloudStorageAccountname.ToString());
        //    var CloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
        //    var cloudBlobContainer = CloudBlobClient.GetContainerReference(ContainerReference);
        //    if (await cloudBlobContainer.CreateIfNotExistsAsync())
        //    {
        //        await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Off });
        //    }
        //    var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(fileName);
        //    cloudBlockBlob.Properties.ContentType = file.ContentType;
        //    await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream());
        //}
        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.vendorService.CloudStorageAccountname();
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
        [Route("invoiceinsertupdateforvendor")]
        public async Task<IActionResult> InvoiceInsertUpdate(IFormCollection Param)
        {
            try
            {
                ContainerReference = "vendorinvoice";
                fileName = "";
                //var file = Request.Form.Files[0];
                //string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";
                string NameFile = "";
                //string Remarks = "";
                //string InvoiceStatus = "";

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    //string HostUrl = this.environment.ContentRootPath;
                    NameFile = Request.Form.Files[i].Name;
                    if (NameFile.Contains("InvoicePath"))
                    {
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        fileDocument = Path.Combine("/vendorinvoice", fileName);
                        fileDocument = fileDocument.Replace("\\", "/");
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

                InsertUpdateForInvoiceParam formData = new InsertUpdateForInvoiceParam();

                formData.VendorInvoiceId = Convert.ToInt32(Param["VendorInvoiceId"]);
                formData.VendorId = Convert.ToInt32(Param["VendorId"]);
                formData.CandidateId = Convert.ToInt32(Param["CandidateId"]);
                formData.CreatedBy = Convert.ToInt32(Param["CreatedBy"]);
                formData.CreatedOn = Param["CreatedOn"];
                formData.ModifiedBy = Convert.ToInt32(Param["ModifiedBy"]);
                formData.ModifiedOn = Param["ModifiedOn"];
                formData.InvoicePath = fileDocument;
                formData.Remarks = Param["Remarks"];
                formData.InvoiceStatus = Convert.ToInt32(Param["InvoiceStatus"]);
                string VendorInvoiceDetails = Param["VendorInvoiceDetails"];

                formData.VendorInvoiceDetails = JsonConvert.DeserializeObject<List<VendorInvoiceDetails>>(VendorInvoiceDetails);
                var response = await this.vendorService.InvoiceInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Arnab
        [HttpPost]
        [Route("creditnoteinsertupdateforvendor")]
        public async Task<IActionResult> CreditNoteInsertUpdate(IFormCollection Param)
        {
            try
            {
                ContainerReference = "vendorcreditnote";
                fileName = "";
                //var file = Request.Form.Files[0];
                //string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";
                string NameFile = "";
                //string Remarks = "";
                //string InvoiceStatus = "";

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    //string HostUrl = this.environment.ContentRootPath;
                    NameFile = Request.Form.Files[i].Name;
                    if (NameFile.Contains("UploadDocument"))
                    {
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        fileDocument = Path.Combine("/vendorcreditnote", fileName);
                        fileDocument = fileDocument.Replace("\\", "/");
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

                InsertUpdarteForCreditNoteInput formData = new InsertUpdarteForCreditNoteInput();

                formData.VendorInvoiceId = Convert.ToInt32(Param["VendorInvoiceId"]);
                formData.VendorCreditNoteId = Convert.ToInt32(Param["VendorCreditNoteId"]);
                formData.CreditNoteStatus = Convert.ToInt32(Param["CreditNoteStatus"]);
                formData.CreatedBy = Convert.ToInt32(Param["CreatedBy"]);
                formData.CreatedOn = Param["CreatedOn"];
                formData.ModifiedBy = Convert.ToInt32(Param["ModifiedBy"]);
                formData.ModifiedOn = Param["ModifiedOn"];
                formData.TotalBillAmount = Convert.ToDecimal(Param["TotalBillAmount"]);
                formData.Remarks = Param["Remarks"];
                formData.CreditBillAmount = Convert.ToDecimal(Param["CreditBillAmount"]);
                formData.UploadDocument = fileDocument;

                var response = await this.vendorService.CreditNoteInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addvendor")]
        public async Task<IActionResult> VendorInsertUpdate(VendorFormData formData)
        {
            try
            {
                var response = await this.vendorService.VendorInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getvendorjoinedcandidate")]
        public async Task<IActionResult> GetAllVendorJoinedCandidate(SearchVendorcandidate search)
        {
            try
            {
                var response = await this.vendorService.GetAllVendorJoinedCandidate(search).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Arnab
        [HttpPost]
        [Route("getallprocessinvoicecandidatelistforrm")]
        public async Task<IActionResult> GetAllProcessInvoiceCandidateListForRM(ProcessInvoiceListForRMInput search)
        {
            try
            {
                var response = await this.vendorService.GetAllProcessInvoiceCandidateListForRM(search).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("getallprocessinvoicecandidatelistforro")]
        public async Task<IActionResult> GetAllProcessInvoiceCandidateListForRO(ProcessInvoiceListForRMInput search)
        {
            try
            {
                var response = await this.vendorService.GetAllProcessInvoiceCandidateListForRO(search).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("getallprocesscreditnotecandidatelistforrm")]
        public async Task<IActionResult> GetAllProcessCreditNoteCandidateListForRM(ProcessCredeitNoteListForRMInput search)
        {
            try
            {
                var response = await this.vendorService.GetAllProcessCreditNoteCandidateListForRM(search).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("getallprocesscreditnotecandidatelistforro")]
        public async Task<IActionResult> GetAllProcessCreditNoteCandidateListForRO(ProcessCredeitNoteListForRMInput search)
        {
            try
            {
                var response = await this.vendorService.GetAllProcessCreditNoteCandidateListForRO(search).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getAllVendorRaiseCreditnote")]
        public async Task<IActionResult> GetAllVendorRaiseCreditnote(SearchVendorcandidate search)
        {
            try
            {
                var response = await this.vendorService.GetAllVendorRaiseCreditnote(search).ConfigureAwait(false);



                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("releaseinvoiceinsertupdate")]
        public async Task<IActionResult> ReleaseInvoiceInsertUpdate(ReleaseInvoiceInsertUpdateParam search)
        {
            try
            {
                var response = await this.vendorService.ReleaseInvoiceInsertUpdate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("vendorCreditNoteClarificationinsertupdate")]
        public async Task<IActionResult> VendorCreditNoteClarificationinsertupdate(CreditNoteClarificationUpdateParam search)
        {
            try
            {
                var response = await this.vendorService.VendorCreditNoteClarificationinsertupdate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}