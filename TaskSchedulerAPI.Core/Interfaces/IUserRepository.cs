using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User> GetByIdAsync(int id);
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task DeleteAsync(User user);
        Task<User> GetByUserNameAsync(string userName);
    }
}
