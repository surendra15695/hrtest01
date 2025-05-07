using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.Service.Services.CommonModule
{
    public class PrefixService : IPrefixService
    {
        private readonly IPrefixRepository prefixRepository;

        public PrefixService(IPrefixRepository prefixRepository)
        {
            this.prefixRepository = prefixRepository;
        }

        public async Task<List<Prefix>> GetAllPrefix(SearchPrefix search)
        {
            return await this.prefixRepository.GetAllPrefix(search);
        }
    }
}