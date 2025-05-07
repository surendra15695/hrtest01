using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.VendorModule
{
    public class Vendor
    {
        public int VendorId { get; set; }
        public string VendorName { get; set; }
        public string EmailId { get; set; }
        public string AlternateEmailId { get; set; }
        public string ContactNo { get; set; }
        public string AlternateContactNo { get; set; }
        public string Website { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string TermsOfService { get; set; }
        public bool IsActive { get; set; }
        public string ContactPersonName { get; set; }
        public string AgreementValidityDate { get; set; }
       // public string VendorUserId { get; set; }
        //public string Password { get; set; } 
        public string VendorUserID { get; set; }
    }

    public class SearchVendor
    {
        public int? VendorId { get; set; }
        public bool? IsActive { get; set; }
    }

    //Arnab
    public class InsertUpdarteForCreditNoteInput
    {
        public int VendorCreditNoteId { get; set; }
        public int VendorInvoiceId { get; set; }
        public int CreditNoteStatus { get; set; }
        public decimal TotalBillAmount { get; set; }
        public decimal CreditBillAmount { get; set; }
        public string Remarks { get; set; }
        public string UploadDocument { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedOn { get; set; }
        public int ModifiedBy { get; set; }
        public string ModifiedOn { get; set; }

    }

    public class InsertUpdateForInvoiceParam
    {
       public int VendorId { get; set; }
       public int VendorInvoiceId { get; set; }
       public int CandidateId { get; set; }
       public string InvoicePath { get; set; }
       public string Remarks { get; set; }
       public int InvoiceStatus { get; set; }
       public int CreatedBy { get; set; }
       public string CreatedOn { get; set; }
       public int ModifiedBy { get; set; }
       public string ModifiedOn { get; set; }
       public List<VendorInvoiceDetails> VendorInvoiceDetails { get; set; }
    }
    public class VendorInvoiceDetails
    {  
        public int VendorInvoiceDetailId { get; set; }
        public int VendorInvoiceId { get; set; }
        public decimal BillableCTC { get; set; }
        public decimal ServiceChargePer { get; set; }
        public decimal ServiceChargeAmount { get; set; }
        public decimal GstPer { get; set; }
        public decimal GSTAmount { get; set; }
        public decimal TotalBillAmount { get; set; }
        public string InvoicePath { get; set; }
        public string PurchaseRequestNo { get; set; }
        public string PurchaseOrderNo { get; set; }
        public string ServiceSheetEntryNo { get; set; }

    }
//arg
    public class VendorFormData
    {
        public int VendorId { get; set; }
        public string VendorUserID { get; set; }
        //public string VendorUserId { get; set; }
        //public string Password { get; set; }
        public string SaltKey { get; set; }
        public string VendorName { get; set; }
        public string EmailId { get; set; }
        public string AlternateEmailId { get; set; }
        public string ContactNo { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string ZipCode { get; set; }
        public int StateId { get; set; }
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
        public string AgreementValidityDate { get; set; }
        public string ContactPersonName { get; set; }
    }

    public class SearchVendorcandidate
    {
        public long? CandidateId { get; set; }
        public string CandidateName { get; set; }
        public int? HiringStatusId { get; set; }
        public int? SourceChannelId { get; set; }
        public long? CreatedBy { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
    }

    public class VendorCandidateDetail
    {
        public long VendorInvoiceId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public string RequisitionNo { get; set; }
        public int PositionId { get; set; }
        public string DesignationName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string EmailId { get; set; }
        public string Contact { get; set; }
        public string DateOfJoining { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public string MonthlyGross { get; set; }
        public int InvoiceStatusId { get; set; }
        public string InvoiceStatusName { get; set; }
        public string VendorName { get; set; }
        public string SubmittedOn { get; set; }
        public string InvoicePath { get; set; }
        public int VendorId { get; set; }
        public int VendorInvoiceDetailId { get; set; }
        public decimal BillableCTC { get; set; }
        public decimal ServiceChargePer { get; set; }
        public decimal ServiceChargeAmount { get; set; }
        public decimal GstPer { get; set; }
        public decimal GSTAmount { get; set; }
        public decimal TotalBillAmount { get; set; }
        public string PurchaseRequestNo { get; set; }
        public string PurchaseOrderNo { get; set; }
        public string ServiceSheetEntryNo { get; set; }
        public int VendorCreditNoteId { get; set; }
        public int CreditNoteStatusID { get; set; }
        public string CreditNoteStatus { get; set; }
        public int Age { get; set; }
        public string CourseName { get; set; }
        public string StreamName { get; set; }
        public string QualificationName { get; set; }
        public string WorkExperience { get; set; }
        public int IsResigned { get; set; }
        public string CreditNoteRemarks { get; set; }
        public decimal CreditBillAmount { get; set; }
    }

    public class VendorUploadInvoiceFormData
    {
        public string CandidateIds { get; set; }
        public string InvoicePath { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class VendorInvoiceActionFormData
    {
        public string VendorInvoiceIds { get; set; }
        public long InvoiceStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class VendorClarificationRemarks
    {
        public string ClarificationRemarks { get; set; }
        public string CreatedByName { get; set; }
    }
    public class SearchVendorClarificationRemarks
    {
        public long VendorInvoiceId { get; set; }
    }

    public class VendorInvoiceUpdateFormData
    {
        public long VendorInvoiceId { get; set; }
        public string InvoicePath { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    //Arnab
    public class ProcessInvoiceListForRMInput
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string SourceChannelId { get; set; }
        public int? CreatedBy { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VendorName { get; set; }
        public int? AllocatedAutoUserId { get; set; }
    }
    public class ProcessInvoiceListForRMOutput
    {
        public int CandidateId { get; set; }
        public int VendorInvoiceId { get; set; }
        public int VendorInvoiceDetailId { get; set; }
        public string VendorName { get; set; }
        public string SubmittedOn { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public decimal BillableCTC { get; set; }
        public decimal ServiceChargePer { get; set; }
        public decimal ServiceChargeAmount { get; set; }
        public decimal GstPer { get; set; }
        public decimal GSTAmount { get; set; }
        public decimal TotalBillAmount { get; set; }
        public int InvoiceStatusId { get; set; }
        public string InvoiceStatusName { get; set; }
        public string PurchaseRequestNo { get; set; }
        public string PurchaseOrderNo { get; set; }
        public string ServiceSheetEntryNo { get; set; }
        public string InvoicePath { get; set; }
        public int VendorId { get; set; }
        public int VendorCreditNoteId { get; set; }
        public int CreditNoteStatusId { get; set; }
        public string CreditNoteStatus { get; set; }
    }
    public class ReleaseInvoiceInsertUpdateParam
    {
        public int VendorInvoiceId { get; set; }
        public int VendorId { get; set; }
        public int CandidateId { get; set; }
        public int InvoiceStatus { get; set; }
        public int CreatedBy { get; set; }
    }
    //Arnab
    public class ProcessCredeitNoteListForRMInput
    {
        public int? CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string SourceChannelId { get; set; }
        public int? CreatedBy { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string VendorName { get; set; }
        public int? AllocatedAutoUserId { get; set; }
    }
    public class ProcessCreditNoteListForRMOutput
    {
        public int CandidateId { get; set; }
        public int VendorInvoiceId { get; set; }
        public int VendorInvoiceDetailId { get; set; }
        public string VendorName { get; set; }
        public string SubmittedOn { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public decimal BillableCTC { get; set; }
        public decimal ServiceChargePer { get; set; }
        public decimal ServiceChargeAmount { get; set; }
        public decimal GstPer { get; set; }
        public decimal GSTAmount { get; set; }
        public decimal TotalBillAmount { get; set; }
        public int InvoiceStatusId { get; set; }
        public string InvoiceStatusName { get; set; }
        public string PurchaseRequestNo { get; set; }
        public string PurchaseOrderNo { get; set; }
        public string ServiceSheetEntryNo { get; set; }
        public string InvoicePath { get; set; }
        public int VendorId { get; set; }
        public int VendorCreditNoteId { get; set; }
        public decimal CreditBillAmount { get; set; }
        public string CreditNoteDocument { get; set; }
        public int CreditNoteStatusId { get; set; }
        public string CreditNoteStatus { get; set; }
    }

    public class CreditNoteClarificationUpdateParam
    {
        public string VendorCreditNoteIds { get; set; }
        public int CreditNoteStatus { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
    }
}
