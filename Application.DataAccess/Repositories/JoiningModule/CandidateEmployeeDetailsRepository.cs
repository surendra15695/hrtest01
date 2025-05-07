using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.JoiningModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.JoiningModule
{
    public class CandidateEmployeeDetailsRepository : DatabaseContext, ICandidateEmployeeDetailsRepository
    {
        public CandidateEmployeeDetailsRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }

        public async Task<List<CandidateEmployee>> GetCandidateEmployeeListAll(CandidateEmployeeSearch search)
        {
            try
            {
                List<CandidateEmployee> returnList = new List<CandidateEmployee>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@EmployeeNo", search.EmployeeNo);
                    para.Add("@RequisitionNo", search.RequisitionNo);
                    para.Add("@Source", search.Source);
                    para.Add("@Name", search.Name);
                    para.Add("@HiringStatus", search.HiringStatus);
                    para.Add("@EmployeeStatus", search.EmployeeStatus);
                    para.Add("@DtofJoiningFrom", search.DtofJoiningFrom);
                    para.Add("@DtofJoiningTo", search.DtofJoiningTo);
                    const string procName = "Usp_CandidateListEmployeeList_GetAll";
                    connection.Open();
                    returnList = connection.Query<CandidateEmployee>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveNoticePeriodBuyOutEnable(CandidateNoticePeriodBuyOutEnableSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateNoticePeriodBuyOutEnable_Insert";
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
        public async Task<ReturnMessage> SaveNoticeperiodbuyoutDisable(CandidateNoticePeriodBuyOutEnableSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateNoticePeriodBuyOutDisable";
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

        public async Task<ReturnMessage> SaveRelocationReimbursementEnable(CandidateRelocationReimbursementEnableSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateReallocationReimbursementEnable_Insert";
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
        public async Task<ReturnMessage> SaveRelocationReimbursementDisable(CandidateRelocationReimbursementEnableSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CandidateReallocationReimbursementDisable";
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
