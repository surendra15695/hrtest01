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
    public class DepartmentRepository : DatabaseContext, IDepartmentRepository
    {
        public DepartmentRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<FunctionDepartment>> GetAllFunctionDepartment(SearchDepartment search)
        {
            try
            {
                List<FunctionDepartment> returnList = new List<FunctionDepartment>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Department_GetAll";
                    connection.Open();
                    returnList = connection.Query<FunctionDepartment>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> DepartmentInsertUpdate(Department formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@DepartmentName", formData.DepartmentName);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Department_InsertUpdate";
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
