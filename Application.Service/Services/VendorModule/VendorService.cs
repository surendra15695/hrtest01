using Application.DataAccess.Repositories.Interfaces.VendorModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.VendorModule;
using Application.Service.Services.Interfaces.VendorModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Application.Service.Services.VendorModule
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository vendorRepository;

        public VendorService(IVendorRepository vendorRepository)
        {
            this.vendorRepository = vendorRepository;
        }

        public async Task<List<Vendor>> GetAllVendor(SearchVendor search)
        {
            return await this.vendorRepository.GetAllVendor(search);
        }

        public async Task<ReturnMessage> VendorInsertUpdate(VendorFormData formData)
        {
            return await this.vendorRepository.VendorInsertUpdate(formData);
        }
        //arg
        public async Task<ReturnMessage> InvoiceInsertUpdate(InsertUpdateForInvoiceParam formData)
        {
            return await this.vendorRepository.InvoiceInsertUpdate(formData);
        }

        //Arnab
        public async Task<ReturnMessage> CreditNoteInsertUpdate(InsertUpdarteForCreditNoteInput formData)
        {
            return await this.vendorRepository.CreditNoteInsertUpdate(formData);
        }

        public async Task<List<VendorCandidateDetail>> GetAllVendorJoinedCandidate(SearchVendorcandidate search)
        {
            return await this.vendorRepository.GetAllVendorJoinedCandidate(search);
        }
        //Arnab
        public async Task<List<ProcessInvoiceListForRMOutput>> GetAllProcessInvoiceCandidateListForRM(ProcessInvoiceListForRMInput search)
        {
            return await this.vendorRepository.GetAllProcessInvoiceCandidateListForRM(search);
        }
        //Arnab
        public async Task<List<ProcessInvoiceListForRMOutput>> GetAllProcessInvoiceCandidateListForRO(ProcessInvoiceListForRMInput search)
        {
            return await this.vendorRepository.GetAllProcessInvoiceCandidateListForRO(search);
        }
        public async Task<List<ProcessCreditNoteListForRMOutput>> GetAllProcessCreditNoteCandidateListForRM(ProcessCredeitNoteListForRMInput search)
        {
            return await this.vendorRepository.GetAllProcessCreditNoteCandidateListForRM(search);
        }
        public async Task<List<ProcessCreditNoteListForRMOutput>> GetAllProcessCreditNoteCandidateListForRO(ProcessCredeitNoteListForRMInput search)
        {
            return await this.vendorRepository.GetAllProcessCreditNoteCandidateListForRO(search);
        }
        public async Task<List<VendorCandidateDetail>> GetAllVendorRaiseCreditnote(SearchVendorcandidate search)
        {
            return await this.vendorRepository.GetAllVendorRaiseCreditnote(search);
        }
        public async Task<ReturnMessage> VendorInvoiceAction(VendorInvoiceActionFormData formData)
        {
            return await this.vendorRepository.VendorInvoiceAction(formData);
        }

        public async Task<ReturnMessage> UploadVendorInvoice(VendorUploadInvoiceFormData formData)
        {
            return await this.vendorRepository.UploadVendorInvoice(formData);
        }

        public async Task<ReturnMessage> ReleaseInvoiceInsertUpdate(ReleaseInvoiceInsertUpdateParam formData)
        {
            return await this.vendorRepository.ReleaseInvoiceInsertUpdate(formData);
        }
        public async Task<ReturnMessage> VendorCreditNoteClarificationinsertupdate(CreditNoteClarificationUpdateParam formData)
        {
            return await this.vendorRepository.VendorCreditNoteClarificationinsertupdate(formData);
        }

        public async Task<List<VendorClarificationRemarks>> GetAllVendorInvoiceClarificationRemarks(SearchVendorClarificationRemarks search)
        {
            return await this.vendorRepository.GetAllVendorInvoiceClarificationRemarks(search);
        }

        public async Task<ReturnMessage> UploadVendorInvoiceUpdate(VendorInvoiceUpdateFormData formData)
        {
            return await this.vendorRepository.UploadVendorInvoiceUpdate(formData);
        }

        public string CloudStorageAccountname()
        {
            return this.vendorRepository.CloudStorageAccountname();
        }
    }
}
