using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Industry
    {
        public int IndustryId { get; set; }
        public string IndustryName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchIndustry
    {
        public int? IndustryId { get; set; }
        public bool? IsActive { get; set; }
    }
}
