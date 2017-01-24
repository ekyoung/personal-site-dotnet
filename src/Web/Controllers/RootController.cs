using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class RootController : Controller
    {
        [ActionName("index")]
        public IActionResult Index()
        {
            return View();
        }

        [ActionName("about-this-site")]
        public IActionResult AboutThisSite()
        {
            return View();
        }

        [ActionName("resume")]
        public IActionResult Resume()
        {
            return View();
        }

        [ActionName("error")]
        public IActionResult Error()
        {
            return View();
        }
    }
}
