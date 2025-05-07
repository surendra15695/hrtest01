using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.PreselectionModule
{
    public interface ITransferService
    {
        Task<List<VacancyList>> GetAllvacancyList(SearchVacancyList search);
        Task<ReturnMessage> TransferInsert(TransferFormData formData);
        Task<List<TransferList>> GetAllTransferList(SearchTransferList search);
        Task<List<TransferListNew>> GetAllTransferListReport(SearchTransferList search);
        Task<ReturnMessage> TransferAcknowledgement(TransferAcknowledgementFormData formData);
        Task<ReturnMessage> MergeTransfer(MergeTransferFormData formData);
        Task<ReturnMessage> TransferApproveReject(TransferApproveRejectFormData formData);
        Task<List<TransferHoldRelease>> GetAllTransferHoldReleaseList(SearchTransferHoldRelease search);
        Task<List<TransferHoldRelease>> GettransferholdreleaselistPlant(SearchTransferHoldRelease search);
        Task<ReturnMessage> UpdateHoldRelease(TransferHoldReleaseSubmitFormData formData);
        Task<ReturnMessage> DeleteBeforeTransfer(DeleteTransferList formData);
    }
}
