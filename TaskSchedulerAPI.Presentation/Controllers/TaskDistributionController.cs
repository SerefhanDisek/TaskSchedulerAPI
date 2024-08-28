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

    [HttpPost("trigger-log")]
    public IActionResult TriggerLog()
    {
        _taskDistributionService.DistributeTasksAsync().Wait();
        return Ok("Log tetiklendi.");
    }
}

