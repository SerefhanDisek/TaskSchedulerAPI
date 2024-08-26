using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;

namespace TaskSchedulerAPI.DataAccess.Repositories
{
    public class UserTaskRepository : IUserTaskRepository
    {
        private readonly TaskSchedulerDbContext _context;

        public UserTaskRepository(TaskSchedulerDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(UserTask userTask)
        {
            await _context.UserTasks.AddAsync(userTask);
            await _context.SaveChangesAsync();
        }
    }
}
