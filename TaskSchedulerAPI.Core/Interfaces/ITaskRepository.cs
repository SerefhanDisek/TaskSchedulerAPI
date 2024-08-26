using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;

namespace TaskSchedulerAPI.Core.Interfaces
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Task>> GetAllAsync();
        Task DeleteAsync(Tasks task);
        Task<Tasks> GetByIdAsync(int id);
        Task UpdateAsync(Tasks task);
        Task AddAsync(Task task);
    }
}
