using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.ReportModule;
using Application.Entity.Entities.ReportModule;
using Application.Entity.Entities.Dashboard;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Entity.Entities.PreJoiningModule;
using static Application.Entity.Entities.ReportModule.ViewCandidateFeedbackReportOutputNew;

namespace Application.DataAccess.Repositories.ReportModule
{
    public class ReportRepository : DatabaseContext, IReportRepository
    {
        public ReportRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<SourceChannelMonthWiseList>> GetSourceChannelMonthWiseReport(SearchSourceChannelMonthWiseList search)
        {
            try
            {
                List<SourceChannelMonthWiseList> returnList = new List<SourceChannelMonthWiseList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_Report_SourceChannelMonthWise";
                    connection.Open();
                    returnList = connection.Query<SourceChannelMonthWiseList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //Bhagyashri
        public async Task<List<BGVReportOutputNew>> BGVReport(BGVReportInput formData)
        {
            try
            {
                List<BGVReportOutputNew> dataList = new List<BGVReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@Candidateno", formData.Candidateno);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_BGV";
                    connection.Open();
                    dataList = connection.Query<BGVReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        //Bhagyashri
        public async Task<List<ReceruitmentFunnelReportOutput>> ReceruitmentFunnelReport(RecruitmentFunnelReportSearch search)
        {
            try
            {
                List<ReceruitmentFunnelReportOutput> dataList = new List<ReceruitmentFunnelReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_ReceruitmentFunnelReport";
                    connection.Open();
                    dataList = connection.Query<ReceruitmentFunnelReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Bhagyashri
        public async Task<List<RecruiterPerformanceReportOutputNew>> RecruiterPerformanceReport(RecruiterPerformanceReportInput formData)
        {
            try
            {
                List<RecruiterPerformanceReportOutputNew> dataList = new List<RecruiterPerformanceReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@FromDate", formData.fromDate);
                    para.Add("@ToDate", formData.toDate);
                    para.Add("@VerticalId", formData.verticalId);
                    para.Add("@FunctionId", formData.functionId);
                    const string procName = "Usp_RecruiterPerformanceReport";
                    connection.Open();
                    dataList = connection.Query<RecruiterPerformanceReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        //Bhagyashri
        public async Task<List<PreEmploymentReportOutputNew>> PreEmploymentReport(PreEmploymentReportInput formData)
        {
            try
            {
                List<PreEmploymentReportOutputNew> dataList = new List<PreEmploymentReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmpId", formData.EmpId);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@DoctorsName", formData.DoctorsName);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_PreEmployment";
                    connection.Open();
                    dataList = connection.Query<PreEmploymentReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Arnab
        public async Task<List<InterviewPanelReportOutputNew>> InterviewPanelReport(InterviewPanelReportInput formData)
        {
            try
            {
                List<InterviewPanelReportOutputNew> dataList = new List<InterviewPanelReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@VenueId", formData.VenueId);
                    para.Add("@InterviewTypeId", formData.InterviewTypeId);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    const string procName = "Usp_Report_InterviewPanel";
                    connection.Open();
                    dataList = connection.Query<InterviewPanelReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Arnab
        public async Task<List<HiringManagerReportOutputNew>> HiringManagerReport(HiringManagerReportInput formData)
        {
            try
            {
                List<HiringManagerReportOutputNew> dataList = new List<HiringManagerReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_HiringManager";
                    connection.Open();
                    dataList = connection.Query<HiringManagerReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arnab
        public async Task<List<OnBoardingCompletedReportOutput>> OnboardingCompletedReport(OnBoardingCompletedReportInput formData)
        {
            try
            {
                List<OnBoardingCompletedReportOutput> dataList = new List<OnBoardingCompletedReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@FullName", formData.FullName);
                    const string procName = "Usp_HiringTeamOnbordingCompleteReport_GetAll";
                    connection.Open();
                    dataList = connection.Query<OnBoardingCompletedReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Bhagyashri
        public async Task<List<ConsPaymentTrackerReportOutput>> ConsPaymentTrackerReport(ConsPaymentTrackerReportInput formData)
        {
            try
            {
                List<ConsPaymentTrackerReportOutput> dataList = new List<ConsPaymentTrackerReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmpId", formData.EmpId);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_ConsPaymentTracker";
                    connection.Open();
                    dataList = connection.Query<ConsPaymentTrackerReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arnab
        public async Task<List<RecruitmentCostOutput>> RecruitmentCostReport(RecruitmentCostInput formData)
        {
            try
            {
                List<RecruitmentCostOutput> dataList = new List<RecruitmentCostOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@EmployeeNo", formData.EmployeeNo);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RecruitmentCostList_GetAll";
                    connection.Open();
                    dataList = connection.Query<RecruitmentCostOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Arnab
        public async Task<List<CampusCandidateReportOutput>> CampusCandidateReport(CampusCandidateReportInput formData)
        {
            try
            {
                List<CampusCandidateReportOutput> dataList = new List<CampusCandidateReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    const string procName = "Usp_Report_CampusCandidate";
                    connection.Open();
                    dataList = connection.Query<CampusCandidateReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arg
        public async Task<List<FuntionalHeadAttritionforAll>> FunctionalAttritionHead(SearchFuntionalHeadattrition formData)
        {
            try
            {
                List<FuntionalHeadAttritionforAll> dataList = new List<FuntionalHeadAttritionforAll>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@Fullname", formData.Fullname);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_FunctionalHeadAttrition";
                    connection.Open();
                    dataList = connection.Query<FuntionalHeadAttritionforAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<List<FunctionalHeadNameAll>> FunctionalHeadAll()
        {
            try
            {
                List<FunctionalHeadNameAll> returnList = new List<FunctionalHeadNameAll>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_FunctionalHeadName_GetAll";
                    connection.Open();
                    returnList = connection.Query<FunctionalHeadNameAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //Bhagyashri
        public async Task<List<SapVarianceReportOutput>> SapVarianceReport(SapVarianceReportInput formData)
        {
            try
            {
                List<SapVarianceReportOutput> dataList = new List<SapVarianceReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    //const string procName = "Usp_Report_SAP_Variance";
                    const string procName = "Usp_Report_SAP_Variance_New";
                    connection.Open();
                    dataList = connection.Query<SapVarianceReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Bhagyashri
        public async Task<List<CandidateAttritionOutput>> CandidateAttritionReport(CandidateAttritionReportInput formData)
        {
            try
            {
                List<CandidateAttritionOutput> dataList = new List<CandidateAttritionOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_CandidateAttrition";
                    connection.Open();
                    dataList = connection.Query<CandidateAttritionOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Bhagyashri
        public async Task<List<ConsultantPerformanceOutputNew>> ConsultantPerformanceReport(ConsultantPerformanceInput formData)
        {
            try
            {
                List<ConsultantPerformanceOutputNew> dataList = new List<ConsultantPerformanceOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorId", formData.VendorId);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    //const string procName = "Usp_Report_ConsultantPerformance";
                    const string procName = "Usp_Report_ConsultantPerformance_New";
                    connection.Open();
                    dataList = connection.Query<ConsultantPerformanceOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        //Bhagyashri
        public async Task<List<VacancyReportOutputNew>> VacancyReport(VacancyReportInput formData)
        {
            try
            {
                List<VacancyReportOutputNew> dataList = new List<VacancyReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@ReqNo", formData.Reqno);
                    // para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    //const string procName = "Usp_Report_Vacancy";
                    const string procName = "Usp_Report_Vacancy_New";
                    connection.Open();
                    dataList = connection.Query<VacancyReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arnab
        public async Task<List<CompanyDoctorReportOutputNew>> CompanyDoctorReport(CompanyDoctorReportInput formData)
        {
            try
            {
                List<CompanyDoctorReportOutputNew> dataList = new List<CompanyDoctorReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_CompanyDoctor";
                    connection.Open();
                    dataList = connection.Query<CompanyDoctorReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arnab
        public async Task<List<ConsultantListOutput>> ConsultantReport(ConsultantListInput formData)
        {
            try
            {
                List<ConsultantListOutput> dataList = new List<ConsultantListOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VendorName", formData.VendorName);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@ContactNo", formData.ContactNo);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_Vendor";
                    connection.Open();
                    dataList = connection.Query<ConsultantListOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arnab
        public async Task<List<ResignationReportOutput>> ResignationReportList(ResignationReportInput formData)
        {
            try
            {
                List<ResignationReportOutput> dataList = new List<ResignationReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_ResignationReport_GetAll";
                    connection.Open();
                    dataList = connection.Query<ResignationReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersReportOutput>> NewJoinersReportList(NewJoinersReportInput formData)
        {
            try
            {
                List<NewJoinersReportOutput> dataList = new List<NewJoinersReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_NewJoiners";
                    connection.Open();
                    dataList = connection.Query<NewJoinersReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersReportOutput>> NewJoinersReportListBatchwiseCandidate(NewJoinersReportBatchWiseCandidateInput formData)
        {
            try
            {
                List<NewJoinersReportOutput> dataList = new List<NewJoinersReportOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_NewjoinerBatchWiseCandidateReport";
                    connection.Open();
                    dataList = connection.Query<NewJoinersReportOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersReportBatchOutput>> NewJoinersReportListBatch(NewJoinersReportBatchInput formData)
        {
            try
            {
                List<NewJoinersReportBatchOutput> dataList = new List<NewJoinersReportBatchOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_NewJoinerBatch";
                    connection.Open();
                    dataList = connection.Query<NewJoinersReportBatchOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RequisitionReportList>> RequisitionReport(SearchRequisitionReport formData)
        {
            try
            {
                List<RequisitionReportList> dataList = new List<RequisitionReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    const string procName = "Usp_Report_Requisition";
                    connection.Open();
                    dataList = connection.Query<RequisitionReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RequisitionHistoryReportList>> RequisitionHistoryReport(SearchRequisitionHistoryReport formData)
        {
            try
            {
                List<RequisitionHistoryReportList> dataList = new List<RequisitionHistoryReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Report_RequisitionHistory";
                    connection.Open();
                    dataList = connection.Query<RequisitionHistoryReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ResignationReportList>> ResignationReport(SearchResignationReport formData)
        {
            try
            {
                List<ResignationReportList> dataList = new List<ResignationReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@ReasonId", formData.ReasonId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@ResignationApprovalStatus", formData.ResignationApprovalStatus);
                    para.Add("@ResignationProcessStatus", formData.ResignationProcessStatus);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Report_Resignation";
                    connection.Open();
                    dataList = connection.Query<ResignationReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SuccessionPlanReportList>> SuccessionPlanReport(SearchSuccessionPlanReport formData)
        {
            try
            {
                List<SuccessionPlanReportList> dataList = new List<SuccessionPlanReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@SuccessionPlanApprovalStatus", formData.SuccessionPlanApprovalStatus);
                    para.Add("@SuccessionPlanProcessStatus", formData.SuccessionPlanProcessStatus);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Report_SuccessionPlan";
                    connection.Open();
                    dataList = connection.Query<SuccessionPlanReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<TransferReportList>> TransferReport(SearchTransferReport formData)
        {
            try
            {
                List<TransferReportList> dataList = new List<TransferReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@ReplacementStatusId", formData.ReplacementStatusId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@TransferApprovalStatus", formData.TransferApprovalStatus);
                    para.Add("@TransferProcessStatus", formData.TransferProcessStatus);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Report_Transfer";
                    connection.Open();
                    dataList = connection.Query<TransferReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RequisitionCandidateReportList>> RequisitionCandidateReport(SearchRequisitionCandidateReport formData)
        {
            try
            {
                List<RequisitionCandidateReportList> dataList = new List<RequisitionCandidateReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@SourceChannelId", formData.SourceChannelId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_RequisitionWiseCandidate";
                    connection.Open();
                    dataList = connection.Query<RequisitionCandidateReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CandidateTrackerReportList>> CandidateTrackerReport(SearchCandidateTrackerReport formData)
        {
            try
            {
                List<CandidateTrackerReportList> dataList = new List<CandidateTrackerReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    //para.Add("@HiringStatusId", formData.HiringStatusId);
                    const string procName = "Usp_Report_CandidateTracker";
                    connection.Open();
                    dataList = connection.Query<CandidateTrackerReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<EmployeeSalaryReport>> EmployeeSalaryReport(SearchEmployeeSalaryReport formData)
        {
            try
            {
                List<EmployeeSalaryReport> dataList = new List<EmployeeSalaryReport>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_EmployeeSalary";
                    connection.Open();
                    dataList = connection.Query<EmployeeSalaryReport>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<LeadTimeReport>> LeadTimeReport(SearchLeadTimeReport formData)
        {
            try
            {
                List<LeadTimeReport> dataList = new List<LeadTimeReport>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AllocatedUserId", formData.AllocatedUserId);
                    const string procName = "USP_Report_LeadTimeReport";
                    connection.Open();
                    dataList = connection.Query<LeadTimeReport>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InterviewOrganisedReport>> InterviewOrganisedReport(SearchInterviewOrganisedReport formData)
        {
            try
            {
                List<InterviewOrganisedReport> dataList = new List<InterviewOrganisedReport>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "USP_Report_InterviewOrganized";
                    connection.Open();
                    dataList = connection.Query<InterviewOrganisedReport>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateManagementReportList>> CandidateManagementReport(SearchCandidateManagementReport search)
        {
            try
            {
                List<CandidateManagementReportList> returnList = new List<CandidateManagementReportList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@Name", search.Name);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@DocApprovalStatusId", search.DocApprovalStatusId);
                    para.Add("@RMDocApprovalStatusId", search.RMDocApprovalStatusId);
                    para.Add("@OMDocApprovalStatusId", search.OMDocApprovalStatusId);
                    para.Add("@PreEmployeeMedicalStatus", search.PreEmployeeMedicalStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    para.Add("@HiringStatus", search.HiringStatus);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_Report_CandidateManagement";
                    connection.Open();
                    returnList = connection.Query<CandidateManagementReportList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<ReqFuncRequisitionNew>> RequesterFunctionalHeadRequisitionReport(SearchReqFuncRequisition formData)
        {
            try
            {
                List<ReqFuncRequisitionNew> dataList = new List<ReqFuncRequisitionNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@HiringManagerId", formData.HiringManagerId);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Report_FunHeadRequisition";
                    connection.Open();
                    dataList = connection.Query<ReqFuncRequisitionNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ReqFuncOfferedCandidateNew>> RequesterFunctionalHeadOfferedCandidateReport(SearchReqFuncOfferedCandidate formData)
        {
            try
            {
                List<ReqFuncOfferedCandidateNew> dataList = new List<ReqFuncOfferedCandidateNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@HiringManagerId", formData.HiringManagerId);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    para.Add("@ApproverAutoUserId", formData.ApproverAutoUserId);
                    const string procName = "Usp_Report_FunHeadOfferedCandidates";
                    connection.Open();
                    dataList = connection.Query<ReqFuncOfferedCandidateNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FuncAttrition>> FunctionalHeadAttritionReport(SearchFuncAttrition formData)
        {
            try
            {
                List<FuncAttrition> dataList = new List<FuncAttrition>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    const string procName = "Usp_Report_FunctionalHeadAttrition";
                    connection.Open();
                    dataList = connection.Query<FuncAttrition>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Arnab
        public async Task<List<HROpsAttritionOutput>> HROpsAttritionReport(HROpsAttritionInput formData)
        {
            try
            {
                List<HROpsAttritionOutput> dataList = new List<HROpsAttritionOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmployeeNo", formData.EmployeeNo);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_Report_HROpsAttrition";
                    connection.Open();
                    dataList = connection.Query<HROpsAttritionOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RecruitmentManagerRequisitionNew>> RecruitmentManagerRequisitionReport(SearchRecruitmentManagerRequisition formData)
        {
            try
            {
                List<RecruitmentManagerRequisitionNew> dataList = new List<RecruitmentManagerRequisitionNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@HiringManagerId", formData.HiringManagerId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    para.Add("@RequisitionApprovalStatus", formData.RequisitionApprovalStatus);
                    para.Add("@RequisitionProcessStatus", formData.RequisitionProcessStatus);
                    const string procName = "Usp_Report_Requisition";
                    connection.Open();
                    dataList = connection.Query<RecruitmentManagerRequisitionNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<InterviewFeedbacklistNew>> InterviewFeedbackReport(InterviewFeedbackSearch formData)
        {
            try
            {
                List<InterviewFeedbacklistNew> dataList = new List<InterviewFeedbacklistNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_InterviewFeedbackUpdated";
                    connection.Open();
                    dataList = connection.Query<InterviewFeedbacklistNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<SalaryStatisticsList>> SalaryStatisticsReport(SearchSalaryStatistics formData)
        {
            try
            {
                List<SalaryStatisticsList> dataList = new List<SalaryStatisticsList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_SalaryStatistics";
                    connection.Open();
                    dataList = connection.Query<SalaryStatisticsList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersRecruitmentActivityListNew>> NewJoinersRecruitmentActivityReport(SearchNewJoinersRecruitmentActivity formData)
        {
            try
            {
                List<NewJoinersRecruitmentActivityListNew> dataList = new List<NewJoinersRecruitmentActivityListNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_NewJoiners_RecruitmentActivities";
                    connection.Open();
                    dataList = connection.Query<NewJoinersRecruitmentActivityListNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersExternalRecruitmentListNew>> NewJoinersExternalRecruitmentReport(SearchNewJoinersExternalRecruitment formData)
        {
            try
            {
                List<NewJoinersExternalRecruitmentListNew> dataList = new List<NewJoinersExternalRecruitmentListNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", formData.GradeId);
                    //para.Add("@Month", formData.Month);
                    //para.Add("@Year", formData.Year);
                    //para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    // const string procName = "Usp_Report_NewJoiners_ExternalRecruitment";
                    const string procName = "Usp_Report_NewJoiners_ExternalRecruitment_New";
                    connection.Open();
                    dataList = connection.Query<NewJoinersExternalRecruitmentListNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Arnab
        public async Task<List<NewJoinersManufacturingSalesandMarketingWisePositionOutput>> NewJoinersVerticalWisePositionReport(NewJoinersManufacturingSalesandMarketingWisePositionInput formData)
        {
            try
            {
                List<NewJoinersManufacturingSalesandMarketingWisePositionOutput> dataList = new List<NewJoinersManufacturingSalesandMarketingWisePositionOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_NewJoiners_ManufacturingSalesandMarketingWisePosition";
                    connection.Open();
                    dataList = connection.Query<NewJoinersManufacturingSalesandMarketingWisePositionOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersOverallVerticalWiseList>> NewJoinersOverallVerticalWiseReport(SearchNewJoinersOverallVerticalWise formData)
        {
            try
            {
                List<NewJoinersOverallVerticalWiseList> dataList = new List<NewJoinersOverallVerticalWiseList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@Month", formData.Month);
                    para.Add("@Year", formData.Year);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_NewJoiners_OverAll_VerticalWise";
                    connection.Open();
                    dataList = connection.Query<NewJoinersOverallVerticalWiseList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<NewJoinersRecruitmentModeList>> NewJoinersRecruitmentModeReport(SearchNewJoinersRecruitmentMode formData)
        {
            try
            {
                List<NewJoinersRecruitmentModeList> dataList = new List<NewJoinersRecruitmentModeList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RecruitmentMode", formData.RecruitmentMode);
                    para.Add("@Month", formData.Month);
                    para.Add("@Year", formData.Year);
                    para.Add("@AllocatedAutoUserId", formData.AllocatedAutoUserId);
                    const string procName = "Usp_Report_NewJoiners_RecruitmentMode";
                    connection.Open();
                    dataList = connection.Query<NewJoinersRecruitmentModeList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<FlexiAllList>> GetAllFlexiReport(SearchFlexiList formData)
        {
            try
            {
                List<FlexiAllList> dataList = new List<FlexiAllList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportHeaderId", formData.HeaderId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    //const string procName = "Usp_FlexiReportData_GetAllNew";
                    const string procName = "Usp_FlexiReportData_GetAllNew";
                    connection.Open();
                    dataList = connection.Query<FlexiAllList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FlexiListGetAllCandiate>> GetAllCandidateFlexiReport(SearchFlexCandidateiList formData)
        {
            try
            {
                List<FlexiListGetAllCandiate> dataList = new List<FlexiListGetAllCandiate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportHeaderId", formData.HeaderId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    //const string procName = "Usp_FlexiReportData_GetAllNew";
                    const string procName = "Usp_FlexiReportData_GetAllCandidateWise";
                    connection.Open();
                    dataList = connection.Query<FlexiListGetAllCandiate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<FlexiListGetAllReq>> GetAllReqFlexiReport(SearchFlexiRequisitionList formData)
        {
            try
            {
                List<FlexiListGetAllReq> dataList = new List<FlexiListGetAllReq>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportHeaderId", formData.HeaderId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    //const string procName = "Usp_FlexiReportData_GetAllNew";
                    const string procName = "Usp_FlexiReportData_GetAllReqWise";
                    connection.Open();
                    dataList = connection.Query<FlexiListGetAllReq>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Ankita
        public async Task<List<CandidateDocumentReportOutputNew>> CandidateDocumentReport(CandidateDocumentReportInput formData)
        {
            try
            {
                List<CandidateDocumentReportOutputNew> dataList = new List<CandidateDocumentReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_CandidateDocument_Status";
                    connection.Open();
                    dataList = connection.Query<CandidateDocumentReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<GetAllcandidateIndividualtabOutputNew>> GetAllcandidateIndividualtab(GetAllcandidateIndividualtabInput formData)
        {
            try
            {
                List<GetAllcandidateIndividualtabOutputNew> returnList = new List<GetAllcandidateIndividualtabOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@OnBordingMangerId", formData.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", formData.OnBordingCoordinatorId);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    const string procName = "Usp_CandidateIndividualtab_GetAll";
                    connection.Open();
                    returnList = connection.Query<GetAllcandidateIndividualtabOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<GetAllbatchtabOutputNew>> GetAllforbatchtab(GetAllbatchtabInput formData)
        {
            try
            {
                List<GetAllbatchtabOutputNew> returnList = new List<GetAllbatchtabOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@BatchNo", formData.BatchNo);
                    para.Add("@OnBordingMangerId", formData.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", formData.OnBordingCoordinatorId);
                    para.Add("@DtofJoiningFrom", formData.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", formData.DtofJoiningTo);
                    para.Add("@VerticalId", formData.VerticalId);
                    const string procName = "Usp_InductionReportBatchtab_GetAll";
                    connection.Open();
                    returnList = connection.Query<GetAllbatchtabOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CandidateInductionSheduleOutputNew> getAllInductionScheduleDetails(GetAllCandidateInductionScheduleInput formData)
        {
            try
            {
                CandidateInductionSheduleOutputNew dataList = new CandidateInductionSheduleOutputNew();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateInductionScheduleId", formData.CandidateInductionScheduleId);

                    const string procName = "Usp_CandidateInductionSchedule_GetAll_Report";
                    connection.Open();

                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);

                    dataList.CandidateInductionShedules = returnList.Read<CandidateInductionSheduOutputNewleHeader>().FirstOrDefault();
                    dataList.CandidateInductionSheduleDetails = returnList.Read<CandidateInductionSheduleOutputNewDetails>().ToList();

                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public async Task<List<BatchWiseViewCandidateDetailsOutputNew>> getAllBatchWiseCandidateDetails(BatchWiseViewCandidateDetailsInput formData)
        {
            try
            {
                List<BatchWiseViewCandidateDetailsOutputNew> returnList = new List<BatchWiseViewCandidateDetailsOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@BatchId", formData.BatchId);
                    para.Add("@OnBordingMangerId", formData.OnBordingMangerId);
                    para.Add("@OnBordingCoordinatorId", formData.OnBordingCoordinatorId);
                    para.Add("@DtofJoiningFrom", formData.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", formData.DtofJoiningTo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);

                    const string procName = "USP_BatchWiseCandidateDetails_getAllReport";
                    connection.Open();
                    returnList = connection.Query<BatchWiseViewCandidateDetailsOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ReimbursementdetailsReportOutputNew>> getAllReimbursementdetailsReport(ReimbursementdetailsReportInput formData)
        {
            try
            {
                List<ReimbursementdetailsReportOutputNew> returnList = new List<ReimbursementdetailsReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    const string procName = "Usp_ReimbursementDetailsSubmission_Report";
                    connection.Open();
                    returnList = connection.Query<ReimbursementdetailsReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InductionFeedbackDetailsOutputNew>> getAllInductionFeedbackDetails(InductionFeedbackDetailsInput formData)
        {
            try
            {
                List<InductionFeedbackDetailsOutputNew> returnList = new List<InductionFeedbackDetailsOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@JoiningType", formData.JoiningType);
                    const string procName = "Usp_InductionFeedback";
                    connection.Open();
                    returnList = connection.Query<InductionFeedbackDetailsOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public async Task<List<candidateviewfeedbackOutputNew>> getcandidatewiseviewfeedback(candidateviewfeedbackInput formData)
        {
            try
            {
                List<candidateviewfeedbackOutputNew> returnList = new List<candidateviewfeedbackOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                   para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_CandidatewiseViewfeedback";
                    connection.Open();
                    returnList = connection.Query<candidateviewfeedbackOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<ViewCandidateFeedbackReportOutputNew>> getAllViewCandidateFeedbackReport(ViewCandidateFeedbackReportInput formData)
        {
            try
            {
                List<ViewCandidateFeedbackReportOutputNew> returnList = new List<ViewCandidateFeedbackReportOutputNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@BatchId", formData.BatchId);
                   
                    const string procName = "Usp_Batchwisecandidate_feedbackReport";
                    connection.Open();
                    returnList = connection.Query<ViewCandidateFeedbackReportOutputNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //Ankita


        public async Task<List<HandHoldingReportGet>> GetAllHandholdingDataAsReport(GetHandholding formData)
        {
            try
            {
                List<HandHoldingReportGet> returnList = new List<HandHoldingReportGet>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@EmpName", formData.EmpName);
                    const string procName = "Usp_HandHoldingReportForALL";
                    connection.Open();
                    returnList = connection.Query<HandHoldingReportGet>(procName, para, commandType: CommandType.StoredProcedure,commandTimeout:int.MaxValue).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }

}
