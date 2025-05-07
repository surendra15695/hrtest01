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
    [Route("api/venue")]
    [ApiController]
    public class VenueController : ControllerBase
    {
        private readonly IVenueService venueService;
        public VenueController(IVenueService venueService)
        {
            this.venueService = venueService;
        }

        [HttpPost]
        [Route("getallvenue")]
        public async Task<IActionResult> GetAllVenue(SearchVenue search)
        {
            try
            {
                var response = await this.venueService.GetAllVenue(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallinductionvenue")]
        public async Task<IActionResult> GetAllInductionVenue(AllInductionVenueParam search)
        {
            try
            {
                var response = await this.venueService.GetAllInductionVenue(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallinductionvenuewithexternal")]
        public async Task<IActionResult> GetAllInductionVenueExternal(AllInductionVenueParam search)
        {
            try
            {
                var response = await this.venueService.GetAllInductionVenueExternal(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("InductionVenueInsertUpdate")]
        public async Task<IActionResult> InductionVenueInsertUpdate(InductionVenueInserUpdateParam Param)
        {
            try
            {
                var response = await this.venueService.InductionVenueInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("GetAllReportingVenue")]
        public async Task<IActionResult> GetAllReportingVenue(SearchReportingVenue search)
        {
            try
            {
                var response = await this.venueService.GetAllReportingVenue(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("ReportingVenueInsertUpdate")]
        public async Task<IActionResult> ReportingVenueInsertUpdate(ReportingVenueInsertUpdate Param)
        {
            try
            {
                var response = await this.venueService.ReportingVenueInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        // Induction External Venue-
        [HttpPost]
        [Route("ExternalInductionVenueInsertUpdate")]
        public async Task<IActionResult> ExternalInductionVenueInsertUpdate(ExternalInductionVenueInserUpdateParam Param)
        {
            try
            {
                var response = await this.venueService.ExternalInductionVenueInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("GetAllExternalInductionVenue")]
        public async Task<IActionResult> GetAllExternalInductionVenue(SearchExternalInductionVenue search)
        {
            try
            {
                var response = await this.venueService.GetAllExternalInductionVenue(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("GetAllLocationWiseTrainingInCharge")]
        public async Task<IActionResult> GetAllLocationWiseTrainingInCharge(SearchLocationWiseTrainingInCharge search)
        {
            try
            {
                var response = await this.venueService.GetAllLocationWiseTrainingInCharge(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("LocationWiseTrainingInChargeInsertUpdate")]
        public async Task<IActionResult> LocationWiseTrainingInChargeInsertUpdate(LocationWiseTrainingInChargeInsertUpdate Param)
        {
            try
            {
                var response = await this.venueService.LocationWiseTrainingInChargeInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("GetAllInterviewVenue")]
        public async Task<IActionResult> GetAllInterviewVenue(SearchInterviewVenue search)
        {
            try
            {
                var response = await this.venueService.GetAllInterviewVenue(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("GetAllTestVenue")]
        public async Task<IActionResult> GetAllTestVenue(SearchTestVenue search)
        {
            try
            {
                var response = await this.venueService.GetAllTestVenue(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("InterviewVenueInsertUpdate")]
        public async Task<IActionResult> InterviewVenueInsertUpdate(InterviewVenueInsertUpdate Param)
        {
            try
            {
                var response = await this.venueService.InterviewVenueInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("TestVenueInsertUpdate")]
        public async Task<IActionResult> TestVenueInsertUpdate(TestVenueInsertUpdate Param)
        {
            try
            {
                var response = await this.venueService.TestVenueInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("GetFamilyRelation")]
        public async Task<IActionResult> GetFamilyRelation(SearchFamilyRelation search)
        {
            try
            {
                var response = await this.venueService.GetFamilyRelation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}