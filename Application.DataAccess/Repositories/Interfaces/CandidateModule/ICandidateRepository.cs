using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CandidateModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CandidateModule
{
    public interface ICandidateRepository
    {
        Task<ReturnMessage> CreateUserRegistration(CandidateRegistration formdata);
        Task<List<CandidateDetail>> GetCandidate(SearchCandidate search);
        Task<ReturnMessage> SaveCandidate(Candidate formdata);
        Task<ReturnMessage> SaveCampusCandidate(CampusCandidateUpdate formdata);
        Task<ReturnMessage> CreateCandidateProfile(CandidateDetails formdata);
        Task<ReturnMessage> SaveCandidateStatus(CandidateStatus formdata);
        Task<ReturnMessage> EditCampuscandidateApplicationform(EditCampusCandidate formdata);
        Task<ReturnMessage> Editcampuscandidateregistrationform(EditCampusCandidateRegistration formdata);
        Task<ReturnMessage> SaveCandidateCMDStatus(CandidateCmdStatus formdata);
        Task<List<CandidateDetailData>> GetCandidateDetail(SearchCandidateDetail search);
        Task<List<CandidateDetaildummyData>> GetCandidatedummyDetail(SearchCandidateDetail search);
        Task<CandidateData> GetCandidateData(SearchCandidateData search);
        Task<CampusCandidateDataGet> GetCampusCandidateData(SearchCandidateData search);
        Task<ReturnMessage> CandidateApplyJob(ApplyJobExternal formdata);
        Task<List<InternalCandidate>> GetInternalCandidate(SearchInternalCandidate search);
        Task<ReturnMessage> CandidateCheckProfileUpdate(CandidateApplyJob formdata);
        Task<List<CandidateHiringRemarks>> GetCandidateHiringRemarks(SearchCandidateHiringRemarks search);
        Task<List<CandidateOfferRejectRemarks>> GetCandidateOfferRejectRemarks(SearchCandidateOfferRejectRemarks search);
        Task<List<SalaryFitmentList>> GetSalaryFitmentNewList(SearchSalaryFitment search);
        Task<List<OutputNaukriCandidate>> GetNaukriCandidate(InputNaukriCandidate search);
        Task<List<CandidateDetailData>> GetCvDropCandidateList(filtercandidatedetail search);
        Task<List<CandidateDetailData>> GetCvDropCandidateListNew(filtercandidatedetailNew search);
        Task<List<CandidateDetailData>> CandidateDetailsSalaryFitment(SearchCandidateDetail search);
        Task<List<CVDropCandidateDataList>> GetAllCVDropCandidateDetails(cvdropcandidate search);
        Task<List<ReqSitionDetailsData>> GetRequisitionDetailsForCandiateSearch(Searchrequisition search);
        String CloudStorageAccountname();
    }
}
