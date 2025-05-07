import * as internal from "assert";

export interface User {
    userName: string;
    password: string;
}

export interface ILoginUser{
  userId:string;
  password:string;
}
export interface IUserMaster
{    
    Password :string;
    EmailId :string;
}

export interface IUserDetail{
  autoUserId:number;
  userId:string;
  userName:string;
  password:string;
  saltKey:string;
  roleIds:string;
  roleNames:string;
  emailId:string;
  contactNo:string;
  isActive:boolean;
  mapId:number;
  verticalIds:string;
  designation:string;
  candidateId:number;
}

export interface ISearchUser{
  userId:string;
  userName:string;
  roleId:number;
  isActive:boolean;
}