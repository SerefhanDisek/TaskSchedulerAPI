using Microsoft.AspNetCore.Mvc;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;

namespace TaskSchedulerAPI.Presentation.Controllers
{
    public class TasksController : Controller
    {
        private readonly ITaskService taskService;
        private readonly TaskSchedulerDbContext context;

        public TasksController(ITaskService taskService, TaskSchedulerDbContext context)
        {
            this.taskService = taskService;
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
