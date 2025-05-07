using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class User
    {
        public int AutoUserId { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string SaltKey { get; set; }
        public string RoleIds { get; set; }
        public string RoleNames { get; set; }
        public string EmailId { get; set; }
        public string ContactNo { get; set; }
        public bool IsActive { get; set; }
        public long MapId { get; set; }
        public string VerticalIds {get; set;}
        public string Designation{get;set;}
        public long CandidateId { get; set; }
        // Added By Anif on 04-08-2022
        public bool IsForcedPasswordchange { get; set; }
    }

    public class SearchAllUser
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int? RoleId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SearchLocationwiseAllUser
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public int? RoleId { get; set; }
        public bool? IsActive { get; set; }
        public int AutoUserId { get; set; }
    }
    public class LoginFormData
    {
        public string UserId { get; set; }
        public string Password { get; set; }
    }
    public class ChangePasswordData
    {
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string CnfNewPassword { get; set; }
        public string UserId { get; set; }

    }

    public class LoginUserStatus
    {
        public int Status { get; set; }
        public User LoginUser { get; set; }
    }
    public class LoginOTPStatus
    {
        public int Status { get; set; }
        public OTPDetails UserOTP { get; set; }
    }

    public class OTPDetails
    {
        public int OTP { get; set;}
        public string UserEmail { get; set; }
        public string UserEmailName { get; set; }
        public string Password { get; set; }
        public string SaltKey { get; set; } 
        public bool IsActive {  get; set; }
        public int SuccessFlag { get; set; }
        public int IsOTPRequired { get; set; }
    }

    public class UserMenu
    {
        public int ModuleId { get; set; }
        public int ModuleLevel { get; set; }
        public string ModuleName { get; set; }
        public string SubUrl { get; set; }
        public string SortOrder { get; set; }
        public int ParentModId { get; set; }
        public string IconUrl { get; set; }
        public int SubModuleCount { get; set; }
    }

    public class SearchMenu
    {
        public long AutoUserId { get; set; }
    }

    public class Menus
    {
        public int ModuleId { get; set; }
        public int ModuleLevel { get; set; }
        public string ModuleName { get; set; }
        public string SubUrl { get; set; }
        public int ParentModId { get; set; }
        public string IconUrl { get; set; }
        public List<SubMenus> SubMenu { get; set; }
    }

    public class SubMenus
    {
        public int ModuleId { get; set; }
        public int ModuleLevel { get; set; }
        public string ModuleName { get; set; }
        public string SubUrl { get; set; }
        public int ParentModId { get; set; }
        public string IconUrl { get; set; }
    }

    public class RoleUserFormData
    {
        public string AutoUserId { get; set; }
        public int RoleId { get; set; }
        public int CreatedBy { get; set; }
    }

    // Added By Anif for EDMS Link Authorization

    public class EDMSLinkAuthorizationSearch
    {
        public int ? AutoUserId { get; set; }
    }
    public class EDMSLinkAuthorization
    {
        public string VerticalId { get; set; }
        public int RoleId { get; set; }
        public bool IsEDMSAccess { get; set; }
    }
    public class EDMSAccessUserSearch
    {
        public string VerticalId { get; set; }
    }
    public class EDMSAccessUsers
    {
        public int Id { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public long AutoUserId { get; set; }
        public bool IsEDMSAccess { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string VerticalIds { get; set; }
        public string FunctionIds { get; set; }
        public string LocationIds { get; set; }
        public string GradeIds { get; set; }
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public bool IsChange { get; set; }
    }

    //Id:0,
    //  RoleId: [null, Validators.required],
    //  AutoUserId: [null, Validators.required],
    //  VerticalId: [null, Validators.required],
    //  FunctionId: [null, Validators.required],
    //  GradeId: [null, Validators.required],
    //  CanAccess: true,
    //  CreatedBy: this.createdBy
    public class EDMSAccessUsersFormData
    {
        public long Id { get; set; }
        public int RoleId { get; set; }
        public long AutoUserId { get; set; }
        public string VerticalId { get; set; }
        public string FunctionId { get; set; }
        public string GradeId { get; set; }
        public bool CanAccess { get; set; }
        // public List<UserWiseEDMSAccessFormData> UserWiseEDMSAccess { get; set; }
        public int CreatedBy { get; set; }
        public List<UDT_UserWiseRoleVerticalFunctionDetails> VerticalFunctionDetails { get; set; }
        public List<UDT_UserWiseRoleFunctionLocationDetails> FunctionLocationDetails { get; set; }
    }
    public class UDT_UserWiseRoleFunctionLocationDetails
    {
        public int? FunctionId { get; set; }
        public int? LocationId { get; set; }
    }
    public class UserWiseEDMSAccessFormData
    {
        public int VerticalId { get; set; }
        public int RoleId { get; set; }
        public int AutoUserId { get; set; }
        public bool IsEDMSAccess { get; set; }
    }

    public class UserNameClass
    {
        public string UserName { get; set; }
    }
    public class ReturnValues
    {
        public bool IsSuccessStatusCode { get; set; }
    }
}
