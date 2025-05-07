using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.JoiningModule
{
    public class JoiningDetailsService : IJoiningDetailsService
    {
        private readonly IJoininingDetailsRepository joiningdetailsrepository;
        public JoiningDetailsService(IJoininingDetailsRepository joiningdetailsrepository)
        {
            this.joiningdetailsrepository = joiningdetailsrepository;
        }

        public async Task<List<ReAssignCandidatHiringList>> GetCandidateListReAssignHiring(ReAssignCandidatHiringListSearch Param)
        {
            return await this.joiningdetailsrepository.GetCandidateListReAssignHiring(Param);
        }

        public async Task<List<ReAssignHiringList>> GetListReAssignHiring(ReAssignHiringListSearch Param)
        {
            return await this.joiningdetailsrepository.GetListReAssignHiring(Param);
        }

        public async Task<ReturnMessage> SaveJoiningHiringTeamAssign(CandidatHiringTeamSave formdata)
        {
            return await this.joiningdetailsrepository.SaveJoiningHiringTeamAssign(formdata);
        }

        public async Task<List<CandidatHiringTeamAssigned>> GetJoiningHiringTeamAssigned(CandidatHiringTeamAssignedSearch Param)
        {
            return await this.joiningdetailsrepository.GetJoiningHiringTeamAssigned(Param);
        }

        public async Task<List<CandidateJoiningConfirmation>> GetCandidateJoiningConfirmation(CandidateJoiningConfirmationSearch Param)
        {
            return await this.joiningdetailsrepository.GetCandidateJoiningConfirmation(Param);
        }

        public async Task<ReturnMessage> SaveCandidateJoiningConfirmation(CandidateJoiningConfirmationSave formdata)
        {
            return await this.joiningdetailsrepository.SaveCandidateJoiningConfirmation(formdata);
        }

        public async Task<ReturnMessage> SaveCandidateEmployeeNo(CandidateEmployeeNoSave formdata)
        {
            return await this.joiningdetailsrepository.SaveCandidateEmployeeNo(formdata);
        }

        public async Task<List<CandidateEmployeeNo>> GetCandidateEmployeeNo(CandidateEmployeeNoSearch Param)
        {
            return await this.joiningdetailsrepository.GetCandidateEmployeeNo(Param);
        }

        public async Task<ReturnMessage> UpdateOfferDocument(DocumentUpdateFormData formData)
        {
            return await this.joiningdetailsrepository.UpdateOfferDocument(formData);
        }
        public async Task<List<DiscontinuedCandidateList>> GetAllDiscontinuedCandidate(SearchDiscontinuedCandidate Param)
        {
            return await this.joiningdetailsrepository.GetAllDiscontinuedCandidate(Param);
        }
        public string CloudStorageAccountname()
        {
            return this.joiningdetailsrepository.CloudStorageAccountname();
        }

    }
}
