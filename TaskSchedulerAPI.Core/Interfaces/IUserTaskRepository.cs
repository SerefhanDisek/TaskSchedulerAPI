using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.DataAccess.Repositories
{
    public interface IUserTaskRepository
    {
        Task<List<UserTask>> GetAllUserTasksAsync();
        Task<UserTask> GetUserTaskByIdAsync(int id);
        Task CreateUserTaskAsync(UserTask userTask);
        Task UpdateUserTaskAsync(UserTask userTask);
        Task DeleteUserTaskAsync(int id);
        Task<List<UserTask>> GetTasksByUserIdAsync(int userId);
        Task AddAsync(UserTask userTask);
        Task<List<UserTask>> GetUserTasksAsync(int userId); 
    }
}
