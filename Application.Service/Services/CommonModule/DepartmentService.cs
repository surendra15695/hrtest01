using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IDepartmentRepository departmentRepository;

        public DepartmentService(IDepartmentRepository departmentRepository)
        {
            this.departmentRepository = departmentRepository;
        }
        public async Task<List<FunctionDepartment>> GetAllFunctionDepartment(SearchDepartment search)
        {
            return await this.departmentRepository.GetAllFunctionDepartment(search);
        }

        public async Task<ReturnMessage> DepartmentInsertUpdate(Department formData)
        {
            return await this.departmentRepository.DepartmentInsertUpdate(formData);
        }
    }
}
