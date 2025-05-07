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
    public class EmailTemplateRepository : DatabaseContext, IEmailTemplateRepository
    {
        public EmailTemplateRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

        public async Task<List<EmailTemplateType>> GetAllEmailTemplateType(SearchEmailTemplateType search)
        {
            try
            {
                List<EmailTemplateType> returnList = new List<EmailTemplateType>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TemplateTypeId", search.TemplateTypeId);                    
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_EmailTeamplateType_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmailTemplateType>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<EmailTemplate>> GetAllEmailTemplate(SearchEmailTemplate search)
        {
            try
            {
                List<EmailTemplate> returnList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TemplateTypeId", search.TemplateTypeId);
                    para.Add("@TemplateId", search.TemplateId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_EmailTemplate_GetAll";
                    connection.Open();
                    returnList = connection.Query<EmailTemplate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<ReturnMessage> EmailTemplateInsertUpdate(AddEmailTemplate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TemplateId", formData.TemplateId);
                    para.Add("@TemplateTypeId", formData.TemplateTypeId);
                    para.Add("@TemplateEmailName", formData.TemplateEmailName);
                    para.Add("@TemplateDescription", formData.TemplateDescription);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_EmailTeamplate_InsertUpdate";
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
