using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IModeofJoiningService
    {
        Task<List<ModeofJoining>> GetAllModeOfJoining(GetAllModeofJoiningParam Param);
        Task<ReturnMessage> ModeOfJoiningInsertUpdate(ModeofJoiningInsertUpdateParam Param);
    }
}
