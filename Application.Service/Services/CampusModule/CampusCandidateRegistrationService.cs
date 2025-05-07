using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CampusModule;
using Application.Service.Services.Interfaces.CampusModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CampusModule
{
    public class CampusCandidateRegistrationService : ICampusCandidateRegistrationService
    {
        private readonly ICampusCandidateRegistrationRepository CampusCandidateRegistrationRepository;
        public CampusCandidateRegistrationService(ICampusCandidateRegistrationRepository campuscandidateregistrationrepository)
        {
            this.CampusCandidateRegistrationRepository = campuscandidateregistrationrepository;
        }

        public async Task<CampusCandidate> GetCampusCandidate(CampusCandidateSearch search)
        {
            return await this.CampusCandidateRegistrationRepository.GetCampusCandidate(search);
        }

        public async Task<ReturnMessage> SaveCampusCandidate(CampusCandidateSave formdata)
        {
            return await this.CampusCandidateRegistrationRepository.SaveCampusCandidate(formdata);
        }
        public async Task<ReturnMessage> SaveOffCampusCandidate(OffCampusCandidateSaveNew formdata)
        {
            return await this.CampusCandidateRegistrationRepository.SaveOffCampusCandidate(formdata);
        }

        public async Task<List<CandidatesDataForExcelDwnld>> GetCandidatesForexcelDwnld(CampusCandidateSearchForExcel search)
        {
            return await this.CampusCandidateRegistrationRepository.GetCandidatesForexcelDwnld(search);
        }

        public string CloudStorageAccountname()
        {
            return this.CampusCandidateRegistrationRepository.CloudStorageAccountname();
        }
    }
}
