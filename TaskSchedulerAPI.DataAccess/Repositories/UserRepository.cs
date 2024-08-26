﻿using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces;
using Task = System.Threading.Tasks.Task;

namespace TaskSchedulerAPI.DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly TaskSchedulerDbContext _context;

        public UserRepository(TaskSchedulerDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}