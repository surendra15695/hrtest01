using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
   public class DomainService : IDomainService
    {
        private readonly IDomainRepository domainRepository;

        public DomainService(IDomainRepository domainRepository)
        {
            this.domainRepository = domainRepository;
        }

        public async Task<List<Domain>> GetAllDomain(SearchDomain search)
        {
            return await this.domainRepository.GetAllDomain(search);
        }

        public async Task<ReturnMessage> DomainInsertUpdate(Domain formData)
        {
            return await this.domainRepository.DomainInsertUpdate(formData);
        }
        public async Task<List<SubDomain>> GetAllSubDomain(SearchSubDomain search)
        {
            return await this.domainRepository.GetAllSubDomain(search);
        }
        public async Task<ReturnMessage> SubDomainInsertUpdate(SaveSubDomain formData)
        {
            return await this.domainRepository.SubDomainInsertUpdate(formData);
        }
        public async Task<List<NewSubDomain>> GetAllSubDomainNew(SearchSubDomain search)
        {
            return await this.domainRepository.GetAllSubDomainNew(search);
        }
    }
}
