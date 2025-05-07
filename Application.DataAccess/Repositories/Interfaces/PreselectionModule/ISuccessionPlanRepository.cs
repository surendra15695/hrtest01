using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.PreselectionModule
{
    public interface ISuccessionPlanRepository
    {
        Task<ReturnMessage> SuccessionPlanInsert(SuccessionPlanFormData formData);
        Task<List<SuccessionPlanList>> GetAllSuccessionPlanList(SearchSuccessionPlanList formData);
        Task<List<SuccessionPlanListNew>> GetAllSuccessionPlanListReport(SearchSuccessionPlanList formData);
        Task<ReturnMessage> SuccessionPlanAcknowledgement(SuccessionPlanAcknowledgementFormData formData);
        Task<ReturnMessage> MergeSuccessionPlan(MergeSuccessionPlanFormData formData);
        Task<ReturnMessage> SuccessionPlanApproveReject(SuccessionPlanApproveRejectFormData formData);
        Task<List<SuccessionPlanHoldRelease>> GetAllSuccessionPlanHoldReleaseList(SearchSuccessionPlanHoldRelease formData);
        Task<ReturnMessage> UpdateHoldRelease(SuccessionPlanHoldReleaseSubmitFormData formData);
        Task<ReturnMessage> DeleteBeforeSuccessionPlan(DeleteSuccessionPlanList formData);
    }
}
