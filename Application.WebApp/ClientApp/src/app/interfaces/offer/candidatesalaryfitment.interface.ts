export interface ICandidateSalaryFitmentSalaryDetails{
    salaryFitmentDetailsId:number;
    salaryFitmentId:number;
    salaryFitmentSalaryDetailsLineId:number;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    salaryFormula:string;
    salaryValue:number;
    calculatedSalaryValue:number;
    calculatedSalaryValueYearly:number;
    createdBy:number;
}

export interface ICandidateSalaryFitmentSalaryDetailsFormat{
    salaryFitmentDetailsId:number;
    salaryFitmentId:number;
    salaryFitmentSalaryDetailsFormatId:number;
    dbOrder:number;
    visibleOrder:string;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    calculatedSalaryValue:number;
    calculatedSalaryValueYearly:number;
    createdBy:number;
}

export interface ISearchSalaryFitment{
    salaryFitmentId:number;
    requsitaionDetailsId:number;
    candidateId:number;
}

export interface ISalaryFitmentRemarks{
    SalaryFitmentRemarksId:number;
    SalaryFitmentId:number;
    Reamrks:string;
    CreatedBy:number;
    CreatedByName:string;
    CreatedOn:string;
    ReamrksReply:string;
    ModifiedBy:number;
    ModifiedByName:string;
    ModifiedOn:string;
}

export interface ISalaryFitmentExperience
{
    SalaryFitmentExperienceId:number;
    SalaryFitmentId:number;
    Organisation:string;
    From:string;
    To:string;
    Days:number;
    Years:number;
    Remarks:string;
}