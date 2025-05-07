using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.JoiningModule
{
    public class CandidatHiringTeamSave
    {
        public string CandidateId { get; set; }
        public long HiringTeamId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CandidatHiringTeamAssigned
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public long HiringTeamId { get; set; }
        public string EmpName { get; set; }
    }

    public class CandidatHiringTeamAssignedSearch
    {
        public string CandidateId { get; set; }
    }

    public class CandidateJoiningConfirmation
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public bool ProceedforJoining { get; set; }
        public string Remarks { get; set; }
    }

    public class CandidateJoiningConfirmationSave
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public bool ProceedforJoining { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }

    public class CandidateJoiningConfirmationSearch
    {
        public long? CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
    }

    public class CandidateEmployeeNoSave
    {
        public long CandidateId { get; set; }
        public long EmpployeeId { get; set; }
        public string EmpployeeNo { get; set; }
        public long CreatedBy { get; set; }
        public string candidateName { get; set; }
        public string emailId { get; set; }
        public string Password { get; set; }
    }

    public class CandidateEmployeeNo
    {
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateFullName { get; set; }
        public long CandidateEmployeeNoId { get; set; }
        public string EmpployeeNo { get; set; }
        public long EmpId { get; set; }
    }

    public class CandidateEmployeeNoSearch
    {
        public long? CandidateId { get; set; }
    }

    public class DocumentUpdateFormData
    {
        public long OfferDocumentCollectionDocumentId { get; set; }
        public string DocumentPath { get; set; }
        public string Document { get; set; }
        public long? CreatedBy { get; set; }
        public long? DocumentNameId { get; set; }       // Added by Anif on 20-01-2023
        public long? CandidateId { get; set; }       // Added by Anif on 20-01-2023
        public long OfferDocumentCollectionId { get; set; }
        public int DoumentType { get; set; }
        public string DoumentTypName { get; set; }
        public int DoumentParticular { get; set; }
        public string DoumentParticularName { get; set; }
        public string DoumentName { get; set; }
        public string ApprovalRemarks { get; set; }
        public bool AdditionalDocument { get; set; }

    }

}
