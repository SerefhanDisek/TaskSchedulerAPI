namespace TaskSchedulerAPI.Core.DTOs
{
    public class TaskAssignmentDto
    {
        public int TaskId { get; set; }
        public string TaskName { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }    
    }
}
