using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IStreamRepository
    {
        Task<List<Stream>> GetAllStream(SearchStream search);
        Task<List<Stream>> GetAllStreamList(SearchStreamList search);
        Task<List<QualificationCourseStream>> GetAllQualificationCourseStream(SearchQualificationCourseStream search);
        Task<ReturnMessage> StreamInsertUpdate(Stream formData);
        Task<ReturnMessage> QualificationCourseStreamInsertUpdate(QualificationCourseStreamFormData formData);
    }
}
