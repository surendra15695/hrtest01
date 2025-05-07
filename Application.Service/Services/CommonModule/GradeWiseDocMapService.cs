using System;
using System.Collections.Generic;
using System.Text;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CommonModule;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
   public  class GradeWiseDocMapService : IGradeWiseDocMapService
    {
        private readonly IGradeWiseDocMapRepository gradeWiseDocMapRepository;
        public GradeWiseDocMapService(IGradeWiseDocMapRepository gradeWiseDocumentMapRepository)
        {
            this.gradeWiseDocMapRepository = gradeWiseDocumentMapRepository;
        }


        public async Task<List<GradeWiseDocMapList>> GetAllGradeWiseDocumentList(SearchGradeWiseDocMap search)
        {
            return await this.gradeWiseDocMapRepository.GetAllGradeWiseDocumentList(search);
        }
        public async Task<List<GradeWiseDocumentDetails>> GetGradeWiseDocumentDetails(SearchGradeWiseDocumentDetails search)
        {
            return await this.gradeWiseDocMapRepository.GetGradeWiseDocumentDetails(search);
        }
        public async Task<ReturnMessage> InsertUpdateGradeWiseDocumentMapping(GradeWiseDocumentMappingFormData formData)
        {
            return await this.gradeWiseDocMapRepository.InsertUpdateGradeWiseDocumentMapping(formData);
        }
        public async Task<List<GradewiseDocumentCount>> GetGradeWiseDocumentCount(SearchGradeWiseDocMap search)
        {
            return await this.gradeWiseDocMapRepository.GetGradeWiseDocumentCount(search);
        }
    }
}
