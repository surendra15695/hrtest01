using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class PaystructureService : IPaystructureService
    {
        private readonly IPaystructureRepository PaystructureRepository;
        public PaystructureService(IPaystructureRepository paytructure)
        {
            this.PaystructureRepository = paytructure;
        }

        public async Task<ClaCulatePayStructure> CalculatePayStructure(SearchCalculatePayStructure formdata)
        {
            return await this.PaystructureRepository.CalculatePayStructure(formdata);
        }

        public async Task<SalaryTemplate> GetSalaryTemplate(SearchSalaryTemplate search)
        {
            return await this.PaystructureRepository.GetSalaryTemplate(search);
        }

        public async Task<ReturnMessage> SaveSalaryTemplate(SalaryTemplateData formdata)
        {
            return await this.PaystructureRepository.SaveSalaryTemplate(formdata);
        }

        public async Task<List<SalaryType>> GetAllSalaryType(SearchSalaryType search)
        {
            return await this.PaystructureRepository.GetAllSalaryType(search);
        }

        public async Task<List<SalaryAccountHead>> GetAllSalaryAccountHead(SearchSalaryAccountHead search)
        {
            return await this.PaystructureRepository.GetAllSalaryAccountHead(search);
        }

        public async Task<ReturnMessage> SaveSalaryType(SalaryType formdata)
        {
            return await this.PaystructureRepository.SaveSalaryType(formdata);
        }

        public async Task<ReturnMessage> SaveSalaryAccountHead(SalaryAccountHead formdata)
        {
            return await this.PaystructureRepository.SaveSalaryAccountHead(formdata);
        }

        public async Task<List<SalaryTemplateMasterData>> GetSalaryTemplateList(SearchSalaryTemplate search)
        {
            return await this.PaystructureRepository.GetSalaryTemplateList(search);
        }

        public async Task<List<SalaryTemplateFormula>> GetSalaryTemplateFormula(SearchSalaryTemplate search)
        {
            return await this.PaystructureRepository.GetSalaryTemplateFormula(search);
        }
    }
}
