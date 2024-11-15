using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetAllTasksAsync();
        Task<TaskDto> GetTaskByIdAsync(int id);
        Task<TaskDto> CreateTaskAsync(TaskCreateDto taskDto);
        Task<bool> UpdateTaskAsync(TaskUpdateDto taskUpdateDto);
        Task<bool> DeleteTaskAsync(int id);
        Task<List<Tasks>> GetUncompletedTasksAsync();
        Task<bool> UpdateTaskAssignmentAsync(int taskId, int userId);
        Task<bool> MarkTaskAsDoneAsync(int taskId);
        Task<List<TaskDto>> GetCompletedTasksAsync();
        Task<TaskDetailsDto> GetTaskDetailsAsync(int taskId);
    }
}

