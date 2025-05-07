using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class ReturnMessage
    {
        public string Msg { get; set; }
        public string ErrorMsg { get; set; }
        public int SuccessFlag { get; set; }
        public long Id { get; set; }
        public string RefNo { get; set; }
        public string CandidateNo { get; set; }
        public string ExistedCandidateId { get; set; }
        public string ExistedCandidateName { get; set; }
        public string VendorName { get; set; }
        public string DoctorsNo { get; set; } 
        public int ApprovalStatus { get; set; }
        public string ApprovalRemarks { get; set; }
        public string SenderEmailId { get; set; }

    }

    public class UploadEmployeeMaster
    {
        public List<ReturnMessage> ReturnMessage { get; set; }
        public List<EmployeeData> employeeDatas { get; set; }
    }
    public class EmployeeData
    {
        public int Id { get; set; }
        public string Personnel_Number { get; set; }
        public string Formatted_Name_of_Employee_or_Applicant { get; set; }
        public string Organizational_Unit { get; set; }
        public string Position { get; set; }
        public string Employee_Group { get; set; }
        public string Employee_Subgroup { get; set; }
        public string Personnel_Subarea { get; set; }
        public string Cost_center_text { get; set; }
        public string Cost_Center { get; set; }
        public string Date_of_Birth { get; set; }
        public string Entry_Date { get; set; }
        public string Leaving_date { get; set; }
        public string Mail_ID { get; set; }
        public string Aadhar_No { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int GradeId { get; set; }
        public string LocationId { get; set; }
        public int SubAreaId { get; set; }
        public bool StatusId { get; set; }
        public string ErrorMsg { get; set; }

    }
}
