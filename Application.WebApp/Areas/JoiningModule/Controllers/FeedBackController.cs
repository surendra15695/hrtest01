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

namespace Application.WebApp.Areas.JoiningModule.Controllers
{
    [Route("api/feedback")]
    [ApiController]
    public class FeedBackController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IFeedBackService feedbackSservice;
        public FeedBackController(IFeedBackService feedbackSservice, IWebHostEnvironment environment)
        {
            this.feedbackSservice = feedbackSservice;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getfeedbackquestiontype")]
        public async Task<IActionResult> GetFeedbackQuestionType(FeedbackQuestionTypeSearch search)
        {
            try
            {
                var response = await this.feedbackSservice.GetFeedbackQuestionType(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getfeedbackquestionoption")]
        public async Task<IActionResult> GetFeedBackQuestionOption(FeedBackQuestionOptionSearch search)
        {
            try
            {
                var response = await this.feedbackSservice.GetFeedBackQuestionOption(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// getfeedbacklist
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("getfeedbacklist")]
        public async Task<IActionResult> GetFeedBackList(FeedBackListSearch search)
        {
            try
            {
                var response = await this.feedbackSservice.GetFeedBackList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// getfeedbackdata
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("getfeedbackdata")]
        public async Task<IActionResult> GetFeedBackData(FeedBackSearch search)
        {
            try
            {
                var response = await this.feedbackSservice.GetFeedBackData(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// feedbacksave
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("feedbacksave")]
        public async Task<IActionResult> FeedBackSave(IFormCollection data)
        {
            try
            {
                FeedBackSave formData = new FeedBackSave();
                formData.FeedBackId = Convert.ToInt32(data["FeedBackId"]);
                formData.FeedBackName = data["FeedBackName"];
                formData.FeedBackTypeId = Convert.ToInt32(data["FeedBackTypeId"]);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);

                string FeedbackQuestionData = data["FeedbackQuestionData"];
                formData.FeedBackQuestionData = JsonConvert.DeserializeObject<List<FeedBackQuestionData>>(FeedbackQuestionData);


                var response = await this.feedbackSservice.FeedBackSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// feedbackassignsave
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("feedbackassignsave")]
        public async Task<IActionResult> FeedBackAssignSave(FeedBackAssignSave formData)
        {
            try
            {
                var response = await this.feedbackSservice.FeedBackAssignSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// feedbackschedulesave - Controller
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("feedbackschedulegetall")]
        public async Task<IActionResult> FeedBackScheduleGetAll(FeedBackScheduleSearch search)
        {
            try
            {
                var response = await this.feedbackSservice.GetFeedBackScheduleData(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        /// <summary>
        /// feedbackschedulesave - Controller
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("deletefeedback")]
        public async Task<IActionResult> DeleteFeedBackData(FeedBackScheduleSearch search)
        {
            try
            {
                var response = await this.feedbackSservice.DeleteFeedBackData(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        /// <summary>
        /// feedbackschedulesave - Controller
        /// </summary>
        /// <param name="formData"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("feedbackschedulesave")]
        public async Task<IActionResult> FeedBackScheduleSave(FeedBackScheduleSave formData)
        {
            try
            {
                var response = await this.feedbackSservice.FeedBackScheduleSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// getcandidatefeedbackdata
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("getcandidatefeedbackdata")]
        public async Task<IActionResult> GetCandidateFeedBackData(CandidateFeedBackSearch search)
        {
            try
            {
                CandidateFeedBack CandidateFeedBack = new CandidateFeedBack();
                CandidateFeedBack = await this.feedbackSservice.GetCandidateFeedBackData(search).ConfigureAwait(false);

                CandidateFeedBackMasterData CandidateFeedBackMasterData = new CandidateFeedBackMasterData();
                if (CandidateFeedBack.CandidateFeedBackMaster != null)
                {
                    CandidateFeedBackMasterData.RequisitionDetailId = CandidateFeedBack.CandidateFeedBackMaster.RequisitionDetailId;
                    CandidateFeedBackMasterData.CandidateId = CandidateFeedBack.CandidateFeedBackMaster.CandidateId;
                    CandidateFeedBackMasterData.CandidateNo = CandidateFeedBack.CandidateFeedBackMaster.CandidateNo;
                    CandidateFeedBackMasterData.EmpId = CandidateFeedBack.CandidateFeedBackMaster.EmpId;
                    CandidateFeedBackMasterData.EmpNo = CandidateFeedBack.CandidateFeedBackMaster.EmpNo;
                    CandidateFeedBackMasterData.EmployeeStatusId = CandidateFeedBack.CandidateFeedBackMaster.EmployeeStatusId;
                    CandidateFeedBackMasterData.EmployeeStatusName = CandidateFeedBack.CandidateFeedBackMaster.EmployeeStatusName;
                    CandidateFeedBackMasterData.CandidateFullName = CandidateFeedBack.CandidateFeedBackMaster.CandidateFullName;
                    CandidateFeedBackMasterData.EmailId = CandidateFeedBack.CandidateFeedBackMaster.EmailId;
                    CandidateFeedBackMasterData.ContactNo = CandidateFeedBack.CandidateFeedBackMaster.ContactNo;
                    CandidateFeedBackMasterData.BatchId = CandidateFeedBack.CandidateFeedBackMaster.BatchId;
                    CandidateFeedBackMasterData.BatchNo = CandidateFeedBack.CandidateFeedBackMaster.BatchNo;
                    CandidateFeedBackMasterData.DateofJoining = CandidateFeedBack.CandidateFeedBackMaster.DateofJoining;
                    CandidateFeedBackMasterData.VerticalId = CandidateFeedBack.CandidateFeedBackMaster.VerticalId;
                    CandidateFeedBackMasterData.VerticalName = CandidateFeedBack.CandidateFeedBackMaster.VerticalName;
                    CandidateFeedBackMasterData.Designation = CandidateFeedBack.CandidateFeedBackMaster.Designation;
                    CandidateFeedBackMasterData.DesignationName = CandidateFeedBack.CandidateFeedBackMaster.DesignationName;
                    CandidateFeedBackMasterData.FunctionId = CandidateFeedBack.CandidateFeedBackMaster.FunctionId;
                    CandidateFeedBackMasterData.FunctionName = CandidateFeedBack.CandidateFeedBackMaster.FunctionName;
                    CandidateFeedBackMasterData.DepartmentId = CandidateFeedBack.CandidateFeedBackMaster.DepartmentId;
                    CandidateFeedBackMasterData.DepartmentName = CandidateFeedBack.CandidateFeedBackMaster.DepartmentName;
                    CandidateFeedBackMasterData.LocationId = CandidateFeedBack.CandidateFeedBackMaster.LocationId;
                    CandidateFeedBackMasterData.LocationName = CandidateFeedBack.CandidateFeedBackMaster.LocationName;
                    CandidateFeedBackMasterData.GradeId = CandidateFeedBack.CandidateFeedBackMaster.GradeId;
                    CandidateFeedBackMasterData.GradeName = CandidateFeedBack.CandidateFeedBackMaster.GradeName;
                    CandidateFeedBackMasterData.TotalScore = CandidateFeedBack.CandidateFeedBackMaster.TotalScore;

                    CandidateFeedBackMasterData.CandidateFeedBackDetails = CandidateFeedBack.CandidateFeedBackDetails.ToList();

                }
                return this.Ok(CandidateFeedBackMasterData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// getfeedbackdatacandidate
        /// </summary>
        /// <param name="search"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("getfeedbackdatacandidate")]
        public async Task<IActionResult> GetFeedBackDataCandidate(FeedBackSearchCandidate search)
        {
            try
            {
                FeedBackCandidate FeedBackCandidate = new FeedBackCandidate();
                FeedBackCandidate = await this.feedbackSservice.GetFeedBackDataCandidate(search).ConfigureAwait(false);

                List<OnboardingCandidateInductionFeedback> FeedBackShowDataCandidate = new List<OnboardingCandidateInductionFeedback>();
                

                if (FeedBackCandidate.FeedBackMasterDataCandidate != null)
                {
                    foreach (var data in FeedBackCandidate.FeedBackMasterDataCandidate)
                    {
                        ViewFeedBackCandidate feedback = new ViewFeedBackCandidate();
                        OnboardingCandidateInductionFeedback FeedBackShowData = new OnboardingCandidateInductionFeedback();
                        feedback.FeedBackId = data.FeedBackId;
                        feedback.FeedBackName = data.FeedBackName;
                        feedback.CandidateInductionScheduleDetailsId = data.CandidateInductionScheduleDetailsId;
                        feedback.CandidateFeedBackId = data.CandidateFeedBackId;
                        feedback.CandidateId = data.CandidateId;
                        feedback.RequisitionDetailId = data.RequisitionDetailId;
                        feedback.CreatedBy = data.CreatedBy;
                        feedback.TrainingTitle = data.TrainingTitle;
                        feedback.FeedBackAvg = data.FeedBackAvg;
                        feedback.FeedBackQuestionDataDetailsCandidate = FeedBackCandidate.FeedBackQuestionDataDetailsCandidate.ToList().Where(x => x.CandidateInductionScheduleDetailsId == data.CandidateInductionScheduleDetailsId).ToList();
                        FeedBackShowData.FeedbackData = feedback;
                        FeedBackShowDataCandidate.Add(FeedBackShowData);
                    }

              
                    //foreach (var data in FeedBackShowDataCandidate.AssessmentQuestionDataDetailsCandidate)
                    //{
                    //    data.AssessmentQuestionAnswerOptionCandidate = AssessmentCandidate.AssessmentQuestionAnswerOptionCandidate.Where(x => x.AssessmentQuestionId == data.AssessmentQuestionId).ToList();
                    //}
                }
                return this.Ok(FeedBackShowDataCandidate);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// feedbacksavecandidate
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("feedbacksavecandidate")]
        public async Task<IActionResult> FeedBackSaveCandidate(IFormCollection data)
        {
            try
            {
                FeedBackSaveCandidate formData = new FeedBackSaveCandidate();
                formData.CandidateFeedBackId = Convert.ToInt32(data["CandidateFeedBackId"]);
                formData.FeedBackId = Convert.ToInt32(data["FeedBackId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.CandidateInductionScheduleDetailsId = Convert.ToInt32(data["CandidateInductionScheduleDetailsId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                string FeedBackQuestionAnswerDataCandidate = data["FeedBackQuestionAnswerDataCandidate"];
                formData.FeedBackQuestionAnswerDataCandidate = JsonConvert.DeserializeObject<List<FeedBackQuestionAnswerDataCandidate>>(FeedBackQuestionAnswerDataCandidate);
                //string AssessmentQuestionAnswerOptionCandidate = data["AssessmentQuestionAnswerOptionCandidate"];
                //formData.AssessmentQuestionAnswerOptionCandidate = JsonConvert.DeserializeObject<List<AssessmentQuestionAnswerOptionCandidate>>(AssessmentQuestionAnswerOptionCandidate);


                var response = await this.feedbackSservice.FeedBackSaveCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidatewisefeedbackdata")]
        public async Task<IActionResult> GetCandidateWiseFeedBackData(CandidateFeedBackSearch search)
        {
            try
            {
                CandidateFeedbackOverallData FeedBackCandidate = new CandidateFeedbackOverallData();
                FeedBackCandidate = await this.feedbackSservice.GetCandidateWiseFeedBackData(search).ConfigureAwait(false);

                CandidateWiseFeedbackData FeedBackCandidateData = new CandidateWiseFeedbackData();
                if (FeedBackCandidate.CandidateData != null)
                {
                    FeedBackCandidateData.CandidateId = FeedBackCandidate.CandidateData.CandidateId;
                    FeedBackCandidateData.FullName = FeedBackCandidate.CandidateData.FullName;
                    FeedBackCandidateData.EmpNo = FeedBackCandidate.CandidateData.EmpNo;
                    FeedBackCandidateData.DateOfJoining = FeedBackCandidate.CandidateData.DateOfJoining;
                    FeedBackCandidateData.BatchId = FeedBackCandidate.CandidateData.BatchId;
                    FeedBackCandidateData.BatchNo = FeedBackCandidate.CandidateData.BatchNo;
                    FeedBackCandidateData.DesignationName = FeedBackCandidate.CandidateData.DesignationName;
                    FeedBackCandidateData.GradeName = FeedBackCandidate.CandidateData.GradeName;
                    FeedBackCandidateData.FunctionName = FeedBackCandidate.CandidateData.FunctionName;
                    FeedBackCandidateData.DepartmentName = FeedBackCandidate.CandidateData.DepartmentName;
                    FeedBackCandidateData.PostingLocationName = FeedBackCandidate.CandidateData.PostingLocationName;
                    FeedBackCandidateData.CandidateDetailData = FeedBackCandidate.CandidateDetailData.ToList();
                }
                return this.Ok(FeedBackCandidateData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidatefeedbackreleaselistfornewjoiner")]
        public async Task<IActionResult> CandidateFeedbackReleaseListForNewJoiner(NewJoinerFeedbackListInput search)
        {
            try
            {
                var response = await this.feedbackSservice.CandidateFeedbackReleaseListForNewJoiner(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
