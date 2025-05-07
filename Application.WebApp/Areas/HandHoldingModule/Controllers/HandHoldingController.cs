using Application.Entity.Entities.HandHoldingModule;
using Application.Service.Services.Interfaces.HandHoldingModule;
using iTextSharp.text;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.WebApp.Areas.HandHoldingModule.Controllers
{
    [Route("api/handholding")]
    [ApiController]
    public class HandHoldingController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IHandHoldingService handHoldingService;
        public HandHoldingController(IHandHoldingService handHoldingService, IWebHostEnvironment environment)
        {
            this.handHoldingService = handHoldingService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getallhandholdingallocationlist")]
        public async Task<IActionResult> GetAllHandHoldingAllocationList(HandHoldingAllocationSearch search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHandHoldingAllocationList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingallocationlist")]
        public async Task<IActionResult> GetHandHoldingAllocationList(HandHoldingAllocationSearch search)
        {
            try
            {
                var response = await this.handHoldingService.GetHandHoldingAllocationList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("allocatedhandholding")]
        public async Task<IActionResult> HandHoldingAllocateInsertUpdate(HandHoldingAllocateFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingAllocateInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallaicjobshadowcandidatelist")]
        public async Task<IActionResult> GetAllAICAllocatedJobShadowList(SearchAICAllocatedList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedJobShadowList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submithandholdingjobshadowreview")]
        public async Task<IActionResult> HandHoldingAICJobShadowReviewInsertUpdate(AICHandHoldingJobShadowReviewFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingAICJobShadowReviewInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingjobshadowreviewdetail")]
        public async Task<IActionResult> GetAllAICAllocatedJobShadowReviewDetails(SearchAICHandHoldingJobShadowReviewDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedJobShadowReviewDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallaiclistencandidatelist")]
        public async Task<IActionResult> GetAllAICAllocatedListenList(SearchAICAllocatedList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedListenList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallaichalfyearlycandidatelist")]
        public async Task<IActionResult> GetAllAICAllocatedHalfYearlyList(SearchAICAllocatedList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedHalfYearlyList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallaicconfirmationcandidatelist")]
        public async Task<IActionResult> GetAllAICAllocatedConfirmationList(SearchAICAllocatedList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedConfirmationList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingreviewquestions")]
        public async Task<IActionResult> GetAllHandHoldingReviewQuestions(HandHoldingReviewQuestions search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHandHoldingReviewQuestions(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcanddatedetailsforconfreview")]
        public async Task<IActionResult> GetCandidateDetailsConfReview(SearchConfirmationReviewDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetCandidateDetailsConfReview(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submithandholdinglistenreview")]
        public async Task<IActionResult> HandHoldingAICListenReviewInsertUpdate(AICHandHoldingListenReviewFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingAICListenReviewInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdinglistenreviewdetail")]
        public async Task<IActionResult> GetAllAICAllocatedListenReviewDetails(SearchAICHandHoldingListenReviewDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedListenReviewDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submithandholdinghalfyearlyreview")]
        public async Task<IActionResult> HandHoldingAICHalfYearlyReviewInsertUpdate(AICHandHoldingHalfYearlyReviewFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingAICHalfYearlyReviewInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdinghalfyearlyreviewdetail")]
        public async Task<IActionResult> GetAllAICAllocatedHalfYearlyReviewDetails(SearchAICHandHoldingHalfYearlyReviewDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedHalfYearlyReviewDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submithandholdingconfirmationreview")]
        public async Task<IActionResult> HandHoldingAICConfirmationReviewInsertUpdate(AICHandHoldingConfirmationFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingAICConfirmationReviewInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingconfirmationreviewdetail")]
        public async Task<IActionResult> GetAllAICAllocatedConfirmationReviewDetails(SearchAICHandHoldingConfirmationReviewDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllAICAllocatedConfirmationReviewDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submithandholdinghrfeedback")]
        public async Task<IActionResult> HandHoldingHRFeedbackInsertUpdate(HandHoldingHRFeedbackFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingHRFeedbackInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdinghrfeedbackdetail")]
        public async Task<IActionResult> GetAllHRFeedbackDetails(SearchHandHoldingHRFeedbackDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHRFeedbackDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submithandholdinghrreview")]
        public async Task<IActionResult> HandHoldingHRReviewInsertUpdate(HandHoldingHRReviewFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingHRReviewInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdinghrreviewdetail")]
        public async Task<IActionResult> GetAllHRReviewDetails(SearchHandHoldingHRReviewDetail search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHRReviewDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingapproverpendinglist")]
        public async Task<IActionResult> GetAllHandholdingApproverPendingList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHandholdingApproverPendingList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("gethandholdingconfirmationform")]
        public async Task<IActionResult> GetAllHandholdingConfirmationFormList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHandholdingConfirmationFormList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("gethandholdingapproverallocatedlist")]
        public async Task<IActionResult> GetAllHandholdingApproverAllocatedList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllHandholdingApproverAllocatedList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingapproverjobshadowlist")]
        public async Task<IActionResult> GetAllApproverJobShadowList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllApproverJobShadowList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingapproverlistenlist")]
        public async Task<IActionResult> GetAllApproverListenList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllApproverListenList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingapproverhalfyearlylist")]
        public async Task<IActionResult> GetAllApproverHalfYearlyList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllApproverHalfYearlyList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gethandholdingapproverconfirmationlist")]
        public async Task<IActionResult> GetAllApproverConfirmationList(SearchHandHoldingApproverList search)
        {
            try
            {
                var response = await this.handHoldingService.GetAllApproverConfirmationList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("submitapproveraction")]
        public async Task<IActionResult> HandHoldingApproverActionInsertUpdate(HandHoldingApproverActionFormData formData)
        {
            try
            {
                var response = await this.handHoldingService.HandHoldingApproverActionInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("downloadallforms")]
        public async Task<IActionResult> DownloadFormForAllHandholding(IFormCollection data)
        {
            try
            {
                HandHoldingApproverActionFormData formData = new HandHoldingApproverActionFormData();
                var response = await this.handHoldingService.HandHoldingApproverActionInsertUpdate(formData).ConfigureAwait(false);

                DownloadFormsString downloadFormsString = new DownloadFormsString();
                downloadFormsString.DownloadFormsStringValues =  JsonConvert.DeserializeObject<List<DownloadFormsStringValues>>(data["DownloadFormsStringValues"]);

                string fileNameZip = "Document_" + DateTime.Now.ToString("yyyy-MM-dd") + ".zip";
                byte[] compressedBytes;

                Dictionary<string, MemoryStream> files = new Dictionary<string, MemoryStream>();
                //byte[] compressedBytes;
                var timestamp = DateTime.Now.ToFileTime();
                string timestampfilename = Convert.ToString(timestamp);
                for (var i = 0; i < downloadFormsString.DownloadFormsStringValues.Count; i++)
                {
                    StringBuilder sb = new StringBuilder(downloadFormsString.DownloadFormsStringValues[i].Documentstring.ToString());
                    StringReader sr = new StringReader(sb.ToString());
                    Document pdfDoc = new Document(PageSize.A4.Rotate());
                    HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                        pdfDoc.Open();
                        htmlparser.Parse(sr);
                        pdfDoc.Close();
                        IFormFile file = new FormFile(memoryStream, 0, sb.Length, "name", timestampfilename + "_" + downloadFormsString.DownloadFormsStringValues[i].EmpNo.ToString() + ".pdf");
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
    }
}
