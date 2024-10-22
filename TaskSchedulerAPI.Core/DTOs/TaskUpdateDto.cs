namespace TaskSchedulerAPI.Core.DTOs
{
    public class TaskUpdateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Priority { get; set; }
        public DateTime DueDate { get; set; }
    }
}
