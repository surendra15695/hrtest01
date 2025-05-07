using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreselectionModule;
using Application.Service.Services.Interfaces.PreselectionModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.PreselectionModule
{
    public class RequisitionService : IRequisitionService
    {
        private readonly IRequisitionRepository requisitionRepository;

        public RequisitionService(IRequisitionRepository requisitionRepository)
        {
            this.requisitionRepository = requisitionRepository;
        }
        public string CloudStorageAccountname()
        {
            return this.requisitionRepository.CloudStorageAccountname();
        }

        public async Task<ReturnMessage> CheckIOMNo(IOMFormData formData)
        {
            return await this.requisitionRepository.CheckIOMNo(formData);
        }
        public async Task<ReturnMessage> RequisitionInsert(RequisitionFormData formData)
        {
            return await this.requisitionRepository.RequisitionInsert(formData);
        }
        public async Task<ReturnMessage> RequisitionInsertWithDummy(RequisitionFormDatawithDummy formData)
        {
            return await this.requisitionRepository.RequisitionInsertWithDummy(formData);
        }
        public async Task<List<RequisitionList>> GetAllRequisitionList(SearchRequisition formData)
        {
            return await this.requisitionRepository.GetAllRequisitionList(formData);
        }
        public async Task<List<DummyRequisitionList>> GetAllDummyRequisitionList(SearchDummyRequisition formData)
        {
            return await this.requisitionRepository.GetAllDummyRequisitionList(formData);
        }
        public async Task<List<RequisitionList>> GetAllRequisitionHMList(SearchRequisition formData)
        {
            return await this.requisitionRepository.GetAllRequisitionHMList(formData);
        }
        public async Task<List<RequistionDetailsList>> GetDetailsRequisition(SearchRequisition formData)
        {
            return await this.requisitionRepository.GetDetailsRequisition(formData);
        }
        public async Task<List<TaggedRequisitionList>> GetCandidateTaggedRequisition(SearchCandidateTaggedRequisition formData)
        {
            return await this.requisitionRepository.GetCandidateTaggedRequisition(formData);
        }
        public async Task<List<RequisitionHistoryList>> GetAllRequisitionHistoryList(SearchRequisitionHistory formData)
        {
            return await this.requisitionRepository.GetAllRequisitionHistoryList(formData);
        }

        public async Task<ReturnMessage> HoldUpdateForRequisition(SearchHoldRequisition formData)
        {
            return await this.requisitionRepository.HoldUpdateForRequisition(formData);
        }
        public async Task<ReturnMessage> RequisitionAllocateToRM(RequisitionAllocationFormData formData)
        {
            return await this.requisitionRepository.RequisitionAllocateToRM(formData);
        }

        public async Task<ReturnMessage> RequisitionAllocateSourceChannel(RequisitionSourceFormData formData)
        {
            return await this.requisitionRepository.RequisitionAllocateSourceChannel(formData);
        }

        public async Task<List<RequisitionSourceChannelDetailList>> GetRequisitionSourceChannelDetailList(SearchRequisitionSourceChannelDetailList search)
        {
            return await this.requisitionRepository.GetRequisitionSourceChannelDetailList(search);
        }

        public async Task<ReturnMessage> RequisitionApproveReject(RequisitionApproveRejectFormData formData)
        {
            return await this.requisitionRepository.RequisitionApproveReject(formData);
        }

        public async Task<ReturnMessage> UpdateRequisitionCandidateHiringStatus(RequisitionCandidateHiringStatusFormData formData)
        {
            return await this.requisitionRepository.UpdateRequisitionCandidateHiringStatus(formData);
        }
        public async Task<ReturnMessage> UpdateRequisitionCandidateHiringStatusForCancel(RequisitionCandidateHiringStatusFormDataForCancel formData)//Piu
        {
            return await this.requisitionRepository.UpdateRequisitionCandidateHiringStatusForCancel(formData);
        }

        public async Task<ReturnMessage> UpdateRequisitionCVCandidateTag(RequisitionCVCandidateTagList formData)
        {
            return await this.requisitionRepository.UpdateRequisitionCVCandidateTag(formData);
        }
        public async Task<ReturnMessage> UpdateRequisitionCVCandidateTagNew(RequisitionCVCandidateTagListNew formData)
        {
            return await this.requisitionRepository.UpdateRequisitionCVCandidateTagNew(formData);
        }
        public async Task<ReturnMessage> DeleteCandidates(DeleteCandidates formData)
        {
            return await this.requisitionRepository.DeleteCandidates(formData);
        }
        public async Task<ReturnMessage> CandidatesUpdateprofileMail(CandidateUpdateProfile formData)
        {
            return await this.requisitionRepository.CandidatesUpdateprofileMail(formData);
        }
        public async Task<ReturnMessage> UpdateRequisitionCandidateRejectDeclineCallBack(RequisitionCandidateHiringStatusFormData formData)
        {
            return await this.requisitionRepository.UpdateRequisitionCandidateRejectDeclineCallBack(formData);
        }
        public async Task<ReturnMessage> DiscontinueCandidateFromBatch(DiscontinueCandidateFormData formData)
        {
            return await this.requisitionRepository.DiscontinueCandidateFromBatch(formData);
        }
        public async Task<ReturnMessage> InsertCallBackHistory(CallbackHistoryInsertFormData formData)
        {
            return await this.requisitionRepository.InsertCallBackHistory(formData);
        }
        public async Task<ReturnMessage> ApproveRejectCallbackRequest(CallbackRequestCandidateApproval formData)
        {
            return await this.requisitionRepository.ApproveRejectCallbackRequest(formData);
        }
        public async Task<ReturnMessage> AssignReleasedCandidateToRequisition(AssignReleasedCandidateToRequisionData formData)
        {
            return await this.requisitionRepository.AssignReleasedCandidateToRequisition(formData);
        }

        public async Task<List<SourceChannelJobList>> GetSourceChannelJobList(SearchSourceChannelJobList search)
        {
            return await this.requisitionRepository.GetSourceChannelJobList(search);
        }

        public async Task<List<RequisitionHoldRelease>> GetRequisitionHoldRelease(SearchRequisitionHoldRelease search)
        {
            return await this.requisitionRepository.GetRequisitionHoldRelease(search);
        }
        public async Task<UploadNaukriFeedBack> UploadNaukriProfile(DataTable formData)
        {
            return await this.requisitionRepository.UploadNaukriProfile(formData);
        }

        public async Task<ReturnMessage> UpdateHoldRelease(RequisitionHoldReleaseSubmitFormData formData)
        {
            return await this.requisitionRepository.UpdateHoldRelease(formData);
        }

        public async Task<List<MergeRequisitionDetailsList>> GetMergeRequisitionDetailsList(SearchMergeRequisitionList search)
        {
            return await this.requisitionRepository.GetMergeRequisitionDetailsList(search);
        }
        public async Task<List<ddlRequsitionList>> ddlRequsitionListgetAll(SearchddlRequsitionListgetAll search)
        {
            return await this.requisitionRepository.ddlRequsitionListgetAll(search);
        }
        public async Task<ReturnMessage> DeleteBeforeRequisition(DeleteBeforeRequisitionFormData formData)
        {
            return await this.requisitionRepository.DeleteBeforeRequisition(formData);
        }
        public async Task<ReturnMessage> UnMappedCandidateRequsitionInsertUpdate(UnMappedCandidateRequsitionInsertUpdate formData)
        {
            return await this.requisitionRepository.UnMappedCandidateRequsitionInsertUpdate(formData);
        }
        public async Task<List<CandidateHigringList>> GetCandiadateHiringStatus(SearchCandidateHigringList search)
        {
            return await this.requisitionRepository.GetCandiadateHiringStatus(search);
        }
        public async Task<List<CandidateHigringList>> GetCampusCandiadateHiringStatus(SearchCandidateHigringList search)
        {
            return await this.requisitionRepository.GetCampusCandiadateHiringStatus(search);
        }
    }
}