using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface IEmailTemplateService
    {
        Task<List<EmailTemplateType>> GetAllEmailTemplateType(SearchEmailTemplateType search);
        Task<List<EmailTemplate>> GetAllEmailTemplate(SearchEmailTemplate search);
        Task<ReturnMessage> EmailTemplateInsertUpdate(AddEmailTemplate formData);

    }
}
