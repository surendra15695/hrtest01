using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class BatchParam
    {
        public long? BatchId { get; set; }
        public int? Vertical { get; set; }
        public Boolean? IsActive { get; set; }
        public long? LoginUserId { get; set; }
    }
    public class Batch
    {
        public long BatchId { get; set; }
        public string BatchName { get; set; }
        public string BatchNo { get; set; }
        public int Vertical { get; set; }
        public string VerticalName { get; set; }
        public Boolean IsActive { get; set; }
        public long CreatedBy { get; set; }
    }
}
