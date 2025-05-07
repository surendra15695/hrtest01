using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.DataAccess.Repositories.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.ReportModule;
using Application.Service.Services.Interfaces.CommonModule;
using ExcelDataReader;
//using HiQPdf;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/common")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        //uat
        //CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=hrportaldocumentstorage;AccountKey=K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==;EndpointSuffix=core.windows.net");
        //live
       // CloudStorageAccount cloudStorageAccount = CloudStorageAccount.Parse("DefaultEndpointsProtocol=https;AccountName=mrfhrportaldocumentstrg;AccountKey=ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==;EndpointSuffix=core.windows.net");
        
        public string ContainerReference = null;
        string fileName = "";
        private readonly IStatusService statusService;
        private readonly ICommonService commonService;
        private IWebHostEnvironment environment;
        private string newfilepath;
        public CommonController(
            IStatusService statusService,
            ICommonService commonService,
            IWebHostEnvironment environment
            )
        {
            this.statusService = statusService;
            this.commonService = commonService;
            this.environment = environment;
        }

        [HttpGet]
        [Route("getallstatus")]
        public async Task<IActionResult> GetAllStatus()
        {
            try
            {
                var response = await this.statusService.GetAllStatus().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getallstatusROResignation")]
        public async Task<IActionResult> GetAllStatusForROResignation()
        {
            try
            {
                var response = await this.statusService.GetAllStatusForROResignation().ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getallyears")]
        public async Task<IActionResult> GetAllYears()
        {
            try
            {
                var response = await this.commonService.GetAllYears().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getallage")]
        public async Task<IActionResult> GetAllAge()
        {
            try
            {
                var response = await this.commonService.GetAllAge().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("getallmonths")]
        public async Task<IActionResult> GetAllMonths()
        {
            try
            {
                var response = await this.commonService.GetAllMonths().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("getallstate")]
        public async Task<IActionResult> GetAllState()
        {
            try
            {
                var response = await this.commonService.GetAllState().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("getallexperience")]
        public async Task<IActionResult> GetAllExperience()
        {
            try
            {
                var response = await this.commonService.GetAllExperience().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcountry")]
        public async Task<IActionResult> GetAllCountry(SearchCountry search)
        {
            try
            {
                var response = await this.commonService.GetAllCountry(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallStatecountry")]
        public async Task<IActionResult> GetAllStateCountry(SearchStateCountry search)
        {
            try
            {
                var response = await this.commonService.GetAllStateCountry(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallreligion")]
        public async Task<IActionResult> GetAllReligion(SearchReligion search)
        {
            try
            {
                var response = await this.commonService.GetAllReligion(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcaste")]
        public async Task<IActionResult> GetAllCaste(SearchCaste search)
        {
            try
            {
                var response = await this.commonService.GetAllCaste(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getAllExternalTrainer")]
        public async Task<IActionResult> GetAllExternalTrainer(SearchTrainer search)
        {
            try
            {
                var response = await this.commonService.GetAllExternalTrainer(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcountrylist")]
        public async Task<IActionResult> GetAllCountryList(SearchCountryList search)
        {
            try
            {
                var response = await this.commonService.GetAllCountryList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallrelationship")]
        public async Task<IActionResult> GetAllRelationship(SearchRelation search)
        {
            try
            {
                var response = await this.commonService.GetAllRelationship(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallfamilyrelationship")]
        public async Task<IActionResult> GetAllFamilyRelationship(SearchRelation search)
        {
            try
            {
                var response = await this.commonService.GetAllFamilyRelationship(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallnationality")]
        public async Task<IActionResult> GetAllNationality(SearchNationality search)
        {
            try
            {
                var response = await this.commonService.GetAllNationality(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallbloodgroup")]
        public async Task<IActionResult> GetAllBloodGroup(SearchBloodGroup search)
        {
            try
            {
                var response = await this.commonService.GetAllBloodGroup(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallqulificationuniversityboard")]
        public async Task<IActionResult> GetAllQulificationUniversityBoard(SearchQulificationUniversityBoard search)
        {
            try
            {
                var response = await this.commonService.GetAllQulificationUniversityBoard(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallqulificationclassgaradedivision")]
        public async Task<IActionResult> GetQulificationClassGaradeDivision(SearchQulificationClassGaradeDivision search)
        {
            try
            {
                var response = await this.commonService.GetAllQulificationClassGaradeDivision(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallsalaryaccountheadprevious")]
        public async Task<IActionResult> GetAllSalaryAccountHeadPrevious(SearchSalaryAccountHeadPrevious search)
        {
            try
            {
                var response = await this.commonService.GetAllSalaryAccountHeadPrevious(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallattachmentdocumenttype")]
        public async Task<IActionResult> GetAllAttachmentDocumentType(SearchAttachmentDocumentType search)
        {
            try
            {
                var response = await this.commonService.GetAllAttachmentDocumentType(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallattachmentdocumentparticular")]
        public async Task<IActionResult> GetAllAttachmentDocumentParticular(SearchAttachmentDocumentParticular search)
        {
            try
            {
                var response = await this.commonService.GetAllAttachmentDocumentParticular(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallattachmentdocumentname")]
        public async Task<IActionResult> GetAllAttachmentDocumentName(SearchAttachmentDocumentName search)
        {
            try
            {
                var response = await this.commonService.GetAllAttachmentDocumentName(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getfilteredattachmentdocumentname")]
        public async Task<IActionResult> GetFilteredAttachmentDocumentName(SearchAttachmentDocumentName search)
        {
            try
            {
                var response = await this.commonService.GetFilteredAttachmentDocumentName(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //arg
        [HttpPost]
        [Route("getalldownloadpdfhandbook")]
        public async Task<IActionResult> GetAllDownloadPDFHandBook(SearchDownloadPDF search)
        {
            try
            {
                var response = await this.commonService.GetAllDownloadPDFHandBook(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallpdfattachment")]
        public async Task<IActionResult> GetAllAttachmentPDF(SearchPDFUpload search)
        {
            try
            {
                var response = await this.commonService.GetAllAttachmentPDF(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getrolewisedocument")]
        public async Task<IActionResult> GetRoleWiseDocument(RoleWiseDocumentInput search)
        {
            try
            {
                var response = await this.commonService.GetRoleWiseDocument(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallapprovallist")]
        public async Task<IActionResult> GetAllApprovalList(SearchApprovalList search)
        {
            try
            {
                var response = await this.commonService.GetAllApprovalList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalloccupationlist")]
        public async Task<IActionResult> GetAllOccupationList(SearchOccupation search)
        {
            try
            {
                var response = await this.commonService.GetAllOccupationList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalldoctorslist")]
        public async Task<IActionResult> GetAllDoctorsList(SearchDoctors search)
        {
            try
            {
                var response = await this.commonService.GetAllDoctorsList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //DoctorInsertUpdate
        [HttpPost]
        [Route("DoctorInsertUpdate")]
        public async Task<IActionResult> DoctorInsertUpdate(DoctorsInsertUpdateParam search)
        {
            try
            {
                var response = await this.commonService.DoctorInsertUpdate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallBatch")]
        public async Task<IActionResult> GetAllBatch(BatchParam search)
        {
            try
            {
                var response = await this.commonService.GetAllBatch(search).ConfigureAwait(false);
                return this.Ok(response);
            }
             catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallfatheroccupation")]
        public async Task<IActionResult> GetAllFatherOccupationList(SearchFatherOccupation search)
        {
            try
            {
                var response = await this.commonService.GetAllFatherOccupationList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("occupationinsertupdate")]
        public async Task<IActionResult> OccupationInsertUpdate(Occupation formData)
        {
            try
            {
                var response = await this.commonService.OcccupationInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("qulificationuniversityboardinsertupdate")]
        public async Task<IActionResult> QulificationUniversityBoardInsertUpdate(QulificationUniversityBoard formData)
        {
            try
            {
                var response = await this.commonService.QulificationUniversityBoardInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("religioninsertupdate")]
        public async Task<IActionResult> ReligionInsertUpdate(Religion formData)
        {
            try
            {
                var response = await this.commonService.ReligionInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("casteinsertupdate")]
        public async Task<IActionResult> CasteInsertUpdate(Caste formData)
        {
            try
            {
                var response = await this.commonService.CasteInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("externaltrainersinsertupdate")]
        public async Task<IActionResult> ExternalTrainersInsertUpdate(ExternalTrainer formData)
        {
            try
            {
                var response = await this.commonService.ExternalTrainersInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("countrylistinsertupdate")]
        public async Task<IActionResult> CountryListInsertUpdate(CountryList formData)
        {
            try
            {
                var response = await this.commonService.CountryListInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("relationshipinsertupdate")]
        public async Task<IActionResult> RelationshipInsertUpdate(RelationshipList formData)
        {
            try
            {
                var response = await this.commonService.RelationshipInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("familyrelationshipinsertupdate")]
        public async Task<IActionResult> FamilyRelationshipInsertUpdate(RelationshipList formData)
        {
            try
            {
                var response = await this.commonService.FamilyRelationshipInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("natioanalityinsertupdate")]
        public async Task<IActionResult> NatioanalityInsertUpdate(NationalityList formData)
        {
            try
            {
                var response = await this.commonService.NatioanalityInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertUpdateInductionMode
        [HttpPost]
        [Route("InsertUpdateInductionMode")]
        public async Task<IActionResult> InsertUpdateInductionMode(ModeOfInductionParam Param)
        {
            try
            {
                var response = await this.commonService.InsertUpdateInductionMode(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("attachmentdocumentTypeinsertupdate")]
        public async Task<IActionResult> AttachmentDocumentTypeInsertUpdate(AttachmentDocumentType formData)
        {
            try
            {
                var response = await this.commonService.AttachmentDocumentTypeInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllInductionMode
        [HttpPost]
        [Route("GetAllInductionMode")]
        public async Task<IActionResult> GetAllInductionMode(AllModeOfInductionParam Param)
        {
            try
            {
                var response = await this.commonService.GetAllInductionMode(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("attachmentdocumentparticularinsertupdate")]
        public async Task<IActionResult> AttachmentDocumentParticularInsertUpdate(AttachmentDocumentParticular formData)
        {
            try
            {
                var response = await this.commonService.AttachmentDocumentParticularInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //InsertUpdateInductionVenue
        [HttpPost]
        [Route("InsertUpdateInductionVenue")]
        public async Task<IActionResult> InsertUpdateInductionVenue(InductionVenueParam Param)
        {
            try
            {
                var response = await this.commonService.InsertUpdateInductionVenue(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("attachmentdocumentnameinsertupdate")]
        public async Task<IActionResult> AttachmentDocumentNameInsertUpdate(AttachmentDocumentNameDetails formData)
        {
            try
            {
                var response = await this.commonService.AttachmentDocumentNameInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("attachmentpdfinsertupdate")]
        public async Task<IActionResult> AttachmentPDFInsertUpdate(IFormCollection data)
        {
            try
            {
                ContainerReference = "pdfmaster";
                fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                var httpRequest = HttpContext.Request;
                string fileDocument = "";
                string NameFile = "";

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
                            NameFile = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            fileDocument = Path.Combine("/pdfmaster", fileName);
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

                UploadPDFList formData = new UploadPDFList();
                formData.PDFDocId = Convert.ToInt32(data["PDFDocId"]);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.AttachmentDocumentTypeId = Convert.ToInt32(data["AttachmentDocumentTypeId"]);
                formData.AttachmentDocumentParticularId = Convert.ToInt32(data["AttachmentDocumentParticularId"]);
                formData.AttachmentDocumentNameId = Convert.ToInt32(data["AttachmentDocumentNameId"]);
                formData.FileName = NameFile;
                formData.DocumentPath = fileDocument;
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.commonService.AttachmentPDFInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllInductionVenue
        [HttpPost]
        [Route("GetAllInductionVenue")]
        public async Task<IActionResult> GetAllInductionVenue(AllInductionVenueParam Param)
        {
            try
            {
                var response = await this.commonService.GetAllInductionVenue(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallonboardingmanager")]
        public async Task<IActionResult> GetAllOnBoardingManager(SearchOnBoardingManager search)
        {
            try
            {
                var response = await this.commonService.GetAllOnBoardingManager(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallonboardingcoordinator")]
        public async Task<IActionResult> GetAllOnBoardingCoOrdinator(SearchOnBoardingCoOrdinator search)
        {
            try
            {
                var response = await this.commonService.GetAllOnBoardingCoOrdinator(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallmenuaccess")]
        public async Task<IActionResult> GetAllMenuAccess(SearchMenuAccess search)
        {
            try
            {
                var response = await this.commonService.GetAllMenuAccess(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("menuaccessinsert")]
        public async Task<IActionResult> MenuAccessInsert(IFormCollection data)
        {
            try
            {
                InsertMenuaccesParam formData = new InsertMenuaccesParam();
                string MenuAccessInsert = data["MenuAccessInsert"];
                formData.MenuAccessInsert = JsonConvert.DeserializeObject<List<MenuAccessInsert>>(MenuAccessInsert);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                var response = await this.commonService.MenuAccessInsert(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalluserrole")]
        public async Task<IActionResult> GetAllUserRole(SearchUserRole search)
        {
            try
            {
                var response = await this.commonService.GetAllUserRole(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getuserrolehandholding")]
        public async Task<IActionResult> GetUserRoleHandHolding(SearchUserRole search)
        {
            try
            {
                var response = await this.commonService.GetUserRoleHandHolding(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getalluserwiserole")]
        public async Task<IActionResult> GetAllUserWiseRole(SearchUserRole search)
        {
            try
            {
                var response = await this.commonService.GetAllUserWiseRole(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getalluserwiserolewithautouserid")]
        public async Task<IActionResult> GetAllUserWiseRoleWithAutoUserId(SearchUserRole search)
        {
            try
            {
                var response = await this.commonService.GetAllUserWiseRoleWithAutoUserId(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("userroleinsert")]
        public async Task<IActionResult> UserRoleInsert(UserRoleSave formData)
        {
            try
            {
                var response = await this.commonService.UserRoleInsert(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallrolewiseuser")]
        public async Task<IActionResult> GetAllRolewiseUser(SearchRoleWiseUser search)
        {
            try
            {
                var response = await this.commonService.GetAllRolewiseUser(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallemployeeforsignature")]
        public async Task<IActionResult> GetAllEmployee(SearchEmployee search)
        {
            try
            {
                var response = await this.commonService.GetAllEmployeeForSign(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("insertupdatesignature")]
        public async Task<IActionResult> InsertUpdateSignature(IFormCollection data)
        {
            try
            {
                var httpRequest = HttpContext.Request;
                InsertUpdateSignatureData formData = new InsertUpdateSignatureData();
                ContainerReference = "signatureupload";
                if (Request.Form.Files.Count > 0)
                {
                    var file = Request.Form.Files[0];
                    string HostUrl = this.environment.ContentRootPath;

                    string fileDocument = "";
                    string NameFile = "";
                    
                    
                    var filePath = environment.ContentRootPath;

                    if (file.Length > 0)
                    {
                        var timestamp = DateTime.Now.ToFileTime();
                        string timestampfilename = Convert.ToString(timestamp);
                        fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", "");
                        NameFile = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        fileDocument = Path.Combine("/signatureupload", fileName);
                        fileDocument = fileDocument.Replace("\\", "/");
                        using (var memoryStream = new MemoryStream())
                        {
                            await file.CopyToAsync(memoryStream);
                            System.IO.File.WriteAllBytes(Path.Combine(filePath, fileName), memoryStream.ToArray());
                            await UploadToAzureAsync(file);
                        }

                    }
                    formData.Filename = fileDocument;
                }
                if (Request.Form.Files.Count== 0)
                {
                    formData.Filename = null;
                }

                formData.SignatureId = Convert.ToInt32(data["SignatureId"]);
                formData.EmployeeId = Convert.ToInt32(data["EmployeeId"]);
                formData.EmployeeNo = data["EmployeeNo"];
                formData.EmployeeName = data["EmployeeName"];
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.commonService.InsertUpdateSignature(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("getallsignature")]
        public async Task<IActionResult> GetAllSignature(SearchEmployeeForSign search)
        {
            try
            {
                var response = await this.commonService.GetEmployeeSignature(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



        [Route("getallrolewiseuserhandhold")]
        public async Task<IActionResult> GetAllRolewiseUserForHandHold(SearchRoleWiseUser search)
        {
            try
            {
                var response = await this.commonService.GetAllRolewiseUserForHandHold(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getrolelocationwiseuser")]
        public async Task<IActionResult> GetAllRoleLocationwiseUser(searchRoleLocationWiseUser search)
        {
            try
            {
                var response = await this.commonService.GetAllRoleLocationwiseUser(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallticbylocation")]
        public async Task<IActionResult> GetAllTicByLocation(SearchTicByLocation search)
        {
            try
            {
                var response = await this.commonService.GetAllTicByLocation(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallrolewiseuserreassigncandidate")]
        public async Task<IActionResult> GetAllRolewiseUserReassign(SearchRoleWiseUser search)
        {
            try
            {
                var response = await this.commonService.GetAllRolewiseUserReassign(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //[HttpPost]
        //[Route("downloadhtmlfile")]
        //public async Task<IActionResult> DownloadHTMLFile(DownloadHTMLFormData search)
        //{
        //    try
        //    {
        //        byte[] pdfBuffer = null;
        //        HtmlToPdf htmlToPdfConverter = new HtmlToPdf();
        //        htmlToPdfConverter.Document.PageOrientation = PdfPageOrientation.Portrait;
        //        htmlToPdfConverter.Document.Margins = new PdfMargins(10, 10, 10, 10);

        //        string finalOfferLetter = "<html><head></head><body>" + "Sanjib" + "</body</html>";

        //        pdfBuffer = htmlToPdfConverter.ConvertHtmlToMemory(finalOfferLetter, "");
        //        //string path = HostingEnvironment.MapPath("~/Files/GeneratedQAP/");
        //        //string filedata = Path.Combine(path + FileName);
        //        //System.IO.File.WriteAllBytes(filedata, pdfBuffer);
        //        string HostUrl = this.environment.ContentRootPath;
        //        string filepath = "UploadedFiles/OfferLetter";
        //        string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
        //        if (!Directory.Exists(uploadpath))
        //        {
        //            Directory.CreateDirectory(uploadpath);
        //        }
        //        string filedata = Path.Combine(uploadpath + "/" + "Sanjib" + ".pdf");
        //        System.IO.File.WriteAllBytes(filedata, pdfBuffer);
        //        return this.Ok("bytes");
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.InnerException);
        //    }
        //}

        [HttpGet]
        [Route("getallhiringstatus")]
        public async Task<IActionResult> GetAllHiringStatus()
        {
            try
            {
                var response = await this.commonService.GetAllHiringStatus().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("inductiontemplateinsert")]
        public async Task<IActionResult> InductionTemplateInsert(InductionTemplate formData)
        {
            try
            {
                var response = await this.commonService.InductionTemplateInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("trainingtittleinsertupdate")]
        public async Task<IActionResult> TrainingTittleInsertUpdate(TrainingTittleFormData formData)
        {
            try
            {
                var response = await this.commonService.TrainingTittleInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getalltrainingtittle")]
        public async Task<IActionResult> GetAllTrainingTittle(SearchTrainingtittle Param)
        {
            try
            {
                var response = await this.commonService.GetAllTrainingTittle(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallinductiontemplate")]
        public async Task<IActionResult> GetAllInductionTemplate(SearchInductionTemplate Param)
        {
            try
            {
                var response = await this.commonService.GetAllInductionTemplate(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
       
        [HttpPost]
        [Route("getallinductiontemplatedetails")]
        public async Task<IActionResult> GetAllInductionTemplateDetails(SearchInductionTemplate Param)
        {
            try
            {
                var response = await this.commonService.GetAllInductionTemplateDetails(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("uploademployeemaster")]
        public async Task<IActionResult> UploadEmployeeMaster(IFormCollection data)
        {
            
            try
            {

                //var file = Request.Form.Files[0];
                //if (file.FileName.EndsWith(".csv"))
                //{
                //    DataTable dt = new DataTable();
                //    using (var sreader = new StreamReader(file.OpenReadStream()))
                //    {
                //        string[] headers = sreader.ReadLine().Split(',');     //Title

                //        dt.Clear();
                //        dt.Columns.Add("EmployeeNo");
                //        dt.Columns.Add("EmployeeName");
                //        dt.Columns.Add("OrganizationalUnit");
                //        dt.Columns.Add("Position");
                //        dt.Columns.Add("EmployeeGroup");
                //        dt.Columns.Add("EmployeeSubGroup");
                //        dt.Columns.Add("PersonnelSubArea");
                //        dt.Columns.Add("CostCenterText");
                //        dt.Columns.Add("CostCenter");
                //        dt.Columns.Add("DOB");
                //        dt.Columns.Add("DOJ");
                //        dt.Columns.Add("DOR");
                //        dt.Columns.Add("EmailId");
                //        dt.Columns.Add("AdharNo");
                //        while (!sreader.EndOfStream)                          //get all the content in rows 
                //        {
                //            DataRow dr = dt.NewRow();
                //            string[] rows = sreader.ReadLine().Split(',');
                //            string EmployeeNo = rows[0].ToString();
                //            string EmployeeName = rows[1].ToString();
                //            string OrganizationalUnit = rows[2].ToString();
                //            string Position = rows[3].ToString();
                //            string EmployeeGroup = rows[4].ToString();
                //            string EmployeeSubGroup = rows[5].ToString();
                //            string PersonnelSubArea = rows[6].ToString();
                //            string CostCenterText = rows[7].ToString();
                //            string CostCenter = rows[8].ToString();
                //            string DOB = rows[9].ToString();
                //            string DOJ = rows[10].ToString();
                //            string DOR = rows[11].ToString();
                //            string EmailId = rows[12].ToString();
                //            string AdharNo = rows[13].ToString();
                //            dr["EmployeeNo"] = EmployeeNo;
                //            dr["EmployeeName"] = EmployeeName;
                //            dr["OrganizationalUnit"] = OrganizationalUnit;
                //            dr["Position"] = Position;
                //            dr["EmployeeGroup"] = EmployeeGroup;
                //            dr["EmployeeSubGroup"] = EmployeeSubGroup;
                //            dr["PersonnelSubArea"] = PersonnelSubArea;
                //            dr["CostCenterText"] = CostCenterText;
                //            dr["CostCenter"] = CostCenter;
                //            dr["DOB"] = DOB;
                //            dr["DOJ"] = DOJ;
                //            dr["DOR"] = DOR;
                //            dr["EmailId"] = EmailId;
                //            dr["AdharNo"] = AdharNo;
                //            dt.Rows.Add(dr);
                //        }
                //    }
                var file = Request.Form.Files[0];
                if (file.FileName.EndsWith(".xlsx"))
                {
                    DataTable result = new DataTable();
                    
                    newfilepath = Path.Combine(this.environment.ContentRootPath, @"wwwroot\UploadedFiles", file.FileName);

                    using (var isteeam = System.IO.File.Create(newfilepath)) {
                        await file.CopyToAsync(isteeam);
                    }

                    using (var stream = System.IO.File.Open(newfilepath, FileMode.Open, FileAccess.Read))
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            var value = reader.AsDataSet();
                            result = value.Tables[0];
                            result.Columns[0].ColumnName = "EmployeeNo";
                            result.Columns[1].ColumnName = "EmployeeName";
                            result.Columns[2].ColumnName = "OrganizationalUnit";
                            result.Columns[3].ColumnName = "Position";
                            result.Columns[4].ColumnName = "EmployeeGroup";
                            result.Columns[5].ColumnName = "EmployeeSubGroup";
                            result.Columns[6].ColumnName = "PersonnelSubArea";
                            result.Columns[7].ColumnName = "CostCenterText";
                            result.Columns[8].ColumnName = "CostCenter";
                            result.Columns[9].ColumnName = "DOB";
                            result.Columns[10].ColumnName = "DOJ";
                            result.Columns[11].ColumnName = "DOR";
                            result.Columns[12].ColumnName = "EmailId";
                            result.Columns[13].ColumnName = "AdharNo";
                            result.Rows[0].Delete();
                            result.AcceptChanges();

                        }
                            //}
                        }
                    if (newfilepath != null)
                    {
                        System.IO.File.Delete(newfilepath);
                    }

                    var response = await this.commonService.UploadEmployeeMaster(result).ConfigureAwait(false);

                    return this.Ok(response);
                }
                
                else
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError, "Please Upload a Excel file.");
                }
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
            finally
            {
                if(newfilepath != null)
                {
                    System.IO.File.Delete(newfilepath);
                }
            }
        }

        [HttpPost]
        [Route("getalluserrolemenuaccess")]
        public async Task<IActionResult> GetAllUserMenuAccess(SearchMenuAccess search)
        {
            try
            {
                var response = await this.commonService.GetAllUserMenuAccess(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getstatelist")]
        public async Task<IActionResult> StateGetAll(SearchState search)
        {
            try
            {
                var response = await this.commonService.StateGetAll(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getstatelistbycountry")]
        public async Task<IActionResult> StateGetAllByCountry(SearchStateByCountry search)
        {
            try
            {
                var response = await this.commonService.StateGetAllByCountry(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcountrystatelocationmap")]
        public async Task<IActionResult> CountryStateLocationGet(CountryStateLocationMappingGetFormData search)
        {
            try
            {
                var response = await this.commonService.CountryStateLocationGet(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //DoctorInsertUpdate
        [HttpPost]
        [Route("addstate")]
        public async Task<IActionResult> StateInsertUpdate(StateFormData formdata)
        {
            try
            {
                var response = await this.commonService.StateInsertUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("addcountrystatelocationmap")]
        public async Task<IActionResult>CountryStateLocationInsertUpdate(CountryStateLocationMapping formdata)
        {
            try
            {
                var response = await this.commonService.CountryStateLocationInsertUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("gethiringstatus")]
        public async Task<IActionResult> GetHiringStatus(SearchHiringStatus search)
        {
            try
            {
                var response = await this.commonService.GetHiringStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        private async Task UploadToAzureAsync(IFormFile file)
        {
            var cloudStorageAccountname = this.statusService.CloudStorageAccountname();
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
        [Route("insertupdateRoleWiseUsrVertFunc")]
        public async Task<IActionResult> InsertupdateRoleWiseUsrVertFunc(InsertupdateRoleWiseUsrVertData formData)
        {
            try
            {
                var response = await this.commonService.InsertupdateRoleWiseUsrVertFunc(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("insertupdateRoleWiseUsrLoctFunc")]
        public async Task<IActionResult> InsertupdateRoleWiseUsrLoctFunc(InsertupdateRoleWiseUsrLocData formData)
        {
            try
            {
                var response = await this.commonService.InsertupdateRoleWiseUsrLoctFunc(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("updateDocumentRole")]
        public async Task<IActionResult> UpdateDocumentRole(UpdateDocumentrole formData)
        {
            try
            {
                var response = await this.commonService.UpdateDocumentRole(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("getallclaimstatus")]
        public async Task<IActionResult> GetAllClaimStatus(SearchClaimStatus search)
        {
            try
            {
                var response = await this.commonService.GetAllClaimStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("getalllocationwisearea")]
        public async Task<IActionResult> GetAllArea(searcharea search)
        {
            try
            {
                var response = await this.commonService.GetAllArea(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getfunctionwiselocation")]
        public async Task<IActionResult> GetFunctionWiseLocation(GetLocationFunctionSearch search)
        {
            try
            {
                var response = await this.commonService.GetFunctionWiseLocation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getRoleWiseUsrVertFunc")]
        public async Task<IActionResult> GetRoleWiseUsrVertFunc(SearchAllUserWiseRoleVerticalFunc param)
        {
            try
            {
                var response = await this.commonService.getRoleWiseUsrVertFunc(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getRoleWiseUsrLocaFunc")]
        public async Task<IActionResult> GetRoleWiseUsrLocaFunc(SearchAllUserWiseRoleLocationFunc param)
        {
            try
            {
                var response = await this.commonService.GetRoleWiseUsrLocaFunc(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [Route("insertupdatecostcentermap")] //added by Amartya
        public async Task<IActionResult> InsertupdateCostCenterMap(CostCenterData formData)
        {
            try
            {
                var response = await this.commonService.InsertUpdateCostCenter(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcostcenterdata")]//added by Amartya
        public async Task<IActionResult> GetCostCenterData(SearchCostCenterData param)
        {
            try
            {
                var response = await this.commonService.GetCostCenterGridData(param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getbatchwisecandidate")]
        public async Task<IActionResult> GetBatchWiseCandidateList(SearchBatchWiseCandidate Param)
        {
            try
            {
                var response = await this.commonService.GetBatchWiseCandidateList(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getdashboardValuesOfRm")]
        public async Task<IActionResult> GetdashboardValuesOfRm(SearchDashBoard Param)
        {
            try
            {
                var response = await this.commonService.GetdashboardValuesOfRm(Param).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallflexireportheader")]
        public async Task<IActionResult> GetAllFlexiReportHeader(SearchFlexiReportList search)
        {
            try
            {
                var response = await this.commonService.GetAllFlexiReportHeader(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("addflexireportheader")]
        public async Task<IActionResult> FlexiReportHeaderInsertUpdate(FlexiReport formData)
        {
            try
            {
                var response = await this.commonService.FlexiReportHeaderInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getAllEmployeeData")]
        public async Task<IActionResult> GetAllEmployeeData(string ApiKey)
        {
            try
            {
                if(ApiKey == "eyJzdWIiOiJKV1RTZXJ2aWN%lQWNjZXNzVG9BOKrZWA4iLCJqCHdGkiOdAiI1MDM1NzE5OC1jYzgzLTQ5MTAtODI0Ny")
                {
                    var response = await this.commonService.GetAllEmployeeData().ConfigureAwait(false);

                    return this.Ok(response);
                }
                else
                {
                    return this.StatusCode(StatusCodes.Status200OK, "You are unauthorized !");
                }
                
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Ankita
        [HttpPost]
        [Route("CandidateOnboardingEmailStatus")]
        public async Task<IActionResult> CandidateOnboardingEmailStatus(CandidateOnboardingEmailStatusInput search)
        {
            try
            {
                var response = await this.commonService.CandidateOnboardingEmailStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllEmailTypeToSendMail")]
        public async Task<IActionResult> GetAllEmailTypeToSendMail()
        {
            try
            {
                var response = await this.commonService.GetAllEmailTypeToSendMail().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("GetAllEmailsByTypeID")]
        public async Task<IActionResult> GetAllEmailsByTypeID(GetEmailList getEmailList)
        {
            try
            {
                var response = await this.commonService.GetAllEmailsByTypeID(getEmailList).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("SendMailForSelectedItems")]
        public void SendMailForSelectedItems(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                this.commonService.SendMailForSelectedItems(allEmails);

                
            }
            catch (Exception ex)
            {
                this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("SendMailForUpdatedSchedule")]
        public void SendMailForUpdatedSchedule(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                this.commonService.SendMailForUpdatedSchedule(allEmails);


            }
            catch (Exception ex)
            {
                this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("ShareWithCandidateSendMail")]
        public void ShareWithCandidateSendMail(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                this.commonService.ShareWithCandidateSendMail(allEmails);


            }
            catch (Exception ex)
            {
                this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("BookAccommodationEmail")]
        public void BookAccommodationEmail(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                this.commonService.BookAccommodationEmail(allEmails);


            }
            catch (Exception ex)
            {
                this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("SendEmailNaukriCandidates")]
        public void SendEmailNaukriCandidates(List<AllEmailAndDetails> allEmails)
        {
            try
            {
                this.commonService.SendEmailNaukriCandidates(allEmails);


            }
            catch (Exception ex)
            {
                this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
