export interface IManagementApprovalCandidates{
    managementApprovalId:number;
    lineId:number;
    requisitionDetailId:number;
    candidateId:number;
    interViewPanel:string;
    name:string;
    source:string;
    position:string;
    location:string;
    grade:string;
    qualification:string;
    experience:string;
    presentCTC:string;
    proposedBasic:string;
    proposedCTC:string;
    reporNew:string;
}
export interface IOnboardingMailIds {
  OCMailIds: string;
  OMMailIds: string;
  OHMailIds: string;
  HTMailIds: string;
  StatusFlag: number;
}

export interface IManagementApprovalMasterData{
    ManagementApprovalId:number;
    CandidateId:string;
    From:string;
    To:string;
    Date:string;
    note:string;
    SignatureNeededFrom:string;
    SignatureNeededTo:string;

}

export interface IManagementApprovalVacancy{
    managementApprovalId:number;
    lineId:number;
    plant:string;
    function:string;
    approved:number;
    availableasOn:number;
    vacancies:number;
    inThisApproval:number;
    earlierApprovalYettoJoin:number;
    yetToFill:number;
}

export interface ISearchManagementApproval{
    managementApprovalId:number;
    candidateId:number;
    requisitionDetailId:number;
}


