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
    [Route("api/assessment")]
    [ApiController]
    public class AssessmentController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IAssessmentService assessmentservice;
        public AssessmentController(IAssessmentService assessmentservice, IWebHostEnvironment environment)
        {
            this.assessmentservice = assessmentservice;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getassessmenttype")]
        public async Task<IActionResult> GetAssessmentType(AssessmentTypeSearch search)
        {
            try
            {
                var response = await this.assessmentservice.GetAssessmentType(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("saveassessmenttype")]
        public async Task<IActionResult> SaveAssessmentType(AssessmentType formData)
        {
            try
            {
                var response = await this.assessmentservice.SaveAssessmentType(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getassessmentquestiontypeall")]
        public async Task<IActionResult> GetAssessmentQuestionTypeAll(AssessmentQuestionTypeSearch search)
        {
            try
            {
                var response = await this.assessmentservice.GetAssessmentQuestionTypeAll(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getassessmentlist")]
        public async Task<IActionResult> GetAssessmentList(AssessmentListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.GetAssessmentList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getassessmentdata")]
        public async Task<IActionResult> GetAssessmentData(AssessmentSearch search)
        {
            try
            {
                Assessment Assessment = new Assessment();
                Assessment = await this.assessmentservice.GetAssessmentData(search).ConfigureAwait(false);

                AssessmentShowData AssessmentShowData = new AssessmentShowData();
                if (Assessment.AssessmentMasterData != null)
                {
                    AssessmentShowData.AssessmentId = Assessment.AssessmentMasterData.AssessmentId;
                    AssessmentShowData.AssessmentName = Assessment.AssessmentMasterData.AssessmentName;
                    AssessmentShowData.AssessmentTypeId = Assessment.AssessmentMasterData.AssessmentTypeId;
                    AssessmentShowData.AssessmentTypeName = Assessment.AssessmentMasterData.AssessmentTypeName;
                    AssessmentShowData.IsAssigned = Assessment.AssessmentMasterData.IsAssigned;
                    AssessmentShowData.IsActive = Assessment.AssessmentMasterData.IsActive;
                    AssessmentShowData.CreatedBy = Assessment.AssessmentMasterData.CreatedBy;
                    //SalaryFitmentDetails SalaryFitmentDetails = new SalaryFitmentDetails();
                    //SalaryFitmentDetails.SalaryFitmentDetailsId = SalaryFitmentData.SalaryFitmentDetails.Add (SalaryFitmentDetails.SalaryFitmentDetailsId)

                    AssessmentShowData.AssessmentQuestionDataDetails = Assessment.AssessmentQuestionDataDetails.ToList();
                    foreach (var data in AssessmentShowData.AssessmentQuestionDataDetails)
                    {
                        data.AssessmentQuestionAnswerOption = Assessment.AssessmentQuestionAnswerOption.Where(x => x.AssessmentQuestionId == data.AssessmentQuestionId).ToList();
                    }
                }
                return this.Ok(AssessmentShowData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("assessmentsave")]
        public async Task<IActionResult> AssessmentSave(IFormCollection data)
        {
            try
            {
                AssessmentSave formData = new AssessmentSave();
                formData.AssessmentId = Convert.ToInt32(data["AssessmentId"]);
                formData.AssessmentName = data["AssessmentName"];
                formData.AssessmentTypeId = Convert.ToInt32(data["AssessmentTypeId"]);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                string AssessmentQuestionData = data["AssessmentQuestionData"];
                formData.AssessmentQuestionData = JsonConvert.DeserializeObject<List<AssessmentQuestionData>>(AssessmentQuestionData);
                string AssessmentQuestionAnswerOption = data["AssessmentQuestionAnswerOption"];
                formData.AssessmentQuestionAnswerOption = JsonConvert.DeserializeObject<List<AssessmentQuestionAnswerOption>>(AssessmentQuestionAnswerOption);


                var response = await this.assessmentservice.AssessmentSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getindusctiontraninglist")]
        public async Task<IActionResult> GetIndusctionTraningList(IndusctionTraningListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.GetIndusctionTraningList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("assessmentassignsave")]
        public async Task<IActionResult> AssessmentAssignSave(AssessmentAssignSave formData)
        {
            try
            {
                var response = await this.assessmentservice.AssessmentAssignSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("inductionprogrammecoordinatiorassignsave")]
        public async Task<IActionResult> InductionProgrammeCoOrdinatiorAssignSave(InductionProgrammeCoOrdinatiorAssign formData)
        {
            try
            {
                var response = await this.assessmentservice.InductionProgrammeCoOrdinatiorAssignSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("inductionprogrammecoordinatiorassignedget")]
        public async Task<IActionResult> InductionProgrammeCoOrdinatiorAssignedGet(InductionProgrammeCoOrdinatiorAssignedSearch search)
        {
            try
            {
                var response = await this.assessmentservice.InductionProgrammeCoOrdinatiorAssignedGet(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("batchreleaselistgetall")]
        public async Task<IActionResult> BatchReleaseListGetAll(BatchReleaseListGetAllSearch search)
        {
            try
            {
                var response = await this.assessmentservice.BatchReleaseListGetAll(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("assessementassignreleaselist")]
        public async Task<IActionResult> AssessementAssignReleaseList(AssessementAssignReleaseListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.AssessementAssignReleaseList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("assessementassignrereleaselist")]
        public async Task<IActionResult> AssessementAssignReReleaseList(AssessementAssignReleaseListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.AssessementAssignReReleaseList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("assementassignreleasesave")]
        public async Task<IActionResult> AssementAssignReleaseSave(IFormCollection data)
        {
            try
            {
                AssementAssignReleaseSave formData = new AssementAssignReleaseSave();
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = data["CandidateId"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string TrainingTitle = data["TrainingTitle"];
                formData.TrainingTitle = JsonConvert.DeserializeObject<List<TrainingTitleList>>(TrainingTitle);
                string AssessementAssignReleaseDetails = data["AssessementAssignReleaseDetails"];
                formData.AssessementAssignReleaseDetails = JsonConvert.DeserializeObject<List<AssessementAssignReleaseDetails>>(AssessementAssignReleaseDetails);
                formData.Password = data["Password"];
                var response = await this.assessmentservice.AssementAssignReleaseSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("feedbackassignreleasesave")]
        public async Task<IActionResult> FeedbackAssignReleaseSave(IFormCollection data)
        {
            try
            {
                FeedbackAssignReleaseSave formData = new FeedbackAssignReleaseSave();
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = data["CandidateId"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string FeedbackAssignReleaseDetails = data["FeedbackAssignReleaseDetails"];
                formData.FeedbackAssignReleaseDetails = JsonConvert.DeserializeObject<List<FeedbackAssignReleaseDetails>>(FeedbackAssignReleaseDetails);
                var response = await this.assessmentservice.FeedbackAssignReleaseSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("assementassignreleasesaveforcandidate")]
        public async Task<IActionResult> AssementAssignReleaseSaveForCandidate(IFormCollection data)
        {
            try
            {
                AssementAssignReleaseSaveCandiddate formData = new AssementAssignReleaseSaveCandiddate();
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = data["CandidateId"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string TrainingTitle = data["TrainingTitle"];
                formData.TrainingTitle = JsonConvert.DeserializeObject<List<TrainingTitleList>>(TrainingTitle);
                string AssessementAssignReleaseDetails = data["AssessementAssignReleaseDetails"];
                formData.AssessementAssignReleaseDetails = JsonConvert.DeserializeObject<List<AssessementAssignReleaseDetailsCandidate>>(AssessementAssignReleaseDetails);
                formData.Password = data["Password"];
                var response = await this.assessmentservice.AssementAssignReleaseSaveForCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("feedbackassignreleasesaveforcandidate")]
        public async Task<IActionResult> FeedbackAssignReleaseSaveForCandidate(IFormCollection data)
        {
            try
            {
                FeedBackAssignReleaseSaveCandiddate formData = new FeedBackAssignReleaseSaveCandiddate();
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = data["CandidateId"];
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string TrainingTitle = data["TrainingTitle"];
                formData.TrainingTitle = JsonConvert.DeserializeObject<List<TrainingTitleList>>(TrainingTitle);
                string FeedBackAssignReleaseDetails = data["FeedBackAssignReleaseDetails"];
                formData.FeedBackAssignReleaseDetails = JsonConvert.DeserializeObject<List<FeedbackAssignReleaseDetailsCandidate>>(FeedBackAssignReleaseDetails);
                formData.Password = data["Password"];
                var response = await this.assessmentservice.FeedbackAssignReleaseSaveForCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("deletefeedback")]
        //public async Task<IActionResult> DeleteFeedBackData(FeedBackScheduleSearch search)
        //{
        //    try
        //    {
        //        var response = await this.feedbackSservice.DeleteFeedBackData(search).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("deleteAssessment")]
        public async Task<IActionResult> DeleteAssessment(DeleteAssessmentSearch search)
        {
            try
            {
                var response = await this.assessmentservice.DeleteAssessment(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidateassessmentreleaselistgetall")]
        public async Task<IActionResult> CandidateAssessmentReleaseListGetAll(CandidateAssessmentReleaseListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.CandidateAssessmentReleaseListGetAll(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("candidateassessmentreleaselistgetallfornewjoinerlist")]
        public async Task<IActionResult> CandidateAssessmentReleaseListGetAllforNewJoinerList(CandidateAssessmentReleaseListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.CandidateAssessmentReleaseListGetAllforNewJoinerList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidateassessmentdata")]
        public async Task<IActionResult> GetCandidateAssessmentData(CandidateAssessmentSearch search)
        {
            try
            {
                CandidateAssessment CandidateAssessment = new CandidateAssessment();
                CandidateAssessment = await this.assessmentservice.GetCandidateAssessmentData(search).ConfigureAwait(false);

                CandidateAssessmentMasterData CandidateAssessmentMasterData = new CandidateAssessmentMasterData();
                if (CandidateAssessment.CandidateAssessmentMaster != null)
                {
                    CandidateAssessmentMasterData.RequisitionDetailId = CandidateAssessment.CandidateAssessmentMaster.RequisitionDetailId;
                    CandidateAssessmentMasterData.CandidateId = CandidateAssessment.CandidateAssessmentMaster.CandidateId;
                    CandidateAssessmentMasterData.CandidateNo = CandidateAssessment.CandidateAssessmentMaster.CandidateNo;
                    CandidateAssessmentMasterData.EmpId = CandidateAssessment.CandidateAssessmentMaster.EmpId;
                    CandidateAssessmentMasterData.EmpNo = CandidateAssessment.CandidateAssessmentMaster.EmpNo;
                    CandidateAssessmentMasterData.EmployeeStatusId = CandidateAssessment.CandidateAssessmentMaster.EmployeeStatusId;
                    CandidateAssessmentMasterData.EmployeeStatusName = CandidateAssessment.CandidateAssessmentMaster.EmployeeStatusName;
                    CandidateAssessmentMasterData.CandidateFullName = CandidateAssessment.CandidateAssessmentMaster.CandidateFullName;
                    CandidateAssessmentMasterData.EmailId = CandidateAssessment.CandidateAssessmentMaster.EmailId;
                    CandidateAssessmentMasterData.ContactNo = CandidateAssessment.CandidateAssessmentMaster.ContactNo;
                    CandidateAssessmentMasterData.BatchId = CandidateAssessment.CandidateAssessmentMaster.BatchId;
                    CandidateAssessmentMasterData.BatchNo = CandidateAssessment.CandidateAssessmentMaster.BatchNo;
                    CandidateAssessmentMasterData.DateofJoining = CandidateAssessment.CandidateAssessmentMaster.DateofJoining;
                    CandidateAssessmentMasterData.VerticalId = CandidateAssessment.CandidateAssessmentMaster.VerticalId;
                    CandidateAssessmentMasterData.VerticalName = CandidateAssessment.CandidateAssessmentMaster.VerticalName;
                    CandidateAssessmentMasterData.Designation = CandidateAssessment.CandidateAssessmentMaster.Designation;
                    CandidateAssessmentMasterData.DesignationName = CandidateAssessment.CandidateAssessmentMaster.DesignationName;
                    CandidateAssessmentMasterData.FunctionId = CandidateAssessment.CandidateAssessmentMaster.FunctionId;
                    CandidateAssessmentMasterData.FunctionName = CandidateAssessment.CandidateAssessmentMaster.FunctionName;
                    CandidateAssessmentMasterData.DepartmentId = CandidateAssessment.CandidateAssessmentMaster.DepartmentId;
                    CandidateAssessmentMasterData.DepartmentName = CandidateAssessment.CandidateAssessmentMaster.DepartmentName;
                    CandidateAssessmentMasterData.LocationId = CandidateAssessment.CandidateAssessmentMaster.LocationId;
                    CandidateAssessmentMasterData.LocationName = CandidateAssessment.CandidateAssessmentMaster.LocationName;
                    CandidateAssessmentMasterData.GradeId = CandidateAssessment.CandidateAssessmentMaster.GradeId;
                    CandidateAssessmentMasterData.GradeName = CandidateAssessment.CandidateAssessmentMaster.GradeName;
                    CandidateAssessmentMasterData.TotalScore = CandidateAssessment.CandidateAssessmentMaster.TotalScore;
                    //SalaryFitmentDetails SalaryFitmentDetails = new SalaryFitmentDetails();
                    //SalaryFitmentDetails.SalaryFitmentDetailsId = SalaryFitmentData.SalaryFitmentDetails.Add (SalaryFitmentDetails.SalaryFitmentDetailsId)

                    CandidateAssessmentMasterData.CandidateAssessmentDetails = CandidateAssessment.CandidateAssessmentDetails.ToList();
                   
                }
                return this.Ok(CandidateAssessmentMasterData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getassessmentdatacandidate")]
        public async Task<IActionResult> GetAssessmentDataCandidate(AssessmentSearchCandidate search)
        {
            try
            {
                AssessmentCandidate AssessmentCandidate = new AssessmentCandidate();
                AssessmentCandidate = await this.assessmentservice.GetAssessmentDataCandidate(search).ConfigureAwait(false);

                AssessmentShowDataCandidate AssessmentShowDataCandidate = new AssessmentShowDataCandidate();
                if (AssessmentCandidate.AssessmentMasterDataCandidate != null)
                {
                    AssessmentShowDataCandidate.AssessmentId = AssessmentCandidate.AssessmentMasterDataCandidate.AssessmentId;
                    AssessmentShowDataCandidate.AssessmentTypeId = AssessmentCandidate.AssessmentMasterDataCandidate.AssessmentTypeId;
                    AssessmentShowDataCandidate.AssessmentName = AssessmentCandidate.AssessmentMasterDataCandidate.AssessmentName;
                    AssessmentShowDataCandidate.CandidateInductionScheduleDetailsId = AssessmentCandidate.AssessmentMasterDataCandidate.CandidateInductionScheduleDetailsId;
                    AssessmentShowDataCandidate.CandidateAssessmentId = AssessmentCandidate.AssessmentMasterDataCandidate.CandidateAssessmentId;
                    AssessmentShowDataCandidate.CandidateId = AssessmentCandidate.AssessmentMasterDataCandidate.CandidateId;
                    AssessmentShowDataCandidate.RequisitionDetailId = AssessmentCandidate.AssessmentMasterDataCandidate.RequisitionDetailId;
                    AssessmentShowDataCandidate.CreatedBy = AssessmentCandidate.AssessmentMasterDataCandidate.CreatedBy;
                    //SalaryFitmentDetails SalaryFitmentDetails = new SalaryFitmentDetails();
                    //SalaryFitmentDetails.SalaryFitmentDetailsId = SalaryFitmentData.SalaryFitmentDetails.Add (SalaryFitmentDetails.SalaryFitmentDetailsId)

                    AssessmentShowDataCandidate.AssessmentQuestionDataDetailsCandidate = AssessmentCandidate.AssessmentQuestionDataDetailsCandidate.ToList();
                    foreach (var data in AssessmentShowDataCandidate.AssessmentQuestionDataDetailsCandidate)
                    {
                        data.AssessmentQuestionAnswerOptionCandidate = AssessmentCandidate.AssessmentQuestionAnswerOptionCandidate.Where(x => x.AssessmentQuestionId == data.AssessmentQuestionId).ToList();
                    }
                }
                return this.Ok(AssessmentShowDataCandidate);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("assessmentsavecandidate")]
        public async Task<IActionResult> AssessmentSaveCandidate(IFormCollection data)
        {
            try
            {
                AssessmentSaveCandidate formData = new AssessmentSaveCandidate();
                formData.CandidateAssessmentId = Convert.ToInt32(data["CandidateAssessmentId"]);
                formData.AssessmentId = Convert.ToInt32(data["AssessmentId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.CandidateInductionScheduleDetailsId = Convert.ToInt32(data["CandidateInductionScheduleDetailsId"]);
                formData.RequisitionDetailId = Convert.ToInt32(data["RequisitionDetailId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                string AssessmentQuestionDataCandidate = data["AssessmentQuestionDataCandidate"];
                formData.AssessmentQuestionDataCandidate = JsonConvert.DeserializeObject<List<AssessmentQuestionDataCandidate>>(AssessmentQuestionDataCandidate);
                string AssessmentQuestionAnswerOptionCandidate = data["AssessmentQuestionAnswerOptionCandidate"];
                formData.AssessmentQuestionAnswerOptionCandidate = JsonConvert.DeserializeObject<List<AssessmentQuestionAnswerOptionCandidate>>(AssessmentQuestionAnswerOptionCandidate);


                var response = await this.assessmentservice.AssessmentSaveCandidate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getevaluateassessmentbatchlist")]
        public async Task<IActionResult> GetEvaluateAssessmentBatchList(BatchesAssementEvaluateListSearch search)
        {
            try
            {
                BatchesAssementEvaluateList BatchesAssementEvaluateList = new BatchesAssementEvaluateList();
                BatchesAssementEvaluateList = await this.assessmentservice.GetEvaluateAssessmentBatchList(search).ConfigureAwait(false);

                BatchesAssementEvaluateData BatchesAssementEvaluateData = new BatchesAssementEvaluateData();
                if (BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster != null)
                {
                    BatchesAssementEvaluateData.CandidateId = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.CandidateId;
                    BatchesAssementEvaluateData.CandidateNo = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.CandidateNo;
                    BatchesAssementEvaluateData.CandidateName = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.CandidateName;
                    BatchesAssementEvaluateData.BatchId = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.BatchId;
                    BatchesAssementEvaluateData.BatchNo= BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.BatchNo;
                    BatchesAssementEvaluateData.CoOrdinatiorId = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.CoOrdinatiorId;
                    BatchesAssementEvaluateData.UserId = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.UserId;
                    BatchesAssementEvaluateData.DateofJoining = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.DateofJoining;
                    BatchesAssementEvaluateData.TotalAssignment = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.TotalAssignment;
                    BatchesAssementEvaluateData.AssessmentRelesed = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.AssessmentRelesed;
                    BatchesAssementEvaluateData.AssessmentStatus = BatchesAssementEvaluateList.BatchesAssementEvaluateListMatster.AssessmentStatus;

                    BatchesAssementEvaluateData.BatchesAssementEvaluateDetailsList = BatchesAssementEvaluateList.BatchesAssementEvaluateDetailsList.ToList();

                }
                return this.Ok(BatchesAssementEvaluateData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getevaluatefeedbackbatchlist")]
        public async Task<IActionResult> GetEvaluateFeedbackBatchList(BatchesFeedbackListSearch search)
        {
            try
            {
                BatchesFeedbackList BatchesFeedbackList = new BatchesFeedbackList();
                BatchesFeedbackList = await this.assessmentservice.GetEvaluateFeedbackBatchList(search).ConfigureAwait(false);

                BatchesFeedbackData BatchesFeedbackData = new BatchesFeedbackData();
                if (BatchesFeedbackList.BatchesFeedbackListMatster != null)
                {
                    BatchesFeedbackData.CandidateId = BatchesFeedbackList.BatchesFeedbackListMatster.CandidateId;
                    BatchesFeedbackData.CandidateNo = BatchesFeedbackList.BatchesFeedbackListMatster.CandidateNo;
                    BatchesFeedbackData.CandidateName = BatchesFeedbackList.BatchesFeedbackListMatster.CandidateName;
                    BatchesFeedbackData.BatchId = BatchesFeedbackList.BatchesFeedbackListMatster.BatchId;
                    BatchesFeedbackData.BatchNo = BatchesFeedbackList.BatchesFeedbackListMatster.BatchNo;
                    BatchesFeedbackData.CoOrdinatiorId = BatchesFeedbackList.BatchesFeedbackListMatster.CoOrdinatiorId;
                    BatchesFeedbackData.UserId = BatchesFeedbackList.BatchesFeedbackListMatster.UserId;
                    BatchesFeedbackData.DateofJoining = BatchesFeedbackList.BatchesFeedbackListMatster.DateofJoining;
                    BatchesFeedbackData.TotalAssignment = BatchesFeedbackList.BatchesFeedbackListMatster.TotalAssignment;
                    BatchesFeedbackData.AssessmentRelesed = BatchesFeedbackList.BatchesFeedbackListMatster.AssessmentRelesed;
                    BatchesFeedbackData.AssessmentStatus = BatchesFeedbackList.BatchesFeedbackListMatster.AssessmentStatus;

                    BatchesFeedbackData.BatchesFeedbackDetailsList = BatchesFeedbackList.BatchesFeedbackDetailsList.ToList();

                }
                return this.Ok(BatchesFeedbackData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [Route("getevaluatefeedbackrerelease")]
        public async Task<IActionResult> GetEvaluateFeedbackReRelease(FeedbackAssignReleaseListSearch search)
        {
            try
            {
                var response = await this.assessmentservice.GetEvaluateFeedbackReRelease(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidateassessmentevaluation")]
        public async Task<IActionResult> GetCandidateAssessmentEvaluation(CandidateEvaluationSearch search)
        {
            try
            {
                CandidateEvaluation CandidateEvaluation = new CandidateEvaluation();
                CandidateEvaluation = await this.assessmentservice.GetCandidateAssessmentEvaluation(search).ConfigureAwait(false);

                CandidateEvaluationData CandidateEvaluationData = new CandidateEvaluationData();
                if (CandidateEvaluation.CandidateEvaluationMaster != null)
                {
                    CandidateEvaluationData.BatchId = CandidateEvaluation.CandidateEvaluationMaster.BatchId;
                    CandidateEvaluationData.AssessmentId = CandidateEvaluation.CandidateEvaluationMaster.AssessmentId;
                    CandidateEvaluationData.AssessmentName = CandidateEvaluation.CandidateEvaluationMaster.AssessmentName;
                    CandidateEvaluationData.CandidateInductionScheduleDetailsId = CandidateEvaluation.CandidateEvaluationMaster.CandidateInductionScheduleDetailsId;

                    CandidateEvaluationData.CandidateEvaluationQuestionMaster = CandidateEvaluation.CandidateEvaluationQuestionMaster.ToList();
                    foreach (var data in CandidateEvaluationData.CandidateEvaluationQuestionMaster)
                    {
                        data.CandidateEvaluationQuestionAnswer = CandidateEvaluation.CandidateEvaluationQuestionAnswer.Where(x => x.AssessmentId == data.AssessmentId && x.CandidateAssessmentQuestionId ==data.CandidateAssessmentQuestionId ).ToList();
                        //&& x.BatchId == data.BatchId && x.CandidateId == data.CandidateId && x.CandidateInductionScheduleDetailsId == data.CandidateInductionScheduleDetailsId
                    }
                }
                return this.Ok(CandidateEvaluationData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

       [HttpPost]
        [Route("getAssessmentEvaluationScore")]
        public async Task<IActionResult> GetAssessmentEvaluationScore(IFormCollection data)
        {
            try
            {
                CandidateEvaluationSave formData = new CandidateEvaluationSave();

                string CandidateEvaluationAnswerScore = data["CandidateEvaluationAnswerSave"];
                formData.CandidateEvaluationAnswerSave = JsonConvert.DeserializeObject<List<CandidateEvaluationAnswerSave>>(CandidateEvaluationAnswerScore);

                var response = await this.assessmentservice.GetCandidateEvaluationAnswerScore(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("candidateassessmentevaluationsave")]
        public async Task<IActionResult> CandidateAssessmentEvaluationSave(IFormCollection data)
        {
            try
            {
                CandidateEvaluationSave formData = new CandidateEvaluationSave();
                 formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                string CandidateEvaluationAnswerSave = data["CandidateEvaluationAnswerSave"];
                formData.CandidateEvaluationAnswerSave = JsonConvert.DeserializeObject<List<CandidateEvaluationAnswerSave>>(CandidateEvaluationAnswerSave);

                var response = await this.assessmentservice.CandidateAssessmentEvaluationSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidateevaluationuploadget")]
        public async Task<IActionResult> CandidateEvaluationUploadGet(CandidateEvaluationUploadViewSearch search)
        {
            try
            {
                CandidateEvaluationUploadView CandidateEvaluationUploadView = new CandidateEvaluationUploadView();
                CandidateEvaluationUploadView = await this.assessmentservice.CandidateEvaluationUploadGet(search).ConfigureAwait(false);

                CandidateEvaluationUploadViewData CandidateEvaluationUploadViewData = new CandidateEvaluationUploadViewData();
                if (CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster != null)
                {
                    CandidateEvaluationUploadViewData.CandidateAssessmentEvalutaionUploadId = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.CandidateAssessmentEvalutaionUploadId;
                    CandidateEvaluationUploadViewData.CandidateAssessmentId = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.CandidateAssessmentId;
                    CandidateEvaluationUploadViewData.AssessmentName = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.AssessmentName;
                    CandidateEvaluationUploadViewData.BatchId = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.BatchId;
                    CandidateEvaluationUploadViewData.CandidateId = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.CandidateId;
                    CandidateEvaluationUploadViewData.CandidateInductionScheduleDetailsId = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.CandidateInductionScheduleDetailsId;
                    CandidateEvaluationUploadViewData.FilePath = CandidateEvaluationUploadView.CandidateEvaluationUploadViewMaster.FilePath;


                    CandidateEvaluationUploadViewData.CandidateEvaluationUploadDetailsView = CandidateEvaluationUploadView.CandidateEvaluationUploadDetailsView.ToList();
                    
                }
                return this.Ok(CandidateEvaluationUploadViewData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("uploadassementtestresult")]
        //public async Task<IActionResult> UploadAssementTestResult(IFormCollection data)
        public IActionResult UploadAssementTestResult(IFormCollection data)
        {
            try
            {
                
                List<CandidateEvaluationUploadDataCsv> CandidateEvaluationUploadDataCsvlist = new List<CandidateEvaluationUploadDataCsv>();
                
                var file = Request.Form.Files[0];
                if (file.FileName.EndsWith(".csv"))
                {
                    DataTable dt = new DataTable();
                               dt.Clear();
                        dt.Columns.Add("EmployeeId");
                        dt.Columns.Add("EmployeeName");
                        dt.Columns.Add("EvaluatorComments");
                        dt.Columns.Add("Score");
                        dt.Columns.Add("TotalQuestion");
                        dt.Columns.Add("Remarks");
                    using (var sreader = new StreamReader(file.OpenReadStream()))
                    {
                        string[] headers = sreader.ReadLine().Split(',');     //Title


                        while (!sreader.EndOfStream)                          //get all the content in rows 
                        {
                            DataRow dr = dt.NewRow();
                            CandidateEvaluationUploadDataCsv CandidateEvaluationUploadDataCsval = new CandidateEvaluationUploadDataCsv();
                            string[] rows = sreader.ReadLine().Split(',');
                            if (rows[3].Length > 0 && rows[4].Length > 0)
                            {
                                string EmployeeId = rows[0].ToString();
                                string EmployeeName = rows[1].ToString();
                                string EvaluatorComments = rows[2].ToString();
                                int Score = Convert.ToInt32(rows[3].ToString());
                                int TotalQuestion = Convert.ToInt32(rows[4].ToString());
                                string Remarks = rows[5].ToString();
                                dr["EmployeeId"] = EmployeeId;
                                dr["EmployeeName"] = EmployeeName;
                                dr["EvaluatorComments"] = EvaluatorComments;
                                dr["Score"] = Score;
                                dr["TotalQuestion"] = TotalQuestion;
                                dr["Remarks"] = Remarks;

                                CandidateEvaluationUploadDataCsval.EmployeeId = EmployeeId;
                                CandidateEvaluationUploadDataCsval.EmployeeName = EmployeeName;
                                CandidateEvaluationUploadDataCsval.EvaluatorComments = EvaluatorComments;
                                CandidateEvaluationUploadDataCsval.Score = Score;
                                CandidateEvaluationUploadDataCsval.TotalQuestion = TotalQuestion;
                                CandidateEvaluationUploadDataCsval.Remarks = Remarks;
                                dt.Rows.Add(dr);
                                CandidateEvaluationUploadDataCsvlist.Add(CandidateEvaluationUploadDataCsval);
                               // CandidateEvaluationUploadDataCsv.candidateEvaluationUploadDataCsv.Add(CandidateEvaluationUploadDataCsv);
                            }
                        }
                    }

                    //CandidateEvaluationUploadDataCsv.candidateEvaluationUploadDataCsv = dt.Rows.Count(x =>
                    //{
                    //    return new FamilyDetailsFormOtherDetailsData
                    //    {
                    //        CandidateJoiningFormFamilyHistoryId = x.CandidateJoiningFormFamilyHistoryId,
                    //        CandidateJoiningFormId = x.CandidateJoiningFormId,
                    //        CandidateId = x.CandidateId,
                    //        RequisitionDetailId = x.RequisitionDetailId,
                    //        NewFullName = x.NewFullName,
                    //        OldFullName = x.OldFullName,
                    //        NewBloodGroupId = x.NewBloodGroupId,
                    //        NewBloodGroupName = x.NewBloodGroupName,
                    //        OldBloodGroupId = x.OldBloodGroupId,
                    //        OldBloodGroupName = x.OldBloodGroupName,
                    //        NewResidentialAddress = x.NewResidentialAddress,
                    //        OldResidentialAddress = x.OldResidentialAddress,
                    //        NewResidentialPin = x.NewResidentialPin,
                    //        OldResidentialPin = x.OldResidentialPin,
                    //        NewSameAsResidential = x.NewSameAsResidential,
                    //        OldSameAsResidential = x.OldSameAsResidential,
                    //        NewPermanentAddress = x.NewPermanentAddress,
                    //        OldPermanentAddress = x.OldPermanentAddress,
                    //        NewPermanentPin = x.NewPermanentPin,
                    //        OldPermanentPin = x.OldPermanentPin,
                    //        NewEmail = x.NewEmail,
                    //        OldEmail = x.OldEmail,
                    //        NewPhoneNo = x.NewPhoneNo,
                    //        OldPhoneNo = x.OldPhoneNo,
                    //        ModifiedBy = x.ModifiedBy,
                    //        ModifiedDate = x.ModifiedDate,
                    //        FamilyMemberUpdateDetailsData = familyDetailsUpdateHistory.FamilyMemberUpdateDetails.Where(Y => Y.CandidateJoiningFormFamilyHistoryId == x.CandidateJoiningFormFamilyHistoryId).ToList()
                    //    };
                    //}).ToList();
                    //var response = await this.testScheduleService.UploadTestResult(dt).ConfigureAwait(false);
                    //CandidateEvaluationUploadDataCsv=dt
                    //var response = await this.as.UploadTestResult(dt).ConfigureAwait(false);
                    return this.Ok(CandidateEvaluationUploadDataCsvlist);
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
        [Route("candidateevaluationuploadsave")]
        public async Task<IActionResult> CandidateEvaluationUploadSave(IFormCollection data)
        {
            try
            {
                string fileName = "";
                var file = Request.Form.Files[0];
                string HostUrl = this.environment.ContentRootPath;
                string filepath = "UploadedFiles/EmployeeAssessmentEvaluation";
                string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                if (!Directory.Exists(uploadpath))
                {
                    Directory.CreateDirectory(uploadpath);
                }
                if (file.Length > 0)
                {
                    var timestamp = DateTime.Now.ToFileTime();
                    string timestampfilename = Convert.ToString(timestamp);
                    fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(uploadpath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
                CandidateEvaluationUploadSave formData = new CandidateEvaluationUploadSave();
                formData.CandidateAssessmentId = Convert.ToInt32(data["CandidateAssessmentId"]);
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.CandidateInductionScheduleDetailsId = Convert.ToInt32(data["CandidateInductionScheduleDetailsId"]);
                formData.FilePath = "/" + filepath + "/" + fileName;
                string Details = data["CandidateEvaluationUploadDetailsSave"];
                formData.CandidateEvaluationUploadDetailsSave = JsonConvert.DeserializeObject<List<CandidateEvaluationUploadDetailsSave>>(Details);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.assessmentservice.CandidateEvaluationUploadSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidateassessmentsummaryget")]
        public async Task<IActionResult> CandidateAssessmentSummaryGet(CandidateAssessmentSummarySearch search)
        {
            try
            {
                CandidateAssessmentSummary CandidateAssessmentSummary = new CandidateAssessmentSummary();
                CandidateAssessmentSummary = await this.assessmentservice.CandidateAssessmentSummaryGet(search).ConfigureAwait(false);

                CandidateAssessmentSummaryView CandidateAssessmentSummaryView = new CandidateAssessmentSummaryView();
                if (CandidateAssessmentSummaryView != null)
                {
                    //CandidateAssessmentSummaryShow.AssessmentEvaluationSummaryId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.;
                    //CandidateAssessmentSummaryShow.RequisitionDetailId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.RequisitionDetailId;
                    //CandidateAssessmentSummaryShow.CandidateId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.CandidateId;
                    //CandidateAssessmentSummaryShow.CandidateNo = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.CandidateNo;
                    //CandidateAssessmentSummaryShow.EmpId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.EmpId;
                    //CandidateAssessmentSummaryShow.EmpNo = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.EmpNo;
                    //CandidateAssessmentSummaryShow.EmployeeStatusId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.EmployeeStatusId;
                    //CandidateAssessmentSummaryShow.EmployeeStatusName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.EmployeeStatusName;
                    //CandidateAssessmentSummaryShow.CandidateFullName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.CandidateFullName;
                    //CandidateAssessmentSummaryShow.Age = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.Age;
                    //CandidateAssessmentSummaryShow.EmailId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.EmailId;
                    //CandidateAssessmentSummaryShow.ContactNo = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.ContactNo;
                    //CandidateAssessmentSummaryShow.BatchId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.BatchId;
                    //CandidateAssessmentSummaryShow.BatchNo = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.BatchNo;
                    //CandidateAssessmentSummaryShow.QualificationId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.QualificationId;
                    //CandidateAssessmentSummaryShow.QualificationName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.QualificationName;
                    //CandidateAssessmentSummaryShow.CoOrdinatiorId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.CoOrdinatiorId;
                    //CandidateAssessmentSummaryShow.DateofJoining = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.DateofJoining;
                    //CandidateAssessmentSummaryShow.VerticalId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.VerticalId;
                    //CandidateAssessmentSummaryShow.VerticalName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.VerticalName;
                    //CandidateAssessmentSummaryShow.Designation = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.Designation;
                    //CandidateAssessmentSummaryShow.DesignationName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.DesignationName;
                    //CandidateAssessmentSummaryShow.FunctionId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.FunctionId;
                    //CandidateAssessmentSummaryShow.FunctionName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.FunctionName;
                    //CandidateAssessmentSummaryShow.DepartmentId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.DepartmentId;
                    //CandidateAssessmentSummaryShow.DepartmentName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.DepartmentName;
                    //CandidateAssessmentSummaryShow.LocationId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.LocationId;
                    //CandidateAssessmentSummaryShow.LocationName = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.LocationName;
                    //CandidateAssessmentSummaryShow.GradeId = CandidateAssessmentSummary.CandidateAssessmentSummaryMaster.GradeId;
                    //CandidateAssessmentSummaryShow.GradeName = CandidateAssessmentSummary.CandidateAssessmentSummaryShow.GradeName;
                    //CandidateAssessmentSummaryShow.WorkAreaId = CandidateAssessmentSummary.CandidateAssessmentSummaryShow.WorkAreaId;
                    //CandidateAssessmentSummaryShow.WorkAreaName = CandidateAssessmentSummary.CandidateAssessmentSummaryShow.WorkAreaName;
                    //CandidateAssessmentSummaryShow.TraingLocationId = CandidateAssessmentSummary.CandidateAssessmentSummaryShow.TraingLocationId;
                    //CandidateAssessmentSummaryShow.TraingLocationName = CandidateAssessmentSummary.CandidateAssessmentSummaryShow.TraingLocationName;
                    CandidateAssessmentSummaryView.CandidateAssessmentSummaryMaster = CandidateAssessmentSummary.CandidateAssessmentSummaryShow.ToList();
                    foreach (var data in CandidateAssessmentSummaryView.CandidateAssessmentSummaryMaster)
                    {
                        data.CandidateAssessmentSummaryDetails = CandidateAssessmentSummary.CandidateAssessmentSummaryDetails.Where(x => x.CandidateId == data.CandidateId).ToList();
                    }
                    //CandidateAssessmentSummaryShow.CandidateAssessmentSummaryDetails = CandidateAssessmentSummary.CandidateAssessmentSummaryDetails.ToList();
                    
                }
                return this.Ok(CandidateAssessmentSummaryView);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidateassessmentsummarypendingget")]
        public async Task<IActionResult> CandidateAssessmentSummaryPendingListGet(CandidateAssessmentSummaryPendingSearch search)
        {
            try
            {
                CandidateAssessmentSummaryPending CandidateAssessmentSummaryPending = new CandidateAssessmentSummaryPending();
                CandidateAssessmentSummaryPending = await this.assessmentservice.CandidateAssessmentSummaryPendingListGet(search).ConfigureAwait(false);

                CandidateAssessmentSummaryViewPending CandidateAssessmentSummaryViewPending = new CandidateAssessmentSummaryViewPending();
                if (CandidateAssessmentSummaryViewPending != null)
                {
                    CandidateAssessmentSummaryViewPending.CandidateAssessmentSummaryMasterPending = CandidateAssessmentSummaryPending.CandidateAssessmentSummaryShowPending.ToList();
                    foreach (var data in CandidateAssessmentSummaryViewPending.CandidateAssessmentSummaryMasterPending)
                    {
                        data.CandidateAssessmentSummaryPendingDetails = CandidateAssessmentSummaryPending.CandidateAssessmentSummaryPendingDetails.Where(x => x.CandidateId == data.CandidateId).ToList();
                    }
                    //CandidateAssessmentSummaryShow.CandidateAssessmentSummaryDetails = CandidateAssessmentSummary.CandidateAssessmentSummaryDetails.ToList();

                }
                return this.Ok(CandidateAssessmentSummaryViewPending);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("candidateassessmentsummarysave")]
        public async Task<IActionResult> CandidateAssessmentSummarySave(IFormCollection data)
        {
            try
            {
                CandidateAssessmentSummarySave formData = new CandidateAssessmentSummarySave();
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string Detaillist = data["Detaillist"];
                formData.Detaillist = JsonConvert.DeserializeObject<List<Detaillist>>(Detaillist);
                string CandidateAssessmentSummaryDetailsSave = data["CandidateAssessmentSummaryDetailsSave"];
                formData.CandidateAssessmentSummaryDetailsSave = JsonConvert.DeserializeObject<List<CandidateAssessmentSummaryDetailsSave>>(CandidateAssessmentSummaryDetailsSave);

                var response = await this.assessmentservice.CandidateAssessmentSummarySave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("candidateassessmentsummarysaveIndividual")]
        public async Task<IActionResult> CandidateAssessmentSummarySaveIndividual(IFormCollection data)
        {
            try
            {
                CandidateAssessmentSummarySave formData = new CandidateAssessmentSummarySave();
                formData.BatchId = Convert.ToInt32(data["BatchId"]);
                formData.CandidateId = Convert.ToInt32(data["CandidateId"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);

                string CandidateAssessmentSummaryDetailsSave = data["CandidateAssessmentSummaryDetailsSave"];
                formData.CandidateAssessmentSummaryDetailsSave = JsonConvert.DeserializeObject<List<CandidateAssessmentSummaryDetailsSave>>(CandidateAssessmentSummaryDetailsSave);

                var response = await this.assessmentservice.CandidateAssessmentSummarySaveIndividual(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidateassessmentevaluationview")]
        public async Task<IActionResult> GetCandidateAssessmentEvaluationView(CandidateAssessmentEvaluationViewSearch search)
        {
            try
            {
                CandidateAssessmentEvaluationView CandidateAssessmentEvaluationView = new CandidateAssessmentEvaluationView();
                CandidateAssessmentEvaluationView = await this.assessmentservice.GetCandidateAssessmentEvaluationView(search).ConfigureAwait(false);

                CandidateAssessmentEvaluationViewShow CandidateAssessmentEvaluationViewShow = new CandidateAssessmentEvaluationViewShow();
                if (CandidateAssessmentEvaluationView.CandidateAssessmentEvaluationMaster != null)
                {
                    CandidateAssessmentEvaluationViewShow.CandidateId = CandidateAssessmentEvaluationView.CandidateAssessmentEvaluationMaster.CandidateId;
                    CandidateAssessmentEvaluationViewShow.CandidateNo = CandidateAssessmentEvaluationView.CandidateAssessmentEvaluationMaster.CandidateNo;
                    CandidateAssessmentEvaluationViewShow.CandidateName = CandidateAssessmentEvaluationView.CandidateAssessmentEvaluationMaster.CandidateName;
                    CandidateAssessmentEvaluationViewShow.OverAllPercentage = CandidateAssessmentEvaluationView.CandidateAssessmentEvaluationMaster.OverAllPercentage;

                    CandidateAssessmentEvaluationViewShow.CandidateEvaluationQuestionShowData = CandidateAssessmentEvaluationView.CandidateEvaluationQuestionShowData.ToList();
                    foreach (var data in CandidateAssessmentEvaluationViewShow.CandidateEvaluationQuestionShowData)
                    {
                        data.CandidateEvaluationAnswerData = CandidateAssessmentEvaluationView.CandidateEvaluationAnswerData.Where(x => x.AssessmentId == data.AssessmentId).ToList();
                    }
                }
                return this.Ok(CandidateAssessmentEvaluationViewShow);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getuploadedassessmentevaluation")]
        public async Task<IActionResult> GetUploadedAssessmentEvaluation(UploadedAssessmentSearch search)
        {
            try
            {
                var response = await this.assessmentservice.GetUploadedAssessmentEvaluation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}













