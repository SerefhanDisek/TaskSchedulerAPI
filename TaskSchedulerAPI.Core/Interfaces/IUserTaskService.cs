namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface IUserTaskService
    {
        Task AssignTaskToUser(int userId, int taskId);
    }
}
