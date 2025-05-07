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
    public class SalaryRepository : DatabaseContext, ISalaryRepository
    {
        public SalaryRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Salary>> GetAllSalary(SearchSalary search)
        {
            try
            {
                List<Salary> returnList = new List<Salary>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryId", search.SalaryId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Salary_GetAll";
                    connection.Open();
                    returnList = connection.Query<Salary>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> InsertUpdateSalaryMaster(InsUpSalary param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryId", param.SalaryId);
                    para.Add("@SalaryName", param.SalaryName);
                    para.Add("@FromSalary", param.FromSalary);
                    para.Add("@ToSalary", param.ToSalary);
                    para.Add("@IsActive", param.IsActive);
                    para.Add("@CreatedBy", param.CreatedBy);
                    const string procName = "Usp_M_Salary_Insertupdate";
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
