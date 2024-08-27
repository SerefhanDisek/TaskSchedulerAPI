using FluentValidation;
using TaskSchedulerAPI.Core.DTOs;

namespace TaskSchedulerAPI.Core.Validators
{
    class UserLoginDtoValidator : AbstractValidator<UserLoginDto>
    {
        public UserLoginDtoValidator() 
        {
            RuleFor(x => x.UserName).NotEmpty().WithMessage("UserName is required.");
            RuleFor(x => x.Password).NotEmpty().WithMessage("Password is required.");
        }
    }
}
