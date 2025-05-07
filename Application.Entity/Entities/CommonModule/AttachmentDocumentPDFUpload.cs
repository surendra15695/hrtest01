using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class SearchPDFUpload
    {
        public int? PDFDocId { get; set; }
        public Boolean? IsActive { get; set; }
    }

    public class UploadPDFList
    {
        public int? PDFDocId { get; set; }
        public bool? IsActive { get; set; }
        public int? AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int? AttachmentDocumentParticularId { get; set; }
        public string AttachmentDocumentParticularName { get; set; }
        public int? AttachmentDocumentNameId { get; set; }
        public string AttachmentDocumentName { get; set; }
        public string FileName { get; set; }
        public string DocumentPath { get; set; }
        public int? CreatedBy { get; set; }

    }
    public class SearchDownloadPDF
    {
        public int? PDFDocId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class DownloadPDFList
    {
        public int? PDFDocId { get; set; }
        public int? AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int? AttachmentDocumentParticularId { get; set; }
        public string AttachmentDocumentParticularName { get; set; }
        public bool? IsActive { get; set; }
        public int? AttachmentDocumentNameId { get; set; }
        public string AttachmentDocumentName { get; set; }
        public string FileName { get; set; }
        public string DocumentPath { get; set; }
        public int? CreatedBy { get; set; }
    }
    // arg
}
