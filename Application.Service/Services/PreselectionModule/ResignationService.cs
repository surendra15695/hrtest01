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
    public class ResignationService : IResignationService
    {
        private readonly IResignationRepository resignationRepository;

        public ResignationService(IResignationRepository resignationRepository)
        {
            this.resignationRepository = resignationRepository;
        }
        public string CloudStorageAccountname()
        {
            return this.resignationRepository.CloudStorageAccountname();
        }
        public async Task<ReturnMessage> ResignationInsert(ResignationFormData formData)
        {
            return await this.resignationRepository.ResignationInsert(formData);
        }

        public async Task<ReturnMessage> ResignationUpdate(ResignationUpdateFormData formData)
        {
            return await this.resignationRepository.ResignationUpdate(formData);
        }

        public async Task<List<ResignationList>> GetAllResignationList(SearchResignationList search)
        {
            return await this.resignationRepository.GetAllResignationList(search);
        }

        public async Task<ReturnMessage> ResignationAcknowledgement(ResignationAcknowledgementFormData formData)
        {
            return await this.resignationRepository.ResignationAcknowledgement(formData);
        }

        public async Task<ReturnMessage> MergeResignation(MergeResignationFormData formData)
        {
            return await this.resignationRepository.MergeResignation(formData);
        }

        public async Task<ReturnMessage> ResignationApproveReject(ResignationApproveRejectFormData formData)
        {
            return await this.resignationRepository.ResignationApproveReject(formData);
        }

        public async Task<List<ResignationHoldRelease>> GetAllResignationHoldReleaseList(SearchResignationHoldRelease search)
        {
            return await this.resignationRepository.GetAllResignationHoldReleaseList(search);
        }

        public async Task<ReturnMessage> UpdateHoldRelease(ResignationHoldReleaseSubmitFormData formData)
        {
            return await this.resignationRepository.UpdateHoldRelease(formData);
        }

        public async Task<ReturnMessage> SendClarification(ResignationClarificationFormData formData)
        {
            return await this.resignationRepository.SendClarification(formData);
        }

        public async Task<List<ResignationClarificationList>> GetAllResignationClarification(SearchResignationClarification search)
        {
            return await this.resignationRepository.GetAllResignationClarification(search);
        }
        public async Task<ReturnMessage> DeleteResignation(DeleteResignationFormData formData)
        {
            return await this.resignationRepository.DeleteResignation(formData);
        }
    }
}
