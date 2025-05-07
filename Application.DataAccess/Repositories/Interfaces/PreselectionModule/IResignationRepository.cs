using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.PreselectionModule
{
    public interface IResignationRepository
    {
        String CloudStorageAccountname();
        Task<ReturnMessage> ResignationInsert(ResignationFormData formData);
        Task<ReturnMessage> ResignationUpdate(ResignationUpdateFormData formData);
        Task<List<ResignationList>> GetAllResignationList(SearchResignationList formData);
        Task<ReturnMessage> ResignationAcknowledgement(ResignationAcknowledgementFormData formData);
        Task<ReturnMessage> MergeResignation(MergeResignationFormData formData);
        Task<ReturnMessage> ResignationApproveReject(ResignationApproveRejectFormData formData);
        Task<List<ResignationHoldRelease>> GetAllResignationHoldReleaseList(SearchResignationHoldRelease formData);
        Task<ReturnMessage> UpdateHoldRelease(ResignationHoldReleaseSubmitFormData formData);
        Task<ReturnMessage> SendClarification(ResignationClarificationFormData formData);
        Task<List<ResignationClarificationList>> GetAllResignationClarification(SearchResignationClarification formData);
        Task<ReturnMessage> DeleteResignation(DeleteResignationFormData formData);
    }
}
