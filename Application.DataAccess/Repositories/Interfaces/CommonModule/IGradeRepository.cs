using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IGradeRepository
    {
        Task<List<PositionGrade>> GetAllPositionGrade(SearchPositionGrade search);
        Task<List<Grade>> GetAllGrade(SearchGrade search);
        Task<ReturnMessage> GradeInsertUpdate(Grade formData);
    }
}
