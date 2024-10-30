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

        // Aktif görevleri getirir
        [HttpGet("active-tasks")]
        public async Task<IActionResult> GetActiveTasks()
        {
            var activeTasks = await _taskSchedulerService.GetActiveTasksAsync();
            return Ok(activeTasks);
        }

        // Tamamlanmış görevleri getirir
        [HttpGet("completed-tasks")]
        public async Task<IActionResult> GetCompletedTasks()
        {
            var completedTasks = await _taskSchedulerService.GetCompletedTasksAsync();
            return Ok(completedTasks);
        }

        // Görevi tamamlanmış olarak işaretler
        [HttpPost("complete-task/{taskId}")]
        public async Task<IActionResult> CompleteTask(int taskId)
        {
            var result = await _taskSchedulerService.CompleteTaskAsync(taskId);
            if (result)
            {
                return Ok(new { Message = "Görev başarıyla tamamlandı." });
            }
            return BadRequest(new { Message = "Görev tamamlama işlemi başarısız." });
        }
    }
}
