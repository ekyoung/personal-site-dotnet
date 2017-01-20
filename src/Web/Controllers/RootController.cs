using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class RootController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [ActionName("about-this-site")]
        public IActionResult AboutThisSite()
        {
            return View();
        }

        public IActionResult Resume()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
