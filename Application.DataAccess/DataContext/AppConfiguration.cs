using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace Application.DataAccess.DataContext
{
    public class AppConfiguration
    {
        //Constructor
        public AppConfiguration()
        {
            var configBuilder = new ConfigurationBuilder();
            var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configBuilder.AddJsonFile(path, false);
            var root = configBuilder.Build();
            var appSetting = root.GetSection("ConnectionStrings:DefaultConnection");
            var storageAccountforconn = root.GetSection("StorageAccounts:StorageAccount"); // Added by Amartya
            var storageAccountkey = root.GetSection("StorageAccounts:StorageAccountKey"); // Added by Sayandeep
            var storageAccountname = root.GetSection("StorageAccountName:keyValue"); // Added by Sayandeep
            var appSetting_ContainerName = root.GetSection("ContainerName:keyValue");
            var appSetting_AzureConnectionString = root.GetSection("AzureConnectionString:keyValue");
            var appSetting_BlobEndPoint = root.GetSection("BlobEndPoint:keyValue"); // Added by Sayandeep
            sqlConnectionString = appSetting.Value;
            ContainerName = appSetting_ContainerName.Value;
            AzureConnectionString = appSetting_AzureConnectionString.Value;
            StorageAccount = storageAccountforconn.Value; // Added by Amartya
            BlobEndPoint = appSetting_BlobEndPoint.Value; // Added by Sayandeep
            StorageAccountName = storageAccountname.Value;
            StorageAccountKey = storageAccountkey.Value;
        }
        public string sqlConnectionString { get; set; }
        public string ContainerName { get; set; }
        public string StorageKey { get; set; }
        public string StorageAccountName { get; set; }
        public string StorageAccountKey { get; set; }
        public string AzureConnectionString { get; set; }
        public string StorageAccount { get; set; } // Added by Amartya
        public string BlobEndPoint { get; set; }
    }
}
