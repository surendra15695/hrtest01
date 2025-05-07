using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IModeofJoiningRepository
    {
        Task<List<ModeofJoining>> GetAllModeOfJoining(GetAllModeofJoiningParam Param);
        Task<ReturnMessage> ModeOfJoiningInsertUpdate(ModeofJoiningInsertUpdateParam Param);
    }
}
