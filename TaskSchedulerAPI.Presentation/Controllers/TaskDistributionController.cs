using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class TaskDistributionController : ControllerBase
{
    private readonly ITaskDistributionService _taskDistributionService;

    public TaskDistributionController(ITaskDistributionService taskDistributionService)
    {
        _taskDistributionService = taskDistributionService;
    }

    [HttpGet("get-active-tasks")]
    public async Task<IActionResult> GetActiveTasks()
    {
        var tasks = await _taskDistributionService.GetActiveTasksWithUsersAsync();

        var activeAssignedTasks = tasks.Select(t => new
        {
            t.Id,
            t.Name,
            AssignedUsers = t.AssignedUsers != null && t.AssignedUsers.Any()
                ? t.AssignedUsers.Select(userDto => $"{userDto.FirstName} {userDto.LastName}").ToList()
                : new List<string> { "Atanmamış" },
            t.IsCompleted
        }).ToList();

        return Ok(activeAssignedTasks);
    }

    [HttpGet("get-active-users")]
    public async Task<IActionResult> GetActiveUsers()
    {
        var usersWithActiveTasks = await _taskDistributionService.GetUsersWithActiveTasksAsync();
        return Ok(usersWithActiveTasks);
    }


    [HttpPost("distribute")]
    public async Task<IActionResult> DistributeTasks()
    {
        var assignments = await _taskDistributionService.DistributeTasksAsync();
        return Ok(assignments);
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateTaskAssignment([FromBody] UpdateTaskAssignmentRequest request)
    {
        var result = await _taskDistributionService.UpdateTaskAssignmentAsync(request.TaskId, request.UserId);
        if (!result)
        {
            return BadRequest("Görev ataması güncellenemedi.");
        }

        return Ok("Görev ataması başarıyla güncellendi.");
    }

    [HttpPost("trigger-log")]
    public IActionResult TriggerLog()
    {
        _taskDistributionService.DistributeTasksAsync().Wait(); 
        return Ok("Log tetiklendi.");
    }
}
