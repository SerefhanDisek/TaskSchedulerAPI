using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TaskSchedulerAPI.Core.Interfaces;
using Tasks = TaskSchedulerAPI.Core.Entities.Tasks;

namespace TaskSchedulerAPI.DataAccess.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskSchedulerDbContext _context;

        public TaskRepository(TaskSchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tasks>> GetAllAsync()
        {
            return await _context.Tasks.ToListAsync();
        }

        public async Task<Tasks> GetByIdAsync(int id)
        {
            return await _context.Tasks.FindAsync(id);
        }

        public async Task AddAsync(Tasks task)
        {
            await _context.Tasks.AddAsync(task);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Tasks task)
        {
            _context.Tasks.Update(task);
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Tasks task)
        {
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Tasks task)
        {
            _context.Tasks.Update(task);
            await _context.SaveChangesAsync();
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<List<Tasks>> GetAllAsync(Expression<Func<Tasks, bool>> predicate)
        {
            return await _context.Set<Tasks>().Where(predicate).ToListAsync();
        }

        public async Task<IEnumerable<Tasks>> GetActiveTasksAsync()
        {
            return await _context.Tasks
                .Where(task => !task.IsCompleted) 
                .ToListAsync();
        }
        public async Task<List<Tasks>> GetUserTasksByCompletionStatusAsync(bool isCompleted)
        {
            return await _context.UserTasks
                .Where(ut => ut.IsCompleted == isCompleted)
                .Select(ut => ut.Tasks)
                .ToListAsync();
        }
    }
}
