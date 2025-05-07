using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.EmployeeModule
{
    public class EmployeeReplacementList
    {
        public long EmpId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string GradeName { get; set; }
        public int FunctionId{get;set;}
        public string FunctionName{get;set;}
        public string Msg { get; set; }
        public int SuccessFlag { get; set; } // added by arghya on 8/7/22
    }

    public class SearchEmployeeReplacement
    {
        public string EmpNo { get; set; }
        public long EmpId { get; set; }
    }
}

