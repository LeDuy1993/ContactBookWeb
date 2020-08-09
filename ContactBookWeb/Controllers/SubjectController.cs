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
    public class SubjectController : Controller
    {
        private readonly ILogger<SubjectController> _logger;

        public SubjectController(ILogger<SubjectController> logger)
        {
            _logger = logger;
        }
        [Route("/Subject/Gets")]
        public JsonResult Gets()
        {
            var subjects = new List<GetSubjectAll>();
            subjects = ApiHelper<List<GetSubjectAll>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectAll");
            return Json(new { subjects });
        }
    }
}

