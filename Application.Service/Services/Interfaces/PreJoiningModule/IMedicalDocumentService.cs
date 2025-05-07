using Application.Entity.Entities.PreJoiningModule;
using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.PreJoiningModule
{
    public interface IMedicalDocumentService
    {
        Task<MedicalDocumentGet> GetMedicalDocumentCollectionData(SearchMedicalDocumentCollection search);

        Task<ReturnMessage> SaveMedicalDocumentCollection(MedicalDocumentCollectionData formdata);

        Task<ReturnMessage> MedicalDocumentDoctorApprovalUpdate(MedicalDocumentDoctorApproval param);

        String CloudStorageAccountname();
    }
}
