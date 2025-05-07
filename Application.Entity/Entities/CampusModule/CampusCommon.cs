using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CampusModule
{
    public class CampusCommon
    {
    }

    public class CampusCourse
    {
        public int CampusCourseId { get; set; }
        public string CourseName { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchCampusCourse
    {
        public int? CampusCourseId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CampusStream
    {
        public int CampusStreamId { get; set; }
        public string StreamName { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchCampusStream
    {
        public int? CampusStreamId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CampusCourseStreamFormData
    {
        public int CampusCourseId { get; set; }
        public string CampusStreamId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class CampusCouseStream
    {
        public int CampusCourseId { get; set; }
        public string CourseName { get; set; }
        public int CampusStreamId { get; set; }
        public string StreamName { get; set; }
        public bool IsActive { get; set; }
    }

    public class CampusYear
    {
        public int CampusYearId { get; set; }
        public string CampusYearName { get; set; }
        public int CampusFromYear { get; set; }
        public int CampusToYear { get; set; }
        public bool IsActive { get; set; }
        public long CreatedBy { get; set; }
    }

    public class SearchCampusYear
    {
        public int? CampusYearId { get; set; }
        public int? IsActive { get; set; }
    }

    public class CampusCollegeFormData
    {
        public int? CampusCollegeId { get; set; }
        public string CollegeName { get; set; }
        public int CollegeCategoryId { get; set; }
        public int CountryId { get; set; }
        public int StateId { get; set; }
        public string CollegeAddress { get; set; }
        public string ContactName { get; set; }
        public string ContactDesignation { get; set; }
        public string ContactEmailId { get; set; }
        public string ContactNo { get; set; }
        public bool? IsActive { get; set; }
        public long? CreatedBy { get; set; }
        public string CollegeType { get; set; }
    }

    public class CampusCollegeCategory
    {
        public int CollegeCategoryId { get; set; }
        public string CollegeCategoryName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchCampusCollege
    {
        public int? CampusCollegeId { get; set; }
        public bool? IsActive { get; set; }
        public int? CountryId { get; set; } 
        public int? StateId { get; set; }
        public int? CollegeCategoryId { get; set; }
    }
    public class SearchCampusFunctionwiseRequisition
    {
        public int? CampusLinkId { get; set; }
        public int? CandidateId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
    }
    public class CampusCollegeList
    {
        public int CampusCollegeId { get; set; }
        public string CollegeName { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public int StateId { get; set; }
        public string StateName { get; set; }
        public string CollegeAddress { get; set; }
        public int CollegeCategoryId { get; set; }
        public string CollegeCategoryName { get; set; }
        public string ContactName { get; set; }
        public string ContactDesignation { get; set; }
        public string ContactEmailId { get; set; }
        public string ContactNo { get; set; }
        public bool IsActive { get; set; }
        public string CollegeType { get; set; }
    }
    public class CampusFunctionwiseRequisition
    {
        public int RequisitionDetailId { get; set; }
        public int RequisitionId { get; set; }
        public string RequisitionNo { get; set; }
    }
}
