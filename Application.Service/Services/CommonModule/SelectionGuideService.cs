using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class SelectionGuideService : ISelectionGuideService
    {
        private readonly ISelectionGuideRepository selectionGuideRepository;

        public SelectionGuideService(ISelectionGuideRepository selectionGuideRepository)
        {
            this.selectionGuideRepository = selectionGuideRepository;
        }
        public async Task<List<SelectionGuide>> GetAllSelectionGuide(SearchSelectionGuide search)
        {
            return await this.selectionGuideRepository.GetAllSelectionGuide(search);
        }

        public async Task<List<SelectionGuideInterview>> GetSelectionGuideInterview(SearchSelectionGuideInterview search)
        {
            return await this.selectionGuideRepository.GetSelectionGuideInterview(search);
        }

        public async Task<ReturnMessage> SelectionGuideInsertUpdate(SelectionGuide formData)
        {
            return await this.selectionGuideRepository.SelectionGuideInsertUpdate(formData);
        }
    }
}
