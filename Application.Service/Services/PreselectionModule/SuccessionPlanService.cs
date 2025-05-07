using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.PreselectionModule
{
    public class SuccessionPlanService : ISuccessionPlanService
    {
        private readonly ISuccessionPlanRepository successionPlanRepository;

        public SuccessionPlanService(ISuccessionPlanRepository successionPlanRepository)
        {
            this.successionPlanRepository = successionPlanRepository;
        }

        public async Task<ReturnMessage> SuccessionPlanInsert(SuccessionPlanFormData formData)
        {
            return await this.successionPlanRepository.SuccessionPlanInsert(formData);
        }

        public async Task<List<SuccessionPlanList>> GetAllSuccessionPlanList(SearchSuccessionPlanList search)
        {
            return await this.successionPlanRepository.GetAllSuccessionPlanList(search);
        }
        public async Task<List<SuccessionPlanListNew>> GetAllSuccessionPlanListReport(SearchSuccessionPlanList search)
        {
            return await this.successionPlanRepository.GetAllSuccessionPlanListReport(search);
        }

        public async Task<ReturnMessage> SuccessionPlanAcknowledgement(SuccessionPlanAcknowledgementFormData formData)
        {
            return await this.successionPlanRepository.SuccessionPlanAcknowledgement(formData);
        }

        public async Task<ReturnMessage> MergeSuccessionPlan(MergeSuccessionPlanFormData formData)
        {
            return await this.successionPlanRepository.MergeSuccessionPlan(formData);
        }

        public async Task<ReturnMessage> SuccessionPlanApproveReject(SuccessionPlanApproveRejectFormData formData)
        {
            return await this.successionPlanRepository.SuccessionPlanApproveReject(formData);
        }

        public async Task<List<SuccessionPlanHoldRelease>> GetAllSuccessionPlanHoldReleaseList(SearchSuccessionPlanHoldRelease search)
        {
            return await this.successionPlanRepository.GetAllSuccessionPlanHoldReleaseList(search);
        }

        public async Task<ReturnMessage> UpdateHoldRelease(SuccessionPlanHoldReleaseSubmitFormData formData)
        {
            return await this.successionPlanRepository.UpdateHoldRelease(formData);
        }
        public async Task<ReturnMessage> DeleteBeforeSuccessionPlan(DeleteSuccessionPlanList formData)
        {
            return await this.successionPlanRepository.DeleteBeforeSuccessionPlan(formData);
        }
    }
}
