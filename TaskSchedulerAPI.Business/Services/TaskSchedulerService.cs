using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.DataAccess;

namespace TaskSchedulerAPI.Business.Services
{
    public class TaskSchedulerService : ITaskSchedulerService
    {
        private readonly ITaskSchedulerRepository _taskSchedulerRepository;

        public TaskSchedulerService(ITaskSchedulerRepository taskSchedulerRepository)
        {
            _taskSchedulerRepository = taskSchedulerRepository;
        }

        public async Task<List<TaskDto>> GetActiveTasksAsync()
        {
            var userTasks = await _taskSchedulerRepository.GetUserTasksByCompletionStatusAsync(false);

            return userTasks.Select(ut => new TaskDto
            {
                Id = ut.Id, 
                Name = ut.Name, 
                IsCompleted = ut.IsCompleted
            }).ToList();
        }

        public async Task<List<TaskDto>> GetCompletedTasksAsync()
        {
            var userTasks = await _taskSchedulerRepository.GetUserTasksByCompletionStatusAsync(true);

            return userTasks.Select(ut => new TaskDto
            {
                Id = ut.Id, 
                Name = ut.Name, 
                IsCompleted = ut.IsCompleted
            }).ToList();
        }

        public async Task<bool> CompleteTaskAsync(int taskId)
        {
            var userTask = await _taskSchedulerRepository.GetUserTaskByTaskIdAsync(taskId);
            if (userTask != null && !userTask.IsCompleted)
            {
                userTask.IsCompleted = true; 
                await _taskSchedulerRepository.UpdateAsync(userTask);
                return true; 
            }
            return false; 
        }
    }
}
