using System.Linq.Expressions;
using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Tasks>> GetAllAsync();
        Task DeleteAsync(Tasks task);
        Task<Tasks> GetByIdAsync(int id);
        Task UpdateAsync(Tasks task);
        Task AddAsync(Tasks task);
        Task Update(Tasks task);
        Task SaveChangesAsync();
        Task<List<Tasks>> GetAllAsync(Expression<Func<Tasks, bool>> predicate);
        Task<IEnumerable<Tasks>> GetActiveTasksAsync();
        Task<List<Tasks>> GetUserTasksByCompletionStatusAsync(bool isCompleted);
        Task<Tasks> GetTaskByIdAsync(int taskId);
    }
}
