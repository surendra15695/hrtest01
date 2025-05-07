using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.SelectionModule
{
    public interface ITravelReimbursementRepository
    {
        String CloudStorageAccountname();
        Task<List<CandidateTravelReimbursement>> GetCandidateTravelReimbursementList(SearchCandidateTravelReimbursement formData);
        Task<List<CampusCandidateInterviewTravelReimbursement>> GetCampusCandidateInterviewTravelReimbursementList(SearchCandidateTravelReimbursement formData);
        Task<TravelReimbursement> GetCandidateTravelReimbursementData(SearchTravelReimbursement formData);
        Task<CampusTravelReimbursement> GetCampusCandidateInterviewTravelReimbursementData(SearchTravelReimbursement formData);
        Task<ReturnMessage> TravelReimbursementInsertUpdate(TravelReimbursementFormData formData);
        Task<ReturnMessage> CampusTravelReimbursementInsertUpdate(TravelReimbursementFormData formData);
        Task<List<RMTravelReimbursementList>> GetRMTravelReimbursementList(SearchRMTravelReimbursementList formData);
        Task<List<CampusTravelReimbursementList>> GetCampusTravelReimbursementList(SearchCampusTravelReimbursementList formData);
        Task<ReturnMessage> TravelReimbursementActionInsert(TravelReimbursementActionFormData formData);
        Task<ReturnMessage> AssignTnterviewTravel(AssignTnterviewTravelFormData formData);
        Task<ReturnMessage> AssignTestTravel(AssignTestTravelFormData formData);
        Task<List<TravelClarificationList>> GetTravelClarificationList(SearchTravelClarificationList formData);
    }
}
