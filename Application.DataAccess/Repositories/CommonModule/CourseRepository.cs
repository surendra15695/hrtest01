using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class CourseRepository : DatabaseContext, ICourseRepository
    {
        public CourseRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Course>> GetAllCourse(SearchCourse search)
        {
            try
            {
                List<Course> returnList = new List<Course>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_Course_GetAll";
                    connection.Open();
                    returnList = connection.Query<Course>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Course>> GetAllCourseList(SearchCourseList search)
        {
            try
            {
                List<Course> returnList = new List<Course>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_CourseList_GetAll";
                    para.Add("@CourseId", search.CourseId);
                    para.Add("@IsActive", search.IsActive);
                    connection.Open();
                    returnList = connection.Query<Course>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<QualificationCourse>> GetAllQualificationCourse(SearchQualificationCourse search)
        {
            try
            {
                List<QualificationCourse> returnList = new List<QualificationCourse>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QualificationId", search.QualificationId);
                    para.Add("@CourseId", search.CourseId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_QualificationCourse_GetAll";
                    connection.Open();
                    returnList = connection.Query<QualificationCourse>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CourseInsertUpdate(Course formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CourseId", formData.CourseId);
                    para.Add("@CourseName", formData.CourseName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Course_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> QualificationCourseInsertUpdate(QualificationCourseFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QualificationId", formData.QualificationId);
                    para.Add("@CourseId", formData.CourseId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_QualificationCourse_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
