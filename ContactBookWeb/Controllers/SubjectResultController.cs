using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Models.Subject;
using ContactBookWeb.Models.Teacher;
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
            ViewBag.courseAll = ApiHelper<List<GetCourseAll>>.HttpGetAsync($"{Helper.ApiUrl}api/course/GetCourseAll");
            ViewBag.gradeAll = ApiHelper<List<GetGradeAll>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetGradeAll");
           
            return View();
        }
        [HttpGet]
        [Route("/SubjectResult/ListClass/{courseId}/{gradeid}")]
        public JsonResult ListClass(int courseId = 0, int gradeid = 0)
        {
            var classRoomAll = new List<GetClassAll>();
            classRoomAll = ApiHelper<List<GetClassAll>>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassAll");
            var classAll = (from c in classRoomAll
                            where c.CourseId == courseId && c.GradeId == gradeid
                            select c).ToList();
            return Json(new { classAll });
        }
        [HttpGet]
        [Route("/SubjectResult/ListSubject/{classId}")]
        public JsonResult ListSubject(int classId = 0)
        {
            var subjects = new List<GetSubjectByClassId>();
            subjects = ApiHelper<List<GetSubjectByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectByClassId/{classId}");
            var teacher = new GetTeacherByClassId();
            teacher = ApiHelper<GetTeacherByClassId>.HttpGetAsync($"{Helper.ApiUrl}api/teacher/GetTeacherByClassId/{classId}");
            var getResultClass = new GetResultClass();
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");

            getResultClass.TeacherName = teacher.TeacherName;
            getResultClass.GetSubjectByClassId = subjects;
            getResultClass.GetStudentByClassId = students;
            return Json(new { getResultClass });
        }
    }
}
