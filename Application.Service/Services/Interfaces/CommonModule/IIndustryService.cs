using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IIndustryService
    {
        Task<List<Industry>> GetAllIndustry(SearchIndustry search);
        Task<ReturnMessage> IndustryInsertUpdate(Industry formData);
    }
}
