export interface ISearchSalaryType{
    salaryTypeId:number;
    isActive:boolean;
}

export interface ISalaryType{
  salaryTypeId: number;
  salaryTypeName: string;
    visualOrder:number;
    order:number;
    salaryType:string;
  createdBy: number;
  isActive: boolean;
}

export interface ISearchSalaryAccountHead{
    salaryAccountHeadId:number;
    isActive:boolean;
}

export interface ISalaryAccountHead{
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    salaryTypeId:number;
    salaryType:string;
    calCulationType:string;
    isActive:boolean;
    createdBy:number;
}

export interface ISalaryFormula{
    salaryAccountHeadId:number;
    salaryAccountName:string;
    formula:string;
    amount:string;
}

export interface ISalaryArray{
    salaryAccountHead:number;
    formula:string;
    amount:string;
}

export interface ISearchSalaryTemplate{
    salaryTemplateId:number;
    grade:number;
    isActive:boolean;
}

export interface ISalaryTemplateList{
    salaryTemplateId:number;
    salaryTemplateName:string;
    grade:number;
    gradeName:string;
    ctc:number;
    tsActive:boolean;
    createdBy:number;
    salaryTemplateDetails:ISalaryTemplateDetails[];
    salaryTemplateFormat:ISalaryTemplateDetailsFormat[];
}

export interface ISalaryTemplateDetails{
    salaryTemplateId:number;
    lineId:number;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    salaryFormula:string;
    salaryValue:string;
    calculatedSalaryValue:string;
    calculatedSalaryValueYearly:string;
}

export interface ISalaryTemplateDetailsFormat{
    salaryTemplateId:number;
    lineId:number;
    dbOrder:number;
    visibleOrder:string;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    calculatedSalaryValue:string;
    calculatedSalaryValueYearly:string;
}

export interface ICalculateSalary{
    CTC:number;
    claCulatePayStructureValue:ICalculatedSalaryTemplateDetails[];
    claCulatePayStructureValueFormat:ICalculatedSalaryTemplateDetailsFormat[];
}

export interface ICalculatedSalaryTemplateDetails{
    salaryTemplateId:number;
    lineId:number;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    salaryFormula:string;
    salaryValue:string;
    calculatedSalaryValue:string;
    calculatedSalaryValueYearly:string;
}

export interface ICalculatedSalaryTemplateDetailsFormat{
    salaryTemplateId:number;
    lineId:number;
    dbOrder:number;
    order:string;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    calculatedValue:string;
    calculatedValueYerly:string;
}

export interface ISearchCalculateSalary{
    calculteSalryDetails:ISalaryArray[];
}

export interface ISalaryTemplateMasterData{
    salaryTemplateId:number;
    salaryTemplateName:string;
    grade:number;
    gradeName:string;
    ctc:number;
    isActive:boolean;
    createdBy:number;
}

export interface ISalaryTemplateFormula{
    SalaryTemplateId:number;
    LineId:number;
    SalaryAccountHeadId:number;
    SalaryAccountHeadName:string;
    SalaryFormula:string;
    SalaryValue:string;
}
