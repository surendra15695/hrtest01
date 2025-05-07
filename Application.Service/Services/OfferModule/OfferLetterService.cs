using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.OfferModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;
using Application.Service.Services.Interfaces.OfferModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.OfferModule
{
    public class OfferLetterService : IOfferLetterService
    {
        private readonly IOfferLetterRepository OfferLetterRepository;
        public OfferLetterService(IOfferLetterRepository OfferLetter)
        {
            this.OfferLetterRepository = OfferLetter;
        }
        public string CloudStorageAccountname()
        {
            return this.OfferLetterRepository.CloudStorageAccountname();
        }
        public async Task<ReturnMessage> InsertOfferLetter(OfferLetterInsert formdata)
        {
            return await this.OfferLetterRepository.InsertOfferLetter (formdata);
        }
        public async Task<ReturnMessage> CampusInsertOfferLetter(OfferLetterInsert formdata)
        {
            return await this.OfferLetterRepository.CampusInsertOfferLetter(formdata);
        }
        public async Task<ReturnMessage> UpdateOfferLetter(OfferLetterUpdate formdata)
        {
            return await this.OfferLetterRepository.UpdateOfferLetter(formdata);
        }
        public async Task<ReturnMessage> UpdateCampusOfferLetter(OfferLetterUpdate formdata)
        {
            return await this.OfferLetterRepository.UpdateCampusOfferLetter(formdata);
        }
        public async Task<OfferLetterData> GetOfferLetter(SearchOfferLetter search)
        {
            return await this.OfferLetterRepository.GetOfferLetter(search);
        }
        public async Task<OfferLetterData> GetCampusOfferLetter(SearchOfferLetter search)
        {
            return await this.OfferLetterRepository.GetCampusOfferLetter(search);
        }
    }
}
