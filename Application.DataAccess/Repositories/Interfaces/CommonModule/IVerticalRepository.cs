using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
   public interface IVerticalRepository
    {
        Task<List<Vertical>> GetAllVertical(SearchVertical search);
        Task<List<VerticalRM>> GetAllVerticalRM(SearchVerticalRM search);
        Task<List<VerticalHiringManager>> GetAllVerticalHiringManager(SearchVerticalHiringManager search);
        Task<List<VerticalHiringManager>> GetAllVerticalFunctionHiringManager(SearchVerticalFunctHiringManager search);
        Task<ReturnMessage> VerticalRMInsertUpdate(VerticalRMSave formData);
        Task<List<CampusVertical>> GetAllCampusVertical(SearchVertical search);
    }
}
