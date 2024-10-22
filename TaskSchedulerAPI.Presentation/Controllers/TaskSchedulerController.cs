using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.Interfaces;

namespace TaskSchedulerAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskSchedulerController : ControllerBase

    {
        private readonly ITaskSchedulerService _taskSchedulerService;

        public TaskSchedulerController(ITaskSchedulerService taskSchedulerService) 
        {
            _taskSchedulerService = taskSchedulerService;
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignTaskToUser(int taskId, int userId)
        {
            var result = await _taskSchedulerService.AssignTaskToUserAsync(taskId, userId);
            if (!result)
            {
                return BadRequest("Task could not be assigned to user.");
            }

            return Ok("Task assigned to user successfully.");
        }
    }
}
