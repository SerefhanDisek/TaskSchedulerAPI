using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.Core.Interfaces.Services;

namespace TaskSchedulerAPI.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskSchedulerController : ControllerBase
    {
        private readonly ITaskSchedulerService _taskSchedulerService;
        private readonly ITaskService _taskService;
        private readonly IMapper _mapper;

        public TaskSchedulerController(ITaskSchedulerService taskSchedulerService, ITaskService taskService, IMapper mapper)
        {
            _taskSchedulerService = taskSchedulerService;
            _taskService = taskService;
            _mapper = mapper;
        }

        // 1. Aktif Görevleri Getir
        [HttpGet("active-tasks")]
        public async Task<IActionResult> GetAllTasks()
        {
            var tasks = await _taskService.GetAllTasksAsync();
            if (tasks == null || !tasks.Any())
                return NotFound(new { Message = "Aktif görev bulunamadı." });

            return Ok(tasks);
        }

        // 2. Tamamlanmış Görevleri Getir
        [HttpGet("completed-tasks")]
        public async Task<IActionResult> GetCompletedTasks()
        {
            try
            {
                var completedTasks = await _taskSchedulerService.GetCompletedTasksAsync();
                if (completedTasks == null || !completedTasks.Any())
                    return NotFound(new { Message = "Tamamlanmış görev bulunamadı." });

                return Ok(completedTasks);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Tamamlanmış görevleri getirirken bir hata oluştu.", Error = ex.Message });
            }
        }

        // 3. Yeni Görev Oluştur
        [HttpPost("add-task")]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDto taskDto)
        {
            if (taskDto == null)
                return BadRequest(new { Message = "Görev verisi boş olamaz." });

            try
            {
                var task = await _taskService.CreateTaskAsync(taskDto);
                if (task == null)
                    return StatusCode(500, new { Message = "Görev oluşturulurken bir sorun oluştu." });

                return Ok(task);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Görev oluşturulurken bir hata oluştu.", Error = ex.Message });
            }
        }

        [HttpPut("complete-task/{id}")]
        public async Task<IActionResult> CompleteTask(int id)
        {
            var task = await _taskService.GetTaskByIdAsync(id);
            if (task == null)
            {
                return NotFound(new { message = "Görev bulunamadı" });
            }

            // Görevi tamamlandı olarak işaretle
            task.IsCompleted = true;

            // TaskDto'yu AutoMapper ile TaskUpdateDto'ya dönüştür
            var taskUpdateDto = _mapper.Map<TaskUpdateDto>(task);

            await _taskService.UpdateTaskAsync(taskUpdateDto);
            return Ok(new { message = "Görev başarıyla tamamlandı" });
        }
    }
}
