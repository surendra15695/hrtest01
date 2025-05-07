using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using Application.Service.Services.Interfaces.OfferModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.OfferModule
{
    public class DocumentCollectionService : IDocumentCollectionService
    {
        private readonly IDocumentCollectionRepository DocumentCollectionRepository;

        public DocumentCollectionService(IDocumentCollectionRepository DocumentCollection)
        {
            this.DocumentCollectionRepository = DocumentCollection;
        }
        public async Task<ReturnMessage> InsertDocumentCollection(DocumentCollectionFormMasterData formdata)
        {
            return await this.DocumentCollectionRepository.InsertDocumentCollection(formdata);
        }
        public async Task<ReturnMessage> CampusInsertDocumentCollection(DocumentCollectionFormMasterData formdata)
        {
            return await this.DocumentCollectionRepository.CampusInsertDocumentCollection(formdata);
        }

        public async Task<ReturnMessage> UpdateDocumentCollection(DocumentCollectionFormData formdata)
        {
            return await this.DocumentCollectionRepository.UpdateDocumentCollection(formdata);
        }
        public async Task<ReturnMessage> CampusUpdateDocumentCollection(DocumentCollectionFormData formdata)
        {
            return await this.DocumentCollectionRepository.CampusUpdateDocumentCollection(formdata);
        }
        public async Task<ReturnMessage> UploadEmployeeDocumentFromEDMS(UploadDocumentFormDataEDMS formdata)
        {
            return await this.DocumentCollectionRepository.UploadEmployeeDocumentFromEDMS(formdata);
        }

        public async Task<DocumentCollectionGet> GetDocumentCollectionData(SearchDocumentCollection search)
        {
            return await this.DocumentCollectionRepository.GetDocumentCollectionData(search);
        }
        public async Task<DocumentCollectionGet> GetCampusDocumentCollectionData(SearchDocumentCollection search)
        {
            return await this.DocumentCollectionRepository.GetCampusDocumentCollectionData(search);
        }
        public async Task<List<DocumentPathList>> DownloadFolder(DownloadFile_Model search)
        {
            return await this.DocumentCollectionRepository.DownloadFolder(search);
        }

        public async Task<ReturnMessage> ApproveDocumentCollection(DocumentCollectionApprovalFormData formdata)
        {
            return await this.DocumentCollectionRepository.ApproveDocumentCollection(formdata);
        }
        public async Task<ReturnMessage> ApproveCampusDocumentCollection(DocumentCollectionApprovalFormData formdata)
        {
            return await this.DocumentCollectionRepository.ApproveCampusDocumentCollection(formdata);
        }
        public async Task<DocumentCollectionGet> GetDocumentCollectionDatAForAdditional(SearchDocumentCollection formdata)
        {
            return await this.DocumentCollectionRepository.GetDocumentCollectionDatAForAdditional(formdata);
        }
        public async Task<DocumentCollectionGet> GetCampusDocumentCollectionDatAForAdditional(SearchDocumentCollection formdata)
        {
            return await this.DocumentCollectionRepository.GetCampusDocumentCollectionDatAForAdditional(formdata);
        }
        public string CloudStorageAccountname()
        {
            return this.DocumentCollectionRepository.CloudStorageAccountname();
        }
    }
}
