using Microsoft.EntityFrameworkCore;
using TaskSchedulerAPI.Core.Entities;
using Tasks = TaskSchedulerAPI.Core.Entities.Tasks;

namespace TaskSchedulerAPI.DataAccess
{
    public class TaskSchedulerDbContext : DbContext
    {
        public TaskSchedulerDbContext(DbContextOptions<TaskSchedulerDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Tasks> Tasks { get; set; } 
        public DbSet<UserTask> UserTasks { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<SystemSettings> SystemSettings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<UserTask>()
                .HasKey(ut => new { ut.UserId, ut.TaskId });


            modelBuilder.Entity<UserTask>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.UserTasks)
                .HasForeignKey(ut => ut.UserId);

            modelBuilder.Entity<UserTask>()
                .HasOne(ut => ut.Tasks)
                .WithMany(t => t.UserTasks)
                .HasForeignKey(ut => ut.TaskId);

            modelBuilder.Entity<User>().HasData(
            new User
            {
               Id = 1,
               FirstName = "Şerefhan",
               LastName = "Dişek",
               UserName = "Şeref",
               Email = "seref@example.com",
               Password = "Password1",
            },
            new User
            {
                Id = 2,
                FirstName = "Yusuf",
                LastName = "Kaya",
                UserName = "Yusuf",
                Email = "yusuf@example.com",
                Password = "Password2"
            }
        );

            modelBuilder.Entity<Tasks>().HasData(
                new Tasks
                {
                    Id = 1,
                    Name = "Task 1",
                    Description = "Complete the first task",
                    DueDate = DateTime.UtcNow.AddDays(7),
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow
                },
                new Tasks
                {
                    Id = 2,
                    Name = "Task 2",
                    Description = "Start the second task",
                    DueDate = DateTime.UtcNow.AddDays(14),
                    IsCompleted = false,
                    CreatedAt = DateTime.UtcNow
                }
            );

            modelBuilder.Entity<UserTask>().HasData(
                new UserTask { UserId = 1, TaskId = 1 },
                new UserTask { UserId = 2, TaskId = 2 }
            );
        }
    }
}
 