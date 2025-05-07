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
    public class GradeRepository : DatabaseContext, IGradeRepository
    {
        public GradeRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }


        public async Task<List<PositionGrade>> GetAllPositionGrade(SearchPositionGrade search)
        {
            try
            {
                List<PositionGrade> returnList = new List<PositionGrade>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_GradePosition_GetAll";
                    connection.Open();
                    returnList = connection.Query<PositionGrade>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<Grade>> GetAllGrade(SearchGrade search)
        {
            try
            {
                List<Grade> returnList = new List<Grade>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Grade_GetAll";
                    connection.Open();
                    returnList = connection.Query<Grade>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> GradeInsertUpdate(Grade formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@GradeName", formData.GradeName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Grade_InsertUpdate";
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
