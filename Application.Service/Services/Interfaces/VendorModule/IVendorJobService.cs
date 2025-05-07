using Application.Entity.Entities.VendorModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.VendorModule
{
    public interface IVendorJobService
    {
        Task<List<CurrentJob>> GetCurrentJob(SearchCurrentJob search);
        Task<List<VendorJobList>> GetVendorJobList(SearchVendorJobList search);
        Task<List<VendorJobList>> GetArchivedJobList(SearchVendorJobList search);
    }
}
