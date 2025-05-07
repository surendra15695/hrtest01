using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Location
    {
        public int LocationId { get; set; }
        public int VerticalId { get; set; }
        public string LocationNo { get; set; }
        public string LocationCode { get; set; }
        public string LocationOffice { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string VerticalName { get; set; }
    }
    public class FunctionwiseLocation
    {
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int FunctionId { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchLocation
    {
        public int? LocationId { get; set; }
        public int? VerticalId { get; set; }
        public string LocationNo { get; set; }
        public string LocationCode { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SearchVerticalLocation
    {
        public int? LocationId { get; set; }
        public string VerticalIds { get; set; }
        public string LocationNo { get; set; }
        public string LocationCode { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SearchFunctionLocation
    {
        
        public string FunctionIds { get; set; }
        public bool? IsActive { get; set; }
    }
    public class LocationWiseFunction
    {
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public bool IsChecked { get; set; }
        public int LocationFunctionId { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public int CreatedBy { get; set; }
    }
    public class LocationWiseFunctionSave
    {
        public int LocationId { get; set; }
        public string FunctionId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchLocationWiseFunction
    {
        public int? LocationId { get; set; }
    }

    public class UnmappedLocations
    {
        public int? LocationId { get; set; }
        public string LocationNo { get; set; }
        public string LocationCode { get; set; }
        public string LocationOffice { get; set; }
        public bool IsActive { get; set; }
        public bool DeleteStatus { get; set; }

    }
    public class SearchMappedLocation
    {
        public bool isActive { get; set; }
    }
}
