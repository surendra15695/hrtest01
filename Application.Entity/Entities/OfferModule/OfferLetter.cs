using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.OfferModule
{
    public class OfferLetterInsert
    {
        public long OfferLetterId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long EmailTemplateId { get; set; }
        public string EmailTemplateDetails { get; set; }
        public long CandidateId { get; set; }
        public long CreatedBy { get; set; }
        public string CandidateNo { get; set; }
        public string CandidateName { get; set; }
        public string Documentpath { get; set; }
    }

    public class OfferLetterUpdate
    {
        public long OfferLetterId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public int Accepted { get; set; }
        public string Comments { get; set; }
        public long CreatedBy { get; set; }
    }

    public class OfferLetter
    {
        public long OfferLetterId { get; set; }
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public string FunctionName { get; set; }
        public string Location { get; set; }
        public string Grade { get; set; }
        public decimal ProposedBasic { get; set; }
        public decimal ProposedCTC { get; set; }
        public decimal TemplateId { get; set; }
        public string TemplateDetails { get; set; }
        public int Accepted { get; set; }
        public string Remarks { get; set; }
        public string AcknowlagementRemarks { get; set; }
        public List<OfferLetterSalaryTemplate> SalaryTemplateList {get;set; }
    }

    public class OfferLetterSalaryTemplate
    {
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public long SalaryFitmentDetailsSalaryFormatId { get; set; }
        public int dbOrder { get; set; }
        public string VisibleOrder { get; set; }
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public decimal CalculatedSalaryValue { get; set; }
        public decimal CalculatedSalaryValueYearly { get; set; }
        public long CreatedBy { get; set; }

    }

    public class OfferLetterData
    {
        public OfferLetter OfferLetterDetails { get; set; }
        public List<OfferLetterSalaryTemplate> SalaryTemplateList { get; set; }
    }
    public class SearchOfferLetter
    {
        public long? OfferLetterId { get; set; }
        public long? CandidateId { get; set; }
        public long? RequsitaionDetailsId { get; set; }
    }
}

