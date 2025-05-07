using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Department
    {
        public int DepartmentId { get; set; }
        public int FunctionId { get; set; }
        public string DepartmentName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchDepartment
    {
        public int? DepartmentId { get; set; }
        public int? FunctionId { get; set; }
        public int? VerticalId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class FunctionDepartment
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public bool IsActive { get; set; }
    }
}
