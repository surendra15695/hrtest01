using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.WebApp.Areas.CommonModule.Controllers
{


    [Route("api/ModeOfJoining")]
    [ApiController]
    public class ModeOfJoiningController : ControllerBase
    {
        private readonly IModeofJoiningService ModeofJoiningService;
        public ModeOfJoiningController(
            IModeofJoiningService modeofJoiningService
            )
        {
            this.ModeofJoiningService = modeofJoiningService;
        }
        [HttpPost]
        [Route("GetAllModeOfJoining")]
        public async Task<IActionResult> GetAllModeOfJoining(GetAllModeofJoiningParam Param)
        {
            try
            {
                var response = await this.ModeofJoiningService.GetAllModeOfJoining(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("ModeofJoiningInsertUpdate")]
        public async Task<IActionResult> ModeofJoiningInsertUpdate(ModeofJoiningInsertUpdateParam Param)
        {
            try
            {
                var response = await this.ModeofJoiningService.ModeOfJoiningInsertUpdate(Param).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
