using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.VendorModule;
using Application.Service.Services.Interfaces.VendorModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.WebApp.Areas.VendorModule
{
    [Route("api/vendorjob")]
    [ApiController]
    public class VendorJobController : ControllerBase
    {
        private readonly IVendorJobService vendorJobService;
        public VendorJobController(IVendorJobService vendorJobService)
        {
            this.vendorJobService = vendorJobService;
        }

        [HttpPost]
        [Route("getcurrentjob")]
        public async Task<IActionResult> GetCurrentJob(SearchCurrentJob search)
        {
            try
            {
                var response = await this.vendorJobService.GetCurrentJob(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getvendorjoblist")]
        public async Task<IActionResult> GetVendorJobList(SearchVendorJobList search)
        {
            try
            {
                var response = await this.vendorJobService.GetVendorJobList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getarchivedjoblist")]
        public async Task<IActionResult> GetArchivedJobList(SearchVendorJobList search)
        {
            try
            {
                var response = await this.vendorJobService.GetArchivedJobList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}