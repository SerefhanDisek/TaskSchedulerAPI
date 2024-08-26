using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;

namespace TaskSchedulerAPI.Business.Services
{
    public class UserTaskService : IUserTaskService
    {
        private readonly IUserTaskRepository _userTaskRepository;

        public UserTaskService(IUserTaskRepository userTaskRepository)
        {
            _userTaskRepository = userTaskRepository;
        }

        public async Task AssignTaskToUser(int userId, int taskId)
        {
            var userTask = new UserTask
            {
                UserId = userId,
                TaskId = taskId
            };

            await _userTaskRepository.AddAsync(userTask);
        }
    }
}
