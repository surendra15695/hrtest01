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
using Application.DataAccess.Utility;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class PaystructureRepository : DatabaseContext, IPaystructureRepository
    {
        public PaystructureRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<ClaCulatePayStructure> CalculatePayStructure(SearchCalculatePayStructure Search)
        {
            try
            {
                DataTable dtSalary = CommonUtility.ToDataTable<ClaCulatePayStructureSearch>(Search.CalculteSalryDetails);

                ClaCulatePayStructure dataList = new ClaCulatePayStructure();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@Salary", dtSalary, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_GetPaystructureCalculation_All";
                    connection.Open();
                    //returnList = connection.Query<Salary>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ClaCulatePayStructureHeader = returnList.Read<ClaCulatePayStructureHeader>().FirstOrDefault();
                    dataList.ClaCulatePayStructureValue = returnList.Read<ClaCulatePayStructureValue>().ToList();
                    dataList.ClaCulatePayStructureValueFormat = returnList.Read<ClaCulatePayStructureValueFormat>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<SalaryTemplate> GetSalaryTemplate(SearchSalaryTemplate search)
        {
            try
            {
                SalaryTemplate dataList = new SalaryTemplate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryTemplateId", search.SalaryTemplateId);
                    para.Add("@Grade", search.Grade);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SalaryTemplate_GetAll";
                    connection.Open();
                    //returnList = connection.Query<DocumentCollectionDataRecruiterAll>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.SalaryTemplateMasterData = returnList.Read<SalaryTemplateMasterData>().FirstOrDefault();
                    dataList.SalaryTemplateDetails = returnList.Read<SalaryTemplateDetails>().ToList();
                    dataList.SalaryTemplateDetailsFormat = returnList.Read<SalaryTemplateDetailsFormat>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveSalaryTemplate(SalaryTemplateData formData)
        {
            try
            {
                DataTable dtSalary = CommonUtility.ToDataTable<ClaCulatePayStructureSearch>(formData.CalculteSalryDetails);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryTemplateId", formData.SalaryTemplateId);
                    para.Add("@SalaryTemplateName", formData.SalaryTemplateName);
                    para.Add("@Grade", formData.Grade);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@Salary", dtSalary, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_Paystructure_InsertUpdate";
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

        public async Task<List<SalaryType>> GetAllSalaryType(SearchSalaryType search)
        {
            try
            {
                List<SalaryType> returnList = new List<SalaryType>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryTypeId", search.SalaryTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SalaryType_GetAll";
                    connection.Open();
                    returnList = connection.Query<SalaryType>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SalaryAccountHead>> GetAllSalaryAccountHead(SearchSalaryAccountHead search)
        {
            try
            {
                List<SalaryAccountHead> returnList = new List<SalaryAccountHead>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryAccountHeadId", search.SalaryAccountHeadId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SalaryAccountHead_GetAll";
                    connection.Open();
                    returnList = connection.Query<SalaryAccountHead>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveSalaryType(SalaryType formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@SalaryTypeId", formdata.SalaryTypeId);
                    para.Add("@SalaryType", formdata.SalaryTypeName);
                    para.Add("@VisualOrder", formdata.VisualOrder);
                    para.Add("@Order", formdata.Order);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_SalaryType_InsertUpdate";
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

        public async Task<ReturnMessage> SaveSalaryAccountHead(SalaryAccountHead formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@SalaryAccountHeadId", formdata.SalaryAccountHeadId);
                    para.Add("@SalaryAccountHeadName", formdata.SalaryAccountHeadName);
                    para.Add("@SalaryTypeId", formdata.SalaryTypeId);
                    para.Add("@CalculationType", formdata.CalCulationType);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_SalaryAccountHead_InsertUpdate";
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

        public async Task<List<SalaryTemplateMasterData>> GetSalaryTemplateList(SearchSalaryTemplate search)
        {
            try
            {
                List<SalaryTemplateMasterData> returnList = new List<SalaryTemplateMasterData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryTemplateId", search.SalaryTemplateId);
                    para.Add("@Grade", search.Grade);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SalaryTemplateList_GetAll";
                    connection.Open();
                    returnList = connection.Query<SalaryTemplateMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SalaryTemplateFormula>> GetSalaryTemplateFormula(SearchSalaryTemplate search)
        {
            try
            {
                List<SalaryTemplateFormula> returnList = new List<SalaryTemplateFormula>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SalaryTemplateId", search.SalaryTemplateId);
                    const string procName = "Usp_SalaryTemplateFormulaList_GetAll";
                    connection.Open();
                    returnList = connection.Query<SalaryTemplateFormula>(procName, para, commandType: CommandType.StoredProcedure).ToList();
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
