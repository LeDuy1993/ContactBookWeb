using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.ContactBook
{
    public class TableContactBook
    {
        public string ClassName { get; set; }
        public string TeacherName { get; set; }
        public string CourseName { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string DayOfBirth { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public List<SubjectPoint> subjectPoint1st { get; set; }
        public List<SubjectPoint> subjectPoint2st { get; set; }
    }
}
