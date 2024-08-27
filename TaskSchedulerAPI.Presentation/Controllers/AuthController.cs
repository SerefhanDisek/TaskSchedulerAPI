using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskSchedulerAPI.Core.DTOs;
using TaskSchedulerAPI.Core.Entities;
using TaskSchedulerAPI.Core.Interfaces.Services;
using TaskSchedulerAPI.DataAccess;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _configuration;
    private readonly TaskSchedulerDbContext _context;

    public AuthController(IUserService userService, IConfiguration configuration, TaskSchedulerDbContext context)
    {
        _userService = userService;
        _configuration = configuration;
        _context = context;
    }

    [HttpPost("register")]
    public async Task<ResultDto> RegisterAsync(UserRegisterDto registerDto)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.UserName == registerDto.UserName || u.Email == registerDto.Email);

        if (existingUser != null)
        {
            return new ResultDto
            {
                IsSuccessed = false,
                Message = "Username or email already exists."
            };
        }

        // Yeni kullanıcı oluşturma
        var newUser = new User
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            UserName = registerDto.UserName,
            Email = registerDto.Email,
            Password = registerDto.Password,
        };

        // Kullanıcıyı veritabanına ekleme
        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        // Başarılı sonuç döndürme
        return new ResultDto
        {
            IsSuccessed = true,
            Message = "User registered successfully."
        };
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(UserLoginDto loginDto)
    {
        var user = await _userService.AuthenticateAsync(loginDto.UserName, loginDto.Password);
        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var token = GenerateJwtToken(user);

        return Ok(new
        {
            message = "Giriş başarılı",
            token = token
        });
    }

    private string GenerateJwtToken(User user)
    {
        // En az 32 karakter uzunluğunda bir anahtar
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            
        };

        var token = new JwtSecurityToken(
            issuer: _configuration["JwtSettings:Issuer"],
            audience: _configuration["JwtSettings:Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
