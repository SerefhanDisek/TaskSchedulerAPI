using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.Interfaces;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class TaskDistributionController : ControllerBase
{
    private readonly ITaskDistributionService _taskDistributionService;

    public TaskDistributionController(ITaskDistributionService taskDistributionService)
    {
        _taskDistributionService = taskDistributionService;
    }

    [HttpPost("distribute")]
    public async Task<IActionResult> DistributeTasks()
    {
        await _taskDistributionService.DistributeTasksAsync();
        return Ok("Tasks have been distributed.");
    }

    [HttpPost("assign")]
    public async Task<IActionResult> AssignTaskToUser(int taskId, int userId)
    {
        var result = await _taskDistributionService.AssignTaskToUserAsync(taskId, userId);
        if (!result)
        {
            return BadRequest("Task could not be assigned to user.");
        }

        return Ok("Task assigned to user successfully.");
    }

    [HttpPut("update")]
    public async Task<IActionResult> UpdateTaskAssignment(int taskId, int userId)
    {
        var result = await _taskDistributionService.UpdateTaskAssignmentAsync(taskId, userId);
        if (!result)
        {
            return BadRequest("Task assignment could not be updated.");
        }

        return Ok("Task assignment updated successfully.");
    }

    [HttpPost("trigger-log")]
    public IActionResult TriggerLog()
    {
        _taskDistributionService.DistributeTasksAsync().Wait();
        return Ok("Log tetiklendi.");
    }
}

