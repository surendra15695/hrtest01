using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Domain
    {
        public int DomainId { get; set; }
        public string DomainName { get; set; }
        public int ParentDomainId { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SearchDomain
    {
        public int? DomainId { get; set; }
        public int? ParentDomainId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class SubDomain
    {
         public int SubDomainId { get; set; }   
         public string SubDomainName { get; set; }
         public int ParentDomainId { get; set; }
         public int DomainId { get; set; }
         public string DomainName { get; set; }
         public bool IsActive { get; set; }
         public int CreatedBy { get; set; }
         public DateTime  CreatedOn { get; set; }
         public int ModifiedBy { get; set; }
         public DateTime ModifiedOn { get; set; }
         public string ParentDomainName { get; set; }

    }
    public class NewSubDomain
    {
        public int DomainId { get; set; }
        public string DomainName { get; set; }
        public int SubdomainId { get; set; }
        public string SubdomainName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchSubDomain
    {
        public int ? SubDomainId { get; set; }
        public int ? ParentDomainId { get; set; }
        public int ? DomainId { get; set; }
        public bool ? IsActive { get; set; }
    }
    public class SaveSubDomain
    {
        public int ? SubDomainId { get; set; }
        public string SubDomainName { get; set; }
        public int ParentDomainId { get; set; }
        public int DomainId { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
}
