using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ContactBookWeb.Models.SubjectResult
{
    public class GetSubjectResultClassIdSemesterSubjectId
    {
        public int SubjectResultId { get; set; }
        public int ClassId { get; set; }
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public int StudentId { get; set; }
        public string ListPoint { get; set; }
        public string ListDate { get; set; }
    }
}
