using System;
using System.Collections.Generic;
using System.Data;
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
    [Route("api/testschedule")]
    [ApiController]
    public class TestScheduleController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ITestScheduleService testScheduleService;
        public TestScheduleController(ITestScheduleService testScheduleService, IWebHostEnvironment environment)
        {
            this.testScheduleService = testScheduleService;
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
            var cloudStorageAccountname = this.testScheduleService.CloudStorageAccountname();
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
        [Route("createtestschedule")]
        public async Task<IActionResult> CreateTestSchedule(TestScheduleFormData formdata)
        {
            try
            {
                var response = await this.testScheduleService.TestScheduleInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("gettestrequsitionforemail")]
        public async Task<IActionResult> GetTestRequisitionDetailsForEmail(SearchTestRequisitionForEmailDetails formdata)
        {
            try
            {
                var response = await this.testScheduleService.GetTestRequisitionDetailsForEmail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }       //arghya, date-29.07.2022

        [HttpPost]
        [Route("gettestscheduledetail")]
        public async Task<IActionResult> GetTestScheduleDetail(SearchTestScheduleDetail formdata)
        {
            try
            {
                var response = await this.testScheduleService.GetTestScheduleDetail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
       
        [HttpPost]
        [Route("uploadtestresult")]
        public async Task<IActionResult> UploadTestResult(IFormCollection data)
        {
            try
            {

                var file = Request.Form.Files[0];
                if (file.FileName.EndsWith(".csv"))
                {
                    DataTable dt = new DataTable();
                    using (var sreader = new StreamReader(file.OpenReadStream()))
                    {
                        string[] headers = sreader.ReadLine().Split(',');     //Title

                        dt.Clear();
                        dt.Columns.Add("RequisitionDetailId");
                        dt.Columns.Add("AttemptId");
                        dt.Columns.Add("TestPin");
                        dt.Columns.Add("CandidateId");
                        dt.Columns.Add("AadharNo");
                        dt.Columns.Add("EmailId");
                        dt.Columns.Add("CandidateName");
                        dt.Columns.Add("TestCompletionDate");
                        dt.Columns.Add("ScoreObtained");
                        dt.Columns.Add("Apptitude");
                        dt.Columns.Add("ReadingExercise");
                        dt.Columns.Add("WrittenExercise");
                        dt.Columns.Add("Technical");
                        dt.Columns.Add("TestResult");
                        dt.Columns.Add("CreatedBy");
                        while (!sreader.EndOfStream)                          //get all the content in rows 
                        {
                            DataRow dr = dt.NewRow();
                            string[] rows = sreader.ReadLine().Split(',');
                            string AttemptId = rows[0].ToString();
                            string TestPin = rows[1].ToString();
                            string AadharNo = rows[2].ToString();
                            string EmailId = rows[3].ToString();
                            string CandidateName = rows[4].ToString();
                            string TestCompletionDate = rows[5].ToString();
                            string ScoreObtained = rows[6].ToString();
                            string Apptitude = rows[7].ToString();
                            string ReadingExercise = rows[8].ToString();
                            string WrittenExercise = rows[9].ToString();
                            string Technical = rows[10].ToString();
                            string TestResult = rows[11].ToString();
                            long RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                            long CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                            dr["RequisitionDetailId"] = RequisitionDetailId;
                            dr["AttemptId"] = AttemptId;
                            dr["TestPin"] = TestPin;
                            dr["AadharNo"] = AadharNo;
                            dr["EmailId"] = EmailId;
                            dr["CandidateName"] = CandidateName;
                            dr["TestCompletionDate"] = TestCompletionDate;
                            //dr["ScoreObtained"] = Convert.ToDecimal(ScoreObtained);
                            if (ScoreObtained != "")
                            {
                                dr["ScoreObtained"] = Convert.ToDecimal(ScoreObtained);
                            }
                            else
                            {
                                dr["ScoreObtained"] = null;
                            }
                            //dr["Apptitude"] = Convert.ToDecimal(Apptitude);
                            if (Apptitude != "")
                            {
                                dr["Apptitude"] = Convert.ToDecimal(Apptitude);
                            }
                            else
                            {
                                dr["Apptitude"] = null;
                            }
                            //dr["ReadingExercise"] = Convert.ToDecimal(ReadingExercise);
                            if (ReadingExercise != "")
                            {
                                dr["ReadingExercise"] = Convert.ToDecimal(ReadingExercise);
                            }
                            else
                            {
                                dr["ReadingExercise"] = null;
                            }
                            //dr["WrittenExercise"] = Convert.ToDecimal(WrittenExercise);
                            if (WrittenExercise != "")
                            {
                                dr["WrittenExercise"] = Convert.ToDecimal(WrittenExercise);
                            }
                            else
                            {
                                dr["WrittenExercise"] = null;
                            }
                            //dr["Technical"] = Convert.ToDecimal(Technical);
                            if (Technical != "")
                            {
                                dr["Technical"] = Convert.ToDecimal(Technical);
                            }
                            else
                            {
                                dr["Technical"] = null;
                            }

                            dr["TestResult"] = TestResult;
                            //if (TestResult != "")
                            //{
                            //    dr["TestResult"] = Convert.ToDecimal(TestResult);
                            //}
                            //else
                            //{
                            //    dr["TestResult"] = null;
                            //}
                            dr["CreatedBy"] = CreatedBy;

                            dt.Rows.Add(dr);
                        }
                    }

                    var response = await this.testScheduleService.UploadTestResult(dt).ConfigureAwait(false);

                    return this.Ok(response);
                }
                else
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError, "Wrong Server error");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettestresult")]
        public async Task<IActionResult> GetTestReult(SearchTestResult formdata)
        {
            try
            {
                var response = await this.testScheduleService.GetTestReult(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatetesttravelreimbursementlist")]
        public async Task<IActionResult> GetCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement search)
        {
            try
            {
                var response = await this.testScheduleService.GetCandidateTestTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampuscandidatetesttravelreimbursementlist")]
        public async Task<IActionResult> GetCampusCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement search)
        {
            try
            {
                var response = await this.testScheduleService.GetCampusCandidateTestTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addtesttravelreimbursement")]
        public async Task<IActionResult> AddTestTravelReimbursement(IFormCollection data)
        {
            try
            {
                int rows = 0;
                var httpRequest = HttpContext.Request;
                ContainerReference = "testtravelreimbursement";
                string BankStatementDocument = "";
                string fileAttachment = "";
                string FileDataName = "";
                //string FName = "";
                int rowNumber = 0;
                string DocumentPathForPDF = "";

                TestTravelReimbursementFormData formData = new TestTravelReimbursementFormData();
                string AttachmentValues = data["AttachmentData"];
                formData.AttachmentData = JsonConvert.DeserializeObject<List<TestTravelAttachmentData>>(AttachmentValues);
                formData.TestScheduleDetailId = Convert.ToInt32(data["TestScheduleDetailId"]);

                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    string HostUrl = this.environment.ContentRootPath;
                    FileDataName = Request.Form.Files[i].Name;

                    if (FileDataName.Contains("AttachmentFiles_"))
                    {
                        ContainerReference = "testtravelreimbursement";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        fileAttachment = Path.Combine("/testtravelreimbursement", fileName);
                        fileAttachment = fileAttachment.Replace("\\", "/");

                        if (FileDataName.Contains("AttachmentFiles_"))
                        {
                            rowNumber = Convert.ToInt32(FileDataName.Replace("AttachmentFiles_", "").ToString());
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
                        fileName = timestampfilename + "_" + formData.TestScheduleDetailId.ToString() + "_testTravelReimbursement.pdf";

                        DocumentPathForPDF = Path.Combine("/candidatedocument", fileName);
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
                        ContainerReference = "testtravelreimbursement";
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');

                        BankStatementDocument = Path.Combine("/testtravelreimbursement", fileName);
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
                formData.JourneyData = JsonConvert.DeserializeObject<List<TestTravelJourneyData>>(JourneyValues);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.testScheduleService.TestTravelReimbursementInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campusaddtesttravelreimbursement")]
        public async Task<IActionResult> CampusAddTestTravelReimbursement(IFormCollection data)
        {
            try
            {
                int rows = 0;
                var httpRequest = HttpContext.Request;
                ContainerReference = "testtravelreimbursement";
                string BankStatementDocument = "";
                string fileAttachment = "";
                string FileDataName = "";
                //string FName = "";
                int rowNumber = 0;

                TestTravelReimbursementFormData formData = new TestTravelReimbursementFormData();
                string AttachmentValues = data["AttachmentData"];
                formData.AttachmentData = JsonConvert.DeserializeObject<List<TestTravelAttachmentData>>(AttachmentValues);

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

                        fileAttachment = Path.Combine("/testtravelreimbursement", fileName);
                        fileAttachment = fileAttachment.Replace("\\", "/");

                        if (FileDataName.Contains("AttachmentFiles_"))
                        {
                            rowNumber = Convert.ToInt32(FileDataName.Replace("AttachmentFiles_", "").ToString());
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

                        BankStatementDocument = Path.Combine("/testtravelreimbursement", fileName);
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
                formData.TestScheduleDetailId = Convert.ToInt32(data["TestScheduleDetailId"]);
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
                formData.JourneyData = JsonConvert.DeserializeObject<List<TestTravelJourneyData>>(JourneyValues);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.testScheduleService.CampusTestTravelReimbursementInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //[HttpPost]
        //[Route("addtesttravelreimbursement")]
        //public async Task<IActionResult> AddTestTravelReimbursement(IFormCollection data)
        //{
        //    try
        //    {
        //        int rows = 0;
        //        TestTravelReimbursementFormData formData = new TestTravelReimbursementFormData();
        //        string BankStatementDocument = "";
        //        string AttachmentValues = data["AttachmentData"];
        //        formData.AttachmentData = JsonConvert.DeserializeObject<List<TestTravelAttachmentData>>(AttachmentValues);
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
        //                filepath = "UploadedFiles/TestTravelReimbursement/JourneyAttachment";
        //            }
        //            else
        //            {
        //                filepath = "UploadedFiles/TestTravelReimbursement/BankStatementAttachment";
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
        //        formData.TestScheduleDetailId = Convert.ToInt32(data["TestScheduleDetailId"]);
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
        //        formData.JourneyData = JsonConvert.DeserializeObject<List<TestTravelJourneyData>>(JourneyValues);
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
        //        var response = await this.testScheduleService.TestTravelReimbursementInsertUpdate(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("gettesttravelreimbursement")]
        public async Task<IActionResult> GetCandidateTestTravelReimbursementData(SearchTestTravelReimbursement search)
        {
            try
            {
                TestTravelReimbursement travelReimbursement = new TestTravelReimbursement();
                travelReimbursement = await this.testScheduleService.GetCandidateTestTravelReimbursementData(search).ConfigureAwait(false);

                TestTravelReimbursementDetailData travelReimbursementDetail = new TestTravelReimbursementDetailData();
                travelReimbursementDetail.TravelReimbursementId = travelReimbursement.TestTravelReimbursementData.TravelReimbursementId;
                travelReimbursementDetail.TestScheduleDetailId = travelReimbursement.TestTravelReimbursementData.TestScheduleDetailId;
                travelReimbursementDetail.FullName = travelReimbursement.TestTravelReimbursementData.FullName;
                travelReimbursementDetail.EmailId = travelReimbursement.TestTravelReimbursementData.EmailId;
                travelReimbursementDetail.ContactNo = travelReimbursement.TestTravelReimbursementData.ContactNo;
                travelReimbursementDetail.CommunicationAddress = travelReimbursement.TestTravelReimbursementData.CommunicationAddress;
                travelReimbursementDetail.PinCode = travelReimbursement.TestTravelReimbursementData.PinCode;
                travelReimbursementDetail.TestName = travelReimbursement.TestTravelReimbursementData.TestName;
                travelReimbursementDetail.StateId = travelReimbursement.TestTravelReimbursementData.StateId;
                travelReimbursementDetail.StateName = travelReimbursement.TestTravelReimbursementData.StateName;
                travelReimbursementDetail.TestDate = travelReimbursement.TestTravelReimbursementData.TestDate;
                travelReimbursementDetail.VenueName = travelReimbursement.TestTravelReimbursementData.VenueName;
                travelReimbursementDetail.PositionName = travelReimbursement.TestTravelReimbursementData.PositionName;
                travelReimbursementDetail.FunctionName = travelReimbursement.TestTravelReimbursementData.FunctionName;
                travelReimbursementDetail.BankAccountName = travelReimbursement.TestTravelReimbursementData.BankAccountName;
                travelReimbursementDetail.BankAccountNumber = travelReimbursement.TestTravelReimbursementData.BankAccountNumber;
                travelReimbursementDetail.BankName = travelReimbursement.TestTravelReimbursementData.BankName;
                travelReimbursementDetail.IFSC = travelReimbursement.TestTravelReimbursementData.IFSC;
                travelReimbursementDetail.BankBranch = travelReimbursement.TestTravelReimbursementData.BankBranch;
                travelReimbursementDetail.BankStatementId = travelReimbursement.TestTravelReimbursementData.BankStatementId;
                travelReimbursementDetail.BankStatementName = travelReimbursement.TestTravelReimbursementData.BankStatementName;
                travelReimbursementDetail.BankStatementDocument = travelReimbursement.TestTravelReimbursementData.BankStatementDocument;
                travelReimbursementDetail.DocumentPathForPDF = travelReimbursement.TestTravelReimbursementData.DocumentPathForPDF;
                travelReimbursementDetail.ClaimStatusId = travelReimbursement.TestTravelReimbursementData.ClaimStatusId;
                travelReimbursementDetail.TravelReimbursementJourneyListData = travelReimbursement.TestTravelReimbursementJourneyListData;
                travelReimbursementDetail.TravelReimbursementAttachmentListData = travelReimbursement.TestTravelReimbursementAttachmentListData;
                return this.Ok(travelReimbursementDetail);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampustesttravelreimbursement")]
        public async Task<IActionResult> GetCampusCandidateTestTravelReimbursementData(SearchTestTravelReimbursement search)
        {
            try
            {
                CampusTestTravelReimbursement travelReimbursement = new CampusTestTravelReimbursement();
                travelReimbursement = await this.testScheduleService.GetCampusCandidateTestTravelReimbursementData(search).ConfigureAwait(false);

                CampusTestTravelReimbursementDetailData travelReimbursementDetail = new CampusTestTravelReimbursementDetailData();
                travelReimbursementDetail.TravelReimbursementId = travelReimbursement.TestTravelReimbursementData.TravelReimbursementId;
                travelReimbursementDetail.TestScheduleDetailId = travelReimbursement.TestTravelReimbursementData.TestScheduleDetailId;
                travelReimbursementDetail.FullName = travelReimbursement.TestTravelReimbursementData.FullName;
                travelReimbursementDetail.EmailId = travelReimbursement.TestTravelReimbursementData.EmailId;
                travelReimbursementDetail.PhoneNo = travelReimbursement.TestTravelReimbursementData.PhoneNo;
                travelReimbursementDetail.CommunicationAddress = travelReimbursement.TestTravelReimbursementData.CommunicationAddress;
                travelReimbursementDetail.PinCode = travelReimbursement.TestTravelReimbursementData.PinCode;
                travelReimbursementDetail.TestName = travelReimbursement.TestTravelReimbursementData.TestName;
                travelReimbursementDetail.TestDate = travelReimbursement.TestTravelReimbursementData.TestDate;
                travelReimbursementDetail.VenueName = travelReimbursement.TestTravelReimbursementData.VenueName;
                travelReimbursementDetail.BankAccountName = travelReimbursement.TestTravelReimbursementData.BankAccountName;
                travelReimbursementDetail.BankAccountNumber = travelReimbursement.TestTravelReimbursementData.BankAccountNumber;
                travelReimbursementDetail.BankName = travelReimbursement.TestTravelReimbursementData.BankName;
                travelReimbursementDetail.IFSC = travelReimbursement.TestTravelReimbursementData.IFSC;
                travelReimbursementDetail.BankBranch = travelReimbursement.TestTravelReimbursementData.BankBranch;
                travelReimbursementDetail.BankStatementId = travelReimbursement.TestTravelReimbursementData.BankStatementId;
                travelReimbursementDetail.BankStatementName = travelReimbursement.TestTravelReimbursementData.BankStatementName;
                travelReimbursementDetail.BankStatementDocument = travelReimbursement.TestTravelReimbursementData.BankStatementDocument;
                travelReimbursementDetail.ClaimStatusId = travelReimbursement.TestTravelReimbursementData.ClaimStatusId;
                travelReimbursementDetail.ProfileSignature = travelReimbursement.TestTravelReimbursementData.ProfileSignature;
                travelReimbursementDetail.TravelReimbursementJourneyListData = travelReimbursement.TestTravelReimbursementJourneyListData;
                travelReimbursementDetail.TravelReimbursementAttachmentListData = travelReimbursement.TestTravelReimbursementAttachmentListData;
                return this.Ok(travelReimbursementDetail);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getrmtesttravelreimbursementlist")]
        public async Task<IActionResult> GetRMTestTravelReimbursementList(SearchRMTestTravelReimbursementList search)
        {
            try
            {
                var response = await this.testScheduleService.GetRMTestTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampustesttravelreimbursementlist")]
        public async Task<IActionResult> GetCampusTestTravelReimbursementList(SearchCampusTestTravelReimbursementList search)
        {
            try
            {
                var response = await this.testScheduleService.GetCampusTestTravelReimbursementList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatetesttravelreimbursementstatus")]
        public async Task<IActionResult> UpdateTestTravelReimbursementStatus(TestTravelReimbursementActionFormData formdata)
        {
            try
            {
                var response = await this.testScheduleService.TestTravelReimbursementActionInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettesttravelclarificationlist")]
        public async Task<IActionResult> GetTestTravelClarificationList(SearchTestTravelClarificationList formdata)
        {
            try
            {
                var response = await this.testScheduleService.GetTestTravelClarificationList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
