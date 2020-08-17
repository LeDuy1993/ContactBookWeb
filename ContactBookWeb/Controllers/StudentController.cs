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
            var courseAll = new List<GetCourseAll>();
            courseAll = ApiHelper<List<GetCourseAll>>.HttpGetAsync($"{Helper.ApiUrl}api/course/GetCourseAll");
            var gradeAll = new List<GetGradeAll>();
            gradeAll = ApiHelper<List<GetGradeAll>>.HttpGetAsync($"{Helper.ApiUrl}api/grade/GetGradeAll");
            ViewBag.gradeAll = gradeAll;
            ViewBag.courseAll = courseAll;
            return View();
        }

        [Route("/Student/ListClass/{courseId}/{gradeId}")]
        public JsonResult ListClass(int courseId = 0, int gradeId = 0)
        {
            var classRoomAll = new List<GetClassByCourseIdGradeId>();
            classRoomAll = ApiHelper<List<GetClassByCourseIdGradeId>>.HttpGetAsync($"{Helper.ApiUrl}api/class/get/{gradeId}/{courseId}");

            return Json(new { classRoomAll });
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
                                                    model);

            return Json(new { result });
        }

        [Route("/Student/Get/{id}")]
        public JsonResult Get(int id)
        {
            var students = new GetStudentDetail();
            students = ApiHelper<GetStudentDetail>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentDetail/{id}");

            return Json(new { students });
        }

    }
}
