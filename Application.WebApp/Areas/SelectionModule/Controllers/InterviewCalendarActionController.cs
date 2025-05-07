using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.SelectionModule.Controllers
{
    [Route("api/interviewcalendaraction")]
    [ApiController]
    public class InterviewCalendarActionController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IInterviewCalendarActionService interviewCalendarActionService;
        public InterviewCalendarActionController(IInterviewCalendarActionService interviewCalendarActionService, IWebHostEnvironment environment)
        {
            this.interviewCalendarActionService = interviewCalendarActionService;
            this.environment = environment;
        }
        public string ContainerReference = null;
        string fileName = "";
        private async Task UploadToAzureAsync(IFormFile file)
        {

            var cloudStorageAccountname = this.interviewCalendarActionService.CloudStorageAccountname();
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
        [Route("getpanellistcalendar")]
        public async Task<IActionResult> GetPanelistCalendar(SearchInterviewCalendar formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetPanelistCalendar(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getCalendarList")]
        public async Task<IActionResult> GetCalendarList(SearchMyCalendar formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetCalendarList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getmycampuscalenderlist")]
        public async Task<IActionResult> GetMyCalenderList(SearchMyCampusCalendar formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetMyCalenderList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateinterviewcalendarstatus")]
        public async Task<IActionResult> InterviewCalendarActionInsert(InterviewCalendarActionFormData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.InterviewCalendarActionInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addinterviewcalendarassessment")]
        public async Task<IActionResult> AddInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.AddInterviewCalendarAssessment(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addinterviewcalendarassessmentwithpdfgeneration")]
        public async Task<IActionResult> AddInterviewCalendarAssessmentWithPDFGeneration(IFormCollection Data)
        {
            try
            {
                InterviewCalendarAssessmentFormDataWithPDFGeneration formdata = new InterviewCalendarAssessmentFormDataWithPDFGeneration();
                ContainerReference = "candidatedocument";

                var httpRequest = HttpContext.Request;
                //string additinalFile = "";
                //string uploadFile = "";
                string FileDataName = "";
                string AssementData = Data["InterviewCalendarAssessmentData"];
                formdata.InterviewCalendarAssessmentData = JsonConvert.DeserializeObject<List<InterviewCalendarAssessmentListDataWithPDFGeneration>>(AssementData);
                formdata.CandidateIds = Data["CandidateIds"];
                formdata.CreatedBy = Convert.ToInt32(Data["CreatedBy"]);
                //formdata.InterviewCalendarAssessmentData = JsonConvert.DeserializeObject<List<InterviewCalendarAssessmentListDataWithPDFGeneration>>(AssesmentData);
               
                for (var i = 0; i < httpRequest.Form.Files.Count; i++)
                {
                    fileName = "";
                    var file = Request.Form.Files[i];
                    
                    FileDataName = Request.Form.Files[i].Name;
                    var timestamp = DateTime.Now.ToFileTime();
                    string timestampfilename = Convert.ToString(timestamp);
                    fileName = timestampfilename + "_" + FileDataName + ".pdf";
                    if (file.Length > 0)
                    {
                        using (var memoryStream = new MemoryStream())
                        {
                            await Request.Form.Files[i].CopyToAsync(memoryStream);
                            await UploadToAzureAsync(Request.Form.Files[i]);
                        }
                    }

                    foreach (var path in formdata.InterviewCalendarAssessmentData)
                    {
                        
                        if (path.CandidateId == Convert.ToInt32(Regex.Match(file.Name, @"\d+").Value))
                        {
                            path.DocumentPath = "/" + ContainerReference + "/" + fileName;
                            break;
                        }
                    }
                }

                //foreach (var values in formdata.HtmlString)
                //{
                //    if(values.HtmlString.Length > 0)
                //    {
                //        StringBuilder sb = new StringBuilder(values.HtmlString);
                //        //StringWriter sw = new StringWriter();
                //        StringReader sr = new StringReader(sb.ToString());
                //        Document pdfDoc = new Document(PageSize.A4.Rotate());
                //        HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                //        IFormFile formFile;

                //        if (values.HtmlString != "")
                //        {
                //            using (MemoryStream memoryStream = new MemoryStream())
                //            {
                //                PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                //                pdfDoc.Open();
                //                htmlparser.Parse(sr);
                //                pdfDoc.Close();
                //                byte[] bytes = memoryStream.ToArray();
                //                var stream = new MemoryStream(bytes);
                //                var timestamp = DateTime.Now.ToFileTime();
                //               var timestampfilename = Convert.ToString(timestamp);

                //                formFile = new FormFile(stream, 0, bytes.Length, "name", timestampfilename+"_" + values.CandidateId.ToString() + "_InterviewAssessmentCode.pdf");
                //                fileName = formFile.FileName;
                //                foreach(var path in formdata.InterviewCalendarAssessmentData)
                //                {
                //                    if (path.CandidateId == values.CandidateId)
                //                    {
                //                        path.DocumentPath = "/"+ ContainerReference+"/"+fileName;
                //                        break;
                //                    }
                //                }
                //                memoryStream.Close();
                //                await UploadToAzureAsync(formFile);
                //            }
                //        }
                //    }
                //}
                var response = await this.interviewCalendarActionService.AddInterviewCalendarAssessmentWithPDFGeneration(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcampusinterviewcalendarassessment")]
        public async Task<IActionResult> AddCampusInterviewCalendarAssessment(InterviewCalendarAssessmentFormData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.AddCampusInterviewCalendarAssessment(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getinterviewcalendarassessmentlist")]
        public async Task<IActionResult> GetInterviewCalendarAssessmentList(SearchInterviewCalendarAssessment formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetInterviewCalendarAssessmentList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("campusgetinterviewcalendarassessmentlist")]
        public async Task<IActionResult> CampusGetInterviewCalendarAssessmentList(CampusSearchInterviewCalendarAssessment formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.CampusGetInterviewCalendarAssessmentList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusinterviewcalendarassessmentlist")]
        public async Task<IActionResult> GetCampusInterviewCalendarAssessmentList(SearchCapmusInterviewCalendarAssessment formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetCampusInterviewCalendarAssessmentList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addinterviewfeedback")]
        public async Task<IActionResult> AddInterviewFeedback(InterviewFeedbackFormData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.InterviewFeedbackInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("insertupdatestatusmycampuscalander")]
        public async Task<IActionResult> InsertUpdateStatusMyCampusCalander(InsertStatusMyCampusCalander formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.InsertUpdateStatusMyCampusCalander(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getinterviewfeedback")]
        public async Task<IActionResult> GetInterviewFeedback(SearchInterviewFeedback formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetInterviewFeedback(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getinterviewclarificationlist")]
        public async Task<IActionResult> GetInterviewClarificationList(SearchInterviewClarificationList formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetInterviewClarificationList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("campusviewcandidatedetails")]
        public async Task<IActionResult> CampusViewCandidateDetails(ViewCandidateSearchData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.CampusViewCandidateDetails(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getinterviewdetails")]
        public async Task<IActionResult> getInterviewDetails(SearchInterviewDeatils formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.getInterviewDetails(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("insertupdatestagegateassesment")]
        public async Task<IActionResult> InsertUpdateStageGateAssesment(StageGateAssesmentData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.InsertUpdateStageGateAssesment(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getstagegateassesment")]
        public async Task<IActionResult> GetStageGateAssesment(SearchInterviewDeatils formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetFillStageGateDetails(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("rmcalendersearchdata")]
        public async Task<IActionResult> GetRmPageInterview(RmCalenderSearchData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetRmPageInterview(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatelistcampuscandidate")]
        public async Task<IActionResult> GetCandidateListCampusCandidate(RmCandidateCalenderSearchData formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetCandidateListCampusCandidate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("insertupcampusinterviewname")]
        public async Task<IActionResult> InsertUpCampusInterviewName(InsUpCampusInterview formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.InsertUpCampusInterviewName(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusinterviewname")]
        public async Task<IActionResult> GetCampusInterviewName(CampusInterviewNameSearch formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetCampusInterviewName(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusinterviewassesmentlist")]
        public async Task<IActionResult> GetCampusInterviewAssesmentList(SearchInterviewAssesment formdata)
        {
            try
            {
                var response = await this.interviewCalendarActionService.GetCampusInterviewAssesmentList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}