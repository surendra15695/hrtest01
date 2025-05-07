using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.Entity.Entities.CampusModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CampusModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CampusModule
{
    public class CampusCommonService : ICampusCommonService
    {
        private readonly ICampusCommonRepository campusCommonRepository;

        public CampusCommonService(ICampusCommonRepository campusCommonRepository)
        {
            this.campusCommonRepository = campusCommonRepository;
        }

        public async Task<ReturnMessage> CampusCourseInsertUpdate(CampusCourse formData)
        {
            return await this.campusCommonRepository.CampusCourseInsertUpdate(formData);
        }

        public async Task<List<CampusCourse>> GetAllCampusCourse(SearchCampusCourse search)
        {
            return await this.campusCommonRepository.GetAllCampusCourse(search);
        }

        public async Task<ReturnMessage> CampusStreamInsertUpdate(CampusStream formData)
        {
            return await this.campusCommonRepository.CampusStreamInsertUpdate(formData);
        }

        public async Task<List<CampusStream>> GetAllCampusStream(SearchCampusStream search)
        {
            return await this.campusCommonRepository.GetAllCampusStream(search);
        }

        public async Task<ReturnMessage> CampusCourseStreamInsertUpdate(CampusCourseStreamFormData formData)
        {
            return await this.campusCommonRepository.CampusCourseStreamInsertUpdate(formData);
        }

        public async Task<List<CampusCouseStream>> GetAllCampusCouseStream()
        {
            return await this.campusCommonRepository.GetAllCampusCouseStream();
        }

        public async Task<ReturnMessage> CampusYearInsertUpdate(CampusYear formData)
        {
            return await this.campusCommonRepository.CampusYearInsertUpdate(formData);
        }

        public async Task<List<CampusYear>> GetAllCampusYear(SearchCampusYear search)
        {
            return await this.campusCommonRepository.GetAllCampusYear(search);
        }

        public async Task<List<CampusCollegeCategory>> GetAllCampusCollegeCategory()
        {
            return await this.campusCommonRepository.GetAllCampusCollegeCategory();
        }

        public async Task<ReturnMessage> CampusCollegeInsertUpdate(CampusCollegeFormData formData)
        {
            return await this.campusCommonRepository.CampusCollegeInsertUpdate(formData);
        }

        public async Task<List<CampusCollegeList>> GetAllCampusCollege(SearchCampusCollege search)
        {
            return await this.campusCommonRepository.GetAllCampusCollege(search);
        }
        public async Task<List<CampusFunctionwiseRequisition>> GetCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search)
        {
            return await this.campusCommonRepository.GetCampusFunctionwiseRequisition(search);
        }
        public async Task<List<CampusFunctionwiseRequisition>> GetOffCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search)
        {
            return await this.campusCommonRepository.GetOffCampusFunctionwiseRequisition(search);
        }
    }
}
