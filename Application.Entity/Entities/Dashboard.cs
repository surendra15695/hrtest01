using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.Dashboard
{
    public class Dashboard
    {
    }

    public class RMDashboard
    {
        public int TotalActivePosition { get; set; }
        public int ProfileSourced { get; set; }
        public int InterviewScheduled { get; set; }
        public int SelectedCandidate { get; set; }
        public int OfferedCandidate { get; set; }
        public int JoinedCandidate { get; set; }
        public int RequisitionToJoiningLead { get; set; }
        public int RequisitionToSelectionLead { get; set; }
        public int SelectionToJoiningLead { get; set; }
        public int SelectionToApprovalLead { get; set; }
        public int ApprovalToJoiningLead { get; set; }
    }

    public class SearchRMDashboard
    {
        public long AutoUserId { get; set; }
        public int DayCount { get; set; }
    }
}
