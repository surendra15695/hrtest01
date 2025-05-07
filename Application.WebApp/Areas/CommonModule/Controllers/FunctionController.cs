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
    [Route("api/function")]
    [ApiController]
    public class FunctionController : ControllerBase
    {
        private readonly IFunctionService functionService;
        public FunctionController(IFunctionService functionService)
        {
            this.functionService = functionService;
        }

        [HttpPost]
        [Route("getallverticalfunction")]
        public async Task<IActionResult> GetAllVerticalFunction(SearchFunction search)
        {
            try
            {
                var response = await this.functionService.GetAllVerticalFunction(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("candidatesearchgetallfunction")]
        public async Task<IActionResult> CanidateSearchGetAllVerticalFunction(CandaiteSearchFunction search)
        {
            try
            {
                var response = await this.functionService.CanidateSearchGetAllVerticalFunction(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampusverticalfunction")]
        public async Task<IActionResult> GetAllCampusVerticalFunction(SearchFunction search)
        {
            try
            {
                var response = await this.functionService.GetAllCampusVerticalFunction(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallverticalfunctiondepartmenthead")]
        public async Task<IActionResult> GetAllVerticalFunctionDepartmentHead(SearchVerticalFunctionDepartmentHead search)
        {
            try
            {
                var response = await this.functionService.GetAllVerticalFunctionDepartmentHead(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addfunction")]
        public async Task<IActionResult> VerticalFunctionInsertUpdate(Function formData)
        {
            try
            {
                var response = await this.functionService.VerticalFunctionInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcampusfunction")]
        public async Task<IActionResult> CampusVerticalFunctionInsertUpdate(CampusFunction formData)
        {
            try
            {
                var response = await this.functionService.CamusVerticalFunctionInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallfunctiondepartmenthead")]
        public async Task<IActionResult> GetAllFunctionDepartmentHead(SearchFunctionDepartmentHead search)
        {
            try
            {
                var response = await this.functionService.GetAllFunctionDepartmentHead(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("functiondepartmentheadinsertupdate")]
        public async Task<IActionResult> FunctionDepartmentHeadInsertUpdate(FunctionDepartmentHead formData)
        {
            try
            {
                var response = await this.functionService.FunctionDepartmentHeadInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalllocationfunction")]
        public async Task<IActionResult> GetAllLocationFunction(SearchLocationFunction search)
        {
            try
            {
                var response = await this.functionService.GetAllLocationFunction(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallverticalfunctionhiringmanager")]
        public async Task<IActionResult> GetAllVerticalFunctionHiringManager(SearchVerticalFunctionHiringManager search)
        {
            try
            {
                var response = await this.functionService.GetAllVerticalFunctionHiringManager(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addverticalfunctionhiringmanager")]
        public async Task<IActionResult> VerticalFunctionHiringManagerInsertUpdate(SaveVerticalFunctionHiringManager formData)
        {
            try
            {
                var response = await this.functionService.VerticalFunctionHiringManagerInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}