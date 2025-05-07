using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.Service.Services.JoiningModule
{
    public class CandidateEmployeeDetailsService : ICandidateEmployeeDetailsService
    {
        private readonly ICandidateEmployeeDetailsRepository candidateemployeedetailsrepository;
        public CandidateEmployeeDetailsService(ICandidateEmployeeDetailsRepository candidateemployeedetailsrepository)
        {
            this.candidateemployeedetailsrepository = candidateemployeedetailsrepository;
        }
        public async Task<List<CandidateEmployee>> GetCandidateEmployeeListAll(CandidateEmployeeSearch Param)
        {
            return await this.candidateemployeedetailsrepository.GetCandidateEmployeeListAll(Param);
        }
        public async Task<ReturnMessage> SaveNoticePeriodBuyOutEnable(CandidateNoticePeriodBuyOutEnableSave formdata)
        {
            return await this.candidateemployeedetailsrepository.SaveNoticePeriodBuyOutEnable(formdata);
        }
        public async Task<ReturnMessage> SaveNoticeperiodbuyoutDisable(CandidateNoticePeriodBuyOutEnableSave formdata)
        {
            return await this.candidateemployeedetailsrepository.SaveNoticeperiodbuyoutDisable(formdata);
        }
        public async Task<ReturnMessage> SaveRelocationReimbursementEnable(CandidateRelocationReimbursementEnableSave formdata)
        {
            return await this.candidateemployeedetailsrepository.SaveRelocationReimbursementEnable(formdata);
        }
        public async Task<ReturnMessage> SaveRelocationReimbursementDisable(CandidateRelocationReimbursementEnableSave formdata)
        {
            return await this.candidateemployeedetailsrepository.SaveRelocationReimbursementDisable(formdata);
        }
    }
}
