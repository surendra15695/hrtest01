export interface IStream{
    streamId:number;
    streamName:string;
    isActive:boolean;
}

export interface ISearchStream
{
    streamId:number;
    isActive:boolean;
}

export interface IQualificationCourseStream{
    qualificationId:number;
    qualificationName:string;
    courseId:number;
    courseName:string;
    streamId:number;
    streamName:string;
    isActive:boolean;
}

export interface ISearchQualificationCourseStream{
    qualificationId:number;
    courseId:number;
    streamId:number;
    isActive:boolean;
}