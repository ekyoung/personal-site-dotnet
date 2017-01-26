using System.Collections.Generic;
using System.Linq;
using EthanYoung.PersonalWebsite.Web.Models;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    public class TripsController : Controller
    {
        [ActionName("index")]
        public IActionResult Index()
        {
            return View();
        }

        private Trip GetTrip(string trip)
        {
            var trips = new List<Trip>
            {
                new Trip {Id = "alaska-2005", Title = "Alaskan Motorcycle Trip 2005", IndexFileUrl = "http://img.ethanyoung.us/Alaska2005/Alaska2005Index.xml", RootUrl = "http://img.ethanyoung.us/Alaska2005"},
                new Trip {Id = "betty-bear-hut-2006", Title = "Betty Bear Hut Ski Trip", IndexFileUrl = "http://img.ethanyoung.us/BettyBearHut2006/BettyBearHut2006Index.xml", RootUrl = "http://img.ethanyoung.us/BettyBearHut2006"},
                new Trip {Id = "bingham-canyon-mine", Title = "Bingham Canyon Mine", IndexFileUrl = "http://img.ethanyoung.us/BinghamCanyonMine/Mine2005Index.xml", RootUrl = "http://img.ethanyoung.us/BinghamCanyonMine"},
                new Trip {Id = "dinosaur-nm-2005", Title = "Dinosaur National Monument", IndexFileUrl = "http://img.ethanyoung.us/DinosaurNM2005/DinosaurNM2005Index.xml", RootUrl = "http://img.ethanyoung.us/DinosaurNM2005"},
                new Trip {Id = "mexico-2013", Title = "Playa del Carmen, Mexico 2013", IndexFileUrl = "http://img.ethanyoung.us/Mexico2013/Mexico2013Index.xml", RootUrl = "http://img.ethanyoung.us/Mexico2013"},
                new Trip {Id = "moab-may-2006", Title = "Moab May 2006", IndexFileUrl = "http://img.ethanyoung.us/MoabMay2006/MoabMay2006Index.xml", RootUrl = "http://img.ethanyoung.us/MoabMay2006"},
                new Trip {Id = "southwest-2007", Title = "Southwest Motorcycle Trip 2007", IndexFileUrl = "http://img.ethanyoung.us/Southwest2007/Southwest2007Index.xml", RootUrl = "http://img.ethanyoung.us/Southwest2007"},
                new Trip {Id = "uncle-bud-hut-2007", Title = "Uncle Bud Hut Ski Trip", IndexFileUrl = "http://img.ethanyoung.us/UncleBudHut2007/UncleBudHut2007Index.xml", RootUrl = "http://img.ethanyoung.us/UncleBudHut2007"},
            };

            return trips.First(x => x.Id.ToLower() == trip.ToLower());
        }

        [ActionName("gallery")]
        public IActionResult Gallery(string id)
        {
            return View(GetTrip(id));
        }

        [ActionName("slide-show")]
        public IActionResult SlideShow(string id)
        {
            return View(GetTrip(id));
        }
    }
}
