using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.JoiningModule
{
    public interface ICandidateEmployeeDetailsService
    {
        Task<List<CandidateEmployee>> GetCandidateEmployeeListAll(CandidateEmployeeSearch search);
        Task<ReturnMessage> SaveNoticePeriodBuyOutEnable(CandidateNoticePeriodBuyOutEnableSave formdata);
        Task<ReturnMessage> SaveNoticeperiodbuyoutDisable(CandidateNoticePeriodBuyOutEnableSave formdata);
        Task<ReturnMessage> SaveRelocationReimbursementEnable(CandidateRelocationReimbursementEnableSave formdata);
        Task<ReturnMessage> SaveRelocationReimbursementDisable(CandidateRelocationReimbursementEnableSave formdata);

    }
}
