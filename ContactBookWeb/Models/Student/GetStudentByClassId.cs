using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.Student
{
    public class GetStudentByClassId
    {
        public int ClassId { get; set; }
        public int StudentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string DayOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
    }
}
