using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskSchedulerRepository
    {
        Task<UserTask> GetByIdAsync(int taskId); 
        Task<List<UserTask>> GetTasksByCompletionStatusAsync(bool isCompleted); 
        Task<List<Tasks>> GetUserTasksByCompletionStatusAsync(bool isCompleted); 
        Task<UserTask> GetUserTaskByTaskIdAsync(int taskId); 
        Task UpdateAsync(UserTask task); 
    }

}
