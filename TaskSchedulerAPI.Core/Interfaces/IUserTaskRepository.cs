using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface IUserTaskRepository
    {
        Task AddAsync(UserTask userTask);
    }
}
