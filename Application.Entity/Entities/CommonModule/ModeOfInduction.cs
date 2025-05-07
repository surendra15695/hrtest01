using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class ModeOfInductionParam
    {
        public int? InductionModeId { get; set; }
        public string InductionModeName { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class AllModeOfInductionParam
    {
        public int? InductionModeId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class ModeOfInduction
    {
        public int? InductionModeId { get; set; }
        public string InductionModeName { get; set; }
        public Boolean? IsActive { get; set; }
    }
}
