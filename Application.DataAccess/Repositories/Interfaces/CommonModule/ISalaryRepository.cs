using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface ISalaryRepository
    {
        Task<List<Salary>> GetAllSalary(SearchSalary search);
        public Task<ReturnMessage> InsertUpdateSalaryMaster(InsUpSalary param);
    }
}
