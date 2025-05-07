using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.IO;
//using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/gradesalary")]
    [ApiController]
    public class GradeSalaryController : ControllerBase
    {
        private readonly IGradeSalaryService gradesalryService;
        public GradeSalaryController(IGradeSalaryService gradesalryService)
        {
            this.gradesalryService = gradesalryService;
        }

        [HttpPost]
        [Route("getallsalaryhead")]
        public async Task<IActionResult> GetAllSalaryHead(SearchSalaryHead search)
        {
            try
            {
                var response = await this.gradesalryService.GetAllSalaryHead(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savesalaryhead")]
        public async Task<IActionResult> SaveSalaryHead(SalaryHead formdata)
        {
            try
            {
                var response = await this.gradesalryService.SaveSalaryHead(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallsalarygradetemplate")]
        public async Task<IActionResult> GetAllSalaryGradeTemplate(SearchGradeTemplate search)
        {
            try
            {
                var response = await this.gradesalryService.GetAllSalaryGradeTemplate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("salarygradetemplate")]
        public async Task<IActionResult> SaveSalaryGradeTemplate(SalaryGradeTemplate formdata)
        {
            try
            {
                var response = await this.gradesalryService.SaveSalaryGradeTemplate(formdata).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallgradesalary")]
        public async Task<IActionResult> GetAllGradeSalary(SearchGradeSalary search)
        {
            try
            {
                var response = await this.gradesalryService.GetAllGradeSalary(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("insertgradesalary")]
        public async Task<IActionResult> InsertGradeSalary(IFormCollection data)
        {
            try
            {
                GradeSalary formData = new GradeSalary();
                formData.Template = Convert.ToInt32(data["Template"]);
                formData.Grade = Convert.ToInt32(data["Grade"]);               
                string SalaryData = data["SalaryDetails"];
                formData.SalaryDetails = JsonConvert.DeserializeObject<List<GradeSalaryDetails>>(SalaryData);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.gradesalryService.SaveGradeSalary(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updategradesalary")]
        public async Task<IActionResult> UpdateGradeSalary(IFormCollection data)
        {
            try
            {
                GradeSalary formData = new GradeSalary();
                formData.GradeSalaryId = Convert.ToInt32(data["GradeSalaryId"]);
                formData.Template = Convert.ToInt32(data["Template"]);
                formData.Grade = Convert.ToInt32(data["Grade"]);
                string SalaryData = data["SalaryDetails"];
                formData.SalaryDetails = JsonConvert.DeserializeObject<List<GradeSalaryDetails>>(SalaryData);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);


                var response = await this.gradesalryService.SaveGradeSalary(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
