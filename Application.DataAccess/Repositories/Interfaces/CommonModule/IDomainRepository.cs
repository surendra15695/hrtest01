using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
   public interface IDomainRepository
    {
        Task<List<Domain>> GetAllDomain(SearchDomain search);
        Task<ReturnMessage> DomainInsertUpdate(Domain formData);
        Task<List<SubDomain>> GetAllSubDomain(SearchSubDomain search);
        Task<ReturnMessage> SubDomainInsertUpdate(SaveSubDomain formData);
        Task<List<NewSubDomain>> GetAllSubDomainNew(SearchSubDomain search);
    }
}
