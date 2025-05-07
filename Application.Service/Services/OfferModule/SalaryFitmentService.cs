using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using Application.Service.Services.Interfaces.OfferModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.OfferModule
{
    public class SalaryFitmentService : ISalaryFitmentService
    {

        private readonly ISalaryFitmentRepository SalaryFitmentRepository;
        public SalaryFitmentService(ISalaryFitmentRepository SalaryFitment)
        {
            this.SalaryFitmentRepository = SalaryFitment;
        }
        public string CloudStorageAccountname()
        {
            return this.SalaryFitmentRepository.CloudStorageAccountname();
        }
        public async Task<SalaryFitment> GetSalaryFitmentData(SearchSalaryFitment search)
        {
            return await this.SalaryFitmentRepository.GetSalaryFitmentData(search);
        }
        public async Task<SalaryFitment> GetCampusSalaryFitmentData(SearchSalaryFitment search)
        {
            return await this.SalaryFitmentRepository.GetCampusSalaryFitmentData(search);
        }
        public async Task<ReturnMessage> SaveSalaryFitment(SalaryFitmentMasterData formdata)
        {
            return await this.SalaryFitmentRepository.SaveSalaryFitment(formdata);
        }
        public async Task<ReturnMessage> CampusSaveSalaryFitment(SalaryFitmentMasterData formdata)
        {
            return await this.SalaryFitmentRepository.CampusSaveSalaryFitment(formdata);
        }
        public async Task<ReturnMessage> UpdateSalaryFitmentCandidate(SalaryFitmentAcceptance formdata)
        {
            return await this.SalaryFitmentRepository.UpdateSalaryFitmentCandidate(formdata);
        }
        public async Task<ReturnMessage> UpdateCampusSalaryFitmentCandidate(SalaryFitmentAcceptance formdata)
        {
            return await this.SalaryFitmentRepository.UpdateCampusSalaryFitmentCandidate(formdata);
        }
    }
}
