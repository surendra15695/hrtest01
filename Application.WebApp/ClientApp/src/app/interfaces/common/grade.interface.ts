export interface IGrade{
    gradeId:number;
    gradeName:string;
    isActive:boolean;
    createdBy:number;
}

export interface ISearchGrade{
    gradeId:number;
    isActive:boolean;
}