using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.Entities
{
    public class Log
    {
        public int Id { get; set; }  
        public DateTime Timestamp { get; set; }  
        public string LogLevel { get; set; }  
        public string Message { get; set; }  
        public string Exception { get; set; }  
        public string UserId { get; set; }  
        public string Source { get; set; }  
        public string RequestId { get; set; }  
    }

}
