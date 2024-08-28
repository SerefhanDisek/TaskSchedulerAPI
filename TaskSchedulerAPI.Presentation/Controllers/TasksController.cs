using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Business.Services;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;

namespace TaskSchedulerAPI.Presentation.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private readonly ITaskService _taskService;
        private readonly TaskSchedulerDbContext _context;

        public TasksController(ITaskService taskService, TaskSchedulerDbContext context)
        {
            _taskService = taskService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto taskDto)
        {
            var task = await _taskService.CreateTaskAsync(taskDto);
            return Ok(task);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            return Ok(tasks);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _taskService.DeleteUserAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateDto taskUpdateDto)
        {
            if (id != taskUpdateDto.Id)
            {
                return BadRequest("Task ID mismatch.");
            }

            var result = await _taskService.UpdateTaskAsync(taskUpdateDto);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
