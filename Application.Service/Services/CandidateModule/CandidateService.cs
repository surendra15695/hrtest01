using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CandidateModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CandidateModule;
using Application.Service.Services.Interfaces.CandidateModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CandidateModule
{
    public class CandidateService : ICandidateService
    {
        private readonly ICandidateRepository candidateRepository;

        public CandidateService(ICandidateRepository candidateRepository)
        {
            this.candidateRepository = candidateRepository;
        }

        public async Task<List<CandidateDetail>> GetCandidate(SearchCandidate search)
        {
            return await this.candidateRepository.GetCandidate(search);
        }
        public async Task<ReturnMessage> EditCampuscandidateApplicationform(EditCampusCandidate formdata)
        {
            return await this.candidateRepository.EditCampuscandidateApplicationform(formdata);
        }
        public async Task<ReturnMessage> Editcampuscandidateregistrationform(EditCampusCandidateRegistration formdata)
        {
            return await this.candidateRepository.Editcampuscandidateregistrationform(formdata);
        }
        public async Task<ReturnMessage> SaveCandidateStatus(CandidateStatus formdata)
        {
            return await this.candidateRepository.SaveCandidateStatus(formdata);
        }
        public async Task<ReturnMessage> SaveCandidateCMDStatus(CandidateCmdStatus formdata)
        {
            return await this.candidateRepository.SaveCandidateCMDStatus(formdata);
        }
        public async Task<ReturnMessage> SaveCandidate(Candidate formdata)
        {
            return await this.candidateRepository.SaveCandidate(formdata);
        }
        public async Task<ReturnMessage> SaveCampusCandidate(CampusCandidateUpdate formdata)
        {
            return await this.candidateRepository.SaveCampusCandidate(formdata);
        }
        public async Task<ReturnMessage> CreateCandidateProfile(CandidateDetails formdata)
        {
            return await this.candidateRepository.CreateCandidateProfile(formdata);
        }
        public async Task<List<CandidateDetailData>> GetCandidateDetail(SearchCandidateDetail search)
        {
            return await this.candidateRepository.GetCandidateDetail(search);
        }
        public async Task<List<CandidateDetaildummyData>> GetCandidatedummyDetail(SearchCandidateDetail search)
        {
            return await this.candidateRepository.GetCandidatedummyDetail(search);
        }
        public async Task<List<CandidateDetailData>> GetCvDropCandidateList(filtercandidatedetail search)
        {
            return await this.candidateRepository.GetCvDropCandidateList(search);
        }
        public async Task<List<CandidateDetailData>> GetCvDropCandidateListNew(filtercandidatedetailNew search)
        {
            return await this.candidateRepository.GetCvDropCandidateListNew(search);
        }
        public async Task<List<CVDropCandidateDataList>> GetAllCVDropCandidateDetails(cvdropcandidate search)
        {
            return await this.candidateRepository.GetAllCVDropCandidateDetails(search);
        }
        public async Task<ReturnMessage> CreateUserRegistration(CandidateRegistration formdata)
        {
            return await this.candidateRepository.CreateUserRegistration(formdata);
        }

        public async Task<CandidateData> GetCandidateData(SearchCandidateData search)
        {
            return await this.candidateRepository.GetCandidateData(search);
        }
        public async Task<CampusCandidateDataGet> GetCampusCandidateData(SearchCandidateData search)
        {
            return await this.candidateRepository.GetCampusCandidateData(search);
        }
        public async Task<ReturnMessage> CandidateApplyJob(ApplyJobExternal formdata)
        {
            return await this.candidateRepository.CandidateApplyJob(formdata);
        }

        public async Task<List<InternalCandidate>> GetInternalCandidate(SearchInternalCandidate search)
        {
            return await this.candidateRepository.GetInternalCandidate(search);
        }
        public async Task<ReturnMessage> CandidateCheckProfileUpdate(CandidateApplyJob formdata)
        {
            return await this.candidateRepository.CandidateCheckProfileUpdate(formdata);
        }
        public async Task<List<CandidateHiringRemarks>> GetCandidateHiringRemarks(SearchCandidateHiringRemarks search)
        {
            return await this.candidateRepository.GetCandidateHiringRemarks(search);
        }
        public async Task<List<CandidateOfferRejectRemarks>> GetCandidateOfferRejectRemarks(SearchCandidateOfferRejectRemarks search)
        {
            return await this.candidateRepository.GetCandidateOfferRejectRemarks(search);
        }
        public async Task<List<SalaryFitmentList>> GetSalaryFitmentNewList(SearchSalaryFitment search)
        {
            return await this.candidateRepository.GetSalaryFitmentNewList(search);
        }
        public async Task<List<OutputNaukriCandidate>> GetNaukriCandidate(InputNaukriCandidate search)
        {
            return await this.candidateRepository.GetNaukriCandidate(search);
        }

        public async Task<List<CandidateDetailData>> CandidateDetailsSalaryFitment(SearchCandidateDetail search)
        {
            return await this.candidateRepository.CandidateDetailsSalaryFitment(search);
        }
        public async Task<List<ReqSitionDetailsData>> GetRequisitionDetailsForCandiateSearch(Searchrequisition search)
        {
            return await this.candidateRepository.GetRequisitionDetailsForCandiateSearch(search);
        }
        public string CloudStorageAccountname()
        {
            return  this.candidateRepository.CloudStorageAccountname();
        }
    }
}
