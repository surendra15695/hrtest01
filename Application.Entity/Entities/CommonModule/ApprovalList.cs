using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class ApprovalList
    {
        public int ApprovalListId { get; set; }
        public string ApprovalListName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchApprovalList
    {
        public int? ApprovalListId { get; set; }
        public bool? IsActive { get; set; }
    }
}
