using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Mail;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;

// Added by anif from here on 08-11-2022
using System.IO;
using Dapper;
using System.Configuration;
using System.Data.Common;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Reflection.Metadata;
//using System.Web.UI;
using System.Xml.Linq;


using iTextSharp.text;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using Document = iTextSharp.text.Document;
using PageSize = iTextSharp.text.PageSize;
using Application.Entity.Entities.CommonModule;

namespace Application.DataAccess.Utility
{
    public static class CommonUtility
    {
        public static DataTable ToDataTable<T>(List<T> items)
        {
            DataTable dataTable = new DataTable(typeof(T).Name);
            PropertyInfo[] Props = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance);
            foreach (PropertyInfo prop in Props)
            {
                var type = (prop.PropertyType.IsGenericType && prop.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>) ? Nullable.GetUnderlyingType(prop.PropertyType) : prop.PropertyType);
                dataTable.Columns.Add(prop.Name, type);
            }
            foreach (T item in items)
            {
                var values = new object[Props.Length];
                for (int i = 0; i < Props.Length; i++)
                {
                    values[i] = Props[i].GetValue(item, null);
                }
                dataTable.Rows.Add(values);
            }
            return dataTable;
        }

        public static string EncodePassword(string pass, string salt)
        {
            string EncodePass = "";
            try
            {
                byte[] bytes = Encoding.Unicode.GetBytes(pass);
                byte[] src = Encoding.Unicode.GetBytes(salt);
                byte[] dst = new byte[src.Length + bytes.Length];
                System.Buffer.BlockCopy(src, 0, dst, 0, src.Length);
                System.Buffer.BlockCopy(bytes, 0, dst, src.Length, bytes.Length);
                HashAlgorithm algorithm = HashAlgorithm.Create("SHA1");
                byte[] inArray = algorithm.ComputeHash(dst);
                EncodePass = EncodePasswordMd5(Convert.ToBase64String(inArray));
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return EncodePass;
        }
        //Encrypt using MD5
        public static string EncodePasswordMd5(string pass)
        {
            string MD5Str = "";
            try
            {
                Byte[] originalBytes;
                Byte[] encodedBytes;
                MD5 md5;
                md5 = new MD5CryptoServiceProvider();
                originalBytes = ASCIIEncoding.Default.GetBytes(pass);
                encodedBytes = md5.ComputeHash(originalBytes);
                MD5Str = BitConverter.ToString(encodedBytes);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return MD5Str;
        }

        public static void sendEmailViaWebApi(string mailto, string Subject, string EmailBody)
        {
            try
            {



                // UAT

                string StrSmtpServer = "smtp.office365.com";
                string StrsmtpPort = "587";
                string StrsmtpUser = "mrfdigitaluat@mrftyres.co.in";
                string StrsmtpPass = "Jaz21568";

                // PROD

                //string StrSmtpServer = "smtp.office365.com";
                //string StrsmtpPort = "587";
                //string StrsmtpUser = "hrconnect@mrftyres.co.in";
                //string StrsmtpPass = "Jun60846";

                string StrEnableSsl = "true";
                string StrIsEmailRequired = "true";
                string StrDisplayName = "MRF HR-Connect";
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(StrSmtpServer);
                MailMessage message = new MailMessage();
                // UAT
                message.From = new MailAddress("mrfembee@mrftyres.co.in", StrDisplayName);
                // PROD
                //message.From = new MailAddress(StrsmtpUser, StrDisplayName);

                message.To.Add(new MailAddress(mailto));
                message.IsBodyHtml = true;
                message.Subject = Subject;
                message.Body = EmailBody;
                SmtpServer.Port = Convert.ToInt32(StrsmtpPort);
                if (StrIsEmailRequired == "true")
                {
                    SmtpServer.Credentials = new System.Net.NetworkCredential(StrsmtpUser, StrsmtpPass);
                }
                else
                {
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                }

                SmtpServer.EnableSsl = bool.Parse(StrEnableSsl);
                SmtpServer.Send(message);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        // Addded By anif on 08-11-2022
        //[Obsolete]
        public static void SendEmailViaWebApiWithAttachment(string mailto, string Subject, string EmailBody, string inductionDetailsHtml, string accommodationHtml)
        {
            using (StringWriter sw = new StringWriter())
            {

                StringBuilder sb = new StringBuilder();
                sb.Append("<html>" +
                 "<head></head>" +
                 "<body style='font-family:calibri;'>" +
                accommodationHtml +
                 "</body>" +
                 "</html>");
                StringBuilder sb1 = new StringBuilder();
                sb1.Append("<html>" +
                 "<head></head>" +
                 "<body style='font-family:calibri;'>" +
                inductionDetailsHtml +
                 "</body>" +
                 "</html>");
                StringReader sr = new StringReader(sb.ToString());
                StringReader sr1 = new StringReader(sb1.ToString());

                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                Document pdfDoc1 = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);
                HTMLWorker htmlparser1 = new HTMLWorker(pdfDoc1);

                // UAT

                string StrSmtpServer = "smtp.office365.com";
                string StrsmtpPort = "587";
                string StrsmtpUser = "mrfdigitaluat@mrftyres.co.in";
                string StrsmtpPass = "Jaz21568";

                // PROD

                //string StrSmtpServer = "smtp.office365.com";
                //string StrsmtpPort = "587";
                //string StrsmtpUser = "hrconnect@mrftyres.co.in";
                //string StrsmtpPass = "Jun60846";


                string StrEnableSsl = "true";
                string StrIsEmailRequired = "true";
                string StrDisplayName = "MRF HR-Connect";
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(StrSmtpServer);
                MailMessage message = new MailMessage();
                // UAT
                message.From = new MailAddress("mrfembee@mrftyres.co.in", StrDisplayName);
                // PROD
                //message.From = new MailAddress(StrsmtpUser, StrDisplayName);

                message.To.Add(new MailAddress(mailto));
                message.IsBodyHtml = true;
                message.Subject = Subject;
                message.Body = EmailBody;

                if (accommodationHtml!="")
                {
                    using (MemoryStream memoryStream = new MemoryStream())
                    {
                        PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                        pdfDoc.Open();
                        htmlparser.Parse(sr);
                        pdfDoc.Close();
                        byte[] bytes = memoryStream.ToArray();
                        memoryStream.Close();
                        message.Attachments.Add(new Attachment(new MemoryStream(bytes), "AccommodationDetails.pdf"));
                    }
                }
                if (inductionDetailsHtml!="")
                {
                    using (MemoryStream memoryStream1 = new MemoryStream())
                    {

                        PdfWriter writer1 = PdfWriter.GetInstance(pdfDoc1, memoryStream1);
                        pdfDoc1.Open();
                        htmlparser1.Parse(sr1);
                        pdfDoc1.Close();
                        byte[] bytes1 = memoryStream1.ToArray();
                        memoryStream1.Close();
                        message.Attachments.Add(new Attachment(new MemoryStream(bytes1), "InductionDetails.pdf"));
                    }
                }
              


                SmtpServer.Port = Convert.ToInt32(StrsmtpPort);
                if (StrIsEmailRequired == "true")
                {
                    SmtpServer.Credentials = new System.Net.NetworkCredential(StrsmtpUser, StrsmtpPass);
                }
                else
                {
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                }

                SmtpServer.EnableSsl = bool.Parse(StrEnableSsl);
                SmtpServer.Send(message);
            }
        }

        // Addded By anif on 15-11-2022
        [Obsolete]
        public static void sendEmailViaWebApiWithInductionAttachmebt(string mailto, string Subject, string EmailBody, string inductionHtml)
        {
            using (StringWriter sw = new StringWriter())
            {

                StringBuilder sb = new StringBuilder();
                sb.Append("<html>" +
                 "<head></head>" +
                 "<body style='font-family:calibri;'>" +
                inductionHtml +
                 "</body>" +
                 "</html>");

                StringReader sr = new StringReader(sb.ToString());

                Document pdfDoc = new Document(PageSize.A4, 10f, 10f, 10f, 0f);
                HTMLWorker htmlparser = new HTMLWorker(pdfDoc);

                // UAT

                string StrSmtpServer = "smtp.office365.com";
                string StrsmtpPort = "587";
                string StrsmtpUser = "mrfdigitaluat@mrftyres.co.in";
                string StrsmtpPass = "Jaz21568";

                //  PROD

                //string StrSmtpServer = "smtp.office365.com";
                //string StrsmtpPort = "587";
                //string StrsmtpUser = "hrconnect@mrftyres.co.in";
                //string StrsmtpPass = "Jun60846";

                string StrEnableSsl = "true";
                string StrIsEmailRequired = "true";
                string StrDisplayName = "MRF HR-Connect";
                MailMessage mail = new MailMessage();
                SmtpClient SmtpServer = new SmtpClient(StrSmtpServer);
                MailMessage message = new MailMessage();
                // UAT
                message.From = new MailAddress("mrfembee@mrftyres.co.in", StrDisplayName);
                // PROD
                //message.From = new MailAddress(StrsmtpUser, StrDisplayName);

                message.To.Add(new MailAddress(mailto));
                message.IsBodyHtml = true;
                message.Subject = Subject;
                message.Body = EmailBody;

                using (MemoryStream memoryStream = new MemoryStream())
                {
                    PdfWriter writer = PdfWriter.GetInstance(pdfDoc, memoryStream);
                    pdfDoc.Open();
                    htmlparser.Parse(sr);
                    pdfDoc.Close();
                    byte[] bytes = memoryStream.ToArray();
                    memoryStream.Close();
                    message.Attachments.Add(new Attachment(new MemoryStream(bytes), "InductionDetails.pdf"));
                }
                SmtpServer.Port = Convert.ToInt32(StrsmtpPort);
                if (StrIsEmailRequired == "true")
                {
                    SmtpServer.Credentials = new System.Net.NetworkCredential(StrsmtpUser, StrsmtpPass);
                }
                else
                {
                    SmtpServer.UseDefaultCredentials = true;
                    SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                }

                SmtpServer.EnableSsl = bool.Parse(StrEnableSsl);
                SmtpServer.Send(message);
            }
        }

        public static void InsertInMailTable(IDbConnection connection,int CandidateId,int HiringStatusId,int SourceChannelId,int EmailTypeId,int EmailTemplateId,string ToEmailId,string EmailBody,string EmailSubject,int CreatedBy)
        {
            try
            {
                using (connection)
                {
                    ReturnMessage rm = new ReturnMessage();
                    var para = new DynamicParameters();
                    para.Add("@CandidateId",CandidateId);
                    para.Add("@HiringStatusId",HiringStatusId);
                    para.Add("@SourceChannelId",SourceChannelId);
                    para.Add("@EmailTypeId",EmailTypeId);
                    para.Add("@EmailTemplateId",EmailTemplateId);
                    para.Add("@ToEmailId",ToEmailId);
                    para.Add("@EmailBody",EmailBody);
                    para.Add("@EmailSubject",EmailSubject);
                    para.Add("@CreatedBy",CreatedBy);
                    const string procName = "Usp_Insert_MailIdsFOrSendingMail";
                    rm = connection.Query<ReturnMessage>(procName, para, commandType: CommandType.StoredProcedure).FirstOrDefault();
                    if (rm.SuccessFlag == 0)
                    {
                        throw new Exception();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }


}
