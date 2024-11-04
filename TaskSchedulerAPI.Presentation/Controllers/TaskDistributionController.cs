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

    [HttpPost("assign")]
    public async Task<IActionResult> AssignTaskToUser([FromBody] AssignTaskRequest request)
    {
        var result = await _taskDistributionService.AssignTaskToUserAsync(request.TaskId, request.UserId);
        if (!result)
        {
            return BadRequest("Task could not be assigned to user.");
        }

        return Ok("Task assigned to user successfully.");
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

    [HttpPost("confirm-assignments")]
    public async Task<IActionResult> ConfirmAssignments([FromBody] List<TaskAssignmentDto> assignments)
    {
        var result = await _taskDistributionService.ConfirmAssignmentsAsync(assignments);
        if (!result)
        {
            return BadRequest("Assignments could not be confirmed.");
        }

        return Ok("Assignments confirmed successfully.");
    }

    [HttpPost("trigger-log")]
    public IActionResult TriggerLog()
    {
        _taskDistributionService.DistributeTasksAsync().Wait();
        return Ok("Log triggered.");
    }
}