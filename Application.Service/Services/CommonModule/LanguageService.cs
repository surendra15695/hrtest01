using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class LanguageService : ILanguageService
    {
        private readonly ILanguageRepository languageRepository;

        public LanguageService(ILanguageRepository languageRepository)
        {
            this.languageRepository = languageRepository;
        }

        public async Task<List<Language>> GetAllLanguage(SearchLanguage search)
        {
            return await this.languageRepository.GetAllLanguage(search);
        }

        public async Task<ReturnMessage> LanguageInsertUpdate(LanguageFormData formData)
        {
            return await this.languageRepository.LanguageInsertUpdate(formData);
        }
    }
}