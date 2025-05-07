using Application.Entity.Entities.Dashboard;
using Application.Entity.Entities.ReportModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using static Application.Entity.Entities.ReportModule.ViewCandidateFeedbackReportOutputNew;

namespace Application.DataAccess.Repositories.Interfaces.ReportModule
{
    public interface IReportRepository
    {
        Task<List<SourceChannelMonthWiseList>> GetSourceChannelMonthWiseReport(SearchSourceChannelMonthWiseList search);

        //Bhagyashri
        Task<List<BGVReportOutputNew>> BGVReport(BGVReportInput formData);



        //Bhagyashri
        Task<List<ReceruitmentFunnelReportOutput>> ReceruitmentFunnelReport(RecruitmentFunnelReportSearch search);


        //Bhagyashri
        Task<List<RecruiterPerformanceReportOutputNew>> RecruiterPerformanceReport(RecruiterPerformanceReportInput formData);


        //Bhagyashri
        Task<List<SapVarianceReportOutput>> SapVarianceReport(SapVarianceReportInput formData);

        //arg
        Task<List<FuntionalHeadAttritionforAll>> FunctionalAttritionHead(SearchFuntionalHeadattrition formData);

        //arg
        Task<List<FunctionalHeadNameAll>> FunctionalHeadAll();
        //Bhagyashri
        Task<List<ConsPaymentTrackerReportOutput>> ConsPaymentTrackerReport(ConsPaymentTrackerReportInput formData);
        //Arnab
        Task<List<RecruitmentCostOutput>> RecruitmentCostReport(RecruitmentCostInput formData);
        //Arnab
        Task<List<CampusCandidateReportOutput>> CampusCandidateReport(CampusCandidateReportInput formData);
        //Bhagyashri
        Task<List<PreEmploymentReportOutputNew>> PreEmploymentReport(PreEmploymentReportInput formData);
        //Arnab
        Task<List<OnBoardingCompletedReportOutput>> OnboardingCompletedReport(OnBoardingCompletedReportInput formData);
        //Arnab
        Task<List<ResignationReportOutput>> ResignationReportList(ResignationReportInput formData);
        Task<List<NewJoinersReportOutput>> NewJoinersReportList(NewJoinersReportInput formData);
        Task<List<NewJoinersReportOutput>> NewJoinersReportListBatchwiseCandidate(NewJoinersReportBatchWiseCandidateInput formData);
        Task<List<NewJoinersReportBatchOutput>> NewJoinersReportListBatch(NewJoinersReportBatchInput formData);
        //Arnab
        Task<List<InterviewPanelReportOutputNew>> InterviewPanelReport(InterviewPanelReportInput formData);
        //Arnab
        Task<List<HiringManagerReportOutputNew>> HiringManagerReport(HiringManagerReportInput formData);

        //Bhagyashri
        Task<List<VacancyReportOutputNew>> VacancyReport(VacancyReportInput formData);

        //Bhagyashri
        Task<List<CandidateAttritionOutput>> CandidateAttritionReport(CandidateAttritionReportInput formData);

        //Bhagyashri
        Task<List<ConsultantPerformanceOutputNew>> ConsultantPerformanceReport(ConsultantPerformanceInput formData);

        //Arnab
        Task<List<CompanyDoctorReportOutputNew>> CompanyDoctorReport(CompanyDoctorReportInput formData);

        //Arnab
        Task<List<ConsultantListOutput>> ConsultantReport(ConsultantListInput formData);


        Task<List<RequisitionReportList>> RequisitionReport(SearchRequisitionReport formData);
        Task<List<RequisitionHistoryReportList>> RequisitionHistoryReport(SearchRequisitionHistoryReport formData);
        Task<List<ResignationReportList>> ResignationReport(SearchResignationReport formData);
        Task<List<SuccessionPlanReportList>> SuccessionPlanReport(SearchSuccessionPlanReport formData);
        Task<List<TransferReportList>> TransferReport(SearchTransferReport formData);
        Task<List<RequisitionCandidateReportList>> RequisitionCandidateReport(SearchRequisitionCandidateReport formData);
        Task<List<CandidateTrackerReportList>> CandidateTrackerReport(SearchCandidateTrackerReport formData);
        Task<List<EmployeeSalaryReport>> EmployeeSalaryReport(SearchEmployeeSalaryReport formData);
        Task<List<LeadTimeReport>> LeadTimeReport(SearchLeadTimeReport formData);
        Task<List<InterviewOrganisedReport>> InterviewOrganisedReport(SearchInterviewOrganisedReport formData);
        Task<List<CandidateManagementReportList>> CandidateManagementReport(SearchCandidateManagementReport search);
        Task<List<ReqFuncRequisitionNew>> RequesterFunctionalHeadRequisitionReport(SearchReqFuncRequisition formData);
        Task<List<ReqFuncOfferedCandidateNew>> RequesterFunctionalHeadOfferedCandidateReport(SearchReqFuncOfferedCandidate formData);
        Task<List<FuncAttrition>> FunctionalHeadAttritionReport(SearchFuncAttrition formData);
        Task<List<HROpsAttritionOutput>> HROpsAttritionReport(HROpsAttritionInput formData); //Arnab
        Task<List<RecruitmentManagerRequisitionNew>> RecruitmentManagerRequisitionReport(SearchRecruitmentManagerRequisition formData);
        Task<List<InterviewFeedbacklistNew>> InterviewFeedbackReport(InterviewFeedbackSearch formData);
        Task<List<SalaryStatisticsList>> SalaryStatisticsReport(SearchSalaryStatistics formData);
        Task<List<NewJoinersRecruitmentActivityListNew>> NewJoinersRecruitmentActivityReport(SearchNewJoinersRecruitmentActivity formData);
        Task<List<NewJoinersExternalRecruitmentListNew>> NewJoinersExternalRecruitmentReport(SearchNewJoinersExternalRecruitment formData);
        Task<List<NewJoinersManufacturingSalesandMarketingWisePositionOutput>> NewJoinersVerticalWisePositionReport(NewJoinersManufacturingSalesandMarketingWisePositionInput formData); //Arnab
        Task<List<NewJoinersOverallVerticalWiseList>> NewJoinersOverallVerticalWiseReport(SearchNewJoinersOverallVerticalWise formData);
        Task<List<NewJoinersRecruitmentModeList>> NewJoinersRecruitmentModeReport(SearchNewJoinersRecruitmentMode formData);
        Task<List<FlexiAllList>> GetAllFlexiReport(SearchFlexiList formData);
        Task<List<FlexiListGetAllCandiate>> GetAllCandidateFlexiReport(SearchFlexCandidateiList formData);
        Task<List<FlexiListGetAllReq>> GetAllReqFlexiReport(SearchFlexiRequisitionList formData);

        //Ankita
        Task<List<CandidateDocumentReportOutputNew>> CandidateDocumentReport(CandidateDocumentReportInput formData);

        Task<List<GetAllcandidateIndividualtabOutputNew>> GetAllcandidateIndividualtab(GetAllcandidateIndividualtabInput formData);

        Task<List<GetAllbatchtabOutputNew>> GetAllforbatchtab(GetAllbatchtabInput formData);

        Task<CandidateInductionSheduleOutputNew> getAllInductionScheduleDetails(GetAllCandidateInductionScheduleInput formData);

        Task<List<BatchWiseViewCandidateDetailsOutputNew>> getAllBatchWiseCandidateDetails(BatchWiseViewCandidateDetailsInput formData);

        Task<List<ReimbursementdetailsReportOutputNew>> getAllReimbursementdetailsReport(ReimbursementdetailsReportInput formData);


        Task<List<InductionFeedbackDetailsOutputNew>> getAllInductionFeedbackDetails(InductionFeedbackDetailsInput formData);

        Task<List<candidateviewfeedbackOutputNew>> getcandidatewiseviewfeedback(candidateviewfeedbackInput formData);

        Task<List<ViewCandidateFeedbackReportOutputNew>> getAllViewCandidateFeedbackReport(ViewCandidateFeedbackReportInput formData);
        //Ankita

        Task<List<HandHoldingReportGet>> GetAllHandholdingDataAsReport(GetHandholding formData);

    }
}
