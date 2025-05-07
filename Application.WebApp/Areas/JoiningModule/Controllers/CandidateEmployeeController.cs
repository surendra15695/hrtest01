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
    [Route("api/candidateemployee")]
    [ApiController]
    public class CandidateEmployeeController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICandidateEmployeeDetailsService candidateemployeedetailsservice;
        public CandidateEmployeeController(ICandidateEmployeeDetailsService candidateemployeedetailsservice, IWebHostEnvironment environment)
        {
            this.candidateemployeedetailsservice = candidateemployeedetailsservice;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getcandidateemployeelistall")]
        public async Task<IActionResult> GetCandidateEmployeeListAll(CandidateEmployeeSearch search)
        {
            try
            {
                var response = await this.candidateemployeedetailsservice.GetCandidateEmployeeListAll(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savenoticeperiodbuyoutenable")]
        public async Task<IActionResult> SaveNoticePeriodBuyOutEnable(CandidateNoticePeriodBuyOutEnableSave formdata)
        {
            try
            {
                var response = await this.candidateemployeedetailsservice.SaveNoticePeriodBuyOutEnable(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("savenoticeperiodbuyoutdisable")]
        public async Task<IActionResult> SaveNoticeperiodbuyoutDisable(CandidateNoticePeriodBuyOutEnableSave formdata)
        {
            try
            {
                var response = await this.candidateemployeedetailsservice.SaveNoticeperiodbuyoutDisable(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("saverelocationreimbursementenable")]
        public async Task<IActionResult> SaveRelocationReimbursementEnable(CandidateRelocationReimbursementEnableSave formdata)
        {
            try
            {
                var response = await this.candidateemployeedetailsservice.SaveRelocationReimbursementEnable(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("saverelocationreimbursementdisable")]
        public async Task<IActionResult> SaveRelocationReimbursementDisable(CandidateRelocationReimbursementEnableSave formdata)
        {
            try
            {
                var response = await this.candidateemployeedetailsservice.SaveRelocationReimbursementDisable(formdata)
                    .ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
