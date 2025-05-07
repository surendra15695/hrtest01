export interface IEmailTemplate {
    templateId: number;
    templateTypeId: number;
    templateTypeName: string;
    templateEmailName: string;
    templateDescription: string;
    createdBy: number;
    isActive: boolean;
}

export interface ISearchEmailTemplate {
    templateId: number;
    templateTypeId: number;
    isActive: boolean;
}

export interface IEmailTemplateType {
    templateTypeId: number;
    templateTypeName: string;
    isActive: boolean;
}
export interface ISearchEmailTemplateType {
    TemplateTypeId: number;
    isActive: boolean;
}
