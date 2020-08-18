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
                    return RedirectToAction("Index", "Edustage", new { id = result.CheckId });
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
