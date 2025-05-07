
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http.Headers;


namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/jobdescription")]
    [ApiController]
    public class JobDescriptionController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IJobDescriptionService jobdescriptionService;
        public JobDescriptionController(IJobDescriptionService jobdescriptionService, IWebHostEnvironment environment)
        {
            this.jobdescriptionService = jobdescriptionService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getalljobdescription")]
        public async Task<IActionResult> GetAllJobDescription(SearchJobDescription search)
        {
            try
            {
                var response = await this.jobdescriptionService.GetAllJobDescription(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getAllFuncJobDescription")]
        public async Task<IActionResult> GetAllFuncJobDescription(SearchJobFuncDescription search)
        {
            try
            {
                var response = await this.jobdescriptionService.GetAllFuncJobDescription(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("savejobdescription")]
        public async Task<IActionResult> SaveJobDescription(IFormCollection data)
        {
            try
            {
                string fileName = "";
                //var file = Request.Form.Files[0];
                //string HostUrl = this.environment.ContentRootPath;
                //string filepath = "UploadedFiles/JobDescription";
                //string uploadpath = Path.Combine(HostUrl, "wwwroot/" + filepath);
                //if (!Directory.Exists(uploadpath))
                //{
                //    Directory.CreateDirectory(uploadpath);
                //}
                //if (file.Length > 0)
                //{
                //    var timestamp = DateTime.Now.ToFileTime();
                //    string timestampfilename = Convert.ToString(timestamp);
                //    fileName = timestampfilename + "_" + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                //    string fullPath = Path.Combine(uploadpath, fileName);
                //    using (var stream = new FileStream(fullPath, FileMode.Create))
                //    {
                //        file.CopyTo(stream);
                //    }
                //}
                JobDescriptionDetailFormData formData = new JobDescriptionDetailFormData();
                formData.JobDescriptionId = Convert.ToInt32(data["JobDescriptionId"]);
                formData.JobDescriptionName = data["JobDescriptionName"];
                formData.VerticalId = Convert.ToInt32(data["VerticalId"]);
                formData.LocationId = data["LocationId"];
                formData.FunctionId = Convert.ToInt32(data["FunctionId"]);
                formData.DepartmentId = Convert.ToInt32(data["DepartmentId"]);
                formData.PositionId = Convert.ToInt32(data["PositionId"]);
                formData.GradeId = data["GradeId"];
                formData.ReportsTo = data["ReportsTo"];
                formData.NoOfReportees = Convert.ToInt32(data["NoOfReportees"]);
                formData.IndustryId = data["IndustryId"];
                formData.ExperienceId = data["ExperienceId"];
                formData.AgeId = data["AgeId"];
                formData.QualificationId = data["QualificationId"];
                formData.CourseId =data["CourseId"];
                formData.StreamId = data["StreamId"];
                formData.LanguageId = data["LanguageId"];
                formData.AnyOtherLanguage = data["AnyOtherLanguage"];
                formData.JobPurpose = data["JobPurpose"];
                formData.JobSummary = data["JobSummary"];
                formData.KPIs = data["KPIs"];
                formData.Dimensions = data["Dimensions"];
                formData.Knowledge = data["Knowledge"];
                formData.Skills = data["Skills"];
                formData.ExternalStakeHolders = data["ExternalStakeHolders"];
                formData.InternalStakeHolders = data["InternalStakeHolders"];
                formData.RestrictedJD = data["RestrictedJD"];
                //formData.JDDocument = "/" + filepath + "/" + fileName;
                formData.JDDocument = "";
                formData.IsActive = Convert.ToBoolean(data["IsActive"]);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                formData.IsEnabled = Convert.ToBoolean(data["IsEnabled"]);

                var response = await this.jobdescriptionService.SaveJobDescription(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getalljobdescriptiondetails")]
        public async Task<IActionResult> GetAllJobDescriptionDetails(SearchJobDescription search)
        {
            try
            {
                var response = await this.jobdescriptionService.GetAllJobDescriptionDetails(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
