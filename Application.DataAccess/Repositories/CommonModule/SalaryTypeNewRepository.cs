using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class SalaryTypeNewRepository : DatabaseContext, ISalaryTypeNewRepository
    {
        public SalaryTypeNewRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

        public async Task<List<SalaryTypeNew>> GetAllSalaryTypeList(SearchSalaryTypeNewList search)
        {
            try
            {
                List<SalaryTypeNew> returnList = new List<SalaryTypeNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_SalaryType_GetAll";
                    para.Add("@SalaryTypeId", search.SalaryTypeId);
                    para.Add("@IsActive", search.IsActive);
                    connection.Open();
                    returnList = connection.Query<SalaryTypeNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

      

        public async Task<ReturnMessage> SalaryTypeInsertUpdate(SalaryTypeNew formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryTypeId", formData.SalaryTypeId);
                    para.Add("@SalaryType", formData.SalaryTypeName);
                    para.Add("@VisualOrder", formData.VisualOrder);
                    para.Add("@Order", formData.Order);
                    para.Add("@Order", formData.Order);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_SalaryType_InsertUpdate";
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
