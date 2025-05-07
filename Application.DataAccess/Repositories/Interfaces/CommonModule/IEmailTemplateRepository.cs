using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IEmailTemplateRepository
    {

        Task<List<EmailTemplateType>> GetAllEmailTemplateType(SearchEmailTemplateType search);
        Task<List<EmailTemplate>> GetAllEmailTemplate(SearchEmailTemplate search);
        Task<ReturnMessage> EmailTemplateInsertUpdate(AddEmailTemplate formData);
    }
}
