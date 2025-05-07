using Application.DataAccess.Repositories.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.ReportModule;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.Interfaces.CommonModule
{
    public interface ICommonService
    {
        Task<List<Age>> GetAllAge();
        Task<List<Months>> GetAllMonths();
        Task<List<Years>> GetAllYears();
        Task<List<State>> GetAllState();
        Task<List<Experience>> GetAllExperience();
        Task<List<ExternalTrainer>> GetAllExternalTrainer(SearchTrainer search);
        Task<List<Country>> GetAllCountry(SearchCountry search);
        Task<List<StateCountry>> GetAllStateCountry(SearchStateCountry search);
        Task<List<Religion>> GetAllReligion(SearchReligion search);
        Task<List<Caste>> GetAllCaste(SearchCaste search);
        Task<List<CountryList>> GetAllCountryList(SearchCountryList search);
        Task<List<RelationshipList>> GetAllRelationship(SearchRelation search);
        Task<ReturnMessage> FamilyRelationshipInsertUpdate(RelationshipList formData);
        Task<List<RelationshipList>> GetAllFamilyRelationship(SearchRelation search);
        Task<List<NationalityList>> GetAllNationality(SearchNationality search);
        Task<List<BloodGroup>> GetAllBloodGroup(SearchBloodGroup search);
        Task<List<QulificationUniversityBoard>> GetAllQulificationUniversityBoard(SearchQulificationUniversityBoard search);
        Task<List<QulificationClassGaradeDivision>> GetAllQulificationClassGaradeDivision(SearchQulificationClassGaradeDivision search);
        Task<List<SalaryAccountHeadPrevious>> GetAllSalaryAccountHeadPrevious(SearchSalaryAccountHeadPrevious search);
        Task<List<AttachmentDocumentType>> GetAllAttachmentDocumentType(SearchAttachmentDocumentType search);
        Task<List<AttachmentDocumentParticular>> GetAllAttachmentDocumentParticular(SearchAttachmentDocumentParticular search);
        Task<List<AttachmentDocumentNameDetails>> GetAllAttachmentDocumentName(SearchAttachmentDocumentName search);
        Task<List<AttachmentDocumentNameDetails>> GetFilteredAttachmentDocumentName(SearchAttachmentDocumentName search);
        Task<List<DownloadPDFList>> GetAllDownloadPDFHandBook(SearchDownloadPDF search);
        Task<List<UploadPDFList>> GetAllAttachmentPDF(SearchPDFUpload search);
        Task<List<RoleWiseDocumentOutput>> GetRoleWiseDocument(RoleWiseDocumentInput search);
        Task<List<ApprovalList>> GetAllApprovalList(SearchApprovalList search);
        Task<List<Occupation>> GetAllOccupationList(SearchOccupation search);
        Task<List<Doctors>> GetAllDoctorsList(SearchDoctors search);
        Task<List<FatherOccupation>> GetAllFatherOccupationList(SearchFatherOccupation search);

        Task<ReturnMessage> DoctorInsertUpdate(DoctorsInsertUpdateParam Param);
        Task<List<Batch>> GetAllBatch(BatchParam search);
        Task<ReturnMessage> OcccupationInsertUpdate(Occupation formdata);
        Task<ReturnMessage> QulificationUniversityBoardInsertUpdate(QulificationUniversityBoard formdata);
        Task<ReturnMessage> ReligionInsertUpdate(Religion formdata);
        Task<ReturnMessage> CasteInsertUpdate(Caste formdata);
        Task<ReturnMessage> ExternalTrainersInsertUpdate(ExternalTrainer formData);
        Task<ReturnMessage> CountryListInsertUpdate(CountryList formData);
        Task<ReturnMessage> RelationshipInsertUpdate(RelationshipList formData);
        Task<ReturnMessage> NatioanalityInsertUpdate(NationalityList formData);
        Task<ReturnMessage> InsertUpdateInductionMode(ModeOfInductionParam Param);
        Task<List<ModeOfInduction>> GetAllInductionMode(AllModeOfInductionParam Param);
        Task<ReturnMessage> InsertUpdateInductionVenue(InductionVenueParam Param);
        Task<List<AllInductionVenue>> GetAllInductionVenue(AllInductionVenueParam Param);
        Task<ReturnMessage> AttachmentDocumentTypeInsertUpdate(AttachmentDocumentType formdata);
        Task<ReturnMessage> AttachmentDocumentParticularInsertUpdate(AttachmentDocumentParticular formdata);
        Task<ReturnMessage> AttachmentDocumentNameInsertUpdate(AttachmentDocumentNameDetails formdata);
        Task<ReturnMessage> AttachmentPDFInsertUpdate(UploadPDFList formData);

        Task<List<OnBoardingManager>> GetAllOnBoardingManager(SearchOnBoardingManager search);
        Task<List<OnBoardingCoOrdinator>> GetAllOnBoardingCoOrdinator(SearchOnBoardingCoOrdinator search);
        Task<List<MenuAccess>> GetAllMenuAccess(SearchMenuAccess search);
        Task<ReturnMessage> MenuAccessInsert(InsertMenuaccesParam formdata);
        Task<List<UserRole>> GetAllUserRole(SearchUserRole search);
        Task<List<UserRoleForHandHold>> GetUserRoleHandHolding(SearchUserRole search);
        Task<List<UserwiseRole>> GetAllUserWiseRole(SearchUserRole search);
        Task<List<UserwiseRole>> GetAllUserWiseRoleWithAutoUserId(SearchUserRole search);
        Task<ReturnMessage> UserRoleInsert(UserRoleSave formdata);
        Task<List<RoleWiseUser>> GetAllRolewiseUser(SearchRoleWiseUser search);
        Task<List<RoleLocationWiseUser>> GetAllRoleLocationwiseUser(searchRoleLocationWiseUser search);
        Task<List<RoleWiseUser>> GetAllRolewiseUserForHandHold(SearchRoleWiseUser search);
        Task<List<GetTicByLocationData>> GetAllTicByLocation(SearchTicByLocation search);
        Task<List<RoleWiseUser>> GetAllRolewiseUserReassign(SearchRoleWiseUser search);
        Task<List<Status>> GetAllHiringStatus();
        Task<ReturnMessage> InductionTemplateInsertUpdate(InductionTemplate formData);
        Task<ReturnMessage> TrainingTittleInsertUpdate(TrainingTittleFormData formData);
        Task<List<TrainingTittleDataList>> GetAllTrainingTittle(SearchTrainingtittle formData);
        Task<List<InductionTemplateHdrGet>> GetAllInductionTemplate(SearchInductionTemplate search);
        Task<List<InductionTemplateDetail>> GetAllInductionTemplateDetails(SearchInductionTemplate search);
        Task<UploadEmployeeMaster> UploadEmployeeMaster(DataTable formData);
        Task<List<MenuAccess>> GetAllUserMenuAccess(SearchMenuAccess search);
        Task<ReturnMessage> StateInsertUpdate(StateFormData formdata);
        Task<List<State>> StateGetAll(SearchState search);
        Task<List<State>> StateGetAllByCountry(SearchStateByCountry search);
        Task<List<HiringStatus>> GetHiringStatus(SearchHiringStatus search);
        Task<ReturnMessage> InsertupdateRoleWiseUsrVertFunc(InsertupdateRoleWiseUsrVertData formData);
        Task<ReturnMessage> InsertupdateRoleWiseUsrLoctFunc(InsertupdateRoleWiseUsrLocData formData);
        Task<List<GetAllUserWiseRoleVerticalFunctionDetails>> getRoleWiseUsrVertFunc(SearchAllUserWiseRoleVerticalFunc Param);
        Task<List<GetAllUserWiseRoleLocationFunctionDetails>> GetRoleWiseUsrLocaFunc(SearchAllUserWiseRoleLocationFunc Param);
        Task<ReturnMessage> CountryStateLocationInsertUpdate(CountryStateLocationMapping formdata);
        Task<List<CountryStateLocationMappingGet>> CountryStateLocationGet(CountryStateLocationMappingGetFormData search);
        Task<List<ClaimStatus>> GetAllClaimStatus(SearchClaimStatus search);
        Task<List<getArea>> GetAllArea(searcharea search);
        Task<ReturnMessage> UpdateDocumentRole(UpdateDocumentrole formData);
        Task<List<GetLocationFunction>> GetFunctionWiseLocation(GetLocationFunctionSearch search);
        Task<ReturnMessage> InsertUpdateCostCenter(CostCenterData formData);
        Task<List<GetCostCenterData>> GetCostCenterGridData(SearchCostCenterData search);
        Task<List<BatchWiseCandidateList>> GetBatchWiseCandidateList(SearchBatchWiseCandidate search);
        Task<List<EmployeeDetails>> GetAllEmployeeForSign(SearchEmployee search);
        Task<ReturnMessage> InsertUpdateSignature(InsertUpdateSignatureData formData);
        Task<List<InsertUpdateSignatureData>> GetEmployeeSignature(SearchEmployeeForSign formData);
        Task<DashBoard> GetdashboardValuesOfRm(SearchDashBoard Param);
        Task<List<FlexiReportHeader>> GetAllFlexiReportHeader(SearchFlexiReportList search);
        Task<ReturnMessage> FlexiReportHeaderInsertUpdate(FlexiReport formData);
        Task<ReturnMessage> GetAllEmployeeData();
        //Ankita
        Task<List<CandidateOnboardingEmailStatusOutputNew>> CandidateOnboardingEmailStatus(CandidateOnboardingEmailStatusInput formData);
        Task<List<GetAllEmailTypeToSendMail>> GetAllEmailTypeToSendMail();
        Task<List<AllEmailAndDetails>> GetAllEmailsByTypeID(GetEmailList getEmailList);
        void SendMailForSelectedItems(List<AllEmailAndDetails> allEmails);
        void SendMailForUpdatedSchedule(List<AllEmailAndDetails> allEmails);
        void ShareWithCandidateSendMail(List<AllEmailAndDetails> allEmails);
        void BookAccommodationEmail(List<AllEmailAndDetails> allEmails);
        void SendEmailNaukriCandidates(List<AllEmailAndDetails> allEmails);

    }

}
