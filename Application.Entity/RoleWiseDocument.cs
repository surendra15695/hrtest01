using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class RoleWiseDocumentInput
    {
        public int? AttachmentDocumentNameId { get; set; }
    }

    public class RoleWiseDocumentOutput
    {
        public int AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int AttachmentDocumentParticularId { get; set; }
        public string AttachmentDocumentParticularName { get; set; }
        public int AttachmentDocumentNameId { get; set; }
        public string AttachmentDocumentName { get; set; }
        public string RoleId { get; set; }
        public string RoleName { get; set; }
    }
}
