using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/GradeWiseDocumentMap")]
    [ApiController]
    public class GradeWiseDocumentMappingController : Controller
    {
        private readonly IGradeWiseDocMapService gradeWiseDocMapService;
        public GradeWiseDocumentMappingController(IGradeWiseDocMapService gradeWiseDocMapService)
        {
            this.gradeWiseDocMapService = gradeWiseDocMapService;
        }


        [HttpPost]
        [Route("getallgradewisedoclist")]
        public async Task<IActionResult> GetAllGradeWiseDocumentList(SearchGradeWiseDocMap search)
        {
            try
            {
                var response = await this.gradeWiseDocMapService.GetAllGradeWiseDocumentList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getgradewisedocumentdetails")]
        public async Task<IActionResult> GetGradeWiseDocumentDetails(SearchGradeWiseDocumentDetails search)
        {
            try
            {
                var response = await this.gradeWiseDocMapService.GetGradeWiseDocumentDetails(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addgradewisedocumentmapping")]
        public async Task<IActionResult> InsertUpdateGradeWiseDocumentMapping(IFormCollection data)
        {
            try
            {
                GradeWiseDocumentMappingFormData formData = new GradeWiseDocumentMappingFormData();

                formData.DocumentMapId = Convert.ToInt32(data["DocumentMapId"]);
                formData.VerticalId = Convert.ToInt32(data["VerticalId"]);
                formData.FunctionId = Convert.ToInt32(data["FunctionId"]);
                formData.GradeId = Convert.ToInt32(data["GradeId"]);
                formData.AttachmentDocumentTypeId = Convert.ToInt32(data["AttachmentDocumentTypeId"]);
                formData.AttachmentDocumentPerticularId = Convert.ToInt32(data["AttachmentDocumentPerticularId"]);
                formData.isActive = Convert.ToBoolean(data["isActive"]);
                string gradeWiseDocuments = data["GradeWiseDocuments"];
                formData.GradeWiseDocuments = JsonConvert.DeserializeObject<List<GradeWiseDocumnetFormData>>(gradeWiseDocuments);
                formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.gradeWiseDocMapService.InsertUpdateGradeWiseDocumentMapping(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getgradewisedocumentcount")]
        public async Task<IActionResult> GetGradeWiseDocumentCount(SearchGradeWiseDocMap search)
        {
            try
            {
                var response = await this.gradeWiseDocMapService.GetGradeWiseDocumentCount(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
