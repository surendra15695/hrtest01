using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Experience
    {
        public int ExperienceId { get; set; }
        public string ExperienceName { get; set; }
        public int FromYear { get; set; }
        public int ToYear { get; set; }
        public bool IsActive { get; set; }
    }
}
