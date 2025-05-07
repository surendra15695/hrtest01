using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class SearchRelation
    {
        public int? RelationshipId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class RelationshipList
    {
        public int? RelationshipId { get; set; }
        public Boolean? IsActive { get; set; }
        public string RelationshipName { get; set; }
        public int? CreatedBy { get; set; }
    }
}
