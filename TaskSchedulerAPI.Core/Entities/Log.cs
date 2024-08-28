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
        public int? TaskId { get; set; }  
        public string TaskName { get; set; }  
        public int? AssignedUserId { get; set; }  
        public string AssignedUserName { get; set; }  
        public DateTime? AssignmentDate { get; set; }  
    }


}
