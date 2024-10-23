using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; 
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class TaskDistributionController : ControllerBase
{
    private readonly ITaskDistributionService _taskDistributionService;
    private readonly ILogger<TaskDistributionController> _logger; 

    public TaskDistributionController(ITaskDistributionService taskDistributionService, ILogger<TaskDistributionController> logger)
    {
        _taskDistributionService = taskDistributionService;
        _logger = logger; 
    }

    [HttpGet("get-active-tasks")]
    public async Task<IActionResult> GetActiveTasks()
    {
        try
        {
            var activeTasks = await _taskDistributionService.GetActiveTasksAsync(); 
            return Ok(activeTasks);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get active tasks");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpGet("get-users")]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _taskDistributionService.GetUsersAsync();
        return Ok(users);
    }

    [HttpPost("distribute")]
    public async Task<IActionResult> DistributeTasks([FromBody] List<TaskDto> tasks)
    {
        await _taskDistributionService.DistributeTasksAsync(); 
        return Ok("Tasks have been distributed.");
    }

    [HttpPost("assign")]
    public async Task<IActionResult> AssignTaskToUser([FromBody] AssignTaskDto assignTaskDto)
    {
        var result = await _taskDistributionService.AssignTaskToUserAsync(assignTaskDto.TaskId, assignTaskDto.UserId);
        if (!result)
        {
            return BadRequest("Task could not be assigned to user.");
        }

        return Ok("Task assigned to user successfully.");
    }
}
