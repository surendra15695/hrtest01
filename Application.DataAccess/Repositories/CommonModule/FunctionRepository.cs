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
    public class FunctionRepository : DatabaseContext, IFunctionRepository
    {
        public FunctionRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<VerticalFunction>> GetAllVerticalFunction(SearchFunction search)
        {
            try
            {
                List<VerticalFunction> returnList = new List<VerticalFunction>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Function_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalFunction>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VerticalFunction>> CanidateSearchGetAllVerticalFunction(CandaiteSearchFunction search)
        {
            try
            {
                List<VerticalFunction> returnList = new List<VerticalFunction>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CndidateSearchFunction_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalFunction>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusVerticalFunction>> GetAllCampusVerticalFunction(SearchFunction search)
        {
            try
            {
                List<CampusVerticalFunction> returnList = new List<CampusVerticalFunction>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CampusFunction_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusVerticalFunction>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> VerticalFunctionInsertUpdate(Function formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FunctionName", formData.FunctionName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Function_InsertUpdate";
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

        public async Task<ReturnMessage> CamusVerticalFunctionInsertUpdate(CampusFunction formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@FunctionName", formData.FunctionName);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_CampusFunction_InsertUpdate";
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

        public async Task<List<VerticalFunctionDepartmentHead>> GetAllVerticalFunctionDepartmentHead(SearchVerticalFunctionDepartmentHead search)
        {
            try
            {
                List<VerticalFunctionDepartmentHead> returnList = new List<VerticalFunctionDepartmentHead>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_VerticalFunctionDepartmentHead";
                    connection.Open();
                    returnList = connection.Query<VerticalFunctionDepartmentHead>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FunctionDepartmentHead>> GetAllFunctionDepartmentHead(SearchFunctionDepartmentHead search)
        {
            try
            {
                List<FunctionDepartmentHead> returnList = new List<FunctionDepartmentHead>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoId", search.AutoId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@ApproverautoUserId", search.ApproverautoUserId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FunctionDepartmentHead_GetAll";
                    connection.Open();
                    returnList = connection.Query<FunctionDepartmentHead>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> FunctionDepartmentHeadInsertUpdate(FunctionDepartmentHead formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoId", formData.AutoId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@DepartmentId", formData.DepartmentId);
                    para.Add("@ApproverautoUserId", formData.ApproverautoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_FunctionDepartmentHead_InsertUpdate";
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
        public async Task<List<LocationFunctionList>> GetAllLocationFunction(SearchLocationFunction search)
        {
            try
            {
                List<LocationFunctionList> returnList = new List<LocationFunctionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_LocationWise_Function_GetAll";
                    connection.Open();
                    returnList = connection.Query<LocationFunctionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VerticalFunctionHiringManager>> GetAllVerticalFunctionHiringManager(SearchVerticalFunctionHiringManager search)
        {
            try
            {
                List<VerticalFunctionHiringManager> returnList = new List<VerticalFunctionHiringManager>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HiringManagerFunctionId", search.HiringManagerFunctionId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@HiringManagerAutoUserId", search.HiringManagerAutoUserId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_HiringManager_Function_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalFunctionHiringManager>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> VerticalFunctionHiringManagerInsertUpdate(SaveVerticalFunctionHiringManager formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@HiringManagerFunctionId", formData.HiringManagerFunctionId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@HiringManagerAutoUserId", formData.HiringManagerAutoUserId);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_HiringManager_Function_InsertUpdate";
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
