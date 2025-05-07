using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class ModeofJoiningService : IModeofJoiningService
    {
        private readonly IModeofJoiningRepository ModeofJoiningRepository;
        public ModeofJoiningService(IModeofJoiningRepository ModeofJoiningRepository)
        {
            this.ModeofJoiningRepository = ModeofJoiningRepository;
        }
        public async Task<List<ModeofJoining>> GetAllModeOfJoining(GetAllModeofJoiningParam Param)
        {
            return await this.ModeofJoiningRepository.GetAllModeOfJoining(Param);
        }

        public async Task<ReturnMessage> ModeOfJoiningInsertUpdate(ModeofJoiningInsertUpdateParam Param)
        {
            return await this.ModeofJoiningRepository.ModeOfJoiningInsertUpdate(Param);
        }
    }
}
