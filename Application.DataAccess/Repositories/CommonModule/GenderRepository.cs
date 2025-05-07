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
    public class GenderRepository : DatabaseContext, IGenderRepository
    {
        public GenderRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Gender>> GetAllGender(SearchGender search)
        {
            try
            {
                List<Gender> returnList = new List<Gender>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GenderId", search.GenderId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Gender_GetAll";
                    connection.Open();
                    returnList = connection.Query<Gender>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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