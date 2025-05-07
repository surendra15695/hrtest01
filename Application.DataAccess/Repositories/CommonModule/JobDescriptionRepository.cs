using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class JobDescriptionRepository : DatabaseContext, IJobDescriptionRepository
    {
        public JobDescriptionRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<JobDescription>> GetAllJobDescription(SearchJobDescription search)
        {
            try
            {
                List<JobDescription> returnList = new List<JobDescription>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@JobDescriptionId", search.JobDescriptionId);
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@LoggedInUserId", search.CreatedBy);
                    const string procName = "Usp_JobDescription_GetAll";
                    connection.Open();
                    returnList = connection.Query<JobDescription>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<JobDescription>> GetAllFuncJobDescription(SearchJobFuncDescription search)
        {
            try
            {
                List<JobDescription> returnList = new List<JobDescription>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@JobDescriptionId", search.JobDescriptionId);
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_JobDescriptionFunc_GetAll";
                    connection.Open();
                    returnList = connection.Query<JobDescription>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveJobDescription(JobDescriptionDetailFormData param)
        {
            try
            {

                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@JobDescriptionId", param.JobDescriptionId);
                    para.Add("@JobDescriptionName", param.JobDescriptionName);
                    para.Add("@VerticalId", param.VerticalId);
                    para.Add("@LocationId", param.LocationId);
                    para.Add("@FunctionId", param.FunctionId);
                    para.Add("@DepartmentId", param.DepartmentId);
                    para.Add("@PositionId", param.PositionId);
                    para.Add("@GradeId", param.GradeId);
                    para.Add("@ReportsTo", param.ReportsTo);
                    para.Add("@NoOfReportees", param.NoOfReportees);
                    para.Add("@IndustryId", param.IndustryId);
                    para.Add("@ExperienceId", param.ExperienceId);
                    para.Add("@AgeId", param.AgeId);
                    para.Add("@QualificationId", param.QualificationId);
                    para.Add("@CourseId", param.CourseId);
                    para.Add("@StreamId", param.StreamId);
                    para.Add("@LanguageId", param.LanguageId);
                    para.Add("@AnyOtherLanguage", param.AnyOtherLanguage);
                    para.Add("@JobPurpose", param.JobPurpose);
                    para.Add("@JobSummary", param.JobSummary);
                    para.Add("@KPIs", param.KPIs);
                    para.Add("@Dimensions", param.Dimensions);
                    para.Add("@Knowledge", param.Knowledge);
                    para.Add("@Skills", param.Skills);
                    para.Add("@ExternalStakeHolders", param.ExternalStakeHolders);
                    para.Add("@InternalStakeHolders", param.InternalStakeHolders);
                    para.Add("@RestrictedJD", param.RestrictedJD);
                    para.Add("@JDDocument", param.JDDocument);
                    para.Add("@IsActive", param.IsActive);
                    para.Add("@CreatedBy", param.CreatedBy);
                    para.Add("@IsEnabled", param.IsEnabled);
                    const string procName = "Usp_JobDescription_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<JobDescriptionDetailFormData>> GetAllJobDescriptionDetails(SearchJobDescription search)
        {
            try
            {
                List<JobDescriptionDetailFormData> returnList = new List<JobDescriptionDetailFormData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@JobDescriptionId", search.JobDescriptionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_JobDescriptionDetails_GetAll";
                    connection.Open();
                    returnList = connection.Query<JobDescriptionDetailFormData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
