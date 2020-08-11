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
    public class TeacherController : Controller
    {
        private readonly ILogger<TeacherController> _logger;

        public TeacherController(ILogger<TeacherController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var subjectAll = new List<GetSubjectAll>();
            subjectAll = ApiHelper<List<GetSubjectAll>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectAll");
            var teacherAll = new List<TeacherView>();
            teacherAll = ApiHelper<List<TeacherView>>.HttpGetAsync($"{Helper.ApiUrl}api/teacher/getAllTeacher");
            ViewBag.teacherAll = teacherAll;
            return View(subjectAll);
        }

        //public IActionResult Index()
        //{
        //    ViewBag.Title = "Teacher List";
        //    return View();
        //}


        //public IActionResult Cards(int id)
        //{
        //    var subjectAll = new List<GetSubjectAll>();
        //    subjectAll = ApiHelper<List<GetSubjectAll>>.HttpGetAsync($"{Helper.ApiUrl}api/subject/GetSubjectAll");
        //    ViewBag.subjectAll = subjectAll;
        //    var teachers = new List<GetTeacherBySubjectId>();
        //    teachers = ApiHelper<List<GetTeacherBySubjectId>>.HttpGetAsync($"{Helper.ApiUrl}api/teacher/GetTeacherBySubjectId/{id}");
        //    return View(teachers);
        //}

        public JsonResult GetAllTeacher()
        {
            var teacherAll = new List<TeacherView>();
            teacherAll = ApiHelper<List<TeacherView>>.HttpGetAsync($"{Helper.ApiUrl}api/teacher/getAllTeacher");
            return Json(new { teacherAll });
        }

        [Route("/Teacher/Save")]
        public JsonResult Save([FromBody] SaveTeacherRequest model)
        {

            var result = new SaveTeacherResult();
            result = ApiHelper<SaveTeacherResult>.HttpPostAsync(
                                                    $"{Helper.ApiUrl}api/teacher/save",
                                                    model
                                                );
            return Json(new { result });
        }

        [Route("Teacher/Get/{id}")]
        public JsonResult Get(int id)
        {
            var result = new GetTeacherbyTeacherId();
            result = ApiHelper<GetTeacherbyTeacherId>.HttpGetAsync(
                                                    $"{Helper.ApiUrl}api/teacher/GetTeacherById/{id}"
                                                );
           
            return Json(new { result });
        }

        //public JsonResult Get(int departId)
        //{
        //    var employees = new List<TeacherView>();
        //    employees = ApiHelper<List<TeacherView>>.HttpGetAsync($"{Helper.ApiUrl}api/teacher/gets/{departId}");
        //    return Json(new { employees });
        //}
    }
}
