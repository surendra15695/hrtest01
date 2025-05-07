using Application.Entity.Entities.ReportModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.ReportModule
{
    public interface IMRFReports
    {
        Task<List<NoticePeriodNew>> GetNoticePeriod(SearchNoticePeriod search);
        Task<List<RelocationReportNew>> GetRelocation(SearchRelocationReport search);
        Task<List<TravelReimbursementReportNew>> GetTravelReimbursement(SearchTravelReimbursementReport search);
        Task<List<HROpsResignation>> GetHROpsResignation(SearchHROpsResignation search); //Piu
        Task<List<VendorCandidateReportNew>> GetVendorCandidateReport(SearchVendorCandidateReport search);
        Task<List<DocumentStatusNew>> GetDocumentStatus(SearchDocumentStatus search);
        Task<List<InterviewCalenderNEW>> GetInterviewCalender(SearchInterviewCalender search);
        Task<List<EmployeeSalary>> GetEmployeeSalary(SearchEmployeeSalary search);
        Task<List<RecruitmentCostSavingOutput>> RecruitmentCostSavingReport(RecruitmentCostSavingInput search); //Arnab
        Task<List<NoticePeriodSavingCost>> GetNoticePeriodSavingCost(SearchNoticePeriodSavingCost search);
        Task<List<CandidateDetailsInput>> candidateDetailsforMaster(SearchCandidateDetails formData); //mas
    }
}
