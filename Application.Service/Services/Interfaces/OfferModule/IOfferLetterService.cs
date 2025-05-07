using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.OfferModule;

using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.OfferModule
{
    public interface IOfferLetterService
    {
        string CloudStorageAccountname();
        Task<ReturnMessage> InsertOfferLetter(OfferLetterInsert formdata);
        Task<ReturnMessage> CampusInsertOfferLetter(OfferLetterInsert formdata);
        Task<ReturnMessage> UpdateOfferLetter(OfferLetterUpdate formdata);
        Task<ReturnMessage> UpdateCampusOfferLetter(OfferLetterUpdate formdata);
        Task<OfferLetterData> GetOfferLetter(SearchOfferLetter search);
        Task<OfferLetterData> GetCampusOfferLetter(SearchOfferLetter search);
    }
}
