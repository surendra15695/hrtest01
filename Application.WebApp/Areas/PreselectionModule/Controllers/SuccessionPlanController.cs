using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.PreselectionModule.Controllers
{
    [Route("api/successionplan")]
    [ApiController]
    public class SuccessPlanController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ISuccessionPlanService successionPlanService;
        public SuccessPlanController(ISuccessionPlanService successionPlanService, IWebHostEnvironment environment)
        {
            this.successionPlanService = successionPlanService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("generatesuccessionplan")]
        public async Task<IActionResult> GenerateSuccessPlan(SuccessionPlanFormData formData)
        {
            try
            {
                var response = await this.successionPlanService.SuccessionPlanInsert(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsuccessionplanlist")]
        public async Task<IActionResult> GetAllSuccessionPlanList(SearchSuccessionPlanList search)
        {
            try
            {
                var response = await this.successionPlanService.GetAllSuccessionPlanList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getsuccessionplanlistforReport")]
        public async Task<IActionResult> GetAllSuccessionPlanListReport(SearchSuccessionPlanList search)
        {
            try
            {
                var response = await this.successionPlanService.GetAllSuccessionPlanListReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("acknowledgesuccessionplan")]
        public async Task<IActionResult> SuccessionPlanAcknowledgement(SuccessionPlanAcknowledgementFormData formdata)
        {
            try
            {
                var response = await this.successionPlanService.SuccessionPlanAcknowledgement(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("mergesuccessionplan")]
        public async Task<IActionResult> MergeSuccessionPlan(MergeSuccessionPlanFormData formdata)
        {
            try
            {
                var response = await this.successionPlanService.MergeSuccessionPlan(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("successionplanapprovereject")]
        public async Task<IActionResult> SuccessionPlanApproveReject(SuccessionPlanApproveRejectFormData formData)
        {
            try
            {
                var response = await this.successionPlanService.SuccessionPlanApproveReject(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsuccessionplanholdreleaselist")]
        public async Task<IActionResult> GetAllSuccessionPlanHoldReleaseList(SearchSuccessionPlanHoldRelease search)
        {
            try
            {
                var response = await this.successionPlanService.GetAllSuccessionPlanHoldReleaseList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateholdrelease")]
        public async Task<IActionResult> UpdateHoldRelease(SuccessionPlanHoldReleaseSubmitFormData formData)
        {
            try
            {
                var response = await this.successionPlanService.UpdateHoldRelease(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("deletesuccessionplan")]
        public async Task<IActionResult> DeleteBeforeSuccessionPlan(DeleteSuccessionPlanList formData)
        {
            try
            {
                var response = await this.successionPlanService.DeleteBeforeSuccessionPlan(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}