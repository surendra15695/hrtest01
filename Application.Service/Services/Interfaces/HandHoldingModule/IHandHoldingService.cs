using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.HandHoldingModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.HandHoldingModule
{
    public interface IHandHoldingService
    {
        Task<List<HandHoldingAllocationCandidate>> GetAllHandHoldingAllocationList(HandHoldingAllocationSearch search);
        Task<List<HandHoldingAllocationCandidate>> GetHandHoldingAllocationList(HandHoldingAllocationSearch search);
        Task<ReturnMessage> HandHoldingAllocateInsertUpdate(HandHoldingAllocateFormData formData);
        Task<List<AICAllocatedJobShadowCandidateList>> GetAllAICAllocatedJobShadowList(SearchAICAllocatedList search);
        Task<ReturnMessage> HandHoldingAICJobShadowReviewInsertUpdate(AICHandHoldingJobShadowReviewFormData formData);
        Task<JobShadowReviewDetailsData> GetAllAICAllocatedJobShadowReviewDetails(SearchAICHandHoldingJobShadowReviewDetail search);
        Task<List<AICAllocatedListenCandidateList>> GetAllAICAllocatedListenList(SearchAICAllocatedList search);
        Task<List<AICAllocatedHalfYearlyCandidateList>> GetAllAICAllocatedHalfYearlyList(SearchAICAllocatedList search);
        Task<List<AICAllocatedConfirmationCandidateList>> GetAllAICAllocatedConfirmationList(SearchAICAllocatedList search);

        Task<List<HandHoldingReviewQuestions>> GetAllHandHoldingReviewQuestions(HandHoldingReviewQuestions search);
        Task<ReturnMessage> HandHoldingAICListenReviewInsertUpdate(AICHandHoldingListenReviewFormData formData);
        Task<List<AICHandHoldingListenReviewDetails>> GetAllAICAllocatedListenReviewDetails(SearchAICHandHoldingListenReviewDetail search);
        Task<ReturnMessage> HandHoldingAICHalfYearlyReviewInsertUpdate(AICHandHoldingHalfYearlyReviewFormData formData);
        Task<HandHoldingHalfYearlyData> GetAllAICAllocatedHalfYearlyReviewDetails(SearchAICHandHoldingHalfYearlyReviewDetail search);
        Task<ReturnMessage> HandHoldingAICConfirmationReviewInsertUpdate(AICHandHoldingConfirmationFormData formData);
        Task<HandHoldingConfirmationData> GetAllAICAllocatedConfirmationReviewDetails(SearchAICHandHoldingConfirmationReviewDetail search);
        Task<ReturnMessage> HandHoldingHRFeedbackInsertUpdate(HandHoldingHRFeedbackFormData formData);
        Task<List<HandHoldingHRFeedbackDetails>> GetAllHRFeedbackDetails(SearchHandHoldingHRFeedbackDetail search);
        Task<ReturnMessage> HandHoldingHRReviewInsertUpdate(HandHoldingHRReviewFormData formData);
        Task<List<HandHoldingHRReviewDetails>> GetAllHRReviewDetails(SearchHandHoldingHRReviewDetail search);
        Task<List<ApproverJobShadowCandidateList>> GetAllApproverJobShadowList(SearchHandHoldingApproverList search);
        Task<List<HandholdingApproverCandidateListNew>> GetAllHandholdingApproverPendingList(SearchHandHoldingApproverList search);
        Task<List<HandholdingApproverCandidateList>> GetAllHandholdingApproverAllocatedList(SearchHandHoldingApproverList search);
        Task<List<ApproverListenCandidateList>> GetAllApproverListenList(SearchHandHoldingApproverList search);
        Task<List<ApproverHalfYearlyCandidateList>> GetAllApproverHalfYearlyList(SearchHandHoldingApproverList search);
        Task<List<ApproverConfirmationCandidateList>> GetAllApproverConfirmationList(SearchHandHoldingApproverList search);
        Task<ReturnMessage> HandHoldingApproverActionInsertUpdate(HandHoldingApproverActionFormData formData);
        Task<List<ConfirmationReviewDetail>> GetCandidateDetailsConfReview(SearchConfirmationReviewDetail search);
        Task<List<HandholdingApproverCandidateListNew>> GetAllHandholdingConfirmationFormList(SearchHandHoldingApproverList search);
    }
}
