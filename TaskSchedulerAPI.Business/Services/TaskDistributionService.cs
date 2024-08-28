using AutoMapper;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.Core.Interfaces;
using Microsoft.Extensions.Logging;

public class TaskDistributionService : ITaskDistributionService
{
    private readonly ITaskService _taskService;
    private readonly IUserService _userService;
    private readonly ITaskRepository _taskRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<TaskDistributionService> _logger;

    public TaskDistributionService(
        ITaskService taskService,
        IUserService userService,
        ITaskRepository taskRepository,
        IMapper mapper,
        ILogger<TaskDistributionService> logger)
    {
        _taskService = taskService;
        _userService = userService;
        _taskRepository = taskRepository;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task DistributeTasksAsync()
    {
        var uncompletedTasks = await _taskService.GetUncompletedTasksAsync();
        var users = await _userService.GetAllUsersAsync();

        if (!users.Any() || !uncompletedTasks.Any())
        {
            _logger.LogWarning("Task dağıtımı yapılamadı. Kullanıcı sayısı: {UserCount}, Task sayısı: {TaskCount}", users.Count(), uncompletedTasks.Count());
            return;
        }

        int taskPerUser = uncompletedTasks.Count() / users.Count();
        int remainingTasks = uncompletedTasks.Count() % users.Count();
        int taskIndex = 0;

        foreach (var user in users)
        {
            int assignedTaskCount = 0;

            for (int i = 0; i < taskPerUser; i++)
            {
                if (taskIndex < uncompletedTasks.Count)
                {
                    var taskDto = uncompletedTasks[taskIndex];
                    taskDto.AssignedUserId = user.Id;

                    var taskEntity = _mapper.Map<Tasks>(taskDto);
                    await _taskRepository.UpdateAsync(taskEntity);

                    _logger.LogInformation("Görev {TaskId} - {TaskName}, kullanıcı {UserId} - {UserName}'ye atanmıştır.",
                                        taskEntity.Id, taskEntity.Name, user.Id, user.UserName);

                    taskIndex++;
                    assignedTaskCount++;
                }
            }

            _logger.LogInformation("Kullanıcıya {UserId} - {UserName} {AssignedTaskCount} görev atanmıştır.", user.Id, user.UserName, assignedTaskCount);
        }

        for (int i = 0; i < remainingTasks; i++)
        {
            var taskDto = uncompletedTasks[taskIndex];
            taskDto.AssignedUserId = users.ElementAt(i).Id;

            var taskEntity = _mapper.Map<Tasks>(taskDto);
            await _taskRepository.UpdateAsync(taskEntity);

            _logger.LogInformation("Görev {TaskId} - {TaskName}, kullanıcı {UserId} - {UserName}'ye atanmıştır.",
                                taskEntity.Id, taskEntity.Name, users.ElementAt(i).Id, users.ElementAt(i).UserName);

            taskIndex++;
            _logger.LogInformation("Kullanıcıya {UserId} - {UserName} ek görev atanmıştır.", users.ElementAt(i).Id, users.ElementAt(i).UserName);
        }

        await _taskRepository.SaveChangesAsync();

        _logger.LogInformation("Task dağıtımı tamamlandı. {TaskCount} task dağıtıldı.", uncompletedTasks.Count);
    }

    public async Task<bool> AssignTaskToUserAsync(int taskId, int userId)
    {
        var task = await _taskService.GetTaskByIdAsync(taskId);
        var user = await _userService.GetUserByIdAsync(userId);

        if (task == null || user == null)
        {
            _logger.LogWarning("Task veya Kullanıcı bulunamadı.");
            return false;
        }

        if (task.AssignedUserId.HasValue)
        {
            _logger.LogWarning("Task zaten atanmış.");
            return false;
        }

        task.AssignedUserId = userId;
        var taskEntity = _mapper.Map<Tasks>(task);
        _taskRepository.Update(taskEntity);

        await _taskRepository.SaveChangesAsync();

        _logger.LogInformation("Task {TaskId} kullanıcı {UserId}'ye atanmıştır.", taskId, userId);
        return true;
    }

    public async Task<bool> UpdateTaskAssignmentAsync(int taskId, int userId)
    {
        var task = await _taskService.GetTaskByIdAsync(taskId);
        var user = await _userService.GetUserByIdAsync(userId);

        if (task == null || user == null)
        {
            _logger.LogWarning("Task veya Kullanıcı bulunamadı.");
            return false;
        }

        var previousUserId = task.AssignedUserId;

        task.AssignedUserId = userId;
        var taskEntity = _mapper.Map<Tasks>(task);
        _taskRepository.Update(taskEntity);

        await _taskRepository.SaveChangesAsync();

        if (previousUserId.HasValue)
        {
            _logger.LogInformation("Task {TaskId}, kullanıcı {PreviousUserId}'den kullanıcı {UserId}'ye atanmıştır.", taskId, previousUserId, userId);
        }
        else
        {
            _logger.LogInformation("Task {TaskId}, kullanıcı {UserId}'ye atanmıştır.", taskId, userId);
        }

        return true;
    }
}

