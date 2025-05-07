using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CandidateModule
{
    public class CandidateRegistration
    {
        public string EmailId { get; set; }
        public string Name { get; set; }
        public string SaltKey { get; set; }
        public string Password { get; set; }
    }
    public class Candidate
    {
        public string Status { get; set; }
        public int CandidateId { get; set; }
        public int PrefixId { get; set; }
        public int Age { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        // public string GenderName { get; set; }
        public string DOB { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        //   public string MotherTongue { get; set; }
        public string LanguageIds { get; set; }
        // public string Languages { get; set; }
        public int QualificationId { get; set; }
        //  public string Qualification { get; set; }
        public int CourseId { get; set; }
        // public string Course { get; set; }
        public int StreamId { get; set; }
        // public string Stream { get; set; }
        public decimal MarksPercentage { get; set; }
        public int CompletionYear { get; set; }
        public int QualificationTypeId { get; set; }
        //   public string QualificationType { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public decimal CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public int DomainId { get; set; }
        //  public string Domain { get; set; }
        public int SubDomainId { get; set; }
        // public string SubDomain { get; set; }
        public int StateId { get; set; }
        // public string State { get; set; }
        public int PreviousApplied { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string RelationshipNotes { get; set; }
        public string Resume { get; set; }
        public int SourceChannelId { get; set; }
        public int CreatedBy { get; set; }
        public int VendorId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string InternalCandidateRemarks { get; set; }
        public int TestOption { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
        public string position { get; set; }
        public string department { get; set; }
        public string function { get; set; }
        public string location { get; set; }
        public string state { get; set; }
        public string reqno { get; set; }
        public string userid { get; set; }
    }
    public class CampusCandidateUpdate
    {
        public int CandidateId { get; set; }
        public int PrefixId { get; set; }
        public int Age { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        // public string GenderName { get; set; }
        public string DOB { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        //   public string MotherTongue { get; set; }
        public string LanguageIds { get; set; }
        // public string Languages { get; set; }
        public int StateId { get; set; }
        // public string State { get; set; }
        public int PreviousApplied { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public string Resume { get; set; }
        public int CreatedBy { get; set; }
    }
    public class CandidateDetails //can
    {
        public string Status { get; set; }
        public int CandidateId { get; set; }
        public int PrefixId { get; set; }
        public int Age { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        // public string GenderName { get; set; }
        public string DOB { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        //   public string MotherTongue { get; set; }
        public string LanguageIds { get; set; }
        // public string Languages { get; set; }
        public int QualificationId { get; set; }
        //  public string Qualification { get; set; }
        public int CourseId { get; set; }
        // public string Course { get; set; }
        public int StreamId { get; set; }
        // public string Stream { get; set; }
        public decimal MarksPercentage { get; set; }
        public int CompletionYear { get; set; }
        public int QualificationTypeId { get; set; }
        //   public string QualificationType { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public decimal CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public int DomainId { get; set; }
        //  public string Domain { get; set; }
        public int SubDomainId { get; set; }
        // public string SubDomain { get; set; }
        public int StateId { get; set; }
        // public string State { get; set; }
        public int PreviousApplied { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string RelationshipNotes { get; set; }
        public string Resume { get; set; }
        public int SourceChannelId { get; set; }
        public int CreatedBy { get; set; }
        public int VendorId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string InternalCandidateRemarks { get; set; }
        public int TestOption { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
        public string position { get; set; }
        public string department { get; set; }
        public string function { get; set; }
        public string location { get; set; }
        public string state { get; set; }
        public string reqno { get; set; }
        public string userid { get; set; }
        public string Password { get; set; }
        public string Saltkey { get; set; }
        public string EncriptedPassword { get; set; }

    }

    public class CandidateCmdStatus
    {
        public long CreatedBy { get; set; }
        public long CandidateId { get; set; }
        public int CMDApprovalRequired { get; set; }
        public int CMDApprovalStatus { get; set; }
        public string CMDApprovalNo { get; set; }
        public string CMDApprovalDocument { get; set; }
    }
    public class SearchCandidate
    {
        public int? CandidateId { get; set; }
        public bool? IsActive { get; set; }
        public string Search { get; set; }
    }
    public class EditCampusCandidate
    {
        public int? AutoUserId { get; set; }
        public int? CandidateId { get; set; }
        public int? FormtypeId { get; set; }
        public String? Remarks { get; set; }
        public String? Name { get; set; }
        public String? CandidateNo { get; set; }
        public String? EmailId { get; set; }
    }
    public class EditCampusCandidateRegistration
    {
        public int? AutoUserId { get; set; }
        public int? CandidateId { get; set; }
        public int? FormtypeId { get; set; }
        public String? Remarks { get; set; }
        public String? Name { get; set; }
        public String? CandidateNo { get; set; }
        public String? EmailId { get; set; }
    }

    public class CandidateStatus
    {
        public int RequisitionId { get; set; }
        public int CandidateId { get; set; }
        public int StatusId { get; set; }
        public int CreatedBy { get; set; }
        public string Remarks { get; set; }
    }

    public class CandidateDetail
    {
        public string CandidateNo { get; set; }
        public int CandidateId { get; set; }
        public string Prefix { get; set; }
        public string FullName { get; set; }
        public string GenderName { get; set; }
        public string QualificationType { get; set; }
        public string DOB { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public string MotherTongue { get; set; }
        public string Languages { get; set; }
        public string Qualification { get; set; }
        public string Course { get; set; }
        public string Stream { get; set; }
        public string MarksPercentage { get; set; }
        public string CompletionYear { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public string Domain { get; set; }
        public string SubDomain { get; set; }
        public string State { get; set; }
        public string PreviousApplied { get; set; }
        public string RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public string Resume { get; set; }
        public string IsEmployee { get; set; }
        public string CreatedBy { get; set; }
        public string Status { get; set; }
        public string SourceChannelName { get; set; }
        public int Age { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string RelationshipNotes { get; set; }
        public int TestOption { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
    }

    public class CandidateDetailData
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionDetailHistoryId { get; set; }
        public string CandidateNo { get; set; }
        public long CandidateId { get; set; }
        public int PrefixId { get; set; }
        public string PrefixName { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        public string MotherTongueName { get; set; }
        public string LaguageIds { get; set; }
        public string LanguageNames { get; set; }
        public int QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int StreamId { get; set; }
        public string StreamName { get; set; }
        public string MarksPercentage { get; set; }
        public string CompletionYear { get; set; }
        public int QualificationTypeId { get; set; }
        public string QualificationTypeName { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public decimal AcceptedCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public int DomainId { get; set; }
        public string DomainName { get; set; }
        public int SubDomainId { get; set; }
        public string SubDomainName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int PreviousApplied { get; set; }
        public string PreviousAppliedName { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeStatusName { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int SourceChannelId { get; set; }
        public string SourceChannelName { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateOwner { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long PrevHiringId { get; set; }
        public string Resume { get; set; }
        public string ReferalEmpNo { get; set; }
        public string ReferalDesignation { get; set; }
        public string ReferalGrade { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string ParentRelationshipName { get; set; }
        public string ChildRelationshipName { get; set; }
        public string RelationshipNotes { get; set; }
        public int CMDApprovalRequired { get; set; }
        public int CMDApprovalStatus { get; set; }
        public string CMDApprovalNo { get; set; }
        public string CMDApprovalDocument { get; set; }
        public int CMDUpdateStatus { get; set; }
        public int TestOption { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
        public bool IsInternal { get; set; }
        public int? ManagementApprovalId { get; set; }
        public bool ManagementApprovalFlag { get; set; }
        public string OHMailId { get; set; }
        public string OCMailId { get; set; }
        public string OMMailId { get; set; }
        public string HTMailId { get; set; }
        public int StatusFlag { get; set; }
        public int VendorId { get; set; }
        public int VendorInvoiceId { get; set; }
        public string StatusName { get; set; }
        public string DateOfSubmission { get; set; }
        public string MappedToRequisition { get; set; }
        public string RequisitionNo { get; set; }
        public string RMProcessStatus { get; set; }
        public string OtherComments { get; set; }
        public string RefEmpNo { get; set; }
        public string RefEmpName { get; set; }
        public string RefEmpDesignation { get; set; }
        public int IsRefferedId { get; set; }
        public string RefferedVerticalId { get; set; }
        public string RefferedFunctionId { get; set; }
        public string RefferedDepartmentId { get; set; }
        public string RefferedVertical { get; set; }
        public string RefferedFunction { get; set; }
        public string RefferedDepartment { get; set; }
        public string PositionName { get; set; }
        public string Applicationform { get; set; }
        public string CandiadatePhoto { get; set; }
    }
    public class CandidateDetaildummyData
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionDetailHistoryId { get; set; }
        public string CandidateNo { get; set; }
        public long CandidateId { get; set; }
        public int PrefixId { get; set; }
        public string PrefixName { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        public string MotherTongueName { get; set; }
        public string LaguageIds { get; set; }
        public string LanguageNames { get; set; }
        public int QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int StreamId { get; set; }
        public string StreamName { get; set; }
        public string MarksPercentage { get; set; }
        public string CompletionYear { get; set; }
        public int QualificationTypeId { get; set; }
        public string QualificationTypeName { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public decimal AcceptedCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public int DomainId { get; set; }
        public string DomainName { get; set; }
        public int SubDomainId { get; set; }
        public string SubDomainName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int PreviousApplied { get; set; }
        public string PreviousAppliedName { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeStatusName { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int SourceChannelId { get; set; }
        public string SourceChannelName { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateOwner { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public long PrevHiringId { get; set; }
        public string Resume { get; set; }
        public string ReferalEmpNo { get; set; }
        public string ReferalDesignation { get; set; }
        public string ReferalGrade { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string ParentRelationshipName { get; set; }
        public string ChildRelationshipName { get; set; }
        public string RelationshipNotes { get; set; }
        public int CMDApprovalRequired { get; set; }
        public int CMDApprovalStatus { get; set; }
        public string CMDApprovalNo { get; set; }
        public string CMDApprovalDocument { get; set; }
        public int CMDUpdateStatus { get; set; }
        public int TestOption { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
        public bool IsInternal { get; set; }
        public int? ManagementApprovalId { get; set; }
        public bool ManagementApprovalFlag { get; set; }
        public string OHMailId { get; set; }
        public string OCMailId { get; set; }
        public string OMMailId { get; set; }
        public string HTMailId { get; set; }
        public int StatusFlag { get; set; }
        public int VendorId { get; set; }
        public int VendorInvoiceId { get; set; }
        public string StatusName { get; set; }
        public string DateOfSubmission { get; set; }
        public string MappedToRequisition { get; set; }
        public string RequisitionNo { get; set; }
        public string RMProcessStatus { get; set; }
        public string OtherComments { get; set; }
        public int OptionVisible { get; set; }
        public string VerticalName { get; set; }
        public string FnctionName { get; set; }
        public string LocationName { get; set; }
    }
    public class SearchCandidateDetail
    {
        public long? CandidateId { get; set; }
        public string CandidateName { get; set; }
        public string CandidateNo { get; set; }
        public int? HiringStatusId { get; set; }
        public string GenderIds { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
        public string MotherTongueIds { get; set; }
        public string QualificationIds { get; set; }
        public string CourseIds { get; set; }
        public string StreamIds { get; set; }
        public decimal? FromPercentage { get; set; }
        public decimal? ToPercentage { get; set; }
        public string DomainIds { get; set; }
        public string SubDomainIds { get; set; }
        public string StateIds { get; set; }
        public string SourceChannelId { get; set; }
        public long? CreatedBy { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? FromExperience { get; set; }
        public int? ToExperience { get; set; }
        public string CompletionYears { get; set; }
        public string QualificationTypeIds { get; set; }
        public string CurrentEmployer { get; set; }
        public string Designation { get; set; }
        public string RelativeStatus { get; set; }
        public int? PreviousApplied { get; set; }
        public string CandidateOwner { get; set; }
       // public string folderPath { get; set; }
    }
    public class filtercandidatedetail
    {
        public long? CandidateId { get; set; }
        public string HiringStatusId { get; set; }
        public int RequisitionDetailId { get; set; }
        public string CandidateName { get; set; }
        public string CandidateNo { get; set; }
        public string GenderIds { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
        public string MotherTongueIds { get; set; }
        public string LanguageKnownIds { get; set; }
        public string QualificationIds { get; set; }
        public string CourseIds { get; set; }
        public string StreamIds { get; set; }
        public decimal? FromPercentage { get; set; }
        public decimal? ToPercentage { get; set; }
        public string DomainIds { get; set; }
        public string SubDomainIds { get; set; }
        public string StateIds { get; set; }
        public string SourceChannelId { get; set; }
        public long? CreatedBy { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? FromExperience { get; set; }
        public int? ToExperience { get; set; }
        public string CompletionYears { get; set; }
        public string QualificationTypeIds { get; set; }
        public string CurrentEmployer { get; set; }
        public string Designation { get; set; }
        public string RelativeStatus { get; set; }
        public int? PreviousApplied { get; set; }
        public string CandidateOwner { get; set; }
        public string University { get; set; }
        public string Institution { get; set; }
        public int? ApplicationCount { get; set; }
        public string RequisitionStatus { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalId { get; set; }
        public string FunctionId { get; set; }
        public string LocationId { get; set; }
        public int? InterviewStatus { get; set; }
        public string Comments { get; set; }
        public string Interview { get; set; }
        public string InterviewassessmentForm { get; set; }
    }
    public class filtercandidatedetailNew
    {
        public long? CandidateId { get; set; }
        public string HiringStatusId { get; set; }
        public int RequisitionDetailId { get; set; }
        public string CandidateName { get; set; }
        public string CandidateNo { get; set; }
        public string GenderIds { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
        public string MotherTongueIds { get; set; }
        public string LanguageKnownIds { get; set; }
        public string QualificationIds { get; set; }
        public string CourseIds { get; set; }
        public string StreamIds { get; set; }
        public int? FromPercentage { get; set; }
        public int? ToPercentage { get; set; }
        public string DomainIds { get; set; }
        public string SubDomainIds { get; set; }
        public string StateIds { get; set; }
        public string SourceChannelId { get; set; }
        public long? CreatedBy { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? FromExperience { get; set; }
        public int? ToExperience { get; set; }
        public string CompletionYears { get; set; }
        public string QualificationTypeIds { get; set; }
        public string CurrentEmployer { get; set; }
        public string Designation { get; set; }
        public string RelativeStatus { get; set; }
        public string PreviousApplied { get; set; }
        public string CandidateOwner { get; set; }
        public string University { get; set; }
        public string Institution { get; set; }
        public string ApplicationCount { get; set; }
        public string RequisitionStatus { get; set; }
        public string RequisitionNo { get; set; }
        public string VerticalId { get; set; }
        public string FunctionId { get; set; }
        public string LocationId { get; set; }
        public int? InterviewStatus { get; set; }
        public string Comments { get; set; }
        public string Interview { get; set; }
        public string InterviewassessmentForm { get; set; }
        public int? RefferedVerticalId { get; set; }
        public int? RefferedFunctionId { get; set; }
        public int? RefferedDepartmentId { get; set; }
        public int? pagesize { get; set; }
        public int pagenumber { get; set; }
    }
    public class cvdropcandidate
    {
        public long? CandidateId { get; set; }
        public string HiringStatusId { get; set; }
        public bool requisitionMapped { get; set; }
        public string FromDate { get; set; }
        public long requisitionDetailId { get; set; }

    }
    public class CandidateData
    {
        public string CandidateNo { get; set; }
        public long CandidateId { get; set; }
        public int PrefixId { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        public string LanguageIds { get; set; }
        public int QualificationId { get; set; }
        public int CourseId { get; set; }
        public int StreamId { get; set; }
        public string MarksPercentage { get; set; }
        public string CompletionYear { get; set; }
        public int QualificationTypeId { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public int DomainId { get; set; }
        public int SubDomainId { get; set; }
        public int StateId { get; set; }
        public int PreviousApplied { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int CMDApprovalRequired { get; set; }
        public int CMDApprovalStatus { get; set; }
        public string CMDApprovalNo { get; set; }
        public string CMDApprovalDocument { get; set; }
        public string Resume { get; set; }
        public int CMDUpdateStatus { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string RelationshipNotes { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
        public string internalCandidateRemarks { get; set; }
    }

    public class SearchCandidateData
    {
        public long CandidateId { get; set; }
    }
    public class CampusCandidateDataGet
    {
        public string CandidateNo { get; set; }
        public long CandidateId { get; set; }
        public int PrefixId { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        public string LanguageIds { get; set; }
        public int StateId { get; set; }
        public int PreviousApplied { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public string Resume { get; set; }
        
    }
    public class CandidateApplyJob
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
    }
    public class ApplyJob
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public string position { get; set; }
        public string department { get; set; }
        public string function { get; set; }
        public string location { get; set; }
        public string state { get; set; }
        public string reqno { get; set; }
        public string EmailId { get; set; }
        public string Name { get; set; }
        public string Candidate { get; set; }
    }
    public class ApplyJobExternal
    {
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public string position { get; set; }
        public string department { get; set; }
        public string function { get; set; }
        public string location { get; set; }
        public string state { get; set; }
        public string reqno { get; set; }
        public string EmailId { get; set; }
        public string Name { get; set; }
        public string Candidate { get; set; }
        public string CandidateNo { get; set; }
    }
    public class InternalCandidate
    {
        public long CandidateId { get; set; }
    }

    public class SearchInternalCandidate
    {
        public long CreatedBy { get; set; }
    }
    public class SearchCandidateHiringRemarks
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? HiringStatusId { get; set; }
    }
    public class SearchCandidateOfferRejectRemarks
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }        
    }
    public class CandidateHiringRemarks
    {
        public string HiringStatusRemarks { get; set; }
    }
    public class CandidateOfferRejectRemarks
    {
        public long OfferLetterId { get; set; }
        public long CandidateId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string OfferRejectRemarks { get; set; }
    }
    public class SearchSalaryFitment
    {
        public long? CandidateId { get; set; }

        public long? RequisitionDetailId { get; set; }

    }
    public class SalaryFitmentList
    {
        public long? CandidateId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public long? SalaryFitmentId { get; set; }
        public string Probation { get; set; }
        public string Designation { get; set; }
        public long? Grade { get; set; }
        public string GradeName { get; set; }
        public long? Location { get; set; }
        public string LocationOffice { get; set; }
    }
    public class SearchCandidateDetailsCVDrop
    {
        public long? CandidateId { get; set; }
        public string CandidateName { get; set; }
        public int? HiringStatusId { get; set; }
        public string GenderIds { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public string AadharNo { get; set; }
        public string ContactNo { get; set; }
        public string EmailId { get; set; }
        public string MotherTongueIds { get; set; }
        public string QualificationIds { get; set; }
        public string CourseIds { get; set; }
        public string StreamIds { get; set; }
        public decimal? FromPercentage { get; set; }
        public decimal? ToPercentage { get; set; }
        public string DomainIds { get; set; }
        public string SubDomainIds { get; set; }
        public string StateIds { get; set; }
        public string SourceChannelId { get; set; }
        public long? CreatedBy { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? FromExperience { get; set; }
        public int? ToExperience { get; set; }
        public string CompletionYears { get; set; }
        public string QualificationTypeIds { get; set; }
        public string CurrentEmployer { get; set; }
        public string Designation { get; set; }
        public string RelativeStatus { get; set; }
        public int? PreviousApplied { get; set; }
        public string CandidateOwner { get; set; }
    }
    public class CVDropCandidateDataList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionDetailHistoryId { get; set; }
        public string CandidateNo { get; set; }
        public long CandidateId { get; set; }
        public int PrefixId { get; set; }
        public string PrefixName { get; set; }
        public string FullName { get; set; }
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public string AadharNo { get; set; }
        public int MotherTongueId { get; set; }
        public string MotherTongueName { get; set; }
        public string LaguageIds { get; set; }
        public string LanguageNames { get; set; }
        public int QualificationId { get; set; }
        public string QualificationName { get; set; }
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int StreamId { get; set; }
        public string StreamName { get; set; }
        public string MarksPercentage { get; set; }
        public string CompletionYear { get; set; }
        public int QualificationTypeId { get; set; }
        public string QualificationTypeName { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public string CurrentDesignation { get; set; }
        public int DomainId { get; set; }
        public string DomainName { get; set; }
        public int SubDomainId { get; set; }
        public string SubDomainName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int PreviousApplied { get; set; }
        public string PreviousAppliedName { get; set; }
        public int RelativeStatus { get; set; }
        public string RelativeStatusName { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public int SourceChannelId { get; set; }
        public string SourceChannelName { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateOwner { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public string Resume { get; set; }
        public string ReferalEmpNo { get; set; }
        public string ReferalDesignation { get; set; }
        public string ReferalGrade { get; set; }
        public int ParentRelationshipId { get; set; }
        public int ChildRelationshipId { get; set; }
        public string ParentRelationshipName { get; set; }
        public string ChildRelationshipName { get; set; }
        public string RelationshipNotes { get; set; }
        public int CMDApprovalRequired { get; set; }
        public int CMDApprovalStatus { get; set; }
        public string CMDApprovalNo { get; set; }
        public string CMDApprovalDocument { get; set; }
        public int CMDUpdateStatus { get; set; }
        public int TestOption { get; set; }
        public int HRFeedbackCount { get; set; }
        public int AssessmentCount { get; set; }
        public int ApplicationCount { get; set; }
        public int ClarificationCount { get; set; }
        public bool IsInternal { get; set; }
        public int? ManagementApprovalId { get; set; }
    }
    public class InputNaukriCandidate
    {
        public int? RequisitionDetailId { get; set; }
    }
    public class OutputNaukriCandidate
    {
        public string CandidateEmailId { get; set; }
        public string UserId { get; set; }
        public string CandidateName { get; set; }
    }

    public class Searchrequisition
    {
        public int RequisitionDetailId { get; set; }
        public string VerticalIds { get; set; }
        public string FunctionIds { get; set; }
        public string LocationIds { get; set; }

    }
    public class ReqSitionDetailsData
    {
        public int RequisitionDetailId { get; set; }
        public int RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }

        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
    }
}


