export interface IVerticalFunction {
    functionId: number;
    functionName: string;
    verticalId: number;
    verticalName: string;
    isActive: boolean;
}

export interface ISearchFunction {
    verticalId: number;
    functionId: number;
    isActive: boolean;
}

export interface IVerticalFunctionDepartmentHead {
    autoUserId: number;
    verticalId: number;
    verticalName: string;
    functionId: number;
    functionName: string;
    departmentId: number;
    departmentName: string;
}

export interface ISearchVerticalFunctionDepartmentHead {
    autoUserId: number;
}
export interface ISearchLocationFunction {
    locationId: number;
    functionId: number;
    isActive: number;
}
export interface ILocationFunction {
    functionId: number;
    functionName: string;
    locationId: number;
    isActive: number;
}