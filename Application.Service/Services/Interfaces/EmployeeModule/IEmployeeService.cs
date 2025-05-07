using Application.Entity.Entities.EmployeeModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.EmployeeModule
{
    public interface IEmployeeService
    {
        Task<List<EmployeeReplacementList>> GetEmployeeReplacementList(SearchEmployeeReplacement search);
    }
}
