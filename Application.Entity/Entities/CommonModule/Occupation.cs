using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Occupation
    {
        public int OccupationId { get; set; }
        public string OccupationName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchOccupation
    {
        public int? OccupationId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class FatherOccupation
    {
        public int OccupationId { get; set; }
        public string OccupationName { get; set; }
       
    }
    public class SearchFatherOccupation
    {
        public int? OccupationId { get; set; }
        
    }
}
