using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IJobDescriptionService
    {
        Task<List<JobDescription>> GetAllJobDescription(SearchJobDescription search);
        Task<ReturnMessage> SaveJobDescription(JobDescriptionDetailFormData param);
        Task<List<JobDescriptionDetailFormData>> GetAllJobDescriptionDetails(SearchJobDescription search);
        Task<List<JobDescription>> GetAllFuncJobDescription(SearchJobFuncDescription search);
    }
}
