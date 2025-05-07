using Application.Entity.Entities.CampusModule;
using Application.Service.Services.Interfaces.CampusModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Application.WebApp.Areas.CampusModule.Controllers
{
    [Route("api/campusrequisition")]
    [ApiController]
    public class CampusRequisitionController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICampusRequisitionService campusRequisitionService;
        public CampusRequisitionController(ICampusRequisitionService campusRequisitionService, IWebHostEnvironment environment)
        {
            this.campusRequisitionService = campusRequisitionService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("createcampusrequisition")]
        public async Task<IActionResult> CreateCampusRequisition(CampusRequisitionFormData formData)
        {
            try
            {
                formData.RequisitionData = JsonConvert.DeserializeObject<List<CampusRequisitionDataObject>>(formData.CampusRequisitionData);
                var response = await this.campusRequisitionService.CampusRequisitionInsert(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("createoffcampusrequisition")]
        public async Task<IActionResult> CreateOffCampusRequisition(CampusRequisitionFormData formData)
        {
            try
            {
                formData.RequisitionData = JsonConvert.DeserializeObject<List<CampusRequisitionDataObject>>(formData.CampusRequisitionData);
                var response = await this.campusRequisitionService.OffCampusRequisitionInsert(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcampusrequisition")]
        public async Task<IActionResult> GetAllRequisitionList(SearchCampusRequisitionList search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllCampusRequisitionList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallOFFcampusrequisition")]
        public async Task<IActionResult> GetAllOffRequisitionList(SearchCampusRequisitionList search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllOffCampusRequisitionList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcampuslink")]
        public async Task<IActionResult> GetAllCampusLink(SaerchCampusLink search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllCampusLink(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("createcampuslink")]
        public async Task<IActionResult> CampusLinkInsert(CampusLinkFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusLinkInsert(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatecampuslink")]
        public async Task<IActionResult> CampusLinkUpdate(UpdateCampusLinkTemplate formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusLinkUpdate(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("sharecampuslinktocollege")]
        public async Task<IActionResult> CampusCollegeLinkInsert(CampusCollegeLinkFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusCollegeLinkInsert(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallsharedcampuslinktocollege")]
        public async Task<IActionResult> GetAllSharedCollegeCampusLink(SearchCampusCollegeLinklSharedList search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllSharedCollegeCampusLink(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampusrequisitiontitle")]
        public async Task<IActionResult> GetAllRequisitionTitleList(SearchCampusRequisitionTitle search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllCampusRequisitionTitleList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampuscandidatelist")]
        public async Task<IActionResult> GetCampusCandidateList(SearchCampusCandidateDetail search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusCandidateList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampushiringstatus")]
        public async Task<IActionResult> GetCampusHiringStatus(SearchCampusStatus search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusHiringStatus(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatecampushiringstatus")]
        public async Task<IActionResult> UpdateCampusCandidateHiringStatus(CampusCandidateHiringStatusFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.UpdateCampusCandidateHiringStatus(formdata).ConfigureAwait(false);
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
                        dt.Columns.Add("CampusLinkId");
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
                            long CampusLinkId = Convert.ToInt32(data["CampusLinkId"]);
                            long CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                            dr["CampusLinkId"] = CampusLinkId;
                            dr["AttemptId"] = AttemptId;
                            dr["TestPin"] = TestPin;
                            dr["CandidateId"] = 0;
                            dr["AadharNo"] = AadharNo;
                            dr["EmailId"] = EmailId;
                            dr["CandidateName"] = CandidateName;
                            dr["TestCompletionDate"] = TestCompletionDate;
                            dr["ScoreObtained"] = Convert.ToDecimal(ScoreObtained);
                            dr["Apptitude"] = Convert.ToDecimal(Apptitude);
                            dr["ReadingExercise"] = Convert.ToDecimal(ReadingExercise);
                            dr["WrittenExercise"] = Convert.ToDecimal(WrittenExercise);
                            dr["Technical"] = Convert.ToDecimal(Technical);
                            dr["TestResult"] = TestResult;
                            dr["CreatedBy"] = CreatedBy;
                            dt.Rows.Add(dr);
                        }
                    }

                    var response = await this.campusRequisitionService.UploadCampusTestResult(dt).ConfigureAwait(false);

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
        [Route("getcampustestresult")]
        public async Task<IActionResult> GetCampusTestReult(SearchCampusTestResult formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusTestReult(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("createcampustestschedule")]
        public async Task<IActionResult> CreateCampusTestSchedule(CampusTestScheduleFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusTestScheduleInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("createPreplacemetSchedule")]
        public async Task<IActionResult> CreatePreplacemetSchedule(CampusTalkScheduleFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusTalkScheduleInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampustestscheduledetail")]
        public async Task<IActionResult> GetCampusTestScheduleDetail(SearchCampusTestScheduleDetail formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusTestScheduleDetail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getinterviewscheduledetailforcandidate")]
        public async Task<IActionResult> GetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.GetInterviewScheduleDetailForCandidate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("campusgetinterviewscheduledetailforcandidate")]
        public async Task<IActionResult> CampusGetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusGetInterviewScheduleDetailForCandidate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampustestscheduledetail")]
        public async Task<IActionResult> CampusTestScheduleDetailGetAll(SearchCampusTestScheduleDetailForGetAll formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusTestScheduleDetailGetAll(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallcampustalkscheduledetail")]
        public async Task<IActionResult> CampusTalkScheduleDetailGetAll(SearchCampusTalkScheduleDetailForGetAll formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusTalkScheduleDetailGetAll(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //arg

        [HttpPost]
        [Route("createcampusinterviewschedule")]
        public async Task<IActionResult> CampusInterviewScheduleInsert(CampusInterviewScheduleFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusInterviewScheduleInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusinterviewscheduledetail")]
        public async Task<IActionResult> GetInterviewScheduleDetail(SearchCampusInterviewScheduleDetail formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.GetInterviewScheduleDetail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampuscandidateverticalfunction")]
        public async Task<IActionResult> GetCampusCandidateVerticalFunction(SearchCampusVerticalFunction search)
        {
            try
            {
                CampusCandidateVerticalFunction dataList = new CampusCandidateVerticalFunction();
                dataList = await this.campusRequisitionService.GetCampusCandidateVerticalFunction(search).ConfigureAwait(false);

                return this.Ok(dataList);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatecampuscandidateverticalfunction")]
        public async Task<IActionResult> CampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusCandidateVerticalFunctionUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateoffcampuscandidateverticalfunction")]
        public async Task<IActionResult> OffCampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.OffCampusCandidateVerticalFunctionUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("mapcampuscandidaterequisition")]
        public async Task<IActionResult> CampusCandidateRequisitionMap(CampusCandidateRequistionMapFormData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusCandidateRequisitionMap(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusverticalfunctionrequisition")]
        public async Task<IActionResult> GetCampusRequisitionMapList(SearchCampusRequisitionMap search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusRequisitionMapList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallrequisitionlistforcampusrequisitionmap")]
        public async Task<IActionResult> GetAllRequisitionForCampusRequisitionMap(SearchRequisitionListForCampusMap search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllRequisitionForCampusRequisitionMap(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampusrequisitiondata")]
        public async Task<IActionResult> GetCampusRequisitionData(SearchCampusRequisitionData search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusRequisitionData(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatecampusrequisitiondata")]
        public async Task<IActionResult> CampusRequisitionUpdate(CampusRequisitionUpdateFormData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusRequisitionUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusrequisitionprofiledata")]
        public async Task<IActionResult> GetCampusCandidateProfileDetailData(SearchCampusCandidateProfile search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusCandidateProfileDetailData(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusregistrationdetails")]
        public async Task<IActionResult> GetCampusRegistrationDetails(SearchCampusCandidateProfile search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusRegistrationDetails(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusregistrationremarks")]
        public async Task<IActionResult> GetCampusRegistrationRemarks(SearchCampusCandidateRemarks search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusRegistrationRemarks(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("enabledisablecampuslink")]
        public async Task<IActionResult> EnableDisableCampusLink(EnableDisableCampusLinkFormData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.EnableDisableCampusLink(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updatecampuscandidateinstitute")]
        public async Task<IActionResult> UpdateCampusCandidateInstitute(UpdateInstituteFormData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.UpdateCampusCandidateInstitute(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("updatecampuscandidateprofile")]
        public async Task<IActionResult> Updatecampuscandidateprofile(UpdateCampusProfileData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.UpdateCampusCandidateProfile(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("updatecandidaterejectdecline")]
        public async Task<IActionResult> InsertCandidateRejectDecline(RejectDeclineData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CandidateRejectDecline(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("updatecandidateacknowledged")]
        public async Task<IActionResult> InsertCandidateAcknowledged(AcknowledgedData formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CandidateAcknowledged(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("cancelpreplacementtalk")]
        public async Task<IActionResult> CancelPrePlacementtalk(Cancelplacement formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CancelPrePlacementtalk(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("canceltestschedule")]
        public async Task<IActionResult> CancelTestSchedule(Cancelplacement formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CancelTestSchedule(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("cancelinterview")]
        public async Task<IActionResult> CancelInterview(Cancelplacement formData)
        {
            try
            {
                var response = await this.campusRequisitionService.CancelInterview(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatedetailsforstagegate")]
        public async Task<IActionResult> GetCampusCandidateData(SearchCampusCandidateProfile search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetCampusCandidateData(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        } //CampusRequisitionController.cs

        [HttpPost]
        [Route("getstagegateassesmentcomp")]
        public async Task<IActionResult> Getstagegateassesmentcomp(SearchCampusCandidateProfile search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetStageGetAssesmentComponent(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("viewcanidatelistbyrequisition")]
        public async Task<IActionResult> ViewCanidateListByRequisition(SearchCandiateByReq search)
        {
            try
            {
                var response = await this.campusRequisitionService.ViewCanidateListByRequisition(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateselectioncomunication")]
        public async Task<IActionResult> UpdateSelectionComunication(SelectionComunicationIns search)
        {
            try
            {
                var response = await this.campusRequisitionService.UpdateSelectionComunication(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("candidatewisseelectiondata")]
        public async Task<IActionResult> CandidateWiseSelectionData(CandidateWiseSelectionSearach search)
        {
            try
            {
                var response = await this.campusRequisitionService.CandidateWiseSelectionData(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("campusCandidateAcknowledgeMent")]
        public async Task<IActionResult> CampusCandidateAcknowledgeMent(CampusCandidateSelectionAcknowledgeData search)
        {
            try
            {
                var response = await this.campusRequisitionService.CampusCandidateAcknowledgeMent(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalloffcampuslink")]
        public async Task<IActionResult> GetAllOffCampusLink(SaerchCampusLink search)
        {
            try
            {
                var response = await this.campusRequisitionService.GetAllOffCampusLink(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("createoffcampuslink")]
        public async Task<IActionResult> OffCampusLinkInsert(CampusLinkFormData formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.OffCampusLinkInsert(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("insertupdatemaprequistion")]
        public async Task<IActionResult> InsertUpdateMapRequistion(MapRequistionDeatils formdata)
        {
            try
            {
                var response = await this.campusRequisitionService.InsertUpdateMapRequistion(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
