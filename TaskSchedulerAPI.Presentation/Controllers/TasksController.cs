using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;

namespace TaskSchedulerAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        // Task oluşturma
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto taskDto)
        {
            if (taskDto == null)
                return BadRequest("Task data cannot be null.");

            var task = await _taskService.CreateTaskAsync(taskDto);
            if (task == null)
                return StatusCode(500, "A problem occurred while creating the task.");

            return Ok(task);
        }

        // Tüm Task'ları getirme
        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            if (tasks == null || !tasks.Any())
                return NotFound("No tasks found.");

            return Ok(tasks);
        }

        // Task silme
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var result = await _taskService.DeleteTaskAsync(id);
            if (!result)
                return NotFound($"Task with ID {id} not found.");

            return NoContent();
        }

        // Task atamasını güncelleme (örneğin bir kullanıcıya atama)
        [HttpPut("update-task-assignment")]
        public async Task<IActionResult> UpdateTaskAssignment(int taskId, int userId)
        {
            var result = await _taskService.UpdateTaskAssignmentAsync(taskId, userId);
            if (!result)
                return BadRequest("Task assignment could not be updated.");

            return Ok("Task assignment updated successfully.");
        }

        // Task güncelleme
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateDto taskUpdateDto)
        {
            if (id != taskUpdateDto.Id)
                return BadRequest("Task ID mismatch.");

            var result = await _taskService.UpdateTaskAsync(taskUpdateDto);
            if (!result)
                return NotFound($"Task with ID {id} not found.");

            return NoContent();
        }
    }
}
