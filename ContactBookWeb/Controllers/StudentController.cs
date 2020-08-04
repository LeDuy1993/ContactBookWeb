using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Controllers
{
    public class StudentController : Controller
    {
        private readonly ILogger<StudentController> _logger;

        public StudentController(ILogger<StudentController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(int id, int gradeid)
        {
            var studentAll = new List<GetStudentAll>();
            studentAll = ApiHelper<List<GetStudentAll>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentAll");
            var courseAll = new List<GetCourseAll>();
            courseAll = ApiHelper<List<GetCourseAll>>.HttpGetAsync($"{Helper.ApiUrl}api/course/GetCourseAll");
            var gradeAll = new List<GetGradeAll>();
            gradeAll = ApiHelper<List<GetGradeAll>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetGradeAll");
            ViewBag.gradeAll = gradeAll;
            ViewBag.courseAll = courseAll;
            ViewBag.courseId = id;
            return View();
        }
      /*  [Route("/Student/GetCourseAll")]
        public JsonResult GetCourseAll()
        {
            var courseAll = new List<GetCourseAll>();
            courseAll = ApiHelper<List<GetCourseAll>>.HttpGetAsync($"{Helper.ApiUrl}api/course/GetCourseAll");
            return Json(new { courseAll });
        }
        [Route("/Student/GetGradeAll")]
        public JsonResult GetGradeAll()
        {
            var gradeAll = new List<GetGradeAll>();
            gradeAll = ApiHelper<List<GetGradeAll>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetGradeAll");
            return Json(new { gradeAll });
        }*/
    }
}
