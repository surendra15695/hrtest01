using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CampusModule;
using Application.Entity.Entities.CommonModule;
using Application.Entity.Entities.CampusModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.DataAccess.Utility;

namespace Application.DataAccess.Repositories.CampusModule
{
    public class CampusCandidateRegistrationRepository : DatabaseContext, ICampusCandidateRegistrationRepository
    {
        public CampusCandidateRegistrationRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public string CloudStorageAccountname()
        {
            return base.FileUploadToBlob().ToString();
        }
        public async Task<CampusCandidate> GetCampusCandidate(CampusCandidateSearch search)
        {
            try
            {
                CampusCandidate dataList = new CampusCandidate();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateId);
                    para.Add("@CampusCandidateId", search.CampusCandidateId);
                    const string procName = "Usp_CampusCandidate_GetAll";
                    connection.Open();
                    //returnList = connection.Query<CandidateProfileFormMasterData>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //return await Task.FromResult(returnList);
                    var returnList = connection.QueryMultiple(procName, para, commandType: CommandType.StoredProcedure);
                    dataList.CampusCandidateMasterData = returnList.Read<CampusCandidateMasterData>().FirstOrDefault();
                    dataList.CampusCandidateHighSchool = returnList.Read<CampusCandidateHighSchool>().ToList();
                    dataList.CampusCandidateHigherSecondary = returnList.Read<CampusCandidateHigherSecondary>().ToList();
                    dataList.CampusCandidateDiploma = returnList.Read<CampusCandidateDiploma>().ToList();
                    dataList.CampusCandidateGraduation = returnList.Read<CampusCandidateGraduation>().ToList();
                    dataList.CampusCandidatePostGraduate = returnList.Read<CampusCandidatePostGraduate>().ToList();
                    dataList.CampusCandidateOtherQulifiaction = returnList.Read<CampusCandidateOtherQulifiaction>().ToList();
                    return await Task.FromResult(dataList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> SaveCampusCandidate(CampusCandidateSave formData)
        {
            try
            {
                DataTable dtAcademic = CommonUtility.ToDataTable<CampusCandidateAcademic>(formData.CampusCandidateAcademic);
                DataTable dtAnyOtherAcademic = CommonUtility.ToDataTable<CandidateAnyOtherAcademic>(formData.CampusCandidateAnyOtherAcademic);
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCandidateId", formData.CampusCandidateId);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@Gender", formData.Gender);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@Age", formData.Age);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PhoneNo", formData.PhoneNo);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@HomeTown", formData.HomeTown);
                    para.Add("@NativeState", formData.NativeState);
                    para.Add("@PresentState", formData.PresentState);
                    para.Add("@MotherTongue", formData.MotherTongue);
                    para.Add("@LanguageKnown", formData.LanguageKnown);
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@EyeSightRight", formData.EyeSightRight);
                    para.Add("@EyeSightLeft", formData.EyeSightLeft);
                    para.Add("@FatherOccupation", formData.FatherOccupation);
                    para.Add("@MotherOccupation", formData.MotherOccupation);
                    para.Add("@Disability", formData.Disability);
                    para.Add("@DisabilityDetails", formData.DisabilityDetails);
                    para.Add("@HealthIssue", formData.HealthIssue);
                    para.Add("@HealthIssueDetails", formData.HealthIssueDetails);
                    para.Add("@NoofSiblings", formData.NoofSiblings);
                    para.Add("@MRFRealtive", formData.MRFRealtive);
                    para.Add("@RealtiveName", formData.RealtiveName);
                    para.Add("@RealtiveMobileNo", formData.RealtiveMobileNo);
                    para.Add("@YearsCommitments", formData.YearsCommitments);
                    para.Add("@AnyWhereinIndia", formData.AnyWhereinIndia);
                    para.Add("@WorkinginShift", formData.WorkinginShift);
                    para.Add("@JobTypePriority", formData.JobTypePriority);
                    para.Add("@CriticalFactor", formData.CriticalFactor);
                    para.Add("@MostPreferdBenifit", formData.MostPreferdBenifit);
                    para.Add("@ExtraCurricularActivities", formData.ExtraCurricularActivities);
                    para.Add("@AciveArrears", formData.ActiveArrears); // sayandeep
                    para.Add("@Resume", formData.Resume);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@DeletedIds", formData.DeletedIds);
                    para.Add("@HighestQualification", formData.HighestQualification);
                    para.Add("@CampusCandidateAcademic", dtAcademic, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CampusCandidateAnyOtherQualification", dtAnyOtherAcademic, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_CampusCandidate_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {


                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 1);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.FullName);
                            EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                            CommonUtility.sendEmailViaWebApi(formData.EmailId, "Candidate Registration Successful", EmailBody);
                            //IDbConnection db=base.GetConnection();
                            //db.Open();  
                            //CommonUtility.InsertInMailTable(db, 0, 0, 0, 36, 1, formData.EmailId, EmailBody, "Candidate Registration Successful", Convert.ToInt32(formData.CreatedBy));
                            //db.Close();
                        }
                    }
                    if (rm.SuccessFlag == 2)
                    {


                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 110);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateNo", rm.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.FullName);
                            CommonUtility.sendEmailViaWebApi(rm.SenderEmailId, "Registration Form  - Candidate Edit Completed", EmailBody);
                            //IDbConnection db = base.GetConnection();
                            //db.Open();
                            //CommonUtility.InsertInMailTable(db, 0, 0, 0, 36, 1, rm.SenderEmailId, EmailBody, "Registration Form  - Candidate Edit Completed", Convert.ToInt32(formData.CreatedBy));
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

        public async Task<ReturnMessage> SaveOffCampusCandidate(OffCampusCandidateSaveNew formData)
        {
            try
            {
                DataTable dtAcademic = CommonUtility.ToDataTable<CampusCandidateAcademic>(formData.CampusCandidateAcademic);
                DataTable dtAnyOtherAcademic = CommonUtility.ToDataTable<CandidateAnyOtherAcademic>(formData.CampusCandidateAnyOtherAcademic);
                List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CampusCandidateId", formData.CampusCandidateId);
                    para.Add("@CampusLinkId", formData.CampusLinkId);
                    para.Add("@CandidateId", formData.CandidateId);
                    para.Add("@FullName", formData.FullName);
                    para.Add("@Gender", formData.Gender);
                    para.Add("@DOB", formData.DOB);
                    para.Add("@Age", formData.Age);
                    para.Add("@EmailId", formData.EmailId);
                    para.Add("@PhoneNo", formData.PhoneNo);
                    para.Add("@AadharNo", formData.AadharNo);
                    para.Add("@HomeTown", formData.HomeTown);
                    para.Add("@NativeState", formData.NativeState);
                    para.Add("@PresentState", formData.PresentState);
                    para.Add("@MotherTongue", formData.MotherTongue);
                    para.Add("@LanguageKnown", formData.LanguageKnown);
                    para.Add("@Height", formData.Height);
                    para.Add("@Weight", formData.Weight);
                    para.Add("@EyeSightCorrected", formData.EyeSightCorrected);
                    para.Add("@EyeSightRight", formData.EyeSightRight);
                    para.Add("@EyeSightLeft", formData.EyeSightLeft);
                    para.Add("@FatherOccupation", formData.FatherOccupation);
                    para.Add("@MotherOccupation", formData.MotherOccupation);
                    para.Add("@Disability", formData.Disability);
                    para.Add("@DisabilityDetails", formData.DisabilityDetails);
                    para.Add("@HealthIssue", formData.HealthIssue);
                    para.Add("@HealthIssueDetails", formData.HealthIssueDetails);
                    para.Add("@NoofSiblings", formData.NoofSiblings);
                    para.Add("@MRFRealtive", formData.MRFRealtive);
                    para.Add("@RealtiveName", formData.RealtiveName);
                    para.Add("@RealtiveMobileNo", formData.RealtiveMobileNo);
                    para.Add("@YearsCommitments", formData.YearsCommitments);
                    para.Add("@AnyWhereinIndia", formData.AnyWhereinIndia);
                    para.Add("@WorkinginShift", formData.WorkinginShift);
                    para.Add("@JobTypePriority", formData.JobTypePriority);
                    para.Add("@CriticalFactor", formData.CriticalFactor);
                    para.Add("@MostPreferdBenifit", formData.MostPreferdBenifit);
                    para.Add("@ExtraCurricularActivities", formData.ExtraCurricularActivities);
                    para.Add("@AciveArrears", formData.ActiveArrears); // sayandeep
                    para.Add("@Resume", formData.Resume);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@DeletedIds", formData.DeletedIds);
                    para.Add("@HighestQualification", formData.HighestQualification);
                    para.Add("@CampusCandidateAcademic", dtAcademic, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@CampusCandidateAnyOtherQualification", dtAnyOtherAcademic, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_OffCampusCandidateNew_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1)
                    {


                        var emailTemplateParam = new DynamicParameters();
                        emailTemplateParam.Add("@TemplateTypeId", 1);
                        emailTemplateParam.Add("@TemplateId", null);
                        emailTemplateParam.Add("@IsActive", true);
                        const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                        //connection.Open();
                        emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                        if (emailTemplateBodyList.Count > 0)
                        {
                            string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                            EmailBody = EmailBody.Replace("@~@candidateName", formData.FullName);
                            EmailBody = EmailBody.Replace("@~@userId", rm.CandidateNo);
                            EmailBody = EmailBody.Replace("@~@password", "welcome@1234");
                            CommonUtility.sendEmailViaWebApi(formData.EmailId, "Candidate Registration Successful", EmailBody);
                            //CommonUtility.InsertInMailTable(connection, Convert.ToInt32(formData.CandidateId), 0, 0, 49, 1, formData.EmailId, EmailBody, "Candidate Registration Successful", Convert.ToInt32(formData.CreatedBy));
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

        public async Task<List<CandidatesDataForExcelDwnld>> GetCandidatesForexcelDwnld(CampusCandidateSearchForExcel search)
        {
            try
            {
                List<CandidatesDataForExcelDwnld> dataList = new List<CandidatesDataForExcelDwnld>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@CandidateId", search.CandidateIds);
                   // para.Add("@CampusCandidateId", search.CampusCandidateId);
                    const string procName = "Usp_campuscandidateGetForXlDwnld";
                    connection.Open();

                     dataList = connection.Query<CandidatesDataForExcelDwnld>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(dataList);
                    
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
