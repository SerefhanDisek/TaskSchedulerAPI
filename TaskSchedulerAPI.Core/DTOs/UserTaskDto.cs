using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.DTOs
{
    public class UserTaskDto
    {
        public int Id { get; set; }
        public string Name { get; set; } // İsim özelliği
        public bool IsCompleted { get; set; } // 0: Aktif, 1: Tamamlanmış
    }
}
