using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
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

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/paystructure")]
    [ApiController]
    public class PaystructureController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IPaystructureService paystructureservice;
        public PaystructureController(IPaystructureService paystructureservice, IWebHostEnvironment environment)
        {
            this.paystructureservice = paystructureservice;
            this.environment = environment;
        }

        [HttpPost]
        [Route("calculatepaystructure")]
        public async Task<IActionResult> CalculatePayStructure(SearchCalculatePayStructure Search)
        {
            try
            {
                //SearchCalculatePayStructure Search = new SearchCalculatePayStructure();
                //string CalculteSalry = Search .CalculteSalryDetails;
                

                ClaCulatePayStructure ClaCulatePayStructureData = new ClaCulatePayStructure();
                ClaCulatePayStructureData = await this.paystructureservice.CalculatePayStructure(Search).ConfigureAwait(false);

                ClaCulatePayStructureAll ClaCulatePayStructureAll = new ClaCulatePayStructureAll();
                //ClaCulatePayStructureData = await this.paystructureservice.CalculatePayStructure(data).ConfigureAwait(false);

                ClaCulatePayStructureAll.CTC = ClaCulatePayStructureData.ClaCulatePayStructureHeader.CTC;
                ClaCulatePayStructureAll.ClaCulatePayStructureValue = ClaCulatePayStructureData.ClaCulatePayStructureValue;
                ClaCulatePayStructureAll.ClaCulatePayStructureValueFormat = ClaCulatePayStructureData.ClaCulatePayStructureValueFormat;
                return this.Ok(ClaCulatePayStructureAll);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsalarytemplate")]
        public async Task<IActionResult> GetSalaryTemplate(SearchSalaryTemplate search)
        {
            try
            {
                SalaryTemplate SalaryTemplate = new SalaryTemplate();
                SalaryTemplate = await this.paystructureservice.GetSalaryTemplate(search).ConfigureAwait(false);

                SalaryTemplateFormData SalaryTemplateFormData = new SalaryTemplateFormData();
                SalaryTemplateFormData.SalaryTemplateId = SalaryTemplate.SalaryTemplateMasterData.SalaryTemplateId;
                SalaryTemplateFormData.SalaryTemplateName = SalaryTemplate.SalaryTemplateMasterData.SalaryTemplateName;
                SalaryTemplateFormData.Grade = SalaryTemplate.SalaryTemplateMasterData.Grade;
                SalaryTemplateFormData.GradeName = SalaryTemplate.SalaryTemplateMasterData.GradeName;
                SalaryTemplateFormData.CTC = SalaryTemplate.SalaryTemplateMasterData.CTC;
                SalaryTemplateFormData.IsActive = SalaryTemplate.SalaryTemplateMasterData.IsActive;
                SalaryTemplateFormData.CreatedBy = SalaryTemplate.SalaryTemplateMasterData.CreatedBy;

                SalaryTemplateFormData.SalaryTemplateDetails = SalaryTemplate.SalaryTemplateDetails;
                SalaryTemplateFormData.SalaryTemplateDetailsFormat = SalaryTemplate.SalaryTemplateDetailsFormat;
                return this.Ok(SalaryTemplateFormData);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("insertsalarytemplate")]
        public async Task<IActionResult> InsertSalaryTemplate(IFormCollection data)
        {
            try
            {

                SalaryTemplateData formData = new SalaryTemplateData();
                formData.SalaryTemplateName = data["SalaryTemplateName"];
                formData.SalaryTemplateId =Convert.ToInt32(data["SalaryTemplateId"]);
                formData.Grade = Convert.ToInt32(data["Grade"]);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);                
                string ClaCulatePayStructure = data["ClaCulatePayStructureSearch"];
                formData.CalculteSalryDetails = JsonConvert.DeserializeObject<List<ClaCulatePayStructureSearch>>(ClaCulatePayStructure);               


                var response = await this.paystructureservice.SaveSalaryTemplate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("updateSalaryTemplate")]
        public async Task<IActionResult> UpdateSalaryTemplate(IFormCollection data)
        {
            try
            {
                SalaryTemplateData formData = new SalaryTemplateData();
                formData.SalaryTemplateId = Convert.ToInt32(data["SalaryTemplateId"]);
                formData.SalaryTemplateName = data["SalaryTemplateName"];
                formData.Grade = Convert.ToInt32(data["Grade"]);
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                string ClaCulatePayStructure = data["ClaCulatePayStructureSearch"];
                formData.CalculteSalryDetails = JsonConvert.DeserializeObject<List<ClaCulatePayStructureSearch>>(ClaCulatePayStructure);


                var response = await this.paystructureservice.SaveSalaryTemplate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallsalarytype")]
        public async Task<IActionResult> GetAllSalaryType(SearchSalaryType search)
        {
            try
            {
                var response = await this.paystructureservice.GetAllSalaryType(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallsalaryaccounthead")]
        public async Task<IActionResult> GetAllSalaryAccountHead(SearchSalaryAccountHead search)
        {
            try
            {
                var response = await this.paystructureservice.GetAllSalaryAccountHead(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savesalarytype")]
        public async Task<IActionResult> SaveSalaryType(SalaryType formData)
        {
            try
            {
                var response = await this.paystructureservice.SaveSalaryType(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savesalaryaccounthead")]
        public async Task<IActionResult> SaveSalaryAccountHead(SalaryAccountHead formData)
        {
            try
            {
                var response = await this.paystructureservice.SaveSalaryAccountHead(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsalarytemplatelist")]
        public async Task<IActionResult> GetSalaryTemplateList(SearchSalaryTemplate search)
        {
            try
            {
                var response = await this.paystructureservice.GetSalaryTemplateList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getsalarytemplateformula")]
        public async Task<IActionResult> GetSalaryTemplateFormula(SearchSalaryTemplate search)
        {
            try
            {
                var response = await this.paystructureservice.GetSalaryTemplateFormula(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
