using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.JoiningModule
{

    public class EmployeeReimbursementMedicalList
    {
        public long CandidateMedicalReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public string Location { get; set; }
        public string BillDetails { get; set; }
        public string Date { get; set; }
        public decimal TotalAmount { get; set; }
        public string Documentpath { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long LocationId { get; set; }
        public string LocationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string ApprovalRemarks { get; set; }
        //public List<EmployeeReimbursementDetails> EmployeeReimbursementDetails { get; set; }

    }

    public class EmployeeMedicalReimbursement
    {
        public EmployeeReimbursementMatserData EmployeeReimbursementMatserData { get; set; }
        public List<EmployeeReimbursementDetails> EmployeeReimbursementDetails { get; set; }

    }
    //Argg start
    public class EmployeeMedicalReimbursementMedical
    {
        public EmployeeReimbursementMatserData1 EmployeeReimbursementMatserData1 { get; set; }
        public List<EmployeeReimbursementDetailsMedical> EmployeeReimbursementDetailsMedical { get; set; }
        public  List<EmployeeMedicalReimbursementMedicalApproval> EmployeeMedicalReimbursementMedicalApproval { get; set; }

    }//Argg end

    public class EmployeeMedicalReimbursementMedical2
    {
        public EmployeeReimbursementMatserData1 EmployeeReimbursementMatserData1 { get; set; }
        public List<EmployeeReimbursementDetailsMedical> EmployeeReimbursementDetailsMedical { get; set; }
        public List<EmployeeMedicalReimbursementMedicalApproval> EmployeeMedicalReimbursementMedicalApproval { get; set; }

    }//Argg end

    public class EmployeeMedicalReimbursementMedicalApproval
    {
        public long CandidateMedicalReimbursementApprovalId { get; set; }
        public long CandidateMedicalReimbursementId { get; set; }
        public string ApprovalStatus { get; set; }
        public string RemarksBy { get; set; }
        public string StatusName { get; set; }
        public string ApprovalRemarksapprove { get; set; }
        public bool IsActive { get; set; }
    }

    public class EmployeeReimbursementData
    {
        public long CandidateMedicalReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public string Location { get; set; }
        public string BillDetails { get; set; }
        public string Date { get; set; }
        public decimal TotalAmount { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string Htmlstring { get; set; }
        public string HtmlstringPath { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public string ApprovalRemarks { get; set; }

        public List<EmployeeReimbursementDetails> EmployeeReimbursementDetails { get; set; }

    }
    //Argg start
    public class EmployeeReimbursementDataMedical
    {
        public long CandidateMedicalReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public string Location { get; set; }
        public string BillDetails { get; set; }
        public string Date { get; set; }
        public decimal TotalAmount { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public string ApprovalRemarks { get; set; }
        public string DocumentPathForPDF { get; set; }

        public List<EmployeeReimbursementDetailsMedical> EmployeeReimbursementDetailsMedical { get; set; }
        public List<EmployeeMedicalReimbursementMedicalApproval> EmployeeMedicalReimbursementMedicalApproval { get; set; }

    }//Argg end
    public class EmployeeReimbursementMatserData
    {
        public long CandidateMedicalReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public string Location { get; set; }
        public string BillDetails { get; set; }
        public string Date { get; set; }
        public decimal TotalAmount { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
    }
    //Argg start
    public class EmployeeReimbursementMatserData1
    {
        public long CandidateMedicalReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public string Location { get; set; }
        public string BillDetails { get; set; }
        public string Date { get; set; }
        public decimal TotalAmount { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public string DocumentPathForPDF { get; set; }
    }//Argg end

    public class EmployeeReimbursementDetails
    {
        public long CandidateMedicalReimbursementDetailsId { get; set; }
        public long CandidateMedicalReimbursementId { get; set; }
        public string BillNo { get; set; }
        public string BillDate { get; set; }
        public decimal Amount { get; set; }
        public bool IsActive { get; set; }
        //public string ApprovalRemarks { get; set; }//Argg
        //public string Remarksby { get; set; }//Argg
    }
    //Argg start
    public class EmployeeReimbursementDetailsMedical
    {
        public long CandidateMedicalReimbursementDetailsId { get; set; }
        public long CandidateMedicalReimbursementId { get; set; }
        public string BillNo { get; set; }
        public string BillDate { get; set; }
        public decimal Amount { get; set; }
        public bool IsActive { get; set; }
        //public string ApprovalRemarks { get; set; }
        //public string Remarksby { get; set; }
    }//Argg end
    public class EmployeeReimbursementSearch
    {
        public long? CandidateMedicalReimbursementId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateId { get; set; }
        public long? EmpId { get; set; }

    }

    public class ReimbursementApprovalStatus
    {
        public long StatusId { get; set; }
        public string StatusName { get; set; }
        public int StatusOrder { get; set; }
        public string StatusIcon { get; set; }
        public bool IsActive { get; set; }

    }

    public class ReimbursementApprovalStatusSearch
    {
        public long? StatusId { get; set; }
        public bool? IsActive { get; set; }

    }

    public class EmployeeTravelReimbursementListData
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateFullName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateofInduction { get; set; }
        public int PlaceofInduction { get; set; }
        public string PlaceofInductionDesc { get; set; }
        public decimal Amount { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public string ApprovalStatusName { get; set; }

    }

    public class EmployeeTravelReimbursement
    {
        public EmployeeTravelReimbursementMasterData EmployeeTravelReimbursementMasterData { get; set; }
        public List<EmployeeTravelJourneyDetails> EmployeeTravelJourneyDetails { get; set; }
        public List<EmployeeTravelAttachmentDetails> EmployeeTravelAttachmentDetails { get; set; }
        public List<EmployeeTravelForRemarks> EmployeeTravelForRemarks { get; set; }
    }

    public class EmployeeTravelReimbursementData
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateFullName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long PostingLocationId { get; set; }
        public string PostingLocationName { get; set; }
        public string DateofInduction { get; set; }
        public int PlaceofInduction { get; set; }
        public string PlaceofInductionDesc { get; set; }
        public decimal Amount { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovalStatus { get; set; }
        public string Htmlstring { get; set; }
        public string Htmlstringpath { get; set; }
        public string ApprovalStatusName { get; set; }
        public string PreviousAttachmentIds { get; set; }
        public string PreviousJourneyIds { get; set; }
        public string EmpNo { get; set; }
        public string DocumentPathForPDF { get; set; }
        public List<EmployeeTravelJourneyDetails> EmployeeTravelJourneyDetails { get; set; }
        public List<EmployeeTravelAttachmentDetails> EmployeeTravelAttachmentDetails { get; set; }
        public List<EmployeeTravelForRemarks> EmployeeTravelForRemarks { get; set; }

    }
    //Argg start
    public class EmployeeTravelReimbursementData1
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateFullName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long PostingLocationId { get; set; }
        public string PostingLocationName { get; set; }
        public string DateofInduction { get; set; }
        public int PlaceofInduction { get; set; }
        public string PlaceofInductionDesc { get; set; }
        public decimal Amount { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public string Htmlstring { get; set; }
        public string Htmlstringpath { get; set; }
        public string ApprovalStatusName { get; set; }
        public string PreviousAttachmentIds { get; set; }
        public string PreviousJourneyIds { get; set; }
        public List<EmployeeTravelJourneyDetails> EmployeeTravelJourneyDetails { get; set; }
        public List<EmployeeTravelAttachmentDetails> EmployeeTravelAttachmentDetails { get; set; }
        //public List<EmployeeTravelForRemarks> EmployeeTravelForRemarks { get; set; }

    }//Argg end

    public class EmployeeTravelReimbursementMasterData
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateFullName { get; set; }
        public long Designation { get; set; }
        public string DesignationName { get; set; }
        public long GradeId { get; set; }
        public string GradeName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long PostingLocationId { get; set; }
        public string PostingLocationName { get; set; }
        public string DateofInduction { get; set; }
        public int PlaceofInduction { get; set; }
        public string PlaceofInductionDesc { get; set; }
        public decimal Amount { get; set; }
        public int CreatedBy { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public string EmpNo { get; set; }
        public string DocumentPathForPDF { get; set; }
    }


    public class EmployeeTravelJourneyDetails
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long CandidateTravelReimbursementJourneyId { get; set; }
        public int JourneyTypeId { get; set; }
        public string ReportingLocation { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int TravelModeId { get; set; }
        public decimal ClaimAmount { get; set; }
        public long CreatedBy { get; set; }
        
    }

    public class EmployeeTravelAttachmentDetails
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long CandidateTravelReimbursementAttachmentId { get; set; }
        public int JourneyTypeId { get; set; }
        public int TicketId { get; set; }
        public string AttachmentFile { get; set; }
        public string AttachmentLink { get; set; }
        public long CreatedBy { get; set; }
    }
    public class EmployeeTravelForRemarks
    {
        public long CandidateTravelReimbursementId { get; set; }
        public string ApprovalRemarks { get; set; }
        public string FullName { get; set; }
        public long CreatedBy { get; set; }
    } //arg

    public class EmployeeTravelReimbursementSearch
    {
        public long? CandidateId { get; set; }
        public long? CandidateTravelReimbursementId { get; set; }

    }
    public class EmployeeTravelReimbursementForZip
    {
        public string CandidateTravelReimbursementId { get; set; }
        public int CandidateId { get; set; }
        public string documentpath { get; set; }
        public string AttachmentLink { get; set; }
    }

    public class EmployeeNoticePeriodReimbursement
    {
        public long CandidateNoticePeriodBuyOutDaysId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public int NoticePeriodDays { get; set; }
        public string Htmlstring { get; set; }
        public string HtmlstringPath { get; set; }
        public int NoticePeroiodServed { get; set; }
        public int RemainingDays { get; set; }
        public string Document { get; set; }
        public decimal Amount { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string ApprovalRemarks { get; set; }
        public string DocumentPath { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string DateOfResigation { get; set; }
        public int NoticePeriodRecovery { get; set; }
        public long RecoveryAmountPerDay { get; set; }
        public string FunctionName { get; set; }
        public string LocationOffice { get; set; }
        public string GradeName { get; set; }
        public string OfferSendDate { get; set; }

    }

    public class EmployeeNoticePeriodReimbursementSearch
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateNoticePeriodBuyOutDaysId { get; set; }
        public long? EmpId { get; set; }

    }

    public class CandidateMedicalReimbursementApprovalList
    {
        public long CandidateMedicalReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public decimal TotalAmount { get; set; }
        public int ApprovalStatus { get; set; }
        public string StatusName { get; set; }
        public bool IsActive { get; set; }
        public string DocumentPathForPDF { get; set; }

    }

    public class CandidateMedicalReimbursementApprovalListSearch
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateMedicalReimbursementId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public string EmpNo { get; set; }
        public string Name { get; set; }
        public long? Location { get; set; }
        public long? Function { get; set; }
        public long? Department { get; set; }
        public int? ApprovalStatus { get; set; }

    }

    public class CandidateMedicalReimbursementApproval
    {
        public string CandidateMedicalReimbursementId { get; set; }
        public string RequisitionDetailId { get; set; }
        public string CandidateId { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public int CreatedBy { get; set; }

    }

    public class CandidateTravelReimbursementApprovalList
    {
        public long CandidateTravelReimbursementId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string DateofInduction { get; set; }
        public long PlaceofInduction { get; set; }
        public string PlaceofInductionDesc { get; set; }
        public decimal TotalAmount { get; set; }
        public int ApprovalStatus { get; set; }
        public string StatusName { get; set; }
        public bool IsActive { get; set; }
        public string DocumentPathForPDF { get; set; }

    }
    public class CandidateTravellReimbursementApprovalListSearch
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateTravelReimbursementId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public string EmpNo { get; set; }
        public string Name { get; set; }
        public long? Location { get; set; }
        public long? Function { get; set; }
        public long? Department { get; set; }
        public int? ApprovalStatus { get; set; }

    }

    public class CandidateTravelReimbursementApproval
    {
        public string CandidateTravelReimbursementId { get; set; }
        public string RequisitionDetailId { get; set; }
        public string CandidateId { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public int CreatedBy { get; set; }

    }

    public class CandidateNoticePeriodBuyOutApprovalList
    {
        public long CandidateNoticePeriodBuyOutDaysId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int Days { get; set; }
        public decimal Amount { get; set; }
        public int ApprovalStatus { get; set; }
        public string StatusName { get; set; }
        public bool IsActive { get; set; }
        public string DocumentPath { get; set; }
        public string DocumentPathForHtml { get; set; }
        public string EmailId { get; set; }

    }

    public class CandidateNoticePeriodBuyOutApprovalListSearch
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateNoticePeriodBuyOutDaysId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public string EmpNo { get; set; }
        public string Name { get; set; }
        public long? Location { get; set; }
        public long? Function { get; set; }
        public long? Department { get; set; }
        public int? ApprovalStatus { get; set; }

    }

    public class CandidateNoticePeriodBuyOutApproval
    {
        public long CandidateNoticePeriodBuyOutDaysId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string CandidateId { get; set; }
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public int CreatedBy { get; set; }
        public string CandidateName { get; set; }//Piu
        public string EmpNo { get; set; }//Piu
        public string Passworrd { get; set; }//Piu
        public string ReimbursementName { get; set; }//Piu
        public string EmailId { get; set; }

    }

    public class CandidateReimbursementBillSubmitList
    {
        public long CandidateReimbursementBillSubmitId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string CandidateFullName { get; set; }
        public string DateofJoining { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int Designation { get; set; }
        public string DesignationName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int LocationId { get; set; }
        public string LocationName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public decimal Amount { get; set; }
        public string Document { get; set; }
        public string DocumentPathForHtml { get; set; }

    }

    public class CandidateReimbursementBillSubmitListSearch
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? CandidateReimbursementBillSubmitId { get; set; }
        public string DtofJoiningFrom { get; set; }
        public string DtofJoiningTo { get; set; }
        public string EmpNo { get; set; }
        public string Name { get; set; }
        public long? Vertical { get; set; }
        public long? Location { get; set; }
        public long? Function { get; set; }
        public long? Department { get; set; }
        public bool? Pending { get; set; }

    }

    public class CandidateReimbursementBillSubmitListSearchForZip
    {
        public string CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }


    }

    public class CandidateReimbursementBillSubmitSave
    {
        public long CandidateReimbursementBillSubmitId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public decimal Amount { get; set; }
        public string Document { get; set; }
        public int CreatedBy { get; set; }

    }

    public class DownloadFormsString
    {
        public List<DownloadFormsStringValues> DownloadFormsStringValues { get; set; }
        //public string EmpId { get; set; }
        //public string Documentstring { get; set; }
    }
    public class DownloadFormsStringValues
    {
        public string EmpId { get; set; }
        public string Documentstring { get; set; }
    }

}
