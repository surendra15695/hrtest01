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
    public class PositionRepository : DatabaseContext, IPositionRepository
    {
        public PositionRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<PositionVerticalDetail>> GetAllPositionVertical(SearchPosition search)
        {
            try
            {
                List<PositionVerticalDetail> returnList = new List<PositionVerticalDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Position_GetAll";
                    connection.Open();
                    returnList = connection.Query<PositionVerticalDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
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


        public async Task<List<PositionGrade>> GetAllPositionGradeList(SearchPosition search)
        {
            try
            {
                List<PositionGrade> returnList = new List<PositionGrade>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_PostionGrade_GetAll";
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

        public async Task<ReturnMessage> SavePositionVerical(PositionVertical formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@PositionName", formData.PositionName);
                    para.Add("@VerticalIds", formData.VerticalIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Position_InsertUpdate";
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

        public async Task<List<PositionMaster>> GetAllPositionMasterList(SearchPositionMaster search)
        {
            try
            {
                List<PositionMaster> returnList = new List<PositionMaster>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_PositionMaster_GetAll";
                    connection.Open();
                    returnList = connection.Query<PositionMaster>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SavePositionMaster(PositionMaster formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@PositionName", formData.PositionName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_PositionMaster_InsertUpdate";
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

        public async Task<List<GradePositionAll>> GetAllGradePosition(SearchPositionGrade search)
        {
            try
            {
                List<GradePositionAll> returnList = new List<GradePositionAll>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_GradePosition_GetAll";
                    connection.Open();
                    returnList = connection.Query<GradePositionAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<GradePositionAllNew>> GetAllGradePositionNew(SearchPositionGradeNew search)
        {
            try
            {
                List<GradePositionAllNew> returnList = new List<GradePositionAllNew>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", search.GradeId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Grade_GetAll_New_For_Mapping";
                    connection.Open();
                    returnList = connection.Query<GradePositionAllNew>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveGradePosition(PositionGradeSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@PositionIds", formData.PositionIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_GradePosition_InsertUpdate";
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


        public async Task<ReturnMessage> SaveVerticalPosition(VerticalWisePositionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_VerticalWisePosition_Insert";
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

        public async Task<List<VerticalWisePositionList>> GetAllVerticalWisePosition(SearchVerticalWisePositionList search)
        {
            try
            {
                List<VerticalWisePositionList> returnList = new List<VerticalWisePositionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    const string procName = "Usp_VerticalWisePosition_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalWisePositionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<VerticalWisePositionList>> GetAllVerticalPositionForMapping(SearchVerticalWisePositionList search)
        {
            try
            {
                List<VerticalWisePositionList> returnList = new List<VerticalWisePositionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    const string procName = "Usp_VerticalPosition_GetAll";
                    connection.Open();
                    returnList = connection.Query<VerticalWisePositionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<FunctionWisePositionList>> GetAllFunctionWisePosition(SearchFunctionWisePositionList search)
        {
            try
            {
                List<FunctionWisePositionList> returnList = new List<FunctionWisePositionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_FunctionWisePosition_GetAll";
                    connection.Open();
                    returnList = connection.Query<FunctionWisePositionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> SaveFunctionWisePosition(FunctionWisePositionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@PositionId", formData.PositionId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_FunctionWisePosition_Insert";
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

        public async Task<List<FunctionPosition>> GetAllFunctionPosition(SearchFunctionPosition search)
        {
            try
            {
                List<FunctionPosition> returnList = new List<FunctionPosition>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FunctionWise_Position_GetAll";
                    connection.Open();
                    returnList = connection.Query<FunctionPosition>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
