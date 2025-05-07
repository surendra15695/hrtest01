using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Vertical
    {
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public bool IsActive { get; set; }
    }
    public class CampusVertical
    {
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchVertical
    {
        public int? VerticalId { get; set; }
        public string VerticalName { get; set; }
        public bool? IsActive { get; set; }
    }

    public class VerticalRM
    {
        public long AutoId { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long AutoUserId { get; set; }
        public string EmpName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class VerticalRMSave
    {
        public int VerticalId { get; set; }
        public String AutoUserId { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchVerticalRM
    {
        public int? VerticalId { get; set; }
        public long? AutoUserId { get; set; }
    }

    public class VerticalHiringManager
    {
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public long AutoUserId { get; set; }
        public string EmpName { get; set; }
    }

    public class SearchVerticalHiringManager
    {
        public int? VerticalId { get; set; }
        public int? RoleId { get; set; }
        public long? AutoUserId { get; set; }
    }
    public class SearchVerticalFunctHiringManager
    {
        public int? VerticalId { get; set; }
        public int? RoleId { get; set; }
        public long? AutoUserId { get; set; }
        public long? FunctionId { get; set; }
    }
}
