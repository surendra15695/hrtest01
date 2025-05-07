using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IGradeSalaryRepository
    {
        Task<List<SalaryHead>> GetAllSalaryHead(SearchSalaryHead search);
        Task<ReturnMessage> SaveSalaryHead(SalaryHead formdata);
        Task<List<SalaryGradeTemplate>> GetAllSalaryGradeTemplate(SearchGradeTemplate search);
        Task<ReturnMessage> SaveSalaryGradeTemplate(SalaryGradeTemplate formdata);
        Task<List<GradeSalary>> GetAllGradeSalary(SearchGradeSalary search);
        Task<ReturnMessage> SaveGradeSalary(GradeSalary formdata);
    }
}
