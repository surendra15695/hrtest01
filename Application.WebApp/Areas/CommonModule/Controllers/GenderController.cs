using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/gender")]
    [ApiController]
    public class GenderController : ControllerBase
    {
        private readonly IGenderService genderService;
        public GenderController(IGenderService genderService)
        {
            this.genderService = genderService;
        }

        [HttpPost]
        [Route("getallgender")]
        public async Task<IActionResult> GetAllGender(SearchGender search)
        {
            try
            {
                var response = await this.genderService.GetAllGenders(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
