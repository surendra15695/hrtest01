export interface IEmployeeReplacementList{
    empId:number;
    empNo:string;
    empName:string;
    designation:string;
    gradeName:string;  
    functionId:number;
    functionName:string;  
}

export interface ISearchEmployeeReplacement{
    empId:number;
    empNo:string;
}
export interface IEmployeeSalaryList {
  requisitionDetailId: number;
  empNo: string;
  fullName: number;
  locationOffice: string;
  departmentName: string;
  positionName: string;
  gradeName: string;
  proposedCTC: string;
}
