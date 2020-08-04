using ContactBookWeb.Models.Nation;
using ContactBookWeb.Models.Religion;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Controllers
{
    public class ReligionNationController : Controller
    {
        private readonly ILogger<ReligionNationController> _logger;

        public ReligionNationController(ILogger<ReligionNationController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var nationAll = new List<NationView>();
            nationAll = ApiHelper<List<NationView>>.HttpGetAsync($"{Helper.ApiUrl}api/nation/gets");
            return View(nationAll);
        }
        [Route("/ReligionNation/GetReligionAll")]
        public JsonResult GetReligionAll()
        {
            var religionAll = new List<GetReligionAll>();
            religionAll = ApiHelper<List<GetReligionAll>>.HttpGetAsync($"{Helper.ApiUrl}api/religion/GetReligionAll");
            return Json(new { religionAll });
        }
    }
}
