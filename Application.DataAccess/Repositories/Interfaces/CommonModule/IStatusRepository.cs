using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IStatusRepository
    {
        Task<List<Status>> GetAllStatus();
        Task<List<StatusForROResignation>> GetAllStatusForROResignation();
        String CloudStorageAccountname();

    }
     
}
