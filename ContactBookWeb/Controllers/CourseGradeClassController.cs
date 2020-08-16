using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Controllers
{
    public class CourseGradeClassController : Controller
    {
        private readonly ILogger<CourseGradeClassController> _logger;

        public CourseGradeClassController(ILogger<CourseGradeClassController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            ViewBag.courseAll = ApiHelper<List<GetCourseAll>>.HttpGetAsync($"{Helper.ApiUrl}api/course/GetCourseAll");
            ViewBag.gradeAll = ApiHelper<List<GetGradeAll>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetGradeAll");

            return View();
        }
        [HttpGet]
        [Route("/CourseGradeClass/ListClass/{courseId}")]
        public JsonResult ListClass(int courseId = 0)
        {
            var classRoomAll = new List<GetClassByCourseId>();
            classRoomAll = ApiHelper<List<GetClassByCourseId>>.HttpGetAsync($"{Helper.ApiUrl}api/class/getClassByCourseId/{courseId}");
            return Json(new { classRoomAll });
        }
    }
}
