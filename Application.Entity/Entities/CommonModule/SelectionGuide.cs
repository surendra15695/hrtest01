using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class SelectionGuide
    {
        public int SelectionGuideId { get; set; }
        public string SelectionGuideName { get; set; }
        public string InterviewIds { get; set; }
        public string InterviewNames { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchSelectionGuide
    {
        public int? SelectionGuideId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class SelectionGuideInterview
    {
        public int InterviewId { get; set; }
        public string InterviewName { get; set; }
        public int IsActive { get; set; }
    }

    public class SearchSelectionGuideInterview
    {
        public long RequisitionDetailId { get; set; }
        public int HiringStatusId { get; set; }
    }
}
