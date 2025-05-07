using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class ClaimStatus
    {
        public int? ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
        public Boolean IsActive { get; set; }
        
    }
    public class SearchClaimStatus
    {
        public int? ClaimStatusId { get; set; }
        public string ClaimStatusName { get; set; }
        public Boolean IsActive { get; set; }
    }
}
