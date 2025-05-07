using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class SalaryAccountHeadPrevious
    {
        public int SalaryAccountHeadPreviousId { get; set; }
        public string SalaryAccountHeadPreviousName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchSalaryAccountHeadPrevious
    {
        public int? SalaryAccountHeadPreviousId { get; set; }
        public bool? IsActive { get; set; }
    }
}
