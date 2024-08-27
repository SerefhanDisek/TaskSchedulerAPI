namespace TaskSchedulerAPI.Core.Entities
{
    public class Tasks
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? AssignedUserId { get; set; }
        public ICollection<UserTask> UserTasks { get; set; }

    }
}
