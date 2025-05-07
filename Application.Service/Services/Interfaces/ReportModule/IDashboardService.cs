using Application.Entity.Entities.Dashboard;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.DashboardService
{
    public interface IDashboardService
    {
        Task<List<RMDashboard>> GetRMDashboard(SearchRMDashboard search);
    }
}
