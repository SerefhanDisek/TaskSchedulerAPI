using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskSchedulerAPI.Core.Filters
{
    public class UnauthorizedExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.HttpContext.Response.StatusCode == 401)
            {
                context.Result = new JsonResult(new { message = "Lütfen giriş yapınız" })
                {
                    StatusCode = 401
                };
                context.ExceptionHandled = true;
            }
        }
    }

}
