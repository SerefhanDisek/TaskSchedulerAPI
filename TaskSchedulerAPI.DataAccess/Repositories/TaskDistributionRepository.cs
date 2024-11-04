using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.DataAccess;

public class TaskDistributionRepository : ITaskDistributionRepository
{
    private readonly TaskSchedulerDbContext _context;

    public TaskDistributionRepository(TaskSchedulerDbContext context)
    {
        _context = context;
    }

    public async Task<List<Tasks>> GetActiveTasksAsync()
    {
        return await _context.Tasks
                             .Where(t => !_context.UserTasks.Any(ut => ut.TaskId == t.Id && ut.IsCompleted))
                             .ToListAsync();
    }

    public async Task<List<User>> GetUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task AssignTaskAsync(int taskId, int userId)
    {
        var userTask = new UserTask
        {
            TaskId = taskId,
            UserId = userId,
            AssignedAt = DateTime.Now,
            IsCompleted = false
        };
        _context.UserTasks.Add(userTask);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateTaskAssignmentsAsync(List<UserTask> assignments)
    {
        foreach (var assignment in assignments)
        {
            var userTask = await _context.UserTasks
                                          .FirstOrDefaultAsync(ut => ut.TaskId == assignment.TaskId && ut.UserId == assignment.UserId);

            if (userTask != null)
            {
                userTask.IsCompleted = assignment.IsCompleted;
                userTask.AssignedAt = assignment.AssignedAt;
            }
            else
            {
                _context.UserTasks.Add(new UserTask
                {
                    TaskId = assignment.TaskId,
                    UserId = assignment.UserId,
                    AssignedAt = assignment.AssignedAt,
                    IsCompleted = assignment.IsCompleted
                });
            }
        }
        await _context.SaveChangesAsync();
    }
}
