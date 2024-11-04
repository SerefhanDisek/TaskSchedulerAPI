namespace TaskSchedulerAPI.Core.DTOs
{
    public class UpdateTaskAssignmentRequest
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }
    }
}
