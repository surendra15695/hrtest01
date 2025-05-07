using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.VendorModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.VendorModule
{
    public interface IVendorService
    {
        Task<List<Vendor>> GetAllVendor(SearchVendor search);
        Task<ReturnMessage> VendorInsertUpdate(VendorFormData formData);
        Task<List<VendorCandidateDetail>> GetAllVendorJoinedCandidate(SearchVendorcandidate search);
        Task<List<ProcessInvoiceListForRMOutput>> GetAllProcessInvoiceCandidateListForRM(ProcessInvoiceListForRMInput search); //Arnab
        Task<List<ProcessInvoiceListForRMOutput>> GetAllProcessInvoiceCandidateListForRO(ProcessInvoiceListForRMInput search);
        Task<List<ProcessCreditNoteListForRMOutput>> GetAllProcessCreditNoteCandidateListForRM(ProcessCredeitNoteListForRMInput search);
        Task<List<ProcessCreditNoteListForRMOutput>> GetAllProcessCreditNoteCandidateListForRO(ProcessCredeitNoteListForRMInput search);
        Task<List<VendorCandidateDetail>> GetAllVendorRaiseCreditnote(SearchVendorcandidate search);
        Task<ReturnMessage> VendorInvoiceAction(VendorInvoiceActionFormData formData);
        Task<ReturnMessage> UploadVendorInvoice(VendorUploadInvoiceFormData formData);
        Task<ReturnMessage> ReleaseInvoiceInsertUpdate(ReleaseInvoiceInsertUpdateParam formData);
        Task<ReturnMessage> VendorCreditNoteClarificationinsertupdate(CreditNoteClarificationUpdateParam formData);
        Task<List<VendorClarificationRemarks>> GetAllVendorInvoiceClarificationRemarks(SearchVendorClarificationRemarks search);
        Task<ReturnMessage> UploadVendorInvoiceUpdate(VendorInvoiceUpdateFormData formData);
        Task<ReturnMessage> InvoiceInsertUpdate(InsertUpdateForInvoiceParam formData);
        Task<ReturnMessage> CreditNoteInsertUpdate(InsertUpdarteForCreditNoteInput formData);
        string CloudStorageAccountname();
    }
}
