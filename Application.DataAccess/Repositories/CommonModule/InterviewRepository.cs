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
    public class InterviewRepository : DatabaseContext, IInterviewRepository
    {
        public InterviewRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<Interview>> GetAllInterview(SearchInterview search)
        {
            try
            {
                List<Interview> returnList = new List<Interview>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewId", search.InterviewId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Interview_GetAll";
                    connection.Open();
                    returnList = connection.Query<Interview>(procName, null, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InterviewRoom>> GetAllInterviewRoom(SearchInterviewRoom search)
        {
            try
            {
                List<InterviewRoom> returnList = new List<InterviewRoom>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InterviewRoomId", search.InterviewRoomId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_InterviewRoom_GetAll";
                    connection.Open();
                    returnList = connection.Query<InterviewRoom>(procName, null, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<InterviewPanelMember>> GetAllInterviewPanelMember(SearchInterviewPanelMember search)
        {
            try
            {
                List<InterviewPanelMember> returnList = new List<InterviewPanelMember>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@PanelTypeId", search.PanelTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_InterviewPanelMember_GetAll";
                    connection.Open();
                    returnList = connection.Query<InterviewPanelMember>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<PanelMemberList>> GetAllPanelMemberList(SearchPanelMemberList search)
        {
            try
            {
                List<PanelMemberList> returnList = new List<PanelMemberList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoId", search.AutoId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@PanelTypeId", search.PanelTypeId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_InterviewPanelMembers_GetAll";
                    connection.Open();
                    returnList = connection.Query<PanelMemberList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveInterviewRoom(InterviewRoomSave formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@InterviewRoomId", formdata.InterviewRoomId);
                    para.Add("@InterviewRoomName", formdata.InterviewRoomName);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_InterviewRoom_InsertUpdate";
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

        public async Task<ReturnMessage> SaveInterviewPanelMember(InterviewPanelMemberSave formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@VerticalId", formdata.VerticalId);
                    para.Add("@FunctionId", formdata.FunctionId);
                    para.Add("@PanelTypeId", formdata.PanelTypeId);
                    para.Add("@PanelMemberId", formdata.PanelMemberId);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_InterviewPanelMember_InsertUpdate";
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

        public async Task<List<InterviewPanelMemberMapList>> GetAllInterviewPanelMemberMapList(SearchInterviewPanelMemberMapList search)
        {
            try
            {
                List<InterviewPanelMemberMapList> returnList = new List<InterviewPanelMemberMapList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@InerviewPanelMemberMapId", search.InerviewPanelMemberMapId);
                    para.Add("@InerviewPanelMemberAutoUserId", search.InerviewPanelMemberAutoUserId);
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    para.Add("@DepartmentId", search.DepartmentId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Interview_PanelMember_Map_GetAll";
                    connection.Open();
                    returnList = connection.Query<InterviewPanelMemberMapList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveInterviewPanelMemberMapping(SaveInterviewPanelMemberMap formdata)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@InerviewPanelMemberMapId", formdata.InerviewPanelMemberMapId);
                    para.Add("@InerviewPanelMemberAutoUserId", formdata.InerviewPanelMemberAutoUserId);
                    para.Add("@VerticalId", formdata.VerticalId);
                    para.Add("@FunctionId", formdata.FunctionId);
                    para.Add("@DepartmentId", formdata.DepartmentId);
                    para.Add("@IsActive", formdata.IsActive);
                    para.Add("@CreatedBy", formdata.CreatedBy);

                    const string procName = "Usp_Interview_PanelMember_Map_InsertUpdate";
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
        public async Task<List<InterviewStatus>> GetAllInterviewStatus(SearchInterviewStatus search)
        {
            try
            {
                List<InterviewStatus> returnList = new List<InterviewStatus>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StatusId", search.StatusId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_InterViewStatus_GetAll";
                    connection.Open();
                    returnList = connection.Query<InterviewStatus>(procName, null, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusCandidateInterviewFeedbackListInsertUpdate(CampusCandidateInterviewFeedbackList formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InterviewDetailId", formData.InterviewDetailId);
                    para.Add("@InterviewFeedbackName", formData.InterviewFeedbackName);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@IsEnable", formData.IsEnable);
                    const string procName = "Usp_CampusFeedbacklist_InsertUpdate";
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
