using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.Course;
using ContactBookWeb.Models.Grade;
using ContactBookWeb.Models.Student;
using ContactBookWeb.Models.Subject;
using ContactBookWeb.Models.SubjectResult;
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


        /// <summary>
        /// Create and save Point
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="semesterId"></param>
        /// <param name="classId"></param>
        /// <param name="studentId"></param>
        /// <param name="subjectId"></param>
        /// <param name="subjectResultId"></param>
        /// <param name="typePointId"></param>
        /// <param name="point"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("SubjectResult/SaveResultPoint/{courseId}/{classId}/{semesterId}/{studentId}/{subjectId}/{subjectResultId}/{typePointId}/{point}")]
        public JsonResult SaveResultPoint(int courseId = 0, int semesterId = 0, int classId = 0, int studentId = 0, int subjectId = 0, int subjectResultId = 0, int typePointId = 0, float point = 0)
        {
            var saveResultPoint = new SaveResultPoint();
            saveResultPoint.ClassId = classId;
            saveResultPoint.SemesterId = semesterId;
            saveResultPoint.CourseId = courseId;
            saveResultPoint.StudentId = studentId;
            saveResultPoint.TypePointId = typePointId;
            saveResultPoint.Point = point;
            saveResultPoint.SubjectId = subjectId;
            saveResultPoint.SubjectResultId = subjectResultId;
            var result = ApiHelper<SaveResult>.HttpPostAsync(
                                                  $"{Helper.ApiUrl}api/subjectResutl/SaveSubjectResult",
                                                  saveResultPoint);
            return Json(new { result });
        }
        /// <summary>
        /// Get Point theo năm, lớp, học kì và môn nào
        /// </summary>
        /// <param name="classId"></param>
        /// <param name="courseId"></param>
        /// <param name="semesterId"></param>
        /// <param name="subjectId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("/SubjectResult/ShowTablePoint/{courseId}/{semesterId}/{classId}/{subjectId}")]
        public JsonResult ShowTablePoint(int classId = 0, int courseId = 0, int semesterId = 0, int subjectId = 0)
        {
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");

            var points = new List<GetSubjectCourseSemesterSubjectId>();
            points = ApiHelper<List<GetSubjectCourseSemesterSubjectId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectCourseSemesterSubjectId/{courseId}/{semesterId}/{subjectId}/{classId}");
            var tablePoints = new TablePoint();
            tablePoints.Students = students;
            tablePoints.StudentPoints = new List<StudentPoint>();
            tablePoints.StudentPoints = (from stu in students
                                         select new StudentPoint()
                                         {
                                             StudentId = stu.StudentId,
                                             LastName = stu.LastName,
                                             FirstName = stu.FirstName,
                                             Point1st = "",
                                             Point2st = "",
                                             Point3st = "",
                                             Point4st = "",
                                             Point5st = "",
                                             Point6st = "",
                                             Point7st = "",
                                             Point8st = "",
                                             Point9st = "",
                                             Point10st = "",
                                             Point11st = "",
                                             Poin1stId = 0,
                                             Poin2stId = 0,
                                             Poin3stId = 0,
                                             Poin4stId = 0,
                                             Poin5stId = 0,
                                             Poin6stId = 0,
                                             Poin7stId = 0,
                                             Poin8stId = 0,
                                             Poin9stId = 0,
                                             Poin10stId = 0,
                                             Poin11stId = 0,
                                             Avg = 0,
                                         }).ToList();

            foreach (var stu in tablePoints.StudentPoints)
            {

                float sum = 0; var count = 0;
                foreach (var point in points)
                {
                    if (stu.StudentId == point.StudentId)
                    {
                        switch (point.TypePointId)
                        {
                            case 1:
                                stu.Point1st = point.Point;
                                stu.Poin1stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 2:
                                stu.Point2st = point.Point;
                                stu.Poin2stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 3:
                                stu.Point3st = point.Point;
                                stu.Poin3stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;

                            case 4:
                                stu.Point4st = point.Point;
                                stu.Poin4stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 5:
                                stu.Point5st = point.Point;
                                stu.Poin5stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;

                            case 7:
                                stu.Point6st = point.Point;
                                stu.Poin6stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 8:
                                stu.Point7st = point.Point;
                                stu.Poin7stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 9:
                                stu.Point8st = point.Point;
                                stu.Poin8stId = point.SubjectResultId;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;

                            case 11:
                                stu.Point9st = point.Point;
                                stu.Poin9stId = point.SubjectResultId;
                                sum += float.Parse(point.Point)* 2;
                                count += 2;
                                break;
                            case 12:
                                stu.Point10st = point.Point;
                                stu.Poin10stId = point.SubjectResultId;
                                sum += float.Parse(point.Point) * 2;
                                count += 2;
                                break;
                            case 13:
                                stu.Point11st = point.Point;
                                stu.Poin11stId = point.SubjectResultId;
                                sum += float.Parse(point.Point) * 3;
                                count += 3;
                                break;
                        }
                    }

                }
                if (sum == 0 || count == 0)
                {
                    stu.Avg = 0.0f;
                }
                else
                {
                    stu.Avg = (float)Math.Round(sum / count, 2);
                }
            }
            return Json(new { tablePoints });
        }

    }
}
