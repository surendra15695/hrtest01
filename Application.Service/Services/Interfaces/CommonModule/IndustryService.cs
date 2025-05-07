using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public class IndustryService : IIndustryService
    {
        private readonly IIndustryRepository industryRepository;

        public IndustryService(IIndustryRepository industryRepository)
        {
            this.industryRepository = industryRepository;
        }
        public async Task<List<Industry>> GetAllIndustry(SearchIndustry search)
        {
            return await this.industryRepository.GetAllIndustry(search);
        }

        public async Task<ReturnMessage> IndustryInsertUpdate(Industry formData)
        {
            return await this.industryRepository.IndustryInsertUpdate(formData);
        }
    }
}
