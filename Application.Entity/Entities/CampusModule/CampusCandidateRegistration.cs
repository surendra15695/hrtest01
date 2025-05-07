using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CampusModule
{
    public class CampusCandidate
    {
        public CampusCandidateMasterData CampusCandidateMasterData { get; set; }
        public List<CampusCandidateHighSchool> CampusCandidateHighSchool { get; set; }
        public List<CampusCandidateHigherSecondary> CampusCandidateHigherSecondary { get; set; }
        public List<CampusCandidateDiploma> CampusCandidateDiploma { get; set; }
        public List<CampusCandidateGraduation> CampusCandidateGraduation { get; set; }
        public List<CampusCandidatePostGraduate> CampusCandidatePostGraduate { get; set; }
        public List<CampusCandidateOtherQulifiaction> CampusCandidateOtherQulifiaction { get; set; }
    }
    public class CampusCandidateData
    {
        public long CampusCandidateId { get; set; }
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public int NativeState { get; set; }
        public string NativeStateName { get; set; }
        public int PresentState { get; set; }
        public string PresentStateName { get; set; }
        public int MotherTongue { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageKnown { get; set; }
        public string LanguageKnownName { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public bool EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public int FatherOccupation { get; set; }
        public string FatherOccupationName { get; set; }
        public int MotherOccupation { get; set; }
        public string MotherOccupationName { get; set; }
        public bool Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public bool HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int NoofSiblings { get; set; }
        public bool MRFRealtive { get; set; }
        public string RealtiveName { get; set; }
        public string RealtiveMobileNo { get; set; }
        public int YearsCommitments { get; set; }
        public int AnyWhereinIndia { get; set; }
        public int WorkinginShift { get; set; }
        public int JobTypePriority { get; set; }
        public int CriticalFactor { get; set; }
        public int MostPreferdBenifit { get; set; }
        public int ExtraCurricularActivities { get; set; }
        public string Resume { get; set; }
        public int CreatedBy { get; set; }
        public List<CampusCandidateHighSchool> CampusCandidateHighSchool { get; set; }
        public List<CampusCandidateHigherSecondary> CampusCandidateHigherSecondary { get; set; }
        public List<CampusCandidateDiploma> CampusCandidateDiploma { get; set; }
        public List<CampusCandidateGraduation> CampusCandidateGraduation { get; set; }
        public List<CampusCandidatePostGraduate> CampusCandidatePostGraduate { get; set; }
        public List<CampusCandidateOtherQulifiaction> CampusCandidateOtherQulifiaction { get; set; }
    }

    public class CampusCandidateMasterData
    {
        public long CampusCandidateId { get; set; }
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public int NativeState { get; set; }
        public string NativeStateName { get; set; }
        public int PresentState { get; set; }
        public string PresentStateName { get; set; }
        public int MotherTongue { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageKnown { get; set; }
        public string LanguageKnownName { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public bool EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public int FatherOccupation { get; set; }
        public string FatherOccupationName { get; set; }
        public int MotherOccupation { get; set; }
        public string MotherOccupationName { get; set; }
        public bool Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public bool HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int NoofSiblings { get; set; }
        public bool MRFRealtive { get; set; }
        public string RealtiveName { get; set; }
        public string RealtiveMobileNo { get; set; }
        public int YearsCommitments { get; set; }
        public int AnyWhereinIndia { get; set; }
        public int WorkinginShift { get; set; }
        public int JobTypePriority { get; set; }
        public int CriticalFactor { get; set; }
        public int MostPreferdBenifit { get; set; }
        public int ExtraCurricularActivities { get; set; }
        public string Resume { get; set; }
        public int CreatedBy { get; set; }
    }

    public class CampusCandidateHighSchool
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long CampusCandidateVisualOrder { get; set; }
        public long Qualification { get; set; }
        public string QualificationName { get; set; }
        public long Course { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }

    public class CampusCandidateHigherSecondary
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long CampusCandidateVisualOrder { get; set; }
        public long Qualification { get; set; }
        public string QualificationName { get; set; }
        public long Course { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }

    public class CampusCandidateDiploma
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long CampusCandidateVisualOrder { get; set; }
        public long Qualification { get; set; }
        public string QualificationName { get; set; }
        public long Course { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }

    public class CampusCandidateGraduation
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long CampusCandidateVisualOrder { get; set; }
        public long Qualification { get; set; }
        public string QualificationName { get; set; }
        public long Course { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }
    public class CampusCandidatePostGraduate
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long CampusCandidateVisualOrder { get; set; }
        public long Qualification { get; set; }
        public string QualificationName { get; set; }
        public long Course { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }

    public class CampusCandidateOtherQulifiaction
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long CampusCandidateVisualOrder { get; set; }
        public long Qualification { get; set; }
        public string QualificationName { get; set; }
        public long Course { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }

    public class CampusCandidateSearch
    {
        public long? CandidateId { get; set; }
        public long? CampusCandidateId { get; set; }
    }

    public class CampusCandidateSearchForExcel
    {
        public string CandidateIds { get; set; }
    }

    public class CampusCandidateSave
    {
        public long CampusCandidateId { get; set; }
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public int NativeState { get; set; }
        public int PresentState { get; set; }
        public int MotherTongue { get; set; }
        public string LanguageKnown { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public bool EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public int FatherOccupation { get; set; }
        public int MotherOccupation { get; set; }
        public bool Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public bool HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int NoofSiblings { get; set; }
        public bool MRFRealtive { get; set; }
        public string RealtiveName { get; set; }
        public string RealtiveMobileNo { get; set; }
        public int YearsCommitments { get; set; }
        public int AnyWhereinIndia { get; set; }
        public int WorkinginShift { get; set; }
        public int JobTypePriority { get; set; }
        public int CriticalFactor { get; set; }
        public int MostPreferdBenifit { get; set; }
        public string ExtraCurricularActivities { get; set; }
        public int ActiveArrears { get; set; }
        public string Resume { get; set; }
        public int CreatedBy { get; set; }
        public string DeletedIds { get; set; }
        public int HighestQualification { get; set; }
        public List<CampusCandidateAcademic> CampusCandidateAcademic { get; set; }
        public List<CandidateAnyOtherAcademic> CampusCandidateAnyOtherAcademic { get; set; }
    }

    public class OffCampusCandidateSave
    {
        public long CampusCandidateId { get; set; }
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public int NativeState { get; set; }
        public int PresentState { get; set; }
        public int MotherTongue { get; set; }
        public string LanguageKnown { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public bool EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public int FatherOccupation { get; set; }
        public int MotherOccupation { get; set; }
        public bool Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public bool HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int NoofSiblings { get; set; }
        public bool MRFRealtive { get; set; }
        public string RealtiveName { get; set; }
        public string RealtiveMobileNo { get; set; }
        public int YearsCommitments { get; set; }
        public int AnyWhereinIndia { get; set; }
        public int WorkinginShift { get; set; }
        public int JobTypePriority { get; set; }
        public int CriticalFactor { get; set; }
        public int MostPreferdBenifit { get; set; }
        public int ExtraCurricularActivities { get; set; }
        public string Resume { get; set; }
        public int CreatedBy { get; set; }
        public string DeletedIds { get; set; }
        public int HighestQualification { get; set; }
        public int ExperienceYear { get; set; }
        public int ExperienceMonth { get; set; }
        public string CurrentCTC { get; set; }
        public string CurrentEmployer { get; set; }
        public int Domain { get; set; }
        public int SubDomain { get; set; }
        public bool PreviousApplied { get; set; }
        public bool RelativeStatus { get; set; }
        public string RelativeName { get; set; }
        public string RelativeContactNo { get; set; }
        public List<CampusCandidateAcademic> CampusCandidateAcademic { get; set; }
        public List<CandidateAnyOtherAcademic> CampusCandidateAnyOtherAcademic { get; set; }
    }
    public class OffCampusCandidateSaveNew
    {
        public long CampusCandidateId { get; set; }
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public int NativeState { get; set; }
        public int PresentState { get; set; }
        public int MotherTongue { get; set; }
        public string LanguageKnown { get; set; }
        public int Height { get; set; }
        public decimal Weight { get; set; }
        public bool EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public int FatherOccupation { get; set; }
        public int MotherOccupation { get; set; }
        public bool Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public bool HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int NoofSiblings { get; set; }
        public bool MRFRealtive { get; set; }
        public string RealtiveName { get; set; }
        public string RealtiveMobileNo { get; set; }
        public int YearsCommitments { get; set; }
        public int AnyWhereinIndia { get; set; }
        public int WorkinginShift { get; set; }
        public int JobTypePriority { get; set; }
        public int CriticalFactor { get; set; }
        public int MostPreferdBenifit { get; set; }
        public string ExtraCurricularActivities { get; set; }
        public int ActiveArrears { get; set; }
        public string Resume { get; set; }
        public int CreatedBy { get; set; }
        public string DeletedIds { get; set; }
        public int HighestQualification { get; set; }
        public List<CampusCandidateAcademic> CampusCandidateAcademic { get; set; }
        public List<CandidateAnyOtherAcademic> CampusCandidateAnyOtherAcademic { get; set; }
    }
    public class CampusCandidateAcademic
    {
        public long CampusCandidateAcademicId { get; set; }
        public long CampusCandidateId { get; set; }
        public long VisualOrder { get; set; }
        public long Qualification { get; set; }
        public long Course { get; set; }
        public int CourseStatus { get; set; }
        public int StreamName { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }

    public class CandidateAnyOtherAcademic
    {
        public long CampusCandidateAnyOtherQualificationId { get; set; }
        public long CampusCandidateId { get; set; }
        public string QualificationName { get; set; }
        public string CourseName { get; set; }
        public int CourseStatus { get; set; }
        public string Specalization { get; set; }
        public int Instutation { get; set; }
        public string InstutationName { get; set; }
        public int InstutationLocation { get; set; }
        public int YearOfPassing { get; set; }
        public decimal Marks { get; set; }
    }


    public class CandidatesDataForExcelDwnld
    {
        public long CampusLinkId { get; set; }
        public long CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public int Gender { get; set; }
        public string GenderName { get; set; }
        public string DOB { get; set; }
        public int Age { get; set; }
        public string EmailId { get; set; }
        public string PhoneNo { get; set; }
        public string AadharNo { get; set; }
        public string HomeTown { get; set; }
        public int NativeState { get; set; }
        public string NativeStateName { get; set; }
        public int PresentState { get; set; }
        public string PresentStateName { get; set; }
        public int MotherTongue { get; set; }
        public string MotherTongueName { get; set; }
        public string LanguageKnown { get; set; }
        public string LanguageKnownName { get; set; }
        public int Height { get; set; }
        public int Weight { get; set; }
        public bool EyeSightCorrected { get; set; }
        public string EyeSightRight { get; set; }
        public string EyeSightLeft { get; set; }
        public int FatherOccupation { get; set; }
        public string FatherOccupationName { get; set; }
        public int MotherOccupation { get; set; }
        public string MotherOccupationName { get; set; }
        public bool Disability { get; set; }
        public string DisabilityDetails { get; set; }
        public bool HealthIssue { get; set; }
        public string HealthIssueDetails { get; set; }
        public int NoofSiblings { get; set; }
        public bool MRFRealtive { get; set; }
        public string RealtiveName { get; set; }
        public string RealtiveMobileNo { get; set; }
        public int YearsCommitments { get; set; }
        public int AnyWhereinIndia { get; set; }
        public int WorkinginShift { get; set; }
        public int JobTypePriority { get; set; }
        public string JobPriorityName { get; set; }
        public int CriticalFactor { get; set; }
        public string CriticalFactorName { get; set; }
        public int MostPreferdBenifit { get; set; }
        public string MostPreferdBenifitName { get; set; }
        public string ExtraCurricularActivitiesName { get; set; }
        public int HighestQualification { get; set; }
        public string HighestQualificationName { get; set; }
        public int activearrears { get; set; }
        public string CourseStatushighschool { get; set; }
        public string YearofPassinghighschool { get; set; }
        public string Markshighschool { get; set; }
        public string CourseStatushigherschool { get; set; }
        public string YearofPassinghigherschool { get; set; }
        public string Markshigherschool { get; set; }
        public string CourseStatusdiploma { get; set; }
        public string YearofPassingdiploma { get; set; }
        public string Marksdiploma { get; set; }
        public string coursenamediploma { get; set; }
        public string streamnamediploma { get; set; }
        public string Institutiondiploma { get; set; }
        public string Institutionnamediploma { get; set; }
        public string Institutelocationdiploma { get; set; }

        public string CourseStatusundergraduate { get; set; }
        public string YearofPassingundergraduate { get; set; }
        public string Marksundergraduate { get; set; }
        public string coursenameundergraduate { get; set; }
        public string streamnameundergraduate { get; set; }
        public string Institutionundergraduate { get; set; }
        public string Institutionnameundergraduate { get; set; }
        public string Institutelocationundergraduate { get; set; }
        public string CourseStatuspostgraduate { get; set; }
        public string YearofPassingpostgraduate { get; set; }
        public string Markspostgraduate { get; set; }
        public string coursenamepostgraduate { get; set; }
        public string streamnamepostgraduate { get; set; }
        public string Institutionpostgraduate { get; set; }
        public string Institutionnamepostgraduate { get; set; }
        public string Institutelocationpostgraduate { get; set; }
        public string CourseStatusAnyotheracademic { get; set; }
        public string QualificationnameAnyotheracademic { get; set; }
        public string YearofPassingAnyotheracademic { get; set; }
        public string MarksAnyotheracademic { get; set; }
        public string coursenameAnyotheracademic { get; set; }
        public string streamnameAnyotheracademic { get; set; }
        public string InstitutionAnyotheracademic { get; set; }
        public string InstitutionnameAnyotheracademic { get; set; }
        public string InstitutelocationAnyotheracademic { get; set; }
    }
}
