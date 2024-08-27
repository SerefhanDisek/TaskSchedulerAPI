using AutoMapper;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.Core.DTOs;

public class TaskDistributionService : ITaskDistributionService
{
    private readonly ITaskService _taskService;
    private readonly IUserService _userService;
    private readonly ITaskRepository _taskRepository;
    private readonly IMapper _mapper;

    public TaskDistributionService(ITaskService taskService, IUserService userService, ITaskRepository taskRepository, IMapper mapper)
    {
        _taskService = taskService;
        _userService = userService;
        _taskRepository = taskRepository;
        _mapper = mapper;
    }

    public async Task DistributeTasksAsync()
    {
        var uncompletedTasks = await _taskService.GetUncompletedTasksAsync();
        var users = await _userService.GetAllUsersAsync();

        if (users.Count() == 0 || uncompletedTasks.Count() == 0)
        {
            return;
        }

        int taskPerUser = uncompletedTasks.Count() / users.Count();
        int remainingTasks = uncompletedTasks.Count() % users.Count();

        int taskIndex = 0;

        foreach (var user in users)
        {
            for (int i = 0; i < taskPerUser; i++)
            {
                if (taskIndex < uncompletedTasks.Count)
                {
                    var taskDto = uncompletedTasks[taskIndex];
                    taskDto.AssignedUserId = user.Id;

                    // DTO'yu Tasks entity'sine dönüştürme
                    var taskEntity = _mapper.Map<Tasks>(taskDto);
                    _taskRepository.Update(taskEntity);

                    taskIndex++;
                }
            }
        }

        var userList = users.ToList();
        for (int i = 0; i < remainingTasks; i++)
        {
            var taskDto = uncompletedTasks[taskIndex];
            taskDto.AssignedUserId = userList[i].Id;

            var taskEntity = _mapper.Map<Tasks>(taskDto);
            _taskRepository.Update(taskEntity);

            taskIndex++;
        }

        await _taskRepository.SaveChangesAsync();
    }
}
