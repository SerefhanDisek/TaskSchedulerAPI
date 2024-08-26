namespace TaskSchedulerAPI.Core.DTOs
{
    public class LogDto
    {
        public DateTime Timestamp { get; set; }
        public string LogLevel { get; set; }
        public string Message { get; set; }
        public string Exception { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string Source { get; set; }
        public string RequestId { get; set; }
    }

}
