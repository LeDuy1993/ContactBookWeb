using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.Student
{
    public class SaveStudentRequest
    {
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string DayOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Address { get; set; }
        public int NationId { get; set; }
        public int ReligionId { get; set; }
        public string FartherName { get; set; }
        public string MortherName { get; set; }
        public string JobName { get; set; }
        public string PhoneNumber { get; set; }
        public string AvatarPath { get; set; }
    }
}
