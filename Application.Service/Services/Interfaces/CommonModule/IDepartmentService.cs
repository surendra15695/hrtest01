using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IDepartmentService
    {
        Task<List<FunctionDepartment>> GetAllFunctionDepartment(SearchDepartment search);
        Task<ReturnMessage> DepartmentInsertUpdate(Department formData);
    }
}
