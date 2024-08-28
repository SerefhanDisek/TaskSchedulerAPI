using Microsoft.AspNetCore.Http;

namespace TaskSchedulerAPI.Core.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthenticationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            await _next(context);

            if (context.Response.StatusCode == 401) 
            {
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync("{\"message\": \"Lütfen giriş yapınız\"}");
            }
        }
    }

}
