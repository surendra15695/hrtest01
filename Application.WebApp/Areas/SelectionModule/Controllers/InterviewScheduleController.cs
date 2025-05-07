using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.SelectionModule.Controllers
{
    [Route("api/interviewschedule")]
    [ApiController]
    public class InterviewScheduleController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly IInterviewScheduleService interviewScheduleService;
        public InterviewScheduleController(IInterviewScheduleService interviewScheduleService, IWebHostEnvironment environment)
        {
            this.interviewScheduleService = interviewScheduleService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("createinterviewschedule")]
        public async Task<IActionResult> CreateInterviewSchedule(InterviewScheduleFormData formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.InterviewScheduleInsert(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getrequsitionforemail")]
        public async Task<IActionResult> GetRequisitionDetailsForEmail(SearchRequisitionForEmailDetails formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.GetRequisitionDetailsForEmail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }         //arghya, date-29.07.2022


        [HttpPost]
        [Route("getinterviewscheduledetail")]
        public async Task<IActionResult> GetInterviewScheduleDetail(SearchInterviewScheduleDetail formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.GetInterviewScheduleDetail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addcandidateinterviewfeedback")]
        public async Task<IActionResult> CandidateInterviewFeedbackInsertUpdate(CandidateInterviedwFeedbackData formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.CandidateInterviewFeedbackInsertUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("addcampuscandidateinterviewfeedback")]
        public async Task<IActionResult> CampusCandidateInterviewFeedbackInsertUpdate(CampusCandidateInterviedwFeedbackDataInsert formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.CampusCandidateInterviewFeedbackInsertUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidateinterviewfeedbackdetail")]
        public async Task<IActionResult> GetCandidateInterviewFeedbackDetail(SearchCandidateInterviewFeedback formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.GetCandidateInterviewFeedbackDetail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getcampuscandidateinterviewfeedbackdetail")]
        public async Task<IActionResult> GetCampusCandidateInterviewFeedbackDetail(SearchCampusCandidateInterviewFeedbackData formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.GetCampusCandidateInterviewFeedbackDetail(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getcandidateinterviewfeedbacklist")]
        public async Task<IActionResult> GetCandidateInterviewFeedbackList(SearchCandidateInterviewFeedback formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.GetCandidateInterviewFeedbackList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("getcampuscandidateinterviewfeedbacklist")]
        public async Task<IActionResult> GetCampusCandidateInterviewFeedbackList(SearchCampusCandidateInterviewFeedback formdata)
        {
            try
            {
                var response = await this.interviewScheduleService.GetCampusCandidateInterviewFeedbackList(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    }
}