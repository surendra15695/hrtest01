using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class StatusService:IStatusService
    {
        private readonly IStatusRepository statusRepository;

        public StatusService(IStatusRepository statusRepository)
        {
            this.statusRepository = statusRepository;
        }
        public async Task<List<Status>> GetAllStatus()
        {
            return await this.statusRepository.GetAllStatus();
        }

        public async Task<List<StatusForROResignation>> GetAllStatusForROResignation()
        {
            return await this.statusRepository.GetAllStatusForROResignation();
        }
        public string CloudStorageAccountname()
        {
            return this.statusRepository.CloudStorageAccountname();
        }
    }
}
