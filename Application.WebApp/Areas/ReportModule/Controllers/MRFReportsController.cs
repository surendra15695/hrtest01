using Application.Entity.Entities.Dashboard;
using Application.Entity.Entities.ReportModule;
using Application.Service.Services.Interfaces.ReportModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.WebApp.Areas.ReportModule.Controllers
{
    [Route("api/mrfreports")]
    [ApiController]
    public class MRFReportsController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IMRFReports mrfReports;
        public MRFReportsController(IMRFReports mrfReports, IWebHostEnvironment environment)
        {
            this.mrfReports = mrfReports;
            this.environment = environment;
        }
        [HttpPost]
        [Route("noticeperiod")]
        public async Task<IActionResult> GetNoticePeriod(SearchNoticePeriod search)
        {
            try
            {
                var response = await this.mrfReports.GetNoticePeriod(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("relocation")]
        public async Task<IActionResult> GetRelocation(SearchRelocationReport search)
        {
            try
            {
                var response = await this.mrfReports.GetRelocation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("travelreimbursement")]
        public async Task<IActionResult> GetTravelReimbursement(SearchTravelReimbursementReport search)
        {
            try
            {
                var response = await this.mrfReports.GetTravelReimbursement(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("hropsresignation")]
        public async Task<IActionResult> GetHROpsResignation(SearchHROpsResignation search)
        {
            try
            {
                var response = await this.mrfReports.GetHROpsResignation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("vendorcandidate")]
        public async Task<IActionResult> GetVendorCandidateReport(SearchVendorCandidateReport search)
        {
            try
            {
                var response = await this.mrfReports.GetVendorCandidateReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("documentstatus")]
        public async Task<IActionResult> GetDocumentStatus(SearchDocumentStatus search)
        {
            try
            {
                var response = await this.mrfReports.GetDocumentStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("interviewcalender")]//Piu
        public async Task<IActionResult> GetInterviewCalender(SearchInterviewCalender search)
        {
            try
            {
                var response = await this.mrfReports.GetInterviewCalender(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("noticeperiodCostsaving")]  //arg
        public async Task<IActionResult> GetNoticePeriodSavingCost(SearchNoticePeriodSavingCost search)
        {
            try
            {
                var response = await this.mrfReports.GetNoticePeriodSavingCost(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("employeesalary")]
        public async Task<IActionResult> GetEmployeeSalary(SearchEmployeeSalary search)
        {
            try
            {
                var response = await this.mrfReports.GetEmployeeSalary(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //Arnab
        [Route("recruitmentcostsavingreport")]
        public async Task<IActionResult> RecruitmentCostSavingReport(RecruitmentCostSavingInput search)
        {
            try
            {
                var response = await this.mrfReports.RecruitmentCostSavingReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("candidatemasterforallreport")]
        public async Task<IActionResult> candidateDetailsforMaster(SearchCandidateDetails search)
        {
            try
            {
                var response = await this.mrfReports.candidateDetailsforMaster(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }


}
