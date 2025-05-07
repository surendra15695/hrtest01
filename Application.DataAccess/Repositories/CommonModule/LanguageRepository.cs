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
    public class LanguageRepository : DatabaseContext, ILanguageRepository
    {
        public LanguageRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Language>> GetAllLanguage(SearchLanguage search)
        {
            try
            {
                List<Language> returnList = new List<Language>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LanguageId", search.LanguageId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Language_GetAll";
                    connection.Open();
                    returnList = connection.Query<Language>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> LanguageInsertUpdate(LanguageFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LanguageId", formData.LanguageId);
                    para.Add("@LanguageName", formData.LanguageName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Language_InsertUpdate";
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
