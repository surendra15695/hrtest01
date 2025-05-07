using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService locationService;
        public LocationController(ILocationService locationService)
        {
            this.locationService = locationService;
        }

        [HttpPost]
        [Route("getalllocation")]
        public async Task<IActionResult> GetAllLocation(SearchLocation search)
        {
            try
            {
                var response = await this.locationService.GetAllLocation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("TestDocumentDownliad")]
        public async Task<IActionResult> TestDocumentDownliad(string blobName, string CloudStorageAccountname)
        {
            try
            {
                //UAT
                //string storageAccountName = "hrportaldocumentstorage";
               //string storageAccountKey = "K33X4jq9fa9CZ5ygA9K/cgePAspl1/EZ5TFdrfbc/M7qeHhGgPX7BpwVgU/5qrdyfsTmS06szPBw+AStvfYj7Q==";
                //Live 
                string storageAccountName = "mrfhrportaldocumentstrg";
                string storageAccountKey = "ZLLwIiNu2RfXIMSQixd2RFJf2rxs8a0ihzFylgw6dt+enJI2qifGOPvG+MPRrPW8Mmzlcvok4kuq+AStIqwTWQ==";

                // Create a BlobServiceClient object which will be used to create a container client
                BlobServiceClient blobServiceClient = new BlobServiceClient(
                    new Uri($"https://{storageAccountName}.blob.core.windows.net"),
                    new StorageSharedKeyCredential(storageAccountName, storageAccountKey));

                // Get a reference to a container
                BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(CloudStorageAccountname);

                // Get a reference to a blob
                BlobClient blobClient = containerClient.GetBlobClient(blobName);

                // Download the blob
                BlobDownloadInfo blobDownloadInfo = await blobClient.DownloadAsync();

                // Prepare the blob content for download
                MemoryStream ms = new MemoryStream();
                await blobDownloadInfo.Content.CopyToAsync(ms);
                ms.Position = 0;

                // Determine content type
                string contentType = blobDownloadInfo.ContentType ?? "application/octet-stream";

                // Return the file to the client
                return File(ms, contentType, blobName);
            }
            catch (Exception ex)
            {
                // Handle exceptions
                return BadRequest($"Failed to download file: {ex.Message}");
            }
        }
        [HttpPost]
        [Route("getallverticallocation")]
        public async Task<IActionResult> GetAllVerticalLocation(SearchVerticalLocation search)
        {
            try
            {
                var response = await this.locationService.GetAllVerticalLocation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallfunctionwiselocation")]
        public async Task<IActionResult> GetAllFunctionWiseLocation(SearchFunctionLocation search)
        {
            try
            {
                var response = await this.locationService.GetAllFunctionWiseLocation(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getallunmappedlocation")]
        public async Task<IActionResult> GetAllUnmappedLocations(SearchMappedLocation search)
        {
            try
            {
                var response = await this.locationService.GetAllUnmappedLocations(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addlocation")]
        public async Task<IActionResult> AddIndustry(Location formData)
        {
            try
            {
                var response = await this.locationService.LocationInsertUpdate(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getallLocationwisefunction")]
        public async Task<IActionResult> GetAllLocationWiseFunction(SearchLocationWiseFunction search)
        {
            try
            {
                var response = await this.locationService.GetAllLocationWiseFunction(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("locationwisefunctionsave")]
        public async Task<IActionResult> LocationWiseFunctionSave(LocationWiseFunctionSave formData)
        {
            try
            {
                var response = await this.locationService.LocationWiseFunctionSave(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}