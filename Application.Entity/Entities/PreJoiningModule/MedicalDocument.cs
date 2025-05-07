using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.PreJoiningModule
{
    public class MedicalDocumentCollection
    {
        public int MedicalDocumentCollectionId { get; set; }
        public int RequisitionDetailId { get; set; }
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string Location { get; set; }
        public string Grade { get; set; }
        public string DepartmentName { get; set; }
        public int DoumentType { get; set; }
        public string DoumentTypeName { get; set; }
        public int DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public int DocumentNameId { get; set; }
        public string DocumentName { get; set; }
        public string Document { get; set; }
        public string Remarks { get; set; }
        public long MedicalDocumentDoctorApprovalId { get; set; }
        public int ApprovalListId { get; set; }
        public string ApprovalListName { get; set; }
        public string ApprovalRemarks { get; set; }
        public int CreatedBy { get; set; }
        public bool MedicallyFit { get; set; }
        public int DocApprovalStatusId { get; set; }
        public bool IsEnabledForMedical { get; set; }

    }

    public class MedicalDocumentRemarks
    {
        public long ? OfferDocumentCollectionRemarksId { get; set; }
        public string CreatedBy { get;set; }
        public string Remarks { get; set; }
        public string CreatedOn { get; set; }
    }

    public class MedicalDocumentGet
    {
        public MedicalDocumentCollection MedicalDocumentCollection { get; set; }
        public List<MedicalDocumentRemarks> MedicalDocumentRemarks { get; set; }
    }

    public class MedicalDocumentGetData
    {
        public int MedicalDocumentCollectionId { get; set; }
        public int RequisitionDetailId { get; set; }
        public int CandidateId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public string Location { get; set; }
        public string Grade { get; set; }
        public string DepartmentName { get; set; }
        public int DoumentType { get; set; }
        public string DoumentTypeName { get; set; }
        public int DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public int DocumentNameId { get; set; }
        public string DocumentName { get; set; }
        public string Document { get; set; }
        public string Remarks { get; set; }
        public long MedicalDocumentDoctorApprovalId { get; set; }
        public int ApprovalListId { get; set; }
        public string ApprovalListName { get; set; }
        public string ApprovalRemarks { get; set; }
        public int CreatedBy { get; set; }
        public bool MedicallyFit { get; set; }
        public int DocApprovalStatusId { get; set; }
        public bool IsEnabledForMedical { get; set; }
        public List<MedicalDocumentRemarks> MedicalDocumentRemarks { get; set; }
    }

    public class MedicalDocumentCollectionData
    {
        public long MedicalDocumentCollectionId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public int DoumentType { get; set; }
        public int DoumentParticular { get; set; }
        public int DoumentName { get; set; }
        public string Document { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }

    }
    public class SearchMedicalDocumentCollection
    {
        public int? MedicalDocumentCollectionId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public int? CandidateId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class MedicalDocumentDoctorApproval
    {
        public int? MedicalDocumentDoctorApprovalId { get; set; }
        public Boolean? MedicalallyFit { get; set; }
        public string MedicalallyFitRemarks { get; set; }
        public int? CreatedBy { get; set; }
        public string DocApprovedString { get; set; }
        public string PreviousString { get; set; }
    }



}


