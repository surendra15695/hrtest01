using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.SelectionModule
{
    public class TravelReimbursementService : ITravelReimbursementService
    {
        private readonly ITravelReimbursementRepository travelReimbursementRepository;
        public TravelReimbursementService(ITravelReimbursementRepository travelReimbursementRepository)
        {
            this.travelReimbursementRepository = travelReimbursementRepository;
        }
        public string CloudStorageAccountname()
        {
            return this.travelReimbursementRepository.CloudStorageAccountname();
        }
        public async Task<List<CandidateTravelReimbursement>> GetCandidateTravelReimbursementList(SearchCandidateTravelReimbursement formData)
        {
            return await this.travelReimbursementRepository.GetCandidateTravelReimbursementList(formData);
        }
        public async Task<List<CampusCandidateInterviewTravelReimbursement>> GetCampusCandidateInterviewTravelReimbursementList(SearchCandidateTravelReimbursement formData)
        {
            return await this.travelReimbursementRepository.GetCampusCandidateInterviewTravelReimbursementList(formData);
        }
        public async Task<TravelReimbursement> GetCandidateTravelReimbursementData(SearchTravelReimbursement formData)
        {
            return await this.travelReimbursementRepository.GetCandidateTravelReimbursementData(formData);
        }
        public async Task<CampusTravelReimbursement> GetCampusCandidateInterviewTravelReimbursementData(SearchTravelReimbursement formData)
        {
            return await this.travelReimbursementRepository.GetCampusCandidateInterviewTravelReimbursementData(formData);
        }
        public async Task<ReturnMessage> TravelReimbursementInsertUpdate(TravelReimbursementFormData formData)
        {
            return await this.travelReimbursementRepository.TravelReimbursementInsertUpdate(formData);
        }
        public async Task<ReturnMessage> CampusTravelReimbursementInsertUpdate(TravelReimbursementFormData formData)
        {
            return await this.travelReimbursementRepository.CampusTravelReimbursementInsertUpdate(formData);
        }
        public async Task<List<RMTravelReimbursementList>> GetRMTravelReimbursementList(SearchRMTravelReimbursementList formData)
        {
            return await this.travelReimbursementRepository.GetRMTravelReimbursementList(formData);
        }
        public async Task<List<CampusTravelReimbursementList>> GetCampusTravelReimbursementList(SearchCampusTravelReimbursementList formData)
        {
            return await this.travelReimbursementRepository.GetCampusTravelReimbursementList(formData);
        }
        public async Task<ReturnMessage> TravelReimbursementActionInsert(TravelReimbursementActionFormData formData)
        {
            return await this.travelReimbursementRepository.TravelReimbursementActionInsert(formData);
        }
        public async Task<ReturnMessage> AssignTnterviewTravel(AssignTnterviewTravelFormData formData)
        {
            return await this.travelReimbursementRepository.AssignTnterviewTravel(formData);
        }
        public async Task<ReturnMessage> AssignTestTravel(AssignTestTravelFormData formData)
        {
            return await this.travelReimbursementRepository.AssignTestTravel(formData);
        }
        public async Task<List<TravelClarificationList>> GetTravelClarificationList(SearchTravelClarificationList formData)
        {
            return await this.travelReimbursementRepository.GetTravelClarificationList(formData);
        }
    }
}
