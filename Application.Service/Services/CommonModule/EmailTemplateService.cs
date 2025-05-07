using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class EmailTemplateService : IEmailTemplateService
    {
        private readonly IEmailTemplateRepository emailTemplateRepository;

        public EmailTemplateService(IEmailTemplateRepository emailTemplateRepository)
        {
            this.emailTemplateRepository = emailTemplateRepository;
        }
        public async Task<List<EmailTemplateType>> GetAllEmailTemplateType(SearchEmailTemplateType search)
        {
            return await this.emailTemplateRepository.GetAllEmailTemplateType(search);
        }

        public async Task<List<EmailTemplate>> GetAllEmailTemplate(SearchEmailTemplate search)
        {
            return await this.emailTemplateRepository.GetAllEmailTemplate(search);
        }
        public async Task<ReturnMessage> EmailTemplateInsertUpdate(AddEmailTemplate formData)
        {
            return await this.emailTemplateRepository.EmailTemplateInsertUpdate(formData);
        }

    }
}
