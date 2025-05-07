using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CampusModule;
using Application.Entity.Entities.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using System.IO;
using Azure.Storage.Blobs;
using Azure.Storage.Sas;

namespace Application.DataAccess.Repositories.CampusModule
{
    public class CampusRequisitionRepository : DatabaseContext, ICampusRequisitionRepository
    {
        public CampusRequisitionRepository(AppConfiguration appConfiguration)
       : base(appConfiguration)
        { }


        public string localFilePath = null;

        public async Task<ReturnMessage> CampusRequisitionInsert(CampusRequisitionFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<CampusRequisitionDataObject>(formData.RequisitionData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusStreamId", formData.CampusStreamId);
                    para.Add("@RequisitionData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusRequisition_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> OffCampusRequisitionInsert(CampusRequisitionFormData formData)
        {
            try
            {
                DataTable dtObject = CommonUtility.ToDataTable<CampusRequisitionDataObject>(formData.RequisitionData);
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusStreamId", formData.CampusStreamId);
                    para.Add("@RequisitionData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_OffCampusRequisition_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusRequisitionList>> GetAllCampusRequisitionList(SearchCampusRequisitionList formData)
        {
            try
            {
                List<CampusRequisitionList> dataList = new List<CampusRequisitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CampusProcessStatusId", formData.CampusProcessStatusId);
                    para.Add("@FunctionId", formData.@FunctionId);
                    const string procName = "Usp_CampusRequisition_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusRequisitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusRequisitionList>> GetAllOffCampusRequisitionList(SearchCampusRequisitionList formData)
        {
            try
            {
                List<CampusRequisitionList> dataList = new List<CampusRequisitionList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionNo", formData.RequisitionNo);
                    para.Add("@RequistionId", formData.RequistionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CampusProcessStatusId", formData.CampusProcessStatusId);
                    para.Add("@FunctionId", formData.FunctionId);
                    const string procName = "Usp_OffCampusRequisition_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusRequisitionList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusLinkList>> GetAllCampusLink(SaerchCampusLink formData)
        {
            try
            {
                List<CampusLinkList> dataList = new List<CampusLinkList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    const string procName = "Usp_CampusLink_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusLinkList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusLinkInsert(CampusLinkFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusForId", formData.CampusForId);
                    para.Add("@CampusTemplate", formData.CampusTemplate);
                    para.Add("@AppURL", formData.Appurl);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusLink_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusLinkUpdate(UpdateCampusLinkTemplate formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@campuslinkId", formData.CampusLinkId);
                    para.Add("@campuslinkTemplate", formData.CampusLinkTemplate);
                    para.Add("@IsActive", true);
                    para.Add("@campusYearId", formData.CampusYearId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_modifyCampusTemplate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<ReturnMessage> CampusCollegeLinkInsert(CampusCollegeLinkFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@CampusCollegeIds", formData.CampusCollegeIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCollegeLink_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusCollegeLinklSharedList>> GetAllSharedCollegeCampusLink(SearchCampusCollegeLinklSharedList search)
        {
            try
            {
                List<CampusCollegeLinklSharedList> dataList = new List<CampusCollegeLinklSharedList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@StateId", search.StateId);
                    para.Add("@CollegeCategoryId", search.CollegeCategoryId);
                    para.Add("@CampusLinkId", search.CampusLinkId);
                    const string procName = "Usp_CampusCollegeLinkShared_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusCollegeLinklSharedList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusRequisitionTitleList>> GetAllCampusRequisitionTitleList(SearchCampusRequisitionTitle formData)
        {
            try
            {
                List<CampusRequisitionTitleList> dataList = new List<CampusRequisitionTitleList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusYearId", formData.CampusYearId);
                    const string procName = "USP_CampusRequisitionTitle_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusRequisitionTitleList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusCandidateList>> GetCampusCandidateList(SearchCampusCandidateDetail search)
        {
            try
            {
                List<CampusCandidateList> returnList = new List<CampusCandidateList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateNo", search.CandidateNo);
                    para.Add("@CandidateName", search.CandidateName);
                    para.Add("@HiringStatusId", search.HiringStatusId);
                    para.Add("@GenderIds", search.GenderIds);
                    para.Add("@FromAge", search.FromAge);
                    para.Add("@ToAge", search.ToAge);
                    para.Add("@AadharNo", search.AadharNo);
                    para.Add("@ContactNo", search.ContactNo);
                    para.Add("@EmailId", search.EmailId);
                    para.Add("@MotherTongueIds", search.MotherTongueIds);
                    para.Add("@nativeStateId", search.NativeStateIds);
                    para.Add("@presentStateId", search.PresentStateIds);
                    para.Add("@fatherOccupationId", search.FatherOccupation);
                    para.Add("@motherOccupationId", search.MotherOccupation);
                    para.Add("@InstitutionIds", search.InstitutionIds);
                    para.Add("@QualificationIds", search.QualificationIds);
                    para.Add("@CourseIds", search.CourseIds);
                    para.Add("@StreamIds", search.StreamIds);
                    para.Add("@FromPercentage", search.FromPercentage);
                    para.Add("@ToPercentage", search.ToPercentage);
                    para.Add("@DomainIds", search.DomainIds);
                    para.Add("@SubDomainIds", search.SubDomainIds);
                    para.Add("@StateIds", search.StateIds);
                    para.Add("@SourceChannelId", search.SourceChannelId);
                    para.Add("@CreatedBy", search.CreatedBy);
                    //para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@CampusLinkId", search.CampusLinkId);
                    para.Add("@FromDate", search.FromDate);
                    para.Add("@ToDate", search.ToDate);
                    para.Add("@FromExperience", search.FromExperience);
                    para.Add("@ToExperience", search.ToExperience);
                    para.Add("@FromHeight", search.FromHeight);
                    para.Add("@ToHeight", search.ToHeight);
                    para.Add("@FromWeight", Convert.ToDecimal(search.FromWeight));
                    para.Add("@ToWeight", Convert.ToDecimal(search.ToWeight));
                    para.Add("@disability", search.Disability);
                    para.Add("@eyesightcorrected", search.EyeSightCorrected);
                    para.Add("@healthIssue", search.Health);
                    para.Add("@siblings", search.Siblings);
                    para.Add("@comitment", search.Commitment);
                    para.Add("@WorkingShift", search.WorkingShift);
                    para.Add("@jobpriority", search.JobTypePriyority);
                    para.Add("@criticalfac", search.CriticalFactor);
                    para.Add("@ExtraCuricualr", search.ExtraCurricularActivity);
                    para.Add("@CompletionYears", search.CompletionYears);
                    para.Add("@QualificationTypeIds", search.QualificationTypeIds);
                    para.Add("@CurrentEmployer", search.CurrentEmployer);
                    para.Add("@Designation", search.Designation);
                    para.Add("@RelativeStatus", search.RelativeStatus);
                    para.Add("@PreviousApplied", search.PreviousApplied);
                    para.Add("@LanguageKnownIds", search.LanguageIds);
                    const string procName = "Usp_CampusCandidateList_GetALL";
                    connection.Open();
                    returnList = connection.Query<CampusCandidateList>(procName, para, commandType: CommandType.StoredProcedure,commandTimeout:60000).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<CampusStatusList>> GetCampusHiringStatus(SearchCampusStatus search)
        {
            try
            {
                List<CampusStatusList> returnList = new List<CampusStatusList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@@IsActive", search.IsActive);
                    const string procName = "Usp_CampusHiringStatusGetAll";
                    connection.Open();
                    returnList = connection.Query<CampusStatusList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UpdateCampusCandidateHiringStatus(CampusCandidateHiringStatusFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@HiringStatusId", formData.HiringStatusId);
                    para.Add("@Remarks", formData.Remarks);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCandidateHiringAction";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusTestScheduleInsert(CampusTestScheduleFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@TestTypeId", formData.TestTypeId);
                    para.Add("@TestLink", formData.TestLink);
                    para.Add("@FromDate", formData.TestFromDate);
                    para.Add("@ToDate", formData.TestToDate);
                    para.Add("@VenueName", formData.TestVenueName);
                    para.Add("@InstituteEmailId", formData.TestInstituteEmail);
                    para.Add("@VenueAddress", formData.TestVenueAddress);
                    para.Add("@ContactPersonName", formData.TestContactName);
                    para.Add("@ContactNo", formData.TestContactNo);
                    para.Add("@IsTravel", formData.IsTestTravel);
                    para.Add("@TravelModes", formData.TravelModes);
                    para.Add("@EmailTemplateId", formData.TestEmailTemplateId);
                    para.Add("@EmailTemplate", formData.TestEmailTemplate);
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CreatedBy", formData.CreatedBy);

                    const string procName = "Usp_CampusTestSchedule_Insert";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                   
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    //List<RequisitionDetailsForEmail> requisitionDetailsForEmail = new List<RequisitionDetailsForEmail>();
                    if (rm.SuccessFlag == 1)
                    {
                        if (formData.TestEmailTemplate != null || formData.TestEmailTemplate != "")//Piu
                        {
                            List<string> CandidateIds = formData.CandidateIds.Split(',').ToList();
                            List<string> Mailids = formData.EmailId.Split(',').ToList();
                            for (int i=0;i<CandidateIds.Count;i++)
                            {
                                if (CandidateIds[i].Length > 0)
                                {
                                    var EmailBody = formData.TestEmailTemplate.Replace("@~@CandidateId", CandidateIds[i]);
                                    IDbConnection db= base.GetConnection();
                                    db.Open();
                                    CommonUtility.InsertInMailTable(db, Convert.ToInt32(CandidateIds[i]), 0, 0, 37, formData.TestEmailTemplateId, Mailids[i], EmailBody, "Schedule Test -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                    db.Close();
                                    //CommonUtility.sendEmailViaWebApi(Mailids[i], "Schedule Test -  MRF Limited", EmailBody);
                                }
                            }
                        }
                        else
                        {
                            if (formData.TestTypeId == 1)
                            {
                                //offline
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 52);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            }
                            else
                            {
                                //online
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 53);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            }
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@fromDate", formData.TestFromDate);
                                EmailBody = EmailBody.Replace("@@VenueName", formData.TestVenueName);
                                EmailBody = EmailBody.Replace("@@VenueAddress", formData.TestVenueAddress);
                                //EmailBody = EmailBody.Replace("@@Position", requisitionDetailsForEmail[0].PositionName);
                                //EmailBody = EmailBody.Replace("@@Department", requisitionDetailsForEmail[0].DepartmentName);
                                //EmailBody = EmailBody.Replace("@@Function", requisitionDetailsForEmail[0].FunctionName);
                                //EmailBody = EmailBody.Replace("@@ContactName", formData.ContactName);
                                //EmailBody = EmailBody.Replace("@@ContactNo", formData.ContactNo);
                                EmailBody = EmailBody.Replace("@@TestLink", formData.TestLink);
                                EmailBody = EmailBody.Replace("@@ContactNumber", formData.TestContactNo);
                                EmailBody = EmailBody.Replace("@@ContactPerson", formData.TestContactName);
                                IDbConnection db=base.GetConnection();
                                db.Open();  
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateIds), 0, 0, 37, formData.TestEmailTemplateId, formData.EmailId, EmailBody, "Schedule Test -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
                                //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Schedule Test -  MRF Limited", EmailBody);

                            }
                        }
                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> CampusTalkScheduleInsert(CampusTalkScheduleFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@PlacementScheduleMasterId", formData.placementScheduleMasterId);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@TalkTypeId", formData.TalkTypeId);
                    para.Add("@TalkLink", formData.TalkLink);
                    para.Add("@FromDate", formData.TalkFromDate);
                    para.Add("@ToDate", formData.TalkToDate);
                    para.Add("@VenueName", formData.TalkVenueName);
                    para.Add("@InstituteEmailId", formData.InstituteEmailId);
                    para.Add("@ContactPersonName", formData.TalkContactName);
                    para.Add("@ContactNo", formData.TalkContactNo);
                    //para.Add("@IsTravel", formData.IsTestTravel);
                    //para.Add("@EmailTemplateId", formData.TestEmailTemplateId);
                    para.Add("@EmailTemplate", formData.TalkEmailTemplate);
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_PrePlacementSchedule_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UploadCampusTestResult(DataTable dtObject)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@TestResultData", dtObject, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CampusUploadTestResult";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CampusTestScheduleDetail> GetCampusTestScheduleDetail(SearchCampusTestScheduleDetail formData)
        {
            try
            {
                CampusTestScheduleDetail dataList = new CampusTestScheduleDetail();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    const string procName = "Usp_CampusTestSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusTestScheduleDetail>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<InterviewScheduleDetailForCandidate> GetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formData)
        {
            try
            {
                InterviewScheduleDetailForCandidate dataList = new InterviewScheduleDetailForCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_InterviewSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewScheduleDetailForCandidate>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<InterviewScheduleDetailForCandidate> CampusGetInterviewScheduleDetailForCandidate(SearchInterviewScheduleDetailForCandidate formData)
        {
            try
            {
                InterviewScheduleDetailForCandidate dataList = new InterviewScheduleDetailForCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_CampusInterviewSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<InterviewScheduleDetailForCandidate>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CampusTalkScheduleDetailForGetAll> CampusTalkScheduleDetailGetAll(SearchCampusTalkScheduleDetailForGetAll formData)
        {
            try
            {
                CampusTalkScheduleDetailForGetAll dataList = new CampusTalkScheduleDetailForGetAll();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_CampusPrePlacementSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusTalkScheduleDetailForGetAll>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //arg
        public async Task<CampusTestScheduleDetailForGetAll> CampusTestScheduleDetailGetAll(SearchCampusTestScheduleDetailForGetAll formData)
        {
            try
            {
                CampusTestScheduleDetailForGetAll dataList = new CampusTestScheduleDetailForGetAll();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    const string procName = "Usp_CampusTestSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusTestScheduleDetailForGetAll>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        } //arg

        public async Task<List<CampusTestResultDetail>> GetCampusTestReult(SearchCampusTestResult formData)
        {
            try
            {
                List<CampusTestResultDetail> dataList = new List<CampusTestResultDetail>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    const string procName = "Usp_CampusTestResult_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusTestResultDetail>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusInterviewScheduleInsert(CampusInterviewScheduleFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateIds", formData.CandidateIds);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@InterviewId", formData.InterviewId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@InterviewTypeId", formData.InterviewTypeId);
                    para.Add("@InterviewLink", formData.InterviewLink);
                    para.Add("@InterviewRoomId", formData.InterviewRoomId);
                    para.Add("@FromDate", formData.FromDate);
                    para.Add("@ToDate", formData.ToDate);
                    para.Add("@InterviewSlot", formData.InterviewSlot);
                    para.Add("@VenueName", formData.VenueName);
                    para.Add("@HRAutoUserIds", formData.HRAutoUserIds);
                    para.Add("@InterviewerAutoUserIds", formData.InterviewerAutoUserIds);
                    para.Add("@IsTravel", formData.IsTravel);
                    para.Add("@TravelModes", formData.TravelModes);
                    para.Add("@IsAccomodation", formData.IsAccomodation);
                    para.Add("@AccomodationDetails", formData.AccomodationDetails);
                    para.Add("@IsFormAnexture", formData.IsFormAnexture);
                    para.Add("@ScheduleComments", formData.ScheduleComments);
                    para.Add("@EmailTemplateId", formData.EmailTemplateId);
                    para.Add("@EmailTemplate", formData.EmailTemplate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@VenueAddress", formData.InterviewVenueAddress);
                    const string procName = "Usp_CampusInterviewSchedule_Insert";
                    connection.Open();   
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();

                    if (rm.SuccessFlag == 1)
                    {
                        if (formData.EmailTemplate != null || formData.EmailTemplate != "")
                        {
                            //CommonUtility.sendEmailViaWebApi(formData.EmailId, "Schedule Interview -  MRF Ltd", formData.EmailTemplate);
                            List<string> CandidateIds = formData.CandidateIds.Split(',').ToList();
                            List<string> Mailids = formData.EmailId.Split(',').ToList();
                            for (int i = 0; i < CandidateIds.Count; i++)
                            {
                                if (CandidateIds[i].Length > 0)
                                {
                                    var EmailBody = formData.EmailTemplate.Replace("@~@CandidateId", CandidateIds[i]);
                                    IDbConnection db=base.GetConnection();
                                    db.Open();
                                    CommonUtility.InsertInMailTable(db,Convert.ToInt32(CandidateIds[i]), 0, 0, 38, formData.EmailTemplateId, Mailids[i], EmailBody, "Schedule Interview -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                    db.Close();
                                    //CommonUtility.sendEmailViaWebApi(Mailids[i], "Schedule Interview -  MRF Limited", EmailBody);
                                }
                            }
                        }
                        else
                        {
                            if (formData.InterviewTypeId == 1)
                            {
                                //offline
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 54);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            }
                            else
                            {
                                //online
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 55);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            }
                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@fromDate", formData.FromDate);
                                EmailBody = EmailBody.Replace("@@VenueName &", formData.VenueName);
                                EmailBody = EmailBody.Replace("@@VenueAddress", formData.InterviewVenueAddress);
                                //EmailBody = EmailBody.Replace("@@Position", requisitionDetailsForEmail[0].PositionName);
                                //EmailBody = EmailBody.Replace("@@Department", requisitionDetailsForEmail[0].DepartmentName);
                                //EmailBody = EmailBody.Replace("@@Function", requisitionDetailsForEmail[0].FunctionName);
                                //EmailBody = EmailBody.Replace("@@ContactName", formData.ContactName);
                                //EmailBody = EmailBody.Replace("@@ContactNo", formData.ContactNo);
                                EmailBody = EmailBody.Replace("@@Interview Link", formData.InterviewLink);
                                EmailBody = EmailBody.Replace("@@ContactNumber", formData.InterviewContactNo);
                                EmailBody = EmailBody.Replace("@@ContactPerson", formData.InterviewContactName);

                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateIds), 0, 0, 38, formData.EmailTemplateId, formData.EmailId, EmailBody, "Schedule Interview -  MRF Limited", Convert.ToInt32(formData.CreatedBy));
                                db.Close();
                              //  CommonUtility.sendEmailViaWebApi(formData.EmailId, "Schedule Interview -  MRF Limited", EmailBody);

                            }

                        }
                    }

                 return await Task.FromResult(rm);
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CampusInterviewScheduleDetail> GetInterviewScheduleDetail(SearchCampusInterviewScheduleDetail formData)
        {
            try
            {
                CampusInterviewScheduleDetail dataList = new CampusInterviewScheduleDetail();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    const string procName = "Usp_CampusInterviewSchedule_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusInterviewScheduleDetail>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CampusCandidateVerticalFunction> GetCampusCandidateVerticalFunction(SearchCampusVerticalFunction search)
        {
            try
            {
                CampusCandidateVerticalFunction dataList = new CampusCandidateVerticalFunction();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CampusLinkId", search.CampusLinkId);
                    const string procName = "Usp_CampusCandidate_VerticalFunction_GetAll";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CampusVertical = returnList.Read<CampusCandidateVertical>().ToList();
                    dataList.CampusFunction = returnList.Read<CampusCandidateFunction>().ToList();
                    //dataList.CampusPosition = returnList.Read<CampusCandidatePosition>().ToList();
                    //dataList.CampusLocation = returnList.Read<CampusCandidateLocation>().ToList();
                    dataList.MappedList= returnList.Read<CandidateMappedList>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    //const string procName = "Usp_CampusCandidate_VerticalFunction_Update";
                    const string procName = "Usp_CampusCandidate_VerticalFunction_Update_New";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> OffCampusCandidateVerticalFunctionUpdate(CampusCandidateVerticalFunctionFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    //const string procName = "Usp_OffCampusCandidate_VerticalFunction_Update";
                    const string procName = "Usp_OffCampusCandidate_VerticalFunction_Update_New";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusCandidateRequisitionMap(CampusCandidateRequistionMapFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCandidate_RequisitionMapping";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusRequisitionMapList>> GetCampusRequisitionMapList(SearchCampusRequisitionMap search)
        {
            try
            {
                List<CampusRequisitionMapList> dataList = new List<CampusRequisitionMapList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    para.Add("@FunctionId", search.FunctionId);
                    const string procName = "Usp_CampusRequisition_VerticalFunction_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusRequisitionMapList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RequisitionListForCampusRequisitionMap>> GetAllRequisitionForCampusRequisitionMap(SearchRequisitionListForCampusMap search)
        {
            try
            {
                List<RequisitionListForCampusRequisitionMap> dataList = new List<RequisitionListForCampusRequisitionMap>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", search.RequisitionDetailId);
                    para.Add("@IsDummy", search.IsDummy);
                    const string procName = "Usp_AllRequisition_ForRequisitionMap";
                    connection.Open();
                    dataList = connection.Query<RequisitionListForCampusRequisitionMap>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusRequisitionData>> GetCampusRequisitionData(SearchCampusRequisitionData formData)
        {
            try
            {
                List<CampusRequisitionData> dataList = new List<CampusRequisitionData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    const string procName = "Usp_CampusRequisition_Get";
                    connection.Open();
                    dataList = connection.Query<CampusRequisitionData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusRequisitionUpdate(CampusRequisitionUpdateFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailId", formData.RequisitionDetailId);
                    para.Add("@RequisitionTypeId", formData.RequisitionTypeId);
                    para.Add("@RequisitionTitle", formData.RequisitionTitle);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@CandidateCount", formData.CandidateCount);
                    para.Add("@CollegeCategoryId", formData.CollegeCategoryId);
                    para.Add("@StatusId", formData.StatusId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_CampusRequisition_Update";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<CampusCandidateProfileDetail> GetCampusCandidateProfileDetailData(SearchCampusCandidateProfile search)
        {
            try
            {
                CampusCandidateProfileDetail dataList = new CampusCandidateProfileDetail();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_CampusCandidateProfile_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ProfileData = returnList.Read<CampusCandidateProfileData>().ToList();
                    dataList.AcademicData = returnList.Read<CampusCandidateProfileAcademicData>().ToList();
                    
                    String ContainerReference = "candidateresume";

                    foreach (var List in dataList.ProfileData)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                        if(List.Application != null)
                        {
                            var pathsplit = List.Application.Split("/");
                            string Document = Path.GetFileName(List.Application);
                            string Applicationpath = DownloadedFile(Document, pathsplit[1]);
                            List.Application = Applicationpath;
                        }
                    }
                    // by arghya
                    return await Task.FromResult(dataList);
                } 
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<RegistrationDetail> GetCampusRegistrationDetails(SearchCampusCandidateProfile search)
        {
            try
            {
                RegistrationDetail dataList = new RegistrationDetail();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    const string procName = "Usp_RegistrationCandidate_Get";
                    connection.Open();
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.ProfileData = returnList.Read<CandidateDetails>().ToList();
                    dataList.AcademicData = returnList.Read<CandidateRegistrationAcademicData>().ToList();
                    dataList.OtherAcademicData = returnList.Read<CandidateProfileOtherAcademicDataNew>().ToList();

                    String ContainerReference = "candidateresume";

                    foreach (var List in dataList.ProfileData)
                    {
                        if (List.Resume != null)
                        {
                            string Document = Path.GetFileName(List.Resume);
                            string CandiadateSignature = DownloadedFile(Document, ContainerReference);
                            List.Resume = CandiadateSignature;
                        }
                    }
                    // by arghya
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<RegistrationRemarks>> GetCampusRegistrationRemarks(SearchCampusCandidateRemarks search)
        {
            try
            {
                List<RegistrationRemarks> dataList = new List<RegistrationRemarks>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@FormtypeId", search.FormtypeId);
                    const string procName = "Usp_CampusRegistrationRemarks_Get";
                    connection.Open();
                    dataList = connection.Query<RegistrationRemarks>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public string DownloadedFile(string filename, string ContainerReference)
        {
            IDbConnection connection = base.GetConnection();
            string ContainerName = base.GetContainerName();
            string AzureConnectionString = base.GetAzureConnectionString();
            MemoryStream ms = new MemoryStream();
            AppConfiguration ac = new AppConfiguration();
            DatabaseContext dc = new DatabaseContext(ac);
            try
            {
                if (CloudStorageAccount.TryParse(AzureConnectionString.ToString(), out CloudStorageAccount storageAccount))
                {
                    CloudBlobClient BlobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = BlobClient.GetContainerReference(ContainerReference);
                    CloudBlob file = container.GetBlobReference(filename);
                    localFilePath = file.StorageUri.PrimaryUri.AbsoluteUri.ToString();

                }
                return localFilePath;
            }
            catch (Exception ex)
            {
                return (ex.Message.ToString());
            }
        }
        //public string DownloadedFile(string filename, string ContainerReference)
        //{
        //    IDbConnection connection = base.GetConnection();
        //    string AzureConnectionString = base.GetAzureConnectionString();
        //    string blobEndpoint = base.GetBlobEndPoint(); //Blob end point in appsettings.json
        //    string sasToken = GenerateSasToken(blobEndpoint, ContainerReference, filename);
        //    return $"{blobEndpoint}/{ContainerReference}/{filename}{sasToken}";
        //}
        //private string GenerateSasToken(string blobEndpoint, string containerName, string blobName)
        //{
        //    try
        //    {
        //        string connectionString = base.GetAzureConnectionString(); // Update with your actual connection string params
        //        BlobServiceClient blobServiceClient = new BlobServiceClient(connectionString);
        //        BlobContainerClient containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        //        BlobClient blobClient = containerClient.GetBlobClient(blobName);

        //        // Define the permissions and expiry for the SAS token
        //        BlobSasBuilder sasBuilder = new BlobSasBuilder()
        //        {
        //            BlobContainerName = containerName,
        //            BlobName = blobName,
        //            Resource = "b", // "b" for blob
        //            StartsOn = DateTimeOffset.UtcNow,
        //            ExpiresOn = DateTimeOffset.UtcNow.AddHours(1), // Adjust expiry as needed
        //            Protocol = SasProtocol.Https
        //        };

        //        // Set permissions (e.g., read permission)
        //        sasBuilder.SetPermissions(BlobSasPermissions.Read);

        //        // Generate the SAS token URI
        //        Uri sasUri = blobClient.GenerateSasUri(sasBuilder);

        //        // Get the SAS token from the URI
        //        string sasToken = sasUri.Query;

        //        return sasToken;
        //    }
        //    catch (Exception ex)
        //    {
        //        return ex.Message; // Handle error or return default SAS token
        //    }
        //}
        public async Task<ReturnMessage> EnableDisableCampusLink(EnableDisableCampusLinkFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@StatusId", formData.Status);
                    const string procName = "Usp_CampusLink_EnableDisable";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateCampusCandidateInstitute(UpdateInstituteFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@InstituteName", formData.InstituteName);
                    const string procName = "Usp_CampusCandidateInstituteUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<ReturnMessage> UpdateCampusCandidateProfile(UpdateCampusProfileData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@Name", formData.Name);
                    para.Add("@dob", formData.Dob);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@phoneno", formData.phoneno);
                    para.Add("@hometwon", formData.hometwon);
                    para.Add("@hometwon", formData.hometwon);
                    para.Add("@highesqualification", formData.highestQualification);
                    para.Add("@VisualOrder", formData.VisualOrder);
                    //para.Add("@Height", Convert.ToInt32(formData.Height));
                    //para.Add("@Weight", Convert.ToInt32(formData.Weight));
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    const string procName = "Usp_CampusCandidate_EditProfile";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 2)
                    {
                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 105);
                        emailTemplateParam.Add("@TemplateId", 110);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;

                            EmailBody = EmailBody.Replace("@~@candidateName", formData.Name);
                            EmailBody = EmailBody.Replace("@~@candidateNo", Convert.ToString(formData.CandidateId));
                            CommonUtility.sendEmailViaWebApi(formData.EmailId, "Update Qualification Details - MRF Limited", EmailBody); //NEED TO OPEN
                            //IDbConnection db =base.GetConnection(); 
                            //db.Open();
                            //CommonUtility.InsertInMailTable(db, Convert.ToInt32(formData.CandidateId), 0, 0, 39, 110, formData.EmailId, EmailBody, "Update Qualification Details - MRF Limited", Convert.ToInt32(formData.CandidateId));
                            //db.Close();
                        }

                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CandidateRejectDecline(RejectDeclineData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    
                    para.Add("@candidateId", formData.CandidateId);
                    para.Add("@hiringStarusId", formData.HiringStatusId);
                    para.Add("@remarks", formData.Remarks);
                    para.Add("@createdby", formData.CreatedBy);
                    const string procName = "Usp_CampusCandidateWise_RejectDecline";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CandidateAcknowledged(AcknowledgedData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@candidateId", formData.CandidateId);
                    para.Add("@hiringStarusId", formData.HiringStatusId);
                    para.Add("@remarks", formData.Remarks);
                    const string procName = "Usp_CampusCandidateWise_Acknowledged";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CancelPrePlacementtalk(Cancelplacement formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateIds", formData.CandidateIds);
                    const string procName = "Usp_PrePlacementSchedule_Cancel";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<CampusTalkScheduleDetailForGetAll> talkDetailsForEmail = new List<CampusTalkScheduleDetailForGetAll>();
                    //if (rm.SuccessFlag == 1)
                    //{
                    //    List<string> CandidateIds = formData.CandidateIds.Split(',').ToList();
                    //    List<string> CandidateNames = formData.CandidateName.Split(',').ToList();
                    //    List<string> Institutes = formData.Institute.Split(',').ToList();
                    //    List<string> Courses = formData.Course.Split(',').ToList();
                    //    List<string> Streams = formData.Stream.Split(',').ToList();
                    //    List<string> Mailids = formData.EmailId.Split(',').ToList();
                    //    for (int i = 0; i < CandidateIds.Count; i++)
                    //    {
                    //        if (CandidateIds[i].Length > 0)
                    //        {
                    //            var talkDetailsparam = new DynamicParameters();
                    //            talkDetailsparam.Add("@CandidateId", CandidateIds[i]);
                    //            const string talkProcName = "Usp_CampusPrePlacementSchedule_GetAll";
                    //            talkDetailsForEmail = connection.Query<CampusTalkScheduleDetailForGetAll>(talkProcName, talkDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                    //            if (Mailids != null)
                    //            {

                    //                var emailTemplateParam = new DynamicParameters();
                    //                emailTemplateParam.Add("@TemplateTypeId", 82);
                    //                emailTemplateParam.Add("@TemplateId", null);
                    //                emailTemplateParam.Add("@IsActive", true);
                    //                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                    //                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                    //            }
                    //        }
                    //        else
                    //        {
                    //            var emailTemplateParam = new DynamicParameters();
                    //            emailTemplateParam.Add("@TemplateTypeId", 83);
                    //            emailTemplateParam.Add("@TemplateId", null);
                    //            emailTemplateParam.Add("@IsActive", true);
                    //            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                    //            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                    //        }

                    //        if (emailTemplateBodyList.Count > 0)
                    //        {
                    //            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                    //            EmailBody = EmailBody.Replace("@@CandidateName", CandidateNames[i]);
                    //            EmailBody = EmailBody.Replace("@@CandidateId", CandidateIds[i]);
                    //            EmailBody = EmailBody.Replace("@@FormDate", talkDetailsForEmail[0].FromDate);
                    //            EmailBody = EmailBody.Replace("@@ToDate", talkDetailsForEmail[0].ToDate);
                    //            EmailBody = EmailBody.Replace("@@Institute", Institutes[i]);
                    //            EmailBody = EmailBody.Replace("@@Course", Courses[i]);
                    //            EmailBody = EmailBody.Replace("@@Stream", Streams[i]);
                    //            EmailBody = EmailBody.Replace("@@Venue", talkDetailsForEmail[0].VenueName);
                    //            CommonUtility.sendEmailViaWebApi(formData.EmailId, "MRF Preplacement Talk - Cancelled", EmailBody);
                    //        }
                    //    }
                    //}
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CancelTestSchedule(Cancelplacement formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateIds", formData.CandidateIds);
                    const string procName = "Usp_CampusTestSchedule_Cancel";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<CampusTestScheduleDetail> testDetailsForEmail = new List<CampusTestScheduleDetail>();
                    //if (rm.SuccessFlag == 1)
                    //{
                    //    List<string> CandidateIds = formData.CandidateIds.Split(',').ToList();
                    //    List<string> CandidateNames = formData.CandidateName.Split(',').ToList();
                    //    List<string> Institutes = formData.Institute.Split(',').ToList();
                    //    List<string> Courses = formData.Course.Split(',').ToList();
                    //    List<string> Streams = formData.Stream.Split(',').ToList();
                    //    List<string> Mailids = formData.EmailId.Split(',').ToList();
                    //    for (int i = 0; i < CandidateIds.Count; i++)
                    //    {
                    //        if (CandidateIds[i].Length > 0)
                    //        {
                    //            var testDetailsparam = new DynamicParameters();
                    //            testDetailsparam.Add("@CandidateId", CandidateIds[i]);
                    //            const string testProcName = "Usp_CampusTestSchedule_GetAll";
                    //            testDetailsForEmail = connection.Query<CampusTestScheduleDetail>(testProcName, testDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                    //            if (Mailids != null)
                    //            {
                    //                var emailTemplateParam = new DynamicParameters();
                    //                emailTemplateParam.Add("@TemplateTypeId", 80);
                    //                emailTemplateParam.Add("@TemplateId", null);
                    //                emailTemplateParam.Add("@IsActive", true);
                    //                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                    //                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                    //            }
                    //        }
                    //        else
                    //        {
                    //            var emailTemplateParam = new DynamicParameters();
                    //            emailTemplateParam.Add("@TemplateTypeId", 81);
                    //            emailTemplateParam.Add("@TemplateId", null);
                    //            emailTemplateParam.Add("@IsActive", true);
                    //            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                    //            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                    //        }

                    //        if (emailTemplateBodyList.Count > 0)
                    //        {
                    //            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                    //            EmailBody = EmailBody.Replace("@@CandidateName", CandidateNames[i]);
                    //            EmailBody = EmailBody.Replace("@@CandidateId", CandidateIds[i]);
                    //            EmailBody = EmailBody.Replace("@@FormDate", testDetailsForEmail[0].FromDate);
                    //            EmailBody = EmailBody.Replace("@@ToDate", testDetailsForEmail[0].ToDate);
                    //            EmailBody = EmailBody.Replace("@@Institute", Institutes[i]);
                    //            EmailBody = EmailBody.Replace("@@Course", Courses[i]);
                    //            EmailBody = EmailBody.Replace("@@Stream", Streams[i]);
                    //            EmailBody = EmailBody.Replace("@@Venue", testDetailsForEmail[0].VenueName);
                    //            CommonUtility.sendEmailViaWebApi(Mailids[i], "MRF Screening Test - Cancelled", EmailBody);

                    //        }
                    //    }
                    //}
                
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CancelInterview(Cancelplacement formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@CandidateIds", formData.CandidateIds);
                    const string procName = "Usp_CampusInterviewSchedule_Cancel";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                    List<CampusInterviewScheduleDetail> interviewDetailsForEmail = new List<CampusInterviewScheduleDetail>();
                    if (rm.SuccessFlag == 1)
                    {
                        List<string> CandidateIds = formData.CandidateIds.Split(',').ToList();
                        List<string> CandidateNames = formData.CandidateName.Split(',').ToList();
                        List<string> Institutes = formData.Institute.Split(',').ToList();
                        List<string> Courses = formData.Course.Split(',').ToList();
                        List<string> Streams = formData.Stream.Split(',').ToList();
                        List<string> Mailids = formData.EmailId.Split(',').ToList();
                        for (int i = 0; i < CandidateIds.Count; i++)
                        {
                            if (CandidateIds[i].Length > 0)
                            {
                                var interviewDetailsparam = new DynamicParameters();
                                interviewDetailsparam.Add("@CandidateId", CandidateIds[i]);
                                const string interviewProcName = "Usp_CampusInterviewSchedule_GetAll";
                                interviewDetailsForEmail = connection.Query<CampusInterviewScheduleDetail>(interviewProcName, interviewDetailsparam, commandType: CommandType.StoredProcedure).ToList();
                                if (Mailids != null)
                                {
                                    var emailTemplateParam = new DynamicParameters();
                                    emailTemplateParam.Add("@TemplateTypeId", 84);
                                    emailTemplateParam.Add("@TemplateId", null);
                                    emailTemplateParam.Add("@IsActive", true);
                                    const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                    emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                                }
                            }
                            else
                            {
                                var emailTemplateParam = new DynamicParameters();
                                emailTemplateParam.Add("@TemplateTypeId", 85);
                                emailTemplateParam.Add("@TemplateId", null);
                                emailTemplateParam.Add("@IsActive", true);
                                const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                                emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            }

                            if (emailTemplateBodyList.Count > 0)
                            {
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@@CandidateName", CandidateNames[i]);
                                EmailBody = EmailBody.Replace("@@CandidateId", CandidateIds[i]);
                                EmailBody = EmailBody.Replace("@@FormDate", interviewDetailsForEmail[0].FromDate);
                                EmailBody = EmailBody.Replace("@@ToDate", interviewDetailsForEmail[0].ToDate);
                                EmailBody = EmailBody.Replace("@@Institute", Institutes[i]);
                                EmailBody = EmailBody.Replace("@@Course", Courses[i]);
                                EmailBody = EmailBody.Replace("@@Stream", Streams[i]);
                                EmailBody = EmailBody.Replace("@@Venue", interviewDetailsForEmail[0].VenueName);
                                // CommonUtility.sendEmailViaWebApi(Mailids[i], "MRF Screening Test - Cancelled", EmailBody);
                                IDbConnection db = base.GetConnection();
                                db.Open();
                                CommonUtility.InsertInMailTable(db, Convert.ToInt32(CandidateIds[i]), 0, 0, 9, 84, Mailids[i], EmailBody, "MRF Screening Test - Cancelled", 1);
                                db.Close();
                            }
                        }
                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<StageGetAssesmentCandidate>> GetCampusCandidateData(SearchCampusCandidateProfile formData)
        { 
            try
            {
                List<StageGetAssesmentCandidate> dataList = new List<StageGetAssesmentCandidate>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candidateId", formData.CandidateId);
                    const string procName = "Usp_stagegateAssesment_candidateDetaisGet";
                    connection.Open();
                    dataList = connection.Query<StageGetAssesmentCandidate>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<GetStageGetAssesmentComponentData>> GetStageGetAssesmentComponent(SearchCampusCandidateProfile formData)
        {
            try
            {
                List<GetStageGetAssesmentComponentData> dataList = new List<GetStageGetAssesmentComponentData>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candidateId", formData.CandidateId);
                    const string procName = "Usp_getStageGateAssesmentRowColumn";
                    connection.Open();
                    dataList = connection.Query<GetStageGetAssesmentComponentData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ReqCandidateDetails>> ViewCanidateListByRequisition(SearchCandiateByReq formData)
        {
            try
            {
                List<ReqCandidateDetails> dataList = new List<ReqCandidateDetails>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RequisitionDetailsId", formData.RequistionDeatilsId);
                    const string procName = "Usp_RequisitionListCandidates_getAll";
                    connection.Open();
                    dataList = connection.Query<ReqCandidateDetails>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> UpdateSelectionComunication(SelectionComunicationIns formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@candiateId", formData.CandidateIds);
                    para.Add("@createdBy", formData.CreatedBy);
                    para.Add("@requisitionDetailsId", formData.RequisitionDetailsId);

                    const string procName = "Usp_CampusSelectionComunication_insUp";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                                       
                    if (rm.SuccessFlag == 1)
                    {
                        List<string> Candidatename = formData.CandiateName.Split(',').ToList();
                        List<string> Email = formData.Emails.Split(',').ToList();
                        List<string> functions = formData.Functions.Split(',').ToList();
                        for (int i = 0; i < Candidatename.Count; i++)
                        {
                            if (Candidatename[i].Length > 0)
                            { 
                                    string EmailBody = formData.Template;
                                    EmailBody = EmailBody.Replace("@~@candidateName", Candidatename[i]);
                                    EmailBody = EmailBody.Replace("@~@functionName", functions[i]);
                                    //CommonUtility.sendEmailViaWebApi(Email[i], "MRF Selection - Comunication", EmailBody);
                                    IDbConnection db=base.GetConnection();
                                    db.Open();
                                    CommonUtility.InsertInMailTable(db, 0, 0, 0, 40, 0, Email[i], EmailBody, "MRF Selection - Comunication", Convert.ToInt32(formData.CreatedBy));
                                    db.Close();

                            }
                        }
                        var param = new DynamicParameters();
                        List<InstituteEmailIds> dataList = new List<InstituteEmailIds>();
                        List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                        param.Add("@candidateId", formData.CandidateIds);
                        const string procudureName = "Usp_CampusInstituteEmail_get";
                        
                        dataList = connection.Query<InstituteEmailIds>(procudureName, param, commandType: CommandType.StoredProcedure).ToList();

                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", null);
                        emailTemplateParam.Add("@TemplateId", 107);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();

                        //if (dataList.Count != 0)
                        //{
                        //    foreach(var data in dataList)
                        //    {
                        //        string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                        //        EmailBody = EmailBody.Replace("@candidatename", data.FullName);
                        //        EmailBody = EmailBody.Replace("@~@contactperson", data.ContactPersonName);
                        //        CommonUtility.sendEmailViaWebApi(data.InstituteEmailId, "MRF Selection - Comunication", EmailBody);
                        //    }
                        //}
                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CandidateWiseSelection>> CandidateWiseSelectionData(CandidateWiseSelectionSearach formData)
        {
            try
            {
                List<CandidateWiseSelection> dataList = new List<CandidateWiseSelection>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@candidateId", formData.CandidateId);
                    const string procName = "Usp_CampusSelectionDetails_candidateWiseGet";
                    connection.Open();
                    dataList = connection.Query<CandidateWiseSelection>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> CampusCandidateAcknowledgeMent(CampusCandidateSelectionAcknowledgeData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();

                    para.Add("@candidateId", formData.CandidateId);
                    para.Add("@hiringStatusId", formData.HiringStatusId);
                    para.Add("@LocationId", formData.LocationId);
                    para.Add("@createdBy", formData.CreatedBy);
                    const string procName = "Usp_CampusCandiateSelectionAcknowledge";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<CampusLinkList>> GetAllOffCampusLink(SaerchCampusLink formData)
        {
            try
            {
                List<CampusLinkList> dataList = new List<CampusLinkList>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    const string procName = "Usp_OffCampusCampusLink_GetAll";
                    connection.Open();
                    dataList = connection.Query<CampusLinkList>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> OffCampusLinkInsert(CampusLinkFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusYearId", formData.CampusYearId);
                    para.Add("@CampusCourseId", formData.CampusCourseId);
                    para.Add("@CampusForId", formData.CampusForId);
                    para.Add("@CampusTemplate", formData.CampusTemplate);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@AppURL", formData.Appurl);
                    const string procName = "Usp_OffCampusLink_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> InsertUpdateMapRequistion(MapRequistionDeatils formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@RequisitionType", formData.RequistionType);
                    para.Add("@SelectedRequistionDetail", formData.SelectedRequitionDetails);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    
                    const string procName = "Usp_CampusCandidateMapReq_InsUp";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
