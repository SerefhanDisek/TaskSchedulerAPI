﻿using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;
using AutoMapper;

namespace TaskSchedulerAPI.Core.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            //User
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();  

            CreateMap<User, UserCreateDto>();
            CreateMap<UserCreateDto, User>();

            CreateMap<User, UserUpdateDto>();
            CreateMap<UserUpdateDto, User>();

            CreateMap<User, UserLoginDto>();
            CreateMap<UserLoginDto, User>();

            //Task
            CreateMap<Tasks, TaskDto>();
            CreateMap<TaskDto, Tasks>();

            CreateMap<Tasks, TaskCreateDto>();
            CreateMap<TaskCreateDto, Tasks>();

            CreateMap<Tasks, TaskUpdateDto>();
            CreateMap<TaskUpdateDto, Tasks>();

            //Log
            CreateMap<Log, LogDto>();
            CreateMap<LogDto, Log>();

            //SystemSettings
            CreateMap<SystemSettings, UpdateSystemSettingsDto>();
            CreateMap<UpdateSystemSettingsDto, SystemSettings>();
        }
    }
}