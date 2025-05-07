using System;
using System.Collections.Generic;
using System.Text;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class SearchTrainer
    {
        public int? InductorId { get; set; }
        public Boolean? IsActive { get; set; }
    }
    public class ExternalTrainer
    {
        public int? InductorId { get; set; }
        public string InductorName { get; set; }
        public string InductorEmail { get; set; }
        public Boolean? IsActive { get; set; }
        public int? CreatedBy { get; set; }
    }
}
