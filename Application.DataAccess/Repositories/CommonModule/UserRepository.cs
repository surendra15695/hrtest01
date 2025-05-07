using Application.DataAccess.DataContext;
using Application.DataAccess.Repositories.Interfaces.CommonModule;
using Application.DataAccess.Utility;
using Application.Entity.Entities.CommonModule;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace Application.DataAccess.Repositories.CommonModule
{
    public class UserRepository : DatabaseContext, IUserRepository
    {
        public UserRepository(AppConfiguration appConfiguration)
        : base(appConfiguration)
        { }
        public async Task<List<User>> SaveUser(User search)
        {
            try
            {
                List<User> returnList = new List<User>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@EmailId", search.EmailId);
                    para.Add("@Password", search.Password);
                    para.Add("@Role", "External");
                    const string procName = "Usp_UserMaster_InsertUpdate";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    //#region Mail
                    //var mailMessage = new MailMessage();
                    //mailMessage.To.Add(new MailAddress(search.EmailId));
                    //mailMessage.From = new MailAddress("namrata.netbased@gmail.com");
                    //mailMessage.Subject = "MRF";
                    //mailMessage.IsBodyHtml = true;
                    //mailMessage.Body = "Hi.......";
                    //using (var smtp = new SmtpClient())
                    //{
                    //    var credential = new NetworkCredential
                    //    {
                    //        UserName = "",//gmail id n pwd
                    //        Password = ""
                    //    };
                    //    try
                    //    {
                    //        smtp.Host = "smtp.gmail.com";
                    //        smtp.Port = 587;
                    //        smtp.EnableSsl = true;
                    //        smtp.UseDefaultCredentials = false;
                    //        smtp.Credentials = credential;
                    //        smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    //        smtp.Send(mailMessage);
                    //    }
                    //    catch (Exception ex)
                    //    {
                    //        throw;
                    //    }
                    //}
                    //#endregion

                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<User>> GetAllUser(SearchAllUser search)
        {
            try
            {
                List<User> returnList = new List<User>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserId", search.UserId);
                    para.Add("@RoleId", search.RoleId);
                    para.Add("@IsActive", search.IsActive);
                    const string procName = "Usp_Users_GetAll";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<List<User>> GetLocationwiseAllUser(SearchLocationwiseAllUser search)
        {
            try
            {
                List<User> returnList = new List<User>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserId", search.UserId);
                    para.Add("@RoleId", search.RoleId);
                    para.Add("@IsActive", search.IsActive);
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_LocationWiseUsers_GetAll";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<LoginUserStatus> GetLoginUser(LoginFormData formdata)
        {
            try
            {
                LoginUserStatus status = new LoginUserStatus();
                User returnList = new User();
                OTPDetails otpreturnList = new OTPDetails();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserId", formdata.UserId);
                    const string procName = "Usp_Users_GetAll";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (returnList != null)
                    {
                        status.Status = 1;
                        if (returnList.IsActive == true)
                        {
                            string dbpass = returnList.Password;
                            string dbsaltkey = returnList.SaltKey;
                            if (CommonUtility.EncodePassword(formdata.Password, dbsaltkey) != dbpass)
                            {
                                status.Status = 0;
                                returnList = null;
                            }
                            // UPDATE WRONG PASSWORD COUNT
                            var wrngpwdpara = new DynamicParameters();
                            wrngpwdpara.Add("@UserName", formdata.UserId);
                            wrngpwdpara.Add("@IsWrong", false);
                            const string wrngPwdProcName = "Usp_UpdateWrongPWDCount";
                            otpreturnList = connection.Query<OTPDetails>(wrngPwdProcName, wrngpwdpara, commandType: CommandType.StoredProcedure).FirstOrDefault();
                        }
                        else
                        {
                            status.Status = 0;
                            returnList = null;
                        }
                    }
                    status.LoginUser = returnList;
                    if (status.Status == 1)
                    {
                        UserNameClass userNameClass = new UserNameClass();
                        userNameClass.UserName = status.LoginUser.UserName.ToString() + " (AutoUserId - " + status.LoginUser.AutoUserId.ToString() + ")";
                        var value = AzuretableCallOnLogInout(userNameClass, "LogIn");
                    }

                    return await Task.FromResult(status);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<LoginOTPStatus> ValidateUserToSendOTP(LoginFormData formdata)
        {
            try
            {
                LoginOTPStatus status = new LoginOTPStatus();
                OTPDetails returnList = new OTPDetails();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserName", formdata.UserId);
                    const string procName = "Usp_CheckUserStatusAndGenerateOTP";
                    connection.Open();
                    returnList = connection.Query<OTPDetails>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (returnList != null)
                    {
                        status.Status = 1;
                        if (returnList.IsActive == true)
                        {
                            string dbpass = returnList.Password;
                            string dbsaltkey = returnList.SaltKey;
                            if (CommonUtility.EncodePassword(formdata.Password, dbsaltkey) != dbpass)
                            {

                                // UPDATE WRONG PASSWORD COUNT
                                var wrngpwdpara = new DynamicParameters();
                                wrngpwdpara.Add("@UserName", formdata.UserId);
                                wrngpwdpara.Add("@IsWrong", true);
                                const string wrngPwdProcName = "Usp_UpdateWrongPWDCount";
                                returnList = connection.Query<OTPDetails>(wrngPwdProcName, wrngpwdpara, commandType: CommandType.StoredProcedure).FirstOrDefault();
                                status.Status = 3;
                                returnList = null;
                            }
                            else
                            {
                                string mailbody = "<p>Dear @~@useremailname,</p><p>Your Login OTP for HR-Portal is - @~@otp</p><p>Regards,</p><p><strong>MRF HR Team</strong></p>";
                                mailbody = mailbody.Replace("@~@useremailname", returnList.UserEmailName.ToString());
                                mailbody = mailbody.Replace("@~@otp", returnList.OTP.ToString());
                                CommonUtility.sendEmailViaWebApi(returnList.UserEmail, "HR-Portal Login OTP", mailbody);
                                //CommonUtility.InsertInMailTable(connection, 0, 0, 0, 50, 0, returnList.UserEmail, mailbody, "HR-Portal Login OTP", 0);
                            }

                        }else if (returnList.IsActive == false && returnList.SuccessFlag==2)
                        {
                            status.Status = 4;
                            returnList = null;
                        }
                        else
                        {
                            status.Status = 2;
                            returnList = null;
                        }
                    }
                    status.UserOTP = returnList;
                    //if (status.Status == 1)
                    //{
                    //    UserNameClass userNameClass = new UserNameClass();
                    //    userNameClass.UserName = status.LoginUser.UserName.ToString() + " (AutoUserId - " + status.LoginUser.AutoUserId.ToString() + ")";
                    //    var value = AzuretableCallOnLogInout(userNameClass, "LogIn");
                    //}

                    return await Task.FromResult(status);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<LoginUserStatus> GetLoginUserByCosmos(LoginFormData formdata)
        {
            try
            {
                LoginUserStatus status = new LoginUserStatus();
                User returnList = new User();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserId", formdata.UserId);
                    const string procName = "Usp_Users_GetAll";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (returnList != null)
                    {
                        status.Status = 1;
                    }
                    status.LoginUser = returnList;
                    if (status.Status == 1)
                    {
                        UserNameClass userNameClass = new UserNameClass();
                        userNameClass.UserName = status.LoginUser.UserName.ToString() + " (AutoUserId - " + status.LoginUser.AutoUserId.ToString() + ")";
                        var value = AzuretableCallOnLogInout(userNameClass, "LogIn");
                    }

                    return await Task.FromResult(status);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<LoginUserStatus> ChangePassword(ChangePasswordData formdata)
        {
            try
            {
                LoginUserStatus status = new LoginUserStatus();
                User returnList = new User();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserId", formdata.UserId);
                    const string procName = "Usp_Users_GetAll";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (returnList != null)
                    {
                        //status.Status = 1;
                        //if (returnList.IsActive == true)
                        //{
                        string dbpass = returnList.Password;
                        string dbsaltkey = returnList.SaltKey;
                        if (CommonUtility.EncodePassword(formdata.OldPassword, dbsaltkey) != dbpass)
                        {
                            status.Status = 0;
                            returnList = null;
                        }
                        else
                        {
                            string SaltKey = Guid.NewGuid().ToString();
                            string EncodePass = CommonUtility.EncodePassword(formdata.CnfNewPassword, SaltKey);
                            var changePasswordParameter = new DynamicParameters();
                            changePasswordParameter.Add("@UserId", formdata.UserId);
                            changePasswordParameter.Add("@NewPassword", EncodePass);
                            changePasswordParameter.Add("@NewSaltKey", SaltKey);
                            const string changePassProcName = "Usp_ChangePassword_Update";
                            //connection.Open();
                            returnList = connection.Query<User>(changePassProcName, changePasswordParameter, commandType: CommandType.StoredProcedure).FirstOrDefault();

                            status.Status = 1;
                        }
                        //}
                        //else
                        //{
                        //    status.Status = 0;
                        //    returnList = null;
                        //}
                    }
                    status.LoginUser = returnList;

                    return await Task.FromResult(status);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public async Task<LoginUserStatus> GetForgotLoginUser(User formdata)
        {
            try
            {
                LoginUserStatus status = new LoginUserStatus();
                User returnList = new User();
                OTPDetails otpreturnList = new OTPDetails();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@UserId", formdata.UserId);
                    const string procName = "Usp_Users_GetAll";
                    connection.Open();
                    returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    if (returnList != null)
                    {
                        status.Status = 1;
                        if (returnList.IsActive == true)
                        {
                            string dbpass = returnList.Password;
                            string dbsaltkey = returnList.SaltKey;

                            int length = 8;
                            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
                            StringBuilder res = new StringBuilder();
                            Random rnd = new Random();
                            while (0 < length--)
                            {
                                res.Append(valid[rnd.Next(valid.Length)]);
                            }

                            formdata.Password = res.ToString();
                            string EncodePass = CommonUtility.EncodePassword(formdata.Password, dbsaltkey);


                            List<EmailTemplate> emailTemplateBodyList = new List<EmailTemplate>();

                            var emailTemplateParam = new DynamicParameters();
                            emailTemplateParam.Add("@TemplateTypeId", 20);
                            emailTemplateParam.Add("@TemplateId", null);
                            emailTemplateParam.Add("@IsActive", true);
                            const string emailTemplateProcName = "Usp_EmailTemplate_GetAll";
                            //connection.Open();
                            emailTemplateBodyList = connection.Query<EmailTemplate>(emailTemplateProcName, emailTemplateParam, commandType: CommandType.StoredProcedure).ToList();
                            if (emailTemplateBodyList.Count > 0)
                            {
                                IDbConnection emailConn = base.GetConnection();
                                emailConn.Open();
                                string EmailBody = emailTemplateBodyList[0].TemplateDescription;
                                EmailBody = EmailBody.Replace("@~@candidateName", returnList.UserName);
                                EmailBody = EmailBody.Replace("@~@userId", formdata.UserId);
                                EmailBody = EmailBody.Replace("@~@password", formdata.Password);
                                CommonUtility.sendEmailViaWebApi(returnList.EmailId, "Forgot Password - MRF Limited", EmailBody); //NEED TO OPEN
                                //CommonUtility.InsertInMailTable(emailConn, Convert.ToInt32(returnList.CandidateId), 0, 0, 51, 12, returnList.EmailId, EmailBody, "Forgot Password - MRF Limited", Convert.ToInt32(returnList.CandidateId));
                                emailConn.Close();
                            }


                            User user1 = new User();
                            var para1 = new DynamicParameters();
                            para1.Add("@Op_Mode", 1);
                            para1.Add("@UserId", formdata.UserId);
                            para1.Add("@Password", EncodePass);
                            const string procName1 = "Usp_ForgotPassword_Update";
                            //connection.Open();
                            user1 = connection.Query<User>(procName1, para1, commandType: CommandType.StoredProcedure).FirstOrDefault();

                            // UPDATE WRONG PASSWORD COUNT AND UNBLOCKE USER
                            var wrngpwdpara = new DynamicParameters();
                            wrngpwdpara.Add("@UserName", formdata.UserId);
                            wrngpwdpara.Add("@IsWrong", false);
                            const string wrngPwdProcName = "Usp_UpdateWrongPWDCount";
                            otpreturnList = connection.Query<OTPDetails>(wrngPwdProcName, wrngpwdpara, commandType: CommandType.StoredProcedure).FirstOrDefault();

                        }
                        else
                        {
                            status.Status = 0;
                            returnList = null;
                        }
                    }
                    status.LoginUser = returnList;
                    //kuntal
                    //var para1 = new DynamicParameters();
                    //para.Add("@Op_Mode", 1);
                    //para.Add("@UserId", formdata.UserId);
                    //para.Add("@Password", formdata.Password);
                    //const string procName1 = "Usp_ForgotPassword_Update";
                    //connection.Open();
                    //returnList = connection.Query<User>(procName1, para1, commandType: CommandType.StoredProcedure).FirstOrDefault();

                    return await Task.FromResult(status);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        //public async Task<ReturnMessage> UpdatePassword(User formdata)
        //{
        //    try
        //    {
        //        LoginUserStatus status = new LoginUserStatus();
        //        User returnList = new User();
        //        using (IDbConnection connection = base.GetConnection())
        //        {
        //            var para = new DynamicParameters();
        //            para.Add("@Op_Mode", 1);
        //            para.Add("@UserId", formdata.UserId);
        //            para.Add("@Password", formdata.Password);
        //            const string procName = "Usp_ForgotPassword_Update";
        //            connection.Open();
        //            returnList = connection.Query<User>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
        //            //return await Task.FromResult(returnList);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public async Task<List<UserMenu>> GetUserMenu(SearchMenu search)
        {
            try
            {
                List<UserMenu> returnList = new List<UserMenu>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", search.AutoUserId);
                    const string procName = "Usp_MenusAccess_GetByUserId";
                    connection.Open();
                    returnList = connection.Query<UserMenu>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> AddRoleWiseUser(RoleUserFormData formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@RoleId", formData.RoleId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_RoleUser_Insert";
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

        public async Task<ReturnMessage> DoctorsInsertUpdate(DoctorsInsertUpdateParam formData)
        {
            try
            {
                ReturnMessage rm = new ReturnMessage();
                //string SaltKey = Guid.NewGuid().ToString();
                //string EncodePass = CommonUtility.EncodePassword(formData.Password, SaltKey);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@DoctorsId", formData.DoctorsId);
                    para.Add("@DoctorsName", formData.DoctorsName);
                    para.Add("@EmailId", formData.EmailId);
                    //para.Add("@SaltKey", SaltKey);
                    // para.Add("@Password", EncodePass);
                    para.Add("@IsActive", formData.IsActive);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    const string procName = "Usp_Doctors_InsertUpdate";
                    connection.Open();
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 1 && formData.DoctorsId == 0)
                    {


                        string EmailBody = "<html>" +
                            "<head></head>" +
                            "<body style='font-family:calibri;'>" +
                            "<h3>Hi " + formData.DoctorsName + ",</h3>" +
                            "<h4>Your doctor id had been created successfully. Please find the below details </h4>" +
                            "<h4>User Id :" + rm.DoctorsNo + ",</h4>" +
                            "<h4>Password : welcome@1234 </h4>" +
                            "<br/>" +
                            "</body>" +
                            "</html>";
                        // CommonUtility.sendEmailViaWebApi(formData.EmailId, "Doctor's Registration -  MRF Limited", EmailBody);
                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 4, 0, formData.EmailId, EmailBody, "Doctor's Registration -  MRF Limited", Convert.ToInt32(formData.CreatedBy));

                    }
                    if (rm.SuccessFlag == 1 && formData.DoctorsId != 0)
                    {


                        string EmailBody = "<html>" +
                            "<head></head>" +
                            "<body style='font-family:calibri;'>" +
                            "<h3>Hi " + formData.DoctorsName + ",</h3>" +
                            "<h4>Your doctor's details has been updated successfully. Please find the below details </h4>" +
                            "<h4>User Id :" + rm.DoctorsNo + ",</h4>" +
                            "<h4>Password : welcome@1234 </h4>" +
                            "<br/>" +
                            "</body>" +
                            "</html>";
                        // CommonUtility.sendEmailViaWebApi(formData.EmailId, "Doctor's Details Update -  MRF Limited", EmailBody);
                        CommonUtility.InsertInMailTable(connection, Convert.ToInt32(rm.Id), 0, 0, 4, 0, formData.EmailId, EmailBody, "Doctor's Details Update -  MRF Limited", Convert.ToInt32(formData.CreatedBy));

                    }
                    return await Task.FromResult(rm);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<EDMSLinkAuthorization> GetEMDSLinkAuthorization(EDMSLinkAuthorizationSearch formdata)
        {
            try
            {
                EDMSLinkAuthorization returnList = new EDMSLinkAuthorization();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@AutoUserId", formdata.AutoUserId);
                    const string procName = "Usp_MenusAccess_For_EDMS_GetByUserId";
                    connection.Open();
                    returnList = connection.Query<EDMSLinkAuthorization>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public async Task<List<EDMSAccessUsers>> GetAllEDMSAccessUsersList(EDMSAccessUserSearch search)
        {
            try
            {
                List<EDMSAccessUsers> returnList = new List<EDMSAccessUsers>();
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    para.Add("@VerticalId", search.VerticalId);
                    const string procName = "Usp_UserWiseEDMSAccess_GetAll";
                    connection.Open();
                    returnList = connection.Query<EDMSAccessUsers>(procName, para, commandType: CommandType.StoredProcedure).ToList();
                    return await Task.FromResult(returnList);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<ReturnMessage> AddEDMSAccessForUsers(EDMSAccessUsersFormData formData)
        {
            try
            {

                // DataTable dtEDMSAccessUser = CommonUtility.ToDataTable<UserWiseEDMSAccessFormData>(formData.UserWiseEDMSAccess);
                ReturnMessage rm = new ReturnMessage();
                DataTable dtUserWiseRoleVerticalFunctionDetails;
                DataTable dtFunctionLocationDetails;
                dtUserWiseRoleVerticalFunctionDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleVerticalFunctionDetails>(formData.VerticalFunctionDetails);
                dtFunctionLocationDetails = CommonUtility.ToDataTable<UDT_UserWiseRoleFunctionLocationDetails>(formData.FunctionLocationDetails);
                using (IDbConnection connection = base.GetConnection())
                {
                    var para = new DynamicParameters();
                    // para.Add("@UserWiseEDMSAccess", dtEDMSAccessUser, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@Id", formData.Id);
                    para.Add("@RoleId", formData.RoleId);
                    para.Add("@AutoUserId", formData.AutoUserId);
                    para.Add("@VerticalId", formData.VerticalId);
                    para.Add("@FunctionId", formData.FunctionId);
                    para.Add("@GradeId", formData.GradeId);
                    para.Add("@CanAccess", formData.CanAccess);
                    para.Add("@CreatedBy", formData.CreatedBy);
                    para.Add("@VerticalFunction", dtUserWiseRoleVerticalFunctionDetails, DbType.Object, ParameterDirection.Input, null);
                    para.Add("@FunctionLocation", dtFunctionLocationDetails, DbType.Object, ParameterDirection.Input, null);
                    const string procName = "Usp_UserWiseEDMSAccess_InsertUpdate";
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

        public async Task<ReturnValues> AzuretableCallOnLogInout(UserNameClass userNameClass, string eventType)
        {
            try
            {
                // get ip address
                string hostName = Dns.GetHostName();
                ReturnValues returnValues = new ReturnValues();

                System.Net.IPAddress[] ipAddresses = Dns.GetHostAddresses(hostName);
                string ipAddress = string.Empty;
                foreach (var ip in ipAddresses)
                {
                    if (ip.AddressFamily == AddressFamily.InterNetwork)
                    {
                        ipAddress = ip.ToString();
                        break;
                    }
                }

                //get UAT / prod link
                var connectionString = base.GetConnection();
                string envriment = "";

                if (connectionString.Database == "MRFHRPortalUATDB")
                {
                    envriment = "UAT";
                }
                if (connectionString.Database == "MRFHRPortal")
                {
                    envriment = "Production";
                }

                var _httpClient = new HttpClient();
                string apiUrl = "https://mrfapplicationusagelog.azurewebsites.net/api/AzureDataPost/ApplicationLogDetails";
                string jsonContent =
                    "{\"applicationName\": \"HRPortal\"," +
                    "\"eventType\": \"" + eventType + "\"," +
                    "\"userName\": \"" + userNameClass.UserName + "\"," +
                    "\"EventOccurrenceTime\": \"" + DateTime.Now.ToString("yyyy-MM-dd h:mm:ss tt") + "\"," +
                    "\"applicationType\": \"" + envriment + "\"," +
                    "\"IPAddress\": \"" + ipAddress + "\"}";

                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                HttpResponseMessage response = await _httpClient.PostAsync(apiUrl, content);
                returnValues.IsSuccessStatusCode = response.IsSuccessStatusCode;
                return returnValues;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
