using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Religion
    {
        public int ReligionId { get; set; }
        public string ReligionName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchReligion
    {
        public int? ReligionId { get; set; }
        public bool? IsActive { get; set; }
    }
}
