using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class QulificationClassGaradeDivision
    {
        public int QulificationClassGaradeDivisionId { get; set; }
        public string QulificationClassGaradeDivisionName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchQulificationClassGaradeDivision
    {
        public int? QulificationClassGaradeDivisionId { get; set; }
        public bool? IsActive { get; set; }
    }
}
