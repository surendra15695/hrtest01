export interface IQualification
{
    qualificationId:number;
    qualificationName:string;
    isActive:boolean;
}
export interface IQualificationType
{
    qualificationTypeId:number;
    qualificationTypeName:string;
    isActive:boolean;
}
export interface ISearchQualification
{
    qualificationId:number;
    isActive:boolean;
}

export interface ISearchQulificationClassGaradeDivision{
    qulificationClassGaradeDivisionId:number;
    isActive:boolean;
}

export interface IQulificationClassGaradeDivision{
    qulificationClassGaradeDivisionId:number;
    qulificationClassGaradeDivisionName:string;
    isActive:boolean;
}