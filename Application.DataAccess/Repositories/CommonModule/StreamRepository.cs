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
    public class StreamRepository : DatabaseContext, IStreamRepository
    {
        public StreamRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Stream>> GetAllStream(SearchStream Stream)
        {
            try
            {
                List<Stream> returnList = new List<Stream>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_Stream_GetAll";
                    connection.Open();
                    returnList = connection.Query<Stream>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Stream>> GetAllStreamList(SearchStreamList Stream)
        {
            try
            {
                List<Stream> returnList = new List<Stream>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StreamId", Stream.StreamId);
                    para.Add("@IsActive", Stream.IsActive);
                    const string procName = "Usp_StreamList_GetAll";
                    connection.Open();
                    returnList = connection.Query<Stream>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<QualificationCourseStream>> GetAllQualificationCourseStream(SearchQualificationCourseStream search)
        {
            try
            {
                List<QualificationCourseStream> returnList = new List<QualificationCourseStream>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QualificationId", search.QualificationId);
                    para.Add("@CourseId", search.CourseId);
                    para.Add("@StreamId", search.StreamId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_QualificationCourseStream_GetAll";
                    connection.Open();
                    returnList = connection.Query<QualificationCourseStream>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> StreamInsertUpdate(Stream formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StreamId", formData.StreamId);
                    para.Add("@StreamName", formData.StreamName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Stream_InsertUpdate";
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

        public async Task<ReturnMessage> QualificationCourseStreamInsertUpdate(QualificationCourseStreamFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@QualificationId", formData.QualificationId);
                    para.Add("@CourseId", formData.CourseId);
                    para.Add("@StreamId", formData.StreamId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_QualificationCourseStream_InsertUpdate";
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
