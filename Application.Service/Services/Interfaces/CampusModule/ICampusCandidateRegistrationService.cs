using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CampusModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CampusModule
{
    public interface ICampusCandidateRegistrationService
    {
        Task<CampusCandidate> GetCampusCandidate(CampusCandidateSearch search);
        Task<ReturnMessage> SaveCampusCandidate(CampusCandidateSave formdata);
        Task<ReturnMessage> SaveOffCampusCandidate(OffCampusCandidateSaveNew formdata);
        Task<List<CandidatesDataForExcelDwnld>> GetCandidatesForexcelDwnld(CampusCandidateSearchForExcel search);
        String CloudStorageAccountname();
    }
}
