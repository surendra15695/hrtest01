using Application.DataAccess.Repositories.Interfaces.PreJoiningModule;
using Application.Entity.Entities.PreJoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.PreJoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.PreJoiningModule
{
    public class MedicalDocumentService : IMedicalDocumentService
    {
        private readonly IMedicalDocumentRepository medicaldocumentrepository;
        public MedicalDocumentService(IMedicalDocumentRepository medicaldocumentrepository)
        {
            this.medicaldocumentrepository = medicaldocumentrepository;
        }

        public async Task<MedicalDocumentGet> GetMedicalDocumentCollectionData(SearchMedicalDocumentCollection search)
        {
            return await this.medicaldocumentrepository.GetMedicalDocumentCollectionData(search);
        }

        public async Task<ReturnMessage> MedicalDocumentDoctorApprovalUpdate(MedicalDocumentDoctorApproval param)
        {
            return await this.medicaldocumentrepository.MedicalDocumentDoctorApprovalUpdate(param);
        }

        public async Task<ReturnMessage> SaveMedicalDocumentCollection(MedicalDocumentCollectionData formdata)
        {
            return await this.medicaldocumentrepository.SaveMedicalDocumentCollection(formdata);
        }
        public string CloudStorageAccountname()
        {
            return this.medicaldocumentrepository.CloudStorageAccountname();
        }
    }
       
}
