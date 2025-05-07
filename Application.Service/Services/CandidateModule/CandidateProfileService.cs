using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CandidateModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CandidateModule;
using Application.Service.Services.Interfaces.CandidateModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CandidateModule
{
    public class CandidateProfileService : ICandidateProfileService
    {
        private readonly ICandidateProfileRepository CandidateProfileRepository;

        public CandidateProfileService(ICandidateProfileRepository candidateProfileRepository)
        {
            this.CandidateProfileRepository = candidateProfileRepository;
        }        
        public async Task<ReturnMessage> SaveCandidateProfile(CandidateProfileFormData formdata)
        {
            return await this.CandidateProfileRepository.SaveCandidateProfile(formdata);
        }
        public async Task<ReturnMessage> SaveCandidateProfileApplicationForm(CandidateProfileFormDataCopy formdata)
        {
            return await this.CandidateProfileRepository.SaveCandidateProfileApplicationForm(formdata);
        }
        public async Task<ReturnMessage> SaveCampusCandidateProfileApplicationForm(CandidateProfileFormDataCopyFOrCampus formdata)
        {
            return await this.CandidateProfileRepository.SaveCampusCandidateProfileApplicationForm(formdata);
        }
        public async Task<ReturnMessage> Insertcandidateprofileupdateppf(CandidateProfileFormDataCopy formdata)
        {
            return await this.CandidateProfileRepository.Insertcandidateprofileupdateppf(formdata);
        }
        public async Task<CandidateProfile> GetCandidateProfile(SearchCandidateProfile search)
        {
            return await this.CandidateProfileRepository.GetCandidateProfile(search);
            //return await this.CandidateProfileRepository.GetCandidateProfile(search);
        }
        public async Task<CampusCandidateProfile> GetCampusCandidateProfile(SearchCandidateProfile search)
        {
            return await this.CandidateProfileRepository.GetCampusCandidateProfile(search);
            //return await this.CandidateProfileRepository.GetCandidateProfile(search);
        }
        public async Task<CandidateProfileCopy> GetCandidateProfileApplication(SearchCandidateProfile search)
        {
            return await this.CandidateProfileRepository.GetCandidateProfileApplication(search);
            //return await this.CandidateProfileRepository.GetCandidateProfile(search);
        }
        public async Task<CampusCandidateProfileCopy> GetCampusCandidateProfileApplication(SearchCandidateProfile search)
        {
            return await this.CandidateProfileRepository.GetCampusCandidateProfileApplication(search);
            //return await this.CandidateProfileRepository.GetCandidateProfile(search);
        }
        public async Task<ReturnMessage> UpdateCandidateProfileStatus(CandidateProfileAStatusFormData formData)
        {
            return await this.CandidateProfileRepository.UpdateCandidateProfileStatus(formData);
        }
        public string CloudStorageAccountname()
        {
            return this.CandidateProfileRepository.CloudStorageAccountname();
        }
    }
}
