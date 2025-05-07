using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.CommonModule;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.ReportModule;
using Application.Service.Services.Interfaces.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Service.Services.CommonModule
{
    public class CommonService : ICommonService
    {
        private readonly ICommonRepository commonRepository;

        public CommonService(ICommonRepository commonRepository)
        {
            this.commonRepository = commonRepository;
        }

        public async Task<List<Age>> GetAllAge()
        {
            return await this.commonRepository.GetAllAge();
        }

        public async Task<List<Years>> GetAllYears()
        {
            return await this.commonRepository.GetAllYears();
        }
        public async Task<List<Months>> GetAllMonths()
        {
            return await this.commonRepository.GetAllMonths();
        }
        public async Task<List<State>> GetAllState()
        {
            return await this.commonRepository.GetAllState();
        }
        public async Task<List<Experience>> GetAllExperience()
        {
            return await this.commonRepository.GetAllExperience();
        }

        public async Task<List<Country>> GetAllCountry(SearchCountry search)
        {
            return await this.commonRepository.GetAllCountry(search);
        }

        public async Task<List<StateCountry>> GetAllStateCountry(SearchStateCountry search)
        {
            return await this.commonRepository.GetAllStateCountry(search);
        }
        public async Task<List<Religion>> GetAllReligion(SearchReligion search)
        {
            return await this.commonRepository.GetAllReligion(search);
        }
        public async Task<List<Caste>> GetAllCaste(SearchCaste search)
        {
            return await this.commonRepository.GetAllCaste(search);
        }
        public async Task<List<ExternalTrainer>> GetAllExternalTrainer(SearchTrainer search)
        {
            return await this.commonRepository.GetAllExternalTrainer(search);
        }
        public async Task<List<CountryList>> GetAllCountryList(SearchCountryList search)
        {
            return await this.commonRepository.GetAllCountryList(search);
        }
        public async Task<List<RelationshipList>> GetAllRelationship(SearchRelation search)
        {
            return await this.commonRepository.GetAllRelationship(search);
        }
        public async Task<List<RelationshipList>> GetAllFamilyRelationship(SearchRelation search)
        {
            return await this.commonRepository.GetAllFamilyRelationship(search);
        }
        public async Task<List<NationalityList>> GetAllNationality(SearchNationality search)
        {
            return await this.commonRepository.GetAllNationality(search);
        }
        public async Task<List<BloodGroup>> GetAllBloodGroup(SearchBloodGroup search)
        {
            return await this.commonRepository.GetAllBloodGroup(search);
        }
        public async Task<List<QulificationUniversityBoard>> GetAllQulificationUniversityBoard(SearchQulificationUniversityBoard search)
        {
            return await this.commonRepository.GetAllQulificationUniversityBoard(search);
        }
        public async Task<List<QulificationClassGaradeDivision>> GetAllQulificationClassGaradeDivision(SearchQulificationClassGaradeDivision search)
        {
            return await this.commonRepository.GetAllQulificationClassGaradeDivision(search);
        }
        public async Task<List<SalaryAccountHeadPrevious>> GetAllSalaryAccountHeadPrevious(SearchSalaryAccountHeadPrevious search)
        {
            return await this.commonRepository.GetAllSalaryAccountHeadPrevious(search);
        }
        public async Task<List<AttachmentDocumentType>> GetAllAttachmentDocumentType(SearchAttachmentDocumentType search)
        {
            return await this.commonRepository.GetAllAttachmentDocumentType(search);
        }
        public async Task<List<AttachmentDocumentParticular>> GetAllAttachmentDocumentParticular(SearchAttachmentDocumentParticular search)
        {
            return await this.commonRepository.GetAllAttachmentDocumentParticular(search);
        }
        public async Task<List<AttachmentDocumentNameDetails>> GetAllAttachmentDocumentName(SearchAttachmentDocumentName search)
        {
            return await this.commonRepository.GetAllAttachmentDocumentName(search);
        }
        public async Task<List<AttachmentDocumentNameDetails>> GetFilteredAttachmentDocumentName(SearchAttachmentDocumentName search)
        {
            return await this.commonRepository.GetFilteredAttachmentDocumentName(search);
        }
        //arg
        public async Task<List<DownloadPDFList>> GetAllDownloadPDFHandBook(SearchDownloadPDF search)
        {
            return await this.commonRepository.GetAllDownloadPDFHandBook(search);
        }

        public async Task<List<UploadPDFList>> GetAllAttachmentPDF(SearchPDFUpload search)
        {
            return await this.commonRepository.GetAllAttachmentPDF(search);
        }
        public async Task<List<RoleWiseDocumentOutput>> GetRoleWiseDocument(RoleWiseDocumentInput search)
        {
            return await this.commonRepository.GetRoleWiseDocument(search);
        }
        public async Task<List<ApprovalList>> GetAllApprovalList(SearchApprovalList search)
        {
            return await this.commonRepository.GetAllApprovalList(search);
        }
        public async Task<List<Occupation>> GetAllOccupationList(SearchOccupation search)
        {
            return await this.commonRepository.GetAllOccupationList(search);
        }
        public async Task<List<Doctors>> GetAllDoctorsList(SearchDoctors search)
        {
            return await this.commonRepository.GetAllDoctorsList(search);
        }

        public async Task<List<Batch>> GetAllBatch(BatchParam search)
        {
            return await this.commonRepository.GetAllBatch(search);
        }
        public async Task<ReturnMessage> OcccupationInsertUpdate(Occupation formData)
        {
            return await this.commonRepository.OccupationInsertUpdate(formData);
        }

        public async Task<ReturnMessage> QulificationUniversityBoardInsertUpdate(QulificationUniversityBoard formData)
        {
            return await this.commonRepository.QulificationUniversityBoardInsertUpdate(formData);
        }
        public async Task<ReturnMessage> ReligionInsertUpdate(Religion formData)
        {
            return await this.commonRepository.ReligionInsertUpdate(formData);
        }

        public async Task<ReturnMessage> CasteInsertUpdate(Caste formData)
        {
            return await this.commonRepository.CasteInsertUpdate(formData);
        }

        public async Task<ReturnMessage> ExternalTrainersInsertUpdate(ExternalTrainer formData)
        {
            return await this.commonRepository.ExternalTrainersInsertUpdate(formData);
        }

        public async Task<ReturnMessage> CountryListInsertUpdate(CountryList formData)
        {
            return await this.commonRepository.CountryListInsertUpdate(formData);
        }
        public async Task<ReturnMessage> RelationshipInsertUpdate(RelationshipList formData)
        {
            return await this.commonRepository.RelationshipInsertUpdate(formData);
        }

        public async Task<ReturnMessage> FamilyRelationshipInsertUpdate(RelationshipList formData)
        {
            return await this.commonRepository.FamilyRelationshipInsertUpdate(formData);
        }
        public async Task<ReturnMessage> NatioanalityInsertUpdate(NationalityList formData)
        {
            return await this.commonRepository.NatioanalityInsertUpdate(formData);
        }
        public async Task<ReturnMessage> InsertUpdateInductionMode(ModeOfInductionParam Param)
        {
            return await this.commonRepository.InsertUpdateInductionMode(Param);
        }

        public async Task<List<ModeOfInduction>> GetAllInductionMode(AllModeOfInductionParam Param)
        {
            return await this.commonRepository.GetAllInductionMode(Param);
        }

        public async Task<ReturnMessage> InsertUpdateInductionVenue(InductionVenueParam Param)
        {
            return await this.commonRepository.InsertUpdateInductionVenue(Param);
        }

        public async Task<List<AllInductionVenue>> GetAllInductionVenue(AllInductionVenueParam Param)
        {
            return await this.commonRepository.GetAllInductionVenue(Param);
        }
        public async Task<ReturnMessage> AttachmentDocumentTypeInsertUpdate(AttachmentDocumentType formData)
        {
            return await this.commonRepository.AttachmentDocumentTypeInsertUpdate(formData);
        }

        public async Task<ReturnMessage> AttachmentDocumentParticularInsertUpdate(AttachmentDocumentParticular formData)
        {
            return await this.commonRepository.AttachmentDocumentParticularInsertUpdate(formData);
        }
        public async Task<ReturnMessage> AttachmentDocumentNameInsertUpdate(AttachmentDocumentNameDetails formData)
        {
            return await this.commonRepository.AttachmentDocumentNameInsertUpdate(formData);
        }
        public async Task<ReturnMessage> AttachmentPDFInsertUpdate(UploadPDFList formData)
        {
            return await this.commonRepository.AttachmentPDFInsertUpdate(formData);
        }
        public async Task<List<FatherOccupation>> GetAllFatherOccupationList(SearchFatherOccupation search)
        {
            return await this.commonRepository.GetAllFatherOccupationList(search);
        }

        public async Task<List<OnBoardingManager>> GetAllOnBoardingManager(SearchOnBoardingManager search)
        {
            return await this.commonRepository.GetAllOnBoardingManager(search);
        }

        public async Task<List<OnBoardingCoOrdinator>> GetAllOnBoardingCoOrdinator(SearchOnBoardingCoOrdinator search)
        {
            return await this.commonRepository.GetAllOnBoardingCoOrdinator(search);
        }

        public async Task<ReturnMessage> DoctorInsertUpdate(DoctorsInsertUpdateParam Param)
        {
            return await this.commonRepository.DoctorInsertUpdate(Param);
        }

        public async Task<List<MenuAccess>> GetAllMenuAccess(SearchMenuAccess search)
        {
            return await this.commonRepository.GetAllMenuAccess(search);
        }

        public async Task<ReturnMessage> MenuAccessInsert(InsertMenuaccesParam formData)
        {
            return await this.commonRepository.MenuAccessInsert(formData);
        }

        public async Task<List<UserRole>> GetAllUserRole(SearchUserRole search)
        {
            return await this.commonRepository.GetAllUserRole(search);
        }
        public async Task<List<UserRoleForHandHold>> GetUserRoleHandHolding(SearchUserRole search)
        {
            return await this.commonRepository.GetUserRoleHandHolding(search);
        }
        public async Task<List<UserwiseRole>> GetAllUserWiseRole(SearchUserRole search)
        {
            return await this.commonRepository.GetAllUserWiseRole(search);
        }
        public async Task<List<UserwiseRole>> GetAllUserWiseRoleWithAutoUserId(SearchUserRole search)
        {
            return await this.commonRepository.GetAllUserWiseRoleWithAutoUserId(search);
        }

        public async Task<ReturnMessage> UserRoleInsert(UserRoleSave formData)
        {
            return await this.commonRepository.UserRoleInsert(formData);
        }
        public async Task<List<RoleWiseUser>> GetAllRolewiseUser(SearchRoleWiseUser search)
        {
            return await this.commonRepository.GetAllRolewiseUser(search);
        }
        public async Task<List<RoleWiseUser>> GetAllRolewiseUserForHandHold(SearchRoleWiseUser search)
        {
            return await this.commonRepository.GetAllRolewiseUserForHandHold(search);
        }
        public async Task<List<RoleLocationWiseUser>> GetAllRoleLocationwiseUser(searchRoleLocationWiseUser search)
        {
            return await this.commonRepository.GetAllRoleLocationwiseUser(search);
        }
        public async Task<List<GetTicByLocationData>> GetAllTicByLocation(SearchTicByLocation search)
        {
            return await this.commonRepository.GetAllTicByLocation(search);
        }
        public async Task<List<RoleWiseUser>> GetAllRolewiseUserReassign(SearchRoleWiseUser search)
        {
            return await this.commonRepository.GetAllRolewiseUserReassign(search);
        }

        public async Task<List<Status>> GetAllHiringStatus()
        {
            return await this.commonRepository.GetAllHiringStatus();
        }

        public async Task<ReturnMessage> InductionTemplateInsertUpdate(InductionTemplate formData)
        {
            return await this.commonRepository.InductionTemplateInsertUpdate(formData);
        }
        public async Task<ReturnMessage> TrainingTittleInsertUpdate(TrainingTittleFormData formData)
        {
            return await this.commonRepository.TrainingTittleInsertUpdate(formData);
        }
        public async Task<List<TrainingTittleDataList>> GetAllTrainingTittle(SearchTrainingtittle search)
        {
            return await this.commonRepository.GetAllTrainingTittle(search);
        }
        public async Task<List<InductionTemplateHdrGet>> GetAllInductionTemplate(SearchInductionTemplate search)
        {
            return await this.commonRepository.GetAllInductionTemplate(search);
        }
     
        public async Task<List<InductionTemplateDetail>> GetAllInductionTemplateDetails(SearchInductionTemplate search)
        {
            return await this.commonRepository.GetAllInductionTemplateDetails(search);
        }

        public async Task<UploadEmployeeMaster> UploadEmployeeMaster(DataTable formData)
        {
            return await this.commonRepository.UploadEmployeeMaster(formData);
        }

        public async Task<List<MenuAccess>> GetAllUserMenuAccess(SearchMenuAccess search)
        {
            return await this.commonRepository.GetAllUserMenuAccess(search);
        }

        public async Task<ReturnMessage> StateInsertUpdate(StateFormData formdata)
        {
            return await this.commonRepository.StateInsertUpdate(formdata);
        }
        public async Task<ReturnMessage> CountryStateLocationInsertUpdate(CountryStateLocationMapping formdata)
        {
            return await this.commonRepository.CountryStateLocationInsertUpdate(formdata);
        }

        public async Task<List<State>> StateGetAll(SearchState search)
        {
            return await this.commonRepository.StateGetAll(search);
        }
        public async Task<List<State>> StateGetAllByCountry(SearchStateByCountry search)
        {
            return await this.commonRepository.StateGetAllByCountry(search);
        }
        public async Task<List<CountryStateLocationMappingGet>> CountryStateLocationGet(CountryStateLocationMappingGetFormData search)
        {
            return await this.commonRepository.CountryStateLocationGet(search);
        }
        public async Task<List<HiringStatus>> GetHiringStatus(SearchHiringStatus search)
        {
            return await this.commonRepository.GetHiringStatus(search); 
        }
        public async Task<ReturnMessage> InsertupdateRoleWiseUsrVertFunc(InsertupdateRoleWiseUsrVertData formData)
        {
            return await this.commonRepository.InsertUpdateRolewiseUsrVerFunc(formData);
        }
        public async Task<ReturnMessage> InsertupdateRoleWiseUsrLoctFunc(InsertupdateRoleWiseUsrLocData formData)
        {
            return await this.commonRepository.InsertupdateRoleWiseUsrLoctFunc(formData);
        }
        public async Task<List<GetAllUserWiseRoleVerticalFunctionDetails>> getRoleWiseUsrVertFunc(SearchAllUserWiseRoleVerticalFunc Param)
        {
            return await this.commonRepository.GetAllRolewiseUsrVerFunc(Param);
        }
        public async Task<List<GetAllUserWiseRoleLocationFunctionDetails>> GetRoleWiseUsrLocaFunc(SearchAllUserWiseRoleLocationFunc Param)
        {
            return await this.commonRepository.GetRoleWiseUsrLocaFunc(Param);
        }
        public async Task<List<ClaimStatus>> GetAllClaimStatus(SearchClaimStatus search)
        {
            return await this.commonRepository.GetAllClaimStatus(search);
        }
        public async Task<List<getArea>> GetAllArea(searcharea search)
        {
            return await this.commonRepository.GetAllArea(search);
        }
        public async Task<ReturnMessage> UpdateDocumentRole(UpdateDocumentrole formData)
        {
            return await this.commonRepository.UpdateDocumentRole(formData);
        }
        public async Task<List<GetLocationFunction>> GetFunctionWiseLocation(GetLocationFunctionSearch search)
        {
            return await this.commonRepository.GetFunctionWiseLocation(search);
        }
        public async Task<ReturnMessage> InsertUpdateCostCenter(CostCenterData formData)
        {
            return await this.commonRepository.InsertUpdateCostCenter(formData);
        }
        public async Task<List<GetCostCenterData>> GetCostCenterGridData(SearchCostCenterData search)
        {
            return await this.commonRepository.GetCostCenterGridData(search);
        }
        public async Task<List<BatchWiseCandidateList>> GetBatchWiseCandidateList(SearchBatchWiseCandidate search)
        {
            return await this.commonRepository.GetBatchWiseCandidateList(search);
        }

        public async Task<List<EmployeeDetails>> GetAllEmployeeForSign(SearchEmployee search)
        {
            return await this.commonRepository.GetAllEmployeeForSign(search);
        }
        public async Task<ReturnMessage> InsertUpdateSignature(InsertUpdateSignatureData formData)
        {
            return await this.commonRepository.InsertUpdateSignature(formData);
        }
        public async Task<List<InsertUpdateSignatureData>> GetEmployeeSignature(SearchEmployeeForSign formData)
        {
            return await this.commonRepository.GetEmployeeSignature(formData);
        }
        public async Task<DashBoard> GetdashboardValuesOfRm(SearchDashBoard Param)
        {
            return await this.commonRepository.GetdashboardValuesOfRm(Param);
        }
        public async Task<List<FlexiReportHeader>> GetAllFlexiReportHeader(SearchFlexiReportList search)
        {
            return await this.commonRepository.GetAllFlexiReportHeader(search);
        }
        public async Task<ReturnMessage> FlexiReportHeaderInsertUpdate(FlexiReport formData)
        {
            return await this.commonRepository.FlexiReportHeaderInsertUpdate(formData);
        }
        public async Task<ReturnMessage> GetAllEmployeeData()
        {
            return await this.commonRepository.GetAllEmployeeData();
        }
        //Ankita
        public async Task<List<CandidateOnboardingEmailStatusOutputNew>> CandidateOnboardingEmailStatus(CandidateOnboardingEmailStatusInput search)
        {
            return await this.commonRepository.CandidateOnboardingEmailStatus(search);
        }
        public async Task<List<GetAllEmailTypeToSendMail>> GetAllEmailTypeToSendMail()
        {
            return await this.commonRepository.GetAllEmailTypeToSendMail();
        }

        public async Task<List<AllEmailAndDetails>> GetAllEmailsByTypeID(GetEmailList getEmailList)
        {
            return await this.commonRepository.GetAllEmailsByTypeID(getEmailList);
        }

        public async void SendMailForSelectedItems(List<AllEmailAndDetails> allEmails)
        {
            this.commonRepository.SendMailForSelectedItems(allEmails);
        }
        public async void SendMailForUpdatedSchedule(List<AllEmailAndDetails> allEmails)
        {
            this.commonRepository.SendMailForUpdatedSchedule(allEmails);
        }
        public async void ShareWithCandidateSendMail(List<AllEmailAndDetails> allEmails)
        {
            this.commonRepository.ShareWithCandidateSendMail(allEmails);
        }
        public async void BookAccommodationEmail(List<AllEmailAndDetails> allEmails)
        {
            this.commonRepository.BookAccommodationEmail(allEmails);
        }

        public async void SendEmailNaukriCandidates(List<AllEmailAndDetails> allEmails)
        {
            this.commonRepository.SendEmailNaukriCandidates(allEmails);
        }
    }

}
