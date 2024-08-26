using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;
using AutoMapper;

namespace TaskSchedulerAPI.Core.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();  
        }
    }
}
