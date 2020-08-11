using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.SubjectResult
{
    public class CreateSubjectResult
    {
        public int StudentId { get; set; }
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public int TypePointId { get; set; }
        public int CourseId { get; set; }
        public int ClassId { get; set; }

    }
}
