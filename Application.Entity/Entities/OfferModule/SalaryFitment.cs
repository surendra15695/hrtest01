using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.OfferModule
{
    public class SalaryFitment
    {
        public SalaryFitmentMaster SalaryFitmentMaster { get; set; }
        public List<SalaryFitmentRemaks> SalaryFitmentRemaks { get; set; }
        public List<SalaryFitmentExperience> SalaryFitmentExperience { get; set; }
        public List<SalaryFitmentInternalEmployee> SalaryFitmentInternalEmployee { get; set; }
        public List<SalaryFitmentDetails> SalaryFitmentDetails { get; set; }
        public List<SalaryFitmentSalaryDetails> SalaryFitmentSalaryDetails { get; set; }
        public List<SalaryFitmentSalaryDetailsFormat> SalaryFitmentSalaryDetailsFormat { get; set; }

    }
    public class SalaryFitmentData
    {
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public String CandidateFullName { get; set; }
        public String CandidateEmailId { get; set; }
        public String CandidatePhone { get; set; }
        public String CandidateGender { get; set; }
        public String Age { get; set; }
        public String AadharNo { get; set; }
        public String MotherTongue { get; set; }
        public String LanguageKnown { get; set; }
        public String HighestQualification { get; set; }
        public String Course { get; set; }
        public String Stream { get; set; }
        public String Percentage { get; set; }
        public String YearofCompletion { get; set; }
        public String QualificationType { get; set; }
        public String Totalexperience { get; set; }
        public String CurrentCTC { get; set; }
        public String CurrentEmployer { get; set; }
        public String Designation { get; set; }
        public String Domain { get; set; }
        public String SubDomain { get; set; }
        public String CurrentLocation { get; set; }
        public String AnyPreviousApplicationHistoryinMRF { get; set; }
        public String AnyRelativeWorkingonMRF { get; set; }
        public String Source { get; set; }
        public String CandidateOwner { get; set; }
        public String CandidateResume { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
        public List<SalaryFitmentRemaks> SalaryFitmentRemaks { get; set; }
        public List<SalaryFitmentExperience> SalaryFitmentExperience { get; set; }
        public List<SalaryFitmentInternalEmployee> SalaryFitmentInternalEmployee { get; set; }
        public List<SalaryFitmentDetails> SalaryFitmentDetails { get; set; }
    }

    public class SalaryFitmentMasterData
    {
        public long RequsitaionDetailId { get; set; }
        public long CandidateId { get; set; }
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public int Probation { get; set; }
        public int Location { get; set; }
        //public int Designation { get; set; }
        public string Designation { get; set; }
        public int Grade { get; set; }
        public int Template { get; set; }
        public decimal CTC { get; set; }
        public decimal CTCIncrementPercent { get; set; }
        public decimal BasicIncrementPercent { get; set; }
        public int CreatedBy { get; set; }
        public string Documentpath { get; set; }
        public List<SalaryFitmentRemaks> SalaryFitmentRemaks { get; set; }
        public List<SalaryFitmentExperience> SalaryFitmentExperience { get; set; }
        public List<SalaryFitmentInternalEmployee> SalaryFitmentInternalEmployee { get; set; }
        public List<SalaryFitmentSalaryDetails> SalaryFitmentSalaryDetails { get; set; }
        public List<SalaryFitmentSalaryDetailsFormat> SalaryFitmentSalaryDetailsFormat { get; set; }
    }
    public class SalaryFitmentMaster
    {
        public long RequsitaionDetailsId { get; set; }
        public long CandidateId { get; set; }
        public String CandidateFullName { get; set; }
        public String CandidateEmailId { get; set; }
        public String CandidatePhone { get; set; }
        public String CandidateGender { get; set; }
        public String Age { get; set; }
        public String AadharNo { get; set; }
        public String MotherTongue { get; set; }
        public String LanguageKnown { get; set; }
        public String HighestQualification { get; set; }
        public String Course { get; set; }
        public String Stream { get; set; }
        public String Percentage { get; set; }
        public String YearofCompletion { get; set; }
        public String QualificationType { get; set; }
        public String Totalexperience { get; set; }
        public String CurrentCTC { get; set; }
        public String CurrentEmployer { get; set; }
        public String Designation { get; set; }
        public String Domain { get; set; }
        public String SubDomain { get; set; }
        public String CurrentLocation { get; set; }
        public String AnyPreviousApplicationHistoryinMRF { get; set; }
        public String AnyRelativeWorkingonMRF { get; set; }
        public String Source { get; set; }
        public String CandidateOwner { get; set; }
        public String CandidateResume { get; set; }
        public int HiringStatusId { get; set; }
        public string HiringStatusName { get; set; }
    }
    public class SalaryFitmentDetailsData
    {
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public int Probation { get; set; }
        public String ProbationName { get; set; }
        public int Location { get; set; }
        public String LocationOffice { get; set; }
        public int Designation { get; set; }
        public String DesignationName { get; set; }
        public int Grade { get; set; }
        public String GradeName { get; set; }
        public int Template { get; set; }
        public String SalaryTemplateName { get; set; }
        public decimal CTC { get; set; }
        public decimal CTCIncrementPercent { get; set; }
        public decimal BasicIncrementPercent { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SalaryFitmentDetails
    {
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public int Probation { get; set; }
        public String ProbationName { get; set; }
        public int Location { get; set; }
        public String LocationOffice { get; set; }
        public int Designation { get; set; }
        public String DesignationName { get; set; }
        public int Grade { get; set; }
        public String GradeName { get; set; }
        public int Template { get; set; }
        public String SalaryTemplateName { get; set; }
        public decimal CTC { get; set; }
        public decimal CTCIncrementPercent { get; set; }
        public decimal BasicIncrementPercent { get; set; }
        public int Acceptance { get; set; }
        public string AcceptanceRemarks { get; set; }
        public int CreatedBy { get; set; }
        public List<SalaryFitmentSalaryDetails> SalaryFitmentSalaryDetails { get; set; }
        public List<SalaryFitmentSalaryDetailsFormat> SalaryFitmentSalaryDetailsFormat { get; set; }
    }
    public class SalaryFitmentSalaryDetails
    {
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public int SalaryFitmentSalaryDetailsLineId { get; set; }
        public int SalaryAccountHeadId { get; set; }
        public String SalaryAccountHeadName { get; set; }
        public String SalaryFormula { get; set; }
        public decimal SalaryValue { get; set; }
        public decimal CalculatedSalaryValue { get; set; }
        public decimal CalculatedSalaryValueYearly { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SalaryFitmentSalaryDetailsFormat
    {
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public int SalaryFitmentSalaryDetailsFormatId { get; set; }
        public int dbOrder { get; set; }
        public string VisibleOrder { get; set; }
        public int SalaryAccountHeadId { get; set; }
        public string SalaryAccountHeadName { get; set; }
        public decimal CalculatedSalaryValue { get; set; }
        public decimal CalculatedSalaryValueYearly { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SalaryFitmentRemaks
    {
        public long SalaryFitmentRemarksId { get; set; }
        public long SalaryFitmentId { get; set; }
        public String Reamrks { get; set; }
        public int CreatedBy { get; set; }
        public String CreatedByName { get; set; }
        public String CreatedOn { get; set; }
        public String ReamrksReply { get; set; }
        public int ModifiedBy { get; set; }
        public String ModifiedByName { get; set; }
        public String ModifiedOn { get; set; }
    }

    public class SalaryFitmentExperience
    {
        public long SalaryFitmentExperienceId { get; set; }
        public long SalaryFitmentId { get; set; }
        public String Organisation { get; set; }
        public String From { get; set; }
        public String To { get; set; }
        public int Days { get; set; }
        public decimal Years { get; set; }
        public String Remarks { get; set; }
    }

    public class SalaryFitmentInternalEmployee
    {
        public long SalaryFitmentInternalEmployeeId { get; set; }
        public long SalaryFitmentId { get; set; }
        public String EmpNo { get; set; }
        public String EmpName { get; set; }
        public long Function { get; set; }
        public String FunctionName { get; set; }
        public long Department { get; set; }
        public String DepartmentName { get; set; }
        public String Designation { get; set; }
        public String Category { get; set; }
        public String Grade { get; set; }
        public String Location { get; set; }
        public String DateofJoining { get; set; }
        public long Course { get; set; }
        public String CourseName { get; set; }
        public long Stream { get; set; }
        public String StreamName { get; set; }
        public decimal Age { get; set; }
        public decimal Experience { get; set; }
        public decimal Basic { get; set; }
        public decimal MRFAllowance { get; set; }
        public decimal TotalCTC { get; set; }
        public decimal BasicPercent { get; set; }
        public String Remarks { get; set; }
    }

    public class SalaryFitmentAcceptance
    {
        public long SalaryFitmentDetailsId { get; set; }
        public long SalaryFitmentId { get; set; }
        public int Acceptance { get; set; }
        public String Remarks { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SearchSalaryFitment
    {
        public long? SalaryFitmentId { get; set; }
        public long? RequsitaionDetailsId { get; set; }
        public long? CandidateId { get; set; }
    }
}
