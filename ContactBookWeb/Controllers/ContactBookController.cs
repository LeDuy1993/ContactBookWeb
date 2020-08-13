using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.ContactBook;
using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Models.Subject;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
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
        [Route("/ContactBook/ShowTablePoint/{studentId}/{classId}")]
        public JsonResult ShowTablePoint(int studentId = 0, int classId = 0)
        {
            var classRoom = new GetClassByClassId();
            classRoom = ApiHelper<GetClassByClassId>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassByClassId/{classId}"); ;
            var student = new GetStudentDetail();
            student = ApiHelper<GetStudentDetail>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentDetail/{studentId}");
            var points = new List<GetSubjectResultByClassIdStudentId>();
            points = ApiHelper<List<GetSubjectResultByClassIdStudentId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectResultByCourseIdStudentId/{classId}/{studentId}");
               
            var tableContactBook = new TableContactBook();
            tableContactBook.SubjectPoint1 = new List<SubjectPoint>();
            tableContactBook.SubjectPoint2 = new List<SubjectPoint>();
            tableContactBook.ClassName = classRoom.ClassName;
            tableContactBook.CourseName = classRoom.CourseName;
            tableContactBook.TeacherName = classRoom.TeacherName;
            tableContactBook.FirstName = student.FirstName;
            tableContactBook.LastName = student.LastName;
            tableContactBook.Gender = student.Gender;
            tableContactBook.DayOfBirth = student.DayOfBirth;
            tableContactBook.PhoneNumber = student.PhoneNumber;
            tableContactBook.Address = student.Address;
            var point1 = (from po in points
                          where po.SemesterId.Equals(1)
                          select po).ToList();
            foreach (var po in points)
            {
                var subjectPoint = new SubjectPoint();
                subjectPoint.SubjectId = po.SubjectId;
                subjectPoint.SubjectName = po.SubjectName;
                subjectPoint.TeacherName = po.TeacherName;
                subjectPoint.ListPoint = po.ListPoint.Split(',');
                subjectPoint.ListDate = po.ListDate.Split(',');
                if (po.SemesterId == 1)
                {
                    tableContactBook.SubjectPoint1.Add(subjectPoint);
                }
                else
                {
                    tableContactBook.SubjectPoint2.Add(subjectPoint);
                }
               
            }
            return Json(new { tableContactBook });
        }
    }
}
