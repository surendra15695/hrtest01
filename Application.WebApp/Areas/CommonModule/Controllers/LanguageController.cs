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
    [Route("api/language")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageService languageService;
        public LanguageController(ILanguageService languageService)
        {
            this.languageService = languageService;
        }

        [HttpPost]
        [Route("getalllanguage")]
        public async Task<IActionResult> GetAllLanguage(SearchLanguage search)
        {
            try
            {
                var response = await this.languageService.GetAllLanguage(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addlanguage")]
        public async Task<IActionResult> LanguageInsertUpdate(LanguageFormData formData)
        {
            try
            {
                var response = await this.languageService.LanguageInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}