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
        [Route("/ContactBook/ShowTablePoint/{courseId}/{studentId}/{classId}")]
        public JsonResult ShowTablePoint(int courseId = 0, int studentId = 0, int classId = 0)
        {
            var subjects = new List<GetSubjectByClassId>();
            subjects = ApiHelper<List<GetSubjectByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectByClassId/{classId}");
            var points = new List<GetSubjectResultByCourseIdStudentId>();
            points = ApiHelper<List<GetSubjectResultByCourseIdStudentId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectResultByCourseIdStudentId/{courseId}/{studentId}");
            var tableContactBook = new TableContactBook();
            tableContactBook.subjectPoints = new List<SubjectPoint>();
            tableContactBook.subjectPoints = (from su in subjects
                                              select new SubjectPoint()
                                              {
                                                  SubjectId = su.SubjectId,
                                                  SubjectName = su.SubjectName,
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
                                                  DateInput1st = "",
                                                  DateInput2st = "",
                                                  DateInput3st = "",
                                                  DateInput4st = "",
                                                  DateInput5st = "",
                                                  DateInput6st = "",
                                                  DateInput7st = "",
                                                  DateInput8st = "",
                                                  DateInput9st = "",
                                                  DateInput10st = "",
                                                  DateInput11st = "",
                                                  Avg = 0,
                                              }).ToList();
            foreach (var su in tableContactBook.subjectPoints)
            {
                float sum = 0; var count = 0;
                foreach (var point in points)
                {
                    if (su.SubjectId == point.SubjectId)
                    {
                        switch (point.TypePointId)
                        {
                            case 1:
                                su.Point1st = point.Point;
                                su.Poin1stId = point.SubjectResultId;
                                su.DateInput1st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 2:
                                su.Point2st = point.Point;
                                su.Poin2stId = point.SubjectResultId;
                                su.DateInput2st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 3:
                                su.Point3st = point.Point;
                                su.Poin3stId = point.SubjectResultId;
                                su.DateInput3st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;

                            case 4:
                                su.Point4st = point.Point;
                                su.Poin4stId = point.SubjectResultId;
                                su.DateInput4st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 5:
                                su.Point5st = point.Point;
                                su.Poin5stId = point.SubjectResultId;
                                su.DateInput5st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;

                            case 7:
                                su.Point6st = point.Point;
                                su.Poin6stId = point.SubjectResultId;
                                su.DateInput6st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 8:
                                su.Point7st = point.Point;
                                su.Poin7stId = point.SubjectResultId;
                                su.DateInput7st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;
                            case 9:
                                su.Point8st = point.Point;
                                su.Poin8stId = point.SubjectResultId;
                                su.DateInput8st = point.DateInput;
                                sum += float.Parse(point.Point);
                                count += 1;
                                break;

                            case 11:
                                su.Point9st = point.Point;
                                su.Poin9stId = point.SubjectResultId;
                                su.DateInput9st = point.DateInput;
                                sum += float.Parse(point.Point) * 2;
                                count += 2;
                                break;
                            case 12:
                                su.Point10st = point.Point;
                                su.Poin10stId = point.SubjectResultId;
                                su.DateInput10st = point.DateInput;
                                sum += float.Parse(point.Point) * 2;
                                count += 2;
                                break;
                            case 13:
                                su.Point11st = point.Point;
                                su.Poin11stId = point.SubjectResultId;
                                su.DateInput11st = point.DateInput;
                                sum += float.Parse(point.Point) * 3;
                                count += 3;
                                break;
                        }
                    }
                }
                if (sum == 0 || count == 0)
                {
                    su.Avg = 0.0f;
                }
                else
                {
                    su.Avg = (float)Math.Round(sum / count, 2);
                }
            }

            return Json(new { });
        }
    }
}
