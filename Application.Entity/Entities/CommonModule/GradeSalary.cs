using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class SalaryHead
    {
        public long SalaryHeadId { get; set; }
        public string SalaryHeadName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchSalaryHead
    {
        public long? SalaryHeadId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class SalaryGradeTemplate
    {
        public long TemplateId { get; set; }
        public string TemplateName { get; set; }
        public long Grade { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchGradeTemplate
    {
        public long? TemplateId { get; set; }
        public long? Grade { get; set; }
        public bool? IsActive { get; set; }
    }

    public class GradeSalary
    {
        public long GradeSalaryId { get; set; }
        public long Grade { get; set; }
        public String GradeName { get; set; }
        public long Template { get; set; }
        public String TemplateName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<GradeSalaryDetails> SalaryDetails { get; set; }
    }

    public class GradeSalaryDetails
    {
        public long GradeSalaryId { get; set; }
        public long SalaryHead { get; set; }
        public String SalaryHeadName { get; set; }
        public decimal Amount { get; set; }
    }

    public class SearchGradeSalary
    {
        public long? Grade { get; set; }
        public long? Template { get; set; }
        public long? IsActive { get; set; }
    }
}
