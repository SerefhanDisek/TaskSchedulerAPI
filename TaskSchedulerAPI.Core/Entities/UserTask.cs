namespace TaskSchedulerAPI.Core.Entities
{
    public class UserTask
    {
        public int UserId { get; set; }
        public User User { get; set; }
        public int TaskId { get; set; }
        public Tasks Tasks { get; set; }
        public DateTime AssignedAt { get; set; }
        public bool IsCompleted { get; set; }
    }
}
