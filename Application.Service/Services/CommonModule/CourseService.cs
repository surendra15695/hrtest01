using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public  class CourseService : ICourseService
    {
        private readonly ICourseRepository courseRepository;

        public CourseService(ICourseRepository courseRepository)
        {
            this.courseRepository = courseRepository;
        }

        public async Task<List<Course>> GetAllCourse(SearchCourse search)
        {
            return await this.courseRepository.GetAllCourse(search);
        }

        public async Task<List<Course>> GetAllCourseList(SearchCourseList search)
        {
            return await this.courseRepository.GetAllCourseList(search);
        }

        public async Task<List<QualificationCourse>> GetAllQualificationCourse(SearchQualificationCourse search)
        {
            return await this.courseRepository.GetAllQualificationCourse(search);
        }

        public async Task<ReturnMessage> CourseInsertUpdate(Course formData)
        {
            return await this.courseRepository.CourseInsertUpdate(formData);
        }

        public async Task<ReturnMessage> QualificationCourseInsertUpdate(QualificationCourseFormData formData)
        {
            return await this.courseRepository.QualificationCourseInsertUpdate(formData);
        }
    }
}
