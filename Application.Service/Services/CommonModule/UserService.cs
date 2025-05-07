using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class UserService : IUserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public async Task<List<User>> SaveUser(User search)
        {
            return await this.userRepository.SaveUser(search);
        }
        public async Task<List<User>> GetAllUser(SearchAllUser search)
        {
            return await this.userRepository.GetAllUser(search);
        }
        public async Task<List<User>> GetLocationwiseAllUser(SearchLocationwiseAllUser search)
        {
            return await this.userRepository.GetLocationwiseAllUser(search);
        }
        public async Task<LoginUserStatus> GetLoginUser(LoginFormData formData)
        {
            return await this.userRepository.GetLoginUser(formData);
        }
        public async Task<LoginOTPStatus> ValidateUserToSendOTP(LoginFormData formData)
        {
            return await this.userRepository.ValidateUserToSendOTP(formData);
        }
        public async Task<LoginUserStatus> GetLoginUserByCosmos(LoginFormData formData)
        {
            return await this.userRepository.GetLoginUserByCosmos(formData);
        }
        public async Task<LoginUserStatus> ChangePassword(ChangePasswordData formData)
        {
            return await this.userRepository.ChangePassword(formData);
        }
        public async Task<List<UserMenu>> GetUserMenu(SearchMenu formData)
        {
            return await this.userRepository.GetUserMenu(formData);
        }

        public async Task<ReturnMessage> AddRoleWiseUser(RoleUserFormData formData)
        {
            return await this.userRepository.AddRoleWiseUser(formData);
        }

        public async Task<ReturnMessage> DoctorsInsertUpdate(DoctorsInsertUpdateParam formData)
        {
            return await this.userRepository.DoctorsInsertUpdate(formData);
        }
        //kuntal
        public async Task<LoginUserStatus> GetForgotLoginUser(User formData)
        {
            return await this.userRepository.GetForgotLoginUser(formData);
        }
        //public async Task<LoginUserStatus> UpdatePassword(User formData)
        //{
        //    return await this.userRepository.UpdatePassword(formData);
        //}
        public async Task<EDMSLinkAuthorization> GetEMDSLinkAuthorization(EDMSLinkAuthorizationSearch formData)
        {
            return await this.userRepository.GetEMDSLinkAuthorization(formData);
        }
        public async Task<List<EDMSAccessUsers>> GetAllEDMSAccessUsersList(EDMSAccessUserSearch search)
        {
            return await this.userRepository.GetAllEDMSAccessUsersList(search);
        }
        public async Task<ReturnMessage> AddEDMSAccessForUsers(EDMSAccessUsersFormData formData)
        {
            return await this.userRepository.AddEDMSAccessForUsers(formData);
        }
        public Task<ReturnValues> AzuretableCallOnLogInout(UserNameClass userNameClass)
        {
            return this.userRepository.AzuretableCallOnLogInout(userNameClass,"LogOut");
        }
    }
}
