export interface IPositionVerticalDetail {
    positionId: number;
    positionName: string;
    verticalIds: string;
    verticalNames: string;
    isActive: boolean;
}

export interface ISearchPosition {
    verticalId: number;
    positionId: number;
    isActive: boolean;
}

export interface IPositionGrade {
    positionId: number;
    verticalId: string;
    gradeName: string;
    gradeId: number;
    isActive: boolean;
}

export interface ISearchPositionGrade {
    verticalId: number;
    positionId: number;
    isActive: boolean;
}

export interface IVerticalPositionGrade {
    positionId: number;
    verticalId: string;
    gradeName: string;
    gradeId: number;
}
export interface ISearchFunctionPosition {
    functionId: number;
    positionId: number;
    isActive: number;
}
export interface IFunctionPositionDetail {
    positionId: number;
    positionName: string;
    functionId: number;
    isActive: number;
}
export interface ISearchPositionList {
    positionId: number;
    isActive: boolean;
  }
  export interface IPositionList {
    positionId: number;
    positionName: string;
    isActive: boolean;
    createdBy: number;
  }