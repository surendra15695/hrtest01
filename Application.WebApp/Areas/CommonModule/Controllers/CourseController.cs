using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService courseService;
        public CourseController(ICourseService courseService)
        {
            this.courseService = courseService; 
        }

        [HttpPost]
        [Route("getallcourse")]
        public async Task<IActionResult> GetAllCourse(SearchCourse search)
        {
            try
            {
                var response = await this.courseService.GetAllCourse(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallcourselist")]
        public async Task<IActionResult> GetAllCourseList(SearchCourseList search)
        {
            try
            {
                var response = await this.courseService.GetAllCourseList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallqualificationcourse")]
        public async Task<IActionResult> GetAllQualificationCourse(SearchQualificationCourse search)
        {
            try
            {
                var response = await this.courseService.GetAllQualificationCourse(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcourse")]
        public async Task<IActionResult> AddCourse(Course formData)
        {
            try
            {
                var response = await this.courseService.CourseInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addqualificationcourse")]
        public async Task<IActionResult> AddQualificationCourse(QualificationCourseFormData formData)
        {
            try
            {
                var response = await this.courseService.QualificationCourseInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}