using Application.Entity.Entities.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.DashboardRepository
{
    public interface IDashboardRepository
    {
        Task<List<RMDashboard>> GetRMDashboard(SearchRMDashboard search);
    }
}
