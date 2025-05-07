using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class SearchNationality
    {
        public int? NationalityId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class NationalityList
    {
        public int? NationalityId { get; set; }
        public Boolean? IsActive { get; set; }
        public string NationalityName { get; set; }
        public int? CreatedBy { get; set; }
    }
}
