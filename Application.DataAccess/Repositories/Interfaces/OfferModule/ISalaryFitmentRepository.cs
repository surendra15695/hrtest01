using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.OfferModule
{
    public interface ISalaryFitmentRepository
    {
        string CloudStorageAccountname();
        Task<SalaryFitment> GetSalaryFitmentData(SearchSalaryFitment search);
        Task<SalaryFitment> GetCampusSalaryFitmentData(SearchSalaryFitment search);
        Task<ReturnMessage> SaveSalaryFitment(SalaryFitmentMasterData formdata);
        Task<ReturnMessage> CampusSaveSalaryFitment(SalaryFitmentMasterData formdata);
        Task<ReturnMessage> UpdateSalaryFitmentCandidate(SalaryFitmentAcceptance formdata);
        Task<ReturnMessage> UpdateCampusSalaryFitmentCandidate(SalaryFitmentAcceptance formdata);

    }
}

