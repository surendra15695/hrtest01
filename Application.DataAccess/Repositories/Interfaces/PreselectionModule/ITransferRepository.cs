using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.PreselectionModule
{
    public interface ITransferRepository
    {
        Task<List<VacancyList>> GetAllVacancyList(SearchVacancyList formData);
        Task<ReturnMessage> TransferInsert(TransferFormData formData);
        Task<List<TransferList>> GetAllTransferList(SearchTransferList formData);
        Task<List<TransferListNew>> GetAllTransferListReport(SearchTransferList formData);
        Task<ReturnMessage> TransferAcknowledgement(TransferAcknowledgementFormData formData);
        Task<ReturnMessage> MergeTransfer(MergeTransferFormData formData);
        Task<ReturnMessage> TransferApproveReject(TransferApproveRejectFormData formData);
        Task<List<TransferHoldRelease>> GetAllTransferHoldReleaseList(SearchTransferHoldRelease formData);
        Task<List<TransferHoldRelease>> GettransferholdreleaselistPlant(SearchTransferHoldRelease formData);
        Task<ReturnMessage> UpdateHoldRelease(TransferHoldReleaseSubmitFormData formData);
        Task<ReturnMessage> DeleteBeforeTransfer(DeleteTransferList formData);
    }
}
