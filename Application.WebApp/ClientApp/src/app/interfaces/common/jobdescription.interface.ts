export interface IJobDescription {
  jobDescriptionId: number;
  jobDescriptionName: string;
  verticalId: number;
  verticalName: string;
  locationId: number;
  locationOffice: string;
  positionId: number;
  positionName: string;
  departmentId: number;
  departmentName: string;
  functionId: number;
  functionName: string;
  isActive: boolean;
  createdBy: number;
}

export interface IJobDescriptionDetail {
  IsRestricted: number;
  Restricted: string;
  Vertical: number;
  Position: number;
  Department: number;
  Function: number;
  Location: number;
  Grade: number;
  NoOfReportees: number;
  DesiredIndustries: number;
  Experience: number;
  Age: number;
  Course: number;
  Stream: number;
  Language: number;
  ReportsTo: string;
  AnyOther: string;
  JobPurpose: string;
  JobSummary: string;
  KPIs: string;
  Dimensions: string;
  Knowledge: string;
  SkillsAndAbility: string;
  ExternalStakeHolders: string;
  InternalStakeHolders: string;
}

export interface ISearchJobDescription {
  jobDescriptionId: number;
  verticalId: number;
  isActive: boolean;
}
export interface ISearchJobDescriptionResignation {  // Added by Anif on 06-12-2022
  jobDescriptionId: number;
  verticalId: number;
  isActive: boolean;
  createdBy:number;
}
export interface ISearchJobDescriptionRequisition {
  jobDescriptionId: number;
  verticalId: number;
  isActive: boolean;
  createdBy: number;
}

export interface ISearchJobDescriptionfunc {
  jobDescriptionId: number;
  verticalId: number;
  isActive: boolean;
  functionId: number;
}
