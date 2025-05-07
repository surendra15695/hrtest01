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
   public class VerticalRepository : DatabaseContext, IVerticalRepository
    {
        public VerticalRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Vertical>> GetAllVertical(SearchVertical search)
        {
            try
            {
                List<Vertical> returnList = new List<Vertical>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                     const string procName = "Usp_Vertical_GetAll";
                    connection.Open();
                    returnList = connection.Query<Vertical>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusVertical>> GetAllCampusVertical(SearchVertical search)
        {
            try
            {
                List<CampusVertical> returnList = new List<CampusVertical>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_CampusVertical_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusVertical>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VerticalRM>> GetAllVerticalRM(SearchVerticalRM search)
        {
            try
            {
                List<VerticalRM> returnList = new List<VerticalRM>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId",search.AutoUserId);
                    para.Add("@VerticalId",search.VerticalId);
                     const string procName = "Usp_VerticalRM_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalRM>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VerticalHiringManager>> GetAllVerticalHiringManager(SearchVerticalHiringManager search)
        {
            try
            {
                List<VerticalHiringManager> returnList = new List<VerticalHiringManager>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@RoleId", search.RoleId);
                    const string procName = "Usp_VerticalHiringManager_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalHiringManager>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<VerticalHiringManager>> GetAllVerticalFunctionHiringManager(SearchVerticalFunctHiringManager search)
        {
            try
            {
                List<VerticalHiringManager> returnList = new List<VerticalHiringManager>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    para.Add("@RoleId", search.RoleId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_VerticalFunctionHiringManager_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalHiringManager>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> VerticalRMInsertUpdate(VerticalRMSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_VerticalRM_InsertUpdate";
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
