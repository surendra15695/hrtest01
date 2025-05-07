using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.OfferModule
{
    public interface IManagementApprovalRepository
    {
        //Task<ManagementApproval> GetManagementApprovalData(SearchManagementApproval search);   // By Amartya on 05-08-2023
        Task<ManagementApprovalGet> GetManagementApprovalData(SearchManagementApproval search);  // By Amartya on 05-08-2023
        Task<ManagementApproval> CampusGetManagementApprovalData(SearchManagementApproval search);
        // Task<ManagementApproval> ViewManagementApprovalData(SearchManagementApproval search);   // By Amartya on 05-08-2023
        Task<ReturnMessage> InsertManagementApproval(ManagementApprovalMasterSave formdata);
        Task<ReturnMessage> CampusCandiateInsertManagementApproval(ManagementApprovalMasterSave formData);
        Task<ReturnMessage> UpdateManagementApproval(ManagementApprovalMasterUpdate formdata);
        Task<ReturnMessage> CampusCanidateUpdateManagementApproval(ManagementApprovalMasterUpdate formData);
        Task<ReturnMessage> ReuploadManagementApproval(ManagementApprovalMasterUpdate formdata);
        Task<ManagementApprovalGet> ViewManagementApprovalData(SearchManagementApproval search);   // By Amartya on 05-08-2023
        Task<ReturnMessage> InsertManagementApproval(ManagementApprovalMasterSaveNew formdata);
      
        String CloudStorageAccountname();
    }
}
