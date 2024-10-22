namespace TaskSchedulerAPI.Core.DTOs
{
    public class TaskDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public DateTime DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int? AssignedUserId { get; set; }
    }
}
