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
    public class JobTypeRepository : DatabaseContext, IJobTypeRepository
    {
        public JobTypeRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<JobType>> GetAllJobType(SearchJobType search)
        {
            try
            {
                List<JobType> returnList = new List<JobType>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@JobTypeId", search.JobTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_JobType_GetAll";
                    connection.Open();
                    returnList = connection.Query<JobType>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> JobTypeInsertUpdate(JobType formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@JobTypeId", formData.JobTypeId);
                    para.Add("@JobTypeName", formData.JobTypeName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_JobType_InsertUpdate";
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
    }
}
