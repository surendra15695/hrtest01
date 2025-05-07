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
    public class ModeofJoiningRepository : DatabaseContext,IModeofJoiningRepository
    {
        public ModeofJoiningRepository(AppConfiguration appConfiguration)
      : base(appConfiguration)
        { }
        public async Task<List<ModeofJoining>> GetAllModeOfJoining(GetAllModeofJoiningParam Param)
        {
            try
            {
                List<ModeofJoining> returnList = new List<ModeofJoining>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ModeofJoiningId", Param.ModeofJoiningId);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_ModeofJoining_GetAll";
                    connection.Open();
                    returnList = connection.Query<ModeofJoining>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> ModeOfJoiningInsertUpdate(ModeofJoiningInsertUpdateParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ModeofJoiningId", Param.ModeofJoiningId);
                    para.Add("@ModeofJoiningName", Param.ModeofJoiningName);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_ModeofJoining_InsertUpdate";
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
