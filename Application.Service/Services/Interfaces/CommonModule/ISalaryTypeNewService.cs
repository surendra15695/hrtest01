using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
   public interface ISalaryTypeNewService
    {
        Task<List<SalaryTypeNew>> GetAllSalaryTypeList(SearchSalaryTypeNewList search);
        Task<ReturnMessage> SalaryTypeInsertUpdate(SalaryTypeNew formData);

    }
}
