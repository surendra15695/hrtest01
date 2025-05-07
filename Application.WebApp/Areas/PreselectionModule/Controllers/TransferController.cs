using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.PreselectionModule.Controllers
{
    [Route("api/transfer")]
    [ApiController]
    public class TransferController : ControllerBase
    {
        private IWebHostEnvironment environment;
        private readonly ITransferService transferService;
        public TransferController(ITransferService transferService, IWebHostEnvironment environment)
        {
            this.transferService = transferService;
            this.environment = environment;
        }

        [HttpPost]
        [Route("getvacancylist")]
        public async Task<IActionResult> GetAllVacancyList(SearchVacancyList search)
        {
            try
            {
                var response = await this.transferService.GetAllvacancyList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("generatetransfer")]
        public async Task<IActionResult> GenerateTransfer(TransferFormData formData)
        {
            try
            {
                var response = await this.transferService.TransferInsert(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettransferlist")]
        public async Task<IActionResult> GetAllTransferList(SearchTransferList search)
        {
            try
            {
                var response = await this.transferService.GetAllTransferList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("gettransferlistReport")]
        public async Task<IActionResult> GetAllTransferListReport(SearchTransferList search)
        {
            try
            {
                var response = await this.transferService.GetAllTransferListReport(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("acknowledgetransfer")]
        public async Task<IActionResult> TransferAcknowledgement(TransferAcknowledgementFormData formdata)
        {
            try
            {
                var response = await this.transferService.TransferAcknowledgement(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("mergetransfer")]
        public async Task<IActionResult> MergeTransfer(MergeTransferFormData formdata)
        {
            try
            {
                var response = await this.transferService.MergeTransfer(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [Route("transferapprovereject")]
        public async Task<IActionResult> TransferApproveReject(TransferApproveRejectFormData formData)
        {
            try
            {
                var response = await this.transferService.TransferApproveReject(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettransferholdreleaselist")]
        public async Task<IActionResult> GetAllTransferHoldReleaseList(SearchTransferHoldRelease search)
        {
            try
            {
                var response = await this.transferService.GetAllTransferHoldReleaseList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("gettransferholdreleaselistPlant")]
        public async Task<IActionResult> GettransferholdreleaselistPlant(SearchTransferHoldRelease search)
        {
            try
            {
                var response = await this.transferService.GettransferholdreleaselistPlant(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpPost]
        [Route("updateholdrelease")]
        public async Task<IActionResult> UpdateHoldRelease(TransferHoldReleaseSubmitFormData formData)
        {
            try
            {
                var response = await this.transferService.UpdateHoldRelease(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("deletetransfer")]
        public async Task<IActionResult> DeleteBeforeTransfer(DeleteTransferList formData)
        {
            try
            {
                var response = await this.transferService.DeleteBeforeTransfer(formData).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}