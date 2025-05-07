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
    public class LocationRepository : DatabaseContext, ILocationRepository
    {
        public LocationRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }

        public async Task<List<Location>> GetAllVerticalLocation(SearchVerticalLocation search)
        {
            try
            {
                List<Location> returnList = new List<Location>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalIds", search.VerticalIds);
                    para.Add("@LocationNo", search.LocationNo);
                    para.Add("@LocationNo", search.LocationNo);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_VerticalLocation_GetAll";
                    connection.Open();
                    returnList = connection.Query<Location>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<FunctionwiseLocation>> GetAllFunctionWiseLocation(SearchFunctionLocation search)
        {
            try
            {
                List<FunctionwiseLocation> returnList = new List<FunctionwiseLocation>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@FunctionIds", search.FunctionIds);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_FunctionWiseLocation_GetAll";
                    connection.Open();
                    returnList = connection.Query<FunctionwiseLocation>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<Location>> GetAllLocation(SearchLocation search)
        {
            try
            {
                List<Location> returnList = new List<Location>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@LocationNo", search.LocationNo);
                    para.Add("@LocationNo", search.LocationNo);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Location_GetAll";
                    connection.Open();
                    returnList = connection.Query<Location>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> LocationInsertUpdate(Location formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationNo", formData.LocationNo);
                    para.Add("@LocationCode", formData.LocationCode);
                    para.Add("@LocationOffice", formData.LocationOffice);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Location_InsertUpdate";
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

        public async Task<List<LocationWiseFunction>> GetAllLocationWiseFunction(SearchLocationWiseFunction search)
        {
            try
            {
                List<LocationWiseFunction> returnList = new List<LocationWiseFunction>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", search.LocationId);
                    const string procName = "Usp_LocationWiseFunction_GetAll";
                    connection.Open();
                    returnList = connection.Query<LocationWiseFunction>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> LocationWiseFunctionSave(LocationWiseFunctionSave formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_LocationWiseFunction_Insert";
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

        public async Task<List<UnmappedLocations>> GetAllUnmappedLocations(SearchMappedLocation formData)
        {
            try
            {
                List<UnmappedLocations> returnList = new List<UnmappedLocations>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@isActive", formData.isActive);
                    const string procName = "Usp_Unmapped_Location_GetAll";
                    connection.Open();
                    returnList = connection.Query<UnmappedLocations>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
