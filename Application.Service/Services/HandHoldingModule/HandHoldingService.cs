using Application.DataAccess.Repositories.Interfaces.HandHoldingModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.HandHoldingModule;
using Application.Service.Services.Interfaces.HandHoldingModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.HandHoldingModule
{
    public class HandHoldingService : IHandHoldingService
    {
        private readonly IHandHoldingRepository handHoldingRepository;
        public HandHoldingService(IHandHoldingRepository handHoldingRepository)
        {
            this.handHoldingRepository = handHoldingRepository;
        }
        public async Task<List<HandHoldingAllocationCandidate>> GetAllHandHoldingAllocationList(HandHoldingAllocationSearch search)
        {
            return await this.handHoldingRepository.GetAllHandHoldingAllocationList(search);
        }

        public async Task<List<HandHoldingAllocationCandidate>> GetHandHoldingAllocationList(HandHoldingAllocationSearch search)
        {
            return await this.handHoldingRepository.GetHandHoldingAllocationList(search);
        }

        public async Task<ReturnMessage> HandHoldingAllocateInsertUpdate(HandHoldingAllocateFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingAllocateInsertUpdate(formData);
        }

        public async Task<List<AICAllocatedJobShadowCandidateList>> GetAllAICAllocatedJobShadowList(SearchAICAllocatedList search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedJobShadowList(search);
        }

        public async Task<ReturnMessage> HandHoldingAICJobShadowReviewInsertUpdate(AICHandHoldingJobShadowReviewFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingAICJobShadowReviewInsertUpdate(formData);
        }

        public async Task<JobShadowReviewDetailsData> GetAllAICAllocatedJobShadowReviewDetails(SearchAICHandHoldingJobShadowReviewDetail search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedJobShadowReviewDetails(search);
        }

        public async Task<List<AICAllocatedListenCandidateList>> GetAllAICAllocatedListenList(SearchAICAllocatedList search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedListenList(search);
        }

        public async Task<List<AICAllocatedHalfYearlyCandidateList>> GetAllAICAllocatedHalfYearlyList(SearchAICAllocatedList search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedHalfYearlyList(search);
        }

        public async Task<List<AICAllocatedConfirmationCandidateList>> GetAllAICAllocatedConfirmationList(SearchAICAllocatedList search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedConfirmationList(search);
        }

        public async Task<List<HandHoldingReviewQuestions>> GetAllHandHoldingReviewQuestions(HandHoldingReviewQuestions search)
        {
            return await this.handHoldingRepository.GetAllHandHoldingReviewQuestions(search);
        }
        public async Task<List<ConfirmationReviewDetail>> GetCandidateDetailsConfReview(SearchConfirmationReviewDetail search)
        {
            return await this.handHoldingRepository.GetCandidateDetailsConfReview(search);
        }
        public async Task<ReturnMessage> HandHoldingAICListenReviewInsertUpdate(AICHandHoldingListenReviewFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingAICListenReviewInsertUpdate(formData);
        }

        public async Task<List<AICHandHoldingListenReviewDetails>> GetAllAICAllocatedListenReviewDetails(SearchAICHandHoldingListenReviewDetail search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedListenReviewDetails(search);
        }

        public async Task<ReturnMessage> HandHoldingAICHalfYearlyReviewInsertUpdate(AICHandHoldingHalfYearlyReviewFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingAICHalfYearlyReviewInsertUpdate(formData);
        }

        public async Task<HandHoldingHalfYearlyData> GetAllAICAllocatedHalfYearlyReviewDetails(SearchAICHandHoldingHalfYearlyReviewDetail search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedHalfYearlyReviewDetails(search);
        }

        public async Task<ReturnMessage> HandHoldingAICConfirmationReviewInsertUpdate(AICHandHoldingConfirmationFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingAICConfirmationReviewInsertUpdate(formData);
        }

        public async Task<HandHoldingConfirmationData> GetAllAICAllocatedConfirmationReviewDetails(SearchAICHandHoldingConfirmationReviewDetail search)
        {
            return await this.handHoldingRepository.GetAllAICAllocatedConfirmationReviewDetails(search);
        }

        public async Task<ReturnMessage> HandHoldingHRFeedbackInsertUpdate(HandHoldingHRFeedbackFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingHRFeedbackInsertUpdate(formData);
        }

        public async Task<List<HandHoldingHRFeedbackDetails>> GetAllHRFeedbackDetails(SearchHandHoldingHRFeedbackDetail search)
        {
            return await this.handHoldingRepository.GetAllHRFeedbackDetails(search);
        }

        public async Task<ReturnMessage> HandHoldingHRReviewInsertUpdate(HandHoldingHRReviewFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingHRReviewInsertUpdate(formData);
        }

        public async Task<List<HandHoldingHRReviewDetails>> GetAllHRReviewDetails(SearchHandHoldingHRReviewDetail search)
        {
            return await this.handHoldingRepository.GetAllHRReviewDetails(search);
        }

        public async Task<List<ApproverJobShadowCandidateList>> GetAllApproverJobShadowList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllApproverJobShadowList(search);
        }

        public async Task<List<HandholdingApproverCandidateListNew>> GetAllHandholdingApproverPendingList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllHandholdingApproverPendingList(search);
        }
        public async Task<List<HandholdingApproverCandidateList>> GetAllHandholdingApproverAllocatedList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllHandholdingApproverAllocatedList(search);
        }

        public async Task<List<ApproverListenCandidateList>> GetAllApproverListenList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllApproverListenList(search);
        }

        public async Task<List<ApproverHalfYearlyCandidateList>> GetAllApproverHalfYearlyList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllApproverHalfYearlyList(search);
        }

        public async Task<List<ApproverConfirmationCandidateList>> GetAllApproverConfirmationList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllApproverConfirmationList(search);
        }

        public async Task<ReturnMessage> HandHoldingApproverActionInsertUpdate(HandHoldingApproverActionFormData formData)
        {
            return await this.handHoldingRepository.HandHoldingApproverActionInsertUpdate(formData);
        }

        public async Task<List<HandholdingApproverCandidateListNew>> GetAllHandholdingConfirmationFormList(SearchHandHoldingApproverList search)
        {
            return await this.handHoldingRepository.GetAllHandholdingConfirmationFormList(search);
        }
    }
}
