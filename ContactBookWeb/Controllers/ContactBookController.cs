using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace ContactBookWeb.Controllers
{
    public class ContactBookController : Controller
    {
        private readonly ILogger<ContactBookController> _logger;

        public ContactBookController(ILogger<ContactBookController> logger)
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
        [Route("/ContactBook/ListClass/{courseId}/{gradeId}")]
        public JsonResult ListClass(int courseId = 0, int gradeId = 0)
        {
            var classRoomAll = new List<GetClassAll>();
            classRoomAll = ApiHelper<List<GetClassAll>>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassAll");
            var classAll = (from c in classRoomAll
                            where c.CourseId == courseId && c.GradeId == gradeId
                            select c).ToList();
            return Json(new { classAll });
        }
        [HttpGet]
        [Route("/ContactBook/ListStudent/{classId}")]
        public JsonResult ListStudent(int classId = 0)
        {
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");
            return Json(new { students });
        }
    }
}
