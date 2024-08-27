using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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

        public async Task<bool> UpdateTaskAsync(int id, TaskUpdateDto taskDto)
        {
            var task = await _taskRepository.GetByIdAsync(id);
            if (task == null) return false;

            _mapper.Map(taskDto, task);
            await _taskRepository.UpdateAsync(task);
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

    }
}
