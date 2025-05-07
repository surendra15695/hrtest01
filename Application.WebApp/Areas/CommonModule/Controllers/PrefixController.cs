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
    [Route("api/prefix")]
    [ApiController]
    public class PrefixController : ControllerBase
    {
        private readonly IPrefixService prefixService;
        public PrefixController(IPrefixService prefixService)
        {
            this.prefixService = prefixService;
        }

        [HttpPost]
        [Route("getallprefix")]
        public async Task<IActionResult> GetAllPrefix(SearchPrefix search)
        {
            try
            {
                var response = await this.prefixService.GetAllPrefix(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
