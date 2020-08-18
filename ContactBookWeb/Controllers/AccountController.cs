using ContactBookWeb.Models.Account;
using ContactBookWeb.Models.ClassRoom;
using ContactBookWeb.Models.ContactBook;
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
    public class AccountController : Controller
    {

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = new LoginResult();
                var loginRequest = new LoginRequest()
                {
                    Email = model.Email,
                    Password = model.Password
                };
                result = ApiHelper<LoginResult>.HttpPostAsync(
                                                        $"{Helper.ApiUrl}api/account/login",
                                                        loginRequest
                                                    );
                if (result.Success)
                {
                    var classStudentID = new GetClassStudent();
                    classStudentID = ApiHelper<GetClassStudent>.HttpGetAsync($"{Helper.ApiUrl}api/class/GetClassStudent/{result.CheckId}");
                   /* var classRoom = new GetClassByClassId();
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

                    }*/
                    return RedirectToAction("Index", "Home", new { id = result.CheckId });
                }
                ModelState.AddModelError("", result.Message);
                return View();
            }
            return View(model);
        }

        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Register(RegisterModel model)
        {
            if (ModelState.IsValid)
            {
                var registerRequest = new RegisterRequest()
                {
                    Email = model.Email,
                    Password = model.Password
                };
                var result = new RegisterResult();
                result = result = ApiHelper<RegisterResult>.HttpPostAsync(
                                                        $"{Helper.ApiUrl}api/account/register",
                                                        registerRequest
                                                    );
                if (result.Success)
                {
                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError("", result.Message);
                return View();
            }
            return View(model);
        }

        public IActionResult Logout()
        {
            var result = true;
            return Json(new { result });
        }
    }
}
