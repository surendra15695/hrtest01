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
using Application.DataAccess.Utility;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class GradeSalaryRepository : DatabaseContext, IGradeSalaryRepository
    {
        public GradeSalaryRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }

        public async Task<List<SalaryHead>> GetAllSalaryHead(SearchSalaryHead search)
        {
            try
            {
                List<SalaryHead> returnList = new List<SalaryHead>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_SalaryHead_GetAll";
                    para.Add("@SalaryHeadId", search.SalaryHeadId);
                    para.Add("@IsActive", search.IsActive);
                    connection.Open();
                    returnList = connection.Query<SalaryHead>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveSalaryHead(SalaryHead formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryHeadId", formdata.SalaryHeadId);
                    para.Add("@SalaryHeadName", formdata.SalaryHeadName);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);                    
                    const string procName = "Usp_SalaryHead_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SalaryGradeTemplate>> GetAllSalaryGradeTemplate(SearchGradeTemplate search)
        {
            try
            {
                List<SalaryGradeTemplate> returnList = new List<SalaryGradeTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_SalaryGradeTemplate_GetAll";
                    para.Add("@TemplateId", search.TemplateId);
                    para.Add("@Grade", search.Grade);
                    para.Add("@IsActive", search.IsActive);
                    connection.Open();
                    returnList = connection.Query<SalaryGradeTemplate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveSalaryGradeTemplate(SalaryGradeTemplate formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TemplateId", formdata.TemplateId);
                    para.Add("@TemplateName", formdata.TemplateName);
                    para.Add("@Grade", formdata.Grade);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);
                    const string procName = "Usp_SalaryGradeTemplate_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault(); ;
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<GradeSalary>> GetAllGradeSalary(SearchGradeSalary search)
        {
            try
            {
                List<GradeSalary> returnList = new List<GradeSalary>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_GradeSalary_GetAll";
                    para.Add("@Template", search.Template);
                    para.Add("@Grade", search.Grade);
                    para.Add("@IsActive", search.IsActive);
                    connection.Open();
                    returnList = connection.Query<GradeSalary>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveGradeSalary(GradeSalary formData)
        {
            try
            {
                DataTable dtSalaryDetails = CommonUtility.ToDataTable<GradeSalaryDetails>(formData.SalaryDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeSalaryId", formData.GradeSalaryId);
                    para.Add("@Template", formData.Template);
                    para.Add("@Grade", formData.Grade);
                    para.Add("@Salary", dtSalaryDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_GradeSalary_InsertUpdate";
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
