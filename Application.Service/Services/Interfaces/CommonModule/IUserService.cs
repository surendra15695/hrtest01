using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IUserService
    {
        Task<List<User>> GetAllUser(SearchAllUser search);
        Task<List<User>> GetLocationwiseAllUser(SearchLocationwiseAllUser search);
        Task<LoginUserStatus> GetLoginUser(LoginFormData formData);
        Task<LoginOTPStatus> ValidateUserToSendOTP(LoginFormData formData);
        Task<LoginUserStatus> ChangePassword(ChangePasswordData formData);
        Task<List<User>> SaveUser(User search);
        Task<List<UserMenu>> GetUserMenu(SearchMenu formData);
        Task<ReturnMessage> AddRoleWiseUser(RoleUserFormData formData);
        Task<ReturnMessage> DoctorsInsertUpdate(DoctorsInsertUpdateParam formData);
        //by kuntal
        Task<LoginUserStatus> GetForgotLoginUser(User formData);
        //Task<LoginUserStatus> UpdatePassword(User formData);
        Task<EDMSLinkAuthorization> GetEMDSLinkAuthorization(EDMSLinkAuthorizationSearch formData);        
        Task<List<EDMSAccessUsers>> GetAllEDMSAccessUsersList(EDMSAccessUserSearch search);
        Task<ReturnMessage> AddEDMSAccessForUsers(EDMSAccessUsersFormData formData);
        Task<ReturnValues> AzuretableCallOnLogInout(UserNameClass userNameClass);
        Task<LoginUserStatus> GetLoginUserByCosmos(LoginFormData formdata);
    }
}
