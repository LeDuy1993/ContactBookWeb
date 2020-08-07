using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.SubjectResult
{
    public class GetSubjectCourseSemesterSubjectId
    {
        public int SubjectResultId { get; set; }
        public int StudentId { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public int CourseId { get; set; }
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public float Point { get; set; }
        public int TypePointId { get; set; }
    }
}
