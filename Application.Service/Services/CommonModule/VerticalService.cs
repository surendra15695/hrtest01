using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
   public class VerticalService : IVerticalService
    {
        private readonly IVerticalRepository verticalRepository;

        public VerticalService(IVerticalRepository iverticalRepository)
        {
            this.verticalRepository = iverticalRepository;
        }

        public async Task<List<Vertical>> GetAllVertical (SearchVertical search)
        {
            return await this.verticalRepository.GetAllVertical(search);
        }
        public async Task<List<CampusVertical>> GetAllCampusVertical(SearchVertical search)
        {
            return await this.verticalRepository.GetAllCampusVertical(search);
        }

        public async Task<List<VerticalRM>> GetAllVerticalRM (SearchVerticalRM search)
        {
            return await this.verticalRepository.GetAllVerticalRM(search);
        }

        public async Task<List<VerticalHiringManager>> GetAllVerticalHiringManager(SearchVerticalHiringManager search)
        {
            return await this.verticalRepository.GetAllVerticalHiringManager(search);
        }
        public async Task<List<VerticalHiringManager>> GetAllVerticalFunctionHiringManager(SearchVerticalFunctHiringManager search)
        {
            return await this.verticalRepository.GetAllVerticalFunctionHiringManager(search);
        }
        public async Task<ReturnMessage> VerticalRMInsertUpdate(VerticalRMSave formData)
        {
            return await this.verticalRepository.VerticalRMInsertUpdate(formData);
        }
    }
}
