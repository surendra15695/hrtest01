using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Status
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public int StatusTypeId { get; set; }
        public string StatusTypeName { get; set; }
        public string StatusIcon { get; set; }
    }

    public class StatusForROResignation
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public int StatusTypeId { get; set; }
        public string StatusTypeName { get; set; }
        public string StatusIcon { get; set; }
    }
}
