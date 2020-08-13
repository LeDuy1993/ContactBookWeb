using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Models.Subject;
using ContactBookWeb.Models.SubjectResult;
using ContactBookWeb.Models.Teacher;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;
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
        [Route("/SubjectResult/ListClass/{courseId}/{gradeId}")]
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
        [Route("/SubjectResult/ListSubject/{courseId}/{semesterId}/{classId}/{subjectId}")]
        public JsonResult ListSubject(int classId = 0, int courseId = 0, int semesterId = 0, int subjectId = 0)
        {
            var subjects = new List<GetSubjectByClassId>();
            subjects = ApiHelper<List<GetSubjectByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectByClassId/{classId}");

            return Json(new { subjects });
        }

        [HttpGet]
        [Route("SubjectResult/SaveResultPoint/{classId}/{semesterId}/{studentId}/{subjectId}/{point}/{index}/{subjectResultId}")]
        public JsonResult SaveResultPoint(int semesterId = 0, int classId = 0, int studentId = 0, int index = 0, int subjectId = 0, string point = " ", int subjectResultId = 0)
        {

            var saveResultPoint = new SaveResultPoint();
            saveResultPoint.SubjectResultId = subjectResultId;
            saveResultPoint.ClassId = classId;
            saveResultPoint.SemesterId = semesterId;
            saveResultPoint.StudentId = studentId;
            saveResultPoint.SubjectId = subjectId;
            string[] listPoint = new string[] { };
            string[] listDate = new string[] { };
            if (subjectResultId != 0)
            {
                var subjectPoint = new GetSubjectResultBySubjectResultId();
                subjectPoint = ApiHelper<GetSubjectResultBySubjectResultId>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectResultBySubjectResultId/{subjectResultId}");
                listPoint = subjectPoint.ListPoint.Split(',');
                listPoint[index] = point.ToString();
                listDate = subjectPoint.ListDate.Split(',');
                listDate[index] = DateTime.Now.ToString("yyyy-MM-dd");
            }
            else
            {
                listPoint = new string[] { " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " };
                listPoint[index] = point.ToString();
                listDate = new string[] { " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " };
                listDate[index] = DateTime.Now.ToString("yyyy-MM-dd");
            }
            float sum = 0; var count = 0;
            for (var i = 0; i <= 10; i++)
            {
                if (listPoint[i] != " ")
                {
                    if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7)
                    {
                        sum += float.Parse(listPoint[i]);
                        count += 1;
                    }
                    else if (i == 8 || i == 9)
                    {
                        sum += float.Parse(listPoint[i]) * 2;
                        count += 2;
                    }
                    else
                    {
                        sum += float.Parse(listPoint[i]) * 3;
                        count += 3;
                    }
                }
            }
            listPoint[11] = ((float)Math.Round(sum / count, 2)).ToString();
            saveResultPoint.ListPoint = string.Join(",", listPoint);
            saveResultPoint.ListDate = string.Join(",", listDate);
            var result = ApiHelper<SaveResult>.HttpPostAsync(
                                                  $"{Helper.ApiUrl}api/subjectResutl/SaveSubjectResult",
                                                  saveResultPoint);

            return Json(new { result });
        }

        [HttpGet]
        [Route("/SubjectResult/ShowTablePoint/{semesterId}/{classId}/{subjectId}")]
        public JsonResult ShowTablePoint(int classId = 0, int semesterId = 0, int subjectId = 0)
        {
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");
            var points = new List<GetSubjectResultClassIdSemesterSubjectId>();
            points = ApiHelper<List<GetSubjectResultClassIdSemesterSubjectId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectResultClassIdSemesterSubjectId/{semesterId}/{subjectId}/{classId}");
            var tablePoints = new TablePoint();
            tablePoints.StudentPoints = new List<StudentPoint>();
            tablePoints.StudentPoints = (from stu in students
                                         select new StudentPoint()
                                         {
                                             SubjectResultId = 0,
                                             StudentId = stu.StudentId,
                                             LastName = stu.LastName,
                                             FirstName = stu.FirstName,
                                             ListPoint = new string[] { " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " },
                                             ListDate = new string[] { " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " " },
                                             Avg = 0,
                                         }).ToList();

            foreach (var stu in tablePoints.StudentPoints)
            {
                float sum = 0; var count = 0;
                foreach (var point in points)
                {
                    if (stu.StudentId == point.StudentId && point != null)
                    {
                        stu.SubjectResultId = point.SubjectResultId;
                        string[] listPoint = new string[] { };
                        listPoint = point.ListPoint.Split(',');
                        for (var i = 0; i <= 10; i++)
                        {
                            stu.ListPoint[i] = listPoint[i];
                            stu.ListDate[i] = listPoint[i];
                            if (stu.ListPoint[i] != " ")
                            {
                                if (i == 0 || i == 1 || i == 2 || i == 3 || i == 4 || i == 5 || i == 6 || i == 7)
                                {
                                    sum += float.Parse(stu.ListPoint[i]);
                                    count += 1;
                                }
                                else if (i == 8 || i == 9)
                                {
                                    sum += float.Parse(stu.ListPoint[i]) * 2;
                                    count += 2;
                                }
                                else
                                {
                                    sum += float.Parse(stu.ListPoint[i]) * 3;
                                    count += 3;
                                }
                            }
                        }
                        stu.ListPoint[11] = listPoint[11];
                    }

                }
                if (sum == 0 || count == 0)
                {
                    stu.Avg = 0.0f;
                    stu.ListPoint[11] = "0";
                }
                else
                {
                    stu.Avg = (float)Math.Round(sum / count, 2);
                    stu.ListPoint[11] = stu.Avg.ToString();
                }
            }
            return Json(new { tablePoints });
        }
    }
}
