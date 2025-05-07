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
    [Route("api/selectionguide")]
    [ApiController]
    public class SelectionGuideController : ControllerBase
    {
        private readonly ISelectionGuideService selectionGuideService;
        public SelectionGuideController(ISelectionGuideService selectionGuideService)
        {
            this.selectionGuideService = selectionGuideService;
        }

        [HttpPost]
        [Route("getallselectionGuide")]
        public async Task<IActionResult> GetAllSelectionGuide(SearchSelectionGuide search)
        {
            try
            {
                var response = await this.selectionGuideService.GetAllSelectionGuide(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallselectionguideinterview")]
        public async Task<IActionResult> GetSelectionGuideInterview(SearchSelectionGuideInterview search)
        {
            try
            {
                var response = await this.selectionGuideService.GetSelectionGuideInterview(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addselectionguide")]
        public async Task<IActionResult> SelectionGuideInsertUpdate(SelectionGuide formData)
        {
            try
            {
                var response = await this.selectionGuideService.SelectionGuideInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}