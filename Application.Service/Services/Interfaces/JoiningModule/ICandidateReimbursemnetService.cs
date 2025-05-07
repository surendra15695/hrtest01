using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Application.Service.Services.Interfaces.JoiningModule
{
    public interface ICandidateReimbursemnetService
    {

        String CloudStorageAccountname();
        Task<List<ReimbursementApprovalStatus>> GetReimbursementApprovalStatus(ReimbursementApprovalStatusSearch search);
        Task<List<EmployeeReimbursementMedicalList>> GetMedicalReimbursemtCandidateList(EmployeeReimbursementSearch search);
        Task<EmployeeMedicalReimbursement> GetMedicalReimbursemtCandidate(EmployeeReimbursementSearch search);
        Task<EmployeeMedicalReimbursementMedical> GetMedicalReimbursemtCandidate1(EmployeeReimbursementSearch search);//Argg
        Task<ReturnMessage> SaveMedicalReimbursemtCandidate(EmployeeReimbursementData search);
        Task<List<EmployeeTravelReimbursementListData>> GetTravelReimbursementListCandidate(EmployeeTravelReimbursementSearch search);
        Task<EmployeeTravelReimbursement> GetTravelReimbursementCandidate(EmployeeTravelReimbursementSearch search);
        Task<ReturnMessage> SaveTravelReimbursementCandidate(EmployeeTravelReimbursementData1 search);//Argg
        Task<List<EmployeeNoticePeriodReimbursement>> GetNoticePeriodReimbursemtCandidateList(EmployeeNoticePeriodReimbursementSearch search);
        Task<List<EmployeeNoticePeriodReimbursement>> GetNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursementSearch search);
        Task<ReturnMessage> SaveNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursement formdata);
        Task<List<CandidateMedicalReimbursementApprovalList>> GetMedicalReimbursementApprovalList(CandidateMedicalReimbursementApprovalListSearch search);
        Task<ReturnMessage> SaveMedicalReimbursementApproval(CandidateMedicalReimbursementApproval formdata);
        Task<List<CandidateTravelReimbursementApprovalList>> GetTravelReimbursementApprovalList(CandidateTravellReimbursementApprovalListSearch search);
        Task<ReturnMessage> SaveTravelReimbursementApproval(CandidateTravelReimbursementApproval formdata);
        Task<List<CandidateNoticePeriodBuyOutApprovalList>> GetCandidateNoticePeriodBuyOutApprovalList(CandidateNoticePeriodBuyOutApprovalListSearch search);
        Task<ReturnMessage> SaveCandidateNoticePeriodBuyOutApproval(CandidateNoticePeriodBuyOutApproval formdata);
        Task<List<CandidateReimbursementBillSubmitList>> GetCandidateReimbursementBillSubmitList(CandidateReimbursementBillSubmitListSearch search);
        Task<ReturnMessage> SaveCandidateReimbursementBillSubmit(CandidateReimbursementBillSubmitSave formdata);
        Task<List<CandidateReimbursementBillSubmitList>> GetCandidateReimbursementBillSubmitListForDownload(CandidateReimbursementBillSubmitListSearchForZip Param);
        Task<List<EmployeeReimbursementMedicalList>> GetCandidateMedicalReimbursementDwnloadAll(CandidateReimbursementBillSubmitListSearchForZip Param);
        Task<List<EmployeeTravelReimbursementForZip>> GetTravelReimbursementCandidateForAll(CandidateReimbursementBillSubmitListSearchForZip Param);
        Task<EmployeeMedicalReimbursementMedical2> GetMedicalReimbursemtCandidate2(EmployeeReimbursementSearch Param);
    }
}
