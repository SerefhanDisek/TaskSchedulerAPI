using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskSchedulerAPI.Core.DTOs;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskSchedulerService
    {
        Task<List<TaskDto>> GetActiveTasksAsync();
        Task<List<TaskDto>> GetCompletedTasksAsync();
        Task<bool> CompleteTaskAsync(int taskId);
    }
}
