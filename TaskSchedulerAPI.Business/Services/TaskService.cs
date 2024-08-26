using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces.Services;

namespace TaskSchedulerAPI.Business.Services
{
    public class TaskService : ITaskService
    {
        public Task<TaskDto> CreateTaskAsync(TaskCreateDto taskDto)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteTaskAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            throw new NotImplementedException();
        }

        public Task<TaskDto> GetTaskByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateTaskAsync(int id, TaskUpdateDto taskDto)
        {
            throw new NotImplementedException();
        }
    }
}
