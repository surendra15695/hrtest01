using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Position
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class PositionVertical
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string VerticalIds { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchPosition
    {
        public int? VerticalId { get; set; }
        public int? PositionId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class PositionVerticalDetail
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public string VerticalIds { get; set; }
        public string VerticalNames { get; set; }
        public bool IsActive { get; set; }
    }

    public class PositionGrade
    {
        public int PositionId { get; set; }
        public int VerticalId { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
    }

    public class SearchPositionGrade
    {
        public int? PositionId { get; set; }
        public int? GradeId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SearchPositionGradeNew
    {
        public int? PositionId { get; set; }
        public int? GradeId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class PositionMaster
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class GradePositionAll
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string PositionIds { get; set; }        
        public string PositionNames { get; set; }
    }
    public class GradePositionAllNew
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public string PositionIds { get; set; }
        public string PositionNames { get; set; }
    }

    public class PositionGradeSave
    {
        public int GradeId { get; set; }
        public string PositionIds { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchPositionMaster
    {
        public int? PositionId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class VerticalWisePositionFormData
    {
        public int VerticalId { get; set; }
        public string PositionId { get; set; }
        public long CreatedBy { get; set; }
    }

    public class VerticalWisePositionList
    {
        public int VerticalId { get; set; }
        public string verticalName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int IsChecked { get; set; }
    }

    public class SearchVerticalWisePositionList
    {
        public int VerticalId { get; set; }
    }

    public class SearchFunctionWisePositionList
    {
        public int ? FunctionId { get; set; }
    }

    public class FunctionWisePositionList
    {
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int IsChecked { get; set; }
    }
    public class FunctionWisePositionFormData
    {
        public int FunctionId { get; set; }
        public string PositionId { get; set; }
        public long CreatedBy { get; set; }
    }
    public class SearchFunctionPosition
    {
        public int ? FunctionId { get; set; }
        public int ? PositionId { get; set; }  
        public int ? IsActive { get; set; }
    }
    public class FunctionPosition
    {
       public int PositionId { get; set; }  
       public string PositionName { get; set; } 
       public int FunctionId { get; set; }  
       public int IsActive { get; set; }
    }
    public class FamilyRelationData
    {
        public string Name { get; set; }
       
        public int Id { get; set; }

    }
    public class SearchFamilyRelation
    {
       public bool IsActive { get; set; }

    }
}
