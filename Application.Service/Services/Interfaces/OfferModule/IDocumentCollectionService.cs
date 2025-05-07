using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.OfferModule
{
    public interface IDocumentCollectionService
    {
        Task<ReturnMessage> InsertDocumentCollection(DocumentCollectionFormMasterData formdata);
        Task<ReturnMessage> CampusInsertDocumentCollection(DocumentCollectionFormMasterData formdata);
        Task<ReturnMessage> UpdateDocumentCollection(DocumentCollectionFormData formdata);
        Task<ReturnMessage> CampusUpdateDocumentCollection(DocumentCollectionFormData formdata);
        Task<ReturnMessage> UploadEmployeeDocumentFromEDMS(UploadDocumentFormDataEDMS formdata);
        Task<DocumentCollectionGet> GetDocumentCollectionData(SearchDocumentCollection search);
        Task<DocumentCollectionGet> GetCampusDocumentCollectionData(SearchDocumentCollection search);
        Task<List<DocumentPathList>> DownloadFolder(DownloadFile_Model search);
        Task<ReturnMessage> ApproveDocumentCollection(DocumentCollectionApprovalFormData formdata);
        Task<ReturnMessage> ApproveCampusDocumentCollection(DocumentCollectionApprovalFormData formdata);
        Task<DocumentCollectionGet> GetDocumentCollectionDatAForAdditional(SearchDocumentCollection formdata);
        Task<DocumentCollectionGet> GetCampusDocumentCollectionDatAForAdditional(SearchDocumentCollection formdata);
        String CloudStorageAccountname();
    }
}
