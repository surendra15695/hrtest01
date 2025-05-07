using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository positionRepository;
        private readonly IGradeRepository gradeRepository;

        public PositionService(IPositionRepository positionRepository, IGradeRepository gradeRepository)
        {
            this.positionRepository = positionRepository;
            this.gradeRepository = gradeRepository;
        }

        public async Task<List<PositionVerticalDetail>> GetAllPositionVertical(SearchPosition search)
        {
            return await this.positionRepository.GetAllPositionVertical(search);
        }

        public async Task<List<PositionGrade>> GetAllPositionGrade(SearchPositionGrade search)
        {
            return await this.positionRepository.GetAllPositionGrade(search);
        }

        public async Task<List<PositionGrade>> GetAllPositionGradeList(SearchPosition search)
        {
            return await this.positionRepository.GetAllPositionGradeList(search);
        }

        public async Task<List<Grade>> GetAllGrade(SearchGrade search)
        {
            return await this.gradeRepository.GetAllGrade(search);
        }

        public async Task<ReturnMessage> GradeInsertUpdate(Grade formData)
        {
            return await this.gradeRepository.GradeInsertUpdate(formData);
        }
        public async Task<ReturnMessage> SavePositionVerical(PositionVertical formData)
        {
            return await this.positionRepository.SavePositionVerical(formData);
        }

        public async Task<List<PositionMaster>> GetAllPositionMasterList(SearchPositionMaster search)
        {
            return await this.positionRepository.GetAllPositionMasterList(search);
        }

        public async Task<ReturnMessage> SavePositionMaster(PositionMaster formData)
        {
            return await this.positionRepository.SavePositionMaster(formData);
        }

        public async Task<List<GradePositionAll>> GetAllGradePosition(SearchPositionGrade search)
        {
            return await this.positionRepository.GetAllGradePosition(search);
        }
        public async Task<List<GradePositionAllNew>> GetAllGradePositionNew(SearchPositionGradeNew search)
        {
            return await this.positionRepository.GetAllGradePositionNew(search);
        }
        public async Task<ReturnMessage> SaveGradePosition(PositionGradeSave formData)
        {
            return await this.positionRepository.SaveGradePosition(formData);
        }

        public async Task<ReturnMessage> SaveVerticalPosition(VerticalWisePositionFormData formData)
        {
            return await this.positionRepository.SaveVerticalPosition(formData);
        }
        public async Task<List<VerticalWisePositionList>> GetAllVerticalWisePosition(SearchVerticalWisePositionList search)
        {
            return await this.positionRepository.GetAllVerticalWisePosition(search);
        }
        public async Task<List<VerticalWisePositionList>> GetAllVerticalPositionForMapping(SearchVerticalWisePositionList search)
        {
            return await this.positionRepository.GetAllVerticalPositionForMapping(search);
        }
        public async Task<List<FunctionWisePositionList>> GetAllFunctionWisePosition(SearchFunctionWisePositionList search)
        {
            return await this.positionRepository.GetAllFunctionWisePosition(search);
        }
        public async Task<ReturnMessage> SaveFunctionWisePosition(FunctionWisePositionFormData formData)
        {
            return await this.positionRepository.SaveFunctionWisePosition(formData);
        }
        public async Task<List<FunctionPosition>> GetAllFunctionPosition(SearchFunctionPosition search)
        {
            return await this.positionRepository.GetAllFunctionPosition(search);
        }
    }
}
