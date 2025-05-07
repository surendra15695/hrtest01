export interface IJobType
{
    jobTypeId:number;
    jobTypeName:string;
    isActive:boolean;
    createdBy:number;
}

export interface ISearchJobType
{
    jobTypeId:number;
    isActive:boolean;
}