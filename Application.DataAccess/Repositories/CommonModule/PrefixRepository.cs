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
    public class PrefixRepository : DatabaseContext, IPrefixRepository
    {
        public PrefixRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Prefix>> GetAllPrefix(SearchPrefix search)
        {
            try
            {
                List<Prefix> returnList = new List<Prefix>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PrefixId", search.PrefixId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Prefix_GetAll";
                    connection.Open();
                    returnList = connection.Query<Prefix>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
