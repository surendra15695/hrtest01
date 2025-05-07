using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Language
    {
        public int LanguageId { get; set; }
        public string LanguageName { get; set; }
        public bool IsActive { get; set; }
    }

    public class LanguageFormData
    {
        public int LanguageId { get; set; }
        public string LanguageName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchLanguage
    {
        public int? LanguageId { get; set; }
        public bool? IsActive { get; set; }
    }
}
