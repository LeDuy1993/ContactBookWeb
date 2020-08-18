using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.ContactBook;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace ContactBookWeb.Controllers
{
    public class EdustageController :Controller
    {
        private readonly ILogger<EdustageController> _logger;

        public EdustageController(ILogger<EdustageController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index(int id)
        { 
            ViewBag.id = id;
            return View(id);
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Lecture()
        {
            return View();
        }
        public IActionResult Exam()
        {
            return View();
        }
        public IActionResult Library()
        {
            return View();
        }
        public IActionResult Notification()
        {
            return View();
        }
        public IActionResult News()
        {
            return View();
        }
        public IActionResult ShowResult(int id)
        {
            var classStudentID = new GetClassStudent();
            classStudentID = ApiHelper<GetClassStudent>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassStudent/{id}");
            var classRoom = new GetClassByClassId();
            classRoom = ApiHelper<GetClassByClassId>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassByClassId/{classStudentID.ClassId}");
            var student = new GetStudentDetail();
            student = ApiHelper<GetStudentDetail>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentDetail/{classStudentID.StudentId}");
            var points = new List<GetSubjectResultByClassIdStudentId>();
            points = ApiHelper<List<GetSubjectResultByClassIdStudentId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectResultByCourseIdStudentId/{classStudentID.ClassId}/{classStudentID.StudentId}");

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
            return View(tableContactBook);
        }
    }
}
