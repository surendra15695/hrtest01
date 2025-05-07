export interface IDomain
{
    domainId:number;
    domainName:string;
    parentDomainId:number;
    isActive:boolean;
}
export interface ISearchDomain
{
    domainId:number;
    parentDomainId:number;
    isActive:boolean;
}