using Application.DataAccess.Repositories.Interfaces.ReportModule;
using Application.Entity.Entities.Dashboard;
using Application.Entity.Entities.ReportModule;
using Application.Service.Services.Interfaces.ReportModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Application.Entity.Entities.ReportModule.ViewCandidateFeedbackReportOutputNew;

namespace Application.Service.Services.ReportModule
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository reportRepository;

        public ReportService(IReportRepository reportRepository)
        {
            this.reportRepository = reportRepository;
        }

        public async Task<List<SourceChannelMonthWiseList>> GetSourceChannelMonthWiseReport(SearchSourceChannelMonthWiseList search)
        {
            return await this.reportRepository.GetSourceChannelMonthWiseReport(search);
        }

        //Arnab
        public async Task<List<CompanyDoctorReportOutputNew>> CompanyDoctorReport(CompanyDoctorReportInput search)
        {
            return await this.reportRepository.CompanyDoctorReport(search);
        }

        //Arnab
        public async Task<List<ConsultantListOutput>> ConsultantReport(ConsultantListInput search)
        {
            return await this.reportRepository.ConsultantReport(search);
        }

        //Bhagyashri
        public async Task<List<BGVReportOutputNew>> BGVReport(BGVReportInput search)
        {
            return await this.reportRepository.BGVReport(search);
        }

        //Bhagyashri
        public async Task<List<ReceruitmentFunnelReportOutput>> ReceruitmentFunnelReport(RecruitmentFunnelReportSearch search)
        {
            return await this.reportRepository.ReceruitmentFunnelReport(search);
        }

        //Bhagyashri
        public async Task<List<RecruiterPerformanceReportOutputNew>> RecruiterPerformanceReport(RecruiterPerformanceReportInput search)
        {
            return await this.reportRepository.RecruiterPerformanceReport(search);
        }

        //Bhagyashri
        public async Task<List<PreEmploymentReportOutputNew>> PreEmploymentReport(PreEmploymentReportInput search)
        {
            return await this.reportRepository.PreEmploymentReport(search);
        }

        //Arnab
        public async Task<List<InterviewPanelReportOutputNew>> InterviewPanelReport(InterviewPanelReportInput search)
        {
            return await this.reportRepository.InterviewPanelReport(search);
        }
        //Arnab
        public async Task<List<HiringManagerReportOutputNew>> HiringManagerReport(HiringManagerReportInput search)
        {
            return await this.reportRepository.HiringManagerReport(search);
        }
        //Arnab
        public async Task<List<OnBoardingCompletedReportOutput>> OnboardingCompletedReport(OnBoardingCompletedReportInput search)
        {
            return await this.reportRepository.OnboardingCompletedReport(search);
        }
        //Arnab
        public async Task<List<ResignationReportOutput>> ResignationReportList(ResignationReportInput search)
        {
            return await this.reportRepository.ResignationReportList(search);
        }
        public async Task<List<NewJoinersReportOutput>> NewJoinersReportList(NewJoinersReportInput search)
        {
            return await this.reportRepository.NewJoinersReportList(search);
        }
        public async Task<List<NewJoinersReportOutput>> NewJoinersReportListBatchwiseCandidate(NewJoinersReportBatchWiseCandidateInput search)
        {
            return await this.reportRepository.NewJoinersReportListBatchwiseCandidate(search);
        }
        public async Task<List<NewJoinersReportBatchOutput>> NewJoinersReportListBatch(NewJoinersReportBatchInput search)
        {
            return await this.reportRepository.NewJoinersReportListBatch(search);
        }
        //Bhagyashri
        public async Task<List<SapVarianceReportOutput>> SapVarianceReport(SapVarianceReportInput search)
        {
            return await this.reportRepository.SapVarianceReport(search);
        }
        //Bhagyashri
        public async Task<List<VacancyReportOutputNew>> VacancyReport(VacancyReportInput search)
        {
            return await this.reportRepository.VacancyReport(search);
        }

        //Bhagyashri
        public async Task<List<ConsultantPerformanceOutputNew>> ConsultantPerformanceReport(ConsultantPerformanceInput search)
        {
            return await this.reportRepository.ConsultantPerformanceReport(search);
        }


        //Bhagyashri
        public async Task<List<ConsPaymentTrackerReportOutput>> ConsPaymentTrackerReport(ConsPaymentTrackerReportInput search)
        {
            return await this.reportRepository.ConsPaymentTrackerReport(search);
        }
        //Arnab
        public async Task<List<RecruitmentCostOutput>> RecruitmentCostReport(RecruitmentCostInput search)
        {
            return await this.reportRepository.RecruitmentCostReport(search);
        }
        //Arnab
        public async Task<List<CampusCandidateReportOutput>> CampusCandidateReport(CampusCandidateReportInput search)
        {
            return await this.reportRepository.CampusCandidateReport(search);
        }
        //Arg
        public async Task<List<FuntionalHeadAttritionforAll>> FunctionalAttritionHead(SearchFuntionalHeadattrition search)
        {
            return await this.reportRepository.FunctionalAttritionHead(search);
        }

        public async Task<List<FunctionalHeadNameAll>> FunctionalHeadAll()
        {
            return await this.reportRepository.FunctionalHeadAll();
        }

        //Bhagyashri
        public async Task<List<CandidateAttritionOutput>> CandidateAttritionReport(CandidateAttritionReportInput search)
        {
            return await this.reportRepository.CandidateAttritionReport(search);
        }

        public async Task<List<RequisitionReportList>> RequisitionReport(SearchRequisitionReport search)
        {
            return await this.reportRepository.RequisitionReport(search);
        }

        public async Task<List<RequisitionHistoryReportList>> RequisitionHistoryReport(SearchRequisitionHistoryReport search)
        {
            return await this.reportRepository.RequisitionHistoryReport(search);
        }

        public async Task<List<ResignationReportList>> ResignationReport(SearchResignationReport search)
        {
            return await this.reportRepository.ResignationReport(search);
        }

        public async Task<List<SuccessionPlanReportList>> SuccessionPlanReport(SearchSuccessionPlanReport search)
        {
            return await this.reportRepository.SuccessionPlanReport(search);
        }

        public async Task<List<TransferReportList>> TransferReport(SearchTransferReport search)
        {
            return await this.reportRepository.TransferReport(search);
        }

        public async Task<List<RequisitionCandidateReportList>> RequisitionCandidateReport(SearchRequisitionCandidateReport search)
        {
            return await this.reportRepository.RequisitionCandidateReport(search);
        }

        public async Task<List<CandidateTrackerReportList>> CandidateTrackerReport(SearchCandidateTrackerReport search)
        {
            return await this.reportRepository.CandidateTrackerReport(search);
        }

        public async Task<List<EmployeeSalaryReport>> EmployeeSalaryReport(SearchEmployeeSalaryReport search)
        {
            return await this.reportRepository.EmployeeSalaryReport(search);
        }

        public async Task<List<LeadTimeReport>> LeadTimeReport(SearchLeadTimeReport search)
        {
            return await this.reportRepository.LeadTimeReport(search);
        }

        public async Task<List<InterviewOrganisedReport>> InterviewOrganisedReport(SearchInterviewOrganisedReport search)
        {
            return await this.reportRepository.InterviewOrganisedReport(search);
        }

        public async Task<List<CandidateManagementReportList>> CandidateManagementReport(SearchCandidateManagementReport search)
        {
            return await this.reportRepository.CandidateManagementReport(search);
        }

        public async Task<List<ReqFuncRequisitionNew>> RequesterFunctionalHeadRequisitionReport(SearchReqFuncRequisition search)
        {
            return await this.reportRepository.RequesterFunctionalHeadRequisitionReport(search);
        }

        public async Task<List<ReqFuncOfferedCandidateNew>> RequesterFunctionalHeadOfferedCandidateReport(SearchReqFuncOfferedCandidate search)
        {
            return await this.reportRepository.RequesterFunctionalHeadOfferedCandidateReport(search);
        }

        public async Task<List<FuncAttrition>> FunctionalHeadAttritionReport(SearchFuncAttrition search)
        {
            return await this.reportRepository.FunctionalHeadAttritionReport(search);
        }
        //Arnab
        public async Task<List<HROpsAttritionOutput>> HROpsAttritionReport(HROpsAttritionInput search)
        {
            return await this.reportRepository.HROpsAttritionReport(search);
        }

        public async Task<List<RecruitmentManagerRequisitionNew>> RecruitmentManagerRequisitionReport(SearchRecruitmentManagerRequisition search)
        {
            return await this.reportRepository.RecruitmentManagerRequisitionReport(search);
        }
        public async Task<List<InterviewFeedbacklistNew>> InterviewFeedbackReport(InterviewFeedbackSearch search)
        {
            return await this.reportRepository.InterviewFeedbackReport(search);
        }
        public async Task<List<SalaryStatisticsList>> SalaryStatisticsReport(SearchSalaryStatistics search)
        {
            return await this.reportRepository.SalaryStatisticsReport(search);
        }
        public async Task<List<NewJoinersRecruitmentActivityListNew>> NewJoinersRecruitmentActivityReport(SearchNewJoinersRecruitmentActivity search)
        {
            return await this.reportRepository.NewJoinersRecruitmentActivityReport(search);
        }
        public async Task<List<NewJoinersExternalRecruitmentListNew>> NewJoinersExternalRecruitmentReport(SearchNewJoinersExternalRecruitment search)
        {
            return await this.reportRepository.NewJoinersExternalRecruitmentReport(search);
        }
        //Arnab
        public async Task<List<NewJoinersManufacturingSalesandMarketingWisePositionOutput>> NewJoinersVerticalWisePositionReport(NewJoinersManufacturingSalesandMarketingWisePositionInput search)
        {
            return await this.reportRepository.NewJoinersVerticalWisePositionReport(search);
        }
        public async Task<List<NewJoinersOverallVerticalWiseList>> NewJoinersOverallVerticalWiseReport(SearchNewJoinersOverallVerticalWise search)
        {
            return await this.reportRepository.NewJoinersOverallVerticalWiseReport(search);
        }
        public async Task<List<NewJoinersRecruitmentModeList>> NewJoinersRecruitmentModeReport(SearchNewJoinersRecruitmentMode search)
        {
            return await this.reportRepository.NewJoinersRecruitmentModeReport(search);
        }
        public async Task<List<FlexiAllList>> GetAllFlexiReport(SearchFlexiList search)
        {
            return await this.reportRepository.GetAllFlexiReport(search);
        }

        public async Task<List<FlexiListGetAllCandiate>> GetAllCandidateFlexiReport(SearchFlexCandidateiList search)
        {
            return await this.reportRepository.GetAllCandidateFlexiReport(search);
        }
        public async Task<List<FlexiListGetAllReq>> GetAllReqFlexiReport(SearchFlexiRequisitionList search)
        {
            return await this.reportRepository.GetAllReqFlexiReport(search);
        }


        //Ankita
        public async Task<List<CandidateDocumentReportOutputNew>> CandidateDocumentReport(CandidateDocumentReportInput search)
        {
            return await this.reportRepository.CandidateDocumentReport(search);
        }
        public async Task<List<GetAllcandidateIndividualtabOutputNew>> GetAllcandidateIndividualtab(GetAllcandidateIndividualtabInput search)
        {
            return await this.reportRepository.GetAllcandidateIndividualtab(search);
        }
        public async Task<List<GetAllbatchtabOutputNew>> GetAllforbatchtab(GetAllbatchtabInput search)
        {
            return await this.reportRepository.GetAllforbatchtab(search);
        }
        public async Task<CandidateInductionSheduleOutputNew> getAllInductionScheduleDetails(GetAllCandidateInductionScheduleInput search)
        {
            return await this.reportRepository.getAllInductionScheduleDetails(search);
        }

        public async Task<List<BatchWiseViewCandidateDetailsOutputNew>>  getAllBatchWiseCandidateDetails(BatchWiseViewCandidateDetailsInput search)
        {
            return await this.reportRepository.getAllBatchWiseCandidateDetails(search);
        }

        public async Task<List<ReimbursementdetailsReportOutputNew>> getAllReimbursementdetailsReport(ReimbursementdetailsReportInput search)
        {
            return await this.reportRepository.getAllReimbursementdetailsReport(search);
        }


        public async Task<List<InductionFeedbackDetailsOutputNew>> getAllInductionFeedbackDetails(InductionFeedbackDetailsInput search)
        {
            return await this.reportRepository.getAllInductionFeedbackDetails(search);
        }

        public async Task<List<candidateviewfeedbackOutputNew>> getcandidatewiseviewfeedback(candidateviewfeedbackInput search)
        {
            return await this.reportRepository.getcandidatewiseviewfeedback(search);
        }

        public async Task<List<ViewCandidateFeedbackReportOutputNew>> getAllViewCandidateFeedbackReport(ViewCandidateFeedbackReportInput search)
        {
            return await this.reportRepository.getAllViewCandidateFeedbackReport(search);

        }

        //Ankita

        public async Task<List<HandHoldingReportGet>> GetAllHandholdingDataAsReport(GetHandholding formData)
        {
            return await this.reportRepository.GetAllHandholdingDataAsReport(formData);
        }

    }
}
