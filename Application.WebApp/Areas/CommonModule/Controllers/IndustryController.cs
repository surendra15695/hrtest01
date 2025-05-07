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
    [Route("api/industry")]
    [ApiController]
    public class IndustryController : ControllerBase
    {
        private readonly IIndustryService industryService;
        public IndustryController(IIndustryService industryService)
        {
            this.industryService = industryService;
        }

        [HttpPost]
        [Route("getallindustry")]
        public async Task<IActionResult> GetAllIndustry(SearchIndustry search)
        {
            try
            {
                var response = await this.industryService.GetAllIndustry(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addindustry")]
        public async Task<IActionResult> AddIndustry(Industry formData)
        {
            try
            {
                var response = await this.industryService.IndustryInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}