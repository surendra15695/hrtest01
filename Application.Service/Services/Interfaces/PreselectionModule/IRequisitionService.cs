using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.PreselectionModule
{
    public interface IRequisitionService
    {
        String CloudStorageAccountname();
        Task<ReturnMessage> RequisitionInsert(RequisitionFormData formData);
        Task<ReturnMessage> RequisitionInsertWithDummy(RequisitionFormDatawithDummy formData);
        Task<ReturnMessage> CheckIOMNo(IOMFormData formData);
        Task<List<RequisitionList>> GetAllRequisitionList(SearchRequisition formData);
        Task<List<DummyRequisitionList>> GetAllDummyRequisitionList(SearchDummyRequisition formData);
        Task<List<RequisitionList>> GetAllRequisitionHMList(SearchRequisition formData);
        Task<List<RequistionDetailsList>> GetDetailsRequisition(SearchRequisition formData);
        Task<List<TaggedRequisitionList>> GetCandidateTaggedRequisition(SearchCandidateTaggedRequisition formData);
        Task<List<RequisitionHistoryList>> GetAllRequisitionHistoryList(SearchRequisitionHistory formData);
        Task<ReturnMessage> HoldUpdateForRequisition(SearchHoldRequisition formData);
        Task<ReturnMessage> RequisitionAllocateToRM(RequisitionAllocationFormData formData);
        Task<ReturnMessage> RequisitionAllocateSourceChannel(RequisitionSourceFormData formData);
        Task<List<RequisitionSourceChannelDetailList>> GetRequisitionSourceChannelDetailList(SearchRequisitionSourceChannelDetailList search);
        Task<ReturnMessage> RequisitionApproveReject(RequisitionApproveRejectFormData formData);
        Task<ReturnMessage> UpdateRequisitionCandidateHiringStatus(RequisitionCandidateHiringStatusFormData formData);
        Task<ReturnMessage> UpdateRequisitionCandidateHiringStatusForCancel(RequisitionCandidateHiringStatusFormDataForCancel formData);//Piu
        Task<ReturnMessage> UpdateRequisitionCVCandidateTag(RequisitionCVCandidateTagList formData);
        Task<ReturnMessage> UpdateRequisitionCVCandidateTagNew(RequisitionCVCandidateTagListNew formData);
        Task<ReturnMessage> DeleteCandidates(DeleteCandidates formData);
        Task<ReturnMessage> CandidatesUpdateprofileMail(CandidateUpdateProfile formData);
        Task<ReturnMessage> UpdateRequisitionCandidateRejectDeclineCallBack(RequisitionCandidateHiringStatusFormData formData);
        Task<ReturnMessage> DiscontinueCandidateFromBatch(DiscontinueCandidateFormData formData);
        Task<ReturnMessage> InsertCallBackHistory(CallbackHistoryInsertFormData formData);
        Task<ReturnMessage> ApproveRejectCallbackRequest(CallbackRequestCandidateApproval formData);
        Task<ReturnMessage> AssignReleasedCandidateToRequisition(AssignReleasedCandidateToRequisionData formData);
        Task<List<SourceChannelJobList>> GetSourceChannelJobList(SearchSourceChannelJobList search);
        Task<List<RequisitionHoldRelease>> GetRequisitionHoldRelease(SearchRequisitionHoldRelease search);
        Task<UploadNaukriFeedBack> UploadNaukriProfile(DataTable formData);
        Task<ReturnMessage> UpdateHoldRelease(RequisitionHoldReleaseSubmitFormData formData);
        Task<List<MergeRequisitionDetailsList>> GetMergeRequisitionDetailsList(SearchMergeRequisitionList search);
        Task<List<ddlRequsitionList>> ddlRequsitionListgetAll(SearchddlRequsitionListgetAll search);
        Task<ReturnMessage> DeleteBeforeRequisition(DeleteBeforeRequisitionFormData formData);
        Task<ReturnMessage> UnMappedCandidateRequsitionInsertUpdate(UnMappedCandidateRequsitionInsertUpdate formData);
        Task<List<CandidateHigringList>> GetCandiadateHiringStatus(SearchCandidateHigringList search);
        Task<List<CandidateHigringList>> GetCampusCandiadateHiringStatus(SearchCandidateHigringList search);
    }
}
