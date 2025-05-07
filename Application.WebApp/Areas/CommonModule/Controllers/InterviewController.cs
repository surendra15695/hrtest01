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
    [Route("api/interview")]
    [ApiController]
    public class InterviewController : ControllerBase
    {
        private readonly IInterviewService interviewService;
        public InterviewController(IInterviewService interviewService)
        {
            this.interviewService = interviewService;
        }

        [HttpPost]
        [Route("getallinterview")]
        public async Task<IActionResult> GetAllInterview(SearchInterview search)
        {
            try
            {
                var response = await this.interviewService.GetAllInterview(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallinterviewroom")]
        public async Task<IActionResult> GetAllInterviewRoom(SearchInterviewRoom search)
        {
            try
            {
                var response = await this.interviewService.GetAllInterviewRoom(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallinterviewpanelmember")]
        public async Task<IActionResult> GetAllInterviewPanelMember(SearchInterviewPanelMember search)
        {
            try
            {
                var response = await this.interviewService.GetAllInterviewPanelMember(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getpanelmemberslist")]
        public async Task<IActionResult> GetAllPanelMemberList(SearchPanelMemberList search)
        {
            try
            {
                var response = await this.interviewService.GetAllPanelMemberList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("saveinterviewroom")]
        public async Task<IActionResult> SaveInterviewRoom(InterviewRoomSave formData)
        {
            try
            {
                var response = await this.interviewService.SaveInterviewRoom(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("saveinterviewpanelmember")]
        public async Task<IActionResult> SaveInterviewPanelMember(InterviewPanelMemberSave formData)
        {
            try
            {
                var response = await this.interviewService.SaveInterviewPanelMember(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallinterviewpanelmemberMaplist")]
        public async Task<IActionResult> GetAllInterviewPanelMemberMapList(SearchInterviewPanelMemberMapList search)
        {
            try
            {
                var response = await this.interviewService.GetAllInterviewPanelMemberMapList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("saveinterviewpanelmembermapping")]
        public async Task<IActionResult> SaveInterviewPanelMemberMapping(SaveInterviewPanelMemberMap formData)
        {
            try
            {
                var response = await this.interviewService.SaveInterviewPanelMemberMapping(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallinterviewstatus")]
        public async Task<IActionResult> GetAllInterviewStatus(SearchInterviewStatus search)
        {
            try
            {
                var response = await this.interviewService.GetAllInterviewStatus(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("campuscandidateinterviewfeedbacklistInsert")]
        public async Task<IActionResult> CampusCandidateInterviewFeedbackListInsertUpdate(CampusCandidateInterviewFeedbackList formData)
        {
            try
            {
                var response = await this.interviewService.CampusCandidateInterviewFeedbackListInsertUpdate(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}