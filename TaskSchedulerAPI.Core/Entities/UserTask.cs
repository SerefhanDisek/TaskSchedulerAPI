using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.Entities
{
    public class UserTask
    {
        public int UserId { get; set; }
        public User user { get; set; }
        public int TaskId { get; set; }
        public Task task { get; set; }
        public DateTime AssignedAt { get; set; }
        public bool IsCompleted { get; set; }
    }
}
