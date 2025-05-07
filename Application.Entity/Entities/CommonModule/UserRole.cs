using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class UserRole
    {
        public int AutoUserId { get; set; }
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public string EmployeeName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Roledescription { get; set; }
        public string AssignedRole { get; set; }
        public string AssignedRoleName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
    public class UserRoleForHandHold
    {
        public int AutoUserId { get; set; }
        public int UserRoleId { get; set; }
        public int UserId { get; set; }
        public string EmployeeName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public string Roledescription { get; set; }
        public string AssignedRole { get; set; }
        public string AssignedRoleName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int VerticalId { get; set; }
    }

    public class UserwiseRole
    {
        public int AutoUserId { get; set; }  
        public int EmpNo { get; set; }
        public string EmployeeName { get; set; }
        public string AssignedRole { get; set; }
        public string AssignedRoleName { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }   //arghya on 22.08.2022

    }
    public class UserRoleSave
    {
        public int AutoUserId { get; set; }
        public string RoleId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchUserRole
    {
        public int? AutoUserId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
    }

    public class RoleWiseUser
    {
        public int UserRoleId { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int AutoUserId { get; set; }
        public string EmployeeName { get; set; }
        public int CreatedBy { get; set; }
        public string EmpEmailId { get; set; }//Piu
    }

    public class RoleLocationWiseUser
    {
        public int UserRoleId { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int AutoUserId { get; set; }
        public string EmployeeName { get; set; }
        public int CreatedBy { get; set; }
        public string EmpEmailId { get; set; }//Piu
    }

    public class SearchRoleWiseUser
    {
        public int? RoleId { get; set; }
    }
    public class SearchTicByLocation
    {
        public int? locationId { get; set; }
    }
    public class searchRoleLocationWiseUser
    {
        public int? RoleId { get; set; }
        public int ? AutoUserId { get; set; }
    }

    public class GetTicByLocationData
    {
        public int? RoleId { get; set; }
        public int? AutoUserId { get; set; }
        public int? InductionVenueId { get; set; }
        public string? EmployeeName { get; set; }
        public bool? IsActive { get; set; }
        public bool ? IsExternal { get; set; }

    }
    public class SearchEmployee
    {
        public string EmployeeNo { get; set; }
        public string RoleIds { get; set; }
        public int AutoUserId { get; set; }
    }

    public class EmployeeDetails
    {
        public int? EmpId { get; set; }
        public string EmpNo { get; set; }

        public string EmployeeName { get; set; }
    }

    public class InsertUpdateSignatureData
    {
        public int? SignatureId { get; set; }
        public int? EmployeeId { get; set; }
        public string EmployeeNo { get; set; }
        public string EmployeeName { get; set; }
        public string Filename { get; set; }
        public bool IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class SearchEmployeeForSign
    {
        public string EmployeeId { get; set; }
        public string RoleIds { get; set; }
        public int AutoUserId { get; set; }
    }

}
