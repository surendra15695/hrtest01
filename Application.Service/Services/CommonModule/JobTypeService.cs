using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class JobTypeService : IJobTypeService
    {
        private readonly IJobTypeRepository jobtypeRepository;

        public JobTypeService(IJobTypeRepository jobtypeRepository)
        {
            this.jobtypeRepository = jobtypeRepository;
        }
        public async Task<List<JobType>> GetAllJobType(SearchJobType search)
        {
            return await this.jobtypeRepository.GetAllJobType(search);
        }

        public async Task<ReturnMessage> JobTypeInsertUpdate(JobType formData)
        {
            return await this.jobtypeRepository.JobTypeInsertUpdate(formData);
        }
    }
}
