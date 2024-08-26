using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.Entities
{
    public class SystemSettings
    {
        public int Id { get; set; }  
        public string ApplicationName { get; set; }  
        public string DefaultLanguage { get; set; }  
        public bool MaintenanceMode { get; set; }  
    }

}
