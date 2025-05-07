using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.DashboardRepository;
using Application.Entity.Entities.Dashboard;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.DashboardRepository
{
    public class DashboardRepository : DatabaseContext, IDashboardRepository
    {
        public DashboardRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<RMDashboard>> GetRMDashboard(SearchRMDashboard search)
        {
            try
            {
                List<RMDashboard> returnList = new List<RMDashboard>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@DayCount", search.DayCount);
                    const string procName = "Usp_Report_DashboardRM";
                    connection.Open();
                    returnList = connection.Query<RMDashboard>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
