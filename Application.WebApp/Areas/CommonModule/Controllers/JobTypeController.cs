using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/jobtype")]
    [ApiController]
    public class JobTypeController : ControllerBase
    {
        private readonly IJobTypeService jobtypeService;
        public JobTypeController(IJobTypeService jobtypeService)
        {
            this.jobtypeService = jobtypeService;
        }

        [HttpPost]
        [Route("getalljobtype")]
        public async Task<IActionResult> GetAllJobType(SearchJobType search)
        {
            try
            {
                var response = await this.jobtypeService.GetAllJobType(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addjobtype")]
        public async Task<IActionResult> AddJobType(JobType formData)
        {
            try
            {
                var response = await this.jobtypeService.JobTypeInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}