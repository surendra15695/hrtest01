using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class AttachmentDocumentType
    {
        public int AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchAttachmentDocumentType
    {
        public int? AttachmentDocumentTypeId { get; set; }
        public bool? IsActive { get; set; }
    }
}
