using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Function
    {
        public int FunctionId { get; set; }
        public int VerticalId { get; set; }
        public string FunctionName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class CampusFunction
    {
        public int FunctionId { get; set; }
        public int VerticalId { get; set; }
        public string FunctionName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchFunction
    {
        public int? FunctionId { get; set; }
        public int? VerticalId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CandaiteSearchFunction
    {
        public int? FunctionId { get; set; }
        public string VerticalId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class VerticalFunction
    {
        public int FunctionId { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public bool IsActive { get; set; }
    }

    public class CampusVerticalFunction
    {
        public int FunctionId { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string FunctionName { get; set; }
        public bool IsActive { get; set; }
    }

    public class VerticalFunctionDepartmentHead{
        public long AutoUserId{get;set;}
        public int VerticalId{get;set;}
        public string VerticalName{get;set;}
        public int FunctionId{get;set;}
        public string FunctionName{get;set;}
        public int DepartmentId{get;set;}
        public string DepartmentName{get;set;}
    }

    public class SearchVerticalFunctionDepartmentHead{
        public long AutoUserId{get;set;}
    }


    public class FunctionDepartmentHead
    {
        public long AutoId { get; set; }
        public long VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long FunctionId { get; set; }
        public string FunctionName { get; set; }
        public long DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public long ApproverautoUserId { get; set; }
        public string EmployeeName { get; set; }
        public long CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchFunctionDepartmentHead
    {
        public long? AutoId { get; set; }
        public long? VerticalId { get; set; }
        public long? FunctionId { get; set; }
        public long? DepartmentId { get; set; }
        public long? ApproverautoUserId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SearchLocationFunction
    {
        public int ? FunctionId { get; set; }
        public int ? LocationId { get; set; } 
        public int ? IsActive { get; set; } 
    }
    public class LocationFunctionList
    {
       public int FunctionId { get; set; }  
       public string FunctionName { get; set; }  
       public int LocationId { get; set; } 
       public int IsActive { get; set; }
    }

    public class SearchVerticalFunctionHiringManager
    {
        public int ? HiringManagerFunctionId { get; set; }
        public int? VerticalId { get; set; }
        public int?  FunctionId { get; set; }
        public int? HiringManagerAutoUserId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class VerticalFunctionHiringManager
    {
        public int HiringManagerFunctionId { get; set; }   
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }     
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int HiringManagerAutoUserId { get; set; }
        public string HiringManagerName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SaveVerticalFunctionHiringManager
    {
        public int  HiringManagerFunctionId { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int HiringManagerAutoUserId { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
}
