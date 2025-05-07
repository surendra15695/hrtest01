using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.Service.Services.CommonModule
{
    public class GenderService : IGenderService
    {
        private readonly IGenderRepository genderRepository;
    
        public GenderService(IGenderRepository genderRepository)
        {
            this.genderRepository = genderRepository;
        }

        public async Task<List<Gender>> GetAllGenders(SearchGender search)
        {
            return await this.genderRepository.GetAllGender(search);
        }
    }
}