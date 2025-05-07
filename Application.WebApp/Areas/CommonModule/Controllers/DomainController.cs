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
    [Route("api/domain")]
    [ApiController]
    public class DomainController : ControllerBase
    {
        private readonly IDomainService domainService;
        public DomainController(IDomainService domainService)
        {
            this.domainService = domainService;
        }

        [HttpPost]
        [Route("getalldomain")]
        public async Task<IActionResult> GetAllDomain(SearchDomain search)
        {
            try
            {
                var response = await this.domainService.GetAllDomain(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("adddomain")]
        public async Task<IActionResult> DomainInsertUpdate(Domain formData)
        {
            try
            {
                var response = await this.domainService.DomainInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallsubdomain")]
        public async Task<IActionResult> GetAllSubDomain(SearchSubDomain search)
        {
            try
            {
                var response = await this.domainService.GetAllSubDomain(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallsubdomainnew")]
        public async Task<IActionResult> GetAllSubDomainNew(SearchSubDomain search)
        {
            try
            {
                var response = await this.domainService.GetAllSubDomainNew(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }


        }
        [HttpPost]
        [Route("addsubdomain")]
        public async Task<IActionResult> SubDomainInsertUpdate(SaveSubDomain formData)
        {
            try
            {
                var response = await this.domainService.SubDomainInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}