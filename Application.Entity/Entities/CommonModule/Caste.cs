using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Caste
    {
        public int CasteId { get; set; }
        public string CasteName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchCaste
    {
        public int? CasteId { get; set; }
        public bool? IsActive { get; set; }
    }
}
