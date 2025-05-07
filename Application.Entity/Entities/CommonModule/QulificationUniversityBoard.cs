using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class QulificationUniversityBoard
    {
        public int QulificationUniversityBoardId { get; set; }
        public string QulificationUniversityBoardName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchQulificationUniversityBoard
    {
        public int? QulificationUniversityBoardId { get; set; }
        public bool? IsActive { get; set; }
    }
}
