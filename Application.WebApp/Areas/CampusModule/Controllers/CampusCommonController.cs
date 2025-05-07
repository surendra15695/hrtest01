using Application.Entity.Entities.CampusModule;
using Application.Service.Services.Interfaces.CampusModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.WebApp.Areas.CampusModule.Controllers
{
    [Route("api/campuscommon")]
    [ApiController]
    public class CampusCommonController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ICampusCommonService campusCommonService;
        public CampusCommonController(ICampusCommonService campusCommonService, IWebHostEnvironment environment)
        {
            this.campusCommonService = campusCommonService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("addcampuscourse")]
        public async Task<IActionResult> AddCampusCourse(CampusCourse formData)
        {
            try
            {
                var response = await this.campusCommonService.CampusCourseInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampuscourse")]
        public async Task<IActionResult> GetAllCampusCourse(SearchCampusCourse search)
        {
            try
            {
                var response = await this.campusCommonService.GetAllCampusCourse(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcampusstream")]
        public async Task<IActionResult> AddCampusStream(CampusStream formData)
        {
            try
            {
                var response = await this.campusCommonService.CampusStreamInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampusstream")]
        public async Task<IActionResult> GetAllCampusStream(SearchCampusStream search)
        {
            try
            {
                var response = await this.campusCommonService.GetAllCampusStream(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcampuscoursestream")]
        public async Task<IActionResult> AddCampusCourseStream(CampusCourseStreamFormData formData)
        {
            try
            {
                var response = await this.campusCommonService.CampusCourseStreamInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcampuscoursestream")]
        public async Task<IActionResult> GetAllCampusCouseStream()
        {
            try
            {
                var response = await this.campusCommonService.GetAllCampusCouseStream().ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcampusyear")]
        public async Task<IActionResult> CampusYearInsertUpdate(CampusYear formData)
        {
            try
            {
                var response = await this.campusCommonService.CampusYearInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampusyear")]
        public async Task<IActionResult> GetAllCampusYear(SearchCampusYear search)
        {
            try
            {
                var response = await this.campusCommonService.GetAllCampusYear(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampuscollegecategory")]
        public async Task<IActionResult> GetAllCampusCollegeCategory()
        {
            try
            {
                var response = await this.campusCommonService.GetAllCampusCollegeCategory().ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcampuscollege")]
        public async Task<IActionResult> CampusCollegeInsertUpdate(CampusCollegeFormData formData)
        {
            try
            {
                var response = await this.campusCommonService.CampusCollegeInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcampuscollege")]
        public async Task<IActionResult> GetAllCampusCollege(SearchCampusCollege search)
        {
            try
            {
                var response = await this.campusCommonService.GetAllCampusCollege(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampusfunctionwiserequisition")]
        public async Task<IActionResult> GetCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search)
        {
            try
            {
                var response = await this.campusCommonService.GetCampusFunctionwiseRequisition(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getoffcampusfunctionwiserequisition")]
        public async Task<IActionResult> GetOffCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search)
        {
            try
            {
                var response = await this.campusCommonService.GetOffCampusFunctionwiseRequisition(search).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
