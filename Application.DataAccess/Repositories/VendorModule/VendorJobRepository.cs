using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.VendorModule;
using Application.Entity.Entities.VendorModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Application.DataAccess.Repositories.VendorModule
{
    public class VendorJobRepository : DatabaseContext, IVendorJobRepository
    {
        public VendorJobRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<CurrentJob>> GetCurrentJob(SearchCurrentJob search)
        {
            try
            {
                List<CurrentJob> returnList = new List<CurrentJob>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PositionId", (search.PositionId.ToString() == "" ? 0 : search.PositionId));
                    para.Add("@FunctionId", (search.FunctionId.ToString() == "" ? 0 : search.FunctionId));
                    para.Add("@LocationId", (search.LocationId.ToString() == "" ? 0 : search.LocationId));
                    const string procName = "Usp_Vendor_CurrentJob";
                    connection.Open();
                    returnList = connection.Query<CurrentJob>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VendorJobList>> GetVendorJobList(SearchVendorJobList search)
        {
            try
            {
                List<VendorJobList> returnList = new List<VendorJobList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorId", search.VendorId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@StateId", search.StateId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_RequisitionAllocatedToVendor_GetAll";
                    connection.Open();
                    returnList = connection.Query<VendorJobList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<VendorJobList>> GetArchivedJobList(SearchVendorJobList search)
        {
            try
            {
                List<VendorJobList> returnList = new List<VendorJobList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VendorId", search.VendorId);
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@PositionId", search.PositionId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@LocationId", search.LocationId);
                    para.Add("@StateId", search.StateId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_ArchivedRequisitionAllocatedToVendor_GetAll";
                    connection.Open();
                    returnList = connection.Query<VendorJobList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
