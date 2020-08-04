using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.Teacher
{
    public class TeacherView
    {
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public string DayOfBirth { get; set; }
        public string PlaceOfBirth { get; set; }
        public string Gender { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public int SubjectId { get; set; }
        public string AvatarPath { get; set; }
        public int DegreeId { get; set; }
        public string DayToWork { get; set; }
    }
}
