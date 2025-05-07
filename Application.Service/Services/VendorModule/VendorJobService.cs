using Application.DataAccess.Repositories.Interfaces.VendorModule;
using Application.Entity.Entities.VendorModule;
using Application.Service.Services.Interfaces.VendorModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.VendorModule
{
    public class VendorJobService: IVendorJobService
    {
        private readonly IVendorJobRepository vendorJobRepository;

        public VendorJobService(IVendorJobRepository vendorJobRepository)
        {
            this.vendorJobRepository = vendorJobRepository;
        }
        public async Task<List<CurrentJob>> GetCurrentJob(SearchCurrentJob search)
        {
            return await this.vendorJobRepository.GetCurrentJob(search);
        }

        public async Task<List<VendorJobList>> GetVendorJobList(SearchVendorJobList search)
        {
            return await this.vendorJobRepository.GetVendorJobList(search);
        }
        public async Task<List<VendorJobList>> GetArchivedJobList(SearchVendorJobList search)
        {
            return await this.vendorJobRepository.GetArchivedJobList(search);
        }
    }
}
