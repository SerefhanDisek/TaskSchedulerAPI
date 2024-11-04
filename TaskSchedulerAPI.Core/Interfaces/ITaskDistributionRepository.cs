using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskDistributionRepository
    {
        Task<List<Tasks>> GetActiveTasksAsync();
        Task<List<User>> GetUsersAsync();
        Task AssignTaskAsync(int taskId, int userId);
        Task UpdateTaskAssignmentsAsync(List<UserTask> assignments);
    }

}
