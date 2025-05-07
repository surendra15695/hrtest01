using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class AttachmentDocumentNameDetails
    {
        public int AttachmentDocumentNameId { get; set; }
        public string AttachmentDocumentName { get; set; }
        public int AttachmentDocumentParticularId { get; set; }
        public string AttachmentDocumentParticularName { get; set; }
        public int AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchAttachmentDocumentName
    {
        public int? AttachmentDocumentNameId { get; set; }
        public int? AttachmentDocumentParticularId { get; set; }
        public bool? IsActive { get; set; }
    }
}
