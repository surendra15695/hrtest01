using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class GradeSalaryService : IGradeSalaryService
    {
        private readonly IGradeSalaryRepository gradesalaryRepository;
        public GradeSalaryService(IGradeSalaryRepository gradesalaryRepository)
        {
            this.gradesalaryRepository = gradesalaryRepository;
        }

        public async Task<List<SalaryHead>> GetAllSalaryHead(SearchSalaryHead search)
        {
            return await this.gradesalaryRepository.GetAllSalaryHead(search);
        }

        public async Task<ReturnMessage> SaveSalaryHead(SalaryHead formdata)
        {
            return await this.gradesalaryRepository.SaveSalaryHead(formdata);
        }

        public async Task<List<SalaryGradeTemplate>> GetAllSalaryGradeTemplate(SearchGradeTemplate search)
        {
            return await this.gradesalaryRepository.GetAllSalaryGradeTemplate(search);
        }

        public async Task<ReturnMessage> SaveSalaryGradeTemplate(SalaryGradeTemplate formdata)
        {
            return await this.gradesalaryRepository.SaveSalaryGradeTemplate(formdata);
        }

        public async Task<List<GradeSalary>> GetAllGradeSalary(SearchGradeSalary search)
        {
            return await this.gradesalaryRepository.GetAllGradeSalary(search);
        }

        public async Task<ReturnMessage> SaveGradeSalary(GradeSalary formdata)
        {
            return await this.gradesalaryRepository.SaveGradeSalary(formdata);
        }
    }
}
