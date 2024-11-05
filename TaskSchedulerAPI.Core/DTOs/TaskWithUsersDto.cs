using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.DTOs
{
    public class TaskWithUsersDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<UserDto> AssignedUsers { get; set; } = new List<UserDto>();
        public bool IsCompleted { get; set; }  
    }
}
