using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreJoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.PreJoiningModule
{
    public interface IMedicalDocumentRepository
    {
        Task<MedicalDocumentGet> GetMedicalDocumentCollectionData(SearchMedicalDocumentCollection search);
        Task<ReturnMessage> SaveMedicalDocumentCollection(MedicalDocumentCollectionData formdata);
        String CloudStorageAccountname();
        Task<ReturnMessage> MedicalDocumentDoctorApprovalUpdate(MedicalDocumentDoctorApproval param);
    }
}
