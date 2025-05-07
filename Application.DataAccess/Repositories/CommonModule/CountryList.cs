using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class SearchCountryList
    {
        public int? CountryId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class CountryList
    {
        public int? CountryId { get; set; }
        public string CountryName { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
}
