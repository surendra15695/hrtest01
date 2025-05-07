using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class SearchCalculatePayStructure
    {
        public List<ClaCulatePayStructureSearch> CalculteSalryDetails { get; set; }
    }

    public class ClaCulatePayStructureSearch
    {
        public int SalaryAccountHead { get; set; }
        public string Formula { get; set; }
        public string Amount { get; set; }
    }

    public class ClaCulatePayStructure
    {
        public ClaCulatePayStructureHeader ClaCulatePayStructureHeader { get; set; }
        public List<ClaCulatePayStructureValue> ClaCulatePayStructureValue { get; set; }
        public List<ClaCulatePayStructureValueFormat> ClaCulatePayStructureValueFormat { get; set; }
    }
    public class ClaCulatePayStructureHeader
    {
        public decimal CTC { get; set; }
    }

    public class ClaCulatePayStructureAll
    {
        public decimal CTC { get; set; }
        public List<ClaCulatePayStructureValue> ClaCulatePayStructureValue { get; set; }
        public List<ClaCulatePayStructureValueFormat> ClaCulatePayStructureValueFormat { get; set; }
    }
    public class ClaCulatePayStructureValue
    {
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public string Formula { get; set; }
        public string Amount { get; set; }
        public string CalculatedValue { get; set; }
        public string CalculatedValueYerly { get; set; }
    }

    public class ClaCulatePayStructureValueFormat
    {
        public int dbOrder { get; set; }
        public string Order { get; set; }
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public string CalculatedValue { get; set; }
        public string CalculatedValueYerly { get; set; }
    }


    public class SalaryTemplate
    {
        public SalaryTemplateMasterData SalaryTemplateMasterData { get; set; }
        public List<SalaryTemplateDetails> SalaryTemplateDetails { get; set; }
        public List<SalaryTemplateDetailsFormat> SalaryTemplateDetailsFormat { get; set; }
    }

    public class SalaryTemplateFormData
    {
        public int SalaryTemplateId { get; set; }
        public string SalaryTemplateName { get; set; }
        public int Grade { get; set; }
        public string GradeName { get; set; }
        public decimal CTC { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<SalaryTemplateDetails> SalaryTemplateDetails { get; set; }
        public List<SalaryTemplateDetailsFormat> SalaryTemplateDetailsFormat { get; set; }
    }

    public class SalaryTemplateData
    {
        public int SalaryTemplateId { get; set; }
        public string SalaryTemplateName { get; set; }
        public int Grade { get; set; }
        public string GradeName { get; set; }
        public decimal CTC { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public List<ClaCulatePayStructureSearch> CalculteSalryDetails { get; set; }
    }
    public class SalaryTemplateMasterData
    {
        public int SalaryTemplateId { get; set; }
        public string SalaryTemplateName { get; set; }
        public int Grade { get; set; }
        public string GradeName { get; set; }
        public decimal CTC { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SalaryTemplateDetails
    {
        public int SalaryTemplateId { get; set; }
        public int LineId { get; set; }
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public string SalaryFormula { get; set; }
        public decimal SalaryValue { get; set; }
        public decimal CalculatedSalaryValue { get; set; }
        public decimal CalculatedSalaryValueYearly { get; set; }
    }
    public class SalaryTemplateDetailsFormat
    {
        public int SalaryTemplateId { get; set; }
        public int LineId { get; set; }
        public int dbOrder { get; set; }
        public string VisibleOrder { get; set; }
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public decimal CalculatedSalaryValue { get; set; }
        public decimal CalculatedSalaryValueYearly { get; set; }
    }

    public class SearchSalaryTemplate
    {
        public long? SalaryTemplateId { get; set; }
        public long? Grade { get; set; }
        public bool? IsActive { get; set; }
    }

    public class SearchSalaryType
    {
        public long? SalaryTypeId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class SalaryType
    {
        public int SalaryTypeId { get; set; }
        public string VisualOrder { get; set; }
        public int Order { get; set; }
        public string SalaryTypeName { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchSalaryAccountHead
    {
        public long? SalaryAccountHeadId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class SalaryAccountHead
    {
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public int SalaryTypeId { get; set; }
        public string SalaryType { get; set; }
        public string CalCulationType { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SalaryTemplateFormula
    {
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountName { get; set; }
        public string Formula { get; set; }
        public string Amount { get; set; }
    }

}
