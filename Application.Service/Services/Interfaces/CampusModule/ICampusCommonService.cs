using Application.Entity.Entities.CampusModule;
using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CampusModule
{
    public interface ICampusCommonService
    {
        Task<ReturnMessage> CampusCourseInsertUpdate(CampusCourse formData);
        Task<List<CampusCourse>> GetAllCampusCourse(SearchCampusCourse search);
        Task<ReturnMessage> CampusStreamInsertUpdate(CampusStream formData);
        Task<List<CampusStream>> GetAllCampusStream(SearchCampusStream search);
        Task<ReturnMessage> CampusCourseStreamInsertUpdate(CampusCourseStreamFormData formData);
        Task<List<CampusCouseStream>> GetAllCampusCouseStream();
        Task<ReturnMessage> CampusYearInsertUpdate(CampusYear formData);
        Task<List<CampusYear>> GetAllCampusYear(SearchCampusYear search);
        Task<List<CampusCollegeCategory>> GetAllCampusCollegeCategory();
        Task<ReturnMessage> CampusCollegeInsertUpdate(CampusCollegeFormData formData);
        Task<List<CampusCollegeList>> GetAllCampusCollege(SearchCampusCollege search);
        Task<List<CampusFunctionwiseRequisition>> GetCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search);
        Task<List<CampusFunctionwiseRequisition>> GetOffCampusFunctionwiseRequisition(SearchCampusFunctionwiseRequisition search);
    }
}
