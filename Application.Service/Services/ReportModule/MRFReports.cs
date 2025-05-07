
using Application.DataAccess.Repositories.Interfaces.ReportModule;
using Application.Entity.Entities.Dashboard;
using Application.Entity.Entities.ReportModule;
using Application.Service.Services.Interfaces.ReportModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.ReportModule
{

    public class MRFReports : IMRFReports
    {
        private readonly IMRFReportRepository mrfReports;

        public MRFReports(IMRFReportRepository mrfReports)
        {
            this.mrfReports = mrfReports;
        }

        public async Task<List<NoticePeriodNew>> GetNoticePeriod(SearchNoticePeriod search)
        {
            return await this.mrfReports.GetNoticePeriod(search);
        }

        public async Task<List<RelocationReportNew>> GetRelocation(SearchRelocationReport search)
        {
            return await this.mrfReports.GetRelocation(search);
        }
        public async Task<List<TravelReimbursementReportNew>> GetTravelReimbursement(SearchTravelReimbursementReport search)
        {
            return await this.mrfReports.GetTravelReimbursement(search);
        }
        public async Task<List<HROpsResignation>> GetHROpsResignation (SearchHROpsResignation search)//Piu
        {
            return await this.mrfReports.GetHROpsResignation(search);
        }
        public async Task<List<VendorCandidateReportNew>> GetVendorCandidateReport(SearchVendorCandidateReport search)
        {
            return await this.mrfReports.GetVendorCandidateReport(search);
        }
        public async Task<List<DocumentStatusNew>> GetDocumentStatus(SearchDocumentStatus search)
        {
            return await this.mrfReports.GetDocumentStatus(search);
        }
        public async Task<List<InterviewCalenderNEW>> GetInterviewCalender(SearchInterviewCalender search)
        {
            return await this.mrfReports.GetInterviewCalender(search);
        }
        public async Task<List<EmployeeSalary>> GetEmployeeSalary(SearchEmployeeSalary search)
        {
            return await this.mrfReports.GetEmployeeSalary(search);
        }
        //Arnab
        public async Task<List<RecruitmentCostSavingOutput>> RecruitmentCostSavingReport(RecruitmentCostSavingInput search)
        {
            return await this.mrfReports.RecruitmentCostSavingReport(search);
        }
        public async Task<List<NoticePeriodSavingCost>> GetNoticePeriodSavingCost(SearchNoticePeriodSavingCost search)
        {
            return await this.mrfReports.GetNoticePeriodSavingCost(search);
        }
        public async Task<List<CandidateDetailsInput>> candidateDetailsforMaster(SearchCandidateDetails search)
        {
            return await this.mrfReports.candidateDetailsforMaster(search);
        }

    }

}