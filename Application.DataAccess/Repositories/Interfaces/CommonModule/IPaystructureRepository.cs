using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{

    public interface IPaystructureRepository
    {
        Task<ClaCulatePayStructure> CalculatePayStructure(SearchCalculatePayStructure formdata);
        Task<SalaryTemplate> GetSalaryTemplate(SearchSalaryTemplate search);
        Task<ReturnMessage> SaveSalaryTemplate(SalaryTemplateData formdata);
        Task<List<SalaryType>> GetAllSalaryType(SearchSalaryType search);
        Task<List<SalaryAccountHead>> GetAllSalaryAccountHead(SearchSalaryAccountHead search);
        Task<ReturnMessage> SaveSalaryType(SalaryType formdata);
        Task<ReturnMessage> SaveSalaryAccountHead(SalaryAccountHead formdata);
        Task<List<SalaryTemplateMasterData>> GetSalaryTemplateList(SearchSalaryTemplate search);
        Task<List<SalaryTemplateFormula>> GetSalaryTemplateFormula(SearchSalaryTemplate search);

    }
}
