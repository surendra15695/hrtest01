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
    public class TransferService : ITransferService
    {
        private readonly ITransferRepository transferRepository;

        public TransferService(ITransferRepository transferRepository)
        {
            this.transferRepository = transferRepository;
        }

        public async Task<List<VacancyList>> GetAllvacancyList(SearchVacancyList search)
        {
            return await this.transferRepository.GetAllVacancyList(search);
        }

        public async Task<ReturnMessage> TransferInsert(TransferFormData formData)
        {
            return await this.transferRepository.TransferInsert(formData);
        }

        public async Task<List<TransferList>> GetAllTransferList(SearchTransferList search)
        {
            return await this.transferRepository.GetAllTransferList(search);
        }
        public async Task<List<TransferListNew>> GetAllTransferListReport(SearchTransferList search)
        {
            return await this.transferRepository.GetAllTransferListReport(search);
        }
        public async Task<ReturnMessage> TransferAcknowledgement(TransferAcknowledgementFormData formData)
        {
            return await this.transferRepository.TransferAcknowledgement(formData);
        }

        public async Task<ReturnMessage> MergeTransfer(MergeTransferFormData formData)
        {
            return await this.transferRepository.MergeTransfer(formData);
        }

        public async Task<ReturnMessage> TransferApproveReject(TransferApproveRejectFormData formData)
        {
            return await this.transferRepository.TransferApproveReject(formData);
        }

        public async Task<List<TransferHoldRelease>> GetAllTransferHoldReleaseList(SearchTransferHoldRelease search)
        {
            return await this.transferRepository.GetAllTransferHoldReleaseList(search);
        }
        public async Task<List<TransferHoldRelease>> GettransferholdreleaselistPlant(SearchTransferHoldRelease search)
        {
            return await this.transferRepository.GettransferholdreleaselistPlant(search);
        }
        public async Task<ReturnMessage> UpdateHoldRelease(TransferHoldReleaseSubmitFormData formData)
        {
            return await this.transferRepository.UpdateHoldRelease(formData);
        }
        public async Task<ReturnMessage> DeleteBeforeTransfer(DeleteTransferList formData)
        {
            return await this.transferRepository.DeleteBeforeTransfer(formData);
        }
    }
}
