using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CampusModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CampusModule
{
    public interface ICampusCandidateRegistrationRepository
    {
        Task<CampusCandidate> GetCampusCandidate(CampusCandidateSearch search);
        Task<ReturnMessage> SaveCampusCandidate(CampusCandidateSave formdata);
        Task<ReturnMessage> SaveOffCampusCandidate(OffCampusCandidateSaveNew formData);
        Task<List<CandidatesDataForExcelDwnld>> GetCandidatesForexcelDwnld(CampusCandidateSearchForExcel search);
        String CloudStorageAccountname();
    }
}
