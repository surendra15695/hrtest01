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
    public class StatusRepository : DatabaseContext, IStatusRepository
    {
        public StatusRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public async Task<List<Status>> GetAllStatus()
        {
            try
            {
                List<Status> returnList = new List<Status>();
                using (IDbConnection connection = base.GetConnection())
                {
                    const string procName = "Usp_Status_GetAll";
                    connection.Open();
                    returnList = connection.Query<Status>(procName, null, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<StatusForROResignation>> GetAllStatusForROResignation()
        {
            try
            {
                List<StatusForROResignation> returnList = new List<StatusForROResignation>();
                using (IDbConnection connection = base.GetConnection())
                {
                    const string procName = "Usp_StatusRO_GetAll";
                    connection.Open();
                    returnList = connection.Query<StatusForROResignation>(procName, null, commandType: CommandType.StoredProcedure).ToList();
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