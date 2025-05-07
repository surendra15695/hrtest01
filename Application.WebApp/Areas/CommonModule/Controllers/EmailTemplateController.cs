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
    [Route("api/emailtemplate")]
    [ApiController]
    public class EmailTemplateController : ControllerBase
    {
        private readonly IEmailTemplateService emailTemplateService;
        public EmailTemplateController(IEmailTemplateService emailTemplateService)
        {
            this.emailTemplateService = emailTemplateService;
        }

        [HttpPost]
        [Route("getallemailtemplatetype")]
        public async Task<IActionResult> GetAllEmailTemplateType(SearchEmailTemplateType search)
        {
            try
            {
                var response = await this.emailTemplateService.GetAllEmailTemplateType(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallemailtemplate")]
        public async Task<IActionResult> GetAllEmailTemplate(SearchEmailTemplate search)
        {
            try
            {
                var response = await this.emailTemplateService.GetAllEmailTemplate(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addemailtemplate")]
        public async Task<IActionResult> EmailTemplateInsertUpdate(AddEmailTemplate formData)
        {
            try
            {
                var response = await this.emailTemplateService.EmailTemplateInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}