using Microsoft.EntityFrameworkCore;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.DataAccess.Repositories
{
    public class TaskSchedulerRepository : ITaskSchedulerRepository
    {
        private readonly TaskSchedulerDbContext _context;

        public TaskSchedulerRepository(TaskSchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<UserTask> GetByIdAsync(int taskId)
        {
            return await _context.UserTasks.FindAsync(taskId);
        }

        public async Task<List<UserTask>> GetTasksByCompletionStatusAsync(bool isCompleted)
        {
            return await _context.UserTasks.Where(t => t.IsCompleted == isCompleted).ToListAsync();
        }

        public async Task<List<Tasks>> GetUserTasksByCompletionStatusAsync(bool isCompleted)
        {
            return await _context.UserTasks
                .Where(ut => ut.IsCompleted == isCompleted)
                .Select(ut => ut.Tasks) 
                .ToListAsync();
        }

        public async Task<UserTask> GetUserTaskByTaskIdAsync(int taskId)
        {
            return await _context.UserTasks
                .FirstOrDefaultAsync(ut => ut.TaskId == taskId);
        }

        public async Task UpdateAsync(UserTask task)
        {
            _context.UserTasks.Update(task);
            await _context.SaveChangesAsync();
        }
    }
}
