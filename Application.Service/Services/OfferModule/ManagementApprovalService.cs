using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using Application.Service.Services.Interfaces.OfferModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Application.Service.Services.OfferModule
{
    public class ManagementApprovalService : IManagementApprovalService
    {
        private readonly IManagementApprovalRepository ManagementApprovalRepository;

        public ManagementApprovalService(IManagementApprovalRepository ManagementApproval)
        {
            this.ManagementApprovalRepository = ManagementApproval;
        }

        //public async Task<ManagementApproval> GetManagementApprovalData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        //{
        //    return await this.ManagementApprovalRepository.GetManagementApprovalData(search);
        //}

        public async Task<ManagementApprovalGet> GetManagementApprovalData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        {
            return await this.ManagementApprovalRepository.GetManagementApprovalData(search);
        }

        //public async Task<ManagementApproval> ViewManagementApprovalData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        //{
        //    return await this.ManagementApprovalRepository.ViewManagementApprovalData(search);
        //}


        public async Task<ManagementApproval> CampusGetManagementApprovalData(SearchManagementApproval search)
        {
            return await this.ManagementApprovalRepository.CampusGetManagementApprovalData(search);
        }
        public async Task<ReturnMessage> InsertManagementApproval(ManagementApprovalMasterSave formdata)
        {
            return await this.ManagementApprovalRepository.InsertManagementApproval(formdata);
        }

        public async Task<ReturnMessage> CampusCandiateInsertManagementApproval(ManagementApprovalMasterSave formdata)
        {
            return await this.ManagementApprovalRepository.CampusCandiateInsertManagementApproval(formdata);
        }

        public async Task<ReturnMessage> UpdateManagementApproval(ManagementApprovalMasterUpdate formdata)
        {
            return await this.ManagementApprovalRepository.UpdateManagementApproval(formdata);
        }

        public async Task<ReturnMessage> CampusCanidateUpdateManagementApproval(ManagementApprovalMasterUpdate formdata)
        {
            return await this.ManagementApprovalRepository.CampusCanidateUpdateManagementApproval(formdata);
        }


        public async Task<ReturnMessage> ReuploadManagementApproval(ManagementApprovalMasterUpdate formdata)
        {
            return await this.ManagementApprovalRepository.ReuploadManagementApproval(formdata);
        }

        public async Task<ManagementApprovalGet> ViewManagementApprovalData(SearchManagementApproval search)   // By Amartya on 05-08-2023
        {
            return await this.ManagementApprovalRepository.ViewManagementApprovalData(search);
        }
        public async Task<ReturnMessage> InsertManagementApproval(ManagementApprovalMasterSaveNew formdata)
        {
            return await this.ManagementApprovalRepository.InsertManagementApproval(formdata);
        }
        public string CloudStorageAccountname()
        {
            return this.ManagementApprovalRepository.CloudStorageAccountname();
        }
    }
}
