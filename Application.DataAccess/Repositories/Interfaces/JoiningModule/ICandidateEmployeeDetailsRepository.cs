using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.DataAccess.Repositories.Interfaces.JoiningModule
{
    public interface ICandidateEmployeeDetailsRepository
    {
        Task<List<CandidateEmployee>> GetCandidateEmployeeListAll(CandidateEmployeeSearch search);
        Task<ReturnMessage> SaveNoticePeriodBuyOutEnable(CandidateNoticePeriodBuyOutEnableSave formdata);
        Task<ReturnMessage> SaveNoticeperiodbuyoutDisable(CandidateNoticePeriodBuyOutEnableSave formdata);

        Task<ReturnMessage> SaveRelocationReimbursementEnable(CandidateRelocationReimbursementEnableSave formdata);
        Task<ReturnMessage> SaveRelocationReimbursementDisable(CandidateRelocationReimbursementEnableSave formdata);

    }
}
