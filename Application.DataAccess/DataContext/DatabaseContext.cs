using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Application.DataAccess.DataContext
{
    public class DatabaseContext
    {
        private readonly AppConfiguration appConfiguration;

        public DatabaseContext(AppConfiguration appConfiguration)
        {
            this.appConfiguration = appConfiguration;
        }

        protected IDbConnection GetConnection()
        {
            return new SqlConnection(this.appConfiguration.sqlConnectionString);
        }
        public string GetContainerName()
        {
            return this.appConfiguration.ContainerName.ToString();
        }

        public IDbConnection GetStorageKey()
        {
            return new SqlConnection(this.appConfiguration.StorageKey);
        }
        public IDbConnection GetStorageAccountName()
        {
            return new SqlConnection(this.appConfiguration.StorageAccountName);
        }
        public string GetAzureConnectionString()
        {
            return this.appConfiguration.AzureConnectionString.ToString();
        }        
        public string FileUploadToBlob() // Added by Amartya        
        {            
	        return this.appConfiguration.StorageAccount.ToString();        
        }
        public string GetBlobEndPoint() // Added by Sayandeep        
        {
            return this.appConfiguration.BlobEndPoint.ToString();
        }
        public string GetStorgeAccountKey()
        {
            return this.appConfiguration.StorageAccountKey.ToString();
        }
        public string GetStorgeAccountName()
        {
            return this.appConfiguration.StorageAccountName.ToString();
        }
    }
}
