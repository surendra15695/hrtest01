export interface IFunctionDepartment
{
    departmentId:number;
    departmentName:string;
    verticalId:number;
    verticalName:string;
    functionName:string;
    functionId:number;
    isActive:boolean;
}

export interface ISearchDepartment
{
    departmentId:number;
    functionId:number;
    verticalId:number;
    isActive:boolean;
}