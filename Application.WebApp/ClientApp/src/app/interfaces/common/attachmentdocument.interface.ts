export interface IAttachmentDocumentType{
    attachmentDocumentTypeId:number;
    attachmentDocumentTypeName:string;
    isActive:boolean;
}

export interface ISearchAttachmentDocumentType{
    attachmentDocumentTypeId:number;
    isActive:boolean;
}
export interface ISearchdocumentrole{
    DocumentnameId:number;
}
export interface IAttachmentDocumentParticular{
    attachmentDocumentParticularId:number;
    attachmentDocumentParticularName:string;
    attachmentDocumentTypeId:number;
    attachmentDocumentTypeName:string;
    isActive:boolean;
}

export interface ISearchAttachmentDocumentParticular{
    attachmentDocumentParticularId:number;
    attachmentDocumentTypeId:number;
    isActive:boolean;
}

export interface IAttachmentDocumentNameDetails{
    attachmentDocumentNameId:number;
    attachmentDocumentName:string;
    attachmentDocumentParticularId:number;
    attachmentDocumentParticularName:string;
    attachmentDocumentTypeId:number;
    attachmentDocumentTypeName:string;
    isActive:boolean;
}

export interface ISearchAttachmentDocumentName{
    attachmentDocumentNameId:number;
    attachmentDocumentParticularId:number;
    isActive:boolean;
}