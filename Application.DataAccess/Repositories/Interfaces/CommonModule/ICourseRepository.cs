using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
  public  interface ICourseRepository
    {
        Task<List<Course>> GetAllCourse(SearchCourse search);
        Task<List<Course>> GetAllCourseList(SearchCourseList search);
        Task<List<QualificationCourse>> GetAllQualificationCourse(SearchQualificationCourse search);
        Task<ReturnMessage> CourseInsertUpdate(Course formData);
        Task<ReturnMessage> QualificationCourseInsertUpdate(QualificationCourseFormData formData);
    }
}
