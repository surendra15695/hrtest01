using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class ModeofJoiningInsertUpdateParam
    {
        public int? ModeofJoiningId { get; set; }
        public string ModeofJoiningName { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }

    public class GetAllModeofJoiningParam
    {
        public int? ModeofJoiningId { get; set; }
        public int? IsActive { get; set; }
    }

    public class ModeofJoining
    {
        public int? ModeofJoiningId { get; set; }
        public string ModeofJoiningName { get; set; }
        public Boolean? IsActive { get; set; }
    }
}



