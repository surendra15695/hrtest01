export interface ICampusCourse{
    campusCourseId:number;
    courseName:string;
    isActive:boolean;
}

export interface ISearchCampusCourse{
    campusCourseId:number;
    isActive:boolean;
}

export interface ICampusStream{
    campusStreamId:number;
    streamName:string;
    isActive:boolean;
}

export interface ISearchCampusStream{
    campusStreamId:number;
    isActive:boolean;
}

export interface ICampusCourseStream{
    campusCourseId:number;
    courseName:string;
    campusStreamId:number;
    streamName:string;
    isActive:boolean;
}

export interface ICampusYear{
    campusYearId:number;
    campusYearName:string;
    campusFromYear:number;
    campusToYear:number;
    isActive:boolean;
}

export interface ISearchCampusYear{
    campusYearId:number;
    isActive:boolean;
}

export interface ICampusCollegeCategory{
    collegeCategoryId:number;
    collegeCategoryName:string;
    isActive:boolean;
}

export interface ICampusCollege{
    campusCollegeId:number;
    collegeName:string;
    countryId:number;
    countryName:string;
    stateId:number;
    statename:string;
    collegeAddress:string;
    collegeCategoryId:number;
    collegeCategoryName:string;
    contactName:string;
    contactDesignation:string;
    contactEmailId:string;
    contactNo:string;
    isActive:boolean;
}

export interface ISearchCampusCollege{
    campusCollegeId:number;
    isActive:boolean;
    countryId:number;
    stateId:number;
    collegeCategoryId:number;
}