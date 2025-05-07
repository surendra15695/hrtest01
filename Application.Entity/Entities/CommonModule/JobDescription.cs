using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class JobDescription
    {
        public int JobDescriptionId { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string JobDescriptionName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        //public int LocationId { get; set; } // Previous
        public string LocationId { get; set; } // Modified by Anif on 05-07-2022 as it is multiselect and data will come (,) seperated
        public string LocationOffice { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentOffice { get; set; }
        public string DepartmentName { get; set; }  // Added by anif on 05-07-2022 as department name was not binding
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public bool IsEnabled { get; set; }

    }

    public class SearchJobDescription
    {
        public int? JobDescriptionId { get; set; }
        public int? VerticalId { get; set; }
        public bool? IsActive { get; set; }
        public long CreatedBy { get; set; }
    }
    public class SearchJobFuncDescription
    {
        public int? JobDescriptionId { get; set; }
        public int? VerticalId { get; set; }
        public bool? IsActive { get; set; }
        public int FunctionId { get; set; }
    }

    public class JobDescriptionDetailFormData
    {
        public int JobDescriptionId { get; set; }
        public string JobDescriptionName { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public string LocationId { get; set; }
        public string LocationName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public string GradeId { get; set; }
        public string GradeName { get; set; }
        public string ReportsTo { get; set; }
        public int NoOfReportees { get; set; }
        public string IndustryId { get; set; }
        public string IndustryName { get; set; }
        public string ExperienceId { get; set; }
        public string ExperienceName { get; set; }
        public string AgeId { get; set; }
        public string AgeName { get; set; }
        public string QualificationId { get; set; }
        public string QualificationName { get; set; }
        public string CourseId { get; set; }
        public string CourseName { get; set; }  
        public string StreamId { get; set; }
        public string StreamName { get; set; }
        public string LanguageId { get; set; }
        public string LanguageName { get; set; }
        public string AnyOtherLanguage { get; set; }
        public string JobPurpose { get; set; }
        public string JobSummary { get; set; }
        public string KPIs { get; set; }
        public string Dimensions { get; set; }
        public string Skills { get; set; }
        public string Knowledge { get; set; }
        public string ExternalStakeHolders { get; set; }
        public string InternalStakeHolders { get; set; }        
        public string RestrictedJD { get; set; }
        public string JDDocument { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public bool IsEnabled { get; set; }
    }

}
