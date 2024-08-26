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
    }
}
