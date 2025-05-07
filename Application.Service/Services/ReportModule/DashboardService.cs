using Application.DataAccess.Repositories.Interfaces.DashboardRepository;
using Application.Entity.Entities.Dashboard;
using Application.Service.Services.Interfaces.DashboardService;
using Application.Service.Services.Interfaces.ReportModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.DashboardService
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository dashboardRepository;

        public DashboardService(IDashboardRepository dashboardRepository)
        {
            this.dashboardRepository = dashboardRepository;
        }

        public async Task<List<RMDashboard>> GetRMDashboard(SearchRMDashboard search)
        {
            return await this.dashboardRepository.GetRMDashboard(search);
        }

    }
}
