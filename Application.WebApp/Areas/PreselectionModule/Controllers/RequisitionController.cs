using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.PreselectionModule.Controllers
{
    [Route("api/requisition")]
    [ApiController]
    public class RequisitionController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IRequisitionService requisitionService;
        public RequisitionController(IRequisitionService requisitionService, IWebHostEnvironment environment)
        {
            this.requisitionService = requisitionService;
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
            var cloudStorageAccountname = this.requisitionService.CloudStorageAccountname();

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
        [Route("checkiom")]
        public async Task<IActionResult> CheckIOMNo(IOMFormData formData)
        {
            try
            {
                var response = await this.requisitionService.CheckIOMNo(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("generaterequisition")]
        public async Task<IActionResult> GenerateRequisition(IFormCollection data)
        {
            try
            {
                ContainerReference = "managementapprovaldocument";
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
                            fileDocument = Path.Combine("/managementapprovaldocument", fileName);
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

                RequisitionFormData formData = new RequisitionFormData();
                formData.LocationId =Convert.ToInt32(data["LocationId"]);
                formData.VerticalId = Convert.ToInt32(data["VerticalId"]);
                formData.IOMNo = data["IOMNo"];
                formData.ManagementApprovalDocument = fileDocument;
                string RequistionValue = data["RequisitionData"];
                formData.RequisitionData = JsonConvert.DeserializeObject<List<RequisitionDataObject>>(RequistionValue);
                string UniqueIds = data["UniqueFunctionIds"];
                formData.UniqueFunctionIds = JsonConvert.DeserializeObject<List<UniqueFunctionIdObject>>(UniqueIds);
                formData.CreatedBy= Convert.ToInt32(data["CreatedBy"]);
                var response = await this.requisitionService.RequisitionInsert(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("generaterequisitionwithdummy")]
        public async Task<IActionResult> GenerateRequisitionWithDummy(IFormCollection data)
        {
            try
            {
                ContainerReference = "managementapprovaldocument";
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
                            fileDocument = Path.Combine("/managementapprovaldocument", fileName);
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

                RequisitionFormDatawithDummy formData = new RequisitionFormDatawithDummy();
                formData.LocationId = Convert.ToInt32(data["LocationId"]);
                formData.VerticalId = Convert.ToInt32(data["VerticalId"]);
                formData.IOMNo = data["IOMNo"];
                formData.ManagementApprovalDocument = fileDocument;
                string RequistionValue = data["RequisitionData"];
                formData.RequisitionData = JsonConvert.DeserializeObject<List<RequisitionDataObjectWithDummy>>(RequistionValue);
                string UniqueIds = data["UniqueFunctionIds"];
                formData.UniqueFunctionIds = JsonConvert.DeserializeObject<List<UniqueFunctionIdObject>>(UniqueIds);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.requisitionService.RequisitionInsertWithDummy(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("generaterequisition")]
        //public async Task<IActionResult> GenerateRequisition(IFormCollection data)
        //{
        //    try
        //    {
        //        string fileName = "";
        //        var file = Request.Form.Files[0];
        //        string HostUrl = this.environment.ContentRootPath;
        //        string filepath = "UploadedFiles/ManagementApprovalDocument";
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
        //        RequisitionFormData formData = new RequisitionFormData();
        //        formData.LocationId = Convert.ToInt32(data["LocationId"]);
        //        formData.VerticalId = Convert.ToInt32(data["VerticalId"]);
        //        formData.IOMNo = data["IOMNo"];
        //        formData.ManagementApprovalDocument = "/" + filepath + "/" + fileName;
        //        string RequistionValue = data["RequisitionData"];
        //        formData.RequisitionData = JsonConvert.DeserializeObject<List<RequisitionDataObject>>(RequistionValue);
        //        string UniqueIds = data["UniqueFunctionIds"];
        //        formData.UniqueFunctionIds = JsonConvert.DeserializeObject<List<UniqueFunctionIdObject>>(UniqueIds);
        //        formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
        //        var response = await this.requisitionService.RequisitionInsert(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}


        [HttpPost]
        [Route("getallrequisition")]
        public async Task<IActionResult> GetAllRequisitionList(SearchRequisition search)
        {
            try
            {
                var response = await this.requisitionService.GetAllRequisitionList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalldummyrequisition")]
        public async Task<IActionResult> GetAllDummyRequisitionList(SearchDummyRequisition search)
        {
            try
            {
                var response = await this.requisitionService.GetAllDummyRequisitionList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallrequisitionforhm")]
        public async Task<IActionResult> GetAllRequisitionHMList(SearchRequisition search)
        {
            try
            {
                var response = await this.requisitionService.GetAllRequisitionHMList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getDetailsRequisition")]

        public async Task<IActionResult> GetDetailsRequisition(SearchRequisition search)
        {
            try
            {
                var response = await this.requisitionService.GetDetailsRequisition(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getCandidatetaggedRequisition")]

        public async Task<IActionResult> GetCandidateTaggedRequisition(SearchCandidateTaggedRequisition search)
        {
            try
            {
                var response = await this.requisitionService.GetCandidateTaggedRequisition(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallrequisitionhistory")]
        public async Task<IActionResult> GetAllRequisitionHistoryList(SearchRequisitionHistory search)
        {
            try
            {
                var response = await this.requisitionService.GetAllRequisitionHistoryList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("holdupdateforrequisition")]
        public async Task<IActionResult> HoldUpdateForRequisition(SearchHoldRequisition formData)
        {
            try
            {
                var response = await this.requisitionService.HoldUpdateForRequisition(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("allocaterequisitiontorm")]
        public async Task<IActionResult> RequisitionAllocateToRM(RequisitionAllocationFormData formData)
        {
            try
            {
                var response = await this.requisitionService.RequisitionAllocateToRM(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("allocaterequisitiontosourcechannel")]
        public async Task<IActionResult> RequisitionAllocateSourceChannel(RequisitionSourceFormData formData)
        {
            try
            {
                var response = await this.requisitionService.RequisitionAllocateSourceChannel(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getrequisitionsourcechanneldetaillist")]
        public async Task<IActionResult> GetRequisitionSourceChannelDetailList(SearchRequisitionSourceChannelDetailList search)
        {
            try
            {
                var response = await this.requisitionService.GetRequisitionSourceChannelDetailList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("requisitionapprovereject")]
        public async Task<IActionResult> RequisitionApproveReject(RequisitionApproveRejectFormData formData)
        {
            try
            {
                var response = await this.requisitionService.RequisitionApproveReject(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("updaterequisitioncandidatehiringstatus")]
        public async Task<IActionResult> UpdateRequisitionCandidateHiringStatus(RequisitionCandidateHiringStatusFormData formData)
        {
            try
            {
                var response = await this.requisitionService.UpdateRequisitionCandidateHiringStatus(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("updaterequisitioncandidatehiringstatusforcancel")]
        public async Task<IActionResult> UpdateRequisitionCandidateHiringStatusForCancel(RequisitionCandidateHiringStatusFormDataForCancel formData)//Piu
        {
            try
            {
                var response = await this.requisitionService.UpdateRequisitionCandidateHiringStatusForCancel(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("updateRequisitionCVCandidateTag")]
        public async Task<IActionResult> UpdateRequisitionCVCandidateTag(RequisitionCVCandidateTagList formData)
        {
            try
            {
                var response = await this.requisitionService.UpdateRequisitionCVCandidateTag(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("updateRequisitionCVCandidateTagNew")]
        public async Task<IActionResult> UpdateRequisitionCVCandidateTagNew(RequisitionCVCandidateTagListNew formData)
        {
            try
            {
                var response = await this.requisitionService.UpdateRequisitionCVCandidateTagNew(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("deletecandidates")]
        public async Task<IActionResult> DeleteCandidates(DeleteCandidates formData)
        {
            try
            {
                var response = await this.requisitionService.DeleteCandidates(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("candidatesupdateprofilemail")]
        public async Task<IActionResult> CandidatesUpdateprofileMail(CandidateUpdateProfile formData)
        {
            try
            {
                
                var response = await this.requisitionService.CandidatesUpdateprofileMail(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("updaterequisitioncandidaterejectdeclinecallback")]
        public async Task<IActionResult> UpdateRequisitionCandidateRejectDeclineCallBack(RequisitionCandidateHiringStatusFormData formData)
        {
            try
            {
                var response = await this.requisitionService.UpdateRequisitionCandidateRejectDeclineCallBack(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("discontinuecandidatefrombatch")]
        public async Task<IActionResult> DiscontinueCandidateFromBatch(DiscontinueCandidateFormData formData)
        {
            try
            {
                var response = await this.requisitionService.DiscontinueCandidateFromBatch(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("insertcallbackrequest")]
        public async Task<IActionResult> InsertCallBackHistory(CallbackHistoryInsertFormData formData)
        {
            try
            {
                var response = await this.requisitionService.InsertCallBackHistory(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("approverejectcallbackrequest")]
        public async Task<IActionResult> ApproveRejectCallbackRequest(CallbackRequestCandidateApproval formData)
        {
            try
            {
                var response = await this.requisitionService.ApproveRejectCallbackRequest(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsourcechanneljoblist")]
        public async Task<IActionResult> GetSourceChannelJobList(SearchSourceChannelJobList search)
        {
            try
            {
                var response = await this.requisitionService.GetSourceChannelJobList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcandidatehiringstatus")]
        public async Task<IActionResult> GetCandiadateHiringStatus(SearchCandidateHigringList search)
        {
            try
            {
                var response = await this.requisitionService.GetCandiadateHiringStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampuscandidatehiringstatus")]
        public async Task<IActionResult> GetCampusCandiadateHiringStatus(SearchCandidateHigringList search)
        {
            try
            {
                var response = await this.requisitionService.GetCampusCandiadateHiringStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("assignedreleasedcandidatetorequisition")]
        public async Task<IActionResult> AssignReleasedCandidateToRequisition(AssignReleasedCandidateToRequisionData formData)
        {
            try
            {
                var response = await this.requisitionService.AssignReleasedCandidateToRequisition(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getrequisitionholdrelease")]
        public async Task<IActionResult> GetRequisitionHoldRelease(SearchRequisitionHoldRelease search)
        {
            try
            {
                var response = await this.requisitionService.GetRequisitionHoldRelease(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("uploadnaukricandidate")]
        public async Task<IActionResult> UploadNaukriCandidate(IFormCollection data)
        {
            try
            {
                
                var file= Request.Form.Files[0];
                if (file.FileName.EndsWith(".csv"))
                {
                    DataTable dt = new DataTable();
                    using (var sreader = new StreamReader(file.OpenReadStream()))
                    {
                        string[] headers = sreader.ReadLine().Split(',');     //Title
                        
                        dt.Clear();
                        dt.Columns.Add("CandidateName");
                        dt.Columns.Add("CandidateEmailId");
                        dt.Columns.Add("RequisitionDetailId");
                        dt.Columns.Add("CreatedBy");
                        while (!sreader.EndOfStream)                          //get all the content in rows 
                        {
                            DataRow dr = dt.NewRow();
                            string[] rows = sreader.ReadLine().Split(',');
                            string EmailId = rows[0].ToString();
                            string Name = rows[1].ToString();
                            long RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                            long CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                            dr["CandidateName"] = Name;
                            dr["CandidateEmailId"] = EmailId;
                            dr["RequisitionDetailId"] = RequisitionDetailId;
                            dr["CreatedBy"] = CreatedBy;
                            dt.Rows.Add(dr);
                        }
                    }

                    var response = await this.requisitionService.UploadNaukriProfile(dt).ConfigureAwait(false);

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
        [Route("updateholdrelease")]
        public async Task<IActionResult> UpdateHoldRelease(RequisitionHoldReleaseSubmitFormData formData)
        {
            try
            {
                var response = await this.requisitionService.UpdateHoldRelease(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallmergerequisitiondetaillist")]
        public async Task<IActionResult> GetMergeRequisitionDetailsList(SearchMergeRequisitionList search)
        {
            try
            {
                var response = await this.requisitionService.GetMergeRequisitionDetailsList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("ddlrequsitionlistgetAll")]
        public async Task<IActionResult> ddlRequsitionListgetAll(SearchddlRequsitionListgetAll search)
        {
            try
            {
                var response = await this.requisitionService.ddlRequsitionListgetAll(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("deletebeforerequisition")]
        public async Task<IActionResult> DeleteBeforeRequisition(DeleteBeforeRequisitionFormData formData)
        {
            try
            {
                var response = await this.requisitionService.DeleteBeforeRequisition(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("unmappedcandidaterequsitioninsertupdate")]
        public async Task<IActionResult> UnMappedCandidateRequsitionInsertUpdate(UnMappedCandidateRequsitionInsertUpdate formData)
        {
            try
            {
                var response = await this.requisitionService.UnMappedCandidateRequsitionInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}
