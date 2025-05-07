using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.EmployeeModule;
using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.EmployeeModule;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.EmployeeModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.EmployeeModule
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public async Task<List<EmployeeReplacementList>> GetEmployeeReplacementList(SearchEmployeeReplacement search)
        {
            return await this.employeeRepository.GetEmployeeReplacementList(search);
        }
    }
}
