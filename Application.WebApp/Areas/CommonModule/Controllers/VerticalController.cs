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
    [Route("api/vertical")]
    [ApiController]
    public class VerticalController : ControllerBase
    {
        private readonly IVerticalService verticalService;
        public VerticalController(IVerticalService verticalService)
        {
            this.verticalService = verticalService;
        }

        [HttpPost]
        [Route("getallvertical")]
        public async Task<IActionResult> GetAllVertical(SearchVertical search)
        {
            try
            {
                var response = await this.verticalService.GetAllVertical(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampusvertical")]
        public async Task<IActionResult> GetAllCampusVertical(SearchVertical search)
        {
            try
            {
                var response = await this.verticalService.GetAllCampusVertical(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getallverticalrm")]
        public async Task<IActionResult> GetAllVerticalRM(SearchVerticalRM search)
        {
            try
            {
                var response = await this.verticalService.GetAllVerticalRM(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallverticalhiringmanager")]
        public async Task<IActionResult> GetAllVerticalHiringManager(SearchVerticalHiringManager search)
        {
            try
            {
                var response = await this.verticalService.GetAllVerticalHiringManager(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallverticalfunctionhiringmanager")]
        public async Task<IActionResult> GetAllVerticalFunctionHiringManager(SearchVerticalFunctHiringManager search)
        {
            try
            {
                var response = await this.verticalService.GetAllVerticalFunctionHiringManager(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("verticalrminsertupdate")]
        public async Task<IActionResult> VerticalRMInsertUpdate(VerticalRMSave formData)
        {
            try
            {
                var response = await this.verticalService.VerticalRMInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}