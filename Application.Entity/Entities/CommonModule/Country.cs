using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Country
    {
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchCountry
    {
        public int? CountryId { get; set; }
        public bool? IsActive { get; set; }
    }
}
