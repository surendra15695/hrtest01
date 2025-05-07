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
    [Route("api/position")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService positionService;
        public PositionController(IPositionService positionService)
        {
            this.positionService = positionService;
        }

        [HttpPost]
        [Route("getallverticalposition")]
        public async Task<IActionResult> GetAllVerticalPosition(SearchPosition search)
        {
            try
            {
                var response = await this.positionService.GetAllPositionVertical(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallpositiongrade")]
        public async Task<IActionResult> GetAllPositionGrade(SearchPositionGrade search)
        {
            try
            {
                var response = await this.positionService.GetAllPositionGrade(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallverticalpositiongrade")]
        public async Task<IActionResult> GetAllPositionGradeList(SearchPosition search)
        {
            try
            {
                var response = await this.positionService.GetAllPositionGradeList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallgrade")]
        public async Task<IActionResult> GetAllGrade(SearchGrade search)
        {
            try
            {
                var response = await this.positionService.GetAllGrade(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addgrade")]
        public async Task<IActionResult> GradeInsertUpdate(Grade formData)
        {
            try
            {
                var response = await this.positionService.GradeInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savepositionverical")]
        public async Task<IActionResult> SavePositionVerical(PositionVertical formData)
        {
            try
            {
                var response = await this.positionService.SavePositionVerical(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallpositionmasterlist")]
        public async Task<IActionResult> GetAllPositionMasterList(SearchPositionMaster search)
        {
            try
            {
                var response = await this.positionService.GetAllPositionMasterList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savepositionmaster")]
        public async Task<IActionResult> SavePositionMaster(PositionMaster formData)
        {
            try
            {
                var response = await this.positionService.SavePositionMaster(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallgradeposition")]
        public async Task<IActionResult> GetAllGradePosition(SearchPositionGrade search)
        {
            try
            {
                var response = await this.positionService.GetAllGradePosition(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallgradepositionNew")]
        public async Task<IActionResult> GetAllGradePositionNew(SearchPositionGradeNew search)
        {
            try
            {
                var response = await this.positionService.GetAllGradePositionNew(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savegradeposition")]
        public async Task<IActionResult> SaveGradePosition(PositionGradeSave formData)
        {
            try
            {
                var response = await this.positionService.SaveGradePosition(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savevericalwiseposition")]
        public async Task<IActionResult> SaveVerticalPosition(VerticalWisePositionFormData formData)
        {
            try
            {
                var response = await this.positionService.SaveVerticalPosition(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallverticalwisepositionlist")]
        public async Task<IActionResult> GetAllVerticalWisePosition(SearchVerticalWisePositionList search)
        {
            try
            {
                var response = await this.positionService.GetAllVerticalWisePosition(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallverticalpositionformapping")]
        public async Task<IActionResult> GetAllVerticalPositionForMapping(SearchVerticalWisePositionList search)
        {
            try
            {
                var response = await this.positionService.GetAllVerticalPositionForMapping(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallfunctionwisepositionlist")]
        public async Task<IActionResult> GetAllFunctionWisePosition(SearchFunctionWisePositionList search)
        {
            try
            {
                var response = await this.positionService.GetAllFunctionWisePosition(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savefunctionwiseposition")]
        public async Task<IActionResult> SaveFunctionWisePosition(FunctionWisePositionFormData formData)
        {
            try
            {
                var response = await this.positionService.SaveFunctionWisePosition(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallfunctionposition")]
        public async Task<IActionResult> GetAllFunctionPosition(SearchFunctionPosition search)
        {
            try
            {
                var response = await this.positionService.GetAllFunctionPosition(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }



    }
}