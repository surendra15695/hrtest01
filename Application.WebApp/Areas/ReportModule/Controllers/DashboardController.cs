using Application.Entity.Entities.Dashboard;
using Application.Service.Services.Interfaces.DashboardService;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.WebApp.Areas.ReportModule.Controllers
{
    [Route("api/dashboard")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IDashboardService dashboardService;
        public DashboardController(IDashboardService dashboardService, IWebHostEnvironment environment)
        {
            this.dashboardService = dashboardService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getrmdashboard")]
        public async Task<IActionResult> GetRMDashboard(SearchRMDashboard search)
        {
            try
            {
                var response = await this.dashboardService.GetRMDashboard(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
