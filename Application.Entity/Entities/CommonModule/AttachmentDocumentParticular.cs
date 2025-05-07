using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class AttachmentDocumentParticular
    {
        public int AttachmentDocumentParticularId { get; set; }
        public string AttachmentDocumentParticularName { get; set; }
        public int AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchAttachmentDocumentParticular
    {
        public int? AttachmentDocumentParticularId { get; set; }
        public int? AttachmentDocumentTypeId { get; set; }
        public bool? IsActive { get; set; }
    }
}
