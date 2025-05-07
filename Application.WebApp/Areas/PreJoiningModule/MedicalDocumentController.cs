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
using Azure.Storage.Blobs;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Application.DataAccess.DataContext;
using System.Text;
using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using Document = iTextSharp.text.Document;
using PageSize = iTextSharp.text.PageSize;


namespace Application.WebApp.Areas.PreJoiningModule
{
    [Route("api/medicaldocument")]
    [ApiController]
    public class MedicalDocumentController : ControllerBase
    {
        //uat
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        //live
        CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");
        public string ContainerReference = null; 
        string fileName = "";

        private IWebHostEnvironment environment;
        private readonly IMedicalDocumentService medicaldocumentservice;
        public MedicalDocumentController(IMedicalDocumentService medicaldocumentservice, IWebHostEnvironment environment)
        {
            this.medicaldocumentservice = medicaldocumentservice;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getmedicaldocumentcollectiondata")]
        public async Task<IActionResult> GetMedicalDocumentCollectionData(SearchMedicalDocumentCollection search)
        {
            try
            {
                MedicalDocumentGet data = new MedicalDocumentGet();
                data = await this.medicaldocumentservice.GetMedicalDocumentCollectionData(search).ConfigureAwait(false);
                MedicalDocumentGetData dataList = new MedicalDocumentGetData();
                if (data.MedicalDocumentCollection != null)
                {
                    dataList.MedicalDocumentCollectionId = data.MedicalDocumentCollection.MedicalDocumentCollectionId;
                    dataList.RequisitionDetailId = data.MedicalDocumentCollection.RequisitionDetailId;
                    dataList.CandidateId = data.MedicalDocumentCollection.CandidateId;
                    dataList.Name = data.MedicalDocumentCollection.Name;
                    dataList.Position = data.MedicalDocumentCollection.Position;
                    dataList.VerticalName = data.MedicalDocumentCollection.VerticalName;
                    dataList.FunctionName = data.MedicalDocumentCollection.FunctionName;
                    dataList.Location = data.MedicalDocumentCollection.Location;
                    dataList.Grade = data.MedicalDocumentCollection.Grade;
                    dataList.DepartmentName = data.MedicalDocumentCollection.DepartmentName;
                    dataList.DoumentType = data.MedicalDocumentCollection.DoumentType;
                    dataList.DoumentTypeName = data.MedicalDocumentCollection.DoumentTypeName;
                    dataList.DoumentParticular = data.MedicalDocumentCollection.DoumentParticular;
                    dataList.DoumentParticularName = data.MedicalDocumentCollection.DoumentParticularName;
                    dataList.DocumentNameId = data.MedicalDocumentCollection.DocumentNameId;
                    dataList.DocumentName = data.MedicalDocumentCollection.DocumentName;
                    dataList.Document = data.MedicalDocumentCollection.Document;
                    dataList.Remarks = data.MedicalDocumentCollection.Remarks;
                    dataList.MedicalDocumentDoctorApprovalId = data.MedicalDocumentCollection.MedicalDocumentDoctorApprovalId;
                    dataList.ApprovalListId = data.MedicalDocumentCollection.ApprovalListId;
                    dataList.ApprovalListName = data.MedicalDocumentCollection.ApprovalListName;
                    dataList.ApprovalRemarks = data.MedicalDocumentCollection.ApprovalRemarks;
                    dataList.CreatedBy = data.MedicalDocumentCollection.CreatedBy;
                    dataList.MedicalDocumentRemarks = data.MedicalDocumentRemarks;
                    dataList.MedicallyFit = data.MedicalDocumentCollection.MedicallyFit;
                    dataList.DocApprovalStatusId = data.MedicalDocumentCollection.DocApprovalStatusId;
                    dataList.IsEnabledForMedical = data.MedicalDocumentCollection.IsEnabledForMedical;
                }
                return this.Ok(dataList);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("UpdateMedicalDocumentDoctorApproval")]
        public async Task<IActionResult> UpdateMedicalDocumentDoctorApproval(MedicalDocumentDoctorApproval param)
        {
            ContainerReference = "medicaldocuments";
            try
            {

                using (StringWriter sw = new StringWriter())
                {
                    List<byte[]> lBytes = new List<byte[]>();
                    byte[] newByteArray2 = new byte[3];
                    byte[] second_Byte;
                    string Document = Path.GetFileName(param.PreviousString);
                    string fileDocument = Path.Combine("/medicaldocuments", Document);
                    fileDocument = fileDocument.Replace("\\", "/");
                    StringBuilder sb = new StringBuilder(param.DocApprovedString);
                    StringReader sr = new StringReader(sb.ToString());
                    Document pdfDoc = new Document(PageSize.A4);
                    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                    if (param.DocApprovedString != "")
                    {
                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                            pdfDoc.Open();
                            htmlparser.Parse(sr);
                            pdfDoc.Close();
                            second_Byte = memoryStream.ToArray();
                            memoryStream.Close();

                            string AzureConnectionString = this.medicaldocumentservice.CloudStorageAccountname(); //connection string

                            if (CloudStorageAccount.TryParse(AzureConnectionString.ToString(), out CloudStorageAccount storageAccount))
                            {
                                CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                                CloudBlobContainer container = BlobClient.GetContainerReference(ContainerReference);
                                CloudBlob file3 = container.GetBlobReference(Document); //previousfile name

                                await file3.FetchAttributesAsync();
                                byte[] first_Byte = new byte[file3.Properties.Length];
                                await file3.DownloadToByteArrayAsync(first_Byte, 0);
                                lBytes.Add(first_Byte);
                                lBytes.Add(second_Byte);
                                newByteArray2 = concatAndAddContent(lBytes);
                            }
                            var stream = new MemoryStream(newByteArray2);
                            IFormFile file = new FormFile(stream, 0, newByteArray2.Length, "name", Document);

                            CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse(AzureConnectionString.ToString());
                            var CloudBlobClient = cloudStorageAccount.CreateCloudBlobClient();
                            var cloudBlobContainer = CloudBlobClient.GetContainerReference(ContainerReference);
                            if (await cloudBlobContainer.CreateIfNotExistsAsync())
                            {
                                await cloudBlobContainer.SetPermissionsAsync(new BlobContainerPermissions { PublicAccess = BlobContainerPublicAccessType.Off });
                            }
                            var cloudBlockBlob = cloudBlobContainer.GetBlockBlobReference(Document);
                            cloudBlockBlob.Properties.ContentType = "application/pdf";
                            await cloudBlockBlob.UploadFromStreamAsync(file.OpenReadStream());



                        }
                    }
                    param.PreviousString = fileDocument;
                }
                
                    var response = await this.medicaldocumentservice.MedicalDocumentDoctorApprovalUpdate(param)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public static byte[] concatAndAddContent(List<byte[]> pdfByteContent)
        {

            using (var ms = new MemoryStream())
            {
                using (var doc = new Document())
                {
                    using (var copy = new PdfSmartCopy(doc, ms))
                    {
                        doc.Open();

                        //Loop through each byte array
                        foreach (var p in pdfByteContent)
                        {

                            //Create a PdfReader bound to that byte array
                            using (var reader = new PdfReader(p))
                            {

                                //Add the entire document instead of page-by-page
                                copy.AddDocument(reader);
                            }
                        }

                        doc.Close();
                    }
                }
                return ms.ToArray();
            }
        }

        //[HttpPost]
        //[Route("savemedicaldocumentcollection")]
        //public async Task<IActionResult> SaveMedicalDocumentCollection(IFormCollection data)
        //{
        //    try
        //    {
        //        string fileName = "";
        //        var file = Request.Form.Files[0];
        //        string HostUrl = this.environment.ContentRootPath;
        //        string filepath = "UploadedFiles/MedicalDocuments";
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
        //        MedicalDocumentCollectionData formData = new MedicalDocumentCollectionData();
        //        formData.MedicalDocumentCollectionId = Convert.ToInt32(data["MedicalDocumentCollectionId"]);
        //        formData.RequisitionDetailId = Convert.ToInt32(data["RequsitaionDetailsId"]);
        //        formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
        //        formData.DoumentType = Convert.ToInt32(data["DoumentType"]);
        //        formData.DoumentParticular = Convert.ToInt32(data["DoumentParticular"]);
        //        formData.DoumentName = Convert.ToInt32(data["DoumentName"]);
        //        formData.Document = "/" + filepath + "/" + fileName;
        //        formData.Remarks = data["Remarks"];
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

        //        var response = await this.medicaldocumentservice.SaveMedicalDocumentCollection(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("savemedicaldocumentcollection")]
        public async Task<IActionResult> SaveMedicalDocumentCollection(IFormCollection data)
        {
            try
            {
                ContainerReference = "medicaldocuments";
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
                            var fileName1 = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            var fileName2 = fileName1.Replace(" ", "").Replace("-","");
                            var fileName3 = fileName2.Replace(".pdf", "");
                            fileName = fileName3.Replace(".", "") + ".pdf";
                            fileDocument = "/medicaldocuments/" + fileName;
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

                MedicalDocumentCollectionData formData = new MedicalDocumentCollectionData();
                formData.MedicalDocumentCollectionId = Convert.ToInt32(data["MedicalDocumentCollectionId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequsitaionDetailsId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.DoumentType = Convert.ToInt32(data["DoumentType"]);
                formData.DoumentParticular = Convert.ToInt32(data["DoumentParticular"]);
                formData.DoumentName = Convert.ToInt32(data["DoumentName"]);
                formData.Document = fileDocument;
                formData.Remarks = data["Remarks"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.medicaldocumentservice.SaveMedicalDocumentCollection(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.medicaldocumentservice.CloudStorageAccountname();
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
