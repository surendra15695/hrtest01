using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Entity.Entities.CommonModule
{
    public class Interview
    {
        public int InterviewId { get; set; }
        public string InterviewName { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
    }

    public class SearchInterview
    {
        public int? InterviewId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class InterviewRoom
    {
        public int InterviewRoomId { get; set; }
        public string InterviewRoomName { get; set; }
        public bool IsActive { get; set; }
    }

    public class SearchInterviewRoom
    {
        public int? InterviewRoomId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class InterviewPanelMember
    {
        public long AutoUserId { get; set; }
        public string EmpNo { get; set; }
        public string EmpName { get; set; }
        public string EmpNameEmpNo { get; set; }
        public int PanelTypeId { get; set; }
    }

    public class InterviewPanelMemberSave
    {
        public long VerticalId { get; set; }
        public long FunctionId { get; set; }
        public long PanelTypeId { get; set; }
        public string PanelMemberId { get; set; }
        public int CreatedBy { get; set; }
    }

    public class SearchInterviewPanelMember
    {
        public int? VerticalId { get; set; }
        public int? FunctionId { get; set; }
        public int? PanelTypeId { get; set; }
        public bool? IsActive { get; set; }
    }

    public class InterviewRoomSave
    {
        public int InterviewRoomId { get; set; }
        public string InterviewRoomName { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SearchInterviewPanelMemberMapList
    {
        public int ? InerviewPanelMemberMapId { get; set; }
        public int ? InerviewPanelMemberAutoUserId { get; set; }
        public int? VerticalId { get; set; }
        public int ? FunctionId { get; set; }
        public int?  DepartmentId { get; set; }
        public bool ? IsActive { get; set; }
    }

    public class InterviewPanelMemberMapList
    {
        public int InerviewPanelMemberMapId { get; set; }   
        public int InerviewPanelMemberAutoUserId { get; set; }    
        public string InerviewPanelMemberName { get; set; }
        public int VerticalId { get; set; }   
        public string VerticalName { get; set; }   
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SaveInterviewPanelMemberMap
    {
        public int InerviewPanelMemberMapId { get; set; }
        public int InerviewPanelMemberAutoUserId { get; set; }
        public int VerticalId { get; set; }
        public int FunctionId { get; set; }
        public int DepartmentId { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
    }
    public class SearchPanelMemberList
    {
        public long ? AutoId { get; set; }
        public int ? VerticalId { get; set; }
        public int ? FunctionId { get; set; }
        public int ? PanelTypeId { get; set; }
        public bool IsActive { get; set; }
    }
    public class PanelMemberList {
        public long AutoId { get; set; }
        public int VerticalId { get; set; }
        public string VerticalName { get; set; }
        public int FunctionId { get; set; }
        public string FunctionName { get; set; }
        public int PanelTypeId { get; set; }
        public string PanelType { get; set; }
        public long AutoUserId { get; set; }
        public string EmpNameEmpNo { get; set; }
        public bool IsActive { get; set; }
    }
    public class CampusCandidateInterviewFeedbackList
    {
        public int CandidateId { get; set; }
        public int InterviewDetailId { get; set; }
        public string InterviewFeedbackName { get; set; }
        public long CreatedBy { get; set; }
        public int IsEnable { get; set; }
    }
    public class InterviewStatus
    {
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public bool IsActive { get; set; }
    }
    public class SearchInterviewStatus
    {
        public int? StatusId { get; set; }
        public bool? IsActive { get; set; }
    }
}
