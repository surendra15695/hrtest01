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
    [Route("api/salary")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService salaryService;
        public SalaryController(ISalaryService salaryService)
        {
            this.salaryService = salaryService;
        }

        [HttpPost]
        [Route("getallsalary")]
        public async Task<IActionResult> GetAllSalary(SearchSalary search)
        {
            try
            {
                var response = await this.salaryService.GetAllSalary(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("insertupdatesalary")]
        public async Task<IActionResult> InsertUpdateSalary(InsUpSalary insUpSalary)
        {
            try
            {
                var response = await this.salaryService.InsertUpdateSalaryMaster(insUpSalary).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}