using Application.DataAccess.Repositories.Interfaces.JoiningModule;
using Application.Entity.Entities.JoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.JoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.JoiningModule
{
    public class CandidateReimbursemnetService: ICandidateReimbursemnetService
    {
        private readonly ICandidateReimbursemnetRepoitory candidatereimbursemnetrepoitory;
        public CandidateReimbursemnetService(ICandidateReimbursemnetRepoitory candidatereimbursemnetrepoitory)
        {
            this.candidatereimbursemnetrepoitory = candidatereimbursemnetrepoitory;
        }
        public string CloudStorageAccountname()
        {
            return this.candidatereimbursemnetrepoitory.CloudStorageAccountname();
        }
        public async Task<List<ReimbursementApprovalStatus>> GetReimbursementApprovalStatus(ReimbursementApprovalStatusSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetReimbursementApprovalStatus(Param);
        }
        public async Task<List<EmployeeReimbursementMedicalList>> GetMedicalReimbursemtCandidateList(EmployeeReimbursementSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidateList(Param);
        }

        public async Task<EmployeeMedicalReimbursement> GetMedicalReimbursemtCandidate(EmployeeReimbursementSearch Param)
        {
            //return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidate(Param);
            return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidate(Param);
        }
        //Argg start
        public async Task<EmployeeMedicalReimbursementMedical> GetMedicalReimbursemtCandidate1(EmployeeReimbursementSearch Param)
        {
            //return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidate(Param);
            return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidate1(Param);
        }//Argg end

        public async Task<ReturnMessage> SaveMedicalReimbursemtCandidate(EmployeeReimbursementData formdata)
        {
            return await this.candidatereimbursemnetrepoitory.SaveMedicalReimbursemtCandidate(formdata);
        }

        public async Task<List<EmployeeTravelReimbursementListData>> GetTravelReimbursementListCandidate(EmployeeTravelReimbursementSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetTravelReimbursementListCandidate(Param);
        }
        public async Task<EmployeeTravelReimbursement> GetTravelReimbursementCandidate(EmployeeTravelReimbursementSearch Param)
        {
            //return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidate(Param);
            return await this.candidatereimbursemnetrepoitory.GetTravelReimbursementCandidate(Param);
        }

        public async Task<ReturnMessage> SaveTravelReimbursementCandidate(EmployeeTravelReimbursementData1 formdata) //Argg
        {
            return await this.candidatereimbursemnetrepoitory.SaveTravelReimbursementCandidate(formdata);
        }
        public async Task<List<EmployeeNoticePeriodReimbursement>> GetNoticePeriodReimbursemtCandidateList(EmployeeNoticePeriodReimbursementSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetNoticePeriodReimbursemtCandidateList(Param);
        }
        public async Task<List<EmployeeNoticePeriodReimbursement>> GetNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursementSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetNoticePeriodReimbursemtCandidate(Param);
        }

        public async Task<ReturnMessage> SaveNoticePeriodReimbursemtCandidate(EmployeeNoticePeriodReimbursement formdata)
        {
            return await this.candidatereimbursemnetrepoitory.SaveNoticePeriodReimbursemtCandidate(formdata);
        }

        public async Task<List<CandidateMedicalReimbursementApprovalList>> GetMedicalReimbursementApprovalList(CandidateMedicalReimbursementApprovalListSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursementApprovalList(Param);
        }
        public async Task<ReturnMessage> SaveMedicalReimbursementApproval(CandidateMedicalReimbursementApproval formdata)
        {
            return await this.candidatereimbursemnetrepoitory.SaveMedicalReimbursementApproval(formdata);
        }

        public async Task<List<CandidateTravelReimbursementApprovalList>> GetTravelReimbursementApprovalList(CandidateTravellReimbursementApprovalListSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetTravelReimbursementApprovalList(Param);
        }

        public async Task<ReturnMessage> SaveTravelReimbursementApproval(CandidateTravelReimbursementApproval formdata)
        {
            return await this.candidatereimbursemnetrepoitory.SaveTravelReimbursementApproval(formdata);
        }

        public async Task<List<CandidateNoticePeriodBuyOutApprovalList>> GetCandidateNoticePeriodBuyOutApprovalList(CandidateNoticePeriodBuyOutApprovalListSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetCandidateNoticePeriodBuyOutApprovalList(Param);
        }
        public async Task<ReturnMessage> SaveCandidateNoticePeriodBuyOutApproval(CandidateNoticePeriodBuyOutApproval formdata)
        {
            return await this.candidatereimbursemnetrepoitory.SaveCandidateNoticePeriodBuyOutApproval(formdata);
        }
        public async Task<List<CandidateReimbursementBillSubmitList>> GetCandidateReimbursementBillSubmitList(CandidateReimbursementBillSubmitListSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetCandidateReimbursementBillSubmitList(Param);
        }

        public async Task<ReturnMessage> SaveCandidateReimbursementBillSubmit(CandidateReimbursementBillSubmitSave formdata)
        {
            return await this.candidatereimbursemnetrepoitory.SaveCandidateReimbursementBillSubmit(formdata);
        }

        public async Task<List<CandidateReimbursementBillSubmitList>> GetCandidateReimbursementBillSubmitListForDownload(CandidateReimbursementBillSubmitListSearchForZip Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetCandidateReimbursementBillSubmitListForDownload(Param);
        }
        public async Task<List<EmployeeReimbursementMedicalList>> GetCandidateMedicalReimbursementDwnloadAll(CandidateReimbursementBillSubmitListSearchForZip Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetCandidateMedicalReimbursementDwnloadAll(Param);
        }

        public async Task<List<EmployeeTravelReimbursementForZip>> GetTravelReimbursementCandidateForAll(CandidateReimbursementBillSubmitListSearchForZip Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetTravelReimbursementCandidateForAll(Param);
        }

        public async Task<EmployeeMedicalReimbursementMedical2> GetMedicalReimbursemtCandidate2(EmployeeReimbursementSearch Param)
        {
            return await this.candidatereimbursemnetrepoitory.GetMedicalReimbursemtCandidate2(Param);
        }
    }
}
