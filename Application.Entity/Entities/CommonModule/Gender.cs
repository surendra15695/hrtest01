using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Gender
    {
        public int GenderId { get; set; }
        public string GenderName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchGender
    {
        public int? GenderId { get; set; }
        public bool? IsActive { get; set; }
    }
}
