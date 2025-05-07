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
    public class  DomainRepository : DatabaseContext, IDomainRepository
    {
        public DomainRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Domain>> GetAllDomain(SearchDomain search)
        {
            try
            {
                List<Domain> returnList = new List<Domain>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DomainId", search.DomainId);
                    para.Add("@ParentDomainId", search.ParentDomainId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Domain_GetAll";
                    connection.Open();
                    returnList = connection.Query<Domain>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> DomainInsertUpdate(Domain formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DomainId", formData.DomainId);
                    para.Add("@DomainName", formData.DomainName);
                    para.Add("@ParentDomainId", formData.ParentDomainId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_Domain_InsertUpdate";
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
        public async Task<List<SubDomain>> GetAllSubDomain(SearchSubDomain search)
        {
            try
            {
                List<SubDomain> returnList = new List<SubDomain>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SubDomainId", search.SubDomainId);
                    para.Add("@ParentDomainId", search.ParentDomainId);
                    para.Add("@DomainId", search.DomainId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SubDomain_GetAll";
                    connection.Open();
                    returnList = connection.Query<SubDomain>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<NewSubDomain>> GetAllSubDomainNew(SearchSubDomain search)
        {
            try
            {
                List<NewSubDomain> returnList = new List<NewSubDomain>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SubDomainId", search.SubDomainId);
                    para.Add("@DomainId", search.DomainId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SubDomain_GetAllNew";
                    connection.Open();
                    returnList = connection.Query<NewSubDomain>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }
        public async Task<ReturnMessage> SubDomainInsertUpdate(SaveSubDomain formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SubDomainId", formData.SubDomainId);
                    para.Add("@SubDomainName", formData.SubDomainName);
                    para.Add("@ParentDomainId", formData.ParentDomainId);
                    para.Add("@DomainId", formData.DomainId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_SubDomain_InsertUpdate";
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
