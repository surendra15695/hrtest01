using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class SearchGradeWiseDocMap
    {
        public int? DocumentMapId { get; set; }
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? GradeId { get; set; }
        public bool ? IsActive { get; set; }

    }
    public class GradeWiseDocMapList
    {
        public int DocumentMapId { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int GradeId { get; set; }
        public string GradeName { get; set; }
        public int AttachmentDocumentTypeId { get; set; }
        public string AttachmentDocumentTypeName { get; set; }
        public int AttachmentDocumentPerticularId { get; set; }
        public string AttachmentDocumentParticularName { get; set; }
        public bool IsActive { get; set; }

    }
    public class SearchGradeWiseDocumentDetails
    {
        public int ? DocumentMapId { get; set; }
    }
    public class GradeWiseDocumentDetails
    {
        public int DocumentMapIDtld { get; set; }
        public int DocumentMapId { get; set; }
        public int AttachmentDocumentNameId { get; set; }
        public string AttachmentDocumentName { get; set; }

    }
    public class GradeWiseDocumentMappingFormData
    {
        public int DocumentMapId { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int GradeId { get; set; }
        public int AttachmentDocumentTypeId { get; set; }
        public int AttachmentDocumentPerticularId { get; set; }
        public bool isActive { get; set; }
        public List<GradeWiseDocumnetFormData> GradeWiseDocuments { get; set; }
        public int CreatedBy { get; set; }
    }
    public class GradeWiseDocumnetFormData
    {
        public int DocumentMapIDtld { get; set; }
        public int DocumentMapId { get; set; }
        public int AttachmentDocumentNameId { get; set; }
    }
    public class GradewiseDocumentCount
    {
        public long DocumentCount { get; set; }
        public int DocumentMapId { get; set; }
    }
}
