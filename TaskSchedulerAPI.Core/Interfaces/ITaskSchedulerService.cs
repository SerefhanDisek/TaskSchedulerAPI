using TaskSchedulerAPI.Core.DTOs;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskSchedulerService
    {
        Task<List<TaskDto>> GetActiveTasksAsync();
        Task<List<TaskDto>> GetCompletedTasksAsync();
        Task<bool> CompleteTaskAsync(int taskId);
    }
}
