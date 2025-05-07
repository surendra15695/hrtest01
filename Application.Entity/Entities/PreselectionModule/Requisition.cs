using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;

namespace Application.Entity.Entities.PreselectionModule
{
    public class IOMFormData
    {
        public string IOMNo { get; set; }
    }
    public class RequisitionFormData
    {
        public long RequisitionId { get; set; }
        public int LocationId { get; set; }
        public int VerticalId { get; set; }
        public string IOMNo { get; set; }
        public string ManagementApprovalDocument { get; set; }
        public int CreatedBy { get; set; }
        public List<RequisitionDataObject> RequisitionData { get; set; }
        public List<UniqueFunctionIdObject> UniqueFunctionIds { get; set; }   // Added By Anif on 11-07-2022 for sending email on requisition creation

    }

    // Added this class by Anif on 11-07-2022 for email sending on requiusition creation
    public class UniqueFunctionIdObject
    {
        public int FunctionId { get; set; }
    }

    public class RequisitionDataObject
    {
        public int AutoId { get; set; }
        public string IOMNo { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string TargetDate { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public bool IsAutoApproved { get; set; }
    }

    // By anif on 15-04-2023 to define whether the requisition is dummy or not which is changed for 6th module purpose
    public class RequisitionFormDatawithDummy
    {
        public long RequisitionId { get; set; }
        public int LocationId { get; set; }
        public int VerticalId { get; set; }
        public string IOMNo { get; set; }
        public string ManagementApprovalDocument { get; set; }
        public int CreatedBy { get; set; }
        public List<RequisitionDataObjectWithDummy> RequisitionData { get; set; }
        public List<UniqueFunctionIdObject> UniqueFunctionIds { get; set; }   

    }
    public class RequisitionDataObjectWithDummy
    {
        public int AutoId { get; set; }
        public string IOMNo { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public int GradeId { get; set; }
        public int JobTypeId { get; set; }
        public int JobDescriptionId { get; set; }
        public string TargetDate { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public bool IsAutoApproved { get; set; }
        public bool? IsDummy { get; set; }
    }
    public class RequistionDetailsList
    {
        public int TotalCandidateCount { get; set; }
        public int HiringStatusId { get; set; }
        public string StatusName { get; set; }
        public string RequisitionNo { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string RequestedBy { get; set; }
        public int LocationId { get; set; }
       // public long LocationNo { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
    }
    public class TaggedRequisitionList
    {
        public string FullName { get; set; }
        public string CandidateNo { get; set; }
        public string RequisitionNo { get; set; }
    }
    public class RequisitionList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId{get;set;}
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOn { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public int AbsorbedCount { get; set; }
        public int RequisitionApprovalStatusId { get; set; }
        public bool OnHold { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int RequisitionProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string RMProcessStatus { get; set; }
        public string IOMNo { get; set; }
        public string ManagementApprovalDocument { get; set; }
        public string JDDocument { get; set; }
        public long AllocatedRMAutoUserId { get; set; }
        public string AllocatedRMUserName { get; set; }
        public string AllocatedRMEmailId { get; set; }
        public int SalaryId{get;set;}
        public string SalaryName { get; set; }
        public int RequisitionTypeId { get; set; }
        public string RequisitionType { get; set; }
        public int HMPendingStatusCount{get;set;}
        public int TestStatus { get; set; }
        public long HiringManagerAutoUserId { get; set; }
        public int IsSourceChannelId { get; set; }
        public int RequestApproved { get; set; }
        public int RequestPending { get; set; }
        public int RequestRejected { get; set; }
        public int TotalCandidateCount { get; set; }
        public int NoOfEmplyee { get; set; }
        public int StatusId { get; set; }

    }
    public class DummyRequisitionList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int VerticalId { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOn { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public int AbsorbedCount { get; set; }
        public int RequisitionApprovalStatusId { get; set; }
        public bool OnHold { get; set; }
        public string ApprovalStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public int RequisitionProcessStatusId { get; set; }
        public string ProcessStatus { get; set; }
        public string ProcessStatusIcon { get; set; }
        public string RMProcessStatus { get; set; }
        public string IOMNo { get; set; }
        public string ManagementApprovalDocument { get; set; }
        public string JDDocument { get; set; }
        public long AllocatedRMAutoUserId { get; set; }
        public string AllocatedRMUserName { get; set; }
        public string AllocatedRMEmailId { get; set; }
        public int SalaryId { get; set; }
        public string SalaryName { get; set; }
        public int RequisitionTypeId { get; set; }
        public string RequisitionType { get; set; }
        public int HMPendingStatusCount { get; set; }
        public int TestStatus { get; set; }
        public long HiringManagerAutoUserId { get; set; }
        public int IsSourceChannelId { get; set; }
        public int RequestApproved { get; set; }
        public int RequestPending { get; set; }
        public int RequestRejected { get; set; }
        public int TotalCandidateCount { get; set; }
        public int NoOfEmplyee { get; set; }
        public int StatusId { get; set; }

    }
    public class SearchRequisition
    {
        public string RequisitionNo { get; set; }
        public long? RequistionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string IOMNo { get; set; }
        public int? RequisitionApprovalStatus { get; set; }
        public int? RequisitionProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public int? ApproverAutoUserId { get; set; }
        public int? AllocatedAutoUserId { get; set; }
        public int? RequisitionTypeId { get; set; }
        public int? FunctionId { get; set; }
        public string LoggedInUserRoleIds { get; set; }
        public int ? ModuleId { get; set; }
    }
    public class SearchCandidateTaggedRequisition
    {
        public int CandidateId { get; set; }
    }
        public class SearchDummyRequisition
    {
        public string RequisitionNo { get; set; }
        public long? RequistionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string IOMNo { get; set; }
        public int? RequisitionApprovalStatus { get; set; }
        public int? RequisitionProcessStatus { get; set; }
        public int? CreatedBy { get; set; }
        public int? ApproverAutoUserId { get; set; }
        public int? AllocatedAutoUserId { get; set; }
        public int? RequisitionTypeId { get; set; }
        public int? FunctionId { get; set; }
        public string LoggedInUserRoleIds { get; set; }
        public int? ModuleId { get; set; }
    }

    public class RequisitionHistoryList
    {
        public long RequisitionDetailHistoryId { get; set; }
        public long RequisitionDetailId { get; set; }
        public string RequisitionType { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public string RequisitionHistoryNo { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public string CreatedOn { get; set; }
        public int CreatedByAutoUserId { get; set; }
        public string CreatedByUserName { get; set; }
        public string CreatedByEmailId { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public bool OnHold { get; set; }
        public int RequisitionApprovalStatusId { get; set; }
        public string ApprovalStatus { get; set; }
        public string RMProcessStatus { get; set; }
        public string ApprovalStatusIcon { get; set; }
        public string IOMNo { get; set; }
        public string ManagementApprovalDocument { get; set; }
        public string JDDocument { get; set; }
    }

    public class SearchRequisitionHistory
    {
        public long? RequisitionDetailHistoryId { get; set; }
        public string RequisitionNo { get; set; }
        public long? RequistionId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string IOMNo { get; set; }
        public int? RequisitionApprovalStatus { get; set; }
        public int? CreatedBy { get; set; }
        public int? ApproverAutoUserId { get; set; }
    }

    public class RequisitionAllocationFormData
    {
        public long RequisitionDetailId { get; set; }
        public int AllocatedAutoUserId { get; set; }
        public int SalaryId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class RequisitionSourceFormData
    {
        public long RequisitionDetailId { get; set; }
        public long HiringManagerId { get; set; }
        public int SelectionGuideId { get; set; }
        public string VendorIds { get; set; } 
        public List<RequisitionSourceChannelFeature> SourceChannelFeature { get; set; }
        public int CreatedBy { get; set; }
    }

    public class RequisitionSourceChannelFeature
    {
        public int SourceChannelId { get; set; }
        public int JobDescriptionFeatureId { get; set; }
        public string Notes { get; set; }
    }

    public class RequisitionSourceChannelDetailList{
        public long RequisitionDetailId{get;set;}
        public long HiringManagerAutoUserId { get; set; }
        public int SelectionGuideId{get;set;}
        public int SourceChannelId{get;set;}
        public string FeatureIds{get;set;}
        public string Notes{get;set;}
        public string VendorIds{get;set;}
        public bool IsActive { get; set; }
    }

    public class SearchRequisitionSourceChannelDetailList{
        public long RequisitionDetailId{get;set;}
    }

    public class RequisitionApproveRejectFormData
    {
        public long RequisitionDetailHistoryId { get; set; }
        public int StatusId { get; set; }
        public string Remarks { get; set; }
        public int CreatedBy { get; set; }
    }

    public class RequisitionCandidateHiringStatusFormData
    {
        public string CandidateIds { get; set; }
        public long RequisitionDetailId { get; set; }
        public int HiringStatusId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }
    public class RequisitionCandidateHiringStatusFormDataForCancel  //Piu
    {
        public string CandidateIds { get; set; }
        public long RequisitionDetailId { get; set; }
        public int HiringStatusId { get; set; }
        public int PrevHiringId { get; set; }
        public string Remarks { get; set; }
        public long CreatedBy { get; set; }
    }
    public class DiscontinueCandidateFormData
    {
        public string CandidateIds { get; set; }
        public int BatchId { get; set; }
        public int CreatedBy { get; set; }
        public string Remarks { get; set; }
}

    public class CallbackHistoryInsertFormData
    {
        public int CallBackHistoryId { get; set; }
        public long RequisitionId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CandidateId { get; set; }
        public int VerticalId { get; set; }
        public int CurrentHiringStatusId { get; set; }
        public int ApprovalStatusId { get; set; }
        public bool IsFromBeginning { get; set; }
        public string CallBackRemarks { get; set; }
        public int CreatedBy { get; set; }
    }

    public class RequisitionCVCandidateTagList
    {
        public string CandidateIds { get; set; }
        public long RequisitionDetailId { get; set; }
        public string InternalCandidateRemarks { get; set; }
        public long RequisitionDetailHistoryId { get; set; }
        public int HiringStatusId { get; set; }
        public long CreatedBy { get; set; }
        public bool? IsActive { get; set; }
        public string userId { get; set; }
        public string position { get; set; }
        public string location { get; set; }
        public string function { get; set; }
        public string state { get; set; }
        public string emailId { get; set; }
        public string department { get; set; }
        public string reqno { get; set; }
        public string fullName { get; set; }

    }
    public class RequisitionCVCandidateTagListNew
    {
        public string CandidateIds { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }
        public List<CandidateDetailsCvDropTag> CandidateDetailsCvDropTag { get; set; }
    }
    public class CandidateDetailsCvDropTag
    {
        public string CandidateName { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public string Function { get; set; }
        public string Location { get; set; }
        public string State { get; set; }
        public string ReqNo { get; set; }
        public string EmailId { get; set; }
        public string UserId { get; set; }
    }
    public class DeleteCandidates
    {
        public string CandidateIds { get; set; }
    }
    public class CandidateUpdateProfile
    {
        public string Template { get; set; }
        public List<CandidateDetailsMail> CandidateDetailsMail { get; set; }
    }
    public class CandidateDetailsMail
    {
        public string CandidateName { get; set; }
        public int CandidateId { get; set; }
        public string EmailId { get; set; }
    }
        public class SourceChannelJobList
    {
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
        public int LocationId { get; set; }
        public string LocationNo { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string JDDocument { get; set; }
        public int SalaryId { get; set; }
        public string SalaryName { get; set; }
        public string JobSummary { get; set; }
        public string RestrictedJD { get; set; }
        public string AllocatedDate { get; set; }
        public int JDShowCount { get; set; }
        public int RestrictedJDShowCount { get; set; }
        public int SalaryShowCount { get; set; }
        public int SourceChannelId { get; set; }
        public string Notes{get;set;}
        public int AppliedStatus{get;set;}
        public int VerticalId { get; set; }
        public string VerticalName { get; set; } // by arghya D-27.08.2022
    }

    public class SearchSourceChannelJobList
    {
        public int SourceChannelId { get; set; }
        public long? RequisitionDetailId { get; set; }
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public int? PositionId { get; set; }
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
        public int? StateId { get; set; }
        public bool? IsActive { get; set; }
        public string RoleIds { get; set; }
        public long? CandidateId{get;set;}
        public int? VerticalId { get; set; }  // by arghya D-27.08.2022
    }

    public class SearchCandidateHigringList
    {
        public int? CandidateId { get; set; }
        public int? RequisitionDetailId { get; set; }
        public int? HiringStatusId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class CandidateHigringList
    {
        public int CandidateId { get; set; }
        public int RequisitionDetailId { get; set; }
        //public int HiringStatusId { get; set; }
        public bool? IsActive { get; set; }
        public string CreatedOn { get; set; }
        public string Remarks { get; set; }
        public string StatusName { get; set; }
        public string EmpName { get; set; }
    }

    public class SearchRequisitionHoldRelease
    {
        public long CreatedBy { get; set; }
        public int LocationId { get; set; }
    }

    public class RequisitionHoldRelease
    {
        public string IOMNo { get; set; }
        public long RequisitionDetailId { get; set; }
        public long RequisitionId { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public string TargetDate { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public int PrevHoldCount { get; set; }
        public int NewRequestCount { get; set; }
        public int OldHoldCount { get; set; }
        public string Remarks { get; set; }
        public int CheckStatus { get; set; }
    }

    public class NaukriProfileData
    {
        public string CandidateName { get; set; }
        public string CandidateEmailId { get; set; }
        public long RequisitionDetailId { get; set; }
        public long CreatedBy { get; set; }

    }

    public class RequisitionHoldReleaseData
    {
        public int AutoId { get; set; }
        public long RequisitionDetailId { get; set; }
        public int ApproveCount { get; set; }
        public int RequestCount { get; set; }
        public int HoldCount { get; set; }
        public string Remarks { get; set; }
        public int IsAutoApproved { get; set; }

    }

    public class RequisitionHoldReleaseSubmitFormData
    {
        public List<RequisitionHoldReleaseData> HoldReleaseRequisitionData { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchMergeRequisitionList{
        public long RequisitionDetailId{get;set;}
        public int RequisitionType{get;set;}
    }
    public class SearchddlRequsitionListgetAll
    {
        public long LoggedinUserId { get; set; }
        public int FunctionId { get; set; }
        public int LocationId { get; set; }
        public int VerticalId { get; set; }
    }

    public class MergeRequisitionDetailsList{
        public long EmpId{get;set;}
        public string EmpName{get;set;}
        public string EmpNo{get;set;}
        public string Designation{get;set;}
        public string GradeName{get;set;}
        public int FunctionId{get;set;}
        public string FunctionName{get;set;}
        public int DepartmentId{get;set;}
        public string DepartmentName{get;set;}
        public string DOR{get;set;}
        public string LWD{get;set;}
        public string SepInt{get;set;}
    }
    public class ddlRequsitionList
    {
        public long RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string LocationOffice { get; set; }
    }
        public class DeleteBeforeRequisitionFormData
    {
        public int TypeId { get; set; }
        public long DataId { get; set; }
        public long CreatedBy { get; set; }
    }
    public class UnMappedCandidateRequsitionInsertUpdate
    {
        public string? CandidateId { get; set; }
        public long? RequisitionDetailsId { get; set; }
        public bool? NewRequisitionTag { get; set; }
        public long CreatedBy { get; set; }
        public List<CandidateDetailsCvDropTag> CandidateDetailsCvDropTag { get; set; }
    }
    public class CallbackRequestCandidateApproval
    {
        public List<UDTCandidateRequisitionDetails> Requisitionwisecandidate { get; set; }
        public string Remarks { get; set; }
        public int ApprovalStatusId { get; set; }
        public long ApprovedBy { get; set; }        
    }
    public class UDTCandidateRequisitionDetails
    {
       public long  CandidateId { get; set; }
	   public long RequisitionDetailId { get; set; }
    }
    public class AssignReleasedCandidateToRequisionData
    {
        public int CandidateId { get; set; }
        public int RequisitionDetailId { get; set; }
        public string Remarks { get; set; }
        public int AssignedHiringStatusId { get; set; }
        public int AssignedByUserId { get; set; }
    }
    public class SearchHoldRequisition
    {
        public int RequisitionDetailId { get; set; }
        public string RequisitionNo { get; set; }
        public bool OnHold { get; set; }
    }

    public class UploadNaukriFeedBack
    {
        public ReturnMessage ReturnMessage { get; set; }
        public List<CandidateDetailForExcelUpload> candidateDetailForExcelUploads { get; set; }
    }
    public class CandidateDetailForExcelUpload
    {
       public string CandidateName  { get; set; }
       public string CandidateEmail { get; set; }
       public string Status         { get; set; }
       public string ErrorMsg { get; set; }
    }                 
}                     
                      