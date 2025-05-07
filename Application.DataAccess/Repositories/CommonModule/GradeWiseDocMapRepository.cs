using System;
using System.Collections.Generic;
using System.Text;
using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Dapper;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;

namespace Application.DataAccess.Repositories.CommonModule
{
   public  class GradeWiseDocMapRepository :DatabaseContext, IGradeWiseDocMapRepository
    {
        public GradeWiseDocMapRepository(AppConfiguration appConfiguration)
    : base(appConfiguration)
        { }

        public async Task<List<GradeWiseDocMapList>> GetAllGradeWiseDocumentList(SearchGradeWiseDocMap search)
        {
            try
            {
                List<GradeWiseDocMapList> returnList = new List<GradeWiseDocMapList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DocumentMapId", search.DocumentMapId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_GradewiseDocument_GetAll";
                    connection.Open();
                    returnList = connection.Query<GradeWiseDocMapList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<GradeWiseDocumentDetails>> GetGradeWiseDocumentDetails(SearchGradeWiseDocumentDetails search)
        {
            try
            {
                List<GradeWiseDocumentDetails> returnList = new List<GradeWiseDocumentDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DocumentMapId", search.DocumentMapId);
                    const string procName = "Usp_GradewiseDocumentDetails_GetAll";
                    connection.Open();
                    returnList = connection.Query<GradeWiseDocumentDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> InsertUpdateGradeWiseDocumentMapping(GradeWiseDocumentMappingFormData formData)
        {
            try
            {
                DataTable gradeWiseDocument = CommonUtility.ToDataTable<GradeWiseDocumnetFormData>(formData.GradeWiseDocuments);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DocumentMapId", formData.DocumentMapId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@AttachmentDocumentTypeId", formData.AttachmentDocumentTypeId);
                    para.Add("@AttachmentDocumentPerticularId", formData.AttachmentDocumentPerticularId);
                    para.Add("@isActive", formData.isActive);
                    para.Add("@GradewiseDocumentMapDtl", gradeWiseDocument, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_GradewiseDocumentMap_InsertUpdate";
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
        public async Task<List<GradewiseDocumentCount>> GetGradeWiseDocumentCount(SearchGradeWiseDocMap search)
        {
            try
            {
                List<GradewiseDocumentCount> returnList = new List<GradewiseDocumentCount>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DocumentMapId", search.DocumentMapId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@GradeId", search.GradeId);
                    const string procName = "Usp_GradewiseDocumentCount_GetAll";
                    connection.Open();
                    returnList = connection.Query<GradewiseDocumentCount>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
