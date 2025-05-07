using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Application.WebApp.Areas.CommonModule.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [Route("getalluser")]
        public async Task<IActionResult> GetAllUser(SearchAllUser search)
        {
            try
            {
                var response = await this.userService.GetAllUser(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getlocationwisealluser")]
        public async Task<IActionResult> GetLocationwiseAllUser(SearchLocationwiseAllUser search)
        {
            try
            {
                var response = await this.userService.GetLocationwiseAllUser(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("save")]
        public async Task<IActionResult> SaveUser(User search)
        {
            try
            {
                var response = await this.userService.SaveUser(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getloginuser")]
        public async Task<IActionResult> GetLoginUser(LoginFormData formData)
        {
            try
            {
                var response = await this.userService.GetLoginUser(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("validateusertosendotp")]
        public async Task<IActionResult> ValidateUserToSendOTP(LoginFormData formData)
        {
            try
            {
                var response = await this.userService.ValidateUserToSendOTP(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("getloginuserbycosmos")]
        public async Task<IActionResult> GetLoginUserByCosmos(LoginFormData formData)
        {
            try
            {
                var response = await this.userService.GetLoginUserByCosmos(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("changepassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordData formData)
        {
            try
            {
                var response = await this.userService.ChangePassword(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //kuntal
        [HttpPost]
        [Route("getforgotloginuser")]
        public async Task<IActionResult> GetForgotLoginUser(User formData)
        {
            try
            {
                var response = await this.userService.GetForgotLoginUser(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //[HttpPost]
        //[Route("updatePassword")]
        //public async Task<IActionResult> UpdatePassword(User formData)
        //{
        //    try
        //    {
        //        var response = await this.userService.UpdatePassword(formData).ConfigureAwait(false);

        //        return this.Ok(response);
        //    }
        //    catch (Exception ex)
        //    {
        //        return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        //    }
        //}

        [HttpPost]
        [Route("getusermenu")]
        public async Task<IActionResult> GetUserMenu(SearchMenu search)
        {
            try
            {
                var response = await this.userService.GetUserMenu(search).ConfigureAwait(false);

                var DataList = response.Select(n => new Menus
                {
                    ModuleId = n.ModuleId,
                    ModuleLevel = n.ModuleLevel,
                    ModuleName = n.ModuleName,
                    SubUrl = n.SubUrl,
                    ParentModId = n.ParentModId,
                    IconUrl=n.IconUrl,
                    SubMenu = response.Select(m => new SubMenus
                    {
                        ModuleId = m.ModuleId,
                        ModuleLevel = m.ModuleLevel,
                        ModuleName = m.ModuleName,
                        SubUrl = m.SubUrl,
                        ParentModId = m.ParentModId,
                        IconUrl=m.IconUrl
                    }).Where(data => data.ParentModId == n.ModuleId).ToList()
                }).ToList().Where(x => x.ParentModId == 0);

                return this.Ok(DataList);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addroleiseuser")]
        public async Task<IActionResult> AddRoleWiseUser(RoleUserFormData formData)
        {
            try
            {
                var response = await this.userService.AddRoleWiseUser(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("adddoctor")]
        public async Task<IActionResult> DoctorInsertUpdate(DoctorsInsertUpdateParam formdata)
        {
            try
            {
                var response = await this.userService.DoctorsInsertUpdate(formdata).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //Added By Anif on 20-07-2022 for EDMS Link Authorization

        [HttpPost]
        [Route("getedmslinkauthorization")]
        public async Task<IActionResult> GetEMDSLinkAuthorization(EDMSLinkAuthorizationSearch formData)
        {
            try
            {
                var response = await this.userService.GetEMDSLinkAuthorization(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("getalledmsaccessuserslist")]        
        public async Task<IActionResult> GetAllEDMSAccessUsersList(EDMSAccessUserSearch search)
        {
            try
            {
                var response = await this.userService.GetAllEDMSAccessUsersList(search).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("addedmsaccessforusers")]
        public async Task<IActionResult> AddEDMSAccessForUsers(EDMSAccessUsersFormData formData)
        {
            try
            {
                //EDMSAccessUsersFormData formData = new EDMSAccessUsersFormData();

                //string userWiseEDMSAccess = data["UserWiseEDMSAccess"];
                //formData.UserWiseEDMSAccess = JsonConvert.DeserializeObject<List<UserWiseEDMSAccessFormData>>(userWiseEDMSAccess);
               // formData.CreatedBy = Convert.ToInt32(data["CreatedBy"]);
                var response = await this.userService.AddEDMSAccessForUsers(formData).ConfigureAwait(false);

                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("azuretableCallOnLogInout")]
        public async Task<IActionResult> AzuretableCallOnLogInout(UserNameClass userNameClass)
        {
            try
            {
                var response = await this.userService.AzuretableCallOnLogInout(userNameClass).ConfigureAwait(false);
                return this.Ok(response);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}