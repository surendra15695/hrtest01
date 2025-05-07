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
using System.Text;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using Document = iTextSharp.text.Document;
using PageSize = iTextSharp.text.PageSize;
using iTextSharp.text.pdf;
using System.IO.Compression;
using Azure.Storage.Blobs;

namespace Application.WebApp.Areas.JoiningModule.Controllers
{
    [Route("api/joiningreimbursement")]
    [ApiController]
    public class CandidateReimbursemnetController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICandidateReimbursemnetService candidatereimbursemnetservice;
        public CandidateReimbursemnetController(ICandidateReimbursemnetService candidatereimbursemnetservice, IWebHostEnvironment environment)
        {
            this.candidatereimbursemnetservice = candidatereimbursemnetservice;
            this.environment = environment;
        }



        public string ContainerReference = null;
        string fileName = "";

        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.candidatereimbursemnetservice.CloudStorageAccountname();

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
        [Route("getreimbursementapprovalstatus")]
        public async Task<IActionResult> GetReimbursementApprovalStatus(ReimbursementApprovalStatusSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetReimbursementApprovalStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getmedicalreimbursemtcandidatelist")]
        public async Task<IActionResult> GetMedicalReimbursemtCandidateList(EmployeeReimbursementSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetMedicalReimbursemtCandidateList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getmedicalreimbursemtcandidate_OLD")] //Argg
        public async Task<IActionResult> GetMedicalReimbursemtCandidate(EmployeeReimbursementSearch search)
        {
            try
            {
                EmployeeMedicalReimbursement EmployeeMedicalReimbursement = new EmployeeMedicalReimbursement();
                EmployeeMedicalReimbursement = await this.candidatereimbursemnetservice.GetMedicalReimbursemtCandidate(search).ConfigureAwait(false);

                EmployeeReimbursementData EmployeeReimbursementData = new EmployeeReimbursementData();
                if (EmployeeMedicalReimbursement.EmployeeReimbursementMatserData != null)
                {
                    EmployeeReimbursementData.CandidateMedicalReimbursementId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.CandidateMedicalReimbursementId;
                    EmployeeReimbursementData.RequisitionDetailId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.RequisitionDetailId;
                    EmployeeReimbursementData.CandidateId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.CandidateId;
                    EmployeeReimbursementData.EmpId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.EmpId;
                    EmployeeReimbursementData.EmpNo = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.EmpNo;
                    EmployeeReimbursementData.CandidateFullName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.CandidateFullName;
                    EmployeeReimbursementData.DateofJoining = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.DateofJoining;
                    EmployeeReimbursementData.Location = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.Location;
                    EmployeeReimbursementData.BillDetails = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.BillDetails;
                    EmployeeReimbursementData.Date = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.Date;
                    EmployeeReimbursementData.TotalAmount = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.TotalAmount;
                    EmployeeReimbursementData.ApprovalStatus = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.ApprovalStatus;
                    EmployeeReimbursementData.ApprovalStatusName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.ApprovalStatusName;
                    EmployeeReimbursementData.IsActive = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.IsActive;
                    EmployeeReimbursementData.FunctionId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.FunctionId;
                    EmployeeReimbursementData.FunctionName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.FunctionName;
                    EmployeeReimbursementData.DepartmentId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.DepartmentId;
                    EmployeeReimbursementData.DepartmentName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.DepartmentName;
                    EmployeeReimbursementData.LocationId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.LocationId;
                    EmployeeReimbursementData.LocationName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.LocationName;
                    EmployeeReimbursementData.GradeId = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.GradeId;
                    EmployeeReimbursementData.GradeName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.GradeName;
                    EmployeeReimbursementData.Designation = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.Designation;
                    EmployeeReimbursementData.DesignationName = EmployeeMedicalReimbursement.EmployeeReimbursementMatserData.DesignationName;
                    EmployeeReimbursementData.EmployeeReimbursementDetails = EmployeeMedicalReimbursement.EmployeeReimbursementDetails.ToList();
                }
                return this.Ok(EmployeeReimbursementData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Argg start
        [HttpPost]
        [Route("getmedicalreimbursemtcandidate")]
        public async Task<IActionResult> GetMedicalReimbursemtCandidate1(EmployeeReimbursementSearch search)
        {
            try
            {
                EmployeeMedicalReimbursementMedical EmployeeMedicalReimbursementMedical = new EmployeeMedicalReimbursementMedical();
                EmployeeMedicalReimbursementMedical = await this.candidatereimbursemnetservice.GetMedicalReimbursemtCandidate1(search).ConfigureAwait(false);

                EmployeeReimbursementDataMedical EmployeeReimbursementDataMedical = new EmployeeReimbursementDataMedical();
                if (EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1 != null)
                {
                    EmployeeReimbursementDataMedical.CandidateMedicalReimbursementId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.CandidateMedicalReimbursementId;
                    EmployeeReimbursementDataMedical.RequisitionDetailId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.RequisitionDetailId;
                    EmployeeReimbursementDataMedical.CandidateId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.CandidateId;
                    EmployeeReimbursementDataMedical.EmpId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.EmpId;
                    EmployeeReimbursementDataMedical.EmpNo = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.EmpNo;
                    EmployeeReimbursementDataMedical.CandidateFullName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.CandidateFullName;
                    EmployeeReimbursementDataMedical.DateofJoining = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DateofJoining;
                    EmployeeReimbursementDataMedical.Location = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.Location;
                    EmployeeReimbursementDataMedical.BillDetails = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.BillDetails;
                    EmployeeReimbursementDataMedical.Date = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.Date;
                    EmployeeReimbursementDataMedical.TotalAmount = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.TotalAmount;
                    EmployeeReimbursementDataMedical.ApprovalStatus = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.ApprovalStatus;
                    EmployeeReimbursementDataMedical.ApprovalStatusName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.ApprovalStatusName;
                    EmployeeReimbursementDataMedical.IsActive = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.IsActive;
                    EmployeeReimbursementDataMedical.FunctionId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.FunctionId;
                    EmployeeReimbursementDataMedical.FunctionName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.FunctionName;
                    EmployeeReimbursementDataMedical.DepartmentId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DepartmentId;
                    EmployeeReimbursementDataMedical.DepartmentName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DepartmentName;
                    EmployeeReimbursementDataMedical.LocationId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.LocationId;
                    EmployeeReimbursementDataMedical.LocationName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.LocationName;
                    EmployeeReimbursementDataMedical.GradeId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.GradeId;
                    EmployeeReimbursementDataMedical.GradeName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.GradeName;
                    EmployeeReimbursementDataMedical.Designation = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.Designation;
                    EmployeeReimbursementDataMedical.DesignationName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DesignationName;
                    EmployeeReimbursementDataMedical.EmployeeReimbursementDetailsMedical = EmployeeMedicalReimbursementMedical.EmployeeReimbursementDetailsMedical.ToList();
                }
                return this.Ok(EmployeeReimbursementDataMedical);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Argg end




        [HttpPost]
        [Route("getmedicalreimbursemtcandidatewithaprove")]
        public async Task<IActionResult> GetMedicalReimbursemtCandidateApprove(EmployeeReimbursementSearch search)
        {
            try
            {
                EmployeeMedicalReimbursementMedical2 EmployeeMedicalReimbursementMedical = new EmployeeMedicalReimbursementMedical2();
                EmployeeMedicalReimbursementMedical = await this.candidatereimbursemnetservice.GetMedicalReimbursemtCandidate2(search).ConfigureAwait(false);

                EmployeeReimbursementDataMedical EmployeeReimbursementDataMedical = new EmployeeReimbursementDataMedical();
                if (EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1 != null)
                {
                    EmployeeReimbursementDataMedical.CandidateMedicalReimbursementId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.CandidateMedicalReimbursementId;
                    EmployeeReimbursementDataMedical.RequisitionDetailId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.RequisitionDetailId;
                    EmployeeReimbursementDataMedical.CandidateId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.CandidateId;
                    EmployeeReimbursementDataMedical.EmpId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.EmpId;
                    EmployeeReimbursementDataMedical.EmpNo = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.EmpNo;
                    EmployeeReimbursementDataMedical.CandidateFullName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.CandidateFullName;
                    EmployeeReimbursementDataMedical.DateofJoining = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DateofJoining;
                    EmployeeReimbursementDataMedical.Location = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.Location;
                    EmployeeReimbursementDataMedical.BillDetails = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.BillDetails;
                    EmployeeReimbursementDataMedical.Date = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.Date;
                    EmployeeReimbursementDataMedical.TotalAmount = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.TotalAmount;
                    EmployeeReimbursementDataMedical.ApprovalStatus = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.ApprovalStatus;
                    EmployeeReimbursementDataMedical.ApprovalStatusName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.ApprovalStatusName;
                    EmployeeReimbursementDataMedical.IsActive = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.IsActive;
                    EmployeeReimbursementDataMedical.FunctionId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.FunctionId;
                    EmployeeReimbursementDataMedical.FunctionName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.FunctionName;
                    EmployeeReimbursementDataMedical.DepartmentId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DepartmentId;
                    EmployeeReimbursementDataMedical.DepartmentName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DepartmentName;
                    EmployeeReimbursementDataMedical.LocationId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.LocationId;
                    EmployeeReimbursementDataMedical.LocationName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.LocationName;
                    EmployeeReimbursementDataMedical.GradeId = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.GradeId;
                    EmployeeReimbursementDataMedical.GradeName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.GradeName;
                    EmployeeReimbursementDataMedical.Designation = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.Designation;
                    EmployeeReimbursementDataMedical.DesignationName = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DesignationName;
                    EmployeeReimbursementDataMedical.DocumentPathForPDF = EmployeeMedicalReimbursementMedical.EmployeeReimbursementMatserData1.DocumentPathForPDF;
                    EmployeeReimbursementDataMedical.EmployeeReimbursementDetailsMedical = EmployeeMedicalReimbursementMedical.EmployeeReimbursementDetailsMedical.ToList();
                    EmployeeReimbursementDataMedical.EmployeeMedicalReimbursementMedicalApproval = EmployeeMedicalReimbursementMedical.EmployeeMedicalReimbursementMedicalApproval.ToList();
                }
                return this.Ok(EmployeeReimbursementDataMedical);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("savemedicalreimbursemtcandidate")]
        public async Task<IActionResult> SaveMedicalReimbursemtCandidate(IFormCollection data)
        {
            try
            {

               // string BillFiles = data["BillFiles"];

                EmployeeReimbursementData formData = new EmployeeReimbursementData();
                formData.Htmlstring = data["Htmlstring"];
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];

                }
                ContainerReference = "candidatereimbursementbill";
                fileName = "";
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;

                string fileDocument = "";
                string DocumentPathForPDF = "";
                string FileDataName = "";
                FileDataName = Request.Form.Files[0].Name;
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
                            if (FileDataName.Contains("theFile"))
                            {
                                ContainerReference = "candidatedocument";
                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                fileName = timestampfilename + "_" + formData.CandidateId.ToString() + "_" + "medicalreimbursement.pdf";
                                DocumentPathForPDF = "/candidatedocument" + "/" + fileName;
                                DocumentPathForPDF = DocumentPathForPDF.Replace("\\", "/");
                                if (file1.Length > 0)
                                {
                                    using (var memoryStream = new MemoryStream())
                                    {
                                        await Request.Form.Files[0].CopyToAsync(memoryStream);
                                        await UploadToAzureAsync(Request.Form.Files[0]);
                                    }
                                }
                            }
                            if(formData.BillDetails != "")
                            {
                                var timestamp = DateTime.Now.ToFileTime();
                                string timestampfilename = Convert.ToString(timestamp);
                                var fileName1 = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"');
                                fileName = fileName1.Replace(" ", "");
                                fileDocument = Path.Combine("/candidatedocument", fileName);
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
                }

                //for (var i = 0; i < Request.Form.Files.Count; i++)
                //{
                //    string fileName = "";
                //    var file = Request.Form.Files[i];
                //    string HostUrl = this.environment.ContentRootPath;
                //    string filepath = "UploadedFiles/EmployeeMedicalReimbursement";
                //    string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                //    if (!Directory.Exists(uploadpath))
                //    {
                //        Directory.CreateDirectory(uploadpath);
                //    }
                //    if (file.Length > 0)
                //    {
                //        var timestamp = DateTime.Now.ToFileTime();
                //        string timestampfilename = Convert.ToString(timestamp);
                //        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //        string fullPath = Path.Combine(uploadpath, fileName);
                //        using (var stream = new FileStream(fullPath, FileMode.Create))
                //        {
                //            file.CopyTo(stream);
                //        }
                //    }
                //    if (BillFiles == "")
                //    {
                //        BillFiles = "/" + filepath + "/" + fileName;
                //    }
                //    else
                //    {
                //        BillFiles = BillFiles + "," + "/" + filepath + "/" + fileName;
                //    }
                //}
                //string fileName = "";
                //string filepath = "UploadedFiles/EmployeeMedicalReimbursement";
                //if (Request.Form.Files.Count > 0)
                //{
                //    var file = Request.Form.Files[0];
                //    string HostUrl = this.environment.ContentRootPath;

                //    string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                //    if (!Directory.Exists(uploadpath))
                //    {
                //        Directory.CreateDirectory(uploadpath);
                //    }
                //    if (file.Length > 0)
                //    {
                //        var timestamp = DateTime.Now.ToFileTime();
                //        string timestampfilename = Convert.ToString(timestamp);
                //        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //        string fullPath = Path.Combine(uploadpath, fileName);
                //        using (var stream = new FileStream(fullPath, FileMode.Create))
                //        {
                //            file.CopyTo(stream);
                //        }
                //    }
                //}

                //EmployeeReimbursementData formData = new EmployeeReimbursementData();

                StringBuilder sb = new StringBuilder(formData.Htmlstring);
                StringReader sr = new StringReader(sb.ToString());
                Document pdfDoc = new Document(PageSize.A4);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                IFormFile formFile;

                //if (formData.Htmlstring != "")
                //{
                //    using (MemoryStream memoryStream = new MemoryStream())
                //    {
                //        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                //        pdfDoc.Open();
                //        htmlparser.Parse(sr);
                //        pdfDoc.Close();
                //        byte[] bytes = memoryStream.ToArray();
                //        var stream = new MemoryStream(bytes);
                //        var timestamp = DateTime.Now.ToFileTime();
                //        string timestampfilename = Convert.ToString(timestamp);
                        
                //        formFile = new FormFile(stream, 0, bytes.Length, "name", timestampfilename+ formData.CandidateId.ToString() + "_candidateMedicalReimbursement.pdf");
                //        fileName = formFile.FileName;
                //        memoryStream.Close();
                //        await UploadToAzureAsync(formFile);
                //    }
                //}

                formData.CandidateMedicalReimbursementId = Convert.ToInt32(data["CandidateMedicalReimbursementId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.EmpId = Convert.ToInt32(data["EmpId"]);
                formData.Location = data["Location"];
                formData.DateofJoining = data["DateofJoin"];
                //if (BillFiles == "")
                //{
                //    formData.BillDetails = "";
                //}
                //else
                //{
                 formData.BillDetails = fileDocument;
                //}
                formData.Date = data["DOB"];
                formData.TotalAmount = Convert.ToDecimal(data["TotalAmount"]);
                string Details = data["EmployeeReimbursementDetails"];
                formData.EmployeeReimbursementDetails = JsonConvert.DeserializeObject<List<EmployeeReimbursementDetails>>(Details);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.ApprovalRemarks = data["ApprovalRemarks"];
                formData.ApprovalStatus = Convert.ToInt32(data["ApprovalStatus"]);
                formData.HtmlstringPath =  DocumentPathForPDF;
                var response = await this.candidatereimbursemnetservice.SaveMedicalReimbursemtCandidate(formData).ConfigureAwait(false);


                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettravelreimbursementlistcandidate")]
        public async Task<IActionResult> GetTravelReimbursementListCandidate(EmployeeTravelReimbursementSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetTravelReimbursementListCandidate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettravelreimbursementcandidate")]
        public async Task<IActionResult> GetTravelReimbursementCandidate(EmployeeTravelReimbursementSearch search)
        {
            try
            {
                EmployeeTravelReimbursement EmployeeTravelReimbursement = new EmployeeTravelReimbursement();
                EmployeeTravelReimbursement = await this.candidatereimbursemnetservice.GetTravelReimbursementCandidate(search).ConfigureAwait(false);

                EmployeeTravelReimbursementData EmployeeReimbursementData = new EmployeeTravelReimbursementData();
                if (EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData != null)
                {
                    EmployeeReimbursementData.CandidateTravelReimbursementId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.CandidateTravelReimbursementId;
                    EmployeeReimbursementData.RequisitionDetailId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.RequisitionDetailId;
                    EmployeeReimbursementData.CandidateId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.CandidateId;
                    EmployeeReimbursementData.CandidateFullName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.CandidateFullName;
                    EmployeeReimbursementData.Designation = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.Designation;
                    EmployeeReimbursementData.DesignationName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.DesignationName;
                    EmployeeReimbursementData.GradeId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.GradeId;
                    EmployeeReimbursementData.GradeName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.GradeName;
                    EmployeeReimbursementData.FunctionId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.FunctionId;
                    EmployeeReimbursementData.FunctionName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.FunctionName;
                    EmployeeReimbursementData.DepartmentId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.DepartmentId;
                    EmployeeReimbursementData.DepartmentName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.DepartmentName;
                    EmployeeReimbursementData.PostingLocationId = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.PostingLocationId;
                    EmployeeReimbursementData.PostingLocationName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.PostingLocationName;
                    EmployeeReimbursementData.DateofInduction = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.DateofInduction;
                    EmployeeReimbursementData.PlaceofInduction = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.PlaceofInduction;
                    EmployeeReimbursementData.PlaceofInductionDesc = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.PlaceofInductionDesc;
                    EmployeeReimbursementData.CreatedBy = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.CreatedBy;
                    EmployeeReimbursementData.ApprovalStatus = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.ApprovalStatus;
                    EmployeeReimbursementData.EmpNo = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.EmpNo;
                    EmployeeReimbursementData.DocumentPathForPDF = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.DocumentPathForPDF;
                    EmployeeReimbursementData.ApprovalStatusName = EmployeeTravelReimbursement.EmployeeTravelReimbursementMasterData.ApprovalStatusName;
                    EmployeeReimbursementData.EmployeeTravelJourneyDetails = EmployeeTravelReimbursement.EmployeeTravelJourneyDetails.ToList();
                    EmployeeReimbursementData.EmployeeTravelAttachmentDetails = EmployeeTravelReimbursement.EmployeeTravelAttachmentDetails.ToList();
                    EmployeeReimbursementData.EmployeeTravelForRemarks = EmployeeTravelReimbursement.EmployeeTravelForRemarks.ToList();
                }
                return this.Ok(EmployeeReimbursementData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savetravelreimbursementcandidate")]
        public async Task<IActionResult> SaveTravelReimbursementCandidate(IFormCollection data)
        {
            try
            {

                EmployeeTravelReimbursementData1 formData = new EmployeeTravelReimbursementData1();//Argg
                formData.Htmlstring = data["Htmlstring"];
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.CandidateTravelReimbursementId = Convert.ToInt32(data["CandidateTravelReimbursementId"]);
                string EmployeeTravelAttachmentDetails = data["EmployeeTravelAttachmentDetails"];
                formData.EmployeeTravelAttachmentDetails = JsonConvert.DeserializeObject<List<EmployeeTravelAttachmentDetails>>(EmployeeTravelAttachmentDetails);
                //for (var i = 0; i < formData.AttachmentDetails.Count; i++)
                //{
                ContainerReference = "candidatereimbursementbill";
                fileName = "";
                var file = Request.Form.Files.Count;
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";
                string DocumentPathForPDF = "";
                string FileDataName = "";
                FileDataName = Request.Form.Files[0].Name;
                for (var j = 0; j < file; j++)
                {
                    var file1 = Request.Form.Files[j];

                    var filePath = Path.Combine(environment.ContentRootPath, "UploadedFiles");

                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }


                    if (file1.Length > 0)
                    {
                        if (FileDataName.Contains("theFile"))
                        {
                            ContainerReference = "candidatedocument";
                            var timestamp = DateTime.Now.ToFileTime();
                            string timestampfilename = Convert.ToString(timestamp);
                            fileName = timestampfilename + "_" + formData.CandidateId.ToString() + "_" + "joiningtravelreimbursement.pdf";
                            DocumentPathForPDF = "/candidatedocument" + "/" + fileName;
                            DocumentPathForPDF = DocumentPathForPDF.Replace("\\", "/");
                            if (file1.Length > 0)
                            {
                                using (var memoryStream = new MemoryStream())
                                {
                                    await Request.Form.Files[0].CopyToAsync(memoryStream);
                                    await UploadToAzureAsync(Request.Form.Files[0]);
                                }
                            }
                        }
                        if(formData.EmployeeTravelAttachmentDetails[0].AttachmentFile != "")
                        {
                            //var timestamp = DateTime.Now.ToFileTime();
                            //string timestampfilename = Convert.ToString(timestamp);
                            //var fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"').Replace(" ","");

                            //fileDocument = Path.Combine("/candidatereimbursementbill", fileName);
                            //fileDocument = fileDocument.Replace("\\", "/");

                            //using (var memoryStream = new MemoryStream())
                            //{
                            //    await file1.CopyToAsync(memoryStream);
                            //    System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                            //    await UploadToAzureAsync(file1);
                            //}
                            //foreach (var attachments in formData.EmployeeTravelAttachmentDetails)
                            //{
                            //    attachments.AttachmentLink = "/candidatereimbursementbill/" + file1.FileName;
                            //}


                            var timestamp = DateTime.Now.ToFileTime();
                            string timestampfilename = Convert.ToString(timestamp);
                            var fileName1 = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"');
                            fileName = fileName1.Replace(" ", "");
                            fileDocument = Path.Combine("/candidatedocument", fileName);
                            fileDocument = fileDocument.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }

                            foreach (var attachments in formData.EmployeeTravelAttachmentDetails)
                            {
                                attachments.AttachmentLink = fileDocument;
                            }

                        }
                    }

                    //FileNamechack = ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"');
                    //var file1 = formData1.AttachmentDetails[i].Document;
                    //if (ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"').Contains(formData1.AttachmentDetails[i].Document))
                    //{
                    //var timestamp = DateTime.Now.ToFileTime();
                    //string timestampfilename = Convert.ToString(timestamp);
                    //formData1.CandidateId= Convert.ToInt32(data["CandidateId"])
                    //fileName = data["CandidateId"] + "_" + timestampfilename + "_" + ContentDispositionHeaderValue.Parse(fileOrg.ContentDisposition).FileName.Trim('"').Replace(" ","");
                    //string HostUrl = this.environment.ContentRootPath;
                    //string filepath = "UploadedFiles/EmployeeTraveReimbursement/" + Convert.ToInt32(data["CandidateId"]);
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
                    //string FileDataName = Request.Form.Files[j].Name;
                    //if (FileDataName.Contains("UploadFile"))
                    //{
                    //    foreach (var attachments in formData.EmployeeTravelAttachmentDetails)
                    //    {
                    //        if ("UploadFile_" + attachments.AttachmentFile.ToString() == FileDataName)
                    //        {
                    //            attachments.AttachmentLink = filepath + "/" + fileName;
                    //        }
                    //    }
                    //    formData.EmployeeTravelAttachmentDetails[j].AttachmentLink = filepath + "/" + fileName;
                    //}


                    //break;
                    //}
                }

                //}
                StringBuilder sb = new StringBuilder(formData.Htmlstring);
                StringReader sr = new StringReader(sb.ToString());
                Document pdfDoc = new Document(PageSize.A4);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                ContainerReference = "candidatedocument";
                IFormFile formFile;
                //if (formData.Htmlstring != "")
                //{
                //    using (MemoryStream memoryStream = new MemoryStream())
                //    {
                //        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                //        pdfDoc.Open();
                //        htmlparser.Parse(sr);
                //        pdfDoc.Close();
                //        byte[] bytes = memoryStream.ToArray();
                //        var stream = new MemoryStream(bytes);
                //        var timestamp = DateTime.Now.ToFileTime();
                //        string timestampfilename = Convert.ToString(timestamp);
                //        formFile = new FormFile(stream, 0, bytes.Length, "name", timestampfilename+formData.CandidateId.ToString() + "_candidateTravelReimbursement.pdf");
                //        fileName = formFile.FileName;
                //        memoryStream.Close();
                //        await UploadToAzureAsync(formFile);
                //    }
                //}

                formData.Htmlstringpath = DocumentPathForPDF;
                //DocumentCollectionFormData formData = new DocumentCollectionFormData();

                //formData.CandidateId = Convert.ToInt32(data["RequsitaionDetailsId"]);

                formData.DateofInduction = data["DateofInduction"];
                formData.PlaceofInduction = Convert.ToInt32(data["PlaceofInduction"]);
                formData.PlaceofInductionDesc = data["PlaceofInductionDesc"];
                formData.PreviousAttachmentIds = data["PreviousAttachmentIds"];
                formData.PreviousJourneyIds = data["PreviousJourneyIds"];
                string EmployeeTravelJourneyDetails = data["EmployeeTravelJourneyDetails"];
                formData.ApprovalRemarks = data["ApprovalRemarks"];//Argg
                formData.ApprovalStatus = Convert.ToInt32(data["ApprovalStatus"]);//Argg
                formData.EmployeeTravelJourneyDetails = JsonConvert.DeserializeObject<List<EmployeeTravelJourneyDetails>>(EmployeeTravelJourneyDetails);

                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.candidatereimbursemnetservice.SaveTravelReimbursementCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("getnoticeperiodreimbursemtcandidatelist")]
        public async Task<IActionResult> GetNoticePeriodReimbursemtCandidateList(EmployeeNoticePeriodReimbursementSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetNoticePeriodReimbursemtCandidateList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getnoticeperiodreimbursemtcandidate")]
        public async Task<IActionResult> GetNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursementSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetNoticePeriodReimbursemtCandidate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savenoticeperiodreimbursemtcandidate")]
        public async Task<IActionResult> SaveNoticePeriodReimbursemtCandidate(IFormCollection data)
        {
            try
            {
                ContainerReference = "employeenoticeperiodreimbursement";
                //string fileName = "";
               // var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string filepath = "";
                string DocumentPath = "";
                
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
                            fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"').Replace(" ", "");
                            filepath = ContentDispositionHeaderValue.Parse(file1.ContentDisposition).FileName.Trim('"');
                            DocumentPath = Path.Combine("/employeenoticeperiodreimbursement", fileName);
                            DocumentPath = DocumentPath.Replace("\\", "/");
                            using (var memoryStream = new MemoryStream())
                            {
                                await file1.CopyToAsync(memoryStream);
                                System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                                await UploadToAzureAsync(file1);
                            }
                        }
                    }
                }



                EmployeeNoticePeriodReimbursement formData = new EmployeeNoticePeriodReimbursement();
                formData.Htmlstring = data["Htmlstring"];
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                StringBuilder sb = new StringBuilder(formData.Htmlstring);
                StringReader sr = new StringReader(sb.ToString());
                Document pdfDoc = new Document(PageSize.A4);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                IFormFile formFile;
                if (formData.Htmlstring != "")
                {
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                        pdfDoc.Open();
                        htmlparser.Parse(sr);
                        pdfDoc.Close();
                        byte[] bytes = memoryStream.ToArray();
                        var stream = new MemoryStream(bytes);
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        formFile = new FormFile(stream, 0, bytes.Length, "name", timestampfilename+formData.CandidateId.ToString() + "_candidateNoticeperiodBuyOut.pdf");
                        fileName = formFile.FileName;
                        memoryStream.Close();
                        await UploadToAzureAsync(formFile);
                    }
                }

                formData.CandidateNoticePeriodBuyOutDaysId = Convert.ToInt32(data["CandidateNoticePeriodBuyOutDaysId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.NoticePeriodDays = Convert.ToInt32(data["NoticePeriodDays"]);
                formData.NoticePeroiodServed = Convert.ToInt32(data["NoticePeroiodServed"]);
                formData.RemainingDays = Convert.ToInt32(data["RemainingDays"]);
                formData.Amount = Convert.ToDecimal(data["Amount"]);
                if (DocumentPath != "")
                {
                    formData.Document = DocumentPath;
                }
                else
                {
                    formData.Document = data["Files"];
                }
                if (formData.Htmlstring != "")
                {
                    formData.HtmlstringPath = ContainerReference.ToString() + "/" + fileName;
                }
                formData.ApprovalRemarks = data["ApprovalRemarks"];
                formData.ApprovalStatus = data["ApprovalStatus"];

                formData.DateOfResigation = data["Dateresignation"];
                formData.NoticePeriodRecovery =Convert.ToInt32(data["NoticeperiodRecovery"]);
                formData.RecoveryAmountPerDay = Convert.ToInt32(data["RecoveryAmountperDay"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.candidatereimbursemnetservice.SaveNoticePeriodReimbursemtCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getmedicalreimbursementapprovallist")]
        public async Task<IActionResult> GetMedicalReimbursementApprovalList(CandidateMedicalReimbursementApprovalListSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetMedicalReimbursementApprovalList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savemedicalreimbursementapproval")]
        public async Task<IActionResult> SaveMedicalReimbursementApproval(CandidateMedicalReimbursementApproval formData)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.SaveMedicalReimbursementApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettravelreimbursementapprovallist")]
        public async Task<IActionResult> GetTravelReimbursementApprovalList(CandidateTravellReimbursementApprovalListSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetTravelReimbursementApprovalList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savetravelreimbursementapproval")]
        public async Task<IActionResult> SaveTravelReimbursementApproval(CandidateTravelReimbursementApproval formData)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.SaveTravelReimbursementApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatenoticeperiodbuyoutapprovallist")]
        public async Task<IActionResult> GetCandidateNoticePeriodBuyOutApprovalList(CandidateNoticePeriodBuyOutApprovalListSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetCandidateNoticePeriodBuyOutApprovalList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savecandidatenoticeperiodbuyoutapproval")]
        public async Task<IActionResult> SaveCandidateNoticePeriodBuyOutApproval(CandidateNoticePeriodBuyOutApproval formData)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.SaveCandidateNoticePeriodBuyOutApproval(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatereimbursementbillsubmitlist")]
        public async Task<IActionResult> GetCandidateReimbursementBillSubmitList(CandidateReimbursementBillSubmitListSearch search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetCandidateReimbursementBillSubmitList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savecandidatereimbursementbillsubmit")]
        public async Task<IActionResult> SaveCandidateReimbursementBillSubmit(IFormCollection data)
        {
            //        try
            //        {
            //            string fileName = "";
            //            var file = Request.Form.Files[0];
            //            string HostUrl = this.environment.ContentRootPath;
            //            string filepath = "UploadedFiles/CandidateReimbursementBill";
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
            //            CandidateReimbursementBillSubmitSave formData = new CandidateReimbursementBillSubmitSave();
            //            formData.CandidateReimbursementBillSubmitId = Convert.ToInt32(data["CandidateReimbursementBillSubmitId"]);
            //            formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
            //            formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
            //            formData.Amount = Convert.ToDecimal(data["Amount"]);
            //            formData.Document = "/" + filepath + "/" + fileName;
            //            formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
            //            var response = await this.candidatereimbursemnetservice.SaveCandidateReimbursementBillSubmit(formData).ConfigureAwait(false);

            //            return this.Ok(response);
            //        }
            //        catch (Exception ex)
            //        {
            //            return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            //        }
            try
            {
                ContainerReference = "candidatereimbursementbill";
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
                            fileDocument = Path.Combine("/candidatereimbursementbill", fileName);
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
                CandidateReimbursementBillSubmitSave formData = new CandidateReimbursementBillSubmitSave();
                formData.CandidateReimbursementBillSubmitId = Convert.ToInt32(data["CandidateReimbursementBillSubmitId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.Amount = Convert.ToDecimal(data["Amount"]);
                formData.Document = fileDocument;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.candidatereimbursemnetservice.SaveCandidateReimbursementBillSubmit(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }

        [HttpPost]
        [Route("downloadForms")]
        public async Task<IActionResult> DownloadForm(IFormCollection data)
        {
            try
            {
                CandidateReimbursementBillSubmitSave formData = new CandidateReimbursementBillSubmitSave();
                var response = await this.candidatereimbursemnetservice.SaveCandidateReimbursementBillSubmit(formData).ConfigureAwait(false);

                DownloadFormsString downloadFormsString = new DownloadFormsString();
                downloadFormsString.DownloadFormsStringValues= JsonConvert.DeserializeObject<List<DownloadFormsStringValues>>(data["DownloadFormsStringValues"]);

                string fileNameZip = "Document_" + DateTime.Now.ToString("yyyy-MM-dd") + ".zip";
                byte[] compressedBytes;

                Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                //byte[] compressedBytes;
                var timestamp = DateTime.Now.ToFileTime();
                string timestampfilename = Convert.ToString(timestamp);
                for (var i= 0; i < downloadFormsString.DownloadFormsStringValues.Count;i++)
                {
                    StringBuilder sb = new StringBuilder(downloadFormsString.DownloadFormsStringValues[i].Documentstring.ToString());
                    StringReader sr = new StringReader(sb.ToString());
                    Document pdfDoc = new Document(PageSize.A4);
                    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                        pdfDoc.Open();
                        htmlparser.Parse(sr);
                        pdfDoc.Close();
                        IFormFile file = new FormFile(memoryStream, 0, sb.Length, "name", timestampfilename + "_" + downloadFormsString.DownloadFormsStringValues[i].EmpId.ToString() + ".pdf");
                        files.Add(file.FileName, memoryStream);
                        memoryStream.Close();
                    }

                }

                using (var outStream = new MemoryStream())
                {
                    using (var archive = new ZipArchive(outStream, ZipArchiveMode.Create, true))
                    {
                        foreach (var onefile in files)
                        {
                            var fileInArchive = archive.CreateEntry(onefile.Key, CompressionLevel.Optimal);
                            using (var entryStream = fileInArchive.Open())
                            using (var fileToCompressStream = new MemoryStream(onefile.Value.ToArray()))
                            {
                                fileToCompressStream.CopyTo(entryStream);
                            }
                        }
                    }
                    compressedBytes = outStream.ToArray();
                }

                return File(compressedBytes, "application/zip", fileNameZip);
            }


            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("downloadFormsnoticeperiodbuyout")]
        public async Task<IActionResult> DownloadFormsnoticeperiodbuyout(CandidateReimbursementBillSubmitListSearchForZip search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetCandidateReimbursementBillSubmitListForDownload(search).ConfigureAwait(false);

                Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                var cloudStorageAccountname = this.candidatereimbursemnetservice.CloudStorageAccountname();
                var localFilePath = "";
                foreach (var item in response)
                {
                    if (item.Document != "")
                    {
                        var pathsplit = item.Document.Split("/");
                        var pathsplit2 = item.DocumentPathForHtml.Split("/");

                        if (pathsplit[0] != "UploadedFiles")
                        {
                            string filepath = Path.GetFileName(item.Document.ToString());
                            string DocumentpathFile = Path.GetFileName(item.DocumentPathForHtml.ToString());
                            BlobClient blobClient = new BlobClient(cloudStorageAccountname, pathsplit2[3], filepath);
                            BlobClient blobClient2 = new BlobClient(cloudStorageAccountname, pathsplit2[3], DocumentpathFile);

                            if (CloudStorageAccount.TryParse(cloudStorageAccountname, out CloudStorageAccount storageAccount))
                            {
                                CloudBlobClient blobCloudClient = storageAccount.CreateCloudBlobClient();
                                CloudBlobContainer container = blobCloudClient.GetContainerReference(pathsplit2[3]);
                                CloudBlob file = container.GetBlobReference(filepath);
                                CloudBlob file2 = container.GetBlobReference(DocumentpathFile);
                                bool s = await container.GetBlockBlobReference(filepath).ExistsAsync();
                                bool s2 = await container.GetBlockBlobReference(DocumentpathFile).ExistsAsync();


                                if (s == true)
                                {
                                    using (var stream = new MemoryStream())
                                    {
                                        await blobClient.DownloadToAsync(stream);
                                        stream.Position = 0;
                                        // files.Add(fullfilepath, stream);
                                        files.Add(filepath, stream);
                                    }
                                }
                                if (s2 == true)
                                {
                                    using (var stream2 = new MemoryStream())
                                    {
                                        await blobClient2.DownloadToAsync(stream2);
                                        stream2.Position = 0;

                                        files.Add(DocumentpathFile, stream2);
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
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("downloadFormsmedicalreim")]
        public async Task<IActionResult> DownloadFormsForMedicalReim(CandidateReimbursementBillSubmitListSearchForZip search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetCandidateMedicalReimbursementDwnloadAll(search).ConfigureAwait(false);

                Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                var cloudStorageAccountname = this.candidatereimbursemnetservice.CloudStorageAccountname();
                var localFilePath = "";
                foreach (var item in response)
                {
                    if (item.BillDetails != "")
                    {
                        var pathsplit = item.BillDetails.Split("/");
                        var pathsplit2 = item.Documentpath.Split("/");
                        if (pathsplit[3] != "UploadedFiles")
                        {
                            string filepath = Path.GetFileName(item.BillDetails.ToString());
                            string DocumentpathFile = Path.GetFileName(item.Documentpath.ToString());
                            BlobClient blobClient = new BlobClient(cloudStorageAccountname, pathsplit[3], filepath);
                            BlobClient blobClient2 = new BlobClient(cloudStorageAccountname, pathsplit2[1], DocumentpathFile);

                            if (CloudStorageAccount.TryParse(cloudStorageAccountname, out CloudStorageAccount storageAccount))
                            {
                                CloudBlobClient blobCloudClient = storageAccount.CreateCloudBlobClient();
                                CloudBlobContainer container = blobCloudClient.GetContainerReference(pathsplit[3]);
                                CloudBlob file = container.GetBlobReference(filepath);
                                CloudBlob file2 = container.GetBlobReference(DocumentpathFile);
                                bool s = await container.GetBlockBlobReference(filepath).ExistsAsync();
                                bool s2 = await container.GetBlockBlobReference(DocumentpathFile).ExistsAsync();

                                if (s == true)
                                {
                                    using (var stream = new MemoryStream())
                                    {
                                        await blobClient.DownloadToAsync(stream);
                                        stream.Position = 0;

                                        files.Add(filepath, stream);
                                    }
                                }
                                if (s2 == true)
                                {
                                    using (var stream2 = new MemoryStream())
                                    {
                                        await blobClient2.DownloadToAsync(stream2);
                                        stream2.Position = 0;

                                        files.Add(DocumentpathFile, stream2);
                                    }
                                }
                            }
                        }
                    }

                }
                //string HostUrl = this.environment.ContentRootPath;
                //string filepath2 = "UploadedFiles/EmployeeMedicalReimbursement";
                //string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath2);
                //string fullpath = uploadpath +"/"+ Path.GetFileName(response[0].BillDetails.ToString());
                //using (var stream = new MemoryStream())
                //{
                //    files.Add(fullpath, stream);
                //}

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
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [HttpPost]
        [Route("downloadFormstravel")]
        public async Task<IActionResult> DownloadFormsFortravel(CandidateReimbursementBillSubmitListSearchForZip search)
        {
            try
            {
                var response = await this.candidatereimbursemnetservice.GetTravelReimbursementCandidateForAll(search).ConfigureAwait(false);

                Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                var cloudStorageAccountname = this.candidatereimbursemnetservice.CloudStorageAccountname();
                var localFilePath = "";
                foreach (var item in response)
                {
                    if (item.AttachmentLink != "")
                    {
                        var pathsplit = item.AttachmentLink.Split("/");
                        var pathsplit2 = item.documentpath.Split("/");
                        if (pathsplit[3] != "UploadedFiles")
                        {
                            string filepath = Path.GetFileName(item.AttachmentLink.ToString());
                            string DocumentpathFile = Path.GetFileName(item.documentpath.ToString());
                            BlobClient blobClient = new BlobClient(cloudStorageAccountname, pathsplit[3], filepath);
                            BlobClient blobClient2 = new BlobClient(cloudStorageAccountname, pathsplit2[0], DocumentpathFile);

                            if (CloudStorageAccount.TryParse(cloudStorageAccountname, out CloudStorageAccount storageAccount))
                            {
                                CloudBlobClient blobCloudClient = storageAccount.CreateCloudBlobClient();
                                CloudBlobContainer container = blobCloudClient.GetContainerReference(pathsplit[3]);
                                CloudBlob file = container.GetBlobReference(filepath);
                                CloudBlob file2 = container.GetBlobReference(DocumentpathFile);
                                bool s = await container.GetBlockBlobReference(filepath).ExistsAsync();
                                bool s2 = await container.GetBlockBlobReference(DocumentpathFile).ExistsAsync();

                                if (s == true)
                                {
                                    using (var stream = new MemoryStream())
                                    {
                                        await blobClient.DownloadToAsync(stream);
                                        stream.Position = 0;

                                        files.Add(filepath, stream);
                                    }
                                }
                                if (s2 == true)
                                {
                                    using (var stream2 = new MemoryStream())
                                    {
                                        await blobClient2.DownloadToAsync(stream2);
                                        stream2.Position = 0;

                                        files.Add(DocumentpathFile, stream2);
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
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



    }

}



