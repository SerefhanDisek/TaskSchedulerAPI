using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;
using TaskSchedulerAPI.DataAccess.Repositories;

namespace TaskSchedulerAPI.Business.Services
{
    public class TaskService : ITaskService
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        private readonly TaskSchedulerDbContext _context;

        public TaskService (ITaskRepository taskRepository, IMapper mapper, TaskSchedulerDbContext context)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
            _context = context;
        }

        public async Task<TaskDto> CreateTaskAsync(TaskCreateDto taskDto)
        {
            var task = _mapper.Map<Tasks>(taskDto);
            await _taskRepository.AddAsync(task);
            return _mapper.Map<TaskDto>(task);
        }

        public async Task<IEnumerable<TaskDto>> GetAllTasksAsync()
        {
            var task = await _taskRepository.GetAllAsync();
            return _mapper .Map<IEnumerable<TaskDto>>(task);
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            if (task == null) return false;

            await _taskRepository.DeleteAsync(task);
            return true;
        }

        public async Task<TaskDto> GetTaskByIdAsync(int id)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            return _mapper.Map<TaskDto>(task);
        }

        public async Task<bool> UpdateTaskAsync(TaskUpdateDto taskUpdateDto)
        {
            var existingTask = await _taskRepository.GetByIdAsync(taskUpdateDto.Id);
            if (existingTask == null)
            {
                return false;
            }

            _mapper.Map(taskUpdateDto, existingTask);

            _taskRepository.Update(existingTask);
            await _taskRepository.SaveChangesAsync();

            return true;
        }

        public async Task<List<Tasks>> GetAllAsync(Expression<Func<Tasks, bool>> predicate)
        {
            return await _context.Tasks.Where(predicate).ToListAsync();
        }

        public async Task<List<Tasks>> GetUncompletedTasksAsync()
        {
            return await _taskRepository.GetAllAsync(task => !task.IsCompleted);
        }

        public async Task AssignTaskToUserAsync(int taskId, int userId)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);
            if (task == null) throw new Exception("Task not found");

            var userTask = new UserTask
            {
                UserId = userId,
                TaskId = taskId,
                AssignedAt = DateTime.UtcNow,
                IsCompleted = false
            };

            _context.UserTasks.Add(userTask);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> UpdateTaskAssignmentAsync(int taskId, int userId)
        {
            var task = await _taskRepository.GetByIdAsync(taskId);

            if (task == null)
            {
                return false; 
            }

            task.AssignedUserId = userId; 

            await _taskRepository.UpdateAsync(task); 

            return true; 
        }

        public async Task<IEnumerable<Tasks>> GetActiveTasksAsync()
        {
            return await _taskRepository.GetActiveTasksAsync();
        }

        public async Task<bool> MarkTaskAsDoneAsync(int taskId)
        {
            var task = await _context.Tasks.FindAsync(taskId);
            if (task == null) return false;

            task.IsCompleted = true; 
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<List<TaskDto>> GetCompletedTasksAsync()
        {
            var userTasks = await _taskRepository.GetUserTasksByCompletionStatusAsync(true);

            return userTasks.Select(ut => new TaskDto
            {
                Id = ut.Id,
                Name = ut.Name,
                IsCompleted = ut.IsCompleted
            }).ToList();
        }

        public async Task<TaskDetailsDto> GetTaskDetailsAsync(int taskId)
        {
            var task = await _taskRepository.GetTaskByIdAsync(taskId) as Tasks;  
            if (task == null)
                return null;

            return new TaskDetailsDto
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                Priority = task.Priority,
                DueDate = task.DueDate
            };
        }

    }
}
