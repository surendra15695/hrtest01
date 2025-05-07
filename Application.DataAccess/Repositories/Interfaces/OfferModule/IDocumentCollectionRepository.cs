using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.OfferModule
{
    public interface IDocumentCollectionRepository
    {
        Task<ReturnMessage> InsertDocumentCollection(DocumentCollectionFormMasterData formdata);
        Task<ReturnMessage> CampusInsertDocumentCollection(DocumentCollectionFormMasterData formdata);
        Task<ReturnMessage> UpdateDocumentCollection(DocumentCollectionFormData formdata);
        Task<ReturnMessage> CampusUpdateDocumentCollection(DocumentCollectionFormData formdata);
        Task<ReturnMessage> UploadEmployeeDocumentFromEDMS(UploadDocumentFormDataEDMS formdata);
        Task<DocumentCollectionGet> GetDocumentCollectionData(SearchDocumentCollection search);
        Task<DocumentCollectionGet> GetCampusDocumentCollectionData(SearchDocumentCollection search);
        Task<List<DocumentPathList>> DownloadFolder(DownloadFile_Model search);
        Task<DocumentCollectionGet> GetDocumentCollectionDatAForAdditional(SearchDocumentCollection search);
        Task<DocumentCollectionGet> GetCampusDocumentCollectionDatAForAdditional(SearchDocumentCollection search);
        Task<ReturnMessage> ApproveDocumentCollection(DocumentCollectionApprovalFormData formdata);
        Task<ReturnMessage> ApproveCampusDocumentCollection(DocumentCollectionApprovalFormData formdata);
        String CloudStorageAccountname();
    }
}
