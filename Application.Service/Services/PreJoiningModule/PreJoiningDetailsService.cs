using Application.DataAccess.Repositories.Interfaces.PreJoiningModule;
using Application.Entity.Entities.PreJoiningModule;
using Application.Entity.Entities.CommonModule;
using Application.Service.Services.Interfaces.PreJoiningModule;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Application.Service.Services.PreJoiningModule
{
    public class PreJoiningDetailsService : IPreJoiningDetailsService
    {
        private readonly IPreJoiningDetailsRepository prejoiningdetailsrepository;
        public PreJoiningDetailsService(IPreJoiningDetailsRepository prejoiningdetailsrepository)
        {
            this.prejoiningdetailsrepository = prejoiningdetailsrepository;
        }

        public async Task<ReturnMessage> CandidateBGVReportInsert(InsertUpdateCandidateBVGReportParam Param)
        {
            return await this.prejoiningdetailsrepository.CandidateBGVReportInsert(Param);
        }

        public async Task<ReturnMessage> CandidateJoiningDateInsert(CandidateJoiningDateInsertParam Param)
        {
            return await this.prejoiningdetailsrepository.CandidateJoiningDateInsert(Param);
        }
        public async Task<ReturnMessage> CandidateUpdateJoiningDate(CandidateJoiningDateInsertParam Param)
        {
            return await this.prejoiningdetailsrepository.CandidateUpdateJoiningDate(Param);
        }
        public async Task<ReturnMessage> BatchJoiningDateUpdate(BatchJoiningDateUpdate Param)
        {
            return await this.prejoiningdetailsrepository.BatchJoiningDateUpdate(Param);
        }

        public async Task<ReturnMessage> CandidateJoiningTypeDetailsInsert(CandidateJoiningTypeDetailsParam Param)
        {
            return await this.prejoiningdetailsrepository.CandidateJoiningTypeDetailsInsert(Param);
        }

        public async Task<ReturnMessage> CandidateOnBoardingAssignInsert(CandidateOnBoardingAssignInsertParam Param)
        {
            return await this.prejoiningdetailsrepository.CandidateOnBoardingAssignInsert(Param);
        }

        public async Task<ReturnMessage> CandidateOnBoardingCoordinatorAssignInsert(CandidateOnBoardingCoordinatorAssignParam Param)
        {
            return await this.prejoiningdetailsrepository.CandidateOnBoardingCoordinatorAssignInsert(Param);
        }

        public async Task<List<BatchAccomodationPendingForTraining>> GetAllBatchesPendingAccomodationForTrainingIncharge(BatchAccomodationPendingForTrainingInchargeParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllBatchesPendingAccomodationForTrainingIncharge(Param);
        }

        public async Task<List<BatchesPendingReportingVenue>> GetAllBatchesPendingReportingVenue(AllBatchesPendingReportingVenueParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllBatchesPendingReportingVenue(Param);
        }
        public async Task<List<BatchesPendingReportingVenue>> GetAllBatchesForReassign(AllBatchesPendingReportingVenueParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllBatchesForReassign(Param);
        }

        public async Task<List<TrainingInchargeDetails>> GetTrainingInchargeDetails(SearchTrainingInchargeDetails Param)
        {
            return await this.prejoiningdetailsrepository.GetTrainingInchargeDetails(Param);
        }
        public async Task<List<HiringStausIdForReleaseCandidate>> GetReleaseCandidateStageToRequisitionTag(SearchHiringStausIdForReleaseCandidate Param)
        {
            return await this.prejoiningdetailsrepository.GetReleaseCandidateStageToRequisitionTag(Param);
        }

        public async Task<OnBoardingCoordinateBookAccommodation> GetAllBatchOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllBatchOnBoardingCoordinateBookAccommodation(Param);
        }

        public async Task<CandidateInductionShedule> GetAllCandidateInductionSchedule(GetAllCandidateInductionScheduleparam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidateInductionSchedule(Param);
        }

        public async Task<AllCandidateJoiningCheckListModel> GetAllCandidateJoiningCheckForOnBoardingCoordinator(AllCandidateJoiningCheckListParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidateJoiningCheckForOnBoardingCoordinator(Param);
        }

        public async Task<List<CandidateJoiningCheck>> GetAllCandidateJoiningCheckList(CandidateJoiningCheckListParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidateJoiningCheckList(Param);
        }

        public async Task<List<CandidateJoining>> GetAllCandidateJoiningDate(CandidateJoiningSearch Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidateJoiningDate(Param);
        }

        public async Task<OnBoardingCoordinateBookAccommodation> GetAllCandidateOnBoardingCoordinateBookAccommodation(GetAllOnBoardingCoordinateBookAccommodationParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidateOnBoardingCoordinateBookAccommodation(Param);
        }

        public async Task<List<CandidateAccomodationPendingForTraining>> GetAllCandidatePendingAccomodationForTrainingIncharge(CandidateAccomodationPendingForTrainingInchargeParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidatePendingAccomodationForTrainingIncharge(Param);
        }

        public async Task<List<CandidateWelcomeAcknowledgementStatus>> GetAllCandidateWelcomeAcknowledgementStatus(CandidateWelcomeAcknowledgementStatusParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCandidateWelcomeAcknowledgementStatus(Param);
        }

        public async Task<List<DoctorsApprovalCandidateList>> GetAllDoctorsApprovalCandidateList(DoctorsApprovalCandidateParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllDoctorsApprovalCandidateList(Param);
        }

        public async Task<EditAccomodationInduction> GetAllEditAccomodationInductionDetails(EditAccomodationInductionDetailsParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllEditAccomodationInductionDetails(Param);
        }
        public async Task<EditAccomodationInductionForBatchNew> GetAllEditAccomodationInductionDetailsForBatch(EditAccomodationInductionDetailsParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllEditAccomodationInductionDetailsForBatch(Param);
        }
        public async Task<EditAccomodationInductionBatch> GetAllBatchEditAccomodationInductionDetails(EditAccomodationInductionDetailsParamBatch Param)
        {
            return await this.prejoiningdetailsrepository.GetAllBatchEditAccomodationInductionDetails(Param);
        }
        public async Task<InductionDetailsForBatchReassignCandidate> GetAllInductionDetailsForBatchForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate Param)
        {
            return await this.prejoiningdetailsrepository.GetAllInductionDetailsForBatchForReassignCandidate(Param);
        }
        public async Task<InductionDetailsForIndividualReassignCandidate> GetAllInductionDetailsForIndividualForReassignCandidate(SearchInductionDetailsForBatchReassignCandidate Param)
        {
            return await this.prejoiningdetailsrepository.GetAllInductionDetailsForIndividualForReassignCandidate(Param);
        }

        public async Task<List<CandidateListOnBoarding>> GetAllForCandidateListOnBoarding(CandidateListOnBoardingParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllForCandidateListOnBoarding(Param);
        }
        public async Task<List<CallbackRequestCandidate>> GetAllCallbackRequestCandidate(searchCallbackRequetsCandidate Param)
        {
            return await this.prejoiningdetailsrepository.GetAllCallbackRequestCandidate(Param);
        }

        public async Task<List<CandidateListOnBoarding>> GetAllIndividualOnBoardingPendingSchedule(OnBoardingPendingScheduleIndividualParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllIndividualOnBoardingPendingSchedule(Param);
        }

        public async Task<List<CandidateListOnBoarding>> GetAllOnBoardingBatchPendingScheduleDetails(OnBoardingBatchPendingScheduleDetailsParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllOnBoardingBatchPendingScheduleDetails(Param);
        }

        

        public async Task<List<CandidateListOnBoarding>> GetAllOnBoardingCoordinatorPendingJoiningTypeList(OnBoardingCoordinatorPendingJoiningTypeListParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllOnBoardingCoordinatorPendingJoiningTypeList(Param);
        }

        public async Task<List<PendingReportingVenueIndividual>> GetAllPendingReportingVenueIndividual(PendingReportingVenueIndividualParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllPendingReportingVenueIndividual(Param);
        }

        public async Task<List<ReportingVenue>> GetAllReportingVenue(AllReportingVenueParam Param)
        {
            return await this.prejoiningdetailsrepository.GetAllReportingVenue(Param);
        }

        public async Task<OnBoardingCoordinatorCheckingAddReportingVenue> GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue(OnBoardingCoordinatorAddReportingVenueByBatchOrCandidateParam Param)
        {
            return await this.prejoiningdetailsrepository.GetBatchOrCandidateFromOnBoardingCoordinatorAddReportingVenue(Param);
        }

        public async Task<List<BatchWiseOnBoardingPendingShedule>> GetBatchWiseOnBoardingPendingShedule(BatchWiseOnBoardingPendingSheduleParams Param)
        {
            return await this.prejoiningdetailsrepository.GetBatchWiseOnBoardingPendingShedule(Param);
        }

        public async Task<CandidateInductionPlan> GetCandidateInductionPlan(CandidateInductionPlanParam Param)
        {
            return await this.prejoiningdetailsrepository.GetCandidateInductionPlan(Param);
        }

        public async Task<GetEditAccomodation> GetEditAccomodationForEditing(GetAllEditAccomodationParam Param)
        {
            return await this.prejoiningdetailsrepository.GetEditAccomodationForEditing(Param);
        }

        public async Task<OnBoardingDocumentVerification> GetOnBoardingDocumentVerification(OnBoardingDocumentVerificationParam Param)
        {
            return await this.prejoiningdetailsrepository.GetOnBoardingDocumentVerification(Param);
        }

        public async Task<List<PreJoiningCandidateList>> GetPreJoiningCandidateList(SearchPreJoiningCandidateList search)
        {
            return await this.prejoiningdetailsrepository.GetPreJoiningCandidateList(search);
        }

        public async Task<TrainingInchargeAccomodationDetails> GetTrainingAccomodationDetails(TrainingInchargeAccomodationDetailsParam Param)
        {
            return await this.prejoiningdetailsrepository.GetTrainingAccomodationDetails(Param);
        }

        public async Task<ReturnMessage> InsertCandidateJoiningForm(CandidateJoiningFormParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertCandidateJoiningForm(Param);
        }

        public async Task<ReturnMessage> InsertMovingCandidateJoiningType(MovingCandidateJoiningTypeParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertMovingCandidateJoiningType(Param);
        }

        public async Task<ReturnMessage> InsertShareWithCandidate(InsertUpdateCandidateOnBoardingCoordinatorAccomodationParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertShareWithCandidate(Param);
        }
        public async Task<ReturnMessage> InsertShareWithCandidateAndSaveAcknowlwdgement(InsertUpdateCandidateWelcomeAcknowledgementParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertShareWithCandidateAndSaveAcknowlwdgement(Param);
        }
        public async Task<ReturnMessage> InsertUpdateCandidateInductionSchedule(CandidateInductionScheduleInsertUpdateParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertUpdateCandidateInductionSchedule(Param);
        }
        public async Task<ReturnMessage> ReassignCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule Param)
        {
            return await this.prejoiningdetailsrepository.ReassignCandidateNewInductionScheduleInsert(Param);
        }
        public async Task<ReturnMessage> ReassignIndividualCandidateNewInductionScheduleInsert(ReassignCandidateNewInductionSchedule Param)
        {
            return await this.prejoiningdetailsrepository.ReassignIndividualCandidateNewInductionScheduleInsert(Param);
        }

        public async Task<ReturnMessage> InsertUpdateCandidateOnBoardingCoordinatorAccomodation(CandidateOnBoardingCoordinatorAccomodationInsertUpdateParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertUpdateCandidateOnBoardingCoordinatorAccomodation(Param);
        }
        public async Task<ReturnMessage> CandidateReassignTraining(CandidateTrainingReassignForBatch Param)
        {
            return await this.prejoiningdetailsrepository.CandidateReassignTraining(Param);
        }
        public async Task<ReturnMessage> IndividualCandidateReassignTraining(CandidateTrainingReassignForBatch Param)
        {
            return await this.prejoiningdetailsrepository.IndividualCandidateReassignTraining(Param);
        }

        public async Task<ReturnMessage> InsertUpdateCandidateReportingVenue(InsertUpdateCandidateReportingVenueParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertUpdateCandidateReportingVenue(Param);
        }

        public async Task<ReturnMessage> InsertUpdateReportingVenue(ReportingVenueParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertUpdateReportingVenue(Param);
        }

        public async Task<ReturnMessage> InsertUpdateTrainingInchargeAccomodation(TrainingAccomodationInsertUpdateParam Param)
        {
            return await this.prejoiningdetailsrepository.InsertUpdateTrainingInchargeAccomodation(Param);
        }

        public async Task<ReturnMessage> MedicalDocumentDoctorApprovalAssignInsert(MedicalDocumentDoctor param)
        {
            return await this.prejoiningdetailsrepository.MedicalDocumentDoctorApprovalAssignInsert(param);
        }

        public async Task<ReturnMessage> UploadCandidateBGVReport(UploadCandidateBGVReportParam Param)
        {
            return await this.prejoiningdetailsrepository.UploadCandidateBGVReport(Param);
        }

        public async Task<PreJoiningDocumentCollection> GetPreJoiningDocumentCollectionData(PreJoiningDocumentCollectionSearch search)
        {
            return await this.prejoiningdetailsrepository.GetPreJoiningDocumentCollectionData(search);
        }

        public async Task<ReturnMessage> PreJoiningDocumentCollectionDataSave(PreJoiningDocumentFormData formdata)
        {
            return await this.prejoiningdetailsrepository.PreJoiningDocumentCollectionDataSave(formdata);
        }

        public async Task<ReturnMessage> CandidateRMJoiningCheckListSave(RMJoiningCheckListSave formdata)
        {
            return await this.prejoiningdetailsrepository.CandidateRMJoiningCheckListSave(formdata);
        }

        public async Task<ReturnMessage> CandidateOnBoardingJoiningCheckListSave(OnboardingJoiningCheckListSave formdata)
        {
            return await this.prejoiningdetailsrepository.CandidateOnBoardingJoiningCheckListSave(formdata);
        }

        public async Task<CandidateJoingForm> GetCandidateJoiningForm(CandidateJoingFormSearch search)
        {
            return await this.prejoiningdetailsrepository.GetCandidateJoiningForm(search);
        }

        public async Task<ReturnMessage> SaveCandidateJoiningForm(CandidateJoingFormData formdata)
        {
            return await this.prejoiningdetailsrepository.SaveCandidateJoiningForm(formdata);
        }
        public async Task<ReturnMessage> UpdateCandidateJoiningFamilyDetailsForm(UpdateCandidateJoiningFormFamilydetails formdata)
        {
            return await this.prejoiningdetailsrepository.UpdateCandidateJoiningFamilyDetailsForm(formdata);
        }
        public async Task<ReturnMessage> UpdateCandidateJoiningSEBIInitialDisclosureForm(UpdateSEBIInitialDisclosuerDetails formdata)
        {
            return await this.prejoiningdetailsrepository.UpdateCandidateJoiningSEBIInitialDisclosureForm(formdata);
        }
        public async Task<ReturnMessage> UpdateAccidentInsurancePolicyForm(UpdateAccidentInsurancePolicy formdata)
        {
            return await this.prejoiningdetailsrepository.UpdateAccidentInsurancePolicyForm(formdata);
        }
        public async Task<ReturnMessage> UpdateJoiningReportform(UpdateJoiningReport formdata)
        {
            return await this.prejoiningdetailsrepository.UpdateJoiningReportform(formdata);
        }
        public async Task<CandidateJoiningFormPDFData> GetCandidateJoiningFormPDF(CandidateJoingFormSearch searchData)
        {
            return await this.prejoiningdetailsrepository.GetCandidateJoiningFormPDF(searchData);
        }

        public async Task<ReturnMessage> ShareWithInductorInsert(ShareWithInductor formData)
        {
            return await this.prejoiningdetailsrepository.ShareWithInductorInsert(formData);
        }
        public async Task<JoiningFormFamilyDetailsUpdateHistoryList> GetJoiningFormFamilyDetailsUpdateHistory(SearchFamilyDetailsUpdateHistory formData)
        {
            return await this.prejoiningdetailsrepository.GetJoiningFormFamilyDetailsUpdateHistory(formData);
        }
        public async Task<SEBIInitialDisclosureUpdateHistoryList> GetSEBIDisclosureUpdateHistory(SearchSEBIInitialDisclosureUpdateHistory formData)
        {
            return await this.prejoiningdetailsrepository.GetSEBIDisclosureUpdateHistory(formData);
        }
        public async Task<List<AccidentInsurancePolicyUpdateHistoryList>> GetAccidentInsurancPolicyUpdateHistory(SearchAccidentInsurancePolicyUpdateHistory Param)
        {
            return await this.prejoiningdetailsrepository.GetAccidentInsurancPolicyUpdateHistory(Param);
        }
        public async Task<List<SearchJoiningReportHistoryList>> GetJoiningReportHistory(SearchJoiningReportHistory Param)
        {
            return await this.prejoiningdetailsrepository.GetJoiningReportHistory(Param);
        }
        public async Task<List<SearchMRFPPFList>> getMRFPPFhistory(SearchMRFPPFHistory Param)
        {
            return await this.prejoiningdetailsrepository.getMRFPPFhistory(Param);
        }
        public async Task<ReturnMessage> DiscontinueCandidates(discontinuecandidate Param)
        {
            return await this.prejoiningdetailsrepository.DiscontinueCandidates(Param);
        }
        public async Task<List<getbatchcandidate>> getbatchidfromcandidateid(searchbatchcandidate Param)
        {
            return await this.prejoiningdetailsrepository.getbatchidfromcandidateid(Param);
        }
        public async Task<List<GetAdditionalDocumentList>> GetAdditionalDocumentList(searchbatchcandidate Param)
        {
            return await this.prejoiningdetailsrepository.GetAdditionalDocumentList(Param);
        }
        public string CloudStorageAccountname()
        {
            return this.prejoiningdetailsrepository.CloudStorageAccountname();
        }
        public async Task<ReturnMessage> DeleteCandidateInductionScheduleDetail(DeleteCandidateInductionScheduleDetail Param)
        {
            return await this.prejoiningdetailsrepository.DeleteCandidateInductionScheduleDetail(Param);
        }
        public async Task<ReturnMessage> UpdateShareWithCandidateDoc(UpdateAdditionalDoc Param)
        {
            return await this.prejoiningdetailsrepository.UpdateShareWithCandidateDoc(Param);
        }
        public async Task<ReturnMessage> DiscontinueIndividualCandidate(DiscontinueIndividualCandidateFormData formData)
        {
            return await this.prejoiningdetailsrepository.DiscontinueIndividualCandidate(formData);
        }
        public async Task<ReturnMessage> DeleteInductionSchedule(DeleteInductionScheduleParam formData)
        {
            return await this.prejoiningdetailsrepository.DeleteInductionSchedule(formData);
        }
        public async Task<ReturnMessage> InserrtUpdateSignature(SignatureInsUpData formData)
        {
            return await this.prejoiningdetailsrepository.InserrtUpdateSignature(formData);
        }

        public async Task<List<SignatureInsUpData>> GetSignatureCandidate(SignatureInsUpData formData)
        {
            return await this.prejoiningdetailsrepository.GetSignatureCandidate(formData);
        }
        public async Task<List<CampusPreJoiningCandidateList>> CampusGetPreJoiningCandidateList(CampusSearchPreJoiningCandidateList formData)
        {
            return await this.prejoiningdetailsrepository.CampusGetPreJoiningCandidateList(formData);
        }

        public async Task<List<CandidateJoiningRelationShip>> GetJoiningRelationShip(SearchJoiningRelationShip formData)
        {
            return await this.prejoiningdetailsrepository.GetJoiningRelationShip(formData);
        }
    }
}
