export interface IOfferLetterHeader{
    offerLetterId:number;
    requsitaionDetailsId:number;
    candidateId:number;
    name:string;
    position:string;
    functionName:string;
    location:string;
    grade:string;
    proposedBasic:number;
    proposedCTC:number;
    templateId:number;
    templateDetails:string;
    accepted:number;
    remarks:string;
    salaryTemplateList:IOfferLetterSalaryTemplate[];
}

export interface ISearchOfferLetter{
    offerLetterId:number;
    candidateId:number;
    requsitaionDetailsId:number;
}

export interface IOfferLetterSalaryTemplate{
    salaryFitmentDetailsId:number;
    salaryFitmentId:number;
    salaryFitmentDetailsSalaryFormatId:number;
    dbOrder:number;
    visibleOrder:string;
    salaryAccountHeadId:number;
    salaryAccountHeadName:string;
    calculatedSalaryValue:number;
    calculatedSalaryValueYearly:number;
    createdBy:number;
}
export interface IsearchSalaryFitment {
  salaryFitmentId: number,
  candidateId: number,
  requsitaionDetailsId: number,
}

