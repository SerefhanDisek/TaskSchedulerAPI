using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskDistributionService
    {
        Task<List<TaskDto>> GetActiveTasksAsync(); 
        Task<List<UserDto>> GetUsersAsync();
        Task<List<TaskAssignmentDto>> DistributeTasksAsync();
        Task<bool> AssignTaskToUserAsync(int taskId, int userId); 
        Task<bool> UpdateTaskAssignmentAsync(int taskId, int userId);
        Task<bool> ConfirmAssignmentsAsync(List<TaskAssignmentDto> assignments);
        //Task<List<Tasks>> GetActiveTasksWithUsersAsync();
        Task<List<TaskWithUsersDto>> GetActiveTasksWithUsersAsync();
    }

}
