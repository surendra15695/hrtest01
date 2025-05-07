using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.JoiningModule
{
    public interface IAssessmentRepository
    {
        Task<List<AssessmentType>> GetAssessmentType(AssessmentTypeSearch search);
        Task<ReturnMessage> SaveAssessmentType(AssessmentType formdata);
        Task<List<AssessmentQuestionTypeAll>> GetAssessmentQuestionTypeAll(AssessmentQuestionTypeSearch search);
        Task<List<AssessmentList>> GetAssessmentList(AssessmentListSearch search);
        Task<Assessment> GetAssessmentData(AssessmentSearch search);
        Task<ReturnMessage> AssessmentSave(AssessmentSave formdata);
        Task<List<IndusctionTraningList>> GetIndusctionTraningList(IndusctionTraningListSearch search);
        Task<ReturnMessage> AssessmentAssignSave(AssessmentAssignSave formdata);
        Task<ReturnMessage> InductionProgrammeCoOrdinatiorAssignSave(InductionProgrammeCoOrdinatiorAssign formdata);

        Task<List<InductionProgrammeCoOrdinatiorAssigned>> InductionProgrammeCoOrdinatiorAssignedGet(InductionProgrammeCoOrdinatiorAssignedSearch search);

        Task<List<BatchReleaseListGetAll>> BatchReleaseListGetAll(BatchReleaseListGetAllSearch search);
        Task<List<AssessementAssignReleaseList>> AssessementAssignReleaseList(AssessementAssignReleaseListSearch search);
        Task<List<AssessementAssignReleaseList>> AssessementAssignReReleaseList(AssessementAssignReleaseListSearch search);
        Task<List<FeedbackAssignReleaseList>> GetEvaluateFeedbackReRelease(FeedbackAssignReleaseListSearch search);
        Task<ReturnMessage> AssementAssignReleaseSave(AssementAssignReleaseSave formdata);
        Task<ReturnMessage> FeedbackAssignReleaseSave(FeedbackAssignReleaseSave formdata);
        Task<ReturnMessage> AssementAssignReleaseSaveForCandidate(AssementAssignReleaseSaveCandiddate formData);
        Task<ReturnMessage> FeedbackAssignReleaseSaveForCandidate(FeedBackAssignReleaseSaveCandiddate formData);
        Task<ReturnMessage> DeleteAssessment(DeleteAssessmentSearch search);
        Task<CandidateAssessmentReleaseListForNewJoinerlist> CandidateAssessmentReleaseListGetAll(CandidateAssessmentReleaseListSearch search);
        Task<CandidateAssessmentReleaseListForNewJoinerlist> CandidateAssessmentReleaseListGetAllforNewJoinerList(CandidateAssessmentReleaseListSearch search);
        Task<CandidateAssessment> GetCandidateAssessmentData(CandidateAssessmentSearch search);

        Task<AssessmentCandidate> GetAssessmentDataCandidate(AssessmentSearchCandidate search);
        Task<ReturnMessage> AssessmentSaveCandidate(AssessmentSaveCandidate formdata);

        Task<BatchesAssementEvaluateList> GetEvaluateAssessmentBatchList(BatchesAssementEvaluateListSearch search);
        Task<BatchesFeedbackList> GetEvaluateFeedbackBatchList(BatchesFeedbackListSearch search);
        Task<CandidateEvaluation> GetCandidateAssessmentEvaluation(CandidateEvaluationSearch search);
        Task<ReturnMessage> CandidateAssessmentEvaluationSave(CandidateEvaluationSave formdata);
        Task<List<CandidateScore>> GetCandidateEvaluationAnswerScore(CandidateEvaluationSave formdata);

        Task<CandidateEvaluationUploadView> CandidateEvaluationUploadGet(CandidateEvaluationUploadViewSearch search);
        Task<ReturnMessage> CandidateEvaluationUploadSave(CandidateEvaluationUploadSave formdata);

        Task<CandidateAssessmentSummary> CandidateAssessmentSummaryGet(CandidateAssessmentSummarySearch search);
        Task<CandidateAssessmentSummaryPending> CandidateAssessmentSummaryPendingListGet(CandidateAssessmentSummaryPendingSearch search);
        Task<ReturnMessage> CandidateAssessmentSummarySave(CandidateAssessmentSummarySave formdata);
        Task<ReturnMessage> CandidateAssessmentSummarySaveIndividual(CandidateAssessmentSummarySave formdata);

        Task<CandidateAssessmentEvaluationView> GetCandidateAssessmentEvaluationView(CandidateAssessmentEvaluationViewSearch search);
        Task<List<UploadedAssessmentList>> GetUploadedAssessmentEvaluation(UploadedAssessmentSearch search);
    }
}
