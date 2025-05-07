using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
   public class State
    {
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public bool IsActive { get; set; }
    }

    public class StateFormData
    {
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int CountryId { get; set; }
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchState
    {
        public int StateId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SearchStateByCountry
    {
        public int CountryId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class CountryStateLocationMapping
    {

        public int MapId { get; set; }
        public int StateId { get; set; }
        public int LocationId { get; set; }
        public int CountryId { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class CountryStateLocationMappingGet
    {
        public int MapId { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public bool? IsActive { get; set; }
        public int CreatedBy { get; set; }

    }
    public class CountryStateLocationMappingGetFormData
    {
        public bool? IsActive { get; set; }
        public int? CountryId { get; set; }
        public int? StateId { get; set; }
        public int? LocationId { get; set; }

    }
}
