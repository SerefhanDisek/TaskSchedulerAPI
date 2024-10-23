using TaskSchedulerAPI.Core.DTOs;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskDistributionService
    {
        Task<List<TaskDto>> GetActiveTasksAsync(); 
        Task<List<UserDto>> GetUsersAsync(); 
        Task DistributeTasksAsync(); 
        Task<bool> AssignTaskToUserAsync(int taskId, int userId); 
        Task<bool> UpdateTaskAssignmentAsync(int taskId, int userId); 
    }

}
