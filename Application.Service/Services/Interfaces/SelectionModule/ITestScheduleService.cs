using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.SelectionModule
{
    public interface ITestScheduleService
    {
        String CloudStorageAccountname();
        Task<ReturnMessage> TestScheduleInsert(TestScheduleFormData formData);
        Task<ReturnMessage> UploadTestResult(DataTable formData);
        Task<TestRequisitionForEmailDetails> GetTestRequisitionDetailsForEmail (SearchTestRequisitionForEmailDetails formData);
        Task<TestScheduleDetail> GetTestScheduleDetail(SearchTestScheduleDetail formData);
        Task<List<TestResultDetail>> GetTestReult(SearchTestResult formData);
        Task<List<CandidateTestTravelReimbursement>> GetCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement formData);
        Task<List<CampusCandidateTestTravelReimbursement>> GetCampusCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement formData);
        Task<TestTravelReimbursement> GetCandidateTestTravelReimbursementData(SearchTestTravelReimbursement formData);
        Task<CampusTestTravelReimbursement> GetCampusCandidateTestTravelReimbursementData(SearchTestTravelReimbursement formData);
        Task<ReturnMessage> TestTravelReimbursementInsertUpdate(TestTravelReimbursementFormData formData);
        Task<ReturnMessage> CampusTestTravelReimbursementInsertUpdate(TestTravelReimbursementFormData formData);
        Task<List<RMTestTravelReimbursementList>> GetRMTestTravelReimbursementList(SearchRMTestTravelReimbursementList formData);
        Task<List<CampusTestTravelReimbursementList>> GetCampusTestTravelReimbursementList(SearchCampusTestTravelReimbursementList formData);
        Task<ReturnMessage> TestTravelReimbursementActionInsert(TestTravelReimbursementActionFormData formData);
        Task<List<TestTravelClarificationList>> GetTestTravelClarificationList(SearchTestTravelClarificationList formData);
    }
}
