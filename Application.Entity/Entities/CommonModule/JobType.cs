using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class JobType
    {
        public int JobTypeId { get; set; }
        public string JobTypeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchJobType
    {
        public int? JobTypeId { get; set; }
        public bool? IsActive { get; set; }
    }
}
