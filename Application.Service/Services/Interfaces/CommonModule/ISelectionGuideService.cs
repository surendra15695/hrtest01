using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface ISelectionGuideService
    {
        Task<List<SelectionGuide>> GetAllSelectionGuide(SearchSelectionGuide search);
        Task<List<SelectionGuideInterview>> GetSelectionGuideInterview(SearchSelectionGuideInterview search);
        Task<ReturnMessage> SelectionGuideInsertUpdate(SelectionGuide formData);
    }
}
