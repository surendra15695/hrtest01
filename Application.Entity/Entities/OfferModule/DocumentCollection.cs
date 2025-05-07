using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.OfferModule
{
    public class DocumentCollection
    {
        public DocumentCollectionDataRecruiterAll DocumentCollectionData { get; set; }
        public List<SalaryData> SalaryDetails { get; set; }
        public List<AttachmentData> AttachmentDetails { get; set; }
        public List<RemaksData> RemaksDetails { get; set; }
    }

    public class DocumentCollectionGet
    {
        public DocumentCollectionDataRecruiterAll DocumentCollectionData { get; set; }
        public List<SalaryData> SalaryDetails { get; set; }
        public List<AttachmentDataGet> AttachmentDataGet { get; set; }
        public List<RemaksData> RemaksDetails { get; set; }
    }
    public class DocumentCollectionFormData
    {
        public long OfferDocumentCollectionId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public decimal MonthlyTotal { get; set; }
        public decimal YearlyTotal { get; set; }
        public string Remarks { get; set; }
        public int EmailTemplateId { get; set; }
        public string EmailTemplate { get; set; }
        public int ApprovalStatus { get; set; }
        public bool Verified { get; set; }
        public int CreatedBy { get; set; }
        public string AttachmentDocumnetNameIdsToDelete { get; set; }
        public bool IsEnabled { get; set; }
        public List<SalaryData> SalaryDetails { get; set; }
        public List<AttachmentData> AttachmentDetails { get; set; }
        public List<RemaksData> RemaksDetails { get; set; }
    }

    public class SalaryData
    {
        public long OfferDocumentCollectionSalaryId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public long EmolumntId { get; set; }
        public string EmolumntName { get; set; }
        public decimal Monthly { get; set; }
        public decimal Yerly { get; set; }
        public int EmolumntVerifyStatus { get; set; }
        public string EmolumntVerifyRemarks { get; set; }
        public int CreatedBy { get; set; }
    }

    public class AttachmentData
    {
        public long OfferDocumentCollectionDocumentId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public int DoumentType { get; set; }
        public string DoumentTypName { get; set; }
        public int DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public int DoumentNameId { get; set; }
        public string DoumentName { get; set; }
        public string Document { get; set; }
        public string DocumentPath { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public bool AdditionalDocument { get; set; }
        public int ModifyStatus { get; set; }
        public int CreatedBy { get; set; }
    }

    public class AttachmentDataGet
    {
        public long OfferDocumentCollectionDocumentId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public int DoumentType { get; set; }
        public string DoumentTypName { get; set; }
        public int DoumentParticular { get; set; }
        public string DocumentParticularName { get; set; }
        public string DoumentParticularName { get; set; }            // Added by ANif on 14-07-2022
        public int DoumentNameId { get; set; }
        public string DoumentName { get; set; }
        public string Document { get; set; }
        public string DocumentPath { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public bool AdditionalDocument { get; set; }
        public int ModifyStatus { get; set; }
        public string CreatedBy { get; set; }
        public int ? RequestedBy { get; set; }

        public int? orderColumn { get; set; }
        public string CreatedOn { get; set; }
        public string ModifyBy { get; set; }
        public string ModifiedOn { get; set; }
        public string RoleId { get; set; }
        public bool ? IsUploaded { get; set; }
    }


    public class RemaksData
    {
        public long OfferDocumentCollectionRemarksId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public string RemarksType { get; set; }
        public string Reamrks { get; set; }
        public string ReamrksReply { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }
        public string CreatedOn { get; set; }
        public string CandidateFullName { get; set; }
        public string ModifiedOn { get; set; }

    }

    public class DocumentCollectionApprovalFormData
    {
        public long OfferDocumentCollectionId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public bool IsEnabled { get; set; }
        public bool IsEnabledForMed { get; set; }
        public int IsProcedForJoining { get; set; }
        public int CreatedBy { get; set; }
        public List<SalaryApprovalData> SalaryDetails { get; set; }
        public List<AttachmentApprovalData> AttachmentDetails { get; set; }
        public List<RemaksData> RemaksDetails { get; set; }
        public string CandidateNo { get; set; }
        public string EmailId { get; set; }
        public string Password { get; set; }
        public string CandidateName { get; set; }


    }

    public class SalaryApprovalData
    {
        public long ? OfferDocumentCollectionSalaryId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public string EmolumntName { get; set; }
        public decimal Monthly { get; set; }
        public decimal Yerly { get; set; }
        public int EmolumntVerifyStatus { get; set; }
        public string EmolumntVerifyRemarks { get; set; }
        
        public int CreatedBy { get; set; }
    }

    public class AttachmentApprovalData
    {
        public long OfferDocumentCollectionDocumentId { get; set; }
        public long OfferDocumentCollectionId { get; set; }
        public int DoumentType { get; set; }
        public int DoumentParticular { get; set; }
        public int DoumentNameId { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public int CreatedBy { get; set; }
        public bool ? IsAdditional { get; set; }          // Adde By Anif on 07-12-2022
    }

    public class DocumentCollectionFormMasterData
    {
        public long OfferDocumentCollectionId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public string CandidateId { get; set; }
        public long EmailTemplateId { get; set; }
        public string EmailTemplate { get; set; }
        public int CreatedBy { get; set; }
    }

    public class DocumentCollectionDataRecruiter
    {
        public long OfferDocumentCollectionId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public String CandidateFullName { get; set; }
        public String CandidateEmailId { get; set; }
        public String CandidatePhone { get; set; }
        public String CandidateGender { get; set; }
        public String Age { get; set; }
        public String AadharNo { get; set; }
        public String MotherTongue { get; set; }
        public String LanguageKnown { get; set; }
        public String HighestQualification { get; set; }
        public String Course { get; set; }
        public String Stream { get; set; }
        public String Percentage { get; set; }
        public String YearofCompletion { get; set; }
        public String QualificationType { get; set; }
        public String Totalexperience { get; set; }
        public String CurrentCTC { get; set; }
        public String CurrentEmployer { get; set; }
        public String Designation { get; set; }
        public String Domain { get; set; }
        public String SubDomain { get; set; }
        public String CurrentLocation { get; set; }
        public String AnyPreviousApplicationHistoryinMRF { get; set; }
        public String AnyRelativeWorkingonMRF { get; set; }
        public String Source { get; set; }
        public String CandidateOwner { get; set; }
        public String CandidateResume { get; set; }
        public decimal MonthlyTotal { get; set; }
        public decimal YearlyTotal { get; set; }
        public bool IsEnabled { get; set; }
        public int CreatedBy { get; set; }
        public List<SalaryData> SalaryDetails { get; set; }
        public List<AttachmentData> AttachmentDetails { get; set; }
        public List<RemaksData> RemaksDetails { get; set; }
    }

    public class DocumentCollectionDataRecruiterGet
    {
        public long OfferDocumentCollectionId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public String CandidateFullName { get; set; }
        public String CandidateEmailId { get; set; }
        public String CandidatePhone { get; set; }
        public String CandidateGender { get; set; }
        public String Age { get; set; }
        public String AadharNo { get; set; }
        public String MotherTongue { get; set; }
        public String LanguageKnown { get; set; }
        public String HighestQualification { get; set; }
        public String Course { get; set; }
        public String Stream { get; set; }
        public String Percentage { get; set; }
        public String YearofCompletion { get; set; }
        public String QualificationType { get; set; }
        public String Totalexperience { get; set; }
        public String CurrentCTC { get; set; }
        public String CurrentEmployer { get; set; }
        public String Designation { get; set; }
        public String Domain { get; set; }
        public String SubDomain { get; set; }
        public String CurrentLocation { get; set; }
        public String AnyPreviousApplicationHistoryinMRF { get; set; }
        public String AnyRelativeWorkingonMRF { get; set; }
        public String Source { get; set; }
        public String CandidateOwner { get; set; }
        public String CandidateResume { get; set; }
        public decimal MonthlyTotal { get; set; }
        public decimal YearlyTotal { get; set; }
        public bool IsEnabled { get; set; }
        public int CreatedBy { get; set; }
        public List<SalaryData> SalaryDetails { get; set; }
        public List<AttachmentDataGet> AttachmentDetails { get; set; }
        public List<RemaksData> RemaksDetails { get; set; }
    }

    public class DocumentCollectionDataRecruiterAll
    {
        public long OfferDocumentCollectionId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public String CandidateFullName { get; set; }
        public String CandidateEmailId { get; set; }
        public String CandidatePhone { get; set; }
        public String CandidateGender { get; set; }
        public String Age { get; set; }
        public String AadharNo { get; set; }
        public String MotherTongue { get; set; }
        public String LanguageKnown { get; set; }
        public String HighestQualification { get; set; }
        public String Course { get; set; }
        public String Stream { get; set; }
        public String Percentage { get; set; }
        public String YearofCompletion { get; set; }
        public String QualificationType { get; set; }
        public String Totalexperience { get; set; }
        public String CurrentCTC { get; set; }
        public String CurrentEmployer { get; set; }
        public String Designation { get; set; }
        public String Domain { get; set; }
        public String SubDomain { get; set; }
        public String CurrentLocation { get; set; }
        public String AnyPreviousApplicationHistoryinMRF { get; set; }
        public String AnyRelativeWorkingonMRF { get; set; }
        public String Source { get; set; }
        public String CandidateOwner { get; set; }
        public String CandidateResume { get; set; }
        public decimal MonthlyTotal { get; set; }
        public decimal YearlyTotal { get; set; }
        public bool IsEnabled { get; set; }
        public int CreatedBy { get; set; }
        //public long OfferDocumentCollectionSalaryId { get; set; }
        //public long SalaryOfferDocumentCollectionId { get; set; }
        //public long EmolumntId { get; set; }
        //public string EmolumntName { get; set; }
        //public decimal Monthly { get; set; }
        //public decimal Yerly { get; set; }
        //public int EmolumntVerifyStatus { get; set; }
        //public string EmolumntVerifyRemarks { get; set; }
        //public long OfferDocumentCollectionDocumentId { get; set; }
        //public long AttachementOfferDocumentCollectionId { get; set; }
        //public int DoumentType { get; set; }
        //public int DoumentParticular { get; set; }
        //public int DoumentName { get; set; }
        //public string Document { get; set; }
        //public string DocumentPath { get; set; }
        //public int ApprovalStatus { get; set; }
        //public string ApprovalRemarks { get; set; }
        //public bool AdditionalDocument { get; set; }
        //public int ModifyStatus { get; set; }
        //public long OfferDocumentCollectionRemarksId { get; set; }
        //public long RemarksOfferDocumentCollectionId { get; set; }
        //public string RemarksType { get; set; }
        //public string Reamrks { get; set; }
        //public string ReamrksReply { get; set; }
        //public string CreatedByName { get; set; }
    }

    public class SearchDocumentCollection
    {
        public long? OfferDocumentCollectionId { get; set; }
        public long? RequsitaionDetailsId { get; set; }
        public long? CandidateId { get; set; }
    }

    // Added By anif for EDMS Document Upload

    public class UploadDocumentFormDataEDMS
    {
        public long EmployeeId { get; set; } 
        public int EmployeeDocumentCollectionId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
        public List<DocumentAttachmentDataEDMS> AttachmentDocDetailsEDMS { get; set; }
    }
    public class DocumentAttachmentDataEDMS
    {
        public long EmpDocumentCollectionDocumentId { get; set; }
        public long EmployeeDocumentCollectionId { get; set; }
        public int DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public int DoumentType { get; set; }
        public string ? DoumentTypName { get; set; }
        public int DoumentNameId { get; set; }
        public string ? DoumentName { get; set; }
        public string ? Document { get; set; }        
        public string DocumentPath { get; set; }
        public int ? ApprovalStatus { get; set; }
        public string   ? ApprovalRemarks { get; set; }
        public bool ? AdditionalDocument { get; set; }
        public int ? ModifyStatus { get; set; }
        public int CreatedBy { get; set; }

    }

    // Added By Anif on 11-11-2022

    public class DownloadFile_Model
    {
        //public string FileName { get; set; }
        //public string EmpNo { get; set; }
        public int? OfferDocumentCollectionId { get; set; }
 public int? RequsitaionDetailsId { get; set; }
        public int? CandidateId { get; set; }

    }
    public class DocumentPathList
    {
        public int OfferDocumentCollectionId { get; set; }
 public int  OfferDocumentCollectionDocumentId { get; set; }
        public int  DoumentType { get; set; }
        public string DoumentTypName { get; set; }
        public int  DoumentParticular { get; set; }
        public string  DocumentParticularName { get; set; }
        public string  DoumentParticularName { get; set; }
        public int  DoumentNameId { get; set; }
        public string  DoumentName { get; set; }
        public string  Document { get; set; }
        public string  DocumentPath { get; set; }
        public int  ApprovalStatus { get; set; }
        public string  ApprovalRemarks { get; set; }
        public int  AdditionalDocument { get; set; }
        public int  ModifiyStatus { get; set; }
        public int  CreatedBy { get; set; }
        public string  CreatedOn { get; set; }
        public string  ModifiedOn { get; set; }
        public string  RoleId { get; set; }
        public bool  IsUploaded { get; set; }
    }

}

