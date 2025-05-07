using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CommonModule
{
    public interface IGradeWiseDocMapRepository
    {
        Task<List<GradeWiseDocMapList>> GetAllGradeWiseDocumentList(SearchGradeWiseDocMap search);
        Task<List<GradeWiseDocumentDetails>> GetGradeWiseDocumentDetails(SearchGradeWiseDocumentDetails search);
        Task<ReturnMessage> InsertUpdateGradeWiseDocumentMapping(GradeWiseDocumentMappingFormData formData);
        Task<List<GradewiseDocumentCount>> GetGradeWiseDocumentCount(SearchGradeWiseDocMap search);
    }
}
