using FluentValidation;
using TaskSchedulerAPI.Core.DTOs;

namespace TaskSchedulerAPI.Core.Validators
{
    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First Name is required.")
                .Length(2, 50).WithMessage("First Name must be between 2 and 50 characters.");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last Name is required.")
                .Length(2, 50).WithMessage("Last Name must be between 2 and 50 characters.");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email address is required.");

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long.");
        }
    }
}
