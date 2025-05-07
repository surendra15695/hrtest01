using Application.Entity.Entities.CampusModule;
using Application.Entity.Entities.CommonModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.CampusModule
{
    public interface ICampusRequisitionRepository
    {
        Task<ReturnMessage> CampusRequisitionInsert(CampusRequisitionFormData formData);
        Task<ReturnMessage> OffCampusRequisitionInsert(CampusRequisitionFormData formData);
        Task<List<CampusRequisitionList>> GetAllCampusRequisitionList(SearchCampusRequisitionList formData);
        Task<List<CampusRequisitionList>> GetAllOffCampusRequisitionList(SearchCampusRequisitionList formData);
        Task<List<CampusLinkList>> GetAllCampusLink(SaerchCampusLink formData);
        Task<ReturnMessage> CampusLinkInsert(CampusLinkFormData formData);
        Task<ReturnMessage> CampusLinkUpdate(UpdateCampusLinkTemplate formData);
        Task<ReturnMessage> CampusCollegeLinkInsert(CampusCollegeLinkFormData formData);
        Task<List<CampusCollegeLinklSharedList>> GetAllSharedCollegeCampusLink(SearchCampusCollegeLinklSharedList search);
        Task<List<CampusRequisitionTitleList>> GetAllCampusRequisitionTitleList(SearchCampusRequisitionTitle formData);
        Task<List<CampusCandidateList>> GetCampusCandidateList(SearchCampusCandidateDetail search);
        Task<List<CampusStatusList>> GetCampusHiringStatus(SearchCampusStatus search);
        Task<ReturnMessage> UpdateCampusCandidateHiringStatus(CampusCandidateHiringStatusFormData formData);
        Task<ReturnMessage> CampusTestScheduleInsert(CampusTestScheduleFormData formData);
        Task<ReturnMessage> UploadCampusTestResult(DataTable dtObject);
        Task<CampusTestScheduleDetail> GetCampusTestScheduleDetail(SearchCampusTestScheduleDetail formData);
        Task<InterviewScheduleDetailForCandidate> GetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formData);
        Task<InterviewScheduleDetailForCandidate> CampusGetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formData);
        Task<CampusTestScheduleDetailForGetAll> CampusTestScheduleDetailGetAll(SearchCampusTestScheduleDetailForGetAll formData);
        Task<CampusTalkScheduleDetailForGetAll> CampusTalkScheduleDetailGetAll(SearchCampusTalkScheduleDetailForGetAll formData);
        Task<List<CampusTestResultDetail>> GetCampusTestReult(SearchCampusTestResult formData);
        Task<ReturnMessage> CampusInterviewScheduleInsert(CampusInterviewScheduleFormData formData);
        Task<CampusInterviewScheduleDetail> GetInterviewScheduleDetail(SearchCampusInterviewScheduleDetail formData);
        Task<CampusCandidateVerticalFunction> GetCampusCandidateVerticalFunction(SearchCampusVerticalFunction search);
        Task<ReturnMessage> CampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formData);
        Task<ReturnMessage> OffCampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formData);
        Task<ReturnMessage> CampusCandidateRequisitionMap(CampusCandidateRequistionMapFormData formData);
        Task<List<CampusRequisitionMapList>> GetCampusRequisitionMapList(SearchCampusRequisitionMap search);
        Task<List<RequisitionListForCampusRequisitionMap>> GetAllRequisitionForCampusRequisitionMap(SearchRequisitionListForCampusMap search);
        Task<List<CampusRequisitionData>> GetCampusRequisitionData(SearchCampusRequisitionData formData);
        Task<ReturnMessage> CampusRequisitionUpdate(CampusRequisitionUpdateFormData formData);
        Task<CampusCandidateProfileDetail> GetCampusCandidateProfileDetailData(SearchCampusCandidateProfile search);
        Task<RegistrationDetail> GetCampusRegistrationDetails(SearchCampusCandidateProfile search);
        Task<List<RegistrationRemarks>> GetCampusRegistrationRemarks(SearchCampusCandidateRemarks search);
        Task<ReturnMessage> EnableDisableCampusLink(EnableDisableCampusLinkFormData formData);
        Task<ReturnMessage> UpdateCampusCandidateInstitute(UpdateInstituteFormData formData);
        Task<ReturnMessage> CampusTalkScheduleInsert(CampusTalkScheduleFormData formData);
        Task<ReturnMessage> UpdateCampusCandidateProfile(UpdateCampusProfileData formData);
        Task<ReturnMessage> CandidateRejectDecline(RejectDeclineData formData);
        Task<ReturnMessage> CandidateAcknowledged(AcknowledgedData formData);
        Task<ReturnMessage> CancelPrePlacementtalk(Cancelplacement formData);
        Task<ReturnMessage> CancelTestSchedule(Cancelplacement formData);
        Task<ReturnMessage> CancelInterview(Cancelplacement formData);
        Task<List<GetStageGetAssesmentComponentData>> GetStageGetAssesmentComponent(SearchCampusCandidateProfile formData);
        Task<List<StageGetAssesmentCandidate>> GetCampusCandidateData(SearchCampusCandidateProfile formData);
        Task<List<ReqCandidateDetails>> ViewCanidateListByRequisition(SearchCandiateByReq formData);
        Task<ReturnMessage> UpdateSelectionComunication(SelectionComunicationIns formData);
        Task<List<CandidateWiseSelection>> CandidateWiseSelectionData(CandidateWiseSelectionSearach formData);
        Task<ReturnMessage> CampusCandidateAcknowledgeMent(CampusCandidateSelectionAcknowledgeData formData);
        Task<List<CampusLinkList>> GetAllOffCampusLink(SaerchCampusLink formData);
        Task<ReturnMessage> OffCampusLinkInsert(CampusLinkFormData formData);
        Task<ReturnMessage> InsertUpdateMapRequistion(MapRequistionDeatils formData);
    }
}
