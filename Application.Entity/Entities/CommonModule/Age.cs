using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Age
    {
        public int AgeId { get; set; }
        public string AgeName { get; set; }
        public int FromAge { get; set; }
        public int ToAge { get; set; }
        public bool IsActive { get; set; }
    }
}
