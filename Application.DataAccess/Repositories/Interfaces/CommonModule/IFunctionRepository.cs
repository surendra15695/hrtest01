using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IFunctionRepository
    {
        Task<List<VerticalFunction>> GetAllVerticalFunction(SearchFunction search);
        Task<List<VerticalFunction>> CanidateSearchGetAllVerticalFunction(CandaiteSearchFunction search);
        Task<List<VerticalFunctionDepartmentHead>> GetAllVerticalFunctionDepartmentHead(SearchVerticalFunctionDepartmentHead search);
        Task<ReturnMessage> VerticalFunctionInsertUpdate(Function formData);
        Task<List<FunctionDepartmentHead>> GetAllFunctionDepartmentHead(SearchFunctionDepartmentHead search);
        Task<ReturnMessage> FunctionDepartmentHeadInsertUpdate(FunctionDepartmentHead formData);
        Task<List<LocationFunctionList>> GetAllLocationFunction(SearchLocationFunction search);
        Task<List<VerticalFunctionHiringManager>> GetAllVerticalFunctionHiringManager(SearchVerticalFunctionHiringManager search);
        Task<ReturnMessage> VerticalFunctionHiringManagerInsertUpdate(SaveVerticalFunctionHiringManager formData);
        Task<List<CampusVerticalFunction>> GetAllCampusVerticalFunction(SearchFunction search);
        Task<ReturnMessage> CamusVerticalFunctionInsertUpdate(CampusFunction formData);
    }
}
