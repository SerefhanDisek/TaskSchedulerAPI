using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
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

        public async Task<List<UserTask>> GetAllUserTasksAsync()
        {
            return await _context.UserTasks.ToListAsync();
        }

        public async Task<UserTask> GetUserTaskByIdAsync(int id)
        {
            return await _context.UserTasks.FindAsync(id);
        }

        public async Task CreateUserTaskAsync(UserTask userTask)
        {
            await _context.UserTasks.AddAsync(userTask);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserTaskAsync(UserTask userTask)
        {
            _context.UserTasks.Update(userTask);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUserTaskAsync(int id)
        {
            var userTask = await _context.UserTasks.FindAsync(id);
            if (userTask != null)
            {
                _context.UserTasks.Remove(userTask);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<UserTask>> GetTasksByUserIdAsync(int userId)
        {
            return await _context.UserTasks.Where(ut => ut.UserId == userId).ToListAsync();
        }

        public async Task<List<UserTask>> GetUserTasksAsync(int userId)
        {
            return await _context.UserTasks
                .Where(ut => ut.UserId == userId)
                .ToListAsync();
        }

        public Task AddAsync(UserTask userTask)
        {
            throw new NotImplementedException();
        }
    }
}
