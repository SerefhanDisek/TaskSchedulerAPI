using TaskSchedulerAPI.Core.DTOs;

namespace TaskSchedulerAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto> GetUserByIdAsync(int id);
        Task<UserDto> CreateUserAsync(UserCreateDto userDto);
        Task<bool> UpdateUserAsync(int id, UserUpdateDto userDto);
        Task<bool> DeleteUserAsync(int id);
    }
}
