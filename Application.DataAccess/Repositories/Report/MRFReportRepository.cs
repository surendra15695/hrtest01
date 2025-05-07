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

namespace Application.DataAccess.Repositories.ReportModule
{
    //Piu Biswas
    public class MRFReportRepository : DatabaseContext, IMRFReportRepository
    {
        public MRFReportRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<NoticePeriodNew>> GetNoticePeriod(SearchNoticePeriod search)
        {
            try
            {
                List<NoticePeriodNew> returnList = new List<NoticePeriodNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_Report_NoticePeriod";
                    connection.Open();
                    returnList = connection.Query<NoticePeriodNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CandidateDetailsInput>> candidateDetailsforMaster(SearchCandidateDetails formData)
        {
            try
            {
                List<CandidateDetailsInput> dataList = new List<CandidateDetailsInput>();
                using (IDbConnection connection = base.GetConnection())
                {                                            
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@EmpNo", formData.EmpNo);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@SourceChannelId", formData.SourceChannelId);
                    para.Add("@ToAge", formData.ToAge);
                    para.Add("@FromAge", formData.FromAge);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@ContactNo", formData.ContactNo);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@GenderId", formData.GenderId);
                    para.Add("@InterviewStatus", formData.InterviewStatus);
                    para.Add("@HiringStatusIds", formData.HiringStatusIds);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@University", formData.University);
                    para.Add("@QulificationUniversityBoardId", formData.QulificationUniversityBoardId);
                    para.Add("@MotherTongueIds", formData.MotherTongueIds);
                    para.Add("@CommunicationState", formData.CommunicationState);
                    para.Add("@PermanentNativeState", formData.PermanentNativeState);
                    para.Add("@QualificationTypeIds", formData.QualificationTypeIds);
                    para.Add("@CandidateBVGReportId", formData.CandidateBVGReportId);
                    para.Add("@LanguageKnownIds", formData.LanguageKnownIds);
                    para.Add("@QualificationName", formData.QualificationName);
                    para.Add("@CourseIds", formData.CourseIds);
                    para.Add("@Instutation", formData.Instutation);
                    para.Add("@CompletionYears", formData.CompletionYears);
                    para.Add("@StreamIds", formData.StreamIds);
                    para.Add("@CronicMajorIllnessId", formData.CronicMajorIllnessId);
                    para.Add("@HandiCapId", formData.HandiCapId);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@BloodGroup", formData.BloodGroup);
                    para.Add("@MRFRelativeStatus", formData.MRFRelativeStatus);
                    para.Add("@SpouseOccupation", formData.SpouseOccupation);
                    para.Add("@NoOfSibilings", formData.NoOfSibilings);
                    para.Add("@HomeTown", formData.HomeTown);
                    para.Add("@DocumentStatus", formData.DocumentStatus);
                    para.Add("@FatherOccupation", formData.FatherOccupation);
                    para.Add("@FromPercentage", formData.FromPercentage);
                    para.Add("@ToPercentage", formData.ToPercentage);
                    para.Add("@pagesize", formData.pagesize);
                    para.Add("@pagenumber", formData.pagenumber);
                    const string procName = "Usp_CandidateMasterReport_GetAll";
                    connection.Open();
                    dataList = connection.Query<CandidateDetailsInput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //mas


        public async Task<List<NoticePeriodSavingCost>> GetNoticePeriodSavingCost(SearchNoticePeriodSavingCost search)
        {
            try
            {
                List<NoticePeriodSavingCost> returnList = new List<NoticePeriodSavingCost>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_Report_NoticePeriodCostSaving";
                    connection.Open();
                    returnList = connection.Query<NoticePeriodSavingCost>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<RelocationReportNew>> GetRelocation(SearchRelocationReport search)
        {
            try
            {
                List<RelocationReportNew> returnList = new List<RelocationReportNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_Report_Relocation";
                    connection.Open();
                    returnList = connection.Query<RelocationReportNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public async Task<List<TravelReimbursementReportNew>> GetTravelReimbursement(SearchTravelReimbursementReport search)
        {
            try
            {
                List<TravelReimbursementReportNew> returnList = new List<TravelReimbursementReportNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@ClaimStatusId", search.ClaimStatusId);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_Report_TravelReimbursement";
                    connection.Open();
                    returnList = connection.Query<TravelReimbursementReportNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public async Task<List<HROpsResignation>> GetHROpsResignation(SearchHROpsResignation search)
        {
            try
            {
                List<HROpsResignation> returnList = new List<HROpsResignation>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    const string procName = "Usp_Report_HROpsResignation";
                    connection.Open();
                    returnList = connection.Query<HROpsResignation>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public async Task<List<VendorCandidateReportNew>> GetVendorCandidateReport(SearchVendorCandidateReport search)
        {
            try
            {
                List<VendorCandidateReportNew> returnList = new List<VendorCandidateReportNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    const string procName = "Usp_Report_VendorCandidate";
                    connection.Open();
                    returnList = connection.Query<VendorCandidateReportNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<DocumentStatusNew>> GetDocumentStatus(SearchDocumentStatus search)
        {
            try
            {
                List<DocumentStatusNew> returnList = new List<DocumentStatusNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    //para.Add("@RMDocApprovalStatusId", search.RMDocApprovalStatusId);
                    para.Add("@OMDocApprovalStatusId", search.OMDocApprovalStatusId);
                    const string procName = "Usp_Report_DocumentStatus";
                    connection.Open();
                    returnList = connection.Query<DocumentStatusNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<InterviewCalenderNEW>> GetInterviewCalender(SearchInterviewCalender search)
        {
            try
            {
                List<InterviewCalenderNEW> returnList = new List<InterviewCalenderNEW>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VenueId", search.VenueId);
                    para.Add("@InterviewTypeId", search.InterviewTypeId);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_Report_InterviewCalendar";
                    connection.Open();
                    returnList = connection.Query<InterviewCalenderNEW>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<EmployeeSalary>> GetEmployeeSalary(SearchEmployeeSalary search)
        {
            try
            {
                List<EmployeeSalary> returnList = new List<EmployeeSalary>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@AllocatedAutoUserId", search.AllocatedAutoUserId);
                    const string procName = "Usp_Report_EmployeeSalary";
                    connection.Open();
                    returnList = connection.Query<EmployeeSalary>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //Arnab
        public async Task<List<RecruitmentCostSavingOutput>> RecruitmentCostSavingReport(RecruitmentCostSavingInput formData)
        {
            try
            {
                List<RecruitmentCostSavingOutput> returnList = new List<RecruitmentCostSavingOutput>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", formData.CandidateNo);
                    para.Add("@EmployeeNo", formData.EmployeeNo);
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@CandidateName", formData.CandidateName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate ", formData.ToDate);

                    const string procName = "Usp_RecruitmentCostSavingList_GetAll";
                    connection.Open();
                    returnList = connection.Query<RecruitmentCostSavingOutput>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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

