using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Salary
    {
        public int SalaryId { get; set; }
        public string SalaryName { get; set; }
        public decimal FromSalary { get; set; }
        public decimal ToSalary { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchSalary
    {
        public int? SalaryId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class InsUpSalary
    {
        public int? SalaryId { get; set; }
        public string SalaryName { get; set; }
        public Decimal FromSalary { get; set; }
        public Decimal ToSalary { get; set; }
        public Boolean IsActive { get; set; }
        public int? CreatedBy { get; set; }

    }
}
