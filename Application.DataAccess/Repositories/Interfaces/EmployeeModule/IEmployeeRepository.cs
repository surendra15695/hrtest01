using Application.Entity.Entities.EmployeeModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.EmployeeModule
{
    public interface IEmployeeRepository
    {
        Task<List<EmployeeReplacementList>> GetEmployeeReplacementList(SearchEmployeeReplacement search);
    }
}
