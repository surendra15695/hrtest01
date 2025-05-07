using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Grade
    {
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchGrade
    {
        public int? GradeId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class GradePosition
    {
        public int GradeId { get; set; }
        public string PositionIds { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchGradePosition
    {
        public int? GradeId { get; set; }
        public int? PositionId { get; set; }
        public bool? IsActive { get; set; }
    }
}
