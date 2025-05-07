using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.Entity.Entities.CampusModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.CampusModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CampusModule
{
    public class CampusRequisitionService : ICampusRequisitionService
    {
        private readonly ICampusRequisitionRepository campusRequisitionRepository;

        public CampusRequisitionService(ICampusRequisitionRepository campusRequisitionRepository)
        {
            this.campusRequisitionRepository = campusRequisitionRepository;
        }

        public async Task<ReturnMessage> CampusRequisitionInsert(CampusRequisitionFormData formData)
        {
            return await this.campusRequisitionRepository.CampusRequisitionInsert(formData);
        }
        public async Task<ReturnMessage> OffCampusRequisitionInsert(CampusRequisitionFormData formData)
        {
            return await this.campusRequisitionRepository.OffCampusRequisitionInsert(formData);
        }
        public async Task<List<CampusRequisitionList>> GetAllCampusRequisitionList(SearchCampusRequisitionList formData)
        {
            return await this.campusRequisitionRepository.GetAllCampusRequisitionList(formData);
        }
        public async Task<List<CampusRequisitionList>> GetAllOffCampusRequisitionList(SearchCampusRequisitionList formData)
        {
            return await this.campusRequisitionRepository.GetAllOffCampusRequisitionList(formData);
        }
        public async Task<List<CampusLinkList>> GetAllCampusLink(SaerchCampusLink search)
        {
            return await this.campusRequisitionRepository.GetAllCampusLink(search);
        }

        public async Task<ReturnMessage> CampusLinkInsert(CampusLinkFormData formData)
        {
            return await this.campusRequisitionRepository.CampusLinkInsert(formData);
        }
        public async Task<ReturnMessage> CampusLinkUpdate(UpdateCampusLinkTemplate formData)
        {
            return await this.campusRequisitionRepository.CampusLinkUpdate(formData);
        }

        public async Task<ReturnMessage> CampusCollegeLinkInsert(CampusCollegeLinkFormData formData)
        {
            return await this.campusRequisitionRepository.CampusCollegeLinkInsert(formData);
        }

        public async Task<List<CampusCollegeLinklSharedList>> GetAllSharedCollegeCampusLink(SearchCampusCollegeLinklSharedList search)
        {
            return await this.campusRequisitionRepository.GetAllSharedCollegeCampusLink(search);
        }

        public async Task<List<CampusRequisitionTitleList>> GetAllCampusRequisitionTitleList(SearchCampusRequisitionTitle search)
        {
            return await this.campusRequisitionRepository.GetAllCampusRequisitionTitleList(search);

        }

        public async Task<List<CampusCandidateList>> GetCampusCandidateList(SearchCampusCandidateDetail search)
        {
            return await this.campusRequisitionRepository.GetCampusCandidateList(search);
        }
        public async Task<List<CampusStatusList>> GetCampusHiringStatus(SearchCampusStatus search)
        {
            return await this.campusRequisitionRepository.GetCampusHiringStatus(search);
        }
        public async Task<ReturnMessage> UpdateCampusCandidateHiringStatus(CampusCandidateHiringStatusFormData formData)
        {
            return await this.campusRequisitionRepository.UpdateCampusCandidateHiringStatus(formData);
        }

        public async Task<ReturnMessage> CampusTestScheduleInsert(CampusTestScheduleFormData formData)
        {
            return await this.campusRequisitionRepository.CampusTestScheduleInsert(formData);
        }
        
        public async Task<CampusTestScheduleDetail> GetCampusTestScheduleDetail(SearchCampusTestScheduleDetail formData)
        {
            return await this.campusRequisitionRepository.GetCampusTestScheduleDetail(formData);
        }
        public async Task<InterviewScheduleDetailForCandidate> GetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formData)
        {
            return await this.campusRequisitionRepository.GetInterviewScheduleDetailForCandidate(formData);
        }

        public async Task<InterviewScheduleDetailForCandidate> CampusGetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formData)
        {
            return await this.campusRequisitionRepository.CampusGetInterviewScheduleDetailForCandidate(formData);
        }

        public async Task<CampusTestScheduleDetailForGetAll> CampusTestScheduleDetailGetAll(SearchCampusTestScheduleDetailForGetAll formData)
        {
            return await this.campusRequisitionRepository.CampusTestScheduleDetailGetAll(formData);
        }
        public async Task<CampusTalkScheduleDetailForGetAll> CampusTalkScheduleDetailGetAll(SearchCampusTalkScheduleDetailForGetAll formData)
        {
            return await this.campusRequisitionRepository.CampusTalkScheduleDetailGetAll(formData);
        }

        public async Task<List<CampusTestResultDetail>> GetCampusTestReult(SearchCampusTestResult formData)
        {
            return await this.campusRequisitionRepository.GetCampusTestReult(formData);
        }

        public async Task<ReturnMessage> UploadCampusTestResult(DataTable formData)
        {
            return await this.campusRequisitionRepository.UploadCampusTestResult(formData);
        }

        public async Task<ReturnMessage> CampusInterviewScheduleInsert(CampusInterviewScheduleFormData formData)
        {
            return await this.campusRequisitionRepository.CampusInterviewScheduleInsert(formData);
        }

        public async Task<CampusInterviewScheduleDetail> GetInterviewScheduleDetail(SearchCampusInterviewScheduleDetail formData)
        {
            return await this.campusRequisitionRepository.GetInterviewScheduleDetail(formData);
        }

        public async Task<CampusCandidateVerticalFunction> GetCampusCandidateVerticalFunction(SearchCampusVerticalFunction search)
        {
            return await this.campusRequisitionRepository.GetCampusCandidateVerticalFunction(search);
        }

        public async Task<ReturnMessage> CampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formData)
        {
            return await this.campusRequisitionRepository.CampusCandidateVerticalFunctionUpdate(formData);
        }

        public async Task<ReturnMessage> OffCampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formData)
        {
            return await this.campusRequisitionRepository.OffCampusCandidateVerticalFunctionUpdate(formData);
        }

        public async Task<ReturnMessage> CampusCandidateRequisitionMap(CampusCandidateRequistionMapFormData formData)
        {
            return await this.campusRequisitionRepository.CampusCandidateRequisitionMap(formData);
        }

        public async Task<List<CampusRequisitionMapList>> GetCampusRequisitionMapList(SearchCampusRequisitionMap search)
        {
            return await this.campusRequisitionRepository.GetCampusRequisitionMapList(search);
        }
        public async Task<List<RequisitionListForCampusRequisitionMap>> GetAllRequisitionForCampusRequisitionMap(SearchRequisitionListForCampusMap search)
        {
            return await this.campusRequisitionRepository.GetAllRequisitionForCampusRequisitionMap(search);
        }

        public async Task<List<CampusRequisitionData>> GetCampusRequisitionData(SearchCampusRequisitionData formData)
        {
            return await this.campusRequisitionRepository.GetCampusRequisitionData(formData);
        }

        public async Task<ReturnMessage> CampusRequisitionUpdate(CampusRequisitionUpdateFormData formData)
        {
            return await this.campusRequisitionRepository.CampusRequisitionUpdate(formData);
        }

        public async Task<CampusCandidateProfileDetail> GetCampusCandidateProfileDetailData(SearchCampusCandidateProfile search)
        {
            return await this.campusRequisitionRepository.GetCampusCandidateProfileDetailData(search);
        }
        public async Task<RegistrationDetail> GetCampusRegistrationDetails(SearchCampusCandidateProfile search)
        {
            return await this.campusRequisitionRepository.GetCampusRegistrationDetails(search);
        }
        public async Task<List<RegistrationRemarks>> GetCampusRegistrationRemarks(SearchCampusCandidateRemarks search)
        {
            return await this.campusRequisitionRepository.GetCampusRegistrationRemarks(search);
        }
        public async Task<ReturnMessage> EnableDisableCampusLink(EnableDisableCampusLinkFormData formData)
        {
            return await this.campusRequisitionRepository.EnableDisableCampusLink(formData);
        }

        public async Task<ReturnMessage> UpdateCampusCandidateInstitute(UpdateInstituteFormData formData)
        {
            return await this.campusRequisitionRepository.UpdateCampusCandidateInstitute(formData);
        }
        public async Task<ReturnMessage> UpdateCampusCandidateProfile(UpdateCampusProfileData formData)
        {
            return await this.campusRequisitionRepository.UpdateCampusCandidateProfile(formData);
        }
        public async Task<ReturnMessage> CampusTalkScheduleInsert(CampusTalkScheduleFormData formData)
        {
            return await this.campusRequisitionRepository.CampusTalkScheduleInsert(formData);
        }
        public async Task<ReturnMessage> CandidateRejectDecline(RejectDeclineData formData)
        {
            return await this.campusRequisitionRepository.CandidateRejectDecline(formData);
        }
        public async Task<ReturnMessage> CandidateAcknowledged(AcknowledgedData formData)
        {
            return await this.campusRequisitionRepository.CandidateAcknowledged(formData);
        }
        public async Task<ReturnMessage> CancelPrePlacementtalk(Cancelplacement formData)
        {
            return await this.campusRequisitionRepository.CancelPrePlacementtalk(formData);
        }
        public async Task<ReturnMessage> CancelTestSchedule(Cancelplacement formData)
        {
            return await this.campusRequisitionRepository.CancelTestSchedule(formData);
        }
        public async Task<ReturnMessage> CancelInterview(Cancelplacement formData)
        {
            return await this.campusRequisitionRepository.CancelInterview(formData);
        }

        public async Task<List<GetStageGetAssesmentComponentData>> GetStageGetAssesmentComponent(SearchCampusCandidateProfile formData)
        {
            return await this.campusRequisitionRepository.GetStageGetAssesmentComponent(formData);
        }
        public async Task<List<StageGetAssesmentCandidate>> GetCampusCandidateData(SearchCampusCandidateProfile formData)
        {
            return await this.campusRequisitionRepository.GetCampusCandidateData(formData);
        }
        public async Task<List<ReqCandidateDetails>> ViewCanidateListByRequisition(SearchCandiateByReq formData)
        {
            return await this.campusRequisitionRepository.ViewCanidateListByRequisition(formData);
        }

        public async Task<ReturnMessage> UpdateSelectionComunication(SelectionComunicationIns formData)
        {
            return await this.campusRequisitionRepository.UpdateSelectionComunication(formData);
        }

        public async Task<List<CandidateWiseSelection>> CandidateWiseSelectionData(CandidateWiseSelectionSearach formData)
        {
            return await this.campusRequisitionRepository.CandidateWiseSelectionData(formData);
        }
        public async Task<ReturnMessage> CampusCandidateAcknowledgeMent(CampusCandidateSelectionAcknowledgeData formData)
        {
            return await this.campusRequisitionRepository.CampusCandidateAcknowledgeMent(formData);
        }

        public async Task<List<CampusLinkList>> GetAllOffCampusLink(SaerchCampusLink formData)
        {
            return await this.campusRequisitionRepository.GetAllOffCampusLink(formData);
        }
        public async Task<ReturnMessage> OffCampusLinkInsert(CampusLinkFormData formData)
        {
            return await this.campusRequisitionRepository.OffCampusLinkInsert(formData);
        }

        public async Task<ReturnMessage> InsertUpdateMapRequistion(MapRequistionDeatils formData)
        {
            return await this.campusRequisitionRepository.InsertUpdateMapRequistion(formData);
        }
    }
}
