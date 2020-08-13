using ContactBookWeb.Models.Degree;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Controllers
{
    public class DegreeController : Controller
    {
        private readonly ILogger<DegreeController> _logger;

        public DegreeController(ILogger<DegreeController> logger)
        {
            _logger = logger;
        }

        [Route("/Degree/Gets")]
        public JsonResult Gets()
        {
            var degrees = new List<DegreeView>();
            degrees = ApiHelper<List<DegreeView>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetDegreeAll");

            return Json(new { degrees });
        }
    }
}
