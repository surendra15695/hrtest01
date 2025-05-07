export interface ILocation
{
    locationId:number;
    verticalId:number;
    locationNo:string;
    locationCode:string;
    locationOffice:string;
    isActive:boolean;
    createdBy:number;
}

export interface ISearchLocation
{
    locationId:number;
    verticalId:number;
    locationNo:string;
    locationCode:string;
    isActive:boolean;
}

export interface IsearchVerticalLocation{
    locationId:number;
    verticalIds:string;
    locationNo:string;
    locationCode:string;
    isActive:boolean;
}