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

        // UserTask'ı ID ile bulma
        public async Task<UserTask> GetByIdAsync(int taskId)
        {
            return await _context.UserTasks.FindAsync(taskId);
        }

        // Tamamlanma durumuna göre UserTask'ları al
        public async Task<List<UserTask>> GetTasksByCompletionStatusAsync(bool isCompleted)
        {
            return await _context.UserTasks.Where(t => t.IsCompleted == isCompleted).ToListAsync();
        }

        // Kullanıcı görevlerini tamamlanma durumuna göre al
        public async Task<List<Tasks>> GetUserTasksByCompletionStatusAsync(bool isCompleted)
        {
            return await _context.UserTasks
                .Where(ut => ut.IsCompleted == isCompleted)
                .Select(ut => ut.Tasks) // UserTask'tan Tasks'a geçiş yap
                .ToListAsync();
        }

        // Görev ID'sine göre UserTask al
        public async Task<UserTask> GetUserTaskByTaskIdAsync(int taskId)
        {
            return await _context.UserTasks
                .FirstOrDefaultAsync(ut => ut.TaskId == taskId);
        }

        // UserTask'ı güncelle
        public async Task UpdateAsync(UserTask task)
        {
            _context.UserTasks.Update(task);
            await _context.SaveChangesAsync();
        }
    }
}
