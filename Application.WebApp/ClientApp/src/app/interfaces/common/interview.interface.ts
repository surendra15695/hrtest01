export interface ISearchInterview{
    InterviewId:number;
    IsActive:boolean;
}

export interface IInterview{
    interviewId:number;
    interviewName:string;
    isActive:boolean;
    createdBy:number;
}

export interface IInterviewRoom{
    interviewRoomId:number;
    interviewRoomName:string;
    isActive:boolean;
}

export interface ISearchInterviewRoom{
    interviewRoomId:number;
    isActive:boolean;
}

export interface IInterviewPanelMember{
    autoUserId:number;
    empNo:string;
    empName:string;
    empNameEmpNo:string;
    panelTypeId:number;
}

export interface ISearchInterviewPanelMember{
    verticalId:number;
    functionId:number;
    panelTypeId:number;
    isActive:boolean;
}

