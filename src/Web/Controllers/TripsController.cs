using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class TripsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Gallery(string id)
        {
            ViewBag.TripId = id;

            return View();
        }

        public IActionResult SlideShow(string id)
        {
            ViewBag.TripId = id;
            
            return View();
        }
    }
}
