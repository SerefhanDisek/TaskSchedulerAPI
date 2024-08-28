using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;

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

        public async Task<bool> DeleteUserAsync(int id)
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

    }
}
