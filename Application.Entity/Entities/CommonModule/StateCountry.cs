using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class StateCountry
    {
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchStateCountry
    {
        public int? StateId { get; set; }
        public int? CountryId { get; set; }
        public bool? IsActive { get; set; }
    }
}

