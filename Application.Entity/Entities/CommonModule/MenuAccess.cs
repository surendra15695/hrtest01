using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class MenuAccess
    {
        public long ModuleId { get; set; }
        public long ModuleLEvel { get; set; }
        public string ModuleName { get; set; }
        public int ParentModID { get; set; }
        public string ParentModuleName { get; set; }
        public Boolean IsCheck { get; set; }
    }

    public class SearchMenuAccess
    {
        public long? RoleId { get; set; }
        public Boolean? IsCheck { get; set; }
    }

    public class InsertMenuaccesParam
    {
        public List<MenuAccessInsert> MenuAccessInsert { get; set; }
        public int? CreatedBy { get; set; }
    }
    public class MenuAccessInsert
    {
        public long ModuleId { get; set; }
        public long RoleId { get; set; }

    }
}
