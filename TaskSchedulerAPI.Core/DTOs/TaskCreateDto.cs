namespace TaskSchedulerAPI.Core.DTOs
{
    public class TaskCreateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}
