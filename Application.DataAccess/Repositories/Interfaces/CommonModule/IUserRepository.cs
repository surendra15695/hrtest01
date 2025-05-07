using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IUserRepository
    {
        Task<List<User>> GetAllUser(SearchAllUser search);
        Task<List<User>> GetLocationwiseAllUser(SearchLocationwiseAllUser search);
        Task<List<User>> SaveUser(User search);
        Task<LoginUserStatus> GetLoginUser(LoginFormData formdata);
        Task<LoginOTPStatus> ValidateUserToSendOTP(LoginFormData formdata);
        Task<LoginUserStatus> ChangePassword(ChangePasswordData formdata);
        Task<LoginUserStatus> GetLoginUserByCosmos(LoginFormData formdata);
        Task<List<UserMenu>> GetUserMenu(SearchMenu search);
        Task<ReturnMessage> AddRoleWiseUser(RoleUserFormData formData);
        Task<ReturnMessage> DoctorsInsertUpdate(DoctorsInsertUpdateParam formData);
        Task<LoginUserStatus> GetForgotLoginUser(User formdata);
        //Task<LoginUserStatus> UpdatePassword(User formdata);
        //kuntal
        Task<EDMSLinkAuthorization> GetEMDSLinkAuthorization(EDMSLinkAuthorizationSearch formdata);       
        Task<List<EDMSAccessUsers>> GetAllEDMSAccessUsersList(EDMSAccessUserSearch search);
        Task<ReturnMessage> AddEDMSAccessForUsers(EDMSAccessUsersFormData formData);
        Task<ReturnValues> AzuretableCallOnLogInout(UserNameClass userNameClass,string eventType);
    }
}
