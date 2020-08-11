using ContactBookWeb.Models.ClassRoom;
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

        public IActionResult Index(int courseId = 0, int gradeid = 0)
        {
            var studentAll = new List<GetStudentAll>();
            studentAll = ApiHelper<List<GetStudentAll>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentAll");
            var courseAll = new List<GetCourseAll>();
            courseAll = ApiHelper<List<GetCourseAll>>.HttpGetAsync($"{Helper.ApiUrl}api/course/GetCourseAll");
            var gradeAll = new List<GetGradeAll>();
            gradeAll = ApiHelper<List<GetGradeAll>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetGradeAll");
            ViewBag.gradeAll = gradeAll;
            ViewBag.courseAll = courseAll;
            ViewBag.courseId = courseId;
            return View();
        }
        [Route("/Student/ListClass/{courseId}/{gradeid}")]
        public JsonResult ListClass(int courseId = 0, int gradeid = 0)
        {
            var classRoomAll = new List<GetClassAll>();
            classRoomAll = ApiHelper<List<GetClassAll>>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassAll");
            var classAll = (from c in classRoomAll
                            where c.CourseId == courseId && c.GradeId == gradeid
                            select c).ToList();
            return Json(new { classAll });
        }
        [Route("/Student/ListStudent/{classId}")]
        public JsonResult ListStudent(int classId = 0)
        {
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");

            return Json(new { students });
        }



        /*        [Route("/Student/GetCourseAll")]
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


        [Route("/Student/Save")]
        public JsonResult Save([FromBody] SaveStudentRequest model)
        {

            var result = new SaveStudentResult();
            result = ApiHelper<SaveStudentResult>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}api/student/save",
                                                    model
                                                );
            return Json(new { result });
        }

        [Route("/Student/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new GetStudentDetail();
            result = ApiHelper<GetStudentDetail>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentDetail/{id}");

            return Json(new { result });
        }

    }
}
