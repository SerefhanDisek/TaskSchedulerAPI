using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface IUserTaskService
    {
        Task AssignTaskToUser(int userId, int taskId);
    }
}
