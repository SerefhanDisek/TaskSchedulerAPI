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

    public TaskDistributionService(ITaskService taskService, IUserService userService, ITaskRepository taskRepository, IMapper mapper, ILogger<TaskDistributionService> logger)
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

        if (users.Count() == 0 || uncompletedTasks.Count() == 0)
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
                    _taskRepository.Update(taskEntity);

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
            _taskRepository.Update(taskEntity);

            taskIndex++;
            _logger.LogInformation("Kullanıcıya {UserId} - {UserName} ek görev atanmıştır.", users.ElementAt(i).Id, users.ElementAt(i).UserName);
        }

        await _taskRepository.SaveChangesAsync();

        _logger.LogInformation("Task dağıtımı tamamlandı. {TaskCount} task dağıtıldı.", uncompletedTasks.Count);
    }
}
