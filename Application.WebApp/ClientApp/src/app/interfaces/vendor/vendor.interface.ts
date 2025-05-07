export interface IVendor{
    vendorId:number;
    vendorName:string;
    emailId:string;
    alternateEmailId:string;
    contactNo:string;
    alternateContactNo:string;
    website:string;
    city:string;
    street:string;
    zipCode:string;
    stateId:number;
    statename:string;
    termsOfService:string;
    isActive:boolean;
}

export interface ISearchVendor{
    vendorId:number;
    isActive:boolean; 
}
export interface IVendorInvoiceDetails{
    vendorInvoiceDetailId: number;
    vendorInvoiceId: number; 
    billableCTC: number;
    serviceChargePer: number;
    serviceChargeAmount: number;
    gstPer: number;
    gstAmount: number;
    totalBillAmount: number;
    purchaseRequestNo: string;
    purchaseOrderNo: string; 
    serviceSheetEntryNo: string;
    // createdBy: number; 
    // createdOn: string;
    // modifiedBy: number; 
    // modifiedOn: string; 

}