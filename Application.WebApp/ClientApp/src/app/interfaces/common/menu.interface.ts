export interface IUserMenu{
    moduleId:number;
    moduleLevel:number;
    moduleName:string;
    subUrl:string;
    sortOrder:string;
    parentModuleId:number;
    iconUrl:string;
    subModuleCount:number;
}

export interface IMenu{
    moduleId:number;
    moduleLevel:number;
    moduleName:string;
    subUrl:string;
    parentModuleId:number;
    iconUrl:string;
    subMenu:ISubMenus[];
}

export interface ISubMenus{
    moduleId:number;
    moduleLevel:number;
    moduleName:string;
    subUrl:string;
    parentModuleId:number;
    iconUrl:string;
}

export interface ISearchMenu{
    autoUserId:number;
}

export interface IRoleMenu{
    RoleId:number;
    ModuleId:number;
}