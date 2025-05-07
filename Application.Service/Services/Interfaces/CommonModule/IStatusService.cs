using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IStatusService
    {
        Task<List<Status>> GetAllStatus();
        Task<List<StatusForROResignation>> GetAllStatusForROResignation();
        String CloudStorageAccountname();
    }
   
}
