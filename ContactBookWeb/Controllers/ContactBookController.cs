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
using System.Threading;

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
            var classRoomAll = new List<GetClassByCourseIdGradeId>();
            classRoomAll = ApiHelper<List<GetClassByCourseIdGradeId>>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassAll");
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
        [Route("/ContactBook/ShowClassPoint/{classId}")]
        public JsonResult ShowClassPoint(int classId = 0)
        {
            var classRoom = new GetClassByClassId();
            classRoom = ApiHelper<GetClassByClassId>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassByClassId/{classId}");
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");
            var classPoints = new List<GetSubjectResultByClassId>();
            classPoints = ApiHelper<List<GetSubjectResultByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectResultByClassId/{classId}");
            var tableClassPoint = new TableClassPoint();
            tableClassPoint.StudentPoints = new List<StudentPoint>();
            tableClassPoint.ClassName = classRoom.ClassName;
            tableClassPoint.CourseName = classRoom.CourseName;
            tableClassPoint.TeacherName = classRoom.TeacherName;
            tableClassPoint.StudentPoints = (from stu in students
                                             select new StudentPoint()
                                             {
                                                 StudentId = stu.StudentId,
                                                 FirstName = stu.FirstName,
                                                 LastName = stu.LastName,
                                                 ListPoint1 = new string[] { " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " },
                                                 ListPoint2 = new string[] { " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " }
                                             }).ToList();

            foreach (var student in tableClassPoint.StudentPoints)
            {
                float sum1 = 0; float sum2 = 0;
                var count1 = 0; var count2 = 0;
                foreach (var point in classPoints)
                {
                    if (point.StudentId == student.StudentId)
                    {
                        var listPoints = point.ListPoint.Split(',');
                        if (point.SemesterId == 1)
                        {
                            if (listPoints[11] != " ")
                            {
                                switch (point.SubjectId)
                                {
                                    case 1:
                                        student.ListPoint1[0] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]) * 2;
                                        count1 += 2;
                                        break;
                                    case 2:
                                        student.ListPoint1[1] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]) * 2;
                                        count1 += 2;
                                        break;
                                    case 3:
                                        student.ListPoint1[2] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 4:
                                        student.ListPoint1[3] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 5:
                                        student.ListPoint1[4] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 6:
                                        student.ListPoint1[5] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 7:
                                        student.ListPoint1[6] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 8:
                                        student.ListPoint1[7] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 13:
                                        student.ListPoint1[8] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 14:
                                        student.ListPoint1[9] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 15:
                                        student.ListPoint1[10] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                    case 16:
                                        student.ListPoint1[11] = listPoints[11];
                                        sum1 += float.Parse(listPoints[11]);
                                        count1 += 1;
                                        break;
                                }
                            }

                        }
                        else
                        {
                            if (listPoints[11] != " ")
                            {
                                switch (point.SubjectId)
                                {
                                    case 1:
                                        student.ListPoint2[0] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]) * 2;
                                        count2 += 2;
                                        break;
                                    case 2:
                                        student.ListPoint2[1] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]) * 2;
                                        count2 += 2;
                                        break;
                                    case 3:
                                        student.ListPoint2[2] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 4:
                                        student.ListPoint2[3] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 5:
                                        student.ListPoint2[4] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 6:
                                        student.ListPoint2[5] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 7:
                                        student.ListPoint2[6] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 8:
                                        student.ListPoint2[7] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 13:
                                        student.ListPoint2[8] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 14:
                                        student.ListPoint2[9] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 15:
                                        student.ListPoint2[10] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                    case 16:
                                        student.ListPoint2[11] = listPoints[11];
                                        sum2 += float.Parse(listPoints[11]);
                                        count2 += 1;
                                        break;
                                }
                            }
                        }
                    }
                }
                student.ListPoint1[12] = (Math.Round(sum1 / count1, 2)).ToString();
                student.ListPoint2[12] = (Math.Round(sum2 / count2, 2)).ToString();
            }

            return Json(new { tableClassPoint });
        }
    }
}
