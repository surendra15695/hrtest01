export interface ICourse{
    courseId:number;
    courseName:string;
    isActive:boolean;
}

export interface ISearchCourse{
    courseId:number;
    isActive:boolean;
}

export interface IQualificationCourse{
    qualificationId:number;
    qualificationName:string;
    courseId:number;
    courseName:string;
    isActive:boolean;
}

export interface ISearchQualificationCourse{
    qualificationId:number;
    courseId:number;
    isActive:boolean;
}