using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;


namespace Application.Service.Services.Interfaces.CommonModule
{
 public   interface IQualificationService
    {
        Task<List<Qualification>> GetAllQualification(SearchQualification search);
        Task<List<Qualification>> GetQualificationAll(SearchQualification search);
        Task<List<QualificationType>> GetAllQualificationType(SearchQualification search);
        Task<ReturnMessage> QualificationInsertUpdate(QualificationFormData formData);
        Task<List<Qualification>> GetAllQualificationActive(SearchQualification search);
    }
}
