using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces.Services;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly ITaskService _taskService;

    public TasksController(ITaskService taskService)
    {
        _taskService = taskService;
    }

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

    [HttpGet]
    public async Task<IActionResult> GetAllTasks()
    {
        var tasks = await _taskService.GetAllTasksAsync();
        if (tasks == null || !tasks.Any())
            return NotFound("No tasks found.");

        return Ok(tasks);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var result = await _taskService.DeleteTaskAsync(id);
        if (!result)
            return NotFound($"Task with ID {id} not found.");

        return NoContent();
    }

    [HttpPut("update-task-assignment")]
    public async Task<IActionResult> UpdateTaskAssignment(int taskId, int userId)
    {
        var result = await _taskService.UpdateTaskAssignmentAsync(taskId, userId);
        if (!result)
            return BadRequest("Task assignment could not be updated.");

        return Ok("Task assignment updated successfully.");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] TaskUpdateDto taskUpdateDto)
    {
        if (id != taskUpdateDto.Id)
            return BadRequest("Task ID mismatch.");

        var result = await _taskService.UpdateTaskAsync(taskUpdateDto);
        if (!result)
            return NotFound($"Task with ID {id} not found.");

        return Ok("Task updated successfully.");
    }

    [HttpPatch("mark-done/{id}")]
    public async Task<IActionResult> MarkTaskAsDone(int id)
    {
        var result = await _taskService.MarkTaskAsDoneAsync(id);
        if (!result)
            return NotFound($"Task with ID {id} not found.");

        return Ok("Task marked as done successfully.");
    }

    [HttpGet("completed-tasks")]
    public async Task<IActionResult> GetCompletedTasks()
    {
        try
        {
            var completedTasks = await _taskService.GetCompletedTasksAsync();
            if (completedTasks == null || !completedTasks.Any())
                return NotFound(new { Message = "Tamamlanmış görev bulunamadı." });

            return Ok(completedTasks);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Tamamlanmış görevleri getirirken bir hata oluştu.", Error = ex.Message });
        }
    }
}
