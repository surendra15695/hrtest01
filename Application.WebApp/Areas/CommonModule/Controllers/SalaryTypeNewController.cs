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
    [Route("api/salarytypenew")]
    [ApiController]
    public class SalaryTypeNewController : ControllerBase
    {
        private readonly ISalaryTypeNewService salaryTypeNewService;
        public SalaryTypeNewController(ISalaryTypeNewService salaryTypeNewService)
        {
            this.salaryTypeNewService = salaryTypeNewService;
        }
        //public IActionResult Index()
        //{
        //    return View();
        //}

        [HttpPost]
        [Route("getallsalarytypelist")]
        public async Task<IActionResult> GetAllSalaryTypeList(SearchSalaryTypeNewList search)
        {
            try
            {
                var response = await this.salaryTypeNewService.GetAllSalaryTypeList(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("addsalarytype")]
        public async Task<IActionResult> SalaryTypeInsertUpdate(SalaryTypeNew formData)
        {
            try
            {
                var response = await this.salaryTypeNewService.SalaryTypeInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }

}
