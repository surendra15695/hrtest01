using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CandidateModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CandidateModule
{
    public interface ICandidateProfileService
    {
        Task<ReturnMessage> SaveCandidateProfile(CandidateProfileFormData formdata);
        Task<ReturnMessage> SaveCandidateProfileApplicationForm(CandidateProfileFormDataCopy formdata);
        Task<ReturnMessage> SaveCampusCandidateProfileApplicationForm(CandidateProfileFormDataCopyFOrCampus formdata);
        Task<ReturnMessage> Insertcandidateprofileupdateppf(CandidateProfileFormDataCopy formdata);

        Task<CandidateProfile> GetCandidateProfile(SearchCandidateProfile search);
        Task<CampusCandidateProfile> GetCampusCandidateProfile(SearchCandidateProfile search);

        Task<CandidateProfileCopy> GetCandidateProfileApplication(SearchCandidateProfile search);
        Task<CampusCandidateProfileCopy> GetCampusCandidateProfileApplication(SearchCandidateProfile search);
        Task<ReturnMessage> UpdateCandidateProfileStatus(CandidateProfileAStatusFormData formData);
        String CloudStorageAccountname();
    }
}
