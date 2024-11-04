using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
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
        var tasks = await _taskDistributionService.GetActiveTasksAsync();
        return Ok(tasks);
    }

    [HttpGet("get-users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _taskDistributionService.GetUsersAsync();
        return Ok(users);
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
            return BadRequest("Task assignment could not be updated.");
        }

        return Ok("Task assignment updated successfully.");
    }

    [HttpPost("trigger-log")]
    public IActionResult TriggerLog()
    {
        _taskDistributionService.DistributeTasksAsync().Wait();
        return Ok("Log triggered.");
    }
}