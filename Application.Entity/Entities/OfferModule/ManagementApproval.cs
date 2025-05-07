using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.OfferModule
{
    public class ManagementApproval
    {
        public ManagementApprovalMasterData ManagementApprovalMaster { get; set; }
        public List<ManagementApprovalCandidates> ManagementApprovalCandidates { get; set; }
        public List<ManagementApprovalVacancy> ManagementApprovalVacancy { get; set; }
        public List<ManagementApprovalSigntureFrom> ManagementApprovalSigntureFrom { get; set; }
        public List<ManagementApprovalSigntureTo> ManagementApprovalSigntureTo { get; set; }
    }
    public class ManagementApprovalMaster
    {
        public long ManagementApprovalId { get; set; }
        public string CandidateId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Date { get; set; }
        public string Note { get; set; }
        public string BottomNote { get; set; }
        public string SignatureNeededFrom { get; set; }
        public string SignatureNeededTo { get; set; }
        public string ApprovedDocument { get; set; }
        public List<ManagementApprovalCandidates> ManagementApprovalCandidates { get; set; }
        public List<ManagementApprovalVacancy> ManagementApprovalVacancy { get; set; }
        public List<ManagementApprovalSigntureFrom> ManagementApprovalSigntureFrom { get; set; }
        public List<ManagementApprovalSigntureTo> ManagementApprovalSigntureTo { get; set; }

    }

    public class ManagementApprovalMasterSave
    {
        public long ManagementApprovalId { get; set; }
        public string CandidateId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Date { get; set; }
        public string Note { get; set; }
        public string BottomNote { get; set; }
        public string SignatureNeededFrom { get; set; }
        public string SignatureNeededTo { get; set; }
        public string ApprovedDocument { get; set; }
        public int CreatedBy { get; set; }
        public List<ManagementApprovalCandidates> ManagementApprovalCandidates { get; set; }
        public List<ManagementApprovalVacancy> ManagementApprovalVacancy { get; set; }
        public string OMMailIds { get; set;  }
        public string OCMailIds { get; set; }
        public string OHMailIds { get; set; }
        public string HTMailIds { get; set; }
        public string StatusFlag { get; set; }
        public string CandidateName { get; set; }
        public string Flag { get; set; }

    }

    public class ManagementApprovalMasterUpdate
    {
        public long ManagementApprovalId { get; set; }
        public string ApprovedDocument { get; set; }
        public long RequisitionDetailId { get; set; }
        public string CandidateIds { get; set; }
        public int CreatedBy { get; set; }

    }

    public class ManagementApprovalMasterData
    {
        public long ManagementApprovalId { get; set; }
        public string CandidateId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Date { get; set; }
        public string Note { get; set; }
        public string BottomNote { get; set; }
        public string SignatureNeededFrom { get; set; }
        public string SignatureNeededTo { get; set; }
        public string ApprovedDocument { get; set; }

    }

    public class ManagementApprovalCandidates
    {
        public long ManagementApprovalId { get; set; }
        public int LineId { get; set; }
        public int RequisitionDetailId { get; set; }
        public int CandidateId { get; set; }
        public string InterViewPanel { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Position { get; set; }
        public string Location { get; set; }
        public string Grade { get; set; }
        public string Qualification { get; set; }
        public string Experience { get; set; }
        public decimal PresentCTC { get; set; }
        public decimal ProposedBasic { get; set; }
        public decimal ProposedCTC { get; set; }
        public string ReporNew { get; set; }
        public string ApprovedDocument { get; set; }
        public int? VerticalId { get; set; }

    }

    public class ManagementApprovalVacancy
    {
        public long ManagementApprovalId { get; set; }
        public int LineId { get; set; }
        public string Plant { get; set; }
        public string Function { get; set; }
        public int Approved { get; set; }
        public int AvailableasOn { get; set; }
        public int Vacancies { get; set; }
        public int InThisApproval { get; set; }
        public int EarlierApprovalYettoJoin { get; set; }
        public int YetToFill { get; set; }

    }

    public class ManagementApprovalSigntureFrom
    {
        public long ManagementApprovalId { get; set; }
        public string SignatureNeededFrom { get; set; }
    }

    public class ManagementApprovalSigntureTo
    {
        public long ManagementApprovalId { get; set; }
        public string SignatureNeededTo { get; set; }
    }

    public class SearchManagementApproval
    {
        public long? ManagementApprovalId { get; set; }
        //public long? CandidateId { get; set; }
        public string CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
    }

    public class ManagementApprovalCandidatesGet   // By Amartya on 05-08-2023
    {
        public long ManagementApprovalId { get; set; }
        public int LineId { get; set; }
        public int RequisitionDetailId { get; set; }
        public int CandidateId { get; set; }
        public string InterViewPanel { get; set; }
        public string InterViewPannelMemberDesignation { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Position { get; set; }
        public string Location { get; set; }
        public string Grade { get; set; }
        public string Qualification { get; set; }
        public string Experience { get; set; }
        public decimal PresentCTC { get; set; }
        public decimal ProposedBasic { get; set; }
        public decimal ProposedCTC { get; set; }
        public string ReporNew { get; set; }
        public string ApprovedDocument { get; set; }
        public int? VerticalId { get; set; }
    }

    public class ManagementApprovalGet    // By Amartya on 05-08-2023
    {
        public ManagementApprovalMasterData ManagementApprovalMaster { get; set; }
        public List<ManagementApprovalCandidatesGet> ManagementApprovalCandidatesget { get; set; }
        public List<ManagementApprovalVacancy> ManagementApprovalVacancy { get; set; }
        public List<ManagementApprovalSigntureFrom> ManagementApprovalSigntureFrom { get; set; }
        public List<ManagementApprovalSigntureTo> ManagementApprovalSigntureTo { get; set; }
    }

    public class ManagementApprovalMasterSaveNew   // By Amartya on 05-08-2023
    {
        public long ManagementApprovalId { get; set; }
        public string CandidateId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Date { get; set; }
        public string Note { get; set; }
        public string BottomNote { get; set; }
        public string SignatureNeededFrom { get; set; }
        public string SignatureNeededTo { get; set; }
        public string ApprovedDocument { get; set; }
        public int CreatedBy { get; set; }
        public List<ManagementApprovalCandidatesGet> ManagementApprovalCandidates { get; set; }
        public List<ManagementApprovalVacancy> ManagementApprovalVacancy { get; set; }
        public string OMMailIds { get; set; }
        public string OCMailIds { get; set; }
        public string OHMailIds { get; set; }
        public string HTMailIds { get; set; }
        public string StatusFlag { get; set; }
        public string CandidateName { get; set; }
        public string Flag { get; set; }

    }

    public class ManagementApprovalMasterGet    // By Amartya on 05-08-2023
    {
        public long ManagementApprovalId { get; set; }
        public string CandidateId { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Date { get; set; }
        public string Note { get; set; }
        public string BottomNote { get; set; }
        public string SignatureNeededFrom { get; set; }
        public string SignatureNeededTo { get; set; }
        public string ApprovedDocument { get; set; }
        public List<ManagementApprovalCandidatesGet> ManagementApprovalCandidatesget { get; set; }
        public List<ManagementApprovalVacancy> ManagementApprovalVacancy { get; set; }
        public List<ManagementApprovalSigntureFrom> ManagementApprovalSigntureFrom { get; set; }
        public List<ManagementApprovalSigntureTo> ManagementApprovalSigntureTo { get; set; }

    }
}
