using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class SalaryService : ISalaryService
    {
        private readonly ISalaryRepository salaryRepository;

        public SalaryService(ISalaryRepository salaryRepository)
        {
            this.salaryRepository = salaryRepository;
        }
        public async Task<List<Salary>> GetAllSalary(SearchSalary search)
        {
            return await this.salaryRepository.GetAllSalary(search);
        }
        public async Task<ReturnMessage> InsertUpdateSalaryMaster(InsUpSalary param)
        {
            return await this.salaryRepository.InsertUpdateSalaryMaster(param);
        }
    }
}
