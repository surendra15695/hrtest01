using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.PreselectionModule
{
    public interface ISuccessionPlanService
    {
        Task<ReturnMessage> SuccessionPlanInsert(SuccessionPlanFormData formData);
        Task<List<SuccessionPlanList>> GetAllSuccessionPlanList(SearchSuccessionPlanList search);
        Task<List<SuccessionPlanListNew>> GetAllSuccessionPlanListReport(SearchSuccessionPlanList search);
        Task<ReturnMessage> SuccessionPlanAcknowledgement(SuccessionPlanAcknowledgementFormData formData);
        Task<ReturnMessage> MergeSuccessionPlan(MergeSuccessionPlanFormData formData);
        Task<ReturnMessage> SuccessionPlanApproveReject(SuccessionPlanApproveRejectFormData formData);
        Task<List<SuccessionPlanHoldRelease>> GetAllSuccessionPlanHoldReleaseList(SearchSuccessionPlanHoldRelease search);
        Task<ReturnMessage> UpdateHoldRelease(SuccessionPlanHoldReleaseSubmitFormData formData);
        Task<ReturnMessage> DeleteBeforeSuccessionPlan(DeleteSuccessionPlanList formData);
    }
}
