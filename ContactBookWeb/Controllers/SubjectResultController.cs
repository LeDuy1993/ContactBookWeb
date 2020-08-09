﻿using ContactBookWeb.Models.ClassRoom;
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
        public JsonResult ListSubject(int classId = 0, int courseId=0, int semesterId=0, int subjectId=0)
        {
            var subjects = new List<GetSubjectByClassId>();
            subjects = ApiHelper<List<GetSubjectByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectByClassId/{classId}");
            return Json(new { subjects });
        }
       
        
        /// <summary>
        /// Phương thức tự động tạo bảng điểm của dùng 2 vòng lặp (student and loại điểm)
        /// </summary>
        /// <param name="courseId"></param>
        /// <param name="semesterId"></param>
        /// <param name="classId"></param>
        /// <param name="gradeId"></param>
        /// <param name="subjectId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("/SubjectResult/Create/{courseId}/{gradeId}/{classId}/{semesterId}/{subjectId}")]
        public JsonResult Create(int courseId = 0, int semesterId = 0, int classId = 0, int gradeId = 0, int subjectId = 0)
        {
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");

            var typePoints = new List<GetAllTypePoint>();
            typePoints = ApiHelper<List<GetAllTypePoint>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetAllTypePoint");


            var createSubjectResult = new CreateSubjectResult();
            foreach (var sub in students)
            {
                foreach (var type in typePoints)
                {
                    createSubjectResult.StudentId = sub.StudentId;
                    createSubjectResult.TypePointId = type.TypePointId;

                    createSubjectResult.SemesterId = semesterId;
                    createSubjectResult.CourseId = courseId;
                    createSubjectResult.SubjectId = subjectId;
                    createSubjectResult.ClassId = classId;

                    ApiHelper<SaveTeacherResult>.HttpPostAsync(
                                                   $"{Helper.ApiUrl}api/subjectResutl/Create",
                                                   createSubjectResult);
                }

            }
            string mes = "Create Table point suscess";
            return Json(new { mes });
        }
        [HttpGet]
        [Route("/SubjectResult/ShowTablePoint/{courseId}/{semesterId}/{classId}/{subjectId}")]
        public JsonResult ShowTablePoint(int classId = 0, int courseId = 0, int semesterId = 0, int subjectId = 0)
        {
            var students = new List<GetStudentByClassId>();
            students = ApiHelper<List<GetStudentByClassId>>.HttpGetAsync($"{Helper.ApiUrl}api/student/GetStudentByClassId/{classId}");

            var points = new List<GetSubjectCourseSemesterSubjectId>();
            points = ApiHelper<List<GetSubjectCourseSemesterSubjectId>>.HttpGetAsync($"{Helper.ApiUrl}api/subjectResutl/GetSubjectCourseSemesterSubjectId/{courseId}/{semesterId}/{subjectId}/{classId}");
            var tablePoints = new TablePoint();
            tablePoints.students = students;
            tablePoints.studentPoints = new List<StudentPoint>();
       
            foreach(var stu in students)
            {
                var studentPoint = new StudentPoint();
                studentPoint.StudentId = stu.StudentId;
                studentPoint.FirstName = stu.FirstName;
                studentPoint.LastName = stu.LastName;  
                foreach(var point in points)
                {
                    if (stu.StudentId == point.StudentId)
                    {
                        switch (point.TypePointId)
                        {
                            case 1: studentPoint.Point1st = point.Point == null ? " ": point.Point; break;
                            case 2: studentPoint.Point2st = point.Point == null ? " " : point.Point; break;
                            case 3: studentPoint.Point3st = point.Point == null ? " " : point.Point; break;
                            case 4: studentPoint.Point4st = point.Point == null ? " " : point.Point; break;
                            case 5: studentPoint.Point5st = point.Point == null ? " " : point.Point; break;

                            case 7: studentPoint.Point6st = point.Point == null ? " " : point.Point; break;
                            case 8: studentPoint.Point7st = point.Point == null ? " " : point.Point; break;
                            case 9: studentPoint.Point8st = point.Point == null ? " " : point.Point; break;

                            case 11: studentPoint.Point9st = point.Point == null ? " " : point.Point; break;
                            case 12: studentPoint.Point10st = point.Point == null ? " " : point.Point; break;
                            case 13: studentPoint.Point11st = point.Point == null ? " " : point.Point; break;
                        }
                    }

                }
                tablePoints.studentPoints.Add(studentPoint);
            }
            return Json(new { tablePoints });
        }

    }
}
