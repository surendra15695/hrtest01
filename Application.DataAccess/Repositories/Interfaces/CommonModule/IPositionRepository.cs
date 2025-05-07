using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IPositionRepository
    {
        Task<List<PositionVerticalDetail>> GetAllPositionVertical(SearchPosition search);
        Task<List<PositionGrade>> GetAllPositionGrade(SearchPositionGrade search);

        Task<List<PositionGrade>> GetAllPositionGradeList(SearchPosition search);
        Task<ReturnMessage> SavePositionVerical(PositionVertical formdata);

        Task<List<PositionMaster>> GetAllPositionMasterList(SearchPositionMaster search);

        Task<ReturnMessage> SavePositionMaster(PositionMaster formdata);

        Task<List<GradePositionAll>> GetAllGradePosition(SearchPositionGrade search);
        Task<List<GradePositionAllNew>> GetAllGradePositionNew(SearchPositionGradeNew search);
        Task<ReturnMessage> SaveGradePosition(PositionGradeSave formdata);
        Task<ReturnMessage> SaveVerticalPosition(VerticalWisePositionFormData formData);
        Task<List<VerticalWisePositionList>> GetAllVerticalWisePosition(SearchVerticalWisePositionList search);
        Task<List<VerticalWisePositionList>> GetAllVerticalPositionForMapping(SearchVerticalWisePositionList search);
        Task<List<FunctionWisePositionList>> GetAllFunctionWisePosition(SearchFunctionWisePositionList search);
        Task<ReturnMessage> SaveFunctionWisePosition(FunctionWisePositionFormData formData);
        Task<List<FunctionPosition>> GetAllFunctionPosition(SearchFunctionPosition search);
    }
}
