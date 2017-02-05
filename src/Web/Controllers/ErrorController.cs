using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class ErrorController : Controller
    {
        [ActionName("error")]
        public IActionResult Error(int statusCode)
        {
            if(statusCode == 404) 
            {
                return View("page-not-found");
            }

            return View();
        }
    }
}
