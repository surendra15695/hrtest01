export interface IVertical{
    verticalId:number;
    //loginUserId:number;
    verticalName:string;
    isActive:boolean;
}

export interface IVerticalFill{
    verticalId:string;
    verticalName:string;
    isActive:boolean;
}

export interface IVerticalRM{
    autoUserId:number;
    empName:string;
    verticalId:number;
    verticalName:string;
}

export interface ISearchVerticalRM{
    autoUserId:number;
    verticalId:number;
}

export interface IVerticalHiringManager{
    autoUserId:number;
    empName:string;
    verticalId:number;
    verticalName:string;
}

export interface ISearchVerticalHiringManager{
    autoUserId:number;
    roleId:number;
    verticalId:number;
}