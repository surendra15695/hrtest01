using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Venue
    {
        public int VenueId { get; set; }
        public string VenueName { get; set; }
        public string VenueAddress { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchVenue
    {
        public int? VenueId { get; set; }
        public bool? IsActive { get; set; }
    }
}
