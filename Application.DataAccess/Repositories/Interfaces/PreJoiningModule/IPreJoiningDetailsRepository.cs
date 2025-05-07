using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.PreJoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.Interfaces.PreJoiningModule
{
    public interface IPreJoiningDetailsRepository
    {
        String CloudStorageAccountname();
        Task<List<PreJoiningCandidateList>> GetPreJoiningCandidateList(SearchPreJoiningCandidateList search);
        Task<List<TrainingInchargeDetails>> GetTrainingInchargeDetails(SearchTrainingInchargeDetails Param);
        Task<List<HiringStausIdForReleaseCandidate>> GetReleaseCandidateStageToRequisitionTag(SearchHiringStausIdForReleaseCandidate Param);
        Task<List<DoctorsApprovalCandidateList>> GetAllDoctorsApprovalCandidateList(DoctorsApprovalCandidateParam Param);
        Task<ReturnMessage> MedicalDocumentDoctorApprovalAssignInsert(MedicalDocumentDoctor param);
        Task<List<CandidateListOnBoarding>> GetAllForCandidateListOnBoarding(CandidateListOnBoardingParam param);
        Task<List<CallbackRequestCandidate>> GetAllCallbackRequestCandidate(searchCallbackRequetsCandidate param);
        Task<ReturnMessage> CandidateOnBoardingAssignInsert(CandidateOnBoardingAssignInsertParam param);
        Task<ReturnMessage> CandidateOnBoardingCoordinatorAssignInsert(CandidateOnBoardingCoordinatorAssignParam Param);
        Task<List<CandidateListOnBoarding>> GetAllOnBoardingCoordinatorPendingJoiningTypeList(OnBoardingCoordinatorPendingJoiningTypeListParam Param);
        Task<ReturnMessage> CandidateJoiningTypeDetailsInsert(CandidateJoiningTypeDetailsParam Param);
        Task<ReturnMessage> CandidateJoiningDateInsert(CandidateJoiningDateInsertParam Param);
        Task<ReturnMessage> CandidateUpdateJoiningDate(CandidateJoiningDateInsertParam Param);
        Task<ReturnMessage> BatchJoiningDateUpdate(BatchJoiningDateUpdate Param);
        Task<List<CandidateJoining>> GetAllCandidateJoiningDate(CandidateJoiningSearch param);
        Task<ReturnMessage> CandidateBGVReportInsert(InsertUpdateCandidateBVGReportParam Param);
        Task<List<BatchWiseOnBoardingPendingShedule>> GetBatchWiseOnBoardingPendingShedule(BatchWiseOnBoardingPendingSheduleParams param);
        Task<List<CandidateListOnBoarding>> GetAllOnBoardingBatchPendingScheduleDetails(OnBoardingBatchPendingScheduleDetailsParam Param);
        Task<List<CandidateListOnBoarding>> GetAllIndividualOnBoardingPendingSchedule(OnBoardingPendingScheduleIndividualParam Param);
        Task<ReturnMessage> InsertMovingCandidateJoiningType(MovingCandidateJoiningTypeParam Param);
        //UploadCandidateBGVReportParam
        Task<ReturnMessage> UploadCandidateBGVReport(UploadCandidateBGVReportParam Param);
        Task<ReturnMessage> InsertUpdateCandidateInductionSchedule(CandidateInductionScheduleInsertUpdateParam Param);
        Task<ReturnMessage> ReassignCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule Param);
        Task<ReturnMessage> ReassignIndividualCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule Param);

        Task<CandidateInductionShedule> GetAllCandidateInductionSchedule(GetAllCandidateInductionScheduleparam Param);
        Task<ReturnMessage> InsertUpdateReportingVenue(ReportingVenueParam Param);
        Task<List<ReportingVenue>> GetAllReportingVenue(AllReportingVenueParam Param);
        Task<List<BatchesPendingReportingVenue>> GetAllBatchesPendingReportingVenue(AllBatchesPendingReportingVenueParam Param);
        Task<List<BatchesPendingReportingVenue>> GetAllBatchesForReassign(AllBatchesPendingReportingVenueParam Param);
        Task<List<PendingReportingVenueIndividual>> GetAllPendingReportingVenueIndividual(PendingReportingVenueIndividualParam Param);
        Task<ReturnMessage> InsertUpdateCandidateOnBoardingCoordinatorAccomodation(CandidateOnBoardingCoordinatorAccomodationInsertUpdateParam Param);
        Task<ReturnMessage> CandidateReassignTraining(CandidateTrainingReassignForBatch Param);
        Task<ReturnMessage> IndividualCandidateReassignTraining(CandidateTrainingReassignForBatch Param);

        Task<OnBoardingCoordinateBookAccommodation> GetAllCandidateOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param);
        Task<OnBoardingCoordinateBookAccommodation> GetAllBatchOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param);
        Task<ReturnMessage> InsertUpdateCandidateReportingVenue(InsertUpdateCandidateReportingVenueParam Param);
        Task<OnBoardingCoordinatorCheckingAddReportingVenue> GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue(OnBoardingCoordinatorAddReportingVenueByBatchOrCandidateParam Param);
        Task<ReturnMessage> InsertUpdateTrainingInchargeAccomodation(TrainingAccomodationInsertUpdateParam Param);
        Task<List<BatchAccomodationPendingForTraining>> GetAllBatchesPendingAccomodationForTrainingIncharge(BatchAccomodationPendingForTrainingInchargeParam Param);
        Task<List<CandidateAccomodationPendingForTraining>> GetAllCandidatePendingAccomodationForTrainingIncharge(CandidateAccomodationPendingForTrainingInchargeParam Param);
        Task<TrainingInchargeAccomodationDetails> GetTrainingAccomodationDetails(TrainingInchargeAccomodationDetailsParam Param);
        Task<ReturnMessage> InsertShareWithCandidate(InsertUpdateCandidateOnBoardingCoordinatorAccomodationParam Param);
        Task<ReturnMessage> InsertShareWithCandidateAndSaveAcknowlwdgement(InsertUpdateCandidateWelcomeAcknowledgementParam Param);
        Task<EditAccomodationInduction> GetAllEditAccomodationInductionDetails(EditAccomodationInductionDetailsParam Param);
        Task<EditAccomodationInductionForBatchNew> GetAllEditAccomodationInductionDetailsForBatch(EditAccomodationInductionDetailsParam Param);
        Task<EditAccomodationInductionBatch> GetAllBatchEditAccomodationInductionDetails(EditAccomodationInductionDetailsParamBatch Param);
        Task<InductionDetailsForBatchReassignCandidate> GetAllInductionDetailsForBatchForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate Param);
        Task<InductionDetailsForIndividualReassignCandidate> GetAllInductionDetailsForIndividualForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate Param);

        Task<GetEditAccomodation> GetEditAccomodationForEditing(GetAllEditAccomodationParam Param);
        Task<List<CandidateWelcomeAcknowledgementStatus>> GetAllCandidateWelcomeAcknowledgementStatus(CandidateWelcomeAcknowledgementStatusParam Param);
        Task<List<CandidateJoiningCheck>> GetAllCandidateJoiningCheckList(CandidateJoiningCheckListParam Param);
        Task<OnBoardingDocumentVerification> GetOnBoardingDocumentVerification(OnBoardingDocumentVerificationParam Param);
        Task<AllCandidateJoiningCheckListModel> GetAllCandidateJoiningCheckForOnBoardingCoordinator(AllCandidateJoiningCheckListParam Param);
        Task<CandidateInductionPlan> GetCandidateInductionPlan(CandidateInductionPlanParam Param);
        Task<ReturnMessage> InsertCandidateJoiningForm(CandidateJoiningFormParam Param);
        Task<PreJoiningDocumentCollection> GetPreJoiningDocumentCollectionData(PreJoiningDocumentCollectionSearch search);
        Task<ReturnMessage> PreJoiningDocumentCollectionDataSave(PreJoiningDocumentFormData formdata);
        Task<ReturnMessage> CandidateRMJoiningCheckListSave(RMJoiningCheckListSave formdata);
        Task<ReturnMessage> CandidateOnBoardingJoiningCheckListSave(OnboardingJoiningCheckListSave formdata);
        Task<CandidateJoingForm> GetCandidateJoiningForm(CandidateJoingFormSearch search);
        Task<ReturnMessage> SaveCandidateJoiningForm(CandidateJoingFormData formdata);
        Task<ReturnMessage> UpdateCandidateJoiningFamilyDetailsForm(UpdateCandidateJoiningFormFamilydetails formdata);
        Task<ReturnMessage> UpdateCandidateJoiningSEBIInitialDisclosureForm(UpdateSEBIInitialDisclosuerDetails formdata);
        Task<ReturnMessage> UpdateAccidentInsurancePolicyForm(UpdateAccidentInsurancePolicy formdata);
        Task<ReturnMessage> UpdateJoiningReportform(UpdateJoiningReport formdata);
        Task<CandidateJoiningFormPDFData> GetCandidateJoiningFormPDF(CandidateJoingFormSearch Param);
        Task<ReturnMessage> ShareWithInductorInsert(ShareWithInductor formData);
        Task<JoiningFormFamilyDetailsUpdateHistoryList> GetJoiningFormFamilyDetailsUpdateHistory(SearchFamilyDetailsUpdateHistory formData);
        Task<SEBIInitialDisclosureUpdateHistoryList> GetSEBIDisclosureUpdateHistory(SearchSEBIInitialDisclosureUpdateHistory formData);
        Task<List<AccidentInsurancePolicyUpdateHistoryList>> GetAccidentInsurancPolicyUpdateHistory(SearchAccidentInsurancePolicyUpdateHistory search);
        Task<List<SearchJoiningReportHistoryList>> GetJoiningReportHistory(SearchJoiningReportHistory search);
        Task<List<SearchMRFPPFList>> getMRFPPFhistory(SearchMRFPPFHistory search);
        Task<ReturnMessage> DiscontinueCandidates(discontinuecandidate formData);
        Task<List<getbatchcandidate>> getbatchidfromcandidateid(searchbatchcandidate formData);
        Task<List<GetAdditionalDocumentList>> GetAdditionalDocumentList(searchbatchcandidate formData);
        Task<ReturnMessage> UpdateShareWithCandidateDoc(UpdateAdditionalDoc formData);
        Task<ReturnMessage> DeleteCandidateInductionScheduleDetail(DeleteCandidateInductionScheduleDetail formData);

        Task<ReturnMessage> DiscontinueIndividualCandidate(DiscontinueIndividualCandidateFormData formData);
        Task<ReturnMessage> DeleteInductionSchedule(DeleteInductionScheduleParam formData);
        Task<ReturnMessage> InserrtUpdateSignature(SignatureInsUpData formData);
        Task<List<SignatureInsUpData>> GetSignatureCandidate(SignatureInsUpData formData);
        Task<List<CampusPreJoiningCandidateList>> CampusGetPreJoiningCandidateList(CampusSearchPreJoiningCandidateList search);
        Task<List<CandidateJoiningRelationShip>> GetJoiningRelationShip(SearchJoiningRelationShip formData);
    }
}
