using Microsoft.EntityFrameworkCore;
using TaskSchedulerAPI.Core.Interfaces;
using TaskSchedulerAPI.Core.Interfaces.Repositories;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;
using TaskSchedulerAPI.DataAccess.Repositories;
using TaskSchedulerAPI.Business.Services;
using FluentValidation.AspNetCore;
using TaskSchedulerAPI.Core.Validators;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.OpenApi.Models;
using Hangfire;
using Serilog;
using TaskSchedulerAPI.Core.Middleware;
using TaskSchedulerAPI.Core.Filters;
using TaskSchedulerAPI.Core.MappingProfiles;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<UnauthorizedExceptionFilter>(); 
})
.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<UserCreateDtoValidator>());

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "TaskSchedulerAPI", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<TaskSchedulerDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ITaskService, TaskService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<ITaskDistributionService, TaskDistributionService>();
builder.Services.AddScoped<ITaskSchedulerService, TaskSchedulerService>();
builder.Services.AddScoped<ITaskSchedulerRepository, TaskSchedulerRepository>();

builder.Services.AddHangfire(config =>
{
    config.UseSqlServerStorage(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddHangfireServer();

builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Secret"])),
    };
});

builder.Services.AddAuthorization();

Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("logs/task_distribution_log.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();
builder.Host.UseSerilog();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "TaskSchedulerAPI v1");
        c.InjectJavascript("/swagger/custom.js");
    });
}

app.UseCors("AllowAllOrigins");
app.UseStaticFiles();
app.UseRouting();
app.UseHttpsRedirection();
app.UseHangfireDashboard("/hangfire");
app.UseMiddleware<AuthenticationMiddleware>();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();

//sql helper class c#