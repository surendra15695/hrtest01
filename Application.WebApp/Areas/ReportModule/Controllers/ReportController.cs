using Application.Entity.Entities.Dashboard;
using Application.Entity.Entities.PreJoiningModule;
using Application.Entity.Entities.ReportModule;
using Application.Service.Services.Interfaces.ReportModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Application.Entity.Entities.ReportModule.ViewCandidateFeedbackReportOutputNew;

namespace Application.WebApp.Areas.ReportModule.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IReportService reportService;
        public ReportController(IReportService reportService, IWebHostEnvironment environment)
        {
            this.reportService = reportService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getsourcechannelmonthwisereport")]
        public async Task<IActionResult> GetSourceChannelMonthWiseReport(SearchSourceChannelMonthWiseList search)
        {
            try
            {
                var response = await this.reportService.GetSourceChannelMonthWiseReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Arnab
        [HttpPost]
        [Route("companydoctorreport")]
        public async Task<IActionResult> CompanyDoctorReport(CompanyDoctorReportInput search)
        {
            try
            {
                var response = await this.reportService.CompanyDoctorReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Arnab
        [HttpPost]
        [Route("resignationreportlist")]
        public async Task<IActionResult> ResignationReportList(ResignationReportInput search)
        {
            try
            {
                var response = await this.reportService.ResignationReportList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("newJoinersReportList")]
        public async Task<IActionResult> NewJoinersReportList(NewJoinersReportInput search)
        {
            try
            {
                var response = await this.reportService.NewJoinersReportList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("newJoinersReportListBatch")]
        public async Task<IActionResult> NewJoinersReportListBatch(NewJoinersReportBatchInput search)
        {
            try
            {
                var response = await this.reportService.NewJoinersReportListBatch(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("newJoinersReportListBatchwiseCandidate")]
        public async Task<IActionResult> NewJoinersReportListBatchwiseCandidate(NewJoinersReportBatchWiseCandidateInput search)
        {
            try
            {
                var response = await this.reportService.NewJoinersReportListBatchwiseCandidate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("consultantreport")]
        public async Task<IActionResult> ConsultantReport(ConsultantListInput search)
        {
            try
            {
                var response = await this.reportService.ConsultantReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Bhagyashri
        [HttpPost]
        [Route("bgvreport")]
        public async Task<IActionResult> BGVReport(BGVReportInput search)
        {
            try
            {
                var response = await this.reportService.BGVReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Bhagyashri
        [HttpPost]
        [Route("receruitmentfunnelreport")]
        public async Task<IActionResult> ReceruitmentFunnelReport(RecruitmentFunnelReportSearch search)
        {
            try
            {
                var response = await this.reportService.ReceruitmentFunnelReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Bhagyashri
        [HttpPost]
        [Route("recruiterperformancereport")]
        public async Task<IActionResult> RecruiterPerformanceReport(RecruiterPerformanceReportInput search)
        {
            try
            {
                var response = await this.reportService.RecruiterPerformanceReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //Bhagyashri
        [HttpPost]
        [Route("preemploymentreport")]
        public async Task<IActionResult> PreEmploymentReport(PreEmploymentReportInput search)
        {
            try
            {
                var response = await this.reportService.PreEmploymentReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("interviewpanelreport")]
        public async Task<IActionResult> InterviewPanelReport(InterviewPanelReportInput search)
        {
            try
            {
                var response = await this.reportService.InterviewPanelReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("hiringmanagerreport")]
        public async Task<IActionResult> HiringManagerReport(HiringManagerReportInput search)
        {
            try
            {
                var response = await this.reportService.HiringManagerReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("onboardingcompletedreport")]
        public async Task<IActionResult> OnboardingCompletedReport(OnBoardingCompletedReportInput search)
        {
            try
            {
                var response = await this.reportService.OnboardingCompletedReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Bhagyashri
        [HttpPost]
        [Route("conspaymenttrackerreport")]
        public async Task<IActionResult> ConsPaymentTrackerReport(ConsPaymentTrackerReportInput search)
        {
            try
            {
                var response = await this.reportService.ConsPaymentTrackerReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("recruitmentcostreport")]
        public async Task<IActionResult> RecruitmentCostReport(RecruitmentCostInput search)
        {
            try
            {
                var response = await this.reportService.RecruitmentCostReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("campuscandidatereport")]
        public async Task<IActionResult> CampusCandidateReport(CampusCandidateReportInput search)
        {
            try
            {
                var response = await this.reportService.CampusCandidateReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("functionalattritionhead")]
        public async Task<IActionResult> FunctionalAttritionHead(SearchFuntionalHeadattrition search)
        {
            try
            {
                var response = await this.reportService.FunctionalAttritionHead(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //arg
        [HttpPost]
        [Route("functionalheadnameforall")]
        public async Task<IActionResult> FunctionalHeadAll()
        {
            try
            {
                var response = await this.reportService.FunctionalHeadAll().ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Bhagyashri
        [HttpPost]
        [Route("sapvariancereport")]
        public async Task<IActionResult> SapVarianceReport(SapVarianceReportInput search)
        {
            try
            {
                var response = await this.reportService.SapVarianceReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Bhagyashri
        [HttpPost]
        [Route("consultantperformancereport")]
        public async Task<IActionResult> ConsultantPerformanceReport(ConsultantPerformanceInput search)
        {
            try
            {
                var response = await this.reportService.ConsultantPerformanceReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Bhagyashri
        [HttpPost]
        [Route("candidateattritionreport")]
        public async Task<IActionResult> CandidateAttritionReport(CandidateAttritionReportInput search)
        {
            try
            {
                var response = await this.reportService.CandidateAttritionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Bhagyashri
        [HttpPost]
        [Route("vacancyreport")]
        public async Task<IActionResult> VacancyReport(VacancyReportInput search)
        {
            try
            {
                var response = await this.reportService.VacancyReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("requisitionreport")]
        public async Task<IActionResult> RequisitionReport(SearchRequisitionReport search)
        {
            try
            {
                var response = await this.reportService.RequisitionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("requisitionhistoryreport")]
        public async Task<IActionResult> RequisitionHistoryReport(SearchRequisitionHistoryReport search)
        {
            try
            {
                var response = await this.reportService.RequisitionHistoryReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("resignationreport")]
        public async Task<IActionResult> ResignationReport(SearchResignationReport search)
        {
            try
            {
                var response = await this.reportService.ResignationReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("successionplanreport")]
        public async Task<IActionResult> SuccessionPlanReport(SearchSuccessionPlanReport search)
        {
            try
            {
                var response = await this.reportService.SuccessionPlanReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("transferreport")]
        public async Task<IActionResult> TransferReport(SearchTransferReport search)
        {
            try
            {
                var response = await this.reportService.TransferReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("requisitioncandidatereport")]
        public async Task<IActionResult> RequisitionCandidateReport(SearchRequisitionCandidateReport search)
        {
            try
            {
                var response = await this.reportService.RequisitionCandidateReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidatetrackerreport")]
        public async Task<IActionResult> CandidateTrackerReport(SearchCandidateTrackerReport search)
        {
            try
            {
                var response = await this.reportService.CandidateTrackerReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("employeesalaryreport")]
        public async Task<IActionResult> EmployeeSalaryReport(SearchEmployeeSalaryReport search)
        {
            try
            {
                var response = await this.reportService.EmployeeSalaryReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("leadtimereport")]
        public async Task<IActionResult> LeadTimeReport(SearchLeadTimeReport search)
        {
            try
            {
                var response = await this.reportService.LeadTimeReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("intervieworganisedreport")]
        public async Task<IActionResult> InterviewOrganisedReport(SearchInterviewOrganisedReport search)
        {
            try
            {
                var response = await this.reportService.InterviewOrganisedReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidatemanagementreport")]
        public async Task<IActionResult> CandidateManagementReport(SearchCandidateManagementReport search)
        {
            try
            {
                var response = await this.reportService.CandidateManagementReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("reportrequesterfunctionalheadrequisition")]
        public async Task<IActionResult> RequesterFunctionalHeadRequisitionReport(SearchReqFuncRequisition search)
        {
            try
            {
                var response = await this.reportService.RequesterFunctionalHeadRequisitionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("reportrequesterfunctionalheadofferedcandidate")]
        public async Task<IActionResult> RequesterFunctionalHeadOfferedCandidateReport(SearchReqFuncOfferedCandidate search)
        {
            try
            {
                var response = await this.reportService.RequesterFunctionalHeadOfferedCandidateReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("reportfunctionalheadattrition")]
        public async Task<IActionResult> FunctionalHeadAttritionReport(SearchFuncAttrition search)
        {
            try
            {
                var response = await this.reportService.FunctionalHeadAttritionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Arnab
        [HttpPost]
        [Route("hropsattritionreport")]
        public async Task<IActionResult> HROpsAttritionReport(HROpsAttritionInput search)
        {
            try
            {
                var response = await this.reportService.HROpsAttritionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("reportrecruitmentmanagerrequisition")]
        public async Task<IActionResult> RecruitmentManagerRequisitionReport(SearchRecruitmentManagerRequisition search)
        {
            try
            {
                var response = await this.reportService.RecruitmentManagerRequisitionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("reportinterviewfeedback")]
        public async Task<IActionResult> InterviewFeedbackReport(InterviewFeedbackSearch search)
        {
            try
            {
                var response = await this.reportService.InterviewFeedbackReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //Piu
        [HttpPost]
        [Route("salarystatisticsreport")]
        public async Task<IActionResult> SalaryStatisticsReport(SearchSalaryStatistics search)
        {
            try
            {
                var response = await this.reportService.SalaryStatisticsReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Piu
        [HttpPost]
        [Route("newjoinersrecruitmentactivityreport")]
        public async Task<IActionResult> NewJoinersRecruitmentActivityReport(SearchNewJoinersRecruitmentActivity search)
        {
            try
            {
                var response = await this.reportService.NewJoinersRecruitmentActivityReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Piu
        [HttpPost]
        [Route("newjoinersexternalrecruitmentreport")]
        public async Task<IActionResult> NewJoinersExternalRecruitmentReport(SearchNewJoinersExternalRecruitment search)
        {
            try
            {
                var response = await this.reportService.NewJoinersExternalRecruitmentReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [HttpPost]
        [Route("newjoinersverticalwisepositionreport")]
        public async Task<IActionResult> NewJoinersVerticalWisePositionReport(NewJoinersManufacturingSalesandMarketingWisePositionInput search)
        {
            try
            {
                var response = await this.reportService.NewJoinersVerticalWisePositionReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Piu
        [HttpPost]
        [Route("newjoinersoverallverticalwise")]
        public async Task<IActionResult> NewJoinersOverallVerticalWiseReport(SearchNewJoinersOverallVerticalWise search)
        {
            try
            {
                var response = await this.reportService.NewJoinersOverallVerticalWiseReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Piu
        [HttpPost]
        [Route("newjoinersrecruitmentmode")]
        public async Task<IActionResult> NewJoinersRecruitmentModeReport(SearchNewJoinersRecruitmentMode search)
        {
            try
            {
                var response = await this.reportService.NewJoinersRecruitmentModeReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallflexireport")]
        public async Task<IActionResult> GetAllFlexiReport(SearchFlexiList search)
        {
            try
            {
                var response = await this.reportService.GetAllFlexiReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getAllCandidateFlexiReport")]
        public async Task<IActionResult> GetAllCandidateFlexiReport(SearchFlexCandidateiList search)
        {
            try
            {
                var response = await this.reportService.GetAllCandidateFlexiReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getAllReqFlexiReport")]
        public async Task<IActionResult> GetAllReqFlexiReport(SearchFlexiRequisitionList search)
        {
            try
            {
                var response = await this.reportService.GetAllReqFlexiReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Ankita
        [HttpPost]
        [Route("CandidateDocumentReport")]
        public async Task<IActionResult> CandidateDocumentReport(CandidateDocumentReportInput search)
        {
            try
            {
                var response = await this.reportService.CandidateDocumentReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //ankita
        [HttpPost]
        [Route("GetAllcandidateIndividualtab")]
        public async Task<IActionResult> GetAllcandidateIndividualtab(GetAllcandidateIndividualtabInput abc)
        {
            try
            {
                var response = await this.reportService.GetAllcandidateIndividualtab(abc).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //GetAllBatchesPendingReportingVenue
        [HttpPost]
        [Route("GetAllforbatchtab")]
        public async Task<IActionResult> GetAllforbatchtab(GetAllbatchtabInput search)
        {
            try
            {
                var response = await this.reportService.GetAllforbatchtab(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GetAllCandidateInductionSchedule
        [HttpPost]
        [Route("getAllInductionScheduleDetails")]
        public async Task<IActionResult> getAllInductionScheduleDetails(GetAllCandidateInductionScheduleInput search)
        {
            try
            {
                var response = await this.reportService.getAllInductionScheduleDetails(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //getAllBatchWiseCandidateDetails
        [HttpPost]
        [Route("getAllBatchWiseCandidateDetails")]
        public async Task<IActionResult> getAllBatchWiseCandidateDetails(BatchWiseViewCandidateDetailsInput search)
        {
            try
            {
                var response = await this.reportService.getAllBatchWiseCandidateDetails(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //getAllReimbursementdetailsReport
        [HttpPost]
        [Route("getAllReimbursementdetailsReport")]
        public async Task<IActionResult> getAllReimbursementdetailsReport(ReimbursementdetailsReportInput search)
        {
            try
            {
                var response = await this.reportService.getAllReimbursementdetailsReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
//getAllInductionFeedbackDetails
        [HttpPost]
        [Route("getAllInductionFeedbackDetails")]
        public async Task<IActionResult> getAllInductionFeedbackDetails(InductionFeedbackDetailsInput search)
        {
            try
            {
                var response = await this.reportService.getAllInductionFeedbackDetails(search).ConfigureAwait(false);
                
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        

        [HttpPost]
        [Route("GetAllHandholdingDataAsReport")]
        public async Task<IActionResult> GetAllHandholdingDataAsReport(GetHandholding search)
        {
            try
            {
                var response = await this.reportService.GetAllHandholdingDataAsReport(search).ConfigureAwait(false);


                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        //getcandidatewiseviewfeedback
        [HttpPost]
        [Route("getcandidatewiseviewfeedback")]
        public async Task<IActionResult> getcandidatewiseviewfeedback(candidateviewfeedbackInput search)
        {
            try
            {
                var response = await this.reportService.getcandidatewiseviewfeedback(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //getAllViewCandidateFeedbackRepor
        [HttpPost]
        [Route("getAllViewCandidateFeedbackReport")]
        public async Task<IActionResult> getAllViewCandidateFeedbackReport(ViewCandidateFeedbackReportInput search)
        {
            try
            {
                var response = await this.reportService.getAllViewCandidateFeedbackReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        
        //Ankita
    }

}
