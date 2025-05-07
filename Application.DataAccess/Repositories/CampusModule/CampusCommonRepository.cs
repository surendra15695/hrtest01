using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.Entity.Entities.CampusModule;
using Application.Entity.Entities.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.CampusModule
{
    public class CampusCommonRepository : DatabaseContext, ICampusCommonRepository
    {
        public CampusCommonRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }

        public async Task<ReturnMessage> CampusCourseInsertUpdate(CampusCourse formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CourseName", formData.CourseName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_CampusCourse_InsertUpdate";
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
        public async Task<List<CampusCourse>> GetAllCampusCourse(SearchCampusCourse search)
        {
            try
            {
                List<CampusCourse> returnList = new List<CampusCourse>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCourseId", search.CampusCourseId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CampusCourse_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusCourse>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusStreamInsertUpdate(CampusStream formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusStreamId", formData.CampusStreamId);
                    para.Add("@StreamName", formData.StreamName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_CampusStream_InsertUpdate";
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
        public async Task<List<CampusStream>> GetAllCampusStream(SearchCampusStream search)
        {
            try
            {
                List<CampusStream> returnList = new List<CampusStream>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusStreamId", search.CampusStreamId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CampusStream_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusStream>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusCourseStreamInsertUpdate(CampusCourseStreamFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusStreamId", formData.CampusStreamId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCourseStream_InsertUpdate";
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

        public async Task<List<CampusCouseStream>> GetAllCampusCouseStream()
        {
            try
            {
                List<CampusCouseStream> returnList = new List<CampusCouseStream>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_CampusCourseStream_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusCouseStream>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusYearInsertUpdate(CampusYear formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CampusYearName", formData.CampusYearName);
                    para.Add("@CampusFromYear", formData.CampusFromYear);
                    para.Add("@CampusToYear", formData.CampusToYear);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusYear_InsertUpdate";
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

        public async Task<List<CampusYear>> GetAllCampusYear(SearchCampusYear search)
        {
            try
            {
                List<CampusYear> returnList = new List<CampusYear>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusYearId", search.CampusYearId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CampusYear_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusYear>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusCollegeCategory>> GetAllCampusCollegeCategory()
        {
            try
            {
                List<CampusCollegeCategory> returnList = new List<CampusCollegeCategory>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    const string procName = "Usp_CampusCollegeCategory_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusCollegeCategory>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusCollegeInsertUpdate(CampusCollegeFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCollegeId", formData.CampusCollegeId);
                    para.Add("@CollegeCategoryId", formData.CollegeCategoryId);
                    para.Add("@CollegeName", formData.CollegeName);
                    para.Add("@CountryId", formData.CountryId);
                    para.Add("@StateId", formData.StateId);
                    para.Add("@CollegeAddress", formData.CollegeAddress);
                    para.Add("@ContactName", formData.ContactName);
                    para.Add("@ContactDesignation", formData.ContactDesignation);
                    para.Add("@ContactEmailId", formData.ContactEmailId);
                    para.Add("@ContactNo", formData.ContactNo);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CollegeType", formData.CollegeType);
                    const string procName = "Usp_CampusCollege_InsertUpdate";
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

        public async Task<List<CampusCollegeList>> GetAllCampusCollege(SearchCampusCollege search)
        {
            try
            {
                List<CampusCollegeList> returnList = new List<CampusCollegeList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCollegeId", search.CampusCollegeId);
                    para.Add("@CountryId", search.CountryId);
                    para.Add("@StateId", search.StateId);
                    para.Add("@CollegeCategoryId", search.CollegeCategoryId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_CampusCollege_GetAll";
                    connection.Open();
                    returnList = connection.Query<CampusCollegeList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusFunctionwiseRequisition>> GetCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search)
        {
            try
            {
                List<CampusFunctionwiseRequisition> returnList = new List<CampusFunctionwiseRequisition>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", search.CampusLinkId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_CampusCandidate_FunctionWiseRequisition";
                    connection.Open();
                    returnList = connection.Query<CampusFunctionwiseRequisition>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusFunctionwiseRequisition>> GetOffCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search)
        {
            try
            {
                List<CampusFunctionwiseRequisition> returnList = new List<CampusFunctionwiseRequisition>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", search.CampusLinkId);
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_OffCampusCandidate_FunctionWiseRequisition";
                    connection.Open();
                    returnList = connection.Query<CampusFunctionwiseRequisition>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
