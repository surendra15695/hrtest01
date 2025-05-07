using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IIndustryRepository
    {
        Task<List<Industry>> GetAllIndustry(SearchIndustry search);
        Task<ReturnMessage> IndustryInsertUpdate(Industry formData);
    }
}
