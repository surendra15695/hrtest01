using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IDepartmentRepository
    {
        Task<List<FunctionDepartment>> GetAllFunctionDepartment(SearchDepartment search);
        Task<ReturnMessage> DepartmentInsertUpdate(Department formData);
    }
}
