using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class SalaryTypeNewService: ISalaryTypeNewService
    {
        private readonly ISalaryTypeNewRepository salaryTypeNewRepository;

        public SalaryTypeNewService(ISalaryTypeNewRepository salaryTypeNewRepository)
        {
            this.salaryTypeNewRepository = salaryTypeNewRepository;
        }

        public async Task<List<SalaryTypeNew>> GetAllSalaryTypeList(SearchSalaryTypeNewList search)
        {
            return await this.salaryTypeNewRepository.GetAllSalaryTypeList(search);
        }

        public async Task<ReturnMessage> SalaryTypeInsertUpdate(SalaryTypeNew formData)
        {
            return await this.salaryTypeNewRepository.SalaryTypeInsertUpdate(formData);
        }

     
    }
}
