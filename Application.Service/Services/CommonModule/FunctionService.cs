using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class FunctionService : IFunctionService
    {
        private readonly IFunctionRepository functionRepository;

        public FunctionService(IFunctionRepository functionRepository)
        {
            this.functionRepository = functionRepository;
        }
        public async Task<List<VerticalFunction>> GetAllVerticalFunction(SearchFunction search)
        {
            return await this.functionRepository.GetAllVerticalFunction(search);
        }
        public async Task<List<VerticalFunction>> CanidateSearchGetAllVerticalFunction(CandaiteSearchFunction search)
        {
            return await this.functionRepository.CanidateSearchGetAllVerticalFunction(search);
        }

        public async Task<List<VerticalFunctionDepartmentHead>> GetAllVerticalFunctionDepartmentHead(SearchVerticalFunctionDepartmentHead search)
        {
            return await this.functionRepository.GetAllVerticalFunctionDepartmentHead(search);
        }
        public async Task<ReturnMessage> VerticalFunctionInsertUpdate(Function formData)
        {
            return await this.functionRepository.VerticalFunctionInsertUpdate(formData);
        }
        public async Task<List<FunctionDepartmentHead>> GetAllFunctionDepartmentHead(SearchFunctionDepartmentHead search)
        {
            return await this.functionRepository.GetAllFunctionDepartmentHead(search);
        }
        public async Task<ReturnMessage> FunctionDepartmentHeadInsertUpdate(FunctionDepartmentHead formData)
        {
            return await this.functionRepository.FunctionDepartmentHeadInsertUpdate(formData);
        }
        public async Task<List<LocationFunctionList>> GetAllLocationFunction(SearchLocationFunction search)
        {
            return await this.functionRepository.GetAllLocationFunction(search);
        }
        public async Task<List<VerticalFunctionHiringManager>> GetAllVerticalFunctionHiringManager(SearchVerticalFunctionHiringManager search)
        {
            return await this.functionRepository.GetAllVerticalFunctionHiringManager(search);
        }
        public async Task<ReturnMessage> VerticalFunctionHiringManagerInsertUpdate(SaveVerticalFunctionHiringManager formData)
        {
            return await this.functionRepository.VerticalFunctionHiringManagerInsertUpdate(formData);
        }
        public async Task<List<CampusVerticalFunction>> GetAllCampusVerticalFunction(SearchFunction search)
        {
            return await this.functionRepository.GetAllCampusVerticalFunction(search);
        }

        public async Task<ReturnMessage> CamusVerticalFunctionInsertUpdate(CampusFunction formData)
        {
            return await this.functionRepository.CamusVerticalFunctionInsertUpdate(formData);
        }
    }
}
