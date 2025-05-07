export interface ISelectionGuide{
    selectionGuideId:number;
    selectionGuideName:string;
    interviewIds:string;
    interviewNames:string;
    description:string;
    isActive:boolean;
}

export interface ISearchSelectGuide{
    selectionGuideId:number;
    isActive:boolean;
}

export interface ISelectionGuideInterview{
    interviewId:number;
    interviewName:string;
    isActive:number;
}

export interface ISearchSelectionGuideInterview{
    requisitionDetailId:number;
    hiringStatusId:number;
}