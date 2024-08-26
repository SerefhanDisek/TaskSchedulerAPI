using Microsoft.EntityFrameworkCore;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.Core.Interfaces.Repositories;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;
using TaskSchedulerAPI.DataAccess.Repositories;
using TaskSchedulerAPI.Business.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<TaskSchedulerDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITaskService, TaskService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

builder.Services.AddAutoMapper(typeof(TaskScheduler));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
