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
    public class VenueRepository : DatabaseContext, IVenueRepository
    {
        public VenueRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Venue>> GetAllVenue(SearchVenue search)
        {
            try
            {
                List<Venue> returnList = new List<Venue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VenueId", search.VenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Venue_GetAll";
                    connection.Open();
                    returnList = connection.Query<Venue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<AllInductionVenue>> GetAllInductionVenue(AllInductionVenueParam search)
        {
            try
            {
                List<AllInductionVenue> returnList = new List<AllInductionVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionVenueId", search.InductionVenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_InductionVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllInductionVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<InductionVenueWithExternal>> GetAllInductionVenueExternal(AllInductionVenueParam search)
        {
            try
            {
                List<InductionVenueWithExternal> returnList = new List<InductionVenueWithExternal>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionVenueId", search.InductionVenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_InductionVenueWithExternal_GetAll";
                    connection.Open();
                    returnList = connection.Query<InductionVenueWithExternal>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InductionVenueInsertUpdate(InductionVenueInserUpdateParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InductionVenueId", Param.InductionVenueId);
                    para.Add("@InductionVenueName", Param.InductionVenueName);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    para.Add("@IsExternal", Param.IsExternal);
                    const string procName = "Usp_InductionVenue_InsertUpdate";
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

        public async Task<List<AllReportingVenue>> GetAllReportingVenue(SearchReportingVenue search)
        {
            try
            {
                List<AllReportingVenue> returnList = new List<AllReportingVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportingVenueId", search.ReportingVenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_ReportingVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllReportingVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> ReportingVenueInsertUpdate(ReportingVenueInsertUpdate Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ReportingVenueId", Param.ReportingVenueId);
                    para.Add("@ReportingVenueName", Param.ReportingVenueName);
                    para.Add("@ReportingVenueAddress", Param.ReportingVenueAddress);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_ReportingVenue_InsertUpdate";
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
        // For External Induction Venue-
        public async Task<ReturnMessage> ExternalInductionVenueInsertUpdate(ExternalInductionVenueInserUpdateParam Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ExternalVenueId", Param.ExternalVenueId);
                    para.Add("@ExternalVenueName", Param.ExternalVenueName);
                    para.Add("@ExternalVenueAddress", Param.ExternalVenueAddress);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_ExternalVenue_InsertUpdate";
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

        public async Task<List<AllExternalInductionVenue>> GetAllExternalInductionVenue(SearchExternalInductionVenue search)
        {
            try
            {
                List<AllExternalInductionVenue> returnList = new List<AllExternalInductionVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@ExternalVenueId", search.ExternalVenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_ExternalVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllExternalInductionVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        } //arghya, Date-25-08-2022


        public async Task<List<AllLocationWiseTrainingInCharge>> GetAllLocationWiseTrainingInCharge(SearchLocationWiseTrainingInCharge search)
        {
            try
            {
                List<AllLocationWiseTrainingInCharge> returnList = new List<AllLocationWiseTrainingInCharge>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoId", search.AutoId);
                    para.Add("@LocationId", search.LocationId);
                    const string procName = "Usp_LocationWiseTrainingIncharge_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllLocationWiseTrainingInCharge>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> LocationWiseTrainingInChargeInsertUpdate(LocationWiseTrainingInChargeInsertUpdate Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@LocationInchargeId", Param.AutoId);
                    para.Add("@LocationId", Param.LocationId);
                    para.Add("@AutoUserId", Param.AutoUserId);
                    para.Add("@IsExternal", Param.IsExternal);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_LocationTrainingIncharge_Insert";
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
        public async Task<List<AllInterviewVenue>> GetAllInterviewVenue(SearchInterviewVenue search)
        {
            try
            {
                List<AllInterviewVenue> returnList = new List<AllInterviewVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VenueId", search.InterviewVenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Venue_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllInterviewVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<AllTestVenue>> GetAllTestVenue(SearchTestVenue search)
        {
            try
            {
                List<AllTestVenue> returnList = new List<AllTestVenue>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestVenueId", search.TestVenueId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_TestVenue_GetAll";
                    connection.Open();
                    returnList = connection.Query<AllTestVenue>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> InterviewVenueInsertUpdate(InterviewVenueInsertUpdate Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VenueId", Param.InterviewVenueId);
                    para.Add("@StateId", Param.StateId);
                    para.Add("@VenueName", Param.InterviewVenueName);
                    para.Add("@VenueAddress", Param.InterviewVenueAddress);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_Venue_InsertUpdate";
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

        public async Task<ReturnMessage> TestVenueInsertUpdate(TestVenueInsertUpdate Param)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestVenueId", Param.TestVenueId);
                    para.Add("@StateId", Param.StateId);
                    para.Add("@TestVenueName", Param.TestVenueName);
                    para.Add("@TestVenueAddress", Param.TestVenueAddress);
                    para.Add("@IsActive", Param.IsActive);
                    para.Add("@CreatedBy", Param.CreatedBy);
                    const string procName = "Usp_TestVenue_InsertUpdate";
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

        public async Task<List<FamilyRelationData>> GetFamilyRelation(SearchFamilyRelation Param)
        {
            try
            {
                List < FamilyRelationData> relationDatas = new List<FamilyRelationData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@IsActive", Param.IsActive);
                    const string procName = "Usp_Relationship_GetAllByActive";
                    connection.Open();
                    relationDatas = connection.Query<FamilyRelationData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(relationDatas);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
