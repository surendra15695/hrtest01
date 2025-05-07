using Application.DataAccess.Repositories.Interfaces.SelectionModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.SelectionModule;
using Application.Service.Services.Interfaces.SelectionModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.SelectionModule
{
    public class TestScheduleService : ITestScheduleService
    {
        private readonly ITestScheduleRepository testScheduleRepository;

        public TestScheduleService(ITestScheduleRepository testScheduleRepository)
        {
            this.testScheduleRepository = testScheduleRepository;
        }
        public string CloudStorageAccountname()
        {
            return this.testScheduleRepository.CloudStorageAccountname();
        }
        public async Task<ReturnMessage> TestScheduleInsert(TestScheduleFormData formData)
        {
            return await this.testScheduleRepository.TestScheduleInsert(formData);
        }

        public async Task<ReturnMessage> UploadTestResult(DataTable formData)
        {
            return await this.testScheduleRepository.UploadTestResult(formData);
        }
        public async Task<TestRequisitionForEmailDetails> GetTestRequisitionDetailsForEmail(SearchTestRequisitionForEmailDetails formData)
        {
            return await this.testScheduleRepository.GetTestRequisitionDetailsForEmail(formData);
        }
        public async Task<TestScheduleDetail> GetTestScheduleDetail(SearchTestScheduleDetail formData)
        {
            return await this.testScheduleRepository.GetTestScheduleDetail(formData);
        }

        public async Task<List<TestResultDetail>> GetTestReult(SearchTestResult formData)
        {
            return await this.testScheduleRepository.GetTestReult(formData);
        }

        public async Task<List<CandidateTestTravelReimbursement>> GetCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement formData)
        {
            return await this.testScheduleRepository.GetCandidateTestTravelReimbursementList(formData);
        }
        public async Task<List<CampusCandidateTestTravelReimbursement>> GetCampusCandidateTestTravelReimbursementList(SearchCandidateTestTravelReimbursement formData)
        {
            return await this.testScheduleRepository.GetCampusCandidateTestTravelReimbursementList(formData);
        }
        public async Task<TestTravelReimbursement> GetCandidateTestTravelReimbursementData(SearchTestTravelReimbursement formData)
        {
            return await this.testScheduleRepository.GetCandidateTestTravelReimbursementData(formData);
        }
        public async Task<CampusTestTravelReimbursement> GetCampusCandidateTestTravelReimbursementData(SearchTestTravelReimbursement formData)
        {
            return await this.testScheduleRepository.GetCampusCandidateTestTravelReimbursementData(formData);
        }
        public async Task<ReturnMessage> TestTravelReimbursementInsertUpdate(TestTravelReimbursementFormData formData)
        {
            return await this.testScheduleRepository.TestTravelReimbursementInsertUpdate(formData);
        }
        public async Task<ReturnMessage> CampusTestTravelReimbursementInsertUpdate(TestTravelReimbursementFormData formData)
        {
            return await this.testScheduleRepository.CampusTestTravelReimbursementInsertUpdate(formData);
        }
        public async Task<List<RMTestTravelReimbursementList>> GetRMTestTravelReimbursementList(SearchRMTestTravelReimbursementList formData)
        {
            return await this.testScheduleRepository.GetRMTestTravelReimbursementList(formData);
        }
        public async Task<List<CampusTestTravelReimbursementList>> GetCampusTestTravelReimbursementList(SearchCampusTestTravelReimbursementList formData)
        {
            return await this.testScheduleRepository.GetCampusTestTravelReimbursementList(formData);
        }
        public async Task<ReturnMessage> TestTravelReimbursementActionInsert(TestTravelReimbursementActionFormData formData)
        {
            return await this.testScheduleRepository.TestTravelReimbursementActionInsert(formData);
        }
        public async Task<List<TestTravelClarificationList>> GetTestTravelClarificationList(SearchTestTravelClarificationList formData)
        {
            return await this.testScheduleRepository.GetTestTravelClarificationList(formData);
        }

    }
}
