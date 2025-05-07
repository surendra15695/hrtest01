using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class JobDescriptionService : IJobDescriptionService
    {
        private readonly IJobDescriptionRepository jobdescriptionRepository;

        public JobDescriptionService(IJobDescriptionRepository jobdescriptionRepository)
        {
            this.jobdescriptionRepository = jobdescriptionRepository;
        }
        public async Task<List<JobDescription>> GetAllJobDescription(SearchJobDescription search)
        {
            return await this.jobdescriptionRepository.GetAllJobDescription(search);
        }
        public async Task<List<JobDescription>> GetAllFuncJobDescription(SearchJobFuncDescription search)
        {
            return await this.jobdescriptionRepository.GetAllFuncJobDescription(search);
        }

        public async Task<ReturnMessage> SaveJobDescription(JobDescriptionDetailFormData param)
        {
            return await this.jobdescriptionRepository.SaveJobDescription(param);
        }

        public async Task<List<JobDescriptionDetailFormData>> GetAllJobDescriptionDetails(SearchJobDescription search)
        {
            return await this.jobdescriptionRepository.GetAllJobDescriptionDetails(search);
        }
    }
}
