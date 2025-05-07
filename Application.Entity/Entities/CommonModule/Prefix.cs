using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Prefix
    {
        public int PrefixId { get; set; }
        public string PrefixName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchPrefix
    {
        public int? PrefixId { get; set; }
        public bool? IsActive { get; set; }
    }
}
