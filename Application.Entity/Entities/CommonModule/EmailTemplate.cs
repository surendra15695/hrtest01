using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{

    public class SearchEmailTemplateType
    {
       public int ? TemplateTypeId { get; set; } 
       public bool ? IsActive { get; set; }
    }
    public class EmailTemplateType
    {
        public int TemplateTypeId { get; set; }
        public string TemplateTypeName { get; set; }
        public bool IsActive { get; set; }
    }
    public class EmailTemplate
    {
        public int TemplateId { get; set; }
        public int TemplateTypeId { get; set; }
        public string TemplateTypeName { get; set; }
        public string TemplateEmailName { get; set; }
        public string TemplateDescription { get; set; }
        public bool IsActive { get; set; }
    }
    //Piu Biswas
    public class RequisitionDetailsForEmail
    {
        
public string RequisitionNo { get; set; }
public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
        public string EmailId { get; set; }
        public string FullName { get; set; }

        public string CandidateNo { get; set; }

    }
    public class VendorRequisitionDetailsForEmail
    {

        public string RequisitionNo { get; set; }
        public string PositionName { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string LocationOffice { get; set; }
     public string RMEmailId { get; set; }



    }

    public class CandidadateDetailsForEmail
    {
        public int CandidateId { get; set; }
        public string CandidateNo { get; set; }
        public string FullName { get; set; }
        public string EmailId { get; set; }
        public string EmpNo { get; set; }
    }

    public class SearchEmailTemplate
    {
        public int? TemplateId { get; set; }
        public int? TemplateTypeId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class AddEmailTemplate
    {
        public int TemplateId { get; set; }
        public int TemplateTypeId { get; set; }
        public string TemplateEmailName { get; set; }  
        public string TemplateDescription { get; set; }  
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    // Added by Anif on 17-06-2022

    public class CandidateDetailsForEmail
    {
        public string FullName { get; set; }
        public string EmailId { get; set; }
    }

    // Added by Anif on 11-07-2022 for requisition email
    public class RoleHolderEmail
    {
        public string RoleHolderEmailId { get; set; }
    }
    // Added by Anif on 13-07-2022

    public class RequisitionDetailsForRoleHolderEmail
    {
        public string RequisitionNo { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int PositionId { get; set; }
        public string PositionName { get; set; }
        public int LocationId { get; set; }
        public string LocationOffice { get; set; }
        public string TargetDate { get; set; }
    }

    // Added by Kuntal on 20-07-2022

    public class ResignationDetailEmail
    {
        public int ResignationId { get; set; }
        public int EmpId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string TargetDate { get; set; }
    }

    public class TrasferDetailEmail
    {
        public int ResignationId { get; set; }
        public int EmpId { get; set; }
        public int NewFunctionId { get; set; }
        public int NewDepartmentId { get; set; }
        public int PositionId { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string TargetDate { get; set; }
    }

    public class SuccessionPlanDetailEmail
    {
        public int ResignationId { get; set; }
        public int EmpId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public int PositionId { get; set; }
        public string EmpName { get; set; }
        public string Designation { get; set; }
        public string LocationOffice { get; set; }
        public string FunctionName { get; set; }
        public string DepartmentName { get; set; }
        public string PositionName { get; set; }
        public string TargetDate { get; set; }
    }

    // END // Added by Kuntal on 20-07-2022
}
