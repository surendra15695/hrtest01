using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.EmployeeModule;
using Application.DataAccess.Repositories.Interfaces.PreselectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.EmployeeModule;
using Application.Entity.Entities.PreselectionModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.EmployeeModule
{
    public class EmployeeRepository : DatabaseContext, IEmployeeRepository
    {
        public EmployeeRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<EmployeeReplacementList>> GetEmployeeReplacementList(SearchEmployeeReplacement search)
        {
            try
            {
                List<EmployeeReplacementList> returnList = new List<EmployeeReplacementList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmpNo", search.EmpNo);
                    para.Add("@EmpId", search.EmpId);
                    const string procName = "Usp_EmployeeReplace_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmployeeReplacementList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
