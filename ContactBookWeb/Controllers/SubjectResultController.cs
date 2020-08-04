using ContactBookWeb.Models.Subject;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Controllers
{
    public class SubjectResultController : Controller
    {
        private readonly ILogger<SubjectResultController> _logger;

        public SubjectResultController(ILogger<SubjectResultController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

    }
}
