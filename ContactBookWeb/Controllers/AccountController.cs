using ContactBookWeb.Models.Account;
using ContactBookWeb.Ultilities;
using Microsoft.AspNetCore.Mvc;

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
                    if (model.Options == "2" && result.Role==false)
                    {
                        return RedirectToAction("Index", "Edustage", new { id = result.CheckId });
                    }
                    else if (model.Options == "1" && result.Role ==true )
                    {
                        return RedirectToAction("Index", "SubjectResult");
                    }
                    else
                    {
                        return RedirectToAction("Login", "Acount");
                    }
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
