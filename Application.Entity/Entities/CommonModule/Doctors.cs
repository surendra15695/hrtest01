using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Doctors
    {
        public int DoctorsId { get; set; }
        public string DoctorsName { get; set; }
        public string DoctorNo { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchDoctors
    {
        public int? DoctorsId { get; set; }
        public bool? IsActive { get; set; }
    }
    public class DoctorsInsertUpdateParam
    {
        public int DoctorsId { get; set; }
        public string DoctorsName { get; set; }
        public string EmailId { get; set; }
        public string SaltKey { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
}
