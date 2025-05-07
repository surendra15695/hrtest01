using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface ISelectionGuideRepository
    {
        Task<List<SelectionGuide>> GetAllSelectionGuide(SearchSelectionGuide search);
        Task<List<SelectionGuideInterview>> GetSelectionGuideInterview(SearchSelectionGuideInterview search);
        Task<ReturnMessage> SelectionGuideInsertUpdate(SelectionGuide formData);
    }
}
