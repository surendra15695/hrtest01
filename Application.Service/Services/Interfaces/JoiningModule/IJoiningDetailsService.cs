using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.JoiningModule
{
    public interface IJoiningDetailsService
    {
        Task<List<ReAssignCandidatHiringList>> GetCandidateListReAssignHiring(ReAssignCandidatHiringListSearch search);
        Task<List<ReAssignHiringList>> GetListReAssignHiring(ReAssignHiringListSearch search);
        Task<ReturnMessage> SaveJoiningHiringTeamAssign(CandidatHiringTeamSave formdata);
        Task<List<CandidatHiringTeamAssigned>> GetJoiningHiringTeamAssigned(CandidatHiringTeamAssignedSearch search);
        Task<List<CandidateJoiningConfirmation>> GetCandidateJoiningConfirmation(CandidateJoiningConfirmationSearch search);
        Task<ReturnMessage> SaveCandidateJoiningConfirmation(CandidateJoiningConfirmationSave formdata);
        Task<ReturnMessage> SaveCandidateEmployeeNo(CandidateEmployeeNoSave formdata);
        Task<List<CandidateEmployeeNo>> GetCandidateEmployeeNo(CandidateEmployeeNoSearch search);
        Task<ReturnMessage> UpdateOfferDocument(DocumentUpdateFormData formData);
        Task<List<DiscontinuedCandidateList>> GetAllDiscontinuedCandidate(SearchDiscontinuedCandidate search);
        String CloudStorageAccountname();
    }
}
