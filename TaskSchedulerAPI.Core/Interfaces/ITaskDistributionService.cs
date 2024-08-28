namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskDistributionService
    {
        Task DistributeTasksAsync();
        Task<bool> AssignTaskToUserAsync(int taskId, int userId);
        Task<bool> UpdateTaskAssignmentAsync(int taskId, int userId);
    }
}
