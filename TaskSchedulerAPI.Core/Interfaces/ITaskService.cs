using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasksAsync();
        Task<TaskDto> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTaskAsync(TaskCreateDto taskDto);
        Task<bool> UpdateTaskAsync(int id, TaskUpdateDto taskDto);
        Task<bool> DeleteTaskAsync(int id);
        Task<List<Tasks>> GetUncompletedTasksAsync();
    }
}

