using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace Application.Service.Services.JoiningModule
{
    public class AssessmentService : IAssessmentService
    {
        private readonly IAssessmentRepository assessmentrepository;
        public AssessmentService(IAssessmentRepository assessmentrepository)
        {
            this.assessmentrepository = assessmentrepository;
        }

        public async Task<List<AssessmentType>> GetAssessmentType(AssessmentTypeSearch Param)
        {
            return await this.assessmentrepository.GetAssessmentType(Param);
        }
        public async Task<ReturnMessage> SaveAssessmentType(AssessmentType formdata)
        {
            return await this.assessmentrepository.SaveAssessmentType(formdata);
        }

        public async Task<List<AssessmentQuestionTypeAll>> GetAssessmentQuestionTypeAll(AssessmentQuestionTypeSearch Param)
        {
            return await this.assessmentrepository.GetAssessmentQuestionTypeAll(Param);
        }

        public async Task<List<AssessmentList>> GetAssessmentList(AssessmentListSearch Param)
        {
            return await this.assessmentrepository.GetAssessmentList(Param);
        }

        public async Task<Assessment> GetAssessmentData(AssessmentSearch search)
        {
            return await this.assessmentrepository.GetAssessmentData(search);
        }

        public async Task<ReturnMessage> AssessmentSave(AssessmentSave formdata)
        {
            return await this.assessmentrepository.AssessmentSave(formdata);
        }
        public async Task<List<IndusctionTraningList>> GetIndusctionTraningList(IndusctionTraningListSearch Param)
        {
            return await this.assessmentrepository.GetIndusctionTraningList(Param);
        }

        public async Task<ReturnMessage> AssessmentAssignSave(AssessmentAssignSave formdata)
        {
            return await this.assessmentrepository.AssessmentAssignSave(formdata);
        }

        public async Task<ReturnMessage> InductionProgrammeCoOrdinatiorAssignSave(InductionProgrammeCoOrdinatiorAssign formdata)
        {
            return await this.assessmentrepository.InductionProgrammeCoOrdinatiorAssignSave(formdata);
        }

        public async Task<List<InductionProgrammeCoOrdinatiorAssigned>> InductionProgrammeCoOrdinatiorAssignedGet(InductionProgrammeCoOrdinatiorAssignedSearch Param)
        {
            return await this.assessmentrepository.InductionProgrammeCoOrdinatiorAssignedGet(Param);
        }

        public async Task<List<BatchReleaseListGetAll>> BatchReleaseListGetAll(BatchReleaseListGetAllSearch Param)
        {
            return await this.assessmentrepository.BatchReleaseListGetAll(Param);
        }
        public async Task<List<AssessementAssignReleaseList>> AssessementAssignReleaseList(AssessementAssignReleaseListSearch Param)
        {
            return await this.assessmentrepository.AssessementAssignReleaseList(Param);
        }

        public async Task<List<AssessementAssignReleaseList>> AssessementAssignReReleaseList(AssessementAssignReleaseListSearch Param)
        {
            return await this.assessmentrepository.AssessementAssignReReleaseList(Param);
        }
        public async Task<List<FeedbackAssignReleaseList>> GetEvaluateFeedbackReRelease(FeedbackAssignReleaseListSearch Param)
        {
            return await this.assessmentrepository.GetEvaluateFeedbackReRelease(Param);
        }

        public async Task<ReturnMessage> AssementAssignReleaseSave(AssementAssignReleaseSave formdata)
        {
            return await this.assessmentrepository.AssementAssignReleaseSave(formdata);
        }
        public async Task<ReturnMessage> FeedbackAssignReleaseSave(FeedbackAssignReleaseSave formdata)
        {
            return await this.assessmentrepository.FeedbackAssignReleaseSave(formdata);
        }

        public async Task<ReturnMessage> AssementAssignReleaseSaveForCandidate(AssementAssignReleaseSaveCandiddate formdata)
        {
            return await this.assessmentrepository.AssementAssignReleaseSaveForCandidate(formdata);
        }
        public async Task<ReturnMessage> FeedbackAssignReleaseSaveForCandidate(FeedBackAssignReleaseSaveCandiddate formdata)
        {
            return await this.assessmentrepository.FeedbackAssignReleaseSaveForCandidate(formdata);
        }
        public async Task<ReturnMessage> DeleteAssessment(DeleteAssessmentSearch search)
        {
            return await this.assessmentrepository.DeleteAssessment(search);
        }

        public async Task<CandidateAssessmentReleaseListForNewJoinerlist> CandidateAssessmentReleaseListGetAll(CandidateAssessmentReleaseListSearch Param)
        {
            return await this.assessmentrepository.CandidateAssessmentReleaseListGetAll(Param);
        }

        public async Task<CandidateAssessmentReleaseListForNewJoinerlist> CandidateAssessmentReleaseListGetAllforNewJoinerList(CandidateAssessmentReleaseListSearch Param)
        {
            return await this.assessmentrepository.CandidateAssessmentReleaseListGetAllforNewJoinerList(Param);
        }

        public async Task<CandidateAssessment> GetCandidateAssessmentData(CandidateAssessmentSearch search)
        {
            return await this.assessmentrepository.GetCandidateAssessmentData(search);
        }

        public async Task<AssessmentCandidate> GetAssessmentDataCandidate(AssessmentSearchCandidate search)
        {
            return await this.assessmentrepository.GetAssessmentDataCandidate(search);
        }

        public async Task<ReturnMessage> AssessmentSaveCandidate(AssessmentSaveCandidate formdata)
        {
            return await this.assessmentrepository.AssessmentSaveCandidate(formdata);
        }
        public async Task<BatchesAssementEvaluateList> GetEvaluateAssessmentBatchList(BatchesAssementEvaluateListSearch search)
        {
            return await this.assessmentrepository.GetEvaluateAssessmentBatchList(search);
        }
        public async Task<BatchesFeedbackList> GetEvaluateFeedbackBatchList(BatchesFeedbackListSearch search)
        {
            return await this.assessmentrepository.GetEvaluateFeedbackBatchList(search);
        }
        public async Task<CandidateEvaluation> GetCandidateAssessmentEvaluation(CandidateEvaluationSearch search)
        {
            return await this.assessmentrepository.GetCandidateAssessmentEvaluation(search);
        }
        public async Task<ReturnMessage> CandidateAssessmentEvaluationSave(CandidateEvaluationSave formdata)
        {
            return await this.assessmentrepository.CandidateAssessmentEvaluationSave(formdata);
        }
        public async Task<List<CandidateScore>> GetCandidateEvaluationAnswerScore(CandidateEvaluationSave formdata)
        {
            return await this.assessmentrepository.GetCandidateEvaluationAnswerScore(formdata);
        }
        public async Task<CandidateEvaluationUploadView> CandidateEvaluationUploadGet(CandidateEvaluationUploadViewSearch search)
        {
            return await this.assessmentrepository.CandidateEvaluationUploadGet(search);
        }

        //public async Task<ReturnMessage> UploadAssementTestResult(DataTable formData)
        //{
        //    return await this.assessmentrepository.UploadAssementTestResult(formData);
        //}

        public async Task<ReturnMessage> CandidateEvaluationUploadSave(CandidateEvaluationUploadSave formdata)
        {
            return await this.assessmentrepository.CandidateEvaluationUploadSave(formdata);
        }

        public async Task<CandidateAssessmentSummary> CandidateAssessmentSummaryGet(CandidateAssessmentSummarySearch search)
        {
            return await this.assessmentrepository.CandidateAssessmentSummaryGet(search);
        }

        public async Task<CandidateAssessmentSummaryPending> CandidateAssessmentSummaryPendingListGet(CandidateAssessmentSummaryPendingSearch search)
        {
            return await this.assessmentrepository.CandidateAssessmentSummaryPendingListGet(search);
        }
        public async Task<ReturnMessage> CandidateAssessmentSummarySave(CandidateAssessmentSummarySave formdata)
        {
            return await this.assessmentrepository.CandidateAssessmentSummarySave(formdata);
        }
        public async Task<ReturnMessage> CandidateAssessmentSummarySaveIndividual(CandidateAssessmentSummarySave formdata)
        {
            return await this.assessmentrepository.CandidateAssessmentSummarySaveIndividual(formdata);
        }

        public async Task<CandidateAssessmentEvaluationView> GetCandidateAssessmentEvaluationView(CandidateAssessmentEvaluationViewSearch search)
        {
            return await this.assessmentrepository.GetCandidateAssessmentEvaluationView(search);
        }

        public async Task<List<UploadedAssessmentList>> GetUploadedAssessmentEvaluation(UploadedAssessmentSearch Param)
        {
            return await this.assessmentrepository.GetUploadedAssessmentEvaluation(Param);
        }
    }
}
