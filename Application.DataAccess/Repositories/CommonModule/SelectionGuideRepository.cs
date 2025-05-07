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
    public class SelectionGuideRepository : DatabaseContext, ISelectionGuideRepository
    {
        public SelectionGuideRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<SelectionGuide>> GetAllSelectionGuide(SearchSelectionGuide search)
        {
            try
            {
                List<SelectionGuide> returnList = new List<SelectionGuide>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SelectionGuideId", search.SelectionGuideId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_SelectionGuide_GetAll";
                    connection.Open();
                    returnList = connection.Query<SelectionGuide>(procName, null, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<SelectionGuideInterview>> GetSelectionGuideInterview(SearchSelectionGuideInterview search)
        {
            try
            {
                List<SelectionGuideInterview> returnList = new List<SelectionGuideInterview>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    const string procName = "Usp_RequisitionInterviewName_GetAll";
                    connection.Open();
                    returnList = connection.Query<SelectionGuideInterview>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SelectionGuideInsertUpdate(SelectionGuide formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@SelectionGuideId", formData.SelectionGuideId);
                    para.Add("@SelectionGuideName", formData.SelectionGuideName);
                    para.Add("@InterviewIds", formData.InterviewIds);
                    para.Add("@Description", formData.Description);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsActive", formData.IsActive);
                    const string procName = "Usp_SelectionGuide_InsertUpdate";
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
