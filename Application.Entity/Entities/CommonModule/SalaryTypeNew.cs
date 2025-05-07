using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
   public class SalaryTypeNew
    {
            public int SalaryTypeId { get; set; }
            public string SalaryTypeName { get; set; }
            public string VisualOrder { get; set; }
            public int Order { get; set; }
            public int CreatedBy { get; set; }
            public bool IsActive { get; set; }
    }
    public class SearchSalaryTypeNewList
    {
             public int? SalaryTypeId { get; set; }
            public bool ? IsActive { get; set; }


    }
}
