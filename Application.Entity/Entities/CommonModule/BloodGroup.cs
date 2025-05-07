using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class BloodGroup
    {
        public int BloodGroupId { get; set; }
        public string BloodGroupName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchBloodGroup
    {
        public int? BloodGroupId { get; set; }
        public bool? IsActive { get; set; }
    }
}
