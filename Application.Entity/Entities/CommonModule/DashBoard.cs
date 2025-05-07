using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class DashBoard
    {
        public int ActivePostion { get; set; }
        public int ProfileSourced { get; set; }
        public int InterviewScheduled { get; set; }
        public int SelectedCandidates { get; set; }
        public int OfferedCandidates { get; set; }
        public int JoinedCandidates { get; set; }
        public int RequisitionToJoining { get; set; }
        public int SelectionToJoining { get; set; }
        public int RequisitionToSelection { get; set; }
        public int SelectionToApproval { get; set; }
        public int ApprovalToJoining { get; set; }
    }
    public class SearchDashBoard
    {
       public int AutoUserId { get; set; }
    }
}
